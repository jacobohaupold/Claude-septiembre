import re,html,sys
out_base,title,subtitle,lead,*files=sys.argv[1:]
lines=[]
for k,fp in enumerate(files):
    src=open(fp,encoding='utf-8').read().split('\n')
    if k>0: src=['@@PART '+src[0][2:]]+src[1:]
    lines+=src+['']
src=lines
def inline(t):
    t=html.escape(t,quote=False)
    t=re.sub(r'&lt;span class="(tag tag--[ABC])"&gt;(.*?)&lt;/span&gt;',r'<span class="\1">\2</span>',t)
    t=re.sub(r'`([^`]+)`',r'<code>\1</code>',t)
    t=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',t)
    t=re.sub(r'(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?!\w)',r'<i>\1</i>',t)
    t=re.sub(r'(https?://[^\s<)]+)',r'<a href="\1">\1</a>',t)
    return t
out=[]; i=0; n=len(src); toc=[]; sec=0; part=1
while i<n:
    l=src[i]
    if l.startswith('@@PART '):
        part+=1; txt=l[7:]
        out.append(f'</section><section class="sec brk part"><div class="secnum">Parte {part}</div><h2 class="h2--part">{inline(txt.replace("NOCTA — ",""))}</h2>'); toc.append(('P%d'%part,txt.replace("NOCTA — ",""))); i+=1; continue
    if l.startswith('```'):
        buf=[]; i+=1
        while i<n and not src[i].startswith('```'): buf.append(html.escape(src[i])); i+=1
        out.append('<pre>'+'\n'.join(buf)+'</pre>'); i+=1; continue
    if l.startswith('# '): i+=1; continue
    m=re.match(r'^(#{2,4}) (.*)',l)
    if m:
        lvl=len(m.group(1)); txt=m.group(2)
        if lvl==2:
            mm=re.match(r'^(\d+)\.\s+(.*)',txt)
            if mm:
                sec=int(mm.group(1)); out.append(f'</section><section class="sec{" brk" if sec==1 else ""}" id="s{sec}"><div class="secnum">{sec:02d}</div><h2>{inline(mm.group(2))}</h2>'); toc.append((f'{sec:02d}',mm.group(2)))
            elif txt=='Índice': out.append('</section><section class="sec" id="indice"><h2>Índice</h2>')
            else: out.append(f'</section><section class="sec fam"><h2 class="h2--fam">{inline(txt)}</h2>'); toc.append(('·',txt))
        else: out.append(f'<h{lvl}>{inline(txt)}</h{lvl}>')
        i+=1; continue
    if l.startswith('|'):
        rows=[]
        while i<n and src[i].startswith('|'): rows.append([c.strip() for c in src[i].strip().strip('|').split('|')]); i+=1
        head=rows[0]; align=rows[1]; body=rows[2:]
        al=['r' if a.endswith(':') and not a.startswith(':') else 'l' for a in align]; ncol=len(head)
        cls='tbl'+(' tbl--wide' if ncol>=7 else '')+(' tbl--x' if ncol>=9 else '')
        h='<table class="'+cls+'"><thead><tr>'+''.join(f'<th class="{al[k] if k<len(al) else "l"}">{inline(c)}</th>' for k,c in enumerate(head))+'</tr></thead><tbody>'
        for r in body: h+='<tr>'+''.join(f'<td class="{al[k] if k<len(al) else "l"}">{inline(c)}</td>' for k,c in enumerate(r))+'</tr>'
        out.append(h+'</tbody></table>'); continue
    if l.startswith('> '): out.append('<div class="callout">'+inline(l[2:])+'</div>'); i+=1; continue
    if re.match(r'^\d+\. ',l):
        items=[]
        while i<n and re.match(r'^\d+\. ',src[i]): items.append(re.sub(r'^\d+\. ','',src[i])); i+=1
        out.append('<ol>'+''.join(f'<li>{inline(x)}</li>' for x in items)+'</ol>'); continue
    if l.startswith('- '):
        items=[]
        while i<n and src[i].startswith('- '): items.append(src[i][2:]); i+=1
        out.append('<ul>'+''.join(f'<li>{inline(x)}</li>' for x in items)+'</ul>'); continue
    if l.strip()=='---' or l.strip()=='': i+=1; continue
    buf=[l]; i+=1
    while i<n and src[i].strip() and not re.match(r'^(#|\||- |\d+\. |> |```|---|@@)',src[i]): buf.append(src[i]); i+=1
    txt=' '.join(buf)
    if txt.startswith('*Fuentes') or txt.startswith('*Documentos'): out.append('<p class="src">'+inline(txt.strip('*'))+'</p>')
    else: out.append('<p>'+inline(txt)+'</p>')
body='\n'.join(out)
body=re.sub(r'(<h4>.*?</h4>\s*<ul>.*?</ul>)',r'<div class="card">\1</div>',body,flags=re.S)
body=re.sub(r'</section><section class="sec" id="indice">.*?(?=</section><section class="sec brk" id="s1")','',body,flags=re.S)
body=body.replace('</section>','',1)
toc_html=''.join(f'<a class="toc__i"><span class="toc__n">{k}</span><span class="toc__t">{html.escape(t)}</span></a>' for k,t in toc if k!='·')
ie=body.find('<section class="sec brk" id="s1"'); intro=body[:ie]; rest=body[ie:]+'</section>'
css=open('style.css').read()+'''
.tag{display:inline-block;font-size:7pt;letter-spacing:.08em;text-transform:uppercase;padding:1.5pt 6pt;border-radius:999px;vertical-align:middle;margin-left:6pt;font-weight:600}
.tag--A{background:#14213D;color:#F3EFE6}.tag--B{background:#9FB3A1;color:#14213D}.tag--C{background:#E6E1D6;color:#5F5C55}
h4{font-size:10.5pt;margin:12pt 0 3pt;page-break-after:avoid}
.fam{margin-top:18pt}.h2--fam{font-size:15pt;border-bottom-width:1px;color:#576D5B}
.h2--part{font-size:24pt}
.card{page-break-inside:avoid;break-inside:avoid}
ul li{margin-bottom:2pt}
'''
page=f'''<!doctype html><html lang="es"><head><meta charset="utf-8"><title>{html.escape(title)}</title><style>{css}</style></head><body>
<section class="cover"><div class="cover__top"><div class="wordmark">NOCTA</div><div class="cover__lab">{html.escape(subtitle)}</div></div>
<div class="cover__mid"><h1>{title}</h1><p class="cover__lead">{html.escape(lead)}</p></div>
<div class="cover__bot"><div>Versión 1.0 · 9 de septiembre de 2026</div><div>España · Confidencial</div></div></section>
<section class="tocpage"><div class="secnum">Índice</div><div class="toc">{toc_html}</div><div class="intro">{intro}</div></section>
{rest}</body></html>'''
cov=page.split('<section class="cover">')[1].split('</section>')[0]
open(out_base+'_cover.html','w',encoding='utf-8').write(f'<!doctype html><html lang="es"><head><meta charset="utf-8"><style>{css} @page{{size:A4;margin:0}} body{{background:#14213D}}</style></head><body><section class="cover">{cov}</section></body></html>')
open(out_base+'_body.html','w',encoding='utf-8').write(page.replace('<section class="cover">'+cov+'</section>',''))
print('html ok')
