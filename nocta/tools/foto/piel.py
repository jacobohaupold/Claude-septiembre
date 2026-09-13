#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Pasa las fotos de piel (antes / después / aplicación) a lo que se sirve en la web.

Las de antes y después salen en cuadrado a 1200 px: la rejilla las enseña como mucho a 428 px
en escritorio, así que 1200 cubre pantallas de doble densidad y no más. La de aplicación sale
en 4:3 a 1600 px, que es el ancho del bloque a doble densidad.

No se recorta nada: el encuadre es lo que hace que la comparación valga, y recortar una de las
dos fotos y la otra no es exactamente la trampa que esta sección no quiere hacer.
"""
import sys, pathlib
from PIL import Image

ORIGEN = pathlib.Path(sys.argv[1])
DESTINO = pathlib.Path(__file__).resolve().parents[2] / 'web' / 'public' / 'assets' / 'img' / 'piel'
DESTINO.mkdir(parents=True, exist_ok=True)

# fichero de origen → (nombre publicado, ancho, alto)
PAR = 1200
APL = (1600, 1200)
ZONAS = ['nariz', 'granos', 'superficie', 'barbilla', 'frente', 'exfoliante', 'serum', 'peeloff', 'mascarillas', 'tonico']

def guarda(src, destino, tam):
    im = Image.open(src).convert('RGB')
    im = im.resize(tam, Image.LANCZOS)
    im.save(destino, 'WEBP', quality=82, method=6)
    return destino.stat().st_size

total = 0
for i, z in enumerate(ZONAS, 1):
    n = f'{i:02d}-{z}'
    for pre, sufijo, tam in (('a', 'antes', (PAR, PAR)), ('d', 'despues', (PAR, PAR)), ('p', 'aplicar', APL)):
        src = ORIGEN / f'{pre}{n}.png'
        if not src.exists():
            print(f'  falta {src.name}')
            continue
        dst = DESTINO / f'{z}-{sufijo}.webp'
        kb = guarda(src, dst, tam) / 1024
        total += kb
        print(f'  {dst.name:28s} {kb:6.0f} kB')
print(f'\n{total/1024:.2f} MB en total → {DESTINO}')
