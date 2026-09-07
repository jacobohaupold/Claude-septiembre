#!/usr/bin/env python3
"""
Montaje final de un anuncio NOCTA (sin depender de drawtext/libass):
  - sustituye el audio del vídeo por la locución TTS colocada en sus tiempos
  - quema subtítulos estilo TikTok (PNG transparentes con PIL + overlay)
  - añade cierre de 2 s con el packshot y el claim
Uso: python3 montar_anuncio.py plan.json salida.mp4
plan.json = {"video": "...mp4", "fps": 24, "w": 720, "h": 1280,
             "vo": [{"file": "...wav", "start": 0.0}, ...],
             "subs": [{"t0": 0, "t1": 3.8, "text": "..."}, ...],
             "endcard": {"packshot": "...png", "line1": "nocta", "line2": "...", "dur": 2.0},
             "ambient_db": -18}
"""
import json, os, subprocess, sys, tempfile
from PIL import Image, ImageDraw, ImageFont

FF = open('/tmp/claude-0/-home-user/e4610181-73c9-5b97-9776-a971b4d99e53/scratchpad/vue/ffpath.txt').read().strip() if os.path.exists('/tmp/claude-0/-home-user/e4610181-73c9-5b97-9776-a971b4d99e53/scratchpad/vue/ffpath.txt') else 'ffmpeg'
FONT_B = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
NAVY = (20, 33, 61, 255); CREAM = (243, 239, 230, 255)

def wrap(draw, text, font, maxw):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if draw.textlength(t, font=font) <= maxw: cur = t
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines

def sub_png(text, w, h, path, size=52):
    im = Image.new('RGBA', (w, h), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    font = ImageFont.truetype(FONT_B, size)
    lines = wrap(d, text, font, int(w * 0.86))
    lh = int(size * 1.25); total = lh * len(lines); y = int(h * 0.68) - total // 2
    for ln in lines:
        tw = d.textlength(ln, font=font); x = (w - tw) / 2
        # caja semitransparente + borde
        d.rounded_rectangle([x - 18, y - 8, x + tw + 18, y + lh + 2], radius=14, fill=(20, 33, 61, 200))
        d.text((x, y), ln, font=font, fill=CREAM)
        y += lh + 6
    im.save(path)

def endcard_png(cfg, w, h, path):
    im = Image.new('RGBA', (w, h), CREAM); d = ImageDraw.Draw(im)
    ps = Image.open(cfg['packshot']).convert('RGBA'); ps.thumbnail((int(w * 0.8), int(h * 0.5)))
    im.paste(ps, ((w - ps.width) // 2, int(h * 0.12)), ps)
    f1 = ImageFont.truetype(FONT_B, 96); f2 = ImageFont.truetype(FONT_B, 34); f3 = ImageFont.truetype(FONT_B, 34)
    for txt, f, yy in [(cfg['line1'], f1, 0.66), (cfg['line2'], f2, 0.76), (cfg.get('line3', ''), f3, 0.83)]:
        if not txt: continue
        size = f.size
        while d.textlength(txt, font=f) > w * 0.9 and size > 18:
            size -= 2; f = ImageFont.truetype(FONT_B, size)
        tw = d.textlength(txt, font=f); d.text(((w - tw) / 2, int(h * yy)), txt, font=f, fill=NAVY)
    im.save(path)

def main(plan_path, out):
    P = json.load(open(plan_path)); w, h, fps = P['w'], P['h'], P.get('fps', 24)
    tmp = tempfile.mkdtemp()
    # 0) base = vídeo (re-encode uniforme) + cierre silencioso, para que la locución pueda entrar en el cierre
    base = os.path.join(tmp, 'base.mp4')
    enc = ['-r', str(fps), '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-ac', '2']
    body0 = os.path.join(tmp, 'body0.mp4')
    subprocess.run([FF, '-v', 'error', '-y', '-i', P['video'], '-vf', f'scale={w}:{h}'] + enc + [body0], check=True)
    ec = P.get('endcard')
    if ec:
        png = os.path.join(tmp, 'end.png'); endcard_png(ec, w, h, png); end = os.path.join(tmp, 'end.mp4')
        subprocess.run([FF, '-v', 'error', '-y', '-loop', '1', '-i', png, '-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo', '-t', str(ec.get('dur', 2.0))] + enc + ['-shortest', end], check=True)
        lst = os.path.join(tmp, 'list.txt'); open(lst, 'w').write(f"file '{body0}'\nfile '{end}'\n")
        subprocess.run([FF, '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', base], check=True)
    else:
        base = body0
    # 1) subtítulos como PNG
    inputs = ['-i', base]; fchain = []; last = '[0:v]'
    for i, s in enumerate(P['subs']):
        pth = os.path.join(tmp, f'sub{i}.png'); sub_png(s['text'], w, h, pth, s.get('size', 52))
        inputs += ['-i', pth]
    n_sub = len(P['subs'])
    for i, s in enumerate(P['subs']):
        fchain.append(f"{last}[{i+1}:v]overlay=0:0:enable='between(t,{s['t0']},{s['t1']})'[v{i}]"); last = f'[v{i}]'
    # 2) locución: cada wav (opcionalmente acelerado con atempo) retrasado a su inicio y mezclado
    a_in_start = 1 + n_sub; amix = []
    for j, v in enumerate(P['vo']):
        inputs += ['-i', v['file']]
        tempo = f"atempo={v['tempo']}," if v.get('tempo') else ''
        fchain.append(f"[{a_in_start + j}:a]aformat=sample_rates=48000:channel_layouts=stereo,{tempo}adelay={int(v['start']*1000)}|{int(v['start']*1000)},volume={v.get('gain',1.0)}[a{j}]"); amix.append(f'[a{j}]')
    amb = P.get('ambient_db')
    if amb is not None:
        fchain.append(f"[0:a]volume={amb}dB[amb]"); amix.append('[amb]')
    fchain.append(''.join(amix) + f"amix=inputs={len(amix)}:normalize=0:dropout_transition=0,alimiter=limit=0.95[aout]")
    fchain.append(f"{last}format=yuv420p[vout]")
    cmd = [FF, '-v', 'error', '-y'] + inputs + ['-filter_complex', ';'.join(fchain), '-map', '[vout]', '-map', '[aout]'] + enc + ['-shortest', out]
    subprocess.run(cmd, check=True)
    print('OK', out)

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
