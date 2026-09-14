// NODE_PATH=/opt/node22/lib/node_modules node nocta/tools/crm-qa/prueba-pruebas.mjs
/* El modo pruebas: un pedido sin pasarela tiene que recorrer el circuito ENTERO y no contar
   como dinero en ningún sitio.

   Esto es exactamente lo que estaba roto: sin Stripe, el checkout guardaba el pedido con
   status = 'demo' y ahí se acababa. Ni cliente, ni email, ni recompensa, ni suscripción, ni
   evento de compra. El CRM enseñaba 0 clientes con la tienda entera montada.

   Se prueba contra lib/fulfil.js de verdad (el mismo módulo que se despliega), con la base de
   datos y el correo fingidos. Las dos mitades del contrato:
     1. un pedido de prueba HACE todo lo que hace uno real;
     2. y en ninguna de esas cosas se cuela como facturación. */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'https://falso.supabase.co';
process.env.SUPABASE_KEY = process.env.SUPABASE_KEY || 'clave-de-mentira';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.resolve(AQUI, '..', '..', 'web');

const { db } = await import(path.join(WEB, 'netlify/functions/lib/db.js'));
const { markPaid } = await import(path.join(WEB, 'netlify/functions/lib/fulfil.js'));

/* No se parchean mail.js ni wa.js: el espacio de nombres de un módulo ES es de sólo lectura, y
   además no hace falta. Sin RESEND_API_KEY ni token de WhatsApp, los dos hacen lo mismo que en
   producción cuando no están configurados: registran el intento en la tabla `messages` a través
   del objeto `db`, que sí es el que el test controla. Así que los correos se comprueban donde el
   CRM los enseña, que es justo donde importa que salgan bien. */
delete process.env.RESEND_API_KEY;

let fallos = 0, total = 0;
const ok = (n, cond, extra = '') => { total++; if (!cond) fallos++; console.log(`  ${cond ? '✓' : '✗'} ${n}${extra ? ' · ' + extra : ''}`); };

/* ── base fingida (mismo dialecto mínimo de PostgREST que el resto de pruebas) ── */
let BASE;
const correos = () => (BASE.messages || []).filter(m => m.channel === 'email');
const filtros = q => String(q || '').split('&').filter(x => x.includes('=')).map(x => {
  const [col, resto] = x.split('='); const [op, ...v] = resto.split('.');
  return { col, op, val: decodeURIComponent(v.join('.')) };
});
const casa = (fila, f) => f.every(({ col, op, val }) => {
  const v = fila[col];
  if (op === 'is') return val === 'null' ? (v == null) : String(!!v) === val;
  if (op === 'eq') return String(v ?? '') === val;
  return true;
});
function limpia() {
  BASE = { orders: [], customers: [], subscriptions: [], discounts: [], events: [], leads: [], carts: [], automations: [], content: [], messages: [] };
}
db.one = async (t, q) => (BASE[t] || []).find(r => casa(r, filtros(q))) || null;
db.select = async (t, q) => (BASE[t] || []).filter(r => casa(r, filtros(q)));
db.insert = async (t, rows) => { BASE[t] = BASE[t] || []; rows.forEach(r => BASE[t].push({ ...r })); return rows.map(r => ({ ...r })); };
db.update = async (t, q, patch) => { const f = filtros(q); const x = (BASE[t] || []).filter(r => casa(r, f)); x.forEach(r => Object.assign(r, patch)); return x.map(r => ({ ...r })); };
db.upsert = async (t, rows, clave) => {
  BASE[t] = BASE[t] || [];
  rows.forEach(r => { const i = BASE[t].findIndex(x => String(x[clave]) === String(r[clave])); if (i >= 0) BASE[t][i] = { ...r }; else BASE[t].push({ ...r }); });
  return rows.map(r => ({ ...r }));
};
db.rpc = async () => ({});
db.count = async () => 0;

const pedido = (extra = {}) => ({
  id: 'NCTEST' + Math.random().toString(36).slice(2, 6).toUpperCase(),
  status: 'pending', email: 'ana@ejemplo.es', name: 'Ana Ruiz', phone: null,
  items: [{ slug: 'parches-nariz', name: 'Parches de Nariz', qty: 2, unit: 16.95 }],
  subtotal: 33.9, discount: 0, shipping: 0, total: 33.9, code: null,
  mode: 'payment', utm: {}, vid: 'v1', sid: 's1', emails: {}, ...extra,
});

/* ── 1 · un pedido de prueba recorre el circuito entero ───────────────────────── */
console.log('\nUn pedido de prueba hace todo lo que hace uno real');
limpia();
{
  const o = pedido();
  BASE.orders.push({ ...o });
  const r = await markPaid({ ...o, demo: true }, { demo: true });
  const fila = BASE.orders[0];
  ok('el pedido queda en pagado, no en un estado muerto', fila.status === 'paid', fila.status);
  ok('y marcado como prueba', fila.demo === true);
  ok('se crea el cliente', BASE.customers.length === 1, BASE.customers.length + ' clientes');
  ok('el cliente hereda la marca de prueba', BASE.customers[0] && BASE.customers[0].demo === true);
  ok('sale el email de confirmación', correos().length === 1 && correos()[0].template === 'order_confirm', correos().length + ' correos');
  ok('el asunto avisa de que es una prueba', /^\[PRUEBA\]/.test(correos()[0].subject || ''), correos()[0].subject);
  ok('se emite la recompensa', BASE.discounts.length === 1, BASE.discounts.length + ' códigos');
  ok('la recompensa lleva la marca de prueba', BASE.discounts[0] && BASE.discounts[0].demo === true);
  ok('se apunta el evento de compra', BASE.events.some(e => e.ev === 'purchase'));
  ok('el evento de compra va marcado, para que el gráfico del día tampoco lo sume',
     (BASE.events.find(e => e.ev === 'purchase') || {}).d.demo === true);
  ok('la confirmación queda registrada para no repetirla', !!(r.emails && r.emails.confirm));
}

/* ── 2 · una mensualidad de prueba abre su plan igual ─────────────────────────── */
console.log('\nUna mensualidad de prueba abre el plan, para poder verlo y cancelarlo en el CRM');
limpia();
{
  const o = pedido({ mode: 'subscription', items: [{ slug: 'plan-mensual', name: 'Plan mensual', qty: 1, unit: 49, plan: 'month' }], total: 49, subtotal: 49 });
  BASE.orders.push({ ...o });
  await markPaid({ ...o, demo: true }, { demo: true });
  ok('se abre la suscripción sin Stripe', BASE.subscriptions.length === 1, BASE.subscriptions.length + '');
  const sub = BASE.subscriptions[0] || {};
  ok('con un id propio, no uno de Stripe inventado', String(sub.id || '').startsWith('demo_'), String(sub.id));
  ok('sin id de Stripe', sub.stripe_subscription == null);
  ok('marcada como prueba', sub.demo === true);
  ok('en activo, para poder probar la cancelación', sub.status === 'active');
}

/* ── 3 · un pedido real no arrastra nada de prueba ────────────────────────────── */
console.log('\nUn pedido real sigue siendo real');
limpia();
{
  const o = pedido();
  BASE.orders.push({ ...o });
  await markPaid(o, { stripe_payment_intent: 'pi_1', stripe_customer: 'cus_1' });
  const fila = BASE.orders[0];
  ok('no se marca como prueba', fila.demo !== true, String(fila.demo));
  ok('el cliente tampoco', BASE.customers[0].demo === false);
  ok('la recompensa tampoco', BASE.discounts[0].demo === false);
  ok('el evento de compra tampoco', (BASE.events.find(e => e.ev === 'purchase') || {}).d.demo === false);
  ok('el asunto del email no lleva aviso', !/PRUEBA/.test(correos()[0].subject || ''), correos()[0].subject);
}

/* ── 4 · quien prueba y luego compra de verdad deja de ser un cliente de prueba ── */
console.log('\nUn cliente deja de ser «de prueba» en cuanto compra de verdad, y no al revés');
limpia();
{
  const a = pedido();
  BASE.orders.push({ ...a });
  await markPaid({ ...a, demo: true }, { demo: true });
  ok('empieza siendo de prueba', BASE.customers[0].demo === true);

  const b = pedido({ id: 'NCREAL1' });
  BASE.orders.push({ ...b });
  await markPaid(b, {});
  ok('tras la compra real deja de serlo', BASE.customers[0].demo === false);
  ok('y se le cuentan los dos pedidos', Number(BASE.customers[0].orders_count) === 2, String(BASE.customers[0].orders_count));

  const c = pedido({ id: 'NCPRU2' });
  BASE.orders.push({ ...c });
  await markPaid({ ...c, demo: true }, { demo: true });
  ok('una prueba posterior NO lo devuelve a «de prueba»', BASE.customers[0].demo === false);
}

/* ── 5 · no se repite el trabajo si el pedido ya estaba cerrado ───────────────── */
console.log('\nEl circuito no se ejecuta dos veces sobre el mismo pedido');
limpia();
{
  const o = pedido();
  BASE.orders.push({ ...o });
  const r1 = await markPaid({ ...o, demo: true }, { demo: true });
  const antes = { correos: correos().length, dtos: BASE.discounts.length, ev: BASE.events.filter(e => e.ev === 'purchase').length };
  await markPaid({ ...BASE.orders[0], emails: r1.emails }, { demo: true });
  ok('no se manda un segundo email', correos().length === antes.correos, `${correos().length} vs ${antes.correos}`);
  ok('no se emite una segunda recompensa', BASE.discounts.length === antes.dtos, `${BASE.discounts.length} vs ${antes.dtos}`);
  ok('no se duplica el evento de compra', BASE.events.filter(e => e.ev === 'purchase').length === antes.ev);
}

console.log(`\n${total - fallos}/${total} comprobaciones`);
process.exit(fallos ? 1 : 0);
