/* =========================================================
   reminders.js — bildirimler ve ders hatırlatıcıları

   App.notify   : platformdan bağımsız bildirim gösterme / zamanlama
     • Android uygulaması: Capacitor LocalNotifications — uygulama kapalıyken de gelir
       (telefon yeniden başlasa bile; eklenti alarmları geri kurar)
     • Windows uygulaması, tarayıcı, ana ekran uygulaması: tarayıcı bildirimi —
       uygulama açıkken (küçültülmüş olsa da) gelir
   App.reminders: öğrencinin kendi programındaki (Programım) her ders bloğu için
     haftalık tekrarlayan hatırlatıcı. Ayar: prefs "remind" = { on, lead }
     (lead: kaç dakika önce haber verilsin). Bildirime dokununca Odak Sayacı o
     dersle açılır; Android'de "Odak sayacını başlat" düğmesi sayacı hemen başlatır.
   ========================================================= */
(function () {
  const { esc, toMinutes, debounce } = App.utils;
  const t = App.t, L = App.L;
  const cap = window.Capacitor;
  const LN = (App.platform.native && cap && cap.Plugins && cap.Plugins.LocalNotifications) || null;

  const STUDY_BASE = 1000;          // ders hatırlatıcılarının bildirim numaraları: 1000…1999
  const STUDY_MAX = 300;
  const FOCUS_ID = 900;              // odak sayacı bitişi
  let msgId = 910;                   // anlık bildirimler (910…989 arasında döner)
  const DEF = { on: false, lead: 5 };
  const LEADS = [0, 5, 10, 15];
  const ICON = "assets/icons/icon-192.png";

  const cfg = () => Object.assign({}, DEF, App.prefs.get("remind", {}) || {});
  const listeners = [];
  const emit = () => listeners.forEach((fn) => { try { fn(cfg()); } catch (e) { /* yok say */ } });

  /* =========================================================
     Bildirim katmanı
     ========================================================= */
  let nativeReady = null;
  function setupNative() {
    if (!LN) return Promise.resolve();
    if (nativeReady) return nativeReady;
    nativeReady = (async () => {
      try {
        await LN.createChannel({ id: "study", name: t("rem.channelStudy"), description: t("rem.channelStudyDesc"), importance: 4, visibility: 1, vibration: true });
        await LN.createChannel({ id: "focus", name: t("rem.channelFocus"), importance: 4, visibility: 1, vibration: true });
        await LN.registerActionTypes({ types: [{ id: "STUDY", actions: [{ id: "start", title: t("rem.startFocus") }] }] });
      } catch (e) { console.warn("[KampusAI] bildirim kanalı:", e); }
      LN.addListener("localNotificationActionPerformed", (a) => {
        const n = (a && a.notification) || {};
        open(Object.assign({}, n.extra || {}, { start: a.actionId === "start" }));
      });
    })();
    return nativeReady;
  }

  /** İzin durumu: "granted" | "denied" | "default" | "unsupported" (ask: gerekirse izin iste) */
  async function permission(ask) {
    if (LN) {
      try {
        let p = await LN.checkPermissions();
        if (p.display !== "granted" && ask) p = await LN.requestPermissions();
        return p.display === "granted" ? "granted" : p.display === "denied" ? "denied" : "default";
      } catch (e) { return "unsupported"; }
    }
    if (!("Notification" in window)) return "unsupported";
    if (Notification.permission === "default" && ask) {
      try { await Notification.requestPermission(); } catch (e) { /* eski tarayıcı */ }
    }
    return Notification.permission;
  }

  /** Bildirime dokunulunca: Odak Sayacı'nı o dersle aç (istenirse başlat) */
  function open(data) {
    data = data || {};
    try { window.focus(); } catch (e) { /* yok */ }
    if (data.kind === "study") {
      if (data.subject && App.focus.setSubject) App.focus.setSubject(data.subject);
      location.hash = "#/odak";
      if (data.start) setTimeout(() => App.focus.start(), 300);
    } else if (data.hash) {
      location.hash = data.hash;
    }
  }

  /** Hemen bir bildirim göster */
  async function show(title, body, extra) {
    extra = extra || {};
    if (LN) {
      await setupNative();
      msgId = msgId >= 989 ? 910 : msgId + 1;
      return LN.schedule({ notifications: [{ id: msgId, title, body, channelId: extra.channel || "study", extra, schedule: { at: new Date(Date.now() + 800), allowWhileIdle: true } }] });
    }
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    const opts = { body, icon: ICON, badge: ICON, tag: extra.tag || undefined, data: extra };
    try {
      const reg = navigator.serviceWorker && (await navigator.serviceWorker.getRegistration());
      if (reg && reg.active) { await reg.showNotification(title, opts); return; }
    } catch (e) { /* tarayıcı bildirimi ile dene */ }
    try {
      const n = new Notification(title, opts);
      n.onclick = () => { n.close(); open(extra); };
    } catch (e) { /* bu tarayıcıda yok */ }
  }

  /** Belli bir zamanda bildirim (yalnızca Android; diğerlerinde çağıran kendisi zamanlar) */
  async function at(id, when, title, body, extra) {
    if (!LN) return false;
    try {
      await setupNative();
      await LN.cancel({ notifications: [{ id }] }).catch(() => {});
      await LN.schedule({ notifications: [{ id, title, body, channelId: (extra && extra.channel) || "focus", extra: extra || {}, schedule: { at: new Date(when), allowWhileIdle: true } }] });
      return true;
    } catch (e) { console.warn("[KampusAI] bildirim zamanlanamadı:", e); return false; }
  }
  async function cancel(id) {
    if (!LN) return;
    try { await LN.cancel({ notifications: [{ id }] }); } catch (e) { /* yok */ }
  }

  App.notify = { native: !!LN, permission, show, at, cancel, open, FOCUS_ID };

  /* =========================================================
     Ders hatırlatıcıları
     ========================================================= */
  async function studyBlocks() {
    const plan = await App.db.get("schedules", "user");
    return ((plan && plan.blocks) || [])
      .filter((b) => b && b.kind !== "mola" && /^\d\d:\d\d$/.test(b.start || "") && Number(b.day) >= 0 && Number(b.day) <= 6)
      .sort((a, b) => a.day - b.day || toMinutes(a.start) - toMinutes(b.start));
  }

  /** Bloğun hatırlatma anı: { day (0=Pzt), min (gün içi dakika) } — "lead" dakika önce */
  function triggerOf(b, lead) {
    let day = Number(b.day), min = toMinutes(b.start) - (lead || 0);
    if (min < 0) { min += 1440; day = (day + 6) % 7; }
    return { day, min };
  }

  function texts(b, lead) {
    const subject = L(b.subject) || t("rem.study");
    const title = lead > 0 ? t("rem.titleSoon", { n: lead, subject }) : t("rem.titleNow", { subject });
    const kind = t("kind." + (b.kind || "ders"));
    const note = L(b.note);
    const body = b.start + "–" + b.end + " · " + kind + (note ? " · " + note : "");
    return { title, body, subject };
  }

  /* --- Android: haftalık tekrarlayan alarmlar --- */
  async function scheduleNative(blocks, c) {
    await setupNative();
    const prev = Number(App.prefs.get("remindCount", 0)) || 0;
    const ids = new Set();
    for (let i = 0; i < Math.max(prev, 0); i++) ids.add(STUDY_BASE + i);
    try {
      const pend = await LN.getPending();
      (pend.notifications || []).forEach((n) => { const id = Number(n.id); if (id >= STUDY_BASE && id < STUDY_BASE + 1000) ids.add(id); });
    } catch (e) { /* yok */ }
    if (ids.size) await LN.cancel({ notifications: Array.from(ids).map((id) => ({ id })) }).catch(() => {});
    App.prefs.set("remindCount", 0);
    if (!c.on || !blocks.length) return 0;
    if ((await permission(false)) !== "granted") return 0;
    const list = blocks.slice(0, STUDY_MAX).map((b, i) => {
      const tr = triggerOf(b, c.lead);
      const x = texts(b, c.lead);
      return {
        id: STUDY_BASE + i, title: x.title, body: x.body, channelId: "study", actionTypeId: "STUDY",
        extra: { kind: "study", subject: x.subject, block: b.id || "" },
        // Capacitor: 1 = Pazar … 7 = Cumartesi; programda 0 = Pazartesi
        schedule: { on: { weekday: ((tr.day + 1) % 7) + 1, hour: Math.floor(tr.min / 60), minute: tr.min % 60 }, allowWhileIdle: true }
      };
    });
    await LN.schedule({ notifications: list });
    App.prefs.set("remindCount", list.length);
    return list.length;
  }

  /* --- Masaüstü / tarayıcı: uygulama açıkken saati gelen blokları yokla --- */
  let blocksCache = [], lastTick = Date.now(), ticker = null;
  const fired = new Set();
  function mondayOf(ms) {
    const d = new Date(ms); d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return d;
  }
  function tickWeb() {
    const c = cfg();
    const now = Date.now(), from = lastTick;
    lastTick = now;
    if (!c.on || LN || !blocksCache.length) return;
    if (now - from > 15 * 60000) return;            // bilgisayar uykudaydı: eski hatırlatıcıları yağdırma
    const mon = mondayOf(now);
    blocksCache.forEach((b) => {
      const tr = triggerOf(b, c.lead);
      [-7, 0].forEach((wk) => {
        const d = new Date(mon); d.setDate(d.getDate() + wk + tr.day); d.setHours(0, tr.min, 0, 0);
        const T = d.getTime();
        const key = (b.id || b.subject + b.start) + "@" + T;
        if (T > from && T <= now && !fired.has(key)) {
          fired.add(key);
          const x = texts(b, c.lead);
          show(x.title, x.body, { kind: "study", subject: x.subject, tag: "study-" + key });
          App.ui.toast(x.title);
        }
      });
    });
  }

  async function reschedule() {
    const c = cfg();
    let n = 0;
    try {
      const blocks = await studyBlocks();
      blocksCache = blocks;
      if (LN) n = await scheduleNative(blocks, c);
      else n = c.on ? blocks.length : 0;
    } catch (e) { console.warn("[KampusAI] hatırlatıcılar kurulamadı:", e); }
    state.count = n;
    emit();
    return n;
  }
  const state = { count: 0 };

  /** Hatırlatıcıları aç (izin ister) → { ok, permission, count } */
  async function enable(lead) {
    const p = await permission(true);
    if (p !== "granted") {
      App.prefs.set("remind", Object.assign(cfg(), { on: false }));
      emit();
      return { ok: false, permission: p, count: 0 };
    }
    App.prefs.set("remind", Object.assign(cfg(), { on: true }, lead != null ? { lead } : {}));
    const count = await reschedule();
    show(t("rem.enabledTitle"), count ? t("rem.enabledBody", { n: count }) : t("rem.enabledEmpty"), { kind: "info" }).catch(() => {});
    return { ok: true, permission: p, count };
  }
  async function disable() {
    App.prefs.set("remind", Object.assign(cfg(), { on: false }));
    return reschedule();
  }
  async function setLead(lead) {
    App.prefs.set("remind", Object.assign(cfg(), { lead: Number(lead) || 0 }));
    return reschedule();
  }

  function platformNote() {
    if (LN) return t("rem.noteAndroid");
    if (App.platform.desktop) return t("rem.noteDesktop");
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) return t("rem.noteIos");
    return t("rem.noteWeb");
  }

  /** Ayar penceresi */
  async function openSettings() {
    const c = cfg();
    const blocks = await studyBlocks();
    const perm = await permission(false);
    const m = App.ui.modal({
      title: t("rem.title"),
      body:
        '<p class="hint">' + esc(t("rem.intro")) + "</p>" +
        '<label class="check-row"><input type="checkbox" id="remOn"' + (c.on && perm === "granted" ? " checked" : "") + "> <span>" + esc(t("rem.toggle")) + "</span></label>" +
        '<label class="field"><span class="field__label">' + esc(t("rem.lead")) + '</span><select class="select" id="remLead">' +
          LEADS.map((n) => '<option value="' + n + '"' + (n === Number(c.lead) ? " selected" : "") + ">" + esc(n ? t("rem.leadN", { n }) : t("rem.leadNow")) + "</option>").join("") + "</select></label>" +
        '<p class="hint" id="remStatus"></p>' +
        '<p class="hint">' + esc(platformNote()) + "</p>",
      actions: '<button class="btn btn--ghost" type="button" id="remTest">' + App.icon("bell") + esc(t("rem.test")) + '</button><button class="btn btn--primary" type="button" data-close>' + esc(t("close")) + "</button>"
    });
    const el = m.el;
    const status = el.querySelector("#remStatus");
    const paint = async () => {
      const p = await permission(false);
      const cc = cfg();
      const n = (await studyBlocks()).length;
      let s;
      if (p === "unsupported") s = t("rem.unsupported");
      else if (p === "denied") s = t("rem.denied");
      else if (!cc.on) s = t("rem.off");
      else if (!n) s = t("rem.noBlocks");
      else s = t("rem.active", { n });
      status.innerHTML = esc(s) + (cc.on && !n ? ' <a href="#/program/benim" data-close-link>' + esc(t("rem.goPlan")) + "</a>" : "");
      const link = status.querySelector("[data-close-link]");
      if (link) link.addEventListener("click", m.close);
    };
    paint();
    el.querySelector("#remOn").addEventListener("change", async (e) => {
      const box = e.target;
      box.disabled = true;
      if (box.checked) {
        const r = await enable(Number(el.querySelector("#remLead").value));
        box.checked = r.ok;
        if (!r.ok) App.ui.toast(r.permission === "unsupported" ? t("rem.unsupported") : t("rem.denied"), "error");
        else App.ui.toast(r.count ? t("rem.toastOn", { n: r.count }) : t("rem.enabledEmpty"));
      } else {
        await disable();
        App.ui.toast(t("rem.toastOff"));
      }
      box.disabled = false;
      paint();
    });
    el.querySelector("#remLead").addEventListener("change", async (e) => { await setLead(e.target.value); paint(); });
    el.querySelector("#remTest").addEventListener("click", async () => {
      const p = await permission(true);
      if (p !== "granted") { App.ui.toast(p === "unsupported" ? t("rem.unsupported") : t("rem.denied"), "error"); paint(); return; }
      const b = blocks[0] || { subject: t("rem.sampleSubject"), start: "17:00", end: "17:50", kind: "ders" };
      const x = texts(b, Number(cfg().lead));
      await show(x.title, x.body, { kind: "study", subject: x.subject });
      App.ui.toast(t("rem.testSent"));
      paint();
    });
  }

  function init() {
    setupNative();
    reschedule();
    App.db.on("schedules", debounce(reschedule, 800));
    App.i18n.onChange(debounce(reschedule, 300));
    clearInterval(ticker);
    ticker = setInterval(tickWeb, 20000);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) tickWeb(); });
    // Ana ekran uygulamasında bildirime dokununca servis çalışanı haber verir
    if (navigator.serviceWorker) navigator.serviceWorker.addEventListener("message", (e) => {
      if (e.data && e.data.type === "notification") open(e.data.data);
    });
  }

  App.reminders = { init, enable, disable, setLead, reschedule, openSettings, config: cfg, state, onChange: (fn) => listeners.push(fn), triggerOf, tickWeb };
})();
