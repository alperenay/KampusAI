/* =========================================================
   curriculum.js — Konu Anlatımı ve Kazanımlar
   #/konular                         → sınıflar
   #/konular/9                       → 9. sınıf dersleri
   #/konular/9/matematik             → üniteler ve kazanımlar
   #/konular/9/matematik/u1/k1       → kazanım sayfası (şablon)
   İlerleme: "progress" deposu, kişisel notlar: "notes" deposu
   ========================================================= */
(function () {
  const { esc, debounce } = App.utils;

  /** İçerik metni: HTML ile başlıyorsa olduğu gibi, değilse Markdown + LaTeX olarak çizilir */
  const rich = (v) => { const s = L(v); return /^\s*</.test(s) ? s : App.markdown.render(s); };
  /** Tek satırlık metin (liste maddesi, soru): dıştaki <p> kaldırılır */
  const richInline = (v) => rich(v).replace(/^<p>([\s\S]*)<\/p>$/, "$1");
  const C = App.data.curriculum;
  const t = App.t, tn = App.tn, L = App.L;
  const T2 = (tr, en) => (App.i18n.lang === "en" ? en : tr);

  async function progressMap() {
    const rows = await App.db.getAll("progress");
    const map = {};
    rows.forEach((r) => { if (r.done) map[r.id] = r; });
    return map;
  }

  function outcomesOf(subject) {
    const out = [];
    subject.units.forEach((u) => u.outcomes.forEach((k) => out.push({ unit: u, outcome: k })));
    return out;
  }

  function countSubject(grade, subject, done) {
    const list = outcomesOf(subject);
    const completed = list.filter((x) => done[C.key(grade.id, subject.id, x.unit.id, x.outcome.id)]).length;
    return { total: list.length, done: completed };
  }

  function crumbs(parts) {
    return '<nav class="crumbs" aria-label="' + esc(t("cur.breadcrumb")) + '">' + parts.map((p, i) =>
      (i ? '<span aria-hidden="true">›</span>' : "") + (p.href ? '<a href="' + p.href + '">' + esc(p.text) + "</a>" : "<span>" + esc(p.text) + "</span>")
    ).join("") + "</nav>";
  }

  function progressText(c) {
    if (!c.total) return t("cur.aiAvailable");
    return t("cur.progress", { done: c.done, total: c.total });
  }

  /* ---------------- Yapay zekâyla içerik üretimi ---------------- */
  const aiNote = (info, text, regenAttr) =>
    '<div class="ai-note">' + App.icon("sparkle") + "<span>" + esc(text) +
      (info && info.model ? ' <small>' + esc(info.model) + (info.date ? " · " + esc(App.utils.fmtDate(String(info.date).slice(0, 10))) : "") + "</small>" : "") + "</span>" +
      '<button class="btn btn--sm btn--ghost" type="button" ' + regenAttr + ">" + App.icon("refresh") + esc(t("cur.aiRegen")) + "</button></div>";

  function genCardHtml(title, hint) {
    return '<section class="card ai-gen" id="aiGen"><div class="stage"><span class="spinner"></span>' + App.icon("sparkle") +
      "<span>" + esc(title) + '</span><code id="aiGenModel" hidden></code><span class="stage__time" id="aiGenTime"></span></div>' +
      '<p class="hint">' + esc(hint) + "</p></section>";
  }

  /** Üretimi çalıştır; bitince sayfayı yeniden çiz. Kullanıcı sayfadan çıktıysa üretim yine tamamlanır ve kaydedilir. */
  async function runGeneration(view, job) {
    const myHash = location.hash;
    const started = Date.now();
    const tick = setInterval(() => { const el = view.querySelector("#aiGenTime"); if (el) el.textContent = t("ai.seconds", { n: Math.round((Date.now() - started) / 1000) }); }, 1000);
    try {
      await job((eng, model) => { const c = view.querySelector("#aiGenModel"); if (c && model) { c.hidden = false; c.textContent = model; } });
      clearInterval(tick);
      if (location.hash === myHash) App.router.refresh();
    } catch (e) {
      clearInterval(tick);
      if (location.hash !== myHash) return;
      const box = view.querySelector("#aiGen");
      if (!box) return;
      box.outerHTML = '<div class="msg__error" id="aiGen"><b>' + esc(t("cur.aiFailed")) + "</b><p>" + esc(App.quiz.errorText(e)) + '</p><div class="msg__error-actions">' +
        '<button class="btn btn--sm" type="button" id="aiRetry">' + App.icon("refresh") + esc(t("ai.retry")) + "</button></div></div>";
      App.hydrateIcons(view);
      view.querySelector("#aiRetry").addEventListener("click", () => App.router.refresh());
    }
  }

  /* ---------------- Ortak: ders kimliği ---------------- */
  const subjIco = (s, size) => '<span class="subj-ico' + (size ? " subj-ico--" + size : "") + '">' + App.icon(s.icon || "book") + "</span>";
  /** Dersin sıradaki (tamamlanmamış, içeriği olan) kazanımı */
  function nextOf(grade, subject, done) {
    const list = outcomesOf(subject);
    const x = list.find((y) => !done[C.key(grade.id, subject.id, y.unit.id, y.outcome.id)]);
    return x ? { unit: x.unit, outcome: x.outcome, href: "#/konular/" + [grade.id, subject.id, x.unit.id, x.outcome.id].join("/"), first: x === list[0] } : null;
  }
  const masteryMap = () => (App.roots ? App.roots.mastery().catch(() => new Map()) : Promise.resolve(new Map()));
  const mTag = (m) => (m && ["weak", "mid", "strong"].includes(m.status) ? '<span class="m-tag m-tag--' + m.status + '">' + esc(t("cur.m." + m.status)) + "</span>" : "");

  /* ---------------- Sınıflar ve dersler (tek sayfa) ---------------- */
  async function renderGrades(view, grade) {
    const done = await progressMap();
    if (!grade) grade = C.findGrade(App.prefs.get("curGrade", "")) || C.grades[0];
    App.prefs.set("curGrade", grade.id);
    const pct = (g) => {
      let total = 0, comp = 0;
      g.subjects.forEach((s) => { const c = countSubject(g, s, done); total += c.total; comp += c.done; });
      return total ? Math.round((comp / total) * 100) : 0;
    };
    view.innerHTML =
      '<div class="page">' +
        '<div class="page-head"><div><h1>' + esc(t("cur.title")) + "</h1><p>" + esc(t("cur.intro")) + "</p></div></div>" +
        '<nav class="grade-tabs" aria-label="' + esc(t("cur.gradePick")) + '">' + C.grades.map((g) =>
          '<a href="#/konular/' + g.id + '"' + (g.id === grade.id ? ' aria-current="page"' : "") + ">" + esc(C.gradeName(g)) + (pct(g) ? "<small>%" + pct(g) + "</small>" : "") + "</a>").join("") + "</nav>" +
        '<div class="subj-grid">' + grade.subjects.map((s) => {
          const c = countSubject(grade, s, done);
          const nx = c.total ? nextOf(grade, s, done) : null;
          return '<a class="subj-tile subj-' + s.id + '" href="#/konular/' + grade.id + "/" + s.id + '">' + subjIco(s) +
            '<span class="subj-tile__name">' + esc(L(s.name)) + "</span>" +
            '<span class="subj-tile__meta">' + esc(s.units.length ? tn("cur.unitCount", s.units.length) + " · " + t("cur.outcomeCount", { n: c.total }) : t("cur.aiAvailable")) + "</span>" +
            (c.total ? '<span class="subj-tile__bar"><span class="progress progress--subj"><i style="width:' + Math.round((c.done / c.total) * 100) + '%"></i></span><span>' + c.done + "/" + c.total + "</span></span>" : "") +
            (nx ? '<span class="subj-tile__next"><b>' + esc(t("cur.upNext")) + ":</b> " + esc(L(nx.outcome.title)) + "</span>" : "") +
          "</a>";
        }).join("") + "</div>" +
      "</div>";
  }
  const renderSubjects = (view, grade) => renderGrades(view, grade);

  /* ---------------- Üniteler ---------------- */
  async function renderUnits(view, grade, subject) {
    App.prefs.set("curGrade", grade.id);
    const [done, M] = await Promise.all([progressMap(), masteryMap()]);
    const c = countSubject(grade, subject, done);
    const nx = c.total ? nextOf(grade, subject, done) : null;
    // Hepsi bittiyse en zayıf konuyu öner
    let weakest = null;
    if (c.total && !nx) outcomesOf(subject).forEach((x) => {
      const k = C.key(grade.id, subject.id, x.unit.id, x.outcome.id), m = M.get(k);
      if (m && m.score != null && (!weakest || m.score < weakest.score)) weakest = { score: m.score, outcome: x.outcome, href: "#/konular/" + k };
    });
    const openUnit = nx ? nx.unit.id : (subject.units[0] || {}).id;
    const body = subject.units.length
      ? subject.units.map((u) => {
          const doneCount = u.outcomes.filter((k) => done[C.key(grade.id, subject.id, u.id, k.id)]).length;
          const n = u.outcomes.length;
          return '<details class="unit"' + (u.id === openUnit ? " open" : "") + ">" +
            '<summary><span class="unit__chev">' + App.icon("chevron") + '</span><span class="unit__name">' + esc(L(u.name)) + "</span>" +
            '<span class="unit__count"><span class="progress progress--subj" aria-hidden="true"><i style="width:' + (n ? Math.round((doneCount / n) * 100) : 0) + '%"></i></span>' + doneCount + " / " + n + "</span></summary>" +
            '<div class="outcomes">' + u.outcomes.map((k) => {
              const key = C.key(grade.id, subject.id, u.id, k.id);
              const isDone = !!done[key];
              return '<a class="outcome' + (isDone ? " is-done" : "") + '" href="#/konular/' + [grade.id, subject.id, u.id, k.id].join("/") + '">' +
                '<span class="outcome__code">' + esc(k.code || "") + "</span>" +
                '<span class="outcome__title">' + esc(L(k.title)) + "</span>" +
                mTag(M.get(key)) +
                (k.content ? (k.ai ? '<span class="badge badge--ai" title="' + esc(t("cur.aiMadeShort")) + '">' + App.icon("sparkle") + "</span>" : "") : '<span class="badge">' + esc(t("cur.aiBadge")) + "</span>") +
                '<span class="outcome__state" title="' + esc(isDone ? t("cur.done") : t("cur.notDone")) + '">' + App.icon(isDone ? "checkCircle" : "circle") + "</span>" +
              "</a>";
            }).join("") + "</div></details>";
        }).join("")
      : genCardHtml(t("cur.aiSyllabusMaking", { subject: L(subject.name) }), t("cur.aiSyllabusHint"));

    const cont = nx
      ? '<a class="subj-continue" href="' + nx.href + '">' + App.icon("play") + '<span class="subj-continue__text"><small>' + esc(nx.first ? t("cur.startHere") : t("cur.continue")) + "</small><b>" + esc(L(nx.outcome.title)) + "</b></span>" + '<span class="subj-continue__go">' + App.icon("chevron") + "</span></a>"
      : weakest ? '<a class="subj-continue" href="' + weakest.href + '">' + App.icon("refresh") + '<span class="subj-continue__text"><small>' + esc(t("cur.allDone") + " · " + t("cur.reviewWeak")) + "</small><b>" + esc(L(weakest.outcome.title)) + "</b></span>" + '<span class="subj-continue__go">' + App.icon("chevron") + "</span></a>" : "";

    view.innerHTML =
      '<div class="page page--narrow subj-page subj-' + subject.id + '">' +
        crumbs([{ text: t("cur.title"), href: "#/konular" }, { text: C.gradeName(grade), href: "#/konular/" + grade.id }, { text: L(subject.name) }]) +
        '<div class="subj-head">' + subjIco(subject, "lg") + '<div class="subj-head__main">' +
          "<h1>" + esc(L(subject.name)) + "</h1>" +
          (c.total ? '<div class="subj-head__prog"><span class="progress progress--subj"><i style="width:' + Math.round((c.done / c.total) * 100) + '%"></i></span>' + esc(progressText(c)) + "</div>" : "") +
        "</div></div>" +
        (subject.ai ? aiNote(subject.ai, t("cur.aiSyllabusNote"), 'id="aiRegenSyl"') : "") +
        cont +
        (App.yazili && ["matematik", "fizik", "kimya", "biyoloji", "edebiyat", "tarih", "cografya", "inkilap"].indexOf(subject.id) >= 0
          ? '<a class="subj-continue subj-written" href="#/yazili/' + grade.id + "/" + subject.id + '">' + App.icon("pen") + '<span class="subj-continue__text"><small>' + esc(App.i18n.lang === "en" ? "Maarif Model · open-ended" : "Maarif Modeli · açık uçlu") + "</small><b>" + esc(App.i18n.lang === "en" ? "Written exams with answer key" : "Yazılı sınavlar ve cevap anahtarı") + '</b></span><span class="subj-continue__go">' + App.icon("chevron") + "</span></a>" : "") +
        body +
      "</div>";

    if (!subject.units.length) {
      runGeneration(view, (onStage) => App.lessons.generateSyllabus(grade.id, subject.id, { onStage }));
      return;
    }
    const regen = view.querySelector("#aiRegenSyl");
    if (regen) regen.addEventListener("click", async () => {
      if (!(await App.ui.confirm(t("cur.aiRegenSylConfirm"), t("cur.aiRegen")))) return;
      await App.lessons.removeSyllabus(grade.id, subject.id);
      App.router.refresh();
    });
  }

  /* ---------------- "Bu sayfada" içindekiler ---------------- */
  function buildToc(view) {
    const secs = Array.from(view.querySelectorAll(".lesson > section"));
    if (secs.length < 3) { view.querySelectorAll("[data-toc]").forEach((n) => n.remove()); return; }
    const items = secs.map((sec, i) => {
      sec.id = sec.id || "sec-" + i;
      let label = "";
      if (sec.classList.contains("lab-card")) label = t("cur.sec.lab");
      else if (sec.classList.contains("cards-card")) label = t("cur.sec.cards");
      else { const h = sec.querySelector("h2, .card__title, h3"); if (h) { const c = h.cloneNode(true); c.querySelectorAll("button, .badge").forEach((b) => b.remove()); label = c.textContent.trim(); } }
      if (sec.querySelector("#myNote")) label = t("cur.sec.notes");
      return label ? { id: sec.id, label: label.length > 34 ? label.slice(0, 32) + "…" : label } : null;
    }).filter(Boolean);
    view.querySelectorAll("[data-toc]").forEach((nav) => {
      nav.innerHTML = items.map((x) => '<a href="#/' + esc(location.hash.replace(/^#\/?/, "")) + '" data-sec="' + x.id + '">' + esc(x.label) + "</a>").join("");
      nav.addEventListener("click", (e) => {
        const a = e.target.closest("[data-sec]"); if (!a) return;
        e.preventDefault();
        const el = document.getElementById(a.dataset.sec);
        if (el) el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      });
    });
    // Görünen bölümü işaretle: ekranın üst üçte birini geçen son bölüm (en alta inilince sonuncusu)
    const root = document.getElementById("view");
    let last = null, raf = 0;
    const spy = () => {
      raf = 0;
      if (!view.contains(secs[0])) { root.removeEventListener("scroll", onScroll); return; }
      const line = window.innerHeight * 0.32;
      let cur = secs[0];
      secs.forEach((sec) => { if (sec.getBoundingClientRect().top <= line) cur = sec; });
      if (root.scrollTop + root.clientHeight >= root.scrollHeight - 4) cur = secs[secs.length - 1];
      if (cur === last) return;
      last = cur;
      view.querySelectorAll("[data-toc] a").forEach((a) => {
        const on = a.dataset.sec === cur.id;
        a.classList.toggle("is-on", on);
        if (on && a.closest(".toc--inline") && a.offsetParent) { const n = a.parentElement; n.scrollTo({ left: a.offsetLeft - n.clientWidth / 2 + a.offsetWidth / 2 }); }
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(spy); };
    root.addEventListener("scroll", onScroll, { passive: true });
    spy();
  }

  /* ---------------- Kazanım sayfası ---------------- */
  async function renderOutcome(view, grade, subject, unit, outcome) {
    const key = C.key(grade.id, subject.id, unit.id, outcome.id);
    const [prog, note] = await Promise.all([App.db.get("progress", key), App.db.get("notes", key)]);
    let isDone = !!(prog && prog.done);
    const ct = outcome.content;

    const flat = outcomesOf(subject);
    const idx = flat.findIndex((x) => x.unit.id === unit.id && x.outcome.id === outcome.id);
    const prev = flat[idx - 1], next = flat[idx + 1];
    const link = (x) => "#/konular/" + [grade.id, subject.id, x.unit.id, x.outcome.id].join("/");

    // İngilizce arayüzde içeriğin İngilizcesi yoksa kullanıcıya belirt
    const missingLang = ct && App.i18n.lang !== "tr" && !App.i18n.has(ct.anlatim);

    const quizCard = ct && App.quiz ? await App.quiz.cardHtml(key, "#/test/" + key) : "";
    const feyCard = ct && App.feynman ? await App.feynman.cardHtml(key, "#/anlat/" + key) : "";
    const chkCard = ct && App.check ? await App.check.cardHtml(key) : "";
    const rootCard = App.roots ? await App.roots.cardHtml(key).catch(() => "") : "";
    const cardsCard = ct && App.cards ? await App.cards.cardHtml(key).catch(() => "") : "";
    const fmCard = App.formuller ? await App.formuller.cardHtml(key).catch(() => "") : "";
    const ksCard = subject.id === "ingilizce" && App.konusma ? App.konusma.cardHtml(unit) : "";
    const labCards = ksCard + fmCard + (App.labs ? App.labs.sectionHtml(key) : "") + (App.modeller ? App.modeller.cardHtml(key) : "");
    // Okunabilir bölümlerde "Dinle" düğmesi (erişilebilirlik: sesli okuma)
    const section = (icon, title, inner, listen) =>
      '<section class="card lesson__section"' + (listen ? " data-read-scope" : "") + "><h2>" + App.icon(icon) + esc(title) + (listen && App.a11y ? App.a11y.listenBtnHtml() : "") + '</h2><div class="lesson__body md">' + inner + "</div></section>";
    const soon = '<p class="placeholder">' + esc(t("cur.contentSoon")) + "</p>";

    const pos = idx + 1, total = flat.length;
    view.innerHTML =
      '<div class="page page--narrow lesson-page subj-' + subject.id + '"><div class="lesson-main">' +
        '<div class="page-head"><div>' +
          crumbs([
            { text: C.gradeName(grade), href: "#/konular/" + grade.id },
            { text: L(subject.name), href: "#/konular/" + grade.id + "/" + subject.id },
            { text: L(unit.name) }
          ]) +
          '<h1 style="margin-top:8px;font-size:24px;line-height:1.3">' + esc(L(outcome.title)) + "</h1>" +
          (outcome.code ? '<p style="font-family:var(--mono);font-size:13px">' + esc(outcome.code) + "</p>" : "") +
        "</div>" +
        '<div class="page-head__actions">' + (ct && ct.anlatim && App.podcast ? '<a class="btn" href="#/podcast/' + key + '" title="' + esc(T2("Bu konuyu iki sesli sohbet olarak dinle", "Listen to this topic as a two-voice chat")) + '">🎧 ' + esc(T2("Podcast", "Podcast")) + "</a>" : "") + '<button class="btn' + (isDone ? "" : " btn--primary") + '" type="button" id="toggleDone"></button></div></div>' +

        '<nav class="toc toc--inline" data-toc aria-label="' + esc(t("cur.onPage")) + '"></nav>' +
        (missingLang ? '<p class="hint" style="margin:-8px 0 14px">' + esc(t("cur.onlyTurkish")) + "</p>" : "") +

        (outcome.ai ? aiNote(outcome.ai, t("cur.aiLessonNote"), 'id="aiRegenLes"') : "") +
        '<div class="lesson">' +
          (!ct ? genCardHtml(t("cur.aiLessonMaking"), t("cur.aiLessonHint")) :
          section("book", t("cur.lesson"), ct && ct.anlatim ? rich(ct.anlatim) : soon, !!(ct && ct.anlatim))) +
          (ct && ct.ornekler && ct.ornekler.length
            ? section("target", t("cur.examples"), ct.ornekler.map((o, i) =>
                '<div class="example"><div class="example__q"><b>' + esc(t("cur.example", { n: i + 1 })) + "</b> " + richInline(o.soru) + "</div>" +
                '<div class="example__a"><b>' + esc(t("cur.solution")) + "</b> " + richInline(o.cozum) + "</div></div>").join(""), true)
            : "") +
          (ct ? section("lightbulb", t("cur.keyFacts"), ct.ozet && ct.ozet.length ? "<ul>" + ct.ozet.map((s) => "<li>" + richInline(s) + "</li>").join("") + "</ul>" : soon, !!(ct.ozet && ct.ozet.length)) : "") +
          labCards + rootCard + cardsCard + quizCard + feyCard + chkCard +
          section("note", t("cur.myNotes"),
            '<textarea class="textarea" id="myNote" placeholder="' + esc(t("cur.notesPh")) + '">' + esc(note ? note.text : "") + "</textarea>" +
            '<p class="hint" id="noteState" style="margin-top:6px">' + esc(note && note.updatedAt ? t("cur.saved") : t("cur.notesLocal")) + "</p>") +
        "</div>" +

        '<nav class="lesson-nav">' +
          (prev ? '<a class="btn" href="' + link(prev) + '">' + App.icon("chevronL") + esc(t("cur.prev")) + "</a>" : "<span></span>") +
          (next ? '<a class="btn" href="' + link(next) + '">' + esc(t("cur.next")) + App.icon("chevron") + "</a>" : "") +
        "</nav>" +
        // Telefonda alt çubuk: önceki/sonraki, test, anlat ve "tamamlandı" başparmağın altında
        (ct ? '<nav class="lesson-dock" aria-label="' + esc(t("cur.dock")) + '">' +
          (prev ? '<a class="lesson-dock__btn" href="' + link(prev) + '">' + App.icon("chevronL") + "<span>" + esc(t("cur.dockPrev")) + "</span></a>" : '<span class="lesson-dock__btn is-off" aria-hidden="true"></span>') +
          '<a class="lesson-dock__btn" href="#/test/' + key + '">' + App.icon("quiz") + "<span>" + esc(t("cur.dockQuiz")) + "</span></a>" +
          '<a class="lesson-dock__btn" href="#/anlat/' + key + '">' + App.icon("mic") + "<span>" + esc(t("cur.dockExplain")) + "</span></a>" +
          '<button class="lesson-dock__btn" type="button" id="dockDone"></button>' +
          (next ? '<a class="lesson-dock__btn" href="' + link(next) + '">' + App.icon("chevron") + "<span>" + esc(t("cur.dockNext")) + "</span></a>" : '<span class="lesson-dock__btn is-off" aria-hidden="true"></span>') +
        "</nav>" : "") +
      "</div>" +
      // Geniş ekranda sağ sütun: konum, bu sayfada, kısayollar
      '<aside class="lesson-aside" aria-label="' + esc(t("cur.onPage")) + '">' +
        '<div class="lesson-aside__pos"><span>' + subjIco(subject, "sm") + " " + esc(t("cur.pos", { i: pos, n: total })) + '</span><span class="progress progress--subj"><i style="width:' + Math.round((pos / total) * 100) + '%"></i></span></div>' +
        '<nav class="toc" data-toc></nav>' +
        (ct ? '<div class="lesson-aside__acts"><a class="btn btn--sm" href="#/test/' + key + '">' + App.icon("quiz") + esc(t("cur.dockQuiz")) + "</a>" +
          '<a class="btn btn--sm" href="#/anlat/' + key + '">' + App.icon("mic") + esc(t("cur.dockExplain")) + "</a>" +
          (App.cards && App.cards.buildFor(key).length ? '<a class="btn btn--sm" href="#/kartlar/konu/' + key + '">' + App.icon("layers") + esc(t("cur.sec.cards")) + "</a>" : "") +
          (ct.anlatim && App.podcast ? '<a class="btn btn--sm" href="#/podcast/' + key + '">🎧 ' + esc(T2("Podcast", "Podcast")) + "</a>" : "") + "</div>" : "") +
        '<div class="lesson-aside__nav">' + (prev ? '<a class="btn btn--sm" href="' + link(prev) + '" title="' + esc(L(prev.outcome.title)) + '">' + App.icon("chevronL") + esc(t("cur.dockPrev")) + "</a>" : "") +
          (next ? '<a class="btn btn--sm" href="' + link(next) + '" title="' + esc(L(next.outcome.title)) + '">' + esc(t("cur.dockNext")) + App.icon("chevron") + "</a>" : "") + "</div>" +
      "</aside>" +
      "</div>";
    buildToc(view);

    if (!ct) runGeneration(view, (onStage) => App.lessons.generateLesson(key, { onStage }));
    const regenLes = view.querySelector("#aiRegenLes");
    if (regenLes) regenLes.addEventListener("click", async () => {
      if (!(await App.ui.confirm(t("cur.aiRegenLesConfirm"), t("cur.aiRegen")))) return;
      await App.lessons.removeLesson(key);
      App.router.refresh();
    });

    if (App.cards) App.cards.bindCard(view);
    if (App.labs) App.labs.mountIn(view, key);

    const btn = view.querySelector("#toggleDone");
    const paint = () => {
      btn.innerHTML = App.icon(isDone ? "checkCircle" : "check") + esc(isDone ? t("cur.done") : t("cur.markDone"));
      btn.classList.toggle("btn--primary", !isDone);
      btn.classList.toggle("badge--good", isDone);
      const dd = view.querySelector("#dockDone");
      if (dd) {
        dd.innerHTML = App.icon(isDone ? "checkCircle" : "check") + "<span>" + esc(isDone ? t("cur.dockDone") : t("cur.dockMark")) + "</span>";
        dd.classList.toggle("is-on", isDone);
        dd.setAttribute("aria-pressed", String(isDone));
      }
    };
    const dockDone = view.querySelector("#dockDone");
    if (dockDone) dockDone.addEventListener("click", () => btn.click());
    paint();
    btn.addEventListener("click", async () => {
      isDone = !isDone;
      if (isDone) await App.db.put("progress", { id: key, done: true, at: new Date().toISOString() });
      else await App.db.remove("progress", key);
      paint();
      App.ui.toast(isDone ? t("cur.toastDone") : t("cur.toastUndone"));
    });

    const area = view.querySelector("#myNote");
    const state = view.querySelector("#noteState");
    const saveNote = debounce(async () => {
      const text = area.value;
      if (text.trim()) await App.db.put("notes", { id: key, text, updatedAt: new Date().toISOString() });
      else await App.db.remove("notes", key);
      state.textContent = t("cur.saved");
    }, 600);
    area.addEventListener("input", () => { state.textContent = t("cur.saving"); saveNote(); });
  }

  App.router.register("konular", async (view, p) => {
    App.setTitle(t("cur.title"));
    if (!p[0]) return renderGrades(view);
    const grade = C.findGrade(p[0]);
    if (!grade) return renderGrades(view);
    if (!p[1]) return renderSubjects(view, grade);
    const subject = C.findSubject(p[0], p[1]);
    if (!subject) return renderSubjects(view, grade);
    if (!p[2]) return renderUnits(view, grade, subject);
    const unit = subject.units.find((u) => u.id === p[2]);
    const outcome = unit && unit.outcomes.find((k) => k.id === p[3]);
    if (!outcome) return renderUnits(view, grade, subject);
    return renderOutcome(view, grade, subject, unit, outcome);
  });
})();
