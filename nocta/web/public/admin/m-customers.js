/* NOCTA CRM · módulo Ventas: suscripciones, clientes, leads */
(function () {
  const A = window.A;
  const esc = A.esc;

  /* ---------- helpers compartidos ---------- */
  const MOD_STYLE = `<style>
    .chipbar{display:flex;gap:6px;flex-wrap:wrap}
    .chip{cursor:pointer;border:1px solid var(--line);background:#fff;border-radius:999px;padding:5px 12px;font-size:12.5px;color:var(--ink)}
    .chip.on{background:var(--navy);color:#fff;border-color:var(--navy)}
    .tagx{border:0;background:none;cursor:pointer;color:inherit;opacity:.6;padding:0 0 0 5px;font-size:10px;line-height:1;vertical-align:middle}
    .tagx:hover{opacity:1}
    .detail-actions{display:flex;gap:8px;flex-wrap:wrap}
    .kv{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 8px;font-size:13px}
    .kv b{color:var(--muted);font-weight:500;min-width:92px}
    .subacts{display:flex;flex-direction:column;gap:4px;align-items:flex-end}
    .grid > *{min-width:0}
  </style>`;

  const nameOr = n => (n && String(n).trim()) ? esc(n) : '—';
  const phoneHtml = p => p ? `<a href="tel:${esc(p)}">${esc(p)}</a>` : '—';
  const waNum = p => String(p || '').replace(/\D/g, '');
  const tagsHtml = tags => (tags && tags.length) ? tags.map(t => `<span class="bdg">${esc(t)}</span>`).join(' ') : '<span class="muted xs">—</span>';
  const planName = slug => slug === 'plan-mensual' ? 'Plan Noche mensual' : slug === 'plan-semanal' ? 'Plan Semanal' : 'Suscripción de producto';
  const intervalLabel = iv => iv === 'week' ? 'semana' : iv === '30d' ? '30 días' : 'mes';
  const zonesText = z => { if (z == null || z === '') return '—'; return Array.isArray(z) ? (z.length ? z.join(', ') : '—') : String(z); };

  function openEmailModal(to, defaultSubject) {
    const body = document.createElement('div');
    body.innerHTML = `<div class="fld"><label for="em_subj">Asunto</label><input id="em_subj" value="${esc(defaultSubject || '')}"></div><div class="fld"><label for="em_body">Mensaje</label><textarea id="em_body" rows="8" placeholder="Escribe el mensaje…"></textarea></div>`;
    A.modal({
      title: 'Enviar email a ' + to,
      body, wide: true,
      actions: [
        { label: 'Cancelar', onClick: () => {} },
        {
          label: 'Enviar', primary: true, onClick: async m => {
            const subject = m.querySelector('#em_subj').value.trim();
            const text = m.querySelector('#em_body').value.trim();
            if (!subject || !text) throw new Error('Rellena el asunto y el mensaje');
            await A.act('lead.email', { to, subject, text });
            A.toast('Email enviado', 'ok');
          }
        }
      ]
    });
  }

  function openWhatsAppModal(to) {
    const body = document.createElement('div');
    body.innerHTML = `<div class="fld"><label for="wa_body">Mensaje</label><textarea id="wa_body" rows="6" placeholder="Escribe el mensaje…"></textarea></div>`;
    A.modal({
      title: 'Enviar WhatsApp a ' + to,
      body,
      actions: [
        { label: 'Cancelar', onClick: () => {} },
        {
          label: 'Enviar', primary: true, onClick: async m => {
            const text = m.querySelector('#wa_body').value.trim();
            if (!text) throw new Error('Escribe un mensaje');
            const r = await A.act('whatsapp.send', { to, text });
            if (r && (r.skipped || r.status === 'skipped') && r.link) {
              window.open(r.link, '_blank');
              A.toast('WhatsApp no conectado: se abre el chat para enviarlo a mano');
            } else {
              A.toast('WhatsApp enviado', 'ok');
            }
          }
        }
      ]
    });
  }

  function tagsEditorHtml(tags) {
    const chips = (tags || []).map(t => `<span class="bdg">${esc(t)}<button type="button" class="tagx" data-tag-x="${esc(t)}" aria-label="Quitar etiqueta ${esc(t)}">✕</button></span>`).join(' ');
    return `<div class="row" id="tags_list" style="gap:6px">${chips || '<span class="muted xs">Sin etiquetas</span>'}</div>
      <div class="row mt" style="gap:6px"><input id="tag_new" placeholder="Nueva etiqueta" style="max-width:180px"><button type="button" class="btn btn--s btn--g" id="tag_add">Añadir</button></div>`;
  }
  function wireTagsEditor(container, tags, onChange) {
    container.querySelectorAll('[data-tag-x]').forEach(b => { b.onclick = () => onChange(tags.filter(t => t !== b.dataset.tagX)); });
    const addBtn = container.querySelector('#tag_add');
    if (addBtn) addBtn.onclick = () => {
      const inp = container.querySelector('#tag_new'); const v = (inp.value || '').trim();
      if (!v || tags.includes(v)) { inp.value = ''; return; }
      onChange([...tags, v]);
    };
  }

  function messagesList(rows) {
    if (!rows.length) return '<p class="muted sm">Sin mensajes enviados.</p>';
    return '<div class="list">' + rows.slice(0, 30).map(m => `
      <div class="item">
        <div class="item__t">
          <b>${m.channel === 'whatsapp' ? '💬' : '✉'} ${esc(m.subject || (m.body ? String(m.body).slice(0, 70) : '') || '(sin asunto)')}</b>
          <small>${A.date(m.created_at)} · ${A.badge(m.status)}</small>
        </div>
      </div>`).join('') + '</div>';
  }

  /* ================= SUSCRIPCIONES ================= */
  const SUB_STATUS_LABELS = { all: 'Todas', active: 'Activas', trialing: 'Prueba', cancelling: 'Cancelándose', past_due: 'Impago', canceled: 'Canceladas' };

  function subActionsHtml(r) {
    if (r.status === 'cancelling') return `<div class="subacts"><button type="button" class="btn btn--s btn--g" data-act="resume" data-id="${esc(r.id)}">Reanudar</button></div>`;
    if (r.status === 'active' || r.status === 'trialing' || r.status === 'past_due') return `<div class="subacts"><button type="button" class="btn btn--s btn--g" data-act="cancel" data-id="${esc(r.id)}">Cancelar al final</button><button type="button" class="btn btn--s btn--d" data-act="cancel_now" data-id="${esc(r.id)}">Cancelar ya</button></div>`;
    return '<span class="muted xs">—</span>';
  }

  async function renderSubscriptions(el, query) {
    el.innerHTML = '<div class="loading">Cargando…</div>';
    let rows;
    try { const res = await A.r('subscriptions', 'select=*&order=created_at.desc&limit=200'); rows = res.rows || []; }
    catch (e) { el.innerHTML = `<div class="card"><p class="err">${esc(e.message)}</p></div>`; return; }

    const active = rows.filter(r => r.status === 'active');
    const mrr = active.reduce((s, r) => s + (r.interval === 'week' ? (Number(r.price) || 0) * 4.33 : (Number(r.price) || 0)), 0);
    const pastDue = rows.filter(r => r.status === 'past_due').length;
    const cancelling = rows.filter(r => r.status === 'cancelling').length;
    let statusFilter = (query.status && SUB_STATUS_LABELS[query.status]) ? query.status : 'all';

    el.innerHTML = `${MOD_STYLE}
      <div class="grid grid--kpi mb">
        ${A.kpi('Suscripciones activas', active.length)}
        ${A.kpi('MRR estimado', A.money(mrr))}
        ${A.kpi('Impagos', pastDue, '', pastDue ? 'warn' : '')}
        ${A.kpi('Cancelándose', cancelling, '', cancelling ? 'warn' : '')}
      </div>
      <div class="card">
        <div class="chipbar mb" id="sub_chips">${Object.entries(SUB_STATUS_LABELS).map(([v, l]) => `<button type="button" class="chip${statusFilter === v ? ' on' : ''}" data-status="${v}">${l}</button>`).join('')}</div>
        <div id="sub_tbl"></div>
      </div>`;

    function draw() {
      const out = statusFilter === 'all' ? rows : rows.filter(r => r.status === statusFilter);
      el.querySelector('#sub_tbl').innerHTML = A.table({
        cols: [
          { k: 'name', label: 'Cliente', render: r => `<b>${nameOr(r.name)}</b><br><span class="muted xs">${esc(r.email || '')}</span>` },
          { k: 'plan_slug', label: 'Plan', render: r => esc(planName(r.plan_slug)) },
          { k: 'zones', label: 'Zonas', render: r => esc(zonesText(r.zones)) },
          { k: 'price', label: 'Precio', cls: 'num nowrap', render: r => `${A.money(r.price)} / ${intervalLabel(r.interval)}` },
          { k: 'status', label: 'Estado', render: r => A.badge(r.status) },
          { k: 'current_period_end', label: 'Renovación', render: r => A.date(r.current_period_end, false) },
          { k: 'order_id', label: 'Pedido', render: r => r.order_id ? `<a href="#/orders/${esc(r.order_id)}">${esc(r.order_id)}</a>` : '—' },
          { k: 'stripe_subscription', label: 'Stripe', render: r => r.stripe_subscription ? `<a href="https://dashboard.stripe.com/subscriptions/${esc(r.stripe_subscription)}" target="_blank" rel="noopener">Ver ↗</a>` : '—' },
          { k: 'acciones', label: '', cls: 'right', render: subActionsHtml }
        ],
        rows: out,
        empty: rows.length ? 'Ninguna suscripción con este estado.' : 'Todavía no hay suscripciones.'
      });
    }
    draw();

    el.querySelector('#sub_chips').onclick = e => {
      const b = e.target.closest('[data-status]'); if (!b) return;
      statusFilter = b.dataset.status;
      el.querySelectorAll('#sub_chips .chip').forEach(c => c.classList.toggle('on', c === b));
      draw();
    };
    el.querySelector('#sub_tbl').addEventListener('click', async e => {
      const btn = e.target.closest('button[data-act]'); if (!btn) return;
      const id = btn.dataset.id, act = btn.dataset.act;
      try {
        if (act === 'cancel') { await A.act('sub.cancel', { id }); A.toast('Se cancelará al final del periodo', 'ok'); }
        else if (act === 'cancel_now') { const ok = await A.confirm('¿Cancelar ya esta suscripción? El cliente perderá el acceso de inmediato.', { label: 'Cancelar ya', danger: true }); if (!ok) return; await A.act('sub.cancel', { id, now: true }); A.toast('Suscripción cancelada', 'ok'); }
        else if (act === 'resume') { await A.act('sub.resume', { id }); A.toast('Suscripción reanudada', 'ok'); }
        renderSubscriptions(el, query);
      } catch (err) { A.toast(err.message, 'bad'); }
    });
  }

  A.mod('subscriptions', { title: 'Suscripciones', icon: '↻', group: 'Ventas', render: (el, params, query) => renderSubscriptions(el, query) });

  /* ================= CLIENTES ================= */
  function customerOrdersTable(rows) {
    return A.table({
      cols: [
        { k: 'id', label: 'Pedido', render: r => `<a href="#/orders/${esc(r.id)}">${esc(r.id)}</a>` },
        { k: 'created_at', label: 'Fecha', render: r => A.date(r.created_at, false) },
        { k: 'status', label: 'Estado', render: r => A.badge(r.status) },
        { k: 'total', label: 'Total', cls: 'right num', render: r => A.money(r.total) }
      ],
      rows, empty: 'Sin pedidos todavía.'
    });
  }
  function customerSubsTable(rows) {
    return A.table({
      cols: [
        { k: 'plan_slug', label: 'Plan', render: r => esc(planName(r.plan_slug)) },
        { k: 'status', label: 'Estado', render: r => A.badge(r.status) },
        { k: 'price', label: 'Precio', cls: 'right num nowrap', render: r => `${A.money(r.price)} / ${intervalLabel(r.interval)}` },
        { k: 'current_period_end', label: 'Renovación', render: r => A.date(r.current_period_end, false) }
      ],
      rows, empty: 'Sin suscripciones.'
    });
  }

  async function renderCustomersList(el, query) {
    el.innerHTML = '<div class="loading">Cargando…</div>';
    let rows;
    try { const res = await A.r('customers', 'select=*&order=last_order_at.desc&limit=200'); rows = res.rows || []; }
    catch (e) { el.innerHTML = `<div class="card"><p class="err">${esc(e.message)}</p></div>`; return; }

    el.innerHTML = `${MOD_STYLE}
      <div class="row row--sb mb">
        <input class="search grow" id="cust_q" type="search" placeholder="Buscar por nombre, email o teléfono…" value="${esc(query.q || '')}">
        <a class="btn btn--g btn--s" href="${A.exportUrl('customers')}" target="_blank" rel="noopener">⇩ Exportar CSV</a>
      </div>
      <div class="card"><div id="cust_tbl"></div></div>`;

    function draw() {
      const q = (el.querySelector('#cust_q').value || '').toLowerCase().trim();
      const out = q ? rows.filter(r => [r.name, r.email, r.phone].some(v => String(v || '').toLowerCase().includes(q))) : rows;
      el.querySelector('#cust_tbl').innerHTML = A.table({
        cols: [
          { k: 'name', label: 'Cliente', render: r => `<b>${nameOr(r.name)}</b><br><span class="muted xs">${esc(r.email)}</span>` },
          { k: 'phone', label: 'Teléfono', render: r => phoneHtml(r.phone) },
          { k: 'orders_count', label: 'Pedidos', cls: 'right', render: r => r.orders_count || 0 },
          { k: 'total_spent', label: 'Gastado', cls: 'right num', render: r => A.money(r.total_spent) },
          { k: 'last_order_at', label: 'Último pedido', render: r => A.rel(r.last_order_at) },
          { k: 'tags', label: 'Etiquetas', render: r => tagsHtml(r.tags) },
          { k: 'wa', label: '', cls: 'right', render: r => r.phone ? `<a class="btn btn--s btn--g" href="https://wa.me/${waNum(r.phone)}" target="_blank" rel="noopener">💬 WhatsApp</a>` : '' }
        ],
        rows: out,
        empty: q ? 'Ningún cliente coincide con la búsqueda.' : 'Todavía no hay clientes.',
        rowAttr: r => `data-id="${esc(r.id)}"`
      });
    }
    draw();

    el.querySelector('#cust_q').oninput = draw;
    el.querySelector('#cust_tbl').addEventListener('click', e => {
      if (e.target.closest('a,button')) return;
      const tr = e.target.closest('tr[data-id]');
      if (tr) A.go('customers/' + tr.dataset.id);
    });
  }

  async function renderCustomerDetail(el, id) {
    el.innerHTML = '<div class="loading">Cargando…</div>';
    let cust;
    try { const res = await A.r('customers', 'select=*&id=eq.' + encodeURIComponent(id)); cust = (res.rows || [])[0]; }
    catch (e) { el.innerHTML = `<div class="card"><p class="err">${esc(e.message)}</p></div>`; return; }
    if (!cust) { el.innerHTML = `<div class="card"><p class="err">No se encontró este cliente.</p><button type="button" class="btn btn--g mt" id="back">← Volver a clientes</button></div>`; el.querySelector('#back').onclick = () => A.go('customers'); return; }

    let ordersRows = [], subsRows = [], msgsRows = [];
    try {
      const [o, s, m] = await Promise.all([
        A.r('orders', 'select=*&email=eq.' + encodeURIComponent(cust.email) + '&order=created_at.desc'),
        A.r('subscriptions', 'select=*&email=eq.' + encodeURIComponent(cust.email) + '&order=created_at.desc'),
        A.r('messages', 'select=*&to_addr=eq.' + encodeURIComponent(cust.email) + '&order=created_at.desc&limit=30')
      ]);
      ordersRows = o.rows || []; subsRows = s.rows || []; msgsRows = m.rows || [];
    } catch (e) { /* deja las secciones vacías si falla alguna consulta */ }

    const addr = cust.address || {};
    const addrText = [addr.line, addr.zip, addr.city, addr.country].filter(Boolean).join(', ');

    el.innerHTML = `${MOD_STYLE}
      <div class="row row--sb mb">
        <button type="button" class="btn btn--g btn--s" id="back">← Clientes</button>
        <div class="detail-actions">
          <button type="button" class="btn btn--s" id="btn_email">✉ Enviar email</button>
          ${cust.phone ? `<button type="button" class="btn btn--s" id="btn_wa">💬 Enviar WhatsApp</button>` : ''}
        </div>
      </div>
      <div class="grid grid--2">
        <div class="card">
          <div class="card__h"><h2>${nameOr(cust.name)}</h2></div>
          <p class="kv"><b>Email</b><span>${esc(cust.email)}</span></p>
          <p class="kv"><b>Teléfono</b><span>${phoneHtml(cust.phone)}</span></p>
          <p class="kv"><b>Dirección</b><span>${addrText ? esc(addrText) : '—'}</span></p>
          <p class="kv"><b>Pedidos</b><span>${cust.orders_count || 0}</span></p>
          <p class="kv"><b>Gastado</b><span>${A.money(cust.total_spent)}</span></p>
          <p class="kv"><b>Primer pedido</b><span>${A.date(cust.first_order_at, false)}</span></p>
          <p class="kv"><b>Último pedido</b><span>${A.rel(cust.last_order_at)}</span></p>
          <div class="mt"><b class="xs muted">ETIQUETAS</b><div class="mt" id="tags_box"></div></div>
          <div class="mt"><label class="xs muted b" for="notes_box">Notas</label><textarea id="notes_box" rows="4">${esc(cust.notes || '')}</textarea><button type="button" class="btn btn--s btn--g mt" id="save_notes">Guardar notas</button></div>
        </div>
        <div class="grid">
          ${A.card('Pedidos', customerOrdersTable(ordersRows))}
          ${A.card('Suscripciones', customerSubsTable(subsRows))}
          ${A.card('Mensajes enviados', messagesList(msgsRows))}
        </div>
      </div>`;

    el.querySelector('#back').onclick = () => A.go('customers');
    el.querySelector('#btn_email').onclick = () => openEmailModal(cust.email);
    const btnWa = el.querySelector('#btn_wa'); if (btnWa) btnWa.onclick = () => openWhatsAppModal(cust.phone);

    const tagsBox = el.querySelector('#tags_box');
    tagsBox.innerHTML = tagsEditorHtml(cust.tags || []);
    wireTagsEditor(tagsBox, cust.tags || [], async newTags => {
      try { await A.rPatch('customers', 'id=eq.' + encodeURIComponent(id), { tags: newTags }); A.toast('Etiquetas guardadas', 'ok'); renderCustomerDetail(el, id); }
      catch (e) { A.toast(e.message, 'bad'); }
    });

    el.querySelector('#save_notes').onclick = async () => {
      try { await A.rPatch('customers', 'id=eq.' + encodeURIComponent(id), { notes: el.querySelector('#notes_box').value.trim() || null }); A.toast('Notas guardadas', 'ok'); }
      catch (e) { A.toast(e.message, 'bad'); }
    };
  }

  A.mod('customers', {
    title: 'Clientes', icon: '👤', group: 'Ventas',
    render: async (el, params, query) => { if (params && params.length) await renderCustomerDetail(el, params[0]); else await renderCustomersList(el, query); }
  });

  /* ================= LEADS ================= */
  const LEAD_STATUS_OPTIONS = [['all', 'Todos'], ['active', 'Activos'], ['customer', 'Clientes'], ['unsubscribed', 'Bajas']];
  const SOURCE_LABELS = { popup: 'Popup', quiz: 'Quiz', footer: 'Pie de página', garantia: 'Garantía', contacto: 'Contacto', import: 'Importado' };

  function openImportModal(refresh) {
    const body = document.createElement('div');
    body.innerHTML = `<p class="muted sm">Una línea por lead: <span class="mono">email;nombre;teléfono</span>. El nombre y el teléfono son opcionales.</p><div class="fld"><textarea id="import_rows" rows="10" placeholder="ana@ejemplo.com;Ana García;600111222&#10;luis@ejemplo.com;;600333444"></textarea></div>`;
    A.modal({
      title: 'Importar leads', body, wide: true,
      actions: [
        { label: 'Cancelar', onClick: () => {} },
        {
          label: 'Importar', primary: true, onClick: async m => {
            const raw = m.querySelector('#import_rows').value;
            const rows = raw.split('\n').map(l => l.trim()).filter(Boolean).map(l => {
              const [email, name, phone] = l.split(';').map(s => (s || '').trim());
              return { email, name: name || null, phone: phone || null };
            }).filter(r => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(r.email));
            if (!rows.length) throw new Error('No hay ninguna fila válida (formato: email;nombre;teléfono)');
            const r = await A.act('lead.import', { rows });
            A.toast(`${r.imported || 0} lead(s) importado(s)`, 'ok');
            refresh();
          }
        }
      ]
    });
  }

  function openLeadEditModal(lead, refresh) {
    const fields = [
      { k: 'name', label: 'Nombre', type: 'text' },
      { k: 'phone', label: 'Teléfono', type: 'tel' },
      { k: 'wa_optin', label: 'Acepta WhatsApp', type: 'toggle' },
      { k: 'email_optin', label: 'Acepta email', type: 'toggle' },
      { k: 'tags', label: 'Etiquetas (separadas por comas)', type: 'text', placeholder: 'vip, interesada' },
      { k: 'notes', label: 'Notas', type: 'textarea' }
    ];
    const values = { ...lead, tags: (lead.tags || []).join(', ') };
    const form = document.createElement('form');
    form.innerHTML = A.form(fields, values);
    form.onsubmit = e => e.preventDefault();
    A.modal({
      title: 'Editar lead', body: form, wide: true,
      actions: [
        { label: 'Cancelar', onClick: () => {} },
        {
          label: 'Guardar', primary: true, onClick: async () => {
            const data = A.read(form);
            const patch = {
              name: data.name || null, phone: data.phone || null,
              wa_optin: !!data.wa_optin, email_optin: !!data.email_optin,
              notes: data.notes || null,
              tags: String(data.tags || '').split(',').map(t => t.trim()).filter(Boolean)
            };
            await A.rPatch('leads', 'id=eq.' + encodeURIComponent(lead.id), patch);
            A.toast('Lead actualizado', 'ok');
            refresh();
          }
        }
      ]
    });
  }

  function openLeadModal(lead, refresh) {
    const body = document.createElement('div');
    body.innerHTML = `
      <p class="kv"><b>Email</b><span>${esc(lead.email)}</span></p>
      <p class="kv"><b>Nombre</b><span>${nameOr(lead.name)}</span></p>
      <p class="kv"><b>Teléfono</b><span>${phoneHtml(lead.phone)}</span></p>
      <p class="kv"><b>Acepta WhatsApp</b><span>${lead.wa_optin ? 'Sí' : 'No'}</span></p>
      <p class="kv"><b>Acepta email</b><span>${lead.email_optin ? 'Sí' : 'No'}</span></p>
      <p class="kv"><b>Origen</b><span>${esc(SOURCE_LABELS[lead.source] || lead.source || '—')}</span></p>
      ${lead.skin ? `<p class="kv"><b>Piel</b><span>${esc(lead.skin)}</span></p>` : ''}
      ${lead.code ? `<p class="kv"><b>Código</b><span class="mono">${esc(lead.code)}</span></p>` : ''}
      <p class="kv"><b>Estado</b><span>${A.badge(lead.status)}</span></p>
      <p class="kv"><b>Etiquetas</b><span>${tagsHtml(lead.tags)}</span></p>
      ${lead.notes ? `<p class="kv" style="align-items:flex-start"><b>Notas</b><span>${esc(lead.notes).replace(/\n/g, '<br>')}</span></p>` : ''}
      <p class="muted xs">Alta ${A.date(lead.created_at)} · Última visita ${A.rel(lead.last_seen)}</p>`;
    A.modal({
      title: nameOr(lead.name) !== '—' ? lead.name : lead.email, body, wide: true,
      actions: [
        {
          label: 'Borrar', danger: true, onClick: async () => {
            const ok = await A.confirm('¿Borrar el lead de ' + lead.email + '? Esta acción no se puede deshacer.', { label: 'Borrar', danger: true });
            if (!ok) return false;
            await A.rDel('leads', 'id=eq.' + encodeURIComponent(lead.id));
            A.toast('Lead borrado', 'ok'); refresh();
          }
        },
        {
          label: 'Dar de baja', onClick: async () => {
            const ok = await A.confirm('¿Dar de baja a ' + lead.email + '? Dejará de recibir comunicaciones.');
            if (!ok) return false;
            await A.rPatch('leads', 'id=eq.' + encodeURIComponent(lead.id), { email_optin: false, status: 'unsubscribed' });
            A.toast('Lead dado de baja', 'ok'); refresh();
          }
        },
        { label: 'WhatsApp', onClick: () => { if (!lead.phone) throw new Error('Este lead no tiene teléfono'); openWhatsAppModal(lead.phone); } },
        { label: 'Email', onClick: () => { openEmailModal(lead.email); } },
        { label: 'Editar', primary: true, onClick: () => { openLeadEditModal(lead, refresh); } }
      ]
    });
  }

  async function renderLeadsList(el, query) {
    el.innerHTML = '<div class="loading">Cargando…</div>';
    let rows;
    try { const res = await A.r('leads', 'select=*&order=created_at.desc&limit=300'); rows = res.rows || []; }
    catch (e) { el.innerHTML = `<div class="card"><p class="err">${esc(e.message)}</p></div>`; return; }

    const total = rows.length;
    const withWa = rows.filter(r => r.wa_optin).length;
    const converted = rows.filter(r => r.status === 'customer').length;
    const unsub = rows.filter(r => r.status === 'unsubscribed').length;
    const sources = [...new Set(rows.map(r => r.source).filter(Boolean))].sort();

    let statusFilter = LEAD_STATUS_OPTIONS.some(o => o[0] === query.status) ? query.status : 'all';
    let sourceFilter = sources.includes(query.source) ? query.source : 'all';

    el.innerHTML = `${MOD_STYLE}
      <div class="grid grid--kpi mb">
        ${A.kpi('Total leads', total)}
        ${A.kpi('Con WhatsApp', withWa)}
        ${A.kpi('Convertidos', converted, '', 'good')}
        ${A.kpi('Bajas', unsub, '', unsub ? 'warn' : '')}
      </div>
      <div class="card">
        <div class="row row--sb mb">
          <input class="search grow" id="lead_q" type="search" placeholder="Buscar por nombre, email o teléfono…" value="${esc(query.q || '')}">
          <div class="row" style="gap:8px">
            <button type="button" class="btn btn--s" id="lead_import">⇪ Importar</button>
            <a class="btn btn--g btn--s" href="${A.exportUrl('leads')}" target="_blank" rel="noopener">⇩ Exportar CSV</a>
          </div>
        </div>
        <div class="chipbar mb" id="status_chips">${LEAD_STATUS_OPTIONS.map(([v, l]) => `<button type="button" class="chip${statusFilter === v ? ' on' : ''}" data-status="${v}">${l}</button>`).join('')}</div>
        ${sources.length ? `<div class="chipbar mb" id="source_chips"><button type="button" class="chip${sourceFilter === 'all' ? ' on' : ''}" data-source="all">Todos los orígenes</button>${sources.map(s => `<button type="button" class="chip${sourceFilter === s ? ' on' : ''}" data-source="${esc(s)}">${esc(SOURCE_LABELS[s] || s)}</button>`).join('')}</div>` : ''}
        <div id="lead_tbl"></div>
      </div>`;

    const refresh = () => renderLeadsList(el, query);

    function draw() {
      const q = (el.querySelector('#lead_q').value || '').toLowerCase().trim();
      let out = rows;
      if (statusFilter !== 'all') out = out.filter(r => r.status === statusFilter);
      if (sourceFilter !== 'all') out = out.filter(r => r.source === sourceFilter);
      if (q) out = out.filter(r => [r.name, r.email, r.phone].some(v => String(v || '').toLowerCase().includes(q)));
      el.querySelector('#lead_tbl').innerHTML = A.table({
        cols: [
          { k: 'created_at', label: 'Fecha', render: r => A.date(r.created_at, false) },
          { k: 'name', label: 'Nombre', render: r => nameOr(r.name) },
          { k: 'email', label: 'Email', render: r => esc(r.email) },
          { k: 'phone', label: 'Teléfono', render: r => phoneHtml(r.phone) },
          { k: 'wa_optin', label: 'WhatsApp', render: r => r.wa_optin ? '<span class="bdg bdg--ok">Sí</span>' : '<span class="bdg">No</span>' },
          { k: 'source', label: 'Origen', render: r => esc(SOURCE_LABELS[r.source] || r.source || '—') },
          { k: 'skin', label: 'Piel', render: r => esc(r.skin || '—') },
          { k: 'code', label: 'Código', render: r => r.code ? `<span class="mono">${esc(r.code)}</span>` : '—' },
          { k: 'status', label: 'Estado', render: r => A.badge(r.status) },
          { k: 'tags', label: 'Etiquetas', render: r => tagsHtml(r.tags) }
        ],
        rows: out,
        empty: rows.length ? 'Ningún lead coincide con el filtro.' : 'Todavía no hay leads.',
        rowAttr: r => `data-id="${esc(r.id)}"`
      });
    }
    draw();

    el.querySelector('#lead_q').oninput = draw;
    el.querySelector('#status_chips').onclick = e => {
      const b = e.target.closest('[data-status]'); if (!b) return;
      statusFilter = b.dataset.status;
      el.querySelectorAll('#status_chips .chip').forEach(c => c.classList.toggle('on', c === b));
      draw();
    };
    const sc = el.querySelector('#source_chips');
    if (sc) sc.onclick = e => {
      const b = e.target.closest('[data-source]'); if (!b) return;
      sourceFilter = b.dataset.source;
      sc.querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c === b));
      draw();
    };
    el.querySelector('#lead_tbl').addEventListener('click', e => {
      const tr = e.target.closest('tr[data-id]'); if (!tr) return;
      const lead = rows.find(r => String(r.id) === tr.dataset.id);
      if (lead) openLeadModal(lead, refresh);
    });
    el.querySelector('#lead_import').onclick = () => openImportModal(refresh);
  }

  A.mod('leads', { title: 'Leads', icon: '✉', group: 'Ventas', render: (el, params, query) => renderLeadsList(el, query) });
})();
