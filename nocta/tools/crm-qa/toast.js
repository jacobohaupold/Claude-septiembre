const { chromium } = require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
  for(const W of [320,390,1280]){
    const ctx=await b.newContext({viewport:{width:W,height:700},isMobile:W<900,hasTouch:W<900});
    const p=await ctx.newPage(); await p.addInitScript(()=>localStorage.setItem('n_admin','open'));
    await p.goto('http://localhost:8791/admin/#/dashboard',{waitUntil:'domcontentloaded'}); await p.waitForTimeout(1000);
    await p.evaluate(()=>A.toast('No se ha podido guardar: el proveedor de pagos ha rechazado la operación (código 402, tarjeta caducada). Inténtalo otra vez o usa otro método.','bad'));
    await p.waitForTimeout(400);
    const o=await p.evaluate(()=>{const t=document.querySelector('.toast');const r=t.getBoundingClientRect();return {w:Math.round(r.width),l:Math.round(r.left),r:Math.round(r.right),vw:document.documentElement.clientWidth,doc:document.documentElement.scrollWidth};});
    console.log(W,JSON.stringify(o));
    if(W===390) await p.screenshot({path:'extra/toast390.png'});
    await ctx.close();
  }
  await b.close();
})();
