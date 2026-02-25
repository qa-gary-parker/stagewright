import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as crypto from 'crypto';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const SYSTEM_PROMPT =
  'You are a Playwright test failure analyst. Analyze the test failure and provide a brief, actionable suggestion to fix it. Be concise (2-3 sentences max).';

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEvdByi/mxxfRYaPTaRrZ6QDRJ6E7+
ot8iRT6TruCEWGR1CdvuspdrKUsonBgGNu/WaxtFgjVk+9d+BlaAOcdQTg==
-----END PUBLIC KEY-----`;

function base64UrlDecode(str: string): Buffer {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4;
  if (pad === 2) base64 += '==';
  else if (pad === 3) base64 += '=';
  return Buffer.from(base64, 'base64');
}

function validateLicenseToken(token: string): { valid: boolean; tier?: string; org?: string; error?: string } {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false, error: 'Malformed token' };

    const [headerB64, payloadB64, signatureB64] = parts;
    const header = JSON.parse(base64UrlDecode(headerB64).toString('utf-8'));
    if (header.alg !== 'ES256') return { valid: false, error: 'Unsupported algorithm' };

    const signatureInput = `${headerB64}.${payloadB64}`;
    const signature = base64UrlDecode(signatureB64);
    const verify = crypto.createVerify('SHA256');
    verify.update(signatureInput);
    if (!verify.verify(PUBLIC_KEY, signature)) return { valid: false, error: 'Invalid signature' };

    const payload = JSON.parse(base64UrlDecode(payloadB64).toString('utf-8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return { valid: false, error: 'Token expired' };
    if (!payload.tier || !payload.org) return { valid: false, error: 'Missing required claims' };

    return { valid: true, tier: payload.tier, org: payload.org };
  } catch {
    return { valid: false, error: 'Token validation failed' };
  }
}

function getRatelimit(): Ratelimit {
  return new Ratelimit({
    redis: new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    }),
    limiter: Ratelimit.slidingWindow(5000, '30d'),
    prefix: 'ai',
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization token' });
  }

  const token = authHeader.slice(7);
  const validation = validateLicenseToken(token);

  if (!validation.valid) {
    return res.status(401).json({ error: validation.error || 'Invalid token' });
  }

  if (validation.tier === 'community') {
    return res.status(403).json({ error: 'AI analysis requires a Pro or Team license' });
  }

  const ratelimit = getRatelimit();
  const { success, remaining, reset } = await ratelimit.limit(`ai:${validation.org}`);

  if (!success) {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      resetAt: new Date(reset).toISOString(),
    });
  }

  const { prompt, type } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid prompt field' });
  }

  if (type && !['failure', 'cluster'].includes(type)) {
    return res.status(400).json({ error: 'Invalid type — must be failure or cluster' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('OPENAI_API_KEY not configured');
    return res.status(502).json({ error: 'AI service unavailable' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        max_tokens: 256,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('OpenAI API error:', response.status, errorBody);
      return res.status(502).json({ error: 'AI provider error' });
    }

    const data = await response.json();
    const suggestion = data.choices?.[0]?.message?.content?.trim() || '';

    return res.status(200).json({
      suggestion,
      remaining,
      resetAt: new Date(reset).toISOString(),
    });
  } catch (err) {
    console.error('AI analysis failed:', (err as Error).message);
    return res.status(502).json({ error: 'AI service error' });
  }
}
