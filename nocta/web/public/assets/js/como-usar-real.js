/* NOCTA · Cómo usar — capa de imagen real: secuencia de fotogramas (vídeo generado sobre la modelo y el parche reales)
   controlada por el mismo progreso de scroll que la escena 3D. La escena 3D queda como «vista de corte» (botón). */
(function () {
  'use strict';
  var root = document.getElementById('escena'), stage = document.getElementById('cu-stage'), track = document.getElementById('cu-track');
  if (!root || !stage || !track) return;
  var SEQ = window.NOCTA_CU_SEQ || { a: 0, b: 0, w: 960, h: 720 };
  if (!SEQ.a || !SEQ.b) return;
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cv = document.createElement('canvas'); cv.id = 'cu-real'; cv.className = 'n-cu-scene__real'; cv.setAttribute('aria-hidden', 'true');
  stage.insertBefore(cv, stage.firstChild);
  var ctx = cv.getContext('2d', { alpha: false });
  var frames = { a: new Array(SEQ.a), b: new Array(SEQ.b) }, loading = false, W = 0, H = 0, dpr = Math.min(2, window.devicePixelRatio || 1), lastKey = '', curP = -1;
  var fallback = document.getElementById('cu-fallback');
  var src = function (s, i) { return '/assets/img/cu/' + s + '/' + i + '.webp'; };

  function resize() {
    var w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return;
    if (w === W && h === H) return; W = w; H = h; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); lastKey = ''; if (curP >= 0) draw(curP);
  }
  function drawCover(img) {
    var iw = img.width, ih = img.height, s = Math.max(cv.width / iw, cv.height / ih), dw = iw * s, dh = ih * s;
    ctx.drawImage(img, (cv.width - dw) / 2, (cv.height - dh) / 2 + cv.height * 0.03, dw, dh);
  }
  function nearest(seq, i) { var arr = frames[seq]; for (var k = i; k >= 0; k--) if (arr[k]) return arr[k]; for (k = i + 1; k < arr.length; k++) if (arr[k]) return arr[k]; return null; }
  function draw(p) {
    curP = p;
    var seq, idx, night = 0;
    if (p < 0.15) { seq = 'a'; idx = Math.round(p / 0.15 * (SEQ.a - 1)); }
    else if (p < 0.75) { seq = 'a'; idx = SEQ.a - 1; night = Math.sin(Math.PI * (p - 0.15) / 0.6); }
    else { seq = 'b'; idx = Math.round((p - 0.75) / 0.25 * (SEQ.b - 1)); }
    var img = nearest(seq, idx); if (!img) return;
    var key = seq + idx + '|' + night.toFixed(2); if (key === lastKey) return; lastKey = key;
    drawCover(img);
    if (night > 0) { ctx.fillStyle = 'rgba(20,33,61,' + (0.42 * night).toFixed(3) + ')'; ctx.fillRect(0, 0, cv.width, cv.height); }
    if (fallback && !fallback.hidden) fallback.hidden = true;
    root.classList.add('has-real');
  }
  function load(seq, i, cb) {
    var im = new Image(); im.decoding = 'async';
    im.onload = function () { frames[seq][i] = im; if (cb) cb(); else if (curP >= 0) { lastKey = ''; draw(curP); } };
    im.onerror = function () { frames[seq][i] = null; if (cb) cb(); };
    im.src = src(seq, i);
  }
  function loadAll() {
    if (loading) return; loading = true;
    var q = []; var i;
    // orden: primeros fotogramas de A, último de A, primeros de B, y luego el resto intercalado
    for (i = 0; i < SEQ.a; i++) q.push(['a', i]);
    for (i = 0; i < SEQ.b; i++) q.push(['b', i]);
    q.sort(function (x, y) { var px = x[0] === 'a' ? (x[1] === SEQ.a - 1 ? -1 : x[1]) : SEQ.a + x[1]; var py = y[0] === 'a' ? (y[1] === SEQ.a - 1 ? -1 : y[1]) : SEQ.a + y[1]; return px - py; });
    var active = 0, MAX = 6;
    (function next() { while (active < MAX && q.length) { var it = q.shift(); active++; load(it[0], it[1], function () { active--; if (curP >= 0) { lastKey = ''; draw(curP); } next(); }); } })();
  }
  // primer fotograma en cuanto se pueda, el resto cerca del viewport
  load('a', 0, function () { resize(); draw(scrollP()); });
  if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { loadAll(); io.disconnect(); } }); }, { rootMargin: '120% 0px' }); io.observe(track); } else loadAll();

  /* progreso: mismo cálculo que la escena 3D; cuando la escena 3D arranca, ella manda (incluye el botón «ver la noche») */
  var hooked = false;
  function scrollP() { var r = track.getBoundingClientRect(), total = r.height - window.innerHeight; var p = total > 0 ? (-r.top) / total : (r.top < 0 ? 1 : 0); return Math.min(1, Math.max(0, p)); }
  var q2 = false;
  window.addEventListener('scroll', function () { if (hooked || q2) return; q2 = true; requestAnimationFrame(function () { q2 = false; draw(scrollP()); }); }, { passive: true });
  window.nCuOnP = function (p) { hooked = true; draw(p); };
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(stage); window.addEventListener('resize', resize);
  resize(); if (RM) draw(1);

  /* alternar vista real / corte 3D */
  var btn = document.getElementById('cu-view');
  if (btn) btn.addEventListener('click', function () {
    var cut = !root.classList.contains('is-cut');
    root.classList.toggle('is-cut', cut); btn.setAttribute('aria-pressed', cut ? 'true' : 'false'); btn.textContent = cut ? 'Ver la piel real' : 'Ver el corte 3D';
    if (cut && window.nCuBoot) window.nCuBoot();
    if (window.nTrack) nTrack('cu_view', { cut: cut });
  });
})();
