#!/usr/bin/env npx tsx
/**
 * Local test script for the LemonSqueezy webhook handler.
 * Run: npx tsx api/webhook/test-webhook.ts
 *
 * Requires env vars: LICENSE_PRIVATE_KEY, LEMONSQUEEZY_WEBHOOK_SECRET
 * Or: reads from local files for testing.
 */
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load private key from env or file
if (!process.env.LICENSE_PRIVATE_KEY) {
  const keyPath = path.resolve(__dirname, '../../../playwright-smart-reporter/keys/private.pem');
  if (fs.existsSync(keyPath)) {
    process.env.LICENSE_PRIVATE_KEY = fs.readFileSync(keyPath, 'utf-8');
    console.log('Loaded private key from', keyPath);
  } else {
    console.error('Set LICENSE_PRIVATE_KEY env var or ensure keys/private.pem exists');
    process.exit(1);
  }
}

// Use a test secret if not set
const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || 'test-secret';
process.env.LEMONSQUEEZY_WEBHOOK_SECRET = webhookSecret;

// Simulate a LemonSqueezy order_created payload
const mockPayload = {
  meta: {
    event_name: 'order_created',
    custom_data: null,
  },
  data: {
    id: 'test-order-123',
    attributes: {
      user_email: 'test@example.com',
      user_name: 'Test User',
      first_order_item: {
        product_name: 'stagewright pro',
      },
      total: 900,
      currency: 'GBP',
      status: 'paid',
    },
  },
};

const payloadStr = JSON.stringify(mockPayload);

// Sign it
const hmac = crypto.createHmac('sha256', webhookSecret);
hmac.update(payloadStr);
const signature = hmac.digest('hex');

console.log('\n--- Simulating LemonSqueezy webhook ---');
console.log('Event:', mockPayload.meta.event_name);
console.log('Customer:', mockPayload.data.attributes.user_email);
console.log('Product:', mockPayload.data.attributes.first_order_item.product_name);
console.log('Signature:', signature.substring(0, 16) + '...');

// Import and call the handler with mock req/res
import handler from './lemonsqueezy';

const mockReq = {
  method: 'POST',
  headers: { 'x-signature': signature },
  body: mockPayload,
} as any;

let responseStatus = 0;
let responseBody: any = null;
const mockRes = {
  status(code: number) {
    responseStatus = code;
    return this;
  },
  json(body: any) {
    responseBody = body;
    return this;
  },
} as any;

(async () => {
  await handler(mockReq, mockRes);

  console.log('\n--- Response ---');
  console.log('Status:', responseStatus);
  console.log('Body:', JSON.stringify(responseBody, null, 2));

  if (responseStatus === 200 && responseBody?.license_generated) {
    console.log('\n--- SUCCESS ---');
    console.log('Email sent:', responseBody.email_sent);
    if (!responseBody.email_sent) {
      console.log('(Set RESEND_API_KEY env var to test email delivery)');
    }
    console.log('Check the console output above for the generated license.');
  } else {
    console.log('\n--- FAILED ---');
    console.log('Something went wrong. Check the error above.');
  }

  // Test with yearly product
  console.log('\n--- Testing yearly product ---');
  const yearlyPayload = {
    ...mockPayload,
    data: {
      ...mockPayload.data,
      attributes: {
        ...mockPayload.data.attributes,
        first_order_item: { product_name: 'stagewright pro (year)' },
      },
    },
  };
  const yearlyStr = JSON.stringify(yearlyPayload);
  const yearlyHmac = crypto.createHmac('sha256', webhookSecret);
  yearlyHmac.update(yearlyStr);
  const yearlySignature = yearlyHmac.digest('hex');

  const mockReq2 = { method: 'POST', headers: { 'x-signature': yearlySignature }, body: yearlyPayload } as any;
  let status2 = 0;
  let body2: any = null;
  const mockRes2 = { status(c: number) { status2 = c; return this; }, json(b: any) { body2 = b; return this; } } as any;
  await handler(mockReq2, mockRes2);
  console.log('Status:', status2);
  console.log('Body:', JSON.stringify(body2, null, 2));
})();
