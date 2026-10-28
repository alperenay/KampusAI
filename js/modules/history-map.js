(function () {
  function snapshot(year) {
    const list = App.data.discovery.history;
    return list.filter((s) => s.year <= year).slice(-1)[0] || list[0];
  }
  function render(view) {
    const u = App.discovery,
      esc = App.utils.esc,
      data = App.data.discovery,
      root = u.page(
        view,
        "tarih-haritasi",
        '<div class="notice">Bu, yaklaşık odak bölgeleri ve yollarla hazırlanmış şematik tarih öğrenme haritasıdır. Çizgiler kesin egemenlik, modern hak iddiası veya yıllık tarih atlası sınırları değildir. Dönemler arasında yapay sınır interpolasyonu yapılmaz; en son tarihli kaynaklı kesit gösterilir.</div><section class="panel"><label>Tarih: <output id="hmYear">1071</output><input id="hmTime" type="range" min="1071" max="1923" value="1071" step="1"></label><div class="controls">' +
          u.button("hmPrev", "Önceki dönem") +
          u.button("hmNext", "Sonraki dönem") +
          '<label><input id="hmTrade" type="checkbox" checked> Ticaret yolları</label><label><input id="hmCampaign" type="checkbox" checked> Döneme ait sefer yönelimi</label></div><svg id="hmMap" viewBox="0 0 1000 480" role="img" aria-label="Zamana bağlı şematik tarih haritası"></svg><div id="hmDossier"></div><p data-status role="status"></p></section><section class="panel"><h2>Bağlam ve kaynaklar</h2><p>Yollar tek bir hat değil ağlardır; burada yön ve bağlantı fikri gösterilir. Zamanı sürükle, kaynaklı dönem kartını oku ve mevcut ayrıntılı zaman çizelgesindeki olaylarla karşılaştır.</p><a href="#/zaman">Ayrıntılı tarih zaman çizelgesi</a> · <a href="#/atlas">Coğrafya atlası</a><div id="hmSources"></div></section>',
      );
    const $ = (id) => root.querySelector("#" + id),
      X = (x) => ((x - 5) / 110) * 1000,
      Y = (y) => 480 - ((y - 0) / 55) * 480;
    let current;
    const path = (pts) =>
      pts.map((p) => X(p[0]).toFixed(1) + "," + Y(p[1]).toFixed(1)).join(" ");
    function paint() {
      const year = Number($("hmTime").value),
        s = snapshot(year);
      current = s;
      $("hmYear").textContent = year;
      const routes = data.routes.filter((r) =>
        r.type === "trade"
          ? $("hmTrade").checked
          : $("hmCampaign").checked && r.year === s.year,
      );
      $("hmMap").innerHTML =
        '<rect width="1000" height="480" fill="#101727"/><text x="18" y="27" fill="#ccd8ed">Şematik bağlantı haritası • ızgara: boylam / enlem</text>' +
        [20, 40, 60, 80, 100]
          .map(
            (x) =>
              '<path d="M' +
              X(x) +
              ' 0 V480" stroke="#4a5869"/><text x="' +
              X(x) +
              '" y="470" fill="#b7c8dc">' +
              x +
              "°D</text>",
          )
          .join("") +
        [10, 30, 50]
          .map(
            (y) =>
              '<path d="M0 ' +
              Y(y) +
              ' H1000" stroke="#4a5869"/><text x="5" y="' +
              Y(y) +
              '" fill="#b7c8dc">' +
              y +
              "°K</text>",
          )
          .join("") +
        '<polygon id="hmRegion" tabindex="0" role="button" aria-label="Dönem kartını aç" points="' +
        path(s.polygon) +
        '" fill="#708dff55" stroke="#a2b7ff" stroke-width="3"/>' +
        routes
          .map(
            (r, i) =>
              '<polyline class="map-route" fill="none" stroke="' +
              (r.type === "trade" ? "#efc568" : "#f28d89") +
              '" stroke-width="3" points="' +
              path(r.points) +
              '"/><text x="18" y="' +
              (52 + i * 22) +
              '" fill="' +
              (r.type === "trade" ? "#efc568" : "#f28d89") +
              '">' +
              esc(r.name) +
              "</text>",
          )
          .join("");
      $("hmDossier").innerHTML =
        "<h2>" +
        s.year +
        " · " +
        esc(s.title) +
        "</h2><p>" +
        esc(s.text) +
        "</p><p>Gösterilen tarih kesiti: " +
        s.year +
        "; sürgüde seçilen yıl: " +
        year +
        '. Aradaki tüm yıllar için sınır doğruluğu iddia edilmez.</p><a target="_blank" rel="noopener" href="' +
        esc(s.source) +
        '">Dönem bilgisinin kaynağı</a>';
      $("hmSources").innerHTML = routes
        .map(
          (r) =>
            "<p>" +
            esc(r.name) +
            ' · <a target="_blank" rel="noopener" href="' +
            esc(r.source) +
            '">Kaynak</a></p>',
        )
        .join("");
      const open = () =>
        App.ui.modal({
          title: s.title,
          body:
            "<p>" +
            esc(s.text) +
            '</p><p>Harita şematiktir.</p><a target="_blank" rel="noopener" href="' +
            esc(s.source) +
            '">Kaynağı incele</a>',
        });
      root.querySelector("#hmRegion").onclick = open;
      root.querySelector("#hmRegion").onkeydown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      };
    }
    $("hmTime").oninput = paint;
    $("hmTrade").onchange = $("hmCampaign").onchange = paint;
    $("hmPrev").onclick = () => {
      $("hmTime").value = String(
        data.history
          .filter((s) => s.year < Number($("hmTime").value))
          .slice(-1)[0]?.year || 1071,
      );
      paint();
    };
    $("hmNext").onclick = () => {
      $("hmTime").value = String(
        data.history.find((s) => s.year > Number($("hmTime").value))?.year ||
          1923,
      );
      paint();
    };
    paint();
  }
  App.historyMap = { snapshot };
  App.router.register("tarih-haritasi", render);
})();
