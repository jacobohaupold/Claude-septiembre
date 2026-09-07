/* NOCTA · Cómo usar — escena 3D "Una noche, en 60 segundos". Módulo ES, carga perezosa de three.js. */
(function () {
  'use strict';
  const root = document.getElementById('escena');
  const track = document.getElementById('cu-track');
  const canvas = document.getElementById('cu-canvas');
  const stage = document.getElementById('cu-stage');
  const fallbackImg = document.getElementById('cu-fallback');
  const clockEl = document.getElementById('cu-clock');
  const phaseEl = document.getElementById('cu-phase');
  const barFill = document.getElementById('cu-progressfill');
  const playBtn = document.getElementById('cu-play');
  const stepEls = Array.prototype.slice.call(document.querySelectorAll('#cu-steps [data-step]'));
  if (!root || !track || !canvas || !stage) return;

  const RM = (function () { try { return matchMedia('(prefers-reduced-motion:reduce)').matches; } catch (e) { return false; } })();

  function setStep(i) {
    stepEls.forEach(function (el) { el.classList.toggle('is-on', +el.dataset.step === i); });
  }

  function toFallback() {
    root.classList.add('is-fallback');
    if (fallbackImg) fallbackImg.hidden = false;
    if (clockEl) clockEl.textContent = '07:00';
    if (phaseEl) phaseEl.textContent = 'Por la mañana';
    if (barFill) barFill.style.width = '100%';
    if (playBtn) playBtn.hidden = true;
    setStep(2);
  }

  function supportsWebGL() {
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
      return !!gl;
    } catch (e) { return false; }
  }

  if (RM || !supportsWebGL()) { toFallback(); return; }

  let booted = false;
  function boot() {
    if (booted) return;
    booted = true;
    import('/assets/js/vendor/three.module.min.js')
      .then(function (THREE) {
        try { runScene(THREE); }
        catch (e) { toFallback(); }
      })
      .catch(function () { toFallback(); });
  }

  /* Carga perezosa de verdad: three.js (~170 KB gz) solo se pide cuando la
     escena está a media pantalla de entrar y la página ya ha terminado de
     cargar, para no penalizar LCP/TBT de la guía. */
  function armBoot() {
    /* 1) primer gesto del usuario (scroll, toque, tecla): la escena está bajo el pliegue, así que
          quien va a verla siempre hace scroll; 2) la sección ya en pantalla (enlace directo #escena);
          3) el botón «Ver la noche». Nunca durante la carga inicial. */
    const once = { once: true, passive: true };
    ['scroll', 'pointerdown', 'touchstart', 'keydown', 'wheel'].forEach(function (ev) { window.addEventListener(ev, boot, once); });
    if ('IntersectionObserver' in window) {
      const boo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { boot(); boo.disconnect(); } });
      }, { rootMargin: '0px' });
      boo.observe(track);
    }
    if (playBtn) playBtn.addEventListener('click', boot, { once: true });
  }
  if (document.readyState === 'complete') armBoot();
  else window.addEventListener('load', function () { setTimeout(armBoot, 400); }, { once: true });

  function runScene(THREE) {
    const smoothstep = function (a, b, x) {
      const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };
    const lerp = THREE.MathUtils.lerp;
    const deg = THREE.MathUtils.degToRad;

    /* ---------- render target ---------- */
    let renderer;
    try {
      /* preserveDrawingBuffer: el render es bajo demanda (solo al cambiar p),
         así que sin esto un toDataURL()/getImageData() de verificación externa
         puede leer un framebuffer ya limpiado y dar un falso "canvas en blanco"
         aunque lo pintado en pantalla sea correcto. */
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: 'low-power', preserveDrawingBuffer: true });
    } catch (e) { toFallback(); return; }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    if ('outputColorSpace' in renderer) renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 1, 2000);
    const target = new THREE.Vector3(0, 9, 5);
    /* algo más cenital que un simple 3/4 frontal: deja ver mejor que el parche
       se apoya PLANO sobre la piel, encima de los poros, en vez de leerse como
       dos bloques flotando uno junto a otro */
    const viewDir = new THREE.Vector3(0, 0.8, 1).normalize();

    /* ---------- luz ---------- */
    const hemi = new THREE.HemisphereLight(0xfffaf1, 0xe6dccc, 1.15);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 1.25);
    key.position.set(36, 80, 52);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -70; key.shadow.camera.right = 70;
    key.shadow.camera.top = 70; key.shadow.camera.bottom = -70;
    key.shadow.camera.near = 10; key.shadow.camera.far = 220;
    key.shadow.bias = -0.002;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xfff1de, 0.5);
    fill.position.set(-50, 24, 18);
    scene.add(fill);

    /* ---------- grupo raíz (tilt) ---------- */
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    /* ---------- piel ---------- */
    const SKIN_W = 96, SKIN_H = 22, SKIN_D = 64;
    const skinTopY = SKIN_H / 2;
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xEBCFBA, roughness: 0.78 });
    /* bloque con cantos redondeados: rectángulo redondeado extruido hacia arriba con bisel */
    const skinShape = (function () {
      const r = 7, w = SKIN_W / 2, d = SKIN_D / 2, sh = new THREE.Shape();
      sh.moveTo(-w + r, -d); sh.lineTo(w - r, -d); sh.quadraticCurveTo(w, -d, w, -d + r);
      sh.lineTo(w, d - r); sh.quadraticCurveTo(w, d, w - r, d); sh.lineTo(-w + r, d);
      sh.quadraticCurveTo(-w, d, -w, d - r); sh.lineTo(-w, -d + r); sh.quadraticCurveTo(-w, -d, -w + r, -d);
      return sh;
    })();
    const skinGeo = new THREE.ExtrudeGeometry(skinShape, { depth: SKIN_H - 5, bevelEnabled: true, bevelThickness: 2.5, bevelSize: 2.2, bevelSegments: 5, steps: 1 });
    /* tras rotar, la extrusión (con bisel) ocupa y∈[-2.5, SKIN_H-2.5]; se baja para que la cara superior quede en skinTopY */
    skinGeo.rotateX(-Math.PI / 2);
    skinGeo.translate(0, -SKIN_H / 2 + 2.5, 0);
    skinGeo.computeVertexNormals();
    const skinMesh = new THREE.Mesh(skinGeo, skinMat);
    skinMesh.position.y = 0;
    skinMesh.castShadow = true;
    /* sombra de contacto suave bajo el bloque */
    (function addGroundShadow() {
      const c = document.createElement('canvas'); c.width = 256; c.height = 256;
      const g2 = c.getContext('2d'); if (!g2) return;
      const gr = g2.createRadialGradient(128, 128, 10, 128, 128, 128);
      gr.addColorStop(0, 'rgba(20,33,61,0.28)'); gr.addColorStop(0.6, 'rgba(20,33,61,0.10)'); gr.addColorStop(1, 'rgba(20,33,61,0)');
      g2.fillStyle = gr; g2.fillRect(0, 0, 256, 256);
      const tex = new THREE.CanvasTexture(c);
      const m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
      const pl = new THREE.Mesh(new THREE.PlaneGeometry(SKIN_W * 1.7, SKIN_D * 1.9), m);
      pl.rotation.x = -Math.PI / 2; pl.position.y = -SKIN_H / 2 - 0.4; pl.renderOrder = -2;
      sceneGroup.add(pl);
    })();
    skinMesh.receiveShadow = true;
    sceneGroup.add(skinMesh);

    /* ---------- poros: 7 ranuras + filamentos ---------- */
    const N_PORES = 7;
    const poreXs = [];
    for (let i = 0; i < N_PORES; i++) poreXs.push(-24 + i * 8);
    /* Z de los poros: DEBE caer bajo la franja ANCHA del troquel del parche
       (ver patchRestZ más abajo), no bajo el "cuello" estrecho del puente.
       El troquel mide 60mm de ancho solo entre y_local≈20 y 31 (medido por
       muestreo de la ExtrudeGeometry); el resto de la pieza es mucho más
       estrecho (28mm en el cuello, ~34-44mm en las puntas de las alas). Con
       poreFrontZ pegado al filo frontal de la piel (como estaba antes) esa
       franja ancha cae fuera del bloque de piel, así que aquí se elige un Z
       que sí queda dentro de la franja ancha y dentro del bloque. */
    const poreFrontZ = 7.5;
    /* más contraste que el marrón/dorado original: la ranura del poro y el
       filamento sebáceo se leían casi del mismo tono que la piel */
    const slotMat = new THREE.MeshStandardMaterial({ color: 0x7A5642, roughness: 0.95 });
    const filMat = new THREE.MeshStandardMaterial({ color: 0xEFD68F, roughness: 0.45 });
    const dotMat = new THREE.MeshStandardMaterial({ color: 0x8A6552, roughness: 0.9 });
    const filaments = [];

    poreXs.forEach(function (x) {
      const slot = new THREE.Mesh(new THREE.BoxGeometry(1.6, 7, 2.4), slotMat);
      slot.position.set(x, skinTopY - 4.2, poreFrontZ);
      sceneGroup.add(slot);

      const dot = new THREE.Mesh(new THREE.CircleGeometry(1.15, 24), dotMat);
      dot.rotation.x = -Math.PI / 2;
      dot.position.set(x, skinTopY + 0.03, poreFrontZ - 1.5);
      sceneGroup.add(dot);

      const fil = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.85, 6, 14), filMat);
      fil.position.set(x, skinTopY - 5, poreFrontZ - 1.5);
      fil.castShadow = true;
      sceneGroup.add(fil);
      filaments.push({ mesh: fil, x: x, z: poreFrontZ - 1.5, baseY: skinTopY - 5 });
    });

    /* ---------- pista de contexto: halo cálido y difuso detrás del bloque de
       piel, para que se lea como un recorte DENTRO de una nariz y no como un
       bloque flotando sin más ---------- */
    (function addContextHalo() {
      const c = document.createElement('canvas');
      c.width = 256; c.height = 256;
      const ctx2d = c.getContext('2d');
      if (!ctx2d) return;
      const g = ctx2d.createRadialGradient(128, 128, 4, 128, 128, 128);
      g.addColorStop(0, 'rgba(231,200,180,0.85)');
      g.addColorStop(0.5, 'rgba(231,200,180,0.32)');
      g.addColorStop(1, 'rgba(231,200,180,0)');
      ctx2d.fillStyle = g;
      ctx2d.fillRect(0, 0, 256, 256);
      const tex = new THREE.CanvasTexture(c);
      if ('colorSpace' in tex && 'SRGBColorSpace' in THREE) tex.colorSpace = THREE.SRGBColorSpace;
      const haloMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.4, depthWrite: false, side: THREE.DoubleSide });
      const halo = new THREE.Mesh(new THREE.PlaneGeometry(150, 108), haloMat);
      halo.position.set(0, skinTopY - 3, -SKIN_D / 2 - 26);
      halo.renderOrder = -1;
      sceneGroup.add(halo);
    })();

    /* ---------- parche: troquel real (60×45mm), bisagra en el puente ---------- */
    function patchShape() {
      const s = new THREE.Shape();
      s.moveTo(19, 0);
      s.bezierCurveTo(17, 0, 16, 1, 16, 3);
      s.lineTo(16, 15);
      s.bezierCurveTo(16, 19, 11, 20, 5, 22);
      s.bezierCurveTo(1, 23, 0, 27, 0, 31);
      s.bezierCurveTo(0, 39, 6, 45, 13, 45);
      s.bezierCurveTo(18, 45, 22, 42, 25, 39);
      s.bezierCurveTo(27, 37, 28, 36, 30, 36);
      s.bezierCurveTo(32, 36, 33, 37, 35, 39);
      s.bezierCurveTo(38, 42, 42, 45, 47, 45);
      s.bezierCurveTo(54, 45, 60, 39, 60, 31);
      s.bezierCurveTo(60, 27, 59, 23, 55, 22);
      s.bezierCurveTo(49, 20, 44, 19, 44, 15);
      s.lineTo(44, 3);
      s.bezierCurveTo(44, 1, 43, 0, 41, 0);
      s.lineTo(19, 0);
      return s;
    }
    const patchGeo = new THREE.ExtrudeGeometry(patchShape(), { depth: 0.6, bevelEnabled: true, bevelSize: 0.15, bevelThickness: 0.15, bevelSegments: 2, steps: 1 });
    patchGeo.translate(-30, -22.5, 0);
    patchGeo.computeVertexNormals();
    const patchMat = new THREE.MeshPhysicalMaterial({ color: 0xF6EEE2, emissive: 0xF6EEE2, emissiveIntensity: 0.22, roughness: 0.42, metalness: 0, clearcoat: 0.55, clearcoatRoughness: 0.3, transparent: true, opacity: 0.66, depthWrite: false, side: THREE.DoubleSide });
    const patchMesh = new THREE.Mesh(patchGeo, patchMat);
    patchMesh.castShadow = true;
    patchMesh.receiveShadow = false;
    /* aplana el parche (Z de extrusión -> Y arriba) y orienta puente-atrás / punta-adelante */
    patchMesh.rotateX(-Math.PI / 2);
    patchMesh.rotateY(Math.PI);

    /* contorno sutil del troquel: sin esto, mientras el parche cae inclinado
       (fase "23:00 · Ponlo") la silueta real (puente + dos alas) se lee como
       una mancha abstracta. El trazo, hijo de patchMesh, hereda su rotación
       y su squash de presión sin cálculo aparte. */
    const patchEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(patchGeo, 28),
      new THREE.LineBasicMaterial({ color: 0x14213D, transparent: true, opacity: 0.16 })
    );
    patchMesh.add(patchEdges);

    const restY = skinTopY;
    /* Centro (en Z) de la franja ancha del troquel, ver comentario en
       poreFrontZ más arriba: aquí es donde se apoya realmente el parche, de
       modo que esa franja ancha —y no el cuello estrecho del puente— quede
       encima de los 7 poros. */
    const patchRestZ = 9;
    const hingeZ = patchRestZ - 22.5; /* borde del puente: el gozne */
    const patchLocalZ = patchRestZ - hingeZ; /* = 22.5 */

    const hinge = new THREE.Group();
    hinge.position.set(0, restY + 40, hingeZ);
    patchMesh.position.set(0, 0, patchLocalZ);
    hinge.add(patchMesh);

    /* discos blancos: grasa absorbida, en la cara INFERIOR del parche (la que
       toca la piel y queda oculta hasta que se levanta). El eje "arriba" del
       parche, tras el rotateX/rotateY de más arriba, es Y local; la cara de
       abajo está en torno a y≈-0.75 (profundidad de extrusión + bisel). Antes
       los discos estaban en y=0.06 —dentro de la cara SUPERIOR— por lo que
       nunca se veían al levantar el parche. Se separan claramente de la
       superficie (offset ~0.35mm) para evitar z-fighting. */
    const discMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, emissive: 0xFFFFFF, emissiveIntensity: 0.22, roughness: 0.95, side: THREE.DoubleSide });
    const discs = [];
    poreXs.forEach(function (x, i) {
      const disc = new THREE.Mesh(new THREE.CircleGeometry(1.7, 24), discMat);
      disc.rotation.x = Math.PI / 2;
      disc.position.set(x, 0.3, patchLocalZ + (filaments[i].z - patchRestZ));
      disc.scale.setScalar(0.001);
      hinge.add(disc);
      discs.push(disc);
    });
    sceneGroup.add(hinge);

    /* ---------- interpolación por progreso ---------- */
    let needsRender = true;
    let currentP = -1;
    const HH = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

    /* ---------- cámara: encaje responsive ---------- */
    function fitCamera() {
      const el = stage;
      const w = el.clientWidth || 1, h = el.clientHeight || 1;
      const aspect = w / h;
      camera.aspect = aspect;
      const vFov = deg(32) / 2;
      const halfH = 19, halfW = 47;
      const distForH = halfH / Math.tan(vFov);
      const distForW = halfW / (Math.tan(vFov) * aspect);
      const dist = Math.max(distForH, distForW) * 1.12;
      camera.position.copy(target).addScaledVector(viewDir, dist);
      camera.lookAt(target);
      camera.updateProjectionMatrix();
    }

    /* ---------- resize ---------- */
    let renderW = 0, renderH = 0;
    function resize() {
      const w = Math.round(stage.clientWidth), h = Math.round(stage.clientHeight);
      if (!w || !h || (w === renderW && h === renderH)) return;
      renderW = w; renderH = h;
      renderer.setSize(w, h, false);
      fitCamera();
      needsRender = true;
    }
    let ro = null;
    if ('ResizeObserver' in window) { ro = new ResizeObserver(resize); ro.observe(stage); }
    window.addEventListener('resize', resize);
    resize();

    function setP(p) {
      p = Math.min(1, Math.max(0, p));
      if (Math.abs(p - currentP) < 0.0008) return;
      currentP = p;
      needsRender = true;

      const dropT = smoothstep(0, 0.15, p);
      const pressT = smoothstep(0.10, 0.15, p);
      const nightT = smoothstep(0.15, 0.75, p);
      const openT = smoothstep(0.75, 1, p);

      /* caída y presión */
      const fallY = lerp(restY + 40, restY, dropT);
      hinge.position.y = fallY + openT * 6;
      /* inclinación de la caída: antes llegaba a 0.32 rad (~18°), lo bastante
         para que, combinada con la perspectiva, la silueta del parche
         (puente + dos alas) dejara de leerse y pareciera una mancha. Con un
         ángulo menor se conserva la sensación de caída sin perder la forma
         reconocible desde el primer fotograma visible. */
      hinge.rotation.z = (1 - dropT) * deg(9);
      const squash = 1 - 0.12 * Math.sin(Math.PI * pressT);
      patchMesh.scale.set(1, squash, 1);

      /* apertura al final de la noche */
      hinge.rotation.x = -deg(75) * openT;

      /* filamentos y grasa absorbida */
      const span = 1 - (N_PORES - 1) * 0.06;
      filaments.forEach(function (f, i) {
        const stagger = i * 0.06;
        const local = smoothstep(0, 1, Math.min(1, Math.max(0, (nightT - stagger) / span)));
        /* al despegar, la grasa ya está en el parche: el filamento desaparece */
        f.mesh.position.y = f.baseY + local * 6.4 - openT * 7;
        f.mesh.scale.y = lerp(0.35, 1.15, local) * (1 - openT);
        f.mesh.visible = openT < 0.97;
        const d = discs[i];
        d.scale.setScalar(Math.max(0.001, local));
      });

      /* luz: noche cerrada a mitad del intervalo, amanece al final */
      const lightF = 1 - 0.32 * Math.sin(Math.PI * nightT);
      hemi.intensity = 1.15 * lightF;
      key.intensity = 1.25 * lightF;

      /* reloj y fase */
      const hoursFloat = 23 + nightT * 8;
      let hIdx = Math.floor(hoursFloat) % 24;
      let mm = Math.round((hoursFloat % 1) * 60);
      if (mm === 60) { mm = 0; hIdx = (hIdx + 1) % 24; }
      const hh = HH[hIdx];
      if (clockEl) clockEl.textContent = hh + ':' + (mm < 10 ? '0' + mm : mm);
      const stepIdx = p < 0.15 ? 0 : (p < 0.75 ? 1 : 2);
      if (phaseEl) phaseEl.textContent = stepIdx === 0 ? 'Ponlo' : (stepIdx === 1 ? 'Mientras duermes' : 'Despega');
      setStep(stepIdx);
      if (barFill) barFill.style.width = (p * 100).toFixed(1) + '%';
    }
    setP(0);

    /* ---------- inclinación con el puntero ---------- */
    const tiltTarget = { x: 0, y: 0 };
    const tiltCurrent = { x: 0, y: 0 };
    canvas.addEventListener('pointermove', function (e) {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      tiltTarget.y = nx * deg(8);
      tiltTarget.x = -ny * deg(8);
    });
    canvas.addEventListener('pointerleave', function () { tiltTarget.x = 0; tiltTarget.y = 0; });

    /* ---------- scroll -> progreso ---------- */
    function trackRange() {
      const rect = track.getBoundingClientRect();
      return { rect: rect, total: rect.height - window.innerHeight };
    }
    function scrollProgress() {
      const tr = trackRange();
      return tr.total > 0 ? (-tr.rect.top) / tr.total : (tr.rect.top < 0 ? 1 : 0);
    }
    let scrollQueued = false;
    function onScroll() {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(function () {
        scrollQueued = false;
        if (playAnim) return;
        setP(scrollProgress());
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- botón «ver la noche» ---------- */
    let playAnim = null;
    if (playBtn) {
      playBtn.addEventListener('click', function () {
        const startAt = performance.now();
        const dur = 6000;
        const startP = 0;
        setP(startP);
        playAnim = function (now) {
          const el = (now - startAt) / dur;
          if (el >= 1) {
            setP(1);
            playAnim = null;
            /* Al terminar la animación del botón, la posición real de scroll
               no ha cambiado (el usuario pudo pulsar en cualquier punto del
               recorrido). Si se dejaba así, el primer scroll del usuario
               recalculaba p desde esa posición real y la escena saltaba de
               golpe de p=1 a lo que tocara —justo tras el momento «sorpresa»
               final—. Se sincroniza el scroll real con p=1 para que ambos
               queden coherentes. */
            if (scrollProgress() < 0.995) {
              const tr = trackRange();
              if (tr.total > 0) window.scrollTo({ top: window.scrollY + tr.rect.top + tr.total, behavior: 'smooth' });
            }
            return;
          }
          setP(el);
        };
      });
    }

    /* ---------- bucle bajo demanda ---------- */
    let active = false, rafId = null;
    function loop() {
      rafId = requestAnimationFrame(loop);
      if (playAnim) playAnim(performance.now());
      tiltCurrent.x += (tiltTarget.x - tiltCurrent.x) * 0.09;
      tiltCurrent.y += (tiltTarget.y - tiltCurrent.y) * 0.09;
      if (Math.abs(tiltTarget.x - tiltCurrent.x) > 0.0004 || Math.abs(tiltTarget.y - tiltCurrent.y) > 0.0004 || Math.abs(tiltCurrent.x) > 0.0004 || Math.abs(tiltCurrent.y) > 0.0004) {
        sceneGroup.rotation.x = tiltCurrent.x;
        sceneGroup.rotation.y = tiltCurrent.y;
        needsRender = true;
      }
      if (needsRender) { renderer.render(scene, camera); needsRender = false; }
    }
    function start() { if (!rafId) { active = true; loop(); } }
    function stop() { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } active = false; }

    if ('IntersectionObserver' in window) {
      const vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.isIntersecting ? start() : stop(); });
      }, { threshold: 0.01 });
      vio.observe(root);
    } else { start(); }

    window.addEventListener('pagehide', function () {
      stop();
      try {
        scene.traverse(function (o) {
          if (o.geometry) o.geometry.dispose();
          if (o.material) {
            const mats = Array.isArray(o.material) ? o.material : [o.material];
            mats.forEach(function (m) { m.dispose(); });
          }
        });
        renderer.dispose();
      } catch (e) {}
    });

    canvas.hidden = false;
  }
})();
