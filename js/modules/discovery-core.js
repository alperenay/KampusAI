/* Shared scoped resources: permissions are requested only by explicit user action. */
(function () {
  const esc = App.utils.esc;
  function page(view, id, body) {
    const m = App.data.discovery.modules.find((m) => m[0] === id);
    App.setTitle(m ? m[1] : "Keşif Atölyeleri");
    view.innerHTML =
      '<div class="page discovery"><a href="#/kesif">← Keşif Atölyeleri</a><h1>' +
      esc(m ? m[1] : "Keşif Atölyeleri") +
      '</h1><p class="hint">' +
      esc(m ? m[2] : "Ölç, modelle, açıkla ve kanıtını kaydet.") +
      "</p>" +
      body +
      "</div>";
    const root = view.querySelector(".discovery");
    if (App.onboarding) App.onboarding.attach(root, id);
    return root;
  }
  const input = (id, label, value, min, max, step = "any") =>
    "<label>" +
    esc(label) +
    '<input id="' +
    id +
    '" type="number" value="' +
    value +
    '" min="' +
    min +
    '" max="' +
    max +
    '" step="' +
    step +
    '"></label>';
  const field = (id, label, value = "") =>
    "<label>" +
    esc(label) +
    '<textarea id="' +
    id +
    '" maxlength="16000">' +
    esc(value) +
    "</textarea></label>";
  const button = (id, label) =>
    '<button class="btn" type="button" id="' +
    id +
    '">' +
    esc(label) +
    "</button>";
  function scope(root) {
    let closed = false;
    const cleaners = [],
      controllers = [];
    function release(fn) {
      try {
        const result = fn();
        if (result && typeof result.catch === "function")
          result.catch(() => {});
      } catch (e) {
        /* one failed release must not retain other resources */
      }
    }
    const api = {
      get alive() {
        return !closed && root.isConnected;
      },
      add(fn) {
        if (closed) release(fn);
        else cleaners.push(fn);
      },
      controller() {
        const c = new AbortController();
        controllers.push(c);
        return c;
      },
      close() {
        if (closed) return;
        closed = true;
        document.removeEventListener("visibilitychange", hidden);
        controllers.forEach((c) => c.abort());
        cleaners.splice(0).reverse().forEach(release);
      },
    };
    const hidden = () => {
      if (document.hidden) {
        controllers.forEach((c) => c.abort());
        // Pause resources, not the page itself: controls remain usable on return.
        cleaners.slice().reverse().forEach(release);
      }
    };
    document.addEventListener("visibilitychange", hidden);
    return api;
  }
  function rows(text) {
    const lines = String(text)
      .trim()
      .split(/\n/)
      .filter((x) => x.trim());
    if (lines.length < 2 || lines.length > 4000)
      throw new Error("2–4000 veri satırı gir.");
    return lines.map((line) => {
      const a = line
        .trim()
        .split(/[,;\t ]+/)
        .map(Number);
      if (a.length !== 2 || a.some((x) => !Number.isFinite(x)))
        throw new Error("Her satır: zaman,değer (ondalık nokta).");
      return { t: a[0], y: a[1] };
    });
  }
  function graph(canvas, rows, label = "Değer", fn = null) {
    App.sensorLab.chart(
      canvas,
      [
        { pts: rows.map((p) => [p.t, p.y]), color: "#6f8cff" },
        ...(fn
          ? [{ pts: rows.map((p) => [p.t, fn(p.t)]), color: "#f4b942" }]
          : []),
      ],
      { xName: "t / x", yName: label },
    );
  }
  function download(name, data) {
    App.utils.downloadText(
      name,
      typeof data === "string" ? data : JSON.stringify(data, null, 2),
    );
  }
  function number(root, id, min = -Infinity, max = Infinity) {
    const v = Number(root.querySelector("#" + id).value);
    if (!Number.isFinite(v) || v < min || v > max)
      throw new Error("Geçerli aralıkta bir sayı gir: " + id);
    return v;
  }
  function protect(root, fn) {
    return async () => {
      const status = root.querySelector("[data-status]");
      try {
        await fn();
      } catch (e) {
        if (root.isConnected && status)
          status.textContent = e.message || "İşlem tamamlanamadı.";
      }
    };
  }
  async function motion(life, onSample) {
    const Motion =
      /** @type {typeof DeviceMotionEvent & {requestPermission?: () => Promise<string>}} */ (
        window.DeviceMotionEvent
      );
    if (!Motion)
      throw new Error(
        "Hareket sensörü desteklenmiyor. Elle veri/simülasyon kullan.",
      );
    if (
      typeof Motion.requestPermission === "function" &&
      (await Motion.requestPermission()) !== "granted"
    )
      throw new Error("Hareket izni verilmedi.");
    if (!life.alive || document.hidden) return;
    const t0 = performance.now(),
      handler = (e) => {
        if (!life.alive || document.hidden) return;
        const a = e.accelerationIncludingGravity,
          r = e.rotationRate;
        if (!a || ![a.x, a.y, a.z].every(Number.isFinite)) return;
        onSample({
          t: (performance.now() - t0) / 1000,
          x: a.x,
          y: a.y,
          z: a.z,
          gyro:
            r && [r.alpha, r.beta, r.gamma].every(Number.isFinite)
              ? { x: r.alpha, y: r.beta, z: r.gamma }
              : null,
        });
      };
    window.addEventListener("devicemotion", handler);
    life.add(() => window.removeEventListener("devicemotion", handler));
  }
  async function microphone(life, onImpulse, onFrequency) {
    if (!navigator.mediaDevices?.getUserMedia)
      throw new Error("Mikrofon desteklenmiyor; elle veri kullan.");
    const stream = await App.media.microphone({echoCancellation:false,noiseSuppression:false,autoGainControl:false});
    if (!life.alive || document.hidden) {
      stream.getTracks().forEach((t) => t.stop());
      return;
    }
    life.add(() => stream.getTracks().forEach((t) => t.stop()));
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) throw new Error("Web Audio desteklenmiyor.");
    const ctx = new C();
    life.add(() => ctx.close());
    await ctx.resume();
    if (!life.alive || document.hidden) return;
    const src = ctx.createMediaStreamSource(stream),
      an = ctx.createAnalyser();
    an.fftSize = 4096;
    src.connect(an);
    life.add(() => src.disconnect());
    const frequencies = new Float32Array(an.frequencyBinCount);
    let timer;
    const tick = () => {
      if (!life.alive || document.hidden) return;
      an.getFloatFrequencyData(frequencies);
      let i = 1;
      for (let j = 2; j < frequencies.length; j++)
        if (frequencies[j] > frequencies[i]) i = j;
      if (frequencies[i] > -65 && onFrequency)
        onFrequency(
          (i * ctx.sampleRate) / an.fftSize,
          ctx.sampleRate / an.fftSize,
        );
      timer = setTimeout(tick, 100);
    };
    tick();
    life.add(() => clearTimeout(timer));
    if (ctx.audioWorklet && onImpulse) {
      await ctx.audioWorklet.addModule("assets/audio/impulse-worklet.js");
      if (!life.alive || document.hidden) return;
      const node = new AudioWorkletNode(ctx, "kampus-impulse");
      node.port.onmessage = (e) => {
        if (life.alive && !document.hidden)
          onImpulse({
            ...e.data,
            epoch:
              performance.timeOrigin +
              performance.now() -
              (ctx.currentTime - e.data.time) * 1000,
            sampleRate: ctx.sampleRate,
          });
      };
      src.connect(node);
      const mute = ctx.createGain();
      mute.gain.value = 0;
      node.connect(mute);
      mute.connect(ctx.destination);
      life.add(() => {
        node.port.onmessage = null;
        node.disconnect();
        mute.disconnect();
      });
    } else if (onImpulse)
      throw new Error(
        "Örnek zamanlı darbe algılama için AudioWorklet gerekli; frekans veya elle veri kullan.",
      );
  }
  App.discovery = {
    page,
    input,
    field,
    button,
    scope,
    rows,
    graph,
    download,
    number,
    protect,
    motion,
    microphone,
  };
  App.router.register("kesif", (view) => {
    page(
      view,
      "",
      '<a class="card discovery-tile science-lab-shortcut" href="#/bilim-lab"><h2>Bilim ve Sensör Laboratuvarı</h2><p>Fizik ölçümleri, sensörler ve sismograf artık tek laboratuvarda.</p></a><div class="discovery-grid">' +
        App.data.discovery.modules
          .filter(m => !["telefon-fizik", "sismograf"].includes(m[0]))
          .map(
            (m) =>
              '<a class="card discovery-tile" href="#/' +
              (App.documents ? App.documents.pathFor(m[0]) : m[0]) +
              '"><span data-icon="' +
              m[3] +
              '"></span><h2>' +
              esc(m[1]) +
              "</h2><p>" +
              esc(m[2]) +
              "</p></a>",
          )
          .join("") +
        "</div>",
    );
  });
})();
