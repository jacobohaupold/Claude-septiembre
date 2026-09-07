# NOCTA — Catálogo completo (13 SKU)

Fuente de precios y contenidos: `web/public/assets/js/products.js` (`NOCTA_PRODUCTS`, fuente única de verdad de la web). Fuente de coste desembarcado, proveedor y MOQ: `producto/fichas_desarrollo_producto.md`. Los costes de las fichas se dan como rango; el coste y el margen de esta tabla usan el **punto medio del rango** como estimación — hay que sustituirlo por el coste real en cuanto haya cotización de muestras. Los packs suman el coste de sus componentes + coste de envase de regalo indicado en la sección "Packs" de las fichas.

Claims: bajo Reglamento (CE) 1223/2009. Permitidos siempre que estén sustanciados por las pruebas de aceptación de cada ficha (adhesión, blanqueo, ausencia de irritación); prohibidos en toda la gama, sin excepción: **"cura"**, **"trata el acné"**, **"elimina los puntos negros para siempre"**, **"medical-grade"** sin sustanciación, cualquier alegación que presente el producto como sanitario en vez de cosmético.

Imagen: ruta bajo `web/public/assets/img/`. Vídeo: ruta esperada `web/public/assets/video/<slug>.mp4`; a día de hoy la carpeta `assets/video/` no existe todavía en el repo, así que los 13 SKU están **pendientes de vídeo**.

## Tabla resumen

| # | SKU | Nombre | Precio | Precio susc. | Coste desembarcado (est.) | Margen bruto | Proveedor principal | Imagen | Vídeo |
|---|---|---|---:|---:|---:|---:|---|:---:|:---:|
| 1 | NC-NOSE-8 | Parches de Nariz | 16,95 € | 14,41 € | ≈4,20 € (3,0-5,4) | ~75 % | Nurimedics / NewY Medical | ✓ | pendiente |
| 2 | NC-SPOT-36 | Parches para Granos | 15,95 € | 13,56 € | ≈1,75 € (1,6-1,9) | ~89 % | NewY Medical / Nurimedics | ✓ | pendiente |
| 3 | NC-SURF-10 | Parches de Superficie | 15,95 € | 13,56 € | ≈3,45 € (2,4-4,5) | ~78 % | Igual que nariz (troquel estándar) | ✓ | pendiente |
| 4 | NC-CHIN-8 | Parches de Barbilla | 16,95 € | 14,41 € | ≈4,40 € (3,2-5,6) | ~74 % | Nurimedics / Dermatech | ✓ | pendiente |
| 5 | NC-FORE-5 | Parches de Frente | 16,95 € | 14,41 € | ≈4,65 € (3,5-5,8) | ~73 % | Igual que barbilla (Dermatech/SourcingLab) | ✓ | pendiente |
| 6 | NC-BHA-110 | Exfoliante Ácido Salicílico 2 % | 32,00 € | 27,20 € | ≈4,15 € (2,8-5,5) | ~87 % | OEMKorea / Mayk / Awilke | ✓ | pendiente |
| 7 | NC-NIA-30 | Sérum Niacinamida 2 % | 29,00 € | 24,65 € | ≈4,55 € (3,1-6,0) | ~84 % | OEMKorea / knok / Cosmecca | ✓ | pendiente |
| 8 | NC-PEEL-70 | Mascarilla Peel-Off Colágeno | 29,00 € | 24,65 € | ≈3,30 € (2,3-4,3) | ~89 % | Cosmecca / Hankook (vía Mayk/OEMKorea) | ✓ | pendiente |
| 9 | NC-SHEET-4 | Pack 4 Mascarillas de Tela | 15,00 € | 12,75 € | ≈3,55 € (2,4-4,7) | ~76 % | OEMKorea / KPrivateLabel | ✓ | pendiente |
| 10 | NC-TON-130 | Tónico Ácido Hialurónico | 25,00 € | 21,25 € | ≈4,10 € (2,2-6,0) | ~84 % | OEMKorea / Cosmecca / Hankook Cosmo | ✓ | pendiente |
| 11 | NC-DUO | Dúo Poros Limpios (pack) | 44,00 € | 37,40 € | ≈8,95 € | ~80 % | Suma NC-BHA-110 + NC-NOSE-8 | ✓ | pendiente |
| 12 | NC-TZONE | Kit Zona T (pack) | 44,00 € | 37,40 € | ≈13,50 € | ~69 % | Suma NC-FORE-5 + NC-NOSE-8 + NC-CHIN-8 | ✓ | pendiente |
| 13 | NC-FULL | Kit Cara Completa (pack) | 69,00 € | 58,65 € | ≈19,35 € | ~72 % | Suma de los 5 parches | ✓ | pendiente |

Imagen ✓ = existe al menos una imagen de portada en `assets/img/` referenciada por `products.js` para ese SKU (confirmado en esta revisión).

---

## 1. Parches de Nariz

- **Slug / URL:** `parches-nariz` → `/producto.html?p=parches-nariz`
- **Precio:** 16,95 € · **Suscripción:** 14,41 € (−15 %, cada 30/45/60 días)
- **Coste desembarcado:** 3,0-5,4 € (Corea, arancel 0 %) → **margen bruto ≈75 %** sobre el punto medio (4,20 €); con China (Yanse/Trummed/Ningbo Hysent) el coste baja a 1,8-2,3 € y el margen sube a ~88 %
- **Formato/contenido:** 8 parches de hidrocoloide forma nariz (mariposa) 60×45 mm, en 4 liners dentro de pouch zip, estuche tuck-end 90×150×20 mm
- **Proveedor y MOQ:** Nurimedics Co., Ltd. (Gimpo, Corea; ISO 13485/22716, OEM con troquel a medida) y NewY Medical (Anseong; MOQ 1.000 packs). Alternativa China: Yanse (MOQ 3.000/SKU), Trummed (MOQ 5.000)
- **Claims permitidos:** "absorbe la grasa de los poros (filamentos sebáceos)", "poros visiblemente más limpios", "sin tirones ni rojeces"
- **Claims prohibidos:** "trata el acné", "cura", "medical-grade" sin sustanciación, "elimina los puntos negros para siempre"
- **Imagen:** `web/public/assets/img/parches-nariz.jpg` (+ dorso, lifestyle y gama en la galería)
- **Vídeo:** `web/public/assets/video/parches-nariz.mp4` — **pendiente** (carpeta no existe aún)
- **Estado de desarrollo:** ficha técnica y proveedores definidos; pendiente RFQ/muestras y pruebas de aceptación (adhesión 8h, transparencia, blanqueo, retirada sin residuo, RIPT, MSDS/COA)

## 2. Parches para Granos

- **Slug / URL:** `parches-granos` → `/producto.html?p=parches-granos`
- **Precio:** 15,95 € · **Suscripción:** 13,56 €
- **Coste desembarcado:** 1,6-1,9 € → **margen bruto ≈89 %** sobre el punto medio (1,75 €)
- **Formato/contenido:** 36 puntos de hidrocoloide ultrafinos (18× ø10 mm + 18× ø12 mm), 3 hojas de 12 en pouch zip, estuche 70×110×15 mm
- **Proveedor y MOQ:** NewY Medical (catálogo estándar, 0,32-0,50 $/hoja, tramo 10.000 hojas = 0,40 $), Nurimedics, Twoa/Awesome April. China: Lvsenlan, Nanjing J SUN. MOQ no indicado explícitamente en la ficha para este SKU — estimar 1.000-3.000 uds como el resto del catálogo coreano
- **Claims permitidos:** "absorbe el pus y reduce la inflamación en 6-8 h", "evita marcas por tocarte el grano"
- **Claims prohibidos:** "cura el acné", "elimina los granos para siempre", "trata el acné" como alegación terapéutica
- **Imagen:** `web/public/assets/img/parches-granos.jpg`
- **Vídeo:** `web/public/assets/video/parches-granos.mp4` — **pendiente**
- **Estado de desarrollo:** ficha definida; pendiente muestras y prueba de invisibilidad bajo maquillaje

## 3. Parches de Superficie

- **Slug / URL:** `parches-superficie` → `/producto.html?p=parches-superficie`
- **Precio:** 15,95 € · **Suscripción:** 13,56 €
- **Coste desembarcado:** 2,4-4,5 € → **margen bruto ≈78 %** sobre el punto medio (3,45 €)
- **Formato/contenido:** 10 rectángulos de hidrocoloide 40×30 mm (esquinas radio 5 mm, recortables), 5 liners de 2 parches, estuche 90×150×15 mm
- **Proveedor y MOQ:** mismos proveedores que nariz (troquel rectangular estándar, sin coste de troquel adicional en la mayoría de fábricas); MOQ heredado (1.000 con NewY/Nurimedics)
- **Claims permitidos:** "cubre brotes enteros", "calma la rojez y absorbe impurezas"
- **Claims prohibidos:** "cura", "trata el acné", alegaciones antiinflamatorias sin sustanciación clínica
- **Imagen:** `web/public/assets/img/parches-superficie.jpg`
- **Vídeo:** `web/public/assets/video/parches-superficie.mp4` — **pendiente**
- **Estado de desarrollo:** ficha definida; pendiente RFQ (comparte fabricante con nariz, riesgo bajo)

## 4. Parches de Barbilla

- **Slug / URL:** `parches-barbilla` → `/producto.html?p=parches-barbilla`
- **Precio:** 16,95 € · **Suscripción:** 14,41 €
- **Coste desembarcado:** 3,2-5,6 € (troquel 500-2.000 $ amortizado) → **margen bruto ≈74 %** sobre el punto medio (4,40 €)
- **Formato/contenido:** 8 parches trapecio curvo 70×45 mm, 4 liners, estuche 90×150×20 mm
- **Proveedor y MOQ:** Nurimedics / Dermatech (dermatech.life, formas a medida, MOQ 1.000, 60-120 días) / SourcingLab
- **Claims permitidos:** "absorbe la grasa y calma los brotes hormonales de la zona"
- **Claims prohibidos:** "cura los brotes hormonales", "trata el acné", "elimina los granos para siempre"
- **Imagen:** `web/public/assets/img/parches-barbilla.jpg`
- **Vídeo:** `web/public/assets/video/parches-barbilla.mp4` — **pendiente**
- **Estado de desarrollo:** troquel a medida pendiente de pedido; badge "NUEVO" en la web, aún sin muestras aprobadas

## 5. Parches de Frente

- **Slug / URL:** `parches-frente` → `/producto.html?p=parches-frente`
- **Precio:** 16,95 € · **Suscripción:** 14,41 €
- **Coste desembarcado:** 3,5-5,8 € → **margen bruto ≈73 %** sobre el punto medio (4,65 €)
- **Formato/contenido:** 5 bandas de hidrocoloide 130×45 mm, 5 liners, estuche 90×150×20 mm
- **Proveedor y MOQ:** igual que barbilla (Nurimedics/Dermatech/SourcingLab, MOQ 1.000)
- **Claims permitidos:** "absorbe el exceso de grasa", "alisa la textura", "calma los granitos pequeños"
- **Claims prohibidos:** "cura", "trata el acné", "elimina los granitos para siempre"
- **Imagen:** `web/public/assets/img/parches-frente.jpg`
- **Vídeo:** `web/public/assets/video/parches-frente.mp4` — **pendiente**
- **Estado de desarrollo:** mismo estado que barbilla (troquel a medida pendiente); badge "NUEVO"

## 6. Exfoliante Ácido Salicílico 2 %

- **Slug / URL:** `exfoliante-salicilico` → `/producto.html?p=exfoliante-salicilico`
- **Precio:** 32,00 € · **Suscripción:** 27,20 €
- **Coste desembarcado:** 2,8-5,5 € → **margen bruto ≈87 %** sobre el punto medio (4,15 €)
- **Formato/contenido:** 110 ml, frasco vidrio esmerilado con tapa flip-top, etiqueta PP navy 100×78 mm
- **Proveedor y MOQ:** OEMKorea (MOQ 1.000-3.000, 2-7 $/ud), Mayk (MOQ 3.000 vía Kolmar), Cosmecca Korea, Awilke Branding (3,00 $/ud, MOQ 1.000)
- **Claims permitidos:** "disuelve el tapón de grasa del poro", "exfolia sin irritar"
- **Claims prohibidos:** debe llevar advertencia obligatoria "Contiene ácido salicílico. No usar en niños menores de 3 años"; prohibido omitirla; prohibido "cura el acné"
- **Imagen:** `web/public/assets/img/exfoliante.jpg`
- **Vídeo:** `web/public/assets/video/exfoliante-salicilico.mp4` — **pendiente**
- **Estado de desarrollo:** requiere challenge test y estabilidad acelerada 3 meses antes de producción; pendiente

## 7. Sérum Niacinamida 2 %

- **Slug / URL:** `serum-niacinamida` → `/producto.html?p=serum-niacinamida`
- **Precio:** 29,00 € · **Suscripción:** 24,65 €
- **Coste desembarcado:** 3,1-6,0 € → **margen bruto ≈84 %** sobre el punto medio (4,55 €)
- **Formato/contenido:** 30 ml, frasco vidrio verde salvia mate con gotero, etiqueta 78×52 mm
- **Proveedor y MOQ:** OEMKorea / knok / Cosmecca (fórmula de catálogo); China vía Alibaba "Private Label Niacinamide Serum" MOQ 500-1.000
- **Claims permitidos:** "regula la grasa", "afina el poro", "refuerza la barrera cutánea"
- **Claims prohibidos:** "cura el acné", "elimina los poros"
- **Imagen:** `web/public/assets/img/serum.jpg`
- **Vídeo:** `web/public/assets/video/serum-niacinamida.mp4` — **pendiente**
- **Estado de desarrollo:** badge "NUEVO", 22 opiniones en la web; validar aún fórmula final con proveedor

## 8. Mascarilla Peel-Off Colágeno

- **Slug / URL:** `mascarilla-peel-off` → `/producto.html?p=mascarilla-peel-off`
- **Precio:** 29,00 € · **Suscripción:** 24,65 €
- **Coste desembarcado:** 2,3-4,3 € → **margen bruto ≈89 %** sobre el punto medio (3,30 €)
- **Formato/contenido:** 70 ml, tubo PE crema mate con tapa rosca navy
- **Proveedor y MOQ:** categoría de catálogo coreano (Cosmecca, Hankook vía Mayk/OEMKorea); Alibaba MOQ 1.000
- **Claims permitidos:** "piel hidratada, tersa y luminosa en 15 minutos"
- **Claims prohibidos:** "efecto lifting permanente", "cura"
- **Imagen:** `web/public/assets/img/peel-off.jpg`
- **Vídeo:** `web/public/assets/video/mascarilla-peel-off.mp4` — **pendiente**
- **Estado de desarrollo:** ficha definida; pendiente RFQ

## 9. Pack 4 Mascarillas de Tela Colágeno

- **Slug / URL:** `pack-mascarillas-tela` → `/producto.html?p=pack-mascarillas-tela`
- **Precio:** 15,00 € · **Suscripción:** 12,75 €
- **Coste desembarcado:** 2,4-4,7 € → **margen bruto ≈76 %** sobre el punto medio (3,55 €)
- **Formato/contenido:** 4 sachets 100×140 mm (25 ml c/u), tela Tencel, variantes Hialurónico/Vitamina C/Baba de caracol/Oro, en sleeve de cartón
- **Proveedor y MOQ:** OEMKorea (0,50-2,00 $/ud a 5.000+), KPrivateLabel, NutriAdvisor; ⚠️ alternativa china Guangzhou Xiran tiene **MOQ 30.000** — desproporcionado para un primer pedido, usar solo si se valida volumen alto
- **Claims permitidos:** "hidrata", "ilumina", "repara", "reafirma" (según variante, cada una con su INCI)
- **Claims prohibidos:** "cura", alegaciones antienvejecimiento no sustanciadas ("borra arrugas")
- **Imagen:** `web/public/assets/img/mascarillas-tela.jpg`
- **Vídeo:** `web/public/assets/video/pack-mascarillas-tela.mp4` — **pendiente**
- **Estado de desarrollo:** ficha definida; MOQ de la alternativa china a revisar antes de RFQ

## 10. Tónico Ácido Hialurónico

- **Slug / URL:** `tonico-hialuronico` → `/producto.html?p=tonico-hialuronico`
- **Precio:** 25,00 € · **Suscripción:** 21,25 €
- **Coste desembarcado:** 2,2-6,0 € → **margen bruto ≈84 %** sobre el punto medio (4,10 €)
- **Formato/contenido:** 130 ml, frasco vidrio transparente con tapa disc-top, etiqueta 110×80 mm
- **Proveedor y MOQ:** OEMKorea (tónico 1,5-5 $), Cosmecca, Hankook Cosmo; envase vía Alibaba/Quadpack
- **Claims permitidos:** "hidrata", "calma", "regula la grasa"
- **Claims prohibidos:** "sustituye a la crema hidratante" (la propia ficha lo desmiente en la FAQ), "cura"
- **Imagen:** `web/public/assets/img/tonico.jpg`
- **Vídeo:** `web/public/assets/video/tonico-hialuronico.mp4` — **pendiente**
- **Estado de desarrollo:** ficha definida; pendiente RFQ

## 11. Dúo Poros Limpios (pack)

- **Slug / URL:** `duo-poros` → `/producto.html?p=duo-poros`
- **Precio:** 44,00 € (PVP suma componentes 48,95 €) · **Suscripción:** 37,40 €
- **Coste desembarcado:** suma de componentes + envase de regalo → Exfoliante (≈4,15 €) + Parches de Nariz (≈4,20 €) + caja regalo/inserto (+0,60 €) = **≈8,95 € → margen bruto ≈80 %**
- **Formato/contenido:** 110 ml exfoliante + 8 parches de nariz, en caja regalo 160×120×55 mm con inserto de cartón
- **Proveedor y MOQ:** hereda proveedores de NC-BHA-110 y NC-NOSE-8; caja regalo adicional (proveedor de packaging, ver sección "Caja de envío" de las fichas)
- **Claims permitidos:** "método coreano de dos pasos: disuelve + absorbe"
- **Claims prohibidos:** las mismas restricciones que sus dos componentes (ácido salicílico + hidrocoloide)
- **Imagen:** `web/public/assets/img/gama.jpg` (portada de pack; galería con `exfoliante.jpg` y `parches-nariz.jpg`)
- **Vídeo:** `web/public/assets/video/duo-poros.mp4` — **pendiente**
- **Estado de desarrollo:** depende de que estén listos los dos componentes individuales; PVP y ahorro (4,95 €) ya cuadran con el precio unitario de cada componente

## 12. Kit Zona T (pack)

- **Slug / URL:** `kit-t-zone` → `/producto.html?p=kit-t-zone`
- **Precio:** 44,00 € (PVP suma componentes 50,85 €) · **Suscripción:** 37,40 €
- **Coste desembarcado:** Parches de Frente (≈4,65 €) + Parches de Nariz (≈4,20 €) + Parches de Barbilla (≈4,40 €) + faja de cartón (+0,25 €) = **≈13,50 € → margen bruto ≈69 %** (el pack con menor margen del catálogo, por el peso del coste de tres parches con troquel a medida)
- **Formato/contenido:** 5 + 8 + 8 parches, agrupados con faja de cartón sobre las tres cajas individuales
- **Proveedor y MOQ:** hereda proveedores de NC-FORE-5, NC-NOSE-8 y NC-CHIN-8 (Nurimedics/Dermatech/SourcingLab)
- **Claims permitidos:** "el 80 % de la grasa facial sale por la zona T"
- **Claims prohibidos:** igual que sus tres componentes
- **Imagen:** `web/public/assets/img/parches-barbilla.jpg` (portada; considerar imagen propia del kit)
- **Vídeo:** `web/public/assets/video/kit-t-zone.mp4` — **pendiente**
- **Estado de desarrollo:** depende de que Frente y Barbilla completen su desarrollo (troquel a medida, sin muestras aprobadas todavía)

## 13. Kit Cara Completa (pack)

- **Slug / URL:** `kit-cara-completa` → `/producto.html?p=kit-cara-completa`
- **Precio:** 69,00 € (PVP suma componentes 82,75 €) · **Suscripción:** 58,65 €
- **Coste desembarcado:** Nariz (4,20) + Superficie (3,45) + Barbilla (4,40) + Frente (4,65) + Granos (1,75) + caja regalo (+0,90) = **≈19,35 € → margen bruto ≈72 %**
- **Formato/contenido:** 8+10+8+5+36 parches (los 5 formatos), en caja regalo 200×160×60 mm
- **Proveedor y MOQ:** hereda los 5 proveedores anteriores
- **Claims permitidos:** "los 5 formatos de parche NOCTA en un kit"
- **Claims prohibidos:** igual que sus cinco componentes
- **Imagen:** `web/public/assets/img/gama.jpg`
- **Vídeo:** `web/public/assets/video/kit-cara-completa.mp4` — **pendiente**
- **Estado de desarrollo:** es el pack más completo; solo puede lanzarse cuando los 5 parches individuales estén validados (Nariz y Superficie ya con ficha madura; Barbilla y Frente pendientes de troquel; Granos con MOQ por confirmar)

---

## Consistencia verificada products.js ↔ fichas

Revisado cada SKU: nombre, formato/contenido (nº de unidades, ml) y composición de bundles coinciden exactamente entre `products.js` y las fichas. Los PVP "compare" de los 3 packs cuadran al céntimo con la suma de los precios individuales de sus componentes (Dúo 48,95 € = 16,95+32; Zona T 50,85 € = 16,95×2+16,95(barbilla) — exacto; Cara Completa 82,75 € = suma de los 5 parches). No se detectó ninguna discrepancia de precio o contenido entre ambos documentos.

Dos puntos a vigilar, no contradicciones sino riesgos de desarrollo:
1. **Pack 4 Mascarillas de Tela:** la alternativa china (Guangzhou Xiran) tiene MOQ 30.000, muy por encima del resto del catálogo — usar solo la vía OEMKorea/KPrivateLabel para el primer pedido.
2. **Coste = rango, no punto fijo:** las fichas dan siempre un rango de coste (p. ej. exfoliante 2,8-5,5 €); esta tabla usa el punto medio como estimación de trabajo. El margen real no se puede cerrar hasta tener cotización de muestras (fase "Semana 1-5" del orden de desarrollo recomendado en las fichas).
