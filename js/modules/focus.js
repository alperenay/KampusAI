/* =========================================================
   focus.js — Odak (Pomodoro) sayacı   (#/odak)

   Odak (varsayılan 25 dk) → kısa mola (5 dk) → … her 4 odakta bir uzun mola (15 dk).
   Biten her odak oturumu IndexedDB "sessions" deposuna kaydedilir:
     { id, start, end, minutes, subject }
   Sayaç sayfadan çıkınca da çalışır; üst çubukta küçük bir gösterge vardır.
   Durum localStorage'da tutulur (focusState): uygulama kapanıp açılsa da süre kaybolmaz.
   ========================================================= */
(function () {
  const { esc, uid } = App.utils;
  const t = App.t, L = App.L;
  const DEF = { focus: 25, short: 5, long: 15, every: 4 };

  const cfg = () => Object.assign({}, DEF, App.prefs.get("focusCfg", {}) || {});
  const blank = () => ({ phase: "focus", running: false, endsAt: 0, remainingMs: cfg().focus * 60000, subject: App.prefs.get("focusSubject", ""), count: 0, startedAt: null });
  let st = Object.assign(blank(), App.prefs.get("focusState", {}) || {});
  let timer = null;
  const listeners = [];

  const phaseMs = (phase) => cfg()[phase === "focus" ? "focus" : phase === "short" ? "short" : "long"] * 60000;
  const save = () => App.prefs.set("focusState", st);
  const remaining = () => (st.running ? Math.max(0, st.endsAt - Date.now()) : st.remainingMs);
  const fmt = (ms) => { const s = Math.ceil(ms / 1000); return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };
  const emit = () => listeners.forEach((fn) => { try { fn(st); } catch (e) { /* yok say */ } });

  function startTicking() {
    clearInterval(timer);
    timer = setInterval(tick, 500);
  }

  function tick() {
    if (st.running && Date.now() >= st.endsAt) complete();
    emit();
  }

  function start() {
    if (st.running) return;
    if (st.phase === "focus" && !st.startedAt) st.startedAt = new Date().toISOString();
    st.running = true;
    st.endsAt = Date.now() + (st.remainingMs || phaseMs(st.phase));
    save(); startTicking(); emit();
    askNotify();
  }

  function pause() {
    if (!st.running) return;
    st.remainingMs = remaining();
    st.running = false;
    save(); clearInterval(timer); emit();
  }

  function reset() {
    st.running = false;
    st.remainingMs = phaseMs(st.phase);
    st.startedAt = null;
    save(); clearInterval(timer); emit();
  }

  function setPhase(phase) {
    st.phase = phase;
    st.running = false;
    st.remainingMs = phaseMs(phase);
    st.startedAt = null;
    save(); clearInterval(timer); emit();
  }

  function setSubject(s) { st.subject = s; App.prefs.set("focusSubject", s); save(); emit(); }

  async function complete() {
    const was = st.phase;
    st.running = false;
    clearInterval(timer);
    if (was === "focus") {
      const c = cfg();
      await App.db.put("sessions", { id: uid("ses"), start: st.startedAt || new Date(Date.now() - c.focus * 60000).toISOString(), end: new Date().toISOString(), minutes: c.focus, subject: st.subject || "" });
      st.count = (st.count || 0) + 1;
      st.phase = st.count % c.every === 0 ? "long" : "short";
    } else {
      st.phase = "focus";
    }
    st.startedAt = null;
    st.remainingMs = phaseMs(st.phase);
    save();
    alarm(was);
    // Mola kendiliğinden başlar; odak yeniden kullanıcıya bırakılır
    if (st.phase !== "focus") start(); else emit();
  }

  /* ---------------- Uyarılar ---------------- */
  function beep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.35, 0.7].forEach((d) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.frequency.value = 880; o.type = "sine";
        g.gain.setValueAtTime(0.0001, ctx.currentTime + d);
        g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + d + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + d + 0.25);
        o.connect(g).connect(ctx.destination);
        o.start(ctx.currentTime + d); o.stop(ctx.currentTime + d + 0.3);
      });
      setTimeout(() => ctx.close(), 1500);
    } catch (e) { /* ses yok */ }
  }

  function alarm(finishedPhase) {
    beep();
    if (navigator.vibrate) { try { navigator.vibrate([200, 100, 200]); } catch (e) { /* yok */ } }
    const title = finishedPhase === "focus" ? t("focus.doneFocus") : t("focus.doneBreak");
    const body = finishedPhase === "focus" ? t("focus.doneFocusBody") : t("focus.doneBreakBody");
    App.ui.toast(title);
    try { if ("Notification" in window && Notification.permission === "granted") new Notification(title, { body, icon: "assets/icons/icon-192.png" }); } catch (e) { /* yok */ }
  }

  function askNotify() {
    try { if ("Notification" in window && Notification.permission === "default") Notification.requestPermission().catch(() => {}); } catch (e) { /* yok */ }
  }

  /* ---------------- İstatistik ---------------- */
  const dayKey = (d) => { const x = new Date(d); return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0"); };

  async function stats() {
    const all = await App.db.getAll("sessions");
    const byDay = {};
    all.forEach((s) => { const k = dayKey(s.end || s.start); byDay[k] = (byDay[k] || 0) + (Number(s.minutes) || 0); });
    const today = dayKey(Date.now());
    // Seri: bugünden (bugün yoksa dünden) geriye kesintisiz çalışılan gün sayısı
    let streak = 0;
    const d = new Date();
    if (!byDay[today]) d.setDate(d.getDate() - 1);
    while (byDay[dayKey(d)]) { streak++; d.setDate(d.getDate() - 1); }
    // Bu hafta (Pazartesi başlangıç)
    const monday = new Date(); monday.setHours(0, 0, 0, 0); monday.setDate(monday.getDate() - App.utils.weekdayIndex(monday));
    const week = Array.from({ length: 7 }, (_, i) => { const x = new Date(monday); x.setDate(monday.getDate() + i); return { key: dayKey(x), minutes: byDay[dayKey(x)] || 0 }; });
    const weekSessions = all.filter((s) => Date.parse(s.end || s.start) >= monday.getTime());
    const bySubject = {};
    weekSessions.forEach((s) => { const k = s.subject || t("focus.noSubject"); bySubject[k] = (bySubject[k] || 0) + (Number(s.minutes) || 0); });
    return {
      today: byDay[today] || 0,
      todaySessions: all.filter((s) => dayKey(s.end || s.start) === today).length,
      streak, week, weekTotal: week.reduce((a, x) => a + x.minutes, 0),
      bySubject: Object.entries(bySubject).sort((a, b) => b[1] - a[1]),
      recent: all.sort((a, b) => String(b.end).localeCompare(String(a.end))).slice(0, 8),
      totalMinutes: all.reduce((a, s) => a + (Number(s.minutes) || 0), 0)
    };
  }

  /** Ders seçenekleri: deneme dersleri + konu anlatımındaki dersler */
  function subjectOptions() {
    const names = new Set();
    Object.values(App.data.exams.types).forEach((ty) => ty.subjects.forEach((s) => names.add(L(s.name))));
    App.data.curriculum.grades.forEach((g) => g.subjects.forEach((s) => names.add(L(s.name))));
    return Array.from(names);
  }

  /* ---------------- Sayfa ---------------- */
  async function render(view) {
    App.setTitle(t("focus.title"));
    const s = await stats();
    const c = cfg();
    const R = 108, CIRC = 2 * Math.PI * R;
    const maxWeek = Math.max(60, ...s.week.map((x) => x.minutes));
    const days = t("days").split(",");
    const durText = App.utils.durationText;

    view.innerHTML =
      '<div class="page page--narrow">' +
        '<div class="page-head"><div><h1>' + esc(t("focus.title")) + "</h1><p>" + esc(t("focus.intro")) + "</p></div></div>" +
        '<section class="card focus">' +
          '<div class="tabs focus__phases" role="tablist">' +
            ["focus", "short", "long"].map((p) => '<button class="tab" type="button" data-phase="' + p + '">' + esc(t("focus.phase." + p)) + "</button>").join("") + "</div>" +
          '<div class="focus__ring"><svg viewBox="0 0 240 240" aria-hidden="true"><circle cx="120" cy="120" r="' + R + '" class="focus__track"/>' +
            '<circle cx="120" cy="120" r="' + R + '" class="focus__bar" id="fBar" stroke-dasharray="' + CIRC.toFixed(1) + '" stroke-dashoffset="0"/></svg>' +
            '<div class="focus__time"><span id="fTime">00:00</span><small id="fPhase"></small></div></div>' +
          '<label class="field focus__subject"><span class="field__label">' + esc(t("focus.subject")) + '</span><select class="select" id="fSubject"><option value="">' + esc(t("focus.noSubject")) + "</option>" +
            subjectOptions().map((n) => '<option value="' + esc(n) + '">' + esc(n) + "</option>").join("") + "</select></label>" +
          '<div class="focus__controls"><button class="btn" type="button" id="fReset" title="' + esc(t("focus.reset")) + '">' + App.icon("refresh") + "</button>" +
            '<button class="btn btn--primary focus__main" type="button" id="fMain"></button>' +
            '<button class="btn" type="button" id="fSkip" title="' + esc(t("focus.skip")) + '">' + App.icon("chevron") + "</button></div>" +
          '<p class="hint focus__cycle" id="fCycle"></p>' +
          '<details class="focus__cfg"><summary>' + esc(t("focus.settings")) + '</summary><div class="form-row">' +
            [["focus", 10, 120], ["short", 2, 30], ["long", 5, 60], ["every", 2, 8]].map(([k, mn, mx]) =>
              '<label class="field"><span class="field__label">' + esc(t("focus.cfg." + k)) + '</span><input class="input" type="number" min="' + mn + '" max="' + mx + '" data-cfg="' + k + '" value="' + c[k] + '"></label>').join("") +
          "</div></details>" +
        "</section>" +

        '<div class="grid grid--4" style="margin-top:14px">' +
          stat(t("focus.today"), durText(s.today) || "0 " + t("focus.min"), t("focus.sessions", { n: s.todaySessions })) +
          stat(t("focus.streak"), s.streak + " " + t("focus.days"), s.streak ? t("focus.streakOn") : t("focus.streakStart")) +
          stat(t("focus.week"), durText(s.weekTotal) || "0 " + t("focus.min"), "") +
          stat(t("focus.total"), durText(s.totalMinutes) || "0 " + t("focus.min"), "") +
        "</div>" +

        '<section class="card" style="margin-top:14px"><div class="card__title">' + esc(t("focus.weekChart")) + "</div>" +
          '<div class="wk-bars">' + s.week.map((d, i) =>
            '<div class="wk-bar" title="' + esc(days[i] + ": " + (durText(d.minutes) || "0")) + '"><span class="wk-bar__val">' + (d.minutes ? Math.round(d.minutes) : "") + '</span><span class="wk-bar__fill' + (d.key === dayKey(Date.now()) ? " is-today" : "") + '" style="height:' + Math.round((d.minutes / maxWeek) * 100) + '%"></span><span class="wk-bar__day">' + esc(days[i].slice(0, 3)) + "</span></div>").join("") +
          "</div>" +
          (s.bySubject.length ? '<div class="bars" style="margin-top:16px">' + s.bySubject.map(([name, m]) =>
            '<div class="bar-row"><span class="bar-row__name">' + esc(name) + '</span><span class="bar-row__track"><span class="bar-row__fill" style="width:' + Math.round((m / s.bySubject[0][1]) * 100) + '%"></span></span><span class="bar-row__val">' + esc(durText(m)) + "</span></div>").join("") + "</div>" : "") +
        "</section>" +
      "</div>";

    function stat(label, value, sub) {
      return '<div class="stat"><div class="stat__label">' + esc(label) + '</div><div class="stat__value">' + esc(String(value)) + '</div><div class="stat__sub">' + esc(sub || "") + "</div></div>";
    }

    const $ = (q) => view.querySelector(q);
    const sel = $("#fSubject");
    if (st.subject && !Array.from(sel.options).some((o) => o.value === st.subject)) sel.insertAdjacentHTML("beforeend", '<option value="' + esc(st.subject) + '">' + esc(st.subject) + "</option>");
    sel.value = st.subject || "";
    sel.addEventListener("change", () => setSubject(sel.value));

    function paint() {
      if (!document.body.contains(view) || !$("#fTime")) return;
      const rem = remaining(), total = phaseMs(st.phase);
      $("#fTime").textContent = fmt(rem);
      $("#fPhase").textContent = t("focus.phase." + st.phase) + (st.running ? "" : " · " + t("focus.paused"));
      $("#fBar").style.strokeDashoffset = (CIRC * (1 - rem / total)).toFixed(1);
      $("#fBar").classList.toggle("is-break", st.phase !== "focus");
      view.querySelectorAll("[data-phase]").forEach((b) => b.classList.toggle("is-active", b.dataset.phase === st.phase));
      $("#fMain").innerHTML = App.icon(st.running ? "pause" : "play") + esc(st.running ? t("focus.pause") : rem < total ? t("focus.resume") : t("focus.start"));
      $("#fCycle").textContent = t("focus.cycle", { n: (st.count || 0) % cfg().every, every: cfg().every });
      document.title = (st.running ? fmt(rem) + " · " : "") + t("focus.title") + " · " + t("appName");
    }
    paint();
    const unsub = onChange(paint);

    view.addEventListener("click", (e) => {
      const ph = e.target.closest("[data-phase]");
      if (ph) {
        if (!st.running) { setPhase(ph.dataset.phase); return; }
        App.ui.confirm(t("focus.switchConfirm"), t("ok")).then((ok) => { if (ok) setPhase(ph.dataset.phase); });
      }
    });
    $("#fMain").addEventListener("click", () => (st.running ? pause() : start()));
    $("#fReset").addEventListener("click", reset);
    $("#fSkip").addEventListener("click", () => {
      if (st.phase === "focus") setPhase(((st.count || 0) + 1) % cfg().every === 0 ? "long" : "short");
      else setPhase("focus");
    });
    view.querySelectorAll("[data-cfg]").forEach((inp) => inp.addEventListener("change", () => {
      const k = inp.dataset.cfg;
      const v = Math.max(Number(inp.min), Math.min(Number(inp.max), Math.round(Number(inp.value) || DEF[k])));
      inp.value = v;
      App.prefs.set("focusCfg", Object.assign(cfg(), { [k]: v }));
      if (!st.running && k !== "every") { st.remainingMs = phaseMs(st.phase); save(); }
      paint();
    }));
    // Başka cihazdan oturum gelirse ya da oturum bitince istatistikleri tazele
    const offSessions = App.db.on("sessions", App.utils.debounce(() => { if (location.hash.indexOf("#/odak") === 0) App.router.refresh(); }, 300));
    return () => { unsub(); offSessions(); document.title = t("appName"); };
  }

  function onChange(fn) {
    listeners.push(fn);
    return () => { const i = listeners.indexOf(fn); if (i > -1) listeners.splice(i, 1); };
  }

  /* ---------------- Üst çubuk göstergesi ---------------- */
  function chip() {
    let el = document.getElementById("focusChip");
    if (!el) {
      const host = document.querySelector(".topbar__actions");
      if (!host) return;
      el = document.createElement("a");
      el.id = "focusChip"; el.className = "pill-btn focus-chip"; el.href = "#/odak";
      host.insertBefore(el, host.firstChild);
    }
    const active = st.running || st.remainingMs < phaseMs(st.phase);
    el.hidden = !active || location.hash.indexOf("#/odak") === 0;
    if (!el.hidden) el.innerHTML = App.icon(st.phase === "focus" ? "timer" : "pause") + "<span>" + fmt(remaining()) + (st.subject && st.phase === "focus" ? " · " + esc(st.subject) : st.phase !== "focus" ? " · " + esc(t("focus.phase." + st.phase)) : "") + "</span>";
    el.classList.toggle("is-break", st.phase !== "focus");
    el.classList.toggle("is-paused", !st.running);
  }

  function init() {
    onChange(chip);
    window.addEventListener("hashchange", chip);
    if (st.running) {
      if (Date.now() >= st.endsAt) complete(); else startTicking();
    }
    chip();
  }

  App.router.register("odak", render);
  App.focus = { init, start, pause, reset, stats, state: () => st, onChange };
})();
