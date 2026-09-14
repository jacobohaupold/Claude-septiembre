// Recompensa post-compra: cada pedido pagado genera un código PERSONAL de un solo uso para la
// siguiente compra, y el CRM puede contar exactamente qué ha pasado con cada uno.
//
// Por qué vive dentro de `discounts` y no en su propia tabla: la validación de un código
// (vigencia, mínimo, usos, activo) ya está escrita una vez en getDiscount(). Una tabla aparte
// obliga a repetirla, y dos copias de una regla de dinero terminan divergiendo siempre.
import { db, dbOk, now, esc, content } from './db.js';

export const RECOMPENSA_DEF = {
  enabled: true,
  pct: 25,          // lo que se descuenta en la SIGUIENTE compra
  days: 30,         // ventana de caducidad
  min_total: 0,     // pedido mínimo para poder usarla
  prefix: 'VUELVE', // el código queda VUELVE-XXXX
  titulo: 'Tu recompensa por esta compra',
  texto: 'Guárdalo: se aplica solo la próxima vez que entres. Es tuyo y sólo se puede usar una vez.',
};

export async function rewardConfig() {
  const v = await content('reward', null);
  const c = { ...RECOMPENSA_DEF, ...(v || {}) };
  c.pct = Math.max(0, Math.min(90, Number(c.pct) || 0));
  c.days = Math.max(1, Math.min(365, Number(c.days) || 30));
  c.min_total = Math.max(0, Number(c.min_total) || 0);
  return c;
}

// Sin vocales ni caracteres que se confunden al dictarlos por teléfono o leerlos de una pantalla:
// nada de O contra 0, ni I contra 1, ni S contra 5. Un código de recompensa se dicta más de lo
// que se copia.
const ALFA = '23456789ACDEFGHJKLMNPQRTUVWXYZ';
const sufijo = (n = 5) => {
  const b = new Uint8Array(n); crypto.getRandomValues(b);
  return [...b].map(x => ALFA[x % ALFA.length]).join('');
};

/* Emite la recompensa de un pedido. Idempotente por dos caminos: primero mira si ya existe una
   para ese pedido, y si aun así dos webhooks entran a la vez, el índice único de order_id hace
   que el segundo insert falle y se devuelva la que ya estaba. */
export async function issueReward(order) {
  if (!dbOk() || !order || !order.id || !order.email) return null;
  const cfg = await rewardConfig();
  if (!cfg.enabled || !cfg.pct) return null;
  try {
    const ya = await db.one('discounts', 'order_id=eq.' + esc(order.id));
    if (ya) return ya;
  } catch (e) { }
  const ends = new Date(Date.now() + cfg.days * 86400000).toISOString();
  const fila = {
    code: `${cfg.prefix}-${sufijo()}`,
    type: 'pct', value: cfg.pct, min_total: cfg.min_total,
    max_uses: 1, uses: 0, active: true,
    starts_at: now(), ends_at: ends,
    kind: 'recompensa', email: String(order.email).toLowerCase(), order_id: order.id,
    issued_at: now(),
    note: `Recompensa por el pedido ${order.id}`,
  };
  try {
    const r = await db.insert('discounts', [fila]);
    const d = r && r[0];
    if (d) {
      try {
        await db.insert('events', [{ t: now(), ev: 'reward_issued', vid: order.vid, sid: order.sid, path: '/gracias.html',
          utm: order.utm || {}, d: { code: d.code, pct: cfg.pct, order: order.id } }]);
      } catch (e) { }
    }
    return d;
  } catch (e) {
    // choque con el índice único: la recompensa ya existía, se devuelve esa
    try { return await db.one('discounts', 'order_id=eq.' + esc(order.id)); } catch (e2) { return null; }
  }
}

export async function rewardOf(orderId) {
  if (!dbOk() || !orderId) return null;
  try { return await db.one('discounts', 'order_id=eq.' + esc(orderId) + '&kind=eq.recompensa'); } catch (e) { return null; }
}

// «Vista» se marca cuando el cliente la ve de verdad en la página de gracias, no cuando se emite:
// la diferencia entre emitidas y vistas es lo que dice si el bloque se está viendo o se lo saltan.
export async function markRewardSeen(code) {
  if (!dbOk() || !code) return;
  try { await db.update('discounts', 'code=eq.' + esc(code) + '&kind=eq.recompensa&seen_at=is.null', { seen_at: now() }); } catch (e) { }
}

/* Se llama al pagar un pedido que traía código. Si ese código era una recompensa, se cierra:
   queda canjeada, se apunta el pedido que la usó y el subtotal que trajo. Ese `revenue` es lo
   único que permite saber después si la recompensa se paga sola o sólo regala margen. */
export async function redeemIfReward(order) {
  if (!dbOk() || !order || !order.code) return null;
  const code = String(order.code).toUpperCase();
  try {
    const d = await db.one('discounts', 'code=eq.' + esc(code));
    if (!d || d.kind !== 'recompensa' || d.redeemed_at) return null;
    const r = await db.update('discounts', 'code=eq.' + esc(code) + '&redeemed_at=is.null', {
      redeemed_at: now(), redeemed_order: order.id, revenue: Number(order.subtotal) || 0,
      uses: Number(d.uses || 0) + 1, active: false,
    });
    const fila = r && r[0];
    if (fila) {
      try {
        await db.insert('events', [{ t: now(), ev: 'reward_redeemed', vid: order.vid, sid: order.sid, path: '/gracias.html',
          utm: order.utm || {}, d: { code, order: order.id, value: Number(order.subtotal) || 0, pct: Number(d.value) } }]);
      } catch (e) { }
    }
    return fila;
  } catch (e) { return null; }
}

// Lo que la web necesita para pintarla, sin exponer nada más de la fila.
export const rewardPublic = (d, cfg) => d && ({
  code: d.code, pct: Number(d.value), type: d.type,
  ends_at: d.ends_at, min_total: Number(d.min_total || 0),
  redeemed: !!d.redeemed_at,
  titulo: cfg.titulo, texto: cfg.texto,
});
