# -*- coding: utf-8 -*-
import json,os
OUT='/tmp/claude-0/-home-user/e4610181-73c9-5b97-9776-a971b4d99e53/scratchpad/vue_study/out'
IN='/tmp/claude-0/-home-user/e4610181-73c9-5b97-9776-a971b4d99e53/scratchpad/vue_study/in'
cat={c['n']:c for c in json.load(open(f'{IN}/catalogo100.json'))}
S={}; missing=[]
for b in range(1,21):
    p=f'{OUT}/scripts_final_b{b}.json'
    if not os.path.exists(p): p=f'{OUT}/scripts_b{b}.json'
    if not os.path.exists(p): missing.append(b); continue
    try:
        for x in json.load(open(p)): S[int(x.get('n'))]=x
    except Exception as e: print('bad',p,e); missing.append(b)
def s(x): return str(x) if x is not None else ''
def li(x): return x if isinstance(x,list) else ([x] if x else [])
o=[]; w=o.append
w("# NOCTA — Los 100 anuncios, con guion completo segundo a segundo\n")
w(f"**Versión 2.0 · 9 de septiembre de 2026.** Cada uno de los 100 conceptos del catálogo tiene ahora su guion completo, escrito aplicando el estudio de los 60 anuncios ganadores de Vue (`estudio_anuncios_vue.md`) y revisado por un segundo paso adversarial (tiempos, claims, naturalidad del español, prueba visual, diferenciación). Cada guion cita los anuncios ganadores de Vue en los que se apoya (por su número de ranking en el estudio) y qué se toma exactamente de cada uno. Guiones disponibles: {len(S)} de 100" + (f" (lotes pendientes: {missing})" if missing else "") + ".\n")
w("**Cómo leer cada ficha:** concepto → referencias de Vue → guion por bloques (tiempo, lo que se ve, texto en pantalla, voz) → variantes de gancho para el test A/B/C → prueba visual → CTA → copy para Meta → producción → comprobación de claims → por qué debería convertir. Todo en español de España oral. Los guiones de prioridad A son los de las 3 primeras semanas.\n")
fam=None
for n in range(1,101):
    c=cat[n]
    if c['familia']!=fam:
        fam=c['familia']; w(f"## {fam}\n")
    x=S.get(n)
    w(f"#### {n}. {c['nombre']} <span class=\"tag tag--{c['prioridad']}\">Prioridad {c['prioridad']}</span>\n")
    if not x:
        w(f"- **Gancho (0–3 s):** {c['gancho']}\n- **Formato:** {c['formato']} · {c['duracion']} · Avatar: {c['avatar']} · Landing: {c['landing']}\n- **Estructura:** {c['estructura']}\n- **Por qué:** {c['por_que']}\n- **Producción:** {c['produccion']}\n- *Guion completo pendiente.*\n"); continue
    w(f"- **Formato:** {c['formato']} · {s(x.get('duracion_total_s'))} s · Avatar: {s(x.get('avatar') or c['avatar'])} · Landing: {s(x.get('landing') or c['landing'])}")
    w(f"- **Concepto:** {s(x.get('concepto'))}")
    refs=li(x.get('referencias_vue'))
    if refs: w("- **Se apoya en Vue:** "+" · ".join(f"nº {s(r.get('rank'))} ({s(r.get('titulo'))[:40]}): {s(r.get('que_se_toma'))}" if isinstance(r,dict) else s(r) for r in refs))
    w("")
    g=li(x.get('guion'))
    if g:
        w("| Tiempo | Lo que se ve | Texto en pantalla | Voz | Nota |"); w("|---|---|---|---|---|")
        for bl in g:
            if isinstance(bl,dict): w(f"| {s(bl.get('t'))} | {s(bl.get('plano')).replace('|','/')} | {s(bl.get('texto_pantalla')).replace('|','/')} | {s(bl.get('voz')).replace('|','/')} | {s(bl.get('nota')).replace('|','/')} |")
        w("")
    hv=li(x.get('hook_variantes'))
    if hv: w("- **Ganchos alternativos para el test:** "+" · ".join((f"{s(h.get('tipo'))}: «{s(h.get('texto') or h.get('frase') or h.get('gancho') or '')}»" if isinstance(h,dict) else f"«{s(h)}»") for h in hv))
    w(f"- **Prueba visual:** {s(x.get('prueba_visual'))}")
    w(f"- **CTA:** {s(x.get('cta'))}")
    cm=x.get('copy_meta') or {}
    if isinstance(cm,dict):
        tp=li(cm.get('texto_principal')); tt=li(cm.get('titulares'))
        if tp: w("- **Texto principal (Meta):** "+" ‖ ".join(s(t) for t in tp))
        if tt: w("- **Titulares:** "+" · ".join(s(t) for t in tt)+(f" · Descripción: {s(cm.get('descripcion'))}" if cm.get('descripcion') else ""))
    pr=x.get('produccion') or {}
    if isinstance(pr,dict): w(f"- **Producción:** {s(pr.get('como'))} · Planos: {', '.join(s(p) for p in li(pr.get('planos_necesarios')))} · Atrezo: {', '.join(s(p) for p in li(pr.get('atrezo')))} · Persona: {s(pr.get('persona'))} · Tiempo: {s(pr.get('tiempo_estimado'))}")
    cc=li(x.get('claims_check'))
    if cc: w("- **Claims:** "+" · ".join((f"{s(k.get('afirmacion'))} → {s(k.get('estado'))}" + (f" ({s(k.get('alternativa'))})" if k.get('estado')!='permitida' and k.get('alternativa') else "")) if isinstance(k,dict) else s(k) for k in cc))
    w(f"- **Por qué convertirá:** {s(x.get('por_que_convertira'))}")
    rv=li(x.get('revision'))
    if rv: w("- **Revisión:** "+" · ".join(s(r) if not isinstance(r,dict) else " ".join(s(v) for v in r.values()) for r in rv))
    w("")
open('/home/user/Claude-septiembre/nocta/marketing/catalogo_100_anuncios.md','w').write("\n".join(o)+"\n")
print('guiones ok',len("\n".join(o)),'scripts',len(S),'missing',missing)
