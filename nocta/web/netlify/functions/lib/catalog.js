// Catálogo de servidor: productos base (generados desde products.js) + overrides del CRM (tabla products)
// + contenido editable (tabla content: bar, popup, shipping, gifts, home, …). Caché en memoria 30 s.
import { BASE, GIFTS, SHIPPING } from './products-data.js';
import { db, dbOk } from './db.js';

let cache = { t: 0, v: null };
export function invalidateCatalog() { cache = { t: 0, v: null }; }

export async function getCatalog(fresh = false) {
  if (!fresh && cache.v && Date.now() - cache.t < 30000) return cache.v;
  let rows = [], content = {};
  if (dbOk()) {
    try {
      const [p, c] = await Promise.all([db.select('products', 'select=*'), db.select('content', 'select=key,value')]);
      rows = p || []; (c || []).forEach(r => { content[r.key] = r.value; });
    } catch (e) { /* sin DB: catálogo base */ }
  }
  const ov = Object.fromEntries(rows.map(r => [r.slug, r]));
  const products = BASE.map(b => {
    const o = ov[b.slug]; if (!o) return { ...b, active: true, stock: null };
    const m = { ...b, ...(o.overrides || {}) }; m.active = o.active !== false; m.stock = o.stock == null ? null : Number(o.stock); return m;
  });
  // productos creados solo en el CRM (overrides completos)
  rows.filter(r => !BASE.some(b => b.slug === r.slug) && r.overrides && r.overrides.name && r.overrides.price != null).forEach(r => products.push({ slug: r.slug, gallery: [], tags: [], bullets: [], claims: [], how: [], faq: [], ...r.overrides, active: r.active !== false, stock: r.stock == null ? null : Number(r.stock) }));
  const shipping = { ...SHIPPING, ...(content.shipping || {}) };
  const gifts = Array.isArray(content.gifts) && content.gifts.length ? content.gifts : GIFTS;
  cache = { t: Date.now(), v: { products, shipping, gifts, content } };
  return cache.v;
}

// Mapa slug → producto activo con precio de servidor (y 'upsell-exfoliante' virtual).
export async function serverProducts() {
  const c = await getCatalog();
  const map = {};
  c.products.forEach(p => { if (p.active !== false) map[p.slug] = { slug: p.slug, name: p.name, price: Number(p.price), sub: Number(p.sub || p.price), plan: p.plan ? p.plan.interval : null, units: p.units, image: p.image, stock: p.stock, bundle: p.bundle || null }; });
  const ex = map['exfoliante-salicilico'];
  if (ex) map['upsell-exfoliante'] = { slug: 'exfoliante-salicilico', name: ex.name + ' (oferta post-compra −30 %)', price: +(ex.price * 0.7).toFixed(2), sub: +(ex.price * 0.7).toFixed(2), plan: null, image: ex.image };
  return { products: map, shipping: c.shipping, gifts: c.gifts, content: c.content };
}

// Descuento: tabla discounts (fallback a los 3 códigos históricos si no hay DB).
const LEGACY = { HOLA10: { type: 'pct', value: 10 }, TIKTOK10: { type: 'pct', value: 10 }, BIENVENIDA15: { type: 'pct', value: 15 } };
export async function getDiscount(code, subtotal = 0) {
  code = String(code || '').trim().toUpperCase(); if (!code) return null;
  let d = null;
  if (dbOk()) { try { d = await db.one('discounts', 'code=eq.' + encodeURIComponent(code)); } catch (e) { } }
  if (!d && LEGACY[code]) d = { code, ...LEGACY[code], active: true, min_total: 0 };
  if (!d || d.active === false) return { error: 'invalid' };
  const now = Date.now();
  if (d.starts_at && new Date(d.starts_at).getTime() > now) return { error: 'not_started' };
  if (d.ends_at && new Date(d.ends_at).getTime() < now) return { error: 'expired' };
  if (d.max_uses && Number(d.uses || 0) >= Number(d.max_uses)) return { error: 'exhausted' };
  if (subtotal && Number(d.min_total || 0) > subtotal) return { error: 'min_total', min_total: Number(d.min_total) };
  return { code: d.code, type: d.type === 'fixed' ? 'fixed' : 'pct', value: Number(d.value), min_total: Number(d.min_total || 0), note: d.note || null };
}
export function discountAmount(d, subtotal) {
  if (!d || d.error) return 0;
  return +(d.type === 'pct' ? subtotal * d.value / 100 : Math.min(subtotal, d.value)).toFixed(2);
}
