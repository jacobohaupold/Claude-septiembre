# Versiona CSS/JS en todas las páginas (cache busting). Ejecutar antes de cada deploy.
# Uso: python3 stamp.py [directorio]  (por defecto public/)
import re,glob,time,os,sys
os.chdir('/home/user/Claude-septiembre/nocta/web')
D=sys.argv[1] if len(sys.argv)>1 else 'public'
V=time.strftime('%Y%m%d%H%M')
for p in glob.glob(os.path.join(D,'*.html')):
    s=open(p).read()
    s=re.sub(r'/assets/(css|js)/([a-z0-9-]+)\.(css|js)(\?v=[^"]*)?"',lambda m:f'/assets/{m.group(1)}/{m.group(2)}.{m.group(3)}?v={V}"',s)
    open(p,'w').write(s)
print(V)
