#!/usr/bin/env python3
"""
Monta un anuncio NOCTA a partir de clips generados (uno por plano) + locuciones + subtítulos + cierre.
Uso: python3 producir.py brief.json salida.mp4
brief.json = {"w":720,"h":1280,"fps":24,
  "planos":[{"clip":"...mp4","seg":5,"vo":"...wav","texto":"subtítulo","tempo":1.05}, ...],
  "endcard":{"packshot":"...png","line1":"nocta","line2":"...","line3":"nocta.es","dur":2.5}}
Cada plano se recorta a `seg` segundos (o a la duración del clip si es menor); la locución empieza al inicio del plano.
Luego llama a brand/video/edit/montar_anuncio.py para la mezcla, subtítulos y cierre.
"""
import json, os, subprocess, sys, tempfile
HERE=os.path.dirname(os.path.abspath(__file__))
MONTAR=os.path.join(HERE,'..','brand','video','edit','montar_anuncio.py')
FFP='/tmp/claude-0/-home-user/e4610181-73c9-5b97-9776-a971b4d99e53/scratchpad/vue/ffpath.txt'
FF=open(FFP).read().strip() if os.path.exists(FFP) else 'ffmpeg'
def dur(f):
    out=subprocess.run([FF,'-i',f],capture_output=True,text=True).stderr
    import re; m=re.search(r'Duration: (\d+):(\d+):([\d.]+)',out); return int(m[1])*3600+int(m[2])*60+float(m[3])
def main(brief,out):
    B=json.load(open(brief)); w,h,fps=B['w'],B['h'],B.get('fps',24); tmp=tempfile.mkdtemp()
    enc=['-r',str(fps),'-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-an']
    parts=[]; t=0.0; vo=[]; subs=[]
    for i,p in enumerate(B['planos']):
        seg=min(p['seg'],dur(p['clip'])); f=os.path.join(tmp,f'p{i}.mp4')
        subprocess.run([FF,'-v','error','-y','-i',p['clip'],'-t',str(seg),'-vf',f'scale={w}:{h}']+enc+[f],check=True); parts.append(f)
        if p.get('vo'): vo.append(dict(file=p['vo'],start=round(t+0.1,2),tempo=p.get('tempo',1.0)))
        if p.get('texto'): subs.append(dict(t0=round(t+0.1,2),t1=round(t+seg,2),text=p['texto']))
        t+=seg
    lst=os.path.join(tmp,'l.txt'); open(lst,'w').write(''.join(f"file '{x}'\n" for x in parts))
    body=os.path.join(tmp,'body.mp4'); subprocess.run([FF,'-v','error','-y','-f','concat','-safe','0','-i',lst,'-f','lavfi','-i','anullsrc=r=48000:cl=stereo','-shortest','-c:v','copy','-c:a','aac',body],check=True)
    plan=dict(video=body,fps=fps,w=w,h=h,vo=vo,subs=subs,endcard=B.get('endcard'),ambient_db=0)
    pj=os.path.join(tmp,'plan.json'); json.dump(plan,open(pj,'w'),ensure_ascii=False)
    subprocess.run([sys.executable,MONTAR,pj,out],check=True); print('DURACIÓN cuerpo',round(t,1),'s →',out)
if __name__=='__main__': main(sys.argv[1],sys.argv[2])
