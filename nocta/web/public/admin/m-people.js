/* NOCTA CRM · módulo Personas: el mapa de todo el que entra en la web y la ficha de cada uno.
   Dos pantallas: #/people (el mapa y la lista) y #/people/<id> (el recorrido completo de una persona).
   Los datos salen de /api/admin/people y /api/admin/person/<id>, que reconstruyen el recorrido
   a partir de la tabla de eventos y lo cruzan con pedidos, carritos, leads, clientes y suscripciones. */
(function () {
  const A = window.A, esc = A.esc;

  const ETAPA_COLOR = { visita: '', producto: 'info', carrito: 'warn', checkout: 'warn', datos: 'warn', compra: 'ok' };
  const EV_ES = {
    page_view: 'Vio la página', view_item: 'Miró el producto', view_gallery: 'Abrió la galería',
    add_to_cart: 'Añadió al carrito', remove_from_cart: 'Quitó del carrito', view_cart: 'Abrió el carrito',
    begin_checkout: 'Fue a pagar', checkout_view: 'Entró en el pago', checkout_start_form: 'Empezó a rellenar',
    add_payment_info: 'Metió los datos de pago', apply_code: 'Aplicó un código', purchase: 'COMPRÓ',
    lead: 'Dejó su email', scroll: 'Bajó por la página', leave: 'Salió de la página',
    quiz_start: 'Empezó el test', quiz_answer: 'Respondió el test', quiz_result: 'Vio su resultado',
    popup_view: 'Le salió el popup', popup_close: 'Cerró el popup', nav_open: 'Abrió el menú',
    video_play: 'Dio al play', select_qty: 'Cambió la cantidad', select_mode: 'Cambió compra o suscripción',
    packchip: 'Miró un pack', select_item: 'Eligió un producto', filter_catalogo: 'Filtró el catálogo',
    upsell_view: 'Le ofrecimos un extra', upsell_accept: 'Aceptó el extra', upsell_decline: 'Rechazó el extra',
    cta_hero: 'Pulsó el botón de portada', cta_quiz: 'Pulsó el test', advertorial_view: 'Leyó el artículo',
    advertorial_cta: 'Pulsó desde el artículo', guarantee_request: 'Pidió la garantía',
    contact_request: 'Escribió a contacto', view_plans: 'Miró los planes', plan_zone: 'Eligió una zona',
    plan_skin: 'Eligió su piel', cu_view: 'Miró cómo se usa',
  };
  const evTexto = e => EV_ES[e] || e;
  const secs = s => { s = Math.round(Number(s) || 0); if (!s) return '—'; if (s < 60) return s + ' s'; const m = Math.floor(s / 60); return m + ' min' + (s % 60 ? ' ' + (s % 60) + ' s' : ''); };
  const hora = iso => { const d = new Date(iso); return isNaN(d) ? '—' : d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); };
  const pagina = p => !p ? '—' : (p.split('?')[0].replace(/\.html$/, '').replace(/^\//, '') || 'portada');

  /* ---------- el mapa ---------- */
  function embudoHtml(embudo) {
    const max = Math.max(1, embudo[0] ? embudo[0].personas : 1);
    const filas = embudo.map((e, i) => {
      const sig = embudo[i + 1];
      const cae = sig ? e.personas - sig.personas : 0;
      const pctCae = e.personas ? cae / e.personas * 100 : 0;
      const w = Math.max(2, Math.round(e.personas / max * 100));
      return `<div class="st"><span>${esc(e.n)}</span><i style="width:${w}%"></i>
        <b class="num">${e.personas} <span class="muted xs">(${A.pct(e.personas / max * 100)})</span></b></div>
        ${sig ? `<div class="drop"><span class="muted xs">↓ se van aquí <b>${cae}</b> (${A.pct(pctCae)})</span></div>` : ''}`;
    }).join('');
    return A.card('El embudo: dónde se cae la gente', `<div class="funnel">${filas}</div>
      <p class="muted xs mt">Cada peldaño cuenta a las personas que llegaron al menos hasta ahí. La línea de debajo es cuántas no pasaron al siguiente.</p>`);
  }

  function tablaPares(titulo, pares, etiqueta, total, href) {
    const rows = (pares || []).map(([k, v]) => ({ k, v, pct: total ? v / total * 100 : 0 }));
    return A.card(titulo, A.table({
      cols: [
        { k: 'k', label: etiqueta, title: true, render: r => href ? `<a href="${href(r.k)}">${esc(String(r.k))}</a>` : esc(String(r.k)) },
        { k: 'v', label: 'Personas', cls: 'right num', w: '84px' },
        { k: 'pct', label: '%', render: r => `<span class="muted">${A.pct(r.pct)}</span>`, cls: 'right num', w: '70px' },
      ], rows, empty: 'Sin datos todavía.', click: false,
    }));
  }

  function listaPersonas(d) {
    const rows = d.personas;
    return A.table({
      cols: [
        { k: 'ultima', label: 'Última vez', render: r => `<span title="${esc(r.ultima)}">${A.rel(r.ultima)}</span>`, w: '104px' },
        { k: 'quien', label: 'Quién', title: true, render: r => {
            const nom = r.nombre || r.email || 'Visitante anónimo';
            const sub = r.email && r.nombre ? r.email : (r.ciudad ? [r.ciudad, r.pais].filter(Boolean).join(', ') : r.id.slice(0, 12) + '…');
            return `<b>${esc(nom)}</b><br><span class="muted xs mono">${esc(sub)}</span>`;
          } },
        { k: 'origen', label: 'De dónde viene', render: r => `${A.badge('', r.origen.tipo)}${r.origen.campana ? `<br><span class="muted xs">${esc(r.origen.campana)}</span>` : ''}`, w: '150px' },
        { k: 'etapa', label: 'Hasta dónde llegó', render: r => `<span class="bdg${ETAPA_COLOR[r.etapa] ? ' bdg--' + ETAPA_COLOR[r.etapa] : ''}">${esc(r.etapa_nombre)}</span>`, w: '160px' },
        { k: 'se_quedo_en', label: 'Se quedó en', render: r => `<span class="mono xs">${esc(pagina(r.se_quedo_en))}</span>`, w: '130px' },
        { k: 'visitas', label: 'Visitas', cls: 'right num', w: '74px' },
        { k: 'gastado', label: 'Gastado', render: r => r.gastado ? `<b>${A.money(r.gastado)}</b>` : '<span class="muted">—</span>', cls: 'right num', w: '94px' },
      ], rows, empty: 'Todavía no ha entrado nadie en este periodo.',
      rowAttr: r => `data-id="${esc(r.id)}"`,
    });
  }

  async function mapa(el, query) {
    const p = new URLSearchParams({ days: String(A.state.days) });
    if (query.etapa) p.set('etapa', query.etapa);
    if (query.origen) p.set('origen', query.origen);
    if (query.q) p.set('q', query.q);
    let d;
    try { d = await A.api('people?' + p); }
    catch (e) { el.innerHTML = `<div class="card"><p class="err">${esc(e.message)}</p></div>`; return; }

    const total = d.embudo[0] ? d.embudo[0].personas : 0;
    const compraron = d.embudo[d.embudo.length - 1].personas;
    const enCarrito = (d.embudo[2] ? d.embudo[2].personas : 0) - (d.embudo[3] ? d.embudo[3].personas : 0);
    const ident = d.personas.filter(x => x.email).length;
    const filtro = query.etapa || query.origen || query.q;

    el.innerHTML = `
      <div class="grid grid--kpi mb">
        ${A.kpi('Personas', total, 'en ' + d.dias + ' días')}
        ${A.kpi('Compraron', compraron, total ? A.pct(compraron / total * 100) + ' del total' : '')}
        ${A.kpi('Se quedaron en el carrito', Math.max(0, enCarrito), 'sin llegar al pago', enCarrito > 0 ? 'warn' : '')}
        ${A.kpi('Sabemos quiénes son', ident, 'con email')}
        ${A.kpi('Eventos leídos', d.eventos_leidos)}
      </div>
      ${d.tope ? `<div class="card mb"><p class="warn">Se ha llegado al tope de ${d.eventos_leidos} eventos por consulta. Reduce el periodo para ver el mapa completo.</p></div>` : ''}
      <div class="grid grid--2 mb">${embudoHtml(d.embudo)}${tablaPares('Dónde se quedan los que no compran', d.salidas, 'Página', total)}</div>
      <div class="grid grid--3 mb">
        ${tablaPares('De dónde vienen', d.fuentes, 'Origen', total, k => '#/people?origen=' + encodeURIComponent(k))}
        ${tablaPares('Con qué entran', d.dispositivos, 'Dispositivo', total)}
        ${tablaPares('Desde dónde', d.paises, 'País', total)}
      </div>
      <div class="card mb"><div class="card__h"><h2>Todas las personas</h2><div class="row" id="filtros"></div></div>
        <div class="row mb"><input class="search grow" id="q" type="search" placeholder="Buscar por email, nombre, página, ciudad…" value="${esc(query.q || '')}"></div>
        ${filtro ? `<p class="muted sm mb">Filtrando: ${esc([query.etapa, query.origen, query.q].filter(Boolean).join(' · '))} · <a href="#/people">quitar filtros</a></p>` : ''}
        <div id="lista">${listaPersonas(d)}</div>
        <p class="muted xs mt">${d.total} personas${d.total > d.personas.length ? `, se enseñan las ${d.personas.length} más recientes` : ''}. Pulsa una fila para ver todo su recorrido.</p>
      </div>`;

    const chips = A.$('#filtros', el);
    chips.innerHTML = ['', 'visita', 'producto', 'carrito', 'checkout', 'datos', 'compra']
      .map(k => `<a class="btn btn--s${(query.etapa || '') === k ? ' btn--p' : ' btn--g'}" href="#/people${k ? '?etapa=' + k : ''}">${k ? esc(d.embudo.find(e => e.k === k).n) : 'Todas'}</a>`).join('');

    const inp = A.$('#q', el);
    let t = null;
    inp.oninput = () => { clearTimeout(t); t = setTimeout(() => { const s = new URLSearchParams(query); if (inp.value) s.set('q', inp.value); else s.delete('q'); A.go('people?' + s); }, 400); };

    el.onclick = e => { const tr = e.target.closest('tr[data-id]'); if (tr) A.go('people/' + encodeURIComponent(tr.dataset.id)); };
    A.fit(el);
  }

  /* ---------- la ficha de una persona ---------- */
  function visitaHtml(v, i, n) {
    const eventos = v.eventos.filter(x => x.ev !== 'scroll');
    const filas = eventos.map(x => {
      const d = x.d || {};
      const extra = [];
      if (d.slug) extra.push(esc((A.product(d.slug) || {}).name || d.slug));
      if (d.qty) extra.push(d.qty + ' uds');
      if (d.value) extra.push(A.money(d.value));
      if (d.code) extra.push('código ' + esc(d.code));
      if (d.order) extra.push(`<a href="#/orders/${esc(d.order)}">${esc(d.order)}</a>`);
      if (d.secs) extra.push(secs(d.secs) + ' en la página');
      if (d.scroll) extra.push('bajó el ' + d.scroll + ' %');
      if (d.pct) extra.push('bajó el ' + d.pct + ' %');
      const compra = x.ev === 'purchase';
      return `<li class="tl__i${compra ? ' tl__i--win' : ''}">
        <span class="tl__h mono xs">${hora(x.t)}</span>
        <span class="tl__b"><b>${esc(evTexto(x.ev))}</b>${x.path ? ` <span class="muted xs mono">${esc(pagina(x.path))}</span>` : ''}
        ${extra.length ? `<br><span class="muted xs">${extra.join(' · ')}</span>` : ''}</span></li>`;
    }).join('');
    return `<details class="vis"${i === 0 ? ' open' : ''}>
      <summary><b>Visita ${n - i}</b> · ${A.date(v.inicio)} · ${secs(v.segundos)} · ${v.paginas.length} página${v.paginas.length === 1 ? '' : 's'}
        <span class="bdg${ETAPA_COLOR[v.etapa] ? ' bdg--' + ETAPA_COLOR[v.etapa] : ''}">${esc(v.etapa_nombre)}</span>
        ${v.origen && v.origen.tipo !== 'Interno' ? `<span class="muted xs">desde ${esc(v.origen.tipo)}</span>` : ''}</summary>
      <ul class="tl">${filas || '<li class="muted">Sin eventos.</li>'}</ul></details>`;
  }

  async function ficha(el, id) {
    let d;
    try { d = await A.api('person/' + encodeURIComponent(id) + '?days=365'); }
    catch (e) { el.innerHTML = `<div class="card"><p class="err">${esc(e.message)}</p></div>`; return; }
    if (d.vacio) { el.innerHTML = `<div class="card"><p class="muted">No hay ningún recorrido guardado para esta persona.</p><a class="btn btn--g mt" href="#/people">Volver al mapa</a></div>`; return; }

    const nom = d.nombre || d.email || 'Visitante anónimo';
    const pedidosPagados = d.pedidos.filter(o => ['paid', 'shipped', 'delivered'].includes(o.status));
    const gastado = pedidosPagados.reduce((a, o) => a + (Number(o.total) || 0), 0);

    el.innerHTML = `
      <div class="row mb"><a class="btn btn--s btn--g" href="#/people">← Todas las personas</a></div>
      <section class="card mb">
        <div class="card__h"><h2>${esc(nom)}</h2><div class="row">
          <span class="bdg${ETAPA_COLOR[d.etapa] ? ' bdg--' + ETAPA_COLOR[d.etapa] : ''}">${esc(d.etapa_nombre)}</span></div></div>
        <div class="grid grid--3">
          <div><small class="muted">Identificada por</small><div>${d.identificado_por ? esc(d.identificado_por) : '<span class="muted">no sabemos quién es</span>'}</div></div>
          <div><small class="muted">Email</small><div>${d.email ? `<a href="mailto:${esc(d.email)}">${esc(d.email)}</a>` : '<span class="muted">—</span>'}</div></div>
          <div><small class="muted">De dónde viene</small><div>${esc(d.origen.tipo)}${d.origen.detalle ? ` <span class="muted xs">${esc(d.origen.detalle)}</span>` : ''}</div></div>
          <div><small class="muted">Campaña</small><div>${d.origen.campana ? esc(d.origen.campana) : '<span class="muted">—</span>'}${d.origen.contenido ? `<br><span class="muted xs">anuncio ${esc(d.origen.contenido)}</span>` : ''}</div></div>
          <div><small class="muted">Dispositivo</small><div>${esc(d.dev || '—')}${d.idioma ? ` <span class="muted xs">${esc(d.idioma)}</span>` : ''}</div></div>
          <div><small class="muted">Dónde está</small><div>${esc([d.ciudad, d.pais].filter(Boolean).join(', ') || '—')}</div></div>
          <div><small class="muted">Primera vez</small><div>${A.date(d.primera)}</div></div>
          <div><small class="muted">Última vez</small><div>${A.date(d.ultima)} <span class="muted xs">${A.rel(d.ultima)}</span></div></div>
          <div><small class="muted">Identificador</small><div class="mono xs">${esc(d.id)}</div></div>
        </div>
      </section>

      <div class="grid grid--kpi mb">
        ${A.kpi('Visitas', d.visitas_n)}
        ${A.kpi('Páginas vistas', d.paginas)}
        ${A.kpi('Tiempo total', secs(d.segundos))}
        ${A.kpi('Pedidos', pedidosPagados.length)}
        ${A.kpi('Gastado', A.money(gastado))}
      </div>

      ${d.se_quedo_en && d.etapa !== 'compra' ? `<div class="card mb"><p><b>Se quedó en ${esc(pagina(d.se_quedo_en))}</b>${d.se_quedo_titulo ? ` <span class="muted">— ${esc(d.se_quedo_titulo)}</span>` : ''}. Llegó hasta «${esc(d.etapa_nombre)}» y no siguió.</p></div>` : ''}

      <div class="grid grid--2 mb" id="cruces"></div>
      <section class="card mb"><div class="card__h"><h2>Todo lo que hizo, visita a visita</h2>
        <div class="row"><span class="muted xs">${d.eventos_n} eventos</span></div></div>
        <div id="tl">${d.visitas.slice().reverse().map((v, i) => visitaHtml(v, i, d.visitas.length)).join('')}</div>
      </section>`;

    /* --- cruces con el resto del CRM --- */
    const cr = A.$('#cruces', el); const trozos = [];
    trozos.push(A.card('Pedidos', d.pedidos.length ? A.table({
      cols: [
        { k: 'created_at', label: 'Fecha', render: r => A.date(r.created_at), w: '96px' },
        { k: 'id', label: 'Pedido', title: true, render: r => `<a href="#/orders/${esc(r.id)}">${esc(r.id)}</a>` },
        { k: 'status', label: 'Estado', render: r => A.badge(r.status), w: '110px' },
        { k: 'total', label: 'Total', render: r => A.money(r.total), cls: 'right num', w: '92px' },
      ], rows: d.pedidos, empty: '', click: false,
    }) : '<p class="muted">Todavía no ha comprado nada.</p>'));

    const c = d.carrito;
    trozos.push(A.card('Carrito', c ? `
      <p><b>${A.money(c.total)}</b> ${c.recuperado ? A.badge('ok', 'recuperado') : A.badge('warn', 'abandonado')}
      <span class="muted xs">actualizado ${A.rel(c.actualizado)}</span></p>
      <div class="list">${(c.items || []).map(i => `<div class="item"><div class="item__t"><b>${esc((A.product(i.slug) || {}).name || i.slug)}</b><small>${i.qty} uds${i.sub ? ' · suscripción' : ''}</small></div></div>`).join('') || '<p class="muted">Sin líneas.</p>'}</div>
      <a class="btn btn--s btn--g mt" href="#/carts">Ver todos los carritos</a>` : '<p class="muted">No tiene carrito guardado.</p>'));

    if (d.lead || d.cliente || (d.subs && d.subs.length) || (d.mensajes && d.mensajes.length)) {
      const l = [];
      if (d.cliente) l.push(`<a class="item" href="#/customers/${esc(d.cliente.id)}"><div class="item__t"><b>Ficha de cliente</b><small>${esc(d.cliente.email || '')}</small></div><span class="muted">→</span></a>`);
      if (d.lead) l.push(`<a class="item" href="#/leads"><div class="item__t"><b>Es un lead</b><small>origen ${esc(d.lead.source || '—')}${d.lead.code ? ' · código ' + esc(d.lead.code) : ''}</small></div><span class="muted">→</span></a>`);
      (d.subs || []).forEach(s => l.push(`<a class="item" href="#/subscriptions"><div class="item__t"><b>Suscripción ${esc(s.plan_slug || '')}</b><small>${esc(s.status || '')}</small></div><span class="muted">→</span></a>`));
      if ((d.mensajes || []).length) l.push(`<a class="item" href="#/messages"><div class="item__t"><b>${d.mensajes.length} mensajes enviados</b><small>último ${A.rel(d.mensajes[0].created_at)}</small></div><span class="muted">→</span></a>`);
      trozos.push(A.card('En el resto del CRM', `<div class="list">${l.join('')}</div>`));
    }
    if (d.productos.length || d.anadidos.length) {
      const nombre = s => esc((A.product(s) || {}).name || s);
      trozos.push(A.card('Qué le interesó', `
        ${d.productos.length ? `<p><small class="muted">Miró</small><br>${d.productos.map(s => `<a class="pill" href="#/products/${esc(s)}">${nombre(s)}</a>`).join(' ')}</p>` : ''}
        ${d.anadidos.length ? `<p class="mt"><small class="muted">Añadió al carrito</small><br>${d.anadidos.map(s => `<a class="pill" href="#/products/${esc(s)}">${nombre(s)}</a>`).join(' ')}</p>` : ''}`));
    }
    cr.innerHTML = trozos.join('');
    A.fit(el);
  }

  A.mod('people', {
    title: 'Personas', icon: '◎', group: 'Panel',
    render: (el, params, query) => params[0] ? ficha(el, params[0]) : mapa(el, query || {}),
  });
})();
