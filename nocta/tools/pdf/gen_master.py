# -*- coding: utf-8 -*-
# Genera nocta/NOCTA_DOCUMENTO_MAESTRO.md con las tablas calculadas.
IVA=1.21
PAY_PCT=0.019; PAY_FIX=0.25          # pasarela (Stripe/Apple Pay), conservador
SHIP_COST=4.35                        # coste medio envío ponderado ES
SHIP_PAID=3.90                        # lo que paga el cliente si < 30 €
FREE_FROM=30.0
FULFIL_3PL=2.50; PACK=0.35            # 3PL pick&pack + caja/sobre
FULFIL_HOME=0.85                      # fase 1 casero (materiales + sobre)
RET=0.03                              # devoluciones s/ neto
GIFT_FROM=50.0; GIFT_COST=0.90        # mascarilla de tela de regalo ≥ 50 €
CPM=7.5; CTR=0.012; CPC=CPM/1000/CTR  # 0,625 €
SUB_PCT=0.15; CHURN=0.15; REPEAT90=0.30; REPEAT180=0.45
FIXED=1427.0

# slug, nombre, precio, coste desembarcado (punto medio), tipo
P=[
 ("parches-nariz","Parches de Nariz (8)",16.95,4.20,"patch"),
 ("parches-granos","Parches para Granos (36)",15.95,1.75,"patch"),
 ("parches-superficie","Parches de Superficie (10)",15.95,3.45,"patch"),
 ("parches-barbilla","Parches de Barbilla (8)",16.95,4.40,"patch"),
 ("parches-frente","Parches de Frente (5)",16.95,4.65,"patch"),
 ("exfoliante-salicilico","Exfoliante Salicílico 2 % (110 ml)",32.00,4.15,"liq"),
 ("serum-niacinamida","Sérum Niacinamida 2 % (30 ml)",29.00,4.55,"liq"),
 ("mascarilla-peel-off","Mascarilla Peel-Off Colágeno (70 ml)",29.00,3.30,"liq"),
 ("pack-mascarillas-tela","Pack 4 Mascarillas de Tela",15.00,3.55,"liq"),
 ("tonico-hialuronico","Tónico Ácido Hialurónico (130 ml)",25.00,4.10,"liq"),
 ("duo-poros","Dúo Poros Limpios (Exfoliante + Nariz)",36.90,8.95,"pack"),
 ("kit-t-zone","Kit Zona T (Frente + Nariz + Barbilla)",37.90,13.50,"pack"),
 ("kit-cara-completa","Kit Cara Completa (5 parches)",59.00,19.35,"pack"),
 ("plan-mensual-1","Plan Noche · 1 zona (mes)",16.00,4.30,"plan"),
 ("plan-mensual-2","Plan Noche · 2 zonas (mes)",28.00,8.60,"plan"),
 ("plan-mensual-3","Plan Noche · 3 zonas (mes)",39.00,12.90,"plan"),
 ("plan-mensual-4","Plan Noche · 4 zonas (mes)",49.00,17.20,"plan"),
 ("plan-mensual-4s","Plan Noche · 4 zonas + skincare (mes)",70.00,21.35,"plan"),
 ("plan-semanal","Plan Semanal (1 caja/semana, cobro semanal)",14.90,4.20,"plan"),
]

def contrib(price,cost,fulfil=FULFIL_3PL,sub=False):
    pr = price*(1-SUB_PCT) if sub else price
    net = pr/IVA
    pay = pr*PAY_PCT+PAY_FIX
    ship = SHIP_COST - (SHIP_PAID/IVA if pr<FREE_FROM else 0)
    gift = GIFT_COST if pr>=GIFT_FROM else 0
    ret = net*RET
    c = net-cost-pay-ship-fulfil-PACK-ret-gift
    return dict(pr=pr,net=net,pay=pay,ship=ship,gift=gift,ret=ret,c=c)

def ltv(price,cost,plan=False):
    """contribución esperada por cliente nuevo a 90 y 180 días"""
    c1=contrib(price,cost)["c"]
    cs=contrib(price,cost,sub=True)["c"]
    if plan:  # el plan ya es suscripción: renovaciones con supervivencia (1-churn)^n
        r90=sum((1-CHURN)**n for n in (1,2)); r180=sum((1-CHURN)**n for n in range(1,6))
        return c1, c1+c1*r90, c1+c1*r180
    r90=sum((1-CHURN)**n for n in (1,2)); r180=sum((1-CHURN)**n for n in range(1,6))
    l90 = c1 + SUB_PCT*cs*r90 + (1-SUB_PCT)*REPEAT90*c1
    l180= c1 + SUB_PCT*cs*r180 + (1-SUB_PCT)*REPEAT180*c1
    return c1,l90,l180

f=lambda x: ("%.2f"%x).replace(".",",")
pc=lambda x: ("%.1f"%(x*100)).replace(".",",")+" %"

out=[]
w=out.append

w("# NOCTA — Documento maestro de negocio\n")
w("**Versión 1.0 · 9 de septiembre de 2026.** Este documento consolida en un solo sitio todo lo que se ha pedido y entregado a lo largo del proyecto: la investigación de Vue Skin, el catálogo, los proveedores, los costes y márgenes, la inversión, la economía de cada anuncio (cuánto tiene que convertir para ser rentable), la página de producto, el plan de marketing, el desarrollo de negocio, la parte legal, las operaciones, el stack técnico entregado y la lista de todo lo pedido con su estado. Donde ya existía un documento detallado se resume aquí y se enlaza; donde faltaba algo (economía por anuncio, tabla de inversión real, reglas de escalado por anuncio, KPIs de la página de producto) se ha hecho nuevo en este documento.\n")
w("> Todas las cifras de coste de producto son **estimaciones de sourcing** (rangos de cotización de proveedores, sin muestra física confirmada). En cuanto haya cotización en firme hay que meter el coste real de cada producto en el CRM (`/admin` → Precios y márgenes) y los márgenes de este documento se recalculan solos allí.\n")

w("## Índice\n")
for i,t in enumerate(["Resumen ejecutivo (los 12 números que mandan)","Qué hace Vue Skin y qué copiamos","Catálogo, precios y planes (lo que vende la web hoy)","Proveedores: quién, a qué precio, con qué MOQ y cómo pedirlo","Costes y márgenes por producto, pack, plan y suscripción","Inversión necesaria y calendario de caja","Economía de los anuncios: cuánto tiene que convertir cada anuncio","Reglas de gestión por anuncio (presupuesto, kill, escalado)","Página de producto y embudo: KPIs y palancas","Plan de marketing (creatividades, canales, calendario, retención)","Desarrollo de negocio: legal, operaciones, roadmap 90 días y 12 meses","Stack técnico entregado y lo que queda en tu tejado","Todo lo que pediste, mensaje a mensaje, y su estado","Anexo: fórmulas y supuestos"],1):
    w(f"{i}. {t}")
w("")

# ---------- 1 resumen ----------
nose=contrib(16.95,4.20); nose_l=ltv(16.95,4.20)
duo=contrib(36.90,8.95); duo_l=ltv(36.90,8.95)
plan4=contrib(49,17.20); plan4_l=ltv(49,17.20,plan=True)
w("## 1. Resumen ejecutivo (los 12 números que mandan)\n")
w("| # | Número | Valor | De dónde sale |")
w("|---|---|---|---|")
rows=[
 ("Precio héroe (Parches de Nariz, 8 uds.)","16,95 € (14,41 € en suscripción)","Igual que Vue; catálogo de la web"),
 ("Coste desembarcado del héroe","≈ 4,20 € (rango 3,0–5,4 €) desde Corea","Informe de sourcing, punto medio"),
 ("Margen bruto de producto (parches / líquidos / packs)","67–87 % / 80–86 % / 57–71 %","Sección 5"),
 ("Contribución de un pedido de 1 caja de nariz (antes de ads)",f"{f(nose['c'])} € con 3PL · {f(contrib(16.95,4.20,FULFIL_HOME)['c'])} € enviando tú",  "Sección 5"),
 ("CPA máximo rentable en el primer pedido (héroe suelto)",f"{f(nose['c'])} €","= contribución del pedido"),
 ("CPA máximo contando 90 días de recompra y suscripción (héroe)",f"{f(nose_l[1])} €","Sección 7"),
 ("CPA máximo para el Dúo (36,90 €) / Plan 4 zonas (49 €/mes)",f"{f(duo_l[1])} € / {f(plan4_l[1])} € a 90 días","Sección 7"),
 ("Coste por clic esperado en Meta España","≈ 0,63 € (CPM 7,5 € · CTR 1,2 %)","Sección 7"),
 ("Conversión mínima del tráfico de un anuncio al héroe suelto para no perder dinero",f"{pc(CPC/nose_l[1])} (con LTV 90 d) · {pc(CPC/nose['c'])} (solo primer pedido)","Sección 7"),
 ("Conversión mínima si el anuncio vende Dúo / Plan",f"{pc(CPC/duo_l[1])} / {pc(CPC/plan4_l[1])}","Sección 7"),
 ("Punto muerto de la empresa","≈ 123 pedidos/mes (≈ 4.700 €/mes con IVA) con 1.427 €/mes de fijos","Plan financiero"),
 ("Capital recomendado","≈ 37.400 € de salida de caja hasta el primer mes de ventas con 10 SKU (recomendado disponer de 40.000 € por el valle de caja del mes 4); ≈ 25.400 € en la versión lean de 5 SKU","Sección 6"),
]
for i,(a,b,c) in enumerate(rows,1): w(f"| {i} | {a} | {b} | {c} |")
w("")
w("**La conclusión que lo cambia todo:** un anuncio que vende **una sola caja de parches** casi nunca es rentable en el primer pedido (necesitaría convertir más del 10 % de los clics). El negocio es rentable **solo** si el anuncio lleva a un carrito de 35–50 € (Dúo, Kit, Plan, 2–3 cajas) o si se cuenta la recompra y la suscripción. Por eso la web ya empuja al pack, al Plan Noche y a la suscripción por encima de la compra suelta, y por eso las reglas de la sección 8 se miden con el CPA de LTV a 90 días y no con el del primer pedido.\n")

# ---------- 2 Vue ----------
w("## 2. Qué hace Vue Skin y qué copiamos\n")
w("Investigación completa en `../vue-skin-research/informes/` (7 informes) con datos brutos en `../vue-skin-research/data/` (4.485 anuncios únicos de Meta, 2.587 vídeos transcritos, catálogo de productos, Google Ads, TikTok).\n")
w("- **Producto**: parches de hidrocoloide coreano (INCI idéntico a Hero Mighty Patch, rollo de T&L) en forma de nariz, barbilla, frente, superficie y puntos, más líquidos ODM de catálogo coreano (exfoliante salicílico 2 %, sérum niacinamida, tónico HA, peel-off de colágeno, mascarillas). Todo se vende como cosmético, no como producto sanitario.")
w("- **Precio**: 16,95 € el parche de nariz, 15,95 € granos/superficie, 25–32 € los líquidos, −15 % en suscripción, envío gratis desde 30 €, códigos del tipo TODAY15 y ofertas de hasta 40–45 % en Navidad/verano.")
w("- **Cómo anuncian**: 88 % vídeo vertical 9:16 de 15–45 s, tráfico frío directo a la ficha del parche de nariz (70 %) o del Dúo (16 %); 65 % de los vídeos atacan las tiras de poros y el apretar; 54 % citan la garantía de devolución; 49 % usan “no son puntos negros, son filamentos sebáceos”; 48 % el ángulo Corea vs Europa. Gasto estimado ≈ 1,8 M € acumulados en EU+UK; España solo el 5 % → hueco de mercado.")
w("- **Herramientas**: Shopify + Klaviyo + suscripción + reseñas + TikTok Shop (etiqueta `shoptok`) + Meta CAPI + advertoriales (“those aren't blackheads”).")
w("- **Lo que copiamos tal cual**: catálogo, precios, escalera de oferta (héroe → dúo → kit → suscripción), garantía, umbrales de carrito, la fórmula de anuncio (gancho 0–3 s → reencuadre → mecanismo → prueba visual → garantía y oferta) y los 10 ganchos más usados (sección 10).")
w("- **Lo que hacemos distinto**: español de España nativo, Plan Noche personalizado por zonas (no existe en Vue), garantía de adhesión, envío 24–48 h desde España, WhatsApp como canal de atención y recuperación, y CRM propio sin cuotas de Shopify.\n")

# ---------- 3 catálogo ----------
w("## 3. Catálogo, precios y planes (lo que vende la web hoy)\n")
w("Fuente única: `web/public/assets/js/products.js` + overrides del CRM. Precios con IVA.\n")
w("| Producto | Precio | Suscripción (−15 %) | Contenido |")
w("|---|---:|---:|---|")
cont={"parches-nariz":"8 parches 60×45 mm","parches-granos":"36 parches 10/12 mm","parches-superficie":"10 parches 40×30 mm","parches-barbilla":"8 parches","parches-frente":"5 parches","exfoliante-salicilico":"110 ml","serum-niacinamida":"30 ml","mascarilla-peel-off":"70 ml","pack-mascarillas-tela":"4 mascarillas","tonico-hialuronico":"130 ml","duo-poros":"Exfoliante 110 ml + 8 parches (ahorro 12,05 €)","kit-t-zone":"Frente 5 + Nariz 8 + Barbilla 8 (ahorro 12,95 €)","kit-cara-completa":"Nariz, Superficie, Barbilla, Frente y Granos (ahorro 23,75 €)"}
for s,n,pr,c,t in P:
    if t=="plan": continue
    w(f"| {n} | {f(pr)} € | {f(pr*0.85)} € | {cont[s]} |")
w("| **Plan Noche mensual** (constructor por zonas) | 16 / 28 / 39 / 49 €/mes por 1 / 2 / 3 / 4 zonas · +21 €/mes skincare | ya es suscripción | Nariz, Frente, Barbilla, Granos + Exfoliante/Sérum/Tónico |")
w("| **Plan Semanal** | 14,90 €/semana | ya es suscripción | 1 caja por semana |")
w("")
w("Palancas comerciales activas y controlables desde el CRM: descuento de suscripción (15 %), descuento por 2 y 3 unidades (hoy 0 %, recomendación en sección 5), envío 3,90 € y gratis desde 30 €, regalos desde 50 € (mascarilla) y 80 € (parches de granos), popup de bienvenida −10 %, barra de anuncios, upsell post-compra y en carrito, ofertas con fecha, códigos de descuento con límite de usos.\n")

# ---------- 4 proveedores ----------
w("## 4. Proveedores: quién, a qué precio, con qué MOQ y cómo pedirlo\n")
w("Detalle completo con URL y notas en `../vue-skin-research/informes/06_proveedores_marca_blanca.md`, especificaciones y proceso en `operaciones/manual_operativo.md` (sección c) y plantillas de email en `negocio/como_hacer_todo.md` (sección 1). Corea es el proveedor de referencia por calidad del rollo y por el claim *Made in Korea* que usa Vue; China es la vía barata y rápida para lotes pequeños. Ojo: en la UE el arancel es **0 % en ambos casos** (capítulo 3304 y 3005, cualquier origen): la ventaja coreana es de calidad y de marketing, no fiscal. Estudio detallado de proveedores con fichas reales, plazos y costes ocultos en `proveedores/ESTUDIO_PROVEEDORES.md`.\n")
w("### 4.1 Parches de hidrocoloide (nariz, barbilla, frente, superficie, granos)\n")
w("| Proveedor | País | Qué hace | MOQ | Precio indicativo | Plazo | Certificados | Contacto |")
w("|---|---|---|---|---|---|---|---|")
sup=[
("Nurimedics Co., Ltd.","KR (Gimpo)","Parches de acné hidrocoloide OEM; caja, pouch o tarjeta; informe de irritación a nombre del comprador; MSDS/COA; ya sirve a UE","Negociable (stock 1.000)","Cotizar (referencia coreana 0,30–0,60 $/parche de nariz a 10.000)","Negociable","ISO 13485, ISO 22716, GMP","nurimedicskorea.com · WhatsApp +82-10-2895-8520 · Tradekorea P815755"),
("NewY Medical Co., Ltd.","KR (Anseong)","Hojas de puntos 10/12 mm, private label, opcional salicílico/tea tree/centella; formas bajo pedido","1.000 packs (Tradekorea) · 10.000 hojas (Alibaba)","0,50 $/hoja (1k–9.999) → 0,40 $ (10k) → 0,35 $ → 0,32 $ (50k+)","30 días + tránsito","3 certificados verificados","newymedical.com · sales@newymedical.com · WhatsApp +82-10-4885-3573"),
("DERMATECH","KR (Seúl) + EE. UU.","Turnkey private label: hidrocoloide, microaguja, formas a medida, impresión a todo color; en Sephora/Target","1.000+","Cotizar","≈ 60 días","ISO 22716, ISO 13485, KCGMP, FDA, CE","dermatech.life · support@dermatech.life"),
("SourcingLab (Look To Go)","KR (Seúl)","Agente: parche de nariz hidrocoloide con salicílico de catálogo, ‘clinically tested 6–8 h’, gestiona regulatorio y logística","Cotizar","Cotizar (+10–25 % de margen de agente)","—","—","sourcing-lab.com · customer-care@sourcing-lab.com · +82-10-3009-2438"),
("T&L Co., Ltd.","KR (Pyeongtaek)","Fabricante del rollo original (Hero Mighty Patch); >60 % cuota Corea","Alto / negociable","Negociable","—","Fabricante sanitario","tnl.co.kr · +82-31-651-6255"),
("Twoa Korea / Awesome April","KR (Incheon)","Puntos 8/10/12 mm 100 % hidrocoloide, private label","No público","No público","—","—","awesomeapril.com · info@awesomeapril.com"),
("Yanse / Trummed / Hysent","CN","Converters con rollo ‘Korean grade’; muestras gratis (solo courier 20–40 €); MOQ 3.000–5.000","3.000–5.000","0,15–0,25 $/parche de nariz","Muestras 5–10 días","ISO 13485 (según fábrica)","Alibaba"),
("Lvsenlan Healthcare (Foshan)","CN","Nose pads hidrocoloide etiqueta blanca","3 (muestra)","0,14–0,21 $/ud","Rápido","—","Alibaba"),
("Nanjing J SUN Healthcare","CN","Nariz + rectangular","10.000","0,17 $/ud","—","—","Alibaba"),
("Nico Medical (Catch Me Patch) vía GBSA","KR","Parche de nariz acabado con su marca (solo para test de mercado)","160","2,09–2,31 $/ud","Inmediato","—","Alibaba (GBSA) · stylekorean.com/brands/612"),
]
for r in sup: w("| "+" | ".join(r)+" |")
w("")
w("### 4.2 Líquidos (exfoliante, sérum, tónico, peel-off, mascarillas)\n")
w("| Proveedor | País | Qué hace | MOQ | Precio indicativo | Contacto |")
w("|---|---|---|---|---|---|")
liq=[
("OEMKorea","KR (agente)","ODM de catálogo: tónico 1,5–5 $, sérum niacinamida 2,5–5,5 $, exfoliante 2–7 $, mascarilla de tela 0,5–2 $ (5.000+); gestiona CPSR/CPNP","1.000–3.000","Ver rangos; −20/40 % de 1.000 a 5.000 uds","oemkorea.com"),
("Mayk","KR (agente)","Fábrica-agente para sérum/exfoliante/peel-off con envase estándar","500–3.000","Cotizar","mayk-factory.com"),
("knok","KR (agente)","Private label coreano completo; coste de lanzamiento 5.000–15.000 $/SKU con envase a medida","500–3.000","Cotizar","knokglobal.com"),
("Cosmecca / Hankook Cosmetics","KR (fábrica Tier 1-2)","Fórmulas base de peel-off de colágeno y tónico HA","3.000+","Cotizar vía agente","a través de Mayk/OEMKorea"),
("KPrivateLabel","KR","Mascarillas de tela y básicos","500–1.000","Cotizar","kprivatelabel.com"),
("Awilke Branding","EE. UU./CN","BHA Liquid Exfoliant listo para etiquetar (alternativa rápida sin claim coreano)","1.000","3,00 $/ud con etiqueta y estuche","awilke.com"),
("Guangzhou Xiran Cosmetics","CN","Nose patch + toda la gama facial; mascarillas de tela; FDA, ISO 22716, GMP","1.000 (30.000 en sheet mask)","Cremas 3,5–4,5 $; sheet mask 0,15–0,40 $","xiranskincare.com · bertha@xirancn.com"),
]
for r in liq: w("| "+" | ".join(r)+" |")
w("")
w("### 4.3 Especificación que va en toda petición de cotización (RFQ)\n")
w("| Parámetro | Nariz | Barbilla | Frente | Superficie | Granos |")
w("|---|---|---|---|---|---|")
w("| Forma | T/U anatómica | media luna | rectángulo curvo | rectángulo | puntos |")
w("| Tamaño | **60 × 45 mm** | 50–60 mm ancho | 70–90 × 25–35 mm | 40 × 30 mm | 10 y 12 mm |")
w("| Grosor | 0,5–0,6 mm | 0,5–0,6 mm | 0,5–0,6 mm | 0,5–0,6 mm | 0,4–0,5 mm |")
w("| Material | 100 % hidrocoloide (Polyisobutene, Cellulose Gum, Hydrogenated Styrene/Methylstyrene/Indene Copolymer, Pectin), transparente | ídem | ídem | ídem | ídem, opcional BHA |")
w("| Unidades/caja | 8 | 8 | 5 | 10 | 36 |")
w("| Liner / envase | PET siliconado troquelado; caja + pouch o blíster | ídem | ídem | ídem | hoja en sobre |")
w("")
w("Líquidos: volumen (110 / 30 / 70 / 130 ml), envase (bomba, gotero, tubo), pH objetivo (4,5–5,5 el exfoliante), activo y concentración (salicílico 2 %, niacinamida 2 %), INCI de referencia de Vue adjunto.\n")
w("### 4.4 Proceso, muestras, negociación y pedido piloto\n")
w("1. **RFQ simultánea** a 3–4 proveedores por categoría (parches: Nurimedics, NewY, Dermatech, SourcingLab + Yanse/Trummed/Hysent; líquidos: OEMKorea, Mayk, knok, Cosmecca + Awilke). Pedir tramos 1.000 / 3.000 / 5.000 / 10.000 / 30.000, Incoterm, plazo, condiciones, certificados (ISO 22716, ISO 13485), RIPT a nombre de NOCTA, MSDS/COA, declaración de origen UE-Corea.")
w("2. **Muestras**: coreanos 50–150 $ + envío (a veces reembolsable), chinos gratis + courier 20–40 €. 2–3 uds por troquel; 30–50 ml por fórmula. Plazo 5–10 días (China) a 3–4 semanas (Corea con troquel nuevo). Comprar 1 caja de Vue y 1 de Hero como benchmark físico.")
w("3. **Evaluación** (rúbrica 1–5; descartar < 3 en adhesión o transparencia): adhesión 8 h (no despega > 10 % del perímetro), transparencia igual o mejor que Vue, sin residuo, blanqueo visible al absorber, grosor ± 0,05 mm, sin olor, sin irritación a 48 h en 3–5 testers. Líquidos: pH, textura, estabilidad 48 h a 40 °C.")
w("4. **Negociación**: troquel propio 500–2.000 $ (exclusividad por escrito, gratis a partir de 20.000 uds), pago 30/70 (30 % T/T al confirmar, 70 % contra B/L tras inspección), inspección pre-embarque SGS/BV/TÜV 200–400 $, Incoterm **FOB Busan/Incheon** en el primer pedido (EXW + forwarder propio cuando haya volumen).")
w("5. **Pedido piloto**: 1.000–3.000 uds por SKU; aéreo DHL/FedEx 3–6 días (4–7 €/kg para 50–100 kg) el primer lote; marítimo LCL 25–45 días en reposiciones. Agente de aduanas o despacho del propio courier; el arancel es 0 % en la UE para este producto sea cual sea el origen.")
w("6. **Compliance en paralelo, nunca después**: PIF + CPSR + Persona Responsable + CPNP + declaración responsable AEMPS (466,23 €). Consultoras: Aseconsa, Emeba, Cosmereg, ASC Services (ES); Biorius, Cosmeservice, EU Compliance Partner (UE).\n")

# ---------- 5 costes y márgenes ----------
w("## 5. Costes y márgenes por producto, pack, plan y suscripción\n")
w("Supuestos por pedido (todos editables en el modelo `finanzas/modelo_financiero_nocta.xlsx` y en el CRM): IVA 21 %; pasarela 1,9 % + 0,25 €; envío medio 4,35 € (el cliente paga 3,90 € por debajo de 30 €); pick & pack 3PL 2,50 € (0,85 € si envías tú en fase 1); packaging 0,35 €; devoluciones 3 %; regalo 0,90 € en pedidos ≥ 50 €. Coste desembarcado = punto medio del rango del informe de sourcing (fábrica + envase + flete + arancel 0 %).\n")
w("### 5.1 Un pedido de una unidad, compra única (con 3PL)\n")
w("| Producto | Precio | Neto IVA | Coste prod. | Margen bruto | Pasarela | Envío neto | Fulfillment+caja | Devol.+regalo | **Contribución/pedido** | % s/neto |")
w("|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|")
for s,n,pr,c,t in P:
    if t=="plan" and s not in ("plan-mensual-1","plan-mensual-4","plan-mensual-4s","plan-semanal"): continue
    d=contrib(pr,c)
    w(f"| {n} | {f(pr)} | {f(d['net'])} | {f(c)} | {pc((d['net']-c)/d['net'])} | {f(d['pay'])} | {f(d['ship'])} | {f(FULFIL_3PL+PACK)} | {f(d['ret']+d['gift'])} | **{f(d['c'])} €** | {pc(d['c']/d['net'])} |")
w("")
w("Lectura: una caja suelta de parches deja **4–5 €** de contribución (2,7–3,5 € si el envío es gratis); un líquido 11–15 €; el Dúo ≈ 12,5 €; el Kit Cara Completa ≈ 18,5 €; el Plan de 4 zonas ≈ 13,7 €/mes (25 € con skincare). El 3PL y el envío se comen el margen de los pedidos pequeños: por eso hay que subir el ticket, no bajar el precio.\n")
w("### 5.2 Mismo pedido enviándolo tú (fase 1, hasta ~500 pedidos/mes)\n")
w("| Producto | Contribución con 3PL | Contribución casera | Diferencia |")
w("|---|---:|---:|---:|")
for s in ("parches-nariz","parches-granos","exfoliante-salicilico","duo-poros","kit-t-zone","kit-cara-completa","plan-mensual-4"):
    x=[p for p in P if p[0]==s][0]; a=contrib(x[2],x[3])['c']; b=contrib(x[2],x[3],FULFIL_HOME)['c']
    w(f"| {x[1]} | {f(a)} € | {f(b)} € | +{f(b-a)} € |")
w("")
w("### 5.3 Suscripción (−15 %) y descuento por 2–3 unidades\n")
w("| Escenario (Parches de Nariz) | Precio pagado | Contribución del pedido | Comentario |")
w("|---|---:|---:|---|")
w(f"| 1 caja, compra única | 16,95 € | {f(contrib(16.95,4.20)['c'])} € | envío pagado por el cliente |")
w(f"| 1 caja, suscripción | 14,41 € | {f(contrib(16.95,4.20,sub=True)['c'])} € | cada renovación deja lo mismo; a 6,7 pedidos de vida media (churn 15 %/mes) → {f(contrib(16.95,4.20,sub=True)['c']*6.67)} € por suscriptor |")
def multi(q,pct,sub=False):
    pr=16.95*(1-SUB_PCT if sub else 1)*(1-pct)*q; net=pr/IVA; pay=pr*PAY_PCT+PAY_FIX
    ship=SHIP_COST-(SHIP_PAID/IVA if pr<FREE_FROM else 0); gift=GIFT_COST if pr>=GIFT_FROM else 0
    return net-4.20*q-pay-ship-FULFIL_3PL-0.45*(q-1)-PACK-net*RET-gift
w(f"| 2 cajas, sin descuento (hoy) | 33,90 € | {f(multi(2,0))} € | envío gratis (≥ 30 €) |")
w(f"| 2 cajas con −10 % (recomendado) | {f(16.95*2*0.9)} € | {f(multi(2,0.10))} € | sigue por encima de 30 € → envío gratis |")
w(f"| 3 cajas con −15 % (recomendado) | {f(16.95*3*0.85)} € | {f(multi(3,0.15))} € | supera 50 € → cae el regalo (0,90 €) |")
w(f"| 3 cajas en suscripción con −15 % | {f(16.95*3*0.85*0.85)} € | {f(multi(3,0.15,True))} € | ticket recurrente de 36,7 €/mes |")
w("")
w("**Lectura y recomendación para el CRM (Precios y márgenes):** pasar de 1 a 2 cajas sin descuento añade 5,4 € (el envío pasa a ser gratis y cuesta 4,35 €); con −10 % añade solo 2,7 €; 3 cajas con −15 % añaden 8 € sobre la caja suelta. Activar 2 uds −10 % y 3 uds −15 % solo si con ello más del 25 % de los pedidos pasan a ser de 2+ cajas; si no, dejarlo a 0 % y empujar el Dúo (12,5 € de contribución) o el Plan. Los packs ya están fijados con ahorro agresivo (Dúo 36,90 € = −25 % sobre 48,95 €; Kit Zona T 37,90 € = −25 %; Kit Cara 59 € = −29 %) tal y como pediste, y siguen dejando 57–71 % de margen bruto de producto.\n")
w("### 5.4 Plan Noche (suscripción por zonas)\n")
w("| Plan | Precio/mes | Coste producto | Contribución/mes | Vida media (churn 15 %) | Contribución esperada por cliente |")
w("|---|---:|---:|---:|---:|---:|")
for s in ("plan-mensual-1","plan-mensual-2","plan-mensual-3","plan-mensual-4","plan-mensual-4s","plan-semanal"):
    x=[p for p in P if p[0]==s][0]; d=contrib(x[2],x[3]); life=1/CHURN if s!="plan-semanal" else 8
    w(f"| {x[1]} | {f(x[2])} € | {f(x[3])} € | {f(d['c'])} € | {('%.1f'%life).replace('.',',')} {'meses' if s!='plan-semanal' else 'semanas (est.)'} | **{f(d['c']*life)} €** |")
w("")
w("El Plan de 1 zona (16 €) deja solo 4 €/mes con 3PL (el fulfillment de 2,85 € se come el margen): conviene empujar siempre a 2+ zonas (el constructor ya sube el precio por zona) o cobrar el envío en 1 zona. El plan semanal a 14,90 €/semana deja muy poco por envío: mantenerlo solo como producto de entrada y proponer el paso a mensual desde el 2.º envío (automatización de WhatsApp/email).\n")

# ---------- 6 inversión ----------
w("## 6. Inversión necesaria y calendario de caja\n")
w("### 6.1 Presupuesto completo (10 SKU técnicos, como en el modelo financiero)\n")
inv=[("Compliance 1.er producto (PIF + CPSR + Persona Responsable + CPNP)",4000),("Compliance 9 productos adicionales (1.000 €/SKU)",9000),("Declaración responsable de importación AEMPS (tasa 5.06)",466),("Registro de marca EUIPO (1 clase)",850),("Diseño de marca y packaging (ya hecho en `brand/`; reserva para imprenta y pruebas)",2000),("Web (ya hecha y desplegada en Netlify; reserva dominio + Resend + WhatsApp Business)",300),("Fotos y vídeo de producto (ya hechos con IA; reserva para sesión real con muestras)",800),("UGC: 10 creadoras × 150 €",1500),("Muestras de sourcing (10 SKU × 100 €)",1000),("4 troqueles propios (nariz, superficie, barbilla, frente) × 1.000 $",3680),("Pedido piloto de inventario (10 SKU, 1.000–3.000 uds)",9000),("Ads mes 1",3000),("Seguro RC de producto (anual, estimación)",600),("Gestoría + alta (autónomo o SL; SL ≈ 3.000 € capital + 600 € constitución)",1200)]
w("| Partida | € |")
w("|---|---:|")
tot=0
for a,b in inv: w(f"| {a} | "+f"{b:,}".replace(",",".")+" |"); tot+=b
w(f"| **Total salida de caja hasta el primer mes de ventas** | **{tot:,}".replace(",",".")+" €** |")
w("")
w("A esto hay que sumar el valle de tesorería de los meses 2–6 (ads creciendo, reposición de stock, IVA trimestral): el modelo lo sitúa en **−9.904 € en el mes 4** con 25.000 € de aportación. Por eso la recomendación es **35.000–40.000 €** disponibles (aportación + línea de crédito), o escalar los ads más despacio.\n")
w("### 6.2 Versión lean recomendada para empezar (5 SKU)\n")
w("Lanzar con Nariz, Granos, Barbilla, Frente y Exfoliante (los que reciben el 86 % del tráfico de anuncios de Vue: la ficha de nariz el 70 % y la del Dúo el 16 %; componen el Dúo, el Kit Zona T y el Plan Noche); Superficie, Sérum, Peel-off, Tónico y Mascarillas en el mes 4–6 con la primera reposición.\n")
lean=[("Compliance 1 + 4 SKU",8000),("AEMPS + EUIPO",1316),("Packaging/imprenta + reserva web + fotos reales",2000),("UGC 10 creadoras",1500),("Muestras 5 SKU",500),("3 troqueles (nariz, barbilla, frente)",2760),("Inventario piloto 5 SKU (≈ 2.000 uds parches × 4 + 1.000 exfoliante)",5500),("Ads mes 1",2000),("Seguro RC + gestoría",1800)]
w("| Partida | € |"); w("|---|---:|"); t2=0
for a,b in lean: w(f"| {a} | "+f"{b:,}".replace(",",".")+" |"); t2+=b
w(f"| **Total lean** | **{t2:,}".replace(",",".")+" €** |")
w("")
w("### 6.3 Calendario de caja (versión completa, escenario Base del modelo)\n")
w("| Mes | Qué pasa | Caja acumulada aprox. |")
w("|---|---|---:|")
for r in [("0 (sept–nov)","Compliance, muestras, troqueles, depósito 30 % del pedido (2.700 €), marca, UGC","−3.700 €"),("1 (dic)","70 % del pedido al embarcar, 3.000 € de ads, primeras ventas (CPA 18 €)","−9.000 €"),("2–4","Ads +20 %/mes si ROAS ≥ 2,5; IVA 1T; primera reposición","**−9.900 € (mes 4, mínimo)**"),("5–8","CPA baja hacia 11–14 €; suscriptores y recompra empiezan a pesar","−6.000 → −1.000 €"),("9–12","EBITDA mensual positivo desde ≈ mes 9; acumulado positivo en el mes 11","+1.850 € (mes 12)")]:
    w(f"| {r[0]} | {r[1]} | {r[2]} |")
w("")
w("PyG del mes 12 (Base): 1.802 pedidos, 65.715 € con IVA, margen bruto ≈ 51 % sobre neto, 12.899 € de ads, EBITDA 4.300 € (7,9 %), ROAS 4,2x. Escenarios pesimista / optimista: EBITDA acumulado año 1 −28.825 € / +170.899 €. Detalle en `finanzas/plan_financiero.md`.\n")

# ---------- 7 ads economía ----------
w("## 7. Economía de los anuncios: cuánto tiene que convertir cada anuncio\n")
w(f"Supuestos de Meta España (editables): CPM 7,5 € (rango 6–9 €), CTR saliente 1,2 % → **CPC ≈ 0,63 €** → 1.000 impresiones = 12 clics = 7,5 €. Un anuncio es rentable cuando el coste por compra (CPA) que genera está por debajo de la contribución que deja esa compra. Se dan tres varas de medir:\n")
w("- **CPA máx. 1.er pedido**: solo lo que deja el primer pedido. Es el límite “no pierdo dinero hoy”.")
w("- **CPA máx. LTV 90 d**: primer pedido + 15 % de suscriptores con 2 renovaciones (supervivencia 85 %/mes) + 30 % de recompra de no suscriptores. Es la vara con la que se gobiernan los anuncios (sección 8).")
w("- **CPA máx. LTV 180 d**: lo mismo a 6 meses (5 renovaciones, 45 % de recompra). Solo para decidir cuánto se puede forzar la escala, nunca para el día a día.\n")
w("**CPA objetivo** = 70 % del CPA máx. LTV 90 d (el 30 % restante paga los costes fijos y el error de estimación). **CVR mínima** = CPC / CPA máx. (qué porcentaje de los clics del anuncio tiene que comprar). **ROAS mínimo** = precio con IVA / CPA máx.\n")
w("| Anuncio que vende… | Precio | CPA máx. 1.er pedido | CPA máx. LTV 90 d | CPA máx. LTV 180 d | **CPA objetivo** | CVR mín. (LTV 90 d) | CVR mín. (1.er pedido) | ROAS mín. (LTV 90 d) | Compras / 1.000 impr. |")
w("|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|")
sel=["parches-nariz","parches-granos","parches-barbilla","exfoliante-salicilico","serum-niacinamida","duo-poros","kit-t-zone","kit-cara-completa","plan-mensual-2","plan-mensual-4","plan-mensual-4s"]
for s in sel:
    x=[p for p in P if p[0]==s][0]; c1,l90,l180=ltv(x[2],x[3],plan=(x[4]=="plan"))
    tgt=0.7*l90
    w(f"| {x[1]} | {f(x[2])} | {f(c1)} € | {f(l90)} € | {f(l180)} € | **{f(tgt)} €** | {pc(CPC/l90)} | {pc(CPC/c1) if c1>0 else '—'} | {('%.1f'%(x[2]/l90)).replace('.',',')}x | {('%.2f'%(CPM/l90)).replace('.',',')} |")
w("")
w("Cómo leerlo con un ejemplo: un anuncio de **Parches de Nariz** que lleva a comprar una caja suelta necesita que **más del 10 % de los clics compren** para no perder dinero en el primer pedido (imposible: lo normal es 2–4 %). Contando 90 días de recompra y suscripción, necesita un **9 %**: todavía imposible. El mismo anuncio, si la ficha convierte a **Dúo**, necesita **3,6 %**; a **Kit Cara Completa**, **2,4 %**; y a **Plan Noche de 4 zonas**, **1,8 %** (1 % con skincare). Por eso la landing de todo anuncio de parches es la ficha con la suscripción y el pack preseleccionados, y por eso el CPA se mide por **AOV real del anuncio**, no por producto anunciado.\n")
w("### 7.1 La misma tabla en función del ticket real que consigue el anuncio (AOV)\n")
w("Cuando un anuncio mezcla productos, usa el AOV medio de sus pedidos. Contribución del pedido ≈ 0,6 × AOV neto − 3 € de costes por pedido (3PL, caja, pasarela, envío gratis), con coste de producto medio del 22 % del neto.\n")
w("| AOV del anuncio (con IVA) | Contribución 1.er pedido | CPA máx. LTV 90 d | CPA objetivo | CVR mín. | ROAS mín. |")
w("|---|---:|---:|---:|---:|---:|")
for aov in (17,25,30,38,45,55,70):
    net=aov/IVA; cogs=net*0.22; pay=aov*PAY_PCT+PAY_FIX; ship=SHIP_COST-(SHIP_PAID/IVA if aov<30 else 0); gift=GIFT_COST if aov>=50 else 0
    c1=net-cogs-pay-ship-FULFIL_3PL-PACK-net*RET-gift
    cs=c1*0.85  # aprox en suscripción
    r90=sum((1-CHURN)**n for n in (1,2)); l90=c1+SUB_PCT*cs*r90+(1-SUB_PCT)*REPEAT90*c1
    w(f"| {aov} € | {f(c1)} € | {f(l90)} € | {f(0.7*l90)} € | {pc(CPC/l90) if l90>0 else '—'} | {('%.1f'%(aov/l90)).replace('.',',') if l90>0 else '—'}x |")
w("")
w("Objetivo operativo: **AOV ≥ 38 € desde el día 1 y ≥ 45 € en el mes 3**. Con 45 € el CPA objetivo es ≈ 20 € y basta con que el 2,2 % de los clics compren, que es el rango normal de una ficha bien hecha (2,8–3,2 % de objetivo en la sección 9). Con 17 € de ticket hace falta un 7 %, que no ocurre.\n")
w("### 7.1b Sensibilidad: si el clic sale más caro, la conversión mínima sube en la misma proporción\n")
w("CVR mínima = CPC / CPA máx. Estos son los CPC según CPM y CTR reales de tu cuenta; multiplica la columna de CVR mínima de las tablas anteriores por el factor.\n")
w("| CTR saliente \\ CPM | 6 € | 7,5 € | 9 € | 12 € (Navidad/Rebajas) |")
w("|---|---:|---:|---:|---:|")
for ctr in (0.008,0.012,0.02):
    cells=[]
    for cpm in (6,7.5,9,12):
        cpc=cpm/1000/ctr; cells.append(f"{f(cpc)} € (×{('%.1f'%(cpc/CPC)).replace('.',',')})")
    w(f"| {pc(ctr)} | "+" | ".join(cells)+" |")
w("")
w("Ejemplo: en Navidad con CPM 12 € y CTR 1,2 % el clic cuesta 1 €: el anuncio de Dúo pasa a necesitar un 5,7 % de conversión, que no es realista. En esas semanas solo se anuncian Kits y Plan, o se sube el AOV con la oferta.\n")
w("### 7.2 Presupuesto de ads por fase y cuánto tiene que salir\n")
w("| Fase | Días | Meta/día | TikTok/día | Google/día | Gasto fase (medio) | CPA de salida | Pedidos esperados | ROAS plataforma |")
w("|---|---|---|---|---|---:|---|---:|---|")
for r in [("Soft launch + test","1–30","40–60 €","20–30 €","10–15 €",2600,"≤ 25 € (aprendizaje; el modelo asume 18 €)",130,"≥ 1,6"),("Validación","31–60","90–140 €","40–60 €","20–30 €",5700,"≤ 16 €",380,"≥ 2,5"),("Escala + retención","61–90","150–250 €","70–100 €","30–50 €",9750,"≤ 13 €",800,"≥ 3")]:
    w(f"| {r[0]} | {r[1]} | {r[2]} | {r[3]} | {r[4]} | "+f"{r[5]:,}".replace(",",".")+f" € | {r[6]} | ≈ {r[7]} | {r[8]} |")
w("")
w("Total 90 días a ritmo completo ≈ 18.000 €; versión lean solo Meta ≈ 11.000 €. El modelo financiero (3.000 € el mes 1, +20 %/mes si ROAS ≥ 2,5, techo 18.000 €/mes) está entre ambas. Los CPA de salida de esta tabla son más exigentes que los 32–55 € de la estrategia de marketing porque aquí se calculan con los costes reales de la sección 5: un CPA de 40 € solo es rentable con AOV > 90 € o a LTV de 12 meses.\n")

# ---------- 8 reglas ----------
w("## 8. Reglas de gestión por anuncio (presupuesto, kill, escalado)\n")
w("Se aplican a cada anuncio (`utm_content` = número de la matriz) leyendo Meta + el panel `/admin` (pedidos por `utm_content`, CPA real con AOV real).\n")
w("| Momento | Regla | Acción |")
w("|---|---|---|")
for r in [("Al lanzar","Cada anuncio nuevo entra en la campaña de test con 15–20 €/día durante 3–5 días","No tocar antes de 3 días ni 2.000 impresiones"),
("2.000 impresiones","Hook rate (3 s) < 25 % o CTR saliente < 0,8 %","Matar. El anuncio no engancha: cambiar el gancho, no el cuerpo"),
("Gasto = 1,5 × CPA objetivo sin ninguna compra","Con AOV 45 €: 18 € gastados y 0 compras","Matar"),
("3 compras o más","CPA real > 1,3 × CPA objetivo","Matar o bajar al 50 % y revisar la landing"),
("3 compras o más","CPA real ≤ CPA objetivo durante 3 días seguidos","Ganador: duplicar dentro de la campaña ASC+ (nunca mover el original); subir presupuesto +20 % cada 3 días"),
("Semanal","CVR de la ficha < 2 % con CTR sano","El problema es la página, no el anuncio: revisar precio visible, botón, suscripción preseleccionada, reseñas"),
("Cada 2–3 semanas (estáticos) / 4–6 (vídeo)","Frecuencia > 3 o CTR cae > 30 % vs su mejor semana","Refrescar creatividad (nueva variante A/B del mismo gancho)"),
("Mensual","ROAS de la cuenta (MER) < 2 en el mes","Parar la escala, volver al presupuesto anterior, producir 10 creatividades nuevas antes de volver a subir"),
("Siempre","Nunca doblar el presupuesto de golpe; nunca > 20 % cada 3–4 días","Evita reiniciar el aprendizaje")]:
    w(f"| {r[0]} | {r[1]} | {r[2]} |")
w("")
w("**Estructura de cuenta** (detalle en `marketing/estrategia_marketing.md` §6): Campaña 1 ASC+ amplia España 18–65 (60–65 % del presupuesto, 20–30 anuncios activos), Campaña 2 prospección por avatar Bea/Marisol/Álex (20–25 %, 3–5 anuncios por avatar, 30–50 €/día), Campaña 3 retargeting de catálogo (10–15 %, visitantes 30 d + carritos + compradores 180 d). Placements Advantage+, 9:16 obligatorio, optimización a compra, CAPI + píxel con calidad ≥ 8. Landing de frío: siempre ficha de producto o advertorial (`no-son-puntos-negros.html`) → ficha.\n")
w("**Cuántos anuncios y cuánto cuestan**: 10–15 creatividades nuevas al mes (matriz de 100 en `marketing/matriz_100_anuncios.md`: 10 ganchos × 5 formatos × 2 variantes). Coste de producción con la máquina de contenido: 150–250 créditos de Higgsfield por anuncio de vídeo (≈ 45 min), estáticos a coste 0. Tanda 1 producida (3 anuncios + turntable + réplicas de 3 anuncios ganadores de Vue en `marketing/anuncios/`); tanda 2 = ganchos G2 y G5 (8 anuncios); tanda 3 = ganchos baratos sin cara (12 anuncios).\n")

# ---------- 9 PDP ----------
w("## 9. Página de producto y embudo: KPIs y palancas\n")
w("La ficha (`producto.html`) está construida para que todo lo que decide la compra quepa en la primera pantalla del móvil: foto completa del producto, precio, selector de suscripción **encima** del de cantidad, precios por cantidad que cambian entre compra única y suscripción, botón Comprar y Apple Pay/Google Pay a la misma altura, chip de pack. Debajo: vídeo, garantía, cómo se usa, reseñas, upsell.\n")
w("| Paso del embudo | Mínimo | Objetivo | Top | Palanca en la web / CRM |")
w("|---|---|---|---|---|")
for r in [("Clic → carga de la ficha (LCP móvil)","< 2,5 s","< 1,8 s","< 1,2 s","Netlify CDN, imágenes webp, vídeo diferido, catálogo cacheado 60 s"),
("Visitas que ven precio + botón sin scroll","90 %","100 %","—","Primera pantalla móvil verificada a 390 px"),
("Añadir al carrito / compra directa","6 %","9 %","12 %+","Suscripción preseleccionada en anuncios de plan, precio por cantidad visible, Apple Pay"),
("Carrito → checkout iniciado","55 %","65 %","75 %","Umbral de envío gratis a 30 €, regalo a 50 €, upsell de carrito"),
("Checkout → pago","55 %","65 %","75 %","Stripe con Apple Pay/Google Pay, sin registro, código validado en línea"),
("**CVR de la ficha (compras / visitas)**","2 %","2,8–3,2 %","5 %+","Producto de las tres anteriores"),
("AOV","38 €","45–48 €","60 €+","Packs −25/29 %, Plan Noche, 2–3 unidades −10/15 %, regalos por umbral"),
("Suscripción sobre pedidos nuevos","10 %","15 %","25 %","Selector de suscripción arriba, Plan Noche, −15 %"),
("Popup de bienvenida: captación de email/teléfono","4 %","6–8 %","10 %","Popup centrado −10 %, se muestra en la primera página de la visita"),
("Carritos abandonados recuperados","5 %","10 %","15 %","Automatización de carrito abandonado: email a las 3 h con código −10 % (retraso y código configurables en el CRM)"),
("Ingresos por email/WhatsApp","15 %","25–30 %","35 %+","Newsletter Resend, campañas y automatizaciones del CRM"),
("Recompra a 90 días","12 %","20–25 %","30 %+","Guía post-compra a las 20 h, winback con código −15 %, upsell post-compra y campañas segmentadas desde el CRM")]:
    w(f"| {r[0]} | {r[1]} | {r[2]} | {r[3]} | {r[4]} |")
w("")
w("Qué medir cada semana en la ficha: visitas, CVR, AOV, % suscripción, % pack vs suelto, tasa de uso del selector de cantidad. Si la CVR baja del 2 % con CTR normal, el problema está en la página; si el AOV baja de 38 €, el problema está en el mix (empujar Dúo/Plan en la barra de anuncios y el popup).\n")

# ---------- 10 marketing ----------
w("## 10. Plan de marketing (creatividades, canales, calendario, retención)\n")
w("Documento completo: `marketing/estrategia_marketing.md` (13 secciones), guiones en `marketing/guiones_anuncios.md`, matriz en `marketing/matriz_100_anuncios.md`.\n")
w("- **Posicionamiento**: “Esos puntitos no son puntos negros” — parches de hidrocoloide coreanos que absorben en una noche, sin tiras ni apretar. Tres avatares: Bea (18–28, TikTok/Reels), Marisol (35–50, Instagram/Facebook), Álex (22–40, hombre).")
w("- **Oferta**: escalera héroe 16,95 € → Dúo 36,90 € → Kit 37,90–59 € → Plan Noche 16–70 €/mes; garantía de adhesión + 60 días de satisfacción; envío gratis desde 30 €, regalo desde 50 €; popup −10 %; lotes numerados y códigos con caducidad real.")
w("- **Los 10 ganchos** (por frecuencia en los anuncios de Vue): no son puntos negros · asco satisfactorio · complejo · lo que no funciona (tiras) · reto de una noche · pareja/amigo · dermatólogo/ciencia · comparativa tira vs hidrocoloide · precio (menos de 2 € por noche) · garantía.")
w("- **Fórmula del anuncio** (0–3 s gancho, 3–10 s reencuadre, 10–20 s mecanismo, 20–32 s prueba visual del parche usado, 32–40 s garantía + oferta + CTA). Mix mensual: 40 % UGC, 20 % demo, 15 % estáticos, 15 % fundador/experta, 10 % catálogo.")
w("- **Canales**: Meta 55 %, TikTok 25 % (Spark Ads + Smart+; TikTok Shop ES desde el mes 3, comisión 4 % los primeros 60 días), Google 12 % (Search marca + Shopping + PMax), creadoras 8 % (20 nano/micro al mes, 50–800 €/vídeo, whitelisting), afiliación con códigos 10–20 %.")
w("- **Retención (ya construida en el CRM)**: bienvenida con código del popup, carrito abandonado por email (3 h, −10 %, configurable), guía post-compra (20 h), winback (−15 %), campañas de email y WhatsApp segmentadas (leads, clientes, suscriptores) y newsletter con Resend. Lo que no existe todavía y conviene añadir: recordatorio de reposición a los 21 días y segunda cadencia de carrito abandonado.")
w("- **Calendario 12 meses** (§8 de la estrategia): lanzamiento dic, Rebajas ene, San Valentín, Día de la Madre, verano (−30/40 % como Vue), vuelta al cole, Black Friday, Navidad (hasta −45 %). Cada campaña se crea en el CRM (Ofertas) con fecha de inicio/fin.\n")

# ---------- 11 desarrollo de negocio ----------
w("## 11. Desarrollo de negocio: legal, operaciones, roadmap 90 días y 12 meses\n")
w("### 11.1 Legal y compliance (paso a paso en `negocio/plan_de_negocio.md` §10)\n")
w("| Paso | Qué | Coste | Plazo |")
w("|---|---|---|---|")
for r in [("Forma jurídica","Autónomo para validar (alta RETA + censal, IAE 652.2) o SL (3.000 € capital, notaría + registro ≈ 600 €)","0–600 €","1–3 semanas"),("EORI + ROI","Número EORI en AEAT y registro de operador intracomunitario","0 €","1–2 semanas"),("Marca","EUIPO clase 3 (cosmética); comprobar antes en TMview","850 €","4–6 meses (protección desde solicitud)"),("Cosmética (Reg. 1223/2009)","PIF + CPSR + Persona Responsable en la UE + notificación CPNP por producto; etiquetado en español (INCI, PAO, lote, RP)","1.500–4.500 € el 1.º, 500–1.500 € cada adicional","4–8 semanas por producto (en paralelo con la producción)"),("AEMPS","Declaración responsable de importación de cosméticos (tasa 5.06)","466,23 €","2–4 semanas"),("RGPD / LSSI / cookies","Textos legales, banner de cookies, registro de tratamientos (la web ya incluye legal.html y consentimiento en popup)","0–300 €","1 semana"),("Venta a distancia","Desistimiento 14 días, garantía, condiciones (ya en `envios-devoluciones.html` y `garantia.html`)","0 €","hecho"),("Envases (RAP)","Adhesión a Ecoembes o SCRAP equivalente","≈ 100–300 €/año","1 mes"),("Seguro RC de producto","Póliza de responsabilidad civil de producto","300–900 €/año","1 semana")]:
    w(f"| {r[0]} | {r[1]} | {r[2]} | {r[3]} |")
w("")
w("### 11.2 Operaciones (manual completo en `operaciones/manual_operativo.md`)\n")
w("- **Stock**: pedido piloto 1.000–3.000 uds/SKU; reponer cuando queden 60 días de cobertura hasta 90 días; aéreo el primer lote, marítimo después.")
w("- **Fulfillment**: fase 1 casero con Sendcloud/Packlink (Correos/GLS 3,5–4,5 € Península, 6 € Baleares, 9 € Canarias) hasta 500–600 pedidos/mes; después 3PL (Byrd, Logisfashion, Cubyn) a 2,2–2,8 €/pedido. Envío 24–48 h como promesa de marca.")
w("- **Atención al cliente**: WhatsApp Business (integrado en la web y el CRM), email; SLA 24 h; garantía de adhesión con reposición inmediata; devoluciones sin envío físico para la garantía de 60 días (formulario con fotos).")
w("- **Calidad**: rúbrica de cata por lote (adhesión, transparencia, residuo, blanqueo), inspección pre-embarque en el primer pedido de cada proveedor, retención de 5 muestras por lote.\n")
w("### 11.3 Roadmap 90 días (detalle semanal en `negocio/roadmap_90_dias.md`)\n")
w("| Semanas | Hito |")
w("|---|---|")
for r in [("1–2","RFQ a 8–10 proveedores, alta legal, EORI, benchmark físico Vue/Hero comprado"),("3–5","Muestras en tránsito y recibidas; cata; elección de proveedor; contratar consultora de compliance"),("6–7","Negociación, proforma, depósito 30 %; arranque de producción; artwork final a imprenta"),("8–10","PIF/CPSR/CPNP en paralelo; declaración AEMPS; inspección pre-embarque; web ya en producción con Stripe, Resend y WhatsApp conectados; 10 creadoras UGC grabando"),("11","Tránsito aéreo y aduana con declaración de origen; recepción y control de calidad"),("12","Primeros anuncios (tanda 1 + 2), popup y automatizaciones activas, 500–1.000 € de test"),("13 (día 90)","Medición: CPA, CVR, AOV, % suscripción; primeras decisiones de escalado con las reglas de la sección 8")]:
    w(f"| {r[0]} | {r[1]} |")
w("")
w("### 11.4 Roadmap 12 meses\n")
w("| Mes | Objetivo |")
w("|---|---|")
for r in [("1–3","Validar producto y CPA (≤ 16 € en el mes 3), AOV ≥ 42 €, 3+ anuncios ganadores, 100–400 pedidos/mes"),("4–6","Segunda tanda de SKU (superficie, sérum, peel-off, tónico, mascarillas), primera reposición marítima, TikTok Shop ES, 20 creadoras/mes, 25 % de ingresos por email/WhatsApp, punto muerto superado (> 123 pedidos/mes)"),("7–9","Escalar ads hasta el techo que aguante el ROAS ≥ 2,5, Amazon.es como canal incremental, afiliación con códigos, EBITDA mensual positivo"),("10–12","1.500–1.800 pedidos/mes, EBITDA acumulado positivo (mes 11), preparar Portugal/Italia (Italia recibe el 8 % del gasto en anuncios de Vue, España solo el 5 %), segundo troquel/producto propio")]:
    w(f"| {r[0]} | {r[1]} |")
w("")
w("### 11.5 Riesgos principales y mitigación\n")
w("Retraso de compliance (empezar en paralelo, SLA por escrito) · coste real de producto distinto del estimado (cotización en firme antes del pedido) · CPA que no baja (no escalar sin ROAS, producir más creatividades, subir AOV) · adhesión/transparencia peor que Vue (rúbrica de cata, benchmark físico, no aceptar < 3/5) · caja en el mes 4 (colchón de 10–15 k€) · dependencia de Meta (email/WhatsApp ≥ 25 % de ingresos, TikTok Shop, Google) · claims prohibidos (nunca “cura”, “trata el acné”, “elimina para siempre”, “medical-grade”).\n")

# ---------- 12 stack ----------
w("## 12. Stack técnico entregado y lo que queda en tu tejado\n")
w("**Entregado y en producción** (https://nocta-store.netlify.app, CRM en `/admin/`):\n")
w("- Web estática ultrarrápida con 16 páginas (inicio, catálogo, ficha, planes, cómo usar con secuencia real de 80 fotogramas, ciencia, advertorial “no son puntos negros”, quiz, checkout, gracias, garantía, envíos, legal, sobre, contacto, tablero).")
w("- Checkout Stripe con Apple Pay / Google Pay (Klarna, Bizum o PayPal se activan desde el CRM cuando los tengas en Stripe), webhook firmado, pedidos y clientes en Supabase, códigos de descuento con límite de usos, carritos guardados y recuperables.")
w("- Newsletter y transaccionales con Resend; WhatsApp Cloud API (webhook, plantillas, consentimiento en popup); popup de bienvenida −10 % con nombre/email/teléfono.")
w("- CRM completo: dashboard, pedidos, carritos, clientes, leads, suscriptores, productos (precios, textos, imágenes, stock, coste), ofertas con fecha, contenido de todas las secciones y menús, reseñas, precios y márgenes (suscripción %, 2–3 unidades %, planes por zonas, upsell, envío y regalos), campañas de email/WhatsApp, automatizaciones por hora, integraciones (Stripe con un clic, Resend, WhatsApp).")
w("- Máquina de contenido: pipeline de imagen/vídeo (Seedance 2.5 para vídeo), packshots, vídeos de catálogo, 3 réplicas de anuncios ganadores de Vue, hero y secuencia de uso real.\n")
w("**Pendiente de ti (10–30 minutos cada uno):**\n")
w("1. Meter el **coste real de cada producto** en `/admin` → Precios y márgenes cuando tengas cotización (hasta entonces usa los de la sección 5).")
w("2. Conectar **Stripe** (pegar la clave secreta en Integraciones; el webhook se crea solo) y activar Apple Pay en el panel de Stripe con el dominio.")
w("3. Verificar el **dominio en Resend** (DNS) y poner el remitente; conectar **WhatsApp Cloud API** (token, phone id, verify token).")
w("4. **Revocar el token de Netlify** que pegaste en el chat y rotar la clave de Resend y la de Supabase que también pegaste: ya están cargadas como variables de entorno, no hacen falta en claro en ningún sitio.")
w("5. Dominio propio (nocta.es / nocta-skin.com) apuntando a Netlify; píxel de Meta + CAPI y TikTok pixel con los IDs de tus cuentas (los huecos están en el CRM → Integraciones).\n")

# ---------- 13 checklist ----------
w("## 13. Todo lo que pediste, mensaje a mensaje, y su estado\n")
w("| Lo que pediste | Dónde está | Estado |")
w("|---|---|---|")
chk=[
("Investigar al máximo Vue Skin: productos, ads en todas las redes, ofertas, canales, herramientas","`../vue-skin-research/informes/01–07` + datos brutos","Hecho"),
("Que el estudio se base en todo (todos los anuncios, no una muestra)","4.485 anuncios únicos, 2.587 vídeos transcritos, censo de frases","Hecho"),
("Selección de 10 productos iguales a los de Vue, proveedores y packaging","`producto/catalogo_completo.md`, `producto/fichas_desarrollo_producto.md`, informe 06, `brand/packaging/`","Hecho (13 SKU + 2 planes)"),
("Todo en Claude-septiembre, nada en dc-intelligence; no quemar tokens con agentes","Todo bajo `nocta/`; agentes solo Sonnet y bajo demanda","Cumplido"),
("Permiso para Ad Multiplier y workflows creativos optimizando créditos de Higgsfield","3 réplicas en `marketing/anuncios/`, saldo reportado en cada entrega","Hecho"),
("Entender vídeo por vídeo cómo se pone y se quita el parche (no un frame)","`producto/fisica_del_parche.md` + secuencia real de uso (80 fotogramas Seedance 2.5)","Hecho"),
("Carpetas con catálogo completo, vídeos, web y desarrollo completo de negocio y cómo hacer todo","`producto/`, `web/`, `brand/video/`, `negocio/`, `finanzas/`, `operaciones/`, `marketing/`","Hecho"),
("Web en Netlify, sin contraseña","https://nocta-store.netlify.app","Hecho"),
("Web smooth, moderna, minimalista, perfecta en móvil; producto sin fondo sobre el fondo de la web; menús creativos","Web v2 “Laboratorio Cálido” → v8","Hecho"),
("Inspirarse en vueskin.com pero con animaciones y exposición de producto propias","Media reveal cinemático, grano, hero de vídeo, rail de destacados","Hecho"),
("Imágenes de más calidad (gpt image 2 4K, detail shots)","`web/public/assets/img/`, packshots y detalles por SKU","Hecho"),
("Página “cómo usar” con animación realista y humanizada","`como-usar.html` con secuencia real","Hecho"),
("Ficha de producto de lujo y UI avanzado; catálogo 2 por fila","`producto.html`, `catalogo.html`","Hecho"),
("Packs más agresivos para que el usuario prefiera el pack","Dúo 36,90 (−25 %), Kit Zona T 37,90 (−25 %), Kit Cara 59 (−29 %)","Hecho"),
("3D más realistas → vídeo real; auditoría de UI página por página","Vídeo real Seedance 2.5 en hero, ficha y cómo funciona","Hecho"),
("CRM para controlar todo; newsletter Resend; popup −10 % con nombre/email/teléfono y consentimiento WhatsApp; WhatsApp; Stripe en toda la tienda con Apple Pay; Stripe desde el CRM","`/admin/`, funciones Netlify, Supabase","Hecho (faltan tus claves de Stripe/WhatsApp/dominio Resend)"),
("Imágenes que aparecen con efecto de polvo, cinemático, sin blancos","Media reveal v7","Hecho"),
("Ficha: Comprar y Apple Pay visibles sin scroll; producto grande completo; suscripción encima de cantidades; precios por cantidad en suscripción; botones iguales; vídeo encajado","`producto.html` móvil","Hecho"),
("Popup centrado, fondo desenfocado, personal, cinemático, compacto y pro; en la primera página de la visita (incluida la ficha)","Popup v9","Hecho"),
("Hero solo con piel perfecta + parche usado; caja más baja; sin borde azul","Hero v8","Hecho"),
("Sección “lo más vendido” compacta bajo el hero, sin la palabra Parches, tamaño correcto, sin quedarse pegada","`#destacados`","Hecho"),
("Plan personalizado por zonas (1–4) con precio, imágenes y listas dinámicas; skincare opcional","`planes.html`, constructor de plan","Hecho"),
("Tarjeta “esos puntitos” más baja con botón; parches debajo; “cómo funciona” en un solo cuadro con 3 vídeos y parches al final","`index.html`","Hecho"),
("Packs antes que el skincare, 2 por fila","`index.html`","Hecho"),
("Que el CRM controle absolutamente todo, incluidos márgenes y ofertas","`m-pricing.js`, `m-products.js` (ofertas), contenido","Hecho"),
("Contraseña del CRM","Te la di en el chat; no se cambió, como pediste después. No se escribe aquí por seguridad","Hecho"),
("Este documento: proveedores, desarrollo de negocio, ads y cuánto tiene que convertir cada anuncio, inversión, ficha de producto, todo","`NOCTA_DOCUMENTO_MAESTRO.md`","Hecho"),
]
for a,b,c in chk: w(f"| {a} | {b} | {c} |")
w("")
w("**Lo que faltaba y se ha añadido en este documento**: economía por anuncio con CPA/CVR/ROAS mínimos por producto y por AOV (sección 7), reglas de kill/escalado por anuncio (8), KPIs del embudo de la ficha (9), tabla de inversión real con versión lean (6), contribución por producto con y sin 3PL, suscripción, 2–3 unidades y planes (5), y la recomendación de descuento por cantidad para el CRM.\n")

# ---------- 14 anexo ----------
w("## 14. Anexo: fórmulas y supuestos\n")
w("```")
w("Neto = Precio / 1,21")
w("Contribución pedido = Neto − Coste producto − (1,9 % × Precio + 0,25) − Envío neto − Fulfillment − Packaging − 3 % × Neto − Regalo")
w("  Envío neto = 4,35 − 3,22 (si el cliente paga 3,90 € con IVA, pedidos < 30 €) ; = 4,35 si envío gratis")
w("  Fulfillment = 2,50 (3PL) ó 0,85 (casero) ; Packaging = 0,35 ; Regalo = 0,90 si pedido ≥ 50 €")
w("CPA máx. 1.er pedido = Contribución pedido")
w("CPA máx. LTV 90 d = C1 + 15 % × C_sub × (0,85 + 0,85²) + 85 % × 30 % × C1")
w("CPA máx. LTV 180 d = C1 + 15 % × C_sub × Σ(0,85^n, n=1..5) + 85 % × 45 % × C1")
w("Planes (ya suscripción): LTV 90 d = C × (1 + 0,85 + 0,85²) ; vida media = 1 / churn = 6,7 meses")
w("CPA objetivo = 0,7 × CPA máx. LTV 90 d")
w("CPC = CPM / 1000 / CTR = 7,5 / 1000 / 0,012 = 0,625 €")
w("CVR mínima = CPC / CPA máx.   ;   ROAS mínimo = Precio / CPA máx.   ;   Compras por 1.000 impresiones = CPM / CPA máx.")
w("Punto muerto = Costes fijos / Contribución media por pedido = 1.427 / 11,58 ≈ 123 pedidos/mes (modelo, 1,6 uds/pedido); con la contribución de este documento a AOV 38 € (15,4 €) serían ≈ 93 pedidos/mes")
w("```")
w("Supuestos marcados como estimación (a sustituir por datos reales en los primeros 60 días): CPM y CTR de Meta España, CVR, tasa de suscripción 15 % y churn 15 %/mes, recompra 30 % a 90 días, devoluciones 3 %, costes de producto (rango de RFQ), mix regional de envíos.\n")
w("---\n*Documentos fuente: `negocio/plan_de_negocio.md`, `negocio/roadmap_90_dias.md`, `negocio/checklist_lanzamiento.md`, `negocio/como_hacer_todo.md`, `finanzas/plan_financiero.md` + `modelo_financiero_nocta.xlsx`, `marketing/estrategia_marketing.md`, `marketing/guiones_anuncios.md`, `marketing/matriz_100_anuncios.md`, `operaciones/manual_operativo.md`, `producto/*.md`, `../vue-skin-research/informes/` (7 informes), `README.md` (stack y CRM).*")

open("/home/user/Claude-septiembre/nocta/NOCTA_DOCUMENTO_MAESTRO.md","w").write("\n".join(out)+"\n")
print("ok", len("\n".join(out)))
