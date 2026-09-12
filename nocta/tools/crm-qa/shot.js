// node shot.js outdir W H route:hash[,...]  (full page)
const { chromium } = require('playwright');
const fs=require('fs'),path=require('path');
const [out,W,H,...rest]=process.argv.slice(2);
fs.mkdirSync(out,{recursive:true});
const jobs=rest.join(' ').split(/\s+/).filter(Boolean).map(s=>{const i=s.indexOf(':');return [s.slice(0,i),s.slice(i+1)];});
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
  const mob=Number(W)<900;
  const ctx=await b.newContext({viewport:{width:+W,height:+H},isMobile:mob,hasTouch:mob,deviceScaleFactor:1});
  const p=await ctx.newPage(); await p.addInitScript(()=>localStorage.setItem('n_admin','open'));
  for(const [name,hash] of jobs){
    const [h,...acts]=hash.split('|');
    await p.goto('http://localhost:8791/admin/'+h,{waitUntil:'domcontentloaded'});
    await p.waitForTimeout(800);
    try{await p.waitForFunction(()=>!document.querySelector('#main .loading'),{timeout:5000});}catch(e){}
    for(const a of acts){
      if(a.startsWith('tab=')){const t=a.slice(4);await p.$$eval('.tabs button',(bs,t)=>{const x=bs.find(b=>b.textContent.trim().startsWith(t));x&&x.click();},t);}
      else if(a.startsWith('click=')){try{await p.click(a.slice(6),{timeout:3000});}catch(e){console.log('no click',a);} }
      else if(a.startsWith('wait=')){await p.waitForTimeout(+a.slice(5));}
      await p.waitForTimeout(700);
    }
    await p.waitForTimeout(300);
    await p.screenshot({path:path.join(out,name+'.png'),fullPage:!acts.some(a=>a.startsWith('click='))});
  }
  await b.close(); console.log('shots ok');
})().catch(e=>{console.error(e);process.exit(1)});
