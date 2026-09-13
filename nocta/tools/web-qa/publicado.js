// NODE_PATH=/opt/node22/lib/node_modules node nocta/tools/web-qa/publicado.js [url]
/* Comprueba que lo que hay PUBLICADO se comporta como lo que hay en el repositorio.
   No basta con desplegar y dar por hecho que llega igual: Netlify post-procesa el HTML (URLs
   bonitas) y al reescribirlo puede romper cosas que en local funcionan. Pasó de verdad:
   onclick="nTrack('cta_hero',{pos:'hero'})" salía publicado con comillas simples y \' dentro,
   que en HTML no escapa nada, así que el atributo se cortaba y el clic del botón principal de la
   portada dejaba de contarse. En local, perfecto; en producción, roto.

   Esta prueba baja el HTML real, lo parsea con un navegador y exige:
     1. que ningún manejador dentro del HTML haya quedado partido;
     2. que no aparezcan atributos basura de una reescritura;
     3. que los botones que deben contarse lleven su marca de seguimiento;
     4. que el CSS y el JS publicados sean idénticos a los del repositorio. */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { chromium } = require('playwright');
const crypto = require('crypto');

const SITIO = process.argv[2] || 'https://nocta-store.netlify.app';
const RAIZ = path.resolve(__dirname, '..', '..', 'web', 'public');
const PAGINAS = ['/', '/como-usar.html', '/catalogo.html', '/producto.html', '/checkout.html'];
const FICHEROS = ['assets/css/styles.css', 'assets/css/pdp.css', 'assets/js/app.js',
  'admin/m-live.js', 'admin/mundo.js', 'admin/admin.css', 'admin/core.js'];

// Se usa el proxy del entorno si lo hay; el navegador no llega, pero una petición normal sí.
const baja = url => new Promise((res, rej) => {
  https.get(url, r => {
    if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) return baja(new URL(r.headers.location, url).href).then(res, rej);
    const t = []; r.on('data', c => t.push(c)); r.on('end', () => res({ code: r.statusCode, cuerpo: Buffer.concat(t) }));
  }).on('error', rej);
});
const md5 = b => crypto.createHash('md5').update(b).digest('hex');

(async () => {
  let fallos = 0, total = 0;
  const ok = (n, cond, extra = '') => { total++; if (!cond) fallos++; console.log(`  ${cond ? '✓' : '✗'} ${n}${extra ? ' · ' + extra : ''}`); };

  console.log(`Comprobando lo publicado en ${SITIO}\n`);
  console.log('Ficheros: ¿llega al servidor lo mismo que hay en el repositorio?');
  for (const f of FICHEROS) {
    const local = md5(fs.readFileSync(path.join(RAIZ, f)));
    const r = await baja(SITIO + '/' + f);
    ok(f, r.code === 200 && md5(r.cuerpo) === local,
      r.code !== 200 ? 'HTTP ' + r.code : (md5(r.cuerpo) === local ? '' : 'contenido distinto'));
  }

  console.log('\nHTML: ¿el post-procesado del servidor ha roto algo?');
  const nav = await chromium.launch();
  const ctx = await nav.newContext();
  for (const ruta of PAGINAS) {
    const r = await baja(SITIO + ruta);
    if (r.code !== 200) { ok(ruta, false, 'HTTP ' + r.code); continue; }
    const pg = await ctx.newPage();
    await pg.setContent(r.cuerpo.toString('utf8'), { waitUntil: 'domcontentloaded' });
    const mal = await pg.evaluate(() => {
      const roto = [];
      document.querySelectorAll('*').forEach(el => {
        for (const a of el.attributes) {
          // Un manejador partido acaba en barra invertida, o queda un atributo sin nombre real
          // con paréntesis y llaves dentro: las dos son firmas de una reescritura que ha cortado.
          if (/^on/.test(a.name) && /\\$/.test(a.value)) roto.push(`${el.tagName}#${el.id || '?'} ${a.name}="${a.value}"`);
          if (/[(){}]/.test(a.name)) roto.push(`${el.tagName}#${el.id || '?'} atributo basura «${a.name}»`);
        }
      });
      return roto;
    });
    ok(`${ruta} sin manejadores partidos`, mal.length === 0, mal.slice(0, 2).join(' | '));
    await pg.close();
  }

  console.log('\nSeguimiento: ¿los botones que deben contarse llevan su marca?');
  for (const [ruta, cuantos] of [['/', 2], ['/como-usar.html', 1]]) {
    const r = await baja(SITIO + ruta);
    const pg = await ctx.newPage();
    await pg.setContent(r.cuerpo.toString('utf8'), { waitUntil: 'domcontentloaded' });
    const n = await pg.evaluate(() => document.querySelectorAll('[data-track]').length);
    ok(`${ruta} conserva ${cuantos} marca(s) de seguimiento`, n >= cuantos, n + ' encontradas');
    await pg.close();
  }
  await nav.close();

  console.log(`\n${total - fallos}/${total} comprobaciones correctas sobre lo publicado`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error('Error:', e.message); process.exit(1); });
