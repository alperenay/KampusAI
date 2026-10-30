(function () {
  const esc = App.utils.esc;
  function printGraph(report) {
    const c = document.createElement("canvas");
    c.width = 1200;
    c.height = 460;
    const g = c.getContext("2d"),
      rows = report.rows;
    const xs = rows.map((p) => p.t),
      ys = rows.map((p) => p.y);
    const x0 = Math.min(...xs),
      x1 = Math.max(...xs),
      y0 = Math.min(...ys),
      y1 = Math.max(...ys);
    const X = (x) => 90 + ((x - x0) / Math.max(1e-9, x1 - x0)) * 1080,
      Y = (y) => 385 - ((y - y0) / Math.max(1e-9, y1 - y0)) * 320;
    g.fillStyle = "#fff";
    g.fillRect(0, 0, 1200, 460);
    g.strokeStyle = "#111";
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(90, 50);
    g.lineTo(90, 385);
    g.lineTo(1170, 385);
    g.stroke();
    g.fillStyle = "#111";
    g.font = "22px serif";
    g.fillText(report.unit, 12, 30);
    g.fillText("t / x", 1100, 435);
    g.fillText(x0.toPrecision(5), 90, 420);
    g.fillText(x1.toPrecision(5), 1000, 420);
    g.fillText(y0.toPrecision(5), 3, 385);
    g.fillText(y1.toPrecision(5), 3, 65);
    g.save();
    g.beginPath();
    g.rect(89, 49, 1082, 337);
    g.clip();
    g.strokeStyle = "#164e9a";
    g.lineWidth = 3;
    g.beginPath();
    rows.forEach((p, i) =>
      i ? g.lineTo(X(p.t), Y(p.y)) : g.moveTo(X(p.t), Y(p.y)),
    );
    g.stroke();
    if (report.fit) {
      g.strokeStyle = "#9b4200";
      g.setLineDash([10, 6]);
      g.beginPath();
      g.moveTo(X(x0), Y(report.fit.slope * x0 + report.fit.intercept));
      g.lineTo(X(x1), Y(report.fit.slope * x1 + report.fit.intercept));
      g.stroke();
    }
    g.restore();
    g.fillStyle = "#164e9a";
    g.fillText("Mavi: ham veri", 400, 30);
    if (report.fit) {
      g.fillStyle = "#9b4200";
      g.fillText("Kesikli: doğrusal uyum", 650, 30);
    }
    return c.toDataURL("image/png");
  }
  function parsePacket(p) {
    if (
      !p ||
      !["device", "manual", "simulation"].includes(p.source) ||
      !Array.isArray(p.samples) ||
      p.samples.length < 2 ||
      p.samples.length > 4000
    )
      throw new Error("2–4000 örnekli geçerli sensör paketi gerekli");
    const samples = p.samples.map((s) => ({
      t: s.t,
      y: Number.isFinite(s.y) && !("x" in s) ? s.y : s.x,
    }));
    if (samples.some((s) => ![s.t, s.y].every(Number.isFinite)))
      throw new Error("Sonlu t ve değer gerekli");
    return {
      source: p.source,
      samples,
      unit: String(p.unit || "belirtilmedi").slice(0, 40),
      name: String(p.name || p.sensor || "Sensör deneyi").slice(0, 150),
    };
  }
  function render(view) {
    const u = App.discovery,
      m = App.discoveryModel,
      root = u.page(
        view,
        "deney-raporu",
        '<section class="panel"><div class="controls"><label>Deney adı<input id="srName" value="İvme–zaman deneyi" maxlength="150"></label><label>Veri kaynağı<select id="srSource"><option value="manual">Elle girildi</option><option value="device">Cihaz ölçümü</option><option value="simulation">Simülasyon</option></select></label><label>Değer birimi<input id="srUnit" value="m/s²" maxlength="40"></label></div>' +
          u.field("srHypothesis", "Hipotezin") +
          u.field("srMaterials", "Araçlar ve yöntem") +
          u.field(
            "srRows",
            "Ham veri — t / x,değer; ondalık nokta",
            "0,0\n1,1.1\n2,1.9\n3,3.1",
          ) +
          '<label>Sensör JSON dosyası yükle<input id="srFile" type="file" accept="application/json,.json"></label>' +
          u.button("srLast", "Son aktarılan laboratuvar verisini al") +
          '<div class="controls"><label>Uyum modeli<select id="srFit"><option value="linear">Doğrusal — yalnız doğrusal ilişki bekleniyorsa</option><option value="none">Uyum yok — ham veri</option></select></label>' +
          u.input(
            "srMeasured",
            "Karşılaştırılacak deneysel değer",
            1,
            -1000000,
            1000000,
          ) +
          u.input("srTheory", "Kuramsal değer", 1, -1000000, 1000000) +
          "</div>" +
          u.field("srErrors", "Hata kaynakları ve belirsizlikler") +
          u.field("srConclusion", "Kendi sonucun ve yansıtman") +
          '<div class="controls">' +
          u.button("srBuild", "Raporu hazırla") +
          u.button("srPrint", "PDF olarak yazdır / kaydet") +
          u.button("srExport", "Rapor verisini indir") +
          '</div><p class="hint">PDF düğmesi sistem yazdırma ekranını açar; PDF olarak kaydet’i seç. Rubrik yalnız metindeki kanıt bileşenlerini arar; bilimsel doğruluk notu vermez. Ham veriler rapora dahildir.</p><p data-status role="status"></p></section><section class="panel" id="srPreview" aria-label="Rapor önizlemesi"></section>',
      );
    const $ = (id) => root.querySelector("#" + id),
      life = u.scope(root);
    let report = null,
      printSheet = null;
    function load(p) {
      const q = parsePacket(p);
      $("srName").value = q.name;
      $("srSource").value = q.source;
      $("srUnit").value = q.unit;
      $("srRows").value = q.samples.map((p) => p.t + "," + p.y).join("\n");
    }
    const previous = App.prefs.get("discovery:labData", null);
    if (previous)
      try {
        load(previous);
      } catch (e) {
        /* invalid old import never clobbers current fields */
      }
    $("srLast").onclick = u.protect(root, () => {
      const p = App.prefs.get("discovery:labData", null);
      if (!p) throw new Error("Önce fizik/sismograf ekranından veri aktar.");
      load(p);
    });
    $("srFile").onchange = u.protect(root, async () => {
      const file = $("srFile").files[0];
      if (!file) return;
      if (file.size > 1000000)
        throw new Error("JSON dosyası en çok 1 MB olmalı.");
      const p = JSON.parse(await file.text());
      if (life.alive) load(p);
    });
    function build() {
      const rows = u.rows($("srRows").value),
        fit = $("srFit").value === "linear" ? m.linearFit(rows) : null,
        measured = u.number(root, "srMeasured"),
        theory = u.number(root, "srTheory"),
        error = theory === 0 ? null : m.errorPercent(measured, theory),
        rubric = m.conclusionRubric($("srConclusion").value);
      report = {
        schema: 1,
        name: $("srName").value,
        source: $("srSource").value,
        unit: $("srUnit").value,
        at: new Date().toISOString(),
        hypothesis: $("srHypothesis").value,
        materials: $("srMaterials").value,
        rows,
        fit,
        measured,
        theory,
        error,
        errorSources: $("srErrors").value,
        conclusion: $("srConclusion").value,
        rubric,
      };
      $("srPreview").innerHTML =
        "<h2>" +
        esc(report.name) +
        "</h2><p>Kaynak: <b>" +
        esc(report.source) +
        "</b> · " +
        esc(report.at) +
        "</p><h3>Hipotez</h3><p>" +
        esc(report.hypothesis || "Öğrenci tarafından henüz girilmedi.") +
        "</p><h3>Araçlar ve yöntem</h3><p>" +
        esc(report.materials || "Henüz girilmedi.") +
        '</p><h3>Ham veri</h3><div class="table-scroll"><table><thead><tr><th>t / x</th><th>' +
        esc(report.unit) +
        "</th></tr></thead><tbody>" +
        rows
          .map((p) => "<tr><td>" + p.t + "</td><td>" + p.y + "</td></tr>")
          .join("") +
        '</tbody></table></div><h3>Grafik ve uyum</h3><canvas width="900" height="330" id="srChart" aria-label="Ham veri ve uyum eğrisi"></canvas><p>' +
        esc(
          fit
            ? "y = " +
                fit.slope.toFixed(5) +
                "x + " +
                fit.intercept.toFixed(5) +
                "; R² = " +
                fit.r2.toFixed(4)
            : "Uyum uygulanmadı.",
        ) +
        "</p><h3>Kuramsal karşılaştırma</h3><p>Deneysel: " +
        measured +
        "; kuramsal: " +
        theory +
        "; bağıl hata: " +
        (error === null
          ? "kuramsal değer sıfırken tanımsız"
          : "%" + error.toFixed(3)) +
        "</p><h3>Hata kaynakları</h3><p>" +
        esc(report.errorSources || "Henüz girilmedi.") +
        "</p><h3>Öğrenci sonucu</h3><p>" +
        esc(report.conclusion || "Henüz girilmedi.") +
        "</p><h3>Yazım rubriği (doğruluk değerlendirmesi değildir)</h3><ul>" +
        rubric
          .map(
            (r) =>
              "<li>" +
              esc(r.label) +
              ": " +
              (r.met ? "metinsel gösterge var" : "geliştirilebilir") +
              "</li>",
          )
          .join("") +
        "</ul>";
      const rawTable = $("srPreview").querySelector(".table-scroll");
      const summary = document.createElement("p");
      summary.textContent =
        rows.length +
        " ölçüm; tam ham veri tablosu raporun sonundaki ektedir. JSON dışa aktarımı sayısal değerleri korur.";
      rawTable.before(summary);
      rawTable.remove();
      const appendix = document.createElement("section");
      appendix.className = "raw-appendix";
      appendix.innerHTML = "<h3>Ek: Ham verilerin tamamı</h3>";
      appendix.appendChild(rawTable);
      $("srPreview").appendChild(appendix);
      u.graph(
        $("srChart"),
        rows,
        report.unit,
        fit ? (x) => fit.slope * x + fit.intercept : null,
      );
      root.querySelector("[data-status]").textContent =
        "Rapor hazır. Başlıkları ve veri kaynağını kontrol et.";
      return report;
    }
    $("srBuild").onclick = u.protect(root, build);
    $("srExport").onclick = u.protect(root, () =>
      u.download("deney-raporu.json", build()),
    );
    function cleanPrint() {
      document.body.classList.remove("discovery-print");
      if (printSheet) printSheet.remove();
      printSheet = null;
    }
    $("srPrint").onclick = u.protect(root, async () => {
      build();
      cleanPrint();
      printSheet = document.createElement("article");
      printSheet.id = "discovery-print-sheet";
      printSheet.hidden = true;
      printSheet.innerHTML = $("srPreview").innerHTML;
      const canvas = printSheet.querySelector("canvas"),
        img = document.createElement("img");
      img.alt = "Ham veri ve uyum grafiği";
      img.src = printGraph(report);
      canvas.replaceWith(img);
      printSheet
        .querySelector(".table-scroll")
        .setAttribute("style", "max-height:none;overflow:visible");
      document.body.appendChild(printSheet);
      await img.decode();
      if (!life.alive) {
        cleanPrint();
        return;
      }
      document.body.classList.add("discovery-print");
      window.print();
    });
    window.addEventListener("afterprint", cleanPrint);
    life.add(() => {
      window.removeEventListener("afterprint", cleanPrint);
      cleanPrint();
    });
    return () => life.close();
  }
  App.scienceReport = { parsePacket, render };
})();
