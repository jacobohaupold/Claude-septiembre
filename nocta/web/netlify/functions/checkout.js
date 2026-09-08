// Crea la sesión de pago. Con STRIPE_SECRET_KEY configurada usa Stripe Checkout (tarjeta, Bizum, Klarna, PayPal según tu cuenta Stripe).
// Sin clave: modo demo — registra el pedido y devuelve la URL de gracias (para probar el funnel completo antes de tener pasarela).
import { getStore } from '@netlify/blobs';
import { PRODUCTS, SHIPPING } from './catalog.js';

export default async (req) => {
  if (req.method !== 'POST') return new Response('method', { status: 405 });
  const body = await req.json();
  const items = (body.items || []).map(i => { const p = PRODUCTS[i.slug]; if (!p) return null; const opt = String(i.opt || '').replace(/[^\p{L}\p{N} +·,.-]/gu, '').slice(0, 40); return { slug: i.slug, name: p.name + (opt ? ' · ' + opt : ''), opt, qty: p.plan ? 1 : Math.max(1, Math.min(10, Number(i.qty) || 1)), unit: p.plan ? p.price : (i.sub ? p.sub : p.price), sub: !p.plan && !!i.sub, plan: p.plan || null }; }).filter(Boolean);
  const recurring = items.some(i => i.plan || i.sub);
  if (!items.length) return json({ error: 'empty' }, 400);
  let subtotal = items.reduce((a, i) => a + i.unit * i.qty, 0);
  let discount = 0; const code = String(body.code || '').toUpperCase();
  const CODES = { HOLA10: 10, TIKTOK10: 10, BIENVENIDA15: 15 };
  if (CODES[code]) discount = +(subtotal * CODES[code] / 100).toFixed(2);
  const n = items.reduce((a, i) => a + i.qty, 0);
  const shipping = (recurring || subtotal - discount >= SHIPPING.freeFrom || n >= 2) ? 0 : SHIPPING.base; /* planes y suscripciones: envío gratis siempre */
  const total = +(subtotal - discount + shipping).toFixed(2);
  const orderId = 'NC' + Date.now().toString(36).toUpperCase();
  const order = { id: orderId, t: Date.now(), items, subtotal, discount, code, shipping, total, email: body.email, name: body.name, address: body.address, pay: body.pay, vid: body.vid, sid: body.sid, utm: body.utm || {}, status: 'pending', upsell: null, mode: recurring ? 'subscription' : 'payment' };
  const orders = getStore({ name: 'orders', consistency: 'strong' });
  await orders.setJSON(orderId, order);

  const key = process.env.STRIPE_SECRET_KEY;
  const site = process.env.URL || new URL(req.url).origin;
  if (!key) { order.status = 'demo'; await orders.setJSON(orderId, order); return json({ url: `${site}/gracias.html?o=${orderId}&demo=1`, orderId, total }); }
  // Stripe Checkout Session (API REST, sin SDK)
  const params = new URLSearchParams();
  params.set('mode', recurring ? 'subscription' : 'payment'); params.set('success_url', `${site}/gracias.html?o=${orderId}`); params.set('cancel_url', `${site}/checkout.html?cancel=1`);
  if (body.email) params.set('customer_email', body.email); params.set('client_reference_id', orderId); params.set('locale', 'es');
  (recurring ? ['card'] : ['card', 'bizum', 'klarna', 'paypal']).forEach((m, i) => params.set(`payment_method_types[${i}]`, m));
  items.forEach((it, i) => { params.set(`line_items[${i}][quantity]`, it.qty); params.set(`line_items[${i}][price_data][currency]`, 'eur'); params.set(`line_items[${i}][price_data][unit_amount]`, Math.round(it.unit * 100)); params.set(`line_items[${i}][price_data][product_data][name]`, it.name + (it.plan ? (it.plan === 'week' ? ' (cada semana)' : ' (cada mes)') : (it.sub ? ' (suscripción, cada 30 días)' : '')));
    if (it.plan) { params.set(`line_items[${i}][price_data][recurring][interval]`, it.plan); }
    else if (it.sub) { params.set(`line_items[${i}][price_data][recurring][interval]`, 'day'); params.set(`line_items[${i}][price_data][recurring][interval_count]`, '30'); } });
  if (shipping) { const i = items.length; params.set(`line_items[${i}][quantity]`, 1); params.set(`line_items[${i}][price_data][currency]`, 'eur'); params.set(`line_items[${i}][price_data][unit_amount]`, Math.round(shipping * 100)); params.set(`line_items[${i}][price_data][product_data][name]`, 'Envío'); }
  if (discount) { params.set('discounts[0][coupon]', await coupon(key, discount)); }
  params.set('shipping_address_collection[allowed_countries][0]', 'ES'); params.set('shipping_address_collection[allowed_countries][1]', 'PT');
  params.set('metadata[orderId]', orderId);
  const r = await fetch('https://api.stripe.com/v1/checkout/sessions', { method: 'POST', headers: { authorization: 'Bearer ' + key, 'content-type': 'application/x-www-form-urlencoded' }, body: params });
  const s = await r.json();
  if (!r.ok) return json({ error: s.error && s.error.message }, 500);
  order.stripe_session = s.id; await orders.setJSON(orderId, order);
  return json({ url: s.url, orderId, total });
};
async function coupon(key, amount) {
  const p = new URLSearchParams({ amount_off: Math.round(amount * 100), currency: 'eur', duration: 'once', name: 'Descuento NOCTA' });
  const r = await fetch('https://api.stripe.com/v1/coupons', { method: 'POST', headers: { authorization: 'Bearer ' + key, 'content-type': 'application/x-www-form-urlencoded' }, body: p });
  return (await r.json()).id;
}
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json' } });
export const config = { path: '/api/checkout' };
