# Versiona CSS/JS en todas las páginas (cache busting). Ejecutar antes de cada deploy.
# Uso: python3 stamp.py [directorio]  (por defecto public/)
import re,glob,time,os,sys
os.chdir('/home/user/Claude-septiembre/nocta/web')
D=sys.argv[1] if len(sys.argv)>1 else 'public'
V=time.strftime('%Y%m%d%H%M')
for p in glob.glob(os.path.join(D,'*.html'))+glob.glob(os.path.join(D,'admin','*.html')):
    s=open(p).read()
    s=re.sub(r'/assets/(css|js)/([a-z0-9-]+)\.(css|js)(\?v=[^"]*)?"',lambda m:f'/assets/{m.group(1)}/{m.group(2)}.{m.group(3)}?v={V}"',s)
    s=re.sub(r'/admin/([a-z0-9-]+)\.(css|js)(\?v=[^"]*)?"',lambda m:f'/admin/{m.group(1)}.{m.group(2)}?v={V}"',s)
    open(p,'w').write(s)
print(V)

# Genera netlify/functions/lib/products-data.js (ESM) desde public/assets/js/products.js para que las funciones compartan el catálogo completo.
src=open('public/assets/js/products.js').read()
i=src.find('window.NOCTA_PRODUCTS'); j=src.find('\n];',i)+3
body=src[i:j].replace('window.NOCTA_PRODUCTS =','export const BASE =').replace('window.NOCTA_PRODUCTS=','export const BASE =')
k=src.find('window.NOCTA_GIFTS'); l=src.find('\n]',k)+2 if k>=0 else -1
gifts=src[k:l].replace('window.NOCTA_GIFTS =','export const GIFTS =').replace('window.NOCTA_GIFTS=','export const GIFTS =') if k>=0 else 'export const GIFTS=[];'
m=src.find('window.NOCTA_SHIPPING'); n=src.find(';',m)+1 if m>=0 else -1
ship=src[m:n].replace('window.NOCTA_SHIPPING =','export const SHIPPING =').replace('window.NOCTA_SHIPPING=','export const SHIPPING =') if m>=0 else 'export const SHIPPING={base:3.9,freeFrom:30};'
os.makedirs('netlify/functions/lib',exist_ok=True)
open('netlify/functions/lib/products-data.js','w').write('// GENERADO por stamp.py desde public/assets/js/products.js. No editar a mano.\n'+body+'\n'+gifts+'\n'+ship+'\n')
print('products-data ok')

# Textos editables desde el CRM: recoge todos los data-cms de las páginas y guarda sus valores por defecto.
import html as _h
cms={}
for p in sorted(glob.glob('public/*.html')):
    t=open(p).read()
    for m in re.finditer(r'<([a-z0-9]+)[^>]*data-cms="([^"]+)"[^>]*>(.*?)</\1>',t,re.S):
        txt=re.sub(r'<[^>]+>','',m.group(3)); txt=_h.unescape(re.sub(r'\s+',' ',txt)).strip()
        cms.setdefault(m.group(2),{'page':os.path.basename(p),'text':txt})
import json as _j
open('public/admin/cms-defaults.json','w').write(_j.dumps(cms,ensure_ascii=False,indent=1))
print('cms defaults',len(cms))
