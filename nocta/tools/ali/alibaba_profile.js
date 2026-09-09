const { chromium } = require('playwright'); const fs=require('fs');
const [,, key, url] = process.argv;
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox','--disable-blink-features=AutomationControlled']});
  const ctx=await b.newContext({userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',locale:'en-US',viewport:{width:1366,height:900}});
  await ctx.addInitScript(()=>{Object.defineProperty(navigator,'webdriver',{get:()=>undefined});});
  const p=await ctx.newPage();
  const grab=async()=>await p.evaluate(()=>document.body.innerText);
  try{
    await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(6000);
    let t=await grab(); console.log('initial',t.length, /slide|verify/i.test(t)?'captcha':'content');
    for(let attempt=0; attempt<4; attempt++){
      t=await grab(); if(!/slide|verify/i.test(t) && t.length>400) break;
      let h=null; try{ h=await p.waitForSelector('#nc_1_n1z',{timeout:15000}); }catch(e){}
      if(!h){ console.log('no handle'); break; }
      const hb=await h.boundingBox(); const tr=await p.$('#nc_1_n1t'); const tb=await tr.boundingBox();
      const sx=hb.x+hb.width/2, sy=hb.y+hb.height/2, ex=tb.x+tb.width+10;
      await p.mouse.move(sx-30,sy+20); await p.waitForTimeout(300); await p.mouse.move(sx,sy,{steps:8}); await p.waitForTimeout(200); await p.mouse.down();
      const steps=30+Math.floor(Math.random()*20); let x=sx;
      for(let i=1;i<=steps;i++){ const frac=i/steps; const ease=frac<0.5?2*frac*frac:1-Math.pow(-2*frac+2,2)/2; x=sx+(ex-sx)*ease+(Math.random()*2-1); await p.mouse.move(x,sy+(Math.random()*4-2),{steps:1}); await p.waitForTimeout(8+Math.random()*25); }
      await p.mouse.move(ex+5,sy); await p.waitForTimeout(150); await p.mouse.up();
      try{ await p.waitForNavigation({timeout:8000}); }catch(e){}
      await p.waitForTimeout(4000); t=await grab(); console.log('slider attempt',attempt,'->',t.length, /slide to verify/i.test(t)?'still captcha':'passed');
      if(/slide to verify/i.test(t)){ await p.reload({waitUntil:'domcontentloaded'}); await p.waitForTimeout(4000); t=await grab(); }
    }
    for(let i=0;i<8;i++){ await p.mouse.wheel(0,1200); await p.waitForTimeout(600); }
    t=await grab();
    const links=await p.evaluate(()=>Array.from(document.querySelectorAll('a')).map(a=>a.href).filter(h=>/en\.alibaba\.com|trustpass\.alibaba\.com|product-detail/.test(h)));
    fs.writeFileSync(key+'.txt', t+'\n\n#LINKS\n'+[...new Set(links)].slice(0,60).join('\n'));
    await p.screenshot({path:key+'.png',fullPage:false});
    console.log(key,'chars',t.length, /slide to verify/i.test(t)?'CAPTCHA':'OK');
  }catch(e){console.log(key,'ERR',e.message)}
  await b.close();
})();
