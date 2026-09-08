/* NOCTA CRM · módulos Integraciones (Stripe, Resend, WhatsApp, Supabase) y Ajustes (general, exportar, seguridad, claves avanzadas). */
(function () {
  const A = window.A, esc = A.esc, $ = A.$, $$ = A.$$;
  let INT = null; // caché de la última respuesta de A.api('integrations') para esta vista

  // admin.css define `.grid` implícito (sin columnas) y `.grid--2/3/4` como `1fr` a bordo (<=560px), sin `minmax(0,…)`:
  // una fila interna sin salto de línea (checkboxes, botones) puede entonces desbordar. Lo corregimos aquí sin tocar admin.css.
  if (!document.getElementById('nocta-grid-fix')) {
    const st = document.createElement('style'); st.id = 'nocta-grid-fix';
    st.textContent = '.grid:not(.grid--2):not(.grid--3):not(.grid--4):not(.grid--kpi){grid-template-columns:minmax(0,1fr)}' +
      '@media (max-width:560px){.grid--2,.grid--3,.grid--4{grid-template-columns:minmax(0,1fr)!important}}';
    document.head.appendChild(st);
  }

  /* ================= INTEGRACIONES ================= */

  const statusPill = ok => `<span class="pill"><span class="dot ${ok ? 'dot--ok' : 'dot--bad'}"></span>${ok ? 'Conectado' : 'Sin conectar'}</span>`;
  const modeBadge = mode => mode === 'live' ? `<span class="bdg bdg--ok">En vivo</span>` : `<span class="bdg bdg--warn">Prueba</span>`;
  const domainBadge = status => { const map = { verified: ['Verificado', 'ok'], pending: ['Pendiente', 'warn'], not_started: ['Sin iniciar', ''] }; const [t, k] = map[status] || [status || '—', '']; return `<span class="bdg${k ? ' bdg--' + k : ''}">${esc(t)}</span>`; };
  const tplBadge = status => { const map = { APPROVED: ['Aprobada', 'ok'], PENDING: ['Pendiente', 'warn'], REJECTED: ['Rechazada', 'bad'] }; const [t, k] = map[status] || [status || '—', '']; return `<span class="bdg${k ? ' bdg--' + k : ''}">${esc(t)}</span>`; };
  const chargeBadge = status => { const map = { succeeded: ['Cobrado', 'ok'], pending: ['Pendiente', 'warn'], failed: ['Fallido', 'bad'] }; const [t, k] = map[status] || [status || '—', '']; return `<span class="bdg${k ? ' bdg--' + k : ''}">${esc(t)}</span>`; };
  const methodBadge = c => { const w = c.wallet === 'apple_pay' ? 'Apple Pay' : c.wallet === 'google_pay' ? 'Google Pay' : null; const names = { card: 'Tarjeta', bizum: 'Bizum', klarna: 'Klarna', paypal: 'PayPal', link: 'Link', sepa_debit: 'SEPA' }; return `<span class="bdg">${esc(w || names[c.method] || c.method || '—')}</span>`; };
  const methodsCheckboxes = current => { const opts = [['card', 'Tarjeta'], ['bizum', 'Bizum'], ['klarna', 'Klarna'], ['paypal', 'PayPal'], ['link', 'Link'], ['sepa_debit', 'SEPA (domiciliación)']]; const cur = current || []; return opts.map(([v, l]) => `<label class="tog sm"><input type="checkbox" value="${v}" ${cur.includes(v) ? 'checked' : ''}> ${esc(l)}</label>`).join(''); };

  /* ---- Stripe ---- */
  function stripeCard(s) {
    const connected = !!s.configured;
    const body = connected ? stripeConnectedBody(s) : stripeDisconnectedBody(s);
    return A.card('Stripe (pagos)', body, statusPill(connected));
  }
  function stripeDisconnectedBody() {
    return `
      <h3 class="mt">Cobra con Stripe: tarjeta, Apple Pay, Google Pay, Bizum, Klarna y PayPal</h3>
      <p class="muted sm">Conecta tu cuenta de Stripe para empezar a cobrar en la tienda. Solo hace falta tu clave secreta, sin salir del CRM.</p>
      <button type="button" class="btn btn--p btn--w mt" data-act="stripe-start">Iniciar sesión con Stripe</button>
    `;
  }
  function stripeConnectedBody(s) {
    const a = s.account || {};
    let out = `<div class="mt"><div class="row"><b style="font-size:16px">${esc(a.name || 'Cuenta Stripe')}</b>${a.mode ? modeBadge(a.mode) : ''}</div><p class="muted xs">${[a.email, a.country, a.currency ? String(a.currency).toUpperCase() : null].filter(Boolean).map(esc).join(' · ') || '&nbsp;'}</p></div>`;
    if (a.error) out += `<p class="err mt">${esc(a.error)}</p>`;
    else out += `<div class="grid grid--3 mt">${A.kpi('Cobros', a.charges_enabled ? 'Activos' : 'Inactivos', '', a.charges_enabled ? 'good' : 'warn')}${A.kpi('Pagos a tu banco', a.payouts_enabled ? 'Activos' : 'Inactivos', '', a.payouts_enabled ? 'good' : 'warn')}${A.kpi('Webhook', s.webhook ? 'Configurado ✓' : 'Sin configurar', '', s.webhook ? 'good' : 'warn')}</div>`;
    if (!s.webhook) out += `<p class="muted xs mt">Falta el webhook: crea un endpoint en <a href="https://dashboard.stripe.com/webhooks" target="_blank" rel="noopener">dashboard.stripe.com/webhooks ↗</a> con la URL <span class="code" style="word-break:break-all">${esc(s.webhook_url)}</span> y pega el secreto <span class="code">whsec_…</span> en Ajustes → Claves avanzadas (clave «stripe», campo «webhook_secret»).</p>`;
    if (s.source === 'env') out += `<p class="muted xs mt">Clave configurada en Netlify (variable <span class="code">STRIPE_SECRET_KEY</span>): tiene prioridad sobre la conectada aquí.</p>`;
    out += `<div class="row mt"><button type="button" class="btn btn--g" data-act="stripe-status">Ver saldo y últimos cobros</button><button type="button" class="btn btn--d" data-act="stripe-disconnect">Desconectar</button></div>`;
    out += `<div id="stripeStatusOut"></div>`;
    out += `<h3 class="mt mb">Métodos de pago en el checkout</h3><p class="muted sm">Por defecto se usan los métodos activados en tu <a href="https://dashboard.stripe.com/settings/payment_methods" target="_blank" rel="noopener">panel de Stripe ↗</a>. Apple Pay y Google Pay aparecen solos en el checkout cuando el cliente los tiene disponibles. Para forzar una lista concreta, márcala aquí (vacío = automático):</p>`;
    out += `<div class="row" id="stripeMethods">${methodsCheckboxes(s.methods)}</div>`;
    out += `<button type="button" class="btn btn--s btn--g mt" data-act="stripe-methods">Guardar métodos</button>`;
    return out;
  }
  function stripeStatusHtml(r) {
    if (!r.configured) return '<p class="muted sm mt">Sin conectar.</p>';
    const bal = r.balance || { available: [], pending: [] };
    const fmt = arr => arr.length ? arr.map(x => A.money(x.amount) + ' ' + String(x.currency).toUpperCase()).join(', ') : '—';
    const table = A.table({
      cols: [
        { k: 'created', label: 'Fecha', render: c => A.date(new Date(c.created).toISOString()), w: '100px' },
        { k: 'amount', label: 'Importe', render: c => A.money(c.amount), cls: 'right num', w: '90px' },
        { k: 'status', label: 'Estado', render: c => chargeBadge(c.status), w: '110px' },
        { k: 'method', label: 'Método', render: methodBadge },
        { k: 'email', label: 'Email', render: c => esc(c.email || '—') }
      ], rows: r.charges || [], empty: 'Sin cargos todavía.', click: false
    });
    return `<div class="grid grid--2 mt mb">${A.kpi('Saldo disponible', fmt(bal.available))}${A.kpi('Saldo pendiente', fmt(bal.pending))}</div>${table}`;
  }
  async function stripeStatusShow(el, btn) {
    btn.disabled = true; const out = $('#stripeStatusOut', el); out.innerHTML = '<div class="loading">Cargando…</div>';
    try { out.innerHTML = stripeStatusHtml(await A.act('stripe.status')); } catch (e) { out.innerHTML = `<p class="err">${esc(e.message)}</p>`; }
    btn.disabled = false;
  }
  async function stripeMethodsSave(el) {
    const methods = $$('#stripeMethods input[type=checkbox]:checked', el).map(i => i.value);
    await A.act('stripe.methods', { methods }); A.toast('Métodos guardados', 'ok');
  }
  async function stripeDisconnect(el) {
    const ok = await A.confirm('¿Desconectar Stripe? Dejarás de poder cobrar en la tienda hasta que conectes otra cuenta.', { label: 'Desconectar', danger: true });
    if (!ok) return;
    await A.act('stripe.disconnect'); A.toast('Stripe desconectado'); await reload(el);
  }
  async function stripeStart(el) {
    const r = await A.act('stripe.oauth');
    if (r.available && r.url) { location.href = r.url; return; }
    openStripeConnectModal(el);
  }
  function openStripeConnectModal(el) {
    const box = document.createElement('div');
    box.innerHTML = `
      <label class="tog"><input type="checkbox" id="stTest"> Usar claves de prueba primero</label>
      <ol class="steps mt">
        <li><span class="grow" style="min-width:0">Entra en <a id="stLink" href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener">dashboard.stripe.com/apikeys</a> — <a id="stOpen" class="btn btn--s btn--g" href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener">Abrir Stripe ↗</a></span></li>
        <li><span class="grow" style="min-width:0">Copia la «Clave secreta» (empieza por <span id="stPre" class="code">sk_live_</span>) y pégala aquí</span></li>
        <li><span class="grow" style="min-width:0">(opcional) la «Clave publicable» (<span class="code">pk_live_</span>)</span></li>
      </ol>
      <div class="fld mt"><label for="stSecret">Clave secreta</label><div class="row"><input id="stSecret" type="password" class="grow" placeholder="sk_live_..." autocomplete="off"><button type="button" class="btn btn--s btn--g" id="stShow">Mostrar</button></div></div>
      <div class="fld"><label for="stPub">Clave publicable (opcional)</label><input id="stPub" type="text" placeholder="pk_live_..." autocomplete="off"></div>
      <p class="muted xs">La clave se guarda cifrada en tu base de datos y nunca se muestra entera. Con ella el CRM verifica la cuenta y crea automáticamente el webhook de pagos.</p>
    `;
    $('#stTest', box).onchange = e => {
      const t = e.target.checked; const url = t ? 'https://dashboard.stripe.com/test/apikeys' : 'https://dashboard.stripe.com/apikeys';
      $('#stLink', box).href = url; $('#stLink', box).textContent = t ? 'dashboard.stripe.com/test/apikeys' : 'dashboard.stripe.com/apikeys';
      $('#stOpen', box).href = url; $('#stPre', box).textContent = t ? 'sk_test_' : 'sk_live_'; $('#stSecret', box).placeholder = t ? 'sk_test_...' : 'sk_live_...';
    };
    $('#stShow', box).onclick = () => { const i = $('#stSecret', box); i.type = i.type === 'password' ? 'text' : 'password'; };
    A.modal({
      title: 'Conecta tu cuenta de Stripe (2 minutos)', body: box,
      actions: [
        { label: 'Cancelar', onClick: () => { } },
        {
          label: 'Conectar', primary: true, onClick: async () => {
            const secret = $('#stSecret', box).value.trim(); const pub = $('#stPub', box).value.trim();
            if (!secret) { A.toast('Pega la clave secreta de Stripe', 'bad'); return false; }
            const r = await A.act('stripe.connect', { secret_key: secret, publishable_key: pub });
            A.toast('Cuenta de Stripe conectada' + (r.account && r.account.name ? ': ' + r.account.name : ''), 'ok');
            await reload(el);
            if (r.webhook_error) setTimeout(() => showWebhookManual(r.webhook_error), 250);
          }
        }
      ]
    });
  }
  function showWebhookManual(err) {
    const url = (INT && INT.stripe && INT.stripe.webhook_url) || '';
    const h = A.modal({
      title: 'Configura el webhook a mano',
      body: `<p>No se pudo crear el webhook automáticamente:</p><p class="err">${esc(err)}</p>
        <p>Ve a <a href="https://dashboard.stripe.com/webhooks" target="_blank" rel="noopener">dashboard.stripe.com/webhooks ↗</a>, crea un endpoint con esta URL:</p>
        <p class="code" style="word-break:break-all">${esc(url)}</p>
        <button type="button" class="btn btn--s btn--g" id="whCopy">Copiar URL</button>
        <p class="mt">Copia el secreto que empieza por <b>whsec_</b> y pégalo en <b>Ajustes → Claves avanzadas</b>, dentro de la clave <span class="code">stripe</span> (campo <span class="code">webhook_secret</span>).</p>`,
      actions: [{ label: 'Entendido', primary: true, onClick: () => { } }]
    });
    $('#whCopy', h.body).onclick = () => A.copy(url);
  }

  /* ---- Resend ---- */
  function resendCard(r) {
    const ok = !!r.configured;
    const domainsTable = A.table({
      cols: [{ k: 'name', label: 'Dominio' }, { k: 'status', label: 'Estado', render: d => domainBadge(d.status), w: '120px' }],
      rows: r.domains || [], empty: 'Sin dominios todavía.', click: false
    });
    const pending = r.domain_pending;
    let pendingHtml = '';
    if (pending && pending.records && pending.records.length) {
      pendingHtml = `
        <h3 class="mt mb">Registros DNS de «${esc(pending.name)}»</h3>
        <p class="muted xs">Añade estos registros en tu proveedor de dominio para verificarlo.</p>
        ${A.table({
        cols: [
          { k: 'type', label: 'Tipo', w: '70px' },
          { k: 'name', label: 'Nombre' },
          { k: 'value', label: 'Valor', render: rec => `<span class="mono xs">${esc(rec.value)}</span>` },
          { k: '_c', label: '', w: '70px', render: rec => `<button type="button" class="btn btn--s btn--g" data-act="resend-copy" data-val="${esc(rec.value)}">Copiar</button>` }
        ], rows: pending.records, empty: '—', click: false
      })}
        <button type="button" class="btn btn--g mt" data-act="resend-verify" data-id="${esc(pending.id)}">Comprobar verificación</button>
      `;
    }
    const body = `
      <p class="muted sm mt">Remitente actual: <b>${esc(r.from || 'onboarding@resend.dev (pruebas)')}</b></p>
      ${domainsTable}
      ${pendingHtml}
      <h3 class="mt mb">Añadir dominio</h3>
      <form id="resendDomainForm" class="row"><input class="grow" name="name" placeholder="tudominio.com" required><button class="btn btn--p" type="submit">Añadir</button></form>
      <p class="muted xs mt">Mientras el dominio no esté verificado, los emails salen desde <span class="code">onboarding@resend.dev</span> (solo sirve para probar). Cuando esté verificado, define <span class="code">RESEND_FROM</span> en Netlify como «NOCTA &lt;hola@tudominio.com&gt;».</p>
      <button type="button" class="btn btn--g mt" data-act="resend-test">Enviar email de prueba</button>
      ${r.audience ? `<p class="muted xs mt">Audiencia: <b>${esc(r.audience.name)}</b> <span class="mono xs">${esc(r.audience.id)}</span></p>` : ''}
    `;
    return A.card('Resend (email)', body, statusPill(ok));
  }
  async function resendVerify(el, id) { const r = await A.act('resend.verify', { id }); A.toast('Estado: ' + (r.status || '—')); await reload(el); }
  async function resendTestModal() {
    const vals = await A.prompt('Enviar email de prueba', [{ k: 'to', label: 'Email', type: 'email', required: true }]);
    if (!vals) return;
    await A.act('resend.test', { to: vals.to }); A.toast('Email de prueba enviado', 'ok');
  }

  /* ---- WhatsApp ---- */
  function waFormFields() {
    return [
      { k: 'number', label: 'Número de WhatsApp', type: 'tel', placeholder: '+34 600 000 000', help: 'El número público que ve el cliente en tus mensajes y en la web.' },
      { k: 'phone_id', label: 'ID del número de teléfono', type: 'text', placeholder: '123456789012345' },
      { k: 'waba_id', label: 'ID de la cuenta de WhatsApp Business', type: 'text', placeholder: '123456789012345' },
      { k: 'token', label: 'Token de acceso permanente', type: 'password', placeholder: 'Déjalo en blanco para no cambiarlo', help: 'Se genera en developers.facebook.com → tu app → WhatsApp → API Setup.' }
    ];
  }
  function whatsappCard(w) {
    const ok = !!w.configured;
    let statusHtml;
    if (!ok) statusHtml = `<p class="muted sm mt">Sin conectar todavía. Rellena los datos de tu app de Meta abajo.</p>`;
    else if (w.error) statusHtml = `<p class="err mt">${esc(w.error)}</p>`;
    else statusHtml = `<div class="grid grid--3 mt">${A.kpi('Número', esc(w.display_phone_number || w.number || '—'))}${A.kpi('Nombre verificado', esc(w.verified_name || '—'))}${A.kpi('Calidad', esc(w.quality_rating || '—'))}</div>`;
    const body = `
      ${statusHtml}
      <h3 class="mt mb">Configuración</h3>
      <form id="waForm">${A.form(waFormFields(), { number: w.number })}<button class="btn btn--p" type="submit">Guardar</button></form>
      <div class="fld mt"><label>URL del webhook</label><div class="row"><input class="grow mono" value="${esc(w.webhook_url || '')}" readonly><button type="button" class="btn btn--s btn--g" data-act="wa-copy" data-val="${esc(w.webhook_url || '')}">Copiar</button></div></div>
      <div class="fld"><label>Token de verificación</label><div class="row"><input class="grow mono" value="${esc(w.verify_token || '')}" readonly><button type="button" class="btn btn--s btn--g" data-act="wa-copy" data-val="${esc(w.verify_token || '')}">Copiar</button></div></div>
      <ol class="steps mt">
        <li><span class="grow" style="min-width:0">Entra en <a href="https://developers.facebook.com/apps" target="_blank" rel="noopener">developers.facebook.com/apps ↗</a>, crea (o abre) tu app y añade el producto «WhatsApp».</span></li>
        <li><span class="grow" style="min-width:0">En «API Setup» copia el ID del número de teléfono y el ID de la cuenta de WhatsApp Business, y genera un token de acceso permanente.</span></li>
        <li><span class="grow" style="min-width:0">En «Configuration» → Webhook, pega la URL y el token de verificación de arriba, y suscríbete a <b>messages</b>.</span></li>
      </ol>
      <div class="row mt"><button type="button" class="btn btn--g" data-act="wa-templates">Ver plantillas aprobadas</button><button type="button" class="btn btn--g" data-act="wa-test">Enviar WhatsApp de prueba</button></div>
    `;
    return A.card('WhatsApp', body, statusPill(ok));
  }
  async function waTemplatesModal() {
    const m = A.modal({ title: 'Plantillas aprobadas', body: '<div class="loading">Cargando…</div>' });
    try {
      const r = await A.act('whatsapp.templates');
      m.body.innerHTML = A.table({
        cols: [{ k: 'name', label: 'Nombre' }, { k: 'language', label: 'Idioma', w: '80px' }, { k: 'status', label: 'Estado', render: t => tplBadge(t.status), w: '110px' }],
        rows: r.templates || [], empty: 'Sin plantillas todavía.', click: false
      });
    } catch (e) { m.body.innerHTML = `<p class="err">${esc(e.message)}</p>`; }
  }
  async function waTestModal() {
    const vals = await A.prompt('Enviar WhatsApp de prueba', [
      { k: 'to', label: 'Teléfono', type: 'tel', required: true, placeholder: '+34600000000' },
      { k: 'text', label: 'Mensaje', type: 'textarea', required: true, placeholder: 'Hola 🌙 esto es una prueba desde el CRM de NOCTA.' }
    ]);
    if (!vals) return;
    const r = await A.act('whatsapp.send', { to: vals.to, text: vals.text });
    if (r.skipped) A.modal({ title: 'WhatsApp no conectado todavía', body: `<p>No hay conexión con la API de WhatsApp, pero puedes enviarlo a mano:</p><p class="mt"><a class="btn btn--p" href="${esc(r.link)}" target="_blank" rel="noopener">Abrir WhatsApp ↗</a></p>` });
    else if (r.error) A.toast(r.error, 'bad');
    else A.toast('Mensaje enviado', 'ok');
  }

  /* ---- Supabase ---- */
  function supabaseCard(s) {
    const body = `<p class="muted sm mt">Aquí viven pedidos, clientes, leads, campañas y mensajes.</p>${s.url ? `<p class="mono xs">${esc(s.url)}</p>` : ''}`;
    return A.card('Supabase (base de datos)', body, statusPill(!!s.configured));
  }

  /* ---- render + eventos ---- */
  function drawContent(el) {
    el.innerHTML = `
      <div class="grid">${stripeCard(INT.stripe)}${resendCard(INT.resend)}${whatsappCard(INT.whatsapp)}${supabaseCard(INT.supabase)}</div>
    `;
    wireForms(el);
  }
  function wireForms(el) {
    const rd = $('#resendDomainForm', el);
    if (rd) rd.onsubmit = async e => {
      e.preventDefault(); const name = rd.name.value.trim(); if (!name) return;
      try { await A.act('resend.domain', { name }); A.toast('Dominio añadido, configura los registros DNS', 'ok'); await reload(el); } catch (err) { A.toast(err.message, 'bad'); }
    };
    const wf = $('#waForm', el);
    if (wf) wf.onsubmit = async e => {
      e.preventDefault();
      try {
        const data = A.read(wf); ['token', 'phone_id', 'waba_id'].forEach(k => { if (!data[k]) delete data[k]; });
        await A.act('whatsapp.save', data); A.toast('WhatsApp guardado', 'ok'); await reload(el);
      } catch (err) { A.toast(err.message, 'bad'); }
    };
  }
  async function handleClick(el, e) {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const act = b.dataset.act;
    try {
      if (act === 'stripe-start') await stripeStart(el);
      else if (act === 'stripe-status') await stripeStatusShow(el, b);
      else if (act === 'stripe-disconnect') await stripeDisconnect(el);
      else if (act === 'stripe-methods') await stripeMethodsSave(el);
      else if (act === 'resend-verify') await resendVerify(el, b.dataset.id);
      else if (act === 'resend-test') await resendTestModal();
      else if (act === 'resend-copy' || act === 'wa-copy') A.copy(b.dataset.val);
      else if (act === 'wa-templates') await waTemplatesModal();
      else if (act === 'wa-test') await waTestModal();
    } catch (err) { A.toast(err.message, 'bad'); }
  }
  async function reload(el) {
    el.innerHTML = '<div class="loading">Cargando…</div>';
    try { INT = await A.api('integrations'); } catch (e) { el.innerHTML = `<div class="card"><p class="err">${esc(e.message)}</p></div>`; return; }
    drawContent(el);
  }
  async function renderIntegrations(el) { el.onclick = e => handleClick(el, e); await reload(el); }

  A.mod('integrations', { title: 'Integraciones', icon: '⚙', group: 'Ajustes', render: renderIntegrations });

  /* ================= AJUSTES ================= */

  function summarizeCron(c) {
    if (!c) return 'Nada pendiente.';
    const parts = [];
    if (c.abandoned) parts.push(c.abandoned + ' recordatorios de carrito');
    if (c.guide) parts.push(c.guide + ' guías post-compra');
    if (c.winback) parts.push(c.winback + ' recuperaciones');
    if (c.renewal) parts.push(c.renewal + ' avisos de renovación');
    if (c.campaigns) parts.push(c.campaigns + ' campañas enviadas');
    return parts.length ? parts.join(', ') + '.' : 'Nada pendiente esta vez.';
  }
  async function tabGeneral(body) {
    body.innerHTML = '<div class="loading">Cargando…</div>';
    let integr = null; try { integr = await A.api('integrations'); } catch (e) { }
    const site = (A.me && A.me.site) || '';
    const cron = integr && integr.cron;
    body.innerHTML = `
      <div class="grid grid--2 mb">
        ${A.card('Tu tienda', `<p class="mt">${esc(site)}</p><a class="btn btn--g mt" href="${esc(site)}" target="_blank" rel="noopener">Ver la tienda ↗</a><p class="muted xs mt">Consultado ${A.date(new Date().toISOString())}.</p>`)}
        ${A.card('Automatizaciones', `<p class="muted sm mt">${cron && cron.t ? 'Última ejecución: ' + A.date(cron.t) + '. ' + summarizeCron(cron) : 'Todavía no se han ejecutado.'}${cron && cron.errors && cron.errors.length ? '<br><span class="err">' + cron.errors.length + ' con errores</span>' : ''}</p><button class="btn btn--p mt" id="btnCronRun">Ejecutar automatizaciones ahora</button><div id="cronOut"></div>`)}
      </div>
      <div class="grid">${A.card('Caché de la web', `<p class="muted sm mt">Si has cambiado productos, contenido o descuentos y no se ven todavía en la tienda, refresca la caché.</p><button class="btn btn--g mt" id="btnPurge">Refrescar caché de la web</button>`)}</div>
    `;
    $('#btnPurge', body).onclick = async e => { e.target.disabled = true; try { await A.act('purge'); A.toast('Caché refrescada', 'ok'); } catch (err) { A.toast(err.message, 'bad'); } e.target.disabled = false; };
    $('#btnCronRun', body).onclick = async e => {
      e.target.disabled = true;
      try { const r = await A.act('cron.run'); $('#cronOut', body).innerHTML = `<p class="mt sm">${summarizeCron(r)}${r.errors && r.errors.length ? '<br><span class="err">' + r.errors.length + ' errores</span>' : ''}</p>`; A.toast('Automatizaciones ejecutadas', 'ok'); }
      catch (err) { A.toast(err.message, 'bad'); }
      e.target.disabled = false;
    };
  }
  function tabExport(body) {
    const tables = [['orders', 'Pedidos'], ['customers', 'Clientes'], ['leads', 'Leads'], ['subscriptions', 'Suscripciones'], ['messages', 'Mensajes'], ['events', 'Eventos']];
    body.innerHTML = `<p class="muted sm mb">Descarga tus datos en CSV, listos para abrir en Excel o Google Sheets.</p><div class="grid grid--3">${tables.map(([t, l]) => A.card(l, `<a class="btn btn--p btn--w mt" href="${A.exportUrl(t)}" target="_blank" rel="noopener">Descargar CSV</a>`)).join('')}</div>`;
  }
  function tabSecurity(body) {
    body.innerHTML = A.card('Seguridad', `
      <p class="mt sm">La contraseña del CRM se define en Netlify, en la variable <span class="code">ADMIN_PASSWORD</span>.</p>
      <p class="sm">La sesión dura 30 días en este dispositivo.</p>
      <button class="btn btn--d mt" id="btnLogout2">Cerrar sesión en este dispositivo</button>
    `);
    $('#btnLogout2', body).onclick = () => A.logout();
  }
  async function tabAdvanced(body) {
    body.innerHTML = '<div class="loading">Cargando…</div>';
    let rows; try { rows = (await A.r('settings', 'select=*&order=key.asc')).rows || []; } catch (e) { body.innerHTML = `<p class="err">${esc(e.message)}</p>`; return; }
    body.innerHTML = `<p class="muted sm mb">Edición avanzada en formato JSON. Los valores enmascarados <span class="code">••••</span> se conservan si no los cambias.</p>` +
      (rows.length ? rows.map(r => `<section class="card mb"><div class="card__h"><h2>${esc(r.key)}</h2></div><textarea class="mono" data-key="${esc(r.key)}" style="width:100%;min-height:130px">${esc(JSON.stringify(r.value, null, 2))}</textarea><button type="button" class="btn btn--s btn--p mt" data-save-key="${esc(r.key)}">Guardar</button></section>`).join('') : '<p class="muted">Sin claves todavía.</p>');
    $$('[data-save-key]', body).forEach(btn => {
      btn.onclick = async () => {
        const key = btn.dataset.saveKey; const ta = body.querySelector('textarea[data-key="' + CSS.escape(key) + '"]');
        let value; try { value = ta.value.trim() ? JSON.parse(ta.value) : {}; } catch (e) { A.toast('JSON no válido', 'bad'); return; }
        btn.disabled = true;
        try { await A.act('settings.save', { key, value }); A.toast('Guardado', 'ok'); } catch (err) { A.toast(err.message, 'bad'); }
        btn.disabled = false;
      };
    });
  }

  async function renderSettings(el) {
    A.tabs(el, { 'General': tabGeneral, 'Exportar datos': tabExport, 'Seguridad': tabSecurity, 'Claves avanzadas': tabAdvanced });
  }
  A.mod('settings', { title: 'Ajustes', icon: '⋯', group: 'Ajustes', render: renderSettings });
})();
