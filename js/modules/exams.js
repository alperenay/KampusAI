/* =========================================================
   exams.js — TYT / AYT Deneme Takip ve Analiz
   #/denemeler               → özet ekranı (dashboard)
   #/denemeler/yeni[/ayt]    → yeni deneme formu
   #/denemeler/duzenle/<id>  → kayıtlı denemeyi düzenleme

   Kayıt biçimi ("exams" deposu):
   { id, type: "TYT"|"AYT", name, date: "YYYY-MM-DD",
     results: { <dersId>: { d, y } }, createdAt, updatedAt }
   Netler kaydedilmez, her seferinde config'ten hesaplanır;
   böylece kural değişirse eski denemeler de doğru hesaplanır.
   ========================================================= */
(function () {
  const { esc, fmtNum, fmtDate, round, todayISO, uid } = App.utils;
  const CFG = App.data.exams;
  const t = App.t, tn = App.tn, L = App.L;

  const subjName = (s) => L(s.name);
  const subjShort = (s) => L(s.short || s.name);

  /* ---------------- Hesaplama ---------------- */
  function compute(exam) {
    const subjects = CFG.types[exam.type].subjects;
    const per = {};
    let total = 0, totalQ = 0, d = 0, y = 0;
    subjects.forEach((s) => {
      const r = exam.results && exam.results[s.id];
      if (!r) return;
      const net = CFG.calcNet(r.d, r.y);
      per[s.id] = { d: r.d, y: r.y, b: s.questions - r.d - r.y, net, q: s.questions };
      total += net; totalQ += s.questions; d += r.d; y += r.y;
    });
    return { per, total: round(total, 2), totalQ, d, y };
  }

  function sortChrono(list) {
    return list.slice().sort((a, b) => (a.date === b.date ? (a.createdAt || "").localeCompare(b.createdAt || "") : a.date.localeCompare(b.date)));
  }

  App.exams = { compute, sortChrono };

  /* =========================================================
     ÖZET EKRANI
     ========================================================= */
  async function renderDashboard(view) {
    const type = App.prefs.get("examType", "TYT");
    const all = await App.db.getAll("exams");
    const list = sortChrono(all.filter((e) => e.type === type));
    const subjects = CFG.types[type].subjects;
    const typeTabs =
      '<div class="tabs" role="tablist">' + Object.keys(CFG.types).map((ty) =>
        '<button class="tab' + (ty === type ? " is-active" : "") + '" type="button" data-type="' + ty + '" role="tab" title="' + esc(L(CFG.types[ty].long)) + '">' + ty +
        ' <span style="color:var(--faint);font-weight:400">' + all.filter((e) => e.type === ty).length + "</span></button>"
      ).join("") + "</div>";

    const head =
      '<div class="page-head"><div><h1>' + esc(t("ex.title")) + "</h1><p>" + esc(t("ex.intro")) + "</p></div>" +
      '<div class="page-head__actions">' + typeTabs +
      '<a class="btn btn--primary" href="#/denemeler/yeni/' + type.toLowerCase() + '">' + App.icon("plus") + esc(t("ex.addType", { type })) + "</a></div></div>";

    if (!list.length) {
      view.innerHTML = '<div class="page">' + head + App.goals.cardHtml(type, []) +
        App.ui.empty("chart", t("ex.emptyTitle", { type }), t("ex.emptyText"),
          '<a class="btn btn--primary" href="#/denemeler/yeni/' + type.toLowerCase() + '">' + App.icon("plus") + esc(t("ex.addFirst")) + "</a>") +
        "</div>";
      bindTypeTabs(view);
      return;
    }

    const computed = list.map((e) => ({ exam: e, c: compute(e) }));
    const totals = computed.map((x) => x.c.total);
    const avg = totals.reduce((a, b) => a + b, 0) / totals.length;
    const last = computed[computed.length - 1];
    const prev = computed[computed.length - 2];
    const best = computed.reduce((m, x) => (x.c.total > m.c.total ? x : m), computed[0]);
    const delta = prev ? round(last.c.total - prev.c.total, 2) : null;

    // Ders bazlı ortalama (sadece o dersi içeren denemeler)
    const subjectAvg = subjects.map((s) => {
      const vals = computed.map((x) => x.c.per[s.id]).filter(Boolean);
      const mean = vals.length ? vals.reduce((a, v) => a + v.net, 0) / vals.length : null;
      return { s, mean, count: vals.length };
    }).filter((x) => x.count);

    const stat = (label, value, sub) =>
      '<div class="stat"><div class="stat__label">' + esc(label) + '</div><div class="stat__value">' + value + '</div><div class="stat__sub">' + (sub || "&nbsp;") + "</div></div>";

    const deltaHtml = delta == null ? esc(t("ex.firstExam"))
      : delta === 0 ? esc(t("ex.same"))
      : '<span class="' + (delta > 0 ? "delta-up" : "delta-down") + '">' + App.icon(delta > 0 ? "arrowUp" : "arrowDown").replace('class="ico"', 'class="ico" style="width:14px;height:14px"') +
        (delta > 0 ? "+" : "") + fmtNum(delta) + "</span> " + esc(t("ex.vsPrevious"));

    const seriesOptions = '<option value="__total">' + esc(t("ex.totalNet")) + "</option>" +
      subjectAvg.map((x) => '<option value="' + x.s.id + '">' + esc(subjName(x.s)) + "</option>").join("");

    view.innerHTML =
      '<div class="page">' + head +
        App.goals.cardHtml(type, computed) +
        '<div class="grid grid--4">' +
          stat(t("ex.count"), list.length, esc(fmtDate(list[0].date, true) + " – " + fmtDate(last.exam.date, true))) +
          stat(t("ex.avg"), fmtNum(avg, 1), esc(t("ex.allOfType", { type }))) +
          stat(t("ex.last"), fmtNum(last.c.total), deltaHtml) +
          stat(t("ex.best"), fmtNum(best.c.total), esc(best.exam.name)) +
        "</div>" +

        '<div class="card chart-card" style="margin-top:14px">' +
          '<div class="chart-card__head"><div><div class="card__title">' + esc(t("ex.progress")) + '</div><div class="card__sub" id="chartSub"></div></div>' +
          '<select class="select" id="seriesSel" style="width:auto;min-width:180px" aria-label="' + esc(t("ex.series")) + '">' + seriesOptions + "</select></div>" +
          '<div id="chartHost" style="position:relative"></div>' +
        "</div>" +

        '<div class="card" style="margin-top:14px">' +
          '<div class="card__title">' + esc(t("ex.bySubject")) + '</div><div class="card__sub" style="margin-bottom:16px">' + esc(t("ex.bySubjectHint")) + "</div>" +
          '<div class="bars">' + subjectAvg.map((x) => {
            const pct = Math.max(0, Math.min(100, (x.mean / x.s.questions) * 100));
            return '<div class="bar-row" title="' + esc(t("ex.barTip", { name: subjName(x.s), avg: fmtNum(x.mean), n: x.count })) + '">' +
              '<span class="bar-row__name">' + esc(subjName(x.s)) + "</span>" +
              '<span class="bar-row__track"><span class="bar-row__fill" style="width:' + pct.toFixed(1) + '%"></span></span>' +
              '<span class="bar-row__val">' + fmtNum(x.mean, 1) + " <small>/ " + x.s.questions + "</small></span></div>";
          }).join("") + "</div>" +
        "</div>" +

        '<h2 class="section-title">' + esc(t("ex.allTitle", { type })) + "</h2>" +
        tableHtml(computed.slice().reverse(), subjects) +
      "</div>";

    bindTypeTabs(view);

    // Grafik
    const host = view.querySelector("#chartHost");
    const sel = view.querySelector("#seriesSel");
    const sub = view.querySelector("#chartSub");
    const draw = () => {
      const key = sel.value;
      const pts = computed
        .map((x) => ({ exam: x.exam, v: key === "__total" ? x.c.total : (x.c.per[key] ? x.c.per[key].net : null) }))
        .filter((p) => p.v != null);
      const subj = subjects.find((s) => s.id === key);
      const maxQ = key === "__total" ? Math.max.apply(null, computed.map((x) => x.c.totalQ)) : subj.questions;
      sub.textContent = t("ex.chartSub", { series: key === "__total" ? t("ex.totalNet") : t("ex.subjectNet", { name: subjName(subj) }), n: pts.length, max: maxQ });
      drawLine(host, pts, maxQ);
    };
    sel.addEventListener("change", draw);
    draw();
    const ro = new ResizeObserver(App.utils.debounce(draw, 80));
    ro.observe(host);

    // Tablo işlemleri
    const onClick = async (e) => {
      const del = e.target.closest("[data-del]");
      if (!del) return;
      const exam = list.find((x) => x.id === del.dataset.del);
      if (exam && (await App.ui.confirm(t("ex.deleteConfirm", { name: exam.name }), t("delete"), true))) {
        await App.db.remove("exams", exam.id);
        App.ui.toast(t("ex.deleted"));
        App.router.refresh();
      }
    };
    view.addEventListener("click", onClick);
    return () => { ro.disconnect(); view.removeEventListener("click", onClick); };
  }

  function bindTypeTabs(view) {
    view.querySelectorAll("[data-type]").forEach((b) => b.addEventListener("click", () => {
      App.prefs.set("examType", b.dataset.type);
      App.router.refresh();
    }));
  }

  function tableHtml(rows, subjects) {
    const used = subjects.filter((s) => rows.some((r) => r.c.per[s.id]));
    return '<div class="table-wrap"><table class="table"><thead><tr>' +
      "<th>" + esc(t("ex.date")) + "</th><th>" + esc(t("ex.exam")) + "</th>" +
      used.map((s) => '<th class="num" title="' + esc(subjName(s)) + '">' + esc(subjShort(s)) + "</th>").join("") +
      '<th class="num">' + esc(t("ex.total")) + "</th><th></th></tr></thead><tbody>" +
      rows.map((r) =>
        "<tr><td>" + esc(fmtDate(r.exam.date, true)) + '</td><td class="strong">' + esc(r.exam.name) + "</td>" +
        used.map((s) => '<td class="num">' + (r.c.per[s.id] ? fmtNum(r.c.per[s.id].net) : '<span style="color:var(--faint)">—</span>') + "</td>").join("") +
        '<td class="num strong">' + fmtNum(r.c.total) + "</td>" +
        '<td><div class="table__actions">' +
          '<a class="icon-btn icon-btn--sm" href="#/denemeler/duzenle/' + encodeURIComponent(r.exam.id) + '" title="' + esc(t("edit")) + '">' + App.icon("edit") + "</a>" +
          '<button class="icon-btn icon-btn--sm icon-btn--danger" type="button" data-del="' + esc(r.exam.id) + '" title="' + esc(t("delete")) + '">' + App.icon("trash") + "</button>" +
        "</div></td></tr>"
      ).join("") + "</tbody></table></div>";
  }

  /* ---------------- Çizgi grafik (SVG, kütüphanesiz) ---------------- */
  function niceMax(v, cap) {
    if (v <= 0) return Math.min(cap, 10);
    const step = v <= 10 ? 2 : v <= 25 ? 5 : v <= 60 ? 10 : 20;
    return Math.min(cap, Math.ceil((v * 1.1) / step) * step) || step;
  }

  function drawLine(host, pts, maxQ) {
    const W = Math.max(280, host.clientWidth || 600), H = 260;
    const m = { t: 16, r: 18, b: 34, l: 38 };
    const iw = W - m.l - m.r, ih = H - m.t - m.b;
    const vals = pts.map((p) => p.v);
    const yMin = Math.min(0, Math.floor(Math.min.apply(null, vals)));
    const yMax = Math.max(niceMax(Math.max.apply(null, vals), maxQ), yMin + 1);
    const x = (i) => m.l + (pts.length === 1 ? iw / 2 : (i / (pts.length - 1)) * iw);
    const y = (v) => m.t + ih - ((v - yMin) / (yMax - yMin)) * ih;

    const ticks = 4;
    let grid = "";
    for (let i = 0; i <= ticks; i++) {
      const v = yMin + ((yMax - yMin) / ticks) * i;
      grid += '<line class="grid-line" x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + y(v) + '" y2="' + y(v) + '"/>' +
        '<text x="' + (m.l - 8) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + fmtNum(v, 0) + "</text>";
    }

    // x ekseni etiketleri: çok fazla nokta varsa seyrelt
    const every = Math.max(1, Math.ceil(pts.length / Math.floor(iw / 70)));
    const xLabels = pts.map((p, i) => (i % every === 0 || i === pts.length - 1)
      ? '<text x="' + x(i) + '" y="' + (H - 10) + '" text-anchor="middle">' + esc(fmtDate(p.exam.date)) + "</text>" : "").join("");

    const line = pts.map((p, i) => (i ? "L" : "M") + x(i).toFixed(1) + " " + y(p.v).toFixed(1)).join(" ");
    const area = pts.length > 1 ? line + " L" + x(pts.length - 1).toFixed(1) + " " + y(Math.max(yMin, 0)) + " L" + x(0).toFixed(1) + " " + y(Math.max(yMin, 0)) + " Z" : "";
    const dots = pts.map((p, i) => '<circle class="dot" cx="' + x(i) + '" cy="' + y(p.v) + '" r="4.5"/>').join("");

    // son noktaya doğrudan etiket
    const lastP = pts[pts.length - 1];
    const lastLabel = '<text x="' + x(pts.length - 1) + '" y="' + (y(lastP.v) - 12) + '" text-anchor="' + (pts.length === 1 ? "middle" : "end") + '" style="fill:var(--text);font-weight:600">' + fmtNum(lastP.v) + "</text>";

    const colW = pts.length === 1 ? iw : iw / (pts.length - 1);
    const hits = pts.map((p, i) => '<rect class="hit" data-i="' + i + '" x="' + (x(i) - colW / 2) + '" y="' + m.t + '" width="' + colW + '" height="' + ih + '"/>').join("");

    host.innerHTML =
      '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="' + esc(t("ex.chartAria")) + '">' +
        '<defs><linearGradient id="netFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--chart-line);stop-opacity:.22"/><stop offset="1" style="stop-color:var(--chart-line);stop-opacity:0"/></linearGradient></defs>' +
        grid + xLabels +
        '<line class="cross" id="cross" y1="' + m.t + '" y2="' + (m.t + ih) + '" x1="-10" x2="-10"/>' +
        (area ? '<path class="area" d="' + area + '"/>' : "") +
        (pts.length > 1 ? '<path class="series" d="' + line + '"/>' : "") +
        dots + lastLabel + hits +
      "</svg>" +
      '<div class="tooltip" id="tip" hidden></div>';

    const svg = host.querySelector("svg");
    const tip = host.querySelector("#tip");
    const cross = host.querySelector("#cross");
    svg.addEventListener("mousemove", (e) => {
      const r = e.target.closest(".hit");
      if (!r) return;
      const i = Number(r.dataset.i), p = pts[i];
      const sx = svg.clientWidth / W;
      cross.setAttribute("x1", x(i)); cross.setAttribute("x2", x(i));
      tip.innerHTML = "<small>" + esc(p.exam.name) + " · " + esc(fmtDate(p.exam.date, true)) + "</small><b>" + fmtNum(p.v) + "</b> " + esc(t("ex.netUnit"));
      tip.style.left = Math.min(Math.max(x(i) * sx, 80), svg.clientWidth - 80) + "px";
      tip.style.top = y(p.v) * sx + "px";
      tip.hidden = false;
    });
    svg.addEventListener("mouseleave", () => { tip.hidden = true; cross.setAttribute("x1", -10); cross.setAttribute("x2", -10); });
  }

  /* =========================================================
     DENEME FORMU
     ========================================================= */
  async function renderForm(view, existing, presetType) {
    const isEdit = !!existing;
    let type = existing ? existing.type : (presetType || App.prefs.get("examType", "TYT"));
    const all = await App.db.getAll("exams");

    function draw() {
      const subjects = CFG.types[type].subjects;
      const count = all.filter((e) => e.type === type).length;
      const defaultName = t("ex.defaultName", { type, n: count + 1 });
      const res = (existing && existing.results) || {};
      let lastGroup = null;

      const rows = subjects.map((s) => {
        const r = res[s.id];
        let groupRow = "";
        const g = s.group ? L(s.group) : null;
        if (g && g !== lastGroup && subjects.filter((x) => x.group && L(x.group) === g).length > 1) {
          groupRow = '<tr class="group-row"><td colspan="6">' + esc(g) + "</td></tr>";
        }
        lastGroup = g;
        return groupRow + '<tr data-sid="' + s.id + '" data-q="' + s.questions + '">' +
          '<td class="strong">' + esc(subjName(s)) + "</td>" +
          '<td class="num" style="color:var(--muted)">' + s.questions + "</td>" +
          '<td class="num"><input class="input" type="number" inputmode="numeric" min="0" max="' + s.questions + '" step="1" name="d_' + s.id + '" aria-label="' + esc(t("ex.ariaCorrect", { name: subjName(s) })) + '" value="' + (r ? r.d : "") + '"></td>' +
          '<td class="num"><input class="input" type="number" inputmode="numeric" min="0" max="' + s.questions + '" step="1" name="y_' + s.id + '" aria-label="' + esc(t("ex.ariaWrong", { name: subjName(s) })) + '" value="' + (r ? r.y : "") + '"></td>' +
          '<td class="num" data-b style="color:var(--muted)">—</td>' +
          '<td class="num"><span class="net" data-net>—</span></td>' +
        "</tr>";
      }).join("");

      view.innerHTML =
        '<div class="page page--narrow">' +
          '<div class="page-head"><div>' +
            '<nav class="crumbs"><a href="#/denemeler">' + esc(t("ex.title")) + '</a><span aria-hidden="true">›</span><span>' + esc(isEdit ? t("ex.editCrumb") : t("ex.newCrumb")) + "</span></nav>" +
            '<h1 style="margin-top:6px">' + esc(isEdit ? t("ex.editTitle") : t("ex.newTitle")) + "</h1>" +
            "<p>" + esc(t("ex.formIntro")) + "</p></div>" +
            (isEdit ? '<span class="badge badge--accent">' + type + "</span>" :
              '<div class="tabs" role="tablist">' + Object.keys(CFG.types).map((ty) =>
                '<button class="tab' + (ty === type ? " is-active" : "") + '" type="button" data-ftype="' + ty + '" title="' + esc(L(CFG.types[ty].long)) + '">' + ty + "</button>").join("") + "</div>") +
          "</div>" +

          '<form id="examForm" novalidate>' +
            '<div class="card" style="margin-bottom:14px"><div class="form-row">' +
              '<label class="field"><span class="field__label">' + esc(t("ex.name")) + '</span><input class="input" name="name" maxlength="60" placeholder="' + esc(defaultName) + '" value="' + esc(existing ? existing.name : "") + '"></label>' +
              '<label class="field"><span class="field__label">' + esc(t("ex.date")) + '</span><input class="input" type="date" name="date" value="' + esc(existing ? existing.date : todayISO()) + '" required></label>' +
            "</div></div>" +

            (type === "AYT" ? '<p class="hint" style="margin:0 0 10px">' + esc(t("ex.aytHint")) + "</p>" : "") +
            '<div class="table-wrap"><table class="table net-table"><thead><tr>' +
              "<th>" + esc(t("ex.subject")) + '</th><th class="num">' + esc(t("ex.questions")) + '</th><th class="num">' + esc(t("ex.correct")) + '</th><th class="num">' + esc(t("ex.wrong")) + '</th><th class="num">' + esc(t("ex.blank")) + '</th><th class="num">' + esc(t("ex.net")) + "</th>" +
            "</tr></thead><tbody>" + rows + "</tbody></table></div>" +
            '<p class="error-text" id="formError" style="margin-top:10px" hidden></p>' +

            '<div class="net-total"><span class="net-total__label">' + esc(t("ex.totalNet")) + '</span><span class="net-total__value" id="totalNet">0</span><span class="hint" id="totalSub"></span></div>' +

            '<div class="form-actions">' +
              '<a class="btn btn--ghost" href="#/denemeler">' + esc(t("cancel")) + "</a>" +
              '<button class="btn btn--primary" type="submit" id="saveBtn">' + App.icon("check") + esc(isEdit ? t("ex.saveChanges") : t("ex.saveExam")) + "</button>" +
            "</div>" +
          "</form>" +
        "</div>";
      App.hydrateIcons(view);

      const form = view.querySelector("#examForm");
      form.addEventListener("input", recalc);
      form.addEventListener("submit", (e) => { e.preventDefault(); save(defaultName); });
      view.querySelectorAll("[data-ftype]").forEach((b) => b.addEventListener("click", () => {
        type = b.dataset.ftype;
        App.prefs.set("examType", type);
        draw();
      }));
      recalc();
      const first = form.querySelector('input[name^="d_"]');
      if (first && !isEdit) first.focus();
    }

    function readRows() {
      const out = [];
      view.querySelectorAll("tr[data-sid]").forEach((tr) => {
        const q = Number(tr.dataset.q);
        const dIn = tr.querySelector('input[name^="d_"]'), yIn = tr.querySelector('input[name^="y_"]');
        const touched = dIn.value !== "" || yIn.value !== "";
        const d = Math.floor(Number(dIn.value) || 0), y = Math.floor(Number(yIn.value) || 0);
        const invalid = d < 0 || y < 0 || d + y > q || dIn.value.includes(".") || yIn.value.includes(".");
        out.push({ tr, sid: tr.dataset.sid, q, d, y, touched, invalid, dIn, yIn });
      });
      return out;
    }

    function recalc() {
      const rows = readRows();
      let total = 0, any = false, bad = null;
      rows.forEach((r) => {
        r.dIn.classList.toggle("is-invalid", r.invalid);
        r.yIn.classList.toggle("is-invalid", r.invalid);
        const netEl = r.tr.querySelector("[data-net]"), bEl = r.tr.querySelector("[data-b]");
        if (!r.touched) { netEl.textContent = "—"; bEl.textContent = "—"; netEl.style.color = ""; return; }
        any = true;
        if (r.invalid) { netEl.textContent = "!"; netEl.style.color = "var(--bad)"; bEl.textContent = "—"; bad = bad || r; return; }
        const net = CFG.calcNet(r.d, r.y);
        total += net;
        netEl.textContent = fmtNum(net);
        netEl.style.color = net < 0 ? "var(--bad)" : "";
        bEl.textContent = r.q - r.d - r.y;
      });
      view.querySelector("#totalNet").textContent = fmtNum(total);
      const err = view.querySelector("#formError");
      if (bad) {
        const s = CFG.types[type].subjects.find((x) => x.id === bad.sid);
        err.textContent = t("ex.errTooMany", { name: subjName(s), q: bad.q });
        err.hidden = false;
      } else err.hidden = true;
      view.querySelector("#saveBtn").disabled = !!bad || !any;
      view.querySelector("#totalSub").textContent = any ? "" : t("ex.noResults");
    }

    async function save(defaultName) {
      const rows = readRows();
      if (rows.some((r) => r.invalid)) return;
      const results = {};
      rows.filter((r) => r.touched).forEach((r) => { results[r.sid] = { d: r.d, y: r.y }; });
      if (!Object.keys(results).length) return;
      const form = view.querySelector("#examForm");
      const date = form.date.value || todayISO();
      const now = new Date().toISOString();
      const exam = {
        id: existing ? existing.id : uid("exam"),
        type,
        name: form.name.value.trim() || defaultName,
        date,
        results,
        createdAt: existing ? existing.createdAt : now,
        updatedAt: now
      };
      await App.db.put("exams", exam);
      App.prefs.set("examType", type);
      App.ui.toast(isEdit ? t("ex.updated") : t("ex.saved", { name: exam.name, net: fmtNum(compute(exam).total) }));
      App.router.go("denemeler");
    }

    draw();
  }

  /* ---------------- Rotalar ---------------- */
  App.router.register("denemeler", async (view, p) => {
    App.setTitle(t("ex.title"));
    if (p[0] === "yeni") {
      const ty = p[1] && p[1].toUpperCase();
      return renderForm(view, null, CFG.types[ty] ? ty : null);
    }
    if (p[0] === "duzenle" && p[1]) {
      const exam = await App.db.get("exams", p[1]);
      if (exam) return renderForm(view, exam);
      App.ui.toast(t("ex.notFound"), "error");
    }
    return renderDashboard(view);
  });
})();
