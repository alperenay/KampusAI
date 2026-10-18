/* =========================================================
   widget.js — Ana ekran widget'ı ve akıllı bildirimler (v1.21)

   App.widget       : Android ana ekran widget'ına (KampusWidget.java) veri yollar:
                      YKS'ye kalan gün, bugünün görevleri, tekrar bekleyen yanlış ve
                      kartlar, seri ve önümüzdeki 14 günün motivasyon notları.
                      Uygulama açılınca, veri değişince ve gün dönünce güncellenir.
   App.smartNotify  : Ayar "smartNotif" = { on, hour, streak, countdown, morning }
     • Tekrar hatırlatması: seçilen saatte "bugün N yanlış ve M kart tekrar bekliyor"
       (sayılar o günün tarihine göre önceden hesaplanır; 3 gün ileriye kurulur)
     • Seri koruma: 21:00'de, o gün henüz çalışılmadıysa
     • Sınav geri sayımı: 100, 75, 50, 30, 14, 7, 3 ve 1 gün kala
     • Günün notu: istenirse her sabah 08:00'de motivasyon notu
     Android'de uygulama kapalıyken de gelir (her açılışta yeniden kurulur);
     bilgisayar ve tarayıcıda uygulama açıkken saati gelince gösterilir.
   ========================================================= */
(function () {
  const { esc, debounce } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const N = () => window.KampusNative || null;
  const hasWidget = () => !!(N() && typeof N().widgetUpdate === "function");
  const cap = window.Capacitor;
  const LN = (App.platform && App.platform.native && cap && cap.Plugins && cap.Plugins.LocalNotifications) || null;

  const dayKey = (d) => { const x = new Date(d || Date.now()); return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0"); };
  const endOf = (d) => { const x = new Date(d); x.setHours(23, 59, 59, 999); return x.getTime(); };
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

  /* ---------------- Ortak sayımlar ---------------- */
  async function counts(day) {
    const t = endOf(day || new Date());
    const mis = (await App.db.getAll("mistakes")).filter((m) => !m.mastered && Date.parse(m.nextAt || 0) <= t).length;
    let cards = 0;
    try {
      const st = await App.cards.stats();
      const due = st.all.filter((r) => r.box > 0 && Date.parse(r.due) <= t).length;
      const daily = (st.newToday || 0) + (st.newLeft || 0);
      cards = due + Math.min(st.fresh, day && dayKey(day) !== dayKey() ? daily : (st.newLeft || 0));
    } catch (e) { /* kart yok */ }
    return { mis, cards };
  }
  async function streakInfo() {
    try { const s = await App.badges.state(); return s.streak || { current: 0, today: false }; } catch (e) { return { current: 0, today: false }; }
  }

  /* =========================================================
     Widget
     ========================================================= */
  async function payload() {
    const g = App.goals.get();
    const c = await counts();
    let tasks = [0, 0];
    try { const d = await App.learnmap.dailyPlan(); tasks = [d.doneCount, d.total]; } catch (e) { /* yok */ }
    const s = await streakInfo();
    const notes = {};
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = addDays(today, i);
      const n = App.motivation.forDay(App.motivation.dayNumber(d));
      notes[dayKey(d)] = App.i18n.lang === "en" ? n.en : n.tr;
    }
    return {
      v: 1, lang: App.i18n.lang, day: dayKey(), exam: g.examDate, examLabel: "YKS",
      tasks, mis: c.mis, cards: c.cards, streak: s.current, notes,
      labels: App.i18n.lang === "en"
        ? { daysLeft: "days to %s", examToday: "Exam day — good luck!", tasks: "Today %1$d/%2$d", mis: "%d mistakes", cards: "%d cards", open: "Open the app to plan today" }
        : { daysLeft: "gün kaldı · %s", examToday: "Sınav günü — başarılar!", tasks: "Bugün %1$d/%2$d görev", mis: "%d yanlış", cards: "%d kart", open: "Bugünün planı için uygulamayı aç" }
    };
  }
  let lastJson = "";
  async function updateWidget() {
    if (!hasWidget()) return null;
    try {
      const p = await payload();
      const json = JSON.stringify(p);
      if (json !== lastJson) { N().widgetUpdate(json); lastJson = json; }
      return p;
    } catch (e) { console.warn("[KampusAI] widget:", e); return null; }
  }
  const widgetCount = () => { try { return hasWidget() && N().widgetCount ? N().widgetCount() : 0; } catch (e) { return 0; } };
  function pin() {
    try { if (N() && N().widgetPin && N().widgetPin()) return true; } catch (e) { /* yok */ }
    App.ui.toast(T("Ana ekranda boş bir yere basılı tut → Widget'lar → KampüsAI", "Long-press your home screen → Widgets → KampüsAI"));
    return false;
  }

  /* =========================================================
     Akıllı bildirimler
     ========================================================= */
  const DEF = { on: false, hour: 19, streak: true, countdown: true, morning: false };
  const cfg = () => Object.assign({}, DEF, App.prefs.get("smartNotif", {}) || {});
  const IDS = { review: 2000, streak: 2010, countdown: 2020, morning: 2040 };
  const MILES = [100, 75, 50, 30, 14, 7, 3, 1];

  function reviewText(c) {
    const parts = [];
    if (c.mis) parts.push(T(c.mis + " yanlış", c.mis + " mistakes"));
    if (c.cards) parts.push(T(c.cards + " hap kartı", c.cards + " flashcards"));
    return { title: T("Tekrar zamanı", "Review time"), body: T("Bugün " + parts.join(" ve ") + " tekrar bekliyor. 15 dakika yeter.", parts.join(" and ") + " are due today. 15 minutes is enough.") };
  }
  function streakText(n) {
    return n > 0
      ? { title: T(n + " günlük serin var", "You're on a " + n + "-day streak"), body: T("Bugün henüz çalışmadın. Seriyi korumak için 10 dakikalık bir tekrar yeter.", "You haven't studied today yet. A 10-minute review keeps the streak.") }
      : { title: T("Bugün 10 dakika?", "10 minutes today?"), body: T("Küçük bir başlangıç yap: bir konu özeti ya da birkaç hap kartı.", "Make a small start: one lesson summary or a few flashcards.") };
  }
  function countdownText(n) {
    const note = App.motivation.forDay(App.motivation.dayNumber(addDays(new Date(), 0)));
    return { title: T("YKS'ye " + n + " gün", n + " days to YKS"), body: n <= 7 ? T("Son düzlük: yeni konu yerine tekrar ve deneme analizi zamanı.", "Final stretch: review and mock analysis over new topics.") : (App.i18n.lang === "en" ? note.en : note.tr) };
  }

  /** Bildirim planı: [{ id, at: Date, title, body, hash, kind }] */
  async function plan(now) {
    now = now || new Date();
    const c = cfg();
    if (!c.on) return [];
    const out = [];
    const s = await streakInfo();
    for (let i = 0; i < 3; i++) {
      const day = addDays(now, i);
      const at = new Date(day); at.setHours(c.hour, 0, 0, 0);
      if (at <= now) continue;
      const k = await counts(day);
      if (k.mis + k.cards > 0) out.push(Object.assign({ id: IDS.review + i, at, hash: k.mis ? "#/yanlislar" : "#/kartlar/calis", kind: "review" }, reviewText(k)));
    }
    if (c.streak) {
      for (let i = 0; i < 2; i++) {
        const at = addDays(now, i); at.setHours(21, 0, 0, 0);
        if (at <= now || (i === 0 && s.today)) continue;
        out.push(Object.assign({ id: IDS.streak + i, at, hash: "#/bugun", kind: "streak" }, streakText(i === 0 ? s.current : s.current + (s.today ? 1 : 0))));
      }
    }
    if (c.countdown) {
      const left = App.goals.daysLeft();
      if (left != null) MILES.forEach((m, j) => {
        const off = left - m;
        if (off < 0 || off > 120) return;
        const at = addDays(now, off); at.setHours(9, 30, 0, 0);
        if (at <= now) return;
        out.push(Object.assign({ id: IDS.countdown + j, at, hash: "#/bugun", kind: "countdown" }, countdownText(m)));
      });
    }
    if (c.morning) {
      for (let i = 0; i < 7; i++) {
        const at = addDays(now, i); at.setHours(8, 0, 0, 0);
        if (at <= now) continue;
        const n = App.motivation.forDay(App.motivation.dayNumber(at));
        out.push({ id: IDS.morning + i, at, title: T("Günün notu", "Today's note"), body: App.i18n.lang === "en" ? n.en : n.tr, hash: "#/", kind: "morning" });
      }
    }
    return out;
  }

  let channelReady = false;
  async function scheduleNative() {
    const all = [];
    Object.values(IDS).forEach((b) => { for (let i = 0; i < 20; i++) all.push({ id: b + i }); });
    try { await LN.cancel({ notifications: all }); } catch (e) { /* yok */ }
    const list = await plan();
    if (!list.length) return 0;
    try { if ((await LN.checkPermissions()).display !== "granted") return 0; } catch (e) { return 0; }
    if (!channelReady) {
      try { await LN.createChannel({ id: "smart", name: T("Akıllı hatırlatmalar", "Smart reminders"), description: T("Tekrar, seri ve sınav geri sayımı", "Review, streak and exam countdown"), importance: 3, visibility: 1 }); } catch (e) { /* eski sürüm */ }
      channelReady = true;
    }
    await LN.schedule({ notifications: list.map((n) => ({ id: n.id, title: n.title, body: n.body, channelId: "smart", extra: { hash: n.hash, kind: "smart" }, schedule: { at: n.at, allowWhileIdle: true } })) });
    return list.length;
  }

  /* Bilgisayar / tarayıcı: uygulama açıkken saati gelenleri göster */
  async function tickWeb() {
    if (LN) return;
    const c = cfg();
    if (!c.on) return;
    const fired = App.prefs.get("smartFired", {}) || {};
    const today = dayKey();
    const now = new Date();
    const fire = async (key, x, hash) => {
      if (fired[key] === today) return;
      fired[key] = today; App.prefs.set("smartFired", fired);
      if (App.notify) await App.notify.show(x.title, x.body, { hash, tag: "smart-" + key }).catch(() => {});
    };
    if (now.getHours() >= c.hour) { const k = await counts(); if (k.mis + k.cards > 0) await fire("review", reviewText(k), "#/yanlislar"); }
    if (c.streak && now.getHours() >= 21) { const s = await streakInfo(); if (!s.today) await fire("streak", streakText(s.current), "#/bugun"); }
    if (c.countdown) { const left = App.goals.daysLeft(); if (MILES.indexOf(left) >= 0 && now.getHours() >= 9) await fire("countdown", countdownText(left), "#/bugun"); }
    if (c.morning && now.getHours() >= 8 && now.getHours() < 12) { const n = App.motivation.today(); await fire("morning", { title: T("Günün notu", "Today's note"), body: n.text }, "#/"); }
  }

  async function reschedule() {
    updateWidget();
    if (LN) { try { return await scheduleNative(); } catch (e) { console.warn("[KampusAI] akıllı bildirim:", e); return 0; } }
    tickWeb();
    return 0;
  }
  const later = debounce(reschedule, 1500);

  /* ---------------- Ayarlar (Hatırlatıcılar penceresinin altına eklenir) ---------------- */
  function settingsHtml() {
    const c = cfg();
    const hours = [7, 8, 12, 15, 17, 18, 19, 20, 21];
    return '<div class="sn-set"><h3>' + App.icon("bell") + esc(T("Akıllı bildirimler", "Smart notifications")) + "</h3>" +
      '<p class="hint">' + esc(T("Tekrar zamanı gelen yanlışların ve kartların, serin ve sınava kalan gün için kısa hatırlatmalar.", "Short reminders for due mistakes and cards, your streak and the exam countdown.")) + "</p>" +
      '<label class="check-row"><input type="checkbox" id="snOn"' + (c.on ? " checked" : "") + "> <span>" + esc(T("Akıllı bildirimleri aç", "Turn on smart notifications")) + "</span></label>" +
      '<div class="sn-sub"' + (c.on ? "" : " hidden") + ">" +
        '<label class="field"><span class="field__label">' + esc(T("Tekrar hatırlatma saati", "Review reminder time")) + '</span><select class="select" id="snHour">' +
          hours.map((h) => '<option value="' + h + '"' + (h === +c.hour ? " selected" : "") + ">" + String(h).padStart(2, "0") + ":00</option>").join("") + "</select></label>" +
        '<label class="check-row"><input type="checkbox" id="snStreak"' + (c.streak ? " checked" : "") + "> <span>" + esc(T("Seri koruma (21:00, o gün çalışmadıysan)", "Streak guard (9 pm, if you haven't studied)")) + "</span></label>" +
        '<label class="check-row"><input type="checkbox" id="snCount"' + (c.countdown ? " checked" : "") + "> <span>" + esc(T("Sınav geri sayımı (100, 50, 30, 7… gün kala)", "Exam countdown (100, 50, 30, 7… days left)")) + "</span></label>" +
        '<label class="check-row"><input type="checkbox" id="snMorning"' + (c.morning ? " checked" : "") + "> <span>" + esc(T("Her sabah günün notu (08:00)", "Today's note every morning (8 am)")) + "</span></label>" +
      "</div>" +
      (hasWidget() ? '<div class="sn-widget"><h3>' + App.icon("widget") + esc(T("Ana ekran widget'ı", "Home screen widget")) + "</h3>" +
        '<p class="hint">' + esc(T("Telefonunun ana ekranında YKS'ye kalan gün, bugünün görevleri ve günün notu görünsün.", "Show days to YKS, today's tasks and today's note on your home screen.")) + " " +
        esc(widgetCount() ? T("Ana ekranında " + widgetCount() + " widget var.", widgetCount() + " widget(s) on your home screen.") : "") + "</p>" +
        '<button class="btn btn--sm" type="button" id="snPin">' + App.icon("plus") + esc(T("Ana ekrana ekle", "Add to home screen")) + "</button></div>" : "") +
      "</div>";
  }
  function bindSettings(el) {
    const save = async (patch) => {
      App.prefs.set("smartNotif", Object.assign(cfg(), patch));
      if (patch.on && App.notify) {
        const p = await App.notify.permission(true);
        if (p !== "granted") { App.prefs.set("smartNotif", Object.assign(cfg(), { on: false })); el.querySelector("#snOn").checked = false; App.ui.toast(T("Bildirim izni verilmedi", "Notification permission denied"), "error"); }
      }
      const sub = el.querySelector(".sn-sub"); if (sub) sub.hidden = !cfg().on;
      const n = await reschedule();
      if (patch.on && cfg().on) App.ui.toast(LN ? T("Akıllı bildirimler açık · " + n + " hatırlatma kuruldu", "Smart notifications on · " + n + " scheduled") : T("Akıllı bildirimler açık", "Smart notifications on"));
    };
    const on = el.querySelector("#snOn"); if (!on) return;
    on.addEventListener("change", (e) => save({ on: e.target.checked }));
    el.querySelector("#snHour").addEventListener("change", (e) => save({ hour: +e.target.value }));
    el.querySelector("#snStreak").addEventListener("change", (e) => save({ streak: e.target.checked }));
    el.querySelector("#snCount").addEventListener("change", (e) => save({ countdown: e.target.checked }));
    el.querySelector("#snMorning").addEventListener("change", (e) => save({ morning: e.target.checked }));
    const pb = el.querySelector("#snPin"); if (pb) pb.addEventListener("click", () => { pin(); });
  }

  /* ---------------- Başlat ---------------- */
  let dayNow = dayKey();
  function init() {
    // Widget'tan / bildirimden açıldıysa ilgili sayfa
    window.__nativeRoute = (r) => { if (/^[a-z0-9/-]{1,40}$/.test(r || "")) location.hash = "#/" + r; };
    try { const r = N() && N().takeRoute ? N().takeRoute() : ""; if (r) setTimeout(() => window.__nativeRoute(r), 300); } catch (e) { /* yok */ }
    if (LN) {
      try {
        LN.addListener("localNotificationActionPerformed", (a) => {
          const ex = (a && a.notification && a.notification.extra) || {};
          if (ex.kind === "smart" && ex.hash) location.hash = ex.hash;
        });
      } catch (e) { /* yok */ }
    }
    setTimeout(reschedule, 2500);
    ["mistakes", "cards", "progress", "meta", "exams", "quizzes", "sessions"].forEach((s) => { try { App.db.on(s, later); } catch (e) { /* yok */ } });
    if (App.i18n.onChange) App.i18n.onChange(later);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) later(); });
    setInterval(() => { const d = dayKey(); if (d !== dayNow) { dayNow = d; later(); } else tickWeb(); }, 60000);
  }

  App.widget = { payload, update: updateWidget, supported: hasWidget, count: widgetCount, pin };
  App.smartNotify = { init, plan, reschedule, config: cfg, settingsHtml, bindSettings, counts, tickWeb };
})();
