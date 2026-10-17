/* =========================================================
   sim.js — Zamanlı deneme simülasyonu   (#/simulasyon)

   Öğrenci kapsamı (TYT, AYT Sayısal / Eşit Ağırlık / Sözel ya da tek ders),
   soru sayısını (10 / 20) ve kazanım seçimini (zayıf + unutulmaya başlayan ya da
   karışık) seçer. Yapay zekâ her kazanım için konu anlatımından 5 soru üretir
   (ÖSYM soruları kullanılmaz). Sınav süreli yapılır (soru başına 1,5 dk),
   optik form gibi soru haritası vardır. Bitince:
     • doğru / yanlış / boş ve net (4 yanlış 1 doğruyu götürür)
     • her kazanım için sonuç "quizzes" deposuna yazılır → öğrenme haritası güncellenir
     • yanlış ve boşlar yanlış defterine eklenir
     • simülasyon geçmişi meta "simHistory" kaydına eklenir
   Not: Mini deneme netleri tam TYT/AYT ile karşılaştırılamayacağı için Deneme Takibi'ne
   yazılmaz; geçmiş bu sayfada gösterilir.
   ========================================================= */
(function () {
  const { esc, uid } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const L = App.L;
  const LETTERS = "ABCDE";
  const PER = 5;                      // kazanım başına soru
  const HIST = "simHistory";

  const SCOPES = {
    tyt: { tr: "TYT", en: "TYT", grades: ["9", "10"], subjects: ["edebiyat", "matematik", "fizik", "kimya", "biyoloji", "tarih", "cografya", "felsefe", "din"] },
    say: { tr: "AYT Sayısal", en: "AYT Science", grades: ["11", "12"], subjects: ["matematik", "fizik", "kimya", "biyoloji"] },
    ea:  { tr: "AYT Eşit Ağırlık", en: "AYT Equal Weight", grades: ["11", "12"], subjects: ["matematik", "edebiyat", "tarih", "cografya"] },
    soz: { tr: "AYT Sözel", en: "AYT Verbal", grades: ["11", "12"], subjects: ["edebiyat", "tarih", "cografya", "felsefe", "din", "inkilap"] }
  };

  const inline = (s) => App.markdown.render(String(s == null ? "" : s)).replace(/^<p>([\s\S]*)<\/p>$/, "$1");
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /* ---------- Kazanım seçimi ---------- */
  async function pickOutcomes(scope, n, how) {
    const M = await App.roots.mastery();
    let items = App.learnmap.allOutcomes().filter((it) => it.outcome.content && (scope.startsWith("s:")
      ? it.subject.id === scope.slice(2)
      : SCOPES[scope].grades.includes(String(it.grade.id)) && SCOPES[scope].subjects.includes(it.subject.id)));
    const need = (it) => {
      const m = M.get(it.key);
      if (!m) return 2;                                   // hiç çalışılmadı
      if (m.parts && m.parts.fading) return 4;
      return { weak: 5, mid: 3, studied: 2, unknown: 2, strong: 0 }[m.status] || 1;
    };
    items = shuffle(items);
    if (how === "weak") items.sort((a, b) => need(b) - need(a));
    // Aynı dersten art arda gelmesin: dersler arasında sırayla seç
    const bySub = {};
    items.forEach((it) => (bySub[it.subject.id] = bySub[it.subject.id] || []).push(it));
    const order = Object.keys(bySub).sort((a, b) => (how === "weak" ? need(bySub[b][0]) - need(bySub[a][0]) : Math.random() - 0.5));
    const out = [];
    for (let r = 0; out.length < n && r < 50; r++) order.forEach((sid) => { if (out.length < n && bySub[sid][r]) out.push(bySub[sid][r]); });
    return out;
  }

  /* ---------- Soru üretimi ---------- */
  async function generateFor(it, signal) {
    const pr = App.quiz.prompts(it.grade, it.subject, it.unit, it.outcome);
    const prompt = pr.prompt
      .replace(/TAM \d+ soruluk/, "TAM " + PER + " soruluk").replace(/EXACTLY \d+ questions/, "EXACTLY " + PER + " questions")
      .replace(/3 kolay, 4 orta, 3 zor/, "1 kolay, 2 orta, 2 zor").replace(/3 easy, 4 medium, 3 hard/, "1 easy, 2 medium, 2 hard");
    let res;
    try { res = await App.ai.generate({ system: pr.system, prompt, temperature: 0.8, signal }); }
    catch (e) { if (signal && signal.aborted) throw e; res = await App.ai.generate({ system: pr.system, prompt, temperature: 0.6, signal }); }
    return App.quiz.normalize(res.data).slice(0, PER).map((q) => Object.assign(q, { it }));
  }

  /* ---------- Sayfa ---------- */
  let run = null;   // { questions, answers, flags, idx, endAt, startAt, timer, ctrl, cfg }

  async function render(view) {
    App.setTitle(T("Deneme Simülasyonu", "Exam Simulation"));
    if (run && run.questions && !run.done) return exam(view);
    const hist = ((await App.db.get("meta", HIST).catch(() => null)) || { list: [] }).list.slice(-8).reverse();
    const subjects = Array.from(new Map(App.learnmap.allOutcomes().map((x) => [x.subject.id, L(x.subject.name)])).entries());
    const opt = (v, label, sel) => '<option value="' + v + '"' + (sel ? " selected" : "") + ">" + esc(label) + "</option>";
    const last = App.prefs.get("simCfg", { scope: "tyt", n: 20, how: "weak" });

    view.innerHTML =
      '<div class="page page--narrow">' +
        '<div class="page-head"><div><h1>' + esc(T("Deneme Simülasyonu", "Exam Simulation")) + "</h1><p>" +
          esc(T("Gerçek sınav gibi süreli bir mini deneme. Sorular, seçtiğin kapsamdaki zayıf ve unutulmaya başlayan konularından yapay zekâ ile hazırlanır; ÖSYM soruları kullanılmaz. Sonuçlar öğrenme haritana işlenir.",
            "A timed mini exam from your weak and fading topics, generated by AI. Results update your learning map.")) + "</p></div></div>" +
        '<section class="card sim-setup">' +
          '<label class="field"><span class="field__label">' + esc(T("Kapsam", "Scope")) + '</span><select class="select" id="simScope">' +
            Object.entries(SCOPES).map(([k, s]) => opt(k, App.i18n.lang === "en" ? s.en : s.tr, last.scope === k)).join("") +
            '<optgroup label="' + esc(T("Tek ders", "Single subject")) + '">' + subjects.map(([sid, nm]) => opt("s:" + sid, nm, last.scope === "s:" + sid)).join("") + "</optgroup></select></label>" +
          '<label class="field"><span class="field__label">' + esc(T("Soru sayısı", "Questions")) + '</span><select class="select" id="simN">' +
            opt("10", T("10 soru · 15 dk", "10 questions · 15 min"), last.n == 10) + opt("20", T("20 soru · 30 dk", "20 questions · 30 min"), last.n == 20) + "</select></label>" +
          '<label class="field"><span class="field__label">' + esc(T("Konular", "Topics")) + '</span><select class="select" id="simHow">' +
            opt("weak", T("Zayıf ve unutulmaya başlayanlar (önerilen)", "Weak and fading (recommended)"), last.how === "weak") + opt("mix", T("Karışık", "Mixed"), last.how === "mix") + "</select></label>" +
          '<button class="btn btn--primary" type="button" id="simStart">' + App.icon("play") + esc(T("Denemeyi hazırla", "Prepare exam")) + "</button>" +
          '<p class="hint" id="simStatus"></p><progress id="simBar" max="1" value="0" hidden></progress>' +
        "</section>" +
        (hist.length ? '<section class="card"><div class="card__title">' + App.icon("chart") + esc(T("Son denemeler", "Recent simulations")) + '</div><ul class="sim-hist">' +
          hist.map((h) => "<li><b>" + esc(h.title) + "</b><span>" + esc(new Date(h.at).toLocaleDateString(App.i18n.locale)) + "</span><span>" +
            esc(h.d + T("D ", "C ") + h.y + T("Y ", "W ") + h.b + T("B", "B")) + "</span><b>" + esc(h.net.toLocaleString(App.i18n.locale, { maximumFractionDigits: 2 })) + " net</b><small>" + Math.round(h.used / 60) + "/" + Math.round(h.limit / 60) + T(" dk", " min") + "</small></li>").join("") +
          "</ul></section>" : "") +
      "</div>";
    App.hydrateIcons(view);
    const root = view.firstElementChild;
    root.querySelector("#simStart").addEventListener("click", async (e) => {
      const btn = e.currentTarget;
      const cfg = { scope: root.querySelector("#simScope").value, n: Number(root.querySelector("#simN").value), how: root.querySelector("#simHow").value };
      App.prefs.set("simCfg", cfg);
      const status = root.querySelector("#simStatus"), bar = root.querySelector("#simBar");
      btn.disabled = true;
      const its = await pickOutcomes(cfg.scope, Math.ceil(cfg.n / PER), cfg.how);
      if (!its.length) { status.textContent = T("Bu kapsamda konu anlatımı olan kazanım bulunamadı.", "No outcomes with lessons in this scope."); btn.disabled = false; return; }
      const ctrl = new AbortController();
      let done = 0;
      bar.hidden = false; bar.value = 0;
      status.textContent = T("Sorular hazırlanıyor… (", "Preparing questions… (") + its.map((x) => L(x.outcome.title)).join(", ") + ")";
      const qs = [];
      // Aynı anda en fazla 2 istek (cihazdaki model sırayla çalışır)
      const queue = its.slice();
      const worker = async () => {
        while (queue.length && !ctrl.signal.aborted) {
          const it = queue.shift();
          try { qs.push(...await generateFor(it, ctrl.signal)); } catch (err) { if (ctrl.signal.aborted) return; }
          done++; bar.value = done / its.length;
        }
      };
      await Promise.all([worker(), worker()]);
      bar.hidden = true;
      if (qs.length < 5) {
        status.textContent = T("Sorular hazırlanamadı. Yapay zekâ bağlantısını kontrol edip tekrar dene.", "Couldn't prepare questions. Check the AI connection.");
        btn.disabled = false; return;
      }
      const ordered = qs.slice(0, cfg.n);
      const limit = Math.round(ordered.length * 90);   // soru başına 1,5 dk
      const title = (cfg.scope.startsWith("s:") ? (subjects.find((x) => x[0] === cfg.scope.slice(2)) || [0, ""])[1] : (App.i18n.lang === "en" ? SCOPES[cfg.scope].en : SCOPES[cfg.scope].tr)) + " · " + ordered.length + T(" soru", " q");
      run = { questions: ordered, answers: ordered.map(() => -1), flags: ordered.map(() => false), idx: 0, startAt: Date.now(), endAt: Date.now() + limit * 1000, limit, title, ctrl };
      exam(view);
    });
  }

  function fmtTime(s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }

  function exam(view) {
    const R = run;
    const paint = () => {
      const q = R.questions[R.idx];
      view.innerHTML =
        '<div class="page sim-page">' +
          '<div class="sim-top"><b>' + esc(R.title) + '</b><span class="sim-timer" id="simTimer"></span>' +
            '<button class="btn btn--primary btn--sm" type="button" id="simFinish">' + esc(T("Bitir", "Finish")) + "</button></div>" +
          '<div class="sim-body"><section class="card sim-q">' +
            '<p class="hint">' + esc((R.idx + 1) + " / " + R.questions.length + " · " + App.data.curriculum.gradeName(q.it.grade) + " · " + L(q.it.subject.name)) + "</p>" +
            '<div class="md sim-q__text">' + App.markdown.render(q.q) + "</div>" +
            '<ol class="opts">' + q.options.map((o, i) => '<li><button type="button" class="opt' + (R.answers[R.idx] === i ? " is-picked" : "") + '" data-opt="' + i + '"><span class="opt__letter">' + LETTERS[i] + '</span><span class="opt__text md">' + inline(o) + "</span></button></li>").join("") + "</ol>" +
            '<div class="sim-nav"><button class="btn" type="button" data-go="-1"' + (R.idx ? "" : " disabled") + ">" + esc(T("← Önceki", "← Prev")) + "</button>" +
              '<button class="btn btn--ghost" type="button" id="simFlag">' + App.icon("flag") + esc(R.flags[R.idx] ? T("İşareti kaldır", "Unflag") : T("Sonra bak", "Flag")) + "</button>" +
              '<button class="btn" type="button" data-go="1"' + (R.idx < R.questions.length - 1 ? "" : " disabled") + ">" + esc(T("Sonraki →", "Next →")) + "</button></div>" +
          "</section>" +
          '<aside class="card sim-form"><div class="card__title">' + esc(T("Optik form", "Answer sheet")) + '</div><div class="sim-grid">' +
            R.questions.map((x, i) => '<button type="button" data-jump="' + i + '" class="' + (i === R.idx ? "is-cur " : "") + (R.answers[i] >= 0 ? "is-ans " : "") + (R.flags[i] ? "is-flag" : "") + '">' +
              (i + 1) + "<small>" + (R.answers[i] >= 0 ? LETTERS[R.answers[i]] : "·") + "</small></button>").join("") + "</div></aside></div>" +
        "</div>";
      App.hydrateIcons(view);
      view.firstElementChild.addEventListener("click", onClick);
      tick();
    };
    const tick = () => {
      const el = view.querySelector("#simTimer");
      if (!el) return;
      const left = (R.endAt - Date.now()) / 1000;
      el.textContent = "⏱ " + fmtTime(left);
      el.classList.toggle("is-low", left < 120);
      if (left <= 0) finish(view, true);
    };
    clearInterval(R.timer);
    R.timer = setInterval(() => { if (!view.querySelector("#simTimer")) { clearInterval(R.timer); return; } tick(); }, 1000);
    function onClick(e) {
      const o = e.target.closest("[data-opt]");
      if (o) { const i = Number(o.dataset.opt); R.answers[R.idx] = R.answers[R.idx] === i ? -1 : i; paint(); return; }
      const g = e.target.closest("[data-go]");
      if (g) { R.idx = Math.max(0, Math.min(R.questions.length - 1, R.idx + Number(g.dataset.go))); paint(); return; }
      const j = e.target.closest("[data-jump]");
      if (j) { R.idx = Number(j.dataset.jump); paint(); return; }
      if (e.target.closest("#simFlag")) { R.flags[R.idx] = !R.flags[R.idx]; paint(); return; }
      if (e.target.closest("#simFinish")) {
        const blank = R.answers.filter((a) => a < 0).length;
        App.ui.confirm(blank ? T(blank + " soru boş. Denemeyi bitirmek istiyor musun?", blank + " unanswered. Finish?") : T("Denemeyi bitir?", "Finish the exam?"), T("Bitir", "Finish")).then((ok) => ok && finish(view, false));
      }
    }
    paint();
  }

  async function finish(view, timeUp) {
    const R = run;
    if (!R || R.done) return;
    R.done = true;
    clearInterval(R.timer);
    const used = Math.min(R.limit, Math.round((Date.now() - R.startAt) / 1000));
    let d = 0, y = 0, b = 0;
    R.questions.forEach((q, i) => { const a = R.answers[i]; if (a < 0) b++; else if (a === q.answer) d++; else y++; });
    const net = d - y / 4;
    // Kazanım bazında kaydet (öğrenme haritası) + yanlış defteri
    const byKey = new Map();
    R.questions.forEach((q, i) => { const k = q.it.key; const g = byKey.get(k) || { it: q.it, list: [] }; g.list.push([q, R.answers[i]]); byKey.set(k, g); });
    for (const [key, g] of byKey) {
      const label = App.data.curriculum.gradeName(g.it.grade) + " · " + L(g.it.subject.name) + " · " + L(g.it.outcome.title);
      const correct = g.list.filter(([q, a]) => a === q.answer).length, wrong = g.list.filter(([q, a]) => a >= 0 && a !== q.answer).length;
      await App.db.put("quizzes", { id: uid("quiz"), key, label, date: new Date().toISOString(), total: g.list.length, correct, wrong, empty: g.list.length - correct - wrong, model: "sim",
        questions: g.list.map(([q, a]) => ({ q: q.q, options: q.options, answer: q.answer, explain: q.explain, chosen: a })) });
      for (const [q, a] of g.list) if (a !== q.answer) await App.mistakes.add({ source: "quiz", key, label, q: q.q, options: q.options, answer: q.answer, chosen: a, explain: q.explain });
    }
    const hist = (await App.db.get("meta", HIST).catch(() => null)) || { id: HIST, list: [] };
    hist.list.push({ at: new Date().toISOString(), title: R.title, d, y, b, net, used, limit: R.limit, keys: Array.from(byKey.keys()) });
    hist.list = hist.list.slice(-50);
    await App.db.put("meta", hist);
    if (App.badges) App.badges.check();

    const subj = {};
    R.questions.forEach((q, i) => { const s = L(q.it.subject.name); const x = subj[s] = subj[s] || [0, 0, 0]; const a = R.answers[i]; if (a < 0) x[2]++; else if (a === q.answer) x[0]++; else x[1]++; });
    view.innerHTML =
      '<div class="page page--narrow">' +
        '<div class="page-head"><div><h1>' + esc(T("Deneme sonucu", "Result")) + "</h1><p>" + esc(R.title + (timeUp ? T(" · süre doldu", " · time's up") : "")) + "</p></div></div>" +
        '<div class="rep-tiles">' +
          '<div class="rep-tile">' + App.icon("checkCircle") + "<b>" + d + "</b><span>" + esc(T("doğru", "correct")) + "</span></div>" +
          '<div class="rep-tile">' + App.icon("close") + "<b>" + y + "</b><span>" + esc(T("yanlış", "wrong")) + "</span></div>" +
          '<div class="rep-tile">' + App.icon("circle") + "<b>" + b + "</b><span>" + esc(T("boş", "blank")) + "</span></div>" +
          '<div class="rep-tile">' + App.icon("target") + "<b>" + net.toLocaleString(App.i18n.locale, { maximumFractionDigits: 2 }) + "</b><span>net</span></div>" +
          '<div class="rep-tile">' + App.icon("timer") + "<b>" + fmtTime(used) + "</b><span>" + esc(T("süre", "time")) + " / " + fmtTime(R.limit) + "</span></div>" +
        "</div>" +
        '<section class="card"><div class="card__title">' + App.icon("chart") + esc(T("Derslere göre", "By subject")) + '</div><ul class="about-list">' +
          Object.entries(subj).map(([s, [a, w, e]]) => "<li><b>" + esc(s) + "</b> — " + a + T(" D, ", " C, ") + w + T(" Y, ", " W, ") + e + T(" B · net ", " B · net ") + (a - w / 4).toLocaleString(App.i18n.locale, { maximumFractionDigits: 2 }) + "</li>").join("") + "</ul>" +
          '<p class="hint">' + esc(T("Sonuçlar öğrenme haritana işlendi; yanlış ve boşlar yanlış defterine eklendi.", "Results were added to your learning map; mistakes to the notebook.")) + "</p></section>" +
        '<section class="card"><div class="card__title">' + App.icon("eye") + esc(T("Çözümler", "Solutions")) + "</div>" +
          R.questions.map((q, i) => {
            const a = R.answers[i];
            return '<details class="sim-sol"><summary><span class="sim-mark ' + (a < 0 ? "is-b" : a === q.answer ? "is-d" : "is-y") + '">' + (i + 1) + "</span>" + esc(L(q.it.outcome.title)) + "</summary>" +
              '<div class="md">' + App.markdown.render(q.q) + "</div>" +
              '<ol class="opts">' + q.options.map((o, k) => '<li class="opt' + (k === q.answer ? " is-correct" : k === a ? " is-wrong" : "") + '"><span class="opt__letter">' + LETTERS[k] + '</span><span class="opt__text md">' + inline(o) + "</span></li>").join("") + "</ol>" +
              (q.explain ? '<div class="md hint">' + App.markdown.render(q.explain) + "</div>" : "") + "</details>";
          }).join("") + "</section>" +
        '<div class="sim-nav"><a class="btn" href="#/harita">' + App.icon("map") + esc(T("Öğrenme haritası", "Learning map")) + '</a><button class="btn btn--primary" type="button" id="simAgain">' + App.icon("refresh") + esc(T("Yeni deneme", "New exam")) + "</button></div>" +
      "</div>";
    App.hydrateIcons(view);
    view.querySelector("#simAgain").addEventListener("click", () => { run = null; render(view); });
    run = null;
  }

  App.router.register("simulasyon", render);
  App.sim = { pickOutcomes };
})();
