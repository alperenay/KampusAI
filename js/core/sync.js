/* =========================================================
   sync.js — cihazlar arası eşitleme

   Aynı "eşitleme kodunu" kullanan cihazlar (telefon, bilgisayar, tablet)
   KampüsAI sunucusundaki ortak bir odada buluşur:
     • her cihaz son eşitlemeden beri değişen kayıtlarını gönderir
       (storage.js her yazmada kayda "_u" damgası ekler, silmeleri "tomb"a yazar)
     • odadaki diğer değişiklikleri alır; aynı kayıtta en yeni değişiklik kazanır
   Ne zaman çalışır: açılışta, uygulamaya geri dönülünce, bir şey değiştikten
   birkaç saniye sonra ve açıkken 2 dakikada bir.

   Ayarlar (localStorage, yedeğe girmez):
     syncCode   : 12 karakterlik kod (yoksa eşitleme kapalı)
     syncCursor : sunucudaki son alınan değişiklik numarası
     syncSince  : bu cihazın en son gönderdiği değişikliklerin zamanı
     syncAt     : son başarılı eşitleme zamanı
   ========================================================= */
(function () {
  const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const TOMB_SEP = "\u0001";
  const MAX_IMAGE = 400 * 1024;           // sohbetteki tek fotoğraf bundan büyükse eşitlenmez
  const MAX_ROW = 1800 * 1024;
  const PERIOD = 2 * 60 * 1000;

  const listeners = [];
  const state = { running: false, error: null, last: App.prefs.get("syncAt", null), pending: false };
  const echo = new Map();                 // sunucudan gelen kayıtlar: geri göndermeyelim

  const base = () => { const u = (App.config && App.config.serverUrl) || ""; return u ? u.replace(/\/+$/, "") : ""; };
  const code = () => String(App.prefs.get("syncCode", "") || "");
  const available = () => !!base();
  const enabled = () => available() && !!code();

  function newCode() {
    const bytes = new Uint8Array(12);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
  }
  const pretty = (c) => String(c || "").replace(/(.{4})(?=.)/g, "$1-");
  const normalize = (c) => String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
  const valid = (c) => /^[A-HJ-NP-Z2-9]{12}$/.test(c);

  function notify() { listeners.forEach((fn) => { try { fn(state); } catch (e) { /* yok say */ } }); }

  /** Sohbet kayıtlarındaki çok büyük fotoğrafları gönderme */
  function prepare(store, rec) {
    if (store !== "chats" || !rec || !Array.isArray(rec.messages)) return rec;
    let size = 0;
    try { size = JSON.stringify(rec).length; } catch (e) { return rec; }
    if (size < MAX_ROW && !rec.messages.some((m) => m.image && m.image.length > MAX_IMAGE)) return rec;
    const copy = JSON.parse(JSON.stringify(rec));
    copy.messages.forEach((m) => { if (m.image && (m.image.length > MAX_IMAGE || size >= MAX_ROW)) m.image = null; });
    return copy;
  }

  async function collect(since) {
    const changes = [];
    for (const s of App.db.SYNC_STORES) {
      const rows = await App.db.getAll(s);
      rows.forEach((r) => {
        const u = r._u || 0;
        if (u < since) return;
        if (echo.get(s + TOMB_SEP + r.id) === u) return;
        changes.push({ s, id: String(r.id), u, d: prepare(s, r) });
      });
    }
    const tombs = await App.db.getAll("tomb");
    tombs.forEach((t) => changes.push({ s: t.store, id: String(t.rid), u: t._u, del: true }));
    return { changes, tombs };
  }

  async function apply(list) {
    let n = 0;
    for (const c of list) {
      if (App.db.SYNC_STORES.indexOf(c.s) < 0) continue;
      const local = await App.db.get(c.s, c.id);
      if (local && (local._u || 0) > c.u) continue;               // yerel kayıt daha yeni
      echo.set(c.s + TOMB_SEP + c.id, c.u);
      if (c.del) { if (local) { await App.db.remove(c.s, c.id, { fromSync: true }); n++; } }
      else if (c.d && typeof c.d === "object") {
        const rec = Object.assign({}, c.d, { id: c.id, _u: c.u });
        if (!local || JSON.stringify(local) !== JSON.stringify(rec)) { await App.db.put(c.s, rec, { fromSync: true }); n++; }
      }
    }
    return n;
  }

  async function post(body) {
    const res = await fetch(base() + "/sync/" + code(), { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    if (!res.ok) {
      let msg = "HTTP " + res.status;
      try { msg = (await res.json()).error || msg; } catch (e) { /* yok say */ }
      const err = new Error(msg); err.status = res.status; throw err;
    }
    return res.json();
  }

  /** Bir eşitleme turu. Dönen: { sent, received } */
  async function run() {
    if (!enabled()) return null;
    if (state.running) { state.pending = true; return null; }
    state.running = true; state.error = null; notify();
    let sent = 0, received = 0;
    try {
      const t0 = Date.now();
      const since = Number(App.prefs.get("syncSince", 0)) || 0;
      const { changes, tombs } = await collect(since);
      let cursor = Number(App.prefs.get("syncCursor", 0)) || 0;
      let res = await post({ cursor, changes });
      sent = changes.length;
      received += await apply(res.changes || []);
      cursor = res.cursor;
      while (res.more) {                                         // ilk eşitlemede çok kayıt olabilir
        res = await post({ cursor, changes: [] });
        received += await apply(res.changes || []);
        cursor = res.cursor;
      }
      if (tombs.length) await App.db.removeMany("tomb", tombs.map((t) => t.id), { fromSync: true });
      App.prefs.set("syncCursor", cursor);
      App.prefs.set("syncSince", t0);
      state.received = received;
      state.last = new Date().toISOString();
      App.prefs.set("syncAt", state.last);
    } catch (e) {
      state.error = e;
    }
    state.running = false;
    notify();
    if (state.pending) { state.pending = false; setTimeout(run, 500); }
    return { sent, received };
  }

  /* Değişiklik olunca birkaç saniye sonra eşitle */
  let timer = null;
  function schedule(ms) {
    if (!enabled()) return;
    clearTimeout(timer);
    timer = setTimeout(run, ms == null ? 4000 : ms);
  }

  /** Bu cihazda eşitlemeyi başlat: kod yoksa yeni oda açılır */
  async function start(c) {
    c = c ? normalize(c) : newCode();
    if (!valid(c)) throw new Error("bad-code");
    App.prefs.set("syncCode", c);
    App.prefs.set("syncCursor", 0);
    App.prefs.set("syncSince", 0);                // ilk turda bu cihazdaki her şey gönderilir
    echo.clear();
    await stampLegacy();
    return run();
  }

  function stop() {
    ["syncCode", "syncCursor", "syncSince", "syncAt"].forEach((k) => App.prefs.set(k, null));
    state.last = null; state.error = null;
    notify();
  }

  /** Eski sürümde kaydedilmiş, damgası olmayan kayıtlara kendi tarihlerinden damga ver */
  async function stampLegacy() {
    for (const s of App.db.SYNC_STORES) {
      const rows = (await App.db.getAll(s)).filter((r) => !r._u);
      if (!rows.length) continue;
      rows.forEach((r) => {
        const t = Date.parse(r.updatedAt || r.at || r.createdAt || r.date || "");
        r._u = isNaN(t) ? 1 : t;
      });
      await App.db.putMany(s, rows, { fromSync: true });
    }
  }

  function init() {
    App.db.on("*", (store, opts) => { if (!opts.fromSync && App.db.SYNC_STORES.indexOf(store) > -1) schedule(); });
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") schedule(300); });
    window.addEventListener("online", () => schedule(300));
    setInterval(() => { if (document.visibilityState === "visible") run(); }, PERIOD);
    if (enabled()) schedule(800);
  }

  App.sync = { available, enabled, code, pretty, normalize, valid, newCode, start, stop, run, schedule, init, state, onChange: (fn) => listeners.push(fn) };
})();
