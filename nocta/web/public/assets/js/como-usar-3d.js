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
    import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js')
      .then(function (THREE) {
        try { runScene(THREE); }
        catch (e) { toFallback(); }
      })
      .catch(function () { toFallback(); });
  }

  if ('IntersectionObserver' in window) {
    const boo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { boot(); boo.disconnect(); } });
    }, { rootMargin: '100% 0px 100% 0px' });
    boo.observe(track);
  } else {
    boot();
  }

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
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch (e) { toFallback(); return; }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    if ('outputColorSpace' in renderer) renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 1, 2000);
    const target = new THREE.Vector3(0, 8, 4);
    const viewDir = new THREE.Vector3(0, 0.62, 1).normalize();

    /* ---------- luz ---------- */
    const hemi = new THREE.HemisphereLight(0xfff6e8, 0xd9ccbb, 0.9);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(30, 60, 40);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -70; key.shadow.camera.right = 70;
    key.shadow.camera.top = 70; key.shadow.camera.bottom = -70;
    key.shadow.camera.near = 10; key.shadow.camera.far = 220;
    key.shadow.bias = -0.002;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xfff1de, 0.32);
    fill.position.set(-50, 24, 18);
    scene.add(fill);

    /* ---------- grupo raíz (tilt) ---------- */
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    /* ---------- piel ---------- */
    const SKIN_W = 96, SKIN_H = 22, SKIN_D = 64;
    const skinTopY = SKIN_H / 2;
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xE7C8B4, roughness: 0.8 });
    const skinMesh = new THREE.Mesh(new THREE.BoxGeometry(SKIN_W, SKIN_H, SKIN_D, 4, 2, 4), skinMat);
    skinMesh.position.y = 0;
    skinMesh.receiveShadow = true;
    sceneGroup.add(skinMesh);

    /* ---------- poros: 7 ranuras + filamentos ---------- */
    const N_PORES = 7;
    const poreXs = [];
    for (let i = 0; i < N_PORES; i++) poreXs.push(-24 + i * 8);
    const poreFrontZ = SKIN_D / 2 - 2; /* casi al filo de la cara frontal (corte) */
    const slotMat = new THREE.MeshStandardMaterial({ color: 0xB58A74, roughness: 0.95 });
    const filMat = new THREE.MeshStandardMaterial({ color: 0xEAD79F, roughness: 0.55 });
    const dotMat = new THREE.MeshStandardMaterial({ color: 0x8A6650, roughness: 0.9 });
    const filaments = [];

    poreXs.forEach(function (x) {
      const slot = new THREE.Mesh(new THREE.BoxGeometry(1.6, 7, 2.4), slotMat);
      slot.position.set(x, skinTopY - 4.2, poreFrontZ);
      sceneGroup.add(slot);

      const dot = new THREE.Mesh(new THREE.CircleGeometry(0.9, 20), dotMat);
      dot.rotation.x = -Math.PI / 2;
      dot.position.set(x, skinTopY + 0.03, poreFrontZ - 1.5);
      sceneGroup.add(dot);

      const fil = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 6, 10), filMat);
      fil.position.set(x, skinTopY - 5, poreFrontZ - 1.5);
      fil.castShadow = true;
      sceneGroup.add(fil);
      filaments.push({ mesh: fil, x: x, z: poreFrontZ - 1.5, baseY: skinTopY - 5 });
    });

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
    const patchMat = new THREE.MeshPhysicalMaterial({ color: 0xF1E7D8, roughness: 0.35, transmission: 0.5, thickness: 0.8, clearcoat: 0.4, transparent: true, opacity: 0.96, side: THREE.DoubleSide });
    const patchMesh = new THREE.Mesh(patchGeo, patchMat);
    patchMesh.castShadow = true;
    patchMesh.receiveShadow = true;
    /* aplana el parche (Z de extrusión -> Y arriba) y orienta puente-atrás / punta-adelante */
    patchMesh.rotateX(-Math.PI / 2);
    patchMesh.rotateY(Math.PI);

    const restY = skinTopY;
    const patchRestZ = 12;
    const hingeZ = patchRestZ - 22.5; /* borde del puente: el gozne */
    const patchLocalZ = patchRestZ - hingeZ; /* = 22.5 */

    const hinge = new THREE.Group();
    hinge.position.set(0, restY + 40, hingeZ);
    patchMesh.position.set(0, 0, patchLocalZ);
    hinge.add(patchMesh);

    /* discos blancos: grasa absorbida, pegados a la cara inferior del parche */
    const discMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.9 });
    const discs = [];
    poreXs.forEach(function (x, i) {
      const disc = new THREE.Mesh(new THREE.CircleGeometry(1.4, 20), discMat);
      disc.rotation.x = Math.PI / 2;
      disc.position.set(x, 0.06, patchLocalZ + (filaments[i].z - patchRestZ));
      disc.scale.setScalar(0.001);
      hinge.add(disc);
      discs.push(disc);
    });
    sceneGroup.add(hinge);

    /* ---------- cámara: encaje responsive ---------- */
    function fitCamera() {
      const el = stage;
      const w = el.clientWidth || 1, h = el.clientHeight || 1;
      const aspect = w / h;
      camera.aspect = aspect;
      const vFov = deg(32) / 2;
      const halfH = 20, halfW = 52;
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

    /* ---------- interpolación por progreso ---------- */
    let needsRender = true;
    let currentP = -1;
    const HH = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

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
      hinge.rotation.z = (1 - dropT) * 0.32;
      const squash = 1 - 0.12 * Math.sin(Math.PI * pressT);
      patchMesh.scale.set(1, squash, 1);

      /* apertura al final de la noche */
      hinge.rotation.x = -deg(75) * openT;

      /* filamentos y grasa absorbida */
      const span = 1 - (N_PORES - 1) * 0.06;
      filaments.forEach(function (f, i) {
        const stagger = i * 0.06;
        const local = smoothstep(0, 1, Math.min(1, Math.max(0, (nightT - stagger) / span)));
        f.mesh.position.y = f.baseY + local * 6.4;
        f.mesh.scale.y = lerp(0.35, 1.15, local);
        const d = discs[i];
        d.scale.setScalar(Math.max(0.001, local));
      });

      /* luz: noche cerrada a mitad del intervalo, amanece al final */
      const lightF = 1 - 0.32 * Math.sin(Math.PI * nightT);
      hemi.intensity = 0.9 * lightF;
      key.intensity = 1.1 * lightF;

      /* reloj y fase */
      const hoursFloat = 23 + nightT * 8;
      const hh = HH[Math.floor(hoursFloat) % 24];
      const mm = Math.round((hoursFloat % 1) * 60);
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
    let scrollQueued = false;
    function onScroll() {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(function () {
        scrollQueued = false;
        if (playAnim) return;
        const rect = track.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = total > 0 ? (-rect.top) / total : (rect.top < 0 ? 1 : 0);
        setP(p);
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
          if (el >= 1) { setP(1); playAnim = null; return; }
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
