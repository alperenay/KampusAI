(function () {
  function render(view) {
    const u = App.discovery,
      m = App.discoveryModel,
      esc = App.utils.esc,
      root = u.page(
        view,
        "sismograf",
        '<div class="notice">Bu araç deprem erken uyarısı, büyüklük ölçer veya yerel risk tespiti değildir. Telefon sensöründen P/S dalgası tanısı yapılmaz. Eğitimdeki ilk/ikinci dalga paketleri, yalnız simülasyonun bilinen başlangıçlarıdır.</div><section class="panel"><div class="controls">' +
          u.input("sgCutoff", "Yüksek geçiren kesim (Hz)", 0.8, 0.05, 10) +
          u.input("sgThreshold", "Olay eşiği (m/s²)", 0.3, 0.001, 20) +
          u.button("sgStart", "Cihazda üç ekseni kaydet") +
          u.button("sgStop", "Durdur") +
          u.button("sgSim", "P/S eğitim sinyali yükle") +
          '</div><p data-status role="status"></p><output id="sgResult" class="reading"></output><canvas id="sgChart" width="900" height="300" aria-label="Filtrelenmiş üç eksenli titreşim"></canvas><div class="controls">' +
          u.button("sgExport", "Üç eksenli JSON indir") +
          u.button("sgReport", "Rapora aktar") +
          '</div></section><section class="panel"><h2>Üç istasyon: daire kesişimi oyunu</h2><p>Düzlem eğitim modeli (km). Üç daireyi ortak bir merkeze getirmek için yarıçapları değiştir. S–P gecikmesinden uzaklık varsayımı bu oyunda vP=6, vS=3.5 km/s ile d=Δt/(1/vS−1/vP) olur; gerçek yer modeli değildir.</p><div class="controls">' +
          u.input("sgR1", "A(0,0) uzaklık km", 5, 0, 100) +
          u.input("sgR2", "B(10,0) uzaklık km", 8.062257, 0, 100) +
          u.input("sgR3", "C(0,10) uzaklık km", 6.708204, 0, 100) +
          u.button("sgLocate", "Kesişimi incele") +
          '</div><canvas id="sgMap" width="700" height="380" aria-label="İstasyon daireleri"></canvas><p id="sgLocation"></p></section><section class="panel"><h2>Fay zonlarını tanı</h2><p>Yerel GeoJSON’daki çizgiler özgün, şematik öğretim çizimleridir; MTA’nın diri fay geometrisi kopyası veya parsel risk haritası değildir.</p><svg id="sgFaults" viewBox="0 0 700 260" role="img" aria-label="Şematik Kuzey ve Doğu Anadolu fay zonları"></svg><a target="_blank" rel="noopener" href="https://www.mta.gov.tr/v3.0/hizmetler/yenilenmis-diri-fay-haritalari">Resmî MTA diri fay haritaları</a></section><section class="panel"><h2>Afet çantası kontrolü</h2><p>Ailenin özel gereksinimleriyle güncelle; bu kısa liste kapsamlı hazırlığın yerine geçmez.</p><div id="sgKit"></div><a target="_blank" rel="noopener" href="https://www.afad.gov.tr/afet-ve-acil-durum-cantasi-nasil-hazirlanmali">AFAD çanta rehberi</a></section>',
      );
    const $ = (id) => root.querySelector("#" + id),
      life = u.scope(root);
    let run = null,
      samples = [],
      source = "manual",
      timer = null;
    function show() {
      if (!samples.length) return;
      const cutoff = u.number(root, "sgCutoff", 0.05, 10),
        threshold = u.number(root, "sgThreshold", 0.001, 20),
        series = ["x", "y", "z"].map((axis, i) => ({
          pts: m
            .highPass(
              samples.map((s) => ({ t: s.t, y: s[axis] })),
              cutoff,
            )
            .map((p) => [p.t, p.y]),
          color: ["#86b7ff", "#f4b942", "#d688ee"][i],
        }));
      App.sensorLab.chart($("sgChart"), series, { xName: "s", yName: "m/s²" });
      const dt =
          samples.length > 1
            ? (samples[samples.length - 1].t - samples[0].t) /
              (samples.length - 1)
            : 0,
        hz = dt ? 1 / dt : 0;
      const events = m.envelopeEvents(
        m.highPass(
          samples.map((s) => ({ t: s.t, y: Math.hypot(s.x, s.y, s.z) })),
          cutoff,
        ),
        threshold,
      );
      $("sgResult").textContent =
        "Kaynak: " +
        source +
        " · " +
        samples.length +
        " örnek · ortalama " +
        hz.toFixed(1) +
        " Hz\n" +
        (hz > 50
          ? "Ölçülen ortalama hız 50 Hz üzerinde."
          : "50 Hz hedefi sağlanmadı; donanım/tarayıcı hızını artıramayız.") +
        "\n" +
        events.length +
        " eşik olayı (P/S sınıflaması değil).";
    }
    function stop() {
      if (run) run.close();
      run = null;
      clearTimeout(timer);
    }
    $("sgStart").onclick = u.protect(root, async () => {
      stop();
      source = "device";
      samples = [];
      run = u.scope(root);
      await u.motion(run, (p) => {
        samples.push({ t: p.t, x: p.x, y: p.y, z: p.z });
        if (samples.length > 6000) samples.shift();
        if (samples.length % 12 === 0) show();
      });
      root.querySelector("[data-status]").textContent =
        "Cihaz olayları bekleniyor; en fazla 60 saniye kaydedilir.";
      timer = setTimeout(stop, 60000);
    });
    $("sgStop").onclick = () => {
      stop();
      show();
    };
    $("sgSim").onclick = () => {
      stop();
      source = "simulation";
      samples = Array.from({ length: 1800 }, (_, i) => {
        const t = i / 100,
          p = Math.exp(-(((t - 4) / 0.5) ** 2)) * Math.sin(t * 35),
          s = 2 * Math.exp(-(((t - 9) / 1) ** 2)) * Math.sin(t * 19);
        return {
          t,
          x: 0.3 * p + s,
          y: p + 0.4 * s,
          z: m.G + 0.6 * p + 0.7 * s,
        };
      });
      show();
      root.querySelector("[data-status]").textContent =
        "SİMÜLASYON · tasarlanmış P paketi t≈4 s, S paketi t≈9 s. Gerçek dalga tanısı yapılmadı.";
    };
    $("sgExport").onclick = () =>
      u.download("sismograf.json", {
        schema: 1,
        source,
        samples,
        units: { t: "s", x: "m/s²", y: "m/s²", z: "m/s²" },
        faults: App.data.discovery.faults,
      });
    $("sgReport").onclick = u.protect(root, () => {
      if (samples.length < 2) throw new Error("Önce veri kaydet");
      App.prefs.set("discovery:labData", {
        name: "Sismograf x ekseni",
        source,
        unit: "m/s²",
        samples: samples.map((p) => ({ t: p.t, y: p.x })).slice(-4000),
      });
      App.router.go("deney-raporu");
    });
    function locate() {
      const stations = [
          { x: 0, y: 0, r: u.number(root, "sgR1", 0, 100) },
          { x: 10, y: 0, r: u.number(root, "sgR2", 0, 100) },
          { x: 0, y: 10, r: u.number(root, "sgR3", 0, 100) },
        ],
        p = m.triangulate(stations),
        c = $("sgMap").getContext("2d");
      c.clearRect(0, 0, 700, 380);
      const X = (x) => 100 + x * 22,
        Y = (y) => 300 - y * 22;
      c.strokeStyle = "#77aaff";
      stations.forEach((s, i) => {
        c.beginPath();
        c.arc(X(s.x), Y(s.y), s.r * 22, 0, 7);
        c.stroke();
        c.fillStyle = "#ddd";
        c.fillText("ABC"[i], X(s.x), Y(s.y));
      });
      c.fillStyle = "#ffcc66";
      c.beginPath();
      c.arc(X(p.x), Y(p.y), 6, 0, 7);
      c.fill();
      $("sgLocation").textContent =
        "Aday merkez: (" +
        p.x.toFixed(2) +
        ", " +
        p.y.toFixed(2) +
        ") km; en büyük çember artığı " +
        p.residual.toFixed(3) +
        " km. " +
        (p.residual < 0.05
          ? "Ortak kesişimi buldun."
          : "Çemberler tek noktada uyuşmuyor; uzaklıkları düzelt.");
    }
    $("sgLocate").onclick = u.protect(root, locate);
    locate();
    $("sgFaults").innerHTML =
      '<rect width="700" height="260" fill="#101727"/>' +
      App.data.discovery.faults.features
        .map(
          (f) =>
            '<polyline fill="none" stroke="#e88b77" stroke-width="4" points="' +
            f.geometry.coordinates
              .map(([x, y]) => [(x - 25) * 33, 245 - (y - 35) * 30].join(","))
              .join(" ") +
            '"/><text x="30" y="' +
            (f.geometry.coordinates[0][1] > 40 ? 30 : 245) +
            '" fill="white">' +
            esc(f.properties.name) +
            "</text>",
        )
        .join("");
    const kit = [
        "Su ve dayanıklı gıda",
        "Düzenli ilaçlar ve ilk yardım",
        "Fener, pil ve radyo",
        "Kimlik/belge kopyaları",
        "Mevsime uygun giysi",
        "Hijyen malzemeleri",
        "Özel gereksinimler (bebek, engel, evcil hayvan)",
      ],
      stored = App.prefs.get("discovery:kit", []),
      checked = Array.isArray(stored) ? stored : [];
    $("sgKit").innerHTML = kit
      .map(
        (k, i) =>
          '<label><input type="checkbox" data-kit="' +
          i +
          '" ' +
          (checked.includes(i) ? "checked" : "") +
          "> " +
          esc(k) +
          "</label>",
      )
      .join("");
    $("sgKit").onchange = () =>
      App.prefs.set(
        "discovery:kit",
        [...$("sgKit").querySelectorAll(":checked")].map((el) =>
          Number(el.dataset.kit),
        ),
      );
    life.add(stop);
    return () => life.close();
  }
  App.router.register("sismograf", render);
})();
