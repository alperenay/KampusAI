/* =========================================================
   today.js — "Bugün" ekranı   (#/bugun)

   Tek bakışta: şu an / sıradaki ders (Programım), bugünün akışı, tekrar
   zamanı gelen yanlışlar, odak süresi ve seri, YKS sayacı ve hedef,
   üzerinde çalışılması önerilen konu ve en sık yapılan hata türü.
   Sayfa açıkken her dakika kendini günceller.
   ========================================================= */
(function () {
  const { esc, toMinutes, durationText, weekdayIndex } = App.utils;
  const t = App.t, L = App.L;
  const C = () => App.data.curriculum;

  const nowMin = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); };

  function greeting() {
    const h = new Date().getHours();
    return h < 5 ? t("today.hiNight") : h < 12 ? t("today.hiMorning") : h < 18 ? t("today.hiDay") : t("today.hiEvening");
  }

  /** Bugünün blokları (Programım), şimdiki ve sıradaki */
  async function todayBlocks() {
    const plan = await App.db.get("schedules", "user");
    const all = (plan && plan.blocks) || [];
    const day = weekdayIndex();
    const blocks = all.filter((b) => Number(b.day) === day).sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
    const n = nowMin();
    const current = blocks.find((b) => toMinutes(b.start) <= n && n < toMinutes(b.end));
    const next = blocks.find((b) => toMinutes(b.start) > n);
    return { has: all.length > 0, blocks, current, next };
  }

  /** Önerilen konu: en düşük son test sonucu → en çok yanlışın olduğu kazanım → henüz bitmemiş ilk kazanım */
  async function suggestion() {
    const quizzes = await App.db.getAll("quizzes");
    const last = {};
    quizzes.forEach((q) => { if (!last[q.key] || String(q.date) > String(last[q.key].date)) last[q.key] = q; });
    const weak = Object.values(last).filter((q) => q.total && q.correct / q.total < 0.7).sort((a, b) => a.correct / a.total - b.correct / b.total)[0];
    if (weak && App.lessons.find(weak.key)) {
      // Zayıf konunun kökü daha temel bir konudaysa önce onu öner (kök eksik analizi)
      const root = App.roots ? await App.roots.rootFor(weak.key).catch(() => null) : null;
      if (root && App.lessons.find(root.key)) {
        const f = App.lessons.find(weak.key);
        return { key: root.key, why: t("today.whyRoot", { topic: App.L(f.outcome.title) }) };
      }
      return { key: weak.key, why: t("today.whyQuiz", { c: weak.correct, total: weak.total }) };
    }
    const mis = (await App.db.getAll("mistakes")).filter((m) => !m.mastered && m.key);
    const byKey = {};
    mis.forEach((m) => { byKey[m.key] = (byKey[m.key] || 0) + 1; });
    const top = Object.entries(byKey).sort((a, b) => b[1] - a[1])[0];
    if (top && App.lessons.find(top[0])) return { key: top[0], why: t("today.whyMistakes", { n: top[1] }) };
    const done = new Set((await App.db.getAll("progress")).filter((p) => p.done).map((p) => p.id));
    for (const g of C().grades) for (const s of g.subjects) for (const u of s.units) for (const k of u.outcomes) {
      const key = C().key(g.id, s.id, u.id, k.id);
      if (k.content && !done.has(key)) return { key, why: t("today.whyNext") };
    }
    return null;
  }

  function blockRow(b, state) {
    const color = ((App.data.scheduleKinds[b.kind] || App.data.scheduleKinds.ders) || {}).color;
    return '<li class="tday-block is-' + state + '" style="--c:' + color + '"><span class="tday-block__time">' + esc(b.start) + "–" + esc(b.end) + "</span>" +
      '<span class="tday-block__name">' + esc(L(b.subject)) + (L(b.note) ? " <small>" + esc(L(b.note)) + "</small>" : "") + "</span>" +
      (state === "now" ? '<span class="badge badge--good">' + esc(t("today.nowBadge")) + "</span>" : state === "done" ? App.icon("check") : "") + "</li>";
  }

  async function render(view) {
    App.setTitle(t("today.title"));
    const [tb, focus, mc, sug, mistakes] = await Promise.all([
      todayBlocks(), App.focus.stats(), App.mistakes.counts(), suggestion(), App.db.getAll("mistakes")
    ]);
    const name = (App.prefs.get("userName", "") || "").trim().split(/\s+/)[0];
    const dateText = new Date().toLocaleDateString(App.i18n.locale, { weekday: "long", day: "numeric", month: "long" });
    const n = nowMin();

    // Şimdi / sıradaki
    let nowCard;
    if (tb.current) {
      const left = toMinutes(tb.current.end) - n;
      nowCard = '<section class="card tday-now is-live" style="--c:' + ((App.data.scheduleKinds[tb.current.kind] || {}).color || "var(--accent)") + '">' +
        '<span class="tday-now__eyebrow">' + esc(t("today.now")) + "</span>" +
        '<h2 class="tday-now__title">' + esc(L(tb.current.subject)) + "</h2>" +
        '<p class="hint">' + esc(tb.current.start + "–" + tb.current.end + " · " + t("kind." + (tb.current.kind || "ders")) + (L(tb.current.note) ? " · " + L(tb.current.note) : "")) + "</p>" +
        '<p class="tday-now__left">' + esc(t("today.minsLeft", { n: left })) + "</p>" +
        '<button class="btn btn--primary" type="button" data-focus="' + esc(L(tb.current.subject)) + '">' + App.icon("play") + esc(t("today.startFocus")) + "</button></section>";
    } else if (tb.next) {
      const inMin = toMinutes(tb.next.start) - n;
      nowCard = '<section class="card tday-now">' +
        '<span class="tday-now__eyebrow">' + esc(t("today.next")) + "</span>" +
        '<h2 class="tday-now__title">' + esc(L(tb.next.subject)) + "</h2>" +
        '<p class="hint">' + esc(tb.next.start + "–" + tb.next.end + " · " + t("kind." + (tb.next.kind || "ders"))) + "</p>" +
        '<p class="tday-now__left">' + esc(inMin >= 60 ? t("today.inHours", { h: Math.floor(inMin / 60), m: inMin % 60 }) : t("today.inMins", { n: inMin })) + "</p>" +
        '<button class="btn" type="button" data-focus="' + esc(L(tb.next.subject)) + '">' + App.icon("timer") + esc(t("today.startEarly")) + "</button></section>";
    } else {
      nowCard = '<section class="card tday-now">' +
        '<span class="tday-now__eyebrow">' + esc(t("today.planTitle")) + "</span>" +
        '<h2 class="tday-now__title">' + esc(tb.has ? (tb.blocks.length ? t("today.dayDone") : t("today.noBlocksToday")) : t("today.noPlan")) + "</h2>" +
        '<p class="hint">' + esc(tb.has ? t("today.freeHint") : t("today.noPlanHint")) + "</p>" +
        '<div class="tday-actions">' + (tb.has ? '<button class="btn" type="button" data-focus="">' + App.icon("timer") + esc(t("today.freeFocus")) + "</button>"
          : '<a class="btn btn--primary" href="#/program/benim">' + App.icon("sparkle") + esc(t("today.makePlan")) + "</a>") + "</div></section>";
    }

    const flow = tb.blocks.length ? '<section class="card tday-card"><h3>' + App.icon("calendar") + esc(t("today.flow")) + '</h3><ol class="tday-flow">' +
      tb.blocks.map((b) => blockRow(b, b === tb.current ? "now" : toMinutes(b.end) <= n ? "done" : "later")).join("") + "</ol></section>" : "";

    const review = '<a class="card tday-stat" href="#/yanlislar">' + App.icon("bookmark") +
      '<span class="tday-stat__n">' + mc.due + '</span><span class="tday-stat__l">' + esc(mc.due ? t("today.reviewDue") : t("today.reviewNone")) + "</span></a>";
    const focusStat = '<a class="card tday-stat" href="#/odak">' + App.icon("timer") +
      '<span class="tday-stat__n">' + esc(durationText(focus.today) || "0") + '</span><span class="tday-stat__l">' + esc(t("today.focusToday", { streak: focus.streak })) + "</span></a>";
    const days = App.goals.daysLeft();
    const g = App.goals.get();
    const tTarget = App.goals.targetTotal("TYT");
    const goalStat = '<a class="card tday-stat" href="#/denemeler">' + App.icon("flag") +
      '<span class="tday-stat__n">' + (days != null && days >= 0 ? days : "–") + '</span><span class="tday-stat__l">' +
      esc(t("today.daysToYks") + (g.estimated ? " " + t("goal.estimated") : "") + (tTarget != null ? " · " + t("today.target", { n: tTarget }) : "")) + "</span></a>";

    let sugCard = "";
    if (sug) {
      const f = App.lessons.find(sug.key);
      sugCard = '<section class="card tday-card tday-sug"><h3>' + App.icon("target") + esc(t("today.suggest")) + "</h3>" +
        '<p class="tday-sug__title">' + esc(L(f.outcome.title)) + "</p>" +
        '<p class="hint">' + esc(C().gradeName(f.grade) + " · " + L(f.subject.name) + " — " + sug.why) + "</p>" +
        '<div class="tday-actions"><a class="btn btn--sm" href="#/konular/' + sug.key + '">' + App.icon("book") + esc(t("today.read")) + "</a>" +
        (f.outcome.content ? '<a class="btn btn--sm btn--primary" href="#/test/' + sug.key + '">' + App.icon("quiz") + esc(t("today.test")) + "</a>" : "") + "</div></section>";
    }

    let errCard = "";
    const es = App.mistakes.errorStats(mistakes);
    if (es.top) {
      const c = App.mistakes.ERR[es.top].color;
      errCard = '<a class="card tday-card tday-err" href="#/yanlislar/tumu" style="--c:' + c + '"><h3>' + App.icon("chart") + esc(t("today.errTitle")) + "</h3>" +
        "<p><b>" + esc(t("mis.err.topTitle", { type: t("mis.err." + es.top), pct: Math.round(es.topShare * 100) })) + "</b> " + esc(t("mis.err.tip." + es.top)) + "</p></a>";
    }

    view.innerHTML =
      '<div class="page today">' +
        '<div class="page-head"><div><h1>' + esc(greeting() + (name ? ", " + name : "")) + "</h1><p>" + esc(dateText) + "</p></div>" +
          '<div class="page-head__actions"><button class="btn btn--ai" type="button" id="todayAsk">' + App.icon("sparkle") + esc(t("today.ask")) + "</button></div></div>" +
        '<div class="tday-grid">' +
          '<div class="tday-main">' + nowCard + flow + "</div>" +
          '<div class="tday-side"><div class="tday-stats">' + review + focusStat + goalStat + "</div>" + sugCard + errCard + "</div>" +
        "</div>" +
      "</div>";

    const onClick = (e) => {
      const f = e.target.closest("[data-focus]");
      if (f) {
        if (f.dataset.focus) App.focus.setSubject(f.dataset.focus);
        location.hash = "#/odak";
        setTimeout(() => App.focus.start(), 250);
        return;
      }
      if (e.target.closest("#todayAsk")) App.modules.assistant.startWith(t("ai.sugg.today"), null);
    };
    view.addEventListener("click", onClick);
    // Her dakika güncelle (ders başladı/bitti)
    const minute = setInterval(() => { if (location.hash === "#/bugun" && !document.querySelector(".modal-backdrop")) App.router.refresh(); }, 60000);
    return () => { clearInterval(minute); view.removeEventListener("click", onClick); };
  }

  App.router.register("bugun", render);
  App.today = { todayBlocks, suggestion };
})();
