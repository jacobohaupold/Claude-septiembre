# -*- coding: utf-8 -*-
"""Modelo bootstrap NOCTA: proyección bottom-up desde el embudo de anuncios, con escenarios, umbrales y comprobaciones.
Escribe nocta/finanzas/MODELO_BOOTSTRAP.md, nocta/finanzas/modelo_bootstrap_nocta.xlsx (fórmulas vivas) y un JSON con resultados."""
import json, math
IVA=0.21; PAY_PCT=0.015; PAY_FIX=0.25; SHIP_GROSS=3.90; SHIP=SHIP_GROSS/1.21; SHIP_CHARGE=3.90; FREE_FROM=30.0; PACK_GROSS=0.35; PACK=PACK_GROSS/1.21; RET=0.02
COST_NOSE=2.90; COST_SPOT=1.60  # variante A del estudio, netos de IVA (el IVA de importación se recupera)
REO_NOSE=2.07; REO_SPOT=1.20    # coste neto por caja en la reposición (1.000 parches + caja impresa a 0,43 $)
LAND=0.85  # clics que llegan a cargar la ficha (rebote técnico/cancelaciones)
FIXED=dict(dominio=1.0, packlink=0.0, herramientas=0.0)  # €/mes; Netlify/Supabase/Resend en capa gratuita; Packlink plan gratuito
FIXED_M=sum(FIXED.values())
# Ofertas: (nombre, precio con IVA sin envío, coste producto, cajas nariz, cajas granos, mix %)
OFFERS=[("1 caja Nariz + envío 3,90 €",16.95,COST_NOSE,1,0,0.20),
        ("Dúo Noche (Nariz + Granos)",26.90,COST_NOSE+COST_SPOT,1,1,0.20),
        ("2 cajas Nariz",29.90,2*COST_NOSE,2,0,0.45),
        ("3 cajas Nariz",39.90,3*COST_NOSE,3,0,0.10),
        ("Mes completo (2 Nariz + 1 Granos)",42.90,2*COST_NOSE+COST_SPOT,2,1,0.05)]
assert abs(sum(o[5] for o in OFFERS)-1)<1e-9
def econ(price,cogs):
    charge = SHIP_CHARGE if price<FREE_FROM else 0.0
    gross = price+charge                     # lo que paga el cliente (IVA incl.)
    net = gross/(1+IVA)                      # base imponible
    vat_out = gross-net
    pay = gross*PAY_PCT+PAY_FIX
    ret = net*RET
    contrib = net-cogs-pay-SHIP-PACK-ret
    return dict(gross=gross,net=net,vat=vat_out,pay=pay,ret=ret,contrib=contrib)
E=[econ(o[1],o[2]) for o in OFFERS]
AOV=sum(o[5]*e['gross'] for o,e in zip(OFFERS,E)); NET=sum(o[5]*e['net'] for o,e in zip(OFFERS,E))
CONTRIB=sum(o[5]*e['contrib'] for o,e in zip(OFFERS,E)); VAT_PER=sum(o[5]*e['vat'] for o,e in zip(OFFERS,E))
COGS_PER=sum(o[5]*o[2] for o in OFFERS); PAY_PER=sum(o[5]*e['pay'] for o,e in zip(OFFERS,E)); RET_PER=sum(o[5]*e['ret'] for o,e in zip(OFFERS,E))
NOSE_PER=sum(o[5]*o[3] for o in OFFERS); SPOT_PER=sum(o[5]*o[4] for o in OFFERS)
SHIP_PER=SHIP+PACK
# Escenarios: CPM, CTR, CVR por mes (0..12), recompra a 60 días de no-suscriptores, captación popup y conversión email
SCEN={
 "Pesimista": dict(cpm=9.0, ctr=0.008, cvr=[0.012,0.014,0.016,0.018,0.020,0.020,0.020,0.020,0.020,0.020,0.020,0.020,0.020], repeat=0.08, lead=0.04, leadcvr=0.02),
 "Base":      dict(cpm=8.0, ctr=0.010, cvr=[0.018,0.022,0.026,0.030,0.032,0.033,0.033,0.033,0.033,0.033,0.033,0.033,0.033], repeat=0.12, lead=0.05, leadcvr=0.03),
 "Optimista": dict(cpm=7.5, ctr=0.015, cvr=[0.022,0.028,0.034,0.040,0.044,0.045,0.045,0.045,0.045,0.045,0.045,0.045,0.045], repeat=0.18, lead=0.06, leadcvr=0.04),
}
CAP=[1200]*6+[1500]*7
STOCK0=dict(nose=125, spot=40)   # variante A
def run(sc, months=13):
    cpm,ctr=sc['cpm'],sc['ctr']; cpc=cpm/1000/ctr
    rows=[]; spend=225.0; cash=1000.0-600.0  # tras el pedido piloto (variante A) quedan 400 €; la aportación del mes 0 ya está dentro
    stock_n, stock_s = STOCK0['nose'], STOCK0['spot']; val_n, val_s = stock_n*COST_NOSE, stock_s*COST_SPOT
    leads=0; prev_paid_orders=[]; aport=0; tot=dict(aport=1000.0); stopped=False
    for m in range(months):
        cvr=sc['cvr'][m]
        imps=spend/cpm*1000; clicks=imps*ctr; visits=clicks*LAND
        paid=visits*cvr
        # pedidos no pagados: recompra a 60 días de pedidos de hace 2 meses + leads del popup que compran
        rep = sc['repeat']*(prev_paid_orders[-2] if len(prev_paid_orders)>=2 else 0)
        new_leads = visits*sc['lead']; lead_orders = new_leads*sc['leadcvr']
        orders = paid+rep+lead_orders
        # stock
        need_n=orders*NOSE_PER; need_s=orders*SPOT_PER
        reorder_cost=0.0
        if stock_n-need_n < 60:
            units=max(1000, math.ceil((need_n*2.5)/125)*125*8); boxes=units/8
            reorder_cost += boxes*REO_NOSE; stock_n += boxes; val_n += boxes*REO_NOSE
        if stock_s-need_s < 20:
            sheets=max(60, math.ceil(need_s*2.5*1.5)); boxes_s=sheets/1.5
            reorder_cost += boxes_s*REO_SPOT; stock_s += boxes_s; val_s += boxes_s*REO_SPOT
        # coste medio ponderado del stock consumido
        uc_n = val_n/stock_n if stock_n>0 else COST_NOSE; uc_s = val_s/stock_s if stock_s>0 else COST_SPOT
        cogs = need_n*uc_n + need_s*uc_s
        val_n -= need_n*uc_n; val_s -= need_s*uc_s; stock_n-=need_n; stock_s-=need_s
        revenue=orders*AOV; net=orders*NET; vat=orders*VAT_PER
        pay=orders*PAY_PER; ship=orders*SHIP_PER; ret=orders*RET_PER
        contrib=net-cogs-pay-ship-ret
        result=contrib-spend-FIXED_M
        cpa=spend/paid if paid>0 else float('inf'); roas=(paid*AOV)/spend if spend>0 else 0
        # caja: cobros netos de Stripe (gross - pay) menos ads, fijos, reposición, IVA trimestral (mes 3,6,9,12 se liquida el trimestre anterior)
        vat_q = 0.0
        if m in (3,6,9,12):
            vat_q = sum(r['vat'] for r in rows[-3:]) - sum(r['iva_soportado'] for r in rows[-3:])
        iva_sop = reorder_cost*IVA + ship*IVA  # IVA soportado: importación de la reposición (pagado en aduana) y etiquetas/sobres
        aport = 0.0 if stopped else (500.0 if (m>=1 and rows and rows[-1]['result']<500) else 0.0)
        if m>0: tot['aport']+=aport
        cash += aport + (revenue-pay) - spend - FIXED_M - reorder_cost*(1+IVA) - ship*(1+IVA) - vat_q - ret
        rows.append(dict(m=m,stopped=stopped,uc_n=uc_n,stock_val=val_n+val_s,spend=spend,imps=imps,clicks=clicks,visits=visits,cvr=cvr,paid=paid,rep=rep,lead_orders=lead_orders,orders=orders,
                         revenue=revenue,net=net,vat=vat,cogs=cogs,pay=pay,ship=ship,ret=ret,contrib=contrib,fixed=FIXED_M,result=result,cpa=cpa,cpc=cpc,roas=roas,
                         reorder=reorder_cost,vat_q=vat_q,iva_soportado=iva_sop,aport=aport,cash=cash,stock_n=stock_n,stock_s=stock_s))
        prev_paid_orders.append(paid)
        # presupuesto del mes siguiente: regla del plan + regla de parada (mes 3: si el CPA sigue por encima de la contribución, se para)
        if m==3 and cpa>CONTRIB: stopped=True
        if stopped: spend=0.0; continue
        half=contrib*0.5; nxt=half+(500.0 if result<500 else 0.0)
        spend=min(CAP[min(m+1,12)], max(spend if m>0 else 0, nxt))
        spend=min(spend, max(0.0, cash+ (500.0 if result<500 else 0.0)))
    return rows
RES={k:run(v) for k,v in SCEN.items()}
# ---------- umbrales
CPCs=[(cpm,ctr,cpm/1000/ctr) for cpm in (6,7.5,8,9,12) for ctr in (0.006,0.008,0.01,0.015,0.02)]
def min_cvr(cpc,contrib): return cpc/(LAND*contrib)
f=lambda x: "—" if (isinstance(x,float) and not math.isfinite(x)) else (f"{x:,.2f}").replace(",","X").replace(".",",").replace("X",".")
i0=lambda x: (f"{int(round(x)):,}").replace(",",".")
pc=lambda x: (f"{x*100:.2f} %").replace(".",",")
pc1=lambda x: (f"{x*100:.1f} %").replace(".",",")
o=[]; w=o.append
w("# NOCTA — Modelo bootstrap: proyección exacta desde el embudo de anuncios, umbrales mínimos y comprobación matemática\n")
w("**Versión 1.0 · 9 de septiembre de 2026.** Este modelo sustituye a la proyección aproximada del plan. Está construido de abajo arriba: cada euro de anuncios se convierte en impresiones (CPM), clics (CTR), visitas a la ficha (85 % de los clics cargan la página), pedidos (CVR), y cada pedido en una mezcla de ofertas con su precio, su coste de producto, su envío, su Stripe, sus devoluciones y su IVA. De ahí salen ingresos, contribución, resultado, IVA a ingresar, reposición de stock y caja, mes a mes, en tres escenarios. Todas las fórmulas están en la sección 7 y el mismo modelo está en `finanzas/modelo_bootstrap_nocta.xlsx` con fórmulas vivas para que lo audites cambiando cualquier celda azul. Sección 8: las comprobaciones que se han hecho y el resultado.\n")
w("> Lo que este modelo **no** es: una promesa. Es la consecuencia aritmética de unos supuestos declarados (CPM, CTR, CVR, mix de ofertas). Si los supuestos cambian, cambia el resultado. Lo importante no es la cifra del mes 12; es la sección 4 (umbrales): qué CVR necesitas para que cada euro de anuncios no pierda dinero, y a partir de qué ventas mensuales el negocio cubre todo lo que gasta.\n")
w("## Índice\n")
for i,t in enumerate(["Supuestos, uno a uno, con su origen","Economía exacta de cada pedido y del pedido medio","Embudo de anuncios: de euros a pedidos","Umbrales mínimos: CVR mínima, ventas mínimas y ROAS mínimo","Proyección a 12 meses en tres escenarios (ingresos, costes, resultado, IVA, stock, caja)","Sensibilidad: qué pasa si el CPC o la CVR se mueven","Fórmulas del modelo","Comprobación matemática (qué se ha verificado y cómo)"],1): w(f"{i}. {t}")
w("")
# 1 supuestos
w("## 1. Supuestos, uno a uno, con su origen\n")
w("| Supuesto | Valor | Origen | Cómo afecta |")
w("|---|---|---|---|")
for r in [("IVA","21 %","Ley 37/1992","Se cobra al cliente y se ingresa a Hacienda cada trimestre; no es ingreso"),
("Stripe (tarjeta UE, Apple Pay)","1,5 % + 0,25 € por cobro","Tarifa estándar Stripe España","Coste variable por pedido"),
("Envío al cliente (etiqueta)","3,90 € con IVA = 3,22 € netos por pedido","Packlink PRO, sobre < 1 kg Península (Estudio §7)","Coste por pedido; el cliente paga 3,90 € si el pedido es < 30 €"),
("Sobre acolchado + tarjeta","0,35 € con IVA = 0,29 € netos","Estudio §7","Coste por pedido"),
("Devoluciones y reembolsos","2 % del neto","Estimación (el sector: 2–3 %)","Coste por pedido"),
("Coste de producto, caja de Nariz","2,90 € netos (piloto, variante A; 3,4 € con el IVA de importación, que se recupera)","Estudio §9","El más sensible tras el CPA; baja a 2,07 € en la reposición con caja impresa"),
("Coste de producto, caja de Granos","1,60 € netos (1,20 € en la reposición)","Estudio §9",""),
("Mix de ofertas (qué compra la gente)","2 cajas 45 % · Dúo 20 % · 1 caja 20 % · 3 cajas 10 % · Mes completo 5 %","Supuesto de diseño: la ficha preselecciona el pack de 2","Determina el ticket medio y la contribución media"),
("Clics que cargan la ficha","85 %","Estándar (rebote técnico, cierres antes de cargar)","Reduce las visitas útiles"),
("CPM Meta España","Pesimista 9 € · Base 8 € · Optimista 7,5 €","Vue trabaja con 6–9 €; cuenta nueva paga más","Coste por 1.000 impresiones"),
("CTR saliente","0,8 % · 1,0 % · 1,5 %","Vue: 1,2 % de media con creatividades maduras","Con el CPM, fija el coste por clic"),
("CVR de la ficha (compras / visitas)","Rampa: Pesimista 1,2 → 2,0 % · Base 1,8 → 3,3 % · Optimista 2,2 → 4,5 % (mes 0 → mes 5)","Vue convierte al 4–7 % en su ficha con anuncios que ya han vendido antes del clic; una ficha nueva empieza por debajo","La variable que más pesa"),
("Recompra a 60 días (sin suscripción)","8 % · 12 % · 18 % de los pedidos pagados de hace 2 meses","Conservador frente al 30 %/90 d del modelo grande","Pedidos que no cuestan anuncios"),
("Popup: leads y conversión","4–6 % de visitas dejan email; 2–4 % de ellos compran","Estándar DTC en el primer mes","Pedidos que no cuestan anuncios"),
("Costes fijos","1 €/mes (dominio). Netlify, Supabase, Resend, WhatsApp y Packlink en capa gratuita","Stack actual","Prácticamente cero: el negocio solo paga lo que vende"),
("Presupuesto de anuncios","225 € el mes 0; después 50 % de la contribución del mes anterior + 500 € de aportación mientras el resultado del mes no llegue a 500 €; nunca se baja el presupuesto que funciona; techo 1.200 €/mes (meses 1–5) y 1.500 € (6–12); nunca más de lo que hay en caja","Regla del plan (Parte 1, §1 y §8)","Determina la escala"),
("Regla de parada","Si en el mes 3 el CPA sigue por encima de la contribución por pedido, se dejan de comprar anuncios y de aportar dinero desde el mes 4 (se vende el stock que queda por email/orgánico, que el modelo no cuenta)","Regla del plan (Parte 1, §1)","Limita la pérdida máxima del test"),
("Stock inicial","125 cajas de nariz + 40 de granos (600 €, ya pagados con los 1.000 €)","Estudio §9, variante A","Se repone cuando quedan < 60 cajas, mínimo 1.000 parches, a ≈ 2,1 €/caja con caja impresa"),
("Caja inicial","400 € (1.000 € − 600 € del piloto)","Parte 1 §4","Los anuncios del mes 0 (225 €) salen de aquí"),
("IVA","Se ingresa trimestralmente (meses 3, 6, 9, 12): IVA repercutido de las ventas menos IVA soportado de reposiciones y etiquetas","Régimen general","Salida de caja real que muchos planes olvidan")]:
    w("| "+" | ".join(r)+" |")
w("")
# 2 economía por pedido
w("## 2. Economía exacta de cada pedido y del pedido medio\n")
w("Precio con IVA; el cliente paga 3,90 € de envío si el pedido es menor de 30 €. Neto = cobrado / 1,21. Contribución = neto − producto (neto) − Stripe − etiqueta 3,22 − sobre 0,29 − devoluciones 2 % del neto. Todo neto de IVA: el IVA cobrado se ingresa a Hacienda y el IVA pagado en compras se recupera.\n")
w("| Oferta | Mix | Cobrado (IVA incl.) | Neto | IVA | Producto | Stripe | Envío + sobre | Devol. | **Contribución** | % s/neto |")
w("|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|")
for o_,e in zip(OFFERS,E):
    w(f"| {o_[0]} | {pc1(o_[5])} | {f(e['gross'])} | {f(e['net'])} | {f(e['vat'])} | {f(o_[2])} | {f(e['pay'])} | {f(SHIP+PACK)} | {f(e['ret'])} | **{f(e['contrib'])} €** | {pc1(e['contrib']/e['net'])} |")
w(f"| **Pedido medio (ponderado por el mix)** | 100 % | **{f(AOV)}** | {f(NET)} | {f(VAT_PER)} | {f(COGS_PER)} | {f(PAY_PER)} | {f(SHIP_PER)} | {f(RET_PER)} | **{f(CONTRIB)} €** | {pc1(CONTRIB/NET)} |")
w("")
w(f"Lectura: el pedido medio cobra **{f(AOV)} €** (de los que {f(VAT_PER)} € son IVA que se devuelve a Hacienda), deja **{f(CONTRIB)} €** antes de anuncios y consume {f(NOSE_PER)} cajas de nariz y {f(SPOT_PER)} de granos. **Cada pedido pagado con anuncios es rentable si su CPA es menor de {f(CONTRIB)} €**; con la regla de margen de seguridad del 30 %, el CPA objetivo es {f(0.7*CONTRIB)} €.\n")
# 3 embudo
w("## 3. Embudo de anuncios: de euros a pedidos\n")
w("Con 100 € de anuncios, en cada escenario:\n")
w("| Escenario | CPM | CTR | CPC | Impresiones | Clics | Visitas (85 %) | CVR mes 0 | Pedidos mes 0 | CPA mes 0 | CVR mes 5+ | Pedidos mes 5+ | CPA mes 5+ |")
w("|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|")
for k,sc in SCEN.items():
    cpc=sc['cpm']/1000/sc['ctr']; imps=100/sc['cpm']*1000; cl=imps*sc['ctr']; vi=cl*LAND
    p0=vi*sc['cvr'][0]; p5=vi*sc['cvr'][5]
    w(f"| {k} | {f(sc['cpm'])} € | {pc1(sc['ctr'])} | {f(cpc)} € | {i0(imps)} | {i0(cl)} | {i0(vi)} | {pc1(sc['cvr'][0])} | {f(p0)} | {f(100/p0)} € | {pc1(sc['cvr'][5])} | {f(p5)} | {f(100/p5)} € |")
w("")
w(f"Identidad que hay que tener en la cabeza: **CPA = CPC ÷ (0,85 × CVR)**. Con CPC 0,80 € y CVR 3,3 % el CPA es {f(0.8/(0.85*0.033))} €; con CVR 1,8 %, {f(0.8/(0.85*0.018))} €. La contribución media es {f(CONTRIB)} €: por eso en el escenario base ni el mes 0 ni el mes 3 cubren la contribución, y solo el optimista lo consigue.\n")
# 4 umbrales
w("## 4. Umbrales mínimos: CVR mínima, ventas mínimas y ROAS mínimo\n")
w("### 4.1 CVR mínima por CPC (para que un pedido pagado no pierda dinero)\n")
w(f"CVR mínima = CPC ÷ (0,85 × contribución). Con la contribución del pedido medio ({f(CONTRIB)} €):\n")
w("| CTR \\ CPM | 6 € | 7,5 € | 8 € | 9 € | 12 € |")
w("|---|---:|---:|---:|---:|---:|")
for ctr in (0.006,0.008,0.01,0.015,0.02):
    cells=[]
    for cpm in (6,7.5,8,9,12):
        cpc=cpm/1000/ctr; cells.append(f"{pc(min_cvr(cpc,CONTRIB))} (CPC {f(cpc)})")
    w(f"| {pc1(ctr)} | "+" | ".join(cells)+" |")
w("")
w("Y por oferta, con CPC 0,80 € (base): lo que tiene que convertir la ficha según a qué lleve el anuncio:\n")
w("| Oferta | Contribución | CPA máximo | CVR mínima (CPC 0,80) | CVR objetivo (30 % de margen) |")
w("|---|---:|---:|---:|---:|")
for o_,e in zip(OFFERS,E):
    w(f"| {o_[0]} | {f(e['contrib'])} € | {f(e['contrib'])} € | {pc(min_cvr(0.8,e['contrib']))} | {pc(min_cvr(0.8,0.7*e['contrib']))} |")
w(f"| **Pedido medio** | {f(CONTRIB)} € | {f(CONTRIB)} € | **{pc(min_cvr(0.8,CONTRIB))}** | **{pc(min_cvr(0.8,0.7*CONTRIB))}** |")
w("")
w("### 4.2 Ventas mínimas por mes según lo que gastes en anuncios\n")
w(f"Para que un mes no pierda dinero: contribución ≥ anuncios + fijos. Como cada pedido deja {f(CONTRIB)} € y cobra {f(AOV)} €, la contribución es el {pc1(CONTRIB/AOV)} de lo cobrado. Ventas mínimas = (anuncios + fijos) ÷ {f(CONTRIB/AOV)}. Aquí no cuentan los pedidos de recompra ni de email (que existen y ayudan): es el umbral duro solo con pedidos pagados.\n")
w("| Anuncios/mes | Ventas mínimas (cobrado) | Pedidos mínimos | ROAS mínimo (cobrado/anuncios) | CPA máximo | Con CPC 0,80 €: CVR mínima |")
w("|---:|---:|---:|---:|---:|---:|")
for S in (225,500,800,1000,1200,1500):
    rmin=(S+FIXED_M)/(CONTRIB/AOV); omin=rmin/AOV
    w(f"| {S} € | {f(rmin)} € | {f(omin)} | {f(rmin/S)}x | {f(S/omin)} € | {pc(min_cvr(0.8,S/omin))} |")
w("")
w(f"Lectura: el ROAS mínimo es siempre ≈ {f(AOV/CONTRIB)}x sobre lo cobrado (con IVA) porque los fijos son casi cero. Cualquier anuncio con ROAS de plataforma por debajo de {f(AOV/CONTRIB)}x pierde dinero aunque «venda».\n")
# 5 proyección
w("## 5. Proyección a 12 meses en tres escenarios\n")
w("Cada fila es un mes. Pedidos = pagados (anuncios) + recompra + email. Resultado = contribución − anuncios − fijos (antes de tu tiempo y de la legalización). Caja = lo que hay en el banco al final del mes, después de ads, reposiciones, IVA trimestral y aportaciones.\n")
tot_all={}
for k,rows in RES.items():
    sc=SCEN[k]
    w(f"### 5.{list(SCEN).index(k)+1} Escenario {k} (CPM {f(sc['cpm'])} €, CTR {pc1(sc['ctr'])}, CPC {f(rows[0]['cpc'])} €, CVR {pc1(sc['cvr'][0])} → {pc1(sc['cvr'][5])})\n")
    w("**Embudo y resultado**\n")
    w("| Mes | Anuncios | Impr. | Clics | CVR | Ped. pagados | Recompra + email | Pedidos | CPA | ROAS | Cobrado | Neto | Contribución | Resultado |")
    w("|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|")
    T=dict(spend=0,orders=0,paid=0,revenue=0,net=0,contrib=0,result=0,vat_q=0,reorder=0,aport=0)
    for r in rows:
        for kk in T: T[kk]+=r[kk]
        w(f"| {r['m']} | {i0(r['spend'])} | {i0(r['imps'])} | {i0(r['clicks'])} | {pc1(r['cvr'])} | {f(r['paid'])} | {f(r['rep']+r['lead_orders'])} | {f(r['orders'])} | {f(r['cpa'])} | {f(r['roas'])}x | {i0(r['revenue'])} | {i0(r['net'])} | {i0(r['contrib'])} | **{i0(r['result'])}** |")
    T['aport']+=1000
    w(f"| **Total** | **{i0(T['spend'])}** | | | | {f(T['paid'])} | | **{f(T['orders'])}** | {f(T['spend']/T['paid'])} | {f(T['paid']*AOV/T['spend'])}x | **{i0(T['revenue'])}** | {i0(T['net'])} | {i0(T['contrib'])} | **{i0(T['result'])}** |")
    w("")
    w("**Costes, IVA, stock y caja**\n")
    w("| Mes | Producto | Envío + sobre | Stripe + devol. | IVA repercutido | IVA soportado | IVA trimestre (pagado) | Reposición (neto) | Aportación | Caja fin de mes | Stock nariz (cajas) | Stock granos (cajas) |")
    w("|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|")
    for r in rows:
        w(f"| {r['m']} | {i0(r['cogs'])} | {i0(r['ship'])} | {i0(r['pay']+r['ret'])} | {i0(r['vat'])} | {i0(r['iva_soportado'])} | {i0(r['vat_q'])} | {i0(r['reorder'])} | {i0(r['aport'] if r['m']>0 else 1000)} | **{i0(r['cash'])}** | {i0(r['stock_n'])} | {i0(r['stock_s'])} |")
    w(f"| **Total** | {i0(sum(r['cogs'] for r in rows))} | {i0(sum(r['ship'] for r in rows))} | {i0(sum(r['pay']+r['ret'] for r in rows))} | {i0(sum(r['vat'] for r in rows))} | {i0(sum(r['iva_soportado'] for r in rows))} | {i0(T['vat_q'])} | {i0(T['reorder'])} | **{i0(T['aport'])}** | | | |")
    w("")
    tot_all[k]=T
    la=[r for r in rows if r['spend']>0][-1]
    w(f"Lectura del escenario {k}: {i0(T['orders'])} pedidos y {i0(T['revenue'])} € cobrados en 13 meses con {i0(T['spend'])} € de anuncios; resultado acumulado {i0(T['result'])} € con {i0(T['aport'])} € aportados en total. En el último mes con anuncios (mes {la['m']}): {f(la['orders'])} pedidos, {i0(la['revenue'])} € cobrados, CPA {f(la['cpa'])} € frente a {f(CONTRIB)} € de contribución, y {i0(la['result'])} € de resultado. Caja final {i0(rows[-1]['cash'])} €.\n")
# comparativa
w("### 5.4 Resumen comparado\n")
w("| Indicador | Pesimista | Base | Optimista |")
w("|---|---:|---:|---:|")
def g(k,key,agg='sum'): 
    rows=RES[k]; return sum(r[key] for r in rows) if agg=='sum' else rows[-1][key]
def last_active(k): return [r for r in RES[k] if r['spend']>0][-1]
for lab,fn in [("Anuncios comprados en total",lambda k:i0(g(k,'spend'))),("Meses con anuncios",lambda k:str(len([r for r in RES[k] if r['spend']>0]))+(" (parada en el mes 3)" if any(r['stopped'] for r in RES[k]) else "")),("Pedidos en total (13 meses)",lambda k:i0(g(k,'orders'))),("Cobrado en total (IVA incl.)",lambda k:i0(g(k,'revenue'))),("Resultado acumulado (antes de tu tiempo)",lambda k:i0(g(k,'result'))),("Aportaciones totales (incluidos los 1.000 € iniciales)",lambda k:i0(1000+g(k,'aport'))),("Último mes con anuncios: pedidos",lambda k:f(last_active(k)['orders'])),("Último mes con anuncios: cobrado",lambda k:i0(last_active(k)['revenue'])),("Último mes con anuncios: CPA",lambda k:f(last_active(k)['cpa'])),("Último mes con anuncios: resultado",lambda k:i0(last_active(k)['result'])),("Caja al final del mes 12",lambda k:i0(RES[k][-1]['cash']))]:
    w(f"| {lab} | "+" | ".join(fn(k) for k in SCEN)+" |")
w("")
first_pos={k:next((r['m'] for r in RES[k] if r['result']>0 and r['spend']>0),None) for k in SCEN}
w("Primer mes con resultado positivo: "+" · ".join(f"{k}: {('mes '+str(v)) if v is not None else 'ninguno en 13 meses'}" for k,v in first_pos.items())+".\n")
STP={k:next((r['m'] for r in RES[k] if r['stopped']),None) for k in SCEN}
w(f"**Lo que dice el modelo con franqueza:** en el pesimista (CPC 1,13 € y una ficha que no pasa del 2 %) y en el base (CPC 0,80 €, CVR 3,3 %) el CPA del mes 3 sigue por encima de la contribución ({f(RES['Pesimista'][3]['cpa'])} € y {f(RES['Base'][3]['cpa'])} € frente a {f(CONTRIB)} €), así que la regla de parada actúa: desde el mes 4 no se compran más anuncios ni se aporta más dinero. El test habrá costado {i0(1000+sum(r['aport'] for r in RES['Base']))} € de aportaciones en el base con una pérdida acumulada de {i0(-sum(r['result'] for r in RES['Base']))} € (queda stock y ≈ {i0(RES['Base'][-1]['cash'])} € en caja). En el optimista, que exige CTR 1,5 % y CVR 4,5 % (lo que consigue Vue con creatividades probadas), el negocio es rentable desde el mes {next(r['m'] for r in RES['Optimista'] if r['result']>0)} y lo que limita es el techo de anuncios, no la rentabilidad. **Traducción: el negocio no es «rentable desde 0» por diseño; es rentable desde 0 solo si los anuncios rinden al nivel de Vue. El plan sirve para averiguarlo gastando como máximo {i0(1000+sum(r['aport'] for r in RES['Base']))} €.**\n")
# 6 sensibilidad
w("## 6. Sensibilidad: qué pasa si el CPC o la CVR se mueven\n")
w(f"Resultado mensual (contribución − anuncios − fijos) con **1.000 € de anuncios**, solo pedidos pagados, contribución media {f(CONTRIB)} € por pedido. Verde mental: > 0.\n")
w("| CVR \\ CPC | 0,40 € | 0,53 € | 0,80 € | 1,00 € | 1,13 € | 1,50 € |")
w("|---|---:|---:|---:|---:|---:|---:|")
for cvr in (0.015,0.02,0.025,0.03,0.035,0.04,0.05):
    cells=[]
    for cpc in (0.40,0.53,0.80,1.00,1.13,1.50):
        orders=1000/cpc*LAND*cvr; res=orders*CONTRIB-1000-FIXED_M; cells.append(f"{i0(res)} € ({f(orders)} ped.)")
    w(f"| {pc1(cvr)} | "+" | ".join(cells)+" |")
w("")
w("Cómo usar la tabla: mide en Meta tu CPC real y en el panel `/admin` tu CVR real de la ficha (pedidos ÷ visitas). Busca la casilla. Si es negativa, no escales: arregla el anuncio (CPC) o la ficha (CVR). Cada décima de CVR vale más que cualquier negociación con el proveedor.\n")
# 7 fórmulas
w("## 7. Fórmulas del modelo\n")
w("```")
for l in ["Impresiones_m   = Anuncios_m / CPM × 1000",
"Clics_m         = Impresiones_m × CTR",
"Visitas_m       = Clics_m × 0,85",
"PedidosPagados_m= Visitas_m × CVR_m",
"CPA_m           = Anuncios_m / PedidosPagados_m  = CPC / (0,85 × CVR_m)",
"Recompra_m      = Recompra% × PedidosPagados_(m−2)",
"PedidosEmail_m  = Visitas_m × Leads% × ConvLeads%",
"Pedidos_m       = PedidosPagados_m + Recompra_m + PedidosEmail_m",
"Cobrado_m       = Pedidos_m × TicketMedio      (TicketMedio = Σ mix_i × (precio_i + envío_i si precio_i < 30))",
"Neto_m          = Cobrado_m / 1,21 ;  IVA_m = Cobrado_m − Neto_m",
"Contribución_m  = Neto_m − Producto_m (coste medio del stock) − Stripe_m − Pedidos_m × (3,22 + 0,29) − 2 % × Neto_m",
"Resultado_m     = Contribución_m − Anuncios_m − Fijos",
"ROAS_m          = PedidosPagados_m × TicketMedio / Anuncios_m",
"Anuncios_(m+1)  = min(Techo, max(Anuncios_m, 0,5 × Contribución_m + Aportación_m), Caja_m + Aportación_m)",
"Aportación_m    = 500 si Resultado_(m−1) < 500, si no 0   (m ≥ 1)",
"IVA_trimestre   = Σ IVA repercutido (3 meses) − Σ IVA soportado (reposición, etiquetas)   pagado en los meses 3, 6, 9, 12",
"Caja_m          = Caja_(m−1) + Aportación_m + (Cobrado_m − Stripe_m) − Anuncios_m − Fijos − Reposición_m − IVA_trimestre − Devoluciones_m",
"Stock_m         = Stock_(m−1) + Reposición_uds − Pedidos_m × cajas por pedido ;  reponer si Stock < 60 cajas (mín. 1.000 parches)",
"Umbral:  CVR_mín = CPC / (0,85 × Contribución por pedido) ;  Ventas_mín = (Anuncios + Fijos) / (Contribución / Cobrado) ;  ROAS_mín = Cobrado / Contribución"]:
    w(l)
w("```")
w("")
# 8 comprobación (filled after xlsx check)
w("## 8. Comprobación matemática (qué se ha verificado y cómo)\n")
w("@@CHECKS@@\n")
open("/home/user/Claude-septiembre/nocta/finanzas/MODELO_BOOTSTRAP.md","w").write("\n".join(o)+"\n")
json.dump(dict(AOV=AOV,NET=NET,CONTRIB=CONTRIB,VAT=VAT_PER,COGS=COGS_PER,NOSE_PER=NOSE_PER,SPOT_PER=SPOT_PER,offers=[dict(name=o_[0],price=o_[1],cogs=o_[2],mix=o_[5],**e) for o_,e in zip(OFFERS,E)],
               scen={k:[{kk:(vv if not isinstance(vv,float) or math.isfinite(vv) else None) for kk,vv in r.items()} for r in rows] for k,rows in RES.items()},SCEN=SCEN,CAP=CAP,LAND=LAND,FIXED=FIXED_M),
          open("/tmp/claude-0/-home-user/e4610181-73c9-5b97-9776-a971b4d99e53/scratchpad/model.json","w"),ensure_ascii=False,indent=1)
print("model ok; AOV",round(AOV,2),"NET",round(NET,2),"CONTRIB",round(CONTRIB,2),"first positive",first_pos)
for k,rows in RES.items():
    print(k, "spend",[int(r['spend']) for r in rows]); print(k,"orders",[round(r['orders'],1) for r in rows]); print(k,"result",[int(r['result']) for r in rows]); print(k,"cash",[int(r['cash']) for r in rows]); print(k,"stock",[int(r['stock_n']) for r in rows],"reorder",[int(r['reorder']) for r in rows])

# ===================== §4.3 compras por 1.000 impresiones + combinaciones CTR/CVR =====================
extra=[]; w2=extra.append
w2("### 4.3 El umbral en una sola cifra: compras por 1.000 impresiones\n")
w2(f"Como CPA = CPM ÷ (compras por 1.000 impresiones), un anuncio es rentable cuando **compras por 1.000 impresiones ≥ CPM ÷ contribución**. Con CPM 8 € y contribución {f(CONTRIB)} €: **≥ {f(8/CONTRIB)} compras por cada 1.000 impresiones** (0,7 con CPM 12 € en Navidad; 0,37 con CPM 6 €). Compras por 1.000 impresiones = 1.000 × CTR × 0,85 × CVR. Estas son las combinaciones que lo cumplen con CPM 8 €:\n")
w2("| CTR \\ CVR | 2 % | 3 % | 4 % | 5 % | 6 % | 7 % |")
w2("|---|---:|---:|---:|---:|---:|---:|")
for ctr in (0.006,0.008,0.01,0.012,0.015,0.02,0.03):
    cells=[]
    for cvr in (0.02,0.03,0.04,0.05,0.06,0.07):
        k=1000*ctr*LAND*cvr; cpa=8/k; cells.append(f"{f(k)} → CPA {f(cpa)} € {'✔' if cpa<=CONTRIB else '✘'}")
    w2(f"| {pc1(ctr)} | "+" | ".join(cells)+" |")
w2("")
w2(f"Lectura: con CTR 1 % (cuenta nueva) hace falta una ficha que convierta al **6 %**; con CTR 1,5 % basta el 4 %; con CTR 2 % el 3 %. Vue está en CTR 1,2–2 % y CVR 4–7 %. **Ese es el listón: el negocio solo es rentable con anuncios al nivel de Vue.** Por eso el 90 % del esfuerzo va a creatividades (CTR) y a la ficha (CVR), y por eso el test de 90 días sirve para una sola pregunta: ¿llegamos a 0,5 compras por 1.000 impresiones?\n")
md=open("/home/user/Claude-septiembre/nocta/finanzas/MODELO_BOOTSTRAP.md").read()
md=md.replace("### 4.2 Ventas mínimas por mes según lo que gastes en anuncios\n","\n".join(extra)+"\n### 4.2 Ventas mínimas por mes según lo que gastes en anuncios\n")
md=md.replace("### 4.2 Ventas","### 4.4 Ventas") if False else md
open("/home/user/Claude-septiembre/nocta/finanzas/MODELO_BOOTSTRAP.md","w").write(md)

# ===================== Excel con fórmulas vivas =====================
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter
wb=Workbook(); P=wb.active; P.title="Supuestos"
blue=Font(color="1F4E9E"); bold=Font(bold=True); fill=PatternFill("solid",fgColor="F3EFE6")
params=[("Escenario (1=Pesimista, 2=Base, 3=Optimista)",2,"scen"),("IVA",IVA,"iva"),("Stripe %",PAY_PCT,"pay_pct"),("Stripe fijo €",PAY_FIX,"pay_fix"),
("Etiqueta envío neto €",SHIP,"ship"),("Sobre neto €",PACK,"pack"),("Envío cobrado al cliente €",SHIP_CHARGE,"ship_charge"),("Envío gratis desde €",FREE_FROM,"free_from"),("Devoluciones %",RET,"ret"),
("Coste nariz piloto neto €",COST_NOSE,"c_nose"),("Coste granos piloto neto €",COST_SPOT,"c_spot"),("Coste nariz reposición neto €",REO_NOSE,"r_nose"),("Coste granos reposición neto €",REO_SPOT,"r_spot"),
("Clics que cargan la ficha",LAND,"land"),("Fijos €/mes",FIXED_M,"fixed"),("Anuncios mes 0 €",225,"spend0"),("Caja inicial tras piloto €",400,"cash0"),("Stock nariz inicial (cajas)",STOCK0['nose'],"st_n0"),("Stock granos inicial (cajas)",STOCK0['spot'],"st_s0"),
("Aportación mensual €",500,"aport"),("Umbral de resultado para dejar de aportar €",500,"aport_lim"),("Reinversión de la contribución",0.5,"reinv"),("Techo anuncios meses 1–5 €",1200,"cap1"),("Techo anuncios meses 6–12 €",1500,"cap2"),
("CPM pesimista",SCEN['Pesimista']['cpm'],"cpm1"),("CPM base",SCEN['Base']['cpm'],"cpm2"),("CPM optimista",SCEN['Optimista']['cpm'],"cpm3"),
("CTR pesimista",SCEN['Pesimista']['ctr'],"ctr1"),("CTR base",SCEN['Base']['ctr'],"ctr2"),("CTR optimista",SCEN['Optimista']['ctr'],"ctr3"),
("Recompra 60 d pesimista",SCEN['Pesimista']['repeat'],"rep1"),("Recompra 60 d base",SCEN['Base']['repeat'],"rep2"),("Recompra 60 d optimista",SCEN['Optimista']['repeat'],"rep3"),
("Leads popup pesimista",SCEN['Pesimista']['lead'],"lead1"),("Leads popup base",SCEN['Base']['lead'],"lead2"),("Leads popup optimista",SCEN['Optimista']['lead'],"lead3"),
("Conversión leads pesimista",SCEN['Pesimista']['leadcvr'],"lcv1"),("Conversión leads base",SCEN['Base']['leadcvr'],"lcv2"),("Conversión leads optimista",SCEN['Optimista']['leadcvr'],"lcv3")]
P.append(["Parámetro","Valor","Nombre"]); 
for i,(lab,val,name) in enumerate(params, start=2):
    P.append([lab,val,name]); P.cell(i,2).font=blue
    wb.defined_names.add(__import__('openpyxl').workbook.defined_name.DefinedName(name, attr_text=f"Supuestos!$B${i}"))
P.column_dimensions['A'].width=46; P.column_dimensions['B'].width=12
# CVR por mes y escenario
P.append([]); P.append(["Mes","CVR pesimista","CVR base","CVR optimista"]); r0=P.max_row
for m in range(13):
    P.append([m,SCEN['Pesimista']['cvr'][m],SCEN['Base']['cvr'][m],SCEN['Optimista']['cvr'][m]])
    for c in (2,3,4): P.cell(P.max_row,c).font=blue
CVR_FIRST=r0+1  # fila del mes 0
# Ofertas
P.append([]); P.append(["Oferta","Precio","Coste producto","Cajas nariz","Cajas granos","Mix","Cobrado","Neto","Stripe","Contribución"]); r1=P.max_row
for i,(nm,pr,cg,bn,bs,mx) in enumerate(OFFERS):
    r=P.max_row+1
    P.append([nm,pr,cg,bn,bs,mx,f"=B{r}+IF(B{r}<free_from,ship_charge,0)",f"=G{r}/(1+iva)",f"=G{r}*pay_pct+pay_fix",f"=H{r}-C{r}-I{r}-ship-pack-H{r}*ret"])
    for c in (2,3,4,5,6): P.cell(r,c).font=blue
rO=r1+1; rE=P.max_row
P.append(["Pedido medio",None,f"=SUMPRODUCT(C{rO}:C{rE},F{rO}:F{rE})",f"=SUMPRODUCT(D{rO}:D{rE},F{rO}:F{rE})",f"=SUMPRODUCT(E{rO}:E{rE},F{rO}:F{rE})",f"=SUM(F{rO}:F{rE})",f"=SUMPRODUCT(G{rO}:G{rE},F{rO}:F{rE})",f"=SUMPRODUCT(H{rO}:H{rE},F{rO}:F{rE})",f"=SUMPRODUCT(I{rO}:I{rE},F{rO}:F{rE})",f"=SUMPRODUCT(J{rO}:J{rE},F{rO}:F{rE})"])
rA=P.max_row
for name,col in [("aov","G"),("net_avg","H"),("pay_avg","I"),("nose_per","D"),("spot_per","E"),("contrib_avg","J")]:
    wb.defined_names.add(__import__('openpyxl').workbook.defined_name.DefinedName(name, attr_text=f"Supuestos!${col}${rA}"))
# Modelo
M=wb.create_sheet("Modelo")
H=["Mes","Anuncios","CPM","CTR","CPC","Impresiones","Clics","Visitas","CVR","Pedidos pagados","Recompra","Pedidos email","Pedidos","Necesidad nariz","Necesidad granos","Reposición nariz (cajas)","Reposición granos (cajas)","Coste reposición","Stock nariz tras repo","Valor nariz tras repo","Coste unit. nariz","Stock granos tras repo","Valor granos tras repo","Coste unit. granos","Stock nariz fin","Valor nariz fin","Stock granos fin","Valor granos fin","Cobrado","Neto","IVA repercutido","Producto","Stripe","Envío+sobre","Devoluciones","Contribución","Fijos","Resultado","CPA","ROAS","IVA soportado","IVA trimestre","Aportación","Caja fin"]
M.append(H)
for c in range(1,len(H)+1): M.cell(1,c).font=bold; M.cell(1,c).fill=fill; M.cell(1,c).alignment=Alignment(wrap_text=True)
col={h:get_column_letter(i+1) for i,h in enumerate(H)}
def C(h,r): return f"{col[h]}{r}"
for m in range(13):
    r=m+2; p=r-1
    cvr_row=CVR_FIRST+m
    row={}
    row["Mes"]=m
    row["CPM"]="=CHOOSE(scen,cpm1,cpm2,cpm3)"; row["CTR"]="=CHOOSE(scen,ctr1,ctr2,ctr3)"; row["CPC"]=f"={C('CPM',r)}/1000/{C('CTR',r)}"
    row["CVR"]=f"=CHOOSE(scen,Supuestos!B{cvr_row},Supuestos!C{cvr_row},Supuestos!D{cvr_row})"
    if m==0: row["Aportación"]=0; row["Anuncios"]="=spend0"
    else:
        stop = f"({C('CPA',5)}>contrib_avg)" if m>=4 else "FALSE()"
        row["Aportación"]=f"=IF({stop},0,IF({C('Resultado',p)}<aport_lim,aport,0))"
        cap="cap1" if m<6 else "cap2"
        row["Anuncios"]=f"=IF({stop},0,MIN({cap},MAX({C('Anuncios',p)},reinv*{C('Contribución',p)}+{C('Aportación',r)}),MAX(0,{C('Caja fin',p)}+{C('Aportación',r)})))"
    row["Impresiones"]=f"={C('Anuncios',r)}/{C('CPM',r)}*1000"; row["Clics"]=f"={C('Impresiones',r)}*{C('CTR',r)}"; row["Visitas"]=f"={C('Clics',r)}*land"
    row["Pedidos pagados"]=f"={C('Visitas',r)}*{C('CVR',r)}"
    row["Recompra"]=f"=CHOOSE(scen,rep1,rep2,rep3)*{C('Pedidos pagados',r-2)}" if m>=2 else 0
    row["Pedidos email"]=f"={C('Visitas',r)}*CHOOSE(scen,lead1,lead2,lead3)*CHOOSE(scen,lcv1,lcv2,lcv3)"
    row["Pedidos"]=f"={C('Pedidos pagados',r)}+{C('Recompra',r)}+{C('Pedidos email',r)}"
    row["Necesidad nariz"]=f"={C('Pedidos',r)}*nose_per"; row["Necesidad granos"]=f"={C('Pedidos',r)}*spot_per"
    stn_prev="st_n0" if m==0 else C('Stock nariz fin',p); sts_prev="st_s0" if m==0 else C('Stock granos fin',p)
    valn_prev="st_n0*c_nose" if m==0 else C('Valor nariz fin',p); vals_prev="st_s0*c_spot" if m==0 else C('Valor granos fin',p)
    row["Reposición nariz (cajas)"]=f"=IF({stn_prev}-{C('Necesidad nariz',r)}<60,MAX(125,CEILING({C('Necesidad nariz',r)}*2.5/125,1)*125),0)"
    row["Reposición granos (cajas)"]=f"=IF({sts_prev}-{C('Necesidad granos',r)}<20,MAX(60,CEILING({C('Necesidad granos',r)}*2.5*1.5,1))/1.5,0)"
    row["Coste reposición"]=f"={C('Reposición nariz (cajas)',r)}*r_nose+{C('Reposición granos (cajas)',r)}*r_spot"
    row["Stock nariz tras repo"]=f"={stn_prev}+{C('Reposición nariz (cajas)',r)}"; row["Valor nariz tras repo"]=f"={valn_prev}+{C('Reposición nariz (cajas)',r)}*r_nose"
    row["Coste unit. nariz"]=f"=IF({C('Stock nariz tras repo',r)}>0,{C('Valor nariz tras repo',r)}/{C('Stock nariz tras repo',r)},c_nose)"
    row["Stock granos tras repo"]=f"={sts_prev}+{C('Reposición granos (cajas)',r)}"; row["Valor granos tras repo"]=f"={vals_prev}+{C('Reposición granos (cajas)',r)}*r_spot"
    row["Coste unit. granos"]=f"=IF({C('Stock granos tras repo',r)}>0,{C('Valor granos tras repo',r)}/{C('Stock granos tras repo',r)},c_spot)"
    row["Stock nariz fin"]=f"={C('Stock nariz tras repo',r)}-{C('Necesidad nariz',r)}"; row["Valor nariz fin"]=f"={C('Valor nariz tras repo',r)}-{C('Necesidad nariz',r)}*{C('Coste unit. nariz',r)}"
    row["Stock granos fin"]=f"={C('Stock granos tras repo',r)}-{C('Necesidad granos',r)}"; row["Valor granos fin"]=f"={C('Valor granos tras repo',r)}-{C('Necesidad granos',r)}*{C('Coste unit. granos',r)}"
    row["Cobrado"]=f"={C('Pedidos',r)}*aov"; row["Neto"]=f"={C('Pedidos',r)}*net_avg"; row["IVA repercutido"]=f"={C('Cobrado',r)}-{C('Neto',r)}"
    row["Producto"]=f"={C('Necesidad nariz',r)}*{C('Coste unit. nariz',r)}+{C('Necesidad granos',r)}*{C('Coste unit. granos',r)}"
    row["Stripe"]=f"={C('Pedidos',r)}*pay_avg"; row["Envío+sobre"]=f"={C('Pedidos',r)}*(ship+pack)"; row["Devoluciones"]=f"={C('Neto',r)}*ret"
    row["Contribución"]=f"={C('Neto',r)}-{C('Producto',r)}-{C('Stripe',r)}-{C('Envío+sobre',r)}-{C('Devoluciones',r)}"
    row["Fijos"]="=fixed"; row["Resultado"]=f"={C('Contribución',r)}-{C('Anuncios',r)}-{C('Fijos',r)}"
    row["CPA"]=f"=IF({C('Pedidos pagados',r)}>0,{C('Anuncios',r)}/{C('Pedidos pagados',r)},0)"; row["ROAS"]=f"=IF({C('Anuncios',r)}>0,{C('Pedidos pagados',r)}*aov/{C('Anuncios',r)},0)"
    row["IVA soportado"]=f"={C('Coste reposición',r)}*iva+{C('Envío+sobre',r)}*iva"
    row["IVA trimestre"]=f"=IF(AND({C('Mes',r)}>0,MOD({C('Mes',r)},3)=0),SUM({C('IVA repercutido',r-3)}:{C('IVA repercutido',r-1)})-SUM({C('IVA soportado',r-3)}:{C('IVA soportado',r-1)}),0)" if m>=3 else 0
    cash_prev="cash0" if m==0 else C('Caja fin',p)
    row["Caja fin"]=f"={cash_prev}+{C('Aportación',r)}+{C('Cobrado',r)}-{C('Stripe',r)}-{C('Anuncios',r)}-{C('Fijos',r)}-{C('Coste reposición',r)}*(1+iva)-{C('Envío+sobre',r)}*(1+iva)-{C('IVA trimestre',r)}-{C('Devoluciones',r)}"
    M.append([row.get(h,None) for h in H])
for i in range(1,len(H)+1): M.column_dimensions[get_column_letter(i)].width=13
M.freeze_panes="B2"
XLSX="/home/user/Claude-septiembre/nocta/finanzas/modelo_bootstrap_nocta.xlsx"; wb.save(XLSX); print("xlsx saved")
