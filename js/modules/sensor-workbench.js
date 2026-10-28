/* Multi-sensor acquisition. Device and explicitly selected simulation never mix. */
(function () {
  const { esc, downloadText } = App.utils,
    T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const CHANNELS = {
    accel: {
      label: "İvmeölçer",
      en: "Accelerometer",
      unit: "m/s²",
      limit: 20,
      vector: true,
    },
    gyro: {
      label: "Jiroskop",
      en: "Gyroscope",
      unit: "°/s",
      limit: 90,
      vector: true,
    },
    light: {
      label: "Ortam ışığı",
      en: "Ambient light",
      unit: "lux",
      limit: 500,
    },
    magnetic: {
      label: "Manyetometre",
      en: "Magnetometer",
      unit: "µT",
      limit: 100,
      vector: true,
    },
    sound: {
      label: "Ses seviyesi",
      en: "Sound level",
      unit: "dBFS",
      limit: -15,
    },
    // v1.51: yer çekimi çıkarılmış ivme (DeviceMotion acceleration) ve cihaz yönelimi (DeviceOrientation)
    linear: {
      label: "Doğrusal ivme (yer çekimsiz)",
      en: "Linear acceleration (no gravity)",
      unit: "m/s²",
      limit: 5,
      vector: true,
    },
    orient: {
      label: "Yönelim / eğim açısı",
      en: "Orientation / tilt",
      unit: "°",
      limit: 45,
      vector: true,
    },
  };
  /* ---------- Ölçüm metrikleri (v1.51) ----------
     n, ortalama örnekleme hızı, en küçük/en büyük, ortalama, standart sapma, RMS, tepeden tepeye ve
     baskın frekans (ortalamadan histerezisli yukarı geçişler; titreşim/salınım için yaklaşık). */
  function stats(samples, vector) {
    const v = samples.map((s) => magnitude(s, vector)).filter(Number.isFinite);
    if (v.length < 2) return null;
    const n = v.length, mean = v.reduce((a, b) => a + b, 0) / n;
    const sd = Math.sqrt(v.reduce((a, b) => a + (b - mean) * (b - mean), 0) / n);
    const rms = Math.sqrt(v.reduce((a, b) => a + b * b, 0) / n);
    const min = Math.min(...v), max = Math.max(...v);
    const dur = samples[samples.length - 1].t - samples[0].t;
    // Frekans: ilk ve son yukarı geçiş arasındaki tam periyotlar (geçiş anı doğrusal aradeğerlemeyle)
    const h = sd * 0.3, ups = [];
    let armed = false;
    for (let i = 1; i < n; i++) {
      if (v[i] < mean - h) armed = true;
      if (armed && v[i - 1] < mean && v[i] >= mean) {
        const k = (mean - v[i - 1]) / (v[i] - v[i - 1]);
        ups.push(samples[i - 1].t + k * (samples[i].t - samples[i - 1].t)); armed = false;
      }
    }
    const span = ups.length >= 3 ? ups[ups.length - 1] - ups[0] : 0;
    return { n, rate: dur > 0 ? (n - 1) / dur : 0, min, max, mean, sd, rms, p2p: max - min, freq: span > 0 && sd > 1e-9 ? (ups.length - 1) / span : null };
  }
  /** Değerlerin histogramı: bins adet eşit aralık → [{ from, to, n }] */
  function histogram(values, bins) {
    const v = values.filter(Number.isFinite);
    if (!v.length) return [];
    const lo = Math.min(...v), hi = Math.max(...v), k = bins || 12, w = (hi - lo) / k || 1;
    const out = Array.from({ length: k }, (_, i) => ({ from: lo + i * w, to: lo + (i + 1) * w, n: 0 }));
    v.forEach((x) => { out[Math.min(k - 1, Math.floor((x - lo) / w))].n++; });
    return out;
  }
  function validSample(s) {
    return (
      !!s &&
      typeof s === "object" &&
      s.t >= 0 &&
      ["t", "x", "y", "z"].every((k) => Number.isFinite(s[k]))
    );
  }
  function magnitude(s, vector) {
    return vector ? Math.hypot(s.x, s.y, s.z) : s.x;
  }
  function packet(sensor, source, samples, at) {
    if (
      !CHANNELS[sensor] ||
      !["device", "simulation"].includes(source) ||
      !Array.isArray(samples) ||
      !Number.isFinite(Date.parse(at)) ||
      samples.some(
        (s, i) => !validSample(s) || (i > 0 && s.t < samples[i - 1].t),
      )
    )
      throw new Error("Invalid sensor data");
    return {
      schema: 1,
      sensor,
      source,
      unit: CHANNELS[sensor].unit,
      startedAt: at,
      samples: samples.map((s) => ({ t: s.t, x: s.x, y: s.y, z: s.z })),
    };
  }
  const csv = (p) =>
    "time_s,x,y,z,unit,source\n" +
    p.samples
      .map((s) => [s.t, s.x, s.y, s.z, p.unit, p.source].join(","))
      .join("\n");
  function page(view) {
    App.setTitle(T("Çoklu Sensör Ölçümü", "Multi-sensor Measurements"));
    let stopFn = null,
      epoch = 0,
      alive = true,
      running = false,
      pending = false,
      rows = [],
      session = null,
      t0 = 0,
      raf = 0,
      lastSample = -Infinity;
    view.innerHTML =
      '<div class="page sw"><a href="#/sensor">← ' +
      T("Sensör Laboratuvarı", "Sensor Lab") +
      "</a><h1>" +
      T("Çoklu Sensör Ölçümü", "Multi-sensor Measurements") +
      "</h1><p>" +
      T(
        "Gerçek ölçüm veya açıkça etiketli simülasyon seç. Donanım desteklenmiyorsa simülasyona kendin geçebilirsin.",
        "Choose device measurements or explicitly labelled simulation. Switch to simulation yourself if hardware is unavailable.",
      ) +
      '</p><section class="card sw-controls"><label class="field">' +
      T("Sensör", "Sensor") +
      '<select id="swSensor" class="select">' +
      Object.entries(CHANNELS)
        .map(
          ([k, c]) =>
            '<option value="' + k + '">' + esc(T(c.label, c.en)) + "</option>",
        )
        .join("") +
      '</select></label><label class="field">' +
      T("Görünüm", "View") +
      '<select id="swView" class="select"><option value="time">' + T("Zaman grafiği (x, y, z)", "Time chart (x, y, z)") +
      '</option><option value="mag">' + T("Büyüklük |v|", "Magnitude |v|") +
      '</option><option value="hist">' + T("Dağılım (histogram)", "Distribution (histogram)") +
      '</option></select></label><label class="field">' +
      T("Veri kaynağı", "Data source") +
      '<select id="swSource" class="select"><option value="device">' +
      T("Gerçek cihaz", "Device") +
      '</option><option value="simulation">' +
      T("Simülasyon · ölçüm değildir", "Simulation · not a measurement") +
      '</option></select></label><label class="field">' +
      T("Uyarı eşiği", "Alert threshold") +
      '<input class="input" type="number" id="swLimit" value="20" step="any"></label><div id="swSim" hidden><p>' +
      T(
        "Simülasyon girişleri: x, y, z. Seçilen sensörün birimini kullan.",
        "Simulation inputs: x, y, z in the selected sensor unit.",
      ) +
      "</p>" +
      ["x", "y", "z"]
        .map(
          (v, i) =>
            '<label class="field">' +
            v +
            '<input class="input" data-sw-axis="' +
            v +
            '" type="number" step="any" value="' +
            (i === 0 ? 1 : 0) +
            '"></label>',
        )
        .join("") +
      '</div><div class="sw-actions"><button class="btn btn--primary" id="swStart">' +
      T("Başlat", "Start") +
      '</button><button class="btn" id="swStop" disabled>' +
      T("Durdur", "Stop") +
      '</button><button class="btn" id="swCSV" disabled>CSV</button><button class="btn" id="swJSON" disabled>JSON</button></div></section><section class="card"><p id="swStatus" role="status"></p><p class="hint" id="swUnit"></p><canvas id="swChart" class="sl-cv" height="240" aria-label="' +
      T("Sensör zaman grafiği", "Sensor time chart") +
      '"></canvas><p id="swValue" aria-live="off"></p><dl id="swStats" class="sw-stats" aria-label="' + T("Ölçüm metrikleri", "Measurement metrics") + '"></dl><p id="swAlert" role="status"></p></section><p class="hint">' +
      T(
        "En fazla son 600 örnek saklanır. Ses dBFS: kalibre edilmemiş dijital seviye, dB SPL değildir. Ortam ışığı yalnız gerçek ışık sensörü desteklenirse lux ölçer; kamera parlaklığı bu ölçüm yerine kullanılmaz. Manyetik değerler pusula doğruluğu garantisi vermez.",
        "Only the last 600 samples are retained. Audio uses uncalibrated digital dBFS, not dB SPL. Lux requires an ambient-light sensor; camera brightness is not substituted. Magnetic readings do not guarantee compass accuracy.",
      ) +
      "</p></div>";
    const $ = (s) => view.querySelector(s),
      status = $("#swStatus");
    function stop() {
      epoch++;
      pending = false;
      running = false;
      if (stopFn) {
        const f = stopFn;
        stopFn = null;
        try { f(); } catch (e) { /* A sensor may already have disconnected. */ }
      }
      cancelAnimationFrame(raf);
      if (alive) {
        $("#swStart").disabled = false;
        $("#swStop").disabled = true;
        $("#swSensor").disabled = false;
        $("#swSource").disabled = false;
      }
    }
    function label() {
      const c = CHANNELS[$("#swSensor").value];
      $("#swUnit").textContent = T(c.label, c.en) + " · " + c.unit;
      $("#swLimit").value = c.limit;
      $("#swSim").hidden = $("#swSource").value !== "simulation";
    }
    function add(x, y = 0, z = 0) {
      if (!alive || !running || performance.now() - lastSample < 80) return;
      const s = {
        t: Number(((performance.now() - t0) / 1000).toFixed(3)),
        x,
        y,
        z,
      };
      if (!validSample(s)) return;
      lastSample = performance.now();
      rows.push(s);
      if (rows.length > 600) rows.shift();
      const c = CHANNELS[session.sensor],
        v = magnitude(s, c.vector);
      $("#swValue").textContent =
        (c.vector
          ? "x=" +
            x.toFixed(2) +
            " · y=" +
            y.toFixed(2) +
            " · z=" +
            z.toFixed(2) +
            " · |v|="
          : "") +
        v.toFixed(2) +
        " " +
        c.unit;
      const limit = $("#swLimit").value.trim()
        ? Number($("#swLimit").value)
        : NaN;
      $("#swAlert").textContent =
        Number.isFinite(limit) && v > limit
          ? T("Eşik aşıldı.", "Threshold exceeded.")
          : "";
      $("#swAlert").classList.toggle(
        "sw-warning",
        Number.isFinite(limit) && v > limit,
      );
      draw();
      if (rows.length % 4 === 0) paintStats();
      $("#swCSV").disabled = false;
      $("#swJSON").disabled = false;
    }
    function draw() {
      if (!session) return;
      const c = CHANNELS[session.sensor], mode = $("#swView").value, cv = $("#swChart");
      if (mode === "hist") {
        const bins = histogram(rows.map((s) => magnitude(s, c.vector)), 14);
        App.sensorLab.chart(cv, bins.length ? [{ pts: bins.flatMap((b) => [[b.from, 0], [b.from, b.n], [b.to, b.n], [b.to, 0]]), color: "accent", w: 2 }] : [], { xName: (c.vector ? "|v| " : "") + "(" + c.unit + ")", yName: T("örnek", "samples"), y0: 0 });
        return;
      }
      if (mode === "mag") {
        App.sensorLab.chart(cv, [{ pts: rows.map((s) => [s.t, magnitude(s, c.vector)]), color: "accent" }], { xName: "t (s)", yName: (c.vector ? "|v| " : "") + c.unit });
        return;
      }
      App.sensorLab.chart(
        cv,
        [
          { pts: rows.map((s) => [s.t, s.x]) },
          ...(c.vector
            ? [
                { pts: rows.map((s) => [s.t, s.y]), color: "good" },
                { pts: rows.map((s) => [s.t, s.z]), color: "warn" },
              ]
            : []),
        ],
        { xName: "t (s)", yName: c.unit },
      );
    }
    function paintStats() {
      const box = $("#swStats");
      if (!session || !box) return;
      const c = CHANNELS[session.sensor], st = stats(rows, c.vector);
      if (!st) { box.innerHTML = ""; return; }
      const f = (x, d) => (x == null || !Number.isFinite(x) ? "—" : x.toFixed(d == null ? 2 : d));
      const item = (k, v) => "<div><dt>" + esc(k) + "</dt><dd>" + v + "</dd></div>";
      box.innerHTML =
        item(T("Örnek", "Samples"), st.n + " · " + f(st.rate, 1) + " Hz") +
        item(T("Ortalama", "Mean"), f(st.mean) + " " + esc(c.unit)) +
        item(T("Std. sapma", "Std dev"), f(st.sd) + " " + esc(c.unit)) +
        item("RMS", f(st.rms) + " " + esc(c.unit)) +
        item(T("En küçük / en büyük", "Min / max"), f(st.min) + " / " + f(st.max)) +
        item(T("Tepeden tepeye", "Peak to peak"), f(st.p2p) + " " + esc(c.unit)) +
        item(T("Baskın frekans", "Dominant frequency"), st.freq ? f(st.freq) + " Hz · T ≈ " + f(1 / st.freq) + " s" : T("salınım yok", "no oscillation"));
    }
    async function start() {
      if (pending || running) return;
      const sensor = $("#swSensor").value,
        source = $("#swSource").value;
      if (
        !$("#swLimit").value.trim() ||
        !Number.isFinite(Number($("#swLimit").value))
      ) {
        status.textContent = T(
          "Geçerli bir eşik gir.",
          "Enter a valid threshold.",
        );
        return;
      }
      stop();
      const mine = epoch;
      pending = true;
      $("#swStart").disabled = true;
      $("#swStop").disabled = false;
      $("#swSensor").disabled = true;
      $("#swSource").disabled = true;
      rows = [];
      lastSample = -Infinity;
      $("#swCSV").disabled = true;
      $("#swJSON").disabled = true;
      session = { sensor, source, at: new Date().toISOString() };
      $("#swValue").textContent = "";
      $("#swAlert").textContent = "";
      $("#swStats").innerHTML = "";
      App.sensorLab.chart($("#swChart"), [], {xName:"t (s)",yName:CHANNELS[sensor].unit});
      t0 = performance.now();
      const gone = () => !alive || mine !== epoch;
      try {
        if (source === "simulation") {
          running = true;
          const timer = setInterval(() => {
            const vals = [...view.querySelectorAll("[data-sw-axis]")].map(
              (i) => (i.value.trim() ? Number(i.value) : NaN),
            );
            if (vals.every(Number.isFinite)) add(vals[0], vals[1], vals[2]);
            else
              status.textContent = T(
                "Simülasyon için sonlu sayılar gir.",
                "Enter finite simulation values.",
              );
          }, 100);
          stopFn = () => clearInterval(timer);
        } else if (sensor === "orient") {
          const O =
            /** @type {typeof DeviceOrientationEvent & {requestPermission?: () => Promise<string>}} */ (
              window.DeviceOrientationEvent
            );
          if (!O)
            throw new Error(T("Yönelim sensörü desteklenmiyor.", "Orientation sensor unavailable."));
          if (O.requestPermission && (await O.requestPermission()) !== "granted")
            throw new Error(T("Sensör izni verilmedi.", "Sensor permission denied."));
          if (gone()) return;
          running = true;
          // alpha: pusula yönü, beta: öne-arkaya eğim, gamma: sağa-sola eğim (derece)
          const fn = (e) => {
            if ([e.alpha, e.beta, e.gamma].every(Number.isFinite)) add(e.alpha, e.beta, e.gamma);
          };
          window.addEventListener("deviceorientation", fn);
          stopFn = () => window.removeEventListener("deviceorientation", fn);
        } else if (sensor === "accel" || sensor === "gyro" || sensor === "linear") {
          const C =
            /** @type {typeof DeviceMotionEvent & {requestPermission?: () => Promise<string>}} */ (
              window.DeviceMotionEvent
            );
          if (!C)
            throw new Error(
              T(
                "Hareket sensörü desteklenmiyor.",
                "Motion sensor unavailable.",
              ),
            );
          if (
            C.requestPermission &&
            (await C.requestPermission()) !== "granted"
          )
            throw new Error(
              T("Sensör izni verilmedi.", "Sensor permission denied."),
            );
          if (gone()) return;
          running = true;
          const fn = (e) => {
            const v =
              sensor === "accel"
                ? e.accelerationIncludingGravity
                : sensor === "linear"
                  ? e.acceleration
                  : e.rotationRate;
            if (!v) return;
            const keys =
              sensor === "gyro" ? ["alpha", "beta", "gamma"] : ["x", "y", "z"];
            if (keys.every((k) => Number.isFinite(v[k])))
              add(...keys.map((k) => v[k]));
          };
          window.addEventListener("devicemotion", fn);
          stopFn = () => window.removeEventListener("devicemotion", fn);
        } else if (sensor === "sound") {
          const Audio = window.AudioContext || window.webkitAudioContext;
          if (!Audio || !navigator.mediaDevices)
            throw new Error(
              T(
                "Mikrofon/ses API desteklenmiyor.",
                "Microphone/audio API unavailable.",
              ),
            );
          const stream = await App.media.microphone(true);
          if (gone()) {
            stream.getTracks().forEach((t) => t.stop());
            return;
          }
          let ac;
          try {
            ac = new Audio();
            await App.media.resume(ac);
            if(gone()){App.media.stop(stream);await ac.close();return;}
            const src = ac.createMediaStreamSource(stream),
              an = ac.createAnalyser();
            an.fftSize = 1024;
            src.connect(an);
            const buf = new Float32Array(an.fftSize);
            running = true;
            const loop = () => {
              if (gone()) return;
              an.getFloatTimeDomainData(buf);
              const rms = Math.sqrt(
                buf.reduce((sum, v) => sum + v * v, 0) / buf.length,
              );
              add(Math.max(-120, 20 * Math.log10(Math.max(1e-6, rms))));
              raf = requestAnimationFrame(loop);
            };
            stopFn = () => {
              stream.getTracks().forEach((t) => t.stop());
              src.disconnect();
              ac.close().catch(() => {});
            };
            loop();
          } catch (e) {
            stream.getTracks().forEach((t) => t.stop());
            if (ac) ac.close().catch(() => {});
            throw e;
          }
        } else {
          const C =
            sensor === "light"
              ? window.AmbientLightSensor
              : window.Magnetometer;
          if (!C)
            throw new Error(
              T(
                "Bu sensör/tarayıcı desteklenmiyor; simülasyonu seçebilirsin.",
                "This sensor/browser is unsupported; you can choose simulation.",
              ),
            );
          const device = new C({ frequency: 10 });
          stopFn = () => device.stop();
          device.addEventListener("reading", () => {
            if (gone()) return;
            sensor === "light"
              ? add(device.illuminance)
              : add(device.x, device.y, device.z);
          });
          device.addEventListener("error", () => {
            if (!gone()) {
              stop();
              status.textContent = T(
                "Sensör izni veya cihaz erişimi başarısız. Simülasyonu seçebilirsin.",
                "Sensor permission or device access failed. You can select simulation.",
              );
            }
          });
          running = true;
          device.start();
        }
        if (!gone())
          status.textContent =
            source === "simulation"
              ? T(
                  "SİMÜLASYON · gerçek ölçüm değil",
                  "SIMULATION · not a device measurement",
                )
              : T(
                  "Gerçek cihaz · veri bekleniyor. Veri gelmezse sensör desteğini kontrol et.",
                  "Device · waiting for data. Check sensor support if no readings arrive.",
                );
      } catch (e) {
        if (!gone()) {
          stop();
          status.textContent = e.message;
        }
      } finally {
        if (!gone()) pending = false;
      }
    }
    $("#swStart").onclick = start;
    $("#swStop").onclick = () => {
      stop();
      paintStats();
      status.textContent = T("Durduruldu.", "Stopped.");
    };
    $("#swSensor").onchange = label;
    $("#swView").onchange = () => { draw(); paintStats(); };
    $("#swSource").onchange = label;
    $("#swCSV").onclick = () =>
      downloadText(
        "kampusai-" + session.sensor + "-" + session.source + ".csv",
        csv(packet(session.sensor, session.source, rows, session.at)),
        "text/csv;charset=utf-8",
      );
    $("#swJSON").onclick = () =>
      downloadText(
        "kampusai-" + session.sensor + "-" + session.source + ".json",
        JSON.stringify(
          packet(session.sensor, session.source, rows, session.at),
          null,
          2,
        ),
      );
    label();
    return () => {
      alive = false;
      stop();
    };
  }
  App.sensorWorkbench = { CHANNELS, validSample, magnitude, packet, csv, page, stats, histogram };
})();
