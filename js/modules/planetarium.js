(function () {
  const esc = App.utils.esc;
  function pointing(alpha, beta, gamma) {
    if (![alpha, beta, gamma].every(Number.isFinite))
      throw new Error("Yönelim verisi eksik");
    const d = Math.PI / 180,
      a = alpha * d,
      b = beta * d,
      g = gamma * d,
      x = -Math.cos(a) * Math.sin(g) - Math.sin(a) * Math.sin(b) * Math.cos(g),
      y = -Math.sin(a) * Math.sin(g) + Math.cos(a) * Math.sin(b) * Math.cos(g),
      z = -Math.cos(b) * Math.cos(g);
    return {
      azimuth: (Math.atan2(x, y) / d + 360) % 360,
      altitude: Math.asin(Math.max(-1, Math.min(1, z))) / d,
    };
  }
  function render(view) {
    const u = App.discovery,
      m = App.discoveryModel,
      root = u.page(
        view,
        "gokyuzu",
        '<div class="notice">Çevrimdışı yaklaşık gökyüzü modeli: JPL Kepler elemanları (1800–2050), yıldızlar J2000 konumları; ışık zamanı, atmosfer kırılması ve presesyon bu eğitim çiziminde uygulanmaz. Teleskop yönlendirmesi için kullanılmaz. Ay evresi ortalama döngü yaklaşımıdır.</div><section class="panel"><div class="controls">' +
          u.input("skyLat", "Enlem (°)", 39.93, -90, 90) +
          u.input("skyLon", "Boylam, doğu pozitif (°)", 32.86, -180, 180) +
          '<label>UTC tarih ve saat<input id="skyTime" type="datetime-local" value="' +
          new Date().toISOString().slice(0, 16) +
          '" min="1800-01-01T00:00" max="2049-12-31T23:59"></label></div><div class="controls">' +
          u.button("skyDraw", "Gökyüzünü hesapla") +
          u.button("skyGPS", "Konumumu al") +
          u.button("skyCompass", "Cihaz yönünü izle") +
          u.button("skyStop", "Yön izlemeyi durdur") +
          '</div><p data-status role="status"></p><output id="skyPoint" class="reading"></output><canvas id="skyCanvas" width="900" height="500" aria-label="Azimut ve yükseklik gökyüzü haritası"></canvas><div id="skyTable" class="table-scroll"></div><p id="skyMoon"></p></section><section class="panel"><h2>Kepler ve mevsimler</h2><p>Gezegenler elipslerde dolanır; eşit zamanlarda eşit alanlar taranır. Aynı merkez için T²/a³ sabittir. Mevsimler Dünya’nın yaklaşık 23,44° eksen eğikliğine bağlıdır; Güneş’e uzaklık tek başına açıklamaz.</p><a href="#/lab">İlgili deneyleri aç</a> · <a target="_blank" rel="noopener" href="https://ssd.jpl.nasa.gov/planets/approx_pos.html">JPL hesap yöntemi ve geçerlilik aralığı</a></section>',
      );
    const $ = (id) => root.querySelector("#" + id),
      life = u.scope(root);
    let run = null,
      items = [],
      pointer = null;
    function draw() {
      const canvas = $("skyCanvas"),
        c = canvas.getContext("2d");
      c.clearRect(0, 0, 900, 500);
      c.fillStyle = "#101727";
      c.fillRect(0, 0, 900, 500);
      c.strokeStyle = "#59647b";
      c.fillStyle = "#cbd5ec";
      for (let a = 0; a <= 360; a += 45) {
        c.beginPath();
        c.moveTo(a * 2.5, 0);
        c.lineTo(a * 2.5, 480);
        c.stroke();
        c.fillText(a + "°", a * 2.5 + 3, 493);
      }
      for (let h = 0; h <= 90; h += 30) {
        c.beginPath();
        c.moveTo(0, 480 - h * 5);
        c.lineTo(900, 480 - h * 5);
        c.stroke();
        c.fillText(h + "°", 4, 478 - h * 5);
      }
      items
        .filter((p) => p.altitude >= 0)
        .forEach((p) => {
          c.fillStyle = p.star ? "#c6d8ff" : "#ffd279";
          c.beginPath();
          c.arc(p.azimuth * 2.5, 480 - p.altitude * 5, p.star ? 3 : 6, 0, 7);
          c.fill();
          c.fillText(
            p.name,
            Math.min(790, p.azimuth * 2.5 + 8),
            480 - p.altitude * 5,
          );
        });
      if (pointer) {
        c.strokeStyle = "#80e6b7";
        c.beginPath();
        c.arc(pointer.azimuth * 2.5, 480 - pointer.altitude * 5, 18, 0, 7);
        c.stroke();
      }
    }
    function compute() {
      const lat = u.number(root, "skyLat", -90, 90),
        lon = u.number(root, "skyLon", -180, 180),
        ms = Date.parse($("skyTime").value + "Z");
      if (!Number.isFinite(ms)) throw new Error("Geçerli UTC zaman gir.");
      items = [
        ["sun", "Güneş"],
        ["mercury", "Merkür"],
        ["venus", "Venüs"],
        ["mars", "Mars"],
        ["jupiter", "Jüpiter"],
        ["saturn", "Satürn"],
      ].map(([id, name]) => ({ name, ...m.sky(id, ms, lat, lon) }));
      items.push(
        ...App.data.discovery.stars.map(([name, ra, dec]) => ({
          name,
          star: true,
          ...m.horizontal(ra, dec, ms, lat, lon),
        })),
      );
      $("skyTable").innerHTML =
        "<table><thead><tr><th>Gök cismi</th><th>Azimut (K=0°, D=90°)</th><th>Yükseklik</th></tr></thead><tbody>" +
        items
          .map(
            (p) =>
              "<tr><td>" +
              esc(p.name) +
              "</td><td>" +
              p.azimuth.toFixed(1) +
              "°</td><td>" +
              p.altitude.toFixed(1) +
              "°" +
              (p.altitude < 0 ? " (ufuk altında)" : "") +
              "</td></tr>",
          )
          .join("") +
        "</tbody></table>";
      const moon = m.lunarPhase(ms),
        hours = (((ms / 3600000 + lon / 15) % 24) + 24) % 24;
      $("skyMoon").textContent =
        "Ay: yaklaşık aydınlık oranı %" +
        (moon.illuminated * 100).toFixed(1) +
        " · " +
        (moon.phase < 0.5 ? "büyüyen" : "küçülen") +
        " evre. Yerel ortalama güneş saati ≈ " +
        Math.floor(hours) +
        ":" +
        String(Math.floor((hours % 1) * 60)).padStart(2, "0") +
        " (medeni saat değildir).";
      draw();
    }
    $("skyDraw").onclick = u.protect(root, compute);
    $("skyGPS").onclick = u.protect(
      root,
      () =>
        new Promise((resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error("Konum desteklenmiyor; elle enlem/boylam gir."));
            return;
          }
          let id = navigator.geolocation.watchPosition(
            (p) => {
              navigator.geolocation.clearWatch(id);
              if (life.alive) {
                $("skyLat").value = p.coords.latitude.toFixed(5);
                $("skyLon").value = p.coords.longitude.toFixed(5);
                try {
                  compute();
                } catch (e) {
                  reject(e);
                  return;
                }
              }
              resolve();
            },
            (e) => {
              navigator.geolocation.clearWatch(id);
              reject(new Error("Konum alınamadı; elle gir."));
            },
            { timeout: 10000, enableHighAccuracy: false, maximumAge: 60000 },
          );
          life.add(() => navigator.geolocation.clearWatch(id));
        }),
    );
    function stop() {
      if (run) run.close();
      run = null;
      pointer = null;
      draw();
    }
    $("skyCompass").onclick = u.protect(root, async () => {
      stop();
      const O =
        /** @type {typeof DeviceOrientationEvent & {requestPermission?: () => Promise<string>}} */ (
          window.DeviceOrientationEvent
        );
      if (!O) throw new Error("Yönelim desteklenmiyor; elle haritayı kullan.");
      run = u.scope(root);
      if (
        typeof O.requestPermission === "function" &&
        (await O.requestPermission()) !== "granted"
      )
        throw new Error("Yönelim izni verilmedi.");
      if (!run?.alive) return;
      const handler = (e) => {
        if (!run?.alive || ![e.alpha, e.beta, e.gamma].every(Number.isFinite))
          return;
        const absolute =
          e.absolute === true || Number.isFinite(e.webkitCompassHeading);
        pointer = pointing(e.alpha, e.beta, e.gamma);
        if (Number.isFinite(e.webkitCompassHeading))
          pointer.azimuth = e.webkitCompassHeading;
        $("skyPoint").textContent =
          "Cihaz: azimut " +
          pointer.azimuth.toFixed(1) +
          "°, yükseklik " +
          pointer.altitude.toFixed(1) +
          "°. " +
          (absolute
            ? "Mutlak/pusula yönelimi; metal ve kalibrasyon sapma yaratabilir."
            : "Göreli yönelim: kuzey kalibre değil. Gerçek gök cismi hizalaması sayılmaz.");
        draw();
      };
      window.addEventListener("deviceorientation", handler);
      run.add(() => window.removeEventListener("deviceorientation", handler));
      root.querySelector("[data-status]").textContent =
        "Yönelim olayı bekleniyor. Cihazı dik tut; otomatik gerçek AR hizalaması garanti edilmez.";
    });
    $("skyStop").onclick = stop;
    compute();
    life.add(stop);
    return () => life.close();
  }
  App.planetarium = { pointing, render };
  App.router.register("gokyuzu", render);
})();
