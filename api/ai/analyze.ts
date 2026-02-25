import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { validateLicenseToken } from '../lib/jwt';

const SYSTEM_PROMPT =
  'You are a Playwright test failure analyst. Analyze the test failure and provide a brief, actionable suggestion to fix it. Be concise (2-3 sentences max).';

function getRatelimit(): Ratelimit {
  return new Ratelimit({
    redis: new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    }),
    limiter: Ratelimit.slidingWindow(10000, '30d'),
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
      error: 'Rate limit exceeded (10,000 analyses per 30 days)',
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
