/* CRM · Recompensas post-compra.
   Cada pedido pagado emite un código PERSONAL de un solo uso para la siguiente compra. Esta
   pantalla es la contabilidad de ese mecanismo: cuántas se emiten, cuántas se ven, cuántas
   vuelven convertidas en un segundo pedido, cuánto ingresan y cuánto cuestan.

   La pregunta que tiene que contestar de un vistazo es una sola: ¿se paga sola? Por eso el
   número grande no es «emitidas» ni «canjeadas», sino el NETO: ingresos de la segunda compra
   menos lo que se ha regalado. Un porcentaje de canje alto con neto negativo es una forma cara
   de perder margen, y con «canjeadas» en grande no se ve. */
(() => {
  const A = window.A, $ = (s, r = document) => r.querySelector(s), esc = A.esc;

  const estado = r => {
    if (r.redeemed_at) return ['Canjeada', 'ok'];
    if (r.ends_at && new Date(r.ends_at).getTime() < Date.now()) return ['Caducada', ''];
    if (!r.active) return ['Anulada', ''];
    if (r.seen_at) return ['Vista', 'warn'];
    return ['Emitida', ''];
  };

  const pintaVacio = () => `<div class="vacio"><b>Todavía no hay recompensas</b>
    <p class="muted sm">Se emite una sola con cada pedido pagado, en cuanto el pedido se confirma.
    Si la tienda aún no ha cobrado nada, aquí no habrá nada que contar.</p></div>`;

  async function render(el) {
    el.innerHTML = '<div class="loading">Cargando…</div>';
    let d;
    try { d = await A.api('rewards?days=' + (A.state.days || 90)); }
    catch (e) { el.innerHTML = `<p class="err">${esc(e.message)}</p>`; return; }

    const k = d.kpis || {}, cfg = d.config || {}, rows = d.rows || [];
    const emitidas = Number(k.emitidas || 0), canjeadas = Number(k.canjeadas || 0);
    const vistas = Number(k.vistas || 0);
    const ingresos = Number(k.ingresos || 0), coste = Number(k.coste || 0);
    const neto = ingresos - coste;
    const tasa = emitidas ? canjeadas / emitidas * 100 : 0;
    const vista = emitidas ? vistas / emitidas * 100 : 0;
    const ticket = canjeadas ? ingresos / canjeadas : 0;

    el.innerHTML = `
      <div class="grid grid--kpi">
        ${A.kpi('Neto que deja', A.money(neto), `${A.money(ingresos)} de segundas compras − ${A.money(coste)} regalados`, neto < 0 ? 'warn' : 'good')}
        ${A.kpi('Vuelven', canjeadas + ' de ' + emitidas, A.pct(tasa) + ' de las emitidas')}
        ${A.kpi('Segunda compra media', A.money(ticket), canjeadas ? 'sobre ' + canjeadas + ' pedidos' : 'sin canjes todavía')}
        ${A.kpi('Tardan en volver', k.dias_hasta != null ? String(k.dias_hasta).replace('.', ',') + ' días' : '—', cfg.days ? 'caducan a los ' + cfg.days : '')}
      </div>
      <div class="grid grid--2 mt">
        <div id="rw-emb"></div>
        <div id="rw-cfg"></div>
      </div>
      <div class="mt" id="rw-lista"></div>`;

    /* El embudo con los tres números en fila cuenta dónde se rompe: si se emiten muchas y se ven
       pocas, el bloque de la página de gracias no se está viendo; si se ven muchas y vuelven
       pocas, el problema es la oferta o la caducidad. Son dos arreglos distintos. */
    const paso = (n, label, de, nota) => {
      // El primer escalón es el 100 % por definición: es contra él contra lo que se miden los
      // otros dos. Pintarlo al 0 % porque no tiene «de» deja el embudo del revés.
      const p = de ? n / de * 100 : 100;
      return `<div class="fnl"><div class="fnl__h"><b>${n}</b><span>${esc(label)}</span></div>
        <div class="fnl__b"><i style="width:${Math.max(2, Math.min(100, p)).toFixed(1)}%"></i></div>
        <small class="muted">${de ? A.pct(p) + ' de las emitidas' : ''}${nota ? ' · ' + esc(nota) : ''}</small></div>`;
    };
    $('#rw-emb', el).innerHTML = A.card('De emitida a segunda compra',
      `<div class="fnls">
        ${paso(emitidas, 'Emitidas', 0, 'una por pedido pagado')}
        ${paso(vistas, 'Vistas', emitidas, 'el cliente llegó a verla')}
        ${paso(canjeadas, 'Canjeadas', emitidas, 'trajeron un segundo pedido')}
      </div>
      <p class="muted xs mt">${Number(k.vivas || 0)} vivas ahora mismo y ${Number(k.caducadas || 0)} caducadas sin usar.
      Si caducan muchas, alarga la ventana antes de subir el porcentaje: sale más barato.</p>`);

    // ── configuración ────────────────────────────────────────────────────────────
    const f = document.createElement('form');
    f.innerHTML = A.form([
      { k: 'enabled', label: 'Emitir una recompensa con cada pedido', type: 'toggle', default: true },
      { k: 'pct', label: '% de descuento en la siguiente compra', type: 'number', min: 0, step: '1', help: 'Sobre el subtotal del próximo pedido. Con el neto en negativo, bájalo antes que quitarlo.' },
      { k: 'days', label: 'Caduca a los (días)', type: 'number', min: 1, step: '1', help: 'La prisa es la que hace volver. Más de 60 días y deja de ser una razón para entrar hoy.' },
      { k: 'min_total', label: 'Pedido mínimo (€)', type: 'number', min: 0, step: '0.01', help: '0 = sin mínimo. Un mínimo por encima del ticket medio protege el margen.' },
      { k: 'prefix', label: 'Prefijo del código', type: 'text', help: 'El código queda PREFIJO-XXXXX. Sin vocales ni caracteres que se confundan al dictarlo.' },
      { k: 'titulo', label: 'Título en la página de gracias', type: 'text' },
    ], cfg);
    f.onsubmit = e => e.preventDefault();
    const guardar = document.createElement('button');
    guardar.className = 'btn btn--p'; guardar.textContent = 'Guardar';
    guardar.onclick = async () => {
      const v = A.read(f);
      guardar.disabled = true;
      try {
        await A.act('content.save', { key: 'reward', value: { ...cfg, ...v } });
        A.toast('Recompensa actualizada');
        render(el);
      } catch (x) { A.toast(x.message, 'bad'); guardar.disabled = false; }
    };
    const caja = document.createElement('div');
    caja.innerHTML = A.card('Cómo funciona', '<div id="rw-form"></div>');
    $('#rw-cfg', el).appendChild(caja);
    const hueco = $('#rw-form', caja);
    hueco.appendChild(f);
    const pie = document.createElement('div'); pie.className = 'row row--sb mt';
    pie.innerHTML = `<span class="muted xs">Los cambios valen para las recompensas que se emitan a partir de ahora. Las ya emitidas mantienen su porcentaje y su caducidad.</span>`;
    pie.appendChild(guardar);
    hueco.appendChild(pie);

    // ── lista ────────────────────────────────────────────────────────────────────
    const lista = $('#rw-lista', el);
    if (!rows.length) { lista.innerHTML = A.card('Recompensas', pintaVacio()); A.fit(el); return; }
    A.search(lista, rows, ['code', 'email', 'redeemed_order', 'order_id'], filas => A.card('', A.table({
      cols: [
        { k: 'code', label: 'Código', title: true, render: r => `<b class="mono">${esc(r.code)}</b>` },
        { k: 'email', label: 'Cliente', render: r => r.email ? `<a href="#/people?q=${encodeURIComponent(r.email)}">${esc(r.email)}</a>` : '—' },
        { k: 'value', label: 'Vale', cls: 'right', render: r => r.type === 'fixed' ? A.money(r.value) : '−' + Math.round(r.value) + ' %' },
        { k: 'issued_at', label: 'Emitida', render: r => A.rel(r.issued_at) },
        { k: 'ends_at', label: 'Caduca', render: r => A.date(r.ends_at, false) },
        { k: 'st', label: 'Estado', render: r => { const [t, c] = estado(r); return `<span class="bdg${c ? ' bdg--' + c : ''}">${t}</span>`; } },
        { k: 'redeemed_order', label: 'Segundo pedido', render: r => r.redeemed_order ? `<a href="#/orders/${encodeURIComponent(r.redeemed_order)}" class="mono">${esc(r.redeemed_order)}</a>` : '—' },
        { k: 'revenue', label: 'Trajo', cls: 'right num', render: r => r.redeemed_at ? A.money(r.revenue) : '—' },
      ],
      rows: filas, empty: 'Ninguna coincide con la búsqueda.',
      minw: 760,
    })));
    A.fit(el);
  }

  A.mod('rewards', { title: 'Recompensas', icon: '★', group: 'Marketing', render });
})();
