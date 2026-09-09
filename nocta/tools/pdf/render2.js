const { chromium } = require('playwright');
const base=process.argv[2], sub=process.argv[3];
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
  const p=await b.newPage();
  await p.goto('file://'+__dirname+'/'+base+'_cover.html',{waitUntil:'load'}); await p.evaluate(()=>document.fonts.ready);
  await p.pdf({path:__dirname+'/'+base+'_cover.pdf',format:'A4',printBackground:true,preferCSSPageSize:true,margin:{top:0,bottom:0,left:0,right:0}});
  await p.goto('file://'+__dirname+'/'+base+'_body.html',{waitUntil:'load'}); await p.evaluate(()=>document.fonts.ready);
  await p.pdf({path:__dirname+'/'+base+'_body.pdf',format:'A4',printBackground:true,preferCSSPageSize:true,displayHeaderFooter:true,
    headerTemplate:'<div style="width:100%;font-family:Inter,sans-serif;font-size:7pt;color:#8a8579;padding:0 15mm;display:flex;justify-content:space-between;letter-spacing:.12em;text-transform:uppercase"><span>NOCTA</span><span>'+sub+'</span></div>',
    footerTemplate:'<div style="width:100%;font-family:Inter,sans-serif;font-size:7pt;color:#8a8579;padding:0 15mm;display:flex;justify-content:space-between"><span>Confidencial · 9 sept 2026</span><span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span></div>',
    margin:{top:'16mm',bottom:'18mm',left:'15mm',right:'15mm'}});
  await b.close(); console.log('pdf ok');
})().catch(e=>{console.error(e);process.exit(1)});
