// POST /api/checkout → crea el pedido (Supabase) y la sesión de Stripe Checkout (tarjeta, Apple Pay, Google Pay, Bizum, Klarna, PayPal
// según los métodos activos en tu panel de Stripe). Sin clave de Stripe: modo demo (registra el pedido y va a /gracias).
import { db, dbOk, now, esc } from './lib/db.js';
import { serverProducts, getDiscount, discountAmount, planPrice } from './lib/catalog.js';
import { stripe, stripeConfig } from './lib/stripe.js';
import { json } from './lib/auth.js';

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'method' }, 405);
  let body; try { body = await req.json(); } catch (e) { return json({ error: 'bad' }, 400); }
  const { products: PRODUCTS, shipping: SHIPPING } = await serverProducts();
  const items = (body.items || []).map(i => { const p = PRODUCTS[i.slug]; if (!p) return null; if (p.stock != null && p.stock <= 0) return null;
    const opt = String(i.opt || '').replace(/[^\p{L}\p{N} +·,.-]/gu, '').slice(0, 40);
    return { slug: p.slug, name: p.name + (opt ? ' · ' + opt : ''), opt, qty: p.plan ? 1 : Math.max(1, Math.min(10, Number(i.qty) || 1)), unit: p.plan ? planPrice(p, opt) : (i.sub ? p.sub : p.price), sub: !p.plan && !!i.sub, plan: p.plan || null, image: p.image || null }; }).filter(Boolean);
  if (!items.length) return json({ error: 'empty' }, 400);
  const recurring = items.some(i => i.plan || i.sub);
  const subtotal = +items.reduce((a, i) => a + i.unit * i.qty, 0).toFixed(2);
  const d = await getDiscount(body.code, subtotal); const discount = discountAmount(d, subtotal); const code = d && !d.error ? d.code : '';
  const n = items.reduce((a, i) => a + i.qty, 0);
  const shipping = (recurring || subtotal - discount >= Number(SHIPPING.freeFrom) || n >= 2) ? 0 : Number(SHIPPING.base);
  const total = +(subtotal - discount + shipping).toFixed(2);
  const orderId = 'NC' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 4).toUpperCase();
  const email = String(body.email || '').trim().toLowerCase() || null;
  const order = { id: orderId, status: 'pending', email, name: body.name || null, phone: (body.address && body.address.phone) || body.phone || null, address: body.address || null, items, subtotal, discount, code: code || null, shipping, total, currency: 'eur', pay: body.pay || null, mode: recurring ? 'subscription' : 'payment', utm: body.utm || {}, vid: body.vid || null, sid: body.sid || null, upsell: null, emails: {} };
  const save = async (patch) => { if (!dbOk()) return; try { if (patch) await db.update('orders', 'id=eq.' + orderId, { ...patch, updated_at: now() }); else await db.insert('orders', [order]); } catch (e) { console.error('order save', e.message); } };
  await save();
  if (email && dbOk()) { try { await db.upsert('carts', [{ vid: String(body.sid || body.vid || orderId), email, name: order.name, items: items.map(i => ({ slug: i.slug, qty: i.qty, sub: i.sub, opt: i.opt })), total, updated_at: now() }], 'vid'); } catch (e) { } }

  const cfg = await stripeConfig();
  const site = process.env.SITE_URL || process.env.URL || new URL(req.url).origin;
  if (!cfg.secret) { await save({ status: 'demo' }); return json({ url: `${site}/gracias.html?o=${orderId}&demo=1`, orderId, total, demo: true }); }

  const params = {
    mode: recurring ? 'subscription' : 'payment', success_url: `${site}/gracias.html?o=${orderId}&s={CHECKOUT_SESSION_ID}`, cancel_url: `${site}/checkout.html?cancel=1`,
    client_reference_id: orderId, locale: 'es', metadata: { orderId, code: code || '' },
    line_items: items.map(it => ({ quantity: it.qty, price_data: { currency: 'eur', unit_amount: Math.round(it.unit * 100), product_data: { name: it.name + (it.plan ? (it.plan === 'week' ? ' (cada semana)' : ' (cada mes)') : (it.sub ? ' (suscripción, cada 30 días)' : '')), ...(it.image ? { images: [site + it.image] } : {}) }, ...(it.plan ? { recurring: { interval: it.plan } } : it.sub ? { recurring: { interval: 'day', interval_count: 30 } } : {}) } })),
    shipping_address_collection: { allowed_countries: ['ES', 'PT'] }, phone_number_collection: { enabled: true },
    ...(email ? { customer_email: email } : {})
  };
  const s = (await import('./lib/db.js').then(m => m.setting('stripe', null))) || {};
  if (Array.isArray(s.methods) && s.methods.length) params.payment_method_types = recurring ? s.methods.filter(m => ['card', 'sepa_debit', 'link', 'paypal'].includes(m)) : s.methods;
  if (!recurring) { params.customer_creation = 'always'; params.payment_intent_data = { setup_future_usage: 'off_session', metadata: { orderId } }; params.invoice_creation = { enabled: true }; }
  else params.subscription_data = { metadata: { orderId, plan: items.find(i => i.plan) ? items.find(i => i.plan).slug : 'sub' } };
  if (shipping) params.line_items.push({ quantity: 1, price_data: { currency: 'eur', unit_amount: Math.round(shipping * 100), product_data: { name: 'Envío 24-48 h' } } });
  if (discount) { try { const c = await stripe('coupons', { amount_off: Math.round(discount * 100), currency: 'eur', duration: recurring ? 'forever' : 'once', name: 'Código ' + code }, { key: cfg.secret, account: cfg.account }); params.discounts = [{ coupon: c.id }]; } catch (e) { } }
  try {
    const sess = await stripe('checkout/sessions', params, { key: cfg.secret, account: cfg.account });
    await save({ stripe_session: sess.id, pay: body.pay || 'stripe' });
    if (code && dbOk()) { try { await db.rpc('increment_discount_use', { p_code: code }); } catch (e) { } }
    return json({ url: sess.url, orderId, total });
  } catch (e) {
    await save({ status: 'error', notes: 'Stripe: ' + e.message });
    return json({ error: e.message }, 502);
  }
};
export const config = { path: '/api/checkout' };
