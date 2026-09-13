# -*- coding: utf-8 -*-
"""Convierte el TopoJSON de dominio publico (Natural Earth 110m, via world-atlas) en:
   1) web/public/admin/mundo.js  -> los contornos del mundo ya proyectados, como rutas SVG.
   2) build/centroides.json      -> el centro de cada pais por codigo ISO alpha-2, para poder
      poner un punto en el mapa cuando solo sabemos el pais y no la ciudad.
   Proyeccion Miller cilindrica: la longitud es lineal (el zoom es una simple transformacion afin)
   y la latitud se comprime, asi que Groenlandia no se come el mapa como en Mercator."""
import json, math, os

S = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
topo = json.load(open(os.path.join(S, 'world110m.json')))
iso  = json.load(open(os.path.join(S, 'iso.json')))
NUM2A2 = {r[2].lstrip('0') or '0': r[0] for r in iso}

LAT_MAX, LAT_MIN = 83.0, -56.0      # sin la Antartida: ocupa un tercio del alto y no vive nadie
ANCHO = 1000.0

def miller_y(lat):
    lat = max(-89.5, min(89.5, lat))
    return 1.25 * math.log(math.tan(math.pi / 4 + 0.4 * math.radians(lat)))

Y_TOP, Y_BOT = miller_y(LAT_MAX), miller_y(LAT_MIN)
ESCALA = ANCHO / (2 * math.pi)                      # x = (lon+180)/360*ANCHO  <=>  rad * ESCALA
ALTO = (Y_TOP - Y_BOT) * ESCALA

def proj(lon, lat):
    return ((lon + 180.0) / 360.0 * ANCHO, (Y_TOP - miller_y(lat)) * ESCALA)

# --- descompresion del TopoJSON: arcos cuantizados y delta-codificados ---
tr = topo.get('transform')
def arco(i):
    inv = i < 0
    if inv: i = ~i
    pts, x, y = [], 0, 0
    for dx, dy in topo['arcs'][i]:
        x += dx; y += dy
        if tr: pts.append((x * tr['scale'][0] + tr['translate'][0], y * tr['scale'][1] + tr['translate'][1]))
        else:  pts.append((x, y))
    return pts[::-1] if inv else pts

def anillo(idxs):
    pts = []
    for k in idxs:
        a = arco(k)
        pts.extend(a[1:] if pts else a)
    return pts

def desenrolla(an):
    """Rusia y Fiyi cruzan el meridiano 180. Si se proyectan tal cual, el salto de +179 a -179
    dibuja un segmento que atraviesa el mapa entero de lado a lado: son las franjas horizontales.
    Se 'desenrolla' la longitud (sumando o restando 360 en cada salto) para que el anillo sea
    continuo, y luego se dibuja tambien desplazado 360, para que la parte que cae fuera por un
    lado reaparezca por el otro. Lo que sobre lo recorta la ventana del SVG."""
    out, prev = [], None
    giro = 0.0
    for lon, lat in an:
        if prev is not None:
            d = lon - prev
            if d > 180: giro -= 360.0
            elif d < -180: giro += 360.0
        prev = lon
        out.append((lon + giro, lat))
    return out

def ruta(anillos):
    d = []
    for an0 in anillos:
        if len(an0) < 3: continue
        an = desenrolla(an0)
        lons = [p[0] for p in an]
        copias = [0.0]
        if max(lons) > 180: copias.append(-360.0)
        if min(lons) < -180: copias.append(360.0)
        for off in copias:
            seg, ult = [], None
            for lon, lat in an:
                x, y = proj(lon + off, lat)
                p = (round(x, 1), round(y, 1))
                # Se tiran los puntos que caen a menos de medio pixel del anterior: a 1000 px de ancho
                # no aportan nada al dibujo y engordan el fichero, que el CRM descarga en cada carga.
                if ult is None or abs(p[0] - ult[0]) + abs(p[1] - ult[1]) >= 0.5:
                    seg.append(p); ult = p
            if len(seg) < 3: continue
            if max(x for x, _ in seg) < -20 or min(x for x, _ in seg) > ANCHO + 20: continue
            d.append('M' + 'L'.join(f'{x},{y}' for x, y in seg) + 'Z')
    return ''.join(d)

def centro(anillos):
    """Centroide del anillo mas grande, en lon/lat. Sirve para clavar el punto del pais."""
    mejor, area_max = None, -1
    for an0 in anillos:
        if len(an0) < 3: continue
        an = desenrolla(an0)
        a = cx = cy = 0.0
        for i in range(len(an)):
            x1, y1 = an[i]; x2, y2 = an[(i + 1) % len(an)]
            f = x1 * y2 - x2 * y1
            a += f; cx += (x1 + x2) * f; cy += (y1 + y2) * f
        if abs(a) < 1e-12: continue
        a *= 0.5
        if abs(a) > area_max: area_max, mejor = abs(a), (cx / (6 * a), cy / (6 * a))
    if mejor is None: return None
    lon = ((mejor[0] + 180.0) % 360.0) - 180.0
    return (lon, mejor[1])

paises, centroides = [], {}
for g in topo['objects']['countries']['geometries']:
    nombre = (g.get('properties') or {}).get('name') or ''
    if nombre == 'Antarctica': continue      # un tercio del alto del mapa y cero visitantes
    cid = str(g.get('id') or '').lstrip('0') or '0'
    a2 = NUM2A2.get(cid)
    if g['type'] == 'Polygon':     anillos = [anillo(r) for r in g['arcs']]
    elif g['type'] == 'MultiPolygon': anillos = [anillo(r) for poly in g['arcs'] for r in poly]
    else: continue
    d = ruta(anillos)
    if not d: continue
    paises.append({'c': a2 or '', 'n': nombre, 'd': d})
    c = centro(anillos)
    if a2 and c: centroides[a2] = [round(c[0], 3), round(c[1], 3)]

paises.sort(key=lambda p: p['n'])
sal = os.path.join(os.path.dirname(S), 'Claude-septiembre', 'nocta', 'web', 'public', 'admin', 'mundo.js')
sal = '/home/user/Claude-septiembre/nocta/web/public/admin/mundo.js'
with open(sal, 'w') as f:
    f.write('/* Contornos del mundo para el mapa en vivo del CRM.\n'
            '   Generado por tools/crm-qa/gen_mundo.py desde Natural Earth 110m (dominio publico, via world-atlas).\n'
            '   Proyeccion Miller cilindrica, recortada a [%g, %g] de latitud (fuera queda la Antartida).\n'
            '   La longitud es lineal, asi que proyectar un punto es la misma formula que hay en m-live.js.\n'
            '   No se edita a mano: se regenera. */\n' % (LAT_MIN, LAT_MAX))
    f.write('window.MUNDO=' + json.dumps({
        'w': round(ANCHO, 1), 'h': round(ALTO, 1), 'latMax': LAT_MAX, 'latMin': LAT_MIN,
        'paises': paises}, separators=(',', ':'), ensure_ascii=False) + ';\n')

json.dump(centroides, open(os.path.join(S, 'build', 'centroides.json'), 'w'))
print('paises %d · centroides %d · viewBox %g x %g · %.0f KB'
      % (len(paises), len(centroides), ANCHO, ALTO, os.path.getsize(sal) / 1024))
