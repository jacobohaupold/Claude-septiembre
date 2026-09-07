/* NOCTA storefront — carrito, funnels, tracking. Sin dependencias. */
(function () {
  const P = window.NOCTA_PRODUCTS, GIFTS = window.NOCTA_GIFTS, SHIP = window.NOCTA_SHIPPING;
  const byslug = s => P.find(p => p.slug === s);
  const eur = n => n.toFixed(2).replace('.', ',') + ' €';
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Tracking (primera parte, propio) ---------- */
  const T = {
    sid: (() => { try { let s = localStorage.getItem('n_sid'); if (!s) { s = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('n_sid', s); } return s; } catch (e) { return 'anon'; } })(),
    vid: (() => { try { let s = sessionStorage.getItem('n_vid'); if (!s) { s = Date.now().toString(36) + Math.random().toString(36).slice(2, 7); sessionStorage.setItem('n_vid', s); } return s; } catch (e) { return 'v'; } })(),
    q: [], timer: null,
    ctx() {
      const u = new URL(location.href); const utm = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'ttclid', 'gclid'].forEach(k => { if (u.searchParams.get(k)) utm[k] = u.searchParams.get(k); });
      try { if (Object.keys(utm).length) sessionStorage.setItem('n_utm', JSON.stringify(utm)); } catch (e) { }
      let saved = {}; try { saved = JSON.parse(sessionStorage.getItem('n_utm') || '{}'); } catch (e) { }
      return { path: u.pathname + u.search, ref: document.referrer || '', utm: Object.assign({}, saved, utm), dev: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop', lang: navigator.language, sw: screen.width, title: document.title };
    },
    send(ev, data) {
      const rec = Object.assign({ ev, t: Date.now(), sid: this.sid, vid: this.vid }, this.ctx(), { d: data || {} });
      this.q.push(rec);
      clearTimeout(this.timer); this.timer = setTimeout(() => this.flush(), 800);
      if (window.fbq) { const m = { view_item: 'ViewContent', add_to_cart: 'AddToCart', begin_checkout: 'InitiateCheckout', purchase: 'Purchase', lead: 'Lead' }[ev]; if (m) fbq('track', m, data || {}); }
      if (window.ttq) { const m = { view_item: 'ViewContent', add_to_cart: 'AddToCart', begin_checkout: 'InitiateCheckout', purchase: 'CompletePayment', lead: 'SubmitForm' }[ev]; if (m) ttq.track(m, data || {}); }
      if (window.gtag && ev === 'purchase') gtag('event', 'purchase', data || {});
    },
    flush() {
      if (!this.q.length) return; const body = JSON.stringify(this.q.splice(0));
      try { if (navigator.sendBeacon) navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' })); else fetch('/api/track', { method: 'POST', body, keepalive: true, headers: { 'content-type': 'application/json' } }); } catch (e) { }
    }
  };
  window.nTrack = (ev, d) => T.send(ev, d);
  addEventListener('pagehide', () => T.flush()); addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') T.flush(); });
  // scroll depth + tiempo en página
  let maxScroll = 0, t0 = Date.now(), sent = {};
  addEventListener('scroll', () => { const h = document.documentElement; const pct = Math.round((scrollY + innerHeight) / h.scrollHeight * 100); if (pct > maxScroll) maxScroll = pct;[25, 50, 75, 90].forEach(m => { if (pct >= m && !sent[m]) { sent[m] = 1; T.send('scroll', { pct: m }); } }); }, { passive: true });
  addEventListener('pagehide', () => T.send('leave', { secs: Math.round((Date.now() - t0) / 1000), scroll: maxScroll }));

  /* ---------- Carrito ---------- */
  const C = {
    get() { try { return JSON.parse(localStorage.getItem('n_cart') || '[]'); } catch (e) { return []; } },
    set(items) { localStorage.setItem('n_cart', JSON.stringify(items)); this.render(); },
    add(slug, qty = 1, sub = false, src = 'pdp') {
      const items = this.get(); const p = byslug(slug); if (!p) return;
      const k = items.find(i => i.slug === slug && !!i.sub === !!sub);
      if (k) k.qty += qty; else items.push({ slug, qty, sub });
      this.set(items); this.open();
      T.send('add_to_cart', { slug, qty, sub, value: (sub ? p.sub : p.price) * qty, src });
      toast('Añadido al carrito');
    },
    remove(i) { const items = this.get(); const r = items.splice(i, 1)[0]; this.set(items); T.send('remove_from_cart', { slug: r && r.slug }); },
    qty(i, d) { const items = this.get(); items[i].qty = Math.max(1, items[i].qty + d); this.set(items); },
    totals() {
      const items = this.get(); let sub = 0, n = 0;
      items.forEach(i => { const p = byslug(i.slug); if (!p) return; sub += (i.sub ? p.sub : p.price) * i.qty; n += i.qty; });
      const disc = JSON.parse(sessionStorage.getItem('n_disc') || 'null'); let dAmt = 0;
      if (disc) dAmt = disc.type === 'pct' ? sub * disc.value / 100 : Math.min(sub, disc.value);
      const after = sub - dAmt; const ship = (after >= SHIP.freeFrom || n >= 2 || after === 0) ? 0 : SHIP.base;
      const gifts = GIFTS.filter(g => after >= g.threshold && g.slug);
      return { items, sub, n, disc, dAmt, ship, total: after + ship, gifts };
    },
    open() { $('#drawer').classList.add('open'); this.render(); T.send('view_cart', { value: this.totals().sub }); },
    close() { $('#drawer').classList.remove('open'); },
    render() {
      const t = this.totals(); const cnt = $('#cartcount'); if (cnt) cnt.textContent = t.n;
      const box = $('#cartitems'); if (!box) return;
      if (!t.items.length) { box.innerHTML = '<p style="color:#6b6b6b;text-align:center;padding:30px 0">Tu carrito está vacío.<br><a href="/#productos">Ver productos</a></p>'; }
      else box.innerHTML = t.items.map((i, idx) => { const p = byslug(i.slug); return `<div class="line"><img src="${p.image}" alt=""><div class="t"><b>${p.name}</b><small>${p.units}${i.sub ? ' · Suscripción −15 %' : ''}</small><div class="qty" style="margin-top:6px;transform:scale(.85);transform-origin:left"><button data-q="${idx}|-1">−</button><span>${i.qty}</span><button data-q="${idx}|1">+</button></div></div><div style="text-align:right"><b>${eur((i.sub ? p.sub : p.price) * i.qty)}</b><br><button class="rm" data-rm="${idx}">Quitar</button></div></div>`; }).join('') + t.gifts.map(g => `<div class="line" style="background:#f3efe6;border-radius:10px;padding:8px"><div class="t">🎁 <b>${g.label}</b><small>Regalo desbloqueado</small></div><b>0,00 €</b></div>`).join('');
      // barra de regalos
      const g = $('#giftbar'); if (g) {
        const max = GIFTS[GIFTS.length - 1].threshold; const pct = Math.min(100, (t.sub - t.dAmt) / max * 100);
        const next = GIFTS.find(x => (t.sub - t.dAmt) < x.threshold);
        g.innerHTML = `<div class="msg">${next ? `Te faltan <b>${eur(next.threshold - (t.sub - t.dAmt))}</b> para ${next.label.toLowerCase()}` : '🎉 ¡Has desbloqueado todos los regalos!'}</div><div class="track"><div class="fill" style="width:${pct}%"></div></div><div class="labels">${GIFTS.map(x => `<span>${x.threshold} € · ${x.label}</span>`).join('')}</div>`;
      }
      const tot = $('#carttotal'); if (tot) tot.innerHTML = `<div style="display:flex;justify-content:space-between;font-size:14px"><span>Subtotal</span><span>${eur(t.sub)}</span></div>${t.dAmt ? `<div style="display:flex;justify-content:space-between;font-size:14px;color:#2f8f5b"><span>Código ${t.disc.code}</span><span>−${eur(t.dAmt)}</span></div>` : ''}<div style="display:flex;justify-content:space-between;font-size:14px"><span>Envío</span><span>${t.ship ? eur(t.ship) : 'Gratis'}</span></div><div class="tot"><span>Total</span><span>${eur(t.total)}</span></div>`;
      // upsell en carrito: duo si hay nariz sin salicílico
      const up = $('#cartupsell'); if (up) {
        const slugs = t.items.map(i => i.slug); let s = null;
        if (slugs.includes('parches-nariz') && !slugs.includes('exfoliante-salicilico') && !slugs.includes('duo-poros')) s = 'exfoliante-salicilico';
        else if (!slugs.includes('parches-granos') && !slugs.includes('kit-cara-completa')) s = 'parches-granos';
        else if (!slugs.includes('serum-niacinamida')) s = 'serum-niacinamida';
        const p = s && byslug(s); up.innerHTML = p && t.items.length ? `<div class="mini"><img src="${p.image}" alt=""><div class="t"><b>Completa tu rutina:</b> ${p.name}<br><small>${p.short}</small></div><button data-add="${p.slug}" data-src="cart">+ ${eur(p.price)}</button></div>` : '';
      }
    }
  };
  window.nCart = C;

  /* ---------- UI helpers ---------- */
  function toast(m) { let t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); } t.textContent = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 1800); }
  window.nToast = toast;
  function stars(r) { return '★★★★★'.slice(0, Math.round(r)) + '☆☆☆☆☆'.slice(0, 5 - Math.round(r)); }
  window.nCard = p => `<a class="card" href="/producto.html?p=${p.slug}" data-slug="${p.slug}">${p.badge ? `<span class="badge">${p.badge}</span>` : ''}<div class="ph"><img loading="lazy" src="${p.image}" alt="${p.name}"></div><div class="body"><h3>${p.name}</h3><div class="short">${p.short}</div><div class="rev"><span class="stars">${stars(p.rating)}</span> ${p.rating} (${p.reviews})</div><div class="price">${eur(p.price)}${p.compare ? `<s>${eur(p.compare)}</s>` : ''}</div><button class="btn wide" data-add="${p.slug}" data-src="card" style="margin-top:8px;padding:11px">Añadir al carrito</button></div></a>`;
  window.nEur = eur; window.nStars = stars; window.nBySlug = byslug;

  /* ---------- Layout común (header, drawer, footer, popup) ---------- */
  function layout() {
    const h = $('#site-header'); if (h) h.innerHTML = `<div class="bar" id="topbar">🚚 Envío gratis desde 30 € o comprando 2 · 🇪🇸 Enviamos desde España en 24-48 h · ✅ Garantía 60 días</div><header class="top"><div class="wrap"><a class="logo" href="/"><svg viewBox="0 0 24 24" fill="#14213D"><path d="M15 3a9 9 0 1 0 6 15.5A8 8 0 0 1 15 3z"/></svg>nocta</a><nav class="main"><a href="/#productos">Parches</a><a href="/#skincare">Skincare</a><a href="/#packs">Packs</a><a href="/no-son-puntos-negros.html">No son puntos negros</a><a href="/quiz.html">Test de piel</a><a href="/garantia.html">Garantía</a></nav><button class="cartbtn" id="opencart">Carrito <b id="cartcount">0</b></button></div></header>`;
    const d = document.createElement('div'); d.id = 'drawer'; d.className = 'drawer'; d.innerHTML = `<div class="bg" id="closecart"></div><div class="panel"><div class="head"><b>Tu carrito</b><button class="rm" id="closecart2" style="font-size:20px;background:none;border:0">×</button></div><div class="items"><div class="gift" id="giftbar"></div><div id="cartitems"></div><div id="cartupsell" style="margin-top:12px"></div></div><div class="foot"><div id="carttotal"></div><a class="btn wide" href="/checkout.html" id="tocheckout">Finalizar compra</a><div style="text-align:center;font-size:12px;color:#6b6b6b;margin-top:8px">Pago seguro · Bizum, tarjeta, Klarna, PayPal · Garantía 60 días</div></div></div>`; document.body.appendChild(d);
    const f = $('#site-footer'); if (f) f.innerHTML = `<footer><div class="wrap"><div><div class="logo" style="color:#fff">nocta</div><p>Parches de hidrocoloide coreanos y skincare para poros, diseñados en España. Poros limpios mientras duermes.</p><p style="opacity:.7;font-size:12px">NOCTA Skin S.L. (en constitución) · Persona Responsable en la UE · Productos cosméticos notificados en el CPNP.</p></div><div><h4>Tienda</h4><a href="/#productos">Parches</a><a href="/#skincare">Skincare</a><a href="/#packs">Packs y ahorro</a><a href="/producto.html?p=parches-nariz">Parches de nariz</a></div><div><h4>Ayuda</h4><a href="/como-usar.html">Cómo usar</a><a href="/garantia.html">Garantía 60 días</a><a href="/ciencia.html">Nuestra ciencia</a><a href="/sobre.html">Sobre NOCTA</a><a href="mailto:hola@nocta.es">hola@nocta.es</a></div><div><h4>Legal</h4><a href="/legal.html#aviso">Aviso legal</a><a href="/legal.html#privacidad">Privacidad</a><a href="/legal.html#cookies">Cookies</a><a href="/legal.html#envios">Envíos y devoluciones</a></div></div></footer>`;
    // popup email (Alia-style): 10 % primera compra, tras 12 s o intención de salida, una vez
    if (!localStorage.getItem('n_popup') && !location.pathname.includes('checkout') && !location.pathname.includes('gracias') && !location.pathname.includes('admin')) {
      const pop = document.createElement('div'); pop.className = 'popup'; pop.innerHTML = `<div class="box"><button class="x" id="popx">×</button><div style="font-size:12px;letter-spacing:1px;color:#6b6b6b">BIENVENIDA A NOCTA</div><h3 style="font-size:26px;color:#14213D;margin:8px 0">Tu primera caja con −10 %</h3><p style="color:#6b6b6b">Y te enviamos la guía "Por qué tus puntos negros vuelven" (2 min de lectura).</p><form id="popform"><input type="email" required placeholder="tu@email.com"><button class="btn wide">Quiero mi −10 %</button></form><div style="font-size:11px;color:#6b6b6b;margin-top:8px">Sin spam. Baja cuando quieras.</div></div>`; document.body.appendChild(pop);
      const show = () => { if (!localStorage.getItem('n_popup')) { pop.classList.add('open'); T.send('popup_view'); } };
      setTimeout(show, 12000); document.addEventListener('mouseleave', e => { if (e.clientY < 10) show(); });
      $('#popx').onclick = () => { pop.classList.remove('open'); localStorage.setItem('n_popup', '1'); T.send('popup_close'); };
      $('#popform').onsubmit = e => { e.preventDefault(); const email = e.target.querySelector('input').value; fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email, src: 'popup' }), headers: { 'content-type': 'application/json' } }).catch(() => { }); sessionStorage.setItem('n_disc', JSON.stringify({ code: 'HOLA10', type: 'pct', value: 10 })); localStorage.setItem('n_popup', '1'); pop.classList.remove('open'); toast('Código HOLA10 aplicado (−10 %)'); T.send('lead', { src: 'popup' }); C.render(); };
    }
    C.render();
  }

  /* ---------- Eventos globales ---------- */
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-add]'); if (a) { e.preventDefault(); C.add(a.dataset.add, 1, a.dataset.sub === '1', a.dataset.src || 'btn'); return; }
    const q = e.target.closest('[data-q]'); if (q) { const [i, d] = q.dataset.q.split('|'); C.qty(+i, +d); return; }
    const r = e.target.closest('[data-rm]'); if (r) { C.remove(+r.dataset.rm); return; }
    if (e.target.closest('#opencart')) { C.open(); return; }
    if (e.target.closest('#closecart') || e.target.closest('#closecart2')) { C.close(); return; }
    if (e.target.closest('#tocheckout')) { T.send('begin_checkout', { value: C.totals().total, n: C.totals().n }); }
    const card = e.target.closest('.card[data-slug]'); if (card && !e.target.closest('[data-add]')) T.send('select_item', { slug: card.dataset.slug });
  });
  document.addEventListener('DOMContentLoaded', () => { layout(); T.send('page_view'); });
})();
