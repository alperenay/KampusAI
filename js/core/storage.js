/* =========================================================
   storage.js — tüm veri okuma/yazma işlemleri buradan geçer.

   • Büyük/kalıcı veriler  → IndexedDB  (App.db)
       exams      : girilen denemeler
       schedules  : öğrencinin kendi ders programı
       progress   : tamamlanan kazanımlar
       notes      : kazanım başına kişisel notlar
       chats      : yapay zeka sohbet geçmişi
       vectors    : bge-m3 hafıza vektörleri (yedeğe girmez, yeniden üretilebilir)
   • Küçük ayarlar         → localStorage (App.prefs)

   IndexedDB açılamazsa (bazı tarayıcılar file:// modunda izin
   vermez) aynı API localStorage üzerinden çalışmaya devam eder.
   Modüller hangi motorun kullanıldığını bilmek zorunda değildir.
   ========================================================= */
(function () {
  const DB_NAME = "ders-asistani";
  const DB_VERSION = 2;               // şema değişince artırılır (2: chats + vectors)
  const STORES = ["exams", "schedules", "progress", "notes", "chats", "vectors"];
  /** Yedek dosyasına giren depolar (vektörler bilgisayarda yeniden hesaplanabildiği için hariç) */
  const BACKUP_STORES = ["exams", "schedules", "progress", "notes", "chats"];
  const LS_PREFIX = "da:";

  /* ---------------- Ayarlar (localStorage) ---------------- */
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

    getAll: (store) => engine.getAll(store),
    get: (store, id) => engine.get(store, id),
    async put(store, obj) {
      const saved = await engine.put(store, obj);
      emit(store);
      return saved;
    },
    async remove(store, id) {
      await engine.remove(store, id);
      emit(store);
    },
    async clear(store) {
      await engine.clear(store);
      emit(store);
    },
    /** Toplu yazma/silme (tek işlemde; hafıza vektörleri için) */
    async putMany(store, rows) {
      if (!rows.length) return;
      await engine.putMany(store, rows);
      emit(store);
    },
    async removeMany(store, ids) {
      if (!ids.length) return;
      await engine.removeMany(store, ids);
      emit(store);
    },

    /** Bir depo değişince haber al: App.db.on("exams", fn) */
    on(store, fn) { (listeners[store] = listeners[store] || []).push(fn); },

    /** Yedekleme: tüm veriyi tek JSON nesnesine çevirir */
    async exportAll() {
      const data = { app: "ders-asistani", schema: DB_VERSION, exportedAt: new Date().toISOString(), prefs: App.prefs.all(), stores: {} };
      for (const s of BACKUP_STORES) data.stores[s] = await engine.getAll(s);
      return data;
    },

    /** Yedekten geri yükleme (mevcut veriyi değiştirir) */
    async importAll(data) {
      if (!data || data.app !== "ders-asistani" || !data.stores) throw new Error(App.t("set.notBackup"));
      for (const s of BACKUP_STORES) {
        await engine.clear(s);
        const rows = (data.stores[s] || []).filter((row) => row && row.id != null);
        if (rows.length) await engine.putMany(s, rows);
        emit(s);
      }
      Object.entries(data.prefs || {}).forEach(([k, v]) => App.prefs.set(k, v));
    },

    async resetAll() {
      for (const s of STORES) { await engine.clear(s); emit(s); }
    }
  };

  function emit(store) {
    (listeners[store] || []).forEach((fn) => { try { fn(); } catch (e) { console.error(e); } });
  }
})();
