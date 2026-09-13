/* NOCTA CRM · «En vivo»: el mapa del mundo con quién está en la tienda ahora mismo.
   Todo el cálculo lo hace la base de datos (RPC live_map) y llega en un único JSON; aquí sólo se dibuja.
   Sin librerías: el mapa es un SVG y los contornos vienen de mundo.js, ya proyectados.
   La proyección es Miller cilíndrica y está repetida aquí igual que en tools/crm-qa/gen_mundo.py,
   porque hay que proyectar también los puntos de los visitantes con la misma fórmula. */
(function () {
  const { esc } = A;
  const RAD = Math.PI / 180;

  /* ---------- proyección (misma fórmula que generó mundo.js) ---------- */
  const millerY = lat => 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * Math.max(-89.5, Math.min(89.5, lat)) * RAD));
  const M = () => window.MUNDO;
  const escala = () => M().w / (2 * Math.PI);
  const y0 = () => millerY(M().latMax);
  const px = lon => (lon + 180) / 360 * M().w;
  const py = lat => (y0() - millerY(lat)) * escala();

  /* ---------- el sol: dónde es de noche ahora mismo ----------
     NOCTA se usa de noche, así que el mapa dibuja la noche de verdad, no un adorno.
     Posición subsolar por el algoritmo astronómico estándar (precisión de minutos, de sobra). */
  function subsolar(fecha) {
    const jd = fecha.getTime() / 86400000 + 2440587.5;
    const n = jd - 2451545.0;
    const L = (280.460 + 0.9856474 * n) % 360;
    const g = ((357.528 + 0.9856003 * n) % 360) * RAD;
    const lambda = (L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * RAD;
    const eps = (23.439 - 0.0000004 * n) * RAD;
    const dec = Math.asin(Math.sin(eps) * Math.sin(lambda));
    const alfa = Math.atan2(Math.cos(eps) * Math.sin(lambda), Math.cos(lambda));
    const gmst = (280.46061837 + 360.98564736629 * n) % 360;
    const lon = ((alfa / RAD - gmst + 540) % 360) - 180;
    return { dec, lon };
  }
  // Polígono de la zona en sombra. El terminador es donde el sol está justo en el horizonte:
  // tan(lat) = -cos(H)/tan(dec), con H el ángulo horario. Se cierra por el polo que está a oscuras.
  function rutaNoche(fecha) {
    const { dec, lon: lonSol } = subsolar(fecha);
    const tanDec = Math.tan(dec);
    if (Math.abs(tanDec) < 1e-6) return '';                 // equinoccio exacto: el terminador es un meridiano
    const polo = dec > 0 ? -90 : 90;                        // verano boreal ⇒ el polo sur está a oscuras
    const pts = [];
    for (let lon = -180; lon <= 180; lon += 1.5) {
      const H = (lon - lonSol) * RAD;
      let lat = Math.atan(-Math.cos(H) / tanDec) / RAD;
      lat = Math.max(-89.9, Math.min(89.9, lat));
      pts.push([px(lon), py(lat)]);
    }
    const yPolo = py(polo);
    return 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('L')
      + `L${M().w},${yPolo.toFixed(1)}L0,${yPolo.toFixed(1)}Z`;
  }

  /* ---------- etapas ---------- */
  const ETAPA = [
    { k: 'mirando',   n: 'Mirando',        c: '#8FA6C8' },
    { k: 'producto',  n: 'En un producto', c: '#CFE0F2' },
    { k: 'carrito',   n: 'Con carrito',    c: '#E8B15C' },
    { k: 'pagando',   n: 'Pagando',        c: '#F0834A' },
    { k: 'comprando', n: 'Ha comprado',    c: '#F5D061' },
  ];
  const paisNombre = (() => {
    let dn = null;
    try { dn = new Intl.DisplayNames(['es'], { type: 'region' }); } catch (e) { }
    return c => { if (!c || c === '??') return 'Desconocido'; try { return dn ? dn.of(c) || c : c; } catch (e) { return c; } };
  })();
  const bandera = c => (c && /^[A-Z]{2}$/.test(c))
    ? String.fromCodePoint(...[...c].map(x => 0x1F1E6 + x.charCodeAt(0) - 65)) : '🌐';
  const hace = s => s < 10 ? 'ahora' : s < 60 ? 'hace ' + Math.round(s) + ' s'
    : s < 3600 ? 'hace ' + Math.round(s / 60) + ' min' : 'hace ' + Math.round(s / 3600) + ' h';
  const lugar = p => [p.ciudad, paisNombre(p.pais)].filter(Boolean).join(', ') || 'Sin localizar';

  /* ---------- el feed, en español ---------- */
  const FRASE = {
    page_view: f => 'ha abierto ' + pagina(f.path),
    view_item: f => 'está mirando ' + producto(f.slug),
    add_to_cart: f => 'ha metido ' + producto(f.slug) + ' en el carrito',
    remove_from_cart: f => 'ha sacado ' + producto(f.slug) + ' del carrito',
    begin_checkout: f => 'ha empezado a pagar',
    purchase: f => 'HA COMPRADO' + (f.valor ? ' · ' + A.money(f.valor) : ''),
    lead: () => 'ha dejado su correo',
    cta_hero: () => 'ha pulsado el botón de la portada',
    open_cart: () => 'ha abierto el carrito',
    quiz_done: () => 'ha terminado el test de piel',
    search: () => 'ha buscado algo',
    select_plan: f => 'está mirando el plan ' + (f.slug || ''),
    video_play: () => 'ha dado al vídeo',
  };
  const producto = s => { const p = s && A.product(s); return p ? '«' + p.name + '»' : (s ? '«' + s + '»' : 'un producto'); };
  const PAG = { '/': 'la portada', '/index.html': 'la portada', '/catalogo.html': 'el catálogo', '/producto.html': 'una ficha de producto',
    '/checkout.html': 'el pago', '/gracias.html': 'la página de gracias', '/como-usar.html': 'cómo usar', '/garantia.html': 'la garantía',
    '/test-piel.html': 'el test de piel', '/ciencia.html': 'la ciencia', '/contacto.html': 'contacto' };
  const pagina = p => PAG[p] || (p || 'una página');
  const frase = f => (FRASE[f.ev] ? FRASE[f.ev](f) : f.ev.replace(/_/g, ' '));


  /* ---------- dibujos pequeños ---------- */
  // Línea fina de tendencia. Se dibuja el área y la línea; si todos los valores son iguales
  // (o hay uno solo) sale una raya recta a media altura, que es lo honesto.
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
  // une con una rampa dos horas sin nada. Se dibujan en barras, que es lo que son.
  function chispaBarras(vals, w = 74, h = 22) {
    const v = (vals || []).map(x => Number(x) || 0);
    if (!v.length) return `<svg class="spk" viewBox="0 0 ${w} ${h}" aria-hidden="true"><line x1="0" y1="${h - 1}" x2="${w}" y2="${h - 1}"/></svg>`;
    const max = Math.max(...v) || 1, ancho = w / v.length;
    return `<svg class="spk" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">`
      + v.map((x, i) => {
        const alto = x ? Math.max(1.4, x / max * (h - 2)) : 0.9;
        return `<rect class="spk__b${x ? '' : ' es-cero'}" x="${(i * ancho + ancho * .15).toFixed(2)}" y="${(h - alto).toFixed(2)}" `
          + `width="${(ancho * .7).toFixed(2)}" height="${alto.toFixed(2)}"/>`;
      }).join('') + '</svg>';
  }
  // Campana cuya ALTURA es la proporción sobre el total. Es la forma de la referencia de Shopify,
  // pero aquí el ancho también se estrecha con la proporción, así que una etapa con poca gente
  // se ve estrecha y baja en vez de baja y ancha: se lee mejor el estrechamiento del embudo.
  function campana(prop, w = 120, h = 60) {
    const alto = Math.max(.035, prop) * (h - 6);
    const sigma = w * (0.10 + 0.10 * Math.max(.12, prop));
    const cx = w / 2, pasos = 34, p = [];
    for (let i = 0; i <= pasos; i++) {
      const x = (i / pasos) * w;
      p.push([x, h - alto * Math.exp(-((x - cx) ** 2) / (2 * sigma * sigma))]);
    }
    return `M0,${h}` + p.map(q => `L${q[0].toFixed(1)},${q[1].toFixed(1)}`).join('') + `L${w},${h}Z`;
  }

  /* ---------- vista ---------- */
  A.mod('live', {
    title: 'En vivo', icon: '◉', group: 'Panel',
    render: async (el) => {
      if (!window.MUNDO) { el.innerHTML = '<div class="card"><p class="err">No se ha podido cargar la geometría del mapa (mundo.js).</p></div>'; return; }
      const m = M();
      el.innerHTML = `
<div class="lv">
  <section class="lv__map" id="lvmap">
    <header class="lv__tot">
      <div class="lv__tot-now">
        <small>Ahora mismo</small>
        <b><i class="lv__pulso-i"></i><span id="lvnow">—</span></b>
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
        <button class="lv__b" id="lvzout" title="Alejar" aria-label="Alejar">−</button>
        <button class="lv__b" id="lvzin" title="Acercar" aria-label="Acercar">+</button>
        <button class="lv__b" id="lvreset" title="Centrar el mapa" aria-label="Centrar el mapa">◎</button>
        <button class="lv__b" id="lvpause" title="Pausar la actualización" aria-label="Pausar la actualización">❚❚</button>
      </div>
      <svg id="lvsvg" viewBox="0 0 ${m.w} ${m.h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mapa del mundo con los visitantes de la tienda en tiempo real">
        <defs>
          <radialGradient id="lvhalo"><stop offset="0%" stop-color="#fff" stop-opacity=".55"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient>
          <linearGradient id="lvhaz" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stop-color="#F5D061" stop-opacity=".85"/><stop offset="100%" stop-color="#F5D061" stop-opacity="0"/>
          </linearGradient>
          <filter id="lvdusk" x="-6%" y="-30%" width="112%" height="160%"><feGaussianBlur stdDeviation="7"/></filter>
        </defs>
        <rect class="lv-mar" x="0" y="0" width="${m.w}" height="${m.h}"/>
        <g id="lvcam">
          <g id="lvgrat"></g>
          <g id="lvpaises"></g>
          <path id="lvnoche" class="lv-noche"/>
          <g id="lvhaces"></g>
          <g id="lvpuntos"></g>
        </g>
      </svg>
      <div class="lv__tip" id="lvtip" hidden></div>
      <div class="lv__leyenda" id="lvleg"></div>
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

      /* --- mapa base: se dibuja una vez --- */
      const svg = el.querySelector('#lvsvg');
      const gPaises = el.querySelector('#lvpaises');
      gPaises.innerHTML = m.paises.map(p =>
        `<path class="lv-pais" data-c="${esc(p.c || '')}" d="${p.d}"><title>${esc(p.n)}</title></path>`).join('');
      // Retícula discreta cada 30°, para que se lea que es un mapa y no una mancha.
      const grat = [];
      for (let lon = -150; lon <= 150; lon += 30) grat.push(`<line x1="${px(lon).toFixed(1)}" y1="0" x2="${px(lon).toFixed(1)}" y2="${m.h}"/>`);
      for (let lat = -60; lat <= 75; lat += 30) grat.push(`<line x1="0" y1="${py(lat).toFixed(1)}" x2="${m.w}" y2="${py(lat).toFixed(1)}"/>`);
      el.querySelector('#lvgrat').innerHTML = grat.join('');
      el.querySelector('#lvleg').innerHTML = ETAPA.map(e =>
        `<span class="lv__lg"><i style="background:${e.c}"></i>${esc(e.n)}</span>`).join('');

      /* --- noche: se recalcula cada minuto, no en cada refresco --- */
      const pintaNoche = () => { el.querySelector('#lvnoche').setAttribute('d', rutaNoche(new Date())); };
      pintaNoche();

      /* --- cámara: zoom y arrastre como transformación afín --- */
      const cam = el.querySelector('#lvcam');
      let z = 1, cx = m.w / 2, cy = m.h / 2;
      const aplica = () => {
        z = Math.max(1, Math.min(9, z));
        const vw = m.w / z, vh = m.h / z;
        cx = Math.max(vw / 2, Math.min(m.w - vw / 2, cx));
        cy = Math.max(vh / 2, Math.min(m.h - vh / 2, cy));
        cam.setAttribute('transform', `translate(${m.w / 2 - cx * z} ${m.h / 2 - cy * z}) scale(${z})`);
        el.querySelector('#lvwrap').classList.toggle('is-zoom', z > 1.02);
        // Los puntos no deben engordar con el zoom: se compensa la escala.
        cam.style.setProperty('--z', z);
      };
      const wrap = el.querySelector('#lvwrap');
      wrap.addEventListener('wheel', e => {
        e.preventDefault();
        const r = svg.getBoundingClientRect();
        // Punto del mapa bajo el cursor, para hacer zoom hacia donde se mira.
        const ux = cx + ((e.clientX - r.left) / r.width - .5) * (m.w / z);
        const uy = cy + ((e.clientY - r.top) / r.height - .5) * (m.h / z);
        const z0 = z; z = Math.max(1, Math.min(9, z * (e.deltaY < 0 ? 1.16 : 1 / 1.16)));
        cx += (ux - cx) * (1 - z0 / z); cy += (uy - cy) * (1 - z0 / z);
        aplica();
      }, { passive: false });
      let arr = null;
      wrap.addEventListener('pointerdown', e => { if (e.target.closest('.lv__bar')) return; arr = { x: e.clientX, y: e.clientY, cx, cy }; wrap.setPointerCapture(e.pointerId); wrap.classList.add('is-drag'); });
      wrap.addEventListener('pointermove', e => {
        if (!arr) return;
        const r = svg.getBoundingClientRect();
        cx = arr.cx - (e.clientX - arr.x) / r.width * (m.w / z);
        cy = arr.cy - (e.clientY - arr.y) / r.height * (m.h / z);
        aplica();
      });
      const suelta = e => { if (arr) { arr = null; wrap.classList.remove('is-drag'); try { wrap.releasePointerCapture(e.pointerId); } catch (x) { } } };
      wrap.addEventListener('pointerup', suelta); wrap.addEventListener('pointercancel', suelta);
      el.querySelector('#lvzin').onclick = () => { z *= 1.5; aplica(); };
      el.querySelector('#lvzout').onclick = () => { z /= 1.5; aplica(); };
      el.querySelector('#lvreset').onclick = () => { z = 1; cx = m.w / 2; cy = m.h / 2; aplica(); };
      aplica();

      /* --- tooltip --- */
      const tip = el.querySelector('#lvtip');
      const muestraTip = (html, ev) => {
        tip.innerHTML = html; tip.hidden = false;
        const r = wrap.getBoundingClientRect(), b = tip.getBoundingClientRect();
        let x = ev.clientX - r.left + 14, y = ev.clientY - r.top + 14;
        if (x + b.width > r.width - 8) x = ev.clientX - r.left - b.width - 14;
        if (y + b.height > r.height - 8) y = ev.clientY - r.top - b.height - 14;
        tip.style.left = Math.max(8, x) + 'px'; tip.style.top = Math.max(8, y) + 'px';
      };
      wrap.addEventListener('pointerleave', () => { tip.hidden = true; });

      /* --- estado y pintado --- */
      let ultimo = null, pausado = false, minutos = 5, timer = null, reloj = null;
      const bPausa = el.querySelector('#lvpause');
      bPausa.onclick = () => {
        pausado = !pausado;
        bPausa.textContent = pausado ? '▶' : '❚❚';
        bPausa.title = bPausa.ariaLabel = pausado ? 'Reanudar la actualización' : 'Pausar la actualización';
        bPausa.classList.toggle('is-on', pausado);
        if (!pausado) tira();
      };
      el.querySelector('#lvmin').onchange = e => { minutos = Number(e.target.value); tira(); };

      const delta = (hoy, ayer) => {
        if (!ayer) return hoy ? '<span class="dl dl--up">nuevo</span>' : '';
        const d = Math.round((hoy - ayer) / ayer * 100);
        if (!isFinite(d) || d === 0) return '<span class="dl">=</span>';
        return `<span class="dl dl--${d > 0 ? 'up' : 'dn'}">${d > 0 ? '+' : ''}${d} %</span>`;
      };

      function pinta(d) {
        ultimo = d;
        const a = d.ahora || {}, h = d.hoy || {}, y = d.ayer || {};
        el.querySelector('#lvnow').textContent = a.personas || 0;
        el.querySelector('#lvnowsub').textContent = (a.personas === 1 ? 'persona' : 'personas') + ' · ' + (d.ventana_min || 5) + ' min';
        el.querySelector('#lvvent').textContent = 'últimos ' + (d.ventana_min || 5) + ' min';
        const hs = d.horas || [];
        const tot = [
          ['Visitas', String(h.visitas || 0), hs.map(x => x.visitas), h.visitas, y.visitas, chispa],
          ['Páginas', String(h.vistas || 0), hs.map(x => x.vistas), h.vistas, y.vistas, chispa],
          ['Pedidos', String(h.pedidos || 0), hs.map(x => x.pedidos), h.pedidos, y.pedidos, chispaBarras],
          ['Vendido', A.money(h.ventas), hs.map(x => x.ventas), h.ventas, y.ventas, chispaBarras],
        ];
        el.querySelector('#lvtot').innerHTML = tot.map(([n, v, serie, hoy, ayer, dibuja]) =>
          `<div class="lv__tt"><small>${esc(n)}</small><b>${esc(v)}</b>`
          + `<span class="lv__tt-g" title="Por horas, desde que ha empezado el día">${dibuja(serie)}</span>`
          + `<span class="lv__tt-d">${delta(hoy, ayer)}</span></div>`).join('');

        // países con visitas hoy, resaltados
        const conVisitas = new Set((d.paises || []).map(p => p[0]));
        A.$$('#lvpaises .lv-pais', el).forEach(p => p.classList.toggle('on', conVisitas.has(p.dataset.c)));

        // puntos
        const pts = d.puntos || [];
        el.querySelector('#lvpuntos').innerHTML = pts.map((p, i) => {
          const e = ETAPA[Math.min(4, p.nivel || 0)];
          const x = px(p.lon).toFixed(1), yy = py(p.lat).toFixed(1);
          const r = 2.6 + Math.min(3.2, Math.log2((p.n || 1) + 1) * .9);
          const nuevo = (p.hace || 0) < 45;
          return `<g class="lv-pt${nuevo ? ' es-nuevo' : ''}" data-i="${i}" data-id="${esc(p.id || '')}" transform="translate(${x} ${yy})">`
            + (nuevo ? `<circle class="lv-pt__ping" r="${(r * 3.2).toFixed(1)}" fill="${e.c}"/>` : '')
            + `<circle class="lv-pt__h" r="${(r * 2.4).toFixed(1)}" fill="url(#lvhalo)"/>`
            + `<circle class="lv-pt__c" r="${r.toFixed(1)}" fill="${e.c}"/></g>`;
        }).join('');
        // Pulsar a alguien abre su recorrido completo: el mapa no es un adorno, es la puerta de entrada.
        el.querySelector('#lvpuntos').onclick = ev => {
          const g = ev.target.closest('.lv-pt'); const id = g && g.dataset.id;
          if (id) A.go('people/' + encodeURIComponent(id));
        };
        el.querySelector('#lvpuntos').onpointermove = ev => {
          const g = ev.target.closest('.lv-pt'); if (!g) { tip.hidden = true; return; }
          const p = pts[+g.dataset.i]; if (!p) return;
          const e = ETAPA[Math.min(4, p.nivel || 0)];
          muestraTip(`<b>${esc(bandera(p.pais) + ' ' + lugar(p))}</b>`
            + `<span class="lv__tip-e" style="--c:${e.c}">${esc(e.n)}</span>`
            + `<span>${esc(pagina(p.path))} · ${esc(p.dev === 'mobile' ? 'móvil' : p.dev === 'tablet' ? 'tableta' : 'ordenador')}</span>`
            + `<span class="muted">${esc(p.n + ' ' + (p.n === 1 ? 'acción' : 'acciones'))} · ${esc(hace(p.hace))}`
            + (p.aprox ? ' · posición aproximada' : '') + '</span>'
            + (p.id ? '<span class="lv__tip-ir">Pulsa para ver su recorrido</span>' : ''), ev);
        };

        // haces de luz de las ventas recientes
        el.querySelector('#lvhaces').innerHTML = (d.ventas || []).map(v => {
          const x = px(v.lon).toFixed(1), yy = py(v.lat);
          const alto = 14 + Math.min(46, Math.sqrt(Math.max(0, v.total)) * 6);
          const op = Math.max(.18, 1 - (v.hace || 0) / 5400);
          return `<g class="lv-haz" opacity="${op.toFixed(2)}" transform="translate(${x} ${yy.toFixed(1)})">`
            + `<rect x="-1.1" y="${(-alto).toFixed(1)}" width="2.2" height="${alto.toFixed(1)}" fill="url(#lvhaz)" rx="1.1"/>`
            + `<circle r="2.4" fill="#F5D061"/><title>${esc(A.money(v.total) + ' · ' + lugar(v) + ' · ' + hace(v.hace))}</title></g>`;
        }).join('');

        // qué están haciendo
        const vivos = Math.max(1, a.personas || 0);
        const fases = [['Mirando', a.navegando || 0, ETAPA[0].c], ['Con carrito', a.carrito || 0, ETAPA[2].c],
          ['Pagando', a.pagando || 0, ETAPA[3].c], ['Han comprado', a.comprando || 0, ETAPA[4].c]];
        // Entre curva y curva, cuánta gente se queda por el camino: es el dato que la referencia no da.
        const salto = (i) => {
          if (!i) return '';
          const de = fases[i - 1][1], a2 = fases[i][1];
          if (!de) return '<span class="lv__sf">—</span>';
          return `<span class="lv__sf" title="De «${esc(fases[i - 1][0])}» a «${esc(fases[i][0])}»">${Math.round(a2 / de * 100)} %</span>`;
        };
        el.querySelector('#lvcomp').innerHTML = (a.personas || 0)
          ? `<div class="lv__curvas">${fases.map(([n, v, c], i) =>
              (i ? `<div class="lv__paso">${salto(i)}</div>` : '')
              + `<figure class="lv__cv"><svg viewBox="0 0 120 60" preserveAspectRatio="none" aria-hidden="true">`
              + `<path d="${campana(v / vivos)}" fill="${c}" fill-opacity=".8"/></svg>`
              + `<figcaption><b class="num">${v}</b><span>${esc(n)}</span></figcaption></figure>`).join('')}</div>`
          : '<p class="muted sm">Nadie en la tienda ahora mismo.</p>';

        // pulso
        const mins = d.minutos || [], max = Math.max(1, ...mins.map(x => x.v));
        el.querySelector('#lvpulso').innerHTML =
          `<div class="lv__pw"><div class="lv__pe xs muted"><span>${max}</span><span>${Math.round(max / 2)}</span><span>0</span></div>`
          + `<div class="lv__pb">${mins.map(x =>
            `<i style="height:${Math.max(2, x.v / max * 100).toFixed(1)}%" title="${esc(x.m + ' · ' + x.v + ' páginas · ' + x.p + ' personas')}"></i>`).join('')}</div></div>`
          + `<div class="lv__px xs muted"><span>hace 30 min</span><span>ahora</span></div>`;

        // está pasando
        el.querySelector('#lvfeed').innerHTML = (d.feed || []).map(f => {
          const esCompra = f.ev === 'purchase';
          const dentro = `<span class="feed__t xs muted num">${esc(hace(f.hace))}</span>`
            + `<span class="feed__x">${esc(bandera(f.pais))} <b>${esc(f.ciudad || paisNombre(f.pais))}</b> ${esc(frase(f))}</span>`;
          return f.id
            ? `<li class="feed__i${esCompra ? ' feed__i--win' : ''}"><a class="feed__a" href="#/people/${encodeURIComponent(f.id)}">${dentro}</a></li>`
            : `<li class="feed__i${esCompra ? ' feed__i--win' : ''}">${dentro}</li>`;
        }).join('') || '<li class="muted sm">Sin actividad todavía.</li>';

        // de dónde entran / páginas
        const barras = (filas2, fmt) => {
          const mx = Math.max(1, ...filas2.map(r => r[1]));
          return filas2.length ? `<div class="lv__rank">${filas2.map(r =>
            `<div class="lv__rk"><span class="lv__rn">${fmt(r[0])}</span>`
            + `<span class="lv__rb"><i style="width:${(r[1] / mx * 100).toFixed(1)}%"></i></span>`
            + `<b class="num">${r[1]}</b></div>`).join('')}</div>` : '<p class="muted sm">Todavía nada hoy.</p>';
        };
        el.querySelector('#lvrank-paises').innerHTML = barras(d.paises || [], c => esc(bandera(c) + ' ' + paisNombre(c)));
        el.querySelector('#lvpags').innerHTML = barras(d.paginas || [], p => esc(pagina(p)));

        el.querySelector('#lvsync').textContent = 'al día · ' + new Date(d.t).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        A.fit(el);
      }

      /* --- ciclo de refresco. Se corta solo cuando el nodo deja de estar en la página
             (el router sustituye #main entero en cada cambio de ruta). --- */
      async function tira() {
        if (!document.contains(el)) { clearInterval(timer); clearInterval(reloj); return; }
        if (pausado) return;
        try { pinta(await A.api('live?min=' + minutos + '&feed=40')); }
        catch (e) { el.querySelector('#lvsync').textContent = 'sin conexión'; }
      }
      await tira();
      timer = setInterval(tira, 10000);
      reloj = setInterval(() => { if (document.contains(el)) pintaNoche(); else clearInterval(reloj); }, 60000);
    },
  });
})();
