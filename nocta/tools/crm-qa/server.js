const http=require('http'),fs=require('fs'),path=require('path'),url=require('url');
const F=require('./fixtures.js');
const ROOT=require('path').resolve(__dirname,'../../web/public');
const MIME={'.html':'text/html;charset=utf-8','.css':'text/css;charset=utf-8','.js':'text/javascript;charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.mp4':'video/mp4','.avif':'image/avif'};
const T={orders:F.orders,customers:F.customers,subscriptions:F.subscriptions,leads:F.leads,carts:F.carts,messages:F.messages,campaigns:F.campaigns,automations:F.automations,settings:F.settings,content:F.content,discounts:F.discounts,products:F.products_rows};
function j(res,o,code=200){const b=JSON.stringify(o);res.writeHead(code,{'content-type':'application/json','cache-control':'no-store'});res.end(b);}
function filterRows(name,q){
  let rows=(T[name]||[]).slice();
  const p=new URLSearchParams(q||'');
  for(const [k,v] of p){
    if(['select','order','limit','offset','on_conflict'].includes(k))continue;
    const m=/^(eq|neq|gt|gte|lt|lte|in|is|like|ilike|not\.is|not\.in)\.(.*)$/.exec(v);
    if(!m)continue; const [,op,val]=m;
    rows=rows.filter(r=>{const x=r[k];
      switch(op){case 'eq':return String(x)===val;case 'neq':return String(x)!==val;
        case 'in':return val.replace(/[()]/g,'').split(',').map(s=>s.replace(/^"|"$/g,'')).includes(String(x));
        case 'not.in':return !val.replace(/[()]/g,'').split(',').includes(String(x));
        case 'is':return val==='null'?(x==null):!!x;case 'not.is':return val==='null'?(x!=null):!x;
        case 'gte':return String(x)>=val;case 'lte':return String(x)<=val;case 'gt':return String(x)>val;case 'lt':return String(x)<val;
        case 'like':case 'ilike':return String(x||'').toLowerCase().includes(val.replace(/[%*]/g,'').toLowerCase());
        default:return true;}});
  }
  const ord=p.get('order'); if(ord){const [f,d]=ord.split('.');rows.sort((a,b)=>String(a[f]??'').localeCompare(String(b[f]??'')));if(d==='desc')rows.reverse();}
  const total=rows.length; const lim=Number(p.get('limit')||0), off=Number(p.get('offset')||0);
  if(lim)rows=rows.slice(off,off+lim);
  return {rows,total};
}
http.createServer((req,res)=>{
  const u=url.parse(req.url,true); let p=decodeURIComponent(u.pathname);
  if(p==='/api/catalog.js'||p==='/assets/js/products.js'){res.writeHead(200,{'content-type':'text/javascript;charset=utf-8'});return res.end(p==='/api/catalog.js'?'':F.PRODUCTS_JS);}
  if(p.startsWith('/api/admin/')){
    const rest=p.slice('/api/admin/'.length);
    if(rest==='me')return j(res,{ok:true,db:true,mail:true,site:'https://nocta-store.netlify.app'});
    if(rest==='login')return j(res,{token:'open'});
    if(rest==='stats')return j(res,F.statsFor(Number(u.query.days||14)));
    if(rest==='integrations')return j(res,F.integrations);
    if(rest.startsWith('r/'))return j(res,filterRows(rest.slice(2).split('?')[0],u.search?u.search.slice(1):''));
    if(rest.startsWith('export/')){res.writeHead(200,{'content-type':'text/csv'});return res.end('id,total\n');}
    if(rest.startsWith('a/')){
      const n=rest.slice(2); let body='';req.on('data',d=>body+=d);req.on('end',()=>{
        let b={};try{b=JSON.parse(body||'{}')}catch(e){}
        if(n==='campaign.count')return j(res,{count:318,segment:b.segment||'all'});
        if(n==='campaign.preview')return j(res,{html:'<h1>Vista previa</h1><p>Hola 🌙</p>',subject:'No son puntos negros'});
        if(n==='campaign.send')return j(res,{ok:true,sent:318});
        if(n==='whatsapp.templates')return j(res,{templates:[{name:'pedido_enviado',language:'es',status:'APPROVED',category:'UTILITY'},{name:'carrito_recuperacion',language:'es',status:'APPROVED',category:'MARKETING'},{name:'bienvenida_nocta',language:'es',status:'PENDING',category:'MARKETING'}]});
        if(n==='whatsapp.send')return j(res,{ok:true,id:'wamid.demo'});
        if(n==='stripe.status')return j(res,F.integrations.stripe);
        if(n==='stripe.methods')return j(res,{ok:true,methods:b.methods||[]});
        if(n==='stripe.oauth')return j(res,{url:'https://connect.stripe.com/oauth/authorize?demo=1'});
        if(n==='resend.domain')return j(res,{ok:true,domain:{name:b.name||'nocta.es',status:'pending',records:[{type:'TXT',name:'send',value:'v=spf1 include:amazonses.com ~all'},{type:'CNAME',name:'resend._domainkey',value:'resend.domainkey.u1.amazonses.com'},{type:'TXT',name:'_dmarc',value:'v=DMARC1; p=none;'}]}});
        if(n==='cron.run')return j(res,{ok:true,ran:['carts','winback','subs'],sent:3});
        if(n==='order.status'||n==='order.ship'||n==='order.refund'||n==='order.email')return j(res,{ok:true,order:F.orders[0]});
        return j(res,{ok:true});
      }); return;
    }
    return j(res,{error:'ruta'},404);
  }
  if(p==='/'||p.endsWith('/'))p+= 'index.html';
  const fp=path.join(ROOT,p);
  if(!fp.startsWith(ROOT)||!fs.existsSync(fp)||fs.statSync(fp).isDirectory()){res.writeHead(404);return res.end('404');}
  res.writeHead(200,{'content-type':MIME[path.extname(fp)]||'application/octet-stream','cache-control':'no-store'});
  fs.createReadStream(fp).pipe(res);
}).listen(8791,()=>console.log('crm mock on 8791'));
