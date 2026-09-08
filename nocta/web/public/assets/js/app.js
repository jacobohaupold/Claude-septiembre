/* NOCTA storefront v2 — carrito, compra exprés, hojas, tracking. Sin dependencias. */
(function(){
const STRIPE_LIVE=true,EXPRESS_BRANDED=true,BUYNOW_KEEPS_CART=true;
const P=window.NOCTA_PRODUCTS,GIFTS=window.NOCTA_GIFTS,SHIP=window.NOCTA_SHIPPING;
const byslug=s=>P.find(p=>p.slug===s),eur=n=>n.toFixed(2).replace('.',',')+' €';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)'),DESK=()=>matchMedia('(min-width:900px)').matches,raf2=f=>requestAnimationFrame(()=>requestAnimationFrame(f));
const IC={menu:'<path d="M4 8h16M4 16h16"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',bag:'<path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',chev:'<path d="m9 6 6 6-6 6"/>',back:'<path d="m15 6-6 6 6 6"/>',truck:'<path d="M3 16V6h11v10M14 9h4l3 3v4h-7"/><circle cx="7.5" cy="17.5" r="1.7"/><circle cx="17.5" cy="17.5" r="1.7"/>',shield:'<path d="M12 3l7 3v5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/>',lock:'<rect x="4.5" y="10" width="15" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',moon:'<path d="M15 3a9 9 0 1 0 6 15.5A8 8 0 0 1 15 3z"/>'};
const ico=(n,s=18)=>`<svg class="n-ico" viewBox="0 0 24 24" width="${s}" height="${s}" ${n==='moon'?'fill="currentColor"':'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"'} aria-hidden="true">${IC[n]}</svg>`;
window.nIco=ico;

/* ---------- Tracking (primera parte, propio) ---------- */
const T={
  sid:(()=>{try{let s=localStorage.getItem('n_sid');if(!s){s=Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem('n_sid',s);}return s;}catch(e){return'anon';}})(),
  vid:(()=>{try{let s=sessionStorage.getItem('n_vid');if(!s){s=Date.now().toString(36)+Math.random().toString(36).slice(2,7);sessionStorage.setItem('n_vid',s);}return s;}catch(e){return'v';}})(),
  q:[],timer:null,
  ctx(){const u=new URL(location.href);const utm={};['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','ttclid','gclid'].forEach(k=>{if(u.searchParams.get(k))utm[k]=u.searchParams.get(k);});
    try{if(Object.keys(utm).length)sessionStorage.setItem('n_utm',JSON.stringify(utm));}catch(e){}
    let saved={};try{saved=JSON.parse(sessionStorage.getItem('n_utm')||'{}');}catch(e){}
    return{path:u.pathname+u.search,ref:document.referrer||'',utm:Object.assign({},saved,utm),dev:/Mobi|Android/i.test(navigator.userAgent)?'mobile':'desktop',lang:navigator.language,sw:screen.width,title:document.title};},
  send(ev,data){const rec=Object.assign({ev,t:Date.now(),sid:this.sid,vid:this.vid},this.ctx(),{d:data||{}});this.q.push(rec);clearTimeout(this.timer);this.timer=setTimeout(()=>this.flush(),800);
    if(window.fbq){const m={view_item:'ViewContent',add_to_cart:'AddToCart',begin_checkout:'InitiateCheckout',purchase:'Purchase',lead:'Lead'}[ev];if(m)fbq('track',m,data||{});}
    if(window.ttq){const m={view_item:'ViewContent',add_to_cart:'AddToCart',begin_checkout:'InitiateCheckout',purchase:'CompletePayment',lead:'SubmitForm'}[ev];if(m)ttq.track(m,data||{});}
    if(window.gtag&&ev==='purchase')gtag('event','purchase',data||{});},
  flush(){if(!this.q.length)return;const body=JSON.stringify(this.q.splice(0));try{if(navigator.sendBeacon)navigator.sendBeacon('/api/track',new Blob([body],{type:'application/json'}));else fetch('/api/track',{method:'POST',body,keepalive:true,headers:{'content-type':'application/json'}});}catch(e){}}
};
window.nTrack=(ev,d)=>T.send(ev,d);
addEventListener('pagehide',()=>T.flush());addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')T.flush();});
let maxScroll=0,t0=Date.now(),sent={};
addEventListener('scroll',()=>{const h=document.documentElement;const pct=Math.round((scrollY+innerHeight)/h.scrollHeight*100);if(pct>maxScroll)maxScroll=pct;[25,50,75,90].forEach(m=>{if(pct>=m&&!sent[m]){sent[m]=1;T.send('scroll',{pct:m});}});
  const top=$('.n-top');if(top){const hero=document.body.classList.contains('n-v5')&&$('.n-hero5');top.classList.toggle('is-scrolled',scrollY>(hero?hero.offsetHeight-56:48));}},{passive:true});
addEventListener('pagehide',()=>T.send('leave',{secs:Math.round((Date.now()-t0)/1000),scroll:maxScroll}));

/* ---------- Helpers de producto ---------- */
const CUT=new Set(['parches-nariz','parches-granos','parches-superficie','parches-barbilla','parches-frente','exfoliante-salicilico','serum-niacinamida','mascarilla-peel-off','pack-mascarillas-tela','tonico-hialuronico']);
const base=s=>s.replace(/^.*\/|\.\w+$/g,'');
window.nWebp=s=>{const b=base(s);return(b==='gama'||b==='parches-nariz-dorso'||CUT.has(b))?`/assets/img/${b}-cut.webp`:s.replace(/\.(jpg|png)$/,'.webp');};
window.nImg=p=>(CUT.has(p.slug)||p.slug==='duo-poros'||p.slug==='kit-t-zone')?`/assets/img/${p.slug}-cut.webp`:nWebp(p.image);
window.nIsCut=s=>/-cut\.webp$/.test(s);
window.nPerUse=p=>{const m=/^(\d+(?:\s*\+\s*\d+)*)\s*(parches?|mascarillas?)/i.exec(p.units);if(!m)return'';const n=m[1].split('+').reduce((a,b)=>a+ +b,0);if(n<2)return'';return eur(p.price/n)+' por '+(/mascarilla/i.test(m[2])?'mascarilla':'parche');};
window.nKlarna=v=>v>=35?`o 3 × ${eur(v/3)} con Klarna`:'';
window.nCat=p=>p.plan?'Plan':(p.bundle||(p.tags||[]).includes('bundle')?'Pack':((p.tags||[]).includes('skincare')?'Skincare':'Parches de hidrocoloide'));
window.nPlanSuf=p=>p&&p.plan?`<small class="n-per">/${p.plan.per}</small>`:'';
const fmt=n=>String(n).replace('.',',');
function stars(r){return'★★★★★'.slice(0,Math.round(r))+'☆☆☆☆☆'.slice(0,5-Math.round(r));}
window.nStarsHtml=p=>`<span class="n-stars" role="img" aria-label="${fmt(p.rating)} sobre 5 según ${p.reviews} opiniones">${stars(p.rating)}</span>`;
window.nEur=eur;window.nStars=stars;window.nBySlug=byslug;
window.NOCTA_PHOTOS=window.NOCTA_PHOTOS||{};
const CATW={'plan-mensual':'plan mensual','plan-semanal':'plan semanal','parches-nariz':'nariz','parches-granos':'granos','parches-superficie':'superficie','parches-barbilla':'barbilla','parches-frente':'frente','exfoliante-salicilico':'exfoliante','serum-niacinamida':'sérum','mascarilla-peel-off':'peel-off','pack-mascarillas-tela':'mascarillas','tonico-hialuronico':'tónico','duo-poros':'dúo','kit-t-zone':'zona t','kit-cara-completa':'cara completa'};
window.nCardR=(p,o={})=>{const ph=NOCTA_PHOTOS[p.slug]||{};const src=ph.main||nImg(p);const cut=!ph.main&&nIsCut(src);const w=CATW[p.slug]||nCat(p).toLowerCase();
  return`<article class="n-pc n-reveal" data-slug="${p.slug}"><a class="n-pc__w" href="/producto.html?p=${p.slug}">${p.badge?`<span class="n-pc__new${/NUEVO/i.test(p.badge)?'':' n-pc__new--v'}">${/NUEVO/i.test(p.badge)?'nuevo':p.badge.toLowerCase()}</span>`:''}<img src="${src}" class="${cut?'is-cut':''}" width="960" height="960" alt="${p.name}" loading="${o.eager?'eager':'lazy'}"${o.eager?' fetchpriority="high"':''} decoding="async">${ph.alt?`<img src="${ph.alt}" class="alt" width="960" height="960" alt="" loading="lazy" decoding="async">`:''}</a><div class="n-pc__i"><p class="n-pc__r">${nStarsHtml(p)}<span>(${p.reviews})</span></p><div class="n-pc__t"><b>${p.name}</b><span class="n-num">${eur(p.price)}${nPlanSuf(p)}</span></div><p class="n-pc__s">${p.short}${p.compare?` · <s>${eur(p.compare)}</s>`:''}</p><button class="n-btn" data-buy="${p.slug}" data-src="${o.src||'card'}">${p.plan?'Empezar':'Comprar'} ${w}<span class="n-pc__bp"> · ${eur(p.price)}${p.plan?'/'+p.plan.per:''}</span></button>${WALLET!=='plain'?nPay(p.slug,{src:o.src||'card'}):''}</div></article>`;};
window.nRail=(el)=>{const rail=el.querySelector('.n-rail');if(!rail)return;const kids=[...rail.children];if(kids.length<2)return;const dots=document.createElement('div');dots.className='n-dots';dots.setAttribute('aria-hidden','true');dots.innerHTML=kids.map((k,i)=>`<i${i?'':' class="is-on"'}></i>`).join('');rail.after(dots);
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const i=kids.indexOf(e.target);[...dots.children].forEach((d,j)=>d.classList.toggle('is-on',j===i));}),{root:rail,threshold:.6});kids.forEach(k=>io.observe(k));
  const nav=el.querySelector('.n-rail__nav');if(nav){nav.innerHTML=`<button type="button" aria-label="Anterior">${ico('back',18)}</button><button type="button" aria-label="Siguiente">${ico('chev',18)}</button>`;const [a,b]=nav.children;const step=()=>kids[0].getBoundingClientRect().width+parseFloat(getComputedStyle(rail).gap||8);a.onclick=()=>rail.scrollBy({left:-step(),behavior:'smooth'});b.onclick=()=>rail.scrollBy({left:step(),behavior:'smooth'});}};
window.nTile=(p,o={})=>{const ph=NOCTA_PHOTOS[p.slug]||{};const alt=o.alt||ph.alt||'';const src=ph.main||nImg(p);const cut=!ph.main&&nIsCut(src);
  return`<article class="n-tile n-reveal" data-slug="${p.slug}"><a class="n-tile__m n-tile__l" href="/producto.html?p=${p.slug}">${p.badge?`<span class="n-tile__b">${p.badge}</span>`:''}<img src="${src}" class="${cut?'is-cut':''}" width="960" height="1200" alt="${p.name}" loading="lazy" decoding="async">${alt?`<img src="${alt}" class="alt" width="960" height="1200" alt="" loading="lazy" decoding="async">`:''}</a><div class="n-tile__t"><b>${p.name}</b><span class="n-num">${eur(p.price)}</span></div><p class="n-tile__s">${p.short}${p.compare?` · <s>${eur(p.compare)}</s>`:''}</p><div class="n-tile__a"><button class="n-btn" data-buy="${p.slug}" data-src="${o.src||'tile'}">Comprar</button>${nPay(p.slug,{src:o.src||'tile'})}</div></article>`;};
window.nCard=(p,o={})=>{const pu=nPerUse(p),save=p.compare?p.compare-p.price:0,k=nKlarna(p.price);
  return`<article class="n-card${o.row?' n-card--row':''} n-reveal" data-slug="${p.slug}"><a class="n-card__media n-cut" href="/producto.html?p=${p.slug}" tabindex="-1" aria-hidden="true">${p.badge?`<span class="n-badge">${p.badge}</span>`:''}<img src="${nImg(p)}" width="1200" height="1200" alt="" loading="lazy" decoding="async"></a><div class="n-card__body"><span class="n-lab">${nCat(p)}</span><h3 class="n-card__t"><a class="n-card__link" href="/producto.html?p=${p.slug}">${p.name}</a></h3><p class="n-card__s">${p.short}</p><p class="n-rev">${nStarsHtml(p)}<b class="n-num">${fmt(p.rating)}</b><span class="n-lab">${p.reviews} opiniones</span></p><p class="n-price"><b class="n-num">${eur(p.price)}</b>${p.compare?`<s>${eur(p.compare)}</s>`:''}<span class="n-price__u n-lab">${p.units}${pu?' · '+pu:''}${save?' · ahorras '+eur(save):''}</span></p>${k?`<p class="n-klarna">${k}</p>`:''}${nBuyBlock(p.slug,{src:'card',compact:true})}</div></article>`;};
window.nTrust=()=>`<ul class="n-trust"><li>${ico('truck')}<b>24-48 h</b>Enviamos desde España</li><li>${ico('shield')}<b>60 días</b>O te devolvemos el dinero</li><li>${ico('lock')}<b>Pago seguro</b>Bizum · Tarjeta · Klarna</li></ul>`;

/* ---------- Compra exprés ---------- */
const WALLET=(()=>{if(!STRIPE_LIVE||!EXPRESS_BRANDED)return'plain';try{if(window.ApplePaySession&&ApplePaySession.canMakePayments&&ApplePaySession.canMakePayments())return'apple';}catch(e){}
  if(/Android/i.test(navigator.userAgent)&&/Chrome|CriOS/.test(navigator.userAgent)&&window.PaymentRequest)return'google';return'plain';})();
const SVG_APPLEPAY=`<svg viewBox="0 0 76 24" height="20" aria-hidden="true" focusable="false"><path fill="#fff" d="M13.2 6.9c-.8 0-1.9-.9-3-.9-1.6 0-3 .9-3.8 2.3-1.6 2.8-.4 6.9 1.2 9.2.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.8 0-2.4 1.9-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.6-.1-2.9.9-3.5.9zM15.6 4.7c.7-.8 1.1-1.9 1-3-.9.1-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2-.5 2.7-1.3z"/><text x="27" y="17.5" fill="#fff" font-family="Inter,system-ui,-apple-system,sans-serif" font-size="15" font-weight="600" letter-spacing="-.02em">Pay</text></svg>`;
const SVG_GPAY=`<svg viewBox="0 0 76 24" height="20" aria-hidden="true" focusable="false"><path fill="#fff" d="M11.6 12.2v3.4H10V7.1h3.1c.8 0 1.5.3 2 .8.6.5.8 1.2.8 1.9 0 .8-.3 1.4-.8 1.9-.5.5-1.2.8-2 .8h-1.5zm0-3.6v2.5h1.6c.5 0 .8-.2 1.1-.5.3-.3.4-.6.4-1s-.1-.7-.4-1c-.3-.3-.6-.5-1.1-.5h-1.6zM19.2 9.7c.9 0 1.6.2 2.1.7.5.5.8 1.1.8 1.9v3.9h-1.5v-.9h-.1c-.4.7-1.1 1-1.9 1-.7 0-1.2-.2-1.7-.6-.4-.4-.7-.9-.7-1.5 0-.6.2-1.1.7-1.5.5-.4 1.1-.6 1.9-.6.7 0 1.2.1 1.7.4v-.3c0-.4-.2-.7-.5-1-.3-.3-.7-.4-1.1-.4-.6 0-1.1.3-1.5.8l-1.3-.8c.6-.8 1.4-1.1 2.6-1.1zm-1.4 4.5c0 .3.1.5.4.7.2.2.5.3.8.3.4 0 .8-.2 1.2-.5.3-.3.5-.7.5-1.1-.4-.3-.9-.4-1.5-.4-.5 0-.8.1-1.1.3-.2.2-.3.5-.3.7z"/><text x="27" y="17.5" fill="#fff" font-family="Inter,system-ui,-apple-system,sans-serif" font-size="15" font-weight="600" letter-spacing="-.02em">Pay</text></svg>`;
window.nPay=(slug,{qty=1,sub=false,src='card',cart=false,id='',opt=''}={})=>{const attr=cart?'data-express-cart':`data-buy-express="${slug}"`;const b=`class="n-pay n-pay--${WALLET}" ${id?`id="${id}" `:''}${attr} data-qty="${qty}" data-sub="${sub?1:0}" data-src="${src}"${opt?` data-opt="${opt}"`:''}`;
  if(WALLET==='apple')return`<button ${b} aria-label="Comprar con Apple Pay">${SVG_APPLEPAY}</button>`;
  if(WALLET==='google')return`<button ${b} aria-label="Comprar con Google Pay">${SVG_GPAY}</button>`;
  return`<button ${b} aria-label="Pago rápido"><span>${ico('lock',16)}Pago rápido</span></button>`;};
window.nNote=(p,qty=1,sub=false)=>((sub?p.sub:p.price)*qty>=SHIP.freeFrom||qty>=2)?'Envío gratis incluido':`Envío ${eur(SHIP.base)} · gratis desde ${SHIP.freeFrom} € o llevando 2`;
window.nBuyBlock=(slug,{qty=1,sub=false,src='card',compact=false,label='Comprar ahora',id=''}={})=>{const p=byslug(slug);if(!p)return'';const n=C.totals().n;
  return`<div class="n-buy${compact?' n-buy--compact':''}"><button class="n-btn n-btn--wide" ${id?`id="${id}" `:''}data-buy="${slug}" data-qty="${qty}" data-sub="${sub?1:0}" data-src="${src}">${label}</button>${nPay(slug,{qty,sub,src})}${compact?'<div class="n-buy__foot">':''}<button class="n-link n-buy__add" data-add="${slug}" data-qty="${qty}" data-sub="${sub?1:0}" data-src="${src}">Añadir al carrito</button><p class="n-buy__note n-lab">${nNote(p,qty,sub)}</p>${compact?'</div>':''}${n&&!compact?`<span class="n-buy__cart">Compra solo este artículo. Tu carrito (${n}) sigue guardado.</span>`:''}</div>`;};
async function nBuyRun(items,{via='buy_now',src='btn'}={}){
  const disc=JSON.parse(sessionStorage.getItem('n_disc')||'null'),utm=JSON.parse(sessionStorage.getItem('n_utm')||'{}');
  const value=items.reduce((a,i)=>{const p=byslug(i.slug);return a+(i.sub?p.sub:p.price)*i.qty;},0);
  T.send('begin_checkout',{value,n:items.reduce((a,i)=>a+i.qty,0),via,src,express:1});T.flush();
  try{const r=await fetch('/api/checkout',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({items,code:disc&&disc.code,express:true,pay:via==='buy_now'?'card':'wallet',vid:sessionStorage.getItem('n_vid'),sid:localStorage.getItem('n_sid'),utm})});
    const j=await r.json();if(j&&j.url){sessionStorage.setItem('n_lastorder',JSON.stringify({id:j.orderId,total:j.total,items,express:true}));location.href=j.url;return;}
    toast(j&&j.error==='empty'?'Producto no disponible':'No se pudo abrir el pago');}catch(e){toast('Sin conexión. Inténtalo de nuevo.');}}
window.nBuy=(slug,{qty=1,sub=false,src='btn',wallet=false,opt=''}={})=>{if(!byslug(slug))return;
  if(!wallet&&BUYNOW_KEEPS_CART&&C.get().length){C.add(slug,qty,sub,src,true,opt);location.href='/checkout.html';return;}
  return nBuyRun([opt?{slug,qty,sub,opt}:{slug,qty,sub}],{via:wallet?WALLET:'buy_now',src});};
window.nBuyCart=(src='cart')=>{const items=C.get();if(!items.length)return toast('Tu carrito está vacío');return nBuyRun(items,{via:'wallet_cart',src});};

/* ---------- Carrito ---------- */
const C={
  get(){try{return JSON.parse(localStorage.getItem('n_cart')||'[]');}catch(e){return[];}},
  set(items){localStorage.setItem('n_cart',JSON.stringify(items));this.render();this.sync();},
  sync(force){clearTimeout(this._st);this._st=setTimeout(()=>{const t=this.totals();let l={};try{l=JSON.parse(localStorage.getItem('n_lead')||'{}');}catch(e){}if(!t.items.length&&!force)return;try{fetch('/api/cart',{method:'POST',keepalive:true,headers:{'content-type':'application/json'},body:JSON.stringify({vid:T.sid,email:l.email,name:l.name,items:t.items,total:t.total})}).catch(()=>{});}catch(e){}},force?50:1500);},
  add(slug,qty=1,sub=false,src='pdp',quiet=false,opt=''){const items=this.get();const p=byslug(slug);if(!p)return;if(p.plan){sub=false;qty=1;}const k=items.find(i=>i.slug===slug&&!!i.sub===!!sub&&(i.opt||'')===(opt||''));if(k)k.qty=p.plan?1:k.qty+qty;else items.push(opt?{slug,qty,sub,opt}:{slug,qty,sub});
    this.set(items);T.send('add_to_cart',{slug,qty,sub,value:(sub?p.sub:p.price)*qty,src});if(quiet)return;this.open();
    const f=$('#cartflash');if(f){f.innerHTML=ico('check',16)+'Añadido: <b>'+p.name+'</b>';f.hidden=false;raf2(()=>f.classList.add('is-on'));clearTimeout(f._t);f._t=setTimeout(()=>{f.classList.remove('is-on');setTimeout(()=>f.hidden=true,240);},2500);}
    const c=$('#cartcount');if(c){c.classList.remove('n-bump');void c.offsetWidth;c.classList.add('n-bump');}},
  remove(i){const items=this.get();const r=items.splice(i,1)[0];this.set(items);T.send('remove_from_cart',{slug:r&&r.slug});},
  qty(i,d){const items=this.get();items[i].qty=Math.max(1,Math.min(10,items[i].qty+d));this.set(items);},
  totals(){const items=this.get();let sub=0,n=0,plan=false;items.forEach(i=>{const p=byslug(i.slug);if(!p)return;if(p.plan)plan=true;sub+=(p.plan?p.price:(i.sub?p.sub:p.price))*i.qty;n+=i.qty;});if(plan)n=Math.max(n,2);
    const disc=JSON.parse(sessionStorage.getItem('n_disc')||'null');let dAmt=0;if(disc)dAmt=disc.type==='pct'?sub*disc.value/100:Math.min(sub,disc.value);
    const after=sub-dAmt;const ship=(after>=SHIP.freeFrom||n>=2||after===0)?0:SHIP.base;const gifts=GIFTS.filter(g=>after>=g.threshold&&g.slug);
    return{items,sub,n,disc,dAmt,ship,total:after+ship,gifts};},
  open(){const d=$('#drawer');if(!d)return;this.render();nSheet.open(d,$('#opencart'));T.send('view_cart',{value:this.totals().sub});},
  close(){const d=$('#drawer');if(d&&!d.hidden)nSheet.close(d);},
  render(){const t=this.totals();const cnt=$('#cartcount');if(cnt){cnt.textContent=t.n;if(t.n)cnt.removeAttribute('data-zero');else cnt.setAttribute('data-zero','');const ob=$('#opencart');if(ob)ob.setAttribute('aria-label',`Abrir carrito, ${t.n} artículo${t.n===1?'':'s'}`);}
    $$('.n-buy__cart').forEach(el=>{el.textContent=t.n?`Compra solo este artículo. Tu carrito (${t.n}) sigue guardado.`:'';});
    const box=$('#cartitems');if(!box)return;
    box.innerHTML=t.items.length?t.items.map((i,idx)=>{const p=byslug(i.slug);const u=i.sub?p.sub:p.price;return`<div class="n-line"><div class="n-cut"><img src="${nImg(p)}" width="64" height="64" alt="" loading="lazy"></div><div class="n-line__t"><b>${p.name}</b><small>${p.units}${i.opt?' · '+i.opt:''}${i.sub?' · Suscripción −15 %':''}</small>${p.plan?`<span class="n-lab">Se renueva ${p.plan.every} · cancela cuando quieras</span>`:(i.sub?'<span class="n-lab">Cada 30 días</span>':'')}<div class="n-qty n-qty--s" style="margin-top:6px" aria-label="Cantidad"><button data-q="${idx}|-1" aria-label="Menos">${ico('minus',14)}</button><span class="n-num">${i.qty}</span><button data-q="${idx}|1" aria-label="Más">${ico('plus',14)}</button></div></div><div class="n-line__p"><b class="n-num">${eur(u*i.qty)}</b><button class="rm" data-rm="${idx}">Quitar</button></div></div>`;}).join('')+t.gifts.map(g=>`<div class="n-line n-line--gift"><div class="n-line__t"><span class="n-lab n-lab--navy">Regalo</span><b>${g.label}</b><small>Desbloqueado con tu pedido</small></div><b class="n-num">0,00 €</b></div>`).join('')
      :`<p style="text-align:center;padding:32px 0;color:var(--n-muted)">Tu carrito está vacío.<br><a href="/#productos" style="color:var(--n-navy)">Ver productos</a></p>`;
    const g=$('#giftbar');if(g){const v=t.sub-t.dAmt,max=GIFTS[GIFTS.length-1].threshold,next=GIFTS.find(x=>v<x.threshold),prev=[...GIFTS].reverse().find(x=>v>=x.threshold);
      g.className='n-gift'+(prev?' is-done':'');g.hidden=!t.items.length;
      const msg=next?`${prev?`<b>Conseguido: ${prev.label.toLowerCase()}.</b> `:''}Te faltan <b>${eur(next.threshold-v)}</b> para ${next.label.toLowerCase()}`:'<b>Todos los regalos desbloqueados</b>';
      g.innerHTML=`<div class="msg">${msg}</div><div class="track" role="progressbar" aria-valuemin="0" aria-valuemax="${max}" aria-valuenow="${Math.min(v,max).toFixed(2)}" aria-valuetext="${msg.replace(/<[^>]+>/g,'')}"><div class="fill" style="width:${Math.min(100,v/max*100)}%"></div></div>`;}
    const tot=$('#carttotal');if(tot)tot.innerHTML=`<div class="n-sums"><div><span>Subtotal</span><span class="n-num">${eur(t.sub)}</span></div>${t.dAmt?`<div class="ok"><span>Código ${t.disc.code}</span><span class="n-num">−${eur(t.dAmt)}</span></div>`:''}<div><span>Envío</span><span class="n-num">${t.ship?eur(t.ship):'Gratis'}</span></div></div><div class="n-tot"><span>Total</span><span class="n-num">${eur(t.total)}</span></div>`;
    const cb=$('#tocheckout');if(cb)cb.classList.toggle('n-btn--disabled',!t.items.length);const ex=$('#cartexpress');if(ex)ex.hidden=!t.items.length;
    const up=$('#cartupsell');if(up){const slugs=t.items.map(i=>i.slug);let s=null;
      if(slugs.includes('parches-nariz')&&!slugs.includes('exfoliante-salicilico')&&!slugs.includes('duo-poros'))s='exfoliante-salicilico';else if(!slugs.includes('parches-granos')&&!slugs.includes('kit-cara-completa'))s='parches-granos';else if(!slugs.includes('serum-niacinamida'))s='serum-niacinamida';
      const p=s&&byslug(s);up.innerHTML=p&&t.items.length?`<div class="n-mini"><div class="n-cut"><img src="${nImg(p)}" width="72" height="72" alt="" loading="lazy"></div><div class="n-mini__t"><span class="n-lab">Completa tu rutina</span><b>${p.name}</b><small>${p.short}</small></div><div class="n-mini__a"><button class="n-btn n-btn--ghost n-btn--sm" data-add="${p.slug}" data-src="cart">Añadir · +${eur(p.price)}</button></div></div>`:'';}
  }
};
window.nCart=C;

/* ---------- UI: toast, hojas ---------- */
function toast(m){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.className='n-toast';t.setAttribute('role','status');t.setAttribute('aria-live','polite');t.setAttribute('aria-atomic','true');document.body.appendChild(t);}t.textContent=m;t.classList.add('is-on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('is-on'),1800);}
window.nToast=toast;
let sy=0,openSheet=null;
const nSheet={
  lock(){sy=scrollY;document.body.style.top=-sy+'px';document.body.classList.add('n-locked');$$('main,footer,#site-footer').forEach(e=>e.setAttribute('inert',''));},
  unlock(){document.body.classList.remove('n-locked');document.body.style.top='';scrollTo(0,sy);$$('main,footer,#site-footer').forEach(e=>e.removeAttribute('inert'));},
  open(el,opener){if(openSheet&&openSheet!==el)this.close(openSheet);el.hidden=false;this.lock();openSheet=el;el._opener=opener||document.activeElement;raf2(()=>el.classList.add('is-open'));
    const f=el.querySelector('[autofocus],.n-sheet__panel button,.n-nav__panel button,a,input');if(f)setTimeout(()=>f.focus({preventScroll:true}),60);const ob=$('#opennav');if(ob&&el.id==='n-nav')ob.setAttribute('aria-expanded','true');},
  close(el){if(!el||el.hidden)return;el.classList.remove('is-open','is-drag');const p=el.querySelector('.n-sheet__panel,.n-nav__panel');if(p)p.style.transform='';this.unlock();openSheet=null;
    const done=()=>{el.hidden=true;el._opener&&el._opener.focus&&el._opener.focus({preventScroll:true});};if(RM.matches)done();else{let d=false;const f=()=>{if(!d){d=true;done();}};el.addEventListener('transitionend',f,{once:true});setTimeout(f,320);}
    const ob=$('#opennav');if(ob&&el.id==='n-nav')ob.setAttribute('aria-expanded','false');}
};
window.nSheet=nSheet;
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&openSheet)nSheet.close(openSheet);
  if(e.key==='Tab'&&openSheet){const f=$$('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])',openSheet).filter(x=>x.offsetParent!==null);if(!f.length)return;const a=f[0],b=f[f.length-1];if(e.shiftKey&&document.activeElement===a){b.focus();e.preventDefault();}else if(!e.shiftKey&&document.activeElement===b){a.focus();e.preventDefault();}}});
addEventListener('popstate',()=>{if(openSheet)nSheet.close(openSheet);});
/* arrastre de hoja inferior */
document.addEventListener('pointerdown',e=>{const h=e.target.closest('.n-sheet__grip,.n-sheet__head');if(!h||DESK())return;const sh=h.closest('.n-sheet'),pn=sh.querySelector('.n-sheet__panel');const y0=e.clientY,t0=Date.now();let dy=0;sh.classList.add('is-drag');
  const mv=ev=>{dy=Math.max(0,ev.clientY-y0);pn.style.transform=`translateY(${dy}px)`;};
  const up=()=>{document.removeEventListener('pointermove',mv);document.removeEventListener('pointerup',up);const v=dy/(Date.now()-t0);sh.classList.remove('is-drag');if(dy>80||v>.5){pn.style.transform='';nSheet.close(sh);}else pn.style.transform='';};
  document.addEventListener('pointermove',mv);document.addEventListener('pointerup',up);});

/* ---------- Layout común ---------- */
function layout(){
  const path=location.pathname,isCo=/checkout|gracias/.test(path);
  if(isCo)document.body.classList.add('n-checkout');if($('.n-hero5'))document.body.classList.add('n-has-hero');
  if(!$('.n-skip')){const s=document.createElement('a');s.className='n-skip';s.href='#main';s.textContent='Ir al contenido';document.body.prepend(s);}
  const BAR=(window.NOCTA_CFG&&window.NOCTA_CFG.bar&&Array.isArray(window.NOCTA_CFG.bar.items)&&window.NOCTA_CFG.bar.items.length)?window.NOCTA_CFG.bar.items:[{icon:'truck',text:`Envío gratis desde ${SHIP.freeFrom} € o llevando 2`},{icon:'moon',text:'Enviamos desde España en 24-48 h'},{icon:'shield',text:'Garantía 60 días o te devolvemos el dinero'}];
  const h=$('#site-header');if(h)h.innerHTML=`<div class="n-bar" id="topbar" aria-label="Ventajas">${BAR.map((b,i)=>{const t=typeof b==='string'?b:b.text;const ic=(typeof b!=='string'&&IC[b.icon])?b.icon:/env[íi]o|24-48/i.test(t)?'truck':/garant|devolv/i.test(t)?'shield':'moon';return`<span class="n-bar__i${i?'':' is-on'}">${ico(ic,ic==='moon'?12:14)}${t}</span>`;}).join('')}</div>
<header class="n-top"><div class="n-wrap n-top__in"><button class="n-icon" id="opennav" aria-label="Abrir menú" aria-expanded="false" aria-controls="n-nav">${ico('menu',22)}</button><a class="n-logo" href="/" aria-label="NOCTA, inicio">${ico('moon',18)}nocta</a><nav class="n-main" aria-label="Principal"><a href="/#productos">Parches</a><a href="/#skincare">Skincare</a><a href="/#packs">Packs</a><a href="/planes.html">Planes</a><a href="/catalogo.html">Catálogo</a><a href="/no-son-puntos-negros.html">No son puntos negros</a><a href="/quiz.html">Test de piel</a><a href="/garantia.html">Garantía</a></nav><button class="n-cart" id="opencart" aria-label="Abrir carrito, 0 artículos">${ico('bag',22)}<b id="cartcount" data-zero>0</b></button></div></header>`;
  $$('.n-main a').forEach(a=>{if(a.getAttribute('href').split('#')[0]===path)a.setAttribute('aria-current','page');});
  const best=byslug('parches-nariz');
  const nav=document.createElement('div');nav.className='n-nav';nav.id='n-nav';nav.setAttribute('role','dialog');nav.setAttribute('aria-modal','true');nav.setAttribute('aria-label','Menú');nav.hidden=true;
  const rows=[['/#productos','Parches','5 formatos'],['/#skincare','Skincare','5 fórmulas'],['/#packs','Packs','ahorra hasta 24 €'],['/planes.html','Planes','desde 14,90 €/sem'],['/catalogo.html','Catálogo','13 productos'],['/quiz.html','Test de piel','4 preguntas'],['/no-son-puntos-negros.html','No son puntos negros','3 min'],['/como-usar.html','Cómo usar',''],['/garantia.html','Garantía','60 días']];
  nav.innerHTML=`<div class="n-nav__bg" data-navclose></div><nav class="n-nav__panel" aria-label="Menú"><div class="n-nav__head"><a class="n-logo" href="/" aria-label="NOCTA, inicio">${ico('moon',18)}nocta</a><button class="n-icon" data-navclose aria-label="Cerrar menú">${ico('x',22)}</button></div>${rows.map((r,i)=>`<a class="n-nav__row" href="${r[0]}" style="--i:${i}"><i>${String(i+1).padStart(2,'0')}</i>${r[1]}${r[2]?`<span class="n-lab">${r[2]}</span>`:''}</a>`).join('')}<div class="n-nav__foot"><span class="n-lab">Lo más vendido</span><div class="n-nav__quick"><div class="n-cut"><img src="${nImg(best)}" width="56" height="56" alt=""></div><div style="flex:1;min-width:0"><b>${best.name}</b><span class="n-lab n-num">${eur(best.price)} · ${best.units}</span></div><button class="n-btn n-btn--sm" data-buy="${best.slug}" data-src="nav">Comprar ahora</button></div><span class="n-lab">Envío 24-48 h desde España · hola@nocta.es</span></div></nav>`;
  document.body.appendChild(nav);
  const d=document.createElement('div');d.id='drawer';d.className='n-drawer n-sheet';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-label','Tu carrito');d.hidden=true;
  d.innerHTML=`<div class="n-sheet__bg" id="closecart"></div><div class="n-sheet__panel"><span class="n-sheet__grip" aria-hidden="true"></span><div class="n-sheet__head"><b>Tu carrito</b><button class="n-icon" id="closecart2" aria-label="Cerrar carrito">${ico('x',22)}</button></div><div class="n-sheet__body"><div class="n-flash" id="cartflash" role="status" aria-live="polite" hidden></div><div class="n-gift" id="giftbar" hidden></div><div id="cartitems"></div><div id="cartupsell"></div></div><div class="n-sheet__foot"><div id="carttotal"></div><a class="n-btn n-btn--wide" href="/checkout.html" id="tocheckout">Finalizar compra</a><div id="cartexpress">${nPay(null,{cart:true,src:'cart'})}</div><p class="n-lab" style="text-align:center">${ico('lock',12)} Pago seguro · Bizum · Tarjeta · Klarna · Garantía 60 días</p></div></div>`;
  document.body.appendChild(d);
  const f=$('#site-footer');if(f)f.innerHTML=isCo?`<footer class="n-foot"><div class="n-wrap"><a href="/legal.html#aviso">Aviso legal</a><a href="/legal.html#privacidad">Privacidad</a><a href="/legal.html#cookies">Cookies</a><a href="/contacto.html">Contacto</a><a href="/garantia.html">Garantía 60 días</a></div></footer>`
    :`<footer class="n-foot"><div class="n-wrap"><div class="n-foot__brand"><h3 class="n-lab">NOCTA</h3><p>Parches de hidrocoloide coreanos y skincare para poros, diseñados en España. Poros limpios mientras duermes.</p><p class="n-xs" style="margin-top:8px">NOCTA Skin S.L. (en constitución) · Persona Responsable en la UE · Cosméticos notificados en el CPNP.</p></div><nav aria-label="Tienda"><h3 class="n-lab">Tienda</h3><a href="/#productos">Parches</a><a href="/#skincare">Skincare</a><a href="/#packs">Packs y ahorro</a><a href="/catalogo.html">Catálogo completo</a><a href="/producto.html?p=parches-nariz">Parches de nariz</a></nav><nav aria-label="Ayuda"><h3 class="n-lab">Ayuda</h3><a href="/como-usar.html">Cómo usar</a><a href="/garantia.html">Garantía 60 días</a><a href="/envios-devoluciones.html">Envíos y devoluciones</a><a href="/contacto.html">Contacto</a><a href="/ciencia.html">Nuestra ciencia</a><a href="/sobre.html">Sobre NOCTA</a></nav><nav aria-label="Legal"><h3 class="n-lab">Legal</h3><a href="/legal.html#aviso">Aviso legal</a><a href="/legal.html#privacidad">Privacidad</a><a href="/legal.html#cookies">Cookies</a><a href="/legal.html#envios">Condiciones de envío</a></nav><p class="n-foot__legal n-xs">NOCTA · hola@nocta.es · Enviamos desde España · © 2026</p><div class="n-foot__mark" aria-hidden="true">${ico('moon',18)}</div></div></footer>`;
  /* captación (popup v8: centrado, fondo desenfocado, copy personal y estado de éxito) */
  const CFG=window.NOCTA_CFG||{},PC=Object.assign({enabled:true,code:'HOLA10',pct:10,title:'Tu primera noche, con −{pct}\u00a0%.',text:'Dinos cómo te llamas y te enviamos ahora mismo tu código. Y la guía de 2 minutos para que el parche salga lleno la primera mañana.',wa_text:'Avísame también por WhatsApp (código, envío y consejos). Sin spam.',require_phone:true,img:'/assets/img/hero-poster.webp'},CFG.popup||{});
  /* se muestra una vez por dispositivo; si se cierra sin registrarse, vuelve a los 3 días; ?popup=1 lo fuerza (para revisarlo) */
  const PK='n_popup8',pv=localStorage.getItem(PK),force=new URL(location.href).searchParams.get('popup')==='1';
  const seen=pv==='done'||(pv&&Date.now()-Number(pv)<3*864e5);
  if(PC.enabled!==false&&(force||!seen)&&!isCo&&!path.includes('admin')){let taps=force?9:0;document.addEventListener('pointerdown',()=>taps++,{passive:true});addEventListener('scroll',()=>taps++,{passive:true,once:true});
    const title=t=>String(t).replace('{pct}',PC.pct),reviews=P.reduce((a,p)=>a+(p.reviews||0),0);
    const pop=document.createElement('div');pop.className='n-mail';pop.setAttribute('role','dialog');pop.setAttribute('aria-modal','true');pop.setAttribute('aria-label',title(PC.title));pop.innerHTML=`<div class="box"><button class="n-icon x" id="popx" aria-label="Cerrar">${ico('x',20)}</button><div class="n-mail__pic"><span class="n-mail__tag">Solo para tu primera caja</span><img src="${PC.img}" alt="" width="800" height="450" loading="lazy" decoding="async"></div><div class="n-mail__in"><h3 id="poptitle">${title(PC.title)}</h3><p class="n-mail__lead">${PC.text}</p><p class="n-mail__proof"><span class="n-stars" aria-hidden="true">★★★★★</span><span>4,8 sobre 5 · ${reviews.toLocaleString('es-ES')} opiniones</span></p><form id="popform" novalidate><div class="n-mail__row"><div><label class="n-vh" for="popname">Nombre</label><input id="popname" name="name" required placeholder="Tu nombre" autocomplete="given-name" enterkeyhint="next"></div><div><label class="n-vh" for="popphone">Móvil</label><input id="popphone" name="phone" type="tel" inputmode="tel" ${PC.require_phone?'required ':''}placeholder="Móvil" autocomplete="tel" enterkeyhint="next"></div></div><label class="n-vh" for="popmail">Email</label><input id="popmail" name="email" type="email" required placeholder="tu@email.com" autocomplete="email" enterkeyhint="done"><label class="n-mail__chk"><input type="checkbox" id="popwa" checked><span>${PC.wa_text}</span></label><button class="n-btn n-btn--fill n-btn--wide" id="popgo">Enviarme mi −${PC.pct}\u00a0%</button></form><p class="n-mail__fine">Te llega al momento y vale para todo, también packs y planes. Envío 24-48 h desde España. <a href="/legal.html#privacidad">Privacidad</a></p></div><div class="n-mail__ok"><div class="tick">${ico('check',26)}</div><h3 id="poptitle2">Listo.</h3><p class="n-mail__lead" id="popmsg"></p><span class="code" id="popcode"></span><p class="n-mail__fine">Se aplica solo en el checkout. Y te lo hemos enviado por email para que no lo pierdas.</p><button class="n-btn n-btn--fill n-btn--wide" id="popdone" style="margin-top:14px">Elegir mis parches</button></div></div>`;document.body.appendChild(pop);
    const openP=()=>{if(localStorage.getItem(PK)==='done'||document.body.classList.contains('n-locked')||taps<1||pop.classList.contains('is-open'))return;pop.classList.remove('is-closing');raf2(()=>pop.classList.add('is-open'));T.send('popup_view');setTimeout(()=>{const n=$('#popname');if(n&&DESK())n.focus({preventScroll:true});},650);};
    const wait=force?800:(PC.delay_s?PC.delay_s*1000:(path.includes('producto')?15000:8000));let tm=setTimeout(openP,wait);['pointerdown','scroll'].forEach(ev=>addEventListener(ev,()=>{if(!pop.classList.contains('is-open')){clearTimeout(tm);tm=setTimeout(openP,Math.min(wait,4000));}},{passive:true,once:true}));document.addEventListener('mouseleave',e=>{if(e.clientY<10){taps++;openP();}});
    const closeP=()=>{if(!pop.classList.contains('is-open'))return;pop.classList.remove('is-open');pop.classList.add('is-closing');if(localStorage.getItem(PK)!=='done')localStorage.setItem(PK,String(Date.now()));const end=()=>{pop.classList.remove('is-closing');pop.removeEventListener('transitionend',end);};pop.addEventListener('transitionend',end);setTimeout(end,900);};
    $('#popx').onclick=()=>{closeP();T.send('popup_close');};pop.addEventListener('click',e=>{if(e.target===pop){closeP();T.send('popup_close');}});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&pop.classList.contains('is-open'))closeP();});
    /* el titular se vuelve personal mientras escribe el nombre */
    $('#popname').addEventListener('input',e=>{const n=e.target.value.trim().split(' ')[0];$('#poptitle').textContent=n?`${n.charAt(0).toUpperCase()+n.slice(1)}, tu primera noche con −${PC.pct}\u00a0%.`:title(PC.title);$('#popgo').textContent=n?`Enviarme mi −${PC.pct}\u00a0%, ${n.charAt(0).toUpperCase()+n.slice(1)}`:`Enviarme mi −${PC.pct}\u00a0%`;});
    $('#popform').onsubmit=e=>{e.preventDefault();const f=e.target;if(!f.checkValidity()){f.reportValidity();return;}const data={name:$('#popname').value.trim(),email:$('#popmail').value.trim(),phone:$('#popphone').value.trim(),wa:$('#popwa').checked,src:'popup',utm:JSON.parse(sessionStorage.getItem('n_utm')||'{}'),vid:T.sid};
      const btn=$('#popgo');btn.disabled=true;btn.textContent='Un segundo…';
      const done=j=>{const code=(j&&j.code)||PC.code,pct=(j&&j.pct)||PC.pct,n=data.name.split(' ')[0];sessionStorage.setItem('n_disc',JSON.stringify({code,type:'pct',value:pct}));localStorage.setItem('n_lead',JSON.stringify({email:data.email,name:data.name,phone:data.phone}));localStorage.setItem(PK,'done');
        $('#poptitle2').textContent=`Listo, ${n.charAt(0).toUpperCase()+n.slice(1)}.`;$('#popmsg').textContent=`Tu −${pct} % ya está activado en esta visita${data.wa&&data.phone?' y te llega también por WhatsApp':''}.`;$('#popcode').textContent=code;pop.classList.add('is-done');T.send('lead',{src:'popup',wa:data.wa});C.render();C.sync(true);
        $('#popdone').onclick=()=>{closeP();if(!/^\/($|index)/.test(path)&&!path.includes('producto'))location.href='/#productos';};setTimeout(closeP,7000);};
      fetch('/api/lead',{method:'POST',body:JSON.stringify(data),headers:{'content-type':'application/json'}}).then(r=>r.json()).then(done).catch(()=>done(null));};}
  /* código en la URL (?code=…): se valida en el servidor y se aplica */
  const codeQ=new URL(location.href).searchParams.get('code');if(codeQ&&!isCo){fetch('/api/discount?code='+encodeURIComponent(codeQ)).then(r=>r.json()).then(d=>{if(d&&!d.error){sessionStorage.setItem('n_disc',JSON.stringify({code:d.code,type:d.type,value:d.value}));toast(`Código ${d.code} aplicado`);C.render();}}).catch(()=>{});}
  /* email escrito en cualquier formulario → lead ligero para recuperar carritos */
  document.addEventListener('change',e=>{const i=e.target;if(i&&i.type==='email'&&i.value&&i.validity.valid){const l=JSON.parse(localStorage.getItem('n_lead')||'{}');l.email=i.value.trim().toLowerCase();const n=$('#f-name');if(n&&n.value)l.name=n.value.trim();localStorage.setItem('n_lead',JSON.stringify(l));C.sync(true);}});
  /* cookies */
  if(!localStorage.getItem('n_ck')&&!path.includes('admin')){const ck=document.createElement('div');ck.id='cookiebanner';ck.className='n-ck';ck.innerHTML=`<div class="n-wrap n-ck__in"><span>Cookies propias y, con tu permiso, de medición. <a href="/legal.html#cookies">Más información sobre cookies</a></span><button class="n-btn n-btn--ghost" id="ckno">Solo necesarias</button><button class="n-btn" id="ckyes">Aceptar</button></div>`;document.body.appendChild(ck);document.body.classList.add('n-has-ck');const ckh=()=>document.body.style.setProperty('--n-ck-h',ck.offsetHeight+'px');ckh();addEventListener('resize',ckh);
    const hide=v=>{localStorage.setItem('n_ck',v);ck.remove();document.body.classList.remove('n-has-ck');document.body.style.removeProperty('--n-ck-h');};$('#ckyes').onclick=()=>hide('all');$('#ckno').onclick=()=>hide('ess');}
  /* barra rotatoria (móvil) */
  const bi=$$('.n-bar__i');if(bi.length>1&&!RM.matches){let k=0;setInterval(()=>{if(DESK())return;bi[k].classList.remove('is-on');k=(k+1)%bi.length;bi[k].classList.add('is-on');},3600);}
  C.render();nReveal();nMedia();
  const bb=$('#sticky');if(bb){const a=$('[data-bbar-anchor]')||$('.n-pdp .n-buy')||$('.n-cta');if(a)new IntersectionObserver(([e])=>{const on=!e.isIntersecting&&(e.boundingClientRect.top<0||bb.classList.contains('n-bbar--pdp'));bb.classList.toggle('is-on',on);document.body.classList.toggle('n-has-bar',on);},{threshold:0}).observe(a);}
}
/* aparición, esqueleto, vídeo */
const io=RM.matches?null:new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('is-in');io.unobserve(e.target);}),{rootMargin:'0px 0px -10% 0px'});
window.nReveal=()=>{$$('.n-reveal:not(.is-in):not([data-rv])').forEach((el,i)=>{el.dataset.rv=1;if(!io||el.getBoundingClientRect().top<innerHeight){el.classList.add('is-in');return;}el.style.setProperty('--i',i%4);io.observe(el);});};
document.addEventListener('load',e=>{const i=e.target;if(i.tagName==='IMG'&&i.closest('.n-skel'))i.closest('.n-skel').classList.add('is-done');},true);
const vio=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.intersectionRatio>=.6){v.play&&v.play().catch(()=>{});}else v.pause();}),{threshold:[0,.6]});
/* revelado cinematográfico: imagen perezosa → grano + desenfoque que se disipa; vídeo → fundido sobre su póster */
const pio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const v=e.target;pio.unobserve(v);if(v.preload==='none')v.preload='auto';}),{rootMargin:'70% 0px'});
function nFx(img){if(img.dataset.fx||RM.matches)return;img.dataset.fx=1;if(img.complete&&img.naturalWidth)return;
  const p=img.parentElement;let box=null;if(p){const cs=getComputedStyle(p);if((cs.overflow==='hidden'||cs.aspectRatio!=='auto'||/^(FIGURE|PICTURE)$/.test(p.tagName))&&/static|relative/.test(cs.position)){p.classList.add('n-mx');box=p;}}
  img.classList.add('n-fx');const done=()=>{img.classList.add('is-ready');if(box)box.classList.add('is-ready');setTimeout(()=>{img.classList.remove('n-fx','is-ready');},1200);};
  img.addEventListener('load',done,{once:true});img.addEventListener('error',done,{once:true});}
window.nFx=nFx;
window.nMedia=()=>{$$('.n-skel img').forEach(i=>{if(i.complete&&i.naturalWidth)i.closest('.n-skel').classList.add('is-done');});
  $$('img[loading="lazy"]:not(.alt):not([data-fx])').forEach(nFx);
  $$('.n-vt video:not([data-vp])').forEach(v=>{v.dataset.vp=1;const src=v.getAttribute('poster');if(src&&!v.previousElementSibling?.classList.contains('n-vt5__p')){const im=document.createElement('img');im.className='n-vt5__p';im.src=src;im.alt='';im.loading='lazy';im.decoding='async';v.before(im);nFx(im);}
    if(RM.matches)return;v.classList.add('n-vfx');const live=()=>v.classList.add('is-live');v.addEventListener('playing',live,{once:true});v.addEventListener('timeupdate',()=>{if(v.currentTime>0)live();},{once:true});if(v.hasAttribute('data-auto'))pio.observe(v);});
  $$('video[data-auto]:not([data-v])').forEach(v=>{v.dataset.v=1;if(RM.matches){v.controls=true;return;}vio.observe(v);});};
/* acordeón animado */
document.addEventListener('click',e=>{const s=e.target.closest('.n-acc summary');if(!s)return;const d=s.parentElement;e.preventDefault();
  if(d.open){d.classList.remove('is-open');if(RM.matches)d.open=false;else{let done=false;const f=()=>{if(!done){done=true;d.open=false;}};d.querySelector('.n-acc__c').addEventListener('transitionend',f,{once:true});setTimeout(f,300);}}
  else{d.open=true;raf2(()=>d.classList.add('is-open'));}});

/* ---------- Eventos globales ---------- */
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-add]');if(a){e.preventDefault();C.add(a.dataset.add,+(a.dataset.qty||1),a.dataset.sub==='1',a.dataset.src||'btn',false,a.dataset.opt||'');return;}
  const b=e.target.closest('[data-buy],[data-buy-express],[data-express-cart]');
  if(b){e.preventDefault();if(b.dataset.busy)return;b.dataset.busy='1';b.setAttribute('aria-busy','true');const done=()=>{delete b.dataset.busy;b.removeAttribute('aria-busy');};
    const o={qty:+(b.dataset.qty||1),sub:b.dataset.sub==='1',src:b.dataset.src||'btn',opt:b.dataset.opt||''};
    const run=b.hasAttribute('data-express-cart')?nBuyCart(o.src):nBuy(b.dataset.buy||b.dataset.buyExpress,{...o,wallet:b.hasAttribute('data-buy-express')});
    Promise.resolve(run).finally(done);return;}
  const vp=e.target.closest('.n-vt__play');if(vp){const box=vp.parentElement,v=box.querySelector('video');$$('.n-vt.is-playing video').forEach(o=>{if(o!==v){o.pause();o.muted=true;o.controls=false;o.closest('.n-vt').classList.remove('is-playing');}});v.muted=false;v.controls=true;v.loop=false;box.classList.add('is-playing');v.play().catch(()=>{});T.send('video_play',{id:v.dataset.id||v.currentSrc.split('/').pop()});return;}
  const q=e.target.closest('[data-q]');if(q){const[i,d]=q.dataset.q.split('|');C.qty(+i,+d);return;}
  const r=e.target.closest('[data-rm]');if(r){C.remove(+r.dataset.rm);return;}
  if(e.target.closest('#opencart')){C.open();return;}
  if(e.target.closest('#closecart,#closecart2')){C.close();return;}
  if(e.target.closest('#opennav')){nSheet.open($('#n-nav'),$('#opennav'));T.send('nav_open');return;}
  if(e.target.closest('[data-navclose]')){nSheet.close($('#n-nav'));return;}
  const nl=e.target.closest('.n-nav__row');if(nl){const n=$('#n-nav');n.classList.remove('is-open');n.hidden=true;nSheet.unlock();openSheet=null;return;}
  if(e.target.closest('#tocheckout')){const t=C.totals();if(!t.items.length){e.preventDefault();toast('Tu carrito está vacío');return;}T.send('begin_checkout',{value:t.total,n:t.n});T.flush();}
  const card=e.target.closest('.n-card[data-slug],.card[data-slug]');if(card&&!e.target.closest('button'))T.send('select_item',{slug:card.dataset.slug});
});
document.addEventListener('DOMContentLoaded',()=>{layout();T.send('page_view');});
})();
