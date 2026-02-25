#!/usr/bin/env npx tsx
/**
 * Local test script for the LemonSqueezy webhook handler.
 * Run: npx tsx scripts/test-webhook.ts
 *
 * Requires env vars: LICENSE_PRIVATE_KEY, LEMONSQUEEZY_WEBHOOK_SECRET
 * Or: reads from local files for testing.
 */
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { EventEmitter } from 'events';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load private key from env or file
if (!process.env.LICENSE_PRIVATE_KEY) {
  const keyPath = path.resolve(__dirname, '../../playwright-smart-reporter/keys/private.pem');
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

import handler from '../api/webhook/lemonsqueezy';
import type { VercelRequest, VercelResponse } from '@vercel/node';

function createMockReq(payloadStr: string, signature: string): VercelRequest {
  const emitter = new EventEmitter();
  const req = Object.assign(emitter, {
    method: 'POST',
    headers: { 'x-signature': signature },
  });
  process.nextTick(() => {
    emitter.emit('data', Buffer.from(payloadStr));
    emitter.emit('end');
  });
  return req as unknown as VercelRequest;
}

function createMockRes(): { res: VercelResponse; getResult: () => { status: number; body: Record<string, unknown> | null } } {
  let responseStatus = 0;
  let responseBody: Record<string, unknown> | null = null;
  const res = {
    status(code: number) { responseStatus = code; return this; },
    json(body: Record<string, unknown>) { responseBody = body; return this; },
  } as unknown as VercelResponse;
  return { res, getResult: () => ({ status: responseStatus, body: responseBody }) };
}

function signPayload(payloadStr: string): string {
  const hmac = crypto.createHmac('sha256', webhookSecret);
  hmac.update(payloadStr);
  return hmac.digest('hex');
}

(async () => {
  // --- Test 1: Pro order ---
  const proPayload = {
    meta: { event_name: 'order_created', custom_data: null },
    data: {
      id: 'test-order-123',
      attributes: {
        user_email: 'test@example.com',
        user_name: 'Test User',
        first_order_item: { product_name: 'stagewright (pro)' },
        total: 900,
        currency: 'GBP',
        status: 'paid',
      },
    },
  };

  const proStr = JSON.stringify(proPayload);
  const proSig = signPayload(proStr);

  console.log('\n--- Test 1: Pro order ---');
  console.log('Customer:', proPayload.data.attributes.user_email);
  console.log('Product:', proPayload.data.attributes.first_order_item.product_name);

  const { res: res1, getResult: getResult1 } = createMockRes();
  await handler(createMockReq(proStr, proSig), res1);

  const result1 = getResult1();
  console.log('Status:', result1.status);
  console.log('Body:', JSON.stringify(result1.body, null, 2));

  if (result1.status === 200 && result1.body?.license_generated) {
    console.log('SUCCESS');
    if (!result1.body.email_sent) {
      console.log('(Set RESEND_API_KEY env var to test email delivery)');
    }
  } else {
    console.log('FAILED — check error above');
  }

  // --- Test 2: Starter order ---
  const starterPayload = {
    ...proPayload,
    data: {
      ...proPayload.data,
      id: 'test-order-456',
      attributes: {
        ...proPayload.data.attributes,
        first_order_item: { product_name: 'stagewright (starter)' },
        total: 500,
      },
    },
  };

  const starterStr = JSON.stringify(starterPayload);
  const starterSig = signPayload(starterStr);

  console.log('\n--- Test 2: Starter order ---');
  console.log('Product:', starterPayload.data.attributes.first_order_item.product_name);

  const { res: res2, getResult: getResult2 } = createMockRes();
  await handler(createMockReq(starterStr, starterSig), res2);

  const result2 = getResult2();
  console.log('Status:', result2.status);
  console.log('Body:', JSON.stringify(result2.body, null, 2));

  if (result2.status === 200 && result2.body?.license_generated) {
    console.log('SUCCESS');
  } else {
    console.log('FAILED — check error above');
  }
})();
