/* =========================================================
   storage.js — tüm veri okuma/yazma işlemleri buradan geçer.

   • Büyük/kalıcı veriler  → IndexedDB  (App.db)
       exams      : girilen denemeler
       schedules  : öğrencinin kendi ders programı
       progress   : tamamlanan kazanımlar
       notes      : kazanım başına kişisel notlar
       chats      : yapay zeka sohbet geçmişi
       vectors    : hafıza vektörleri (yedeğe girmez, yeniden üretilebilir)
       mistakes   : yanlış defteri
       quizzes    : konu sonu test sonuçları
       sessions   : odak (Pomodoro) oturumları
       meta       : hedefler, YKS tarihi gibi tekil kayıtlar
       tomb       : eşitleme için silinen kayıtların izi

   Eşitlenen depolarda her yazma kayda "_u" (son değişiklik, ms) damgası
   ekler; silmeler "tomb" deposuna yazılır. Eşitleme (sync.js) bunları
   sunucuya gönderir; en son değişiklik kazanır.
   • Küçük ayarlar         → localStorage (App.prefs)

   IndexedDB açılamazsa (bazı tarayıcılar file:// modunda izin
   vermez) aynı API localStorage üzerinden çalışmaya devam eder.
   Modüller hangi motorun kullanıldığını bilmek zorunda değildir.
   ========================================================= */
(function () {
  const DB_NAME = "ders-asistani";
  const DB_VERSION = 4;               // şema değişince artırılır (2: chats + vectors, 3: test, yanlış defteri, odak, eşitleme, 4: Feynman)
  const STORES = ["exams", "schedules", "progress", "notes", "chats", "vectors", "mistakes", "quizzes", "sessions", "explains", "meta", "tomb"];
  /** Cihazlar arasında eşitlenen depolar */
  const SYNC_STORES = ["exams", "schedules", "progress", "notes", "chats", "mistakes", "quizzes", "sessions", "explains", "meta"];
  /** Yedek dosyasına giren depolar (vektörler bilgisayarda yeniden hesaplanabildiği için hariç) */
  const BACKUP_STORES = ["exams", "schedules", "progress", "notes", "chats", "mistakes", "quizzes", "sessions", "explains", "meta"];
  const isSync = (store) => SYNC_STORES.indexOf(store) > -1;
  const TOMB_SEP = "\u0001";
  const LS_PREFIX = "da:";

  /* İlk açılış mı? Uygulama hiçbir ayar yazmadan önce bakılır: daha önce açılmış her
     kurulumda en az bir "da:" anahtarı vardır (ör. menü durumu). Tanıtım turu buna bakar. */
  App.firstRun = (function () {
    try {
      for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.indexOf(LS_PREFIX) === 0) return false; }
      return true;
    } catch (e) { return false; }
  })();

  /* ---------------- Ayarlar (localStorage) ---------------- */
  /** Yedeğe girmeyen ayarlar: anahtarlar, bağlantı kodu/adresi, otomatik seçilen modeller */
  const PRIVATE_PREF = /(Key|Token|Busy|AutoModel|AutoAt|AutoSpeed)$|^aiUrl$|^sync|^focusState$|^feyDraft:|^tourDone$|^remindCount$/;

  App.prefs = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(LS_PREFIX + "pref:" + key);
        return raw == null ? fallback : JSON.parse(raw);
      } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(LS_PREFIX + "pref:" + key, JSON.stringify(value)); } catch (e) { /* depolama kapalı */ }
    },
    remove(key) {
      try { localStorage.removeItem(LS_PREFIX + "pref:" + key); } catch (e) { /* depolama kapalı */ }
    },
    all() {
      const out = {};
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.indexOf(LS_PREFIX + "pref:") === 0) out[k.slice((LS_PREFIX + "pref:").length)] = JSON.parse(localStorage.getItem(k));
        }
      } catch (e) { /* yok say */ }
      return out;
    }
  };

  /* ---------------- IndexedDB motoru ---------------- */
  function idbEngine(db) {
    function tx(store, mode, fn) {
      return new Promise((resolve, reject) => {
        const t = db.transaction(store, mode);
        const s = t.objectStore(store);
        let result;
        const req = fn(s);
        if (req) req.onsuccess = () => { result = req.result; };
        t.oncomplete = () => resolve(result);
        t.onerror = () => reject(t.error);
        t.onabort = () => reject(t.error);
      });
    }
    return {
      kind: "indexeddb",
      getAll: (store) => tx(store, "readonly", (s) => s.getAll()).then((r) => r || []),
      get: (store, id) => tx(store, "readonly", (s) => s.get(id)),
      put: (store, obj) => tx(store, "readwrite", (s) => s.put(obj)).then(() => obj),
      remove: (store, id) => tx(store, "readwrite", (s) => s.delete(id)),
      clear: (store) => tx(store, "readwrite", (s) => s.clear()),
      putMany: (store, rows) => tx(store, "readwrite", (s) => { rows.forEach((r) => s.put(r)); }),
      removeMany: (store, ids) => tx(store, "readwrite", (s) => { ids.forEach((id) => s.delete(id)); })
    };
  }

  /* ---------------- localStorage yedek motoru ---------------- */
  function lsEngine() {
    const key = (store) => LS_PREFIX + "store:" + store;
    const read = (store) => {
      try { return JSON.parse(localStorage.getItem(key(store)) || "{}"); } catch (e) { return {}; }
    };
    const write = (store, map) => localStorage.setItem(key(store), JSON.stringify(map));
    return {
      kind: "localstorage",
      getAll: async (store) => Object.values(read(store)),
      get: async (store, id) => read(store)[id],
      put: async (store, obj) => { const m = read(store); m[obj.id] = obj; write(store, m); return obj; },
      remove: async (store, id) => { const m = read(store); delete m[id]; write(store, m); },
      clear: async (store) => write(store, {}),
      putMany: async (store, rows) => { const m = read(store); rows.forEach((r) => { m[r.id] = r; }); write(store, m); },
      removeMany: async (store, ids) => { const m = read(store); ids.forEach((id) => delete m[id]); write(store, m); }
    };
  }

  function openIDB() {
    return new Promise((resolve, reject) => {
      if (!("indexedDB" in window) || !window.indexedDB) return reject(new Error("IndexedDB yok"));
      let req;
      try { req = indexedDB.open(DB_NAME, DB_VERSION); } catch (e) { return reject(e); }
      req.onupgradeneeded = () => {
        const db = req.result;
        STORES.forEach((name) => {
          if (!db.objectStoreNames.contains(name)) db.createObjectStore(name, { keyPath: "id" });
        });
        // Sürüm 1 → 2: yalnızca yeni depolar eklendi; mevcut veriler olduğu gibi kalır
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error("IndexedDB engellendi"));
      setTimeout(() => reject(new Error("IndexedDB zaman aşımı")), 4000);
    });
  }

  let engine = null;
  const listeners = {};

  App.db = {
    async init() {
      try {
        engine = idbEngine(await openIDB());
      } catch (e) {
        console.warn("[storage] IndexedDB kullanılamıyor, localStorage'a geçildi:", e && e.message);
        engine = lsEngine();
      }
      return engine.kind;
    },
    get engine() { return engine ? engine.kind : "none"; },

    STORES, SYNC_STORES,
    getAll: (store) => engine.getAll(store),
    get: (store, id) => engine.get(store, id),
    /** opts.fromSync: eşitlemeden gelen kayıt (damgası korunur, silme izi bırakılmaz) */
    async put(store, obj, opts) {
      if (isSync(store) && !(opts && opts.fromSync)) {
        obj._u = Date.now();
        engine.remove("tomb", store + TOMB_SEP + obj.id).catch(() => {});
      }
      const saved = await engine.put(store, obj);
      emit(store, opts);
      return saved;
    },
    async remove(store, id, opts) {
      await engine.remove(store, id);
      if (isSync(store) && !(opts && opts.fromSync)) await engine.put("tomb", { id: store + TOMB_SEP + id, store, rid: id, _u: Date.now() });
      emit(store, opts);
    },
    async clear(store) {
      await engine.clear(store);
      emit(store);
    },
    /** Toplu yazma/silme (tek işlemde; hafıza vektörleri için) */
    async putMany(store, rows, opts) {
      if (!rows.length) return;
      if (isSync(store) && !(opts && opts.fromSync)) { const now = Date.now(); rows.forEach((r) => { r._u = now; }); }
      await engine.putMany(store, rows);
      emit(store, opts);
    },
    async removeMany(store, ids, opts) {
      if (!ids.length) return;
      await engine.removeMany(store, ids);
      if (isSync(store) && !(opts && opts.fromSync)) {
        const now = Date.now();
        await engine.putMany("tomb", ids.map((id) => ({ id: store + TOMB_SEP + id, store, rid: id, _u: now })));
      }
      emit(store, opts);
    },

    /** Bir depo değişince haber al: App.db.on("exams", fn) */
    on(store, fn) {
      (listeners[store] = listeners[store] || []).push(fn);
      return () => { const l = listeners[store] || []; const i = l.indexOf(fn); if (i > -1) l.splice(i, 1); };
    },

    /** Yedekleme: tüm veriyi tek JSON nesnesine çevirir */
    async exportAll() {
      // API anahtarları, bağlantı kodu ve cihaza özel yapay zeka durumları yedeğe girmez
      const prefs = {};
      Object.entries(App.prefs.all()).forEach(([k, v]) => { if (!PRIVATE_PREF.test(k)) prefs[k] = v; });
      const data = { app: "ders-asistani", schema: DB_VERSION, exportedAt: new Date().toISOString(), prefs, stores: {} };
      for (const s of BACKUP_STORES) data.stores[s] = await engine.getAll(s);
      return data;
    },

    /** Yedekten geri yükleme (mevcut veriyi değiştirir) */
    async importAll(data) {
      if (!data || data.app !== "ders-asistani" || !data.stores) throw new Error(App.t("set.notBackup"));
      const now = Date.now();
      for (const s of BACKUP_STORES) {
        await engine.clear(s);
        const rows = (data.stores[s] || []).filter((row) => row && row.id != null);
        rows.forEach((r) => { r._u = now; });            // geri yüklenen veri diğer cihazlara da gitsin
        if (rows.length) await engine.putMany(s, rows);
        emit(s);
      }
      Object.entries(data.prefs || {}).forEach(([k, v]) => { if (!PRIVATE_PREF.test(k)) App.prefs.set(k, v); });
    },

    async resetAll() {
      for (const s of STORES) { await engine.clear(s); emit(s); }
    }
  };

  function emit(store, opts) {
    (listeners[store] || []).forEach((fn) => { try { fn(opts || {}); } catch (e) { console.error(e); } });
    (listeners["*"] || []).forEach((fn) => { try { fn(store, opts || {}); } catch (e) { console.error(e); } });
  }
})();
