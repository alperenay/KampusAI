(function () {
  function validate(d) {
    if (
      !d ||
      typeof d.expression !== "string" ||
      d.expression.length > 100 ||
      !["function", "ellipse", "hyperbola"].includes(d.kind)
    )
      throw new Error("Denklem okunamadı; elle gir.");
    let box = d.box;
    if (
      !Array.isArray(box) ||
      box.length !== 4 ||
      box.some((x) => !Number.isFinite(x) || x < 0 || x > 1) ||
      box[2] <= 0 ||
      box[3] <= 0 ||
      box[0] + box[2] > 1.001 ||
      box[1] + box[3] > 1.001
    )
      box = [0.1, 0.2, 0.8, 0.6];
    if (d.kind === "function")
      App.discoveryModel.expression(d.expression, 1, {
        a: 1,
        b: 0,
        c: 0,
        k: 1,
      });
    return { expression: d.expression, kind: d.kind, box };
  }
  function render(view) {
    const u = App.discovery,
      V = App.discoveryVision,
      m = App.discoveryModel,
      root = u.page(
        view,
        "canlanan-kitap",
        '<div class="notice">Kamera üzerinde 2B grafik katmanı. Denklem çerçevesini OCR önerir veya sen seçersin. İsteğe bağlı 2B şablon takibi yalnız küçük yatay/düşey hareketleri izler; dönme/zoom veya görüntü kaybında grafik gizlenir. Metrik dünya AR sabitlemesi değildir. OCR için görsel seçili AI sağlayıcına gider; elle denklem çevrimdışı çalışır.</div><section class="panel"><div class="controls">' +
          u.button("eqStart", "Kamerayı aç") +
          u.button("eqStop", "Kamerayı kapat") +
          u.button("eqCapture", "Kamera karesini al") +
          u.button("eqTrack", "Canlı çerçeveyi takip et") +
          u.button("eqTrackStop", "Takibi durdur") +
          '<label>Sayfa görseli<input type="file" accept="image/*" id="eqFile"></label>' +
          u.button("eqOCR", "Görselden denklemi oku") +
          '</div><div class="camera-stage" id="eqStage"><video id="eqVideo" autoplay muted playsinline></video><canvas id="eqPhoto" width="900" height="500"></canvas><canvas id="eqCanvas" width="900" height="500" aria-label="Denklem üstünde etkileşimli grafik"></canvas><div class="anchor-box" id="eqBox"></div></div><label>Denklem türü<select id="eqKind"><option value="function">y=f(x)</option><option value="ellipse">Elips: x²/a² + y²/b² = 1</option><option value="hyperbola">Hiperbol: x²/a² − y²/b² = 1</option></select></label><label>Okunan denklem — doğrula ve düzenle<input id="eqExpression" value="a*x^2+b*x+c" maxlength="100"></label><div class="controls">' +
          ["a", "b", "c", "k"]
            .map(
              (k, i) =>
                "<label>" +
                k +
                '<input type="range" id="eq' +
                k +
                '" min="-5" max="5" step="0.1" value="' +
                (i === 0 || k === "k" ? 1 : 0) +
                '"><output id="eqValue' +
                k +
                '"></output></label>',
            )
            .join("") +
          '</div><div class="controls">' +
          u.input("eqLeft", "Çerçeve sol (%)", 10, 0, 90) +
          u.input("eqTop", "Çerçeve üst (%)", 20, 0, 90) +
          u.input("eqWidth", "Çerçeve genişlik (%)", 80, 5, 100) +
          u.input("eqHeight", "Çerçeve yükseklik (%)", 60, 5, 100) +
          u.button("eqApply", "Denklemi onayla ve çiz") +
          '</div><p data-status role="status"></p><p class="hint">Çarpımı * ile yaz; örn. a*x^2+b*x+c veya sin(k*x). Trigonometrik açı radyandır. Kaydırıcılar yalnız onaylanan ifadeyi değiştirir. Elips/hiperbol için a ve b sıfır olamaz.</p></section>',
      );
    const $ = (id) => root.querySelector("#" + id),
      life = u.scope(root);
    let cam = null,
      tracker = null,
      photo = null,
      approved = { expression: "a*x^2+b*x+c", kind: "function" },
      busy = false;
    function draw() {
      const c = $("eqCanvas"),
        ctx = c.getContext("2d"),
        vars = {};
      for (const k of ["a", "b", "c", "k"]) {
        $("eqValue" + k).textContent = $("eq" + k).value;
        vars[k] = u.number(root, "eq" + k, -5, 5);
      }
      const left = u.number(root, "eqLeft", 0, 90) / 100,
        top = u.number(root, "eqTop", 0, 90) / 100,
        w = u.number(root, "eqWidth", 5, 100) / 100,
        h = u.number(root, "eqHeight", 5, 100) / 100;
      if (left + w > 1.001 || top + h > 1.001)
        throw new Error("Çerçeve görüntünün içinde kalmalı.");
      if (
        approved.kind !== "function" &&
        (Math.abs(vars.a) < 0.01 || Math.abs(vars.b) < 0.01)
      )
        throw new Error("Elips/hiperbol a ve b sıfır olamaz");
      const box = $("eqBox");
      box.style.cssText =
        "left:" +
        left * 100 +
        "%;top:" +
        top * 100 +
        "%;width:" +
        w * 100 +
        "%;height:" +
        h * 100 +
        "%;";
      ctx.clearRect(0, 0, 900, 500);
      ctx.save();
      ctx.beginPath();
      ctx.rect(left * 900, top * 500, w * 900, h * 500);
      ctx.clip();
      const X = (x) => left * 900 + (w * 900 * (x + 5)) / 10,
        Y = (y) => top * 500 + (h * 500 * (5 - y)) / 10;
      ctx.strokeStyle = "#a8b8d4";
      ctx.beginPath();
      ctx.moveTo(X(-5), Y(0));
      ctx.lineTo(X(5), Y(0));
      ctx.moveTo(X(0), Y(-5));
      ctx.lineTo(X(0), Y(5));
      ctx.stroke();
      ctx.strokeStyle = "#6fe3c3";
      ctx.lineWidth = 3;
      function plot(f) {
        ctx.beginPath();
        let prev = null;
        for (let i = 0; i <= 600; i++) {
          const x = i / 60 - 5,
            y = f(x);
          if (!Number.isFinite(y) || Math.abs(y) > 50) {
            prev = null;
            continue;
          }
          if (prev !== null && Math.abs(y - prev) < 1) ctx.lineTo(X(x), Y(y));
          else ctx.moveTo(X(x), Y(y));
          prev = y;
        }
        ctx.stroke();
      }
      if (approved.kind === "function")
        plot((x) => m.expression(approved.expression, x, vars));
      else {
        if (Math.abs(vars.a) < 0.01 || Math.abs(vars.b) < 0.01)
          throw new Error("Elips/hiperbol a ve b sıfır olamaz");
        const f = (x) =>
          approved.kind === "ellipse"
            ? vars.b * Math.sqrt(1 - (x * x) / (vars.a * vars.a))
            : vars.b * Math.sqrt((x * x) / (vars.a * vars.a) - 1);
        plot(f);
        plot((x) => -f(x));
      }
      ctx.restore();
    }
    function apply() {
      const d = validate({
        expression: $("eqExpression").value,
        kind: $("eqKind").value,
        box: [0.1, 0.2, 0.8, 0.6],
      });
      approved = d;
      draw();
      root.querySelector("[data-status]").textContent =
        "Denklem onaylandı; katsayıları değiştirerek grafiği incele.";
    }
    async function display(url) {
      const im = await V.image(url);
      if (!life.alive) return;
      tracker?.close();
      photo = url;
      const c = $("eqPhoto"),
        ctx = c.getContext("2d");
      ctx.clearRect(0, 0, 900, 500);
      ctx.drawImage(im, 0, 0, 900, 500);
    }
    $("eqStart").onclick = u.protect(root, async () => {
      tracker?.close();
      cam?.close();
      cam = u.scope(root);
      $("eqPhoto").getContext("2d").clearRect(0, 0, 900, 500);
      photo = null;
      await V.camera($("eqVideo"), cam);
    });
    $("eqStop").onclick = () => {
      tracker?.close();
      cam?.close();
    };
    $("eqCapture").onclick = u.protect(root, () =>
      display(V.capture($("eqVideo"))),
    );
    $("eqFile").onchange = u.protect(root, async () => {
      const f = $("eqFile").files[0];
      if (!f) return;
      if (f.size > 12000000) throw new Error("Görsel en çok 12 MB olabilir");
      const im = await App.vision.prepare(f);
      if (life.alive) await display(im.dataUrl);
    });
    $("eqOCR").onclick = u.protect(root, async () => {
      if (busy) return;
      if (!photo) throw new Error("Önce fotoğraf çek veya yükle");
      busy = true;
      $("eqOCR").disabled = true;
      root.querySelector("[data-status]").textContent =
        "Denklem ve konumu okunuyor…";
      try {
        const d = validate(await V.extract(life, photo, "equation"));
        if (!life.alive) return;
        $("eqExpression").value = d.expression;
        $("eqKind").value = d.kind;
        ["Left", "Top", "Width", "Height"].forEach(
          (k, i) => ($("eq" + k).value = String(Math.round(d.box[i] * 100))),
        );
        root.querySelector("[data-status]").textContent =
          "OCR önerisi hazır. Denklem ve çerçeveyi incele, sonra onayla. Grafik henüz değiştirilmedi.";
      } finally {
        busy = false;
        if (life.alive) $("eqOCR").disabled = false;
      }
    });
    $("eqTrack").onclick = u.protect(root, () => {
      tracker?.close();
      tracker = u.scope(root);
      $("eqPhoto").getContext("2d").clearRect(0, 0, 900, 500);
      V.track(
        $("eqVideo"),
        [
          u.number(root, "eqLeft", 0, 90) / 100,
          u.number(root, "eqTop", 0, 90) / 100,
          u.number(root, "eqWidth", 5, 100) / 100,
          u.number(root, "eqHeight", 5, 100) / 100,
        ],
        tracker,
        (r) => {
          if (!life.alive) return;
          $("eqCanvas").hidden = r.lost;
          $("eqBox").hidden = r.lost;
          if (!r.lost) {
            ["Left", "Top", "Width", "Height"].forEach(
              (k, i) => ($("eq" + k).value = String(r.box[i] * 100)),
            );
            try {
              draw();
            } catch (e) {
              root.querySelector("[data-status]").textContent = e.message;
            }
          }
          root.querySelector("[data-status]").textContent = r.lost
            ? "Görüntü takibi kayboldu; grafik gizlendi. Kadrajı düzelt veya elle yeniden yerleştir."
            : "2B öteleme takibi · benzerlik " + r.confidence.toFixed(2);
        },
      );
    });
    $("eqTrackStop").onclick = () => {
      tracker?.close();
      $("eqCanvas").hidden = false;
      $("eqBox").hidden = false;
    };
    $("eqApply").onclick = u.protect(root, () => {
      tracker?.close();
      $("eqCanvas").hidden = false;
      $("eqBox").hidden = false;
      apply();
    });
    for (const k of ["a", "b", "c", "k"])
      $("eq" + k).oninput = u.protect(root, draw);
    draw();
    life.add(() => {
      cam?.close();
      tracker?.close();
    });
    return () => life.close();
  }
  App.equationCamera = { validate };
  App.router.register("canlanan-kitap", render);
})();
