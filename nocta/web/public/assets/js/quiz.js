/* NOCTA · Test de piel v2 — asistente de 7 preguntas + plan personalizado.
   Depende de products.js (window.NOCTA_PRODUCTS), photos.js (window.NOCTA_PHOTOS)
   y de los helpers globales de app.js (nIco, nBySlug, nEur, nImg, nCat, nBuyBlock,
   nPay, nCart, nTrack, nReveal, nMedia, nTrust, nToast). */
document.addEventListener('DOMContentLoaded',()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ============================================================
   1) ICONOS propios de trazo (1,5 px), sin emoji
   ============================================================ */
const SVG_OPEN='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
      SVG_CLOSE='</svg>';
function bars(n){ // gráfico de 3 barras crecientes, las n primeras rellenas (n:1-3)
  const H=[7,12,17],X=[5,10.5,16],s=[];
  for(let i=0;i<3;i++){const y=20-H[i],on=i<n;s.push(`<rect x="${X[i]}" y="${y}" width="3" height="${H[i]}" rx="1" ${on?'fill="currentColor" stroke="none"':'fill="none" stroke="currentColor"'}/>`);}
  return s.join('');
}
const QIC={
  nariz:'<path d="M9 4c-1 3-2 5-2 8a5 5 0 0 0 10 0c0-3-1-5-2-8"/><circle cx="10" cy="13" r=".7" fill="currentColor" stroke="none"/><circle cx="14" cy="13" r=".7" fill="currentColor" stroke="none"/>',
  tzone:'<path d="M5 6h14M12 6v13"/>',
  granos:'<circle cx="12" cy="13" r="5"/><path d="M12 5v3M9 4.5l1 2.7M15 4.5l-1 2.7"/>',
  textura:'<circle cx="7" cy="7" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="7" r="1.2" fill="currentColor" stroke="none"/><circle cx="17" cy="7" r="1.2" fill="currentColor" stroke="none"/><circle cx="7" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="17" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="7" cy="17" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="17" r="1.2" fill="currentColor" stroke="none"/><circle cx="17" cy="17" r="1.2" fill="currentColor" stroke="none"/>',
  grasa:'<path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z"/>',
  muygrasa:'<path d="M8 5c1.6 2.4 3 4.4 3 6.6a3 3 0 0 1-6 0C5 9.4 6.4 7.4 8 5z"/><path d="M16 3c2 3 3.8 5.6 3.8 8.3a3.8 3.8 0 0 1-7.6 0C12.2 8.6 14 6 16 3z"/>',
  normal:'<path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z"/><path d="M6.3 14h11.4"/>',
  seca:'<path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z"/><path d="M5 5l14 14"/>',
  tiras:'<rect x="4" y="9" width="14" height="6" rx="2"/><path d="M15 9l4-3.5"/>',
  apretar:'<path d="M12 3v8M8 7l4 4 4-4"/><path d="M6 14a6 6 0 0 0 12 0"/>',
  acidos:'<path d="M9 3h6M10 3v5l-5.3 9.2A2 2 0 0 0 6.4 20h11.2a2 2 0 0 0 1.7-2.8L14 8V3"/><path d="M8 15h8"/>',
  limpiezas:'<path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z"/>',
  nada:'<circle cx="12" cy="12" r="8"/><path d="M6.5 6.5l11 11"/>',
  limp:'<path d="M12 4c2.5 3 5 6 5 9a5 5 0 0 1-10 0c0-3 2.5-6 5-9z"/><path d="M5 20c1-1 2-1 3 0s2 1 3 0 2-1 3 0 2 1 3 0 2-1 3 0"/>',
  limp_hid:'<path d="M9 4c2 2.6 4 5 4 7.6a4 4 0 0 1-8 0C5 9 7 6.6 9 4z"/><path d="M17 8v6M14 11h6"/>',
  completa:'<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
  poros:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>',
  brillo:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  alta:bars(3),media:bars(2),baja:bars(1),diario:bars(3),semana:bars(2),rara:bars(1)
};
function qico(name){return SVG_OPEN+(QIC[name]||QIC.poros)+SVG_CLOSE;}
const CHECK_ON=`<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M7.5 12.5l3 3 6-6.5" fill="none" stroke="var(--n-cream)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CHECK_OFF=`<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9.5"/></svg>`;

/* ============================================================
   2) PREGUNTAS (7). Cada opción: código, título, ayuda corta e icono.
   ============================================================ */
const QUESTIONS=[
  {id:'zona',q:'¿Dónde te preocupa más tu piel?',
   why:'Cada zona necesita un formato de parche distinto: la nariz no es igual que la frente o la barbilla. Así elegimos la forma que mejor se adapta a ti.',
   opts:[
     {v:'nariz',t:'Nariz',h:'Puntitos oscuros y brillo',ic:'nariz'},
     {v:'tzone',t:'Frente y barbilla',h:'Grasa y granitos en la zona T',ic:'tzone'},
     {v:'granos',t:'Granos',h:'Aparecen y desaparecen',ic:'granos'},
     {v:'textura',t:'Textura',h:'Poros por toda la cara, piel apagada',ic:'textura'}]},
  {id:'piel',q:'¿Cómo está tu piel a media tarde?',
   why:'La grasa que produce tu piel determina cuántas noches por semana necesitas exfoliar o usar parches, sin pasarte ni quedarte corta.',
   opts:[
     {v:'grasa',t:'Brilla en la zona T',h:'Frente, nariz y barbilla',ic:'grasa'},
     {v:'muygrasa',t:'Brilla en toda la cara',h:'Necesitas retocarte a menudo',ic:'muygrasa'},
     {v:'normal',t:'Normal',h:'Ni brillo ni tirantez',ic:'normal'},
     {v:'seca',t:'Tirante o seca',h:'Nota de tirantez durante el día',ic:'seca'}]},
  {id:'sens',q:'¿Se te enrojece la piel con facilidad?',
   why:'Si tu piel se enrojece fácil, empezamos más suave (menos noches de ácido) para que no se irrite mientras notas los resultados.',
   opts:[
     {v:'alta',t:'Sí, con casi todo',h:'Cremas, sol, cambios de tiempo…',ic:'alta'},
     {v:'media',t:'A veces',h:'Con ácidos o después de tomar el sol',ic:'media'},
     {v:'baja',t:'Casi nunca',h:'Mi piel aguanta bien',ic:'baja'}]},
  {id:'probado',q:'¿Qué has probado ya para tus poros?',multi:true,
   why:'Si algo no te funcionó antes, es importante saber por qué: así no repetimos el mismo error en tu rutina nueva.',
   opts:[
     {v:'tiras',t:'Tiras de poros',h:'De farmacia o de droguería',ic:'tiras'},
     {v:'apretar',t:'Apretar o scrubs',h:'Con los dedos o exfoliantes físicos',ic:'apretar'},
     {v:'acidos',t:'Cremas con ácidos',h:'Salicílico, glicólico…',ic:'acidos'},
     {v:'limpiezas',t:'Limpiezas en cabina',h:'En un centro de estética',ic:'limpiezas'},
     {v:'nada',t:'Nada todavía',h:'Es la primera vez que pruebo algo',ic:'nada'}]},
  {id:'freq',q:'¿Cada cuánto notas brillo o granitos nuevos?',
   why:'Cuánto brillo o cuántos granitos nuevos te salen nos dice si tu piel necesita cuidado 2 o 3 veces por semana.',
   opts:[
     {v:'diario',t:'Todos los días',h:'Es algo constante',ic:'diario'},
     {v:'semana',t:'Varias veces por semana',h:'De forma bastante seguida',ic:'semana'},
     {v:'rara',t:'De vez en cuando',h:'No es algo frecuente',ic:'rara'}]},
  {id:'rutina',q:'¿Qué haces hoy por la noche?',
   why:'Partimos de lo que ya haces hoy: añadimos solo los pasos que faltan, sin complicarte la noche.',
   opts:[
     {v:'nada',t:'Nada todavía',h:'Me voy a dormir sin rutina',ic:'nada'},
     {v:'limp',t:'Solo limpiar',h:'Agua o un limpiador',ic:'limp'},
     {v:'limp_hid',t:'Limpiar e hidratar',h:'Limpiador y crema o sérum',ic:'limp_hid'},
     {v:'completa',t:'Rutina completa',h:'Varios pasos, con activos',ic:'completa'}]},
  {id:'objetivo',q:'¿Qué quieres ver primero?',
   why:'Todo ayuda a la vez, pero empezamos por lo que más te importa a ti para que notes el cambio antes.',
   opts:[
     {v:'poros',t:'Poros más limpios',h:'Menos puntitos oscuros',ic:'poros'},
     {v:'granos',t:'Menos granos',h:'Que no aparezcan tantos',ic:'granos'},
     {v:'brillo',t:'Menos brillo',h:'Piel más mate durante el día',ic:'brillo'},
     {v:'textura',t:'Textura más fina',h:'Piel más lisa y uniforme',ic:'textura'}]}
];
const N=QUESTIONS.length;

/* ============================================================
   3) LÓGICA DEL PLAN — función pura plan(ans)
   Reglas (todas deterministas, sin aleatoriedad):
   - congestion = clamp((zona∈{nariz,tzone}?2:1) + (freq==='diario'?1:0) + (probado incluye 'tiras'?1:0), 0, 3)
   - grasaScore = {muygrasa:3, grasa:2, normal:1, seca:0}[piel]
   - sensScore  = min(3, {alta:3, media:2, baja:1}[sens] + (piel==='seca'?1:0))
   - Producto principal por zona: nariz→parches-nariz · tzone→kit-t-zone ·
     granos→parches-granos (+parches-superficie si freq≠'rara') · textura→kit-cara-completa
   - Exfoliante salicílico: se añade si grasaScore≥2 y sensScore≤2; si sensScore=3 y
     grasaScore≥2 se añade igualmente con la nota "empieza con 1 noche por semana";
     si zona='nariz' y toca exfoliante, se sustituye parches-nariz+exfoliante por duo-poros
     (mismo contenido, más barato).
   - Sérum niacinamida si objetivo∈{brillo,textura} o rutina∈{limp_hid,completa}.
   - Tónico hialurónico si piel='seca' o sensScore=3.
   - Frecuencias: parches 2 noches/semana (3 si grasaScore=3); exfoliante 2-3 noches
     (1 si sensScore=3); sérum/tónico a diario. Nunca dos noches seguidas de parche
     en la misma zona (ver calendar()).
   ============================================================ */
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));

function scores(ans){
  const congestion=clamp((['nariz','tzone'].includes(ans.zona)?2:1)+(ans.freq==='diario'?1:0)+(ans.probado.includes('tiras')?1:0),0,3);
  const grasa={muygrasa:3,grasa:2,normal:1,seca:0}[ans.piel];
  const sensibilidad=Math.min(3,{alta:3,media:2,baja:1}[ans.sens]+(ans.piel==='seca'?1:0));
  return{congestion,grasa,sensibilidad};
}

function levelLabel(n){return n>=3?'Alta':n===2?'Media':'Baja';}

function profileName(ans,sc){
  const map={
    nariz: sc.grasa>=2?'Nariz con filamentos y poros cargados':'Nariz con filamentos y piel equilibrada',
    tzone: sc.grasa===3?'Zona T muy grasa con poros congestionados':'Zona T grasa con poros congestionados',
    granos: sc.sensibilidad>=3?'Piel reactiva con brotes':(sc.grasa>=2?'Piel con granos y exceso de grasa':'Piel con granos frecuentes'),
    textura: sc.grasa<=1?'Textura apagada y piel seca':'Textura apagada y poros abiertos'
  };
  return map[ans.zona];
}

const WHY={
  'parches-nariz':'Absorbe la grasa de los poros de la nariz durante la noche: por eso salen más limpios y la nariz se nota más lisa desde la primera mañana.',
  'kit-t-zone':'Cubre frente, nariz y barbilla a la vez: en la zona T se concentra la mayor parte de la grasa facial, así que es donde más se nota el cambio.',
  'parches-granos':'Absorbe el pus y calma la inflamación en 6-8 horas, sin que tengas que tocarte el grano, así evitas marcas.',
  'parches-superficie':'Cubre brotes enteros, no grano a grano: para cuando salen varios juntos en la misma zona.',
  'kit-cara-completa':'Un formato de parche para cada zona de la cara: cubre poros, brillo y granos con la misma rutina.',
  'exfoliante-salicilico':'El salicílico entra en el poro y disuelve la grasa antes de que se acumule, así el parche absorbe más al usarlo después.',
  'duo-poros':'El método de dos pasos: el exfoliante disuelve la grasa del poro y el parche la absorbe la misma noche. La combinación más completa para poros cargados.',
  'serum-niacinamida':'La niacinamida cierra el poro y uniforma el tono: el paso que hace que el resultado dure más allá de la noche del parche.',
  'tonico-hialuronico':'Hidrata sin aportar grasa, así calmas la piel sensible o seca sin que compense produciendo más grasa.'
};
const isPatch=slug=>['parches-nariz','parches-granos','parches-superficie','parches-barbilla','parches-frente','kit-t-zone','kit-cara-completa','duo-poros'].includes(slug);

function plan(ans){
  const sc=scores(ans);
  const mainByZone={nariz:'parches-nariz',tzone:'kit-t-zone',granos:'parches-granos',textura:'kit-cara-completa'};
  let main=mainByZone[ans.zona];
  const extra=[];
  if(ans.zona==='granos'&&ans.freq!=='rara')extra.push('parches-superficie');

  let addExf=false,exfNote='';
  if(sc.grasa>=2&&sc.sensibilidad<=2)addExf=true;
  else if(sc.sensibilidad===3&&sc.grasa>=2){addExf=true;exfNote='Empieza con 1 noche por semana.';}

  if(ans.zona==='nariz'&&addExf){main='duo-poros';addExf=false;}
  else if(addExf)extra.push('exfoliante-salicilico');

  if((ans.objetivo==='brillo'||ans.objetivo==='textura'||ans.rutina==='limp_hid'||ans.rutina==='completa')&&!extra.includes('serum-niacinamida'))extra.push('serum-niacinamida');
  if((ans.piel==='seca'||sc.sensibilidad===3)&&!extra.includes('tonico-hialuronico'))extra.push('tonico-hialuronico');

  const nightsTxt=n=>n===1?'1 noche por semana':n+' noches por semana';
  const patchFreqTxt=nightsTxt(sc.grasa===3?3:2);
  const patchNights=sc.grasa===3?3:2;
  const exfFreqTxt=sc.sensibilidad===3?'1 noche por semana':(sc.grasa===3?'3 noches por semana':'2-3 noches por semana');
  const exfNights=sc.sensibilidad===3?1:(sc.grasa===3?3:2);
  // Si el dúo nace de la rama "sensibilidad=3", el paso ácido va cada vez: se
  // hereda el ritmo reducido del exfoliante en vez del ritmo normal del parche.
  const duoReduced=main==='duo-poros'&&!!exfNote;
  const mainNights=main==='duo-poros'?(duoReduced?exfNights:patchNights):patchNights;
  const mainFreqTxt=main==='duo-poros'?(duoReduced?exfFreqTxt:patchFreqTxt):patchFreqTxt;

  // nightsOverride: cuando calendar() no consigue encajar todas las noches
  // "ideales" de un parche extra en la semana (p.ej. zona=granos + exfoliante +
  // parches-superficie compitiendo por los mismos 7 días), calendar() llama a
  // applyActualNights() con el nº de noches que REALMENTE le ha podido asignar.
  // freqOf() usa ese número real en vez del ideal, así la tarjeta de producto y
  // el calendario de 7 noches nunca se contradicen entre sí.
  const nightsOverride={};
  function applyActualNights(map){Object.keys(map).forEach(slug=>{nightsOverride[slug]=map[slug];});}

  const freqOf=slug=>{
    if(Object.prototype.hasOwnProperty.call(nightsOverride,slug)){
      const n=nightsOverride[slug];
      return{txt:nightsTxt(n)+' (repartida esta semana con tus otros parches)',nights:n};
    }
    if(slug==='duo-poros')return{txt:mainFreqTxt+' (exfoliante + parche la misma noche)',nights:mainNights};
    if(isPatch(slug))return{txt:patchFreqTxt,nights:patchNights};
    if(slug==='exfoliante-salicilico')return{txt:exfFreqTxt,nights:exfNights};
    if(slug==='serum-niacinamida'||slug==='tonico-hialuronico')return{txt:'A diario, mañana y noche',nights:7};
    return{txt:'',nights:0};
  };

  const routine=[main,...extra];
  const objections=[];
  if(ans.probado.includes('tiras'))objections.push({t:'Por qué las tiras no lo arreglaron',x:'Las tiras arrancan la capa superficial de la piel y estiran el poro: por eso vuelve a salir enseguida y puede irritar. El hidrocoloide absorbe la grasa desde dentro del poro sin tirones y sin dañar la piel.'});
  if(ans.probado.includes('apretar'))objections.push({t:'Por qué apretar lo empeora',x:'Apretar rompe la pared del poro y empuja la infección más adentro: por eso salen marcas y el grano tarda más en curar. El parche absorbe el pus sin que tengas que tocarlo.'});
  if(ans.probado.includes('acidos')&&ans.sens==='alta')objections.push({t:'Por qué te irritaban los ácidos',x:'Con la piel reactiva, los ácidos a diario piden más de lo que la barrera aguanta y aparece el rojo. Por eso tu rutina empieza con menos noches de exfoliante y prioriza calmar antes que exfoliar.'});

  // Semana 1-2: solo se cita una cifra cuando el producto principal la respalda de
  // verdad en products.js (claims); si no, texto genérico sin inventar números.
  const WEEK2={
    'parches-nariz':'Los poros se ven menos cargados: 9 de cada 10 lo notan ya desde la primera noche.',
    'duo-poros':'Notas la diferencia en los poros en las 2 primeras semanas de rutina.',
    'kit-t-zone':'Los poros de la zona T se ven menos cargados y el brillo se controla antes de mediodía.',
    'parches-granos':'Los brotes en proceso se calman antes y aparecen menos granos nuevos.',
    'kit-cara-completa':'Los poros se ven menos cargados en toda la cara, zona a zona.'
  };
  const expect=[
    {t:'Noche 1',b:'El parche sale con la grasa visible y la piel se nota más suave nada más despertar.'},
    {t:'Semana 1-2',b:WEEK2[main]||'Los poros se ven menos cargados y la piel se nota más suave al tacto.'},
    {t:'Semana 3-4',b:'Menos brillo y piel más uniforme, con la rutina ya en automático.'}
  ];

  return{sc,main,extra,routine,objections,expect,exfNote,mainNights,freqOf,applyActualNights,name:profileName(ans,sc)};
}

/* Calendario de 7 noches (L-D). Reparto fijo y determinista según el nº de noches
   de la zona principal (1-3), del exfoliante extra (0-3) y de cualquier parche
   extra en pl.extra (p.ej. parches-superficie), evitando siempre dos noches
   seguidas de parche en la misma zona. Los productos "a diario" (sérum/tónico) no
   entran en el grid: se listan aparte, porque se usan todas las noches. */
const DAY_LABEL=['L','M','X','J','V','S','D'];
const PATCH_DAYS={1:[3],2:[0,3],3:[0,2,4]};
const EXF_PREF={1:[4,1,6],2:[5,2,6,1,4],3:[5,1,6,3]};
const PATCH_EXTRA_PREF={1:[6],2:[1,5,4,2,6,0,3],3:[1,3,5,6,0,2,4]};
function pickDays(pref,n,exclude){
  const out=[];
  for(const d of pref){if(out.length>=n)break;if(!exclude.has(d)&&!out.includes(d))out.push(d);}
  for(let d=0;d<7&&out.length<n;d++){if(!exclude.has(d)&&!out.includes(d))out.push(d);}
  return out.sort((a,b)=>a-b);
}
function calendar(pl,ans){
  const mainDays=PATCH_DAYS[pl.mainNights];
  const hasStandaloneExf=pl.extra.includes('exfoliante-salicilico');
  const used=new Set(mainDays);
  let exfDays=[];
  if(hasStandaloneExf){
    const exfN=pl.sc.sensibilidad===3?1:(pl.sc.grasa===3?3:2);
    exfDays=(EXF_PREF[pl.mainNights]||EXF_PREF[2]).slice(0,exfN).sort((a,b)=>a-b);
    exfDays.forEach(d=>used.add(d));
  }
  // Cualquier otro parche que viaje en pl.extra (p.ej. parches-superficie cuando
  // zona='granos') también necesita sus propias noches en el grid.
  const extraPatchSlugs=pl.extra.filter(isPatch);
  const extraPatchDays={};
  const shortfall={};
  extraPatchSlugs.forEach(slug=>{
    const f=pl.freqOf(slug);
    const pref=PATCH_EXTRA_PREF[f.nights]||PATCH_EXTRA_PREF[2];
    const days=pickDays(pref,f.nights,used);
    days.forEach(d=>used.add(d));
    extraPatchDays[slug]=days;
    // Si la semana ya está llena (parche principal + exfoliante) no siempre caben
    // todas las noches "ideales" de un parche extra: se registra lo que de verdad
    // se ha podido colocar para que freqOf() deje de prometer lo que el calendario
    // no puede cumplir (ver nightsOverride en plan()).
    if(days.length!==f.nights)shortfall[slug]=days.length;
  });
  if(Object.keys(shortfall).length)pl.applyActualNights(shortfall);
  const dailySlugs=pl.extra.filter(s=>s==='serum-niacinamida'||s==='tonico-hialuronico');
  const p=nBySlug(pl.main);
  const days=DAY_LABEL.map((d,idx)=>{
    const items=[];
    if(mainDays.includes(idx))items.push({label:pl.main==='duo-poros'?'Exfoliante + parche':p.name.replace('Parches de ','Parche ').replace('Kit ','Kit '),cls:'n-qz-pill'});
    if(exfDays.includes(idx))items.push({label:'Exfoliante',cls:'n-qz-pill n-qz-pill--exf'});
    extraPatchSlugs.forEach(slug=>{
      if((extraPatchDays[slug]||[]).includes(idx)){
        const ep=nBySlug(slug);
        items.push({label:ep.name.replace('Parches de ','').replace('Parches ',''),cls:'n-qz-pill n-qz-pill--extra'});
      }
    });
    return{d,items};
  });
  return{days,dailySlugs};
}

/* ============================================================
   4) ESTADO Y NAVEGACIÓN
   ============================================================ */
const box=$('#q'),back=$('#qback'),exitBtn=$('#qexit');
exitBtn.innerHTML=nIco('x',22);back.innerHTML=nIco('back',22);
let ans={},i=0,view='start',sharedResult=false;

function saveLocal(){try{localStorage.setItem('n_quiz',JSON.stringify(ans));}catch(e){}}

function setView(v,dir){
  view=v;
  renderInto(render(),dir);
}
function renderInto(html,dir){
  if(RM||!dir){box.innerHTML=html;afterPaint();return;}
  const outCls=dir==='back'?'n-qz-out-r':'n-qz-out',inCls=dir==='back'?'n-qz-in-r':'n-qz-in';
  box.classList.add(outCls);
  setTimeout(()=>{
    box.innerHTML=html;
    box.classList.remove(outCls);
    box.classList.add(inCls);
    requestAnimationFrame(()=>requestAnimationFrame(()=>{box.classList.remove(inCls);afterPaint();}));
  },180);
}
function afterPaint(){wire();if(window.nReveal)nReveal();if(window.nMedia)nMedia();}

back.onclick=()=>{
  if(view==='q'){ if(i>0){i--;setView('q','back');} else {setView('start','back');} return;}
  if(view==='email'){i=N-1;setView('q','back');return;}
};

function updateBack(){
  back.hidden = view==='result' || view==='start';
}

/* ============================================================
   5) RENDER
   ============================================================ */
function optionHtml(o,multi,checked,tabbable){
  // Patrón W3C APG "roving tabindex" para el radiogroup de opción única: solo la
  // opción marcada (o la primera si aún no hay selección) es una parada de Tab;
  // el resto usan tabindex=-1 y se alcanzan con las flechas (ver wire()). Los
  // grupos de checkbox (pregunta múltiple) mantienen cada opción como parada de
  // Tab independiente, que es el patrón esperado para un grupo de checkboxes.
  const tabAttr=multi?'':` tabindex="${tabbable?'0':'-1'}"`;
  return `<button class="n-qz-opt${checked?' is-on':''}" type="button" data-v="${o.v}" role="${multi?'checkbox':'radio'}" aria-checked="${checked}"${tabAttr}>`+
    `<span class="n-qz-opt__ic">${qico(o.ic)}</span>`+
    `<span class="n-qz-opt__t"><b>${o.t}</b><small>${o.h}</small></span>`+
    `<span class="n-qz-opt__chev">${multi?(checked?CHECK_ON:CHECK_OFF):nIco('chev',18)}</span></button>`;
}

function renderStart(){
  return `<div class="n-c n-qz-start n-reveal">
    <span class="n-lab n-lab--navy">Test de piel</span>
    <h1 class="n-d2">Tu rutina de parches en 1 minuto</h1><h2 class="n-vh">Qué incluye el test</h2>
    <p class="n-lead">7 preguntas rápidas. Te explicamos por qué te las hacemos y terminas con un plan que se entiende del todo: qué producto, por qué, cuándo y cuántas noches.</p>
    <ul class="n-list">
      <li>${nIco('check',16)}<span>Dura 1 minuto</span></li>
      <li>${nIco('check',16)}<span>Un plan con nombre, no una lista de productos</span></li>
      <li>${nIco('check',16)}<span>Calendario de 7 noches listo para seguir</span></li>
    </ul>
    <button class="n-btn n-btn--fill n-btn--wide" id="qstart">Empezar</button>
  </div>`;
}

function renderQ(){
  const s=QUESTIONS[i],multi=!!s.multi,sel=ans[s.id];
  const pct=i/N*100;
  return `<div class="n-c n-qz-q">
    <div class="n-progress"><i style="width:${pct}%"></i></div>
    <p class="n-lab">Pregunta ${i+1} de ${N}</p>
    <h2 class="n-d3">${s.q}</h2>
    <button class="n-link n-qz-why" type="button" aria-expanded="false" aria-controls="qz-why-${s.id}">¿Por qué lo preguntamos?</button>
    <p class="n-sm n-muted n-qz-whyp" id="qz-why-${s.id}" hidden>${s.why}</p>
    <div class="n-qz-opts" role="${multi?'group':'radiogroup'}" aria-label="${s.q}">
      ${s.opts.map((o,oi)=>optionHtml(o,multi,multi?(Array.isArray(sel)&&sel.includes(o.v)):sel===o.v,!multi&&(sel?sel===o.v:oi===0))).join('')}
    </div>
    ${multi?`<button class="n-btn n-btn--fill n-btn--wide n-qz-next" id="qnext" ${Array.isArray(sel)&&sel.length?'':'disabled'}>Siguiente</button>`:''}
  </div>`;
}

function renderEmail(){
  const pl=plan(ans);
  return `<div class="n-c n-qz-email">
    <div class="n-progress"><i style="width:100%"></i></div>
    <h2 class="n-d3">Ya tenemos tu plan</h2>
    <p class="n-lead">Déjanos tu email para guardarlo y enviarte un <b>10 % de descuento</b> para tu primer pedido.</p>
    <form class="n-form" id="qf">
      <label for="q-email" class="n-vh">Email</label>
      <input id="q-email" name="email" type="email" required placeholder="tu@email.com" autocomplete="email">
      <button class="n-btn n-btn--wide">Ver mi plan y mi −10 %</button>
    </form>
    <button class="n-link" id="skip" style="margin-top:12px">Ver sin dejar email</button>
  </div>`;
}

function barRow(label,score,text){
  return `<div class="n-qz-bar"><div class="n-qz-bar__h"><span>${label}</span><b>${levelLabel(score)}</b></div><div class="n-qz-bar__track"><i style="width:${score/3*100}%"></i></div><p class="n-sm n-muted">${text}</p></div>`;
}

function grasaText(g,zona){
  if(g>=3)return'Tu piel produce bastante grasa a media tarde: por eso conviene un exfoliante que evite que se acumule en el poro.';
  if(g===2)return zona==='tzone'?'Notas brillo sobre todo en la zona T: es la zona que más cuidado necesita.':'Notas brillo a media tarde: por eso conviene controlar la grasa sin resecar la piel.';
  return'Tu piel no produce mucha grasa: prioriza hidratar sin cargar el poro.';
}
function sensText(s){return s>=3?'Tu piel se enrojece con facilidad: empezamos con menos noches de ácido para no irritar.':s===2?'Tu piel tolera bastante bien: puedes exfoliar 2-3 noches por semana sin problema.':'Tu piel casi no reacciona: puedes ir a tu ritmo con los ácidos.';}
function congText(c){return c>=3?'Tus poros acumulan grasa rápido: un parche varias veces por semana ayuda a que no se carguen.':c===2?'Tus poros se cargan de forma moderada: con un parche 2 veces por semana suele bastar.':'Tus poros no se congestionan mucho: con mantenimiento ligero vale.';}

function prodCard(slug,idx,pl){
  const p=nBySlug(slug);if(!p)return'';
  const photo=(window.NOCTA_PHOTOS&&NOCTA_PHOTOS[slug]&&NOCTA_PHOTOS[slug].main)||nImg(p);
  const f=pl.freqOf(slug);
  return `<article class="n-c n-qz-prod n-reveal" data-slug="${slug}">
    <div class="n-qz-prod__media n-cut"><img src="${photo}" width="480" height="480" alt="${p.name}" loading="lazy" decoding="async"></div>
    <div class="n-qz-prod__body">
      <span class="n-lab">${nCat(p)}</span>
      <h3 class="n-d4">${p.name}</h3>
      <p class="n-sm n-qz-prod__why">${WHY[slug]||p.short}</p>
      <p class="n-sm n-qz-prod__when"><b>${f.txt}</b></p>
      <p class="n-price"><b class="n-num">${nEur(p.price)}</b>${p.compare?`<s>${nEur(p.compare)}</s>`:''}</p>
      ${idx===0?nBuyBlock(slug,{src:'quiz_result'}):`<button class="n-link n-qz-prod__add" data-add="${slug}" data-src="quiz_result">Añadir solo esto</button>`}
    </div>
  </article>`;
}

function renderResult(){
  const pl=plan(ans);
  const cal=calendar(pl,ans);
  const items=pl.routine.map(nBySlug).filter(Boolean);
  const total=items.reduce((a,p)=>a+p.price,0);
  const savings=items.reduce((a,p)=>a+(p.compare?p.compare-p.price:0),0);

  const bars=barRow('Congestión de poros',pl.sc.congestion,congText(pl.sc.congestion))+
             barRow('Grasa',pl.sc.grasa,grasaText(pl.sc.grasa,ans.zona))+
             barRow('Sensibilidad',pl.sc.sensibilidad,sensText(pl.sc.sensibilidad));

  const dailyNames=cal.dailySlugs.map(s=>nBySlug(s)).filter(Boolean).map(p=>p.name);
  const dailyLine=dailyNames.length?`<p class="n-sm n-qz-week__daily">+ ${dailyNames.join(' y ')} a diario, mañana y noche.</p>`:'';
  const week=`<div class="n-c n-qz-week n-reveal"><div class="n-sh" style="padding-top:0"><h2>Tus 7 noches</h2></div>
    <div class="n-qz-week__grid">${cal.days.map(d=>`<div class="n-qz-day"><span class="n-lab">${d.d}</span><div class="n-qz-day__pills">${d.items.length?d.items.map(it=>`<span class="${it.cls}">${it.label}</span>`).join(''):'<span class="n-qz-pill n-qz-pill--off">Libre</span>'}</div></div>`).join('')}</div>
    ${dailyLine}
    <p class="n-xs n-muted" style="margin-top:var(--n-s3)">${pl.exfNote?pl.exfNote+' ':''}Nunca dos noches seguidas de parche en la misma zona.</p></div>`;

  const expect=`<div class="n-c n-qz-steps3 n-reveal"><div class="n-sh" style="padding-top:0"><h2>Qué esperar</h2></div>
    <ol class="n-steps">${pl.expect.map(e=>`<li><span class="n-lab n-lab--navy">${e.t}</span><p><b>${e.t==='Noche 1'?'La primera noche':e.t==='Semana 1-2'?'A las dos semanas':'Al mes'}</b>${e.b}</p></li>`).join('')}</ol></div>`;

  const objections=pl.objections.length?`<div class="n-bento n-bento--3" style="margin-top:var(--n-gap)">${pl.objections.map(o=>`<div class="n-c n-qz-obj n-reveal"><h3 class="n-d4">${o.t}</h3><p class="n-sm">${o.x}</p></div>`).join('')}</div>`:'';

  const rows=items.map(p=>`<div class="row"><span>${p.name}</span><span class="n-num">${nEur(p.price)}</span></div>`).join('');
  const shareUrl=location.origin+location.pathname+'?r='+encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(ans)))));

  return `<div class="n-qz-result">
    <div class="n-c n-qz-profile n-reveal">
      <span class="n-lab n-lab--navy">Tu plan NOCTA</span>
      <h2 class="n-d2">${pl.name}</h2>
      <p class="n-lead">Con tus respuestas, esto es lo que más le va a cambiar la piel en las próximas semanas.</p>
      <div class="n-qz-bars">${bars}</div>
    </div>
    <div class="n-sh"><h2>Tu rutina</h2></div>
    <div class="n-bento n-bento--2 n-stagger">${pl.routine.map((s,idx)=>prodCard(s,idx,pl)).join('')}</div>
    ${week}
    ${expect}
    ${objections}
    <div class="n-c n-qz-summary n-reveal">
      <span class="n-lab">Resumen</span>
      <div class="n-qz-summary__rows" style="margin-top:8px">${rows}${savings>0?`<div class="row ok"><span>Ahorras con el pack</span><span class="n-num">−${nEur(savings)}</span></div>`:''}</div>
      <div class="n-qz-summary__tot"><span>Total</span><span class="n-num">${nEur(total)}</span></div>
      <button class="n-btn n-btn--fill n-btn--wide" id="qzbuyall">Comprar mi rutina · ${nEur(total)}</button>
      ${nPay(pl.main,{src:'quiz_result'})}
      <div id="quiztrust" style="margin-top:var(--n-s4)"></div>
      <div class="n-qz-summary__actions">
        <button class="n-link" id="qzshare" data-url="${shareUrl}">Compartir mi plan</button>
        <button class="n-link" id="qzrepeat">Repetir el test</button>
      </div>
    </div>
  </div>`;
}

function render(){
  if(view==='start')return renderStart();
  if(view==='q')return renderQ();
  if(view==='email')return renderEmail();
  if(view==='result')return renderResult();
  return'';
}

/* ============================================================
   6) EVENTOS
   ============================================================ */
function selectSingle(id,v){
  ans[id]=v;
  nTrack('quiz_answer',{q:i,id,a:v});
  saveLocal();
  if(i<N-1){i++;setView('q','fwd');}
  else{setView('email','fwd');}
}
function toggleMulti(id,v){
  const cur=Array.isArray(ans[id])?ans[id].slice():[];
  if(v==='nada'){ans[id]=cur.includes('nada')?[]:['nada'];}
  else{
    let next=cur.filter(x=>x!=='nada');
    const at=next.indexOf(v);
    if(at>-1)next.splice(at,1);else next.push(v);
    ans[id]=next;
  }
  setView('q',null); // repinta sin animar (misma pregunta)
}

function wire(){
  updateBack();
  if(view==='start'){
    const b=$('#qstart');if(b)b.onclick=()=>setView('q','fwd');
  }
  if(view==='q'){
    const s=QUESTIONS[i];
    const why=$('.n-qz-why'),whyp=$('.n-qz-whyp');
    if(why)why.onclick=()=>{const open=why.getAttribute('aria-expanded')==='true';why.setAttribute('aria-expanded',String(!open));whyp.hidden=open;};
    $$('.n-qz-opt').forEach(btn=>{
      btn.onclick=()=>{
        if(s.multi)toggleMulti(s.id,btn.dataset.v);
        else selectSingle(s.id,btn.dataset.v);
      };
    });
    const nx=$('#qnext');
    if(nx)nx.onclick=()=>{
      nTrack('quiz_answer',{q:i,id:s.id,a:(ans[s.id]||[]).join('|')});
      saveLocal();
      if(i<N-1){i++;setView('q','fwd');}else{setView('email','fwd');}
    };
    // navegación con flechas dentro del grupo de opciones
    const grp=$('.n-qz-opts');
    if(grp)grp.addEventListener('keydown',e=>{
      if(!['ArrowDown','ArrowRight','ArrowUp','ArrowLeft'].includes(e.key))return;
      const opts=$$('.n-qz-opt',grp);const idx=opts.indexOf(document.activeElement);
      if(idx<0)return;e.preventDefault();
      const d=(e.key==='ArrowDown'||e.key==='ArrowRight')?1:-1;
      const next=opts[(idx+d+opts.length)%opts.length];
      if(!s.multi){opts.forEach(o=>{o.tabIndex=-1;});next.tabIndex=0;} // roving tabindex
      next.focus();
    });
  }
  if(view==='email'){
    const f=$('#qf');
    f.onsubmit=e=>{
      e.preventDefault();
      const em=$('#q-email').value;
      fetch('/api/subscribe',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:em,src:'quiz',skin:ans.zona+'/'+ans.piel})}).catch(()=>{});
      sessionStorage.setItem('n_disc',JSON.stringify({code:'HOLA10',type:'pct',value:10}));
      localStorage.setItem('n_popup','1');
      nTrack('lead',{src:'quiz',skin:ans.zona+'/'+ans.piel});
      setView('result','fwd');
    };
    $('#skip').onclick=()=>setView('result','fwd');
  }
  if(view==='result'){
    const pl=plan(ans);
    nTrack('quiz_result',{main:pl.main,plus:pl.extra.join('|'),skin:ans.zona+'/'+ans.piel});
    saveLocal();
    const tr=$('#quiztrust');if(tr)tr.innerHTML=nTrust();
    const buy=$('#qzbuyall');
    if(buy)buy.onclick=()=>{
      pl.routine.forEach(slug=>nCart.add(slug,1,false,'quiz_result',true));
      nCart.render();nCart.open();
    };
    const sh=$('#qzshare');
    if(sh)sh.onclick=()=>{
      const url=sh.dataset.url;
      const done=()=>{if(window.nToast)nToast('Enlace copiado');};
      if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(url).then(done).catch(()=>{fallbackCopy(url);done();});
      else{fallbackCopy(url);done();}
    };
    const rp=$('#qzrepeat');
    if(rp)rp.onclick=()=>{
      ans={};i=0;
      try{history.replaceState(null,'',location.pathname);}catch(e){}
      setView('start','back');
    };
  }
}
function fallbackCopy(text){
  const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';
  document.body.appendChild(ta);ta.select();try{document.execCommand('copy');}catch(e){}document.body.removeChild(ta);
}

/* ============================================================
   7) ARRANQUE — soporta ?r=... (plan compartido: va directo al resultado)
   ============================================================ */
function tryShared(){
  try{
    const r=new URLSearchParams(location.search).get('r');
    if(!r)return false;
    const data=JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(r)))));
    const need=['zona','piel','sens','probado','freq','rutina','objetivo'];
    if(!need.every(k=>k in data))return false;
    ans=data;sharedResult=true;return true;
  }catch(e){return false;}
}

if(tryShared()){
  view='result';renderInto(render(),null);
}else{
  nTrack('quiz_start');
  view='start';renderInto(render(),null);
}
});
