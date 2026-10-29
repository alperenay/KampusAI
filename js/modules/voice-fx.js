/* =========================================================
   voice-fx.js — sesli öğretmen küresinin canlı görseli (v1.56)

   Tek bir <canvas>, requestAnimationFrame döngüsü; DOM her karede değişmez.
     idle      : yavaş dönen iki halka
     listening : mikrofon genliğiyle bükülen sıvı dalga
     thinking  : giderek hızlanan veri parçacıkları
     speaking  : okunan sesin seviyesiyle (App.speech.level) atan aura ve spektrum çubukları
     paused / error : sönük, durağan halka
   Sayfa gizliyken ya da küre görünmezken çizim durur; hareket azaltmada her durum
   tek bir durağan kare olarak çizilir.

   App.voiceFx.attach(canvas, () => ({ phase, mic })) → { stop() }
   ========================================================= */
(function () {
  const TAU = Math.PI * 2;
  const mobileFx = matchMedia("(max-width: 860px), (pointer: coarse)").matches;
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.hasAttribute("data-a11y-motion");

  /** "#rrggbb" ya da "rgb(...)" → [r,g,b] */
  function rgb(color, fallback) {
    const c = String(color || "").trim();
    let m = c.match(/^#([0-9a-f]{6})$/i);
    if (m) return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16));
    m = c.match(/rgba?\(([^)]+)\)/i);
    if (m) return m[1].split(",").slice(0, 3).map((x) => Number(x.trim()) || 0);
    return fallback;
  }

  function attach(canvas, state) {
    const g = canvas.getContext("2d");
    if (!g) return { stop() {} };
    const css = getComputedStyle(document.documentElement);
    const accent = rgb(css.getPropertyValue("--accent"), [124, 108, 255]);
    const cyan = [86, 214, 255], good = rgb(css.getPropertyValue("--good"), [70, 200, 130]), bad = rgb(css.getPropertyValue("--bad"), [230, 80, 90]);
    const col = (c, a) => "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")";
    const parts = Array.from({ length: 26 }, (_, i) => ({ a: (i / 26) * TAU, r: 0.62 + ((i * 37) % 11) / 40, s: 0.6 + ((i * 53) % 7) / 10 }));
    let raf = 0, on = true, last = performance.now(), t = 0, phase = "", phaseAt = 0, mic = 0, speech = 0, spin = 0;

    function size() {
      const dpr = Math.min(mobileFx ? 1.5 : 2, window.devicePixelRatio || 1), w = canvas.clientWidth || 200, h = canvas.clientHeight || 200;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
      return { w: canvas.width, h: canvas.height };
    }

    function draw(now) {
      const st = state() || {};
      if (st.phase !== phase) { phase = st.phase || "idle"; phaseAt = now; }
      const { w, h } = size();
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.28, edge = Math.min(w, h) / 2 - 1;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now; t += dt;
      // Seviyeler yumuşatılır: titremesiz ama gecikmesiz
      mic += ((Number(st.mic) || 0) - mic) * Math.min(1, dt * 14);
      const sp = phase === "speaking" && App.speech && App.speech.level ? App.speech.level() : 0;
      speech += (sp - speech) * Math.min(1, dt * (sp > speech ? 22 : 8));
      g.clearRect(0, 0, w, h);
      g.lineCap = "round";

      const hue = phase === "speaking" ? good : phase === "error" ? bad : accent;
      // Çekirdek parıltısı
      const glowR = R * (1.25 + (phase === "speaking" ? speech * 0.55 : phase === "listening" ? mic * 0.4 : 0.05 * Math.sin(t * 1.6)));
      const outer = Math.min(edge, glowR * 1.35);   // kare tuvalin kenarında kesilmesin
      const glow = g.createRadialGradient(cx, cy, R * 0.2, cx, cy, outer);
      glow.addColorStop(0, col(hue, phase === "paused" ? 0.12 : 0.34));
      glow.addColorStop(0.55, col(cyan, phase === "paused" ? 0.03 : 0.1));
      glow.addColorStop(1, col(hue, 0));
      g.fillStyle = glow;
      g.beginPath(); g.arc(cx, cy, outer, 0, TAU); g.fill();

      if (phase === "listening") {
        // Sıvı dalga: üç harmonik, genlik mikrofonla
        for (let k = 0; k < 3; k++) {
          g.beginPath();
          const amp = R * (0.04 + mic * 0.24) * (1 - k * 0.25);
          for (let i = 0; i <= 96; i++) {
            const a = (i / 96) * TAU;
            const r = R * (1.02 + k * 0.08) + amp * Math.sin(a * (3 + k) + t * (2.2 + k)) + amp * 0.5 * Math.sin(a * 7 - t * 3.1);
            const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
            if (i) g.lineTo(x, y); else g.moveTo(x, y);
          }
          g.strokeStyle = col(k === 1 ? cyan : accent, 0.75 - k * 0.2);
          g.lineWidth = (2.2 - k * 0.5) * (w / 200);
          g.stroke();
        }
      } else if (phase === "thinking") {
        // Parçacıklar: düşünme sürdükçe hızlanır
        const speed = 1.2 + Math.min(3.5, (now - phaseAt) / 900);
        spin += dt * speed;
        parts.forEach((p, i) => {
          const a = p.a + spin * p.s * (i % 2 ? 1 : -0.7);
          const r = R * (p.r + 0.08 * Math.sin(t * 3 + i));
          g.fillStyle = col(i % 3 ? accent : cyan, 0.55 + 0.4 * Math.sin(t * 5 + i));
          g.beginPath(); g.arc(cx + Math.cos(a) * r * 1.5, cy + Math.sin(a) * r * 1.5, (1.4 + (i % 3)) * (w / 200), 0, TAU); g.fill();
        });
        ring(R * 1.18, spin * 1.4, 0.55, accent, [R * 0.35, R * 0.2]);
      } else if (phase === "speaking") {
        // Spektrum çubukları: seviye ve dönen dalga
        const bars = 48;
        for (let i = 0; i < bars; i++) {
          const a = (i / bars) * TAU - Math.PI / 2;
          const wobble = 0.55 + 0.45 * Math.sin(i * 1.7 + t * 9) * Math.sin(i * 0.45 - t * 4);
          const len = R * (0.08 + speech * 0.6 * Math.abs(wobble));
          const r0 = R * 1.08;
          g.strokeStyle = col(i % 2 ? good : cyan, 0.5 + speech * 0.5);
          g.lineWidth = 2.4 * (w / 200);
          g.beginPath();
          g.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
          g.lineTo(cx + Math.cos(a) * (r0 + len), cy + Math.sin(a) * (r0 + len));
          g.stroke();
        }
      } else {
        // idle / paused / error: yavaş halkalar
        const slow = phase === "idle" ? 1 : 0;
        ring(R * 1.12, t * 0.35 * slow, phase === "paused" ? 0.25 : 0.6, hue, [R * 0.6, R * 0.25]);
        ring(R * 1.3, -t * 0.22 * slow, phase === "paused" ? 0.15 : 0.35, cyan, [R * 0.15, R * 0.35]);
      }
    }
    function ring(r, rot, alpha, c, dash) {
      const w = canvas.width;
      g.save();
      g.translate(canvas.width / 2, canvas.height / 2);
      g.rotate(rot);
      g.setLineDash(dash);
      g.strokeStyle = col(c, alpha);
      g.lineWidth = 1.6 * (w / 200);
      g.beginPath(); g.arc(0, 0, r, 0, TAU); g.stroke();
      g.restore();
    }

    let lastMobileFrame = 0;
    function loop(now) {
      if (!on) return;
      raf = 0;
      if (!canvas.isConnected) { api.stop(); return; }
      const visible = !document.hidden && canvas.offsetParent !== null;
      // Android WebView: cap costly gradient/canvas work to ~30 fps,
      // while keeping the existing desktop 60 fps behaviour.
      if (visible && (!mobileFx || now - lastMobileFrame >= 33)) {
        lastMobileFrame = now;
        draw(now);
      }
      if (reduced()) { quiet(); return; }
      raf = requestAnimationFrame(loop);
    }
    // Hareket azaltma: yalnız durum değişince tek kare çizilir
    let quietTimer = 0, quietPhase = null;
    function quiet() {
      clearInterval(quietTimer);
      quietTimer = setInterval(() => {
        if (!on) return;
        if (!reduced()) { clearInterval(quietTimer); raf = requestAnimationFrame(loop); return; }
        const p = (state() || {}).phase;
        if (p !== quietPhase) { quietPhase = p; draw(performance.now()); }
      }, 250);
    }
    const api = { stop() { on = false; cancelAnimationFrame(raf); clearInterval(quietTimer); } };
    raf = requestAnimationFrame(loop);
    return api;
  }

  App.voiceFx = { attach };
})();
