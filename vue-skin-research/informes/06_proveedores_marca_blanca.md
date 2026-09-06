# Informe de sourcing: cómo replicar el catálogo de Vue Skin (ex Vue Swiss) con marca propia

*Fecha: 5 de septiembre de 2026. Investigación realizada con ~60 búsquedas y consultas web. Los precios son los publicados por los proveedores en el momento de la consulta o estimaciones marcadas como tales; confirmar siempre con cotización formal.*

---

## 0. Resumen ejecutivo

1. **Vue no fabrica nada.** Es VAMI Sàrl (Vivier 3, 2016 Cortaillod, Suiza, CHE-151.596.957), una marca DTC en Shopify que compra producto terminado "Made in Korea", lo etiqueta y lo envía desde un almacén en Países Bajos. Es el modelo clásico de *private label* coreano.
2. **Los parches de hidrocoloide son un producto commodity coreano.** El INCI de los parches de nariz de Vue (*Polyisobutene, Cellulose Gum, Hydrogenated Styrene/Methylstyrene/Indene Copolymer, Pectin*) es **idéntico** al de Hero Mighty Patch Nose (fabricado por T&L Co., Ltd.), Skin Choice Breakout Patch Nose (UK), Catch Me Patch (Nico Medical, Corea) y Kascin (Alemania). Es la formulación estándar del rollo de hidrocoloide coreano que domina T&L (>60 % de cuota en Corea) y que convierten decenas de fábricas (Nurimedics, NewY Medical, Twoa/Awesome April, Dermatech…). Se puede comprar el mismo material con forma de nariz/barbilla/frente con MOQ desde 1.000 unidades.
3. **Los líquidos (exfoliante, sérum, tónico, limpiador, crema, peel-off) son fórmulas ODM "de catálogo" de un laboratorio coreano**, con complejos típicos de fabricantes coreanos de gama media (complejo de 10 ácidos hialurónicos, extractos de *Melia azadirachta / Coccinia indica / Corallina officinalis* del complejo "Campo Blue", *sh-Polypeptide-123*, etc.). No encontré ningún producto de otra marca con INCI 100 % idéntico, lo que sugiere fórmulas de catálogo con pequeñas variaciones, típicas de un ODM coreano o de un agente de sourcing (SourcingLab, OEMKorea, Mayk, knok, Veilta…). Cualquier ODM coreano puede entregar un equivalente funcional (mismo formato: 110 ml, 30 ml, 130 ml, 150 ml, 70 ml) con MOQ de 500–3.000 unidades.
4. **Márgenes brutos estimados** (coste desembarcado en España vs. PVP de Vue sin IVA): parches de nariz 65–75 % (Corea) / 85–90 % (China); parches de granos 85–90 %; sérum 75–85 %; tónico y limpiador 80–90 %; mascarillas de tela 60–80 %; discos de bambú 75–85 %. Antes de gastos de compliance, marketing y logística de última milla.
5. **Regulatorio**: Vue vende los parches como **cosmético** (no como producto sanitario CE); la vía cosmética (CPNP + CPSR + Persona Responsable en la UE) es la más barata y rápida: ≈1.500–4.500 € por producto el primer año, bajando a 500–1.500 €/producto con 10 referencias. En España, además, el importador desde fuera de la UE debe presentar la **declaración responsable de importación ante la AEMPS** (tasa 5.06: 466,23 €) o bien comprar a través de un importador/RP ya establecido en la UE.

---

## 1. Qué vende Vue exactamente y qué hay dentro (INCI)

Fuente: fichas de producto de vueskin.com y `products.json` de la tienda (25 referencias).

| Producto Vue | Formato | PVP | INCI / composición (resumen) | Lectura de sourcing |
|---|---|---|---|---|
| **Nose Patches** | 8 parches | 16,95 € | Hydrocolloid: Polyisobutene, Cellulose Gum, Hydrogenated Styrene/Methylstyrene/Indene Copolymer, Pectin | Hidrocoloide estándar coreano ("100 % hydrocolloid"), idéntico a Hero Mighty Patch Nose, Skin Choice, Catch Me Patch, Kascin |
| **Chin Patches** | 8 | 16,96 € | Mismo hidrocoloide, troquel de barbilla | Troquel personalizado sobre el mismo rollo |
| **Forehead Patches** | 5 | 16,95 € | Mismo hidrocoloide, troquel de frente | Idem |
| **Surface Patches** | 10 (grandes) | 15,95 € | Mismo hidrocoloide, formato rectangular/grande | Formato "wide coverage" de catálogo |
| **Clearing Spot Patches** | 36 puntos | 15,95 € | Hidrocoloide en puntos 10–12 mm | El producto más commodity del mercado |
| **Salicylic Acid Exfoliant** | 110 ml | 32 € | Water, Butylene Glycol, Gluconolactone, Arginine, Salicylic Acid, Ethoxydiglycol, Glycolic Acid, Sodium Hydroxide, C12-14 Pareth-12, Maltodextrin, Biosaccharide Gum-1 | Fórmula ODM sencilla BHA+AHA+PHA (11 ingredientes). Parecida a Dermalogica Liquid Peelfoliant / Derma.co x Dr V, pero no idéntica |
| **Niacinamide 2% Serum** | 30 ml | 30 € | Water, BG, Glycerin, DPG, 1,2-Hexanediol, Niacinamide, Polyglyceryl-10 Laurate… complejo de 10 HA, sh-Polypeptide-123, Ulmus Davidiana, Pueraria Lobata, Pinus Palustris… | Fórmula ODM coreana de "laboratorio boutique" (niacinamida al 2 %, muy bajo coste de activos) |
| **Collagen Peel-Off Mask** | 70 ml | 29 € | Water, DPG, Polyvinyl Alcohol, Dimethicone, Polysorbate 80, Hydrogenated Polyisobutene, Sodium Polystyrene Sulfonate… Collagen Extract, Menadione, bergamota | Familia coreana de "collagen wrapping mask" (Matrigen SS Collagen, Medicube Collagen Wrapping, Tosowoong, Arocell 80 ml, mixsoon 80 ml, MDP+ 70 ml) |
| **Hyaluronic Acid Toner** | 130 ml | 25 € | Aqua, BG, DPG, Glycerin… Melia Azadirachta Leaf/Flower, Coccinia Indica, Solanum Melongena, Corallina Officinalis, Curcuma, Ocimum Sanctum (= complejo "Campo Blue" de Campo Research), Mandelic + Glycolic, Zinc PCA, complejo de 10 HA, Camellia Sinensis | Fórmula ODM coreana con materias primas de catálogo |
| **Exfoliating Jelly Cleanser** | 150 ml | 27 € | Aqua, Cocamidopropyl Betaine, Decyl Glucoside, Hydroxypropyl Starch Phosphate, BG, Glycolic Acid, Mandelic Acid… Amorphophallus Konjac Root Powder, Snail Secretion Filtrate, complejo HA | Concepto idéntico a "Gooseberry AHA Jelly Cleanser" (Corea): gel-espuma con perlas de konjac |
| **Prebiotic Clarifying Moisturizer** | 70 ml | 21 € | Aqua, BG, Cetyl Ethylhexanoate, Cetyl Alcohol… Ceramide NP, Centella, Artemisia, Zinc PCA, Mandelic/Glycolic, Tea Tree, complejo HA, 4-Terpineol | Emulsión ligera ODM coreana |
| **Sheet masks (snail / vitamin / hyaluronate / gold collagen)** | 1 ud | 5 € | Mascarillas de tela con colágeno | Commodity coreano/chino |
| **Reusable Cotton Pads** | set | 14 € | 100 % bambú | Commodity chino (Alibaba) |
| Bundles (Clear T-Zone Kit 69 €, Full Face Patch Bundle 69 €, Clear Skin Kit 65 €…) | — | — | — | Sólo empaquetado |

**Observación clave:** los mismos cuatro ingredientes de hidrocoloide aparecen en Hero Mighty Patch Nose (T&L Co. es su ODM exclusivo desde 2018 y "propietario del IP del producto"), en Catch Me Patch (Nico Medical, Seongnam), en Skin Choice Breakout Patch (UK, "Made in South Korea") y en Kascin (Stryze Group, Alemania, "Made in Korea"). Es decir: **cualquier converter coreano que compre rollo de hidrocoloide de T&L (o equivalente) fabrica "el mismo" parche que Vue**. Vue no ha reclamado ninguna patente ni exclusividad en sus fichas.

Sobre la afirmación "medical-grade": en la UE Vue lo vende como cosmético (sin marcado CE, sin clase de producto sanitario). "Medical-grade" es un claim de marketing heredado del mercado estadounidense (Hero, Peach Slices) y conviene usarlo con cautela en la UE (ver §5).

---

## 2. Fabricantes coreanos de parches de hidrocoloide (OEM/private label)

| Proveedor | Ubicación | Qué ofrece | MOQ | Precio | Plazo | Certificaciones | Contacto / URL |
|---|---|---|---|---|---|---|---|
| **T&L Co., Ltd.** (KOSDAQ 340570) | Pyeongtaek/Anseong, Gyeonggi | Fabricante del rollo de hidrocoloide ("polymer specialist, not a converter"); >60 % cuota en Corea; ODM exclusivo de Hero Mighty Patch; OEM y composiciones a medida | No público (orientado a grandes marcas; negociable) | Negociable | — | Fabricante médico (wound care) | tnl.tradekorea.com · tel. +82-31-651-6255 · tnl.co.kr |
| **Nurimedics Co., Ltd.** | Gimpo, Gyeonggi (fund. 2013) | Parches de acné hidrocoloide OEM; caja, pouch zip o tarjeta; informe clínico de irritación a nombre del comprador; MSDS/COA; ya sirve a EE. UU., Canadá, UK, UE | Negociable (stock 1.000 uds en Tradekorea) | Negociable | Negociable | ISO 13485, ISO 22716, GMP | nurimedicskorea.com · WhatsApp +82-10-2895-8520 · tradekorea P815755 |
| **NewY Medical Co., Ltd.** (marca Derma-Aid / Thera Clear / TenByTen) | Anseong, Gyeonggi (fund. 2016) | Parches hidrocoloide (10 y 12 mm, biselados o no), private label; pueden añadir salicílico, tea tree, centella | **Alibaba: 10.000 hojas** · Tradekorea: **1.000 packs** | **0,50 $/hoja (1.000–9.999) → 0,40 $ (10k–30k) → 0,35 $ → 0,32 $/hoja (50k+)** | 30 días producción + tránsito | 3 certificados verificados en Tradekorea | newymedical.com · sales@newymedical.com · WhatsApp +82-10-4885-3573 · Alibaba 10000011764899 · tradekorea P817677 |
| **Twoa Korea / Awesome April** | Bupyeong, Incheon | Puntos hidrocoloide 8/10/12 mm "100 % hydrocolloid fabric", private label | No público | No público | — | — | acnepimplepatches.com · awesomeapril.com · info@awesomeapril.com · +82-10-2861-9747 |
| **DERMATECH** | Gangnam, Seúl + Wilmington (DE, EE. UU.) | Turnkey private label: hidrocoloide, invisible, microaguja, hidrogel; formas a medida incl. "wide-coverage" y línea; impresión digital a todo color; en Sephora/Ulta/Target | **1.000+ uds** | No público | 60 días media (Pietra indica 120+ días) | GMP ISO 22716, ISO 13485, KCGMP, FDA OTC & Class I, CE (hidrocoloide) | dermatech.life · support@dermatech.life · pietrastudio.com/sourcing/suppliers/dermatech |
| **SourcingLab (Look To Go Co., Ltd)** | Jongno Tower, Seúl | Agente/desarrollador coreano: **parche de nariz hidrocoloide con salicílico** de catálogo, "clinically tested 6–8 h", servicio integral (formulación, diseño, regulatorio, logística) | No público | No público | — | — | sourcing-lab.com · customer-care@sourcing-lab.com · +82-10-3009-2438 |
| **Nico Medical (Catch Me Patch)** | Bundang, Seongnam | Marca OEM-friendly ("primera marca coreana de hidrocoloide", +9 M parches); su nose patch se vende al por mayor vía GBSA en Alibaba | **160 uds** (wholesale listo para vender) | **2,09–2,31 $/ud** (producto acabado con marca Catch Me Patch) | — | — | stylekorean.com/brands/612 · Alibaba (GBSA) |
| **Taiki Cosmetics** (Japón/Francia) | Tokio / Francia | Parches hidrocoloide y anti-imperfecciones con activos; formas a medida; **también parches de nariz**; sobres zip con marca | **24.000 sobres** | No público | — | — | taikicosmetics.com/en/masks-patches/133-pimple-patches.html |
| Otros converters coreanos citados en listados (Crescent Seoul "Top 9") | Gyeonggi / Incheon | Hidrocoloide OEM | 1.000–5.000 típico | — | — | — | crescentseoul.com/post/top-7-manufacturers-of-hydrocolloid-patches |

**Notas de negociación con coreanos**
- Los parches de nariz/barbilla/frente son **troqueles personalizados**: cuenta con un coste de troquel de 500–2.000 $ (fuente: accio.com / listados OEM) salvo que uses la forma de catálogo del proveedor.
- Precio por parche de nariz: no hay tarifas públicas. Extrapolando el precio por hoja de NewY (0,32–0,50 $/hoja de 24 puntos) y el tamaño (un parche de nariz ≈ 8–10 cm² frente a 1 cm² de un punto), **estimo 0,30–0,60 $/parche de nariz en Corea a 10.000 uds**, más 0,30–0,80 $ de estuche/pouch. (Estimación propia; pedir cotización.)
- Pide **informe de irritación cutánea (RIPT) a tu nombre**, MSDS/COA, y que el fabricante esté en ISO 22716 (cosmético) — Nurimedics y Dermatech lo tienen.
- Origen Corea → **arancel 0 % en la UE** por el acuerdo UE-Corea si el exportador emite declaración de origen en factura (HS 3304.99; el tipo MFN sería 6,5 %).

---

## 3. Alternativas chinas (Alibaba / 1688 / Made-in-China)

### 3.1 Parches de nariz y de granos (hidrocoloide)

| Proveedor | Ubicación | Producto | MOQ | Precio | Certificaciones / notas | URL |
|---|---|---|---|---|---|---|
| **Lvsenlan Healthcare (Foshan) Co., Ltd.** | Foshan | "Private label blackhead & pimple remover nose pads" (hidrocoloide) | **3 uds** (muestra) | **0,14–0,21 $/ud** | 6.005 vendidos | alibaba.com/wholesale/hydrocolloid-nose-patch.html |
| **Nanjing J SUN Healthcare Co., Ltd.** | Nanjing | Parche hidrocoloide forma nariz + rectangular | 10.000 uds | **0,17 $/ud** | — | idem |
| **Trummed Medical (Hangzhou) Co., Ltd.** | Hangzhou | Pimple patch, nose patch, microneedle, rollo de hidrocoloide; 11+ años | 5.000 uds | Cotización | Fabricante médico | trummed.en.alibaba.com · trummed.com |
| **Ningbo Hysent Medical Technology Co., Ltd.** | Ningbo | Tira de nariz hidrocoloide contorneada | Cotización | Cotización | **CE, FDA, ISO 13485**, sala limpia 100.000; exporta a España | cnhysent.com/product/acne-patch/hydrocolloid-nose-strip.html |
| **Yanse Cosmetics (Guangzhou / Fujian)** | Guangzhou + Zhangzhou | Tiras de nariz "gentle hydrocolloid", formas nariz/T-zone/troquel a medida, impresas | **3.000 uds/SKU** (hasta 1 M/mes) | Cotización; setup mínimo para formas custom | ISO 22716, FDA cosmetic GMP, GMPC, Sedex, SGS; **muestras gratis** (7–10 días) | yansecos.com/products/nose-strips |
| **Guangzhou Xiran Cosmetics Co., Ltd.** | Baiyun, Guangzhou | Nose patch hidrocoloide private label + toda la gama de cuidado facial | 1.000 uds (fórmulas estándar) | Cotización (sus cremas 3,5–4,5 $/ud) | FDA registered, ISO 22716, GMP, vegano; muestras | xiranskincare.com · bertha@xirancn.com |
| **Wuhan Huawei Technology** | Wuhan | Tiras de nariz clásicas (carbón/PVA, **no** hidrocoloide) | 5.000 | **0,01–0,05 $/ud** | CE, ISO 13485, ISO 9001 | huaweimedical.en.made-in-china.com |
| **1688.com** (mayoristas chinos) | — | Tiras/parches de nariz | 10.000+ | **0,04–1,00 CNY/ud** (0,005–0,13 €) según material | Fábricas verificadas: 广州谦富晋生物科技, 广东欧佩化妆品 | 1688.com/wiki/zh/skincare/WKfomz7t3529z4 |
| Referencia de mercado (Alibaba/accio) | China | Parche hidrocoloide básico (punto) | 10.000+ | **< 0,03 $/ud**; con activos 0,05 $+ | — | alibaba.com/supplier/hydrocolloid-patch-manufacturer.html |

**Corea vs. China para hidrocoloide:** los coreanos venden "finura, transparencia y adhesión" (tecnología de rollo T&L) y el sello *Made in Korea* que Vue explota en todo su marketing; los chinos cuestan 3–5 veces menos y tienen MOQ mínimos, pero pierdes el claim K-beauty y, en muchos casos, la calidad de adhesión/transparencia. Una vía intermedia: comprar el rollo a T&L y convertir en China, o pedir a Trummed/Hysent parches con rollo "Korean grade".

### 3.2 Líquidos (Guangzhou OEM)

| Categoría | Proveedor ejemplo | MOQ | Precio | Fuente |
|---|---|---|---|---|
| Sérum niacinamida 30 ml | Listado Alibaba "Private Label Niacinamide Serum 5% Korean" (certifs GMP, ISO 22716, CPNP, CE) | 1.000 (tramo 500–999 disponible) | **1,56 $ (500–999) · 1,42 $ (1k–3k) · 1,29 $ · 1,06 $ (10k+)** | alibaba.com/product-detail/…1601827230174 |
| Sérum/tónico/limpiador genéricos | Guangzhou Shiruoni, Guangzhou Hefu, Amarrie, Boya, KLX | 500–1.000 | 0,35–7,80 $ según fórmula y envase; 15 días laborables | made-in-china.com / accio |
| Mascarillas de tela colágeno | Xiran (30.000 uds), Freshbeauty, Amarrie, Boya; MOQ desde 50–1.000 en otros | 1.000–10.000 | **0,50–2,00 $/ud** a 5.000+ (OEMKorea); China low-end 0,15–0,40 $ | xiranskincare.com/sheet-mask · oemkorea.com |
| Discos de algodón/bambú reutilizables | Suzhou Linye Textile (MOQ 2), Shanghai Meanlove (14.400), decenas más | 100–1.000 típico | Estimación 0,08–0,25 $/disco; set de 16 + bolsa de malla ≈ 1,5–3 $ | alibaba.com/showroom/reusable-cotton-rounds.html |

---

## 4. ODM/OEM coreano para sérum, tónico, limpiador, crema y peel-off

### 4.1 Precios de referencia (OEMKorea, 2026, MOQ 1.000–3.000, envase estándar)

| Producto | Coste/ud | Equivalente Vue | PVP Vue |
|---|---|---|---|
| Tónico | 1,50–5,00 $ | HA Toner 130 ml | 25 € |
| Limpiador | 1,20–4,50 $ | Jelly Cleanser 150 ml | 27 € |
| Sérum (activos commodity, p. ej. niacinamida 2 %) | 2,50–5,50 $ | Niacinamide Serum 30 ml | 30 € |
| Sérum (activos premium) | 5,00–12,00 $ | — | — |
| Esencia / exfoliante líquido | 2,00–7,00 $ | Salicylic Exfoliant 110 ml | 32 € |
| Hidratante | 2,00–7,50 $ | Prebiotic Moisturizer 70 ml | 21 € |
| Mascarilla de tela | 0,50–2,00 $ (5.000+) | Sheet masks | 5 € |
| Envase: gotero vidrio 30 ml 0,50–1,20 $; frosted con tapa metal 1,80–3,50 $; estuche 0,30–1,50 $ | | | |
| Utillaje envase a medida 3.000–15.000 $ · RIPT 1.500–3.500 $ · CPSR UE 500–2.500 € · panel consumidores 5.000–15.000 $ (los "93 % vieron poros más limpios" de Vue) | | | |

Descuento por volumen: −20/40 % al pasar de 1.000 a 5.000 uds; otro −10/20 % de 5.000 a 10.000. Boutique labs (500 uds) cobran +30/50 % sobre gama media. Coste total de lanzamiento por SKU en private label coreano: **5.000–15.000 $** (knok / OEMKorea).

### 4.2 Fabricantes y agentes coreanos por nivel

| Nivel | Empresas | MOQ típico | Comentario |
|---|---|---|---|
| Tier 1 | **Cosmax, Kolmar Korea, Intercos Korea, Cosmecca (grande)** | 5.000–10.000 uds/SKU (Kolmar negociable a 3.000 vía Mayk) | Mejor precio a escala; poco interés en marcas nuevas |
| Tier 2 | **Cosmecca Korea, Enbioscience, Green Cos, BNB Korea, NFC, Hankook Cosmo (Cheonan), Cosmocos, Hankook Cosmetics (mixsoon)** | 1.000–5.000 | +10–20 % sobre Tier 1; sweet spot para replicar Vue |
| Tier 3 / boutique | Laboratorios de Seongdong-gu (Seúl) e Incheon | 500 | +30–50 %; ideales para test |
| Agentes / plataformas de sourcing (hablan inglés, gestionan CPSR/CPNP) | **OEMKorea** (oemkorea.com), **Mayk** (mayk-factory.com), **knok** (knokglobal.com), **SourcingLab** (sourcing-lab.com), **Crescent Seoul**, **Altameet**, **Veilta** (veilta.com), **KPrivateLabel** (kprivatelabel.com), **NutriAdvisor** (nutriadvisor.net), **withC Korea** | 500–3.000 | Cobran margen (10–25 %) pero reducen MOQ y riesgo; SourcingLab ya tiene en catálogo el "hydrocolloid nose patch con BHA" |
| Private label "listo para etiquetar" (no coreano) | **Awilke Branding** (Awilke Biotech; BHA Liquid Exfoliant **3,00 $/ud, MOQ 1.000**, etiqueta y estuche a medida) · **Supliful** (69 $/mes, sin MOQ, catálogo con HA serum y moisturizer, sin parches) · **Blanka** (desde 39 $/mes, cosmética norteamericana, sin MOQ) | 0–1.000 | Rápido pero sin claim *Made in Korea* y sin parches de hidrocoloide en catálogo |

**Peel-off de colágeno (70–80 ml):** es una categoría de catálogo ("collagen wrapping mask") en Corea: Matrigen, Medicube, Tosowoong, Arocell, mixsoon (Hankook Cosmetics), MDP+. Cualquier Tier 2 la tiene como fórmula base; Alibaba tiene un showroom "korean-peel-off-mask" con MOQ 1.000. Coste estimado 2–4 $/ud en tubo 70 ml.

**Jelly cleanser con konjac:** referencia coreana en retail = Gooseberry AHA Jelly Cleanser 120 ml (glicólico 20.000 ppm + glucomanano). Hankook Cosmo y Cosmocos hacen geles de este tipo en OEM.

---

## 5. Cumplimiento normativo para vender en España / UE

### 5.1 ¿Cosmético o producto sanitario?
- Los parches de hidrocoloide con posicionamiento cosmético ("absorbe grasa e impurezas", "poros más limpios", "protege la imperfección") son **cosméticos** bajo el Reglamento (CE) 1223/2009. Así los vende Vue (sin CE, sin clase MDR).
- Se convierten en **producto sanitario (MDR 2017/745, normalmente Clase I o IIa como apósito hidrocoloide)** si reclamas "cura heridas", "trata el acné" (enfermedad), uso post-procedimiento, etc. Evítalo: MDR implica marcado CE, UDI, EUDAMED, persona responsable del cumplimiento y, en Clase IIa, organismo notificado (decenas de miles de euros).
- Cuidado con "medical-grade": no está prohibido pero es un claim que debe poder sustanciarse (Reg. 655/2013 sobre criterios comunes de claims). Mejor "hidrocoloide de grado hospitalario, tecnología de apósitos" con evidencia del fabricante (Dermatech tiene CE como apósito; Nurimedics ISO 13485).
- El exfoliante con ácido salicílico: máximo 2 % en leave-on; advertencia obligatoria "Contiene ácido salicílico. No usar en niños menores de 3 años". Los AHA (glicólico/mandélico) en leave-on exigen advertencia de protección solar.

### 5.2 Obligaciones (vía cosmética)
1. **Persona Responsable (PR) en la UE**: eres tú (tu SL española) si importas de Corea/China, o un servicio de PR externo. Aparece en la etiqueta.
2. **PIF (expediente de información del producto)** con **CPSR** firmado por evaluador de seguridad cualificado, método de fabricación GMP (ISO 22716 del fabricante), pruebas (estabilidad, challenge test, compatibilidad envase), sustanciación de claims. Conservar 10 años.
3. **Notificación CPNP** antes de la comercialización (gratuita; 1 por SKU).
4. **Etiquetado en castellano**: nombre y dirección de la PR, país de origen ("Made in Korea"), contenido nominal, PAO o fecha, lote, INCI, advertencias, función.
5. **España – AEMPS (RD 85/2018)**: quien **importe cosméticos desde fuera de la UE** debe presentar la **declaración responsable de actividades de importación** (aplicación COSMET2) con persona de contacto cualificada, procedimientos escritos (control de calidad, reclamaciones, retirada) e instalaciones/almacén adecuados (puede ser subcontratado). Tasas 2023-2026: **5.06 importación 466,23 €**; inspección 5.10 418,59 €; fabricación (5.05) 932,46 €. Si compras a un importador ya establecido en la UE (p. ej. un agente coreano con filial en NL/DE que actúe como PR) **no** necesitas la declaración; sólo serías distribuidor.
6. **Aduana e IVA**: HS 3304.99 (cosméticos) — arancel MFN 6,5 %, **0 % con origen preferencial Corea (acuerdo UE-Corea, declaración de origen en factura)**; China 6,5 %. IVA de importación 21 % sobre valor CIF + arancel (deducible). Algunos despachos clasifican apósitos hidrocoloides en HS 3005 (arancel 0 %), pero al ser cosmético, 3304.

### 5.3 Costes de compliance (2026)

| Partida | Coste | Fuente |
|---|---|---|
| CPSR (evaluación de seguridad) | 180–450 € fórmula simple; 350–1.500 € compleja | Noedal, Veilta |
| Challenge test (eficacia conservante) | 150–300 € | Noedal |
| Estabilidad (acelerada/real) | 300–1.000 € | Noedal |
| Compilación PIF | 300–800 € | Noedal |
| Revisión etiqueta | 100–300 € | Noedal |
| Persona Responsable externa | 200–900 €/producto/año o 1.500–5.000 €/año paquete | Noedal, EUverify, Eldris |
| CPNP | 0 € (portal) | — |
| RIPT/irritación (opcional, para claims) | 1.500–3.500 $ (el OEM coreano suele incluirlo) | OEMKorea |
| Declaración responsable AEMPS (importador) | 466,23 € + 418,59 € inspección | AEMPS tasas |
| **Total 1 producto, primer año** | **1.500–4.500 €** | Noedal |
| **Total 10 productos (rango Vue)** | **500–1.500 €/producto** | Noedal |

Consultoras en España: Aseconsa (aseconsa.es), Emeba Consulting (registro CPNP), Cosmereg, ASC Services (declaración responsable importadores), Deunapieza; internacionales: Biorius, Cosmeservice, EU Compliance Partner (PIF + CPSR desde 300 $/producto), Certified Cosmetics, B-Lands.

---

## 6. Dropshipping / print-on-demand (opción "sin stock")

| Plataforma | Coste | Qué tiene | Limitación para replicar Vue |
|---|---|---|---|
| **Supliful** | 69 $/mes (55 anual), sin MOQ | 150+ productos: sérum HA, moisturizer anti-aging, suplementos | Sin parches de hidrocoloide; fabricado en EE. UU.; envío desde EE. UU. (aduana UE) |
| **Blanka** | desde 39 $/mes, sin MOQ | Cosmética y skincare norteamericana | Sin parches; sin K-beauty |
| **Faire** (mayorista) | Sin cuota; precios al registrarse | Marcas coreanas de parches (TGI Patch, 1028…) para reventa | No es marca propia |
| **Catch Me Patch vía GBSA (Alibaba)** | MOQ 160, 2,09–2,31 $/ud | Nose patch coreano acabado | Con marca del fabricante, no tuya |
| **AliExpress Business / Lvsenlan** | MOQ 3, 0,14–0,21 $/ud | Nose pads hidrocoloide etiqueta blanca | Sin compliance UE ni PR; riesgo aduanero |

Conclusión: **no existe un POD real para parches de hidrocoloide en la UE**; el camino serio es un pedido de 1.000–3.000 uds a un converter coreano o chino y un 3PL en España/NL.

---

## 7. Coste desembarcado y margen bruto estimado (por unidad, tirada de 3.000–5.000)

Supuestos: cambio 1 $ ≈ 0,92 €; flete aéreo Corea→ES ≈ 0,15–0,40 €/ud según volumen; arancel 0 % (Corea, con origen) / 6,5 % (China); IVA no incluido (es neutro). PVP neto = PVP Vue / 1,21.

| Producto | PVP Vue | PVP neto IVA | Coste fábrica (Corea) | Envase + etiqueta | Flete + aduana | **Coste desembarcado** | **Margen bruto** | Coste desembarcado China | Margen China |
|---|---|---|---|---|---|---|---|---|---|
| Nose Patches (8) | 16,95 € | 14,01 € | 8 × 0,30–0,60 $ = 2,4–4,8 $ | 0,40–0,80 $ | 0,30 € | **≈ 3,0–5,4 €** | **61–79 %** | 8 × 0,15–0,21 $ + 0,4 $ ≈ 1,6–2,1 $ + 0,35 € | **≈ 1,8–2,3 € → 84–87 %** |
| Chin Patches (8) / Forehead (5) | 16,95 € | 14,01 € | similar + amortización troquel (500–2.000 $) | idem | idem | ≈ 3,0–5,5 € | 60–79 % | ≈ 1,8–2,3 € | 84–87 % |
| Surface Patches (10) | 15,95 € | 13,18 € | 10 × 0,20–0,40 $ | 0,40–0,80 $ | 0,30 € | ≈ 2,6–4,7 € | 64–80 % | ≈ 1,3–2,0 € | 85–90 % |
| Clearing Spot Patches (36) | 15,95 € | 13,18 € | 1,5 hojas × 0,32–0,50 $ = 0,5–0,75 $ | 0,40–0,80 $ | 0,25 € | **≈ 1,1–1,7 €** | **87–92 %** | 36 × 0,03 $ ≈ 1,1 $ + envase | ≈ 1,2–1,6 € → 88–91 % |
| Salicylic Exfoliant 110 ml | 32 € | 26,45 € | 2,0–5,0 $ (incl. frasco estándar) | 0,30–1,00 $ estuche | 0,50 € | **≈ 2,6–6,0 €** | **77–90 %** | 1,0–2,5 $ | ≈ 1,7–3,0 € → 89–94 % |
| Niacinamide Serum 30 ml | 30 € | 24,79 € | 2,5–5,5 $ | 0,50–1,50 $ (gotero+estuche) | 0,35 € | **≈ 3,1–6,8 €** | **73–87 %** | 1,06–1,56 $ + 0,5 $ | ≈ 1,8–2,3 € → 91 % |
| HA Toner 130 ml | 25 € | 20,66 € | 1,5–5,0 $ | 0,30–1,00 $ | 0,55 € | ≈ 2,2–6,1 € | 70–89 % | 0,8–2,0 $ | ≈ 1,5–2,6 € |
| Jelly Cleanser 150 ml | 27 € | 22,31 € | 1,2–4,5 $ | 0,40–1,00 $ (pump) | 0,60 € | ≈ 2,1–5,7 € | 74–91 % | 0,8–2,0 $ | ≈ 1,5–2,6 € |
| Prebiotic Moisturizer 70 ml | 21 € | 17,36 € | 2,0–7,5 $ | 0,30–1,00 $ | 0,40 € | ≈ 2,5–8,2 € | 53–86 % | 1,0–2,5 $ | ≈ 1,6–3,0 € |
| Collagen Peel-Off 70 ml | 29 € | 23,97 € | 2,0–4,0 $ | 0,30–0,80 $ | 0,40 € | ≈ 2,5–4,8 € | 80–90 % | 1,0–2,0 $ | ≈ 1,5–2,5 € |
| Sheet mask (1) | 5 € | 4,13 € | 0,50–2,00 $ | incl. | 0,10 € | ≈ 0,6–1,9 € | 54–86 % | 0,15–0,40 $ | ≈ 0,3–0,5 € → 88–93 % |
| Bamboo cotton pads (set) | 14 € | 11,57 € | 1,5–3,0 $ (China) | incl. bolsa | 0,30 € | ≈ 1,7–3,1 € | 73–85 % | — | — |

**Lectura:** el margen bruto de la categoría es del 70–90 %, lo que explica que Vue pueda gastar en TikTok Shop (sus productos llevan la etiqueta `shoptok`) y suscripciones con −15 %. Los cuellos de botella no son el coste de producto sino: (a) inversión inicial (≈ 15.000–40.000 € para 5 SKU con MOQ 1.000–3.000 + compliance), (b) CAC en paid social, (c) logística de última milla (≈ 4–6 € por pedido en España).

---

## 8. Cómo lanzar tu propia marca de parches de hidrocoloide en España (paso a paso)

**Fase 0 — Decisión de portfolio (semana 1-2)**
1. Empieza por lo que Vue vende mejor y es más commodity: **Nose Patches + Spot Patches + Surface Patches** (tres troqueles del mismo material) y opcionalmente el **Salicylic Exfoliant** como "duo" (Vue vende el Clear Pore Duo a 44 €).
2. Define claims cosméticos (no médicos): "absorbe sebo e impurezas en 6-8 h", "poros visiblemente más limpios". Nada de "trata el acné".

**Fase 1 — Sourcing y muestras (semanas 2-6)**
3. Pide cotización simultánea a: **Nurimedics, NewY Medical, Dermatech, SourcingLab** (Corea) y **Yanse, Trummed, Hysent, Lvsenlan** (China). Plantilla de RFQ: forma (nariz ≈ 60×45 mm, barbilla, frente, rectángulo 40×30 mm, puntos 10/12 mm), grosor, transparencia, con/sin BHA, unidades por caja, tipo de envase (caja + blíster/pouch), impresión, MOQ, precio por tramo, plazo, muestras, certificaciones (ISO 22716, ISO 13485), RIPT, MSDS/COA, declaración de origen UE-Corea.
4. Pide muestras (Yanse gratis; coreanos suelen cobrar 50–150 $ + envío) y compara con un pack de Vue (16,95 €) y de Hero Mighty Patch Nose: adhesión, transparencia, cantidad de "blanqueo" tras 6 h.
5. En paralelo, compra 2-3 muestras de tónico/sérum/exfoliante de catálogo a un agente coreano (OEMKorea, Mayk, knok, SourcingLab) e indica los INCI de Vue como referencia ("similar profile").

**Fase 2 — Marca y compliance (semanas 4-12, solapado)**
6. Constituye una SL (o usa la existente) y registra la marca en la EUIPO (≈ 850 € una clase).
7. Contrata un servicio de **Persona Responsable / PIF / CPSR** (Aseconsa, Emeba, Cosmereg en España; Biorius / Cosmeservice / EU Compliance Partner en la UE). Presupuesto 1.500–4.500 € para el primer producto, 500–1.500 €/producto adicional. Exige al fabricante coreano el dossier completo (fórmula %, certificados de materias primas, GMP, estabilidad, challenge test).
8. Si importas tú directamente desde Corea: presenta la **declaración responsable de importación en AEMPS (COSMET2)**, tasa 466,23 €, nombrando a un técnico responsable (puede ser la consultora) y un almacén (puede ser tu 3PL). Alternativa sin AEMPS: que el 3PL/PR con licencia de importación en NL/DE sea el importador y tú compres "intra-UE".
9. Diseña envase y etiqueta en castellano (+ inglés/francés si vendes fuera): PR, origen, contenido, PAO, lote, INCI, advertencias de salicílico/AHA. Revisión de etiqueta 100–300 €.
10. Notifica cada SKU en el **CPNP** (gratis) antes de vender.

**Fase 3 — Producción y logística (semanas 10-20)**
11. Pedido inicial recomendado: 3.000 cajas nose + 2.000 spot + 1.000 surface (≈ 6.000–12.000 € en Corea; 3.000–5.000 € en China) + 1.000 uds del exfoliante (≈ 3.000–5.000 €). Depósito 30-50 % T/T; saldo antes de embarque.
12. Envío: aéreo (DHL/FedEx, 3-6 días, ≈ 4–7 €/kg de Corea para 50–100 kg) para el primer lote; marítimo LCL para reposiciones. Contrata agente de aduanas; usa la declaración de origen para 0 % de arancel.
13. 3PL en España (o en NL como Vue si vendes a toda Europa) con integración Shopify.

**Fase 4 — Lanzamiento (semana 16+)**
14. Shopify + TikTok Shop + Amazon.es (Vue ya está en Amazon US; en la UE el hueco es mayor). Precio ancla 14,95–16,95 € el pack de 8, bundles y suscripción −15 % (copia el esquema de Vue).
15. Panel de consumidores (30-100 personas, 2 semanas) para poder decir "9 de 10 vieron poros más limpios" — Vue usa n = 105 para el tónico. Coste 2.000–5.000 € en España vs 5.000–15.000 $ en Corea.
16. Reposición: negocia tramos de 10.000+ (NewY baja a 0,32 $/hoja; China < 0,03 $/punto).

**Presupuesto orientativo para arrancar con 4 SKU (3 parches + exfoliante), tirada 1.000–3.000/SKU:** producto 12.000–20.000 € · troqueles 1.000–3.000 € · compliance 4.000–8.000 € · marca/diseño 2.000–4.000 € · logística inicial 1.500–3.000 € · web/contenido 2.000–5.000 € → **≈ 22.000–43.000 €**. Con la vía China + fórmulas de catálogo, ≈ 12.000–20.000 €.

---

## 9. Tabla comparativa rápida de proveedores de parches

| Proveedor | País | Nose/Chin/Forehead a medida | MOQ | Precio indicativo | Certificaciones | Plazo | Idoneidad para "réplica Vue" |
|---|---|---|---|---|---|---|---|
| T&L Co. | KR | Sí (rollo original de Hero) | Alto/negociable | Negociable | Médico, OEM | — | ★★★★★ (mismo material) pero difícil acceso para MOQ bajos |
| Nurimedics | KR | Sí (troquel a medida, packaging a medida) | Negociable (~1.000) | Negociable | ISO 13485, ISO 22716, GMP | ~30-45 días | ★★★★★ |
| NewY Medical | KR | Puntos 10/12 mm; formas bajo pedido | 1.000 packs / 10.000 hojas | 0,32–0,50 $/hoja | 3 certs | 30 días | ★★★★ |
| Dermatech | KR/US | Sí, formas y print a medida | 1.000+ | Cotización | ISO 22716, 13485, KCGMP, FDA, CE | 60–120 días | ★★★★ (más caro, muy completo) |
| SourcingLab | KR | Nose patch con BHA de catálogo | Cotización | Cotización | Agente | — | ★★★★ (turnkey) |
| Catch Me Patch / GBSA | KR | Nose patch acabado | 160 | 2,09–2,31 $/ud | — | inmediato | ★★ (marca ajena, para test de mercado) |
| Yanse | CN | Sí, troquel a medida | 3.000/SKU | Cotización | ISO 22716, FDA GMP, Sedex | 7–10 días muestras | ★★★★ |
| Trummed Medical | CN | Sí (nose patch en catálogo) | 5.000 | Cotización | ISO 13485 | — | ★★★ |
| Ningbo Hysent | CN | Nose strip hidrocoloide | Cotización | Cotización | CE, FDA, ISO 13485 | — | ★★★ |
| Lvsenlan (Foshan) | CN | Nose pads | 3 | 0,14–0,21 $/ud | — | rápido | ★★★ (prototipo barato) |
| Nanjing J SUN | CN | Nariz + rectangular | 10.000 | 0,17 $/ud | — | — | ★★★ |
| Taiki | JP/FR | Sí | 24.000 sobres | Cotización | — | — | ★★ (MOQ alto; ventaja: PR europea) |

---

## 10. Fuentes

**Vue / INCI**
- https://www.vueskin.com/products/hydrocolloid-nose-patches
- https://www.vueskin.com/products/salicylic-acid-exfoliant
- https://www.vueskin.com/products/niacinamide-serum
- https://www.vueskin.com/products/collagen-peel-off-mask
- https://www.vueskin.com/products/hyaluronic-acid-toner
- https://www.vueskin.com/products/exfoliating-jelly-cleanser
- https://www.vueskin.com/products/prebiotic-clarifying-moisturiser
- https://www.vueskin.com/products.json?limit=250
- https://www.vueskin.com/pages/legal-notice (VAMI Sàrl, CHE-151.596.957)
- https://www.skincarisma.com/brands/12469
- https://skinsort.com/products/vue-swiss/hydrocolloid-nose-patches
- https://skinsort.com/products/vue-swiss/hyaluronic-acid-toner
- https://www.amazon.com/Vue-Swiss-Hydrocolloid-Blackheads-Smoother/dp/B0GPW762LL
- https://escentual.com/products/vue-collagen-peel-off-mask
- https://lilidrogerie.gr/en-gb/vue-collagen-peel-off-mask-70ml

**Productos con el mismo hidrocoloide / familias de fórmula**
- https://www.herocosmetics.us/products/mighty-patch-nose
- https://www.iherb.com/pr/hero-cosmetics-mighty-patch-nose-10-hydrocolloid-patches/119794
- https://www.skinchoice.com/products/hydrocolloid-nose-patches
- https://incidecoder.com/products/nico-medical-catch-me-patch-spot-care-cover
- https://www.stylekorean.com/brands/612/catch-me-patch
- https://www.amazon.co.uk/Kascin-Nose-Patch-Hydrocolloid-Impurities/dp/B09SG68WVM
- https://www.amazon.com/nose-pimple-patches-pore-strips/dp/B0DVS4VSKW (Prime Patch)
- https://www.amazon.com/Peach-Slices-Medical-Grade-Hydrocolloid-Cruelty-Free/dp/B0C1TZ73G3
- https://inkeedecoder.com/products/matrigen-ss-collagen-peel-off-facial-mask
- https://medicube.us/products/collagen-night-wrapping-mask
- https://www.stylekorean.com/product/super-collagen-wrapping-mask-80ml/1768379883
- https://www.stylekorean.com/product/gooseberry-aha-jelly-cleanser-120ml/1762150964
- https://skinsort.com/products/dermalogica/liquid-peelfoliant
- https://incidecoder.com/products/derma-co-x-dr-v-exfoliator
- https://incidecoder.com/ingredients/melia-azadirachta-leaf-flower-extract (complejo Campo Blue)

**Fabricantes coreanos de hidrocoloide**
- https://valueinvestorsclub.com/idea/Tandamp;L_Co_Ltd/7182469277 (T&L / Hero)
- https://tnl.tradekorea.com/main.do
- https://a051358127264.gobizkorea.com/mini/site/companyProfile.do
- https://www.nurimedicskorea.com/hydrocolloid-oem-acne-patch
- https://www.tradekorea.com/product/detail/P815755/Hydrocolloid-Acne-Patches--OEM-.html
- https://www.newymedical.com/
- https://www.tradekorea.com/product/detail/P817677
- https://www.alibaba.com/product-detail/Hydrocolloid-Patches-Manufacturer-from-Korea-with_10000011764899.html
- https://www.acnepimplepatches.com/ · https://www.awesomeapril.com/korean-hydrocolloid-acne-patch
- https://www.dermatech.life/ · https://www.pietrastudio.com/sourcing/suppliers/dermatech
- https://sourcing-lab.com/hydrocolloid-nose-patches-private-label-formulation-adheres-comfortably-and-peels-off-without-irritation/
- https://www.taikicosmetics.com/en/masks-patches/133-pimple-patches.html
- https://www.crescentseoul.com/post/top-7-manufacturers-of-hydrocolloid-patches
- https://www.alibaba.com/countrysearch/KR/nose-strips.html

**Alternativas chinas**
- https://www.alibaba.com/wholesale/hydrocolloid-nose-patch.html (Lvsenlan, Nanjing J SUN, GBSA/Catch Me Patch)
- https://www.yansecos.com/products/nose-strips
- https://trummed.en.alibaba.com/ · https://www.made-in-china.com/showroom/975e7d4cf494c501/
- https://www.cnhysent.com/product/acne-patch/hydrocolloid-nose-strip.html
- https://xiranskincare.com/product/private-label-pimple-healing-patch-blackhead-removal-overnight-hydrocolloid-nose-patch/
- https://xiranskincare.com/sheet-mask/
- https://huaweimedical.en.made-in-china.com/product/QAKRFleOlqVS/…
- https://www.1688.com/wiki/zh/skincare/WKfomz7t3529z4
- https://www.alibaba.com/supplier/hydrocolloid-patch-manufacturer.html
- https://www.alibaba.com/product-detail/Private-Label-Niacinamide-Serum-5-Korean_1601827230174.html
- https://www.alibaba.com/showroom/reusable-cotton-rounds.html
- https://www.accio.com/plp/pimple-patch-private-label

**OEM/ODM coreano de líquidos y precios**
- https://oemkorea.com/blog/korean-oem-pricing-explained
- https://oemkorea.com/cosmetics/toner-oem
- https://knokglobal.com/blog/k-beauty-private-label-create-skincare-brand
- https://altameet.com/blog/oem-vs-odm-vs-private-label-primer-indie-kbeauty-founders-2026
- https://mayk-factory.com/blog/12-most-sought-after-korean-skincare-manufacturers
- https://www.crescentseoul.com/post/top-7-korean-skin-care-manufacturers
- https://xiranskincare.com/top-10-private-label-korean-skin-care-manufacturer/
- https://www.awilkebranding.com/product/bha-liquid-exfoliant/
- https://veilta.com/en/blog/korean-face-masks-oem-private-label
- https://www.kprivatelabel.com/product/collagen-face-mask/
- https://nutriadvisor.net/sheet-mask-oem

**Dropshipping**
- https://supliful.com/ · https://supliful.com/catalog/hyaluronic-acid-serum
- https://blankabrand.com/blogs/beyond-the-brand-beauty-blog/top-5-private-label-dropshipping-partners-for-beauty-brands
- https://www.faire.com/discover/hydrocolloid-patch

**Regulatorio UE / España**
- https://veilta.com/en/blog/pimple-patch-fda-cpnp-compliance
- https://noedal.com/blog/how-much-does-cosmetics-compliance-actually-cost-a-market-by-market-breakdown-for-the-eu-uk-us-and-uae/
- https://biorius.com/cosmetic-news/beauty-tools-and-cosmetics-as-medical-devices-eu-regulations/
- https://euverify.com/eu-uk-responsible-person-for-cosmetics/
- https://eucompliancepartner.com/eu-responsible-person-cosmetics-service
- https://www.aemps.gob.es/preguntas-y-respuestas-mas-frecuentes-sobre-la-declaracion-responsable-de-actividades-de-fabricacion-y-o-importacion-de-productos-cosmeticos/
- https://www.aemps.gob.es/industria-farmaceutica/tasas/relaciontasas/
- https://ascservices.es/importar-cosmeticos-declaracion-responsable/
- https://www.aseconsa.es/cosmeticos · https://www.emebaconsulting.com/registro-cpnp-productos-cosm%C3%A9ticos · https://cosmereg.com/regulacion-cosmetica-europa/?lang=es
- https://www.kontactic.com/blog/does-the-korus-or-korea-eu-fta-cut-your-import-duty-to-zero
- https://www.tariffnumber.com/2026/33049900
- https://rateships.com/en/customs/spain
