/* NOCTA CRM · módulo Tienda: precios, márgenes, descuentos automáticos, planes, post-compra y envío */
(function () {
  const { $, $$, esc } = A;

  /* ---------- catálogo base (products.js), igual que en m-products.js, para tener TODOS los productos (incluidos ocultos) ---------- */
  let basePromise = null;
  function baseCatalog() {
    if (!basePromise) basePromise = fetch('/assets/js/products.js').then(r => r.text()).then(src => {
      try { return new Function('window', src + ';return window.NOCTA_PRODUCTS')({}) || []; } catch (e) { return []; }
    }).catch(() => []);
    return basePromise;
  }
  function baseProduct(list, slug) { return (list || []).find(p => p.slug === slug) || null; }
  function mergeCatalog(base, rows) {
    const ov = Object.fromEntries((rows || []).map(r => [r.slug, r]));
    const products = (base || []).map(b => {
      const o = ov[b.slug];
      if (!o) return { ...b, active: true, stock: null };
      return { ...b, ...(o.overrides || {}), active: o.active !== false, stock: o.stock == null ? null : Number(o.stock) };
    });
    (rows || []).filter(r => !(base || []).some(b => b.slug === r.slug) && r.overrides && r.overrides.name && r.overrides.price != null).forEach(r => {
      products.push({ slug: r.slug, ...r.overrides, active: r.active !== false, stock: r.stock == null ? null : Number(r.stock) });
    });
    return products;
  }

  // zonas y skincare del constructor del Plan Noche (mismas listas que assets/js/app.js → NOCTA_PLAN)
  const PLAN_ZONES = [['Nariz', 'parches-nariz'], ['Frente', 'parches-frente'], ['Barbilla', 'parches-barbilla'], ['Granos', 'parches-granos']];
  const PLAN_SKIN = [['Exfoliante', 'exfoliante-salicilico'], ['Sérum', 'serum-niacinamida'], ['Tónico', 'tonico-hialuronico']];

  function fmtMargin(price, cost) {
    if (cost == null || price == null || isNaN(cost) || isNaN(price)) return { euro: '—', pct: '—', cls: '', pctnum: null };
    const e = price - cost, pct = price > 0 ? (e / price) * 100 : 0;
    return { euro: A.money(e), pct: A.pct(pct), cls: pct >= 60 ? 'ok' : pct >= 40 ? 'warn' : 'bad', pctnum: pct };
  }
  const dotPct = m => m.pct === '—' ? '—' : `<span class="dot dot--${m.cls}"></span> ${m.pct}`;

  A.mod('pricing', {
    title: 'Precios y márgenes', icon: '€', group: 'Tienda',
    render: async (el) => {
      el.innerHTML = '';
      A.tabs(el, {
        'Márgenes': body => tabMargins(body),
        'Descuentos automáticos': body => tabDiscounts(body),
        'Planes': body => tabPlanBuilder(body),
        'Post-compra y carrito': body => tabUpsell(body),
        'Envío y regalos': body => tabShipping(body)
      });
    }
  });

  /* ============================================================ 1) MÁRGENES ============================================================ */
  async function tabMargins(body) {
    const [base, prodRes, contentRes] = await Promise.all([baseCatalog(), A.r('products', 'select=*'), A.r('content', 'select=*')]);
    const rows = prodRes.rows || [];
    let overridesMap = Object.fromEntries(rows.map(r => [r.slug, r]));
    const products = mergeCatalog(base, rows);
    const pricingVal = ((contentRes.rows || []).find(r => r.key === 'pricing') || {}).value || {};
    const pricing = { sub_pct: 15, multi: { 2: 0, 3: 0 }, ...pricingVal };

    if (!products.length) { body.innerHTML = '<div class="card"><p class="muted">No se ha podido cargar el catálogo de productos.</p></div>'; return; }

    const rawOv = slug => (overridesMap[slug] && overridesMap[slug].overrides) || {};
    const costOf = slug => { const c = rawOv(slug).cost; return c == null || c === '' ? null : Number(c); };
    const subOf = p => { const ov = rawOv(p.slug); if (ov.sub != null) return Number(ov.sub); return +(Number(p.price) * (1 - Number(pricing.sub_pct) / 100)).toFixed(2); };

    draw();

    function draw() {
      const list = products.filter(p => !p.plan);
      const items = list.map(p => {
        const isBundle = Array.isArray(p.bundle) && p.bundle.length > 0;
        let cost;
        if (isBundle) { const cs = p.bundle.map(costOf); cost = cs.every(c => c != null) ? cs.reduce((a, c) => a + c, 0) : null; }
        else cost = costOf(p.slug);
        const sub = subOf(p);
        return { p, isBundle, cost, sub, mSale: fmtMargin(p.price, cost), mSub: fmtMargin(sub, cost) };
      });
      const withCost = items.filter(i => i.cost != null);
      const weighted = withCost.length ? withCost.reduce((a, i) => a + i.mSale.pctnum * i.p.price, 0) / withCost.reduce((a, i) => a + i.p.price, 0) : null;
      const worst = withCost.length ? withCost.reduce((a, b) => a.mSale.pctnum < b.mSale.pctnum ? a : b) : null;
      const noCost = items.length - withCost.length;
      const kpiCls = pct => pct == null ? '' : pct >= 60 ? 'good' : 'warn';

      body.innerHTML = `
        <div class="grid grid--kpi mb">
          ${A.kpi('Margen medio ponderado', weighted == null ? '—' : A.pct(weighted), 'ponderado por precio de venta', kpiCls(weighted))}
          ${A.kpi('Peor margen', worst ? A.pct(worst.mSale.pctnum) : '—', worst ? esc(worst.p.name) : 'Sin costes cargados', kpiCls(worst && worst.mSale.pctnum))}
          ${A.kpi('Sin coste', String(noCost), 'de ' + items.length + ' productos', noCost ? 'warn' : 'good')}
        </div>
        ${A.card('Márgenes por producto', A.table({
          cols: [
            { k: 'n', label: 'Producto', render: r => `${esc(r.p.name)}${r.isBundle ? ' <span class="bdg">Pack</span>' : ''}${r.p.active === false ? ' <span class="bdg bdg--bad">Oculto</span>' : ''}` },
            { k: 'pv', label: 'Venta', cls: 'right num', render: r => A.money(r.p.price) },
            { k: 'ps', label: 'Susc.', cls: 'right num', render: r => A.money(r.sub) },
            { k: 'c', label: 'Coste', cls: 'right', render: r => r.isBundle ? (r.cost == null ? '<span class="muted">—</span>' : `<span class="num">${A.money(r.cost)}</span>`) : `<input type="number" step="0.01" min="0" class="num" style="width:82px;text-align:right" data-cost="${esc(r.p.slug)}" data-orig="${r.cost == null ? '' : r.cost}" value="${r.cost == null ? '' : r.cost}" placeholder="—">` },
            { k: 'me', label: 'Margen € venta', cls: 'right num', render: r => r.mSale.euro },
            { k: 'mp', label: 'Margen % venta', cls: 'right nowrap', render: r => dotPct(r.mSale) },
            { k: 'mes', label: 'Margen € susc.', cls: 'right num', render: r => r.mSub.euro },
            { k: 'mps', label: 'Margen % susc.', cls: 'right nowrap', render: r => dotPct(r.mSub) },
            { k: 'ah', label: 'Ahorro cliente', cls: 'right num', render: r => r.p.compare ? A.money(r.p.compare - r.p.price) : '—' }
          ], rows: items, empty: 'Sin productos.'
        }))}
        ${A.card('Plan Noche · combinaciones (1-4 zonas, con/sin skincare)', planNocheHtml())}
        ${A.card('Plan Semanal', planSemanalHtml())}
        <p class="xs muted mt">El coste es un dato interno: el servidor lo filtra siempre y nunca se publica en la web.</p>`;
      attach();
    }

    function planNocheHtml() {
      const planM = products.find(p => p.slug === 'plan-mensual');
      if (!planM || !planM.plan || !planM.plan.builder) return '<p class="muted xs">No se encuentra el Plan Noche (plan-mensual) en el catálogo.</p>';
      const b = planM.plan.builder;
      const patchCosts = PLAN_ZONES.map(z => costOf(z[1])).filter(c => c != null);
      const avgPatch = patchCosts.length ? patchCosts.reduce((a, c) => a + c, 0) / patchCosts.length : null;
      const skinCosts = PLAN_SKIN.map(s => costOf(s[1])).filter(c => c != null);
      const avgSkin = skinCosts.length ? skinCosts.reduce((a, c) => a + c, 0) / skinCosts.length : null;
      const rows = [];
      [1, 2, 3, 4].forEach(n => [false, true].forEach(skin => {
        const price = Number(b.patch[n] || 0) + (skin ? Number(b.skincare || 0) : 0);
        const cost = avgPatch == null || (skin && avgSkin == null) ? null : avgPatch * n + (skin ? avgSkin : 0);
        rows.push({ n, skin, price, cost, m: fmtMargin(price, cost) });
      }));
      return A.table({
        cols: [
          { k: 'z', label: 'Zonas', render: r => r.n + (r.n === 1 ? ' zona' : ' zonas') },
          { k: 's', label: 'Skincare', render: r => r.skin ? 'Con skincare' : 'Sin skincare' },
          { k: 'p', label: 'Precio', cls: 'right num', render: r => A.money(r.price) },
          { k: 'co', label: 'Coste estimado', cls: 'right num', render: r => r.cost == null ? '—' : A.money(r.cost) },
          { k: 'me', label: 'Margen €', cls: 'right num', render: r => r.m.euro },
          { k: 'mp', label: 'Margen %', cls: 'right nowrap', render: r => dotPct(r.m) }
        ], rows, empty: ''
      }) + `<p class="xs muted mt">Coste estimado = media del coste de los parches (nariz, frente, barbilla, granos) × nº de zonas${avgSkin != null ? ' + coste medio del skincare (exfoliante, sérum, tónico)' : ''}. ${avgPatch == null ? 'Añade el coste de esos productos en la tabla de arriba para ver la estimación.' : ''}</p>`;
    }

    function planSemanalHtml() {
      const planS = products.find(p => p.slug === 'plan-semanal');
      if (!planS) return '<p class="muted xs">No se encuentra el Plan Semanal (plan-semanal) en el catálogo.</p>';
      const patchCosts = PLAN_ZONES.map(z => costOf(z[1])).filter(c => c != null);
      const avgPatch = patchCosts.length ? patchCosts.reduce((a, c) => a + c, 0) / patchCosts.length : null;
      const price = Number(planS.price) || 0;
      const m = fmtMargin(price, avgPatch);
      return A.table({
        cols: [
          { k: 'c', label: 'Caja', render: () => '1 caja (una zona) cada semana' },
          { k: 'p', label: 'Precio', cls: 'right num', render: () => A.money(price) },
          { k: 'co', label: 'Coste estimado', cls: 'right num', render: () => avgPatch == null ? '—' : A.money(avgPatch) },
          { k: 'me', label: 'Margen €', cls: 'right num', render: () => m.euro },
          { k: 'mp', label: 'Margen %', cls: 'right nowrap', render: () => dotPct(m) }
        ], rows: [{}], empty: ''
      });
    }

    function attach() {
      $$('[data-cost]', body).forEach(inp => {
        const commit = async () => {
          if (inp.value === inp.dataset.orig) return;
          const val = inp.value === '' ? null : Number(inp.value);
          if (val != null && (isNaN(val) || val < 0)) { A.toast('Coste no válido', 'bad'); inp.value = inp.dataset.orig; return; }
          const slug = inp.dataset.cost;
          const dbRow = overridesMap[slug];
          const overrides = { ...(dbRow && dbRow.overrides || {}) };
          if (val == null) delete overrides.cost; else overrides.cost = val;
          const active = dbRow ? dbRow.active !== false : true;
          const stock = dbRow && dbRow.stock != null ? dbRow.stock : null;
          inp.disabled = true;
          try {
            await A.act('product.save', { slug, overrides, active, stock });
            overridesMap[slug] = { ...(dbRow || {}), slug, overrides, active, stock };
            A.toast('Coste guardado', 'ok');
            draw();
          } catch (e) { A.toast(e.message, 'bad'); inp.disabled = false; }
        };
        inp.addEventListener('blur', commit);
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); inp.blur(); } });
      });
    }
  }

  /* ============================================================ 2) DESCUENTOS AUTOMÁTICOS ============================================================ */
  async function tabDiscounts(body) {
    const [contentRes, prodRes] = await Promise.all([A.r('content', 'select=*'), A.r('products', 'select=*&slug=eq.parches-nariz')]);
    const val = ((contentRes.rows || []).find(r => r.key === 'pricing') || {}).value || {};
    const v = { sub_pct: 15, multi: { 2: 0, 3: 0 }, ...val };
    const ov = (prodRes.rows || [])[0];
    const price = ov && ov.overrides && ov.overrides.price != null ? Number(ov.overrides.price) : 16.95;
    const fixedSub = ov && ov.overrides && ov.overrides.sub != null ? Number(ov.overrides.sub) : null;

    body.innerHTML = '';
    const card = document.createElement('div'); card.innerHTML = A.card('Descuentos automáticos', '<p class="muted xs mb">Se aplican solos en ficha, carrito y checkout de la tienda, sin tocar el precio de cada producto uno a uno.</p>');
    body.appendChild(card);
    const cardBody = $('.card', card);
    const f = document.createElement('form');
    f.innerHTML = A.form([
      { k: 'sub_pct', label: '% de descuento en suscripción', type: 'number', step: '0.1', min: 0, help: 'Recalcula el precio "con suscripción" de todos los productos que NO tengan un precio de suscripción fijo puesto a mano en su ficha.' },
      { k: 'multi.2', label: '% extra al comprar 2 unidades', type: 'number', step: '0.1', min: 0 },
      { k: 'multi.3', label: '% extra al comprar 3 unidades', type: 'number', step: '0.1', min: 0 }
    ], v);
    cardBody.appendChild(f);
    const prev = document.createElement('div'); prev.className = 'mt'; cardBody.appendChild(prev);
    const updatePrev = () => {
      let cv; try { cv = A.read(f); } catch (e) { cv = v; }
      const subPct = Number(cv.sub_pct) || 0;
      const m2 = Number(cv.multi && cv.multi[2]) || 0, m3 = Number(cv.multi && cv.multi[3]) || 0;
      const sub = fixedSub != null ? fixedSub : +(price * (1 - subPct / 100)).toFixed(2);
      const unit = (qty, isSub) => { const b = isSub ? sub : price; const pct = qty >= 3 ? m3 : qty >= 2 ? m2 : 0; return +(b * (1 - pct / 100)).toFixed(2); };
      prev.innerHTML = `<div class="muted xs mb">Ejemplo en vivo con Parches de Nariz (precio ${A.money(price)})</div>` +
        A.table({ cols: [{ k: 'q', label: 'Unidades' }, { k: 'o', label: 'Precio único', cls: 'right num', render: r => A.money(unit(r.q, false)) }, { k: 's', label: 'Con suscripción', cls: 'right num', render: r => A.money(unit(r.q, true)) }], rows: [1, 2, 3].map(q => ({ q })), empty: '' }) +
        (fixedSub != null ? `<p class="xs muted mt">Parches de Nariz tiene un precio de suscripción fijo (${A.money(fixedSub)}) puesto a mano: el % de suscripción no le afecta.</p>` : '');
    };
    f.addEventListener('input', updatePrev); updatePrev();
    const sb = document.createElement('button'); sb.className = 'btn btn--p btn--w mt'; sb.type = 'button'; sb.textContent = 'Guardar';
    cardBody.appendChild(sb);
    sb.onclick = async () => {
      try {
        const cv = A.read(f);
        const value = { sub_pct: Number(cv.sub_pct) || 0, multi: { 2: Number(cv.multi && cv.multi[2]) || 0, 3: Number(cv.multi && cv.multi[3]) || 0 } };
        sb.disabled = true;
        await A.act('content.save', { key: 'pricing', value });
        A.toast('Guardado. La web lo aplica en menos de 1 minuto', 'ok');
      } catch (e) { A.toast(e.message, 'bad'); } finally { sb.disabled = false; }
    };
  }

  /* ============================================================ 3) PLANES (constructor de precios) ============================================================ */
  async function tabPlanBuilder(body) {
    const [base, prodRes, contentRes] = await Promise.all([baseCatalog(), A.r('products', 'select=*'), A.r('content', 'select=*')]);
    const rows = prodRes.rows || [];
    const overridesMap = Object.fromEntries(rows.map(r => [r.slug, r]));
    const products = mergeCatalog(base, rows);
    const planM = products.find(p => p.slug === 'plan-mensual');
    const planS = products.find(p => p.slug === 'plan-semanal');
    if (!planM || !planM.plan || !planS) { body.innerHTML = '<div class="card"><p class="err">No se encuentran los productos del Plan Noche (plan-mensual) o del Plan Semanal (plan-semanal) en el catálogo.</p></div>'; return; }
    const builder = planM.plan.builder || { patch: [0, 16, 28, 39, 49], skincare: 21 };
    const shipping = { base: 3.9, freeFrom: 30, ...(((contentRes.rows || []).find(r => r.key === 'shipping') || {}).value || {}) };

    body.innerHTML = '<div id="pn"></div><div id="ps" class="mt"></div><div id="prev" class="mt"></div>';

    const pnWrap = $('#pn', body);
    pnWrap.innerHTML = A.card('Plan Noche · precios del constructor', '<p class="muted xs mb">Precio según el nº de zonas de parches elegidas, más un extra fijo si se añade skincare. Se aplica en la ficha, el carrito y el checkout.</p>');
    const pf = document.createElement('form');
    pf.innerHTML = A.form([
      { k: 'p1', label: 'Precio con 1 zona (€/mes)', type: 'number', step: '0.01', min: 0, required: true },
      { k: 'p2', label: 'Precio con 2 zonas (€/mes)', type: 'number', step: '0.01', min: 0, required: true },
      { k: 'p3', label: 'Precio con 3 zonas (€/mes)', type: 'number', step: '0.01', min: 0, required: true },
      { k: 'p4', label: 'Precio con 4 zonas (€/mes)', type: 'number', step: '0.01', min: 0, required: true },
      { k: 'skincare', label: 'Extra por añadir skincare (€/mes)', type: 'number', step: '0.01', min: 0, required: true }
    ], { p1: builder.patch[1], p2: builder.patch[2], p3: builder.patch[3], p4: builder.patch[4] != null ? builder.patch[4] : 49, skincare: builder.skincare });
    $('.card', pnWrap).appendChild(pf);
    const pnBtn = document.createElement('button'); pnBtn.className = 'btn btn--p btn--w mt'; pnBtn.type = 'button'; pnBtn.textContent = 'Guardar Plan Noche';
    pf.appendChild(pnBtn);

    const psWrap = $('#ps', body);
    psWrap.innerHTML = A.card('Plan Semanal · precio', '');
    const sf = document.createElement('form');
    sf.innerHTML = A.form([{ k: 'price', label: 'Precio por caja (€/semana)', type: 'number', step: '0.01', min: 0, required: true }], { price: planS.price });
    $('.card', psWrap).appendChild(sf);
    const psBtn = document.createElement('button'); psBtn.className = 'btn btn--p btn--w mt'; psBtn.type = 'button'; psBtn.textContent = 'Guardar Plan Semanal';
    sf.appendChild(psBtn);

    const prevWrap = $('#prev', body);
    function refPrices() {
      const zp = PLAN_ZONES.map(z => { const p = A.product(z[1]); return p ? Number(p.price) : null; }).filter(n => n != null);
      const sp = PLAN_SKIN.map(s => { const p = A.product(s[1]); return p ? Number(p.price) : null; }).filter(n => n != null);
      return { patch: zp.length ? zp.reduce((a, b) => a + b, 0) / zp.length : 16.95, skin: sp.length ? sp.reduce((a, b) => a + b, 0) / sp.length : 28 };
    }
    function updatePreview() {
      let pv, sv; try { pv = A.read(pf); sv = A.read(sf); } catch (e) { return; }
      const ref = refPrices();
      const rowsN = [];
      [1, 2, 3, 4].forEach(n => [false, true].forEach(skin => {
        const key = n === 1 ? 'p1' : n === 2 ? 'p2' : 'p3';
        const price = (Number(pv[key]) || 0) + (skin ? (Number(pv.skincare) || 0) : 0);
        let retail = ref.patch * n + (skin ? ref.skin : 0);
        if (retail < shipping.freeFrom) retail += shipping.base;
        rowsN.push({ n, skin, price, retail, save: retail - price });
      }));
      const wPrice = Number(sv.price) || 0;
      let wRetail = ref.patch; if (wRetail < shipping.freeFrom) wRetail += shipping.base;
      prevWrap.innerHTML = A.card('Vista previa · Plan Noche (10 combinaciones)', A.table({
        cols: [
          { k: 'z', label: 'Zonas', render: r => r.n + (r.n === 1 ? ' zona' : ' zonas') },
          { k: 's', label: 'Skincare', render: r => r.skin ? 'Con skincare' : 'Sin skincare' },
          { k: 'p', label: 'Precio plan', cls: 'right num', render: r => A.money(r.price) },
          { k: 'r', label: 'Comprado suelto', cls: 'right num', render: r => A.money(r.retail) },
          { k: 'a', label: 'Ahorro', cls: 'right num', render: r => A.money(r.save) }
        ], rows: rowsN, empty: ''
      })) + A.card('Vista previa · Plan Semanal', A.table({
        cols: [{ k: 'c', label: 'Caja' }, { k: 'p', label: 'Precio plan', cls: 'right num' }, { k: 'r', label: 'Comprado suelto', cls: 'right num' }, { k: 'a', label: 'Ahorro', cls: 'right num' }],
        rows: [{ c: '1 caja semanal', p: A.money(wPrice), r: A.money(wRetail), a: A.money(wRetail - wPrice) }], empty: ''
      }));
    }
    pf.addEventListener('input', updatePreview); sf.addEventListener('input', updatePreview); updatePreview();

    pnBtn.onclick = async () => {
      if (!pf.reportValidity()) return;
      try {
        const v = A.read(pf);
        const dbRow = overridesMap['plan-mensual'];
        const baseOv = (dbRow && dbRow.overrides) || {};
        const planBase = (A.product('plan-mensual') || {}).plan || planM.plan || {};
        const overrides = { ...baseOv, plan: { ...planBase, builder: { patch: [0, Number(v.p1) || 0, Number(v.p2) || 0, Number(v.p3) || 0, Number(v.p4) || 0], skincare: Number(v.skincare) || 0 } } };
        const active = dbRow ? dbRow.active !== false : true;
        const stock = dbRow && dbRow.stock != null ? dbRow.stock : null;
        pnBtn.disabled = true;
        await A.act('product.save', { slug: 'plan-mensual', overrides, active, stock });
        A.toast('Plan Noche guardado. La web lo aplica en menos de 1 minuto', 'ok');
      } catch (e) { A.toast(e.message, 'bad'); } finally { pnBtn.disabled = false; }
    };
    psBtn.onclick = async () => {
      if (!sf.reportValidity()) return;
      try {
        const v = A.read(sf);
        const dbRow = overridesMap['plan-semanal'];
        const baseOv = (dbRow && dbRow.overrides) || {};
        const overrides = { ...baseOv, price: Number(v.price) || 0 };
        const active = dbRow ? dbRow.active !== false : true;
        const stock = dbRow && dbRow.stock != null ? dbRow.stock : null;
        psBtn.disabled = true;
        await A.act('product.save', { slug: 'plan-semanal', overrides, active, stock });
        A.toast('Plan Semanal guardado. La web lo aplica en menos de 1 minuto', 'ok');
      } catch (e) { A.toast(e.message, 'bad'); } finally { psBtn.disabled = false; }
    };
  }

  /* ============================================================ 4) POST-COMPRA Y CARRITO ============================================================ */
  async function tabUpsell(body) {
    const rows = (await A.r('content', 'select=*')).rows || [];
    const byKey = k => { const r = rows.find(x => x.key === k); return r ? r.value : null; };
    const upsell = { slug: 'exfoliante-salicilico', pct: 30, enabled: true, ...(byKey('upsell') || {}) };
    let cartRules = (Array.isArray(byKey('cart_upsell')) ? byKey('cart_upsell') : []).map(r => ({ ...r }));
    const products = A.products();

    if (!products.length) { body.innerHTML = '<div class="card"><p class="muted">No se pudo cargar el catálogo de productos (window.NOCTA_PRODUCTS vacío).</p></div>'; return; }

    body.innerHTML = '<div id="up"></div><div id="cu" class="mt"></div>';

    /* ---- oferta post-compra ---- */
    const upWrap = $('#up', body);
    upWrap.innerHTML = A.card('Oferta post-compra', '<p class="muted xs mb">Se ofrece en la página de gracias justo después de pagar, con cobro en 1 clic.</p>');
    const upCard = $('.card', upWrap);
    const uf = document.createElement('form');
    uf.innerHTML = A.form([
      { k: 'enabled', label: 'Oferta activa', type: 'toggle', default: true },
      { k: 'slug', label: 'Producto ofrecido', type: 'select', options: products.map(p => [p.slug, p.name]) },
      { k: 'pct', label: 'Descuento (%)', type: 'number', step: '1', min: 0, max: 90 }
    ], upsell);
    upCard.appendChild(uf);
    const uPrev = document.createElement('div'); uPrev.className = 'mt'; upCard.appendChild(uPrev);
    const updateUPrev = () => {
      let cv; try { cv = A.read(uf); } catch (e) { cv = upsell; }
      const p = products.find(x => x.slug === cv.slug) || products[0];
      if (!p) { uPrev.innerHTML = ''; return; }
      const pct = Number(cv.pct) || 0, final = +(p.price * (1 - pct / 100)).toFixed(2);
      uPrev.innerHTML = `<div class="muted xs mb">Vista previa</div><div class="row" style="gap:10px;align-items:baseline;flex-wrap:wrap"><b>${esc(p.name)}</b><span class="b num">${A.money(final)}</span><span class="muted num xs" style="text-decoration:line-through">${A.money(p.price)}</span>${!cv.enabled ? '<span class="bdg bdg--bad">Desactivada</span>' : ''}</div>`;
    };
    uf.addEventListener('input', updateUPrev); updateUPrev();
    const uBtn = document.createElement('button'); uBtn.className = 'btn btn--p btn--w mt'; uBtn.type = 'button'; uBtn.textContent = 'Guardar oferta post-compra';
    upCard.appendChild(uBtn);
    uBtn.onclick = async () => {
      try {
        const cv = A.read(uf);
        const value = { slug: cv.slug, pct: Number(cv.pct) || 0, enabled: !!cv.enabled };
        uBtn.disabled = true;
        await A.act('content.save', { key: 'upsell', value });
        A.toast('Guardado. La web lo aplica en menos de 1 minuto', 'ok');
      } catch (e) { A.toast(e.message, 'bad'); } finally { uBtn.disabled = false; }
    };

    /* ---- reglas del carrito ("Completa tu rutina") ---- */
    const cuWrap = $('#cu', body);
    const drawCart = () => {
      cuWrap.innerHTML = A.card('Completa tu rutina (carrito)', `<p class="muted xs mb">Reglas en orden: se aplica la primera que cumpla sus condiciones. "Si" y "Salvo que" son opcionales.</p><div id="cu-list"></div><button class="btn btn--g mt" id="cu-add" type="button">+ Añadir regla</button><button class="btn btn--p btn--w mt" id="cu-save" type="button">Guardar reglas</button>`);
      const list = $('#cu-list', cuWrap);
      list.innerHTML = cartRules.length ? cartRules.map((r, i) => ruleRow(r, i)).join('') : '<p class="muted xs">Sin reglas todavía: el carrito no sugiere ningún producto extra.</p>';
      $$('[data-rf]', cuWrap).forEach(inp => inp.onchange = () => {
        const i = Number(inp.closest('[data-ri]').dataset.ri), f = inp.dataset.rf;
        if (f === 'if') cartRules[i].if = inp.value || undefined;
        else if (f === 'then') cartRules[i].then = inp.value;
        else if (f === 'unless') cartRules[i].unless = inp.value.split(',').map(s => s.trim()).filter(Boolean);
      });
      $$('[data-rup]', cuWrap).forEach(b => b.onclick = () => { const i = Number(b.dataset.rup); [cartRules[i - 1], cartRules[i]] = [cartRules[i], cartRules[i - 1]]; drawCart(); });
      $$('[data-rdown]', cuWrap).forEach(b => b.onclick = () => { const i = Number(b.dataset.rdown); [cartRules[i + 1], cartRules[i]] = [cartRules[i], cartRules[i + 1]]; drawCart(); });
      $$('[data-rdel]', cuWrap).forEach(b => b.onclick = () => { cartRules.splice(Number(b.dataset.rdel), 1); drawCart(); });
      $('#cu-add', cuWrap).onclick = () => { cartRules.push({ then: products[0].slug }); drawCart(); };
      $('#cu-save', cuWrap).onclick = async () => {
        const clean = cartRules.filter(r => r.then).map(r => { const o = { then: r.then }; if (r.if) o.if = r.if; if (r.unless && r.unless.length) o.unless = r.unless; return o; });
        try { await A.act('content.save', { key: 'cart_upsell', value: clean }); A.toast('Guardado. La web lo aplica en menos de 1 minuto', 'ok'); } catch (e) { A.toast(e.message, 'bad'); }
      };
    };
    function ruleRow(r, i) {
      const opts = products.map(p => `<option value="${esc(p.slug)}" ${r.then === p.slug ? 'selected' : ''}>${esc(p.name)}</option>`).join('');
      const optsIf = `<option value="">(cualquier carrito)</option>` + products.map(p => `<option value="${esc(p.slug)}" ${r.if === p.slug ? 'selected' : ''}>${esc(p.name)}</option>`).join('');
      return `<div class="item" data-ri="${i}" style="flex-direction:column;align-items:stretch;gap:8px">
        <div class="fld--row">
          <div class="fld"><label>Si el carrito tiene</label><select data-rf="if">${optsIf}</select></div>
          <div class="fld"><label>Sugerir</label><select data-rf="then">${opts}</select></div>
        </div>
        <div class="fld"><label>Salvo que el carrito ya tenga (opcional; slugs separados por coma)</label><input type="text" data-rf="unless" value="${esc((r.unless || []).join(', '))}" placeholder="parches-nariz, duo-poros"></div>
        <div class="row row--sb">
          <div class="row" style="gap:4px"><button type="button" class="btn btn--s btn--g" data-rup="${i}" ${i === 0 ? 'disabled' : ''} aria-label="Subir">↑</button><button type="button" class="btn btn--s btn--g" data-rdown="${i}" ${i === cartRules.length - 1 ? 'disabled' : ''} aria-label="Bajar">↓</button></div>
          <button type="button" class="btn btn--s btn--d" data-rdel="${i}">Quitar</button>
        </div>
      </div>`;
    }
    drawCart();
  }

  /* ============================================================ 5) ENVÍO Y REGALOS ============================================================ */
  async function tabShipping(body) {
    const rows = (await A.r('content', 'select=*')).rows || [];
    const byKey = k => { const r = rows.find(x => x.key === k); return r ? r.value : null; };
    const gifts = Array.isArray(byKey('gifts')) ? byKey('gifts') : [];
    const shipping = { base: 3.9, freeFrom: 30, ...(byKey('shipping') || {}) };

    body.innerHTML = '<div class="grid grid--2"><div id="gifts-card"></div><div id="ship-card"></div></div>';

    const giftsCard = $('#gifts-card', body);
    giftsCard.innerHTML = A.card('Regalos por importe', `<div id="gifts-list"></div><button class="btn btn--g mt" id="gift-add" type="button">+ Añadir tramo</button><button class="btn btn--p btn--w mt" id="gifts-save" type="button">Guardar regalos</button>`);
    let giftRows = gifts.map(g => ({ ...g }));
    const drawGifts = () => {
      $('#gifts-list', giftsCard).innerHTML = giftRows.map((g, i) => `
        <div class="fld--row" data-gi="${i}" style="align-items:end">
          <div class="fld"><label>Importe mínimo (€)</label><input type="number" step="0.01" data-gf="threshold" value="${esc(g.threshold ?? '')}"></div>
          <div class="fld" style="position:relative"><label>Regalo</label><input type="text" data-gf="label" value="${esc(g.label ?? '')}"><button type="button" class="btn btn--s btn--d" data-gdel="${i}" style="position:absolute;right:0;top:-2px">✕</button></div>
        </div>`).join('') || '<p class="muted xs">Sin tramos.</p>';
      $$('[data-gdel]', giftsCard).forEach(b => b.onclick = () => { giftRows.splice(Number(b.dataset.gdel), 1); drawGifts(); });
    };
    drawGifts();
    $('#gift-add', giftsCard).onclick = () => { giftRows.push({ threshold: 0, label: '', slug: null }); drawGifts(); };
    $('#gifts-save', giftsCard).onclick = async () => {
      $$('[data-gi]', giftsCard).forEach((row, i) => { giftRows[i].threshold = Number($('[data-gf="threshold"]', row).value) || 0; giftRows[i].label = $('[data-gf="label"]', row).value; });
      try { await A.act('content.save', { key: 'gifts', value: giftRows.sort((a, b) => a.threshold - b.threshold) }); A.toast('Guardado. La web lo muestra en menos de 1 minuto', 'ok'); } catch (e) { A.toast(e.message, 'bad'); }
    };

    const shipCard = $('#ship-card', body);
    const sf = document.createElement('form');
    sf.innerHTML = A.form([
      { k: 'base', label: 'Gastos de envío (€)', type: 'number', step: '0.01' },
      { k: 'freeFrom', label: 'Envío gratis desde (€)', type: 'number', step: '0.01' }
    ], shipping);
    shipCard.innerHTML = A.card('Envío', '');
    $('.card', shipCard).appendChild(sf);
    const sb = document.createElement('button'); sb.className = 'btn btn--p btn--w mt'; sb.type = 'button'; sb.textContent = 'Guardar envío';
    sf.appendChild(sb);
    sb.onclick = async () => {
      try { const v = A.read(sf); await A.act('content.save', { key: 'shipping', value: { base: Number(v.base) || 0, freeFrom: Number(v.freeFrom) || 0 } }); A.toast('Guardado. La web lo muestra en menos de 1 minuto', 'ok'); } catch (e) { A.toast(e.message, 'bad'); }
    };
  }
})();
