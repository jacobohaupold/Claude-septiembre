// GET /api/order?id=…  → datos del pedido para la página de gracias.
// POST /api/order {id, action:'upsell'} → añade el upsell post-compra (one-click) al pedido.
// POST /api/stripe-webhook → marca el pedido como pagado cuando Stripe confirma (configura STRIPE_WEBHOOK_SECRET).
import { getStore } from '@netlify/blobs';
import { PRODUCTS } from './catalog.js';

export default async (req) => {
  const orders = getStore({ name: 'orders', consistency: 'strong' });
  const url = new URL(req.url);
  if (url.pathname.endsWith('stripe-webhook')) {
    const raw = await req.text(); let evt;
    try { evt = JSON.parse(raw); } catch (e) { return new Response('bad', { status: 400 }); }
    if (evt.type === 'checkout.session.completed') { const id = evt.data.object.client_reference_id || (evt.data.object.metadata || {}).orderId; const o = id && await orders.get(id, { type: 'json' }); if (o) { o.status = 'paid'; o.paid_t = Date.now(); o.stripe_payment = evt.data.object.payment_intent; await orders.setJSON(id, o); } }
    return new Response('ok');
  }
  if (req.method === 'GET') {
    const id = url.searchParams.get('id'); const o = id && await orders.get(id, { type: 'json' });
    if (!o) return json({ error: 'not found' }, 404);
    return json({ id: o.id, items: o.items, total: o.total, status: o.status, upsell: o.upsell, email: o.email, name: o.name });
  }
  const body = await req.json(); const o = body.id && await orders.get(body.id, { type: 'json' });
  if (!o) return json({ error: 'not found' }, 404);
  if (body.action === 'upsell' && !o.upsell) {
    const p = PRODUCTS['upsell-exfoliante']; o.upsell = { slug: 'exfoliante-salicilico', name: p.name, price: p.price, t: Date.now(), status: process.env.STRIPE_SECRET_KEY ? 'to_charge' : 'demo' };
    o.total = +(o.total + p.price).toFixed(2); await orders.setJSON(o.id, o);
    // Con Stripe real: cobrar al payment method guardado (setup_future_usage) — ver README para activarlo.
    return json({ ok: true, total: o.total });
  }
  return json({ ok: false });
};
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json' } });
export const config = { path: ['/api/order', '/api/stripe-webhook'] };
