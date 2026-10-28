(function () {
  const examples = {
    circuit: {
      nodes: 3,
      components: [
        { type: "voltage", a: 1, b: 0, value: 9 },
        { type: "resistor", a: 1, b: 2, value: 100 },
        { type: "lamp", a: 2, b: 0, value: 200 },
        { type: "switch", a: 2, b: 0, closed: false },
      ],
    },
    force: {
      mass: 2,
      forces: [
        { x: 0, y: -19.6133, label: "ağırlık" },
        { x: 0, y: 19.6133, label: "normal" },
        { x: 5, y: 0, label: "uygulanan" },
      ],
      surface: true,
    },
    optics: {
      angle: 30,
      n1: 1,
      n2: 1.5,
      focal: 2,
      distance: 4,
      element: "lens",
    },
    ramp: {
      height: 2,
      mass: 1,
      loss: 0.1,
      loopRadius: 0.5,
      m1: 1,
      v1: 3,
      m2: 2,
      v2: 0,
      restitution: 0.8,
    },
  };
  function validate(kind, data) {
    const m = App.discoveryModel;
    if (kind === "circuit") return m.circuit(data);
    if (kind === "force") return m.force(data.mass, data.forces);
    if (kind === "optics")
      return {
        snell: m.snell(data.angle, data.n1, data.n2),
        lens: m.lens(data.distance, data.focal),
      };
    if (kind === "ramp")
      return {
        ramp: m.ramp(data.height, data.mass, data.loss, data.loopRadius ?? 0),
        collision: m.collision(
          data.m1,
          data.v1,
          data.m2,
          data.v2,
          data.restitution,
        ),
      };
    throw new Error("Bilinmeyen model");
  }
  function render(view) {
    const u = App.discovery,
      m = App.discoveryModel,
      V = App.discoveryVision,
      esc = App.utils.esc,
      root = u.page(
        view,
        "ciz-calissin",
        '<div class="notice">Görsel tanıma bağlantı ve değerlerde hata yapabilir. Önce önerilen modeli incele/düzelt, sonra “Modeli onayla ve çalıştır”a bas. Çevrimdışı çizim, kenar/bağlı kontur incelemesi ve elle modelleme çalışır; genel sembol tanıma seçili görsel AI motorunu kullanır.</div><section class="panel"><label>Model türü<select id="dsKind"><option value="circuit">DC devre</option><option value="force">Serbest cisim</option><option value="optics">Işın optiği</option><option value="ramp">Rampa ve çarpışma</option></select></label><div class="controls">' +
          u.button("dsCamera", "Kamerayı aç") +
          u.button("dsCapture", "Fotoğraf çek") +
          u.button("dsCameraStop", "Kamerayı kapat") +
          '<label>Görsel yükle<input id="dsFile" type="file" accept="image/*"></label></div><video id="dsVideo" autoplay muted playsinline hidden></video><p class="hint">Aşağıya çizebilirsin. Rampa modunda soldan sağa, yüksekten başlayarak tek yol çiz; bu yol noktasal cismin kılavuzudur. Silme, kontur analizi ve AI önerisi ayrı işlemlerdir.</p><canvas id="dsDraw" width="900" height="360" tabindex="0" aria-label="Çizim ve görsel çalışma alanı"></canvas><div class="controls">' +
          u.button("dsClear", "Çizimi temizle") +
          u.button("dsEdges", "Yerel kenar / kontur analizi") +
          u.button("dsAI", "Görseli AI ile yorumla") +
          u.button("dsExample", "Örnek model yükle") +
          '</div><p class="hint">AI düğmesi bu görseli mevcut AI sağlayıcına gönderir; kişisel bilgi içeren görsel yükleme.</p>' +
          u.field("dsModel", "Önerilen model / düzenlenebilir JSON") +
          '<div class="controls">' +
          u.button("dsRun", "Modeli onayla ve çalıştır") +
          u.button("dsPause", "Animasyonu durdur") +
          u.button("dsExport", "Onaylı modeli indir") +
          '</div><p data-status role="status"></p><output id="dsResult" class="reading"></output><canvas id="dsScene" width="900" height="420" aria-label="Onaylanan model simülasyonu"></canvas><div id="dsEnergy" class="reading"></div></section><details class="panel"><summary>Model alanları ve sınırlar</summary><p>Devre: düğüm 0 toprak; voltage değeri volt, resistor/lamp ohm; switch.closed anahtar konumu. İdeal DC ve sabit dirençli lamba modeli; gerçek ampul sıcaklığı modellenmez.</p><p>Kuvvet: x sağa, y yukarı; mass kg, forces N. surface=true ise normal kuvvetin eksikliği kontrol edilir; sürtünme her durumda zorunlu değildir. Dengede olmayan bir cisim yanlış model demek değildir.</p><p>Optik: angle normale göre derece; n1/n2 indisler; element=mirror veya lens; focal ve distance aynı uzunluk biriminde. İnce mercek/paraksiyel model ile düz sınır Snell hesabı ayrı gösterilir.</p><p>Rampa: height m; mass kg; loss 0–1 toplam enerji kayıp oranı. Çizilmiş yol boyunca noktasal kılavuz hareketi; serbest 2B rijit cisim/poligon çarpışma çözücüsü değildir. İki cisim çarpışması tek boyutlu ve belirtilen restitution katsayılıdır. Daire çizimi gerçek döngü teması doğrulaması sağlamaz.</p></details>',
      );
    const $ = (id) => root.querySelector("#" + id),
      life = u.scope(root),
      draw = $("dsDraw"),
      ctx = draw.getContext("2d"),
      scene = $("dsScene"),
      sc = scene.getContext("2d");
    let cameraLife = null,
      path = [],
      drawing = false,
      frame = 0,
      approved = null,
      fromAI = false,
      busy = false;
    function clear() {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 900, 360);
      path = [];
    }
    clear();
    draw.onpointerdown = (e) => {
      drawing = true;
      draw.setPointerCapture(e.pointerId);
      const r = draw.getBoundingClientRect();
      path = [
        {
          x: ((e.clientX - r.left) * 900) / r.width,
          y: ((e.clientY - r.top) * 360) / r.height,
        },
      ];
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
    };
    draw.onpointermove = (e) => {
      if (!drawing) return;
      const r = draw.getBoundingClientRect(),
        p = {
          x: ((e.clientX - r.left) * 900) / r.width,
          y: ((e.clientY - r.top) * 360) / r.height,
        };
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#111";
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      if (path.length < 1500) path.push(p);
    };
    draw.onpointerup = draw.onpointercancel = () => (drawing = false);
    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    function example() {
      stop();
      fromAI = false;
      approved = null;
      $("dsModel").value = JSON.stringify(examples[$("dsKind").value], null, 2);
      $("dsResult").textContent =
        "Örnek şema yüklendi; değerleri inceleyip onayla.";
    }
    $("dsKind").onchange = example;
    $("dsExample").onclick = example;
    example();
    $("dsClear").onclick = clear;
    $("dsCamera").onclick = u.protect(root, async () => {
      if (cameraLife) cameraLife.close();
      cameraLife = u.scope(root);
      $("dsVideo").hidden = false;
      await V.camera($("dsVideo"), cameraLife);
    });
    $("dsCameraStop").onclick = () => {
      cameraLife?.close();
      $("dsVideo").hidden = true;
    };
    async function showImage(url) {
      const im = await V.image(url);
      if (!life.alive) return;
      clear();
      const scale = Math.min(900 / im.width, 360 / im.height);
      ctx.drawImage(
        im,
        (900 - im.width * scale) / 2,
        (360 - im.height * scale) / 2,
        im.width * scale,
        im.height * scale,
      );
    }
    $("dsCapture").onclick = u.protect(root, () =>
      showImage(V.capture($("dsVideo"))),
    );
    $("dsFile").onchange = u.protect(root, async () => {
      const f = $("dsFile").files[0];
      if (!f) return;
      if (f.size > 12000000) throw new Error("Görsel en çok 12 MB olabilir");
      const im = await App.vision.prepare(f);
      if (life.alive) await showImage(im.dataUrl);
    });
    $("dsEdges").onclick = u.protect(root, () => {
      const p = V.edges(draw);
      ctx.strokeStyle = "#e75543";
      ctx.lineWidth = 1;
      p.contours.forEach((c) => ctx.strokeRect(c.x, c.y, c.width, c.height));
      root.querySelector("[data-status]").textContent =
        p.count +
        " kenar pikseli, " +
        p.contours.length +
        " bağlı kontur. Kırmızı kutular sembol/bağlantı tanısı değildir.";
    });
    $("dsAI").onclick = u.protect(root, async () => {
      if (busy) return;
      busy = true;
      $("dsAI").disabled = true;
      root.querySelector("[data-status]").textContent =
        "Çizim okunuyor; sonuç onaylanana kadar simülasyon değişmeyecek.";
      try {
        const d = await V.extract(
          life,
          draw.toDataURL("image/jpeg", 0.85),
          "simulation",
        );
        if (!life.alive) return;
        if (!d || !["circuit", "force", "optics", "ramp"].includes(d.kind))
          throw new Error("Model türü tanınamadı; elle şema gir.");
        $("dsKind").value = d.kind;
        const value =
          d.kind === "circuit"
            ? d.net
            : d.kind === "force"
              ? { mass: d.mass, forces: d.forces, surface: true }
              : d.kind === "optics"
                ? {
                    angle: d.angle,
                    n1: d.n1,
                    n2: d.n2,
                    focal: null,
                    distance: null,
                    element: "lens",
                  }
                : {
                    height: d.height,
                    mass: d.mass,
                    loss: 0,
                    m1: null,
                    v1: null,
                    m2: null,
                    v2: null,
                    restitution: 1,
                  };
        $("dsModel").value = JSON.stringify(value, null, 2);
        fromAI = true;
        root.querySelector("[data-status]").textContent =
          "AI önerisi. Eksik/null değerleri düzelt ve bağlantıları onayla. " +
          (Array.isArray(d.uncertain)
            ? d.uncertain
                .filter((x) => typeof x === "string")
                .slice(0, 5)
                .join(" ")
            : "");
      } finally {
        busy = false;
        if (life.alive) $("dsAI").disabled = false;
      }
    });
    function run() {
      stop();
      if ($("dsModel").value.length > 16000) throw new Error("Şema çok uzun");
      const data = JSON.parse($("dsModel").value),
        kind = $("dsKind").value,
        result = validate(kind, data);
      approved = {
        kind,
        data,
        result,
        origin: fromAI
          ? "AI önerisi, öğrenci onaylı"
          : "elle/örnek, öğrenci onaylı",
      };
      sc.clearRect(0, 0, 900, 420);
      sc.fillStyle = "#dce6ff";
      sc.font = "16px sans-serif";
      $("dsEnergy").textContent = "";
      if (kind === "circuit") {
        const pts = Array.from({ length: data.nodes }, (_, i) => ({
          x: 450 + 260 * Math.cos((i / data.nodes) * Math.PI * 2),
          y: 210 + 150 * Math.sin((i / data.nodes) * Math.PI * 2),
        }));
        $("dsResult").textContent =
          "Düğüm gerilimleri: " +
          result.volts
            .map((v, i) => "V" + i + "=" + v.toFixed(3) + " V")
            .join("; ") +
          "\n" +
          result.components
            .map(
              (c) =>
                c.type +
                ": I=" +
                c.current.toFixed(4) +
                " A, P=" +
                c.power.toFixed(3) +
                " W",
            )
            .join("\n");
        let t0 = null;
        const animate = (t) => {
          if (!life.alive) return;
          if (t0 === null) t0 = t;
          sc.clearRect(0, 0, 900, 420);
          result.components.forEach((c, i) => {
            const a = pts[c.a],
              b = pts[c.b];
            sc.strokeStyle =
              c.type === "lamp" && c.power > 0.01 ? "#ffda66" : "#7896c0";
            sc.lineWidth = c.type === "lamp" ? 8 : 2;
            sc.beginPath();
            sc.moveTo(a.x, a.y);
            sc.lineTo(b.x, b.y);
            sc.stroke();
            sc.fillStyle = "#dce6ff";
            sc.fillText(
              c.type + " " + (c.value ?? ""),
              (a.x + b.x) / 2,
              (a.y + b.y) / 2 - 10,
            );
            if (c.type !== "voltage" && Math.abs(c.current) > 1e-9) {
              const phase =
                (((((t - t0) / 2000) * Math.sign(-c.current) + i / 7) % 1) +
                  1) %
                1;
              sc.fillStyle = "#80e6bf";
              sc.beginPath();
              sc.arc(
                a.x + (b.x - a.x) * phase,
                a.y + (b.y - a.y) * phase,
                4,
                0,
                7,
              );
              sc.fill();
            }
          });
          pts.forEach((p, i) => {
            sc.fillStyle = "#fff";
            sc.fillText("n" + i, p.x + 6, p.y + 15);
          });
          frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
      }
      if (kind === "force") {
        const labels = data.forces.map((f) =>
            String(f.label || "").toLocaleLowerCase("tr"),
          ),
          missing = [];
        if (!labels.some((s) => /ağırlık|gravity|weight/.test(s)))
          missing.push("Ağırlık kuvveti belirtilmemiş olabilir.");
        if (
          data.surface &&
          !labels.some((s) => /normal|tepki|reaction/.test(s))
        )
          missing.push("Yüzey temasında normal tepkiyi incele.");
        sc.fillStyle = "#6b91da";
        sc.fillRect(415, 180, 70, 60);
        data.forces.forEach((f) => {
          const x = 450 + f.x * 5,
            y = 210 - f.y * 5;
          sc.strokeStyle = "#92c7fa";
          sc.beginPath();
          sc.moveTo(450, 210);
          sc.lineTo(x, y);
          sc.stroke();
          sc.beginPath();
          const angle = Math.atan2(y - 210, x - 450);
          sc.moveTo(x, y);
          sc.lineTo(
            x - 12 * Math.cos(angle - 0.4),
            y - 12 * Math.sin(angle - 0.4),
          );
          sc.moveTo(x, y);
          sc.lineTo(
            x - 12 * Math.cos(angle + 0.4),
            y - 12 * Math.sin(angle + 0.4),
          );
          sc.stroke();
          sc.fillText(String(f.label || "F").slice(0, 60), x, y);
        });
        sc.fillStyle = "#ff8375";
        missing.forEach((t, i) => sc.fillText(t, 20, 30 + i * 25));
        $("dsResult").textContent =
          "ΣFx=" +
          result.x.toFixed(3) +
          " N; ΣFy=" +
          result.y.toFixed(3) +
          " N\nax=" +
          result.ax.toFixed(3) +
          " m/s²; ay=" +
          result.ay.toFixed(3) +
          " m/s² · " +
          (result.equilibrium ? "denge" : "ivmeli hareket") +
          "\n" +
          missing.join("\n");
      }
      if (kind === "optics") {
        const d = Math.PI / 180,
          s = result.snell,
          incident = data.angle * d;
        sc.strokeStyle = "#7794bc";
        sc.beginPath();
        sc.moveTo(0, 210);
        sc.lineTo(900, 210);
        sc.moveTo(450, 20);
        sc.lineTo(450, 400);
        sc.stroke();
        function ray(x, y, color) {
          sc.strokeStyle = color;
          sc.lineWidth = 3;
          sc.beginPath();
          sc.moveTo(450, 210);
          sc.lineTo(x, y);
          sc.stroke();
        }
        ray(
          450 - 180 * Math.sin(incident),
          210 - 180 * Math.cos(incident),
          "#ffe585",
        );
        ray(
          450 + 180 * Math.sin(incident),
          210 - 180 * Math.cos(incident),
          "#d79cf4",
        );
        if (s.refracted !== null)
          ray(
            450 + 180 * Math.sin(s.refracted * d),
            210 + 180 * Math.cos(s.refracted * d),
            "#82dfc0",
          );
        $("dsResult").textContent =
          "Snell: " +
          (s.refracted === null
            ? "tam iç yansıma"
            : s.refracted.toFixed(3) + "°") +
          "\nİnce " +
          (data.element === "mirror" ? "küresel ayna" : "mercek") +
          " görüntü uzaklığı: " +
          (result.lens.image === null
            ? "sonsuz"
            : result.lens.image.toFixed(3)) +
          "; büyütme: " +
          (result.lens.magnification === null
            ? "tanımsız"
            : result.lens.magnification.toFixed(3)) +
          "\nSol çizim düz sınırda Snell; sağ çizim ince mercek / küresel ayna paraksiyel ışınları.";
        const ox = 680,
          oy = 240,
          scale = 30,
          objectX = ox - data.distance * scale,
          objectY = oy - 55;
        sc.clearRect(480, 0, 420, 420);
        sc.strokeStyle = "#849bc0";
        sc.lineWidth = 1;
        sc.beginPath();
        sc.moveTo(490, oy);
        sc.lineTo(890, oy);
        sc.moveTo(ox, 90);
        sc.lineTo(ox, 360);
        sc.stroke();
        sc.fillStyle = "#e8ecfa";
        sc.fillText(
          data.element === "mirror"
            ? "Küresel ayna (paraksiyel)"
            : "İnce mercek (paraksiyel)",
          490,
          40,
        );
        sc.fillText("F", ox + data.focal * scale, oy + 20);
        sc.strokeStyle = "#f6d778";
        sc.lineWidth = 2;
        sc.beginPath();
        sc.moveTo(objectX, oy);
        sc.lineTo(objectX, objectY);
        sc.moveTo(objectX, objectY);
        sc.lineTo(ox, objectY);
        sc.stroke();
        if (result.lens.image !== null) {
          const direction = data.element === "mirror" ? -1 : 1,
            ix = ox + direction * result.lens.image * scale,
            iy = oy - 55 * result.lens.magnification;
          sc.strokeStyle = "#83dfc0";
          sc.beginPath();
          sc.moveTo(ox, objectY);
          sc.lineTo(ix, iy);
          sc.moveTo(objectX, objectY);
          sc.lineTo(ox, oy);
          sc.lineTo(ix, iy);
          sc.stroke();
          if (result.lens.image < 0) {
            sc.setLineDash([5, 5]);
            sc.strokeStyle = "#d897f1";
            sc.beginPath();
            sc.moveTo(ix, oy);
            sc.lineTo(ix, iy);
            sc.stroke();
            sc.setLineDash([]);
          } else {
            sc.strokeStyle = "#d897f1";
            sc.beginPath();
            sc.moveTo(ix, oy);
            sc.lineTo(ix, iy);
            sc.stroke();
          }
        }
      }
      if (kind === "ramp") {
        const r = result.ramp;
        $("dsResult").textContent =
          "Başlangıç potansiyeli " +
          r.potential.toFixed(3) +
          " J; tabandaki kinetik " +
          r.kinetic.toFixed(3) +
          " J; kayıp " +
          r.loss.toFixed(3) +
          " J; taban hızı " +
          r.speed.toFixed(3) +
          " m/s\n1B çarpışma: v₁′=" +
          result.collision.v1.toFixed(3) +
          ", v₂′=" +
          result.collision.v2.toFixed(3) +
          " m/s. İdeal sürtünmesiz döngüde hmin=2.5R (noktasal cisim).";
        const route =
            path.length > 5
              ? path.slice()
              : [
                  { x: 80, y: 60 },
                  { x: 300, y: 230 },
                  { x: 650, y: 310 },
                  { x: 820, y: 310 },
                ],
          scale =
            data.height /
            Math.max(1, Math.max(...route.map((p) => p.y)) - route[0].y);
        let distance = 0,
          lastTime = null;
        const lengths = [0];
        for (let i = 1; i < route.length; i++)
          lengths.push(
            lengths[i - 1] +
              Math.hypot(
                route[i].x - route[i - 1].x,
                route[i].y - route[i - 1].y,
              ),
          );
        const total = lengths[lengths.length - 1],
          animate = (t) => {
            if (!life.alive) return;
            const dt =
              lastTime === null ? 0 : Math.min(0.05, (t - lastTime) / 1000);
            lastTime = t;
            let i = 1;
            while (i < lengths.length - 1 && lengths[i] < distance) i++;
            const q =
                (distance - lengths[i - 1]) /
                Math.max(0.001, lengths[i] - lengths[i - 1]),
              a = route[i - 1],
              b = route[i],
              p = { x: a.x + (b.x - a.x) * q, y: a.y + (b.y - a.y) * q },
              drop = (p.y - route[0].y) * scale,
              v = Math.sqrt(Math.max(0.02, 2 * m.G * drop * (1 - data.loss)));
            distance = Math.min(
              total,
              distance + (v / Math.max(0.001, scale)) * dt,
            );
            sc.clearRect(0, 0, 900, 420);
            sc.strokeStyle = "#92acda";
            sc.lineWidth = 4;
            sc.beginPath();
            route.forEach((p, i) =>
              i ? sc.lineTo(p.x, p.y) : sc.moveTo(p.x, p.y),
            );
            sc.stroke();
            sc.fillStyle = "#ffcc66";
            sc.beginPath();
            sc.arc(p.x, p.y, 10, 0, 7);
            sc.fill();
            const kinetic =
                data.mass * m.G * Math.max(0, drop) * (1 - data.loss),
              potential = Math.max(
                0,
                r.potential - data.mass * m.G * Math.max(0, drop),
              );
            $("dsEnergy").textContent =
              "Kılavuz model: Ep≈" +
              potential.toFixed(2) +
              " J; Ek≈" +
              kinetic.toFixed(2) +
              " J; kaynak: simülasyon. Yol boyunca enerji hesaplanır; genel rijit cisim çarpışması değildir.";
            if (distance < total) frame = requestAnimationFrame(animate);
          };
        frame = requestAnimationFrame(animate);
      }
      root.querySelector("[data-status]").textContent =
        "Model onaylandı ve deterministik çözücüyle çalıştırıldı.";
    }
    $("dsRun").onclick = u.protect(root, run);
    $("dsPause").onclick = stop;
    $("dsExport").onclick = u.protect(root, () => {
      if (!approved) throw new Error("Önce modeli onayla");
      u.download("ciz-calissin.json", approved);
    });
    life.add(() => {
      stop();
      cameraLife?.close();
    });
    return () => life.close();
  }
  App.drawSimulation = { examples, validate };
  App.router.register("ciz-calissin", render);
})();
