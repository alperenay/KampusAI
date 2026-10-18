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

  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
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

        topicCardHtml(list) +
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

  /** Denemelerden gelen konu yanlışları (fotoğraftan okunan sonuç belgeleri) */
  function topicCardHtml(list) {
    const agg = {};
    list.forEach((e) => (e.topics || []).forEach((x) => {
      const k = x.subject + "|" + x.topic;
      const a = agg[k] || (agg[k] = { subject: x.subject, topic: x.topic, key: x.key, wrong: 0, blank: 0, n: 0 });
      a.wrong += x.wrong || 0; a.blank += x.blank || 0; a.n++;
    }));
    const rows = Object.values(agg).sort((a, b) => b.wrong + b.blank * 0.5 - (a.wrong + a.blank * 0.5)).slice(0, 12);
    if (!rows.length) return "";
    return '<div class="card ex-topics" style="margin-top:14px"><div class="card__title">' + esc(T("En çok yanlış yapılan konular", "Topics with most mistakes")) + '</div><div class="card__sub" style="margin-bottom:10px">' +
      esc(T("Fotoğraftan okunan deneme sonuçlarındaki konu analizinden.", "From topic analysis in photo-imported results.")) + "</div><ol>" +
      rows.map((r) => "<li>" + (r.key ? '<a href="#/konular/' + esc(r.key) + '">' + esc(r.topic) + "</a>" : esc(r.topic)) + ' <span class="hint">' + esc(subjLabel(r.subject)) + "</span> <b>" + r.wrong + T(" yanlış", " wrong") + "</b>" + (r.blank ? ' <span class="hint">· ' + r.blank + T(" boş", " blank") + "</span>" : "") +
        (r.n > 1 ? ' <span class="hint">· ' + r.n + T(" denemede", " exams") + "</span>" : "") + "</li>").join("") + "</ol></div>";
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
  /* ---------- Fotoğraftan okunan sonucu doğrula ---------- */
  const ALIAS = { "türkçe": "turkce", "turkce": "turkce", "sosyal": "sosyal", "matematik": "matematik", "temel matematik": "matematik", "fen": "fen", "fizik": "fizik", "kimya": "kimya", "biyoloji": "biyoloji",
    "edebiyat": "edebiyat", "tarih-1": "tarih1", "tarih1": "tarih1", "tarih-2": "tarih2", "tarih2": "tarih2", "coğrafya-1": "cografya1", "cografya1": "cografya1", "coğrafya-2": "cografya2", "cografya2": "cografya2", "felsefe": "felsefe", "din": "din" };
  function normalizeImport(d, curType) {
    if (!d || typeof d !== "object") return null;
    let type = String(d.type || "").toUpperCase();
    if (!CFG.types[type]) type = curType;
    const subjects = {};
    const src = d.subjects || {};
    const entries = Array.isArray(src) ? src.map((x) => [x.id || x.subject || x.name, x]) : Object.entries(src);
    entries.forEach(([k, v]) => {
      const id = ALIAS[String(k || "").toLowerCase().trim()] || String(k || "").toLowerCase();
      const s = CFG.types[type].subjects.find((x) => x.id === id);
      if (!s || !v) return;
      let dd = v.d != null ? Math.round(+v.d) : null, yy = v.y != null ? Math.round(+v.y) : null;
      if (!(dd >= 0)) dd = null; if (!(yy >= 0)) yy = null;
      if (dd == null && yy == null) return;
      dd = Math.min(s.questions, dd || 0); yy = Math.min(s.questions - dd, yy || 0);
      subjects[s.id] = { d: dd, y: yy };
    });
    if (!Object.keys(subjects).length) return null;
    const topics = (Array.isArray(d.topics) ? d.topics : []).map((x) => ({
      subject: ALIAS[String(x.subject || "").toLowerCase().trim()] || String(x.subject || ""),
      topic: String(x.topic || "").trim().slice(0, 80),
      wrong: Math.max(0, Math.round(+x.wrong || 0)), blank: Math.max(0, Math.round(+x.blank || 0))
    })).filter((x) => x.topic && (x.wrong || x.blank)).slice(0, 60);
    topics.forEach((x) => { x.key = matchTopic(x.topic); });
    const date = /^\d{4}-\d{2}-\d{2}$/.test(String(d.date || "")) ? d.date : null;
    return { type, subjects, topics, name: String(d.name || "").trim().slice(0, 60), date, confidence: String(d.confidence || "").toLowerCase().replace("ü", "u").replace("ş", "s"), notes: String(d.notes || "").slice(0, 300) };
  }
  /** Konu adını müfredattaki kazanıma eşle (kelime örtüşmesi) */
  let topicIndex = null;
  function matchTopic(name) {
    const norm = (x) => (App.nav && App.nav.norm ? App.nav.norm(x) : String(x).toLowerCase());
    if (!topicIndex) {
      topicIndex = [];
      const C = App.data.curriculum;
      C.grades.forEach((g) => g.subjects.forEach((s) => s.units.forEach((u) => u.outcomes.forEach((o) => {
        if (!o.content) return;
        topicIndex.push({ key: C.key(g.id, s.id, u.id, o.id), w: norm(L(o.title) + " " + L(u.name || "")).split(/\s+/).filter((x) => x.length > 2) });
      }))));
    }
    const q = norm(name).split(/\s+/).filter((x) => x.length > 2);
    if (!q.length) return null;
    let best = null, bs = 0;
    topicIndex.forEach((it) => {
      const hit = q.filter((w) => it.w.some((x) => x === w || (w.length > 4 && x.startsWith(w.slice(0, 5))))).length / q.length;
      if (hit > bs) { bs = hit; best = it.key; }
    });
    return bs >= 0.6 ? best : null;
  }
  const subjLabel = (id) => { for (const ty in CFG.types) { const s = CFG.types[ty].subjects.find((x) => x.id === id); if (s) return subjName(s); } return id; };
  App.exams.normalizeImport = normalizeImport;
  App.exams.matchTopic = matchTopic;

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

          importCardHtml() +
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
      bindImport();
      recalc();
      if (imported) fillImported();
      const first = form.querySelector('input[name^="d_"]');
      if (first && !isEdit && !imported) first.focus();
    }

    /* ---------- Fotoğraftan doldur (v1.21) ---------- */
    let imported = null;          // { type, name, date, subjects, topics, notes, confidence, model }
    let topics = (existing && existing.topics) || null;
    function importCardHtml() {
      return '<div class="card ex-imp" id="exImp"><div class="ex-imp__head">' + App.icon("camera") + '<div><b>' + esc(T("Fotoğraftan doldur", "Fill from a photo")) + "</b><p>" +
        esc(T("Deneme sonuç belgesinin (karne) ya da optik formun fotoğrafını çek; netler ve varsa konu konu yanlışların otomatik doldurulur. Optik form için cevap anahtarının fotoğrafını da ekle. Kaydetmeden önce değerleri kontrol et.",
          "Snap your mock exam result sheet or answer sheet; scores and topic-level mistakes are filled in automatically. Add the answer key for an answer sheet. Check the values before saving.")) + "</p></div></div>" +
        '<div class="ex-imp__btns"><label class="btn btn--primary btn--sm">' + App.icon("camera") + esc(T("Fotoğraf çek", "Take photo")) + '<input type="file" accept="image/*" capture="environment" id="exImpCam" hidden></label>' +
        '<label class="btn btn--sm">' + App.icon("image") + esc(T("Dosyadan seç (en çok 4)", "Choose files (up to 4)")) + '<input type="file" accept="image/*" multiple id="exImpFile" hidden></label></div>' +
        '<div class="ex-imp__thumbs" id="exImpThumbs"></div><div id="exImpOut"></div></div>';
    }
    let shots = [], impCtrl = null;
    function bindImport() {
      const add = async (files) => {
        for (const f of Array.from(files || []).slice(0, 4 - shots.length)) {
          try { shots.push(await App.vision.prepare(f)); } catch (e) { App.ui.toast(t("chk.badImage"), "error"); }
        }
        paintThumbs();
        if (shots.length) runImport();
      };
      view.querySelector("#exImpCam").addEventListener("change", (e) => add(e.target.files));
      view.querySelector("#exImpFile").addEventListener("change", (e) => add(e.target.files));
      paintThumbs();
      if (imported) paintResult();
    }
    function paintThumbs() {
      const h = view.querySelector("#exImpThumbs"); if (!h) return;
      h.innerHTML = shots.map((x, i) => '<span class="ex-imp__th"><img src="' + x.dataUrl + '" alt=""><button type="button" class="icon-btn" data-rm="' + i + '" aria-label="' + esc(t("delete")) + '">' + App.icon("close") + "</button></span>").join("") +
        (shots.length ? '<button type="button" class="btn btn--sm btn--ghost" id="exImpRun">' + App.icon("refresh") + esc(T("Yeniden oku", "Read again")) + "</button>" : "");
      App.hydrateIcons(h);
      h.querySelectorAll("[data-rm]").forEach((b) => b.addEventListener("click", () => { shots.splice(+b.dataset.rm, 1); paintThumbs(); }));
      const r = h.querySelector("#exImpRun"); if (r) r.addEventListener("click", runImport);
    }
    function importPrompt() {
      const desc = Object.keys(CFG.types).map((ty) => ty + ": " + CFG.types[ty].subjects.map((s) => s.id + " (" + L(s.name) + ", " + s.questions + " soru)").join(", ")).join("\n");
      return {
        system: "Sen Türkiye'deki YKS deneme sınavlarının sonuç belgelerini ve optik formlarını okuyan dikkatli bir asistansın. Uydurma; okuyamadığın değeri null bırak. Yalnızca geçerli JSON döndür.",
        prompt: "Görsel(ler) bir deneme sınavı sonuç belgesi (karne), optik form ve/veya cevap anahtarı olabilir.\n" +
          "Sınav türleri ve ders kimlikleri:\n" + desc + "\n\n" +
          "Kurallar:\n- Sonuç belgesindeki her dersin DOĞRU ve YANLIŞ sayısını oku (boş = soru − doğru − yanlış). Net sütununu kullanma.\n" +
          "- Belgede TYT Sosyal alt testleri (tarih, coğrafya, felsefe, din) ayrı yazıyorsa toplayıp 'sosyal'a yaz; TYT Fen alt testleri (fizik, kimya, biyoloji) ayrıysa toplayıp 'fen'e yaz.\n" +
          "- Optik form ve cevap anahtarı birlikte verildiyse her dersin cevaplarını anahtarla karşılaştırıp doğru/yanlış say; boş bırakılanlar boştur.\n" +
          "- Konu analizi tablosu varsa her konudaki yanlış ve boş sayısını 'topics' listesine yaz (sadece yanlış ya da boş olan konular).\n" +
          "- Sınav adı ve tarihi görünüyorsa yaz; tarih YYYY-AA-GG biçiminde.\n\n" +
          'Biçim: {"type":"TYT","name":"","date":null,"subjects":{"turkce":{"d":0,"y":0}},"topics":[{"subject":"matematik","topic":"Türev","wrong":2,"blank":1}],"confidence":"yuksek|orta|dusuk","notes":"okunamayan ya da emin olunmayan kısımlar"}'
      };
    }
    function visionPromptImp() {
      return T("Bu görsel bir deneme sınavı sonuç belgesi, optik form ya da cevap anahtarı. Görevin YORUMLAMAK DEĞİL, aynen yazıya dökmek. Sınav adı ve tarihini yaz. Ders tablosundaki her satırı (ders, soru sayısı, doğru, yanlış, boş, net) sırayla yaz. Konu analizi tablosu varsa her satırı (ders, konu, soru, doğru, yanlış, boş) yaz. Optik formsa her dersin işaretli cevaplarını numarasıyla yaz (1-A, 2-boş …). Cevap anahtarıysa numara-cevap çiftlerini yaz. Okuyamadığın yere [okunamadı] yaz.",
        "This image is a mock exam result sheet, answer sheet or answer key. Do NOT interpret it, transcribe it. Write the exam name and date. Write every row of the subject table (subject, questions, correct, wrong, blank, net). If there is a topic analysis table, write every row. If it is an answer sheet, write the marked answers per subject with numbers (1-A, 2-blank …). If it is an answer key, write number-answer pairs. Write [unreadable] where you cannot read.");
    }
    async function runImport() {
      if (!shots.length) return;
      if (impCtrl) impCtrl.abort();
      const my = impCtrl = new AbortController();
      const out = view.querySelector("#exImpOut");
      const started = Date.now();
      const stage = (m, vis) => { if (!out.isConnected) return; out.innerHTML = '<div class="stage"><span class="spinner"></span>' + App.icon(vis ? "eye" : "scan") + "<span>" + esc(vis ? T("Fotoğraf okunuyor…", "Reading the photo…") : T("Netler çıkarılıyor…", "Extracting scores…")) + "</span>" + (m ? "<code>" + esc(m) + "</code>" : "") + '<span class="stage__time" id="exImpT"></span></div>'; App.hydrateIcons(out); };
      stage("");
      const tick = setInterval(() => { const e = view.querySelector("#exImpT"); if (!e) return clearInterval(tick); e.textContent = t("ai.seconds", { n: Math.round((Date.now() - started) / 1000) }); }, 1000);
      try {
        const pr = importPrompt();
        const res = await App.ai.generate(Object.assign({}, pr, { images: shots, visionPrompt: visionPromptImp, temperature: 0.1, signal: my.signal, onStage: (eng, m, kind) => stage(m, kind === "vision") }));
        clearInterval(tick);
        if (my !== impCtrl || !out.isConnected) return;
        const r = normalizeImport(res.data, type);
        if (!r) throw new Error(T("Fotoğrafta ders sonuçları bulunamadı. Daha net ve düz bir fotoğraf dene.", "No subject results found in the photo. Try a clearer, straighter photo."));
        r.model = res.model;
        imported = r;
        topics = r.topics.length ? r.topics : topics;
        if (!isEdit && r.type !== type) { type = r.type; App.prefs.set("examType", type); draw(); return; }
        fillImported();
        paintResult();
      } catch (e) {
        clearInterval(tick);
        if (my !== impCtrl || !out.isConnected || (e && e.name === "AbortError")) return;
        out.innerHTML = '<div class="msg__error"><b>' + esc(T("Okunamadı", "Could not read")) + "</b><p>" + esc(App.quiz && App.quiz.errorText ? App.quiz.errorText(e) : String(e && e.message || e)) + "</p></div>";
      }
    }
    function fillImported() {
      const r = imported, form = view.querySelector("#examForm");
      if (!r || !form) return;
      CFG.types[type].subjects.forEach((s) => {
        const x = r.subjects[s.id]; if (!x) return;
        const dIn = form.querySelector('input[name="d_' + s.id + '"]'), yIn = form.querySelector('input[name="y_' + s.id + '"]');
        if (dIn && x.d != null) dIn.value = x.d;
        if (yIn && x.y != null) yIn.value = x.y;
        [dIn, yIn].forEach((i) => i && i.classList.add("is-imported"));
      });
      if (r.name && !form.name.value) form.name.value = r.name;
      if (r.date && !isEdit) form.date.value = r.date;
      recalc();
    }
    function paintResult() {
      const r = imported, out = view.querySelector("#exImpOut");
      if (!r || !out) return;
      const n = Object.keys(r.subjects).length;
      const conf = { yuksek: T("yüksek", "high"), orta: T("orta", "medium"), dusuk: T("düşük", "low") }[r.confidence] || "";
      out.innerHTML = '<div class="ex-imp__ok">' + App.icon("checkCircle") + "<span>" + esc(T(n + " dersin sonucu dolduruldu", "Filled " + n + " subjects")) + (conf ? " · " + esc(T("güven: ", "confidence: ") + conf) : "") + "</span></div>" +
        (r.notes ? '<p class="hint">' + esc(r.notes) + "</p>" : "") +
        (r.topics.length ? '<div class="ex-imp__topics"><b>' + esc(T("Konu konu yanlış ve boşlar", "Mistakes by topic")) + "</b><ul>" + r.topics.slice(0, 30).map((x) =>
          "<li>" + (x.key ? '<a href="#/konular/' + esc(x.key) + '">' + esc(x.topic) + "</a>" : esc(x.topic)) + ' <span class="hint">' + esc(subjLabel(x.subject)) + "</span> <b>" + x.wrong + T(" Y", " W") + "</b>" + (x.blank ? " · " + x.blank + T(" B", " B") : "") + "</li>").join("") +
          '</ul><p class="hint">' + esc(T("Konu yanlışları denemeyle birlikte kaydedilir; Deneme Takibi'nde ve önerilerde kullanılır.", "Topic mistakes are saved with the exam and used in tracking and suggestions.")) + "</p></div>" : "") +
        '<p class="hint">' + esc(T("Yeşil çerçeveli kutular fotoğraftan dolduruldu; yanlış okunan varsa düzeltip kaydet.", "Green-outlined boxes were filled from the photo; fix anything misread, then save.")) + "</p>";
      App.hydrateIcons(out);
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
        topics: topics && topics.length ? topics : undefined,
        source: imported ? "photo" : (existing && existing.source) || undefined,
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
