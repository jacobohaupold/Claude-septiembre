// Datos de prueba realistas y "peores casos" (nombres largos, muchos ítems, notas largas) para el CRM NOCTA
const now = Date.now();
const iso = d => new Date(now - d * 3600e3).toISOString();
const PRODUCTS = [
  { slug:'parches-nariz', name:'Parches de Nariz', price:16.95, sub:14.41, units:'8 parches', image:'/assets/img/parches-nariz.jpg', tags:['parches'], rating:4.8, reviews:312, badge:'BESTSELLER' },
  { slug:'parches-granos', name:'Parches para Granos', price:15.95, sub:13.56, units:'36 parches', image:'/assets/img/parches-granos.jpg', tags:['parches'], rating:4.7, reviews:188 },
  { slug:'parches-frente', name:'Parches de Frente', price:16.95, sub:14.41, units:'5 parches', image:'/assets/img/parches-frente.jpg', tags:['parches'], rating:4.6, reviews:37 },
  { slug:'parches-barbilla', name:'Parches de Barbilla', price:16.95, sub:14.41, units:'8 parches', image:'/assets/img/parches-barbilla.jpg', tags:['parches'], rating:4.6, reviews:41 },
  { slug:'exfoliante-salicilico', name:'Exfoliante Ácido Salicílico 2 %', price:32, sub:27.2, units:'110 ml', image:'/assets/img/exfoliante.jpg', tags:['skincare'], rating:4.8, reviews:74 },
  { slug:'serum-niacinamida', name:'Sérum Niacinamida 2 % + Zinc PCA', price:29, sub:24.65, units:'30 ml', image:'/assets/img/serum.jpg', tags:['skincare'], rating:4.7, reviews:22, badge:'NUEVO' },
  { slug:'tonico-hialuronico', name:'Tónico Ácido Hialurónico', price:25, sub:21.25, units:'130 ml', image:'/assets/img/tonico.jpg', tags:['skincare'], rating:4.7, reviews:49 },
  { slug:'duo-poros', name:'Dúo Poros Limpios', bundle:['exfoliante-salicilico','parches-nariz'], price:36.9, compare:48.95, sub:31.35, units:'110 ml + 8 parches', image:'/assets/img/gama.jpg', tags:['bundle'], rating:4.8, reviews:121, badge:'AHORRA 12 €' },
  { slug:'kit-t-zone', name:'Kit Zona T', bundle:['parches-frente','parches-nariz','parches-barbilla'], price:37.9, compare:50.85, sub:32.2, units:'5+8+8 parches', image:'/assets/img/parches-barbilla.jpg', tags:['bundle'], rating:4.7, reviews:44, badge:'AHORRA 13 €' },
  { slug:'plan-mensual', name:'Plan Noche mensual', plan:{interval:'month',label:'al mes',every:'cada mes',per:'mes',builder:{patch:[0,16,28,39],skincare:21}}, bundle:['parches-nariz','parches-frente','exfoliante-salicilico'], price:49, compare:65.9, sub:49, units:'Cada mes', image:'/assets/img/gama.jpg', tags:['plan','bundle'], rating:4.9, reviews:38, badge:'A TU MEDIDA' },
  { slug:'plan-semanal', name:'Plan Semanal', plan:{interval:'week',label:'a la semana',every:'cada semana',per:'semana'}, bundle:['parches-nariz'], price:14.9, compare:20.85, sub:14.9, units:'1 caja por semana', image:'/assets/img/parches-nariz.jpg', tags:['plan','bundle'], rating:4.8, reviews:21, badge:'ENVÍO GRATIS' },
  { slug:'pack-mascarillas-tela', name:'Pack de Mascarillas de Tela Hidratantes', price:22, sub:18.7, units:'5 uds', image:'/assets/img/pack-mascarillas-tela.jpg', tags:['skincare'], rating:4.5, reviews:12 }
];
for (const p of PRODUCTS) { p.compare = p.compare ?? null; p.gallery=[]; p.desc=''; p.bullets=[]; p.claims=[]; p.how=[]; p.faq=[]; p.short=p.short||'Poros limpios mientras duermes'; }
const PRODUCTS_JS = 'window.NOCTA_PRODUCTS=' + JSON.stringify(PRODUCTS) + ';\nwindow.NOCTA_GIFTS=[{threshold:30,label:"Envío gratis",slug:null},{threshold:50,label:"Mascarilla de tela de regalo",slug:"pack-mascarillas-tela"}];\nwindow.NOCTA_SHIPPING={base:3.9,freeFrom:30};';

const NAMES = ['María José Fernández de la Torre','Álex R.','Marisol Gutiérrez','Bea','Juan Carlos Pérez','Lucía Sanz','Ana Belén Rodríguez Villanueva','Pablo','Carmen Ruiz','Sergio Domínguez','Nuria','Iván Castillo','Paula Moreno-Bonilla','Diego','Elena Torres'];
const CITIES = [['Madrid','28004'],['Barcelona','08015'],['Valencia','46002'],['Sevilla','41004'],['Bilbao','48001'],['Zaragoza','50003'],['Palma','07001'],['Las Palmas de Gran Canaria','35001']];
const STATUS = ['paid','paid','shipped','delivered','pending','paid','shipped','delivered','refunded','partial_refund','failed','abandoned','disputed','paid','shipped'];
const orders = []; 
for (let i=0;i<28;i++){
  const n=NAMES[i%NAMES.length], c=CITIES[i%CITIES.length], st=STATUS[i%STATUS.length];
  const items = i%5===0 ? [{slug:'plan-mensual',name:'Plan Noche mensual (parches nariz + frente + exfoliante)',qty:1,unit:49},{slug:'parches-granos',name:'Parches para Granos',qty:2,unit:15.95},{slug:'tonico-hialuronico',name:'Tónico Ácido Hialurónico',qty:1,unit:25}] : i%3===0 ? [{slug:'duo-poros',name:'Dúo Poros Limpios',qty:1,unit:36.9}] : [{slug:'parches-nariz',name:'Parches de Nariz',qty:2,unit:16.95}];
  const total = items.reduce((s,x)=>s+x.qty*(x.unit||x.price||0),0);
  orders.push({ id:'NC-2026'+String(1041+i), created_at:iso(i*7+1), updated_at:iso(i*7), status:st, name:n, email:(n.split(' ')[0].toLowerCase())+i+'@gmail.com', phone:'+34 6'+String(10000000+i*13711), total, subtotal:total, shipping:total>=30?0:3.9, discount:i%4===0?3.5:0, currency:'EUR', items,
    address:{ line1:'Calle de la Concepción Jerónima '+(i+3)+', 4º B', city:c[0], zip:c[1], country:'ES' }, tracking:st==='shipped'||st==='delivered'?'CJ'+String(830000000+i)+'ES':null, carrier:st==='shipped'||st==='delivered'?'Correos Express':null,
    notes:i%6===0?'El cliente pidió que se entregue por la tarde porque trabaja de mañana; se avisó por WhatsApp y confirmó el horario de 16:00 a 19:00.':'', coupon:i%4===0?'NOCHE10':null, stripe_payment_intent:'pi_3Q'+i+'xDemo', emails:{order_confirm:iso(i*7),guide:i%2?iso(i*7-2):undefined}, utm:{utm_source:['facebook','tiktok','google','directo'][i%4],utm_campaign:'nocta-parches-nariz-frio-'+(i%3)} });
}
const customers = NAMES.map((n,i)=>({ id:'cus_'+i, email:(n.split(' ')[0].toLowerCase())+i+'@gmail.com', name:n, phone:'+34 6'+String(10000000+i*13711), created_at:iso(i*36+5), orders_count:(i%4)+1, total_spent:34.5+i*12.4, last_order_at:iso(i*7), city:CITIES[i%CITIES.length][0], status:'customer', tags:i%3===0?['pack-2','whatsapp']:['newsletter'], notes:'' }));
const subscriptions = [0,1,2,3,4,5,6].map(i=>({ id:'sub_'+i, created_at:iso(i*120+20), email:customers[i].email, name:customers[i].name, status:['active','active','trialing','cancelling','past_due','canceled','active'][i], interval:i%3===0?'week':'month', price:i%3===0?14.9:49, items:[{slug:'plan-mensual',name:'Plan Noche mensual',qty:1}], next_charge_at:iso(-24*(i+2)), stripe_subscription:'sub_1Q'+i, cycles:(i%5)+1 }));
const leads = Array.from({length:18},(_,i)=>({ id:'ld_'+i, created_at:iso(i*11+2), email:'lead'+i+'@'+['gmail.com','hotmail.es','outlook.com','icloud.com'][i%4], name:i%3?NAMES[i%NAMES.length]:null, source:['popup','quiz','checkout','footer','whatsapp'][i%5], status:i%6===0?'unsubscribed':(i%4===0?'customer':'lead'), consent:true, discount_code:i%2?'NOCHE10':null, tags:[], notes:'' }));
const carts = Array.from({length:9},(_,i)=>({ id:'crt_'+i, created_at:iso(i*9+1), updated_at:iso(i*9), email:i%4===3?null:'lead'+i+'@gmail.com', items:[{slug:'parches-nariz',name:'Parches de Nariz',qty:i%3+1,unit:16.95},{slug:'exfoliante-salicilico',name:'Exfoliante Ácido Salicílico 2 %',qty:1,unit:32}], total:16.95*(i%3+1)+32, recovered:i%5===0, recovery_sent_at:i%3===0?iso(i*9-1):null, vid:'v_'+i }));
const messages = Array.from({length:24},(_,i)=>({ id:'msg_'+i, created_at:iso(i*5+1), channel:i%3===0?'whatsapp':'email', direction:i%7===0?'in':'out', to_addr:i%3===0?'+34 6'+String(10000000+i*13711):'cliente'+i+'@gmail.com', from_addr:null, body:'Hola Marisol 🌙 Tu pedido NOCTA ya está en camino. Llega en 24-48 h.', template:['order_confirm','shipped','guide','cart_recovery','winback','newsletter'][i%6], subject:'Tu pedido NOCTA NC-2026'+(1041+i)+' ya está en camino con Correos Express', text:'Hola Marisol 🌙 Tu pedido NOCTA ya está en camino. Llega en 24-48 h. Cualquier cosa, contéstame por aquí.', status:['sent','sent','delivered_msg','read','skipped','failed'][i%6], error:i%6===5?'422 Unprocessable: dirección de correo rechazada por el proveedor':null, meta:{order:'NC-2026'+(1041+i),name:NAMES[i%NAMES.length]} }));
const campaigns = [
  { id:'cmp_1', created_at:iso(300), name:'Lanzamiento lote 1 · no son puntos negros', channel:'email', status:'sent', subject:'No son puntos negros (y por eso vuelven)', segment:'all', sent_count:412, open_count:198, click_count:63, scheduled_at:null, blocks:[{type:'text',text:'Hola 🌙'},{type:'button',label:'Ver el pack de 2',url:'/producto.html?p=parches-nariz'}] },
  { id:'cmp_2', created_at:iso(120), name:'Recordatorio código NOCHE10 (solo esta semana)', channel:'email', status:'scheduled', subject:'Tu −10 % caduca el domingo', segment:'leads', sent_count:0, open_count:0, click_count:0, scheduled_at:iso(-36), blocks:[] },
  { id:'cmp_3', created_at:iso(60), name:'WhatsApp · guía de uso a clientes del lote 1', channel:'whatsapp', status:'draft', subject:null, segment:'customers', sent_count:0, open_count:0, click_count:0, scheduled_at:null, blocks:[] },
  { id:'cmp_4', created_at:iso(20), name:'Winback 60 días', channel:'email', status:'sending', subject:'Se te ha acabado la caja, ¿no?', segment:'customers', sent_count:87, open_count:31, click_count:9, scheduled_at:null, blocks:[] }
];
const automations = [
  { id:'au_1', key:'cart_recovery', name:'Carrito abandonado', enabled:true, channel:'email', delay_hours:3, discount_pct:10, subject:'¿Se te ha quedado algo en el carrito?', text:'Hola, has dejado esto a medias. Te dejo un −10 % que caduca en 24 h.', sent:143, converted:19 },
  { id:'au_2', key:'guide', name:'Guía de uso tras la compra', enabled:true, channel:'email', delay_hours:20, discount_pct:0, subject:'Cómo sacarle todo el partido a tu parche', text:'Nariz limpia y seca, presiona 10 segundos y a dormir.', sent:301, converted:0 },
  { id:'au_3', key:'winback', name:'Recompra a los 21 días', enabled:false, channel:'email', delay_hours:504, discount_pct:15, subject:'¿Te queda alguno?', text:'Te dejo un −15 % para reponer.', sent:0, converted:0 },
  { id:'au_4', key:'wa_shipped', name:'WhatsApp de envío', enabled:true, channel:'whatsapp', delay_hours:0, discount_pct:0, subject:null, text:'Tu pedido va en camino.', sent:96, converted:0 }
];
const settings = [
  { key:'whatsapp', value:{ phone_id:'761234567890123', token:'EAAG…oculto', verify_token:'nocta', number:'+34 613 00 00 00', waba:'1029384756' }, updated_at:iso(50) },
  { key:'stripe', value:{ secret_key:'sk_live_…oculta', publishable:'pk_live_51QdemoPublishableKeyForNocta', methods:['card','apple_pay','google_pay','klarna'], connected_at:iso(400) }, updated_at:iso(400) },
  { key:'resend', value:{ domain:{ name:'nocta.es', status:'pending' } }, updated_at:iso(80) },
  { key:'cron_last', value:{ at:iso(2), ran:['carts','winback','subs'], sent:7 }, updated_at:iso(2) }
];
const content = [
  { key:'pricing', value:{ sub_pct:15, multi:{2:5,3:10} }, updated_at:iso(30) },
  { key:'upsell', value:{ slug:'exfoliante-salicilico', pct:30, enabled:true }, updated_at:iso(30) },
  { key:'cart_upsell', value:[{ if:'parches-nariz', then:'exfoliante-salicilico', unless:['duo-poros'] },{ then:'serum-niacinamida' }], updated_at:iso(30) },
  { key:'shipping', value:{ base:3.9, freeFrom:30 }, updated_at:iso(30) },
  { key:'gifts', value:[{ threshold:30, label:'Envío gratis', slug:null },{ threshold:50, label:'Mascarilla de tela de regalo', slug:'pack-mascarillas-tela' }], updated_at:iso(30) },
  { key:'plans', value:{ patch:[0,16,28,39], skincare:21, week_pct:12 }, updated_at:iso(30) },
  { key:'cms', value:{ 'index.hero.h1':'Poros limpios mientras duermes','garantia.h1':'60 días. Si no ves la diferencia, te devolvemos el dinero.' }, updated_at:iso(10) }
];
const discounts = [
  { code:'NOCHE10', type:'pct', value:10, min:0, active:true, uses:64, max_uses:500, expires_at:iso(-96), created_at:iso(200), products:null },
  { code:'BIENVENIDA5', type:'fixed', value:5, min:25, active:true, uses:212, max_uses:null, expires_at:null, created_at:iso(600), products:null },
  { code:'LOTE1', type:'pct', value:15, min:29.9, active:false, uses:18, max_uses:125, expires_at:iso(240), created_at:iso(700), products:['parches-nariz'] }
];
const products_rows = PRODUCTS.map((p,i)=>({ slug:p.slug, overrides:i===6?{}:{ cost:+(p.price*0.19+1.4).toFixed(2) }, active:i!==11, stock:i===0?96:(i===1?40:null), updated_at:iso(i*20+3) }));
function statsFor(days){
  const daily = Array.from({length:Math.min(days,90)},(_,k)=>{ const d=new Date(now-(Math.min(days,90)-1-k)*864e5); return { day:d.toISOString().slice(0,10), views:120+((k*37)%160), sessions:60+((k*23)%90), atc:8+((k*7)%14), checkout:4+((k*5)%9), orders:1+((k*3)%5), revenue:+(28+((k*17)%120)).toFixed(2), leads:2+((k*11)%7) }; });
  const sum = f => daily.reduce((s,d)=>s+f(d),0);
  return { days, events:sum(d=>d.views)*2, sessions:sum(d=>d.sessions), bounce_rate:48.3,
    funnel:{ sessions:sum(d=>d.sessions), product:Math.round(sum(d=>d.sessions)*0.42), atc:sum(d=>d.atc), checkout:sum(d=>d.checkout), purchase:sum(d=>d.orders) },
    abandoned_carts:37, revenue:+sum(d=>d.revenue).toFixed(2), orders:sum(d=>d.orders), aov:31.68, daily,
    sources:[['facebook',412],['tiktok',233],['directo',180],['google',96],['instagram.com',54],['newsletter-de-lanzamiento-nocta',21]],
    pages:[['/',980],['/producto.html',742],['/no-son-puntos-negros.html',388],['/catalogo.html',203],['/checkout.html',151],['/planes.html',96],['/como-usar.html',72],['/garantia.html',44]],
    landing:[['/no-son-puntos-negros.html',402],['/producto.html',311],['/',260],['/planes.html',38]],
    exits:[['/checkout.html',96],['/producto.html',77],['/',61]],
    countries:[['ES',812],['IT',64],['PT',41],['FR',22],['MX',9]], devices:[['mobile',864],['desktop',142],['tablet',31]],
    products:Object.fromEntries(PRODUCTS.map((p,i)=>[p.slug,{views:420-i*31,atc:64-i*4,sold:i===0?58:Math.max(0,18-i*2)}])),
    leads:63, leads_total:318, customers:customers.length, subs_active:4, mrr:161.7, pending_ship:5, carts_open:6,
    messages:{ email:487, whatsapp:96 } };
}
const integrations = { supabase:{configured:true,url:'https://afaucnifmxfukbkzpudx.supabase.co'},
  stripe:{configured:true,source:'crm',publishable:'pk_live_51QdemoPublishableKeyForNoctaStoreES',webhook:true,webhook_url:'https://nocta-store.netlify.app/api/stripe-webhook',account:{id:'acct_1QdemoNocta',name:'NOCTA Skincare S.L.',email:'hola@nocta.es',country:'ES',currency:'eur',charges_enabled:true,payouts_enabled:true,mode:'live'},oauth:true,methods:['card','apple_pay','google_pay','klarna'],connected_at:iso(400)},
  resend:{configured:true,from:'NOCTA <hola@nocta.es>',domains:[{id:'d_1',name:'nocta.es',status:'verified',region:'eu-west-1'},{id:'d_2',name:'mail.nocta.es',status:'pending',region:'eu-west-1'}],audience:{id:'aud_1',name:'Newsletter NOCTA'},domain_pending:null},
  whatsapp:{configured:true,number:'+34 613 00 00 00',phone_id:'761234567890123',waba:'1029384756',quality:'GREEN',templates:6,webhook_url:'https://nocta-store.netlify.app/api/whatsapp-webhook',verify_token:'nocta'},
  cron:{at:iso(2),ran:['carts','winback','subs'],sent:7} };

/* ---- Personas: datos de mentira para probar la interfaz del mapa y de la ficha.
   La lógica de verdad se prueba aparte en test-recorridos.mjs contra el código real. ---- */
const ETAPAS_F = [
  { k:'visita', n:'Entró en la web' }, { k:'producto', n:'Miró un producto' },
  { k:'carrito', n:'Añadió al carrito' }, { k:'checkout', n:'Empezó el pago' },
  { k:'datos', n:'Metió los datos' }, { k:'compra', n:'Compró' },
];
const ORIG = ['Meta Ads','TikTok Ads','Google orgánico','Directo','Instagram','Email','Google Ads','Enlace'];
const PAGS = ['/producto.html','/','/catalogo.html','/checkout.html','/planes.html','/no-son-puntos-negros.html','/quiz.html'];
const CIU = [['Madrid','ES'],['Barcelona','ES'],['Valencia','ES'],['Sevilla','ES'],['Lisboa','PT'],['París','FR']];
function personasF(n){
  const out=[];
  for(let i=0;i<n;i++){
    const niv = i%13===0?5 : i%7===0?4 : i%5===0?3 : i%3===0?2 : i%2===0?1 : 0;
    const [ciudad,pais]=CIU[i%CIU.length];
    const compro = niv===5;
    const email = (i%3===0)? `persona${i}@ejemplo.es` : null;
    out.push({
      id:'p'+String(i).padStart(3,'0'), email, nombre: email?('Persona '+i):null, identificado_por: email?(i%2?'pedido':'carrito'):null,
      primera:new Date(now-(i+1)*36e5).toISOString(), ultima:new Date(now-i*18e5).toISOString(),
      visitas:1+(i%4), paginas:1+(i%9), eventos:3+(i%25), segundos:15+(i*7)%600,
      dev:i%3?'mobile':'desktop', pais, ciudad, idioma:'es-ES',
      origen:{tipo:ORIG[i%ORIG.length], campana:i%4?('camp-'+(i%5)):null, contenido:i%5?('ad'+(i%9)):null, detalle:'', fuente:null, ref:null},
      etapa:ETAPAS_F[niv].k, etapa_nombre:ETAPAS_F[niv].n, nivel:niv,
      se_quedo_en:PAGS[i%PAGS.length], se_quedo_titulo:'Página '+(i%7), ultimo_ev:'leave',
      productos:i%2?['parches-nariz']:[], anadidos:niv>=2?['parches-nariz']:[],
      pedidos: compro?[{id:'NC-2026'+i, total:16.95+(i%3)*10, status:'paid', created_at:new Date(now-i*18e5).toISOString()}]:[],
      compras: compro?1:0, gastado: compro?16.95+(i%3)*10:0,
      carrito: niv>=2&&!compro?{total:16.95+(i%4)*8, items:[{slug:'parches-nariz',qty:1+(i%2)}], recuperado:false, actualizado:new Date(now-i*18e5).toISOString()}:null,
    });
  }
  return out;
}
function peopleFor(days){
  const P=personasF(46);
  const cuenta=k=>P.filter(p=>p.nivel>=k).length;
  const acum=(f)=>{const m={};P.forEach(p=>{const k=f(p);if(k)m[k]=(m[k]||0)+1;});return Object.entries(m).sort((a,b)=>b[1]-a[1]);};
  return {
    total:P.length, personas:P,
    embudo: ETAPAS_F.map((e,i)=>({...e, personas:cuenta(i)})),
    salidas: acum(p=>p.nivel<5?p.se_quedo_en:null).slice(0,12),
    fuentes: acum(p=>p.origen.tipo),
    dispositivos: acum(p=>p.dev),
    paises: acum(p=>p.pais).slice(0,12),
    eventos_leidos: 1240, tope:false, dias:days||14,
  };
}
function personFor(id){
  const P=personasF(46); const p=P.find(x=>x.id===id)||P[0];
  const ev=(min,e,path,d)=>({t:new Date(now-min*60000).toISOString(), ev:e, path, titulo:'Página', d:d||{}});
  const visita=(i,compro)=>({
    vid:'v'+i, inicio:new Date(now-(i*90+40)*60000).toISOString(), fin:new Date(now-(i*90)*60000).toISOString(),
    origen:p.origen, dev:p.dev, pais:p.pais, segundos:60+i*30, scroll_max:60+i*7,
    nivel:compro?5:p.nivel, etapa:compro?'compra':p.etapa, etapa_nombre:compro?'Compró':p.etapa_nombre, compro,
    paginas:[{t:new Date(now-(i*90+40)*60000).toISOString(), path:'/', titulo:'Portada'}],
    eventos:[ev(i*90+40,'page_view','/',{title:'Portada'}), ev(i*90+38,'view_item','/producto.html',{slug:'parches-nariz'}),
      ev(i*90+35,'scroll','/producto.html',{pct:75}), ev(i*90+33,'add_to_cart','/producto.html',{slug:'parches-nariz',qty:1,value:16.95}),
      ...(compro?[ev(i*90+30,'begin_checkout','/checkout.html',{value:16.95}), ev(i*90+28,'add_payment_info','/checkout.html',{}), ev(i*90+27,'purchase','/gracias.html',{value:16.95,order:p.pedidos[0]?p.pedidos[0].id:'NC-1'})]:[]),
      ev(i*90+20,'leave','/producto.html',{secs:120,scroll:75})],
  });
  const vs=[visita(0,p.nivel===5)]; if(p.visitas>1)vs.unshift(visita(1,false));
  return {...p, visitas_n:vs.length, eventos_n:p.eventos, visitas:vs,
    lead: p.email?{source:'popup', code:'NOCTA10', name:p.nombre, email:p.email}:null,
    cliente: p.compras?{id:'cus_'+p.id, email:p.email, name:p.nombre}:null,
    subs: [], mensajes: p.email?[{created_at:new Date(now-3600e3).toISOString(), subject:'Bienvenida'}]:[],
    eventos_leidos:80, tope:false, dias_mirados:180 };
}

module.exports = { PRODUCTS_JS, orders, customers, subscriptions, leads, carts, messages, campaigns, automations, settings, content, discounts, products_rows, statsFor, integrations, peopleFor, personFor };
