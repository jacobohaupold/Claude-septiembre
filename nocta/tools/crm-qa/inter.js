const { chromium } = require('playwright');
const M=`(()=>{const vw=document.documentElement.clientWidth;const bad=[];
 for(const e of document.querySelectorAll('body *')){if(e.closest('#side'))continue;const cs=getComputedStyle(e);if(cs.display==='none')continue;const r=e.getBoundingClientRect();if(!r.width)continue;
  if(r.right>vw+1)bad.push(e.tagName.toLowerCase()+'.'+String(e.className).slice(0,24)+'@'+Math.round(r.right));
  if(e.scrollWidth>e.clientWidth+2&&/auto|scroll/.test(cs.overflowX))bad.push('SCROLL '+e.tagName.toLowerCase()+'.'+String(e.className).slice(0,24));}
 return {docW:document.documentElement.scrollWidth,vw,bad:[...new Set(bad)].slice(0,5),
   cards:[...document.querySelectorAll('.tbl-wrap')].map(w=>w.classList.contains('cards')?'C':'T').join('')};})()`;
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
  const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const p=await ctx.newPage(); await p.addInitScript(()=>localStorage.setItem('n_admin','open'));
  const log=(t,o)=>console.log(t.padEnd(36),JSON.stringify(o));
  // 1) pedidos: buscar, filtrar, cambiar periodo
  await p.goto('http://localhost:8791/admin/#/orders',{waitUntil:'domcontentloaded'}); await p.waitForTimeout(1200);
  log('pedidos inicial',await p.evaluate(M));
  await p.fill('#main input[type=search], #main .search','marisol'); await p.waitForTimeout(600);
  log('pedidos buscando',await p.evaluate(M));
  await p.click('text=Pagados (por enviar)'); await p.waitForTimeout(900);
  log('pedidos filtro pagados',await p.evaluate(M));
  await p.selectOption('#days','90'); await p.waitForTimeout(1200);
  log('pedidos 90 dias',await p.evaluate(M));
  // 2) girar a horizontal y volver
  await p.setViewportSize({width:844,height:390}); await p.waitForTimeout(900);
  log('pedidos horizontal 844',await p.evaluate(M));
  await p.setViewportSize({width:390,height:844}); await p.waitForTimeout(900);
  log('pedidos vertical otra vez',await p.evaluate(M));
  // 3) navegar por el menu
  await p.click('#menu'); await p.waitForTimeout(400);
  await p.click('#nav a[data-m="leads"]'); await p.waitForTimeout(1100);
  log('leads via menu',await p.evaluate(M));
  await p.click('#main .chip, #main button:has-text("Clientes")').catch(()=>{}); await p.waitForTimeout(700);
  log('leads filtro',await p.evaluate(M));
  // 4) pestañas de contenido, una a una
  await p.goto('http://localhost:8791/admin/#/content',{waitUntil:'domcontentloaded'}); await p.waitForTimeout(1400);
  const tabs=await p.$$eval('.tabs button',bs=>bs.map(b=>b.textContent.trim()));
  for(let i=0;i<tabs.length;i++){ await p.$$eval('.tabs button',(bs,i)=>bs[i].click(),i); await p.waitForTimeout(800); log('contenido · '+tabs[i],await p.evaluate(M)); }
  // 5) ancho de escritorio con menu: tabla vuelve a tabla
  await p.setViewportSize({width:1440,height:900}); await p.goto('http://localhost:8791/admin/#/orders',{waitUntil:'domcontentloaded'}); await p.waitForTimeout(1200);
  log('pedidos 1440',await p.evaluate(M));
  await p.setViewportSize({width:1000,height:900}); await p.waitForTimeout(900);
  log('pedidos 1000',await p.evaluate(M));
  await p.setViewportSize({width:1440,height:900}); await p.waitForTimeout(900);
  log('pedidos 1440 otra vez',await p.evaluate(M));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
