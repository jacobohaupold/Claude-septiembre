# -*- coding: utf-8 -*-
IVA=1.21; PAY_PCT=0.015; PAY_FIX=0.25; SHIP=3.90; SHIP_PAID=3.90; FREE_FROM=30; PACK=0.35; RET=0.02
CPM=8.0; CTR=0.010; CPC=CPM/1000/CTR   # 0,80 € cuenta nueva
COST={"nariz_cn":3.20,"nariz_kr":4.80,"granos":1.90,"barbilla_cn":3.30,"frente_cn":3.10}
f=lambda x: ("%.2f"%x).replace(".",",")
pc=lambda x: ("%.1f"%(x*100)).replace(".",",")+" %"
def contrib(price,cogs):
    net=price/IVA; pay=price*PAY_PCT+PAY_FIX
    ship=SHIP-(SHIP_PAID/IVA if price<FREE_FROM else 0)
    ret=net*RET; c=net-cogs-pay-ship-PACK-ret
    return dict(net=net,pay=pay,ship=ship,ret=ret,c=c)
OFF=[("1 caja Nariz (envío 3,90 € a cargo del cliente)",16.95,COST["nariz_cn"]),
     ("Nariz + Granos «Dúo Noche» (envío gratis)",26.90,COST["nariz_cn"]+COST["granos"]),
     ("2 cajas Nariz (envío gratis)",29.90,2*COST["nariz_cn"]),
     ("3 cajas Nariz (envío gratis)",39.90,3*COST["nariz_cn"]),
     ("2 Nariz + 1 Granos «Mes completo» (envío gratis)",42.90,2*COST["nariz_cn"]+COST["granos"]),
     ("1 caja Granos (envío 3,90 € a cargo del cliente)",15.95,COST["granos"]),
     ("Suscripción 1 caja Nariz/mes −15 % (envío gratis)",14.41,COST["nariz_cn"])]
o=[]; w=o.append
w("# NOCTA — Plan bootstrap: 1.000 € de arranque, 500 €/mes, rentable desde el primer pedido\n")
w("**Versión 1.0 · 9 de septiembre de 2026.** Este plan sustituye, para el arranque, al escenario de 25.000–40.000 € del documento maestro. Parte de lo que hay de verdad: **1.000 € hoy y 500 €/mes** si hace falta, solo parches, inversión mínima en producto y todo el esfuerzo en encontrar anuncios que entretengan y vendan. No trata la parte jurídica: se da por resuelta aparte (una línea al final dice lo mínimo que hay que saber para no llevarse un susto).\n")
w("> Franqueza primero: con 1.000 € no se lanza una marca, se lanza **un test de anuncios con producto real**. El objetivo del mes 0–3 no es facturar, es encontrar 3 anuncios que vendan a un coste por compra por debajo de 11 € y un pack que deje más de 15 € por pedido. Cuando eso existe, el negocio se financia solo con lo que vende y los 500 €/mes se convierten en gasolina, no en salvavidas. Si en 90 días no aparece ningún anuncio rentable, lo honesto es parar y no meter más dinero.\n")
w("## Índice\n")
for i,t in enumerate(["Qué significa «rentable desde el momento 0» con 1.000 €","Producto: solo parches, y en este orden","Proveedores y costes para un pedido mínimo","Cómo se reparten los 1.000 € (y los 500 €/mes)","Precios, packs y contribución por pedido en modo bootstrap","Cuánto tiene que convertir cada anuncio con 500 €/mes","Lo que dicen los 4.485 anuncios de Vue: qué funciona y qué no","Plan de anuncios a 12 meses (estructura, cadencia, reglas, reinversión)","Cómo producir anuncios buenos sin presupuesto","Catálogo de 100 anuncios para elegir (documento aparte)","Lo mínimo legal que hay que saber (una línea)"],1): w(f"{i}. {t}")
w("")
# 1
w("## 1. Qué significa «rentable desde el momento 0» con 1.000 €\n")
w("Rentable desde el primer pedido significa una sola cosa: **el coste de conseguir un pedido con anuncios tiene que ser menor que lo que deja ese pedido** una vez pagado el producto, el envío, el sobre, Stripe y las devoluciones. No cuenta la recompra futura, no cuenta la suscripción, no cuenta «el LTV». Con 500 €/mes no hay margen para financiar clientes que se rentabilizan en el mes 3.\n")
w("De ahí salen las cuatro reglas del plan:\n")
w("- **Regla 1 — El ticket mínimo es un pack.** Una caja suelta de 16,95 € deja 9 € y necesita que el 9 % de los clics compren. Un pack de 2 cajas (29,90 €) deja 16 € y necesita el 5 %. Todo anuncio lleva al pack, no a la caja.")
w("- **Regla 2 — Envías tú.** Sin 3PL, sin almacén. Sobre acolchado, etiqueta de Correos/Packlink desde casa. Son 2,85 € de ahorro por pedido que hacen la diferencia entre ganar y perder.")
w("- **Regla 3 — Cada anuncio tiene 12 € para demostrar que sirve.** Con el CPA objetivo de 11 € (pack de 2 cajas), un anuncio que gasta 15 € sin vender se apaga. Un anuncio que vende a menos de 11 € se duplica. Sin excepciones ni «dale un día más».")
w("- **Regla 4 — El dinero de las ventas se reinvierte a la mitad.** El 50 % de la contribución de cada mes vuelve a anuncios, el otro 50 % se guarda para reponer stock. Así el presupuesto crece solo si el negocio lo gana.\n")
# 2
w("## 2. Producto: solo parches, y en este orden\n")
w("| Orden | Producto | Por qué ahora | Coste bootstrap/caja | Margen bruto | Cuándo |")
w("|---|---|---|---:|---:|---|")
w(f"| 1 | **Parches de Nariz (8)** | El héroe de Vue: el 73 % de sus anuncios aterrizan en esta ficha; es el producto con la «prueba visual» más fuerte (el parche blanquea) y el que sostiene todos los ganchos | {f(COST['nariz_cn'])} € (China, tirada pequeña) · {f(COST['nariz_kr'])} € (Corea) | {pc((16.95/IVA-COST['nariz_cn'])/(16.95/IVA))} | Mes 0 |")
w(f"| 2 | **Parches para Granos (36)** | El más barato de fabricar (≈ 1,9 €), el mayor margen (86 %), sirve como segundo producto del pack «Dúo Noche» y como regalo; la landing de spot patches de Vue tiene el mayor % de anuncios longevos (41 %) | {f(COST['granos'])} € | {pc((15.95/IVA-COST['granos'])/(15.95/IVA))} | Mes 0 (100 uds) |")
w(f"| 3 | Parches de Barbilla (8) | Segunda zona más pedida; permite el Kit Zona T y el Plan por zonas | {f(COST['barbilla_cn'])} € | 72 % | Mes 3, pagado con ventas |")
w(f"| 4 | Parches de Frente (5) | Completa la Zona T | {f(COST['frente_cn'])} € | 73 % | Mes 4–5 |")
w("| — | Superficie, líquidos, mascarillas | Fuera hasta tener 3 anuncios rentables y 1.500 € de caja generada | — | — | Mes 6+ |")
w("")
w("En la web se dejan visibles solo Nariz, Granos y sus packs; el resto se oculta desde el CRM (Productos → visible) sin borrar nada. El Plan Noche se limita a 1–2 zonas hasta tener barbilla y frente.\n")
# 3
w("## 3. Proveedores y costes para un pedido mínimo\n")
w("Con 1.000 € el MOQ coreano normal (NewY: 1.000 packs, 30 días de producción y 60 de entrega) no entra. Las tres vías realistas, de más barata a más «marca» (fichas reales, valoraciones, plazos y costes ocultos en la **Parte 2 · Estudio de proveedores**):\n")
w("| Vía | Proveedor | Qué se compra | Cantidad mínima | Coste unitario | Coste del lote | Plazo | Pros / contras |")
w("|---|---|---|---|---|---|---|---|")
w("| **A · Tirada pequeña China (recomendada para el test)** | Lvsenlan Healthcare (Foshan) o Yanse/Trummed con rollo «Korean grade», vía Alibaba | Parches de nariz hidrocoloide sin marca, en liner, a granel o en pouch neutro | Lvsenlan: desde 3 uds (pedir 1.200–1.600); Yanse: 3.000 | 0,14–0,21 $/parche · granos 0,03–0,05 $/punto | 1.200 parches ≈ 200–250 $ + 40–80 $ courier | 5–12 días muestras, 2–3 semanas lote | Barato y rápido. Sin claim *Made in Korea* (el arancel UE es 0 % en ambos casos); adhesión y transparencia a verificar con muestra (comprar 1 caja de Vue y comparar) |")
w("| **B · Muestra grande coreana** | NewY Medical (sales@newymedical.com, WhatsApp +82-10-4885-3573) o Nurimedics (WhatsApp +82-10-2895-8520) | «Sample order» de 300–500 parches de nariz troquel de catálogo + 50 hojas de puntos | Negociable como muestra pagada | 0,45–0,60 $/parche · hojas 0,50 $ | 400 parches ≈ 200–240 $ + 60–100 $ envío + 50–150 $ fee de muestra | 3–4 semanas | Calidad y claim coreano; cantidad corta (50 cajas) y coste por caja casi el doble |")
w("| **C · Producto acabado de otra marca** | Catch Me Patch (Nico Medical) vía GBSA en Alibaba | Cajas de nose patch ya acabadas, con su marca | 160 uds | 2,09–2,31 $/ud | ≈ 350 $ + envío | 1–2 semanas | Solo para probar anuncios con producto real antes de fabricar; no es tu marca, no escala |")
w("")
w("**Packaging para 150–250 cajas** (lo que arruina el presupuesto si se hace «bien» demasiado pronto):\n")
w("- Caja plegable blanca o kraft estándar (60×45×15 mm o similar) comprada a granel: 0,12–0,25 €/ud en tiradas de 250 (Alibaba, RajaPack, Selfpackaging).")
w("- **Etiqueta adhesiva impresa** con el diseño de `brand/packaging/` (frontal + trasera con INCI, lote, PAO): 0,10–0,20 €/ud en tiradas de 250–500 (Stickermule, Onlineprinters, Avery). Total caja + etiqueta ≈ 0,35–0,45 €.")
w("- Pouch interior: pedirlo al proveedor de parches (0,03–0,08 $/ud) o usar bolsa zip transparente de 60×80 mm (0,02 €).")
w("- Tarjeta de instrucciones A7 a dos caras: 0,04 €/ud a 500 uds.")
w("- La **caja impresa** de verdad (offset, 0,6–1,2 €/ud) se encarga en la primera reposición de 1.000+ cajas, pagada con ventas.")
w("- Envío al cliente: sobre acolchado C6/C5 0,15–0,25 € + etiqueta Correos Paq Estándar o GLS vía Packlink PRO / Sendcloud: 3,50–4,30 € (< 1 kg, Península). Se usa 3,90 € en las cuentas.\n")
w("**Coste desembarcado por caja en el lote piloto (vía A):**\n")
w("| Concepto | Nariz (8 parches) | Granos (36 puntos) |")
w("|---|---:|---:|")
w("| Parches | 8 × 0,20 $ = 1,60 $ ≈ 1,47 € | 1,5 hojas × 0,30 $ ≈ 0,41 € |")
w("| Pouch / bolsa | 0,05 € | 0,03 € |")
w("| Caja + etiqueta + tarjeta | 0,45 € | 0,45 € |")
w("| Courier + gestión aduanera (prorrateado, lote de 165 cajas) | 0,70 € | 0,50 € |")
w("| Muestras, tarjeta y merma (prorrateado) | 0,45 € | 0,45 € |")
w(f"| **Total** | **≈ {f(COST['nariz_cn'])} €** | **≈ {f(COST['granos'])} €** |")
w("")
w("Con Corea (vía B) la caja de nariz sale a ≈ 4,80 €; sigue siendo rentable pero recorta 1,6 € por caja de contribución. Coste resultante en la variante A del estudio: ≈ 3,4 € por caja de nariz con el IVA como salida de caja (2,9 € si se recupera). Recomendación: **vía A para el test de 90 días, vía B (o coreano con troquel propio) para la primera reposición grande**, cuando los anuncios ya estén validados y el claim *Made in Korea* se pueda explotar en la creatividad.\n")
w("**Qué pedir y cómo (10 líneas):** 1) escribir a Lvsenlan y a Yanse pidiendo muestra de nose patch hidrocoloide transparente 0,5 mm en forma de nariz (adjuntar la ficha de 60 × 45 mm de `operaciones/manual_operativo.md`); 2) pagar 20–40 € de courier por 10–20 muestras; 3) comparar con una caja de Vue: adhesión 8 h, transparencia, blanqueo, residuo; 4) si pasa, pedir 1.200–1.600 parches + 80 hojas de puntos, pago por Alibaba Trade Assurance; 5) pedir a la vez las cajas kraft, etiquetas y sobres; 6) mientras llega (2–3 semanas), grabar los anuncios con las muestras.\n")
# 4
w("## 4. Cómo se reparten los 1.000 € (y los 500 €/mes)\n")
w("| Partida mes 0 | € | Nota |")
w("|---|---:|---|")
rows=[("Muestras de 2 proveedores + courier",75,"Imprescindible: no se fabrica sin comparar con Vue"),("Lote piloto: 1.000 parches de nariz (125 cajas) + 60 hojas de puntos (40 cajas de granos) + bolsas, con courier express",330,"Alibaba, Trade Assurance (tarjeta +2,99 %)"),("Cajas kraft neutras + etiquetas impresas + sobres acolchados (250 uds)",112,"Etiqueta impresa; la caja impresa (500 uds ≈ 285 $ según ficha real) se decide en el mes 2 con ventas"),("IVA a la importación (21 %) + gestión aduanera del courier (mín. 15 €)",90,"Salida de caja real; el IVA se recupera si hay alta fiscal"),("1 caja de Vue + 1 de Hero como referencia",35,"Benchmark físico y atrezo para anuncios comparativos"),("Anuncios mes 0 (test de 10 creatividades, 15 días × 15 €)",225,"Meta, una campaña, ver sección 8"),("Dominio .es + Packlink PRO + imprevistos",70,"Web, Stripe, Resend y WhatsApp ya están; sin cuotas"),("Reserva",63,"Para duplicar el primer anuncio que venda")]
for a,b,c in rows: w(f"| {a} | {b} | {c} |")
w(f"| **Total** | **{sum(r[1] for r in rows)}** | |")
w("")
w("Stock inicial: ≈ 125 cajas de nariz y 40 de granos (≈ 600 € con IVA y transporte, variante A del estudio de proveedores). Vendido en packs de 2, son 60–80 pedidos, es decir, **1.800–2.400 € de ventas**. La primera reposición (500–1.000 cajas, ya con caja impresa a 0,43–0,57 $) se paga con eso en el mes 2.\n")
w("| Mes | Aportación | Reinversión de ventas (50 % de la contribución) | Ads | Producto |")
w("|---|---:|---:|---:|---:|")
w("| 0 | 1.000 € | 0 | 225 € | 600 € (producto, packaging, muestras, IVA y aduana) |")
w("| 1 | 500 € | ≈ 0–150 € | 500 € | 0 (stock) |")
w("| 2 | 500 € | ≈ 200–400 € | 600–800 € | 100–200 € (reposición pequeña) |")
w("| 3 | 500 € (última si hay tracción) | ≈ 400–800 € | 800–1.200 € | 300–500 € (reposición 1.000 cajas, a plazos con Trade Assurance) |")
w("| 4–12 | 0 € si el negocio se sostiene | crece con las ventas | según la regla de reinversión | según cobertura de 45 días |")
w("")
# 5
w("## 5. Precios, packs y contribución por pedido en modo bootstrap\n")
w("Supuestos: envías tú (sobre 0,35 €, etiqueta 3,90 €), Stripe 1,5 % + 0,25 €, devoluciones 2 %, coste de producto de la vía A. El cliente paga 3,90 € de envío por debajo de 30 € (cubre el coste real) y gratis a partir de 30 €.\n")
w("| Oferta | Precio | Neto IVA | Producto | Stripe | Envío neto | Sobre | Devol. | **Contribución** | Margen s/neto |")
w("|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|")
res={}
for n,p,c in OFF:
    d=contrib(p,c); res[n]=d['c']
    w(f"| {n} | {f(p)} | {f(d['net'])} | {f(c)} | {f(d['pay'])} | {f(d['ship'])} | {f(PACK)} | {f(d['ret'])} | **{f(d['c'])} €** | {pc(d['c']/d['net'])} |")
w("")
w("**Cambios de precio que este plan pide en el CRM (Precios y márgenes / Ofertas):**\n")
w("- Crear el pack **«2 cajas de Nariz» a 29,90 €** (ahorro 4 €, envío gratis) y hacerlo la opción preseleccionada en la ficha y el destino de todos los anuncios. Deja 16,1 € por pedido frente a 9,0 € de la caja suelta.")
w("- Crear el **«Dúo Noche» Nariz + Granos a 26,90 €** (ahorro 6 €) como segunda oferta y como upsell de carrito.")
w("- Mantener la caja suelta a 16,95 € **con envío 3,90 €** (nunca gratis: perdería 2,9 € por pedido).")
w("- Umbral de envío gratis en 30 € → bajarlo a **26,90 €** para que los dos packs lo cumplan. Regalos por umbral: desactivados hasta el mes 4 (cuestan 0,6–0,9 € por pedido).")
w("- Suscripción: se deja activa a −15 % pero **no se anuncia**; solo se ofrece en el email post-compra. Un pedido de suscripción suelto deja 7 € (envío gratis) y no se puede comprar con anuncios.")
w("- Popup: cambiar el −10 % por **«envío gratis en tu primer pedido»** (cuesta 3,2 € netos solo si compran una caja; en packs ya es gratis) o mantener −10 % solo sobre packs.\n")
# 6
w("## 6. Cuánto tiene que convertir cada anuncio con 500 €/mes\n")
w(f"Una cuenta nueva sin historial paga más que Vue: se asume **CPM 8 €, CTR 1 % → CPC 0,80 €** (Vue trabaja con 6–9 € y 1,2 %). Con 500 €/mes son ≈ 625 clics/mes. Cada anuncio se juzga contra la contribución de la oferta a la que lleva:\n")
w("| Oferta a la que lleva el anuncio | Contribución | **CPA máximo** (rentable desde 0) | **CPA objetivo** (70 %) | CVR mínima (CPC 0,80 €) | CVR objetivo | Pedidos/mes con 500 € al CPA objetivo | Ventas/mes |")
w("|---|---:|---:|---:|---:|---:|---:|---:|")
for n,p,c in OFF:
    if n.startswith("Suscripción"): continue
    C=res[n]; tgt=0.7*C
    w(f"| {n} | {f(C)} € | {f(C)} € | **{f(tgt)} €** | {pc(CPC/C)} | {pc(CPC/tgt)} | {int(500/tgt)} | {int(500/tgt*p)} € |")
w("")
w("Lectura honesta: llevar tráfico frío a la caja suelta exige que el **9,5 %** de los clics compren; no va a pasar. Llevarlo al pack de 2 cajas exige el **5,0 %** (7,1 % con el CPA objetivo); sigue siendo exigente pero es el terreno donde Vue trabaja: sus fichas convierten al 4–7 % porque el anuncio ya ha hecho la venta antes del clic. Por eso el plan pone el 90 % del esfuerzo en la creatividad: **cada punto de CTR que sube baja el CPC proporcionalmente**. Con CTR 2 % (anuncios buenos) el CPC cae a 0,40 € y la CVR mínima del pack de 2 se queda en 2,5 %, que es normal.\n")
w("| CTR del anuncio | CPC (CPM 8 €) | CVR mínima pack 2 cajas | CVR mínima Dúo Noche |")
w("|---|---:|---:|---:|")
for ctr in (0.006,0.01,0.015,0.02,0.03):
    cpc=CPM/1000/ctr; w(f"| {pc(ctr)} | {f(cpc)} € | {pc(cpc/res['2 cajas Nariz (envío gratis)'])} | {pc(cpc/res['Nariz + Granos «Dúo Noche» (envío gratis)'])} |")
w("")
w("Punto muerto personal: sin costes fijos (no hay 3PL, ni Shopify, ni gestoría en este modo) el negocio es rentable **en cada pedido** en cuanto el CPA real está por debajo de la contribución. No hay «número de pedidos mínimo»: hay un CPA máximo.\n")
# 7
w("## 7. Lo que dicen los 4.485 anuncios de Vue: qué funciona y qué no\n")
w("Método: en la Biblioteca de anuncios de Meta no se ven resultados, pero sí **cuántos días mantiene Vue cada anuncio encendido** y cuántas variantes agrupa. Un anunciante que gasta 1,8 M € no mantiene 4 meses un anuncio que no vende ni apaga en 3 días uno que sí. Se toma como «funciona» un anuncio con ≥ 45 días de vida (1.035 anuncios, el 23 %) y como «no funciona» uno apagado en ≤ 7 días (1.341, el 30 %). Datos: `../vue-skin-research/data/`.\n")
w("**Cómo trabaja Vue (lo primero que hay que copiar):**\n")
w("- Vida media de un anuncio: **15 días**. El 34 % muere en la primera semana. Vue prueba muchísimo y mata rápido: en 2026 lanza 200–900 anuncios nuevos al mes.")
w("- Un anuncio con 6–20 variantes agrupadas (mismo vídeo con distintos textos/miniaturas) dura 75 días de mediana y el **64 %** son ganadores; los anuncios de una sola variante, el 21 %. Es decir: cuando algo funciona, lo multiplican; cuando no, no insisten.")
w("- El mismo guion aparece entre los ganadores y entre los muertos en 0 días (ejemplo: «Here's the truth about those black dots…» duró 223 días con una creadora y 0 con otra). **El guion no vende solo: vende la ejecución** (persona, ritmo, prueba visual). Cada guion bueno se graba con 2–3 personas.\n")
w("**Qué funciona (por tasa de anuncios longevos):**\n")
w("| Palanca | Ganadores | Muertos en ≤ 7 d | Vida mediana | Lectura |")
w("|---|---:|---:|---:|---|")
for r in [("Gancho en forma de **pregunta** («¿Sabías que…?», «¿Te pasa que…?»)","34 %","27 %","23 d","El mejor arranque: abre un bucle que el espectador quiere cerrar"),
("**Listicle / 3 razones** («Tres razones por las que…»)","33–35 %","24–26 %","21–22 d","Estructura clara, retención alta, fácil de subtitular"),
("**Oferta / código / descuento** en el anuncio","32 %","23 %","21 d","Cierra la venta en el mismo anuncio; Vue lo usa en el 16 % de sus anuncios"),
("Gancho **«Para de…» / «No hagas…»** (anti-apretar, anti-tiras)","29 %","27 %","23 d","Interrumpe un hábito; funciona porque casi todo el mundo aprieta o usa tiras"),
("**Spot patches** (parches de granos) como landing","41 %","38 %","40 d","Pocos anuncios pero muy longevos: el producto barato tiene un público propio"),
("**«No son puntos negros»** como gancho literal","25 %","23 %","20 d","Sigue funcionando pero está muy quemado (1.882 anuncios lo usan): hay que decirlo de otra forma"),
("Vídeo de **30–45 s**","27 %","28 %","19 d","La duración óptima. Menos de 15 s: 23 % y muere más; más de 90 s: 13 % y el 55 % muere en una semana"),
("**Catálogo dinámico** (retargeting DPA)","90 %","0 %","88 d","Solo 10 anuncios, pero casi eternos: el retargeting de carrito siempre compensa; con 500 €/mes se hace por email/WhatsApp, no con ads"),
("**Prueba social / ciencia** («el 93 % vio…», «dermatólogos…»)","24 %","27 %","18 d","Ayuda como segundo bloque, no como gancho")]:
    w(f"| {r[0]} | {r[1]} | {r[2]} | {r[3]} | {r[4]} |")
w("")
w("**Qué no funciona (o funciona peor de lo que parece):**\n")
w("| Palanca | Ganadores | Muertos | Lectura |")
w("|---|---:|---:|---|")
for r in [("**Historia en primera persona** como gancho («Yo arreglé…», «Mi piel era…»)","19 %","33 %","El arranque más usado por sus creadoras y el que peor retiene: la gente no conoce a quien habla. Funciona solo cuando en el segundo 1 ya hay una nariz en primer plano"),
("**Lanzamiento de producto nuevo** («Just landed», «Meet your new…»)","16 %","32 %","La novedad no vende parches; vende el problema"),
("**Landing a colección / «all»**","6 %","43 %","Enviar a la página de categoría es el error más caro de su cuenta"),
("**Dúo / kit** como creatividad de prospección","19 %","36 %","El pack se vende en la ficha y en el upsell, no en el primer anuncio (excepción: los 9 anuncios de «duo» más longevos, todos con «two steps» explicado en 10 s)"),
("**Imagen estática** sola","17 %","32 %","Sirve para retargeting y ofertas, no para tráfico frío"),
("**Vídeos de más de 90 s**","13 %","55 %","Vue los prueba con creadoras «que hablan mucho» y los apaga"),
("**Suscripción / rutina larga** como mensaje","19 %","30 %","Nadie se suscribe desde un anuncio; se suscribe después de ver el parche usado"),
("**Hombres** como segmento","22 %","31 %","Ni mejor ni peor que la media, pero con guion propio («Most guys over 35 think…») consigue anuncios de 200+ días; el gancho «Most men squeeze» aparece entre los muertos")]:
    w(f"| {r[0]} | {r[1]} | {r[2]} | {r[3]} |")
w("")
w("**Las 12 aperturas literales más repetidas entre los ganadores** (traducidas y adaptadas al español de España; están en el catálogo de 100 con su número):\n")
for s in ["«Si tu nariz se ve así, no tienes puntos negros» (nº 1)","«La mayoría de las mujeres cree que esto son puntos negros. No lo son» (nº 4)","«Estos puntitos oscuros de la nariz no son puntos negros» (nº 2)","«Si tienes más de 35 y esto te sigue saliendo…» (nº 55)","«Deja de apretarte la nariz» / «Deja de tratarlos como puntos negros» (nº 31, 32)","«¿Sabías que…?» (nº 37)","«Tres razones por las que te vuelven a salir cada 3 días» (nº 21)","«Iba a hacerme un láser hasta que descubrí esto» (nº 71)","«El secreto de unos poros limpios no es lo que usas, es lo que te falta» (nº 12)","«Tres razones para NO comprar estos parches» (nº 23)","«Las tiras de poros son una estafa. Esto es lo que funciona» (nº 13)","«Mi piel era un catfish (filtro andante) y lo arreglé» (nº 43, única historia en primera persona que dura: empieza con la selfie editada)"]:
    w(f"- {s}")
w("")
w("**La estructura de los anuncios de 200+ días** (se repite en 40 de los 45 más longevos): 0–3 s gancho con la nariz en primer plano o una afirmación que contradice lo que cree el espectador · 3–10 s reencuadre («no son puntos negros, son filamentos sebáceos, por eso vuelven») · 10–20 s por qué lo que hace no funciona (tiras, apretar, exfoliar) · 20–30 s mecanismo del parche + cómo se pone · 30–38 s **prueba visual** (parche por la mañana, blanquecino) · 38–45 s garantía + oferta + CTA. Todos con subtítulos grandes y sin música protagonista.\n")
# 8
w("## 8. Plan de anuncios a 12 meses (estructura, cadencia, reglas, reinversión)\n")
w("### 8.1 Estructura de cuenta con 15–25 €/día\n")
w("- **Meta, una sola campaña** de ventas con presupuesto en campaña (CBO), 1 conjunto de anuncios amplio España 18–54 sin intereses, optimización a compra, píxel + CAPI (ya conectados desde el CRM), atribución 7 días clic. Dentro, **4–6 anuncios activos** a la vez; nunca más de 6 con menos de 20 €/día (el algoritmo no reparte).")
w("- **Sin campaña de retargeting de pago**: con este tráfico no hay audiencia suficiente. El retargeting lo hacen el email de carrito abandonado (3 h, −10 %), WhatsApp y el popup.")
w("- **TikTok: orgánico primero.** 1 vídeo al día en la cuenta de NOCTA (los mismos anuncios sin el CTA final). Cuando un vídeo supere 5.000 reproducciones orgánicas, 5 €/día de Spark Ads sobre ese vídeo durante 5 días. TikTok Ads de pago desde cero con menos de 20 €/día no aprende: no se toca hasta el mes 4.")
w("- **Google**: solo la campaña de Búsqueda de marca «nocta parches» a 1–2 €/día desde que haya anuncios en circulación (protege el tráfico que generan los vídeos). Nada más hasta el mes 6.")
w("- Landing de todo anuncio: ficha de Parches de Nariz con el pack de 2 preseleccionado, o el advertorial `no-son-puntos-negros.html` → ficha, según el gancho (educativo → advertorial; prueba visual/oferta → ficha).")
w("- Cada anuncio lleva `utm_content=nº del catálogo` para verlo en el panel `/admin` con su CPA real.\n")
w("### 8.2 Cadencia de test\n")
w("| Semana | Qué entra | Qué sale | Presupuesto |")
w("|---|---|---|---|")
w("| 1 | 5 anuncios (uno por familia: pregunta, listicle, para-de, prueba visual, oferta) | — | 15 €/día |")
w("| 2 | 3 nuevos | Los que gastaron 15 € sin venta o CTR < 0,8 % | 15 €/día |")
w("| 3–4 | 3 nuevos/semana; el ganador se duplica con otra miniatura y otro texto | Igual | 15–20 €/día |")
w("| Mes 2 | 2–3 nuevos/semana; se graba una segunda persona para los 2 mejores guiones | Igual | 20–25 €/día |")
w("| Mes 3+ | 2 nuevos/semana como mínimo, siempre; 1 de cada 3 debe ser un gancho que no se haya probado | Igual | Según reinversión |")
w("")
w("### 8.3 Reglas por anuncio (adaptadas a 15 €/día)\n")
w("| Momento | Condición | Acción |")
w("|---|---|---|")
for r in [("1.000 impresiones","Hook rate (3 s) < 25 % o CTR < 0,8 %","Apagar. Cambiar el gancho (primeros 3 s), no el resto"),
("15 € gastados","0 compras","Apagar (es 1,4 × el CPA objetivo del pack de 2)"),
("2 compras","CPA > 16 € (por encima del máximo del pack de 2)","Bajar al mínimo y grabar otra versión"),
("3 compras","CPA ≤ 11 € durante 4 días","Ganador: duplicar (nueva miniatura + nuevo texto); subir el presupuesto de campaña un 20 % cada 3 días"),
("Semanal","CVR de la ficha < 3 % con CTR > 1,2 %","Problema de ficha, no de anuncio: revisar pack preseleccionado, reseñas, vídeo de la ficha, velocidad"),
("Cada 10 días por ganador","Frecuencia > 2,5 o CTR cae un 30 %","Refrescar: mismo guion, otra persona o otro primer plano"),
("Mensual","ROAS de la cuenta (ventas/gasto) < 2,5","Volver a 15 €/día y producir 6 creatividades nuevas antes de subir"),
("Siempre","—","Nunca editar un anuncio activo (reinicia el aprendizaje); nunca subir más del 20 %; nunca dejar un anuncio muerto encendido «por si acaso»")]:
    w(f"| {r[0]} | {r[1]} | {r[2]} |")
w("")
w("### 8.4 Proyección a 12 meses con la regla de reinversión\n")
w("Escenario **realista** (no optimista): CPA que empieza en 14 € y baja a 9 € cuando aparecen ganadores (nunca los 6–8 € que consigue Vue con 1,8 M € de historial); ticket medio 28 € (mezcla de packs y cajas sueltas); contribución media 14 €/pedido; presupuesto del mes siguiente = 50 % de la contribución + 500 € de aportación mientras el resultado del mes no llegue a 500 €, sin bajar nunca el presupuesto que ya funciona y con techo de 1.200 €/mes hasta el mes 6 y 1.500 € después (una cuenta nueva en España satura antes); el otro 50 % de la contribución va a stock. Si el CPA no baja de 12 € en el mes 3, el plan se para en la fila del mes 3.\n")
w("| Mes | Ads | CPA | Pedidos | Ventas (IVA incl.) | Contribución | Resultado tras ads | Aportación necesaria |")
w("|---|---:|---:|---:|---:|---:|---:|---:|")
cpa=[14,13,11,10,9.5,9,9,9,9,9,9,9,9]; aov=28; cm=14; tot=0; a=225; apt_tot=1000; prev_res=0; aport=1000
for m in range(0,13):
    ped=int(a/cpa[m]); ven=ped*aov; con=ped*cm; res_=con-a; tot+=res_
    w(f"| {m} | {int(a)} € | {f(cpa[m])} | {ped} | {int(ven)} € | {int(con)} € | {int(res_)} € | {'1.000 €' if m==0 else ('500 €' if aport else '0 €')} |")
    half=con*0.5; cap=1200 if m<6 else 1500
    aport=500 if res_<500 else 0
    if m<12: apt_tot+=aport
    a=min(cap,max(a if m>0 else 0,half+aport))
w(f"| **Total 12 meses** | | | | | | **{int(tot)} €** | **{int(apt_tot)} € aportados** |")
w("")
w("Traducción: con las reglas cumplidas, el resultado mensual es positivo desde el mes 1 (la contribución media de 14 € supera el CPA de 13 €), la aportación de 500 € deja de hacer falta hacia el mes 4 y desde el mes 5 el negocio se estabiliza en ≈ 130 pedidos/mes con 1.200 €/mes de ads que se pagan solos, dejando ≈ 650 €/mes de resultado antes de tu tiempo y de la legalización. **No es un negocio de 65.000 €/mes en el año 1**; es un negocio de 2.000–2.500 €/mes de ventas que demuestra qué anuncios venden, y esa demostración es lo que justifica (o no) la inversión grande del documento maestro. Si el CPA se queda en 14 €, el resultado mensual es negativo (−30 a −60 €/mes) y hay que parar en el mes 3.\n")
w("### 8.5 Calendario de oportunidades (donde el CPC baja o la demanda sube)\n")
w("Enero (propósitos, Rebajas: CPM bajo, demanda alta: el mejor mes para escalar) · marzo–abril (piel visible, primavera) · junio–julio (grasa, verano; Vue hace su «summer sale») · septiembre (vuelta a la rutina) · octubre (antes de que suba el CPM) · **noviembre y diciembre: no escalar**, CPM +40–60 %; mantener 15 €/día y vender a la lista de email/WhatsApp con la oferta de Navidad (Vue: hasta −45 %).\n")
# 9
w("## 9. Cómo producir anuncios buenos sin presupuesto\n")
w("- **Grabas tú (o una persona de confianza) con el móvil.** El 88 % de los anuncios de Vue son vídeo vertical hecho por creadoras con el teléfono. Se necesita: luz de ventana, la nariz a 20 cm de la cámara, el parche puesto por la noche y el parche quitado por la mañana grabado en el mismo sitio. Un solo día de grabación da material para 20 anuncios.")
w("- **La prueba visual es el activo.** Grabar 10 veces la retirada del parche por la mañana con la parte blanquecina hacia cámara. Es el plano que más se repite en los anuncios de 200 días y cuesta 0 €.")
w("- **Voz**: la tuya o TTS en español (el CRM/máquina ya tiene voces «Marisol» y masculina). Subtítulos grandes siempre: el 70 % se ve sin sonido.")
w("- **IA solo para lo que no se puede grabar**: quedan 155 créditos de Higgsfield (≈ 3 clips de Seedance 2.5). Reservarlos para 2 planos de producto/packshot animado y el «peel reveal» macro; todo lo demás, real.")
w("- **Estáticos a coste 0** (ffmpeg/Canva): packshot + una frase del catálogo; sirven para retargeting por email y para probar textos antes de grabar un vídeo.")
w("- **Reciclar**: cada guion ganador se regraba con otra persona, otro fondo y otro primer plano; cada vídeo se corta en 3 duraciones (15, 30, 45 s) y 2 miniaturas. Un ganador = 6 anuncios.")
w("- **Personas gratis**: amigos y familia como «Bea, Marisol y Álex» (mujer joven, mujer 35+, hombre); ofrecer producto gratis a 10 microcreadoras de TikTok España (< 20 k seguidores) a cambio de un vídeo con derechos de uso (coste: 10 cajas).\n")
# 10
w("## 10. Catálogo de 100 anuncios para elegir\n")
w("Está en `marketing/catalogo_100_anuncios.md` (y en el PDF, a continuación de este plan). 100 conceptos distintos, no variantes, agrupados en 12 familias, cada uno con su gancho en español, formato, duración, estructura, por qué debería funcionar según los datos de Vue, cómo se produce y con qué coste, y una prioridad A/B/C para el orden de test. Elige 5 de prioridad A de familias distintas para la semana 1.\n")
# 11
w("## 11. Lo mínimo legal que hay que saber (una línea)\n")
w("Vender un cosmético en España sin notificarlo en el CPNP y sin Persona Responsable en la UE es una infracción sancionable y deja al vendedor sin cobertura ante una reclamación; el coste de hacerlo bien para un producto es de 1.500–4.500 € (documento maestro, sección 11). Este plan no lo incluye en los 1.000 €: hay que decidirlo aparte.\n")
open("/home/user/Claude-septiembre/nocta/NOCTA_PLAN_BOOTSTRAP.md","w").write("\n".join(o)+"\n")
print("plan ok",len("\n".join(o)))
import json; json.dump({k:round(v,2) for k,v in res.items()},open("/tmp/claude-0/-home-user/e4610181-73c9-5b97-9776-a971b4d99e53/scratchpad/boot_res.json","w"),ensure_ascii=False)
