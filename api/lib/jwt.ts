import * as crypto from 'crypto';

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEvdByi/mxxfRYaPTaRrZ6QDRJ6E7+
ot8iRT6TruCEWGR1CdvuspdrKUsonBgGNu/WaxtFgjVk+9d+BlaAOcdQTg==
-----END PUBLIC KEY-----`;

export function base64UrlEncode(data: Buffer): string {
  return data.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export function base64UrlDecode(str: string): Buffer {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4;
  if (pad === 2) base64 += '==';
  else if (pad === 3) base64 += '=';
  return Buffer.from(base64, 'base64');
}

interface ValidateResult {
  valid: boolean;
  tier?: string;
  org?: string;
  error?: string;
}

export function validateLicenseToken(token: string): ValidateResult {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false, error: 'Malformed token' };
    }

    const [headerB64, payloadB64, signatureB64] = parts;

    const header = JSON.parse(base64UrlDecode(headerB64).toString('utf-8'));
    if (header.alg !== 'ES256') {
      return { valid: false, error: 'Unsupported algorithm' };
    }

    const signatureInput = `${headerB64}.${payloadB64}`;
    const signature = base64UrlDecode(signatureB64);

    const verify = crypto.createVerify('SHA256');
    verify.update(signatureInput);
    const isValid = verify.verify(PUBLIC_KEY, signature);

    if (!isValid) {
      return { valid: false, error: 'Invalid signature' };
    }

    const payload = JSON.parse(base64UrlDecode(payloadB64).toString('utf-8'));

    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return { valid: false, error: 'Token expired' };
    }

    if (!payload.tier || !payload.org) {
      return { valid: false, error: 'Missing required claims' };
    }

    return { valid: true, tier: payload.tier, org: payload.org };
  } catch {
    return { valid: false, error: 'Token validation failed' };
  }
}
