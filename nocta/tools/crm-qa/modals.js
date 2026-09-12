const { chromium } = require('playwright');
const fs=require('fs'),path=require('path');
const OUT=process.argv[2]||'mod390', W=+(process.argv[3]||390), H=+(process.argv[4]||844);
fs.mkdirSync(OUT,{recursive:true});
const ROUTES=['#/dashboard','#/orders','#/orders/NC-20261041','#/carts','#/customers','#/customers/mar%C3%ADa0%40gmail.com','#/subscriptions','#/leads','#/products','#/products/parches-nariz','#/offers','#/content','#/pricing','#/campaigns','#/campaigns/cmp_1','#/whatsapp','#/automations','#/messages','#/integrations','#/settings'];
const MEAS=`(()=>{const m=document.querySelector('.mod');if(!m)return null;const box=m.querySelector('.mod__box');const bw=box.getBoundingClientRect();
 const out={t:(m.querySelector('.mod__h h2')||{}).textContent||'',boxW:Math.round(bw.width),boxR:Math.round(bw.right),vw:document.documentElement.clientWidth,bad:[],scroll:[]};
 for(const e of box.querySelectorAll('*')){const cs=getComputedStyle(e);if(cs.display==='none')continue;const r=e.getBoundingClientRect();if(!r.width)continue;
  if(r.right>bw.right+1||r.left<bw.left-1)out.bad.push({el:e.tagName.toLowerCase()+'.'+String(e.className).slice(0,26),r:Math.round(r.right),lim:Math.round(bw.right)});
  if(e.scrollWidth>e.clientWidth+2&&/auto|scroll/.test(cs.overflowX))out.scroll.push({el:e.tagName.toLowerCase()+'.'+String(e.className).slice(0,26),sw:e.scrollWidth,cw:e.clientWidth});}
 out.bad=out.bad.slice(0,6);out.scroll=out.scroll.slice(0,6);return out;})()`;
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
  const mob=W<900;
  const ctx=await b.newContext({viewport:{width:W,height:H},isMobile:mob,hasTouch:mob});
  const p=await ctx.newPage(); await p.addInitScript(()=>localStorage.setItem('n_admin','open'));
  const seen=new Set(); let bad=0,n=0;
  for(const route of ROUTES){
    await p.goto('http://localhost:8791/admin/'+route,{waitUntil:'domcontentloaded'});
    await p.waitForTimeout(900);
    const tabs=await p.$$eval('.tabs button',bs=>bs.length);
    for(let ti=0; ti<Math.max(1,tabs); ti++){
      if(tabs){ await p.goto('http://localhost:8791/admin/'+route,{waitUntil:'domcontentloaded'}); await p.waitForTimeout(900); await p.$$eval('.tabs button',(bs,i)=>bs[i]&&bs[i].click(),ti); await p.waitForTimeout(700); }
      const count=await p.$$eval('#main button, #main .btn, #main [data-slug], #main tr.click',es=>es.length);
      for(let i=0;i<count;i++){
        const label=await p.evaluate(i=>{const es=[...document.querySelectorAll('#main button, #main .btn, #main [data-slug], #main tr.click')];const e=es[i];return e?(e.textContent||'').trim().slice(0,28):null;},i);
        if(label===null) continue;
        const ok=await p.evaluate(i=>{const es=[...document.querySelectorAll('#main button, #main .btn, #main [data-slug], #main tr.click')];const e=es[i];if(!e)return false;if(e.tagName==='A')return false;e.click();return true;},i);
        if(!ok) continue;
        await p.waitForTimeout(550);
        const m=await p.evaluate(MEAS);
        if(m){
          const key=(route+'|'+m.t).slice(0,70);
          if(!seen.has(key)){
            seen.add(key); n++;
            const isBad=m.bad.length||m.scroll.length||m.boxR>m.vw+1;
            if(isBad){bad++;console.log('DESBORDE',route,'«'+m.t+'»',JSON.stringify(m.bad),JSON.stringify(m.scroll));}
            await p.screenshot({path:path.join(OUT,(route.replace(/[^\w]+/g,'_')+'__'+m.t.replace(/[^\wáéíóúñ ]+/g,'').replace(/ /g,'_')).slice(0,80)+'.png')});
          }
          await p.keyboard.press('Escape'); await p.waitForTimeout(220);
          const still=await p.$('.mod'); if(still){ await p.evaluate(()=>{document.querySelectorAll('.mod').forEach(x=>x.remove());}); }
        }
        const gone=await p.evaluate(()=>!document.querySelector('#main'));
        if(gone) break;
        const hash=await p.evaluate(()=>location.hash);
        if(hash!==route){ await p.goto('http://localhost:8791/admin/'+route,{waitUntil:'domcontentloaded'}); await p.waitForTimeout(800); if(tabs){await p.$$eval('.tabs button',(bs,i)=>bs[i]&&bs[i].click(),ti);await p.waitForTimeout(600);} }
      }
    }
  }
  console.log('modales distintos:',n,'con desborde:',bad);
  await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
