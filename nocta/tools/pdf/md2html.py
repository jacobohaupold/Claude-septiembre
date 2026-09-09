import re,html,sys
src=open('/home/user/Claude-septiembre/nocta/NOCTA_DOCUMENTO_MAESTRO.md',encoding='utf-8').read().split('\n')

def inline(t):
    t=html.escape(t,quote=False)
    t=re.sub(r'`([^`]+)`',r'<code>\1</code>',t)
    t=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',t)
    t=re.sub(r'(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?!\w)',r'<i>\1</i>',t)
    t=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',r'<a href="\2">\1</a>',t)
    t=re.sub(r'(https?://[^\s<)]+)',r'<a href="\1">\1</a>',t)
    return t

out=[]; i=0; n=len(src); toc=[]; sec=0
def slug(s): return re.sub(r'[^a-z0-9]+','-',s.lower()).strip('-')
in_sections=False
while i<n:
    l=src[i]
    if l.startswith('```'):
        buf=[]; i+=1
        while i<n and not src[i].startswith('```'): buf.append(html.escape(src[i])); i+=1
        out.append('<pre>'+'\n'.join(buf)+'</pre>'); i+=1; continue
    if l.startswith('# '):
        i+=1; continue  # título en portada
    m=re.match(r'^(#{2,4}) (.*)',l)
    if m:
        lvl=len(m.group(1)); txt=m.group(2)
        if lvl==2:
            mm=re.match(r'^(\d+)\.\s+(.*)',txt)
            if mm:
                sec=int(mm.group(1)); out.append(f'</section><section class="sec{" brk" if sec in (1,7) else ""}" id="s{sec}"><div class="secnum">{sec:02d}</div><h2>{inline(mm.group(2))}</h2>')
                toc.append((sec,mm.group(2)))
            else:
                out.append(f'</section><section class="sec"><h2>{inline(txt)}</h2>')
        else:
            out.append(f'<h{lvl}>{inline(txt)}</h{lvl}>')
        i+=1; continue
    if l.startswith('|'):
        rows=[]
        while i<n and src[i].startswith('|'):
            rows.append([c.strip() for c in src[i].strip().strip('|').split('|')]); i+=1
        head=rows[0]; align=rows[1]; body=rows[2:]
        al=['r' if a.endswith(':') and not a.startswith(':') else 'l' for a in align]
        ncol=len(head)
        cls='tbl'+(' tbl--wide' if ncol>=7 else '')+(' tbl--x' if ncol>=9 else '')
        h='<table class="'+cls+'"><thead><tr>'+''.join(f'<th class="{al[k] if k<len(al) else "l"}">{inline(c)}</th>' for k,c in enumerate(head))+'</tr></thead><tbody>'
        for r in body:
            h+='<tr>'+''.join(f'<td class="{al[k] if k<len(al) else "l"}">{inline(c)}</td>' for k,c in enumerate(r))+'</tr>'
        out.append(h+'</tbody></table>'); continue
    if l.startswith('> '):
        out.append('<div class="callout">'+inline(l[2:])+'</div>'); i+=1; continue
    if re.match(r'^\d+\. ',l):
        items=[]
        while i<n and re.match(r'^\d+\. ',src[i]): items.append(re.sub(r'^\d+\. ','',src[i])); i+=1
        out.append('<ol>'+''.join(f'<li>{inline(x)}</li>' for x in items)+'</ol>'); continue
    if l.startswith('- '):
        items=[]
        while i<n and src[i].startswith('- '): items.append(src[i][2:]); i+=1
        out.append('<ul>'+''.join(f'<li>{inline(x)}</li>' for x in items)+'</ul>'); continue
    if l.strip()=='---': i+=1; continue
    if l.strip()=='': i+=1; continue
    # párrafo (puede continuar en líneas siguientes)
    buf=[l]; i+=1
    while i<n and src[i].strip() and not re.match(r'^(#|\||- |\d+\. |> |```|---)',src[i]): buf.append(src[i]); i+=1
    txt=' '.join(buf)
    if txt.startswith('*Documentos fuente'): out.append('<p class="src">'+inline(txt.strip('*'))+'</p>')
    else: out.append('<p>'+inline(txt)+'</p>')

body='\n'.join(out)
# quitar la sección "Índice" generada en markdown (la portada + TOC propia la sustituyen)
body=re.sub(r'</section><section class="sec"><h2>Índice</h2>.*?(?=</section><section class="sec[^"]*" id="s1")','',body,flags=re.S)
body=body.replace('</section>','',1)  # el primer cierre sobra
toc_html=''.join(f'<a class="toc__i" href="#s{k}"><span class="toc__n">{k:02d}</span><span class="toc__t">{html.escape(t)}</span></a>' for k,t in toc)
intro_end=body.find('<section class="sec brk" id="s1"')
intro=body[:intro_end]; rest=body[intro_end:]+'</section>'

css=open('style.css').read()
page=f'''<!doctype html><html lang="es"><head><meta charset="utf-8"><title>NOCTA — Documento maestro</title><style>{css}</style></head><body>
<section class="cover">
  <div class="cover__top"><div class="wordmark">NOCTA</div><div class="cover__lab">Documento maestro de negocio</div></div>
  <div class="cover__mid">
    <h1>Todo el negocio,<br>en un solo documento.</h1>
    <p class="cover__lead">Investigación de Vue Skin, catálogo y precios, proveedores, costes y márgenes, inversión, economía de cada anuncio, página de producto, marketing, legal, operaciones, roadmap y estado de todo lo pedido.</p>
  </div>
  <div class="cover__bot"><div>Versión 1.0 · 9 de septiembre de 2026</div><div>España · Confidencial</div></div>
</section>
<section class="tocpage">
  <div class="secnum">Índice</div>
  <div class="toc">{toc_html}</div>
  <div class="intro">{intro}</div>
</section>
{rest}
</body></html>'''
open('doc.html','w',encoding='utf-8').write(page)
cov=page.split('<section class="cover">')[1].split('</section>')[0]
open('cover.html','w',encoding='utf-8').write(f'<!doctype html><html lang="es"><head><meta charset="utf-8"><style>{css} @page{{size:A4;margin:0}} body{{background:#14213D}}</style></head><body><section class="cover">{cov}</section></body></html>')
body_only=page.replace('<section class="cover">'+cov+'</section>','')
open('body.html','w',encoding='utf-8').write(body_only)
print('html ok',len(page))
