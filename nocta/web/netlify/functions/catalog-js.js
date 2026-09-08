// GET /api/catalog.js → script que aplica al catálogo del front los overrides del CRM (precios, stock, activo, textos)
// y expone window.NOCTA_CFG (barra, popup, envío, regalos, whatsapp, home). Cacheado en el CDN 60 s (tag "catalog").
import { getCatalog } from './lib/catalog.js';
import { BASE } from './lib/products-data.js';

export default async (req) => {
  const c = await getCatalog();
  const base = Object.fromEntries(BASE.map(b => [b.slug, b]));
  const ov = {}; const inactive = []; const extra = [];
  c.products.forEach(p => {
    if (p.active === false) { inactive.push(p.slug); return; }
    const b = base[p.slug];
    if (!b) { extra.push(p); return; }
    const diff = {}; Object.keys(p).forEach(k => { if (k === 'active') return; if (JSON.stringify(p[k]) !== JSON.stringify(b[k])) diff[k] = p[k]; });
    if (Object.keys(diff).length) ov[p.slug] = diff;
  });
  const ct = c.content || {};
  const cfg = { bar: ct.bar || null, popup: ct.popup || null, shipping: c.shipping, gifts: c.gifts, whatsapp: ct.whatsapp_public || null, home: ct.home || null, announce: ct.announce || null, t: Date.now() };
  const js = `window.NOCTA_CFG=${JSON.stringify(cfg)};(function(){var P=window.NOCTA_PRODUCTS;if(!P)return;var ov=${JSON.stringify(ov)},off=${JSON.stringify(inactive)},extra=${JSON.stringify(extra)};
for(var i=P.length-1;i>=0;i--){var p=P[i];if(off.indexOf(p.slug)>-1){P.splice(i,1);continue;}if(ov[p.slug])Object.assign(p,ov[p.slug]);}
extra.forEach(function(e){P.push(e);});window.NOCTA_SHIPPING=Object.assign(window.NOCTA_SHIPPING||{},${JSON.stringify(c.shipping)});window.NOCTA_GIFTS=${JSON.stringify(c.gifts)};})();`;
  return new Response(js, { headers: { 'content-type': 'application/javascript; charset=utf-8', 'cache-control': 'public, max-age=0, must-revalidate', 'netlify-cdn-cache-control': 'public, s-maxage=60, stale-while-revalidate=600', 'cache-tag': 'catalog' } });
};
export const config = { path: '/api/catalog.js' };
