(function () {
  const M = () => App.discoveryModel,
    U = () => App.discovery;
  function pairing(packet, now = Date.now()) {
    if (
      !packet ||
      packet.schema !== "KAI-AUDIO-1" ||
      typeof packet.id !== "string" ||
      !Number.isFinite(packet.created) ||
      Math.abs(now - packet.created) > 300000 ||
      !Number.isFinite(packet.epoch) ||
      !Number.isFinite(packet.uncertainty) ||
      packet.uncertainty < 0
    )
      throw new Error("Geçersiz veya 5 dakikası dolmuş akustik kod");
    return packet;
  }
  function render(view) {
    const u = U(),
      m = M(),
      root = u.page(
        view,
        "telefon-fizik",
        '<div class="notice">Telefonu ipe bağlayıp savurma veya düşürme. Sarkaç için güvenli bir salınım düzeneği kullan. Asansör hesabı, cihazın z ekseni düşeye sabitken ve başlangıçta durgunken yaklaşık sonuç verir; sürüklenme kaçınılmazdır.</div><section class="panel"><label>Deney<select id="ppMode"><option value="speed">İki cihaz: ses uçuş süresi</option><option value="echo">Tek cihaz: yankı</option><option value="lightning">Şimşek–gök gürültüsü mesafesi</option><option value="doppler">Doppler: radyal hız</option><option value="pendulum">Sarkaç: periyot ve g</option><option value="elevator">Asansör: ivme, hız ve yer değiştirme</option></select></label><div class="controls">' +
          u.input("ppD", "Cihazlar arası uzaklık d (m)", 10, 0.01, 10000) +
          u.input(
            "ppTime",
            "Uçuş / yankı / şimşek aralığı (ms)",
            29.1545,
            0.001,
            600000,
          ) +
          u.input(
            "ppUncertainty",
            "Toplam zaman belirsizliği (ms)",
            100,
            0,
            10000,
          ) +
          u.input(
            "ppOffset",
            "B saati − A saati kalibrasyonu (ms)",
            0,
            -100000,
            100000,
          ) +
          u.input("ppC", "Ses hızı varsayımı (m/s)", 343, 250, 400) +
          u.input("ppF0", "Kaynak tonu f₀ (Hz)", 1000, 30, 20000) +
          u.input("ppF", "Ölçülen baskın frekans (Hz)", 1050, 30, 20000) +
          u.input("ppLength", "Sarkaç uzunluğu L (m)", 1, 0.01, 20) +
          u.input("ppBias", "Durgun z kalibrasyonu (m/s²)", 9.80665, -30, 30) +
          '</div><p id="ppInstructions" class="hint"></p><div class="controls">' +
          u.button("ppCompute", "Hesapla") +
          u.button("ppMotion", "Hareket ölçümünü başlat") +
          u.button("ppMic", "Mikrofonu başlat") +
          u.button("ppStop", "Ölçümü durdur") +
          u.button("ppSim", "Etiketli örnek veri yükle") +
          u.button("ppCalibrate", "Durgun son 1 saniyeyi kalibre et") +
          '</div><p data-status role="status"></p><output id="ppResult" class="reading"></output><canvas id="ppGraph" width="900" height="300" aria-label="Ölçüm grafiği"></canvas></section><section class="panel"><h2>İki cihaz aktarımı</h2><p class="notice">QR saat eşzamanlaması yapmaz. Aynı darbeyi iki cihazda algıla; bağımsız bir ortak zaman kalibrasyonu ile saat farkını ve hata sınırını belirle. QR okuma gecikmesini uçuş süresi olarak kullanma. Varsayılan 100 ms belirsizlik kısa mesafe hesabını reddeder. Bu düzenekle ses hızını doğruladığını iddia etme.</p><div class="controls">' +
          u.button("ppQR", "Son darbeyi QR / kod yap") +
          u.button("ppScan", "Karşı cihaz QR’ını tara") +
          '</div><div id="ppQRBox" class="qr"></div>' +
          u.field("ppCode", "Karşı cihazın aktarım kodu") +
          u.button("ppImport", "Zaman paketini al") +
          '</section><section class="panel"><h2>Veri ve deney raporu</h2>' +
          u.field(
            "ppData",
            "Ham örnekler: t (s), y (m/s²)",
            "0,9.80665\n0.1,9.80665\n0.2,10.80665",
          ) +
          '<div class="controls">' +
          u.button("ppUse", "Elle girilen veriyi kullan") +
          u.button("ppExport", "Veriyi indir") +
          u.button("ppReport", "Bilimsel rapora aktar") +
          '</div><p><a href="https://www.animations.physics.unsw.edu.au/jw/doppler.htm" target="_blank" rel="noopener">Doppler modeli ve varsayımlar</a></p></section>',
      );
    const $ = (id) => root.querySelector("#" + id),
      life = u.scope(root);
    let run = null,
      samples = [],
      impulses = [],
      source = "manual",
      remote = null,
      timer = null;
    const val = (id, min, max) => u.number(root, id, min, max),
      status = (t) => (root.querySelector("[data-status]").textContent = t);
    function stop() {
      if (run) run.close();
      run = null;
      clearTimeout(timer);
      status("Ölçüm durdu. Kaynak: " + source);
    }
    function paint() {
      u.graph($("ppGraph"), samples.slice(-1200), "Ham değer");
    }
    function instructions() {
      const mode = $("ppMode").value;
      const texts = {
        speed:
          "v = d/Δt. İki ayrı cihazın saat farkı ve ses giriş gecikmeleri düzeltilmeden geçerli ölçüm olmaz.",
        echo: "d = c·Δt/2. Aynı sesin doğrudan darbesi ile yansımasını eşleştir. Algılanan iki tepe otomatik olarak yankı değildir; mikrofon/ses işleme gecikmeleri belirsizliğe dahildir.",
        lightning:
          "d ≈ c·Δt. Şimşeği gördüğün an ile gök gürültüsünü duyduğun anın aralığını gir; ışığın uçuş süresi burada ihmal edilir.",
        doppler:
          "Durgun gözlemci, hareketli kaynak: vᵣ = c(1 − f₀/f). Pozitif değer yaklaşma. Küçük hız yaklaşımı c·Δf/f₀ ayrıca gösterilir. Baskın FFT tepesi her zaman temel frekans değildir.",
        pendulum:
          "İvmeölçer x eksenindeki salınımdan yukarı sıfır geçişleri; en az üç tam döngü kaydet. g = 4π²L/T². Küçük açı ve doğru eksen gerekir.",
        elevator:
          "Düşeye sabitlenmiş z − kalibrasyon, trapez integrasyon. Başlangıç hızı sıfır varsayılır; kısa kayıt kullan. Yer değiştirme yüksek sürüklenmeli eğitim tahminidir.",
      };
      $("ppInstructions").textContent = texts[mode];
    }
    instructions();
    $("ppMode").onchange = () => {
      stop();
      samples = [];
      impulses = [];
      paint();
      instructions();
    };
    function compute() {
      const mode = $("ppMode").value,
        c = val("ppC", 250, 400),
        dt = val("ppTime", 0.001, 600000),
        unc = val("ppUncertainty", 0, 10000);
      let text;
      if (mode === "speed") {
        const r = m.acoustic(val("ppD", 0.01, 10000), dt, unc);
        text =
          "v = " +
          r.speed.toFixed(2) +
          " m/s\nBelirsizlik aralığı: " +
          r.low.toFixed(2) +
          "–" +
          r.high.toFixed(2) +
          " m/s\n" +
          (r.reliable
            ? "Girilen kalibrasyona bağlı eğitim tahmini."
            : "Belirsizlik %10 üzerinde; güvenilir ölçüm sayılmaz.");
      }
      if (mode === "echo") {
        if (unc >= dt)
          throw new Error("Yankı aralığı belirsizlikten büyük olmalı.");
        text =
          "Yansıtıcı uzaklığı ≈ " +
          ((c * dt) / 2000).toFixed(3) +
          " m; zaman kaynaklı belirsizlik ±" +
          ((c * unc) / 2000).toFixed(3) +
          " m. İki tepenin aynı darbenin yankısı olduğunu doğrula.";
      }
      if (mode === "lightning")
        text =
          "Yaklaşık uzaklık: " +
          ((c * dt) / 1000000).toFixed(3) +
          " km. Fırtına güvenliği için ölçüme güvenerek dışarıda kalma.";
      if (mode === "doppler") {
        const r = m.doppler(val("ppF", 30, 20000), val("ppF0", 30, 20000), c);
        text =
          "Kaynak radyal hızı: " +
          r.sourceRadial.toFixed(3) +
          " m/s\nDüşük hız yaklaşımı: " +
          r.approximate.toFixed(3) +
          " m/s";
      }
      if (mode === "pendulum") {
        const p = m.period(samples);
        if (!p) throw new Error("En az üç salınım döngüsü gerekli.");
        const g = m.gravity(val("ppLength", 0.01, 20), p.T);
        text =
          "T = " +
          p.T.toFixed(4) +
          " s; döngüler arası σ = " +
          p.spread.toFixed(4) +
          " s\ng = " +
          g.toFixed(3) +
          " m/s²; referansa bağıl hata %" +
          m.errorPercent(g, m.G).toFixed(2);
      }
      if (mode === "elevator") {
        if (samples.length < 2)
          throw new Error("Önce kayıt veya elle veri gerekli");
        const out = m.integrate(samples, val("ppBias", -30, 30));
        const last = out[out.length - 1];
        u.graph(
          $("ppGraph"),
          out.map((p) => ({ t: p.t, y: p.v })),
          "Hız (m/s)",
        );
        text =
          "vson ≈ " +
          last.v.toFixed(3) +
          " m/s; Δz ≈ " +
          last.z.toFixed(3) +
          " m\nBaşlangıçta durgun, düşeye sabit cihaz varsayımı; entegrasyon sürüklenmesi vardır.";
      }
      $("ppResult").textContent = text + "\nVeri kaynağı: " + source;
    }
    $("ppCompute").onclick = u.protect(root, compute);
    $("ppMotion").onclick = u.protect(root, async () => {
      stop();
      samples = [];
      impulses = [];
      source = "device";
      run = u.scope(root);
      await u.motion(run, (p) => {
        samples.push({
          t: p.t,
          y: $("ppMode").value === "pendulum" ? p.x : p.z,
        });
        if (samples.length > 6000) samples.shift();
        if (samples.length % 8 === 0) paint();
      });
      if (life.alive)
        status("Cihaz hareket verisi bekleniyor; kayıt en çok 60 saniye.");
      if (!life.alive) return;
      timer = setTimeout(stop, 60000);
    });
    $("ppMic").onclick = u.protect(root, async () => {
      stop();
      source = "device";
      impulses = [];
      samples = [];
      run = u.scope(root);
      try {
        await u.microphone(
          run,
          (p) => {
            impulses.push(p);
            impulses = impulses.slice(-12);
            status(
              "Darbe " +
                impulses.length +
                " · örnekleme " +
                p.sampleRate +
                " Hz. Önce doğrudan ses/yankı eşleşmesini kontrol et.",
            );
            if (impulses.length >= 2) {
              const a = impulses[impulses.length - 2];
              $("ppTime").value = ((p.time - a.time) * 1000).toFixed(4);
            }
          },
          (f, resolution) => {
            $("ppF").value = f.toFixed(2);
            $("ppResult").textContent =
              "Baskın frekans " +
              f.toFixed(1) +
              " Hz; FFT kutu genişliği " +
              resolution.toFixed(1) +
              " Hz. Temel tonu doğrula.";
          },
        );
      } catch (e) {
        run?.close();
        throw e;
      }
      if (!life.alive) return;
      timer = setTimeout(stop, 30000);
    });
    $("ppStop").onclick = stop;
    $("ppSim").onclick = () => {
      stop();
      source = "simulation";
      samples = Array.from({ length: 1201 }, (_, i) => ({
        t: i / 100,
        y:
          $("ppMode").value === "elevator"
            ? m.G + (i > 100 && i < 250 ? 1 : i > 700 && i < 850 ? -1 : 0)
            : Math.sin((i / 100) * Math.PI),
      }));
      $("ppData").value = samples.map((p) => p.t + "," + p.y).join("\n");
      paint();
      status("SİMÜLASYON yüklendi; gerçek ölçüm değildir.");
    };
    $("ppCalibrate").onclick = u.protect(root, () => {
      if (!samples.length) throw new Error("Önce durgun cihazdan kayıt al.");
      const end = samples[samples.length - 1].t,
        last = samples.filter((p) => p.t > end - 1);
      if (last.length < 5) throw new Error("En az beş durgun örnek gerekli");
      $("ppBias").value = (
        last.reduce((s, p) => s + p.y, 0) / last.length
      ).toFixed(5);
      status(
        "Son 1 saniyenin ortalaması kalibrasyon olarak alındı; cihazın durgunluğunu doğrula.",
      );
    });
    $("ppUse").onclick = u.protect(root, () => {
      stop();
      samples = u.rows($("ppData").value);
      source = "manual";
      paint();
    });
    $("ppExport").onclick = () =>
      u.download("telefon-fizik.json", {
        schema: 1,
        mode: $("ppMode").value,
        source,
        units: { t: "s", y: "m/s²" },
        samples,
        impulses,
      });
    $("ppReport").onclick = u.protect(root, () => {
      if (samples.length < 2) throw new Error("Önce veri kaydet.");
      App.prefs.set("discovery:labData", {
        name: $("ppMode").selectedOptions[0].textContent,
        source,
        unit: "m/s²",
        samples: samples.slice(-4000),
      });
      App.router.go("deney-raporu");
    });
    $("ppQR").onclick = u.protect(root, async () => {
      const p = impulses[impulses.length - 1];
      if (!p) throw new Error("Önce mikrofonla bir darbe algıla.");
      const packet = {
        schema: "KAI-AUDIO-1",
        id: App.utils.uid(),
        created: Date.now(),
        epoch: p.epoch,
        uncertainty: val("ppUncertainty", 0, 10000),
      };
      const code = JSON.stringify(packet);
      $("ppCode").value = code;
      await App.utils.loadScript("assets/vendor/qr/qrcode.js");
      if (!life.alive) return;
      const qr = window.qrcode(0, "L");
      qr.addData(code);
      qr.make();
      $("ppQRBox").innerHTML = qr.createSvgTag({
        cellSize: 4,
        margin: 2,
        scalable: true,
      });
    });
    $("ppImport").onclick = u.protect(root, () => {
      if ($("ppCode").value.length > 2048) throw new Error("Kod çok uzun");
      remote = pairing(JSON.parse($("ppCode").value));
      const local = impulses[impulses.length - 1];
      if (!local) throw new Error("B cihazında aynı darbeyi algıla.");
      $("ppTime").value = Math.abs(
        local.epoch - val("ppOffset", -100000, 100000) - remote.epoch,
      ).toFixed(4);
      $("ppUncertainty").value = Math.max(
        val("ppUncertainty", 0, 10000),
        remote.uncertainty,
      );
      status(
        "Paket alındı. Aynı fiziksel olay ve bağımsız saat kalibrasyonu şart; kod tarama süresi kullanılmadı.",
      );
    });
    $("ppScan").onclick = u.protect(root, async () => {
      const text = await App.discoveryVision.scanQR(life);
      if (life.alive && text) $("ppCode").value = text;
    });
    life.add(() => {
      stop();
    });
    return () => life.close();
  }
  App.phonePhysics = { pairing };
  App.router.register("telefon-fizik", render);
})();
