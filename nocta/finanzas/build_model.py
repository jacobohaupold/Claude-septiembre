#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Construye el modelo de costes y plan financiero de NOCTA (clon de Vue Skin) en España.
"""
import openpyxl
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.comments import Comment

FONT_NAME = "Arial"

BLUE = Font(name=FONT_NAME, color="0000FF", size=10)
BLACK = Font(name=FONT_NAME, color="000000", size=10)
GREEN = Font(name=FONT_NAME, color="008000", size=10)
BOLD = Font(name=FONT_NAME, bold=True, size=10)
BOLD_WHITE = Font(name=FONT_NAME, bold=True, color="FFFFFF", size=10)
TITLE = Font(name=FONT_NAME, bold=True, size=14, color="1F3864")
SUBTITLE = Font(name=FONT_NAME, bold=True, size=11, color="1F3864")
ITALIC_GRAY = Font(name=FONT_NAME, italic=True, size=9, color="808080")

HEADER_FILL = PatternFill("solid", fgColor="1F3864")
SUB_FILL = PatternFill("solid", fgColor="D9E1F2")
YELLOW_FILL = PatternFill("solid", fgColor="FFFF00")
GRAY_FILL = PatternFill("solid", fgColor="F2F2F2")
GREEN_FILL = PatternFill("solid", fgColor="E2EFDA")
ORANGE_FILL = PatternFill("solid", fgColor="FCE4D6")

THIN = Side(style="thin", color="BFBFBF")
BORDER = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)

EUR = '#,##0.00" €"'
EUR0 = '#,##0" €"'
USD = '"$"#,##0.00'
PCT = '0.0%'
PCT2 = '0.00%'

wb = Workbook()
wb.remove(wb.active)

def sheet(name):
    return wb.create_sheet(name)

def set_col_widths(ws, widths):
    for i, w in enumerate(widths, start=1):
        ws.column_dimensions[get_column_letter(i)].width = w

def title_row(ws, row, text, span=8):
    ws.cell(row=row, column=1, value=text).font = TITLE
    ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=span)

def subtitle_row(ws, row, text, span=8):
    c = ws.cell(row=row, column=1, value=text)
    c.font = SUBTITLE
    ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=span)

def header_cells(ws, row, labels, start_col=1):
    for i, lab in enumerate(labels):
        c = ws.cell(row=row, column=start_col + i, value=lab)
        c.font = BOLD_WHITE
        c.fill = HEADER_FILL
        c.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        c.border = BORDER

def note(ws, cell, text):
    ws[cell].comment = Comment(text, "NOCTA Finanzas")

# =====================================================================================
# HOJA 1: SUPUESTOS
# =====================================================================================
ws = sheet("Supuestos")
set_col_widths(ws, [42, 14, 14, 60])
title_row(ws, 1, "NOCTA — Supuestos del modelo financiero (España, 2026)")
ws.cell(row=2, column=1, value="Todas las celdas en azul son inputs editables. El resto de hojas referencia estos valores.").font = ITALIC_GRAY

A = {}  # nombre -> fila
r = 4
header_cells(ws, r, ["Parámetro", "Valor", "Unidad", "Nota / fuente"])

def add(row, label, value, unit, source, fmt=None, fill=None, is_formula=False):
    ws.cell(row=row, column=1, value=label).font = BLACK
    c = ws.cell(row=row, column=2, value=value)
    c.font = BLACK if is_formula else BLUE
    if fmt:
        c.number_format = fmt
    if fill:
        c.fill = fill
    ws.cell(row=row, column=3, value=unit).font = ITALIC_GRAY
    ws.cell(row=row, column=4, value=source).font = ITALIC_GRAY
    for col in range(1, 5):
        ws.cell(row=row, column=col).border = BORDER
    return row

r += 1
subtitle_row(ws, r, "Cambio de divisa e impuestos"); r += 1
A['fx'] = r; add(r, "Tipo de cambio USD → EUR", 0.92, "€/$", "Supuesto dado en el encargo", "0.0000"); r += 1
A['iva'] = r; add(r, "IVA España (tipo general)", 0.21, "%", "Ley 37/1992 IVA", PCT); r += 1

r += 1
subtitle_row(ws, r, "Shopify y pasarela de pago"); r += 1
A['shopify_basic'] = r; add(r, "Shopify Basic", 27, "€/mes", "Supuesto dado (precio 2026)", EUR); r += 1
A['shopify_grow'] = r; add(r, "Shopify Grow (plan superior)", 79, "€/mes", "Supuesto dado (precio 2026)", EUR); r += 1
A['pago_pct'] = r; add(r, "Comisión Shopify Payments", 0.019, "% s/venta", "Supuesto dado", PCT2); r += 1
A['pago_fijo'] = r; add(r, "Fee fijo Shopify Payments", 0.25, "€/transacción", "Supuesto dado", EUR); r += 1
A['klarna_pct'] = r; add(r, "Comisión Klarna", 0.0249, "% s/venta", "Supuesto dado", PCT2); r += 1
A['klarna_fijo'] = r; add(r, "Fee fijo Klarna", 0.35, "€/transacción", "Supuesto dado", EUR); r += 1

r += 1
subtitle_row(ws, r, "Envío (Correos / GLS) — 250 g, según región"); r += 1
A['envio_pen_min'] = r; add(r, "Envío Península (mínimo)", 3.5, "€", "Supuesto dado", EUR); r += 1
A['envio_pen_max'] = r; add(r, "Envío Península (máximo)", 4.5, "€", "Supuesto dado", EUR); r += 1
A['envio_pen'] = r; add(r, "Envío Península (medio)", f"=AVERAGE(B{A['envio_pen_min']}:B{A['envio_pen_max']})", "€", "Media del rango dado", EUR, is_formula=True); r += 1
A['envio_bal'] = r; add(r, "Envío Baleares", 6, "€", "Supuesto dado", EUR); r += 1
A['envio_can'] = r; add(r, "Envío Canarias", 9, "€", "Supuesto dado", EUR); r += 1
A['pct_pen'] = r; add(r, "% pedidos Península", 0.90, "%", "Estimación: distribución de población/envíos España", PCT); r += 1
A['pct_bal'] = r; add(r, "% pedidos Baleares", 0.05, "%", "Estimación", PCT); r += 1
A['pct_can'] = r; add(r, "% pedidos Canarias", 0.05, "%", "Estimación", PCT); r += 1
A['envio_medio'] = r
add(r, "Envío medio ponderado (mix regional)",
    f"=B{A['envio_pen']}*B{A['pct_pen']}+B{A['envio_bal']}*B{A['pct_bal']}+B{A['envio_can']}*B{A['pct_can']}",
    "€", "Ponderado por mix regional estimado", EUR, is_formula=True); r += 1

r += 1
subtitle_row(ws, r, "Logística 3PL (pick&pack, packaging, devoluciones)"); r += 1
A['pp_min'] = r; add(r, "Pick&pack 3PL (mínimo)", 2.2, "€/pedido", "Supuesto dado", EUR); r += 1
A['pp_max'] = r; add(r, "Pick&pack 3PL (máximo)", 2.8, "€/pedido", "Supuesto dado", EUR); r += 1
A['pp_medio'] = r; add(r, "Pick&pack 3PL (medio)", f"=AVERAGE(B{A['pp_min']}:B{A['pp_max']})", "€/pedido", "Media del rango dado", EUR, is_formula=True); r += 1
A['pp_extra'] = r; add(r, "Coste por unidad adicional en pedido", 0.45, "€/ud adicional", "Supuesto dado", EUR); r += 1
A['pack_envio'] = r; add(r, "Packaging de envío (caja/sobre + relleno)", 0.35, "€/pedido", "Supuesto dado", EUR); r += 1
A['devol_pct'] = r; add(r, "Tasa de devoluciones", 0.03, "%", "Supuesto dado", PCT); r += 1

r += 1
subtitle_row(ws, r, "Marketing / adquisición (Meta Ads)"); r += 1
A['cpm_min'] = r; add(r, "CPM Meta España (mínimo)", 6, "€", "Supuesto dado", EUR); r += 1
A['cpm_max'] = r; add(r, "CPM Meta España (máximo)", 9, "€", "Supuesto dado", EUR); r += 1
A['cpm_medio'] = r; add(r, "CPM Meta España (medio)", f"=AVERAGE(B{A['cpm_min']}:B{A['cpm_max']})", "€", "Media del rango dado", EUR, is_formula=True); r += 1
A['ctr'] = r; add(r, "CTR", 0.012, "%", "Supuesto dado", PCT2); r += 1
A['cvr_base'] = r; add(r, "CVR (escenario Base)", 0.022, "%", "Supuesto dado (base)", PCT2); r += 1
A['cvr_cons'] = r; add(r, "CVR (escenario Conservador)", 0.016, "%", "Estimación: -27% vs. base por menor eficiencia de creatividades/audiencia", PCT2); r += 1
A['cvr_agr'] = r; add(r, "CVR (escenario Agresivo)", 0.028, "%", "Estimación: +27% vs. base por buen product-market fit y UGC", PCT2); r += 1
A['aov'] = r; add(r, "AOV (ticket medio, con IVA)", 38, "€", "Supuesto dado", EUR); r += 1
A['uds_pedido'] = r; add(r, "Unidades por pedido", 1.6, "uds", "Supuesto dado", "0.00"); r += 1
A['roas_obj'] = r; add(r, "ROAS objetivo para escalar inversión", 2.5, "x", "Supuesto dado (umbral de escalado)", "0.00\"x\""); r += 1
A['ads_m1'] = r; add(r, "Inversión en Ads mes 1", 3000, "€", "Supuesto dado", EUR0); r += 1
A['growth_base'] = r; add(r, "Crecimiento mensual de Ads si ROAS≥objetivo (Base)", 0.20, "%/mes", "Supuesto dado", PCT); r += 1
A['growth_cons'] = r; add(r, "Crecimiento mensual de Ads (Conservador)", 0.08, "%/mes", "Estimación: escalado prudente", PCT); r += 1
A['growth_agr'] = r; add(r, "Crecimiento mensual de Ads (Agresivo)", 0.30, "%/mes", "Estimación: escalado agresivo", PCT); r += 1
A['cap_ads_cons'] = r; add(r, "Techo mensual de inversión en Ads (Conservador)", 9000, "€/mes", "Estimación: límite de saturación de audiencia ES", EUR0); r += 1
A['cap_ads_base'] = r; add(r, "Techo mensual de inversión en Ads (Base)", 18000, "€/mes", "Estimación: límite de saturación de audiencia ES", EUR0); r += 1
A['cap_ads_agr'] = r; add(r, "Techo mensual de inversión en Ads (Agresivo)", 30000, "€/mes", "Estimación: límite de saturación de audiencia ES", EUR0); r += 1

r += 1
subtitle_row(ws, r, "Coste de producto (parches y líquidos)"); r += 1
A['pack_min'] = r; add(r, "Packaging unitario (mínimo)", 0.30, "$/pack", "Supuesto dado", USD); r += 1
A['pack_max'] = r; add(r, "Packaging unitario (máximo)", 0.80, "$/pack", "Supuesto dado", USD); r += 1
A['pack_medio'] = r; add(r, "Packaging unitario (medio)", f"=AVERAGE(B{A['pack_min']}:B{A['pack_max']})", "$/pack", "Media del rango dado", USD, is_formula=True); r += 1
A['troquel_coste'] = r; add(r, "Coste de troquel (utillaje)", 1000, "$/troquel", "Supuesto dado", USD); r += 1
A['troquel_amort'] = r; add(r, "Unidades de amortización del troquel", 3000, "uds", "Supuesto dado", "#,##0"); r += 1
A['troquel_ud'] = r; add(r, "Coste de troquel amortizado por unidad", f"=B{A['troquel_coste']}/B{A['troquel_amort']}", "$/ud", "Amortización lineal 1.000$/3.000 uds", "$#,##0.0000"); r += 1
A['flete_ud'] = r; add(r, "Flete internacional por unidad", 0.30, "€/ud", "Supuesto dado", EUR); r += 1
A['arancel_kr'] = r; add(r, "Arancel Corea (HS 3304.99, acuerdo UE-Corea)", 0.00, "%", "Acuerdo de libre comercio UE-Corea con declaración de origen", PCT); r += 1
A['arancel_cn'] = r; add(r, "Arancel China (HS 3304.99, MFN)", 0.065, "%", "Arancel MFN estándar", PCT); r += 1

r += 1
subtitle_row(ws, r, "Retención, recompra y suscripción"); r += 1
A['repeticion_90'] = r; add(r, "Repetición de compra a 90 días (no suscriptores)", 0.30, "%", "Supuesto dado", PCT); r += 1
A['factor_180'] = r; add(r, "Factor de extensión de repetición a 180 días", 1.5, "x", "Estimación: acumulación de 2 ventanas de repetición", "0.00\"x\""); r += 1
A['repeticion_180'] = r; add(r, "Repetición de compra a 180 días (no suscriptores)", f"=B{A['repeticion_90']}*B{A['factor_180']}", "%", "= repetición 90d × factor de extensión", PCT, is_formula=True); r += 1
A['suscripcion'] = r; add(r, "Tasa de suscripción", 0.15, "%", "Supuesto dado", PCT); r += 1
A['sub_descuento'] = r; add(r, "Descuento de suscripción sobre AOV", 0.15, "%", "Estimación: alineado con esquema de Vue (-15%)", PCT); r += 1
A['sub_cadencia'] = r; add(r, "Cadencia de envío de suscripción", 30, "días", "Estimación: cadencia estándar de suscripción skincare", "0"); r += 1
A['sub_pedidos_90'] = r; add(r, "Pedidos de suscripción adicionales en 90 días", f"=ROUND(90/B{A['sub_cadencia']},0)-1", "pedidos", "= 90/cadencia − 1 (pedido inicial ya contado aparte)", "0"); r += 1
A['sub_pedidos_180'] = r; add(r, "Pedidos de suscripción adicionales en 180 días", f"=ROUND(180/B{A['sub_cadencia']},0)-1", "pedidos", "= 180/cadencia − 1", "0"); r += 1
A['gift_umbral'] = r; add(r, "Umbral de pedido para envío gratis / regalo", 30, "€", "Supuesto dado (Vue usa 30€ como primer umbral)", EUR); r += 1
A['gift_coste'] = r; add(r, "Coste del regalo por umbral", 0.6, "€", "Supuesto dado", EUR); r += 1

r += 1
subtitle_row(ws, r, "Gastos operativos fijos (recurrentes)"); r += 1
A['apps_mes'] = r; add(r, "Apps de Shopify (adicionales)", 250, "€/mes", "Supuesto dado", EUR0); r += 1
A['freelance_mes'] = r; add(r, "Freelance (diseño/contenido/soporte)", 800, "€/mes", "Supuesto dado", EUR0); r += 1

r += 1
subtitle_row(ws, r, "Inversión inicial — legal, compliance y branding"); r += 1
A['compliance_1'] = r; add(r, "Compliance PR/PIF/CPSR/CPNP — 1er SKU", 4000, "€", "Supuesto dado (rango 1.500-4.500€, se toma ~4.000€)", EUR0); r += 1
A['compliance_add'] = r; add(r, "Compliance por SKU adicional", 1000, "€/SKU", "Estimación: punto medio del rango 500-1.500€/SKU adicional", EUR0); r += 1
A['aemps'] = r; add(r, "Declaración responsable de importación AEMPS (tasa 5.06)", 466, "€", "Supuesto dado / tasas AEMPS 2026", EUR0); r += 1
A['euipo'] = r; add(r, "Registro de marca EUIPO (1 clase)", 850, "€", "Supuesto dado", EUR0); r += 1
A['diseno'] = r; add(r, "Diseño de marca y packaging", 2000, "€", "Supuesto dado", EUR0); r += 1
A['web'] = r; add(r, "Web (tema Shopify + apps + configuración)", 1500, "€", "Supuesto dado", EUR0); r += 1
A['fotos'] = r; add(r, "Fotos y vídeo de producto", 2000, "€", "Supuesto dado", EUR0); r += 1
A['creadora_coste'] = r; add(r, "Coste por creadora UGC", 150, "€/creadora", "Supuesto dado", EUR0); r += 1
A['n_creadoras'] = r; add(r, "Número de creadoras UGC", 10, "creadoras", "Supuesto dado", "0"); r += 1
A['muestra_sku'] = r; add(r, "Coste de muestras por SKU (sourcing)", 100, "€/SKU", "Estimación: muestras + envío de 3-4 proveedores por SKU", EUR0); r += 1
A['n_troqueles'] = r; add(r, "Nº de troqueles personalizados a comprar", 4, "troqueles", "Nariz, superficie, barbilla y frente (granos usa troquel redondo estándar)", "0"); r += 1

r += 1
subtitle_row(ws, r, "Capital, adquisición de inventario y tesorería"); r += 1
A['capital_inicial'] = r; add(r, "Capital inicial aportado", 25000, "€", "Supuesto dado (aportación de socios/fundador)", EUR0); r += 1
A['inventario_inicial'] = r; add(r, "Pedido inicial de inventario (MOQ, 10 SKU)", 9000, "€", "Estimación: MOQ agregado de 10 SKU a coste desembarcado", EUR0); r += 1
A['proveedor_deposito_pct'] = r; add(r, "Depósito a proveedor al confirmar pedido", 0.30, "% del pedido", "Estimación: práctica habitual de proveedores coreanos/chinos", PCT); r += 1
A['proveedor_saldo_pct'] = r; add(r, "Saldo a proveedor antes de envío", f"=1-B{A['proveedor_deposito_pct']}", "% del pedido", "= 100% - depósito", PCT, is_formula=True); r += 1
A['stock_seguridad_dias'] = r; add(r, "Umbral de reposición (días de cobertura)", 60, "días", "Estimación: gatillo de reorder para evitar rotura de stock", "0"); r += 1
A['stock_objetivo_dias'] = r; add(r, "Cobertura objetivo tras reposición", 90, "días", "Estimación: cobertura de 3 meses de venta", "0"); r += 1
A['stripe_dias_cobro'] = r; add(r, "Días de cobro de Stripe/Shopify Payments (D+n)", 2, "días", "Supuesto dado (liquidación D+2)", "0"); r += 1
A['sub_churn'] = r; add(r, "Baja mensual de suscriptores (churn)", 0.15, "%/mes", "Estimación: churn típico de suscripción skincare DTC", PCT); r += 1

r += 1
subtitle_row(ws, r, "Gastos operativos fijos adicionales"); r += 1
A['legal_mensual'] = r; add(r, "Legal / compliance CPNP recurrente", 150, "€/mes", "Estimación: retenedor de asesoría regulatoria y actualización de fichas CPNP", EUR0); r += 1
A['contabilidad_mensual'] = r; add(r, "Gestoría / contabilidad", 120, "€/mes", "Estimación: cuota de gestoría para PYME en España", EUR0); r += 1
A['muestras_mensual'] = r; add(r, "Muestras de producto (I+D / control de calidad)", 80, "€/mes", "Estimación: muestras de reposición y control de calidad continuo", EUR0); r += 1

r += 1
subtitle_row(ws, r, "Curva de eficiencia de adquisición (CPA)"); r += 1
A['cpa_m1'] = r; add(r, "CPA mes 1 (Base)", 18, "€/pedido", "Supuesto dado", EUR); r += 1
A['cpa_m6'] = r; add(r, "CPA mes 6+ / suelo (Base)", 11, "€/pedido", "Supuesto dado", EUR); r += 1

r += 1
subtitle_row(ws, r, "Escenario activo (afecta a PyG, Caja y Punto muerto)"); r += 1
A['escenario_sel'] = r
add(r, "Escenario seleccionado (1=Pesimista, 2=Base, 3=Optimista)", 2, "1-2-3", "Selector: cambiar este valor recalcula todo el modelo", "0", fill=YELLOW_FILL); r += 1
A['cpa_m1_activo'] = r; add(r, "CPA mes 1 — escenario activo", f"=CHOOSE(B{A['escenario_sel']},Escenarios!$B$5,Escenarios!$C$5,Escenarios!$D$5)", "€/pedido", "CHOOSE según selector de escenario", EUR, is_formula=True); r += 1
A['cpa_m6_activo'] = r; add(r, "CPA mes 6+ — escenario activo", f"=CHOOSE(B{A['escenario_sel']},Escenarios!$B$6,Escenarios!$C$6,Escenarios!$D$6)", "€/pedido", "CHOOSE según selector de escenario", EUR, is_formula=True); r += 1
A['aov_mult_activo'] = r; add(r, "Multiplicador de AOV — escenario activo", f"=CHOOSE(B{A['escenario_sel']},Escenarios!$B$7,Escenarios!$C$7,Escenarios!$D$7)", "x", "CHOOSE según selector de escenario", "0.00\"x\"", is_formula=True); r += 1
A['aov_activo'] = r; add(r, "AOV — escenario activo", f"=B{A['aov']}*B{A['aov_mult_activo']}", "€", "= AOV base × multiplicador de escenario", EUR, is_formula=True); r += 1
A['growth_activo'] = r; add(r, "Crecimiento mensual de Ads — escenario activo", f"=CHOOSE(B{A['escenario_sel']},Escenarios!$B$8,Escenarios!$C$8,Escenarios!$D$8)", "%/mes", "CHOOSE según selector de escenario", PCT, is_formula=True); r += 1
A['cap_ads_activo'] = r; add(r, "Techo mensual de Ads — escenario activo", f"=CHOOSE(B{A['escenario_sel']},Escenarios!$B$9,Escenarios!$C$9,Escenarios!$D$9)", "€/mes", "CHOOSE según selector de escenario", EUR0, is_formula=True); r += 1
A['suscripcion_activo'] = r; add(r, "Tasa de suscripción — escenario activo", f"=CHOOSE(B{A['escenario_sel']},Escenarios!$B$10,Escenarios!$C$10,Escenarios!$D$10)", "%", "CHOOSE según selector de escenario", PCT, is_formula=True); r += 1
A['repeticion90_activo'] = r; add(r, "Repetición de compra 90 días — escenario activo", f"=CHOOSE(B{A['escenario_sel']},Escenarios!$B$11,Escenarios!$C$11,Escenarios!$D$11)", "%", "CHOOSE según selector de escenario", PCT, is_formula=True); r += 1

for row in ws.iter_rows(min_row=4, max_row=r, min_col=1, max_col=4):
    for c in row:
        c.alignment = Alignment(vertical="center", wrap_text=(c.column == 1 or c.column == 4))

ws.freeze_panes = "A5"
print("Supuestos filas usadas:", r)

def S(key):
    return f"Supuestos!$B${A[key]}"

# =====================================================================================
# HOJA 2: UNIT ECONOMICS POR SKU
# =====================================================================================
ws2 = sheet("Unit Economics SKU")
widths = [26, 10, 9, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 11, 11, 10, 10, 10, 10, 9, 9, 9, 9, 10, 10, 10, 10, 10]
set_col_widths(ws2, widths)
title_row(ws2, 1, "NOCTA — Unit economics por SKU (Corea vs. China)", span=len(widths))
ws2.cell(row=2, column=1, value="Costes de fábrica a nivel de pack completo (no por pieza individual). Los bundles suman el coste de sus componentes.").font = ITALIC_GRAY

cols = ["SKU", "Tipo", "Uds/\npack", "PVP\ncon IVA", "PVP\nsin IVA",
        "Coste KR\nmín ($)", "Coste KR\nmáx ($)", "Coste KR\nmedio ($)",
        "Coste CN\nmín ($)", "Coste CN\nmáx ($)", "Coste CN\nmedio ($)",
        "Packaging\n($)", "Troquel\n($)", "Flete\n(€)",
        "Desembar-\ncado KR (€)", "Desembar-\ncado CN (€)",
        "Margen\nbruto KR (€)", "Margen\nbruto KR (%)", "Margen\nbruto CN (€)", "Margen\nbruto CN (%)",
        "Pasarela\n(€)", "Envío\n(€)", "Pick&pack\n(€)", "Pack.\nenvío (€)",
        "Devol.\nKR (€)", "Margen\ncontrib. KR (€)", "Margen\ncontrib. KR (%)",
        "Devol.\nCN (€)", "Margen\ncontrib. CN (€)"]
HDR_ROW = 4
header_cells(ws2, HDR_ROW, cols)
ws2.row_dimensions[HDR_ROW].height = 42

# filas de datos: 10 SKU base + 3 bundles
R0 = HDR_ROW + 1
sku_rows = {}
data = [
    # key, nombre, tipo, uds/pack, PVP, KRmin, KRmax, CNmin, CNmax
    ("nariz",     "1. Parches nariz (8 uds)",        "Parche", 8,  16.95, 8*0.30, 8*0.60, 8*0.15, 8*0.21),
    ("granos",    "2. Parches granos (36 pts)",       "Parche", 36, 15.95, 0.50,   0.75,   0.90,   1.30),
    ("superficie","3. Parches superficie (10 uds)",   "Parche", 10, 15.95, 10*0.20,10*0.40,10*0.13,10*0.20),
    ("barbilla",  "4. Parches barbilla (8 uds)",       "Parche", 8,  16.95, 8*0.30, 8*0.60, 8*0.15, 8*0.21),
    ("frente",    "5. Parches frente (5 uds)",         "Parche", 5,  16.95, 5*0.30, 5*0.60, 5*0.15, 5*0.21),
    ("exfoliante","6. Exfoliante salicílico 2% 110ml", "Líquido",1,  32.00, 2.00,   5.00,   1.00,   2.50),
    ("serum",     "7. Sérum niacinamida 30ml",         "Líquido",1,  29.00, 2.50,   5.50,   1.00,   1.60),
    ("peeloff",   "8. Peel-off colágeno 70ml",         "Líquido",1,  29.00, 2.00,   4.00,   1.00,   2.00),
    ("sheetmask", "9. Pack 4 sheet masks",             "Líquido",4,  15.00, 4*0.50, 4*2.00, 4*0.15, 4*0.40),
    ("tonico",    "10. Tónico hialurónico 130ml",      "Líquido",1,  25.00, 1.50,   5.00,   0.80,   2.00),
]

for key, nombre, tipo, uds, pvp, krmin, krmax, cnmin, cnmax in data:
    row = R0 + len(sku_rows)
    sku_rows[key] = row
    ws2.cell(row=row, column=1, value=nombre).font = BLACK
    ws2.cell(row=row, column=2, value=tipo).font = BLACK
    c = ws2.cell(row=row, column=3, value=uds); c.font = BLUE; c.number_format = "0"
    c = ws2.cell(row=row, column=4, value=pvp); c.font = BLUE; c.number_format = EUR
    ws2.cell(row=row, column=5, value=f"=D{row}/(1+{S('iva')})").number_format = EUR
    c = ws2.cell(row=row, column=6, value=round(krmin,3)); c.font = BLUE; c.number_format = USD
    c = ws2.cell(row=row, column=7, value=round(krmax,3)); c.font = BLUE; c.number_format = USD
    ws2.cell(row=row, column=8, value=f"=AVERAGE(F{row}:G{row})").number_format = USD
    c = ws2.cell(row=row, column=9, value=round(cnmin,3)); c.font = BLUE; c.number_format = USD
    c = ws2.cell(row=row, column=10, value=round(cnmax,3)); c.font = BLUE; c.number_format = USD
    ws2.cell(row=row, column=11, value=f"=AVERAGE(I{row}:J{row})").number_format = USD
    ws2.cell(row=row, column=12, value=f"={S('pack_medio')}").font = GREEN
    ws2.cell(row=row, column=12).number_format = USD
    troquel_formula = f"=IF(B{row}=\"Parche\",{S('troquel_ud')}*C{row},0)"
    ws2.cell(row=row, column=13, value=troquel_formula).font = GREEN
    ws2.cell(row=row, column=13).number_format = USD
    flete_formula = f"=IF(B{row}=\"Parche\",{S('flete_ud')}*C{row},{S('flete_ud')})"
    ws2.cell(row=row, column=14, value=flete_formula).font = GREEN
    ws2.cell(row=row, column=14).number_format = EUR
    ws2.cell(row=row, column=15, value=f"=(H{row}+L{row}+M{row})*{S('fx')}*(1+{S('arancel_kr')})+N{row}").number_format = EUR
    ws2.cell(row=row, column=16, value=f"=(K{row}+L{row}+M{row})*{S('fx')}*(1+{S('arancel_cn')})+N{row}").number_format = EUR
    ws2.cell(row=row, column=17, value=f"=E{row}-O{row}").number_format = EUR
    ws2.cell(row=row, column=18, value=f"=Q{row}/E{row}").number_format = PCT
    ws2.cell(row=row, column=19, value=f"=E{row}-P{row}").number_format = EUR
    ws2.cell(row=row, column=20, value=f"=S{row}/E{row}").number_format = PCT
    ws2.cell(row=row, column=21, value=f"=D{row}*{S('pago_pct')}+{S('pago_fijo')}").font = GREEN
    ws2.cell(row=row, column=21).number_format = EUR
    ws2.cell(row=row, column=22, value=f"=IF(D{row}>={S('gift_umbral')},{S('envio_medio')},0)").font = GREEN
    ws2.cell(row=row, column=22).number_format = EUR
    ws2.cell(row=row, column=23, value=f"={S('pp_medio')}").font = GREEN
    ws2.cell(row=row, column=23).number_format = EUR
    ws2.cell(row=row, column=24, value=f"={S('pack_envio')}").font = GREEN
    ws2.cell(row=row, column=24).number_format = EUR
    ws2.cell(row=row, column=25, value=f"=-{S('devol_pct')}*Q{row}").font = GREEN
    ws2.cell(row=row, column=25).number_format = EUR
    ws2.cell(row=row, column=26, value=f"=Q{row}-U{row}-V{row}-W{row}-X{row}+Y{row}").number_format = EUR
    ws2.cell(row=row, column=27, value=f"=Z{row}/E{row}").number_format = PCT
    ws2.cell(row=row, column=28, value=f"=-{S('devol_pct')}*S{row}").font = GREEN
    ws2.cell(row=row, column=28).number_format = EUR
    ws2.cell(row=row, column=29, value=f"=S{row}-U{row}-V{row}-W{row}-X{row}+AB{row}").number_format = EUR
    for col in range(1, len(cols) + 1):
        ws2.cell(row=row, column=col).border = BORDER

BUNDLE_ROW0 = R0 + len(sku_rows)
bundles = [
    ("duo", "Bundle Duo (nariz + exfoliante)", 44.00, ["nariz", "exfoliante"]),
    ("tzone", "Bundle T-Zone (frente + nariz + barbilla)", 44.00, ["frente", "nariz", "barbilla"]),
    ("fullface", "Bundle Full Face (nariz+superficie+barbilla+frente+granos)", 69.00, ["nariz", "superficie", "barbilla", "frente", "granos"]),
]
bundle_rows = {}
for i, (key, nombre, pvp, comps) in enumerate(bundles):
    row = BUNDLE_ROW0 + i
    bundle_rows[key] = row
    ws2.cell(row=row, column=1, value=nombre).font = BLACK
    ws2.cell(row=row, column=2, value="Bundle").font = BLACK
    ws2.cell(row=row, column=3, value=1).font = BLUE
    ws2.cell(row=row, column=3).number_format = "0"
    c = ws2.cell(row=row, column=4, value=pvp); c.font = BLUE; c.number_format = EUR
    ws2.cell(row=row, column=5, value=f"=D{row}/(1+{S('iva')})").number_format = EUR
    comp_rows = [sku_rows[c] for c in comps]
    sum_h = "+".join([f"H{cr}" for cr in comp_rows])
    sum_k = "+".join([f"K{cr}" for cr in comp_rows])
    sum_m = "+".join([f"M{cr}" for cr in comp_rows])
    sum_n = "+".join([f"N{cr}" for cr in comp_rows])
    ws2.cell(row=row, column=6, value="n/a (suma componentes)").font = ITALIC_GRAY
    ws2.cell(row=row, column=7, value="n/a").font = ITALIC_GRAY
    ws2.cell(row=row, column=8, value=f"={sum_h}").font = GREEN
    ws2.cell(row=row, column=8).number_format = USD
    ws2.cell(row=row, column=9, value="n/a").font = ITALIC_GRAY
    ws2.cell(row=row, column=10, value="n/a").font = ITALIC_GRAY
    ws2.cell(row=row, column=11, value=f"={sum_k}").font = GREEN
    ws2.cell(row=row, column=11).number_format = USD
    ws2.cell(row=row, column=12, value=f"={S('pack_medio')}").font = GREEN
    ws2.cell(row=row, column=12).number_format = USD
    ws2.cell(row=row, column=13, value=f"={sum_m}").font = GREEN
    ws2.cell(row=row, column=13).number_format = USD
    ws2.cell(row=row, column=14, value=f"={sum_n}").font = GREEN
    ws2.cell(row=row, column=14).number_format = EUR
    ws2.cell(row=row, column=15, value=f"=(H{row}+L{row}+M{row})*{S('fx')}*(1+{S('arancel_kr')})+N{row}").number_format = EUR
    ws2.cell(row=row, column=16, value=f"=(K{row}+L{row}+M{row})*{S('fx')}*(1+{S('arancel_cn')})+N{row}").number_format = EUR
    ws2.cell(row=row, column=17, value=f"=E{row}-O{row}").number_format = EUR
    ws2.cell(row=row, column=18, value=f"=Q{row}/E{row}").number_format = PCT
    ws2.cell(row=row, column=19, value=f"=E{row}-P{row}").number_format = EUR
    ws2.cell(row=row, column=20, value=f"=S{row}/E{row}").number_format = PCT
    ws2.cell(row=row, column=21, value=f"=D{row}*{S('pago_pct')}+{S('pago_fijo')}").font = GREEN
    ws2.cell(row=row, column=21).number_format = EUR
    ws2.cell(row=row, column=22, value=f"=IF(D{row}>={S('gift_umbral')},{S('envio_medio')},0)").font = GREEN
    ws2.cell(row=row, column=22).number_format = EUR
    ws2.cell(row=row, column=23, value=f"={S('pp_medio')}").font = GREEN
    ws2.cell(row=row, column=23).number_format = EUR
    ws2.cell(row=row, column=24, value=f"={S('pack_envio')}").font = GREEN
    ws2.cell(row=row, column=24).number_format = EUR
    ws2.cell(row=row, column=25, value=f"=-{S('devol_pct')}*Q{row}").font = GREEN
    ws2.cell(row=row, column=25).number_format = EUR
    ws2.cell(row=row, column=26, value=f"=Q{row}-U{row}-V{row}-W{row}-X{row}+Y{row}").number_format = EUR
    ws2.cell(row=row, column=27, value=f"=Z{row}/E{row}").number_format = PCT
    ws2.cell(row=row, column=28, value=f"=-{S('devol_pct')}*S{row}").font = GREEN
    ws2.cell(row=row, column=28).number_format = EUR
    ws2.cell(row=row, column=29, value=f"=S{row}-U{row}-V{row}-W{row}-X{row}+AB{row}").number_format = EUR
    for col in range(1, len(cols) + 1):
        ws2.cell(row=row, column=col).border = BORDER
    for col in [3, 6, 7, 9, 10]:
        pass

LAST_SKU_ROW = BUNDLE_ROW0 + len(bundles) - 1
note(ws2, "F5", "Basado en el dato del encargo: 0,30-0,60 $/parche de nariz (Corea) y 0,15-0,21 $ (China), a nivel de pack de 8 uds.")
note(ws2, "F6", "Estimación de investigación de proveedores: parche de puntos vendido como hoja de 36 puntos, coste 0,50-0,75 $ (Corea) / 0,90-1,30 $ (China) por pack completo.")
note(ws2, "M5", "Troquel amortizado: 1.000 $ / 3.000 uds = 0,333 $/parche individual, multiplicado por las unidades del pack. Los líquidos no llevan troquel.")
note(ws2, "O5", "Coste desembarcado = (coste fábrica medio + packaging + troquel)*FX*(1+arancel) + flete. Arancel Corea 0% (acuerdo UE-Corea), China 6,5%.")
note(ws2, "V5", "Envío a cargo de la empresa solo si el PVP del pedido supera el umbral de envío gratis (30€); si no, se asume que el cliente paga un gasto de envío aparte.")
note(ws2, "Z5", "Margen de contribución = margen bruto - pasarela de pago - envío - pick&pack - packaging de envío + impacto esperado de devoluciones (-3% del margen bruto).")

# --- Mix de ventas y fila de media ponderada (usada por PyG / Punto muerto) ---
MIX_COL = 30  # columna AD
ws2.cell(row=HDR_ROW, column=MIX_COL, value="Mix ventas\n(% pedidos)").font = BOLD_WHITE
ws2.cell(row=HDR_ROW, column=MIX_COL).fill = HEADER_FILL
ws2.cell(row=HDR_ROW, column=MIX_COL).alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
ws2.cell(row=HDR_ROW, column=MIX_COL).border = BORDER
ws2.column_dimensions[get_column_letter(MIX_COL)].width = 11

mix_pct = {
    "nariz": 0.22, "granos": 0.12, "superficie": 0.08, "barbilla": 0.06, "frente": 0.06,
    "exfoliante": 0.10, "serum": 0.10, "peeloff": 0.08, "sheetmask": 0.06, "tonico": 0.06,
    "duo": 0.03, "tzone": 0.02, "fullface": 0.01,
}
all_rows = {**sku_rows, **bundle_rows}
for key, row in all_rows.items():
    c = ws2.cell(row=row, column=MIX_COL, value=mix_pct[key])
    c.font = BLUE
    c.number_format = PCT
    c.border = BORDER

MIX_ROW = BUNDLE_ROW0 + len(bundles) + 1
ws2.cell(row=MIX_ROW, column=1, value="MEDIA PONDERADA POR MIX DE VENTAS").font = BOLD
ws2.cell(row=MIX_ROW, column=1).fill = SUB_FILL
mix_rng = f"AD{R0}:AD{LAST_SKU_ROW}"
note(ws2, f"AD{R0}", "Mix de ventas estimado (% de pedidos por SKU/bundle). Inputs editables; deben sumar 100%. Alimenta la media ponderada usada en PyG y Punto muerto.")
for col_letter in ["D", "E", "O", "U", "V", "W", "X", "Y", "Z"]:
    rng = f"{col_letter}{R0}:{col_letter}{LAST_SKU_ROW}"
    cell = ws2.cell(row=MIX_ROW, column=openpyxl.utils.column_index_from_string(col_letter),
                     value=f"=SUMPRODUCT({mix_rng},{rng})/SUM({mix_rng})")
    cell.number_format = EUR if col_letter != "Z" else EUR
    cell.font = BOLD
    cell.fill = SUB_FILL
    cell.border = BORDER
ws2.cell(row=MIX_ROW, column=openpyxl.utils.column_index_from_string("Z")).number_format = EUR
mix_sum_cell = ws2.cell(row=MIX_ROW, column=MIX_COL, value=f"=SUM({mix_rng})")
mix_sum_cell.number_format = PCT
mix_sum_cell.font = BOLD
mix_sum_cell.fill = SUB_FILL
mix_sum_cell.border = BORDER
note(ws2, f"O{MIX_ROW}", "Coste desembarcado medio ponderado por el mix de ventas (fuente: sourcing Corea, arancel 0%). Usado como COGS/pedido en la hoja PyG 12 meses.")

ws2.freeze_panes = "F5"


# =====================================================================================
# Utilidades comunes para hojas mensuales (PyG, Caja)
# =====================================================================================
def mcol(m):
    """Letra de columna para el mes m (1..12). Col C = mes 1 ... Col N = mes 12."""
    return get_column_letter(2 + m)

def month_header(ws, row, label0="Concepto", label_total="Total / Prom. año 1"):
    labels = [label0, label_total] + [f"Mes {m}" for m in range(1, 13)]
    header_cells(ws, row, labels)
    ws.row_dimensions[row].height = 26

def set_month_widths(ws):
    set_col_widths(ws, [40, 15] + [10.5] * 12)

UE = "'Unit Economics SKU'"  # nombre de hoja con espacio, entre comillas

# =====================================================================================
# HOJA 3: PyG 12 MESES  (layout en dos pasadas: 1) reservar filas  2) escribir fórmulas)
# =====================================================================================
ws3 = sheet("PyG 12 meses")
set_month_widths(ws3)
title_row(ws3, 1, "NOCTA — Cuenta de resultados (PyG) mensual, meses 1-12", span=14)
ws3.cell(row=2, column=1, value="Importes en € con IVA salvo 'neto de IVA'. Todos los drivers (azul) están en Supuestos/Escenarios; aquí solo hay fórmulas.").font = ITALIC_GRAY
month_header(ws3, 4)

# --- Pasada 1: definición ordenada del layout y reserva de números de fila ---
LAYOUT = [
    ("sub", "Adquisición, pedidos y suscripción"),
    ("cpa", "CPA activo (€/pedido nuevo)", EUR, "avg", False),
    ("ads", "Inversión en Ads (€)", EUR0, "sum", False),
    ("pedidos_nuevos", "Pedidos nuevos (uds)", "#,##0.0", "sum", False),
    ("nuevos_subs", "Nuevos suscriptores (uds)", "#,##0.0", "sum", False),
    ("subs_activos", "Suscriptores activos (stock)", "#,##0.0", "last", False),
    ("pedidos_sub", "Pedidos de suscripción (uds)", "#,##0.0", "sum", False),
    ("pedidos_recompra", "Pedidos de recompra no-suscriptores (uds)", "#,##0.0", "sum", False),
    ("pedidos_totales", "Pedidos totales (uds)", "#,##0.0", "sum", True),
    ("aov_pond", "AOV medio ponderado (€, con IVA)", EUR, "avg", False),
    ("ingresos_civa", "Ingresos (ventas, con IVA) (€)", EUR0, "sum", True),
    ("ingresos_siva", "Ingresos netos de IVA (€)", EUR0, "sum", True),
    ("sub", "Costes variables"),
    ("cogs", "COGS — coste desembarcado (€)", EUR0, "sum", False),
    ("pasarela", "Comisión pasarela de pago (€)", EUR0, "sum", False),
    ("envio", "Envío a cliente (€)", EUR0, "sum", False),
    ("pickpack", "Logística 3PL pick&pack (€)", EUR0, "sum", False),
    ("pack_env", "Packaging de envío (€)", EUR0, "sum", False),
    ("devoluciones", "Devoluciones (impacto neto) (€)", EUR0, "sum", False),
    ("total_var", "Total costes variables (€)", EUR0, "sum", True),
    ("margen_bruto", "Margen bruto (€)", EUR0, "sum", True),
    ("margen_bruto_pct", "Margen bruto (%)", PCT, "avg", False),
    ("sub", "Costes fijos"),
    ("shopify", "Shopify (plan Basic) (€)", EUR0, "sum", False),
    ("apps", "Apps de Shopify (€)", EUR0, "sum", False),
    ("freelance", "Freelance diseño/soporte (€)", EUR0, "sum", False),
    ("salarios", "Salarios (€)", EUR0, "sum", False),
    ("legal", "Legal / CPNP recurrente (€)", EUR0, "sum", False),
    ("contabilidad", "Gestoría / contabilidad (€)", EUR0, "sum", False),
    ("muestras", "Muestras I+D / calidad (€)", EUR0, "sum", False),
    ("total_fijos", "Total costes fijos (€)", EUR0, "sum", True),
    ("sub", "Resultado"),
    ("margen_contrib", "Margen de contribución (€)", EUR0, "sum", True),
    ("margen_contrib_pct", "Margen de contribución (%)", PCT, "avg", False),
    ("ebitda", "EBITDA (€)", EUR0, "sum", True),
    ("ebitda_pct", "EBITDA (%)", PCT, "avg", False),
    ("ebitda_acum", "EBITDA acumulado (€)", EUR0, "last", True),
    ("sub", "Indicador de escalado de Ads"),
    ("roas", "ROAS mensual (ingresos netos / Ads)", '0.00"x"', "avg", False),
]

P = {}
FMT = {}
rr = 5
for spec in LAYOUT:
    if spec[0] == "sub":
        subtitle_row(ws3, rr, spec[1], span=14)
        rr += 1
    else:
        key = spec[0]
        P[key] = rr
        FMT[key] = spec[2:]
        rr += 1
LAST_PYG_ROW = rr - 1

# --- Pasada 2: fórmulas por mes, ahora que todas las filas están fijadas ---
def write_row(key, formula_fn):
    row = P[key]
    fmt, total, bold = FMT[key]
    label = next(s[1] for s in LAYOUT if s[0] == key)
    c = ws3.cell(row=row, column=1, value=label)
    c.font = BOLD if bold else BLACK
    c.border = BORDER
    for m in range(1, 13):
        cell = ws3.cell(row=row, column=2 + m, value=formula_fn(m))
        cell.font = BOLD if bold else BLACK
        cell.number_format = fmt
        cell.border = BORDER
    b = ws3.cell(row=row, column=2)
    if total == "sum":
        b.value = f"=SUM(C{row}:N{row})"
    elif total == "avg":
        b.value = f"=AVERAGE(C{row}:N{row})"
    elif total == "last":
        b.value = f"=N{row}"
    b.number_format = fmt
    b.font = BOLD
    b.border = BORDER

write_row('cpa', lambda m: f"=IF({m}>=6,{S('cpa_m6_activo')},{S('cpa_m1_activo')}+({S('cpa_m6_activo')}-{S('cpa_m1_activo')})*({m}-1)/5)")
write_row('ads', lambda m: (f"={S('ads_m1')}" if m == 1 else
          f"=MIN(IF({mcol(m-1)}{P['roas']}>={S('roas_obj')},{mcol(m-1)}{P['ads']}*(1+{S('growth_activo')}),{mcol(m-1)}{P['ads']}),{S('cap_ads_activo')})"))
write_row('pedidos_nuevos', lambda m: f"=IFERROR({mcol(m)}{P['ads']}/{mcol(m)}{P['cpa']},0)")
write_row('nuevos_subs', lambda m: f"={mcol(m)}{P['pedidos_nuevos']}*{S('suscripcion_activo')}")
write_row('subs_activos', lambda m: "=0" if m == 1 else f"={mcol(m-1)}{P['subs_activos']}*(1-{S('sub_churn')})+{mcol(m-1)}{P['nuevos_subs']}")
write_row('pedidos_sub', lambda m: f"={mcol(m)}{P['subs_activos']}")
write_row('pedidos_recompra', lambda m: "=0" if m <= 3 else f"={mcol(m-3)}{P['pedidos_nuevos']}*(1-{S('suscripcion_activo')})*{S('repeticion90_activo')}")
write_row('pedidos_totales', lambda m: f"={mcol(m)}{P['pedidos_nuevos']}+{mcol(m)}{P['pedidos_sub']}+{mcol(m)}{P['pedidos_recompra']}")
write_row('aov_pond', lambda m: (f"=IFERROR((({mcol(m)}{P['pedidos_nuevos']}+{mcol(m)}{P['pedidos_recompra']})*{S('aov_activo')}"
          f"+{mcol(m)}{P['pedidos_sub']}*{S('aov_activo')}*(1-{S('sub_descuento')}))/{mcol(m)}{P['pedidos_totales']},{S('aov_activo')})"))
write_row('ingresos_civa', lambda m: f"={mcol(m)}{P['pedidos_totales']}*{mcol(m)}{P['aov_pond']}")
write_row('ingresos_siva', lambda m: f"={mcol(m)}{P['ingresos_civa']}/(1+{S('iva')})")
write_row('cogs', lambda m: f"={mcol(m)}{P['pedidos_totales']}*{UE}!$O${MIX_ROW}")
write_row('pasarela', lambda m: f"={mcol(m)}{P['pedidos_totales']}*{UE}!$U${MIX_ROW}")
write_row('envio', lambda m: f"={mcol(m)}{P['pedidos_totales']}*{UE}!$V${MIX_ROW}")
write_row('pickpack', lambda m: f"={mcol(m)}{P['pedidos_totales']}*{UE}!$W${MIX_ROW}")
write_row('pack_env', lambda m: f"={mcol(m)}{P['pedidos_totales']}*{UE}!$X${MIX_ROW}")
write_row('devoluciones', lambda m: f"=-{mcol(m)}{P['pedidos_totales']}*{UE}!$Y${MIX_ROW}")
write_row('total_var', lambda m: f"={mcol(m)}{P['cogs']}+{mcol(m)}{P['pasarela']}+{mcol(m)}{P['envio']}+{mcol(m)}{P['pickpack']}+{mcol(m)}{P['pack_env']}+{mcol(m)}{P['devoluciones']}")
write_row('margen_bruto', lambda m: f"={mcol(m)}{P['ingresos_siva']}-{mcol(m)}{P['cogs']}")
write_row('margen_bruto_pct', lambda m: f"=IFERROR({mcol(m)}{P['margen_bruto']}/{mcol(m)}{P['ingresos_siva']},0)")
write_row('shopify', lambda m: f"={S('shopify_basic')}")
write_row('apps', lambda m: f"={S('apps_mes')}")
write_row('freelance', lambda m: f"={S('freelance_mes')}")
write_row('salarios', lambda m: "=0")
write_row('legal', lambda m: f"={S('legal_mensual')}")
write_row('contabilidad', lambda m: f"={S('contabilidad_mensual')}")
write_row('muestras', lambda m: f"={S('muestras_mensual')}")
write_row('total_fijos', lambda m: f"=SUM({mcol(m)}{P['shopify']}:{mcol(m)}{P['muestras']})")
write_row('margen_contrib', lambda m: f"={mcol(m)}{P['ingresos_siva']}-{mcol(m)}{P['total_var']}-{mcol(m)}{P['ads']}")
write_row('margen_contrib_pct', lambda m: f"=IFERROR({mcol(m)}{P['margen_contrib']}/{mcol(m)}{P['ingresos_siva']},0)")
write_row('ebitda', lambda m: f"={mcol(m)}{P['margen_contrib']}-{mcol(m)}{P['total_fijos']}")
write_row('ebitda_pct', lambda m: f"=IFERROR({mcol(m)}{P['ebitda']}/{mcol(m)}{P['ingresos_siva']},0)")
write_row('ebitda_acum', lambda m: f"={mcol(m)}{P['ebitda']}" if m == 1 else f"={mcol(m-1)}{P['ebitda_acum']}+{mcol(m)}{P['ebitda']}")
write_row('roas', lambda m: f"=IFERROR({mcol(m)}{P['ingresos_siva']}/{mcol(m)}{P['ads']},0)")

ws3.freeze_panes = "C5"
note(ws3, f"C{P['ads']}", "Inversión en Ads: mes 1 = Supuestos!ads_m1. Meses siguientes: si el ROAS del mes anterior >= ROAS objetivo, crece al ritmo del escenario activo; si no, se mantiene plana. Siempre limitada por el techo de Ads del escenario activo.")
note(ws3, f"C{P['cogs']}", "Costes variables por pedido = media ponderada por mix de ventas de la hoja 'Unit Economics SKU' (fila de mix), sobre coste desembarcado vía Corea (arancel 0%).")
note(ws3, f"C{P['pedidos_recompra']}", "Recompra no-suscriptores: se asume ventana de 90 días -> los pedidos nuevos de hace 3 meses generan recompra al ratio 'repetición 90 días' del escenario activo, excluyendo a clientes que ya son suscriptores.")
print("PyG filas usadas:", LAST_PYG_ROW, "| MIX_ROW:", MIX_ROW)

# =====================================================================================
# HOJA 4: CAJA (tesorería mensual, Mes 0 = prelanzamiento .. Mes 12)
# =====================================================================================
ws4 = sheet("Caja")
set_col_widths(ws4, [40, 15] + [10.5] * 13)  # B=total, C=Mes0, D..O=Mes1..12
title_row(ws4, 1, "NOCTA — Tesorería mensual (Mes 0 = prelanzamiento)", span=15)
ws4.cell(row=2, column=1, value="Mes 0 incluye la inversión inicial (legal, marca, web, muestras, troqueles) y el depósito del primer pedido de inventario.").font = ITALIC_GRAY

def ccol(m):
    """Columna de tesorería: m=0 -> C, m=1 -> D ... m=12 -> O."""
    return get_column_letter(3 + m)

labels_caja = ["Concepto", "Total año 1"] + [("Mes 0" if m == 0 else f"Mes {m}") for m in range(0, 13)]
header_cells(ws4, 4, labels_caja)
ws4.row_dimensions[4].height = 26

CAJA_LAYOUT = [
    ("sub", "Inversión inicial (Mes 0, pago único)"),
    ("inv_compliance", "Compliance PR/CPSR/CPNP (10 SKU) (€)", EUR0),
    ("inv_aemps", "Declaración AEMPS (€)", EUR0),
    ("inv_euipo", "Registro de marca EUIPO (€)", EUR0),
    ("inv_diseno", "Diseño de marca y packaging (€)", EUR0),
    ("inv_web", "Web (Shopify + apps) (€)", EUR0),
    ("inv_fotos", "Fotos y vídeo de producto (€)", EUR0),
    ("inv_ugc", "Creadoras UGC (€)", EUR0),
    ("inv_muestras", "Muestras de sourcing (10 SKU) (€)", EUR0),
    ("inv_troqueles", "Troqueles personalizados (€)", EUR0),
    ("inv_total", "Total inversión inicial (€)", EUR0),
    ("sub", "Inventario"),
    ("cogs_link", "COGS del mes (de PyG) (€)", EUR0),
    ("inv_recibido", "Inventario recibido (€, a coste desembarcado)", EUR0),
    ("dias_cobertura", "Días de cobertura de stock", "#,##0"),
    ("reorder_amount", "Pedido de reposición generado (€)", EUR0),
    ("pago_deposito", "Pago depósito 30% a proveedor (€)", EUR0),
    ("pago_saldo", "Pago saldo 70% a proveedor (€)", EUR0),
    ("stock_balance", "Inventario en balance, fin de mes (€)", EUR0),
    ("sub", "Cobros y pagos operativos"),
    ("cobros", "Cobros de clientes (Stripe, D+2) (€)", EUR0),
    ("pago_var_op", "Pago costes variables no-COGS (€)", EUR0),
    ("pago_fijos", "Pago costes fijos (€)", EUR0),
    ("pago_ads", "Pago inversión en Ads (€)", EUR0),
    ("iva_devengado", "IVA devengado del mes (repercutido - soportado) (€)", EUR0),
    ("iva_pagado", "IVA liquidado (pago trimestral) (€)", EUR0),
    ("sub", "Resumen de caja"),
    ("caja_ini", "Caja inicial del mes (€)", EUR0),
    ("entradas", "Total entradas (€)", EUR0),
    ("salidas", "Total salidas (€)", EUR0),
    ("caja_fin", "Caja final del mes (€)", EUR0),
]

C = {}
CFMT = {}
rr = 5
for spec in CAJA_LAYOUT:
    if spec[0] == "sub":
        subtitle_row(ws4, rr, spec[1], span=15)
        rr += 1
    else:
        C[spec[0]] = rr
        CFMT[spec[0]] = spec[2]
        rr += 1
LAST_CAJA_ROW = rr - 1

def write_caja_row(key, formula_fn, bold=False, total="sum"):
    row = C[key]
    fmt = CFMT[key]
    label = next(s[1] for s in CAJA_LAYOUT if s[0] == key)
    c = ws4.cell(row=row, column=1, value=label)
    c.font = BOLD if bold else BLACK
    c.border = BORDER
    for m in range(0, 13):
        cell = ws4.cell(row=row, column=3 + m, value=formula_fn(m))
        cell.font = BOLD if bold else BLACK
        cell.number_format = fmt
        cell.border = BORDER
    b = ws4.cell(row=row, column=2)
    if total == "sum":
        b.value = f"=SUM(D{row}:O{row})"
    elif total == "last":
        b.value = f"=O{row}"
    elif total == "min":
        b.value = f"=MIN(D{row}:O{row})"
    elif total is None:
        b.value = None
    b.number_format = fmt
    b.font = BOLD
    b.border = BORDER

# --- Inversión inicial: solo Mes 0, cero el resto ---
write_caja_row('inv_compliance', lambda m: (f"={S('compliance_1')}+{S('compliance_add')}*9" if m == 0 else "=0"))
write_caja_row('inv_aemps', lambda m: (f"={S('aemps')}" if m == 0 else "=0"))
write_caja_row('inv_euipo', lambda m: (f"={S('euipo')}" if m == 0 else "=0"))
write_caja_row('inv_diseno', lambda m: (f"={S('diseno')}" if m == 0 else "=0"))
write_caja_row('inv_web', lambda m: (f"={S('web')}" if m == 0 else "=0"))
write_caja_row('inv_fotos', lambda m: (f"={S('fotos')}" if m == 0 else "=0"))
write_caja_row('inv_ugc', lambda m: (f"={S('creadora_coste')}*{S('n_creadoras')}" if m == 0 else "=0"))
write_caja_row('inv_muestras', lambda m: (f"={S('muestra_sku')}*10" if m == 0 else "=0"))
write_caja_row('inv_troqueles', lambda m: (f"={S('troquel_coste')}*{S('n_troqueles')}*{S('fx')}" if m == 0 else "=0"))
write_caja_row('inv_total', lambda m: f"=SUM({ccol(m)}{C['inv_compliance']}:{ccol(m)}{C['inv_troqueles']})", bold=True)

# --- Inventario: COGS enlazado a PyG (Mes 0 = 0; Mes n = PyG col n) ---
write_caja_row('cogs_link', lambda m: "=0" if m == 0 else f"='PyG 12 meses'!{mcol(m)}{P['cogs']}")
# Inventario recibido: Mes1 = pedido inicial completo; Mes n>=2 = reorder_amount generado el mes n-1
write_caja_row('inv_recibido', lambda m: (
    "=0" if m == 0 else
    (f"={S('inventario_inicial')}" if m == 1 else f"={ccol(m-1)}{C['reorder_amount']}")))
# Días de cobertura = (stock inicial del mes + recibido) / (COGS del mes / 30)
write_caja_row('dias_cobertura', lambda m: (
    "=0" if m == 0 else
    f"=IFERROR(({ccol(m-1)}{C['stock_balance']}+{ccol(m)}{C['inv_recibido']})/({ccol(m)}{C['cogs_link']}/30),999)"))
# Pedido de reposición: si cobertura < umbral, pedir 90 días de COGS del mes (aprox.)
write_caja_row('reorder_amount', lambda m: (
    "=0" if m == 0 else
    f"=IF({ccol(m)}{C['dias_cobertura']}<{S('stock_seguridad_dias')},{ccol(m)}{C['cogs_link']}*{S('stock_objetivo_dias')}/30,0)"))
# Depósito 30% y saldo 70%: depósito se paga el mes en que se genera el pedido; saldo, el mes siguiente
write_caja_row('pago_deposito', lambda m: (
    f"={S('inventario_inicial')}*{S('proveedor_deposito_pct')}" if m == 0 else
    f"={ccol(m)}{C['reorder_amount']}*{S('proveedor_deposito_pct')}"))
write_caja_row('pago_saldo', lambda m: (
    "=0" if m == 0 else
    (f"={S('inventario_inicial')}*{S('proveedor_saldo_pct')}" if m == 1 else
     f"={ccol(m-1)}{C['reorder_amount']}*{S('proveedor_saldo_pct')}")))
write_caja_row('stock_balance', lambda m: (
    "=0" if m == 0 else
    f"={ccol(m-1)}{C['stock_balance']}+{ccol(m)}{C['inv_recibido']}-{ccol(m)}{C['cogs_link']}"), total="last")

# --- Cobros y pagos operativos ---
write_caja_row('cobros', lambda m: (
    "=0" if m == 0 else
    (f"='PyG 12 meses'!{mcol(m)}{P['ingresos_civa']}*(1-{S('stripe_dias_cobro')}/30)" if m == 1 else
     f"='PyG 12 meses'!{mcol(m)}{P['ingresos_civa']}*(1-{S('stripe_dias_cobro')}/30)+'PyG 12 meses'!{mcol(m-1)}{P['ingresos_civa']}*({S('stripe_dias_cobro')}/30)")))
write_caja_row('pago_var_op', lambda m: (
    "=0" if m == 0 else
    f"='PyG 12 meses'!{mcol(m)}{P['pasarela']}+'PyG 12 meses'!{mcol(m)}{P['envio']}+'PyG 12 meses'!{mcol(m)}{P['pickpack']}+'PyG 12 meses'!{mcol(m)}{P['pack_env']}"))
write_caja_row('pago_fijos', lambda m: (
    "=0" if m == 0 else
    f"='PyG 12 meses'!{mcol(m)}{P['total_fijos']}"))
write_caja_row('pago_ads', lambda m: (
    "=0" if m == 0 else
    f"='PyG 12 meses'!{mcol(m)}{P['ads']}"))
write_caja_row('iva_devengado', lambda m: (
    "=0" if m == 0 else
    (f"='PyG 12 meses'!{mcol(m)}{P['ingresos_civa']}-'PyG 12 meses'!{mcol(m)}{P['ingresos_siva']}"
     f"-({S('iva')})*({ccol(m)}{C['cogs_link']}+'PyG 12 meses'!{mcol(m)}{P['total_fijos']})")))
# IVA se liquida trimestralmente: en los meses 4, 7, 10 y (13->no existe, queda pendiente) se paga la suma de los 3 meses previos
write_caja_row('iva_pagado', lambda m: (
    f"=SUM({ccol(m-3)}{C['iva_devengado']}:{ccol(m-1)}{C['iva_devengado']})" if m in (4, 7, 10) else "=0"))

# --- Resumen de caja ---
write_caja_row('caja_ini', lambda m: ("=0" if m == 0 else f"={ccol(m-1)}{C['caja_fin']}"))
write_caja_row('entradas', lambda m: (
    (f"={S('capital_inicial')}") if m == 0 else f"={ccol(m)}{C['cobros']}"), bold=True)
write_caja_row('salidas', lambda m: (
    f"={ccol(m)}{C['inv_total']}+{ccol(m)}{C['pago_deposito']}" if m == 0 else
    f"={ccol(m)}{C['pago_deposito']}+{ccol(m)}{C['pago_saldo']}+{ccol(m)}{C['pago_var_op']}+{ccol(m)}{C['pago_fijos']}+{ccol(m)}{C['pago_ads']}+{ccol(m)}{C['iva_pagado']}"),
    bold=True)
write_caja_row('caja_fin', lambda m: f"={ccol(m)}{C['caja_ini']}+{ccol(m)}{C['entradas']}-{ccol(m)}{C['salidas']}", bold=True, total="last")

# Fila resumen: caja mínima y mes en que ocurre
rr_min = LAST_CAJA_ROW + 2
ws4.cell(row=rr_min, column=1, value="Caja mínima alcanzada (€)").font = BOLD
ws4.cell(row=rr_min, column=2, value=f"=MIN(D{C['caja_fin']}:O{C['caja_fin']})").number_format = EUR0
ws4.cell(row=rr_min, column=2).font = BOLD
ws4.cell(row=rr_min + 1, column=1, value="Mes de caja mínima").font = BOLD
ws4.cell(row=rr_min + 1, column=2,
         value=f'=INDEX(D4:O4,MATCH(B{rr_min},D{C["caja_fin"]}:O{C["caja_fin"]},0))').font = BOLD

ws4.freeze_panes = "D5"
note(ws4, f"C{C['cobros']}", "Cobro Stripe/Shopify Payments D+2: se asume que el (2/30) de las ventas del mes se cobra el mes siguiente; el resto, el mismo mes.")
note(ws4, f"C{C['reorder_amount']}", "Reposición: si la cobertura de stock cae por debajo del umbral (60 días), se genera un pedido para alcanzar 90 días de cobertura, pagado 30% al generarse y 70% el mes siguiente (llegada de mercancía).")
note(ws4, f"C{C['iva_devengado']}", "IVA simplificado: IVA repercutido en ventas menos 21% estimado sobre COGS y costes fijos (aproximación; no incluye deducción de IVA soportado en Ads ni en compras de inventario en origen, que suelen no llevar IVA español).")
print("Caja filas usadas:", LAST_CAJA_ROW)

# =====================================================================================
# HOJA 5: PUNTO MUERTO
# =====================================================================================
ws5 = sheet("Punto muerto")
set_col_widths(ws5, [46, 16, 60])
title_row(ws5, 1, "NOCTA — Punto muerto (break-even) mensual", span=6)
ws5.cell(row=2, column=1, value="Calculado sobre el mix de ventas medio ponderado (hoja Unit Economics SKU) y los costes fijos del escenario activo.").font = ITALIC_GRAY

r5 = 4
header_cells(ws5, r5, ["Concepto", "Valor", "Nota"], start_col=1)
r5 += 1
B = {}

def brow(row, label, formula, fmt, note_txt=None):
    ws5.cell(row=row, column=1, value=label).font = BLACK
    c = ws5.cell(row=row, column=2, value=formula)
    c.font = BLACK
    c.number_format = fmt
    ws5.cell(row=row, column=3, value=note_txt or "").font = ITALIC_GRAY
    for col in range(1, 4):
        ws5.cell(row=row, column=col).border = BORDER
    return row

B['aov_medio'] = r5; brow(r5, "AOV medio ponderado (€, con IVA, mix medio)", f"={UE}!$D${MIX_ROW}", EUR); r5 += 1
B['margen_contrib_pedido'] = r5; brow(r5, "Margen de contribución medio por pedido (€, tras logística/pasarela, antes de Ads)", f"={UE}!$Z${MIX_ROW}", EUR); r5 += 1
B['costes_fijos_mes'] = r5
brow(r5, "Costes fijos mensuales totales (€)",
     f"={S('shopify_basic')}+{S('apps_mes')}+{S('freelance_mes')}+{S('legal_mensual')}+{S('contabilidad_mensual')}", EUR0); r5 += 1
B['cpa_max_rentable'] = r5
brow(r5, "CPA máximo rentable en el primer pedido (€)", f"=B{B['margen_contrib_pedido']}", EUR,
     "Si el CPA supera el margen de contribución por pedido, cada venta nueva pierde dinero incluso antes de costes fijos."); r5 += 1
B['pedidos_breakeven'] = r5
brow(r5, "Punto muerto — pedidos/mes", f"=B{B['costes_fijos_mes']}/B{B['margen_contrib_pedido']}", "#,##0", ); r5 += 1
B['ingresos_breakeven'] = r5
brow(r5, "Punto muerto — ingresos/mes (€, con IVA)", f"=B{B['pedidos_breakeven']}*B{B['aov_medio']}", EUR0); r5 += 1
B['techo_ads_activo'] = r5
brow(r5, "Techo de inversión en Ads del escenario activo (€/mes)", f"={S('cap_ads_activo')}", EUR0); r5 += 1

r5 += 1
subtitle_row(ws5, r5, "Sensibilidad: margen de contribución mensual según CPA × AOV", span=6); r5 += 1
ws5.cell(row=r5, column=1,
         value="Para un presupuesto de Ads fijo (referencia: mes 12 del escenario activo). Pedidos = Presupuesto/CPA. Coste variable no-marketing asumido constante en € por pedido (media ponderada del mix), salvo la comisión de pago, que escala con el AOV.").font = ITALIC_GRAY
r5 += 1
AD_BUDGET_CELL = f"'PyG 12 meses'!N{P['ads']}"
ws5.cell(row=r5, column=1, value="Presupuesto de Ads de referencia (€/mes)").font = BLACK
ws5.cell(row=r5, column=2, value=f"={AD_BUDGET_CELL}").number_format = EUR0
r5 += 1
TABLE_TOP = r5 + 1
cpa_vals = [8, 10, 12, 14, 16, 18, 20]
aov_vals = [26, 29, 32, 35, 38, 40]

ws5.cell(row=r5, column=1, value="CPA \\ AOV →").font = BOLD_WHITE
ws5.cell(row=r5, column=1).fill = HEADER_FILL
ws5.cell(row=r5, column=1).border = BORDER
for j, aov_v in enumerate(aov_vals):
    col = 2 + j
    c = ws5.cell(row=r5, column=col, value=aov_v)
    c.font = BOLD_WHITE
    c.fill = HEADER_FILL
    c.number_format = EUR
    c.alignment = Alignment(horizontal="center")
    c.border = BORDER
r5 += 1
var_no_pasarela = f"({UE}!$O${MIX_ROW}+{UE}!$V${MIX_ROW}+{UE}!$W${MIX_ROW}+{UE}!$X${MIX_ROW}-{UE}!$Y${MIX_ROW})"
for cpa_v in cpa_vals:
    ws5.cell(row=r5, column=1, value=cpa_v).font = BOLD
    ws5.cell(row=r5, column=1).number_format = EUR
    ws5.cell(row=r5, column=1).border = BORDER
    for j, aov_v in enumerate(aov_vals):
        col = 2 + j
        aov_net = f"({aov_v}/(1+{S('iva')}))"
        pasarela_u = f"({aov_v}*{S('pago_pct')}+{S('pago_fijo')})"
        contrib_unit = f"({aov_net}-{var_no_pasarela}-{pasarela_u})"
        orders = f"({AD_BUDGET_CELL}/{cpa_v})"
        formula = f"={orders}*{contrib_unit}-{AD_BUDGET_CELL}"
        c = ws5.cell(row=r5, column=col, value=formula)
        c.number_format = EUR0
        c.border = BORDER
    r5 += 1

ws5.freeze_panes = "B5"
note(ws5, f"A{TABLE_TOP}", "Tabla de sensibilidad: cada celda = Margen de contribución mensual (€) = Pedidos(Presupuesto/CPA) × Margen unitario(AOV) − Presupuesto de Ads. Verde/positivo = escenario rentable a ese CPA y AOV.")
print("Punto muerto filas usadas:", r5 - 1)

# =====================================================================================
# HOJA 6: ESCENARIOS
# =====================================================================================
ws6 = sheet("Escenarios")
set_col_widths(ws6, [46, 15, 15, 15, 55])
title_row(ws6, 1, "NOCTA — Escenarios (Pesimista / Base / Optimista)", span=5)
ws6.cell(row=2, column=1, value="Cambia el selector en Supuestos ('Escenario seleccionado') para recalcular PyG, Caja y Punto muerto con estos supuestos.").font = ITALIC_GRAY
header_cells(ws6, 4, ["Parámetro", "Pesimista", "Base", "Optimista", "Nota"])

def erow(row, label, pes, base, opt, note_txt, fmt, formulas=False):
    ws6.cell(row=row, column=1, value=label).font = BLACK
    for col, val in zip([2, 3, 4], [pes, base, opt]):
        c = ws6.cell(row=row, column=col, value=val)
        c.font = BLACK if formulas else BLUE
        c.number_format = fmt
    ws6.cell(row=row, column=5, value=note_txt).font = ITALIC_GRAY
    for col in range(1, 6):
        ws6.cell(row=row, column=col).border = BORDER

# Filas fijas (referenciadas desde Supuestos!cpa_m1_activo etc. — deben coincidir: 5..11)
erow(5, "CPA mes 1 (€/pedido)", 22, 18, 15, "Pesimista: peor eficiencia de creatividades. Optimista: mejor product-market fit / UGC.", EUR)
erow(6, "CPA mes 6+ / suelo (€/pedido)", 15, 11, 9, "Suelo de CPA alcanzado tras optimización de campañas.", EUR)
erow(7, "Multiplicador de AOV (x)", 0.92, 1.00, 1.10, "Pesimista: más descuentos/menor mix de bundles. Optimista: mayor adopción de bundles.", "0.00\"x\"")
erow(8, "Crecimiento mensual de Ads (%)", f"=Supuestos!$B${A['growth_cons']}", f"=Supuestos!$B${A['growth_base']}", f"=Supuestos!$B${A['growth_agr']}",
     "Enlazado a Supuestos (Conservador/Base/Agresivo).", PCT, formulas=True)
erow(9, "Techo mensual de Ads (€)", f"=Supuestos!$B${A['cap_ads_cons']}", f"=Supuestos!$B${A['cap_ads_base']}", f"=Supuestos!$B${A['cap_ads_agr']}",
     "Enlazado a Supuestos (Conservador/Base/Agresivo).", EUR0, formulas=True)
erow(10, "Tasa de suscripción (%)", 0.10, 0.15, 0.20, "Pesimista: menor adopción de suscripción. Optimista: mejor oferta/onboarding de suscripción.", PCT)
erow(11, "Repetición de compra a 90 días (%)", 0.20, 0.25, 0.30, "Pesimista/optimista sobre el ratio de recompra de no-suscriptores.", PCT)

r6 = 13
subtitle_row(ws6, r6, "Resultados clave por escenario (recalcula al cambiar el selector en Supuestos)", span=5); r6 += 1
header_cells(ws6, r6, ["Indicador (escenario activo)", "Valor", "", "", ""], start_col=1)
r6 += 1
res_rows = [
    ("Escenario activo (1/2/3)", f"=Supuestos!$B${A['escenario_sel']}", "0"),
    ("Ingresos netos de IVA, mes 12 (€)", f"='PyG 12 meses'!N{P['ingresos_siva']}", EUR0),
    ("EBITDA, mes 12 (€)", f"='PyG 12 meses'!N{P['ebitda']}", EUR0),
    ("EBITDA acumulado, año 1 (€)", f"='PyG 12 meses'!N{P['ebitda_acum']}", EUR0),
    ("Caja final, mes 12 (€)", f"=Caja!O{C['caja_fin']}", EUR0),
    ("Caja mínima del año (€)", f"=Caja!B{rr_min}", EUR0),
]
for label, formula, fmt in res_rows:
    ws6.cell(row=r6, column=1, value=label).font = BLACK
    c = ws6.cell(row=r6, column=2, value=formula)
    c.font = GREEN
    c.number_format = fmt
    for col in range(1, 6):
        ws6.cell(row=r6, column=col).border = BORDER
    r6 += 1

ws6.freeze_panes = "B5"
note(ws6, "A5", "Estas filas alimentan, vía CHOOSE, las celdas '...activo' de la hoja Supuestos. Cambiar el selector de escenario en Supuestos recalcula PyG, Caja y Punto muerto.")
print("Escenarios filas usadas:", r6 - 1)

# =====================================================================================
# GUARDAR
# =====================================================================================
OUT_PATH = "/home/user/Claude-septiembre/nocta/finanzas/modelo_financiero_nocta.xlsx"
wb.save(OUT_PATH)
print("Guardado en:", OUT_PATH)
