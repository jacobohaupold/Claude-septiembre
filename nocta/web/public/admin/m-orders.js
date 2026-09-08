/* NOCTA CRM · módulo Pedidos (lista + detalle) y módulo Carritos. */
(function () {
  const A = window.A, esc = A.esc;

  /* ================= PEDIDOS · lista ================= */
  const CHIPS = [
    ['', 'Todos'],
    ['paid', 'Pagados (por enviar)'],
    ['shipped', 'Enviados'],
    ['pending', 'Pendientes'],
    ['sub', 'Suscripción / renovaciones'],
    ['other', 'Reembolsados / otros']
  ];
  const OTHER_STATUSES = ['refunded', 'partial_refund', 'failed', 'error', 'disputed', 'canceled', 'demo', 'abandoned'];

  function chipsHtml(active) {
    return `<div class="row mb">${CHIPS.map(([k, label]) => `<a class="btn btn--s ${active === k ? 'btn--p' : 'btn--g'}" href="#/orders${k ? '?status=' + k : ''}">${esc(label)}</a>`).join('')}</div>`;
  }
  function filterQuery(status) {
    let q = 'select=*&order=created_at.desc';
    if (status === 'paid') q += '&status=eq.paid';
    else if (status === 'shipped') q += '&status=eq.shipped';
    else if (status === 'pending') q += '&status=eq.pending';
    else if (status === 'sub') q += '&mode=in.(subscription,renewal)';
    else if (status === 'other') q += '&status=in.(' + OTHER_STATUSES.join(',') + ')';
    return q;
  }

  async function renderList(el, params, query) {
    const status = query.status || '';
    el.innerHTML = A.card('Pedidos', `
      ${chipsHtml(status)}
      <div id="ordWrap"><div class="loading">Cargando…</div></div>
    `, `<a class="btn btn--s btn--g" href="${A.exportUrl('orders')}" target="_blank" rel="noopener">Exportar CSV</a>`);

    const wrap = A.$('#ordWrap', el);
    const limit = 100; const rows = []; let total = 0;
    async function loadPage() {
      const q = filterQuery(status) + `&limit=${limit}&offset=${rows.length}`;
      const r = await A.r('orders', q);
      rows.push(...r.rows); total = r.total;
    }
    try { await loadPage(); } catch (e) { wrap.innerHTML = `<p class="err">${esc(e.message)}</p>`; return; }

    function tableHtml(list) {
      const body = A.table({
        cols: [
          { k: 'created_at', label: 'Fecha', render: r => A.date(r.created_at), w: '85px' },
          { k: 'id', label: 'Pedido', render: r => `<span class="mono">${esc(r.id)}</span>`, w: '110px' },
          { k: 'name', label: 'Cliente', render: r => `<b>${esc(r.name || '—')}</b><br><span class="muted xs">${esc(r.email || '')}</span>` },
          { k: 'items', label: 'Artículos', render: r => esc(A.itemsText(r.items)) },
          { k: 'status', label: 'Estado', render: r => A.badge(r.status), w: '130px' },
          { k: 'total', label: 'Total', render: r => A.money(r.total), cls: 'right num', w: '90px' }
        ], rows: list, empty: 'No hay pedidos con este filtro.', rowAttr: r => `data-id="${esc(r.id)}"`
      });
      return body + (rows.length < total ? `<div class="row mt"><button class="btn btn--g btn--s" id="loadMoreBtn">Cargar más (${rows.length} de ${total})</button></div>` : '');
    }
    const draw = A.search(wrap, rows, ['id', 'email', 'name'], tableHtml);

    wrap.onclick = async e => {
      const more = e.target.closest('#loadMoreBtn');
      const tr = e.target.closest('tr[data-id]');
      if (more) { more.disabled = true; try { await loadPage(); draw(); } catch (err) { A.toast(err.message, 'bad'); more.disabled = false; } }
      else if (tr) A.go('orders/' + tr.dataset.id);
    };
  }

  /* ================= PEDIDOS · detalle ================= */
  const CARRIERS = ['', 'Correos', 'SEUR', 'GLS', 'MRW', 'DHL', 'Otro'];

  function header(o) {
    const act = [];
    const closedShip = ['shipped', 'delivered', 'refunded', 'canceled'].includes(o.status);
    if (!closedShip) act.push('<button class="btn btn--s btn--p" data-act="ship">Marcar como enviado</button>');
    if (o.status === 'shipped') act.push('<button class="btn btn--s" data-act="deliver">Marcar entregado</button>');
    if (['pending', 'demo'].includes(o.status)) act.push('<button class="btn btn--s" data-act="paid">Marcar pagado</button>');
    if (['paid', 'shipped', 'delivered', 'partial_refund'].includes(o.status)) act.push('<button class="btn btn--s btn--d" data-act="refund">Reembolsar</button>');
    if (o.email) {
      act.push('<button class="btn btn--s btn--g" data-act="email:order_confirm">Reenviar confirmación</button>');
      act.push('<button class="btn btn--s btn--g" data-act="email:shipped">Reenviar envío</button>');
      act.push('<button class="btn btn--s btn--g" data-act="email:guide">Reenviar guía</button>');
    }
    if (!['shipped', 'delivered', 'refunded', 'partial_refund', 'canceled'].includes(o.status)) act.push('<button class="btn btn--s btn--d" data-act="cancel">Cancelar</button>');
    return `
      <button class="btn btn--s btn--g mb" id="backBtn">← Pedidos</button>
      <div class="card">
        <div class="row row--sb">
          <div><h1>${esc(o.id)}</h1><p class="muted xs">${A.date(o.created_at, true)}</p></div>
          <div class="right"><div class="b" style="font-size:22px">${A.money(o.total)}</div>${A.badge(o.status)}</div>
        </div>
        <div class="row mt" id="ordActions">${act.join('')}</div>
      </div>
    `;
  }

  function customerCard(o) {
    const addr = o.address || {};
    const lines = [addr.line, [addr.zip, addr.city].filter(Boolean).join(' '), addr.country].filter(Boolean);
    const body = `
      <p><b>${esc(o.name || '—')}</b><br><span class="muted">${esc(o.email || '—')}</span></p>
      ${o.phone ? `<p><a href="tel:${esc(o.phone)}">${esc(o.phone)}</a></p>` : ''}
      ${lines.length ? `<p class="muted sm">${lines.map(esc).join('<br>')}</p>` : '<p class="muted sm">Sin dirección de envío.</p>'}
    `;
    return A.card('Cliente', body, o.email ? `<a class="btn btn--s btn--g" href="#/customers?q=${encodeURIComponent(o.email)}">Ver cliente</a>` : '');
  }

  function itemsCard(o) {
    const rows = o.items || [];
    const body = A.table({
      cols: [
        { k: 'img', label: '', render: r => { const p = A.product(r.slug); return p && p.image ? `<img class="thumb" src="${esc(p.image)}" alt="">` : '<div class="thumb"></div>'; }, w: '54px' },
        { k: 'name', label: 'Artículo', render: r => `<b>${esc(r.name || r.slug)}</b>${r.opt ? `<br><span class="muted xs">${esc(r.opt)}</span>` : ''}` },
        { k: 'qty', label: 'Cant.', render: r => r.qty || 1, cls: 'right num', w: '55px' },
        { k: 'unit', label: 'Precio', render: r => A.money(r.unit), cls: 'right num', w: '80px' },
        { k: 'total', label: 'Total', render: r => A.money(r.sub != null ? r.sub : (r.unit || 0) * (r.qty || 1)), cls: 'right num', w: '90px' }
      ], rows, empty: 'Sin artículos.', click: false
    });
    return A.card('Artículos', body);
  }

  function payCard(o) {
    const rows = [
      ['Modo', o.mode || 'payment'], ['Método', o.pay || '—'],
      ['Subtotal', A.money(o.subtotal)],
      ['Descuento', o.discount ? ('−' + A.money(o.discount) + (o.code ? ` (${esc(o.code)})` : '')) : '—'],
      ['Envío', A.money(o.shipping)]
    ];
    const links = [
      ['Payment intent', o.stripe_payment_intent, o.stripe_payment_intent ? 'https://dashboard.stripe.com/payments/' + o.stripe_payment_intent : null],
      ['Sesión de pago', o.stripe_session, null],
      ['Suscripción', o.stripe_subscription, o.stripe_subscription ? 'https://dashboard.stripe.com/subscriptions/' + o.stripe_subscription : null],
      ['Cliente Stripe', o.stripe_customer, o.stripe_customer ? 'https://dashboard.stripe.com/customers/' + o.stripe_customer : null]
    ].filter(([, v]) => v);
    const body = `
      <div class="list">${rows.map(([l, v]) => `<div class="row row--sb"><span class="muted">${esc(l)}</span><span class="num">${v}</span></div>`).join('')}</div>
      ${links.length ? `<div class="mt"><div class="muted xs mb">Stripe</div>${links.map(([l, v, href]) => `<div class="row row--sb"><span class="muted xs">${esc(l)}</span>${href ? `<a class="mono xs" href="${esc(href)}" target="_blank" rel="noopener">${esc(v)} ↗</a>` : `<span class="mono xs">${esc(v)}</span>`}</div>`).join('')}</div>` : ''}
    `;
    return A.card('Pago', body);
  }

  function shipCard(o) {
    const body = `
      <div class="fld--row">
        <div class="fld"><label for="trkInp">Nº de seguimiento</label><input id="trkInp" value="${esc(o.tracking || '')}" placeholder="Opcional"></div>
        <div class="fld"><label for="carInp">Transportista</label><select id="carInp">${CARRIERS.map(c => `<option value="${esc(c)}" ${c === (o.carrier || '') ? 'selected' : ''}>${c || '—'}</option>`).join('')}</select></div>
      </div>
      <button class="btn btn--s" id="saveShipBtn">Guardar</button>
    `;
    return A.card('Envío', body);
  }

  function notesCard(o) {
    return A.card('Notas internas', `<div class="fld"><textarea id="notesInp" placeholder="Notas visibles solo para el equipo…">${esc(o.notes || '')}</textarea></div><button class="btn btn--s" id="saveNotesBtn">Guardar</button>`);
  }

  const EMAIL_LABELS = { confirm: 'Confirmación (email)', shipped: 'Envío (email)', guide: 'Guía (email)', wa_confirm: 'Confirmación (WhatsApp)', wa_shipped: 'Envío (WhatsApp)' };
  async function historyBody(o) {
    const emails = o.emails || {};
    const sent = Object.keys(EMAIL_LABELS).filter(k => emails[k]);
    const emailHtml = sent.length ? `<div class="list">${sent.map(k => `<div class="row row--sb"><span class="muted sm">${EMAIL_LABELS[k]}</span><span class="xs">${A.date(emails[k], true)}</span></div>`).join('')}</div>` : '<p class="muted sm">Sin avisos enviados todavía.</p>';
    let msgs = [];
    try { const r = await A.r('messages', 'select=*&meta->>order=eq.' + o.id + '&order=created_at.desc'); msgs = r.rows || []; } catch (e) { /* ignorar */ }
    const msgHtml = msgs.length ? `<div class="list mt">${msgs.map(m => `<div class="item"><div class="item__t"><b>${m.channel === 'whatsapp' ? 'WhatsApp' : 'Email'} · ${esc(m.template || m.direction || '')}</b><small>${A.date(m.created_at, true)}</small></div>${A.badge(m.status)}</div>`).join('')}</div>` : '';
    return emailHtml + msgHtml;
  }

  async function renderDetail(el, params) {
    const id = params[0];
    el.innerHTML = '<div class="loading">Cargando…</div>';
    let o;
    try { const r = await A.r('orders', 'id=eq.' + encodeURIComponent(id) + '&limit=1'); o = r.rows[0]; }
    catch (e) { el.innerHTML = `<div class="card"><p class="err">${esc(e.message)}</p></div>`; return; }
    if (!o) { el.innerHTML = `<div class="card"><p>Pedido no encontrado.</p><button class="btn btn--g mt" id="backBtn">← Pedidos</button></div>`; A.$('#backBtn', el).onclick = () => A.go('orders'); return; }

    async function reload() { try { const r = await A.r('orders', 'id=eq.' + encodeURIComponent(o.id) + '&limit=1'); o = r.rows[0] || o; } catch (e) { A.toast(e.message, 'bad'); } await draw(); }

    async function draw() {
      el.innerHTML = `${header(o)}<div class="grid grid--2 mt">${customerCard(o)}${itemsCard(o)}</div><div class="grid grid--2 mt">${payCard(o)}${shipCard(o)}</div><div class="grid grid--2 mt">${notesCard(o)}<div id="histWrap">${A.card('Historial de avisos', '<div class="loading">Cargando…</div>')}</div></div>`;
      wire();
      historyBody(o).then(h => { const w = A.$('#histWrap', el); if (w) w.innerHTML = A.card('Historial de avisos', h); });
    }

    function wire() {
      A.$('#backBtn', el).onclick = () => A.go('orders');
      A.$('#saveShipBtn', el).onclick = async () => {
        try { const tracking = A.$('#trkInp', el).value.trim() || null, carrier = A.$('#carInp', el).value || null; await A.rPatch('orders', 'id=eq.' + encodeURIComponent(o.id), { tracking, carrier }); A.toast('Guardado', 'ok'); await reload(); }
        catch (e) { A.toast(e.message, 'bad'); }
      };
      A.$('#saveNotesBtn', el).onclick = async () => {
        try { const notes = A.$('#notesInp', el).value; await A.rPatch('orders', 'id=eq.' + encodeURIComponent(o.id), { notes }); A.toast('Notas guardadas', 'ok'); }
        catch (e) { A.toast(e.message, 'bad'); }
      };
      A.$('#ordActions', el).onclick = async e => {
        const b = e.target.closest('button[data-act]'); if (!b) return; const act = b.dataset.act;
        try {
          if (act === 'ship') shipModal();
          else if (act === 'deliver') { await A.act('order.status', { id: o.id, status: 'delivered' }); A.toast('Marcado como entregado', 'ok'); await reload(); }
          else if (act === 'paid') { await A.act('order.status', { id: o.id, status: 'paid' }); A.toast('Marcado como pagado', 'ok'); await reload(); }
          else if (act === 'refund') refundModal();
          else if (act === 'cancel') { if (await A.confirm('¿Cancelar este pedido? El cliente no será cobrado de nuevo.', { label: 'Cancelar pedido', danger: true })) { await A.act('order.status', { id: o.id, status: 'canceled' }); A.toast('Pedido cancelado', 'ok'); await reload(); } }
          else if (act.startsWith('email:')) { await A.act('order.email', { id: o.id, template: act.split(':')[1] }); A.toast('Enviado', 'ok'); await reload(); }
        } catch (e) { A.toast(e.message, 'bad'); }
      };
    }

    function shipModal() {
      const f = document.createElement('form'); f.innerHTML = A.form([
        { k: 'tracking', label: 'Nº de seguimiento', type: 'text' },
        { k: 'carrier', label: 'Transportista', type: 'select', options: CARRIERS.map(c => [c, c || '—']) },
        { k: 'notify', label: 'Avisar al cliente por email y WhatsApp', type: 'toggle', default: true }
      ], { tracking: o.tracking || '', carrier: o.carrier || '', notify: true });
      f.onsubmit = e => e.preventDefault();
      A.modal({
        title: 'Marcar como enviado', body: f, actions: [
          { label: 'Cancelar', onClick: () => { } },
          {
            label: 'Marcar enviado', primary: true, onClick: async () => {
              const v = A.read(f);
              await A.act('order.ship', { id: o.id, tracking: v.tracking || null, carrier: v.carrier || null, notify: !!v.notify });
              A.toast('Pedido marcado como enviado', 'ok'); await reload();
            }
          }
        ]
      });
    }
    function refundModal() {
      const wrap = document.createElement('div');
      wrap.innerHTML = `<p class="muted sm mb">Esta acción no se puede deshacer. Deja el importe vacío para reembolsar el total (${A.money(o.total)}).</p>`;
      const f = document.createElement('form'); f.innerHTML = A.form([{ k: 'amount', label: 'Importe a reembolsar (€)', type: 'number', step: '0.01', placeholder: A.money(o.total) }], {});
      f.onsubmit = e => e.preventDefault(); wrap.appendChild(f);
      A.modal({
        title: 'Reembolsar pedido', body: wrap, actions: [
          { label: 'Cancelar', onClick: () => { } },
          {
            label: 'Reembolsar', danger: true, onClick: async () => {
              const v = A.read(f);
              const r = await A.act('order.refund', { id: o.id, amount: v.amount || undefined });
              A.toast(r.manual ? 'Marcado como reembolsado' : 'Reembolso solicitado', 'ok'); await reload();
            }
          }
        ]
      });
    }

    await draw();
  }

  A.mod('orders', {
    title: 'Pedidos', icon: '📦', group: 'Ventas',
    render: async (el, params, query) => { if (params[0]) return renderDetail(el, params, query); return renderList(el, params, query); }
  });

  /* ================= CARRITOS ================= */
  function cartItemsText(items) {
    const t = (items || []).map(i => `${i.qty || 1}× ${(A.product(i.slug) || {}).name || i.name || i.slug}`).join(', ');
    return t || '—';
  }

  async function renderCarts(el) {
    async function load() {
      el.innerHTML = '<div class="loading">Cargando…</div>';
      let rows;
      try { const r = await A.r('carts', 'select=*&order=updated_at.desc&limit=100'); rows = r.rows || []; }
      catch (e) { el.innerHTML = `<div class="card"><p class="err">${esc(e.message)}</p></div>`; return; }
      const table = A.table({
        cols: [
          { k: 'who', label: 'Contacto', render: r => `<b>${esc(r.name || r.email || '—')}</b>${r.name && r.email ? `<br><span class="muted xs">${esc(r.email)}</span>` : ''}` },
          { k: 'items', label: 'Artículos', render: r => esc(cartItemsText(r.items)) },
          { k: 'total', label: 'Total', render: r => A.money(r.total), cls: 'right num', w: '85px' },
          { k: 'updated_at', label: 'Actualizado', render: r => A.rel(r.updated_at), w: '95px' },
          { k: 'reminded_at', label: 'Recordatorio', render: r => r.reminded_at ? A.date(r.reminded_at) : '—', w: '100px' },
          { k: 'recovered', label: '', render: r => r.recovered ? '<span class="bdg bdg--ok">Recuperado</span>' : '', w: '100px' },
          { k: 'acts', label: '', render: r => `<div class="row" style="gap:6px;flex-wrap:nowrap"><button class="btn btn--s btn--g" data-act="wa" data-email="${esc(r.email || '')}">WhatsApp</button><button class="btn btn--s btn--d" data-act="del" data-vid="${esc(r.vid)}">Borrar</button></div>`, w: '160px' }
        ], rows, empty: 'No hay carritos abandonados todavía.', click: false
      });
      el.innerHTML = `
        <div class="card mb"><p class="muted sm">El recordatorio automático se envía solo unas horas después de abandonar el carrito (se configura en Automatizaciones). El botón de abajo fuerza el envío del lote pendiente ahora mismo.</p>
        <button class="btn btn--g btn--s mt" id="remindBtn">Enviar recordatorios ahora</button></div>
        ${A.card('Carritos', table)}
      `;
    }
    await load();

    el.onclick = async e => {
      const wa = e.target.closest('[data-act="wa"]');
      const del = e.target.closest('[data-act="del"]');
      const rem = e.target.closest('#remindBtn');
      if (wa) {
        const email = wa.dataset.email; if (!email) { A.toast('Este carrito no tiene email', 'bad'); return; }
        try {
          const r = await A.r('leads', 'select=phone&email=eq.' + encodeURIComponent(email) + '&limit=1');
          const phone = r.rows[0] && r.rows[0].phone;
          if (!phone) { A.toast('Sin teléfono para este contacto', 'bad'); return; }
          window.open('https://wa.me/' + phone.replace(/\D/g, '') + '?text=' + encodeURIComponent('Hola 🌙 vimos que dejaste algo en tu carrito de NOCTA, ¿te ayudamos a terminar el pedido?'), '_blank');
        } catch (err) { A.toast(err.message, 'bad'); }
      } else if (del) {
        if (!(await A.confirm('¿Borrar este carrito?', { label: 'Borrar', danger: true }))) return;
        try { await A.rDel('carts', 'vid=eq.' + encodeURIComponent(del.dataset.vid)); A.toast('Carrito borrado', 'ok'); await load(); }
        catch (err) { A.toast(err.message, 'bad'); }
      } else if (rem) {
        rem.disabled = true;
        try { await A.act('cron.run'); A.toast('Recordatorios procesados', 'ok'); } catch (err) { A.toast(err.message, 'bad'); }
        rem.disabled = false;
      }
    };
  }

  A.mod('carts', { title: 'Carritos', icon: '🛒', group: 'Ventas', render: renderCarts });
})();
