// GET  /api/order?id=…          → datos del pedido (página de gracias)
// POST /api/order {id, action:'upsell'} → cobra el upsell post-compra con el método guardado (off-session) o lo registra en demo
// POST /api/stripe-webhook      → firma verificada; pagos, suscripciones, renovaciones, reembolsos, fallos
import { db, dbOk, now, esc, setting, logMessage } from './lib/db.js';
import { serverProducts } from './lib/catalog.js';
import { stripe, stripeConfig, verifyStripeSignature } from './lib/stripe.js';
import { sendEmail, tpl } from './lib/mail.js';
import { waSend, fill } from './lib/wa.js';
import { json } from './lib/auth.js';

const getOrder = async id => { if (!id || !dbOk()) return null; try { return await db.one('orders', 'id=eq.' + esc(id)); } catch (e) { return null; } };
const patch = async (id, p) => { try { const r = await db.update('orders', 'id=eq.' + esc(id), { ...p, updated_at: now() }); return r && r[0]; } catch (e) { return null; } };
async function automation(key) { try { const r = await db.one('automations', 'key=eq.' + key); return r && r.enabled !== false ? (r.config || {}) : null; } catch (e) { return null; } }

export async function markPaid(o, extra = {}) {
  if (!o) return o;
  if (!extra.force && ['paid', 'shipped', 'delivered'].includes(o.status) && o.emails && o.emails.confirm) return o;
  const { force, ...ex } = extra; extra = ex;
  const upd = await patch(o.id, { status: o.status === 'shipped' || o.status === 'delivered' ? o.status : 'paid', ...extra }) || { ...o, status: 'paid', ...extra };
  // cliente
  if (upd.email) {
    try {
      const c = await db.one('customers', 'email=eq.' + esc(upd.email));
      const row = { email: upd.email, name: upd.name || (c && c.name) || null, phone: upd.phone || (c && c.phone) || null, address: upd.address || (c && c.address) || null, orders_count: (c ? Number(c.orders_count) : 0) + 1, total_spent: +(((c ? Number(c.total_spent) : 0) + Number(upd.total)).toFixed(2)), first_order_at: (c && c.first_order_at) || now(), last_order_at: now(), stripe_customer: extra.stripe_customer || (c && c.stripe_customer) || null, tags: [...new Set([...(c && c.tags || []), ...(upd.mode === 'subscription' ? ['plan'] : []), ...(upd.code ? ['code:' + upd.code] : [])])] };
      await db.upsert('customers', [row], 'email');
      await db.update('leads', 'email=eq.' + esc(upd.email), { status: 'customer', last_seen: now() }).catch(() => { });
      await db.update('carts', 'email=eq.' + esc(upd.email), { recovered: true }).catch(() => { });
    } catch (e) { }
  }
  // suscripción
  if (upd.mode === 'subscription' && extra.stripe_subscription) {
    const plan = (upd.items || []).find(i => i.plan) || (upd.items || [])[0];
    try { await db.upsert('subscriptions', [{ id: extra.stripe_subscription, order_id: upd.id, email: upd.email, name: upd.name, plan_slug: plan ? plan.slug : 'sub', zones: plan && plan.opt || null, status: 'active', interval: plan && plan.plan ? plan.plan : '30d', price: Number(upd.total), stripe_customer: extra.stripe_customer || null, stripe_subscription: extra.stripe_subscription, updated_at: now() }], 'id'); } catch (e) { }
  }
  // confirmación
  const emails = { ...(upd.emails || {}) };
  if (upd.email && !emails.confirm) { try { const m = tpl.orderConfirm(upd); const r = await sendEmail({ to: upd.email, ...m, template: 'order_confirm', tags: [{ name: 'flow', value: 'order' }], meta: { order: upd.id } }); emails.confirm = now(); } catch (e) { } }
  const wa = await automation('order_whatsapp');
  if (wa && upd.phone && !emails.wa_confirm) { const r = await waSend({ to: upd.phone, kind: 'order_confirm', text: fill(wa.text || 'Hola {nombre} 🌙 Tu pedido NOCTA {order} está confirmado ({total} €). Sale en 24-48 h y te aviso por aquí con el seguimiento.', { nombre: upd.name ? String(upd.name).split(' ')[0] : '', order: upd.id, total: Number(upd.total).toFixed(2).replace('.', ',') }), meta: { order: upd.id } }); if (!r.error) emails.wa_confirm = now(); }
  await patch(upd.id, { emails });
  try { await db.insert('events', [{ t: now(), ev: 'purchase', vid: upd.vid, sid: upd.sid, path: '/gracias.html', utm: upd.utm || {}, d: { value: upd.total, order: upd.id, items: (upd.items || []).map(i => ({ slug: i.slug, qty: i.qty })) } }]); } catch (e) { }
  return { ...upd, emails };
}

export default async (req) => {
  const url = new URL(req.url);
  if (url.pathname.endsWith('stripe-webhook')) {
    const raw = await req.text(); const cfg = await stripeConfig();
    if (!(await verifyStripeSignature(raw, req.headers.get('stripe-signature'), cfg.webhookSecret))) return new Response('bad signature', { status: 400 });
    let evt; try { evt = JSON.parse(raw); } catch (e) { return new Response('bad', { status: 400 }); }
    const obj = evt.data && evt.data.object || {};
    try {
      switch (evt.type) {
        case 'checkout.session.completed': case 'checkout.session.async_payment_succeeded': {
          const id = obj.client_reference_id || (obj.metadata || {}).orderId; const o = await getOrder(id); if (!o) break;
          if (obj.payment_status === 'paid' || obj.mode === 'subscription') {
            const extra = { stripe_payment_intent: obj.payment_intent || null, stripe_customer: typeof obj.customer === 'string' ? obj.customer : null, stripe_subscription: typeof obj.subscription === 'string' ? obj.subscription : null };
            if (!o.email && obj.customer_details && obj.customer_details.email) extra.email = obj.customer_details.email.toLowerCase();
            if (!o.name && obj.customer_details && obj.customer_details.name) extra.name = obj.customer_details.name;
            if (!o.phone && obj.customer_details && obj.customer_details.phone) extra.phone = obj.customer_details.phone;
            const sd = obj.shipping_details || obj.customer_details; if (sd && sd.address && !(o.address && o.address.line)) extra.address = { line: [sd.address.line1, sd.address.line2].filter(Boolean).join(', '), zip: sd.address.postal_code, city: sd.address.city, country: sd.address.country, name: sd.name };
            await markPaid({ ...o, ...extra }, extra);
          }
          break; }
        case 'checkout.session.async_payment_failed': case 'checkout.session.expired': { const id = obj.client_reference_id || (obj.metadata || {}).orderId; const o = await getOrder(id); if (o && o.status === 'pending') await patch(id, { status: evt.type.endsWith('expired') ? 'abandoned' : 'failed' }); break; }
        case 'invoice.paid': {
          if (obj.billing_reason === 'subscription_cycle' && obj.subscription) {
            const sub = await db.one('subscriptions', 'id=eq.' + esc(obj.subscription)); if (!sub) break;
            const line = obj.lines && obj.lines.data && obj.lines.data[0]; const end = line && line.period && line.period.end ? new Date(line.period.end * 1000).toISOString() : null;
            await db.update('subscriptions', 'id=eq.' + esc(sub.id), { status: 'active', current_period_end: end, updated_at: now() });
            const base = await getOrder(sub.order_id); const id = 'NR' + Date.now().toString(36).toUpperCase();
            const o = { id, status: 'paid', email: sub.email, name: sub.name, phone: base && base.phone, address: base && base.address, items: base ? base.items : [{ slug: sub.plan_slug, name: sub.plan_slug, qty: 1, unit: sub.price }], subtotal: obj.amount_paid / 100, discount: 0, shipping: 0, total: obj.amount_paid / 100, currency: 'eur', pay: 'stripe', mode: 'renewal', stripe_payment_intent: obj.payment_intent, stripe_customer: obj.customer, stripe_subscription: obj.subscription, utm: {}, notes: 'Renovación de ' + sub.plan_slug, emails: {} };
            await db.insert('orders', [o]);
            if (o.email) { try { const m = tpl.orderConfirm(o); await sendEmail({ to: o.email, ...m, subject: 'Tu plan NOCTA se ha renovado · pedido ' + id, template: 'renewal', meta: { order: id } }); } catch (e) { } }
          }
          break; }
        case 'invoice.payment_failed': if (obj.subscription) await db.update('subscriptions', 'id=eq.' + esc(obj.subscription), { status: 'past_due', updated_at: now() }); break;
        case 'customer.subscription.updated': { const end = obj.current_period_end ? new Date(obj.current_period_end * 1000).toISOString() : null; await db.update('subscriptions', 'id=eq.' + esc(obj.id), { status: obj.cancel_at_period_end ? 'cancelling' : obj.status, current_period_end: end, updated_at: now() }); break; }
        case 'customer.subscription.deleted': await db.update('subscriptions', 'id=eq.' + esc(obj.id), { status: 'canceled', updated_at: now() }); break;
        case 'charge.refunded': { const pi = obj.payment_intent; if (pi) { const o = await db.one('orders', 'stripe_payment_intent=eq.' + esc(pi)); if (o) await patch(o.id, { status: obj.amount_refunded >= obj.amount ? 'refunded' : 'partial_refund', notes: ((o.notes || '') + '\nReembolso Stripe ' + (obj.amount_refunded / 100).toFixed(2) + ' €').trim() }); } break; }
        case 'charge.dispute.created': { const pi = obj.payment_intent; if (pi) { const o = await db.one('orders', 'stripe_payment_intent=eq.' + esc(pi)); if (o) await patch(o.id, { status: 'disputed' }); } break; }
      }
    } catch (e) { console.error('webhook', evt.type, e.message); }
    return new Response('ok');
  }
  if (req.method === 'GET') {
    const id = url.searchParams.get('id'); const o = await getOrder(id);
    if (!o) return json({ error: 'not found' }, 404);
    // Sin webhook (o antes de que llegue): confirma la sesión directamente contra Stripe.
    if (o.status === 'pending' && o.stripe_session && url.searchParams.get('s') === o.stripe_session) {
      try { const cfg = await stripeConfig(); const s = await stripe('checkout/sessions/' + o.stripe_session, null, { method: 'GET', key: cfg.secret, account: cfg.account });
        if (s.payment_status === 'paid' || s.mode === 'subscription') { const extra = { stripe_payment_intent: s.payment_intent || null, stripe_customer: typeof s.customer === 'string' ? s.customer : null, stripe_subscription: typeof s.subscription === 'string' ? s.subscription : null }; Object.assign(o, await markPaid(o, extra)); } } catch (e) { }
    }
    return json({ id: o.id, items: o.items, total: o.total, status: o.status, upsell: o.upsell, email: o.email, name: o.name, mode: o.mode });
  }
  let body; try { body = await req.json(); } catch (e) { return json({ error: 'bad' }, 400); }
  const o = await getOrder(body.id);
  if (!o) return json({ error: 'not found' }, 404);
  if (body.action === 'upsell' && !o.upsell) {
    const { products } = await serverProducts(); const p = products['upsell-exfoliante']; if (!p) return json({ error: 'unavailable' }, 400);
    const up = { slug: p.slug, name: p.name, price: p.price, t: now(), status: 'demo' };
    const cfg = await stripeConfig();
    if (cfg.secret && o.stripe_payment_intent && o.stripe_customer) {
      try {
        const pi = await stripe('payment_intents/' + o.stripe_payment_intent, null, { method: 'GET', key: cfg.secret, account: cfg.account });
        const pm = pi.payment_method; if (!pm) throw new Error('sin método guardado');
        const r = await stripe('payment_intents', { amount: Math.round(p.price * 100), currency: 'eur', customer: o.stripe_customer, payment_method: pm, off_session: 'true', confirm: 'true', description: 'NOCTA upsell ' + o.id, metadata: { orderId: o.id, upsell: p.slug } }, { key: cfg.secret, account: cfg.account });
        up.status = r.status === 'succeeded' ? 'paid' : r.status; up.payment_intent = r.id;
      } catch (e) { return json({ error: 'No se pudo cobrar: ' + e.message }, 402); }
    } else if (cfg.secret) return json({ error: 'Pago no disponible para este pedido' }, 400);
    const items = [...(o.items || []), { slug: p.slug, name: p.name, qty: 1, unit: p.price, upsell: true }];
    const total = +(Number(o.total) + p.price).toFixed(2);
    await patch(o.id, { upsell: up, items, total, subtotal: +(Number(o.subtotal) + p.price).toFixed(2) });
    return json({ ok: true, total });
  }
  return json({ ok: false });
};
export const config = { path: ['/api/order', '/api/stripe-webhook'] };
