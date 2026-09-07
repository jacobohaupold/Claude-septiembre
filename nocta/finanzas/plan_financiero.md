# NOCTA — Plan financiero (resumen ejecutivo)

Modelo completo en `modelo_financiero_nocta.xlsx` (6 hojas: Supuestos, Unit Economics SKU,
PyG 12 meses, Caja, Punto muerto, Escenarios). Recalculado con LibreOffice sin errores de
fórmula (1.185 fórmulas, 0 errores). Todas las cifras de este documento son del **escenario
Base** salvo que se indique lo contrario.

## 1. Supuestos clave

- **AOV**: 38 € con IVA (≈1,6 packs/pedido de media, `Supuestos!uds_pedido`).
- **CPA**: 18 €/pedido en el mes 1, mejorando linealmente hasta un suelo de 11 €/pedido en el
  mes 6 (curva editable en Supuestos).
- **Inversión en Ads**: 3.000 € el mes 1; crece 20 %/mes si el ROAS del mes anterior ≥ 2,5x,
  con techo de 18.000 €/mes (Base).
- **Suscripción**: 15 % de los pedidos nuevos se suscriben (−15 % sobre AOV, baja del 15 %/mes).
- **Recompra no-suscriptores**: 30 % a 90 días.
- **Capital inicial**: 25.000 € aportados en el Mes 0 (prelanzamiento).
- **Sourcing**: Corea como proveedor principal (arancel 0 % por acuerdo UE-Corea); China como
  alternativa de respaldo (arancel 6,5 %).
- **Mix de ventas**: parche de nariz 22 %, resto de parches/líquidos/bundles repartidos según
  la fila "Mix ventas" de Unit Economics SKU (editable, debe sumar 100 %).

## 2. PyG — Mes 12 (escenario Base)

| Concepto | Mes 12 |
|---|---|
| Pedidos totales | ~1.802 pedidos |
| Ingresos con IVA | 65.715 € |
| Ingresos netos de IVA | 54.310 € |
| Margen bruto | ~51 % sobre ingresos netos |
| Inversión en Ads | 12.899 € |
| Margen de contribución | 5.727 € |
| Costes fijos | 1.427 €/mes |
| **EBITDA** | **4.300 €** (7,9 % sobre ingresos netos) |
| ROAS mensual | 4,2x |

**EBITDA acumulado año 1: 5.507 €** (el negocio entra en EBITDA acumulado positivo en el
mes 11). Los meses 1-5 son deficitarios (EBITDA mensual negativo) mientras el CPA converge y
la base de suscriptores/recompra aún es pequeña.

## 3. Capital necesario

Con 25.000 € de capital inicial, la **caja mínima del año es de −9.904 €, en el mes 4**: el
capital aportado no cubre el valle de tesorería generado por el gasto de Ads, la reposición de
inventario y el IVA trimestral. Solo el Mes 0 (inversión inicial de 25.996 € + depósito de
2.700 € del primer pedido de inventario) ya deja la caja en −3.696 €.

**Recomendación**: dotar 35.000–40.000 € de capital (25.000 € de aportación + 10.000–15.000 €
de colchón/línea de crédito), o retrasar el ritmo de escalado de Ads hasta consolidar el ROAS.

## 4. Punto muerto

- Margen de contribución medio por pedido: **11,58 €** (tras COGS, pasarela, envío, 3PL,
  packaging y devoluciones; antes de Ads).
- Costes fijos mensuales: 1.427 €/mes.
- **Punto muerto: ~123 pedidos/mes** (~4.685 €/mes de ingresos con IVA).
- CPA máximo rentable en el primer pedido: 11,58 € (por encima de este CPA, cada pedido nuevo
  pierde dinero antes incluso de contar costes fijos).
- Techo de Ads del escenario activo: 18.000 €/mes.
- La hoja "Punto muerto" incluye una tabla de sensibilidad CPA (8-20 €) × AOV (26-40 €) →
  margen de contribución mensual, a presupuesto de Ads fijo (referencia: mes 12).

## 5. Escenarios (selector en `Supuestos!B115`)

| Indicador (Mes 12 / año 1) | Pesimista | Base | Optimista |
|---|---|---|---|
| Ingresos netos de IVA, mes 12 | 13.619 € | 54.310 € | 189.885 € |
| EBITDA, mes 12 | −2.255 € | 4.300 € | 43.461 € |
| EBITDA acumulado, año 1 | −28.825 € | 5.507 € | 170.899 € |
| Caja final, mes 12 | −19.761 € | 1.847 € | 155.754 € |
| Caja mínima del año | −27.791 € | −9.904 € | −9.562 € |

El escenario Pesimista no recupera el EBITDA acumulado en el año 1 y agota ampliamente los
25.000 € de capital: confirma que el proyecto necesita más colchón de caja o un ritmo de
escalado de Ads más conservador si el CPA/AOV no evolucionan como en el caso Base.

## 6. Las 5 hipótesis más arriesgadas (y cómo validarlas en 60 días)

1. **Curva de CPA (18 € → 11 € en 6 meses).** Es la variable con más apalancamiento sobre todo
   el modelo. *Validación*: lanzar campañas Meta Ads reales en semana 1-2 con 500-1.000 €,
   medir CPA real por semana; si en la semana 6 el CPA no baja de ~14 €, recalibrar la curva y
   el techo de Ads en Supuestos.
2. **Tasa de suscripción (15 %) y su churn (15 %/mes).** No hay datos propios: es una estimación
   sectorial. *Validación*: activar suscripción desde el día 1 de ventas y medir la tasa de
   opt-in real y las bajas a 30/60 días; ajustar `Supuestos!suscripcion` y `sub_churn`.
3. **Coste desembarcado por SKU (rango $ dado por proveedor, sin muestra física aún).**
   *Validación*: pedir muestras y cotización en firme (MOQ, Incoterm, plazo) a 2-3 proveedores
   coreanos antes de comprometer el pedido inicial de 9.000 €; ajustar Unit Economics SKU con
   costes reales antes de fabricar.
4. **Tasa de devoluciones (3 %) y tiempo de cobro Stripe (D+2).** Ambas son supuestos genéricos
   de ecommerce, no específicos de NOCTA. *Validación*: revisar liquidaciones reales de Stripe
   y devoluciones acumuladas a los 30/60 días de venta; recalibrar `devol_pct` y
   `stripe_dias_cobro`.
5. **Repetición de compra a 90 días (30 %) y umbral de reposición de inventario (60 días).**
   Determinan tanto ingresos recurrentes como el ritmo (y caja) de reposición de stock.
   *Validación*: trackear cohortes de compra desde el lanzamiento (Shopify/Klaviyo) y contrastar
   con el ritmo real de consumo de inventario; ajustar `repeticion_90` y
   `stock_seguridad_dias`/`stock_objetivo_dias` en consecuencia.

## 7. Supuestos inventados / estimados que un revisor debería confirmar

Marcados en la hoja Supuestos como "Estimación" (no "Supuesto dado"): mix regional de envío,
CPA mes 1/mes 6 y su curva de convergencia, multiplicadores de escenario (CPA/AOV/suscripción/
repetición pesimista-optimista), churn de suscripción (15 %/mes), costes fijos recurrentes de
legal/CPNP (150 €/mes), gestoría (120 €/mes) y muestras (80 €/mes), umbrales de reposición de
inventario (60/90 días) y reparto 30/70 de pago a proveedor. Todas son cifras razonables para
un DTC español en fase de lanzamiento, pero no proceden del encargo original y deben
contrastarse con datos reales en los primeros meses de operación.
