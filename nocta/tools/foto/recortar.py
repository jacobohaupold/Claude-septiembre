# -*- coding: utf-8 -*-
"""Recorta el fondo blanco de una foto de producto y deja PNG con transparencia.

Por qué no vale un umbral global: el envase de NOCTA es cartón blanco roto y el papel protector
del parche es blanco. Si se borra "todo lo que sea casi blanco" se agujerea el producto.

Lo que se hace: relleno por CONEXIÓN desde el borde. Sólo es fondo el blanco que se puede alcanzar
caminando desde el marco de la imagen sin cruzar el producto. Los blancos de dentro del producto
no se tocan porque no están conectados con el exterior.

La sombra difusa que trae la foto también se va: la sombra la pone después el CSS con
filter: drop-shadow(), que sigue la silueta real y funciona sobre cualquier fondo.

Uso: python3 recortar.py entrada.png salida.png [--lado 2048]
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

UMBRAL_SEMILLA = 246   # blanco puro: punto de partida seguro
UMBRAL_FONDO   = 232   # hasta dónde se deja crecer el relleno (se come la sombra suave)
PLUMA          = 1.1   # píxeles de suavizado del borde, contra el dentado


def recorta(ruta_in, ruta_out, lado=2048):
    im = Image.open(ruta_in).convert('RGB')
    a = np.asarray(im).astype(np.int16)
    minimo = a.min(axis=2)                       # el canal más bajo: lo blanco puntúa alto

    candidato = minimo >= UMBRAL_FONDO
    semilla = np.zeros_like(candidato)
    borde = minimo >= UMBRAL_SEMILLA
    semilla[0, :] = borde[0, :]; semilla[-1, :] = borde[-1, :]
    semilla[:, 0] = borde[:, 0]; semilla[:, -1] = borde[:, -1]
    if not semilla.any():
        raise SystemExit('El marco de %s no es blanco: esta foto no sirve para recortar.' % ruta_in)

    # Fondo = lo blanco conectado con el marco. Lo demás, aunque sea blanco, es producto.
    etiquetas, _ = ndimage.label(candidato)
    fondo = np.isin(etiquetas, np.unique(etiquetas[semilla & (etiquetas > 0)]))

    solido = ~fondo
    # La sombra difusa de la foto deja islas grises que no tocan el marco y sobreviven al relleno.
    # Se distinguen del producto por el contraste: el producto tiene tinta y aristas (píxeles
    # claramente oscuros); una sombra suave, no. Se cae toda isla sin ningún píxel por debajo de 200.
    trozos, n = ndimage.label(solido)
    if n:
        oscuro_min = ndimage.minimum(minimo, trozos, index=np.arange(1, n + 1))
        tam = ndimage.sum(solido, trozos, index=np.arange(1, n + 1))
        validos = np.where((oscuro_min < 200) & (tam > solido.size * 0.0004))[0] + 1
        solido = np.isin(trozos, validos)

    alfa = np.where(solido, 255, 0).astype(np.uint8)
    alfa = np.asarray(Image.fromarray(alfa).filter(ImageFilter.GaussianBlur(PLUMA)))

    # Se recorta al contenido y se centra en un lienzo cuadrado con el mismo aire por los cuatro
    # lados, para que todos los productos ocupen lo mismo en la tarjeta y ninguno salga descentrado.
    ys, xs = np.where(alfa > 12)
    if not len(ys):
        raise SystemExit('No se ha encontrado producto en %s' % ruta_in)
    y0, y1, x0, x1 = int(ys.min()), int(ys.max()), int(xs.min()), int(xs.max())

    rgba = Image.fromarray(np.dstack([np.asarray(im), alfa]), 'RGBA')
    recorte = rgba.crop((x0, y0, x1 + 1, y1 + 1))
    caja = int(max(recorte.size) * 1.10)                     # 5 % de aire por lado
    lienzo_img = Image.new('RGBA', (caja, caja), (0, 0, 0, 0))
    lienzo_img.paste(recorte, ((caja - recorte.size[0]) // 2, (caja - recorte.size[1]) // 2))

    out = lienzo_img
    if lado and out.size[0] > lado:
        out = out.resize((lado, lado), Image.LANCZOS)
    out.save(ruta_out, optimize=True)
    cubierto = float((np.asarray(out)[:, :, 3] > 12).mean())
    return out.size, cubierto


if __name__ == '__main__':
    lado = 2048
    if '--lado' in sys.argv:
        lado = int(sys.argv[sys.argv.index('--lado') + 1])
    tam, cub = recorta(sys.argv[1], sys.argv[2], lado)
    print('%s → %s  %sx%s · producto %.0f %% del lienzo' % (sys.argv[1], sys.argv[2], tam[0], tam[1], cub * 100))
