# PLAYBOOK MAESTRO — Marca DTC de Skincare (España / UE) · Septiembre 2026

> Destilado de 70+ búsquedas y fuentes: Shopify Academy, Meta Blueprint, TikTok Academy / TikTok Shop Academy, Google Skillshop, Klaviyo Academy, CXL, HubSpot Academy, Semrush Academy, Hotjar Learning, Gorgias Academy, y los playbooks públicos de Hormozi, Suby, Theriot, Denney, Chappell, Fogarty, Bartlett (True Classic), Holiday (CTC), Ecom King, Welch, Ghiorghiu, más análisis de Hero Cosmetics, Starface, COSRX, Anua, Skin1004 y Medicube. Todo cruzado con benchmarks 2026 y la normativa fiscal/cosmética de España y la UE.
>
> **Cómo usarlo:** cada sección tiene (1) reglas, (2) checklist, (3) plantillas y (4) KPIs objetivo. Al final: plan de 90 días, catálogo de cursos gratuitos y fuentes.

---

## ÍNDICE

0. Los 12 principios que resumen todo
1. Unit economics: rentabilidad de primer pedido, LTV/CAC y presupuesto (CTC + Eightx)
2. Investigación de cliente y avatar (minería de reseñas, awareness, sofisticación)
3. Oferta irresistible: Hormozi, Suby, bundles y palancas de AOV
4. Shopify: setup, ficha de producto (CRO), checkout, pagos en España, upsells
5. Meta Ads 2026: Andromeda, Advantage+, estructura, testing, escalado, medición
6. Estrategia creativa y UGC: hooks, guiones, fórmulas, compliance de claims
7. TikTok: Ads (Smart+, Spark Ads), TikTok Shop España, GMV Max, afiliados
8. Google: Performance Max + Shopping para skincare
9. Klaviyo: email y SMS — flows, specs, benchmarks, RGPD
10. Retención, suscripción, post-compra y CX
11. Seeding de influencers y creadores
12. Playbooks de marcas de skincare que escalaron (parches hidrocoloides, K-beauty)
13. España / UE: fiscalidad (IVA, OSS, IOSS), CPNP, claims, logística, 3PL, Shopify Markets
14. Cuadro de mando: KPIs y benchmarks 2026
15. Plan de 90 días
16. Catálogo de cursos gratuitos (con URLs)
17. Fuentes

---

## 0. LOS 12 PRINCIPIOS QUE RESUMEN TODO

1. **El beneficio vive en la recompra.** En skincare, el primer pedido suele ser neutro o negativo (AOV ~60-70 €, margen bruto ~65-70 %, CAC 45-70 €). Diseña el negocio para que el cliente vuelva a los ~90-104 días y para que la suscripción aporte el 30-40 % de ingresos en 12-18 meses.
2. **La creatividad ES la segmentación.** Con Andromeda (Meta) y Smart+/GMV Max (TikTok) el algoritmo lee el anuncio para decidir a quién mostrarlo. Público amplio + 20-30 creatividades *genuinamente distintas* por conjunto > cualquier estructura de audiencias.
3. **Una oferta > mil hooks.** Ecuación de valor (Hormozi): sube el resultado soñado y la probabilidad percibida; baja el tiempo y el esfuerzo. Garantía, bonus, escasez y urgencia son los multiplicadores.
4. **Vende rutinas, no unidades.** El AOV top-decil en skincare (290 $+) sale de bundles de rutina, packs multi-unidad y suscripción, no de subir precios.
5. **Mide contribución, no ROAS.** ROAS de plataforma sobreatribuye un 20-60 %. Gobierna por aMER/MER, margen de contribución de primer pedido y tests de incrementalidad.
6. **TikTok Shop en España es un canal de afiliados, no un marketplace.** El 70-87 % del GMV en España sale de creadores afiliados. Presupuesta comisiones (8-20 %) y gestión de programa, no "listar el catálogo".
7. **Email/SMS deben ser el 25-35 % de ingresos.** 5 flows básicos generan ~80 % de los ingresos por flows con el 5 % de los envíos.
8. **Cumplimiento primero.** Reglamento 655/2013 (claims), CPNP, Meta/TikTok claims-based (jul-2026): sin "cura", "elimina", nombres de patologías ni "antes/después" con lenguaje de inferioridad.
9. **Velocidad creativa > perfección.** 10+ creatividades nuevas al mes es la línea que separa a las marcas con ROAS 3x+ (o repetición >40 %).
10. **Datos server-side obligatorios.** Solo píxel penaliza; CAPI con deduplicación y Event Match Quality alto es requisito de entrada al "retrieval" de Andromeda.
11. **El feed y la PDP son el producto.** PMax, Shopping y Catalog Ads viven del feed; las visitas frías van a página de producto (no a categoría).
12. **La UE se opera desde España con OSS (mod. 369), CPNP y un multi-carrier.** Superado el umbral de 10.000 € B2C intracomunitario, IVA del país destino.

---

## 1. UNIT ECONOMICS: RENTABILIDAD DE PRIMER PEDIDO, LTV/CAC Y PRESUPUESTO

### 1.1 Marco Common Thread Collective (Taylor Holiday)

**Definiciones**
- **Margen de contribución de primer pedido** = Ingresos del primer pedido − COGS − gastos variables (envío, fulfillment, comisiones de pago, devoluciones, impuestos) − CAC combinado.
- **aMER (acquisition Marketing Efficiency Ratio)** = Ingresos de nuevos clientes ÷ gasto de adquisición. **MER** = ingresos totales ÷ gasto total en ads.
- **Coste de entrega (Cost of Delivery)** = todos los costes variables por pedido.
- **Spending Power**: relación histórica gasto→eficiencia (regresión) para saber cuánto puedes gastar antes de que la eficiencia caiga por debajo del umbral.

**Fórmulas**
```
CAC máximo en break-even = (Ingreso 1er pedido − COGS − otros variables)
aMER requerido            = Ingreso 1er pedido ÷ CAC máximo
Beneficio                 = Margen de contribución − OPEX
```

**Reglas CTC**
1. Solo costes variables para decidir adquisición; los fijos no se prorratean por pedido.
2. Rechaza las medias: analiza el **valor de pedido modal** y el histograma, no el AOV promedio.
3. Cada campaña/producto con su propio objetivo de AOV, margen y tope de CAC (Meta optimiza al pedido más barato: si mezclas sérum de 29 € con rutina de 89 € en la misma campaña, matará la rutina).
4. Rentabilidad antes que crecimiento: "no necesitas ingresos, necesitas beneficio".
5. Los ingresos de clientes existentes deben cubrir el OPEX por sí solos.
6. LTV es métrica secundaria: no sacrifiques caja hoy por LTV proyectado salvo casos extraordinarios (>300 %).

### 1.2 Benchmarks financieros skincare 2026 (Eightx, Foundry CRO)

| Métrica | Rango | Objetivo |
|---|---|---|
| Margen bruto | 65-75 % (públicas 69-74 %) | ≥ 65 % mínimo; >75 % fuerte |
| COGS | 26-31 % de ingresos | ≤ 30 % |
| SG&A (marcas escaladas) | 57-66 % | — |
| CAC combinado | 45-70 $ (rango 35-120 $) | 35-45 $ fuerte; >90 $ alarma |
| CPA Meta skincare | 30-70 $ | — |
| AOV | 55-80 $ (mediana 60-70 $) | Subir vía bundles a 90-120 € |
| LTV:CAC | 3:1 mínimo; 4-5:1 maduro; <2:1 peligro | ≥ 3:1 a 12 meses |
| Repetición 90 días | 25-30 % sano; <12 % problema | ≥ 25 % |
| Repetición 12 meses | 30-45 % (consumibles top 40-55 %) | ≥ 35 % |
| Intervalo de recompra | ~104 días | Diseñar flows a día 60/75/90 |
| Devoluciones skincare | 10-15 % (beauty general 4-10 %) | < 8 % |
| Rotación de inventario | Públicas 1,7-2,9x; DTC fuerte 4-6x | 60-90 días de stock |
| Churn mensual suscripción | 8-14 % media; top <3 % | < 6 % |
| Conversión a suscripción | 15-20 % media; 25-35 % optimizada | ≥ 25 % |
| Email/SMS sobre ingresos | 25-35 % | ≥ 30 % |
| ROAS blended Meta | 2,5x sano; 3x+ alto | Fija por contribución, no por ROAS |

**Ejemplo (Eightx):** pedido 66 $ × 69 % MB = 45,5 $ de beneficio bruto; CAC 66 $ → el primer pedido pierde ~20 $. "El beneficio vive enteramente en la recompra".

**Ejemplo (Foundry, skincare):** CAC 60 $, AOV 71 $, MB 69 %, repetición 90d 30 %, 2,6 pedidos/año de quienes repiten → LTV comprador único 49 $ (0,82:1); repetidor 127 $ (2,1:1); suscriptor 392-490 $ (6,5-8,2:1). **Conclusión: la suscripción es la palanca #1 de LTV.**

**Fórmulas LTV**
```
LTV_12m        = AOV × margen_bruto × (1 + tasa_repetición × pedidos_repetidos_medios)
LTV_suscriptor = LTV_12m × 2,3
LTV_mezclado   = (1 − %sub) × LTV_12m + %sub × LTV_suscriptor
```

### 1.3 Checklist de unit economics (hazlo antes de gastar 1 € en ads)
- [ ] Hoja por SKU: PVP, COGS (producto + envase + etiquetado), envío medio, fulfillment, comisión pago (~1,5-2,9 % + 0,25 €), devoluciones esperadas, IVA.
- [ ] Margen de contribución por pedido modal (no promedio) y por bundle.
- [ ] CAC máximo por campaña/oferta; tope de puja/CPA en Meta por producto.
- [ ] Modelo de cohortes: % que recompra a 30/60/90/180 días, pedidos por cliente, margen acumulado.
- [ ] Umbral de "spending power": a qué gasto mensual el aMER cae bajo el break-even.
- [ ] Revisión mensual: reconciliar ingresos reales vs. supuestos de margen.
- [ ] Rotación de inventario objetivo 4-6x; si <3x, es tu proyecto de caja #1.

---

## 2. INVESTIGACIÓN DE CLIENTE Y AVATAR

### 2.1 Minería de reseñas (método de los creadores de performance)
Fuentes: reseñas de Amazon/Sephora/Druni/Primor de productos competidores, comentarios de TikTok de vídeos virales, Reddit (r/SkincareAddiction, r/AsianBeauty), foros, tus propios tickets de soporte y encuestas post-compra.

**Plantilla de extracción (rellena 50-100 reseñas por avatar):**
| Campo | Qué capturar |
|---|---|
| Dolor exacto (literal) | "me salen granitos justo antes de la regla" |
| Resultado soñado | "piel de cristal", "poder salir sin base" |
| Objeción | "me da miedo que me irrite", "los parches se despegan" |
| Momento de uso / contexto | noche, viaje, antes de evento |
| Lenguaje y jerga | "glow", "barrera", "piel reactiva" |
| Producto anterior que falló y por qué | "el de X me resecó" |
| Prueba que buscan | dermatólogo, ingredientes %, antes/después realista |

Salida: 3-5 **avatares** con nombre, dolor primario, deseo, objeción principal, canal favorito y nivel de conciencia.

### 2.2 Niveles de conciencia y sofisticación (Nick Theriot, basado en Schwartz)
- **Conciencia:** Inconsciente → consciente del problema → consciente de la solución → consciente del producto → más consciente. Cada nivel exige un hook distinto (educativo vs. comparativo vs. oferta directa).
- **Sofisticación del mercado:** en skincare estamos en nivel 4-5 (mercado saturado): la promesa simple ya no funciona; hace falta **mecanismo nuevo** (ingrediente/tecnología), **avatar nuevo** (ej. piel masculina, +45, adolescente), **deseo nuevo** (de "curar acné" a "ritual de calma nocturna"), **visual exagerado** o **estilo creativo nuevo** (texto largo nativo cuando todos hacen UGC).
- "La gente no compra productos; compra la persona en la que quiere convertirse." Un mismo producto tiene 5 compradores con 5 razones: haz un ángulo por avatar.

### 2.3 Checklist de investigación
- [ ] 100 reseñas minadas → tabla dolor/deseo/objeción.
- [ ] 5 avatares con nivel de conciencia asignado.
- [ ] Lista de 20 "creencias" que el cliente debe tener para comprar (y qué prueba desbloquea cada una).
- [ ] Mapa de competidores: promesa, mecanismo, precio, oferta, formato creativo dominante (Meta Ad Library + TikTok Creative Center).
- [ ] Encuesta post-compra (1 pregunta: "¿qué casi te impide comprar?").

---

## 3. OFERTA IRRESISTIBLE: HORMOZI, SUBY, BUNDLES Y AOV

### 3.1 Ecuación de valor (Hormozi, *$100M Offers*)
```
Valor = (Resultado soñado × Probabilidad percibida) ÷ (Tiempo hasta resultado × Esfuerzo y sacrificio)
```
Aplicado a skincare:
- **Resultado soñado:** "piel calmada y uniforme sin maquillaje" > "reduce rojeces".
- **Probabilidad percibida:** % de ingredientes activos, test clínico/consumidor, reseñas verificadas, dermatólogo, garantía.
- **Tiempo:** "notarás la piel más hidratada desde la primera noche; textura visible en 28 días" (siempre sustanciable).
- **Esfuerzo:** rutina de 2 pasos, guía de uso, recordatorio por email/SMS, formato fácil (parche, stick).

**Proceso Grand Slam Offer (6 pasos)**
1. Define el resultado soñado con plazo y emoción.
2. Lista 15+ obstáculos (conocimiento, habilidad, entorno, psicología): "no sé qué orden usar", "me olvido por la noche", "me da miedo irritarme", "no tengo tiempo".
3. Convierte cada obstáculo en "cómo…": guía de rutina, recordatorios, muestra de parche test, mini-formato viaje.
4. Diseña el vehículo de entrega (PDF, vídeo, mini-producto, acceso a chat con esteticista).
5. Puntúa valor/coste (1-10); conserva 6-10 piezas de alto valor y bajo coste.
6. Añade garantía, escasez, urgencia y bonus **con nombre**.

**Reglas de precio y presentación**
- Muestra tres números: valor total, tu inversión, ahorro.
- Precio alto señala calidad; no compitas por precio en cosmética.
- Bonus apilados y valorados por separado ("Guía de rutina 28 días — valor 19 €").
- **Garantía:** incondicional (60 días, devolución aunque esté abierto), condicional ("si sigues la rutina 28 días y no ves mejora"), o "anti-garantía" para packs premium. En cosmética, la garantía de satisfacción de 30-60 días es el estándar que sube conversión sin disparar devoluciones (10-15 % skincare).
- **Escasez:** lotes limitados, edición, stock real. **Urgencia:** bonus con fecha, precio de lanzamiento, envío gratis hasta X.
- **Nombre (MAGIC):** Magnetiza (avatar), Anuncia el resultado, Give a plazo, Incluye el mecanismo, Contenedor ("Kit Piel Calma 28 Días").

### 3.2 Sabri Suby (*Sell Like Crazy*) — funnel de valor
- **HVCO (High Value Content Offer):** quiz de piel, "guía de rutina según tu tipo de piel", test de barrera → captura email/SMS (alimenta flows de Klaviyo).
- **Godfather Offer** (7 componentes): razón lógica de la oferta, construcción de valor, precio agresivo con upsell sin fricción, opciones de pago (Klarna/SeQura en tickets >60 €), premiums (regalos), garantía poderosa, escasez.
- **Magic Lantern:** secuencia de 2-3 emails que acercan al resultado antes de vender (educación de rutina).

### 3.3 Palancas de AOV (True Classic, Fogarty, benchmarks 2026)
| Palanca | Cómo | Impacto típico |
|---|---|---|
| Multipacks / "bulk feel" | Vende 2x/3x con descuento escalonado (True Classic vende casi todo en packs) | +20-40 % AOV |
| Bundle de rutina | Limpiador + sérum + crema = "Rutina X" con −15 % | AOV top-decil 290 $ vs 75 $ mediana |
| Constructor de rutina (routine builder) | Elige 3 → −15 %, elige 4 → −20 % | +15-25 % AOV |
| Umbral de envío gratis | Fíjalo 15-25 % por encima del AOV actual | +10-15 % |
| Upsell en carrito | Mini formato / accesorio <30 % del valor del carrito | +5-10 % |
| Post-compra 1-clic (Shopify) | Refill, mismo SKU, suscripción | take rate 4,7 % media; 8-15 % optimizado; +5,6 % AOV media, 10-20 % bien hecho; 5-15 % del beneficio neto |
| Suscripción con descuento | 10-15 % + regalo en 2º envío | LTV ×2,3 |
| Regalo con compra (GWP) | Muestra de nuevo lanzamiento a partir de X € | +conversión y prueba de producto |
| Escalera de precios | Entrada (parche/mini 9-15 €) → héroe (29-39 €) → rutina (79-119 €) | Mejora CAC blended |

**Plantilla de arquitectura de oferta (skincare)**
```
Producto de entrada (imán): parches / mini sérum — 9-15 € — objetivo: CAC bajo, volumen de emails
Producto héroe: sérum/crema — 29-39 € — objetivo: margen 70 %+
Rutina/bundle: 3-4 pasos — 79-119 € — objetivo: AOV; −15 % vs suelto + bonus
Suscripción: cada 60/90 días — −12 % + envío gratis + regalo en 2.º ciclo
Garantía: 60 días "piel feliz o te devolvemos el dinero"
Bonus con nombre: "Guía Rutina 28 días" + "Chat con esteticista"
Urgencia: bonus de lanzamiento hasta [fecha]; lotes numerados
```

---

## 4. SHOPIFY: SETUP, PDP (CRO), CHECKOUT, PAGOS EN ESPAÑA, UPSELLS

### 4.1 Cursos Shopify Academy más útiles para skincare DTC (todos gratis)
- *Converting Site Visitors to First-Time Buyers* (45 min) · *Conversion Rate Optimization with Shopify* (ruta, 4 cursos) · *Marketing Fundamentals* (4 cursos) · *Creating a Digital Marketing Strategy* (6 cursos: Digital Marketing Essentials, Branding & Positioning, Social & Content, Seasonal Marketing, Influencer & Affiliate) · *Staying Engaged with Customers to Boost LTV* · *Expanding Your Shopify Business Internationally* (7 cursos: investigación de mercado, localización, precios cross-border, envíos internacionales) · *Search Engine Optimization with Shopify* (7 cursos) · *Shopify Flow Fundamentals* (automatizaciones) · vídeos *Shopify Subscriptions*, *Checkout Extensibility*, *Packaging 101 with Arka*, *Unlock Growth Potential: Shopify Payments (EMEA)* · artículos *Using strategic promotions to drive sales*, *Driving sales with smart product recommendations*, *Building customer loyalty programs*, *Shopify Analytics: from data to decisions*.

### 4.2 Stack recomendado (mínimo viable)
Tema rápido (Horizon/Dawn) · Klaviyo (email/SMS) · app de reseñas con foto/vídeo (Judge.me/Loox/Okendo) · suscripciones (Shopify Subscriptions gratis o Recharge/Skio) · bundles (Shopify Bundles) · upsell post-compra (AfterSell/ReConvert) · Gorgias o Shopify Inbox (CX) · Hotjar/Contentsquare (heatmaps, plan gratis) · Sendcloud/Packlink PRO (envíos) · Monei/Redsys (Bizum) · Klarna/SeQura (BNPL) · GA4 + Meta CAPI + TikTok Events API.

### 4.3 Checklist CRO de ficha de producto skincare (CXL + Shopify + Hotjar)
**Above the fold**
- [ ] Título con beneficio + mecanismo ("Sérum Calmante 5 % Centella — reduce rojeces visibles en 14 días*").
- [ ] Estrellas + nº de reseñas junto al título; precio con "ahorro" si hay pack.
- [ ] Galería: 1) producto, 2) textura en mano (macro), 3) aplicación en rostro, 4) ingredientes/%, 5) "cómo usar" 3 pasos, 6) vídeo UGC 15 s, 7) antes/después realista y cumpliendo normativa.
- [ ] Selector de tamaño/pack con precio por ml y etiqueta "Más elegido".
- [ ] Toggle compra única vs suscribir y ahorrar (−12 %), suscripción preseleccionada solo si churn <8 %.
- [ ] Botón "Añadir" sticky en móvil (75 % del tráfico es móvil; CVR móvil 2-2,8 % vs escritorio 3,9 %).
- [ ] Iconos de confianza: dermatológicamente testado, vegano, fabricado en UE, CPNP notificado, 60 días garantía, envío 24-48 h.

**Cuerpo**
- [ ] Bloque "para quién es / para quién no es" (avatar).
- [ ] Ingredientes clave con % y función (nivel cosmético: hidrata, calma, ilumina, unifica).
- [ ] Resultados de test consumidor ("el 92 % notó la piel más calmada a los 14 días, n=50") — solo si real y documentado.
- [ ] Rutina AM/PM con orden y "combina con" (cross-sell).
- [ ] Comparativa vs alternativas (sin nombrar marcas).
- [ ] FAQ con objeciones reales (¿irrita? ¿con retinol? ¿embarazo? ¿cuánto dura?).
- [ ] Reseñas con filtros por tipo de piel/edad y fotos.
- [ ] Sección "constructor de rutina" con descuento progresivo.

**Técnico**
- [ ] LCP <2,5 s móvil; imágenes WebP; sin apps que bloqueen render.
- [ ] Heatmaps y grabaciones (Hotjar) semanales: dónde muere el scroll, rage clicks en selector de variantes.
- [ ] Test A/B (1 a la vez, 2-4 semanas, ≥ 200 conversiones/variante): hero image textura vs rostro, precio por ml, posición de reseñas, garantía en botón.

### 4.4 Checkout y pagos (España)
- Shopify Payments + **Bizum** vía Monei/Redsys (Bizum no es nativo en Shopify Payments; >12 M usuarios en España; +10-15 % conversión móvil reportado).
- **Klarna** dentro de Shopify Payments; **SeQura/Aplazame** por app — activa BNPL en tickets >60 € (rutinas/bundles).
- PayPal Express, Apple Pay/Google Pay (Shop Pay acelerado).
- Muestra logos de pago en PDP y carrito; dirección autocompletada; envío estimado por fecha, no por "24-48 h".
- Checkout: quita campos, prueba "envío gratis a partir de X" como barra de progreso; mensaje de garantía junto al botón de pago.
- Post-compra (1 clic, antes de la página de gracias): refill del mismo SKU, mini-formato, conversión a suscripción. Página de gracias: encuesta "cómo nos conociste" + sorteo/UGC.

### 4.5 KPIs Shopify (skincare)
| KPI | Mediana | Top 20 % |
|---|---|---|
| CVR tienda | 3,2 % (beauty Shopify) / 2,5-3,5 % industria | 5,4 % |
| CVR móvil | 2-2,8 % | 4 % |
| Add-to-cart | 8-10 % | 12 %+ |
| Abandono de checkout | 65-75 % | <60 % |
| AOV | 60-75 € | 90-120 € (bundles) |
| Velocidad LCP móvil | <2,5 s | <1,8 s |

---

## 5. META ADS 2026: ANDROMEDA, ADVANTAGE+, ESTRUCTURA, TESTING, ESCALADO, MEDICIÓN

### 5.1 Qué cambió (Andromeda + GEM + iOS 26)
- Andromeda es el sistema de "retrieval" que lee la **creatividad** para predecir el público. La segmentación por intereses/lookalikes ha pasado a secundaria; amplio rindió +49 % ROAS vs lookalike en datos de Confect.
- Creatividades con >60 % de similitud se **colapsan en una sola entidad**: variar solo el color del texto no cuenta como "nueva creatividad".
- Un conjunto con 25 creatividades diversas produjo +17 % conversiones a −16 % coste vs 5 conjuntos × 5 anuncios.
- Los top performers mantienen ~395 anuncios activos y 60 % de ingresos desde Catalog Ads (Advantage+ Catalog); las páginas de **categoría** como destino cayeron −24 %: envía tráfico frío a **PDP** o home.
- Solo píxel penaliza; **CAPI + deduplicación + EMQ alto** mejora la admisión al retrieval.
- Precio: los productos de gama media mejoraron (8→9,5 ROAS), los "baratos" cayeron −35 %: **posiciona en gama media (25-45 €) y vende bundles.**

### 5.2 Estructura de cuenta (2026)
```
CAMPAÑA 1 — "Ventas · Advantage+ (ASC+)"  · presupuesto 60-70 %
   1 ad set amplio (España; 18-65; sin intereses)  · 20-30 anuncios diversos activos
   Cap de clientes existentes: 0-10 % (control de prospecting)
   Optimización: Compra · atribución 7d clic / 1d vista
CAMPAÑA 2 — "Testing"  · presupuesto 20-30 %
   Opción A (ABO): 1 ad set por CONCEPTO (no por variante), 3-5 anuncios, 30-50 €/día por ad set, 3-5 días
   Opción B (ASC dedicada a test): 1 ad set, 6-10 anuncios nuevos/semana, presupuesto fijo, ganadores → Campaña 1
CAMPAÑA 3 — "Retención/Catálogo"  · 5-10 %
   Advantage+ Catalog (DPA) con overlays de reseñas/estrellas; compradores 180d + suscriptores; excluir compradores 30d
   (opcional) Campaña por producto/margen distinto con tope de coste (regla CTC: un CAC por producto)
```
- **ABO vs CBO:** ABO (presupuesto por ad set) para *testear* con control; CBO/Advantage Campaign Budget para *escalar* horizontalmente. Nunca mezcles anuncios en fase de test con ganadores en el mismo conjunto CBO (los ganadores acaparan).
- Placements: Advantage+ (todos). Formatos obligatorios: 9:16 (Reels/Stories, prioridad), 4:5 (feed móvil), 1:1. Adaptar por placement dio +85 % ROAS en caso de estudio.
- Advantage+ Creative activado (+22 % ROAS reportado por Meta) salvo mejoras que rompan compliance (texto generado).

### 5.3 Framework de testing creativo (Denney / Chappell / True Classic)
**Jerarquía de test (de mayor a menor impacto):** oferta/ángulo → concepto/formato → hook (primeros 3 s) → cuerpo/prueba → CTA → variantes de texto/miniatura.

**Protocolo semanal**
1. Lunes: lanza 6-10 anuncios nuevos = 3-5 conceptos × 2 hooks. Nombrado: `AAAA-MM-DD_Concepto_Avatar_Formato_Hook#_v1`.
2. Presupuesto de test: 3-5× tu CPA objetivo por anuncio antes de juzgar (ej. CPA 35 € → 100-175 € por anuncio). True Classic: 2.500-5.000 $ por lote; si no es rentable, fuera.
3. Métricas de diagnóstico (primeras 48-72 h):
   - Hook rate (3 s / impresiones) ≥ 30 % vídeo · Hold rate (15 s / 3 s) ≥ 25 % · CTR saliente ≥ 1 % · CPC ≤ 0,8 € · CPM España 4-9 €.
   - Si hook rate alto y CTR bajo → problema de cuerpo/oferta. Si CTR alto y CVR baja → problema de PDP/precio.
4. Ganador = CPA ≤ objetivo con ≥ 5-10 compras y estabilidad 3 días → duplicar en ASC+ (no mover el original).
5. Iteración: del ganador saca 3 variantes reales (nuevo hook, nuevo avatar, nuevo formato). Regla 50/30/20: 50 % conceptos nuevos, 30 % iteraciones, 20 % ganadores probados, ciclo 2-3 semanas.
6. Mata anuncios que no han rendido en la semana 1 (pico de rendimiento en semana 1; estáticos rotar cada 2-3 semanas; plantillas de catálogo 4-6 semanas).

**Mix creativo objetivo (por mes, 10-20 piezas):** 40 % UGC/testimonio, 20 % demo de producto/textura ("gunk shot", macro), 15 % estáticos (beneficios, "ugly ads", comparativas, capturas de reseñas), 15 % fundador/experto (esteticista), 10 % catálogo/ofertas.

### 5.4 Reglas de escalado
- Sube presupuesto **≤ 20 % cada 3-4 días** (vertical). Doblar reinicia aprendizaje.
- Fase de aprendizaje: ~50 conversiones/ad set/semana. Consolida hasta lograrlo.
- Escalado horizontal: nuevos ganadores en el mismo ASC+; nuevas campañas solo por producto/margen/país.
- No edites creatividades ni audiencias de un ad set estable; duplica.
- Frecuencia semanal >3-4 en prospecting o CTR cayendo >30 % → fatiga → nueva creatividad, no más presupuesto.
- Escala mientras aMER ≥ break-even; usa la curva gasto→eficiencia (spending power) para fijar el tope mensual.
- Coste por resultado objetivo (cost cap) por campaña de producto cuando el margen difiere (regla CTC).

### 5.5 Medición
- **CAPI** vía Shopify (nativo) con deduplicación (event_id); EMQ ≥ 8/10; eventos: ViewContent, AddToCart, InitiateCheckout, Purchase con value y currency.
- **MER/aMER semanal** como métrica de gobierno; ROAS de plataforma solo para comparar creatividades.
- **Incrementalidad:** Meta y Google sobreatribuyen 20-60 %. Cuando gastes >10-15 k €/mes: Conversion Lift (Meta) o **geo-holdout** (4-8 semanas, regiones emparejadas; ≥ 200 k usuarios por grupo para poder estadístico). Con menos presupuesto: test on/off de 2 semanas mirando ingresos totales y tráfico directo/orgánico.
- Encuesta post-compra "¿dónde nos viste?" para triangular.

### 5.6 Benchmarks Meta España / UE 2026
| Métrica | Valor |
|---|---|
| CPM medio España | ~6 € (Reels IG 3,8 €, Reels FB 3,2 €, Feed IG 6,8 €, Feed FB 5,2 €); Q4 7-9 €; Navidad/Rebajas +40-60 % |
| CPM UE tier 1 | 10-23 $ (DE/FR/NL/nórdicos) |
| CPC beauty | 0,5-0,9 € |
| CTR saliente objetivo | ≥ 1 % (UGC vertical 1,5-2,5 %) |
| CPA skincare | 30-70 € (marcas nuevas 35-70) |
| ROAS ASC | 1,6-3,2x (top >2,5x) |
| Copy | Escrito nativo en castellano (traducido pierde 20-30 % CTR); titular en catalán en Cataluña +15-25 % CTR |
| Calendario | Navidad, Rebajas (ene/jul, usa la palabra "Rebajas"), Día de la Madre (1.er dom. mayo), Padre (19 mar), Black Friday creciente, Semana Santa, "vuelta al cole", San Valentín |

### 5.7 Política Meta para beauty (actualización 22-jul-2026)
- Enfoque **claims-based**: el antes/después ya no se rechaza automáticamente; se rechaza el **lenguaje**: "deja de avergonzarte de tu piel", "elimina el acné en 7 días", resultados garantizados, nombres de patologías (acné vulgar, rosácea, psoriasis, eccema), "cura/trata/elimina", blanqueamiento de piel, generar autopercepción negativa.
- Permitido: transformaciones modestas y realistas, claims a nivel cosmético (hidrata, calma, unifica, ilumina), testimonios de aspecto y sensación, lenguaje de confianza y rutina, marcas de tiempo ("semana 3") sin promesa.
- Sin atributos personales: nunca "¿Tienes acné?" en 2.ª persona con implicación de condición; usa "para pieles con tendencia a imperfecciones".

---

## 6. ESTRATEGIA CREATIVA Y UGC

### 6.1 Principios (Dara Denney, Chase Chappell, TikTok Creative Center)
- Elimina la ambigüedad: brief por concepto con avatar, dolor, promesa, prueba, hook obligatorio, CTA único, formato y duración.
- Inspírate en **miniaturas de YouTube** y comentarios virales, no solo en la Ad Library.
- Escala de calidad de anuncio (Chappell): 1/10 lista beneficios; 5/10 añade prueba social; 10/10 conecta un problema específico con una solución clara y da una razón para comprar **ahora**.
- Sistema de creadores: comunidad (Discord/WhatsApp), brief, tablero de "qué está ganando", llamada semanal enseñando qué convierte; ganadores de TikTok orgánico → Spark Ads → Meta.
- Valor en los primeros **1,7 s**; decisión de swipe al segundo 3; sonido activado convierte +28 %. Vertical 9:16 nativo, subtítulos, ritmo de corte cada 2-3 s.
- Mostrar textura y aplicación (dorso de mano, macro) convierte más que la cara del creador: 38 % de nuevas cuentas monetizadas en TikTok Shop 2025 son "faceless", y skincare es su categoría principal.

### 6.2 Fórmulas de estructura
**Hook → Body → CTA (15-45 s)**
- Hook (0-3 s): problema, pregunta, afirmación polémica, resultado, "POV", sonido/gesto visual (parche despegándose, textura).
- Body (3-30 s): problema → agitación breve (sin lenguaje de inferioridad) → mecanismo/ingrediente → demo → prueba (reseñas, test, tiempo de uso) → manejo de objeción.
- CTA (últimos 3-5 s): una sola acción + razón para ahora (oferta con fecha, envío gratis hoy, lote limitado).

**Fórmula 4 partes (anuncio directo):** 1) Hook con dolor/deseo, 2) Mecanismo único ("por qué esto sí funciona"), 3) Prueba (números, reseñas, demo), 4) Oferta + CTA.

**PAS (Problem–Agitate–Solve):** "Te levantas con un grano nuevo el día de la boda (P). Lo tapas, se nota más, te lo tocas, empeora (A). Parche hidrocoloide 6 h: absorbe, protege, se nota menos al despertar (S)."

**AIDA / Before-After-Bridge / Testimonial / Unboxing / Comparativa "esto vs aquello" / Mito vs realidad / Día 1-Día 28 (diario) / Reacción a comentarios / "3 razones" / Esteticista explica / Founder story.**

### 6.3 Lista de 40 hooks para skincare (adaptar al avatar, siempre compliant)
1. "Dejé de usar 7 productos y mi piel mejoró con 2."
2. "Esto es lo que pasa cuando despegas un parche después de 8 horas…"
3. "POV: es la primera mañana que no te tapas nada."
4. "Si tu piel se pone roja con todo, mira esto antes de comprar otro sérum."
5. "La esteticista me dijo que estaba haciendo esto mal."
6. "3 errores de rutina que hacen que tu piel brille de la forma equivocada."
7. "Textura check: así se siente un sérum con 5 % de centella."
8. "No es magia, es hidrocoloide. Te explico en 20 segundos."
9. "Día 1 vs día 28 usando solo esto por la noche (sin filtros)."
10. "Me gasté 300 € en skincare coreano para descubrir que necesitaba esto."
11. "Lo que nadie te cuenta de los parches baratos."
12. "Mi rutina de 2 minutos para piel sensible (y por qué menos es más)."
13. "¿Te han dicho que uses menos activos? Aquí el porqué."
14. "Esto es lo que me pongo antes de un evento y por qué."
15. "Ingrediente del mes: niacinamida al 5 %. Para quién SÍ y para quién NO."
16. "Tu barrera te está pidiendo esto."
17. "Cambié una sola cosa en mi rutina y mi novio me preguntó qué me había hecho."
18. "Skincare para gente vaga: la rutina de 60 segundos."
19. "Lo compré por TikTok y esto es lo que pasó realmente."
20. "Leo los comentarios de odio sobre nuestro sérum."
21. "5 señales de que tu limpiador es demasiado fuerte."
22. "Por qué tu crema no penetra (y cómo aplicarla bien)."
23. "El pack que compran las que ya lo probaron: te lo enseño."
24. "Fundadora aquí: por qué hicimos un parche para pieles sensibles."
25. "Lo que hace un dermatólogo la noche antes de un evento."
26. "Test de 14 días con 50 personas: los resultados."
27. "Con 35 años cambié esto y noté la diferencia en textura."
28. "Skincare para él: 2 pasos, cero complicaciones."
29. "La razón por la que huele a nada."
30. "Si viajas mucho, esta mini-rutina cabe en un bolsillo."
31. "Esto NO es para ti si… (3 casos)."
32. "Reseña honesta de la clienta más crítica que tenemos."
33. "Lo que hay dentro (INCI explicado en 30 s)."
34. "Rutina AM en 4 pasos con un solo pack."
35. "Cómo usar retinol sin que tu piel se enfade."
36. "Este es el parche que uso en la boda de mi hermana."
37. "Precio por día: menos que un café."
38. "3 cosas que pasaron cuando dejé de exfoliar a diario."
39. "Lo que ves en el parche es lo que no ves en tu piel."
40. "¿Antes o después de la crema? La respuesta corta."

### 6.4 Plantillas de guion UGC (rellenables)
**A) Demo / Textura (20-30 s)**
```
HOOK (0-3s): [Gesto visual: textura en dorso de mano] "Textura check: [producto] con [ingrediente y %]."
BODY: "Es para [avatar/tipo de piel]. Se absorbe en [X s], no deja [residuo/brillo]. Lo uso [momento] después de [paso]. Lo que noté a los [N] días: [beneficio cosmético realista]."
PRUEBA: "[N] reseñas / test consumidor: el X % notó [beneficio] en [días]."
CTA: "Está en [tienda/TikTok Shop] con [oferta] hasta [fecha]. Link abajo."
```
**B) Problema–Agitación–Solución (30-45 s)**
```
HOOK: "[Situación concreta con el dolor] — [día/evento]."
AGITA (sin inferioridad): "Probé [alternativas] y [qué falló]."
MECANISMO: "[Ingrediente/tecnología] hace [acción cosmética]."
DEMO: [aplicación + resultado visual realista]
OBJECIÓN: "Si tienes piel [sensible], [dato de tolerancia/test]."
OFERTA + CTA: "Pack [nombre] con [bonus] y garantía de 60 días."
```
**C) Fundador/experto (45-60 s)**: por qué existe el producto → qué NO lleva → prueba → para quién no es → oferta.
**D) Diario Día 1→28**: 4 clips con fecha en pantalla, misma luz, sin filtros, voz en off honesta, sin prometer.
**E) Reacción a comentarios / "respondo a la duda más repetida"**.
**F) Unboxing + rutina completa** (ideal para bundles).

### 6.5 Brief de creador (plantilla)
Producto y claims permitidos/prohibidos · avatar y dolor · 3 hooks obligatorios · estructura (A-F) · duración · formato 9:16 · entregables (1 vídeo largo + 3 hooks alternativos + 5 fotos) · b-roll obligatorio (textura, aplicación, packaging, "gunk shot" si parche) · derechos: uso en ads 6-12 meses + whitelisting/Spark code · plazo · pago (producto + 60-250 € por vídeo nano/micro en España; whitelisting mejora CPA 30-50 %).

### 6.6 Checklist de compliance creativa (Reglamento 655/2013 + Meta/TikTok)
- [ ] Claims veraces, sustanciados (dossier de pruebas: test consumidor, in vitro, bibliografía), honestos, justos y que permitan decisión informada.
- [ ] Sin "cura", "trata", "elimina", "previene" enfermedades; sin nombrar patologías; sin "resultados garantizados" ni plazos no probados.
- [ ] "Antes" nunca mostrado como condición médica ni con burla; transformación modesta; misma luz/ángulo; sin filtros.
- [ ] Sin claims "sin X" engañosos (p. ej. "sin parabenos" como si fuera seguridad), sin "hipoalergénico" sin test.
- [ ] Testimonios reales con consentimiento; "resultados individuales pueden variar".
- [ ] Nada dirigido a menores de 14 (LOPD-GDD); sin atributos personales.

---

## 7. TIKTOK: ADS (SMART+, SPARK ADS), TIKTOK SHOP ESPAÑA, GMV MAX, AFILIADOS

### 7.1 TikTok Shop España — estado sept-2026
- Lanzado dic-2024; >21.000 vendedores locales; España = 104,7 M € GMV en 90 días (a 9-jul-2026), 21 % de los 4 grandes mercados UE (DE 174,7 M, FR 132,8 M, IT 86,6 M). Beauty & Personal Care = 15,9 % del GMV español (≈40 % según otras fuentes de categoría).
- **Afiliados = 69,9 % del GMV** (España top-50 tiendas: 87 %). Vídeo comprable 63,8 %, LIVE 17,2 %, Shopping Mall/búsqueda 15,3 % (España lidera con 18,8 %).
- Seller Center activo en 10 mercados: UK, DE, FR, IT, ES, IE, AT, BE, NL, PL. "Sell Across Europe" permite localizar fichas y enviar a otros mercados con logística asociada.
- **Comisión plataforma: 9 %** desde 8-ene-2026 (antes 5 %); nuevos vendedores 4 % durante 60 días si publican ≥ 5 productos en 15 días. Comisión de afiliado la fija la marca (8-20 % típico en beauty; fórmula (ingresos − devoluciones) × %; pago 15-30 días tras entrega).
- Requisitos: autónomo o empresa con sede en España, DNI/NIE + selfie, IBAN español al mismo NIF, verificación 2-5 días; gestión propia de stock, envío y atención (o FBT donde esté disponible).

### 7.2 Playbook TikTok Shop (skincare)
1. **Catálogo optimizado**: 5-10 SKUs, título con beneficio+ingrediente, 9 imágenes, vídeo de producto, precio con "TikTok Shop deal", variantes pack 1/2/3.
2. **Programa de afiliados abierto** (Open Plan) 10-15 % + **plan objetivo** (Target Plan) 20-25 % para creadores top; muestras gratis con requisito de vídeo; mensaje plantilla de invitación; 50-100 invitaciones/semana.
3. **Contenido propio**: 1-2 vídeos/día en cuenta de marca con producto anclado (más vídeos anclados = más GMV potencial).
4. **LIVE**: 2-3 sesiones/semana de ≥ 3 h en horario constante (las de ≥ 3 h crecen más rápido); ofertas flash, demostración de textura, Q&A.
5. **GMV Max** (ver 7.4) con 80 % del presupuesto de TikTok Ads.
6. Métricas: GMV/día, % GMV afiliado, nº creadores activos (objetivo 50+), muestras enviadas→vídeos publicados (≥ 40 %), tasa de conversión de vídeo, devoluciones.

### 7.3 TikTok Ads
- **Smart+** (automatización de puja, público, creatividad): −29 a −36 % CPA vs manual; +52 % ROAS en Smart+ Web en promedio; supera a manual hasta 80 % de las veces. Flujo 2026: combina módulos automáticos/manuales. Entrada recomendada: **Smart+ con Lowest Cost**, objetivo compra, 10-20 creatividades, presupuesto ≥ 20× CPA objetivo/día para salir de aprendizaje.
- **Spark Ads**: promociona posts orgánicos de la marca o de creadores (Spark code); conserva interacción social; mejor CTR/CVR que in-feed clásico. Pide siempre código de autorización de 30-365 días en el brief.
- **Search Ads** (Chappell): keywords de alta intención ("parches acné", "sérum centella") con creatividades nativas.
- Creativo: nativo, sonido activado, 1,7 s de gancho, subtítulos, no cortes de TV. Refresca cada 7-10 días (fatiga más rápida que Meta).
- Marcas que invierten en TikTok Ads + TikTok Shop: +85 % conversiones.
- Benchmarks beauty: CPC 0,6-0,9 $, CPA −22 % interanual.

### 7.4 GMV Max (oficial TikTok)
- Incluye **todos los productos** (prioriza los top).
- **ROI objetivo recomendado** = GMV histórico no-LIVE ÷ coste de ads histórico (o ligeramente inferior para volumen).
- **Presupuesto recomendado** = 2 × GMV histórico no-LIVE ÷ ROI objetivo; mantén consumo <80 %; sube al mejorar.
- No toques el ROI más de una vez cada **3 días**.
- Activa auto-selección de vídeos; **incluye vídeos de afiliados** (rinden mejor); enlaza cuentas y añade Spark posts a la biblioteca.
- LIVE GMV Max: pool de 50-70 vídeos, 5-10 nuevos/día, horarios constantes.

### 7.5 Cursos TikTok Academy (gratis, academy.tiktok.com)
*TikTok Ads Manager fundamentals* · *Promote your videos with Spark Ads* · *Smart+ campaigns* · *Creative best practices* · *Shop Ads / GMV Max* · *TikTok Shop Academy* (Seller Center: onboarding, afiliados, LIVE, políticas) · certificaciones *TikTok Marketing Partner / Sales & Performance*.

---

## 8. GOOGLE: PERFORMANCE MAX + SHOPPING PARA SKINCARE

### 8.1 Skillshop (gratis)
Certificaciones 2026: Search, Display, Video, **Shopping (AI-Powered Shopping ads: Merchant Center, feeds, políticas, PMax for Retail)**, Measurement, Apps, Creative, **AI-Powered Performance Ads**, Grow Offline Sales. 3-4 h por ruta; examen 75 min, 80 % para aprobar.

### 8.2 Estructura recomendada
```
Shopping estándar "Marca/Héroes" (control de CPC y consultas)  · 30 %
PMax "Adquisición" con objetivo de nuevos clientes (NCA) y grupos de activos por línea (calmante / imperfecciones / anti-edad)  · 50 %
Search marca + genéricas de alta intención ("parches acné hidrocoloide", "sérum niacinamida")  · 20 %
```
- Feed: títulos ≤150 caracteres con marca + tipo + activo + tamaño; GTIN; imágenes fondo blanco ≥ 500×500 (mínimo nuevo abr-2026), varias vistas (+25 % CTR); atributo **video_link** (nuevo 2026); atributos de envío por producto; precios de oferta; reseñas de producto (Product Ratings) y Merchant reviews.
- Un feed completo puede ampliar impresiones 40-60 % sin subir pujas.
- tROAS = 1/(margen de contribución objetivo); empezar en "Maximizar conversiones" 2-3 semanas y luego tROAS.
- Exclusiones de marca en PMax; página destino = PDP; GA4 + Enhanced Conversions.
- Benchmark: CPC beauty Google ≈ 2 $ (+60 % interanual); ROAS Shopping skincare 3-5x en marca, 1,5-2,5x genéricas.

---

## 9. KLAVIYO: EMAIL Y SMS — FLOWS, SPECS, BENCHMARKS, RGPD

### 9.1 Klaviyo Academy (100 % gratis)
Certificados: *Product Certificate (Practitioner)*, *Strategist*, *Deliverability*, *Developer*, *Digital Marketing*. Cursos clave: *Getting Started with Flows* (construyes welcome, abandoned cart, browse abandonment y winback), *Best practices for flows*, *Segmentation*, *SMS*, *Reporting & Analytics*.

### 9.2 Benchmarks 2026 (Klaviyo + agencias)
- Los **flows = 5,3 % de envíos y ~41 % de ingresos de email**; top decil 58-65 %.
- RPR (ingreso por destinatario): campañas 0,11 $ media (0,18-0,30 top); flows 1,94 $ media (18× más).
- Carrito abandonado: RPR 2,65-3,65 $ (top 10 % hasta 28,89 $), conversión 3,3 %; recuperación 8-12 % top.
- Bienvenida: apertura 45-65 % en 1.er email; conversión 12-18 % top decil.
- SMS: flows = 7,6 % de envíos y 45 % de ingresos SMS; RPR ecommerce 0,71 $ (top 1,46 $); 64 % del ingreso de flows SMS viene de compradores nuevos.
- Objetivo global: **email+SMS = 25-35 % de ingresos**; lista creciendo ≥ 5 %/mes; tasa de captación de popup 6-10 %.

### 9.3 Especificación de flows (skincare)
| Flow | Trigger | Secuencia (email / SMS) | Contenido clave | KPI objetivo |
|---|---|---|---|---|
| **Bienvenida** | Suscripción (popup quiz de piel) | E1 inmediato (código), SMS 15 min, E2 +1d (historia/mecanismo), E3 +2d (rutina por tipo de piel según quiz), E4 +3d (reseñas + garantía), E5 +5d (última llamada del código) | Segmentar por respuesta del quiz | Open 50 %+, CVR 8-15 % |
| **Carrito abandonado** | Checkout iniciado sin compra | E1 +1-2 h (recordatorio + objeciones: envío, garantía, ingredientes), SMS +4 h, E2 +24 h (reseñas/UGC), E3 +48 h (incentivo solo si no VIP), SMS +72 h | Sin descuento en E1 | Recuperación 8-12 %, RPR >2 € |
| **Navegación abandonada** | Vista de producto sin carrito (≥2 vistas) | E1 +2-4 h (producto + "para quién es"), E2 +24 h (comparativa/rutina) | Filtro: no comprado 7 d | RPR 0,5-1 € |
| **Post-compra (1.ª compra)** | Pedido realizado | E1 inmediato (gracias + qué esperar + cómo usar), E2 al entregar (guía rutina 28 días, vídeo), E3 +7d (consejos/objeciones), E4 +14d (pide reseña con foto; UGC), E5 +21d (cross-sell rutina), E6 +45-60d (recompra/suscripción, ~día 60-75 antes del intervalo de 104 d) | Educación reduce devoluciones | Repetición 90 d ≥ 25 % |
| **Reposición** | Días desde compra = duración del producto − 10 | E1 recordatorio, SMS +2d, E2 +5d con suscripción −12 % | Por SKU | CVR 10 %+ |
| **Winback** | Sin compra 90/120/180 d | E1 +90d (novedades), E2 +120d (oferta), E3 +180d (última + encuesta) | Suprimir tras 2 sin abrir | Reactivación 3-5 % |
| **Suscriptores** | Alta/pre-envío/fallo pago | Pre-envío +3d antes (cambiar/saltar), fallo de pago (dunning 3 toques), aniversario | Reduce churn hasta 35 % | Churn <6 % |
| **VIP / Fidelidad** | ≥3 pedidos o >150 € | Acceso anticipado, muestras, referidos | | 20-30 % + retención |
| **Reseña con foto** | +14 d entrega | Incentivo (puntos) | Alimenta ads | 10-15 % respuesta |
| **Sunset** | 90 d sin abrir | 2 emails "¿seguimos?" y supresión | Entregabilidad | — |

**Campañas:** 2-4/semana segmentadas (compradores vs. no, tipo de piel), 1 educativa por cada 1 promocional; test A/B de asunto y hora; contenido: rutinas, ingredientes, UGC, lanzamientos, "detrás de cámaras".

### 9.4 RGPD / LOPD-GDD (España)
- Consentimiento explícito, específico e informado separado para email y para SMS; **doble opt-in recomendado**; edad mínima 14; baja en 1 clic/STOP; registro de consentimientos; ventana de envío SMS 10-21 h; multa hasta 4 % facturación / 20 M €.
- Checkbox no premarcado; texto de consentimiento en el popup; política de privacidad accesible; proveedor con DPA (Klaviyo).

---

## 10. RETENCIÓN, SUSCRIPCIÓN, POST-COMPRA Y CX

### 10.1 Suscripción (Subscribe & Save)
- LTV ×2,3; 30-40 % de ingresos recurrentes en 12-18 meses en marcas que lo hacen bien; conversión objetivo 25-35 %.
- Diseño: −10-15 %, intervalo por defecto = duración real del producto (30/60/90 d), saltar/cambiar/pausar en 1 clic, regalo en 2.º envío, precio "bloqueado", envío gratis.
- Anti-churn: email pre-envío, dunning, encuesta de cancelación con oferta de pausa, "downgrade" a intervalo más largo, sorpresas en ciclos 3 y 6.
- KPIs: churn mensual <6 % (top <3 %), ciclos medios ≥ 5, % pedidos suscripción, MRR.

### 10.2 Fidelidad y referidos
Programa de puntos (compra, reseña con foto, referido, UGC), niveles VIP; retención +20-30 %; personalización → +60 % probabilidad de recompra. Referidos: "dale 10 €, recibe 10 €" tras la 2.ª compra.

### 10.3 Post-compra y experiencia de entrega
- Email/SMS de envío con tracking en tu dominio (Sendcloud/Outvio), fecha estimada, guía de uso "mientras llega".
- Unboxing: tarjeta de rutina QR, muestra de cross-sell, invitación a UGC (#hashtag + sorteo).
- Encuesta NPS a +21 d; "cómo nos conociste" en página de gracias.

### 10.4 CX (Gorgias Academy — *Customer service metrics 101*)
- Métricas: FRT (primera respuesta) mediana 5-6 h; top cuartil **<1 h**; resolución <24 h; CSAT >90 %; tickets/pedido <8 %; ingresos por soporte (upsell en chat).
- Macros para: dónde está mi pedido, reacción cutánea (protocolo + reembolso), cambio de dirección, devolución (política clara: 30-60 días, producto abierto aceptado → baja objeción y sube CVR).
- Automatiza el 30-50 % con IA/FAQ; chat proactivo en PDP con "¿qué piel tienes?".

---

## 11. SEEDING DE INFLUENCERS Y CREADORES

**Datos 2026:** nano (1-10 k) post-rate 40-70 % con producto relevante; 83 % publican solo por el regalo si les gusta; ROI nano hasta 3-8× vs macro; CPA micro 30-45 $ vs macro 80 $+; 5.000 $ de gifting → 30-80 piezas y 500 k+ impresiones; tarifas ES: nano 50-150 €, micro 150-800 € por Reel/TikTok; whitelisting = CPA −30-50 %.

**Playbook mensual (30 creadores/mes)**
1. Lista: 100 perfiles (skincare, lifestyle, "GRWM", pieles sensibles, +35, hombres) vía TikTok Creator Marketplace, Instagram, herramientas gratuitas; prioriza engagement >3 % y comentarios reales.
2. Outreach por DM/email (plantilla): quién eres, por qué ella/él, qué envías, sin obligación pero con "si te gusta, nos encantaría un vídeo; te damos código de afiliado 10 %".
3. Envío con carta personalizada + tarjeta de rutina + código; registro en hoja (fecha, seguimiento, publicó S/N, derechos).
4. Seguimiento +7 y +14 d; pide Spark code / derechos de uso (12 meses) a quienes publican bien; convierte a los top en **afiliados TikTok Shop** y **embajadores pagados**.
5. Repurpose: todo vídeo bueno → Spark Ads → Meta (whitelisting) → PDP → email.
6. KPIs: tasa de publicación ≥ 40 %, CPM efectivo, contenido utilizable/mes ≥ 10 piezas, ventas por código, CAC por creador.

Regla de oro (COSRX, Hero): la viralidad orgánica nace de **muchos** regalos a creadores pequeños + un formato visualmente satisfactorio (textura, "gunk shot"), no de un macro.

---

## 12. PLAYBOOKS DE MARCAS DE SKINCARE QUE ESCALARON

| Marca | Qué hicieron | Lección accionable |
|---|---|---|
| **Hero Cosmetics (Mighty Patch)** — vendida por 630 M $ | Producto con demo visual innata (parche con "gunk"); TikTok superó a Instagram; campaña "GRWM" con 20 creadores (4 M alcance estimado); mayoría de virales orgánicos no pagados; retail (Target) + Amazon | Elige un producto con "payoff visual" y deja que el cliente lo demuestre; contenido entretenido > pulido |
| **Starface** | Parche estrella amarilla = identidad; "Big Yellow" mascota; ligada a creadores top de TikTok (D'Amelio, Rae) que lo llevaban en vídeos de baile; memes y UGC repostados; acné como estética, no vergüenza | Convierte el uso del producto en contenido visible/social; tono de la audiencia; mensaje positivo (compliance) |
| **COSRX (Snail 96)** | Casi sin ad spend: gifting masivo a creadores, tutoriales de textura "slimy", #COSRXSnailMucin 32 M vistas; Amazon top-10 beauty; JIT en producción para no romper stock | Textura satisfactoria + creadores pequeños + disponibilidad en Amazon/TikTok Shop |
| **Medicube** (93,5 M $ TikTok Shop US 2025) | Set "Glass Glow" 8 piezas a ~85 $ (18,8 M $); afiliados masivos; dispositivo + Kylie Jenner; activo "house" = ácidos exfoliantes | Bundle héroe con nombre aspiracional; un "activo casa" reconocible; celebrity como acelerador, no base |
| **Anua** (24,8 M $) | Heartleaf (centella/houttuynia) como ingrediente identidad; limpiador oil-cleansing viral; faceless demos | Un ingrediente-firma que se puede explicar en 5 s |
| **Skin1004** | Centella de Madagascar; ampollas; formatos precio-valor | Origen de ingrediente como historia de marca |
| **Peace Out / Dr. Melaxin** | Parches y "peel" con resultado visible; TikTok Shop | El resultado visible en 1 uso vende en vídeo |

**Patrón común:** 1) producto con demo visual en <5 s, 2) ingrediente/mecanismo "firma", 3) precio gama media, 4) volumen de creadores pequeños + afiliados, 5) bundle héroe con nombre, 6) disponibilidad omnicanal (DTC + TikTok Shop + Amazon + retail).

---

## 13. ESPAÑA / UE: FISCALIDAD, CPNP, CLAIMS, LOGÍSTICA, 3PL, SHOPIFY MARKETS

### 13.1 Fiscalidad (AEAT, 2026)
| Cliente | IVA | Modelo |
|---|---|---|
| España (peninsular y Baleares) | 21 % (cosmética es tipo general) | 303 trimestral (+ 390 anual) |
| Canarias | IGIC (7 % general; no IVA); Ceuta/Melilla IPSI | Exportación a efectos de IVA + DUA |
| UE B2C ≤ 10.000 €/año acumulado (UE + servicios electrónicos) | IVA español | 303 |
| UE B2C > 10.000 € o si optas | IVA del país destino (DE 19 %, FR 20 %, IT 22 %, NL 21 %, PT 23 %…) | **OSS: alta 035, declaración 369 trimestral** (aunque no haya ventas) |
| Empresa UE con VIES | Exenta (intracomunitaria) | 349 + ROI |
| Fuera UE | Exportación exenta | Justificante de salida |

- El umbral solo protege si el envío parte de España (stock en 3PL de NL = obligaciones en NL).
- Autónomo: IAE 665 (venta por correo/catálogo), 036, RETA, modelo 130 (20 % rendimiento neto) trimestral; SL a partir de ~40-50 k € beneficio. Recargo de equivalencia si eres minorista persona física (5,2 %).
- **IOSS** solo para importaciones ≤150 € desde fuera de la UE (dropshipping). Desde **1-jul-2026** la UE elimina la exención de aranceles <150 € y aplica tasa plana (3 € por clasificación arancelaria en envíos <150 €).
- Verifactu: facturación certificada obligatoria (aplazado a 1-jul-2027). Ley de servicios de la sociedad de la información (LSSI): aviso legal, condiciones, desistimiento 14 días, cookies.

### 13.2 Regulación cosmética
- **Reglamento (CE) 1223/2009:** Persona Responsable establecida en la UE (tú, si fabricas/importas o pones tu marca), **Expediente de Información del Producto (PIF)** con **Informe de Seguridad (CPSR)** firmado por evaluador cualificado, GMP (ISO 22716) del fabricante, etiquetado (INCI, PAO/fecha, lote, PR con dirección, precauciones, contenido).
- **CPNP** (webgate.ec.europa.eu/cpnp): notificación obligatoria **antes** de comercializar; la hace la Persona Responsable (o distribuidor si traduce/re-etiqueta); gratuita. AEMPS es la autoridad en España; comunicar cosmetovigilancia (efectos indeseables graves).
- **Reglamento (UE) 655/2013 — claims:** 6 criterios (legalidad, veracidad, evidencia, honestidad, justicia, decisión informada) aplicables a etiquetas, web, ads y redes.
- Producto "frontera" (parches con activos, "trata acné") → riesgo de ser considerado medicamento/producto sanitario: mantén claims cosméticos (cubre, protege, calma la apariencia).
- Etiqueta en castellano; bilingüe según mercado (DE/FR/IT exigen su idioma).

### 13.3 Logística y envíos
**Carriers (tarifas orientativas 2026, paquete 2-5 kg):** Correos 8,5-11,5 €; MRW 9,5-12,5 €; SEUR 10,5-13,8 €; DHL 12,5-15,8 €. Con plataforma multicarrier y volúmenes: envío nacional skincare (<1 kg) 3,5-5,5 €; UE 7-12 € (DE/FR/IT/PT); islas Correos Express.
- Reglas: SEUR/DPD para urgente y red europea; GLS estándar económico y buena cobertura UE; Correos para Canarias/Baleares y buzón; DHL fuera UE; Packlink PRO (precio) vs **Sendcloud** (automatización/tracking); alternativas Outvio, ShippyPro.
- Puntos de recogida y taquillas (Correos, GLS ParcelShop) reducen coste y fallos de entrega.
- Envío gratis desde umbral (AOV +15-25 %); ofrece 24-48 h en península; comunica fecha estimada.
- Devoluciones: portal self-service; producto abierto aceptado (higiene: puedes no reponer, pero la garantía vende).

**3PL**
- España: sale a cuenta a partir de **100-150 pedidos/mes**; proveedores DTC cosmética (Logistix, Stockabee, etc.) desde 300 a 15.000 pedidos/mes; pick & pack 2-3,5 €/pedido + almacenaje.
- Países Bajos (hub UE): pick & pack 2,5-4,8 €/pedido; almacenaje 12-28 €/m³/mes; envío doméstico PostNL/DHL 4,2-7,5 €; ideal para servir DE/FR/BE/NL en 1-2 días. Ojo: stock en NL = registro IVA en NL (OSS no cubre stock).
- Requisitos para cosmética: control de lotes/caducidad (FEFO), temperatura, kitting de bundles, insertos, devoluciones.

### 13.4 Shopify Markets / Managed Markets
- Un solo store: mercados por país con moneda, precios (redondeo psicológico), dominio/subcarpeta (/de, /fr), idiomas (Translate & Adapt), envío por mercado, impuestos automáticos (OSS) e IVA incluido en precio.
- **Submarkets** (2026) y entidades legales por mercado (Plus).
- Managed Markets (merchant of record) para vender fuera de la UE sin gestionar impuestos/aduanas.
- Prioridad de expansión desde España: PT → FR → IT → DE (en TikTok Shop, DE/FR ya facturan más que ES) → NL/BE.

### 13.5 Checklist legal/operativa de lanzamiento
- [ ] PIF + CPSR por producto; CPNP notificado; etiqueta conforme; GMP del fabricante.
- [ ] Persona Responsable y dirección en etiqueta; cosmetovigilancia.
- [ ] 036/IAE 665, RETA o SL; ROI; 035 OSS cuando previsible >10 k €.
- [ ] Aviso legal, condiciones, privacidad, cookies (consentimiento previo), desistimiento 14 días.
- [ ] Contrato con 3PL/carrier; seguro de mercancía; política de devoluciones.
- [ ] Textos de claims revisados vs 655/2013 y políticas Meta/TikTok.
- [ ] Pasarelas: Shopify Payments + Bizum + Klarna/SeQura; facturación conforme (Verifactu 2027).

---

## 14. CUADRO DE MANDO: KPIs Y BENCHMARKS 2026 (skincare DTC, España/UE)

| Área | KPI | Mínimo | Objetivo | Top |
|---|---|---|---|---|
| Finanzas | Margen bruto | 60 % | 68 % | 75 %+ |
| | Margen contribución 1.er pedido | ≥ 0 | +10 % | +20 % |
| | MER (ingresos/ads) | 2,5 | 3,5 | 5 |
| | aMER nuevos clientes | 1,5 | 2,2 | 3 |
| | CAC combinado | <70 € | 45 € | 35 € |
| | LTV:CAC 12 m | 2:1 | 3:1 | 4-5:1 |
| | Rotación inventario | 3x | 4-6x | 6x+ |
| Tienda | CVR | 2,5 % | 3,2 % | 5,4 % |
| | AOV | 60 € | 85 € | 110 €+ |
| | Take rate post-compra | 4,7 % | 8 % | 15 % |
| | Devoluciones | <15 % | <10 % | <6 % |
| Meta | CPM ES | — | 4-7 € | — |
| | CTR saliente | 0,8 % | 1,2 % | 2 % |
| | Hook rate | 25 % | 30 % | 40 % |
| | CPA | <70 € | 45 € | 30 € |
| | ROAS ASC | 1,6 | 2,5 | 3,2+ |
| | Creatividades nuevas/mes | 6 | 10-15 | 20+ |
| TikTok | CPC | <0,9 € | 0,6 € | 0,4 € |
| | % GMV afiliado (Shop) | 40 % | 60 % | 80 % |
| | Creadores activos | 20 | 50 | 100+ |
| Google | ROAS Shopping/PMax | 2 | 3 | 5 |
| Email/SMS | % ingresos | 20 % | 30 % | 35 %+ |
| | Flows sobre ingresos email | 30 % | 41 % | 60 % |
| | RPR carrito abandonado | 1 € | 2,5 € | 5 €+ |
| | Recuperación carrito | 5 % | 8 % | 12 % |
| Retención | Repetición 90 d | 15 % | 25 % | 30 %+ |
| | Repetición 12 m | 30 % | 38 % | 45-55 % |
| | Conversión a suscripción | 15 % | 25 % | 35 %+ |
| | Churn mensual sub | <10 % | <6 % | <3 % |
| CX | FRT | <6 h | <2 h | <1 h |
| | CSAT | 85 % | 90 % | 95 % |

Revisión: diaria (gasto, MER, CPA, stock), semanal (creatividades, flows, cohortes), mensual (P&L de contribución, LTV, incrementalidad, inventario).

---

## 15. PLAN DE 90 DÍAS

**Días 1-30 — Fundamentos**
- Unit economics por SKU y bundle; CAC máximo por oferta.
- 100 reseñas minadas → 5 avatares → 20 creencias → 10 ángulos.
- Oferta Grand Slam: escalera (entrada/héroe/rutina), garantía 60 d, bonus con nombre, suscripción.
- Legal: CPNP, PIF, etiquetas, 036/OSS, textos legales; pasarelas (Bizum, Klarna).
- Shopify: PDP con checklist CRO, bundles, upsell post-compra, CAPI, GA4, Hotjar.
- Klaviyo: popup con quiz (objetivo 6-10 % captación), 5 flows básicos + reposición.
- Seeding: 30 creadores (nano/micro) + alta en TikTok Shop y programa de afiliados 12-15 %.
- Producción creativa: 15 piezas (UGC, textura, fundador, estáticos).

**Días 31-60 — Validación de tracción**
- Meta: ASC+ (20 anuncios) + campaña de test (6-10 nuevos/semana). Presupuesto 50-100 €/día inicial; subir 20 %/3-4 d si CPA ≤ objetivo.
- TikTok: Smart+ Lowest Cost con Spark Ads de creadores; 1-2 vídeos/día en cuenta de marca; primer LIVE semanal.
- Google: Merchant Center + Shopping marca + Search alta intención.
- Email: 2-3 campañas/semana; A/B de asuntos; medir % ingresos email.
- Ajustar oferta/PDP por feedback (encuesta post-compra, grabaciones Hotjar).
- KPIs de salida: CVR ≥ 2,5 %, CPA ≤ CAC máx., 3+ creatividades ganadoras, 10+ creadores publicando.

**Días 61-90 — Escala y retención**
- GMV Max con 80 % del presupuesto TikTok; ampliar afiliados a 50+.
- PMax con NCA; feed con vídeo y reseñas.
- Escalado Meta vertical/horizontal; catálogo Advantage+ con overlays; frecuencia y fatiga.
- Retención: flows de reposición y VIP, programa de fidelidad, referidos; objetivo repetición 90 d ≥ 25 %.
- Primer test de incrementalidad (on/off 2 semanas o geo).
- Preparar expansión UE: Markets (PT/FR), OSS activo, 3PL con capacidad UE, TikTok Shop "Sell Across Europe".
- Calendario Q4: Black Friday, Navidad, Rebajas de enero (creatividades y stock 6-8 semanas antes).

---

## 16. CATÁLOGO DE CURSOS Y RECURSOS GRATUITOS

**Shopify Academy** — https://www.shopifyacademy.com/page/catalog (catálogo completo; 200+ ítems; rutas gratis: CRO with Shopify, Marketing Fundamentals, Creating a Digital Marketing Strategy, Expanding Internationally, SEO with Shopify, Flow Fundamentals; cursos: Converting Site Visitors to First-Time Buyers, Staying Engaged with Customers to Boost LTV, Finding New Customers with Shopify, Introduction to Shipping & Fulfillment, Seasonal and Event-Based Marketing; vídeos: Shopify Subscriptions, Checkout Extensibility, Packaging 101, Shopify Payments EMEA, Peak season tips) · Ayuda: https://help.shopify.com/en/partners/grow-your-business/shopify-academy · Tutorial 7 h YouTube: https://www.youtube.com/watch?v=iwmz1sL5r9g

**Meta Blueprint** — https://www.facebook.com/business/learn (100+ cursos de 5-30 min: Business presence, Advertising fundamentals, Advantage+ Sales/Shopping, Creative best practices, Measurement/CAPI, Conversion Lift; rutas de certificación Digital Marketing Associate / Media Buying Professional: materiales gratis, examen 99-150 $) · Guías: https://markampus.com/blog/meta-blueprint-free-courses-guide-2026/ · https://www.stackmatix.com/blog/free-facebook-ads-courses-meta-blueprint

**TikTok Academy / TikTok Shop Academy** — https://academy.tiktok.com (Ads Manager, Spark Ads, Smart+, Creative, Shop Ads/GMV Max) · Seller Center Academy España: https://seller-es.tiktok.com · Ayuda GMV Max: https://ads.tiktok.com/help/article/best-practices-for-product-gmv-max · LIVE GMV Max: https://ads.tiktok.com/resources/help/article/best-practices-for-live-gmv-max · Spark Ads: https://ads.tiktok.com/help/article/spark-ads · Playbook ecommerce TikTok (PDF): https://ads.tiktok.com/business/library/AUNZ_TakeItToTikTok_ECommerce_Playbook.pdf · Blog Smart+: https://ads.tiktok.com/business/en-US/blog/smart-plus-ai-performance-solution · Fospha 2026 TikTok Playbook: https://www.fospha.com/reports-and-guides/tiktok-playbook-2026

**Google Skillshop** — https://skillshop.withgoogle.com/googleads/ (9 certificaciones gratis; AI-Powered Shopping ads: https://www.classcentral.com/course/skillshop-ai-powered-shopping-ads-certification-494096) · Ayuda: https://support.google.com/google-ads/answer/7539883

**Klaviyo Academy** — https://academy.klaviyo.com/en-us (Getting started with flows: https://academy.klaviyo.com/en-us/courses/getting-started-with-flows · Best practices for flows: https://academy.klaviyo.com/en-us/best-practices/best-practices-for-flows · Credenciales: https://academy.klaviyo.com/en-us/credentials) · Benchmarks: https://www.klaviyo.com/products/email-marketing/benchmarks · SMS: https://www.klaviyo.com/products/sms-marketing/benchmarks · RGPD SMS: https://help.klaviyo.com/hc/en-us/articles/18410569130779 · Flow examples: https://help.klaviyo.com/hc/en-us/sections/14543713508123

**CXL (gratis / CXL Lite)** — https://cxl.com/institute/programs/conversion-optimization/ · Guía CRO: https://cxl.com/conversion-optimization/ · Ecommerce CVR: https://cxl.com/blog/increasing-ecommerce-conversion-rates/ · PDF 10 pilares: https://cxl.com/wp-content/uploads/2021/04/The-Conversion-Optimization-Guide-CXL.pdf · Lista de cursos gratis: https://www.coursmos.com/cxl-free-courses/

**HubSpot Academy** — Ecommerce Marketing Course: https://academy.hubspot.com/courses/ecommerce-marketing · Todos: https://academy.hubspot.com/courses

**Semrush Academy** — https://www.semrush.com/academy/courses/ (90+ cursos: SEO, content, ecommerce SEO, social)

**Hotjar Learning** — https://learning.hotjar.com/ (Introducing Heatmaps, Continuous Heatmaps) · Ecommerce heatmaps: https://www.hotjar.com/ecommerce/hotjar/heatmaps/

**Gorgias Academy** — Customer service metrics 101: https://academy.gorgias.com/training/2a20fd3e-6ed5-11ed-889d-02aea812ea2d/overview · Hub: https://www.gorgias.com/customer-resources · Métricas: https://www.gorgias.com/blog/customer-support-metrics

**YouTube / creadores (gratis)**
- Davie Fogarty — curso gratis + masterclass 11 h: https://www.millionaires.com/ · canal: https://www.youtube.com/channel/UC-JHxwWL4-WoqyQIYsBvTbA
- Nick Theriot — https://www.youtube.com/@NickTheriot/videos · resumen: https://www.tabcut.com/blog/post/scaling-e-commerce-with-ads-lessons-from-nicktheriot
- Dara Denney — Motion library: https://motionapp.com/library/expert/dara-denney/ · guía testing: https://motionapp.com/blog/ultimate-guide-creative-testing-2025 · notas: https://www.scribd.com/document/905212758/dara-denney-notes
- Chase Chappell — https://www.chasechappell.com/ · TikTok Search Ads: https://www.aimerce.ai/topics/tiktok-search-ads-2025-guide
- Alex Hormozi — $100M Offers (marco): https://github.com/getagentseal/founder-playbook/blob/main/100m-offers/SKILL.md · https://www.scalabl.com/literature/100m-offers/
- Sabri Suby — Sell Like Crazy resumen: https://www.mentorist.app/books/sell-like-crazy-how-to-get-as-many-clients-customers-and-sales-as-you-can-possibly-handle/
- Ryan Bartlett / True Classic — https://www.shopify.com/blog/true-classic-tshirt-business-content-marketing-strategies · https://trueprofit.io/profit-lab/the-profitable-at-scale-playbook-true-classic · https://www.modernretail.co/marketing/all-my-eggs-in-the-facebook-basket-true-classic-ceo-ryan-bartlett-on-growing-a-dtc-brand-on-paid-social/
- Taylor Holiday / CTC — https://commonthreadco.com/blogs/bridges/unlock-first-order-profitability · https://commonthreadco.com/blogs/ecommerce-playbook/spend-vs-amer-spending-power · podcast Ecommerce Playbook: https://podcasts.apple.com/ph/podcast/ecommerce-playbook-numbers-struggles-growth/id1087933109 · TikTok Shop EU: https://commonthreadco.com/blogs/coachs-corner/tiktok-shop-europe-expansion-2026-ecommerce-brands
- Ecom King (Kamil Sattar) — curso gratis 2026 7 h en YouTube: https://x.com/kamil_sattar/status/2021978526233116865
- Jordan Welch / Sebastian Ghiorghiu — playlist: https://www.youtube.com/playlist?list=PLvFZdZQK61SuOvHYam25DXF4g8iC7wt47 · https://www.autods.com/blog/dropshipping-tips-strategies/dropshipping-courses/

**Agregadores:** Class Central Shopify: https://www.classcentral.com/subject/shopify · TikTok marketing: https://www.classcentral.com/subject/tiktok-marketing · Skillshop: https://www.classcentral.com/provider/skillshop · Certificados gratis marketing: https://www.classcentral.com/report/free-digital-marketing-certificates/

---

## 17. FUENTES

**Meta / Andromeda / política**
- https://confect.io/tactics/meta-andromeda-2026
- https://medium.com/@tentenco/meta-ads-strategy-2026-why-andromeda-gem-and-ios-26-broke-the-old-playbook-78cba1ad4820
- https://www.tryatria.com/blog/andromeda-meta-ads
- https://segwise.ai/blog/meta-andromeda-update-creative-strategy-2026
- https://madwise-agency.com/blog/meta-ads-facebook-algorithms-andromeda/
- https://www.admove.ai/blog/meta-advantage-creative-best-practices-for-2026
- https://www.modernmarketinginstitute.com/blog/how-to-exit-the-meta-ads-learning-phase-fast-and-start-scaling-profitably-in-2026
- https://growthmarketer.com/blog/meta-campaign-structure-2026/
- https://adadvisor.ai/blog/meta-advantage-plus
- https://alexneiman.com/meta-advantage-plus-shopping-campaigns-guide/
- https://eightx.co/blog/what-is-incrementality-testing
- https://www.haus.io/article/meta-incrementality-testing
- https://withblip.com/blog/meta-ads-incrementality-testing-holdout-groups-2026/
- https://adlibrary.com/posts/meta-ads-spain-playbook-2026
- https://www.superads.ai/facebook-ads-costs/cpm-cost-per-mille/spain
- https://lebesgue.io/facebook-ads/facebook-cpm-by-country
- https://adlibrary.com/posts/meta-ad-benchmarks-cosmetics-2026
- https://www.webtonic.io/blog/beauty-skincare-facebook-ads-statistics
- https://clikim.com/meta-health-wellness-policy-update/
- https://innobotz.com/blog/articles/skincare-before-after-ad-compliance-meta-tiktok-2026.html
- https://www.auditsocials.com/blog/meta-beauty-cosmetics-ads-2026-before-after-photos-appearance-claims-policy
- https://markampus.com/blog/meta-blueprint-free-courses-guide-2026/

**TikTok**
- https://ads.tiktok.com/help/article/best-practices-for-product-gmv-max?lang=en
- https://ads.tiktok.com/help/article/about-gmv-max-campaigns-in-tiktok-ads-manager
- https://www.dataslayer.ai/blog/tiktok-shop-gmv-max-30-higher-gmv-vs-manual-ads-2026-complete-guide
- https://blog.lengow.com/tiktok-shop-europe-q2-2026-e500m-across-four-markets/
- https://www.dataiads.io/en/blog/tiktok-shop-one-year-europe-review-2026
- https://marketing4ecommerce.net/en/tiktok-shop-increases-commission/
- https://inicia.academy/blog/como-empezar-tiktok-shop-espana
- https://inicia.academy/blog/tiktok-shop-nuevos-paises-europa
- https://newsroom.tiktok.com/es-es/tiktok-shop-llega-a-espana
- https://prismalia.com/tiktok-shop-espana-que-es-y-como-funciona/
- https://megadigital.ai/en/blog/tiktok-smart-campaign/
- https://stormy.ai/blog/tiktok-smart-plus-campaigns-2026-playbook
- https://www.enrichlabs.ai/blog/tiktok-spark-ads-complete-guide-2026
- https://www.flighted.co/blog/tiktok-ads-best-practices-2026
- https://beautyshopcreators.com/blog/the-7-us-tiktok-beauty-trends-to-follow-in-2026
- https://blog.charm.io/en/blog/the-skincare-trends-that-took-over-tiktok-shop-in-2025-and-what-to-learn-from-them
- https://wwd.com/beauty-industry-news/beauty-features/medicube-anua-tarte-melaxin-tiktok-shop-beauty-sets-1238225713/

**Google**
- https://skillshop.withgoogle.com/googleads/
- https://meshworld.in/blog/reference/learning/google-skillshop-certifications/
- https://www.digitalapplied.com/blog/google-shopping-ads-2026-product-feed-strategy
- https://www.adsgo.ai/blog/how-to-run-google-ads-for-ecommerce/
- https://www.mbadv.agency/google-merchant-center/best-practices-for-optimizing-product-feeds

**Klaviyo / email / SMS**
- https://www.klaviyo.com/uk/blog/email-marketing-benchmarks-open-click-and-conversion-rates
- https://www.klaviyo.com/blog/abandoned-cart-benchmarks
- https://www.darkroomagency.com/observatory/email-marketing-benchmarks-ecommerce-2026
- https://bsandco.us/blog-post/klaviyo-flow-benchmarks
- https://www.askneedle.com/blog/klaviyo-email-benchmarks-for-ecommerce-open-rates-ctr-revenue-per-send
- https://www.digitalapplied.com/blog/klaviyo-lifecycle-email-flows-ecommerce-2026-playbook
- https://www.clickminded.com/sms-marketing-benchmarks/
- https://www.klaviyo.com/blog/email-sms-marketing-priorities-2026
- https://magnetmonster.com/blog/are-klaviyo-courses-free
- https://sakari.io/blog/gdpr-compliance-for-sms-marketing-the-complete-implementation-guide

**Unit economics / benchmarks**
- https://commonthreadco.com/blogs/bridges/unlock-first-order-profitability
- https://commonthreadco.com/blogs/ecommerce-playbook/spend-vs-amer-spending-power
- https://eightx.co/blog/skincare-financial-benchmark
- https://eightx.co/blog/average-beauty-and-cosmetics-return-rate-benchmarks
- https://foundrycro.com/blog/dtc-beauty-marketing-benchmarks-2026/
- https://www.webtonic.io/blog/beauty-skincare-shopify-statistics
- https://trynow.com/blog/beauty-ecommerce-benchmarks-2026
- https://ecommerceagencies.org/benchmarks/health-and-beauty-industry-report-2026-marketing-benchmarks-breakdown/
- https://www.mageloyalty.com/blog/beauty-skincare-repeat-purchase-rate-benchmarks-for-2026
- https://retentionside.com/industry-reports/beauty-and-skincare-retention-report-2026-benchmarks-buying-cycles-and-customer-trends
- https://easysubscription.io/blog/why-beauty-brands-are-winning-with-subscriptions/
- https://www.richpanel.com/learn/ecommerce-return-rates
- https://www.zipchat.ai/blog/post-purchase-upsell-strategies
- https://easyappsecom.com/guides/shopify-upsell-conversion-benchmarks
- https://www.digitalapplied.com/blog/post-purchase-upsell-thank-you-page-2026-ecommerce-playbook

**Ofertas / creadores / playbooks**
- https://github.com/getagentseal/founder-playbook/blob/main/100m-offers/SKILL.md
- https://www.selfstorming.com/tools/libraries/frameworks/value-equation
- https://www.mentorist.app/action/create-a-godfather-offer_366/
- https://motionapp.com/library/expert/dara-denney/
- https://motionapp.com/blog/dara-denneys-guide-to-building-high-performing-creative-teams
- https://www.aimerce.ai/topics/tiktok-search-ads-2025-guide
- https://www.chasechappell.com/
- https://x.com/nicktheriot_/status/2079283848160932005
- https://www.tabcut.com/blog/post/scaling-e-commerce-with-ads-lessons-from-nicktheriot
- https://www.shopify.com/blog/true-classic-tshirt-business-content-marketing-strategies
- https://trueprofit.io/profit-lab/the-profitable-at-scale-playbook-true-classic
- https://www.millionaires.com/
- https://x.com/kamil_sattar/status/2021978526233116865
- https://reloop.so/blog/article/ugc-script-templates/
- https://www.sparkugc.com/resources/ugc-ad-script-structure-template
- https://www.viritias.com/en/blog/tiktok-ad-script-ugc-hook-formulas
- https://iqfluence.io/public/blog/nano-influencer-marketing
- https://www.elev8or.io/blog/influencer-gifting-and-product-seeding-guide
- https://partnrup.ai/beauty-and-skincare-influencer-marketing-trends-and-tactics-for-2026/

**Marcas skincare**
- https://www.marketingdive.com/news/hero-cosmetics-doubles-down-on-tiktok-after-results-dwarf-instagrams/561153/
- https://www.beautyindependent.com/hero-cosmetics-fuels-growth-strategic-social-media-experimentation/
- https://femfounded.org/case-studies/hero-cosmetics/
- https://www.pulsarplatform.com/blog/2025/starface-pimple-patches-skincare-acne-trends
- https://behindthebrandnews.com/p/case-study-starface
- https://www.glossy.co/beauty/the-zit-sticker-war/
- https://dot.la/cosrx-snail-mucin-tiktok-2659949168.html
- https://dermapproved.com/blog/k-beauty-brand-decoder-anua-skin1004-medicube-tirtir/

**España / UE: fiscal, cosmética, logística, pagos**
- https://sede.agenciatributaria.gob.es/Sede/no-residentes/iva-empresarios-profesionales-no-establecidos/ventas-distancia.html
- https://gestoria247.com/blog/impuestos-tienda-online-2026
- https://defezasesores.es/blog/fiscal/ventas-a-distancia-iva/
- https://dataligroup.com/blog/iva-ventanilla-unica-oss-ecommerce/
- https://help.shopify.com/en/manual/taxes/eu/eu-tax-reference
- https://www.shopify.com/blog/expanding-your-business-in-europe
- https://orbe.app/blogs/blog/shopify-markets
- https://biorius.com/es/cosmetic-news/notificacion-cpnp/
- https://www.certifiedcosmetics.com/blog/regulatory-compliance/cosmetic-compliance-in-spain-guidelines-from-spanish-agency-for-medicines-and-health-products/
- https://eur-lex.europa.eu/eli/reg/2013/655/oj/eng
- https://ecomundo.eu/en/blog/cosmetic-claims-europe-guide
- https://www.shippypro.com/blog/es/precios-de-env%C3%ADos-de-paquetes-en-2026
- https://logistix.es/blog/seur-vs-gls-vs-mrw-vs-correos-express-comparativa
- https://outvio.com/es/blog/mejores-alternativas-sendcloud/
- https://www.sendingbay.com/blog-alternativa-a-packlink
- https://logistix.es/logistica-ecommerce
- https://stockabee.com/como-contratar-servicios-de-logistica-para-ecommerce-en-espana
- https://www.global-fin-info.com/netherlands/business-services/top-fulfillment-services-in-the-netherlands-costs-eu-hubs/
- https://www.fulfill.com/3pl/location/netherlands
- https://shopigurus.com/blog/shopify-payments-espana-guia/
- https://monei.com/bizum-for-shopify/
- https://impulsaecommerce.com/bizum-en-shopify/

**Academias / CRO / CX**
- https://www.shopifyacademy.com/page/catalog
- https://cxl.com/conversion-optimization/
- https://www.coursmos.com/cxl-free-courses/
- https://academy.hubspot.com/courses/ecommerce-marketing
- https://www.semrush.com/academy/courses/
- https://learning.hotjar.com/
- https://academy.gorgias.com/training/2a20fd3e-6ed5-11ed-889d-02aea812ea2d/overview
- https://getfairview.com/blog/ecommerce-customer-service-metrics

*Nota:* los benchmarks provienen de informes públicos de proveedores y agencias (2025-2026) y varían por AOV, país y madurez; úsalos como rangos de referencia y sustitúyelos por tus datos de cohortes en cuanto tengas 200+ pedidos.
