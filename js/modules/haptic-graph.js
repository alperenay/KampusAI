(function () {
  function classify(fn, x, tolerance = 0.12) {
    const y = fn(x),
      h = 0.03;
    if (!Number.isFinite(y)) return "gap";
    if (Math.abs(y) < tolerance) return "root";
    if (Math.abs(x) < tolerance) return "axis";
    const a = fn(x - h),
      b = fn(x + h);
    if (
      Number.isFinite(a) &&
      Number.isFinite(b) &&
      (y - a) * (b - y) <= 0 &&
      Math.abs(a - b) < 0.04 &&
      Math.abs(a + b - 2 * y) > 1e-5
    )
      return "extremum";
    return "curve";
  }
  const patterns = {
    curve: [30],
    root: [45, 50, 45],
    extremum: [45, 50, 45],
    axis: [120],
  };
  function render(view) {
    const u = App.discovery,
      m = App.discoveryModel,
      root = u.page(
        view,
        "dokunsal-grafik",
        '<div class="panel"><label>f(x) — radyan; örn. sin(x), x^2-4<input id="hgExpr" value="x^2-4" maxlength="100"></label><div class="controls">' +
          u.input("hgX", "Klavyeyle x konumu", 0, -5, 5, 0.05) +
          u.button("hgDraw", "Grafiği çiz") +
          u.button("hgAudio", "Sesli ipucu: kapalı") +
          '</div><p class="hint">Grafiğin üzerinde parmağını gezdir. Klavyede oklar x’i değiştirir. Eğri kesişimi kısa; kök ve tepe çift; y ekseni uzun titreşimdir. Cihaz şiddeti ayarlanamaz. Titreşimsiz cihazlarda metin ve isteğe bağlı ses bulunur.</p><canvas id="hgCanvas" width="900" height="450" tabindex="0" role="img" aria-label="Dokunsal fonksiyon grafiği; ok tuşlarıyla gezin"></canvas><output id="hgRead" class="reading" aria-live="polite"></output><p data-status role="status"></p></div>',
      );
    const $ = (id) => root.querySelector("#" + id),
      life = u.scope(root);
    let sound = false,
      last = 0,
      fn = (x) => m.expression("x^2-4", x),
      curveNear = false;
    function draw() {
      fn = (x) => m.expression($("hgExpr").value, x);
      fn(1);
      const c = $("hgCanvas"),
        ctx = c.getContext("2d");
      ctx.clearRect(0, 0, 900, 450);
      ctx.strokeStyle = "#607080";
      ctx.beginPath();
      ctx.moveTo(0, 225);
      ctx.lineTo(900, 225);
      ctx.moveTo(450, 0);
      ctx.lineTo(450, 450);
      ctx.stroke();
      ctx.strokeStyle = "#87bcff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      let prior = null;
      for (let i = 0; i <= 900; i++) {
        const x = i / 90 - 5,
          y = fn(x),
          p = 225 - y * 22.5;
        if (!Number.isFinite(p) || Math.abs(p) > 2000) {
          prior = null;
          continue;
        }
        if (prior !== null && Math.abs(p - prior) < 180) ctx.lineTo(i, p);
        else ctx.moveTo(i, p);
        prior = p;
      }
      ctx.stroke();
    }
    function announce(x, force = false, near = true) {
      const y = fn(x),
        type = classify(fn, x);
      $("hgRead").textContent =
        "x = " +
        x.toFixed(2) +
        "; y = " +
        (Number.isFinite(y) ? y.toFixed(2) : "tanımsız") +
        " · " +
        {
          root: "Kök / x ekseni",
          axis: "y ekseni",
          extremum: "Yerel ekstremum adayı",
          curve: "Eğri",
          gap: "Tanımsız nokta",
        }[type];
      if (
        (force || (near && !curveNear)) &&
        Date.now() - last > 180 &&
        type !== "gap"
      ) {
        last = Date.now();
        if (navigator.vibrate) navigator.vibrate(patterns[type]);
        if (sound) App.speech.say($("hgRead").textContent, { lang: "tr" });
      }
      curveNear = near;
    }
    $("hgDraw").onclick = u.protect(root, draw);
    $("hgAudio").onclick = () => {
      sound = !sound;
      $("hgAudio").textContent = "Sesli ipucu: " + (sound ? "açık" : "kapalı");
    };
    $("hgX").oninput = u.protect(root, () =>
      announce(u.number(root, "hgX", -5, 5), true),
    );
    $("hgCanvas").onpointermove = u.protect(root, () => {});
    $("hgCanvas").addEventListener("pointermove", (e) => {
      try {
        const r = $("hgCanvas").getBoundingClientRect(),
          x = ((e.clientX - r.left) / r.width) * 10 - 5,
          y = 5 - ((e.clientY - r.top) / r.height) * 10;
        announce(x, false, Math.abs(fn(x) - y) < 0.25);
      } catch (err) {
        root.querySelector("[data-status]").textContent = err.message;
      }
    });
    $("hgCanvas").onkeydown = (e) => {
      if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        $("hgX").value = String(
          Math.max(
            -5,
            Math.min(
              5,
              Number($("hgX").value) + (e.key === "ArrowRight" ? 0.05 : -0.05),
            ),
          ),
        );
        try {
          announce(Number($("hgX").value), true);
        } catch (err) {
          root.querySelector("[data-status]").textContent = err.message;
        }
      }
    };
    draw();
    announce(0);
    root.querySelector("[data-status]").textContent = navigator.vibrate
      ? "Titreşim API’si var; işletim sistemi titreşimi engelleyebilir."
      : "Bu cihazda titreşim yok; metin/sesle keşfet.";
    life.add(() => {
      if (navigator.vibrate) navigator.vibrate(0);
      App.speech.stopSaying();
    });
    return () => life.close();
  }
  App.hapticGraph = { classify, patterns };
  App.router.register("dokunsal-grafik", render);
})();
