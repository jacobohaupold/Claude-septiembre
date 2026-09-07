# Versiona CSS/JS en todas las páginas (cache busting). Ejecutar antes de cada deploy.
import re,glob,time,os
os.chdir('/home/user/Claude-septiembre/nocta/web')
V=time.strftime('%Y%m%d%H%M')
for p in glob.glob('public/*.html'):
    s=open(p).read()
    s=re.sub(r'/assets/css/styles\.css(\?v=[^"]*)?"',f'/assets/css/styles.css?v={V}"',s)
    s=re.sub(r'/assets/js/(app|products)\.js(\?v=[^"]*)?"',lambda m:f'/assets/js/{m.group(1)}.js?v={V}"',s)
    open(p,'w').write(s)
print(V)
