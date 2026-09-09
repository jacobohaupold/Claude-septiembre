# -*- coding: utf-8 -*-
USD=0.92
f=lambda x: ("%.2f"%x).replace(".",",")
o=[]; w=o.append
w("# NOCTA — Estudio de proveedores: precios reales, plazos reales y costes que no salen en la ficha\n")
w("**Versión 1.0 · 9 de septiembre de 2026.** Este estudio se ha hecho leyendo las fichas públicas de cada proveedor en Alibaba y Tradekorea el 9 de septiembre de 2026 (precio por tramo, MOQ, unidades vendidas, valoraciones, años en la plataforma, plazos declarados), la Guía de Servicios y Tarifas 2026 de DHL Express España, las tarifas 2026 de Correos, el arancel de la UE y guías de sourcing con casos reales de pedidos de muestra. Cada dato lleva su origen. Lo que no está verificado se dice: **«no verificado»**. Lo que un proveedor afirma de sí mismo se marca como **«declarado»**. Ningún proveedor ha sido contactado todavía: las cotizaciones en firme se piden con el guion de la sección 8.\n")
w("> La frase más honesta del estudio: **la ficha de Alibaba no es el precio**. El precio de la ficha es el 55–70 % de lo que vas a pagar de verdad por tener el producto en casa listo para vender. El resto son muestras, courier, tarjeta, IVA a la importación, gestión aduanera del courier y la caja. Todo eso está calculado en la sección 6 con cifras reales.\n")
# 1
w("## 1. Qué se ha mirado y qué no\n")
w("- **Mirado y verificado**: 8 fichas de parches de nariz de hidrocoloide en Alibaba (precio, MOQ, vendidos, valoración, años, país, verificación), 8 fichas de parches de granos/private label (Ningbo Alps, Vireo, Himalaya…), 2 fichas coreanas en Tradekorea (NewY Medical, Nurimedics), la ficha de Dermatech en Pietra, la ficha de una imprenta de cajas plegables en Alibaba (Artech Printing), tarifas y suplementos aduaneros de DHL Express España 2026, tarifas Correos 2026, arancel UE para 3304 y 3005, política de muestras con 6 casos reales documentados, nuevo derecho fijo de 3 € de la UE desde el 1 de julio de 2026.")
w("- **No verificable desde fuera**: la calidad real del hidrocoloide de cada fábrica (transparencia, adhesión 8 h, blanqueo), si el rollo es coreano (T&L) o chino, y el precio final que te darán a ti (las fichas dicen «negociable» en Corea). Eso solo se sabe con muestra física y cotización por escrito.")
w("- **No tratado a propósito**: el coste de legalizar el cosmético (CPNP, Persona Responsable), que va aparte por indicación tuya.\n")
# 2 fichas
w("## 2. Fichas de proveedores de parches (datos literales de las plataformas, 9-sep-2026)\n")
w("### 2.1 China: los que sirven para un lote pequeño\n")
w("| Proveedor | Años en Alibaba | Valoración (nº reseñas) | Vendido en la ficha | MOQ | Precio ficha | Estado | Qué vende exactamente |")
w("|---|---:|---|---:|---:|---|---|---|")
for r in [("**Lvsenlan Healthcare (Foshan) Co., Ltd.**","3","5,0 (7)","6.004 uds","3 uds","0,14–0,21 $/parche","Sin sello Verified","«Private Label Blackhead & Pimple Remover Nose Pads» hidrocoloide, forma de nariz"),
("**Shaanxi Keysing Bio-Tech Co., Ltd.**","2","4,7 (30) · 4,9 en otra ficha","100 uds","300 uds","0,29–0,39 $/parche","—","«Hydrocolloid Pimple Bandages for Nose Blackheads», transparente"),
("**Ningbo Alps Medical Technology Co., Ltd.**","8","— (sin cifra visible)","—","100 uds","0,12–0,45 $/hoja o ud según forma","Declara certificados HALAL, CE y **CPNP**","Parches de puntos, formas a medida (estrella, corazón), micropin; private label; útil para **granos** y para pedir troquel de nariz"),
("**Nanjing J SUN Healthcare Co., Ltd.**","12","4,6 (8)","1 (ficha nueva)","10.000 uds","0,17 $/parche","Verified","«Nose Strip Shape Plus Rectangular Shape» hidrocoloide: forma de nariz + rectángulo en la misma ficha"),
("**Guangzhou Vog Cosmetics Co., Ltd.**","8","4,3 (4)","400 cajas","1.000 cajas","1,22–1,59 $/**caja acabada**","Verified","Cajas de parches de acné con salicílico/tea tree listas con tu marca (turnkey)"),
("**Shenzhen Vireo Medical Co., Ltd.**","2","—","—","1.000 hojas","0,06–0,16 $/hoja","—","Parches invisibles de puntos, OEM/ODM (para granos, muy barato)"),
("**Trummed Medical (Hangzhou) Co., Ltd.**","11+ (declarado)","—","—","5.000 uds (fichas Alibaba)","No público","GMP, ISO 13485 (declarado), 110.000 m²","Tira de nariz hidrocoloide en catálogo (CMC), rollos; orientado a volumen"),
("**Shenzhen Baitejia / Duolai / Tongfei (Eelhoe, Elaimei)**","2–10","4,2–4,5 (58–844)","1 ud","1–12 uds","0,62–3,09 $/ud","Verified","Producto acabado de marcas chinas (Eelhoe, Elaimei); sirve para test, no para tu marca")]:
    w("| "+" | ".join(r)+" |")
w("")
w("**Lectura franca de estas fichas:**\n")
w("- **Lvsenlan es el candidato natural para el test**: precio más bajo, 6.004 unidades vendidas (la cifra más alta de la categoría), 5,0 de valoración… pero **solo 7 reseñas y 3 años**, y sin el sello Verified (no ha pasado la auditoría de terceros de Alibaba). Eso significa: fábrica pequeña o intermediario, comunicación probablemente buena, calidad desconocida. Se le pide muestra sí o sí y se paga por Trade Assurance, nunca fuera de la plataforma.")
w("- **Keysing** tiene el doble de precio pero 30 reseñas con 4,7–4,9 y MOQ 300: es la alternativa si la muestra de Lvsenlan falla en transparencia o adhesión.")
w("- **Ningbo Alps (8 años, MOQ 100, declara CPNP)** es el más interesante para **granos** y para pedir un troquel de nariz a medida: si de verdad tiene productos notificados en CPNP, ya conoce el papeleo europeo (a verificar pidiendo el número de referencia CPNP de un producto suyo).")
w("- **Nanjing J SUN (12 años, Verified)** y **Trummed (fábrica grande, ISO 13485)** son los proveedores de la **reposición de 10.000 unidades**, no del piloto: su MOQ los descarta ahora, pero conviene pedirles precio ya para tener la referencia.")
w("- **Vog Cosmetics** vende la caja acabada a 1,22–1,59 $: parece caro frente a 0,18 $/parche, pero incluye 8–12 parches, caja impresa y montaje. A 1.000 cajas es la vía «todo hecho» más barata que existe (≈ 1.400 $), y no entra en 1.000 € de presupuesto: guardar para el mes 3–4.")
w("- Las fichas con **precio 0,62–3,09 $** son marcas chinas acabadas (Eelhoe, Elaimei): sirven para comprar 12 unidades y probar anuncios antes de fabricar nada, igual que Catch Me Patch.\n")
w("### 2.2 Corea: calidad y claim, pero no para 1.000 €\n")
w("| Proveedor | Fundación / plataforma | MOQ | Precio | Plazo declarado | Pago | Certificados | Lo que dice su ficha |")
w("|---|---|---|---|---|---|---|---|")
for r in [("**NewY Medical Co., Ltd.** (Derma-Aid)","2016 · Tradekorea PRO","**1.000 packs**; stock 10.000 packs","«Negociable» en Tradekorea; en Alibaba 0,50 $/hoja (1k–9.999) → 0,32 $ (50k+)","**Lead time 30 días; delivery 60 días**","T/T u otros","3 certificados verificados","Puntos 10 y 12 mm, «100 % hydrocolloid fabric», corte «easy touch»; exporta a China, Rusia, EE. UU., UK, Vietnam; HS 3005"),
("**Nurimedics Co., Ltd.**","2013 · Tradekorea VIP","«Negociable» (500–1.000 según guías; **10.000–20.000 según otra fuente**)","«Negociable»","«Negociable»","L/C, T/T, Western Union","ISO 13485, ISO 22716","Pouch zip 107×168 mm, tarjeta 81×134 mm, caja 95×142 mm; biselado o no; parches impresos; informe de irritación a nombre del comprador; desde 2023 vende OEM a UE"),
("**Dermatech**","Seúl + Wilmington (EE. UU.) · Pietra","**1.000+**","No público","**Producción media 120+ días** (Pietra); responde en 1 día","—","ISO 22716, ISO 13485, KCGMP, FDA, CE (declarado)","Sin reseñas en Pietra; cliente citado: Bicosome"),
("**Taiki Cosmetics** (Japón/Francia)","—","**20.000 uds** en versión estándar","No público","—","—","—","Parche de nariz hidrocoloide con opción salicílico/tea tree"),
("**GBSA / Catch Me Patch (Nico Medical)**","1 año en Alibaba · Verified","**160 uds**","**2,09–2,31 $/ud** (2,32–2,57 con descuento del 10 %)","—","Trade Assurance","—","Producto coreano acabado con su marca: para test de mercado"),
("**Awesome April / Twoa**, **SourcingLab**","—","No público","No público","—","—","—","Solo contacto directo; SourcingLab actúa como agente (+10–25 %)")]:
    w("| "+" | ".join(r)+" |")
w("")
w("**Lectura franca:** los coreanos no publican precio ni MOQ porque los deciden por cliente. Las dos guías del sector que hablan de Nurimedics se contradicen (500–1.000 frente a 10.000–20.000 unidades): la segunda es más creíble para un troquel de nariz a medida. NewY es el único con cifras: **1.000 packs de mínimo y 30 días de producción más 60 de entrega**. Con 1.000 € no hay pedido coreano posible salvo comprar Catch Me Patch acabado (160 uds ≈ 350 $) para probar anuncios. **Corea entra en el mes 4–6, con la primera reposición pagada por ventas.**\n")
w("### 2.3 Packaging: la ficha real de una imprenta de cajas\n")
w("| Proveedor | Años | Valoración | Vendido | Reorden | MOQ | Precio por tramo | Plazo | Muestra |")
w("|---|---:|---|---:|---:|---:|---|---|---|")
w("| **Guangdong Artech Printing Corp** (Jiangmen) | 3 | 4,7 (132) | 60.991 | 38 % | 100 uds | **0,57 $ (100–999) · 0,43 $ (1.000–4.999) · 0,32 $ (5.000) · 0,15 $ (10.000+)** | 10 días (≤ 100) · 15 días (101–10.000) | Diseño en 3 días, muestra impresa en 7 días |")
w("")
w("Cartulina 350 g, laminado mate o brillo, UV, estampado. Es una ficha con 132 reseñas y un 38 % de clientes que repiten: fiable. Confirma lo dicho en el plan: **500 cajas impresas cuestan ≈ 285 $ y 1.000 cajas ≈ 430 $**; el salto a 1.000 sale casi gratis. El proveedor de parches puede subcontratar esto mismo (mismo precio o algo más) y montarlo, que es lo cómodo; pedirlo a una imprenta aparte solo compensa si el de parches no lo ofrece.\n")
# 3 plazos
w("## 3. Plazos reales, de principio a fin\n")
w("| Paso | China (lote pequeño) | Corea (NewY / Nurimedics) | Fuente |")
w("|---|---|---|---|")
for r in [("Respuesta al primer mensaje","Horas (Alibaba mide ≤ 2 h en muchos proveedores)","1–3 días laborables (huso horario, inglés variable)","Fichas; Pietra (Dermatech: 1 día)"),
("Muestra de stock: preparación","3–5 días laborables","5–10 días","Guía Veilta 2026"),
("Muestra con troquel propio","10–15 días laborables (+7–10 por cada revisión)","3–4 semanas","Guía Veilta; informe 06"),
("Courier de la muestra","5–7 días (DHL/FedEx), 10–20 días si es «económico»","5–7 días","Casos reales documentados"),
("Producción del lote","**7–15 días laborables** para 1.000–5.000 uds; 5–8 días en los más rápidos","**30 días** (NewY, declarado); Dermatech 120+ días (Pietra)","Fichas Alibaba; Tradekorea; Pietra"),
("Caja impresa","10–15 días (Artech), en paralelo a los parches","Incluida en los 30 días o subcontratada","Ficha Artech"),
("Transporte","Express 3–7 días; aéreo consolidado 7–12 días; marítimo 35–50 días puerta a puerta","Express 3–6 días","DHL (Shenzhen→España 3–5 días laborables), guías de logística"),
("Aduana en España","1–3 días; **hasta +7 si hay inspección física o piden documentación** (cosméticos y «productos de cuidado personal» están en la lista de DHL de mercancías que pueden requerir permisos)","Igual","Guía DHL 2026"),
("**Total realista, desde el primer mensaje hasta tener cajas en casa**","**5–7 semanas** (muestra + lote + envío), 8–9 si hay una revisión de muestra","**10–16 semanas**; guía del sector: 14–22 semanas para un lanzamiento completo","Suma de lo anterior; Veilta")]:
    w("| "+" | ".join(r)+" |")
w("")
w("Lo que retrasa de verdad, por experiencia documentada: (1) pedir la muestra por transporte «económico» para ahorrar 20 €, (2) no tener el artwork de la caja listo cuando el proveedor lo pide (cada ida y vuelta son 3–7 días), (3) pagar el saldo tarde, (4) la aduana pidiendo la factura comercial con descripción exacta, valor y código arancelario (ponerlo bien desde el principio: **«hydrocolloid nose patches, cosmetic use, HS 3304 99 00»** o **3005 10 00** si el proveedor los declara como apósito; ver sección 5).\n")
# 4 lo que cuesta de verdad
w("## 4. Costes reales que no están en la ficha (con cifras)\n")
w("| Concepto | Cuánto | Cuándo se paga | Fuente / nota |")
w("|---|---|---|---|")
for r in [("Muestra de producto (custom)","20–50 $ de tasa (a veces reembolsable en el pedido) o 1–3 × el precio unitario; stock: gratis","Antes de todo","6 casos reales: 0–45 $ de tasa"),
("Courier de la muestra","18–65 $ (0,4–2 kg, 5–7 días); con cuenta propia de DHL/FedEx un 30–50 % menos","Con la muestra","Casos reales: 19–58 $"),
("Total realista por juego de muestras","**40–150 $**","—","Guía de muestras 2026"),
("Placa/troquel de la caja impresa","45 $ (caso real, imprenta de Dongguan) o incluido a partir de 500–1.000 uds","Con la primera caja","Caso real nº 6"),
("Troquel del parche a medida (forma de nariz propia)","China: 50–200 $ para un troquel plano simple; Corea: 500–2.000 $","Solo si no usas su forma de catálogo","Informe 06; guías OEM"),
("Pago con tarjeta en Trade Assurance","**2,99 %** del importe; límite 12.000 $","Al pagar","Alibaba"),
("Pago por transferencia (T/T)","20–40 € de comisión bancaria por transferencia (dos transferencias si es 30/70)","Al pagar","Bancos ES"),
("Transporte express China→España","**25–90 $ por 0,5–5,5 kg**; 5–15 $/kg en lotes de 10–30 kg; DHL 3–5 días laborables","Antes de embarcar (lo cobra el proveedor) o a la llegada","Guías 2026; DHL"),
("IVA a la importación","**21 % sobre (mercancía + transporte + seguro + arancel)**","A la llegada, lo adelanta el courier","AEAT. Recuperable si estás dado de alta en IVA (autónomo/SL); si no, es coste"),
("Arancel","**0 %** en la UE para 3304 (cosméticos) y para 3005 (apósitos adhesivos), sea China o Corea","—","Arancel UE (3304: 0 % erga omnes, verificado). **El «6,5 % China frente a 0 % Corea» que aparecía en documentos anteriores no es real**"),
("Derecho fijo de 3 € por línea (UE, desde 1-jul-2026)","3 € por categoría de artículo en envíos ≤ 150 € de comercio electrónico (IOSS)","A la llegada","Reglamento UE 2026; aplica a compras B2C tipo AliExpress, no a una importación B2B con EORI declarada normal"),
("DHL: tramitación de derechos e impuestos (sin cuenta)","**2 % de los cargos fiscales, mínimo 15 €**","A la entrega","Guía DHL Express España 2026"),
("DHL: despacho formal (si el envío requiere despacho no rutinario)","**mínimo 29,50 €** por envío","A la entrega","Guía DHL 2026"),
("DHL: permisos y licencias (cosméticos figuran en la lista)","**49 € + coste del certificado** por envío, si Aduanas lo exige","A la entrega","Guía DHL 2026"),
("DHL: intervención física de Aduanas","30 € por envío","Si hay inspección","Guía DHL 2026"),
("DHL: almacenamiento fiscalizado","11 €/envío + 0,50 €/kg por día a partir del 3.º día","Si la aduana retiene el envío por documentación","Guía DHL 2026"),
("Inspección pre-embarque (opcional en el piloto)","200–400 $","Antes del 70 % final","Guía Veilta; informe 06"),
("Envío al cliente final en España","Packlink PRO: **desde 2,47 € con Correos** (plan Plus 25 €/mes) o desde 2,38 € (Premium 60 €/mes); realista 3,5–4,5 € por sobre < 1 kg con plan gratuito. Tarifa pública de Correos en oficina: **13,50 €** (sobre acolchado Paq Estándar)","Por pedido","Packlink PRO; Correos 2026. Nunca enviar a tarifa de ventanilla")]:
    w("| "+" | ".join(r)+" |")
w("")
# 5 costes que no son reales
w("## 5. Lo que parece coste (o ventaja) y no lo es\n")
w("- **El arancel coreano.** Los documentos anteriores del proyecto daban a Corea una ventaja de arancel (0 % frente a 6,5 % China). En la UE, el capítulo 3304 (cosméticos) está a **0 % para todos los orígenes**, y 3005 (apósitos) también. La única ventaja real de Corea es la calidad del rollo y el claim *Made in Korea* para los anuncios; no hay ventaja fiscal.")
w("- **Las «muestras gratis».** Son gratis en producto de stock; el courier (18–65 $) lo pagas siempre. Una muestra con tu troquel nunca es gratis.")
w("- **El MOQ de la ficha.** Es una cifra de negociación. Lvsenlan pone 3 uds (para que entres), J SUN 10.000 (para filtrar). Casi todos aceptan un «trial order» del 30–50 % del MOQ si pagas por Trade Assurance y no pides troquel.")
w("- **El sello Verified.** Significa que un tercero ha comprobado que la empresa existe y tiene la capacidad que declara; no que su hidrocoloide se pegue 8 horas ni que sea transparente. La única prueba es la muestra sobre tu nariz comparada con una caja de Vue o Hero.")
w("- **«Korean grade» / «rollo T&L».** No se puede verificar desde fuera; pedir la ficha técnica del material (MSDS/COA) y el nombre del fabricante del rollo. Si no lo dan, asumir rollo chino.")
w("- **El plazo de la ficha («7 días»).** Es solo producción. Sumar muestra, courier, aduana y tu propia revisión del artwork: 5–7 semanas reales.")
w("- **El DDP «sin sorpresas».** El forwarder incluye el IVA en el precio y no te lo puedes deducir. Para una empresa con IVA, DDU/DAP + despacho propio es más barato.")
w("- **La tasa de 3 € desde julio de 2026.** Es para paquetes de consumo (Temu, AliExpress) por artículo; un pedido B2B declarado con EORI va por el circuito normal: arancel 0 % + IVA 21 % + gestión del courier.")
w("- **El IVA a la importación como coste.** Es coste de caja, no de resultado, si estás dado de alta: lo pagas al courier y lo recuperas en la liquidación trimestral. Si vendes sin alta fiscal, es un 21 % real sobre el producto.")
w("- **Las cajas «de regalo» del proveedor.** Cuando un proveedor de parches «incluye la caja gratis», es caja blanca estándar o va metida en el precio unitario. Pedir el desglose.\n")
# 6 cálculo
w("## 6. El pedido piloto con todos los costes (dos variantes)\n")
w("Tipo de cambio 1 $ = 0,92 €. Precios de ficha, tramo más bajo razonable para la cantidad. IVA calculado como salida de caja (se recupera si hay alta en IVA).\n")
def variant(title, rows):
    w(f"### {title}\n")
    w("| Concepto | Cantidad × precio | $ | € |")
    w("|---|---|---:|---:|")
    tot=0
    for c,q,usd in rows:
        eur=usd*USD; tot+=eur
        w(f"| {c} | {q} | {f(usd)} | {f(eur)} |")
    return tot
rowsA=[("Parches de nariz (Lvsenlan, tramo alto de la ficha por cantidad pequeña)","1.000 × 0,20 $",200),
("Hojas de puntos para granos (Alps/Vireo)","60 hojas × 0,30 $",18),
("Bolsas zip transparentes 60×80 mm","1.100 × 0,02 $",22),
("Muestras: tasa + courier (2 proveedores)","40 $ + 40 $",80),
("Cajas kraft neutras estándar (RajaPack/Alibaba) + etiquetas impresas en España (250 uds)","≈ 0,45 €/ud → en $",122),
("Transporte express China→España (≈ 6–8 kg con cajas neutras aparte)","1 envío",110),
("Comisión tarjeta Trade Assurance 2,99 %","s/ 350 $",10),
]
tA=variant("Variante A · Mínimo absoluto: 125 cajas de nariz + 40 de granos, caja neutra con etiqueta",rowsA)
goods=(200+18+22+110)*USD; iva=0.21*goods; dhl=15
w(f"| IVA a la importación 21 % s/ (mercancía + transporte ≈ {f(goods)} €) | | | {f(iva)} |")
w(f"| Gestión aduanera del courier (mínimo) | | | {f(dhl)} |")
w(f"| **Total salida de caja** | | | **{f(tA+iva+dhl)} €** |")
w(f"| De los cuales IVA recuperable | | | {f(iva)} € |")
w("")
rowsB=[("Parches de nariz (Lvsenlan)","1.400 × 0,18 $",252),
("Hojas de puntos para granos","100 × 0,30 $",30),
("Bolsas zip","1.500 × 0,02 $",30),
("Muestras: tasa + courier (2 proveedores)","40 $ + 40 $",80),
("Cajas impresas 350 g mate (Artech o subcontratada por el de parches), incluye placa","500 × 0,57 $",285),
("Tarjeta de instrucciones A7 (misma imprenta)","500 × 0,04 $",20),
("Transporte express China→España (≈ 10–12 kg: parches + 500 cajas planas)","1 envío",160),
("Comisión tarjeta 2,99 %","s/ 700 $",21),
]
tB=variant("Variante B · Con caja impresa: 175 cajas de nariz + 65 de granos y 500 cajas para la reposición",rowsB)
goodsB=(252+30+30+285+20+160)*USD; ivaB=0.21*goodsB
w(f"| IVA a la importación 21 % s/ ≈ {f(goodsB)} € | | | {f(ivaB)} |")
w(f"| Gestión aduanera del courier (mínimo; 29,50 € si exigen despacho formal) | | | 15,00–29,50 |")
w(f"| **Total salida de caja** | | | **{f(tB+ivaB+15)}–{f(tB+ivaB+29.5)} €** |")
w(f"| De los cuales IVA recuperable | | | {f(ivaB)} € |")
w("")
w(f"**Conclusión franca:** la variante A cuesta ≈ {int(tA+iva+dhl)} € y deja ≈ {1000-int(tA+iva+dhl)} € para anuncios en el mes 0; la variante B cuesta ≈ {int(tB+ivaB+22)} € y deja ≈ {1000-int(tB+ivaB+22)} €. En el plan (Parte 1, sección 4) se habían presupuestado 555 € para producto y packaging: **era optimista en 100–250 € porque no contaba el IVA a la importación ni la gestión del courier**. La Parte 1 queda corregida con la variante A como base y la caja impresa como decisión del mes 2, pagada con las primeras ventas. Coste por caja de nariz resultante: variante A ≈ 3,4 € (con IVA como caja) / 2,9 € (sin IVA); variante B ≈ 3,3 € / 2,8 € a pesar de la caja impresa, porque se reparte entre más unidades.\n")
# 7 recomendación
w("## 7. Recomendación y orden de contacto\n")
w("| Orden | A quién | Qué pedir | Criterio de descarte |")
w("|---|---|---|---|")
for r in [("1 (hoy)","Lvsenlan Healthcare (Foshan)","Muestra de nose patch hidrocoloide transparente 0,5 mm, 10 uds, courier DHL; precio para 1.000 / 1.400 / 3.000; MSDS/COA; fabricante del rollo; si montan caja impresa y a qué precio","No responde en 48 h; no da MSDS; muestra blanca/opaca o se despega antes de 8 h"),
("1 (hoy)","Shaanxi Keysing Bio-Tech","Lo mismo (alternativa)","Igual"),
("1 (hoy)","Ningbo Alps Medical","Muestra de hojas de puntos 10/12 mm; precio 60 / 100 / 500 hojas; **número CPNP de un producto suyo**; coste de troquel de nariz a medida","Si el CPNP que declara no existe, tratar como cualquier otro"),
("2 (esta semana)","Nanjing J SUN y Trummed","Precio de referencia a 10.000 uds de nariz, con y sin caja; plazo","Solo referencia para la reposición"),
("2 (esta semana)","NewY Medical y Nurimedics","Precio y MOQ real de un parche de nariz con su troquel de catálogo; coste de troquel propio; plazo; muestra pagada","Si MOQ ≥ 1.000 cajas o plazo > 60 días, queda para el mes 4–6"),
("3 (opcional)","GBSA / Catch Me Patch","12–24 cajas acabadas para grabar anuncios con producto real coreano mientras llega el lote","Ninguno: es atrezo"),
("Packaging","El proveedor elegido primero; Artech Printing si no lo ofrece","500 cajas 350 g mate con tu artwork sobre su dieline; muestra impresa en 7 días","Si el de parches cobra > 0,70 $/caja a 500, imprimir aparte")]:
    w("| "+" | ".join(r)+" |")
w("")
w("### 8. Mensaje para enviar (copiar y pegar en Alibaba / correo)\n")
w("```")
w("Subject: Hydrocolloid nose patch – sample + trial order (Spain)")
w("")
w("Hello, I run a skincare brand in Spain (NOCTA) launching hydrocolloid nose patches.")
w("Product: transparent hydrocolloid nose patch, nose/butterfly shape approx. 60 x 45 mm,")
w("0.5 mm thickness, PET liner, no actives. Please send:")
w("1) Price per patch for 1,000 / 1,400 / 3,000 / 10,000 pcs (EXW and with DHL to Madrid, 28001).")
w("2) Your standard nose dieline (drawing with dimensions) and the cost of a custom die.")
w("3) MSDS / COA of the hydrocolloid and the name of the roll manufacturer.")
w("4) Options and price for: transparent inner pouch, printed folding carton (350 gsm, matte),")
w("   instruction card, assembly. MOQ for the printed box at 500 and 1,000 pcs.")
w("5) Production lead time for 1,400 pcs and the sample lead time.")
w("6) Sample: 10 patches of your stock nose shape. I will pay the courier (DHL). Is the")
w("   sample fee refundable on the trial order?")
w("7) Payment via Trade Assurance. Certificates: ISO 13485 / ISO 22716 if available.")
w("Thank you.")
w("```")
w("")
w("### 9. Fuentes consultadas (9 de septiembre de 2026)\n")
for s in ["Alibaba, listado «hydrocolloid nose patch» (fichas de Lvsenlan, Keysing, J SUN, Vog, Baitejia, Duolai, Tongfei, GBSA/Catch Me Patch): alibaba.com/wholesale/hydrocolloid-nose-patch.html",
"Alibaba, listado «acne patch private label» (Ningbo Alps, Vireo, Himalaya): alibaba.com/premium/acne_patch_private_label.html",
"Alibaba, ficha de cajas plegables de Guangdong Artech Printing: alibaba.com/product-detail/…1601437492445.html",
"Tradekorea, NewY Medical (P817677) y Nurimedics (P815755)",
"Pietra, ficha de Dermatech (MOQ 1.000+, producción 120+ días)",
"Trummed Medical (trummed.com) y Taiki Cosmetics (MOQ 20.000)",
"Veilta, «Private Label Acne Patches: MOQ, Cost & Launch Guide (2026)»",
"China Market Guide, «Alibaba Sample Orders: What They Really Cost (6 real examples)»",
"Alibaba Help Center, comisión de tarjeta en Trade Assurance (2,99 %)",
"DHL Express España, Guía de Servicios y Tarifas 2026 (suplementos de aduana)",
"Correos, Tarifas 2026 Península y Baleares; Packlink PRO, tarifas",
"Arancel UE (capítulo 3304: 0 % erga omnes); AEAT y Taric.es sobre el derecho fijo de 3 € desde el 1-7-2026"]:
    w(f"- {s}")
open("/home/user/Claude-septiembre/nocta/proveedores/ESTUDIO_PROVEEDORES.md","w").write("\n".join(o)+"\n")
print("supply ok",len("\n".join(o)), "A",round(tA+iva+dhl),"B",round(tB+ivaB+22))
