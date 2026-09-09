# -*- coding: utf-8 -*-
"""Monta los 100 guiones completos a partir de guion_specs_a/b + guion_lib y escribe vue_study/out/scripts_final_b1..b20.json"""
import json,math,re,os
from guion_lib import REENC,CULPA,MECAN,PRUEBA,SOCIAL,CIERRE,claims_check
import guion_specs_a as A, guion_specs_b as B
BASE='/tmp/claude-0/-home-user/e4610181-73c9-5b97-9776-a971b4d99e53/scratchpad'
cat={c['n']:c for c in json.load(open(f'{BASE}/vue_study/in/catalogo100.json'))}
W={w['rank']:w for w in json.load(open(f'{BASE}/vue_study/in/winners_all.json'))}
TIT={}
for f in ['analysis_b1.json','analysis_b2.json','analysis_b3.json']:
    for a in json.load(open(f'{BASE}/vue_study/out/{f}')): TIT[a['rank']]=a.get('titulo_meta')
def title(rank):
    t=TIT.get(rank) or (W[rank]['titles'][0] if W.get(rank,{}).get('titles') else '')
    return f"{t} · {W[rank]['max_run']} d · {W[rank]['variants']} var." if rank in W else t
SPECS={}; SPECS.update(A.S); SPECS.update(B.S)
AV={'bea':"Bea (mujer 18–28)",'marisol':"Marisol (mujer 35–50)",'alex':"Álex (hombre 28–45)",'todos':"Todos (sin identidad explícita)"}
LAND={'ficha':"Ficha Nariz (pack 2 preseleccionado)",'adv':"Advertorial «no son puntos negros» → ficha",'duo':"Ficha Dúo Noche",'granos':"Ficha Granos"}
OFFER={'ficha':"Parche de hidrocoloide para la nariz: absorbe la grasa del poro mientras duermes, sin arrancar. Pack de 2 cajas 29,90 €, envío gratis desde España en 24–48 h y garantía de 60 días.",
       'adv':"Te lo explicamos en dos minutos: qué son de verdad, por qué vuelven siempre y qué hace el parche que las tiras no hacen. Envío desde España en 24–48 h y garantía de 60 días.",
       'duo':"Dúo Noche: parche de nariz para la noche y parches de granos para el día. 26,90 €, envío gratis desde España y garantía de 60 días.",
       'granos':"Parches de granos de hidrocoloide: finos, invisibles con base, absorben el grano sin tocarlo. Envío desde España en 24–48 h."}
TITLES={'ficha':["No son puntos negros. Se vacían, no se arrancan.","Absorbe mientras duermes. Sin arrancar.","Pack de 2 · 29,90 € · envío gratis"],
        'adv':["Por qué vuelven siempre (no son puntos negros)","Lo que nadie te cuenta de tu nariz","Filamentos, no puntos negros"],
        'duo':["Nariz de noche, granos de día","Dúo Noche · 26,90 € · envío gratis","Dos parches, dos usos, un pack"],
        'granos':["El parche de granos que no se nota","Absorbe el grano sin tocarlo","Parches de granos · envío 24–48 h"]}
CTA={'ficha':"Pack de 2 cajas · 29,90 € · envío gratis · garantía 60 días → ficha Nariz con el pack de 2 preseleccionado",
     'adv':"«Lee por qué vuelven siempre» → advertorial no-son-puntos-negros.html → ficha Nariz (pack de 2)",
     'duo':"Dúo Noche · 26,90 € · envío gratis · garantía 60 días → ficha Dúo Noche",
     'granos':"Parches de granos → ficha Granos"}
ATREZO=[("tira","1 tira de poros de farmacia (3 €)"),("macro","lente macro para móvil (8 €) o modo macro"),("contraluz|ventana","ventana con luz de mañana"),("time-lapse|reloj","móvil con time-lapse y lámpara fija"),("caja|pack","caja NOCTA y pack de 2"),("parche","parches NOCTA (1 nuevo + 2–3 usados)"),("maquillaje|base de|con base","base de maquillaje"),("coche","coche aparcado al sol"),("gimnasio|vestuario","vestuario/gimnasio (permiso del centro)"),("farmacia","bolsa de farmacia"),("presupuesto|recibo|calculadora|cálculo","cifras recreadas en pantalla (Canva/CapCut)"),("esquema|animación|dibujo","animación 2D simple (Canva/CapCut)"),("capturas|whatsapp","capturas de WhatsApp con permiso escrito"),("botes","botes de productos propios con precio"),("calle","permisos de imagen firmados"),("apósito","apósito hidrocoloide de farmacia (2 €)"),("toalla","toalla"),("manzana|aceite","manzana / plato con aceite"),("espejo","espejo con luz dura"),("pareja|novio|novia|hija|madre","segunda persona (pareja/familia)"),("sobre|buzón|etiqueta","sobre de envío NOCTA y etiqueta")]
TIEMPO=[("Estático","20 min (foto + Canva)"),("Carrusel","45 min (fotos + Canva)"),("UGC","45–60 min de grabación + 30 min de montaje"),("Macro","30 min de grabación + 1 noche de parche"),("Pantalla partida","1 noche de parche + 30 min de montaje"),("Texto en pantalla","30 min (CapCut/ffmpeg) + 1 noche de parche"),("Voz en off","45 min (voz + B-roll) + 1 noche de parche"),("Comparativa","45 min + 1 noche de parche"),("Entrevista","1–2 h en la calle + 1 h de montaje"),("POV","30 min + 1 noche de parche"),("Animación","1–2 h de animación (Canva/CapCut)")]
def words(s): return len(re.findall(r"[\wáéíóúüñÁÉÍÓÚÜÑ]+",s or ""))
def norm(s): return s.strip()
out_all={}
hooks_seen={}
for n in range(1,101):
    sp=SPECS[n]; c=cat[n]; hs=sp.get('hs',3)
    hook=sp['hook']; static=(sp['dur']==0)
    blocks=[dict(seg=hs,plano=hook[0],texto=hook[1],voz=hook[2],nota=("Imagen principal: la foto y el titular hacen todo el trabajo." if static else f"Gancho (0–{hs} s): texto grande en pantalla, decide la retención; variantes A/B/C abajo."))]
    for b in sp['beats']: blocks.append(dict(seg=b[0],plano=b[1],texto=b[2],voz=b[3],nota=b[4]))
    lib=[]
    if sp['r'] is not None: lib.append(REENC['todos'][sp['r']])
    if sp['c'] is not None: lib.append(CULPA[sp['c']])
    if sp['m'] is not None: lib.append(MECAN[sp['m']])
    if sp['p'] is not None: lib.append(PRUEBA[sp['p']])
    if sp['s'] is not None: lib.append(SOCIAL[sp['s']])
    if sp['cierre']: lib.append(CIERRE[sp['cierre']])
    for b in lib: blocks.append(dict(seg=b[0],plano=b[1],texto=b[2],voz=b[3],nota=b[4]))
    rev=[]
    allvoz=" ".join(b['voz'] for b in blocks if b['voz'])
    nw=words(allvoz)
    if static:
        guion=[]
        for i,b in enumerate(blocks):
            lab=("Tarjeta %d"%(i+1)) if 'Tarjeta' in b['plano'] else ("Imagen" if i==0 else ("CTA" if 'CTA' in b['plano'] or 'Botón' in b['plano'] else "Texto"))
            guion.append(dict(t=lab,plano=b['plano'],texto_pantalla=b['texto'],voz=b['voz'] or "—",nota=b['nota']))
        dur=0; rev.append("Pieza estática/carrusel: sin voz; el titular hace de gancho y el pie de foto de oferta.")
    else:
        natural=sum(b['seg'] for b in blocks)
        need=[]
        for b in blocks:
            wv=words(b['voz'])
            need.append(max(b['seg'], math.ceil(wv/3.3)) if wv else b['seg'])
        total_need=sum(need)
        if total_need>sp['dur']+5 and sp['s'] is not None:
            # quitar el bloque social (el menos necesario) para acercarse a la duración del catálogo
            idx=next(i for i,b in enumerate(blocks) if b['voz']==SOCIAL[sp['s']][3])
            rev.append(f"Se quita el bloque social ({SOCIAL[sp['s']][2]}) para no pasar de {sp['dur']+5} s; la razón del pack de 2 queda en el cierre.")
            blocks.pop(idx); need.pop(idx); total_need=sum(need); allvoz=" ".join(b['voz'] for b in blocks if b['voz']); nw=words(allvoz)
        target=max(sp['dur'],total_need)
        f=target/total_need
        segs=[max(1,int(round(x*f))) for x in need]
        diff=target-sum(segs)
        # ajuste de redondeo sobre el bloque más largo
        segs[max(range(len(segs)),key=lambda i:segs[i])]+=diff
        t=0; guion=[]
        for b,s_ in zip(blocks,segs):
            guion.append(dict(t=f"{t}–{t+s_} s",plano=b['plano'],texto_pantalla=b['texto'],voz=b['voz'] or "—",nota=b['nota'])); t+=s_
        dur=target
        rev.append(f"Duración: catálogo {sp['dur']} s; bloques {natural} s; voz {nw} palabras → {dur} s finales ({nw/dur:.1f} pal/s, máximo cómodo 3,3).".replace('.','‚',0).replace(f'{nw/dur:.1f}',f'{nw/dur:.1f}'.replace('.',',')))
        if target>sp['dur']: rev.append(f"Se alarga {target-sp['dur']} s para que la voz quepa sin acelerar; si hay que respetar {sp['dur']} s, recortar ~{max(1,nw-int(3.3*sp['dur']))} {'palabra' if max(1,nw-int(3.3*sp['dur']))==1 else 'palabras'} (empezar por el bloque social o el reencuadre).")
        if len(blocks)>7: rev.append(f"{len(blocks)} bloques: si retiene mal a los 10 s, fundir reencuadre y absolución.")
    # claims
    cc=[]; seen=set()
    for k in claims_check(allvoz+" "+" ".join(b['texto'] for b in blocks)):
        if k['afirmacion'] in seen: continue
        seen.add(k['afirmacion']); cc.append(k)
    if 'hidrocoloide' in (allvoz+" ".join(b['texto'] for b in blocks)).lower() and 'hidrocoloide' not in seen: cc.append(dict(afirmacion="hidrocoloide (material de apósitos)",estado="permitida",alternativa=""))
    bad=[k for k in cc if k['estado']=='cambiar']
    if not cc: cc.append(dict(afirmacion="sin claims de riesgo (no se promete curar, eliminar ni aval médico)",estado="permitida",alternativa=""))
    rev.append("Claims: %d a cambiar."%len(bad) if bad else "Claims: ninguno a cambiar (no cura, no elimina, sin aval médico, plazos honestos).")
    # prueba visual
    pv=None
    if sp['p'] is not None: pv=PRUEBA[sp['p']][1]+" — "+PRUEBA[sp['p']][2]
    else:
        for b in blocks:
            if re.search(r"contraluz|retir|parche usado|parches usados|parche a |mira el parche|puntos blancos|se llen|blanco|antes/después|antes y el después|nariz mate|lisa|liso|quita el parche|invisible|intacto|tras parche",b['plano'].lower()): pv=b['plano']; break
    if not pv: pv=("Imagen única: "+blocks[0]['plano']) if static else "Sin plano de parche usado: añadir 3 s de parche a contraluz antes del cierre (el plano más repetido de los 60 ganadores)."
    if not static and sp['p'] is None and not re.search(r"contraluz|retir|parche usado|parches usados|parche a |mira el parche|puntos blancos|se llen|blanco|antes/después|antes y el después|nariz mate|lisa|liso|quita el parche|invisible|intacto|tras parche",pv.lower()): rev.append("Prueba visual: falta parche usado; añadir el plano.")
    # hook checks
    hw=words(hook[2] or hook[1])
    rev.append(f"Gancho: {hw} palabras"+(" (≤ 20, bien)." if hw<=20 else " (> 20: acortar la voz del gancho)."))
    key=norm(hook[1]).lower()
    if key in hooks_seen: rev.append(f"Aviso: texto de gancho igual que el nº {hooks_seen[key]}; cambiar una palabra.")
    hooks_seen[key]=n
    # cta / copy
    cta=CTA[sp['land']]
    if sp['cierre']=='escasez': cta="Lote 1 · quedan pocas · "+cta
    if static: cta=blocks[-1]['texto']+" → "+LAND[sp['land']]
    hookline=hook[2] or hook[1]
    second=(REENC['todos'][sp['r']][3] if sp['r'] is not None else (sp['beats'][0][3] if sp['beats'] and sp['beats'][0][3] else ""))
    tp=[(hookline+" "+second).strip()+" "+OFFER[sp['land']], hook[1].rstrip('.')+". "+OFFER[sp['land']].split('.')[0]+"."]
    tt=[hook[1]] if len(hook[1])<=40 else []
    tt+=[x for x in TITLES[sp['land']] if x not in tt][:3]
    cm=dict(texto_principal=tp,titulares=tt[:4],descripcion="Envío 24–48 h desde España · Garantía 60 días · Pago seguro")
    # produccion
    planos=[]
    for b in blocks:
        p=b['plano'].split(';')[0].strip()
        if p and p not in planos: planos.append(p)
    text_all=(" ".join(b['plano']+" "+b['voz'] for b in blocks)).lower()
    atrezo=[v for k,v in ATREZO if re.search(k,text_all)]
    if not atrezo: atrezo=["móvil"]
    persona=AV[sp['av']]
    if 'POV' in c['formato'] or 'Texto' in c['formato'] or 'Estático' in c['formato']: persona+=" · sin cara (manos/nariz)"
    tiempo=next((v for k,v in TIEMPO if k.lower() in c['formato'].lower()),"45 min + 1 noche de parche")
    if n==54: tiempo="30 días de seguimiento (1 foto por semana) + 1 h de montaje"
    if n==52: tiempo="1 noche con 3 personas + 45 min de montaje"
    prod=dict(como=c['produccion'],planos_necesarios=planos,atrezo=atrezo,persona=persona,tiempo_estimado=tiempo)
    refs=[dict(rank=r,titulo=title(r),que_se_toma=q) for r,q in sp['refs']]
    hv=[dict(tipo=t,texto=x) for t,x in sp['hv']]
    concepto=f"{c['gancho']} — {c['estructura']}"
    out_all[n]=dict(n=n,nombre=c['nombre'],familia=c['familia'],prioridad=c['prioridad'],avatar=AV[sp['av']],landing=LAND[sp['land']],duracion_total_s=(dur if dur else "—"),
        referencias_vue=refs,concepto=concepto,guion=guion,hook_variantes=hv,prueba_visual=pv,cta=cta,copy_meta=cm,produccion=prod,claims_check=cc,por_que_convertira=sp['why'],revision=rev)
for b in range(1,21):
    json.dump([out_all[n] for n in range((b-1)*5+1,b*5+1)],open(f'{BASE}/vue_study/out/scripts_final_b{b}.json','w'),ensure_ascii=False,indent=1)
# resumen
import collections
ext=[(n,x['duracion_total_s'],SPECS[n]['dur']) for n,x in out_all.items() if x['duracion_total_s']!="—" and x['duracion_total_s']>SPECS[n]['dur']]
print('engine ok',len(out_all),'alargados',len(ext),ext[:40])
print('sobre 45 s:',[(n,x['duracion_total_s']) for n,x in out_all.items() if x['duracion_total_s']!='—' and x['duracion_total_s']>45])
print('claims a cambiar:',[(n,[k['afirmacion'] for k in x['claims_check'] if k['estado']=='cambiar']) for n,x in out_all.items() if any(k['estado']=='cambiar' for k in x['claims_check'])])
print('sin prueba:',[n for n,x in out_all.items() if 'Sin plano' in x['prueba_visual']])
print('avisos:',[(n,r) for n,x in out_all.items() for r in x['revision'] if r.startswith('Aviso') or '> 20' in r])
