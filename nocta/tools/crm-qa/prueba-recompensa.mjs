// NODE_PATH=/opt/node22/lib/node_modules node nocta/tools/crm-qa/prueba-recompensa.mjs
/* La recompensa post-compra, probada por las dos puntas.

   Abajo: la lógica de servidor de verdad (lib/rewards.js y getDiscount) contra una base de datos
   fingida. Se puede porque `db` es un objeto exportado: el test importa el MISMO objeto y le
   cambia los métodos, así que el código bajo prueba es el que se despliega, no una copia.
   Las variables de entorno de Supabase se ponen falsas sólo para que dbOk() diga que sí; no se
   abre ninguna conexión.

   Arriba: las tres pantallas que la tocan —la de gracias, el pago y el CRM— en un navegador de
   verdad contra una API fingida.

   Lo que de verdad se defiende aquí es dinero: que una recompensa no se emita dos veces por el
   mismo pedido, que sólo la use quien la ganó, y que lo que el CRM llama «ingresos» sea el
   subtotal del segundo pedido y no otra cosa. */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'https://falso.supabase.co';
process.env.SUPABASE_KEY = process.env.SUPABASE_KEY || 'clave-de-mentira';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.resolve(AQUI, '..', '..', 'web');
const PUB = path.join(WEB, 'public');

const { db } = await import(path.join(WEB, 'netlify/functions/lib/db.js'));
const { issueReward, redeemIfReward, markRewardSeen, rewardConfig } = await import(path.join(WEB, 'netlify/functions/lib/rewards.js'));
const { getDiscount } = await import(path.join(WEB, 'netlify/functions/lib/catalog.js'));

let fallos = 0, total = 0;
const ok = (n, cond, extra = '') => { total++; if (!cond) fallos++; console.log(`  ${cond ? '✓' : '✗'} ${n}${extra ? ' · ' + extra : ''}`); };

/* ── base de datos fingida ─────────────────────────────────────────────────────────
   Guarda filas en memoria y entiende el poquito de PostgREST que usa el código:
   `columna=eq.valor` y `columna=is.null`. El índice único de order_id se imita a mano,
   porque es justo lo que hace idempotente al emisor y hay que poder romperlo en el test. */
const BASE = { discounts: [], events: [], content: [] };
const filtros = q => String(q || '').split('&').filter(x => x.includes('=')).map(x => {
  const [col, resto] = x.split('=');
  const [op, ...v] = resto.split('.');
  return { col, op, val: decodeURIComponent(v.join('.')) };
});
const casa = (fila, f) => f.every(({ col, op, val }) => {
  const v = fila[col];
  if (op === 'is') return val === 'null' ? (v == null) : true;
  if (op === 'eq') return String(v ?? '') === val;
  return true;
});
db.one = async (t, q) => (BASE[t] || []).find(r => casa(r, filtros(q))) || null;
db.select = async (t, q) => (BASE[t] || []).filter(r => casa(r, filtros(q)));
db.insert = async (t, rows) => {
  for (const r of rows) {
    if (t === 'discounts' && r.order_id && BASE.discounts.some(x => x.order_id === r.order_id)) {
      throw Object.assign(new Error('db 409 duplicate key value violates unique constraint "discounts_order_unico"'), { status: 409 });
    }
    BASE[t] = BASE[t] || []; BASE[t].push({ ...r });
  }
  return rows.map(r => ({ ...r }));
};
db.update = async (t, q, patch) => {
  const f = filtros(q); const tocadas = (BASE[t] || []).filter(r => casa(r, f));
  tocadas.forEach(r => Object.assign(r, patch));
  return tocadas.map(r => ({ ...r }));
};
db.rpc = async () => ({});
const reset = () => { BASE.discounts = []; BASE.events = []; BASE.content = [{ key: 'reward', value: { enabled: true, pct: 25, days: 30, min_total: 0, prefix: 'VUELVE' } }]; };

const pedido = (o = {}) => ({ id: 'NC1', email: 'ana@ejemplo.es', subtotal: 40, total: 40, vid: 'v1', sid: 's1', utm: {}, ...o });

console.log('\nEmisión\n');
{
  reset();
  const d = await issueReward(pedido());
  ok('un pedido pagado emite su recompensa', !!d && !!d.code, d && d.code);
  ok('el código lleva el prefijo configurado', /^VUELVE-[A-Z0-9]{5}$/.test(d.code), d.code);
  // Se dictan por teléfono más de lo que se copian: una O contra un 0 cuesta un canje.
  ok('sin caracteres que se confundan al dictarlo (O, I, S, B, 0, 1)', !/[OISB01]/.test(d.code.split('-')[1]), d.code);
  ok('es de un solo uso y de su dueño', d.max_uses === 1 && d.email === 'ana@ejemplo.es' && d.kind === 'recompensa');
  ok('caduca a los 30 días', Math.round((new Date(d.ends_at) - Date.now()) / 86400000) === 30);
  ok('deja rastro en eventos para el embudo', BASE.events.some(e => e.ev === 'reward_issued'));

  const otra = await issueReward(pedido());
  ok('el mismo pedido no emite una segunda', otra.code === d.code, `${d.code} / ${otra.code}`);
  ok('y no se ha guardado una fila de más', BASE.discounts.length === 1, BASE.discounts.length + ' filas');

  // Dos webhooks a la vez: el primero la guarda y el segundo choca con el índice único. El
  // emisor tiene que devolver la que ya estaba, no reventar ni duplicar.
  reset();
  const [a, b] = await Promise.all([issueReward(pedido()), issueReward(pedido())]);
  ok('dos webhooks a la vez siguen dejando UNA recompensa', BASE.discounts.length === 1 && a && b && a.code === b.code, BASE.discounts.length + ' filas');

  reset();
  ok('sin email no se emite nada', (await issueReward(pedido({ email: null }))) === null);
  BASE.content = [{ key: 'reward', value: { enabled: false } }];
  ok('apagada desde el CRM, no emite', (await issueReward(pedido())) === null);
}

console.log('\nQuién puede usarla\n');
{
  reset();
  const d = await issueReward(pedido());
  ok('sin email no se puede validar', (await getDiscount(d.code, 30)).error === 'needs_email');
  ok('con otro email, no es suya', (await getDiscount(d.code, 30, 'otro@ejemplo.es')).error === 'not_yours');
  const buena = await getDiscount(d.code, 30, 'ANA@Ejemplo.ES');
  ok('con el suyo (aunque venga en mayúsculas), vale', !buena.error && buena.code === d.code);
  ok('y llega marcada como recompensa', buena.kind === 'recompensa');
  // Un código de campaña no debe pedir email: si lo pidiera, se rompería el enlace de la newsletter.
  BASE.discounts.push({ code: 'HOLA10', type: 'pct', value: 10, active: true, kind: 'publico', min_total: 0, uses: 0 });
  ok('un código público sigue funcionando sin email', !(await getDiscount('HOLA10', 30)).error);
}

console.log('\nCanje y contabilidad\n');
{
  reset();
  const d = await issueReward(pedido());
  await markRewardSeen(d.code);
  ok('se marca vista cuando el cliente la ve', !!BASE.discounts[0].seen_at);

  // El segundo pedido: el que trae la recompensa de vuelta.
  const segundo = pedido({ id: 'NC2', code: d.code, subtotal: 52.4, total: 39.3 });
  const canje = await redeemIfReward(segundo);
  const fila = BASE.discounts[0];
  ok('al pagar con ella queda canjeada', !!canje && !!fila.redeemed_at);
  ok('apunta qué pedido la trajo', fila.redeemed_order === 'NC2');
  // Lo que ingresa es el SUBTOTAL del segundo pedido, no el total: el total ya lleva restado el
  // descuento, y contarlo como ingreso haría que la recompensa pareciese más barata de lo que es.
  ok('«trajo» es el subtotal del segundo pedido, no el total cobrado', Number(fila.revenue) === 52.4, fila.revenue + ' (total era 39,3)');
  ok('y se desactiva para que no se use dos veces', fila.active === false && Number(fila.uses) === 1);
  ok('deja rastro del canje', BASE.events.some(e => e.ev === 'reward_redeemed'));

  ok('canjearla otra vez no hace nada', (await redeemIfReward(pedido({ id: 'NC3', code: d.code }))) === null);
  ok('y no toca el ingreso ya apuntado', Number(BASE.discounts[0].revenue) === 52.4);

  reset();
  const e = await issueReward(pedido());
  ok('un pedido sin código no canjea nada', (await redeemIfReward(pedido({ id: 'NC9' }))) === null);
  ok('y la recompensa sigue viva', !BASE.discounts[0].redeemed_at && !!e);
}

console.log('\nCaducidad y mínimo\n');
{
  reset();
  BASE.content = [{ key: 'reward', value: { enabled: true, pct: 30, days: 1, min_total: 45, prefix: 'VUELVE' } }];
  const d = await issueReward(pedido());
  ok('el porcentaje y el mínimo salen de la configuración', Number(d.value) === 30 && Number(d.min_total) === 45);
  ok('por debajo del mínimo, no se aplica', (await getDiscount(d.code, 20, 'ana@ejemplo.es')).error === 'min_total');
  ok('por encima, sí', !(await getDiscount(d.code, 60, 'ana@ejemplo.es')).error);
  BASE.discounts[0].ends_at = new Date(Date.now() - 1000).toISOString();
  ok('caducada deja de valer', (await getDiscount(d.code, 60, 'ana@ejemplo.es')).error === 'expired');
}

/* ── las tres pantallas, en un navegador de verdad ───────────────────────────── */
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.avif': 'image/avif' };
const RECOMPENSA = { code: 'VUELVE-7K2MQ', pct: 25, type: 'pct', ends_at: new Date(Date.now() + 30 * 86400000).toISOString(), min_total: 0, redeemed: false, titulo: 'Tu recompensa por esta compra' };
const vistas = [];
const srv = http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x');
  const p = u.pathname;
  const send = (o, t = 'application/json') => { res.writeHead(200, { 'content-type': t }); res.end(typeof o === 'string' ? o : JSON.stringify(o)); };
  if (p === '/api/catalog.js') return send('window.NOCTA_CFG={pricing:{sub_pct:20,multi:{2:0,3:0}}};', 'text/javascript');
  if (p === '/api/order' && req.method === 'GET') return send({ id: u.searchParams.get('id'), items: [{ slug: 'parches-nariz', name: 'Parches de Nariz', qty: 1, unit: 16.95 }], total: 16.95, status: 'paid', email: 'ana@ejemplo.es', reward: RECOMPENSA });
  if (p === '/api/order' && req.method === 'POST') { let b = ''; for await (const c of req) b += c; const j = JSON.parse(b || '{}'); if (j.action === 'reward_seen') vistas.push(j.code); return send({ ok: true }); }
  if (p === '/api/discount') {
    const code = (u.searchParams.get('code') || '').toUpperCase(), email = (u.searchParams.get('email') || '').toLowerCase();
    if (code !== RECOMPENSA.code) return send({ error: 'invalid' });
    if (!email) return send({ error: 'needs_email' });
    if (email !== 'ana@ejemplo.es') return send({ error: 'not_yours' });
    return send({ code, type: 'pct', value: 25, kind: 'recompensa' });
  }
  if (p.startsWith('/api/admin/me')) return send({ ok: true, db: true });
  if (p.startsWith('/api/admin/rewards')) return send({
    config: { enabled: true, pct: 25, days: 30, min_total: 0, prefix: 'VUELVE', titulo: 'Tu recompensa por esta compra' },
    kpis: { emitidas: 40, vistas: 31, canjeadas: 9, caducadas: 6, vivas: 25, ingresos: 402.3, coste: 100.58, dias_hasta: 11.4, por_dia: [] },
    rows: [
      { code: 'VUELVE-7K2MQ', email: 'ana@ejemplo.es', value: 25, type: 'pct', issued_at: new Date(Date.now() - 6 * 86400000).toISOString(), ends_at: new Date(Date.now() + 24 * 86400000).toISOString(), seen_at: new Date().toISOString(), redeemed_at: new Date().toISOString(), redeemed_order: 'NC77', revenue: 52.4, active: false, order_id: 'NC12' },
      { code: 'VUELVE-QH4TN', email: 'luis@ejemplo.es', value: 25, type: 'pct', issued_at: new Date(Date.now() - 2 * 86400000).toISOString(), ends_at: new Date(Date.now() + 28 * 86400000).toISOString(), seen_at: null, redeemed_at: null, redeemed_order: null, revenue: 0, active: true, order_id: 'NC13' },
    ], days: 90,
  });
  if (p.startsWith('/api/admin/')) return send({ rows: [], total: 0 });
  let f = path.join(PUB, p.endsWith('/') ? p + 'index.html' : p);
  if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f += '.html';
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('no'); }
  res.writeHead(200, { 'content-type': TIPOS[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise(r => srv.listen(0, r));
const base = 'http://127.0.0.1:' + srv.address().port;
const nav = await chromium.launch();
/* Un contexto NUEVO por bloque, no uno compartido: el almacenamiento del navegador viaja entre
   pestañas del mismo contexto y un test acababa heredando el estado del anterior, que es la
   forma más tonta de que una prueba diga que sí cuando la respuesta es que no. */
const nuevoCtx = async (w = 390, h = 844) => {
  const c = await nav.newContext({ viewport: { width: w, height: h }, isMobile: w < 760, hasTouch: w < 760 });
  await c.addInitScript(() => { try { ['n_pop', 'n_popup', 'n_cookies', 'n_ck'].forEach(k => localStorage.setItem(k, '1')); } catch (e) { } });
  return c;
};
const limpia = pg => pg.evaluate(() => document.querySelectorAll('.n-mail,.n-ck,[class*="cookie"]').forEach(e => e.remove()));

console.log('\nPágina de gracias\n');
{
  const ctx = await nuevoCtx();
  const pg = await ctx.newPage();
  const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.goto(base + '/gracias.html?o=NC12', { waitUntil: 'networkidle' });
  await pg.waitForSelector('#reward:not([hidden])', { timeout: 8000 }).catch(() => { });
  await limpia(pg);
  const d = await pg.evaluate(() => {
    const s = document.querySelector('#reward');
    const r = e => { const b = e.getBoundingClientRect(); return { y: Math.round(b.top), h: Math.round(b.height) }; };
    return { visible: s && !s.hidden, code: document.querySelector('#rw-txt').textContent.trim(),
      pct: document.querySelector('#rw-pct').textContent.trim(), nota: document.querySelector('#rw-note').textContent,
      guardada: JSON.parse(localStorage.getItem('n_reward') || 'null'),
      yRw: s ? r(s).y : 0, yUp: r(document.querySelector('#upsell')).y,
      href: document.querySelector('#rw-go').getAttribute('href') };
  });
  ok('sin errores de JavaScript', errs.length === 0, errs.join(' | '));
  ok('la recompensa se ve', d.visible && d.code === RECOMPENSA.code, d.code);
  ok('con su porcentaje', d.pct === '−25 %', d.pct);
  ok('dice hasta cuándo y que es de un solo uso', /una vez/i.test(d.nota) && /hasta el/i.test(d.nota));
  // El upsell añade a ESTE pedido; la recompensa trae el SIGUIENTE. Si compiten, gana la de más
  // valor, así que va arriba.
  ok('va por encima del upsell', d.yRw < d.yUp, `${d.yRw} vs ${d.yUp}`);
  ok('se guarda para que el pago la aplique solo', d.guardada && d.guardada.code === RECOMPENSA.code);
  ok('el enlace lleva el código', (d.href || '').includes(encodeURIComponent(RECOMPENSA.code)));
  ok('avisa al servidor de que se ha visto', vistas.includes(RECOMPENSA.code), vistas.join(','));
  await pg.click('#rw-code'); await pg.waitForTimeout(250);
  ok('el código se copia de un toque', (await pg.evaluate(() => document.querySelector('#rw-cta').textContent)) === 'Copiado');
  await pg.close(); await ctx.close();
}

console.log('\nPago: se aplica sola\n');
{
  const ctx = await nuevoCtx();
  const pg = await ctx.newPage();
  const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.addInitScript(([rw, carrito]) => {
    localStorage.setItem('n_reward', rw);
    localStorage.setItem('n_cart', carrito);
  }, [JSON.stringify({ code: RECOMPENSA.code, type: 'pct', value: 25, ends_at: RECOMPENSA.ends_at, min_total: 0, email: 'ana@ejemplo.es' }),
      JSON.stringify([{ slug: 'parches-nariz', qty: 2, sub: false }])]);
  await pg.goto(base + '/checkout.html', { waitUntil: 'networkidle' });
  await pg.waitForSelector('#rwhint:not([hidden])', { timeout: 6000 }).catch(() => { });
  await limpia(pg);
  ok('avisa de que tiene una recompensa guardada', /−25 %/.test(await pg.evaluate(() => document.querySelector('#rwhint').textContent)));
  ok('sin errores de JavaScript', errs.length === 0, errs.join(' | '));
  // Sin email no se puede aplicar: es personal. Con el email correcto, sola.
  ok('todavía no está aplicada', !(await pg.evaluate(() => sessionStorage.getItem('n_disc'))));
  await pg.fill('#f-email', 'ana@ejemplo.es');
  await pg.locator('#f-email').blur();
  await pg.waitForTimeout(700);
  const tras = await pg.evaluate(() => ({ disc: JSON.parse(sessionStorage.getItem('n_disc') || 'null'),
    hint: document.querySelector('#rwhint').textContent, ok: document.querySelector('#rwhint').classList.contains('is-ok'),
    campo: document.querySelector('#f-code').value, total: document.querySelector('#sumtot') ? document.querySelector('#sumtot').textContent : '' }));
  ok('al escribir su email se aplica sola', tras.disc && tras.disc.code === RECOMPENSA.code, JSON.stringify(tras.disc));
  ok('y lo dice en verde', tras.ok && /aplicada/i.test(tras.hint));
  ok('el campo del código queda relleno', tras.campo === RECOMPENSA.code, tras.campo);
  ok('el resumen ya descuenta', /−/.test(tras.total) && tras.total.includes(RECOMPENSA.code), tras.total.replace(/\s+/g, ' ').slice(0, 80));
  await pg.close(); await ctx.close();
}

console.log('\nOtro email no se lleva la recompensa\n');
{
  const ctx = await nuevoCtx();
  const pg = await ctx.newPage();
  await pg.addInitScript(([rw, carrito]) => { localStorage.setItem('n_reward', rw); localStorage.setItem('n_cart', carrito); },
    [JSON.stringify({ code: RECOMPENSA.code, type: 'pct', value: 25, ends_at: RECOMPENSA.ends_at, min_total: 0, email: 'ana@ejemplo.es' }),
     JSON.stringify([{ slug: 'parches-nariz', qty: 2, sub: false }])]);
  await pg.goto(base + '/checkout.html', { waitUntil: 'networkidle' });
  await limpia(pg);
  await pg.fill('#f-email', 'otro@ejemplo.es');
  await pg.locator('#f-email').blur();
  await pg.waitForTimeout(700);
  const d = await pg.evaluate(() => ({ disc: sessionStorage.getItem('n_disc'), hint: document.querySelector('#rwhint').textContent }));
  ok('no se aplica', !d.disc);
  ok('y lo explica en vez de fallar en silencio', /otra cuenta de correo/i.test(d.hint), d.hint.trim().slice(0, 70));
  await pg.close(); await ctx.close();
}

console.log('\nCRM · pantalla de Recompensas\n');
{
  const ctx = await nuevoCtx(1440, 950);
  const pg = await ctx.newPage();
  const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.goto(base + '/admin/#/rewards', { waitUntil: 'networkidle' });
  await pg.waitForSelector('.fnl', { timeout: 8000 }).catch(() => { });
  const d = await pg.evaluate(() => ({
    kpis: [...document.querySelectorAll('.kpi')].map(k => ({ l: k.querySelector('small').textContent, v: k.querySelector('b').textContent })),
    pasos: [...document.querySelectorAll('.fnl__h')].map(f => f.textContent.replace(/\s+/g, ' ').trim()),
    anchos: [...document.querySelectorAll('.fnl__b i')].map(i => i.style.width),
    filas: document.querySelectorAll('.tbl tbody tr').length,
    campos: [...document.querySelectorAll('#rw-form [name]')].map(i => i.name),
  }));
  ok('la pantalla carga sin errores', errs.length === 0, errs.join(' | '));
  // 402,30 de segundas compras − 100,58 regalados = 301,72. Si este número sale mal, la pantalla
  // entera miente, porque es el único que decide si el mecanismo se mantiene.
  ok('el número grande es el NETO, no las canjeadas', d.kpis[0] && d.kpis[0].v === '301,72 €', d.kpis[0] && d.kpis[0].v);
  ok('cuenta cuántas vuelven', d.kpis[1] && d.kpis[1].v === '9 de 40', d.kpis[1] && d.kpis[1].v);
  ok('y el ticket de la segunda compra', d.kpis[2] && d.kpis[2].v === '44,70 €', d.kpis[2] && d.kpis[2].v);
  ok('el embudo tiene sus tres pasos', d.pasos.length === 3, d.pasos.join(' | '));
  ok('y las barras caen en orden', d.anchos.length === 3 && parseFloat(d.anchos[0]) === 100 && parseFloat(d.anchos[0]) > parseFloat(d.anchos[1]) && parseFloat(d.anchos[1]) > parseFloat(d.anchos[2]), d.anchos.join(' > '));
  ok('la lista enseña las recompensas', d.filas === 2, d.filas + ' filas');
  ok('y se puede cambiar el % y la caducidad sin tocar código', d.campos.includes('pct') && d.campos.includes('days') && d.campos.includes('enabled'), d.campos.join(','));
  await pg.close(); await ctx.close();
}

await nav.close(); srv.close();
console.log(`\n${total - fallos}/${total} comprobaciones correctas sobre la recompensa post-compra`);
process.exit(fallos ? 1 : 0);
