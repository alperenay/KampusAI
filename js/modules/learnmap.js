/* =========================================================
   learnmap.js — Kişisel öğrenme haritası ve "Bugünün 20 dakikası"   (#/harita)

   • Harita: tüm kazanımlar (9–12. sınıf) öğrencinin kendi verisine göre renklenir:
       güçlü / orta / zayıf / çalışıldı (test yok) / hiç çalışılmadı
     Hâkimiyet puanı Kök Eksik Analizi'yle aynı hesaptır (App.roots.mastery):
     konu testleri, Feynman puanı, çözüm kontrolleri, çözülmemiş yanlışlar.
   • Bugünün 20 dakikası: her gün hedefe en çok puan getirecek 2 kazanım + tekrar zamanı gelen
     yanlışlar. Ders önceliği Puan ve Hedef'teki puan türünden (katsayı × kalan net) gelir;
     hedef yoksa deneme netlerindeki boşluklardan, deneme de yoksa eşit.
     Plan gün boyu sabit kalır ("meta" deposu, id "daily:<YYYY-MM-DD>"); görevler kendiliğinden işaretlenir:
       konu → o gün konu testi çözüldüyse ya da "çalıştım" işaretlendiyse, yanlışlar → tekrar edilecek kalmadıysa.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const L = App.L;
  const C = () => App.data.curriculum;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const dayKey = (d) => { const x = new Date(d || Date.now()); return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0"); };

  /* Müfredat dersi → YKS testleri (Puan ve Hedef katsayıları için) */
  const EXAM_MAP = {
    matematik: [["TYT", "matematik"], ["AYT", "matematik"]],
    fizik: [["TYT", "fen"], ["AYT", "fizik"]],
    kimya: [["TYT", "fen"], ["AYT", "kimya"]],
    biyoloji: [["TYT", "fen"], ["AYT", "biyoloji"]],
    edebiyat: [["TYT", "turkce"], ["AYT", "edebiyat"]],
    tarih: [["TYT", "sosyal"], ["AYT", "tarih1"], ["AYT", "tarih2"]],
    inkilap: [["TYT", "sosyal"], ["AYT", "tarih1"], ["AYT", "tarih2"]],
    cografya: [["TYT", "sosyal"], ["AYT", "cografya1"], ["AYT", "cografya2"]],
    felsefe: [["TYT", "sosyal"], ["AYT", "felsefe"]],
    psikoloji: [["AYT", "felsefe"]],
    sosyoloji: [["AYT", "felsefe"]],
    cagdas: [["AYT", "tarih2"]],
    saglik: [], beden: [], gorsel: [], muzik: [], almanca: [],
    din: [["TYT", "sosyal"], ["AYT", "din"]],
    ingilizce: []
  };
  const NEED = { weak: 1, unknown: 0.75, studied: 0.6, mid: 0.5, strong: 0.05 };
  const STATUS = ["strong", "mid", "weak", "studied", "unknown"];
  const STATUS_NAME = () => ({
    strong: T("Güçlü", "Strong"), mid: T("Orta", "Fair"), weak: T("Zayıf", "Weak"),
    studied: T("Çalışıldı, test yok", "Studied, not tested"), unknown: T("Hiç çalışılmadı", "Not started")
  });

  /** Tüm kazanımlar müfredat sırasıyla: { key, grade, subject, unit, outcome } */
  function allOutcomes() {
    const out = [];
    C().grades.forEach((g) => g.subjects.forEach((s) => s.units.forEach((u) => (u.outcomes || []).forEach((o) => {
      out.push({ key: C().key(g.id, s.id, u.id, o.id), grade: g, subject: s, unit: u, outcome: o });
    }))));
    return out;
  }

  /** Ders öncelikleri (müfredat ders kimliği → ağırlık 0..1) */
  async function subjectWeights() {
    const w = {};
    let type = null;
    try { const st = await App.db.get("meta", "scoreTarget"); if (st && st.base) type = st.type; } catch (e) { /* yok */ }
    let avg = null;
    try { avg = App.score ? await App.score.averages(3) : null; } catch (e) { avg = null; }
    const haveExams = avg && (avg.count.TYT || avg.count.AYT);
    const K = App.score ? App.score.TYPES[type || "TYT"] : null;
    Object.keys(EXAM_MAP).forEach((sid) => {
      let v = 0;
      EXAM_MAP[sid].forEach(([ex, id]) => {
        const s = App.data.exams.types[ex].subjects.find((x) => x.id === id);
        if (!s) return;
        const coef = K ? (ex === "TYT" ? K.tyt[id] : K.ayt[id]) || 0 : 1;
        // hedef puan türünde olmayan AYT testi (ör. SAY için tarih) az önemli
        const eff = coef || (ex === "TYT" ? 0.4 : 0.15);
        const room = haveExams ? Math.max(0, s.questions - (avg[ex][id] || 0)) / s.questions : 0.6;
        v += eff * room;
      });
      w[sid] = v;
    });
    if (!EXAM_MAP.ingilizce.length) w.ingilizce = 0.05;
    const max = Math.max(...Object.values(w), 0.0001);
    Object.keys(w).forEach((k) => { w[k] = w[k] / max; });
    return { w, type, haveExams };
  }

  /* ---------------- Günlük plan ---------------- */
  async function dailyPlan(force) {
    const id = "daily:" + dayKey();
    let plan = force ? null : await App.db.get("meta", id).catch(() => null);
    const M = await App.roots.mastery();
    if (!plan) {
      const { w } = await subjectWeights();
      const items = allOutcomes();
      // Her derste müfredat sırasındaki ilk "güçlü olmayan" ve içeriği olan kazanım
      const firstPer = {};
      items.forEach((it) => {
        const sid = it.subject.id;
        if (firstPer[sid] || !(it.outcome.content || it.outcome.curatedContent)) return;
        const st = (M.get(it.key) || { status: "unknown" }).status;
        if (st !== "strong") firstPer[sid] = { key: it.key, sid, status: st, score: (w[sid] || 0) * NEED[st] };
      });
      // Zayıf olarak işaretli kazanımlar sırayı beklemeden öne geçer
      items.forEach((it) => {
        const m = M.get(it.key);
        if (m && m.status === "weak" && (it.outcome.content || it.outcome.curatedContent)) {
          const sc = (w[it.subject.id] || 0) * NEED.weak * 1.15;
          const cur = firstPer[it.subject.id];
          if (!cur || cur.score < sc) firstPer[it.subject.id] = { key: it.key, sid: it.subject.id, status: "weak", score: sc };
        }
      });
      const picks = Object.values(firstPer).sort((a, b) => b.score - a.score).slice(0, 2);
      plan = { id, date: dayKey(), topics: picks.map((p) => ({ key: p.key, status: p.status })), marked: [] };
      await App.db.put("meta", plan);
    }
    // Görev durumları
    const today = dayKey();
    const quizzes = await App.db.getAll("quizzes").catch(() => []);
    const mc = await App.mistakes.counts();
    const topics = plan.topics.map((tp) => Object.assign({}, tp, {
      done: (plan.marked || []).includes(tp.key) || quizzes.some((q) => q.key === tp.key && dayKey(q.date) === today),
      m: M.get(tp.key) || { score: null, status: "unknown" }
    }));
    const review = { due: mc.due, done: mc.due === 0 };
    // Hap bilgi kartları: deste boş değilse günlük göreve eklenir
    let cards = null;
    if (App.cards) {
      await App.cards.autoAdd().catch(() => 0);
      const cs = await App.cards.stats().catch(() => null);
      if (cs && cs.total) cards = { todo: cs.todo, due: cs.due, done: cs.todo === 0 };
    }
    const doneCount = topics.filter((x) => x.done).length + (review.done ? 1 : 0) + (cards && cards.done ? 1 : 0);
    const total = topics.length + 1 + (cards ? 1 : 0);
    if (doneCount === total && !plan.completed) {
      plan.completed = true;
      await App.db.put("meta", plan);
    }
    return { plan, topics, review, cards, doneCount, total, completed: !!plan.completed };
  }

  async function markTopic(key, on) {
    const id = "daily:" + dayKey();
    const plan = await App.db.get("meta", id);
    if (!plan) return;
    plan.marked = (plan.marked || []).filter((k) => k !== key).concat(on ? [key] : []);
    await App.db.put("meta", plan);
  }

  /** Bugün kartı (Bugün ekranında da kullanılır) */
  async function dailyCardHtml(compact) {
    const d = await dailyPlan();
    const SN = STATUS_NAME();
    const rows = d.topics.map((tp) => {
      const f = App.lessons.find(tp.key);
      if (!f) return "";
      return '<li class="daily-task subj-' + esc(f.subject.id) + (tp.done ? " is-done" : "") + '">' +
        '<button type="button" class="daily-check" data-mark="' + esc(tp.key) + '" aria-pressed="' + tp.done + '" title="' + esc(T("Çalıştım", "Done")) + '">' + App.icon(tp.done ? "checkCircle" : "circle") + "</button>" +
        '<div class="daily-task__body"><b>' + esc(L(f.outcome.title)) + "</b>" +
        '<span class="hint">' + esc(C().gradeName(f.grade) + " · " + L(f.subject.name) + " · " + SN[tp.m.status] + (tp.m.score != null ? " (" + tp.m.score + ")" : "") + (tp.m.parts && tp.m.parts.fading ? T(" · tekrar zamanı", " · review due") : "")) + "</span>" +
        '<span class="daily-task__acts"><a class="btn btn--sm" href="#/konular/' + esc(tp.key) + '">' + App.icon("book") + esc(T("Özeti oku", "Read")) + "</a>" +
        '<a class="btn btn--sm btn--primary" href="#/test/' + esc(tp.key) + '">' + App.icon("quiz") + esc(T("Konu testi", "Quiz")) + "</a></span></div></li>";
    }).join("");
    const rev = '<li class="daily-task' + (d.review.done ? " is-done" : "") + '"><span class="daily-check">' + App.icon(d.review.done ? "checkCircle" : "circle") + "</span>" +
      '<div class="daily-task__body"><b>' + esc(d.review.done ? T("Bugün tekrar edilecek yanlış kalmadı", "No mistakes due today") : T(d.review.due + " yanlışın tekrar zamanı geldi", d.review.due + " mistakes are due")) + "</b>" +
      (d.review.done ? "" : '<span class="daily-task__acts"><a class="btn btn--sm" href="#/yanlislar">' + App.icon("bookmark") + esc(T("Tekrar et", "Review")) + "</a></span>") + "</div></li>";
    const crd = !d.cards ? "" : '<li class="daily-task' + (d.cards.done ? " is-done" : "") + '"><span class="daily-check">' + App.icon(d.cards.done ? "checkCircle" : "circle") + "</span>" +
      '<div class="daily-task__body"><b>' + esc(d.cards.done ? T("Bugünkü kart tekrarı tamam", "Today's flashcards done") : T(d.cards.todo + " hap kartı seni bekliyor", d.cards.todo + " flashcards waiting")) + "</b>" +
      (d.cards.done ? "" : '<span class="daily-task__acts"><a class="btn btn--sm" href="#/kartlar/calis">' + App.icon("layers") + esc(T("Kartları çalış", "Study cards")) + "</a></span>") + "</div></li>";
    return '<section class="card daily' + (compact ? " daily--compact" : "") + '">' +
      '<div class="daily__head"><div class="card__title">' + App.icon("target") + esc(T("Bugünün 20 dakikası", "Today's 20 minutes")) + "</div>" +
      '<span class="badge' + (d.completed ? " badge--good" : "") + '">' + d.doneCount + "/" + d.total + "</span></div>" +
      '<p class="hint">' + esc(d.completed ? T("Bugünün görevleri tamam, harika! Yarın yeni konular gelecek.", "All done for today, great! New topics tomorrow.")
        : T("Hedefine en çok puan getirecek konular ve tekrar zamanı gelen yanlışların.", "The topics that add the most to your target, plus mistakes due for review.")) + "</p>" +
      '<ol class="daily-list">' + rows + rev + crd + "</ol></section>";
  }

  /* ---------------- Harita sayfası ---------------- */
  async function render(view, params) {
    App.setTitle(T("Öğrenme Haritası", "Learning Map"));
    await App.roots.load().catch(() => {});
    const [M, sw] = await Promise.all([App.roots.mastery(), subjectWeights()]);
    const items = allOutcomes();
    const SN = STATUS_NAME();
    const subjIds = Array.from(new Set(items.map((x) => x.subject.id)));
    const filter = params[0] && subjIds.includes(params[0]) ? params[0] : App.prefs.get("mapSubject", subjIds[0] || "matematik");
    const stOf = (k) => (M.get(k) || { status: "unknown" }).status;

    const counts = {};
    STATUS.forEach((s) => { counts[s] = 0; });
    items.forEach((it) => { counts[stOf(it.key)]++; });
    const pct = (n) => (items.length ? Math.round((n / items.length) * 100) : 0);

    const subjName = (sid) => { const s = items.find((x) => x.subject.id === sid); return s ? L(s.subject.name) : sid; };
    const subjBar = (sid) => {
      const list = items.filter((x) => x.subject.id === sid);
      const c = {}; STATUS.forEach((s) => { c[s] = 0; });
      list.forEach((x) => { c[stOf(x.key)]++; });
      return '<span class="map-bar">' + STATUS.map((s) => (c[s] ? '<i class="st-' + s + '" style="flex:' + c[s] + '"></i>' : "")).join("") + "</span>";
    };

    let fadingN = 0; M.forEach((m) => { if (m.parts && m.parts.fading) fadingN++; });
    const grid = C().grades.map((g) => {
      const s = g.subjects.find((x) => x.id === filter);
      if (!s || !s.units.length) return "";
      return '<div class="map-grade"><h3 class="score-h">' + esc(C().gradeName(g)) + "</h3>" + s.units.map((u) =>
        '<div class="map-unit"><span class="map-unit__name">' + esc(L(u.name)) + '</span><div class="map-chips">' + (u.outcomes || []).map((o) => {
          const key = C().key(g.id, s.id, u.id, o.id);
          const m = M.get(key) || { status: "unknown", score: null };
          const pt = m.parts || {};
          const fade = pt.fading ? " " + T("— tekrar zamanı: " + pt.days + " gün önce çalışıldı, hatırlama ~%" + pt.retention, "— review due: studied " + pt.days + " days ago, recall ~" + pt.retention + "%") : "";
          return '<a class="map-chip st-' + m.status + (pt.fading ? " is-fading" : "") + '" href="#/konular/' + esc(key) + '" title="' + esc(L(o.title) + " — " + SN[m.status] + (m.score != null ? " (" + m.score + "/100)" : "") + fade) + '">' +
            esc(o.code || o.id) + "</a>";
        }).join("") + "</div></div>").join("") + "</div>";
    }).join("");

    view.innerHTML =
      '<div class="page">' +
        '<div class="page-head"><div><h1>' + esc(T("Öğrenme Haritası", "Learning Map")) + "</h1><p>" +
          esc(T("Her kazanım, senin testlerine, anlatımlarına ve yanlışlarına göre renklenir. Her gün hedefine en çok puan getirecek konular seçilir.",
                "Every learning outcome is colored by your own quizzes, explanations and mistakes. Each day the topics that add most to your target are picked.")) + "</p></div></div>" +
        '<div class="map-top">' +
          '<div id="dailyBox">' + (await dailyCardHtml(false)) + "</div>" +
          '<section class="card map-summary"><div class="card__title">' + App.icon("chart") + esc(T("Genel durum", "Overview")) + "</div>" +
            '<div class="map-legend">' + STATUS.map((s) => '<span class="map-legend__i"><i class="st-' + s + '"></i>' + esc(SN[s]) + " <b>" + counts[s] + "</b> <small>%" + pct(counts[s]) + "</small></span>").join("") + "</div>" +
            (fadingN ? '<p class="hint map-fade-note"><span class="map-chip is-fading st-mid">↺</span>' + esc(T(fadingN + " konu unutulmaya başladı (soluk görünenler). Unutma eğrisine göre tekrar zamanı geldi; günlük göreve eklenir.",
              fadingN + " topics are fading (shown faded). Per the forgetting curve they are due for review.")) + "</p>" : "") +
            '<p class="hint">' + esc(sw.type ? T("Öncelikler hedef puan türüne göre (" + sw.type + ") hesaplanıyor.", "Priorities follow your target score type (" + sw.type + ").")
              : T("Puan ve Hedef'te hedef bölüm seçersen öncelikler ona göre ayarlanır.", "Set a target program in Score & Target to tune priorities.")) +
              ' <a href="#/puan">' + esc(T("Puan ve Hedef", "Score & Target")) + "</a></p>" +
            '<div id="badgeBox"></div>' +
          "</section>" +
        "</div>" +
        '<section class="card"><div class="map-subjects" role="tablist">' + subjIds.map((sid) =>
          '<button type="button" class="map-subj' + (sid === filter ? " is-active" : "") + '" data-subj="' + esc(sid) + '"><span>' + esc(subjName(sid)) + "</span>" + subjBar(sid) + "</button>").join("") + "</div>" +
          '<div class="map-grid">' + (grid || '<p class="hint">' + esc(T("Bu derste henüz kazanım listesi yok; Konu Anlatımı'ndan oluşturabilirsin.", "No outcome list for this subject yet; create one in Lessons.")) + "</p>") + "</div>" +
        "</section>" +
      "</div>";

    if (App.badges) App.badges.cardHtml().then((h) => { const b = view.querySelector("#badgeBox"); if (b) { b.innerHTML = h; App.hydrateIcons(b); } }).catch(() => {});
    const page = view.firstElementChild;
    page.addEventListener("click", async (e) => {
      const s = e.target.closest("[data-subj]");
      if (s) { App.prefs.set("mapSubject", s.dataset.subj); App.router.go("harita/" + s.dataset.subj); return; }
      const mk = e.target.closest("[data-mark]");
      if (mk) {
        await markTopic(mk.dataset.mark, mk.getAttribute("aria-pressed") !== "true");
        const box = view.querySelector("#dailyBox");
        box.innerHTML = await dailyCardHtml(false);
        App.hydrateIcons(box);
        if (App.badges) App.badges.check();
      }
    });
  }

  App.router.register("harita", render);
  App.learnmap = { dailyPlan, dailyCardHtml, markTopic, subjectWeights, allOutcomes, dayKey };
})();
