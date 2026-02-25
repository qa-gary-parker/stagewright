import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as crypto from 'crypto';
import { Resend } from 'resend';

function base64UrlEncode(data: Buffer): string {
  return data.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// --- License generation (same logic as generate-license.ts) ---

function generateLicenseJwt(tier: 'starter' | 'pro' | 'team', org: string, durationDays: number): string {
  const privateKey = process.env.LICENSE_PRIVATE_KEY;
  if (!privateKey) throw new Error('LICENSE_PRIVATE_KEY env var not set');

  const now = Math.floor(Date.now() / 1000);
  const exp = now + durationDays * 24 * 60 * 60;

  const header = { alg: 'ES256', typ: 'JWT' };
  const payload = { tier, org, iat: now, exp };

  const headerB64 = base64UrlEncode(Buffer.from(JSON.stringify(header)));
  const payloadB64 = base64UrlEncode(Buffer.from(JSON.stringify(payload)));
  const signatureInput = `${headerB64}.${payloadB64}`;

  const sign = crypto.createSign('SHA256');
  sign.update(signatureInput);
  const signature = sign.sign(privateKey);

  return `${signatureInput}.${base64UrlEncode(signature)}`;
}

// --- Webhook signature verification ---

function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const digest = hmac.digest('hex');
  try {
    const sigBuf = Buffer.from(signature, 'hex');
    const digestBuf = Buffer.from(digest, 'hex');
    if (sigBuf.length !== digestBuf.length) return false;
    return crypto.timingSafeEqual(sigBuf, digestBuf);
  } catch {
    return false;
  }
}

// --- Email delivery ---

interface LicenseEmailParams {
  to: string;
  customerName: string;
  licenseKey: string;
  planName: string;
}

async function sendLicenseEmail(params: LicenseEmailParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY not configured — license logged but not emailed');
    console.log(JSON.stringify({ action: 'license_key_fallback', to: params.to }));
    return false;
  }

  const resend = new Resend(apiKey);
  const firstName = params.customerName.split(' ')[0] || 'there';

  const { error } = await resend.emails.send({
    from: 'StageWright <licenses@stagewright.dev>',
    replyTo: 'support@stagewright.dev',
    to: params.to,
    subject: `Your StageWright ${params.planName} License Key`,
    html: buildLicenseEmailHtml(firstName, params.licenseKey, params.planName),
  });

  if (error) {
    console.error('Email send failed:', error);
    console.log(JSON.stringify({ action: 'license_key_fallback', to: params.to }));
    return false;
  }

  console.log(JSON.stringify({ action: 'license_emailed', to: params.to }));
  return true;
}

function buildLicenseEmailHtml(firstName: string, licenseKey: string, planName: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#fff;font-size:24px;margin:0;">
        Stage<span style="color:#4ade80;">Wright</span> ${escapeHtml(planName)}
      </h1>
    </div>

    <!-- Main card -->
    <div style="background:#1e293b;border-radius:12px;padding:32px;border:1px solid #334155;">
      <h2 style="color:#fff;font-size:20px;margin:0 0 8px;">Hey ${escapeHtml(firstName)},</h2>
      <p style="color:#94a3b8;font-size:15px;line-height:1.6;margin:0 0 24px;">
        Thanks for purchasing StageWright ${escapeHtml(planName)}. Your license key is ready.
      </p>

      <!-- License key box -->
      <div style="background:#0f172a;border:1px solid #4ade80;border-radius:8px;padding:16px;margin-bottom:24px;">
        <p style="color:#4ade80;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 8px;">Your License Key</p>
        <code style="color:#e2e8f0;font-size:13px;word-break:break-all;line-height:1.5;display:block;">${escapeHtml(licenseKey)}</code>
      </div>

      <!-- Setup instructions -->
      <h3 style="color:#fff;font-size:16px;margin:0 0 12px;">Quick Setup</h3>

      <p style="color:#94a3b8;font-size:14px;margin:0 0 8px;"><strong style="color:#e2e8f0;">Option 1:</strong> Environment variable</p>
      <div style="background:#0f172a;border-radius:6px;padding:12px;margin-bottom:16px;">
        <code style="color:#e2e8f0;font-size:13px;">SMART_REPORTER_LICENSE_KEY=${escapeHtml(licenseKey)}</code>
      </div>

      <p style="color:#94a3b8;font-size:14px;margin:0 0 8px;"><strong style="color:#e2e8f0;">Option 2:</strong> Playwright config</p>
      <div style="background:#0f172a;border-radius:6px;padding:12px;margin-bottom:24px;">
        <pre style="color:#e2e8f0;font-size:13px;margin:0;white-space:pre-wrap;">reporter: [
  ['playwright-smart-reporter', {
    outputFile: 'smart-report.html',
    licenseKey: '${escapeHtml(licenseKey)}'
  }]
]</pre>
      </div>

      <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 24px;">
        Then run your tests as usual — Pro features (themes, PDF export, quality gates, quarantine) unlock automatically.
      </p>

      <!-- CTA -->
      <div style="text-align:center;">
        <a href="https://stagewright.dev/docs/getting-started" style="display:inline-block;background:#16a34a;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px;">View Documentation</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:32px;">
      <p style="color:#64748b;font-size:12px;margin:0 0 4px;">
        Keep this email safe — you'll need your license key if you set up on a new machine.
      </p>
      <p style="color:#475569;font-size:12px;margin:0;">
        Questions? Reply to this email or contact <a href="mailto:support@stagewright.dev" style="color:#4ade80;text-decoration:none;">support@stagewright.dev</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

// --- Vercel config: disable built-in body parsing so we get the raw body ---

export const config = { api: { bodyParser: false } };

// --- Handler ---

function getRawBody(req: VercelRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    req.on('error', reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('LEMONSQUEEZY_WEBHOOK_SECRET not configured');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  // Verify signature
  const signature = req.headers['x-signature'] as string;
  if (!signature) {
    return res.status(401).json({ error: 'Missing signature' });
  }

  const rawBody = await getRawBody(req);
  if (!verifyWebhookSignature(rawBody, signature, webhookSecret)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  const eventName = event?.meta?.event_name;

  // Only process successful orders
  if (eventName !== 'order_created') {
    return res.status(200).json({ received: true, skipped: eventName });
  }

  try {
    const order = event.data;

    const orderStatus = order?.attributes?.status;
    if (orderStatus !== 'paid') {
      return res.status(200).json({ received: true, skipped: `order status: ${orderStatus}` });
    }

    const customerEmail = order?.attributes?.user_email;
    const customerName = order?.attributes?.user_name || customerEmail;
    const productName = order?.attributes?.first_order_item?.product_name || '';

    if (!customerEmail) {
      console.error('No customer email in order:', order?.id);
      return res.status(200).json({ received: true, error: 'no email' });
    }

    const tier = productName.toLowerCase().includes('starter') ? 'starter' : 'pro';
    const planName = tier === 'starter' ? 'Starter' : 'Pro';
    const durationDays = 35; // Monthly with buffer

    // Generate license key
    const licenseKey = generateLicenseJwt(tier, customerEmail, durationDays);

    // Log for audit trail
    console.log(JSON.stringify({
      action: 'license_generated',
      orderId: order?.id,
      customer: customerEmail,
      name: customerName,
      product: productName,
      plan: planName,
      duration: `${durationDays} days`,
    }));

    // Send license key via email
    const emailSent = await sendLicenseEmail({
      to: customerEmail,
      customerName,
      licenseKey,
      planName,
    });

    return res.status(200).json({
      received: true,
      license_generated: true,
      email_sent: emailSent,
    });
  } catch (err) {
    console.error('License generation failed:', (err as Error).message);
    return res.status(500).json({ error: 'License generation failed' });
  }
}
