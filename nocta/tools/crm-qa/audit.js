// NODE_PATH=/opt/node22/lib/node_modules node audit.js [shotdir] [routes...]
const { chromium } = require('playwright');
const fs=require('fs'),path=require('path');
const BASE='http://localhost:8791/admin/';
const OUT=process.argv[2]||'shots';
fs.mkdirSync(OUT,{recursive:true});
const VIEWS=[{n:'m360',w:360,h:740,m:true},{n:'m390',w:390,h:844,m:true},{n:'m430',w:430,h:932,m:true},{n:'t768',w:768,h:1024,m:false},{n:'d1280',w:1280,h:800,m:false},{n:'d1440',w:1440,h:900,m:false},{n:'d1920',w:1920,h:1080,m:false}];
const ROUTES=[
 ['dashboard','#/dashboard'],['orders','#/orders'],['order','#/orders/NC-20261041'],['carts','#/carts'],
 ['customers','#/customers'],['customer','#/customers/cus_4'],['subscriptions','#/subscriptions'],['leads','#/leads'],
 ['products','#/products'],['product','#/products/parches-nariz'],['offers','#/offers'],['content','#/content'],['pricing','#/pricing'],
 ['campaigns','#/campaigns'],['campaign','#/campaigns/cmp_1'],['whatsapp','#/whatsapp'],['automations','#/automations'],['messages','#/messages'],
 ['integrations','#/integrations'],['settings','#/settings']
];
const OVERFLOW=`(()=>{
  const vw=document.documentElement.clientWidth;
  const out={vw,docW:document.documentElement.scrollWidth,bodyW:document.body.scrollWidth,wide:[],scrollers:[],tiny:[],clipped:[]};
  const desc=e=>{const c=(e.className&&typeof e.className==='string')?'.'+e.className.trim().split(/\\s+/).slice(0,3).join('.'):'';return e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+c;};
  for(const e of document.querySelectorAll('body *')){
    const cs=getComputedStyle(e); if(cs.display==='none'||cs.visibility==='hidden')continue;
    const r=e.getBoundingClientRect(); if(!r.width&&!r.height)continue;
    if(e.closest('#side')||e.closest('#sidebg')||e.closest('.mod'))continue;   // menú lateral cerrado / modales se miden aparte
    if(cs.position==='fixed'&&r.right<=0)continue;
    if(r.right>vw+1||r.left<-1) out.wide.push({el:desc(e),l:Math.round(r.left),r:Math.round(r.right),w:Math.round(r.width)});
    if(e.scrollWidth>e.clientWidth+2&&/auto|scroll/.test(cs.overflowX)) out.scrollers.push({el:desc(e),sw:e.scrollWidth,cw:e.clientWidth});
    if(e.scrollWidth>e.clientWidth+2&&!/auto|scroll/.test(cs.overflowX)&&cs.overflowX==='hidden') out.clipped.push({el:desc(e),sw:e.scrollWidth,cw:e.clientWidth,txt:(e.textContent||'').trim().slice(0,40)});
    if(/^(button|a|select|input)$/.test(e.tagName.toLowerCase())&&r.width>0&&(r.height<26||r.width<26)&&cs.pointerEvents!=='none') out.tiny.push({el:desc(e),w:Math.round(r.width),h:Math.round(r.height),txt:(e.textContent||'').trim().slice(0,24)});
  }
  const dd=new Map();
  for(const k of ['wide','scrollers','clipped','tiny']){const seen=new Set();out[k]=out[k].filter(x=>{const s=x.el+'|'+(x.w||x.sw||'');if(seen.has(s))return false;seen.add(s);return true;}).slice(0,14);}
  return out;})()`;
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox','--font-render-hinting=none']});
  const report=[];
  const only=process.argv.slice(3);
  for(const v of VIEWS){
    const ctx=await b.newContext({viewport:{width:v.w,height:v.h},deviceScaleFactor:1,isMobile:v.m,hasTouch:v.m,userAgent:v.m?'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1':undefined});
    const p=await ctx.newPage();
    p.on('console',m=>{if(m.type()==='error')report.push({view:v.n,route:'console',err:m.text().slice(0,160)});});
    p.on('pageerror',e=>report.push({view:v.n,route:'pageerror',err:String(e).slice(0,160)}));
    await p.addInitScript(()=>localStorage.setItem('n_admin','open'));
    for(const [name,hash] of ROUTES){
      if(only.length&&!only.includes(name))continue;
      await p.goto(BASE+hash,{waitUntil:'domcontentloaded'});
      await p.waitForTimeout(700);
      try{await p.waitForFunction(()=>!document.querySelector('#main .loading'),{timeout:5000});}catch(e){}
      await p.waitForTimeout(450);
      // pestañas
      const tabs=await p.$$eval('.tabs button',bs=>bs.map(b=>b.textContent.trim()));
      const variants=tabs.length?tabs.map((t,i)=>({label:t,i})):[{label:'',i:-1}];
      for(const vt of variants){
        if(vt.i>=0){ await p.$$eval('.tabs button',(bs,i)=>bs[i].click(),vt.i); await p.waitForTimeout(600); }
        const o=await p.evaluate(OVERFLOW);
        const tag=name+(vt.label?'_'+vt.label.replace(/[^\wáéíóúñ]+/g,'').slice(0,12):'');
        const bad=o.docW>o.vw+1||o.wide.length||o.scrollers.length;
        report.push({view:v.n,route:tag,vw:o.vw,docW:o.docW,wide:o.wide,scrollers:o.scrollers,clipped:o.clipped,tiny:o.tiny,bad});
        if(bad||process.env.SHOT_ALL) await p.screenshot({path:path.join(OUT,`${tag}__${v.n}.png`),fullPage:true});
      }
    }
    await ctx.close();
  }
  await b.close();
  fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify(report,null,1));
  const bad=report.filter(r=>r.bad);
  console.log('checks',report.length,'con desborde',bad.length);
  const byRoute={};
  for(const r of bad){ (byRoute[r.route]=byRoute[r.route]||[]).push(r.view+' doc'+r.docW+'/'+r.vw+' '+(r.wide[0]?('wide:'+r.wide[0].el+'@'+r.wide[0].r):'')+(r.scrollers[0]?(' scroll:'+r.scrollers[0].el+' '+r.scrollers[0].sw+'>'+r.scrollers[0].cw):'')); }
  for(const k of Object.keys(byRoute)) console.log('•',k,'\n   ',byRoute[k].join('\n    '));
  const errs=report.filter(r=>r.err); if(errs.length) console.log('ERRORES JS:',[...new Set(errs.map(e=>e.err))].slice(0,10));
})().catch(e=>{console.error(e);process.exit(1)});
