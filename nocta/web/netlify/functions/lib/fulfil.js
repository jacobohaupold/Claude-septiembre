// Lo que pasa DESPUÉS de que un pedido se da por bueno, en un solo sitio.
//
// Vivía dentro de order.js, que es la función del webhook de Stripe. Eso significaba que sin
// Stripe no se ejecutaba nada: el checkout en modo pruebas guardaba el pedido y se acababa ahí.
// Ni cliente, ni email de confirmación, ni recompensa, ni suscripción, ni evento de compra. Con
// la tienda entera montada, el CRM enseñaba 0 clientes y 0 suscripciones y no había manera de
// probar el circuito completo antes de abrir la pasarela.
//
// Al sacarlo aquí, el checkout y el webhook llaman a lo mismo. Un pedido de prueba recorre el
// circuito idéntico a uno real; lo único distinto es que lleva demo = true y por tanto no cuenta
// como dinero en ningún sitio (lo filtra admin_stats). El día que se conecte Stripe no cambia una
// línea: simplemente dejan de nacer pedidos con esa marca.
import { db, dbOk, now, esc } from './db.js';
import { sendEmail, tpl } from './mail.js';
import { waSend, fill } from './wa.js';
import { issueReward, redeemIfReward } from './rewards.js';

const patch = async (id, p) => { try { const r = await db.update('orders', 'id=eq.' + esc(id), { ...p, updated_at: now() }); return r && r[0]; } catch (e) { return null; } };
async function automation(key) { try { const r = await db.one('automations', 'key=eq.' + key); return r && r.enabled !== false ? (r.config || {}) : null; } catch (e) { return null; } }

export async function markPaid(o, extra = {}) {
  if (!o) return o;
  if (!extra.force && ['paid', 'shipped', 'delivered'].includes(o.status) && o.emails && o.emails.confirm) return o;
  const { force, ...ex } = extra; extra = ex;
  // La prueba es una propiedad del pedido, no un estado: un pedido de prueba también pasa por
  // pagado → enviado → entregado. Si el pedido ya nació marcado, la marca se respeta.
  const demo = extra.demo === true || o.demo === true;
  if (demo) extra = { ...extra, demo: true };
  const upd = await patch(o.id, { status: o.status === 'shipped' || o.status === 'delivered' ? o.status : 'paid', ...extra }) || { ...o, status: 'paid', ...extra };
  // cliente
  if (upd.email) {
    try {
      const c = await db.one('customers', 'email=eq.' + esc(upd.email));
      const row = { email: upd.email, name: upd.name || (c && c.name) || null, phone: upd.phone || (c && c.phone) || null, address: upd.address || (c && c.address) || null, orders_count: (c ? Number(c.orders_count) : 0) + 1, total_spent: +(((c ? Number(c.total_spent) : 0) + Number(upd.total)).toFixed(2)), first_order_at: (c && c.first_order_at) || now(), last_order_at: now(), stripe_customer: extra.stripe_customer || (c && c.stripe_customer) || null, demo: c ? (c.demo === true && demo) : demo, tags: [...new Set([...(c && c.tags || []), ...(upd.mode === 'subscription' ? ['plan'] : []), ...(upd.code ? ['code:' + upd.code] : [])])] };
      // Un cliente deja de ser «de prueba» en cuanto hace una compra de verdad, y no al revés.
      await db.upsert('customers', [row], 'email');
      await db.update('leads', 'email=eq.' + esc(upd.email), { status: 'customer', last_seen: now() }).catch(() => { });
      await db.update('carts', 'email=eq.' + esc(upd.email), { recovered: true }).catch(() => { });
    } catch (e) { }
  }
  // suscripción · con Stripe la abre el webhook con su id; sin Stripe se abre igual con un id
  // propio, para que el plan se pueda ver, probar y cancelar desde el CRM antes de cobrar nada.
  const idSub = extra.stripe_subscription || (demo && upd.mode === 'subscription' ? 'demo_' + upd.id : null);
  if (upd.mode === 'subscription' && idSub) {
    const plan = (upd.items || []).find(i => i.plan) || (upd.items || [])[0];
    try { await db.upsert('subscriptions', [{ id: idSub, order_id: upd.id, email: upd.email, name: upd.name, plan_slug: plan ? plan.slug : 'sub', zones: plan && plan.opt || null, status: 'active', interval: plan && plan.plan ? plan.plan : '30d', price: Number(upd.total), stripe_customer: extra.stripe_customer || null, stripe_subscription: extra.stripe_subscription || null, demo, updated_at: now() }], 'id'); } catch (e) { }
  }
  // Recompensa: primero se cierra la que traía el pedido (si pagó con una) y después se emite la
  // del siguiente. En ese orden, porque al revés el «días hasta canjear» mediría contra la recién
  // emitida y saldría siempre cero. Y las dos ANTES del email: si se emite después, el código no
  // entra en el correo y el cliente sólo lo ve si vuelve a la página de gracias.
  try { await redeemIfReward(upd); } catch (e) { }
  let recompensa = null;
  try { recompensa = await issueReward(upd); } catch (e) { }
  // confirmación
  const emails = { ...(upd.emails || {}) };
  if (upd.email && !emails.confirm) { try { const m = tpl.orderConfirm(upd, recompensa); await sendEmail({ to: upd.email, ...m, template: 'order_confirm', tags: [{ name: 'flow', value: 'order' }], meta: { order: upd.id, demo } }); emails.confirm = now(); } catch (e) { } }
  const wa = await automation('order_whatsapp');
  if (wa && upd.phone && !emails.wa_confirm) { const r = await waSend({ to: upd.phone, kind: 'order_confirm', text: fill(wa.text || 'Hola {nombre} 🌙 Tu pedido NOCTA {order} está confirmado ({total} €). Sale en 24-48 h y te aviso por aquí con el seguimiento.', { nombre: upd.name ? String(upd.name).split(' ')[0] : '', order: upd.id, total: Number(upd.total).toFixed(2).replace('.', ',') }), meta: { order: upd.id } }); if (!r.error) emails.wa_confirm = now(); }
  await patch(upd.id, { emails });
  // El evento de compra lleva la marca para que el gráfico del día tampoco cuente las pruebas
  // como facturación: si la caja grande dice 0 € y la línea de abajo sube, el CRM se contradice.
  try { await db.insert('events', [{ t: now(), ev: 'purchase', vid: upd.vid, sid: upd.sid, path: '/gracias.html', utm: upd.utm || {}, d: { value: upd.total, order: upd.id, demo, items: (upd.items || []).map(i => ({ slug: i.slug, qty: i.qty })) } }]); } catch (e) { }
  return { ...upd, emails, demo };
}
