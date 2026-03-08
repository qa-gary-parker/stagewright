import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Polar } from '@polar-sh/sdk';

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN ?? '',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const productId = req.query.product as string | undefined;
  if (!productId) {
    return res.status(400).json({ error: 'Missing product query parameter' });
  }

  try {
    const checkout = await polar.checkouts.create({
      products: [productId],
      successUrl: process.env.POLAR_SUCCESS_URL,
    });

    return res.redirect(303, checkout.url);
  } catch (err) {
    console.error('Polar checkout error:', (err as Error).message);
    return res.status(502).json({ error: 'Failed to create checkout session' });
  }
}
