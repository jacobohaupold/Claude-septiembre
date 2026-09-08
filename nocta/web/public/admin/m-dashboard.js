/* NOCTA CRM · módulo Panel (dashboard): KPIs, qué hacer hoy, gráfico, embudo, tablas de fuentes/páginas/productos/últimos pedidos y leads. */
(function () {
  const A = window.A, esc = A.esc;

  const dayLabel = d => { const dt = new Date(d + 'T00:00:00'); return isNaN(dt) ? d : dt.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }); };
  // normaliza [[etiqueta,n],…] u {etiqueta:n} → array [[etiqueta,n],…] ordenado desc
  const pairs = (x, top = 8) => { let a = Array.isArray(x) ? x.slice() : x && typeof x === 'object' ? Object.entries(x) : []; a = a.filter(p => p && p[0] != null); a.sort((p, q) => (q[1] || 0) - (p[1] || 0)); return a.slice(0, top); };

  function todoItems(s, integr) {
    const items = [];
    if (s.pending_ship > 0) items.push({ label: `${s.pending_ship} pedido${s.pending_ship === 1 ? '' : 's'} pagado${s.pending_ship === 1 ? '' : 's'} por enviar`, href: '#/orders?status=paid' });
    const carts = s.carts_open != null ? s.carts_open : s.abandoned_carts;
    if (carts > 0) items.push({ label: `${carts} carrito${carts === 1 ? '' : 's'} abandonado${carts === 1 ? '' : 's'} por recuperar`, href: '#/carts' });
    const wa = s.messages && s.messages.whatsapp;
    if (wa > 0) items.push({ label: `${wa} mensaje${wa === 1 ? '' : 's'} de WhatsApp por revisar`, href: '#/whatsapp' });
    if (integr && integr.stripe && !integr.stripe.configured) items.push({ label: 'Conecta Stripe para poder cobrar', href: '#/integrations' });
    return items;
  }

  function kpisHtml(s) {
    const conv = s.funnel && s.funnel.sessions ? (s.funnel.purchase / s.funnel.sessions * 100) : 0;
    const carts = s.carts_open != null ? s.carts_open : s.abandoned_carts;
    return `<div class="grid grid--kpi mb">
      ${A.kpi('Ingresos', A.money(s.revenue))}
      ${A.kpi('Pedidos', s.orders ?? 0)}
      ${A.kpi('Ticket medio', A.money(s.aov))}
      ${A.kpi('Conversión', A.pct(conv))}
      ${A.kpi('Sesiones', s.sessions ?? 0)}
      ${A.kpi('Leads nuevos', s.leads ?? 0, s.leads_total != null ? `${s.leads_total} en total` : '')}
      ${A.kpi('Suscripciones activas', s.subs_active ?? 0, s.mrr != null ? `MRR ${A.money(s.mrr)}` : '')}
      ${A.kpi('Por enviar', s.pending_ship ?? 0, '', s.pending_ship > 0 ? 'warn' : '')}
      ${A.kpi('Carritos recuperables', carts ?? 0)}
    </div>`;
  }

  function todoHtml(items) {
    const body = items.length
      ? `<div class="list">${items.map(i => `<a class="item" href="${i.href}"><div class="item__t"><b>${esc(i.label)}</b></div><span class="muted">→</span></a>`).join('')}</div>`
      : `<p class="muted">Todo al día. No hay pendientes urgentes ahora mismo. 🎉</p>`;
    return A.card('Qué hacer hoy', body);
  }

  function chartCard(daily) {
    const body = `<div style="position:relative;height:260px"><canvas id="dashChart"></canvas></div>`;
    return A.card('Sesiones, pedidos e ingresos', body);
  }

  function drawChart(el, daily) {
    const canvas = A.$('#dashChart', el); if (!canvas) return;
    A.chart(canvas, {
      data: {
        labels: daily.map(d => dayLabel(d.day)),
        datasets: [
          { type: 'bar', label: 'Sesiones', data: daily.map(d => d.sessions || 0), backgroundColor: '#9FB3A1', yAxisID: 'y', borderRadius: 4 },
          { type: 'bar', label: 'Pedidos', data: daily.map(d => d.orders || 0), backgroundColor: '#14213D', yAxisID: 'y', borderRadius: 4 },
          { type: 'line', label: 'Ingresos', data: daily.map(d => d.revenue || 0), borderColor: '#C8553D', backgroundColor: '#C8553D', yAxisID: 'y1', tension: .3, pointRadius: 2 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
        scales: {
          y: { beginAtZero: true, position: 'left', ticks: { precision: 0 } },
          y1: { beginAtZero: true, position: 'right', grid: { drawOnChartArea: false }, ticks: { callback: v => A.money(v) } }
        },
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  function funnelCard(f) {
    if (!f) return A.card('Embudo', '<p class="muted">Sin datos todavía.</p>');
    const steps = [['Sesiones', f.sessions], ['Vieron producto', f.product], ['Añadieron al carrito', f.atc], ['Checkout iniciado', f.checkout], ['Compra completada', f.purchase]];
    const max = Math.max(1, f.sessions || 0);
    const body = `<div class="funnel">${steps.map(([label, n]) => {
      n = n || 0; const w = Math.max(2, Math.round(n / max * 100));
      return `<div class="st"><span>${esc(label)}</span><i style="width:${w}%"></i><b class="num">${n}${max ? ` <span class="muted xs">(${A.pct(n / max * 100)})</span>` : ''}</b></div>`;
    }).join('')}</div>`;
    return A.card('Embudo de conversión', body);
  }

  function sourcesCard(sources) {
    const rows = pairs(sources).map(([k, v]) => ({ k, v }));
    return A.card('Fuentes de tráfico', A.table({ cols: [{ k: 'k', label: 'Origen' }, { k: 'v', label: 'Sesiones', cls: 'right num', w: '90px' }], rows, empty: 'Sin datos todavía.', click: false }));
  }
  function pagesCard(pages) {
    const rows = pairs(pages).map(([k, v]) => ({ k, v }));
    return A.card('Páginas más vistas', A.table({ cols: [{ k: 'k', label: 'Página', render: r => `<span class="mono xs">${esc(r.k)}</span>` }, { k: 'v', label: 'Vistas', cls: 'right num', w: '90px' }], rows, empty: 'Sin datos todavía.', click: false }));
  }
  function productsCard(products) {
    const entries = Object.entries(products || {}).map(([slug, v]) => ({ slug, ...v, name: (A.product(slug) || {}).name || slug }));
    entries.sort((a, b) => (b.views || 0) - (a.views || 0));
    const rows = entries.slice(0, 8);
    return A.card('Productos', A.table({
      cols: [
        { k: 'name', label: 'Producto' },
        { k: 'funnel', label: 'Vistas → carrito → vendidos', render: r => `<span class="num nowrap">${r.views || 0} → ${r.atc || 0} → <b>${r.sold || 0}</b></span>`, cls: 'right', w: '150px' }
      ], rows, empty: 'Sin datos todavía.', click: false
    }));
  }

  function ordersCard(rows) {
    const body = A.table({
      cols: [
        { k: 'created_at', label: 'Fecha', render: r => A.date(r.created_at), w: '90px' },
        { k: 'name', label: 'Cliente', render: r => `<b>${esc(r.name || r.email || r.id)}</b>` },
        { k: 'status', label: 'Estado', render: r => A.badge(r.status), w: '110px' },
        { k: 'total', label: 'Total', render: r => A.money(r.total), cls: 'right num', w: '90px' }
      ], rows, empty: 'Todavía no hay pedidos.', rowAttr: r => `data-id="${esc(r.id)}"`
    });
    return A.card('Últimos pedidos', body, `<a class="btn btn--s btn--g" href="#/orders">Ver todos</a>`);
  }
  function leadsCard(rows) {
    const body = A.table({
      cols: [
        { k: 'created_at', label: 'Fecha', render: r => A.date(r.created_at), w: '90px' },
        { k: 'email', label: 'Contacto', render: r => `<b>${esc(r.name || r.email)}</b>${r.name ? `<br><span class="muted xs">${esc(r.email)}</span>` : ''}` },
        { k: 'source', label: 'Origen', render: r => esc(r.source || '—'), w: '110px' }
      ], rows, empty: 'Todavía no hay leads.', click: false
    });
    return A.card('Últimos leads', body, `<a class="btn btn--s btn--g" href="#/leads">Ver todos</a>`);
  }

  function emptyState() {
    return A.card('', `<div style="padding:20px 4px;text-align:center">
      <div style="font-size:32px;margin-bottom:8px">☾</div>
      <h2 class="mb">Aún no hay visitas</h2>
      <p class="muted">Comparte el enlace de la tienda para empezar a ver sesiones, pedidos y leads aquí.</p>
      <a class="btn btn--p mt" href="/" target="_blank" rel="noopener">Ver la tienda ↗</a>
    </div>`);
  }

  async function render(el, params, query) {
    let s, orders, leads, integr = null;
    try {
      [s, orders, leads] = await Promise.all([
        A.stats(),
        A.r('orders', 'select=*&order=created_at.desc&limit=8'),
        A.r('leads', 'select=*&order=created_at.desc&limit=6')
      ]);
    } catch (e) { el.innerHTML = `<div class="card"><p class="err">${esc(e.message)}</p></div>`; return; }
    try { integr = await A.api('integrations'); } catch (e) { /* opcional */ }

    const hasData = (s.events || 0) > 0 || (s.orders || 0) > 0;

    el.innerHTML = `
      ${kpisHtml(s)}
      <div class="grid mb">${todoHtml(todoItems(s, integr))}</div>
      ${hasData ? `
      <div class="grid grid--2 mb">${chartCard(s.daily || [])}${funnelCard(s.funnel)}</div>
      <div class="grid grid--3 mb">${sourcesCard(s.sources)}${pagesCard(s.pages)}${productsCard(s.products)}</div>
      ` : `<div class="grid mb">${emptyState()}</div>`}
      <div class="grid grid--2">${ordersCard(orders.rows || [])}${leadsCard(leads.rows || [])}</div>
    `;

    if (hasData) drawChart(el, s.daily || []);

    el.onclick = e => { const tr = e.target.closest('tr[data-id]'); if (tr) A.go('orders/' + tr.dataset.id); };
  }

  A.mod('dashboard', { title: 'Panel', icon: '◐', group: 'Panel', render });
})();
