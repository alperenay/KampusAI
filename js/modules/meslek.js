/* =========================================================
   meslek.js — Kazanım Odaklı Meslek Haritası (v1.49)   #/meslek  ·  #/meslek/m/<meslek>  ·  #/meslek/k/<sınıf>/<ders>/<ünite>/<kazanım>

   MEB 9–12 kazanımları, Kariyer Keşfi'ndeki meslekler ve o mesleklerde nerede kullanıldıklarıyla eşlenir
   (js/data/meslek-harita.js). Öğrencinin test, kart, Feynman ve çözüm kontrolü geçmişinden gelen hâkimiyet
   puanları (roots.mastery) mesleğin kazanımlarına göre ağırlıklandırılır:
     ilgililik(kazanım, meslek) = ders ağırlığı × (başlıkta meslek anahtar kelimesi geçiyorsa 3, yoksa 1)
     kazanım uyumu = (Σ ilgililik × puan + 50 × k) / (Σ ilgililik(çalışılan) + k),  k = 0,15 × Σ ilgililik(tümü)
       (az veride sonuç 50'ye çekilir: üç test çözen öğrenciye kesin meslek söylenmez)
     Kariyer envanteri (RIASEC) tamamlanmışsa: uyum = 0,7 × kazanım uyumu + 0,3 × ilgi uyumu
   Her meslek için güçlü yönler ve sıradaki adımlar (zayıf ya da başlanmamış, doğrudan kullanılan kazanımlar)
   sınıf sırasıyla bir gelişim rotası olarak verilir.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n && App.i18n.lang === "en" ? en : tr);
  const MAP = () => App.data.meslekHarita || {};
  const JOBS = () => App.data.meslekler || [];
  const low = (s) => String(s || "").toLocaleLowerCase("tr");
  const trTitle = (t) => (t && typeof t === "object" ? t.tr || "" : String(t || ""));

  /* ================= Saf hesaplar (sınanabilir) ================= */
  /** Kazanımın meslek için ilgililiği ve (varsa) kullanım cümlesi */
  function relevance(item, jobId) {
    const m = MAP()[jobId]; if (!m) return { r: 0 };
    const w = m.s[item.subject] || 0; if (!w) return { r: 0 };
    const title = low(item.title), hit = (m.u || []).find(([kw]) => kw.split("|").some((k) => title.includes(low(k))));
    return hit ? { r: w * 3, use: hit[1], direct: true } : { r: w };
  }
  /** items: [{ key, subject, grade, title }], scores: Map key → 0..100. Dönüş: meslek başına uyum */
  function fitJob(jobId, items, scores) {
    let all = 0, studied = 0, sum = 0;
    const rel = [];
    items.forEach((it) => {
      const r = relevance(it, jobId); if (!r.r) return;
      all += r.r;
      const sc = scores.get(it.key);
      if (sc != null) { studied += r.r; sum += r.r * sc; }
      rel.push(Object.assign({ item: it, score: sc == null ? null : sc }, r));
    });
    if (!all) return { id: jobId, fit: null, coverage: 0, rel: [] };
    const k = 0.15 * all, fit = (sum + 50 * k) / (studied + k);
    return { id: jobId, fit, raw: studied ? sum / studied : null, coverage: studied / all, rel };
  }
  /** Tüm meslekleri sırala. interest: RIASEC yüzde nesnesi (isteğe bağlı) */
  function rank(items, scores, interest) {
    return JOBS().map((j) => {
      const f = fitJob(j[0], items, scores);
      let ifit = null;
      if (interest && App.kariyer && App.kariyer.fit) ifit = App.kariyer.fit(j, interest);
      const total = f.fit == null ? null : ifit == null ? f.fit : 0.7 * f.fit + 0.3 * ifit;
      return Object.assign(f, { job: j, interest: ifit, total });
    }).filter((x) => x.total != null).sort((a, b) => b.total - a.total || b.coverage - a.coverage);
  }
  /** Gelişim rotası: doğrudan kullanılan kazanımlardan güçlüler ve sıradaki adımlar (sınıf sırasıyla) */
  function route(f, n) {
    const direct = f.rel.filter((x) => x.direct);
    const strong = direct.filter((x) => x.score != null && x.score >= 70).sort((a, b) => b.score - a.score).slice(0, n || 4);
    const next = direct.filter((x) => x.score == null || x.score < 70)
      .sort((a, b) => (Number(a.item.grade) - Number(b.item.grade)) || ((a.score == null ? -1 : a.score) - (b.score == null ? -1 : b.score))).slice(0, n || 4);
    return { strong, next };
  }

  /* ================= Veri ================= */
  function outcomes() {
    if (!App.learnmap || !App.learnmap.allOutcomes) return [];
    // Eşleme Türkçe başlıkla yapılır (anahtar kelimeler Türkçe); ekranda seçili dildeki başlık gösterilir
    return App.learnmap.allOutcomes().map((x) => ({ key: x.key, subject: x.subject.id, grade: x.grade.id, title: trTitle(x.outcome.title), label: App.L(x.outcome.title), code: x.outcome.code, subjectName: App.L(x.subject.name) }));
  }
  async function scoreMap() {
    const out = new Map();
    try { const M = await App.roots.mastery(); M.forEach((v, k) => { if (v && v.score != null) out.set(k, v.score); }); } catch (e) { /* veri yok */ }
    return out;
  }
  function interestPct() {
    try { const st = App.kariyer && App.kariyer.state(); return st && st.done ? App.kariyer.scores(st.ans).pct : null; } catch (e) { return null; }
  }
  const FIELD = () => ({ SAY: T("Sayısal", "Science"), EA: T("Eşit ağırlık", "Equal weight"), "SÖZ": T("Sözel", "Verbal"), "DİL": T("Dil", "Language"), TYT: "TYT" });
  const pct = (x) => (x == null ? "—" : Math.round(x) + "%");
  const bar = (v, cls) => '<span class="mh-bar' + (cls ? " " + cls : "") + '"><i style="width:' + Math.max(2, Math.min(100, Math.round(v || 0))) + '%"></i></span>';
  const status = (s) => (s == null ? "unknown" : s >= 70 ? "strong" : s >= 45 ? "mid" : "weak");
  const outLink = (x) => '<a class="mh-out mh-out--' + status(x.score) + '" href="#/konular/' + esc(x.item.key) + '"><span class="mh-out__t"><small>' + esc(x.item.grade + ". " + T("sınıf", "grade") + " · " + x.item.subjectName) + "</small>" + esc(x.item.label || x.item.title) + "</span>" +
    (x.use ? '<span class="mh-out__use">' + App.icon("lightbulb") + esc(x.use) + "</span>" : "") + '<b class="mh-out__s">' + (x.score == null ? esc(T("başlanmadı", "not started")) : x.score + "%") + "</b></a>";

  /* ================= Arayüz ================= */
  async function renderHome(view) {
    App.setTitle(T("Meslek Haritası", "Career Map"));
    view.innerHTML = '<div class="page mh"><div class="page-head"><div><h1>' + esc(T("Meslek Haritası", "Career Map")) + "</h1><p>" +
      esc(T("Derslerde öğrendiğin her kazanım bir meslekte kullanılır. Başarılı olduğun konulardan sana uygun kariyer rotalarını ve her mesleğe giden sıradaki adımlarını gösterir.", "Every outcome is used in some career. See which careers your strengths point to and your next steps.")) + "</p></div></div>" +
      '<div id="mhBody"><p class="hint">' + esc(T("Hesaplanıyor…", "Calculating…")) + "</p></div></div>";
    const items = outcomes(), scores = await scoreMap(), interest = interestPct();
    const body = view.querySelector("#mhBody"); if (!body) return;
    let field = App.prefs.get("mhField", "all");
    const paint = () => {
      const all = rank(items, scores, interest), list = all.filter((x) => field === "all" || x.job[3] === field);
      const studied = scores.size;
      body.innerHTML =
        (studied < 5 ? '<div class="card mh-note">' + App.icon("info") + "<p>" + esc(T("Henüz az kazanımda test çözdün (" + studied + "). Harita şimdilik çok kaba; konu testleri çözdükçe netleşir. Sonuçlar bir yönlendirme değil, keşif için bir başlangıç noktasıdır.", "Few outcomes studied yet (" + studied + "); the map sharpens as you take quizzes.")) + "</p></div>" : "") +
        (!interest ? '<div class="card mh-note">' + App.icon("compass") + "<p>" + esc(T("İlgi alanlarını da hesaba katmak için Kariyer Keşfi envanterini doldur.", "Fill in the Career Discovery inventory to include your interests.")) + ' <a href="#/kariyer/test">' + esc(T("Envantere git", "Open inventory")) + "</a></p></div>" : "") +
        '<div class="lang-switch seg mh-field" role="radiogroup" aria-label="' + esc(T("Alan", "Field")) + '">' + [["all", T("Tümü", "All")]].concat(Object.entries(FIELD())).map(([v, n]) =>
          '<button type="button" role="radio" data-v="' + esc(v) + '" aria-checked="' + (field === v) + '">' + esc(n) + "</button>").join("") + "</div>" +
        '<h2 class="section-title">' + esc(T("Sana en uygun rotalar", "Your best-fitting routes")) + '</h2><div class="mh-top">' + list.slice(0, 5).map((f, i) => {
          const r = route(f, 3);
          return '<article class="card mh-card"><header><span class="mh-rank">' + (i + 1) + '</span><div><h3><a href="#/meslek/m/' + esc(f.id) + '">' + esc(f.job[1]) + "</a></h3><small>" + esc(FIELD()[f.job[3]] || f.job[3]) + "</small></div><b class=\"mh-fit\">" + pct(f.total) + "</b></header>" +
            '<div class="mh-bars"><span>' + esc(T("Kazanım uyumu", "Outcome fit")) + "</span>" + bar(f.fit) + "<b>" + pct(f.fit) + "</b>" +
              (f.interest != null ? "<span>" + esc(T("İlgi uyumu", "Interest fit")) + "</span>" + bar(f.interest, "mh-bar--int") + "<b>" + pct(f.interest) + "</b>" : "") +
              "<span>" + esc(T("Veri kapsamı", "Coverage")) + "</span>" + bar(f.coverage * 100, "mh-bar--cov") + "<b>" + pct(f.coverage * 100) + "</b></div>" +
            (r.strong.length ? '<p class="mh-h">' + esc(T("Güçlü yönlerin", "Your strengths")) + "</p>" + r.strong.map(outLink).join("") : "") +
            (r.next.length ? '<p class="mh-h">' + esc(T("Sıradaki adımlar", "Next steps")) + "</p>" + r.next.map(outLink).join("") : "") + "</article>";
        }).join("") + "</div>" +
        '<h2 class="section-title">' + esc(T("Tüm meslekler", "All careers")) + '</h2><ol class="mh-all">' + list.map((f) => '<li><a href="#/meslek/m/' + esc(f.id) + '"><span>' + esc(f.job[1]) + "</span>" + bar(f.total) + "<b>" + pct(f.total) + "</b></a></li>").join("") + "</ol>";
      App.hydrateIcons(body);
    };
    body.addEventListener("click", (e) => { const b = e.target.closest(".mh-field [data-v]"); if (!b) return; field = b.dataset.v; App.prefs.set("mhField", field); paint(); });
    paint();
  }

  async function renderJob(view, id) {
    const j = JOBS().find((x) => x[0] === id); if (!j) { location.hash = "#/meslek"; return; }
    App.setTitle(j[1]);
    const items = outcomes(), scores = await scoreMap(), f = fitJob(id, items, scores), interest = interestPct();
    const ifit = interest && App.kariyer ? App.kariyer.fit(j, interest) : null;
    const direct = f.rel.filter((x) => x.direct), bySub = {};
    direct.forEach((x) => { (bySub[x.item.subjectName] = bySub[x.item.subjectName] || []).push(x); });
    const r = route(f, 6);
    view.innerHTML = '<div class="page mh"><a class="btn btn--sm btn--ghost" href="#/meslek">' + App.icon("chevronL") + esc(T("Meslek Haritası", "Career Map")) + "</a>" +
      '<div class="page-head"><div><h1>' + esc(j[1]) + "</h1><p>" + esc(j[4] || "") + "</p></div></div>" +
      '<section class="card mh-sum"><div class="mh-bars"><span>' + esc(T("Kazanım uyumu", "Outcome fit")) + "</span>" + bar(f.fit) + "<b>" + pct(f.fit) + "</b>" +
        (ifit != null ? "<span>" + esc(T("İlgi uyumu", "Interest fit")) + "</span>" + bar(ifit, "mh-bar--int") + "<b>" + pct(ifit) + "</b>" : "") +
        "<span>" + esc(T("Veri kapsamı", "Coverage")) + "</span>" + bar(f.coverage * 100, "mh-bar--cov") + "<b>" + pct(f.coverage * 100) + "</b></div>" +
        '<p><a class="btn btn--sm" href="#/kariyer/m/' + esc(id) + '">' + App.icon("compass") + esc(T("Meslek kartı ve bölümler", "Career card and programmes")) + "</a></p></section>" +
      '<section class="card"><h2 class="section-title">' + esc(T("Gelişim rotan", "Your development route")) + '</h2><ol class="mh-route">' +
        r.next.map((x) => "<li>" + outLink(x) + "</li>").join("") + (r.next.length ? "" : "<li>" + esc(T("Bu mesleğin doğrudan kullandığı tüm kazanımlarda güçlüsün.", "You are strong in every directly used outcome.")) + "</li>") + "</ol></section>" +
      '<section class="card"><h2 class="section-title">' + esc(T("Bu meslekte kullanılan kazanımlar", "Outcomes used in this career")) + "</h2>" +
        Object.entries(bySub).map(([s, xs]) => '<h3 class="mh-sub">' + esc(s) + "</h3>" + xs.sort((a, b) => Number(a.item.grade) - Number(b.item.grade)).map(outLink).join("")).join("") +
        (direct.length ? "" : '<p class="hint">' + esc(T("Bu meslek belirli kazanımlardan çok derslerin genelinden yararlanır.", "This career draws on whole subjects rather than specific outcomes.")) + "</p>") + "</section></div>";
    App.hydrateIcons(view);
  }

  async function renderOutcome(view, key) {
    const it = outcomes().find((x) => x.key === key); if (!it) { location.hash = "#/meslek"; return; }
    const name = it.label || it.title;
    App.setTitle(T("Bu konu hangi meslekte?", "Which careers use this?"));
    const uses = JOBS().map((j) => Object.assign({ job: j }, relevance(it, j[0]))).filter((x) => x.direct).sort((a, b) => b.r - a.r);
    view.innerHTML = '<div class="page mh"><a class="btn btn--sm btn--ghost" href="#/konular/' + esc(key) + '">' + App.icon("chevronL") + esc(name) + "</a>" +
      '<div class="page-head"><div><h1>' + esc(T("Bu konu hangi meslekte?", "Which careers use this?")) + "</h1><p>" + esc(it.grade + ". " + T("sınıf", "grade") + " · " + it.subjectName + " · " + name) + "</p></div></div>" +
      (uses.length ? '<div class="mh-uses">' + uses.map((u) => '<a class="card mh-use" href="#/meslek/m/' + esc(u.job[0]) + '"><b>' + esc(u.job[1]) + "</b><span>" + App.icon("lightbulb") + esc(u.use) + "</span></a>").join("") + "</div>"
        : '<p class="hint">' + esc(T("Bu kazanım için doğrudan bir meslek eşleşmesi yok; dersin geneli birçok meslekte kullanılır.", "No direct match for this outcome.")) + ' <a href="#/meslek">' + esc(T("Meslek Haritası", "Career Map")) + "</a></p>") + "</div>";
    App.hydrateIcons(view);
  }

  function render(view, p) {
    if (p[0] === "m" && p[1]) return renderJob(view, p[1]);
    if (p[0] === "k" && p.length >= 5) return renderOutcome(view, p.slice(1, 5).join("/"));
    return renderHome(view);
  }
  App.router.register("meslek", render);
  /** Bir kazanımı doğrudan kullanan meslek sayısı (konu sayfasındaki bağlantı için) */
  function useCount(subjectId, title) {
    const it = { subject: subjectId, title: trTitle(title) };
    return JOBS().filter((j) => relevance(it, j[0]).direct).length;
  }
  App.meslek = { relevance, fitJob, rank, route, useCount };
})();
