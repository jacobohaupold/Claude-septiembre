# -*- coding: utf-8 -*-
import json,glob,os,re
OUT='/tmp/claude-0/-home-user/e4610181-73c9-5b97-9776-a971b4d99e53/scratchpad/vue_study/out'
IN='/tmp/claude-0/-home-user/e4610181-73c9-5b97-9776-a971b4d99e53/scratchpad/vue_study/in'
W=json.load(open(f'{IN}/winners_all.json')); L=json.load(open(f'{IN}/losers.json'))
A=[]
for b in range(1,11):
    p=f'{OUT}/analysis_b{b}.json'
    if os.path.exists(p):
        try: A+=json.load(open(p))
        except Exception as e: print('bad',p,e)
A.sort(key=lambda x:x.get('rank',999)); byrank={a.get('rank'):a for a in A}
pb=open(f'{OUT}/playbook.md').read() if os.path.exists(f'{OUT}/playbook.md') else ''
pl=open(f'{OUT}/playbook_perdedores.md').read() if os.path.exists(f'{OUT}/playbook_perdedores.md') else ''
lang=open(f'{OUT}/playbook_lenguaje.md').read() if os.path.exists(f'{OUT}/playbook_lenguaje.md') else ''
def demote(md,levels=1):  # bajar niveles de encabezado para encajar en el documento
    return re.sub(r'^(#{1,5}) ',lambda m:'#'*min(6,len(m.group(1))+levels)+' ',md,flags=re.M)
def s(x): return str(x) if x is not None else ''
def li(x):
    if isinstance(x,list): return x
    return [x] if x else []
o=[]; w=o.append
w("# NOCTA — Estudio de los anuncios de Vue Skin: los 60 que más han funcionado, qué dicen, por qué venden y qué se copia\n")
w(f"**Versión 1.0 · 9 de septiembre de 2026.** Este estudio no se queda en los ganchos: lee, uno a uno, los 60 guiones de anuncio de Vue Skin que más han funcionado (según lo único que se puede medir desde fuera y que explica la sección 1), traduce cada uno, lo descompone segundo a segundo, explica por qué convence, qué objeciones resuelve, qué prueba enseña y qué señales indican que vendió; los contrasta con 20 guiones que Vue apagó en menos de una semana; y saca de todo ello el playbook con el que se han escrito los 100 guiones de NOCTA (documento aparte, `catalogo_100_anuncios.md`). Base: {len(A)} análisis completos generados a partir de las transcripciones de los vídeos (`../vue-skin-research/data/meta_ads_transcripts.json`) y de la Biblioteca de anuncios de Meta (`meta_ads_catalog.json`).\n")
w("## Índice\n")
for i,t in enumerate(["Cómo se sabe qué anuncio ha funcionado (y qué no se puede saber)","Ranking de los 60 guiones ganadores con sus métricas","Los 25 mejores, uno a uno: transcripción, estructura, por qué funciona, qué se copia","Los 35 siguientes, en compacto","Los 20 guiones que Vue apagó en una semana y por qué","El playbook NOCTA: lo que se aplica a los 100 guiones","Banco de lenguaje completo (inglés → español de España)"],1): w(f"{i}. {t}")
w("")
# 1
w("## 1. Cómo se sabe qué anuncio ha funcionado (y qué no se puede saber)\n")
w("La Biblioteca de anuncios de Meta no muestra gasto ni ventas por anuncio. Muestra tres cosas que, en una cuenta que gasta ≈ 1,8 M € y apaga el 34 % de sus anuncios en la primera semana, son la mejor aproximación posible a «convirtió»: **cuántos días estuvo activo** cada anuncio (un anunciante profesional no mantiene 200 días algo que no vende), **cuántas variantes** de texto y miniatura agrupó (solo se multiplica lo que funciona) y **cuántas veces se regrabó el mismo guion con otra persona** (solo se regraba lo que ha demostrado vender). Para cada guion se han sumado esas tres señales de todos los anuncios que lo usaron:\n")
w("```\npuntuación = días activos acumulados de todos los anuncios con ese guion\n           + 40 × ln(1 + variantes agrupadas)\n           + 15 × nº de vídeos distintos grabados con el mismo guion\n```\n")
w("Lo que NO se puede saber: el CPA, el ROAS o el gasto exacto de cada anuncio. Lo que sí: que los 60 guiones de la sección 2 acumulan entre 370 y 1.900 días de emisión cada uno, que el nº 1 se usó en 29 anuncios distintos con 16 grabaciones y 57 variantes, y que ningún guion de la lista de perdedores (sección 5) superó los 7 días en ninguno de sus anuncios. La transcripción es automática (Whisper): se han corregido las erratas evidentes (*poor strips* = pore strips, *view* = Vue).\n")
# 2 ranking
w("## 2. Ranking de los 60 guiones ganadores con sus métricas\n")
w("| # | Primeras palabras (inglés) | Anuncios | Vídeos | Días acum. | Días máx. | Variantes | Landing | Familias |")
w("|---:|---|---:|---:|---:|---:|---:|---|---|")
for r in W:
    w(f"| {r['rank']} | {r['text'][:80].replace('|','/')}… | {r['ads']} | {r['videos']} | {r['total_run']} | {r['max_run']} | {r['variants']} | {r['landing'][:22]} | {', '.join(f[:14] for f in r['fams'][:3])} |")
w("")
# 3 top 25 full
w("## 3. Los 25 mejores, uno a uno\n")
def block(a,full=True):
    m=a.get('metricas',{}) or {}
    w(f"### {a.get('rank')}. {s(a.get('titulo_meta') or '')} — «{s(a.get('gancho',{}).get('texto_es') if isinstance(a.get('gancho'),dict) else '')}»\n")
    w(f"**Métricas:** {m.get('anuncios','?')} anuncios · {m.get('videos','?')} grabaciones · {m.get('dias_totales','?')} días acumulados · máx. {m.get('dias_max','?')} días · {m.get('variantes','?')} variantes · landing {s(a.get('landing'))} · {m.get('primera_fecha','')} → {m.get('ultima_fecha','')} · {s(a.get('duracion_s'))} s\n")
    w(f"**Señales de conversión:** {s(a.get('senales_de_conversion'))}\n")
    if full:
        w("**Transcripción (inglés):** "+s(a.get('transcripcion_en'))+"\n")
        w("**Traducción (español de España):** "+s(a.get('traduccion_es'))+"\n")
        est=li(a.get('estructura'))
        if est:
            w("| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |"); w("|---|---|---|---|---|")
            for e in est:
                if isinstance(e,dict): w(f"| {s(e.get('seg_ini'))}–{s(e.get('seg_fin'))} | {s(e.get('bloque'))} | {s(e.get('dice')).replace('|','/')} | {s(e.get('pasa_en_pantalla')).replace('|','/')} | {s(e.get('funcion')).replace('|','/')} |")
            w("")
        g=a.get('gancho') or {}
        if isinstance(g,dict): w(f"**Gancho ({s(g.get('tipo'))}):** «{s(g.get('texto_en'))}» → «{s(g.get('texto_es'))}». {s(g.get('por_que_para_el_scroll'))}\n")
        w(f"**Reencuadre:** {s(a.get('reencuadre'))}\n"); w(f"**Mecanismo:** {s(a.get('mecanismo'))}\n")
        if li(a.get('prueba')): w("**Prueba:** "+" · ".join(s(x) if not isinstance(x,dict) else " ".join(s(v) for v in x.values()) for x in li(a.get('prueba')))+"\n")
        if li(a.get('objeciones_resueltas')): w("**Objeciones resueltas:** "+" · ".join(s(x) if not isinstance(x,dict) else " → ".join(s(v) for v in x.values()) for x in li(a.get('objeciones_resueltas')))+"\n")
        if li(a.get('disparadores_emocionales')): w("**Disparadores emocionales:** "+", ".join(s(x) if not isinstance(x,dict) else " ".join(s(v) for v in x.values()) for x in li(a.get('disparadores_emocionales')))+"\n")
        if li(a.get('tecnicas_persuasion')): w("**Técnicas:** "+" · ".join(s(x) if not isinstance(x,dict) else ": ".join(s(v) for v in x.values()) for x in li(a.get('tecnicas_persuasion')))+"\n")
        fr=li(a.get('frases_clave'))
        if fr:
            w("| Frase (EN) | Adaptación (ES) |"); w("|---|---|")
            for x in fr:
                if isinstance(x,dict): w(f"| {s(x.get('en')).replace('|','/')} | {s(x.get('es')).replace('|','/')} |")
            w("")
        w(f"**Oferta y cierre:** {s(a.get('oferta_cta'))}\n")
    w(f"**Por qué funciona:** {s(a.get('por_que_funciona'))}\n")
    if li(a.get('que_copiar_para_nocta')): w("**Qué se copia para NOCTA:** "+" · ".join(s(x) if not isinstance(x,dict) else " ".join(s(v) for v in x.values()) for x in li(a.get('que_copiar_para_nocta')))+"\n")
    if li(a.get('que_no_se_puede_decir_en_espana')): w("**Lo que no se puede decir en España y su alternativa:** "+" · ".join(s(x) if not isinstance(x,dict) else " → ".join(s(v) for v in x.values()) for x in li(a.get('que_no_se_puede_decir_en_espana')))+"\n")
    if full: w(f"**Adaptación a España:** {s(a.get('adaptacion_espana'))}\n")
for r in range(1,26):
    if r in byrank: block(byrank[r],True)
w("## 4. Los 35 siguientes, en compacto\n")
for r in range(26,61):
    if r in byrank: block(byrank[r],False)
# 5 losers
w("## 5. Los 20 guiones que Vue apagó en una semana y por qué\n")
w("| Anuncios | Días máx. | Landing | Primeras palabras |"); w("|---:|---:|---|---|")
for r in L: w(f"| {r['ads']} | {r['max_run']} | {r['landing'][:22]} | {r['text'][:110].replace('|','/')}… |")
w("")
if pl: w(demote(pl,1)+"\n")
# 6 playbook
w("## 6. El playbook NOCTA: lo que se aplica a los 100 guiones\n")
if pb: w(demote(pb,1)+"\n")
w("## 7. Banco de lenguaje completo (inglés → español de España)\n")
if lang: w(demote(lang,1)+"\n")
open('/home/user/Claude-septiembre/nocta/marketing/estudio_anuncios_vue.md','w').write("\n".join(o)+"\n")
print('estudio ok', len("\n".join(o)), 'analyses', len(A))
