/* NOCTA CRM · «En vivo»: el mapa del mundo con quién está en la tienda ahora mismo.
   Todo el cálculo lo hace la base de datos (RPC live_map + live_horas) y llega en un único JSON;
   aquí sólo se dibuja. Sin librerías: es un SVG y los contornos vienen de mundo.js, ya proyectados.

   ARQUITECTURA DEL MAPA (importa, y explica casi todo lo demás)
   La geografía va dentro de un grupo con la transformación de la cámara, así que escala con el zoom.
   Los marcadores NO: se dibujan en coordenadas de pantalla y se recolocan en cada movimiento. Es
   como funciona cualquier mapa serio, y es lo que hace que al acercarte crezcan los países pero los
   puntos, los nombres y la barra de escala mantengan su tamaño en vez de volverse manchas.

   La proyección (Miller cilíndrica) está repetida a propósito igual que en tools/crm-qa/gen_mundo.py,
   porque hay que proyectar a los visitantes con la misma fórmula que generó los contornos. */
(function () {
  const { esc } = A;
  const RAD = Math.PI / 180;
  const MENOS_MOVIMIENTO = matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- proyección (misma fórmula que generó mundo.js) ---------- */
  const millerY = lat => 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * Math.max(-89.5, Math.min(89.5, lat)) * RAD));
  const millerInv = y => (Math.atan(Math.exp(y / 1.25)) - Math.PI / 4) / 0.4 / RAD;
  const M = () => window.MUNDO;
  const px = lon => (lon + 180) / 360 * M().w;
  const py = lat => (millerY(M().latMax) - millerY(lat)) * (M().w / (2 * Math.PI));
  const latDe = y => millerInv(millerY(M().latMax) - y / (M().w / (2 * Math.PI)));

  /* ---------- el sol: dónde es de noche ahora mismo ----------
     NOCTA se usa de noche, así que el mapa dibuja la noche de verdad, no un adorno. */
  function subsolar(fecha) {
    const jd = fecha.getTime() / 86400000 + 2440587.5, n = jd - 2451545.0;
    const L = (280.460 + 0.9856474 * n) % 360;
    const g = ((357.528 + 0.9856003 * n) % 360) * RAD;
    const lambda = (L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * RAD;
    const eps = (23.439 - 0.0000004 * n) * RAD;
    const dec = Math.asin(Math.sin(eps) * Math.sin(lambda));
    const alfa = Math.atan2(Math.cos(eps) * Math.sin(lambda), Math.cos(lambda));
    const gmst = (280.46061837 + 360.98564736629 * n) % 360;
    return { dec, lon: ((alfa / RAD - gmst + 540) % 360) - 180 };
  }
  // El terminador es donde el sol está justo en el horizonte: tan(lat) = −cos(H)/tan(dec).
  function rutaNoche(fecha) {
    const { dec, lon: lonSol } = subsolar(fecha);
    const tanDec = Math.tan(dec);
    if (Math.abs(tanDec) < 1e-6) return '';
    const polo = dec > 0 ? -90 : 90, pts = [];
    for (let lon = -180; lon <= 180; lon += 1.5) {
      const H = (lon - lonSol) * RAD;
      const lat = Math.max(-89.9, Math.min(89.9, Math.atan(-Math.cos(H) / tanDec) / RAD));
      pts.push([px(lon), py(lat)]);
    }
    return 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('L')
      + `L${M().w},${py(polo).toFixed(1)}L0,${py(polo).toFixed(1)}Z`;
  }

  /* ---------- etapas y textos ---------- */
  /* Colores vivos sobre el índigo del mapa. Blanco para la visita y oro para la compra, que es el
     lenguaje de la referencia; en medio, tonos claramente distintos entre sí para que el embudo se
     lea de un vistazo y no haya que ir a la leyenda. */
  /* Cada etapa lleva dos colores: `c` para el mapa, que es oscuro, y `cl` para las tarjetas, que
     son blancas. El blanco de «Mirando» es perfecto sobre el índigo y desaparece sobre papel. */
  /* `k` es el nombre corto para la leyenda del teléfono: los cinco enteros no caben en 360 px
     y la fila acababa cortando la última palabra por la mitad. Se pintan los dos y manda el CSS. */
  const ETAPA = [
    { n: 'Mirando',        k: 'Mirando',  c: '#FFFFFF', cl: '#6C8BFF' },
    { n: 'En un producto', k: 'Producto', c: '#5AD8FF', cl: '#1FC0EC' },
    { n: 'Con carrito',    k: 'Carrito',  c: '#B98BFF', cl: '#9B6BFF' },
    { n: 'Pagando',        k: 'Pagando',  c: '#FF8A4C', cl: '#F0642F' },
    { n: 'Ha comprado',    k: 'Comprado', c: '#FFC53D', cl: '#F5A524' },
  ];
  const paisNombre = (() => {
    let dn = null; try { dn = new Intl.DisplayNames(['es'], { type: 'region' }); } catch (e) { }
    return c => { if (!c || c === '??') return 'Desconocido'; try { return (dn && dn.of(c)) || c; } catch (e) { return c; } };
  })();
  const bandera = c => (c && /^[A-Z]{2}$/.test(c))
    ? String.fromCodePoint(...[...c].map(x => 0x1F1E6 + x.charCodeAt(0) - 65)) : '🌐';
  const hace = s => s < 10 ? 'ahora' : s < 60 ? 'hace ' + Math.round(s) + ' s'
    : s < 3600 ? 'hace ' + Math.round(s / 60) + ' min' : 'hace ' + Math.round(s / 3600) + ' h';
  const lugar = p => [p.ciudad, paisNombre(p.pais)].filter(Boolean).join(', ') || 'Sin localizar';
  const aparato = d => d === 'mobile' ? 'móvil' : d === 'tablet' ? 'tableta' : 'ordenador';

  const FRASE = {
    page_view: f => 'ha abierto ' + pagina(f.path),
    view_item: f => 'está mirando ' + producto(f.slug),
    add_to_cart: f => 'ha metido ' + producto(f.slug) + ' en el carrito',
    remove_from_cart: f => 'ha sacado ' + producto(f.slug) + ' del carrito',
    begin_checkout: () => 'ha empezado a pagar',
    purchase: f => 'HA COMPRADO' + (f.valor ? ' · ' + A.money(f.valor) : ''),
    lead: () => 'ha dejado su correo', cta_hero: () => 'ha pulsado el botón de la portada',
    open_cart: () => 'ha abierto el carrito', quiz_done: () => 'ha terminado el test de piel',
    search: () => 'ha buscado algo', select_plan: f => 'está mirando el plan ' + (f.slug || ''),
    video_play: () => 'ha dado al vídeo',
  };
  const producto = s => { const p = s && A.product(s); return p ? '«' + p.name + '»' : (s ? '«' + s + '»' : 'un producto'); };
  const PAG = { '/': 'la portada', '/index.html': 'la portada', '/catalogo.html': 'el catálogo',
    '/producto.html': 'una ficha de producto', '/checkout.html': 'el pago', '/gracias.html': 'la página de gracias',
    '/como-usar.html': 'cómo usar', '/garantia.html': 'la garantía', '/test-piel.html': 'el test de piel',
    '/ciencia.html': 'la ciencia', '/contacto.html': 'contacto' };
  const pagina = p => PAG[p] || (p || 'una página');
  const frase = f => (FRASE[f.ev] ? FRASE[f.ev](f) : String(f.ev || '').replace(/_/g, ' '));

  /* ---------- dibujos pequeños ---------- */
  function chispa(vals, w = 74, h = 22) {
    const v = (vals || []).map(x => Number(x) || 0);
    if (v.length < 2) return `<svg class="spk" viewBox="0 0 ${w} ${h}" aria-hidden="true"><line x1="0" y1="${h / 2}" x2="${w}" y2="${h / 2}"/></svg>`;
    const max = Math.max(...v), min = Math.min(...v), rango = max - min || 1;
    const pt = i => [(i / (v.length - 1)) * w, h - 1.5 - ((v[i] - min) / rango) * (h - 3)];
    const d = v.map((_, i) => pt(i)).map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('');
    return `<svg class="spk" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">`
      + `<path class="spk__a" d="${d}L${w},${h}L0,${h}Z"/><path class="spk__l" d="${d}"/>`
      + `<circle class="spk__p" cx="${pt(v.length - 1)[0].toFixed(1)}" cy="${pt(v.length - 1)[1].toFixed(1)}" r="1.9"/></svg>`;
  }
  // Para sucesos sueltos (pedidos, cobros) una línea quebrada inventa una continuidad que no existe:
  // une con una rampa dos horas en las que no pasó nada. Se dibujan en barras, que es lo que son.
  function chispaBarras(vals, w = 74, h = 22) {
    const v = (vals || []).map(x => Number(x) || 0);
    if (!v.length) return `<svg class="spk" viewBox="0 0 ${w} ${h}" aria-hidden="true"><line x1="0" y1="${h - 1}" x2="${w}" y2="${h - 1}"/></svg>`;
    const max = Math.max(...v) || 1, ancho = w / v.length;
    return `<svg class="spk" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">`
      + v.map((x, i) => {
        const alto = x ? Math.max(1.4, x / max * (h - 2)) : 0.9;
        return `<rect class="spk__b${x ? '' : ' es-cero'}" x="${(i * ancho + ancho * .15).toFixed(2)}" y="${(h - alto).toFixed(2)}" width="${(ancho * .7).toFixed(2)}" height="${alto.toFixed(2)}"/>`;
      }).join('') + '</svg>';
  }
  // Campana cuya altura es la proporción sobre el total, y cuyo ancho también se estrecha: así una
  // etapa con poca gente se ve estrecha y baja, y se lee el estrechamiento del embudo.
  function campana(prop, w = 120, h = 60) {
    const alto = Math.max(.035, prop) * (h - 6);
    const sigma = w * (0.10 + 0.10 * Math.max(.12, prop)), cx = w / 2, p = [];
    for (let i = 0; i <= 34; i++) {
      const x = (i / 34) * w;
      p.push([x, h - alto * Math.exp(-((x - cx) ** 2) / (2 * sigma * sigma))]);
    }
    return `M0,${h}` + p.map(q => `L${q[0].toFixed(1)},${q[1].toFixed(1)}`).join('') + `L${w},${h}Z`;
  }

  /* ---------- vista ---------- */
  A.mod('live', {
    title: 'En vivo', icon: '◉', group: 'Panel',
    render: async (el) => {
      if (!window.MUNDO) { el.innerHTML = '<div class="card"><p class="err">No se ha podido cargar la geometría del mapa (mundo.js).</p></div>'; return; }
      const m = M(), W = m.w, H = m.h;
      const Z_MIN = 1, Z_MAX = 14;

      el.innerHTML = `
<div class="lv">
  <section class="lv__map" id="lvmap">
    <header class="lv__tot">
      <div class="lv__tot-now">
        <small>Ahora mismo</small>
        <b><i class="lv__pulso-i"></i><span id="lvnow" aria-live="polite">—</span></b>
        <span class="lv__tot-sub" id="lvnowsub">—</span>
      </div>
      <div class="lv__tot-hoy" id="lvtot"></div>
    </header>
    <div class="lv__svgwrap" id="lvwrap">
      <div class="lv__bar">
        <span class="lv__key"><i class="lv__key-v"></i>Visita<i class="lv__key-s"></i>Venta</span>
        <span class="grow"></span>
        <label class="lv__sel"><span class="xs">Ventana</span>
          <select id="lvmin"><option value="1">1 min</option><option value="5" selected>5 min</option><option value="15">15 min</option><option value="60">1 h</option><option value="180">3 h</option></select>
        </label>
        <button class="lv__b" id="lvpause" title="Pausar la actualización" aria-label="Pausar la actualización">❚❚</button>
      </div>

      <svg id="lvsvg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" tabindex="0" role="application"
           aria-label="Mapa del mundo con los visitantes de la tienda en tiempo real. Flechas para moverse, más y menos para acercar, cero para ver el mundo entero.">
        <defs>
          <radialGradient id="lvhalo"><stop offset="0%" stop-color="#fff" stop-opacity=".5"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient>
          <linearGradient id="lvhaz" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stop-color="#FFF3C4" stop-opacity="1"/>
            <stop offset="35%" stop-color="#FFC53D" stop-opacity=".92"/>
            <stop offset="100%" stop-color="#FFC53D" stop-opacity="0"/>
          </linearGradient>
          <radialGradient id="lvhazglow">
            <stop offset="0%" stop-color="#FFC53D" stop-opacity=".55"/><stop offset="100%" stop-color="#FFC53D" stop-opacity="0"/>
          </radialGradient>
          <filter id="lvdusk" x="-6%" y="-30%" width="112%" height="160%"><feGaussianBlur stdDeviation="7"/></filter>
          <!-- El mundo se declara UNA vez y se usa dos veces: en el mapa y en el mapa guía. -->
          <g id="lvmundo">${m.paises.map(p => `<path class="lv-pais" data-c="${esc(p.c || '')}" d="${p.d}"><title>${esc(p.c ? '' : p.n)}</title></path>`).join('')}</g>
        </defs>
        <rect class="lv-mar" x="0" y="0" width="${W}" height="${H}"/>
        <g id="lvcam">
          <g id="lvgrat"></g>
          <use href="#lvmundo"/>
          <path id="lvnoche" class="lv-noche"/>
        </g>
        <!-- De aquí abajo, TODO en coordenadas de pantalla: no crece con el zoom. -->
        <g id="lvetiq" class="lv-etiq" aria-hidden="true"></g>
        <g id="lvhaces"></g>
        <g id="lvpuntos"></g>
        <rect id="lvcaja" class="lv-caja" hidden/>
      </svg>

      <div class="lv__nav">
        <button class="lv__b" id="lvzin" title="Acercar (tecla +)" aria-label="Acercar">+</button>
        <div class="lv__zoom" id="lvzoom" aria-hidden="true"><i></i></div>
        <button class="lv__b" id="lvzout" title="Alejar (tecla −)" aria-label="Alejar">−</button>
        <button class="lv__b" id="lvfit" title="Encuadrar a los visitantes" aria-label="Encuadrar a los visitantes">⤢</button>
        <button class="lv__b" id="lvreset" title="Ver el mundo entero (tecla 0)" aria-label="Ver el mundo entero">◎</button>
      </div>

      <div class="lv__guia" id="lvguia" hidden aria-hidden="true">
        <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
          <rect class="lv-mar" x="0" y="0" width="${W}" height="${H}"/>
          <use href="#lvmundo" class="lv-guia-mundo"/>
          <rect id="lvguiacaja" class="lv-guia-caja"/>
        </svg>
      </div>

      <div class="lv__escala" id="lvescala" aria-hidden="true"><i></i><span></span></div>
      <div class="lv__tip" id="lvtip" hidden></div>
      <div class="lv__leyenda" id="lvleg"></div>
      <p class="lv__ayuda">Arrastra para moverte · rueda o pellizco para acercar · doble clic acerca ahí · mayúsculas y arrastrar encuadra una zona</p>
    </div>
  </section>

  <div class="lv__abajo">
    <section class="card lv__comp"><div class="card__h"><h2>Qué están haciendo</h2><span class="xs muted" id="lvvent"></span></div><div id="lvcomp"></div></section>
    <section class="card lv__pulso"><div class="card__h"><h2>Pulso</h2><span class="xs muted">páginas por minuto · última media hora</span></div><div id="lvpulso"></div></section>
  </div>
  <div class="lv__abajo2">
    <section class="card lv__feed"><div class="card__h"><h2>Está pasando</h2><span class="xs muted" id="lvsync">—</span></div><ol id="lvfeed" class="feed"></ol></section>
    <section class="card"><div class="card__h"><h2>De dónde entran hoy</h2></div><div id="lvrank-paises"></div></section>
    <section class="card"><div class="card__h"><h2>Páginas de hoy</h2></div><div id="lvpags"></div></section>
  </div>
</div>`;

      const $ = s => el.querySelector(s), $$ = s => [...el.querySelectorAll(s)];
      const svg = $('#lvsvg'), wrap = $('#lvwrap'), gCam = $('#lvcam'), tip = $('#lvtip');

      // Retícula cada 30°.
      const grat = [];
      for (let lon = -150; lon <= 150; lon += 30) grat.push(`<line x1="${px(lon).toFixed(1)}" y1="0" x2="${px(lon).toFixed(1)}" y2="${H}"/>`);
      for (let lat = -60; lat <= 75; lat += 30) grat.push(`<line x1="0" y1="${py(lat).toFixed(1)}" x2="${W}" y2="${py(lat).toFixed(1)}"/>`);
      $('#lvgrat').innerHTML = grat.join('');
      $('#lvleg').innerHTML = ETAPA.map(e => `<span class="lv__lg"><i style="background:${e.c}"></i><b class="lv__lg-l">${esc(e.n)}</b><b class="lv__lg-s">${esc(e.k)}</b></span>`).join('');

      const pintaNoche = () => $('#lvnoche').setAttribute('d', rutaNoche(new Date()));
      pintaNoche();

      /* ═══════════════ CÁMARA ═══════════════
         cx,cy = el punto del mapa que queda en el centro de la vista. z = aumento. */
      const cam = { z: 1, cx: W / 2, cy: H / 2 };
      const aX = mx => (mx - cam.cx) * cam.z + W / 2;          // mapa → pantalla
      const aY = my => (my - cam.cy) * cam.z + H / 2;
      const deX = s => (s - W / 2) / cam.z + cam.cx;           // pantalla → mapa
      const deY = s => (s - H / 2) / cam.z + cam.cy;

      // Impide arrastrar el mundo fuera de la vista. Si el mapa cabe entero, se centra.
      function encaja() {
        cam.z = Math.max(Z_MIN, Math.min(Z_MAX, cam.z));
        const vw = W / cam.z, vh = H / cam.z;
        cam.cx = vw >= W ? W / 2 : Math.max(vw / 2, Math.min(W - vw / 2, cam.cx));
        cam.cy = vh >= H ? H / 2 : Math.max(vh / 2, Math.min(H - vh / 2, cam.cy));
      }

      /* Las capas de encima no escalan con el ZOOM, pero seguían escalando con el TAMAÑO del SVG:
         en un móvil de 366 px un viewBox de 1000 unidades se dibuja al 37 %, así que los nombres
         salían a 3 px y los puntos eran intocables. U = unidades de viewBox por píxel de pantalla;
         multiplicando por U, radios, textos y agrupación quedan constantes en píxeles de verdad. */
      let U = 1;
      function mideU() {
        const r = svg.getBoundingClientRect();
        const k = Math.min(r.width / W, r.height / H) || 1;
        U = 1 / k;
        svg.style.setProperty('--u', U.toFixed(4));
      }
      mideU();

      let pendiente = false;
      const pinta = () => { if (pendiente) return; pendiente = true; requestAnimationFrame(() => { pendiente = false; dibujaCamara(); }); };

      function dibujaCamara() {
        encaja(); mideU();
        gCam.setAttribute('transform', `translate(${(W / 2 - cam.cx * cam.z).toFixed(2)} ${(H / 2 - cam.cy * cam.z).toFixed(2)}) scale(${cam.z.toFixed(4)})`);
        wrap.classList.toggle('is-zoom', cam.z > 1.02);
        const z = $('#lvzoom');
        z.style.setProperty('--p', ((Math.log(cam.z) / Math.log(Z_MAX)) * 100).toFixed(1) + '%');
        z.title = 'Aumento ×' + cam.z.toFixed(1);
        dibujaEscala(); dibujaGuia(); dibujaCapas();
      }

      /* --- movimiento suave: se interpola el LOGARITMO del zoom, que es como se percibe --- */
      let animando = null;
      function vuela(dest, ms = 520) {
        if (animando) cancelAnimationFrame(animando);
        zPedido = Math.max(Z_MIN, Math.min(Z_MAX, dest.z)); tPedido = performance.now();
        if (MENOS_MOVIMIENTO.matches || ms <= 0) { Object.assign(cam, dest); pinta(); return; }
        const t0 = performance.now(), ini = { z: cam.z, cx: cam.cx, cy: cam.cy };
        const lz0 = Math.log(ini.z), lz1 = Math.log(Math.max(Z_MIN, Math.min(Z_MAX, dest.z)));
        const paso = t => {
          const k = Math.min(1, (t - t0) / ms);
          const e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;   // easeInOutCubic
          cam.z = Math.exp(lz0 + (lz1 - lz0) * e);
          cam.cx = ini.cx + (dest.cx - ini.cx) * e;
          cam.cy = ini.cy + (dest.cy - ini.cy) * e;
          dibujaCamara();
          animando = k < 1 ? requestAnimationFrame(paso) : null;
        };
        animando = requestAnimationFrame(paso);
      }
      /* Pulsar «+» tres veces seguidas tiene que dar ×1,8³, no ×1,8. Cada paso partía del zoom
         LEÍDO a mitad de la animación anterior, así que los clics rápidos se comían unos a otros.
         Se recuerda a dónde íbamos y, si el vuelo sigue vivo, el siguiente paso parte de ahí. */
      let zPedido = 1, tPedido = 0;
      const zBase = () => (performance.now() - tPedido < 900 ? zPedido : cam.z);
      function pasoZoom(factor, sx, sy, ms = 320) {
        zPedido = Math.max(Z_MIN, Math.min(Z_MAX, zBase() * factor));
        tPedido = performance.now();
        zoomHacia(zPedido, sx, sy, ms);
      }

      const para = () => {
        if (animando) { cancelAnimationFrame(animando); animando = null; }
        if (inercia.id) { cancelAnimationFrame(inercia.id); inercia.id = null; }
        inercia.vx = inercia.vy = 0;
      };

      // Acercar dejando quieto un punto de la pantalla (el cursor, o el centro del pellizco).
      function zoomHacia(nuevoZ, sx, sy, ms = 0) {
        const z1 = Math.max(Z_MIN, Math.min(Z_MAX, nuevoZ));
        const dest = { z: z1, cx: deX(sx) - (sx - W / 2) / z1, cy: deY(sy) - (sy - H / 2) / z1 };
        zPedido = z1; tPedido = performance.now();
        if (ms) vuela(dest, ms); else { Object.assign(cam, dest); pinta(); }
      }
      // Puntero → unidades del viewBox, respetando el letterboxing de «meet».
      function aViewBox(ev) {
        const r = svg.getBoundingClientRect();
        const k = Math.min(r.width / W, r.height / H) || 1;
        return [(ev.clientX - r.left - (r.width - W * k) / 2) / k,
                (ev.clientY - r.top - (r.height - H * k) / 2) / k];
      }

      /* --- rueda y trackpad --- */
      wrap.addEventListener('wheel', ev => {
        ev.preventDefault(); para();
        const [sx, sy] = aViewBox(ev);
        // deltaMode 1 = líneas (Firefox), 2 = páginas: se normaliza para que el paso sea parecido.
        const d = ev.deltaY * (ev.deltaMode === 1 ? 16 : ev.deltaMode === 2 ? 100 : 1);
        zoomHacia(cam.z * Math.pow(2, -d / 420), sx, sy);
      }, { passive: false });

      /* --- arrastre, pellizco, encuadre e inercia --- */
      const punteros = new Map();
      const inercia = { vx: 0, vy: 0, id: null };
      let arrastre = null, pellizco = null, cajaZoom = null, movido = 0;

      const frena = () => {
        if (Math.abs(inercia.vx) < 0.02 && Math.abs(inercia.vy) < 0.02) { inercia.id = null; return; }
        const antesX = cam.cx, antesY = cam.cy;
        cam.cx += inercia.vx; cam.cy += inercia.vy;
        dibujaCamara();
        // Si ha topado con el borde, se detiene en vez de seguir empujando contra la pared.
        if (Math.abs(cam.cx - antesX) < Math.abs(inercia.vx) * .5 && Math.abs(cam.cy - antesY) < Math.abs(inercia.vy) * .5) { inercia.id = null; return; }
        inercia.vx *= 0.93; inercia.vy *= 0.93;
        inercia.id = requestAnimationFrame(frena);
      };

      wrap.addEventListener('pointerdown', ev => {
        if (ev.target.closest('.lv__bar, .lv__nav, .lv__guia')) return;
        para();
        punteros.set(ev.pointerId, ev);
        try { wrap.setPointerCapture(ev.pointerId); } catch (e) { }
        movido = 0;
        if (punteros.size === 2) {
          const [a, b] = [...punteros.values()];
          const [ax, ay] = aViewBox(a), [bx, by] = aViewBox(b);
          pellizco = { d: Math.hypot(ax - bx, ay - by), z: cam.z };
          arrastre = null; wrap.classList.remove('is-drag');
        } else if (ev.shiftKey) {
          const [sx, sy] = aViewBox(ev);
          cajaZoom = { x0: sx, y0: sy };                       // mayúsculas + arrastrar = encuadrar
          $('#lvcaja').hidden = false;
        } else {
          const [sx, sy] = aViewBox(ev);
          arrastre = { sx, sy, cx: cam.cx, cy: cam.cy, t: performance.now() };
          wrap.classList.add('is-drag');
        }
      });

      wrap.addEventListener('pointermove', ev => {
        if (!punteros.has(ev.pointerId)) return;
        punteros.set(ev.pointerId, ev);
        movido += Math.abs(ev.movementX || 0) + Math.abs(ev.movementY || 0);
        if (pellizco && punteros.size >= 2) {
          const [a, b] = [...punteros.values()];
          const [ax, ay] = aViewBox(a), [bx, by] = aViewBox(b);
          const d = Math.hypot(ax - bx, ay - by);
          if (pellizco.d > 4) zoomHacia(pellizco.z * (d / pellizco.d), (ax + bx) / 2, (ay + by) / 2);
          return;
        }
        if (cajaZoom) {
          const [sx, sy] = aViewBox(ev);
          cajaZoom.x1 = sx; cajaZoom.y1 = sy;
          const r = $('#lvcaja');
          r.setAttribute('x', Math.min(cajaZoom.x0, sx)); r.setAttribute('y', Math.min(cajaZoom.y0, sy));
          r.setAttribute('width', Math.abs(sx - cajaZoom.x0)); r.setAttribute('height', Math.abs(sy - cajaZoom.y0));
          return;
        }
        if (!arrastre) return;
        const [sx, sy] = aViewBox(ev);
        const antesX = cam.cx, antesY = cam.cy;
        cam.cx = arrastre.cx - (sx - arrastre.sx) / cam.z;
        cam.cy = arrastre.cy - (sy - arrastre.sy) / cam.z;
        const dt = Math.max(8, performance.now() - arrastre.t);
        inercia.vx = (cam.cx - antesX) * (16 / dt); inercia.vy = (cam.cy - antesY) * (16 / dt);
        arrastre.t = performance.now();
        pinta();
      });

      const suelta = ev => {
        punteros.delete(ev.pointerId);
        try { wrap.releasePointerCapture(ev.pointerId); } catch (e) { }
        if (pellizco && punteros.size < 2) pellizco = null;
        if (cajaZoom) {
          const c = cajaZoom; cajaZoom = null;
          const r = $('#lvcaja'); r.hidden = true;
          const an = Math.abs((c.x1 ?? c.x0) - c.x0), al = Math.abs((c.y1 ?? c.y0) - c.y0);
          if (an > 12 && al > 12) {
            const z = Math.min(Z_MAX, cam.z * Math.min(W / an, H / al) * 0.92);
            vuela({ z, cx: deX((c.x0 + c.x1) / 2), cy: deY((c.y0 + c.y1) / 2) });
          }
        }
        if (arrastre) {
          arrastre = null; wrap.classList.remove('is-drag');
          if (!MENOS_MOVIMIENTO.matches && (Math.abs(inercia.vx) > 0.05 || Math.abs(inercia.vy) > 0.05)) {
            if (inercia.id) cancelAnimationFrame(inercia.id);
            inercia.id = requestAnimationFrame(frena);
          }
        }
      };
      wrap.addEventListener('pointerup', suelta);
      wrap.addEventListener('pointercancel', suelta);

      // Doble clic acerca en ese punto; con alt, aleja.
      wrap.addEventListener('dblclick', ev => {
        ev.preventDefault();
        const [sx, sy] = aViewBox(ev);
        pasoZoom(ev.altKey ? 1 / 2.2 : 2.2, sx, sy, 420);
      });

      /* --- teclado: el mapa es un control y se maneja sin ratón --- */
      wrap.addEventListener('keydown', ev => {
        const paso = (ev.shiftKey ? 0.28 : 0.1) * W / cam.z;
        const t = { ArrowLeft: [-paso, 0], ArrowRight: [paso, 0], ArrowUp: [0, -paso], ArrowDown: [0, paso] }[ev.key];
        if (t) { para(); cam.cx += t[0]; cam.cy += t[1]; pinta(); ev.preventDefault(); return; }
        if (ev.key === '+' || ev.key === '=') { pasoZoom(1.8, W / 2, H / 2, 300); ev.preventDefault(); }
        else if (ev.key === '-' || ev.key === '_') { pasoZoom(1 / 1.8, W / 2, H / 2, 300); ev.preventDefault(); }
        else if (ev.key === '0') { vuela({ z: 1, cx: W / 2, cy: H / 2 }); ev.preventDefault(); }
      });

      $('#lvzin').onclick = () => pasoZoom(1.8, W / 2, H / 2);
      $('#lvzout').onclick = () => pasoZoom(1 / 1.8, W / 2, H / 2);
      $('#lvreset').onclick = () => vuela({ z: 1, cx: W / 2, cy: H / 2 });
      $('#lvfit').onclick = () => encuadraVisitantes();

      // Encuadrar a los visitantes: la caja que los contiene a todos, con margen.
      function encuadraVisitantes() {
        const p = (datos && datos.puntos) || [];
        if (!p.length) { A.toast('Ahora mismo no hay nadie en la tienda'); return; }
        const xs = p.map(q => px(q.lon)), ys = p.map(q => py(q.lat));
        const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
        const an = Math.max(24, x1 - x0), al = Math.max(24, y1 - y0);
        vuela({ z: Math.min(Z_MAX, Math.min(W / an, H / al) * 0.7), cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 });
      }

      // Mapa guía: qué trozo del mundo se está viendo. Sólo aparece cuando hay zoom.
      function dibujaGuia() {
        const g = $('#lvguia');
        g.hidden = cam.z <= 1.15;
        if (g.hidden) return;
        const c = $('#lvguiacaja'), vw = W / cam.z, vh = H / cam.z;
        c.setAttribute('x', (cam.cx - vw / 2).toFixed(1)); c.setAttribute('y', (cam.cy - vh / 2).toFixed(1));
        c.setAttribute('width', vw.toFixed(1)); c.setAttribute('height', vh.toFixed(1));
      }

      // Barra de escala de verdad: en Miller la longitud es lineal, así que un grado mide
      // 111,32 km × cos(latitud). Se busca un número redondo (1, 2 o 5 × 10ⁿ) que quepa.
      function dibujaEscala() {
        const kmPorUnidad = (360 / W) * 111.320 * Math.cos(latDe(cam.cy) * RAD) / cam.z;
        const objetivo = 150 * kmPorUnidad;
        const exp = Math.pow(10, Math.floor(Math.log10(Math.max(0.001, objetivo))));
        const km = [1, 2, 5, 10].map(k => k * exp).find(k => k >= objetivo) || 10 * exp;
        const r = svg.getBoundingClientRect(), k = Math.min(r.width / W, r.height / H) || 1;
        const e = $('#lvescala');
        e.firstElementChild.style.width = Math.round(km / kmPorUnidad * k) + 'px';
        e.lastElementChild.textContent = km >= 1 ? Math.round(km).toLocaleString('es-ES') + ' km' : Math.round(km * 1000) + ' m';
      }

      /* ═══════════════ CAPAS EN PANTALLA (no crecen con el zoom) ═══════════════ */
      let datos = null, cluster = [];

      function dibujaCapas() { if (datos) { dibujaEtiquetas(); dibujaHaces(); dibujaPuntos(); } }

      // Nombres de país. Aparecen según lo que ocupa el país EN PANTALLA, así que al acercarte
      // salen primero los grandes y luego los pequeños, y nunca se pisan entre ellos.
      // Los controles flotan sobre el mapa, así que un nombre de país puede acabar debajo de un
      // botón. En vez de reservar márgenes a ojo, se leen las cajas reales de los controles y se
      // pasan a unidades del mapa: así sigue siendo correcto aunque cambie el diseño.
      function zonasDeControles() {
        const r = svg.getBoundingClientRect();
        const k = Math.min(r.width / W, r.height / H) || 1;
        const dx = (r.width - W * k) / 2, dy = (r.height - H * k) / 2;
        return ['.lv__nav', '.lv__guia:not([hidden])', '.lv__escala', '.lv__leyenda', '.lv__bar', '.lv__ayuda']
          .map(sel => el.querySelector(sel)).filter(Boolean)
          .map(n => { const b = n.getBoundingClientRect(); if (!b.width) return null;
            return { x0: (b.left - r.left - dx) / k, x1: (b.right - r.left - dx) / k,
                     y0: (b.top - r.top - dy) / k, y1: (b.bottom - r.top - dy) / k }; })
          .filter(Boolean);
      }

      function dibujaEtiquetas() {
        if (cam.z < 1.6) { $('#lvetiq').innerHTML = ''; return; }
        const veto = zonasDeControles();
        const ocupado = [], salida = [];
        const cand = m.paises.filter(p => p.x != null)
          .map(p => ({ p, s: Math.sqrt(p.a || 0) * cam.z }))
          .filter(o => o.s > 26).sort((x, y) => y.s - x.s);
        for (const { p } of cand) {
          if (salida.length >= 34) break;
          const x = aX(p.x), y = aY(p.y);
          if (x < 14 || x > W - 14 || y < 10 || y > H - 10) continue;
          const nombre = p.c ? paisNombre(p.c) : p.n;
          const an = (nombre.length * 4.1 + 6) * U, al = 12 * U;
          if (veto.some(v => x + an / 2 > v.x0 && x - an / 2 < v.x1 && y + al / 2 > v.y0 && y - al / 2 < v.y1)) continue;
          if (ocupado.some(o => Math.abs(o.x - x) < (o.an + an) / 2 && Math.abs(o.y - y) < (o.al + al) / 2)) continue;
          ocupado.push({ x, y, an, al });
          salida.push(`<text x="${x.toFixed(1)}" y="${y.toFixed(1)}">${esc(nombre)}</text>`);
        }
        $('#lvetiq').innerHTML = salida.join('');
      }

      function dibujaHaces() {
        $('#lvhaces').innerHTML = (datos.ventas || []).map(v => {
          const x = aX(px(v.lon)), y = aY(py(v.lat));
          if (x < -40 || x > W + 40 || y < -80 || y > H + 40) return '';
          const alto = (14 + Math.min(46, Math.sqrt(Math.max(0, v.total)) * 6)) * U;
          const gr = 1.35 * U;
          const op = Math.max(.18, 1 - (v.hace || 0) / 5400);
          return `<g class="lv-haz" opacity="${op.toFixed(2)}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">`
            + `<circle r="${(9 * U).toFixed(2)}" fill="url(#lvhazglow)"/>`
            + `<rect x="${(-gr).toFixed(2)}" y="${(-alto).toFixed(1)}" width="${(gr * 2).toFixed(2)}" height="${alto.toFixed(1)}" fill="url(#lvhaz)" rx="${gr.toFixed(2)}"/>`
            + `<circle r="${(2.6 * U).toFixed(2)}" fill="#FFF3C4"/><circle r="${(1.4 * U).toFixed(2)}" fill="#FFFFFF"/><title>${esc(A.money(v.total) + ' · ' + lugar(v) + ' · ' + hace(v.hace))}</title></g>`;
        }).join('');
      }

      // Agrupación: dos visitantes en el mismo píxel no se distinguen, así que se funden en un grupo
      // con su cuenta. Como el radio es en pantalla, al acercarte los grupos se abren solos.
      // El color lo manda el que va más avanzado: nunca se esconde una compra debajo de un montón.
      function agrupa(pts) {
        const R = 15 * U, out = [];      // 15 px de pantalla, no 15 unidades del mapa
        for (const p of pts) {
          const x = aX(px(p.lon)), y = aY(py(p.lat));
          if (x < -20 || x > W + 20 || y < -20 || y > H + 20) continue;
          const cerca = out.find(o => Math.hypot(o.x - x, o.y - y) < R);
          if (cerca) { cerca.hijos.push(p); cerca.nivel = Math.max(cerca.nivel, p.nivel || 0); }
          else out.push({ x, y, nivel: p.nivel || 0, hijos: [p] });
        }
        return out;
      }

      function dibujaPuntos() {
        cluster = agrupa(datos.puntos || []);
        const conNombre = cam.z >= 3.2;
        $('#lvpuntos').innerHTML = cluster.map((c, i) => {
          const e = ETAPA[Math.min(4, c.nivel)], n = c.hijos.length;
          const acc = c.hijos.reduce((s, h) => s + (h.n || 1), 0);
          const r = (n > 1 ? 4.6 + Math.min(4.4, Math.log2(n + 1) * 1.7)
                           : 2.8 + Math.min(2.6, Math.log2(acc + 1) * .75)) * U;
          const nuevo = c.hijos.some(h => (h.hace || 0) < 45);
          const etq = conNombre && n === 1 && c.hijos[0].ciudad
            ? `<text class="lv-pt__n" x="${(r + 3.4 * U).toFixed(1)}" y="${(2.6 * U).toFixed(1)}">${esc(c.hijos[0].ciudad)}</text>` : '';
          const id = n === 1 ? ` data-id="${esc(c.hijos[0].id || '')}"` : '';
          return `<g class="lv-pt${n > 1 ? ' es-grupo' : ''}" data-i="${i}"${id} transform="translate(${c.x.toFixed(1)} ${c.y.toFixed(1)})">`
            + (nuevo ? `<circle class="lv-pt__ping" r="${(r * 2.9).toFixed(1)}" fill="${e.c}"/>` : '')
            + `<circle class="lv-pt__h" r="${(r * 2.2).toFixed(1)}" fill="url(#lvhalo)"/>`
            + `<circle class="lv-pt__c" r="${r.toFixed(1)}" fill="${e.c}"/>`
            + (n > 1 ? `<text class="lv-pt__k" y="${(r * .36).toFixed(1)}">${n}</text>` : '') + etq + '</g>';
        }).join('');
      }

      /* --- tocar un punto --- */
      const muestraTip = (html, ev) => {
        tip.innerHTML = html; tip.hidden = false;
        const r = wrap.getBoundingClientRect(), b = tip.getBoundingClientRect();
        let x = ev.clientX - r.left + 14, y = ev.clientY - r.top + 14;
        if (x + b.width > r.width - 8) x = ev.clientX - r.left - b.width - 14;
        if (y + b.height > r.height - 8) y = ev.clientY - r.top - b.height - 14;
        tip.style.left = Math.max(8, x) + 'px'; tip.style.top = Math.max(8, y) + 'px';
      };
      wrap.addEventListener('pointerleave', () => { tip.hidden = true; });
      $('#lvpuntos').addEventListener('pointermove', ev => {
        const g = ev.target.closest('.lv-pt'); if (!g) { tip.hidden = true; return; }
        const c = cluster[+g.dataset.i]; if (!c) return;
        if (c.hijos.length > 1) {
          const porEtapa = {};
          c.hijos.forEach(h => { const n = ETAPA[Math.min(4, h.nivel || 0)].n; porEtapa[n] = (porEtapa[n] || 0) + 1; });
          muestraTip(`<b>${c.hijos.length} personas aquí</b>`
            + Object.entries(porEtapa).map(([k, v]) => `<span>${esc(v + ' · ' + k)}</span>`).join('')
            + '<span class="lv__tip-ir">Pulsa para separarlas</span>', ev);
          return;
        }
        const p = c.hijos[0], e = ETAPA[Math.min(4, p.nivel || 0)];
        muestraTip(`<b>${esc(bandera(p.pais) + ' ' + lugar(p))}</b>`
          + `<span class="lv__tip-e" style="--c:${e.c}">${esc(e.n)}</span>`
          + `<span>${esc(pagina(p.path))} · ${esc(aparato(p.dev))}</span>`
          + `<span class="muted">${esc(p.n + ' ' + (p.n === 1 ? 'acción' : 'acciones'))} · ${esc(hace(p.hace))}`
          + (p.aprox ? ' · posición aproximada' : '') + '</span>'
          + (p.id ? '<span class="lv__tip-ir">Pulsa para ver su recorrido</span>' : ''), ev);
      });
      // Un clic que viene de arrastrar no debe abrir nada.
      $('#lvpuntos').addEventListener('click', ev => {
        if (movido > 6) return;
        const g = ev.target.closest('.lv-pt'); if (!g) return;
        const c = cluster[+g.dataset.i]; if (!c) return;
        if (c.hijos.length > 1) { pasoZoom(2.6, c.x, c.y, 420); return; }
        const id = c.hijos[0].id;
        if (id) A.go('people/' + encodeURIComponent(id));
      });

      /* ═══════════════ DATOS ═══════════════ */
      let pausado = false, minutos = 5, timer = null, reloj = null;
      const bPausa = $('#lvpause');
      bPausa.onclick = () => {
        pausado = !pausado;
        bPausa.textContent = pausado ? '▶' : '❚❚';
        bPausa.title = bPausa.ariaLabel = pausado ? 'Reanudar la actualización' : 'Pausar la actualización';
        bPausa.classList.toggle('is-on', pausado);
        if (!pausado) tira();
      };
      $('#lvmin').onchange = e => { minutos = Number(e.target.value); tira(); };

      const delta = (hoy, ayer) => {
        if (!ayer) return hoy ? '<span class="dl dl--up">nuevo</span>' : '';
        const d = Math.round((hoy - ayer) / ayer * 100);
        if (!isFinite(d) || d === 0) return '<span class="dl">=</span>';
        return `<span class="dl dl--${d > 0 ? 'up' : 'dn'}">${d > 0 ? '+' : ''}${d} %</span>`;
      };

      function pintaTodo(d) {
        datos = d;
        const a = d.ahora || {}, h = d.hoy || {}, y = d.ayer || {}, hs = d.horas || [];
        $('#lvnow').textContent = a.personas || 0;
        $('#lvnowsub').textContent = (a.personas === 1 ? 'persona' : 'personas') + ' · ' + (d.ventana_min || 5) + ' min';
        $('#lvvent').textContent = 'últimos ' + (d.ventana_min || 5) + ' min';

        $('#lvtot').innerHTML = [
          ['Visitas', String(h.visitas || 0), hs.map(x => x.visitas), h.visitas, y.visitas, chispa],
          ['Páginas', String(h.vistas || 0), hs.map(x => x.vistas), h.vistas, y.vistas, chispa],
          ['Pedidos', String(h.pedidos || 0), hs.map(x => x.pedidos), h.pedidos, y.pedidos, chispaBarras],
          ['Vendido', A.money(h.ventas), hs.map(x => x.ventas), h.ventas, y.ventas, chispaBarras],
        ].map(([n, v, serie, hoy, ayer, dibuja]) =>
          `<div class="lv__tt"><small>${esc(n)}</small><b>${esc(v)}</b>`
          + `<span class="lv__tt-g" title="Por horas, desde que ha empezado el día">${dibuja(serie)}</span>`
          + `<span class="lv__tt-d">${delta(hoy, ayer)}</span></div>`).join('');

        const conVisitas = new Set((d.paises || []).map(p => p[0]));
        $$('#lvmundo .lv-pais').forEach(p => p.classList.toggle('on', conVisitas.has(p.dataset.c)));

        dibujaCapas();

        const vivos = Math.max(1, a.personas || 0);
        const fases = [['Mirando', a.navegando || 0, ETAPA[0].cl], ['Con carrito', a.carrito || 0, ETAPA[2].cl],
          ['Pagando', a.pagando || 0, ETAPA[3].cl], ['Han comprado', a.comprando || 0, ETAPA[4].cl]];
        const salto = i => {
          if (!i) return '';
          const de = fases[i - 1][1];
          if (!de) return '<span class="lv__sf">—</span>';
          return `<span class="lv__sf" title="De «${esc(fases[i - 1][0])}» a «${esc(fases[i][0])}»">${Math.round(fases[i][1] / de * 100)} %</span>`;
        };
        $('#lvcomp').innerHTML = (a.personas || 0)
          ? `<div class="lv__curvas">${fases.map(([n, v, c], i) =>
              (i ? `<div class="lv__paso">${salto(i)}</div>` : '')
              + `<figure class="lv__cv"><svg viewBox="0 0 120 60" preserveAspectRatio="none" aria-hidden="true">`
              + `<path d="${campana(v / vivos)}" fill="${c}" fill-opacity=".92"/></svg>`
              + `<figcaption><b class="num">${v}</b><span>${esc(n)}</span></figcaption></figure>`).join('')}</div>`
          : '<p class="muted sm">Nadie en la tienda ahora mismo.</p>';

        const mins = d.minutos || [], max = Math.max(1, ...mins.map(x => x.v));
        $('#lvpulso').innerHTML =
          `<div class="lv__pw"><div class="lv__pe xs muted"><span>${max}</span><span>${Math.round(max / 2)}</span><span>0</span></div>`
          + `<div class="lv__pb">${mins.map(x =>
            `<i style="height:${Math.max(2, x.v / max * 100).toFixed(1)}%" title="${esc(x.m + ' · ' + x.v + ' páginas · ' + x.p + ' personas')}"></i>`).join('')}</div></div>`
          + `<div class="lv__px xs muted"><span>hace 30 min</span><span>ahora</span></div>`;

        $('#lvfeed').innerHTML = (d.feed || []).map(f => {
          const dentro = `<span class="feed__t xs muted num">${esc(hace(f.hace))}</span>`
            + `<span class="feed__x">${esc(bandera(f.pais))} <b>${esc(f.ciudad || paisNombre(f.pais))}</b> ${esc(frase(f))}</span>`;
          const cls = 'feed__i' + (f.ev === 'purchase' ? ' feed__i--win' : '');
          return f.id ? `<li class="${cls}"><a class="feed__a" href="#/people/${encodeURIComponent(f.id)}">${dentro}</a></li>`
                      : `<li class="${cls}">${dentro}</li>`;
        }).join('') || '<li class="muted sm">Sin actividad todavía.</li>';

        const barras = (filas, fmt) => {
          const mx = Math.max(1, ...filas.map(r => r[1]));
          return filas.length ? `<div class="lv__rank">${filas.map(r =>
            `<div class="lv__rk"><span class="lv__rn">${fmt(r[0])}</span>`
            + `<span class="lv__rb"><i style="width:${(r[1] / mx * 100).toFixed(1)}%"></i></span>`
            + `<b class="num">${r[1]}</b></div>`).join('')}</div>` : '<p class="muted sm">Todavía nada hoy.</p>';
        };
        $('#lvrank-paises').innerHTML = barras(d.paises || [], c => esc(bandera(c) + ' ' + paisNombre(c)));
        $('#lvpags').innerHTML = barras(d.paginas || [], p => esc(pagina(p)));

        // Si el servidor no manda la marca de tiempo, vale la del navegador: antes se leía
        // «al día · Invalid Date», que es peor que no poner nada.
        const marca = new Date(d.t || Date.now());
        $('#lvsync').textContent = 'al día · ' + (isNaN(marca) ? new Date() : marca).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        A.fit(el);
      }

      /* --- ciclo. Se corta solo cuando el nodo sale de la página (el router sustituye #main). --- */
      async function tira() {
        if (!document.contains(el)) { clearInterval(timer); clearInterval(reloj); return; }
        if (pausado) return;
        try { pintaTodo(await A.api('live?min=' + minutos + '&feed=40')); }
        catch (e) { $('#lvsync').textContent = 'sin conexión'; }
      }

      // Si cambia el tamaño de la ventana, la barra de escala deja de ser cierta.
      const alRedimensionar = () => { if (document.contains(el)) dibujaEscala(); else removeEventListener('resize', alRedimensionar); };
      addEventListener('resize', alRedimensionar);

      dibujaCamara();
      await tira();
      timer = setInterval(tira, 10000);
      reloj = setInterval(() => { if (document.contains(el)) pintaNoche(); else clearInterval(reloj); }, 60000);
    },
  });
})();
