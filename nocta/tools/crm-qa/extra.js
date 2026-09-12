// pantalla de acceso, menú lateral abierto en móvil, y alturas cortas
const { chromium } = require('playwright');
const fs=require('fs'); fs.mkdirSync('extra',{recursive:true});
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
  // login (sin token y con /api/admin/me que exige clave)
  for(const [n,W,H] of [['login_m',390,844],['login_d',1280,800]]){
    const ctx=await b.newContext({viewport:{width:W,height:H},isMobile:W<900,hasTouch:W<900});
    const p=await ctx.newPage();
    await p.route('**/api/admin/me',r=>r.fulfill({status:401,body:'{"error":"no"}'}));
    await p.goto('http://localhost:8791/admin/',{waitUntil:'domcontentloaded'}); await p.waitForTimeout(900);
    await p.screenshot({path:'extra/'+n+'.png'});
    const o=await p.evaluate(()=>({docW:document.documentElement.scrollWidth,vw:document.documentElement.clientWidth}));
    console.log(n,JSON.stringify(o));
    await ctx.close();
  }
  // menú abierto en móvil + alturas cortas
  for(const [n,W,H] of [['drawer_360',360,640],['drawer_390',390,844],['short_1280',1280,600],['short_1024',1024,560]]){
    const ctx=await b.newContext({viewport:{width:W,height:H},isMobile:W<900,hasTouch:W<900});
    const p=await ctx.newPage(); await p.addInitScript(()=>localStorage.setItem('n_admin','open'));
    await p.goto('http://localhost:8791/admin/#/orders',{waitUntil:'domcontentloaded'}); await p.waitForTimeout(1100);
    if(W<900){ await p.click('#menu'); await p.waitForTimeout(450); }
    await p.screenshot({path:'extra/'+n+'.png'});
    const o=await p.evaluate(()=>{const nav=document.querySelector('#nav');const last=nav.querySelector('a:last-of-type');const r=last.getBoundingClientRect();const nb=nav.getBoundingClientRect();
      return {docW:document.documentElement.scrollWidth,vw:document.documentElement.clientWidth,navScroll:nav.scrollHeight>nav.clientHeight+1,lastVisible:r.bottom<=nb.bottom+1&&r.top>=nb.top-1,lastItem:last.textContent.trim()};});
    console.log(n,JSON.stringify(o));
    await ctx.close();
  }
  await b.close();
})();
