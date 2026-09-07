# NOCTA — Checklist de lanzamiento

Checklist por área. Cada ítem indica dónde está la pieza en el repositorio o qué hay que contratar/comprar, y el coste estimado. Ampliado de la checklist de `../operaciones/manual_operativo.md` (sección j) con las piezas de producto, web y analítica ya construidas en este repositorio. Costes sin fuente directa en los documentos del repo marcados **(estimación)**.

## Legal y societario
- [ ] SL constituida, NIF definitivo, cuenta bancaria de empresa — contratar notaría/gestoría, 900-1.500 €, 2-4 semanas (`../operaciones/manual_operativo.md`, sección a)
- [ ] Alta censal modelo 036 con IAE correcto (665.1 + epígrafe cosmética) — gestoría, 0 €
- [ ] EORI activo — sede electrónica AEAT, 0 €, 1-3 días
- [ ] ROI/censo VIES activo — modelo 036, 0 €
- [ ] Registro OSS si se vende a PT/FR/IT/DE desde el lanzamiento — sede AEAT, 0 € **(estimación, no está en los documentos fuente)**
- [ ] Marca solicitada en EUIPO (o OEPM) — euipo.europa.eu / oepm.es, 850-1.450 € EUIPO o ~150 € OEPM
- [ ] Seguro de RC de producto contratado — corredor tipo Hiscox/AXA/Mapfre, 300-1.200 €/año
- [ ] Alta como envasador en Ecoembes (RAP de envases) — ecoembes.com, cuota anual **(estimación, ~300-1.500 €/año)**
- [ ] Términos y condiciones, política de privacidad (RGPD), envíos y devoluciones publicados en la web — plantilla legal + revisión de abogado, redactar antes de abrir checkout

## Producto y compliance
- [ ] Fichas técnicas de los 13 SKU revisadas — ya redactadas en `../producto/fichas_desarrollo_producto.md`, 0 €
- [ ] Muestras pedidas y evaluadas con la rúbrica de adhesión/transparencia/residuo/blanqueo — 50-150 $/muestra a proveedores coreanos, gratis+courier a chinos
- [ ] Proveedor principal + proveedor de respaldo cerrados por SKU — PO firmado, 30 % depósito
- [ ] Troquel de cada forma de parche — ya diseñado en `../brand/packaging/box.html` y `patch.html`, coste de fabricación 500-2.000 $/troquel (una vez)
- [ ] Persona Responsable UE designada — NOCTA SL (interno) o servicio externo, 200-900 €/producto/año si es externo
- [ ] PIF completo por SKU — consultora de compliance, 300-800 €/SKU
- [ ] CPSR firmado por evaluador cualificado por SKU — consultora, 180-450 € (parches) / 350-1.500 € (líquidos)
- [ ] Challenge test / estabilidad para los líquidos con conservantes — laboratorio, 150-1.000 €
- [ ] Declaración responsable de importación presentada en AEMPS (COSMET2) — 466,23 € (+418,59 € si hay inspección)
- [ ] Notificación CPNP realizada por SKU antes de la primera venta — portal gratuito, tras PIF/CPSR
- [ ] Etiquetas revisadas legalmente (castellano, INCI, PAO, lote, advertencias) — textos ya definidos en `../brand/packaging/specs.json`, revisión legal 100-300 €
- [ ] MSDS/COA y RIPT archivados por SKU — los aporta el fabricante, 0 € directo

## Packaging
- [ ] Troquel y artwork de caja por SKU — listo en `../brand/packaging/troquel_*.png` y `3d_*.png`, enviar directamente a imprenta
- [ ] Estuches plegables impresos — cotizar Packhelp/Selfpackaging, desde 250-500 uds, ~1,10 €/ud a 500 uds
- [ ] Pouch metalizado termosellado para parches — mismo proveedor de parches o Alibaba, incluido en coste desembarcado de la ficha
- [ ] Frascos/goteros/tubos de los líquidos — Alibaba (vía proveedor de fórmula) o Envases Cosmética/Vidricap/Frapak en España
- [ ] Etiquetas autoadhesivas para frascos/tubos — imprenta local o del proveedor, incluidas en coste de ficha
- [ ] Inserto tutorial (tarjeta 5 pasos + QR) — diseño propio a partir de `../producto/fisica_del_parche.md`, imprenta local
- [ ] Caja de envío (mailer) con papel de seda y tarjeta de agradecimiento — Packhelp/Selfpackaging/Cartonajes Bernabéu, ~1,10 €/ud a 500 uds (`../operaciones/manual_operativo.md`, sección c)

## Web
- [ ] Tienda desplegada en Netlify con dominio nocta.es — código ya construido en `../web/`, deploy en 10 min (`../README.md`), 0 € (plan free)
- [ ] Variables de entorno configuradas (`ADMIN_TOKEN`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SITE_URL`) — README sección "Cómo desplegar la web", 0 €
- [ ] Catálogo cargado desde `../web/public/assets/js/products.js` — ya poblado con 13 SKU, revisar precios antes de publicar (ver inconsistencia de precio en `plan_de_negocio.md` sección 5)
- [ ] Quiz, advertorial y upsell post-compra activos — ya construidos en `../web/`, verificar flujo end-to-end
- [ ] Tema/diseño final revisado en móvil (9:16, principal fuente de tráfico) — 0 € (ya construido)
- [ ] Klaviyo con flows de bienvenida, carrito abandonado y post-compra — 0-60 €/mes
- [ ] Judge.me (o similar) para reseñas con fotos — 0-15 $/mes
- [ ] Seal Subscriptions (u homólogo) para "Suscríbete y ahorra −15 %" — 0-99 $/mes
- [ ] Popup de captación de email/SMS — 0-30 €/mes
- [ ] Cookiebot (consentimiento de cookies, obligatorio RGPD) — ~10-15 €/mes

## Analítica
- [ ] Panel `/admin` accesible con `ADMIN_TOKEN` — ya construido en `../web/`, 0 €
- [ ] Meta Pixel, TikTok Pixel y GA4 configurados en `public/assets/js/app.js` — IDs propios, 0 €
- [ ] Stape (server-side tagging) para mejorar EMQ de conversiones — ~20-50 $/mes
- [ ] Convención de `utm_content` = número de anuncio de la matriz aplicada en todos los enlaces — 0 €, ver `como_hacer_todo.md`
- [ ] Verificación de eventos (ViewContent/AddToCart/InitiateCheckout/Purchase) con value/currency — 0 €, revisar en Events Manager

## Pagos
- [ ] Stripe activo en modo real (no demo) con webhook configurado — 0 € cuota, comisión por transacción
- [ ] Bizum habilitado — vía pasarela compatible (Redsys/Stripe), comisión por transacción
- [ ] Klarna (pago aplazado) — integración nativa, comisión 2-4 % por transacción **(estimación de rango)**
- [ ] Facturación con IVA correcto (21 % nacional, OSS si aplica a otros países UE) — gestoría

## Logística
- [ ] Fulfillment casero configurado con Sendcloud o Packlink PRO — 0-35 €/mes en fase inicial
- [ ] Primer pedido despachado con DUA y HS 3304.99, arancel aplicado (0 % Corea / 6,5 % China) — agente de aduanas, 60-150 €/DUA
- [ ] Mercancía recibida e inspeccionada (cantidad, calidad, packaging intacto) — 0 € (tiempo del fundador)
- [ ] Cotizaciones de 3PL solicitadas para cuando se acerque el umbral de 500-600 pedidos/mes — Byrd, Logisfashion, Cubyn, Sending, presupuesto a medida
- [ ] Política de devoluciones publicada (desistimiento 14 días + garantía comercial 60 días + Garantía de Adhesión) — redactar en la web, 0 €

## Marketing
- [ ] 3 anuncios ya producidos listos para publicar — `../brand/video/final_maquina_T01_es.mp4`, `final_ugc_nariz_v2_es.mp4` y réplicas de Tanda 1, 0 € (ya generados)
- [ ] Cuentas de Meta Ads y TikTok Ads configuradas con estructura de campañas de `../marketing/estrategia_marketing.md` sección 6 — 0 € cuenta, presupuesto de campaña aparte
- [ ] Presupuesto de lanzamiento reservado (20 €/día por anuncio × 3 anuncios mínimo) — 60 €/día, escalar según CPA real
- [ ] Tanda 2 de la matriz de anuncios (8 anuncios) producida — `../maquina/README.md` + `../marketing/matriz_100_anuncios.md`, ~150-250 créditos Higgsfield/anuncio
- [ ] Programa de afiliados/creadoras activo (Social Snowball u homólogo) — 0-100 $/mes plataforma + comisión 10-20 %
- [ ] Calendario promocional de los primeros 90 días revisado — `../marketing/estrategia_marketing.md` sección 8

## Atención al cliente
- [ ] Helpdesk configurado (Gorgias u homólogo) — plan Starter ~50-60 $/mes
- [ ] Banco de objeciones y respuestas cargado en el equipo/bot de soporte — ya redactado en `../marketing/estrategia_marketing.md` sección 4, 0 €
- [ ] Formulario de garantía (60 días + Garantía de Adhesión) con subida de fotos antes/después — construir en la web o vía helpdesk, 0-100 € desarrollo si no está ya en `../web/`
- [ ] SLA de 48-72 h para devoluciones acordado con el 3PL/almacén propio — cláusula en contrato de 3PL, 0 € directo
