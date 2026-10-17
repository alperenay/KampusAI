/* =========================================================
   engine.js — hangi yapay zekanın kullanılacağını seçer

   Çalışma şekli (Ayarlar → Yapay zeka):
     "auto"  : Bilgisayardaki Ollama hazırsa onu kullanır (ücretsiz,
               veriler cihazda kalır); değilse internet servisine geçer.
     "local" : Yalnızca Ollama (bu bilgisayar ya da telefonda
               eşleştirilmiş bilgisayar).
     "cloud" : Yalnızca internet servisi (Gemini ya da OpenAI-uyumlu).

   Motorların ortak arayüzü için bkz. cloud.js başlığı.
   ========================================================= */
(function () {
  const AIError = App.ollama.OllamaError;

  /* ---------------- Platform ---------------- */
  const cap = window.Capacitor;
  const platform = {
    desktop: !!window.desktopApp,                                           // Windows uygulaması (Electron)
    native: !!(cap && cap.isNativePlatform && cap.isNativePlatform()),      // Android uygulaması
    os: cap && cap.getPlatform ? cap.getPlatform() : "web",
    standalone: !!((window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || navigator.standalone)
  };
  platform.mobile = platform.native || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  App.platform = platform;

  /* ---------------- Yerel motor (Ollama) ---------------- */
  const local = {
    id: "local",
    kind: "local",
    name: "Ollama",
    configured: () => true,
    config() {
      const c = App.ollama.config();
      // Göz ve beyin aynı modelse (gemma4) fotoğraf doğrudan beyne gider: ayrı okuma adımı yok
      const direct = App.ollama.sameModel(c.chatModel, c.visionModel);
      return { chatModel: c.chatModel, visionModel: c.visionModel, embedModel: c.embedModel, direct, url: c.url };
    },
    prepare: async () => {},
    chat: (o) => App.ollama.chat(o),
    embed: (model, inputs, signal) => App.ollama.embed(model, inputs, signal),
    async check(signal) {
      const r = await App.ollama.check(signal);
      return Object.assign({ ok: r.chat, chatModels: r.installed }, r);
    }
  };

  const engines = { local, server: App.cloud.server, gemini: App.cloud.gemini, openai: App.cloud.openai };

  const mode = () => { const m = App.prefs.get("aiMode", "auto"); return ["auto", "local", "cloud"].includes(m) ? m : "auto"; };
  /** Seçili internet servisi. Seçilmemişse: hazır sunucu varsa o (kullanıcı hiçbir şey girmeden çalışır), yoksa Gemini */
  const defaultCloud = () => (App.cloud.server.configured() ? "server" : "gemini");
  const cloud = () => {
    const id = App.prefs.get("aiCloud", null) || defaultCloud();
    const e = engines[id];
    return e && e.kind === "cloud" && (e.configured() || id !== "server") ? e : engines[defaultCloud()];
  };

  /** Bu cihazda yerel modele ulaşmak mümkün mü? (telefonda yalnızca eşleştirme yapıldıysa) */
  function localPossible() {
    if (App.ollama.manualUrl()) return true;
    if (platform.desktop || location.protocol === "file:") return true;
    if (platform.native) return false;
    return /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  }

  /* Yerel durum önbelleği: her soruda yeniden yoklamamak için */
  let localCache = null;          // { at, chat }
  const LOCAL_OK_TTL = 60000, LOCAL_FAIL_TTL = 15000;

  function withTimeout(ms, outer) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), ms);
    if (outer) outer.addEventListener("abort", () => ctrl.abort(), { once: true });
    return { signal: ctrl.signal, done: () => clearTimeout(timer) };
  }

  async function localReady(signal) {
    if (localCache && Date.now() - localCache.at < (localCache.chat ? LOCAL_OK_TTL : LOCAL_FAIL_TTL)) return localCache.chat;
    const t = withTimeout(3000, signal);
    let chat = false;
    try { chat = (await App.ollama.check(t.signal)).chat; } catch (e) { chat = false; }
    t.done();
    localCache = { at: Date.now(), chat };
    return chat;
  }

  /** Bu soru için kullanılacak motoru seçer */
  async function resolve(signal) {
    const m = mode();
    if (m === "local") return local;
    if (m === "cloud") return cloud();
    if (localPossible()) {
      if (await localReady(signal)) return local;
      if (cloud().configured()) return cloud();
      return local;                                   // hiçbiri hazır değil: yerel hatası gösterilsin
    }
    return cloud();
  }

  /** Otomatik modda yerel motor yarıda düşerse internete geçilebilir mi? */
  const canFallback = (engine) => mode() === "auto" && engine.kind === "local" && cloud().configured();

  function invalidate() { localCache = null; App.ollama.resetDetection(); }
  function markLocalDown() { localCache = { at: Date.now(), chat: false }; }

  /**
   * Arayüzdeki durum noktası için ayrıntılı kontrol.
   * state: ok | partial | missing | offline | file | token | nokey | auth | net | quota | error
   */
  async function status() {
    const engine = await resolve();
    const cfg = engine.config();
    const out = { engine, cfg, state: "ok", missing: [], installed: [] };
    if (engine.kind === "cloud" && !engine.configured()) { out.state = "nokey"; return out; }
    const t = withTimeout(8000);
    try {
      const r = await engine.check(t.signal);
      out.installed = r.installed || [];
      const c2 = engine.config();                       // Gemini otomatik model seçimi check() içinde güncellenir
      out.cfg = c2;
      if (!r.chat) out.missing.push(c2.chatModel);
      if (!c2.direct && !r.vision) out.missing.push(c2.visionModel);
      if (c2.embedModel && !r.embed) out.missing.push(c2.embedModel);
      out.state = !r.chat ? "missing" : out.missing.length ? "partial" : "ok";
      if (engine.kind === "local") localCache = { at: Date.now(), chat: r.chat };
    } catch (e) {
      const code = (e && e.code) || "error";
      out.state = code === "file-origin" ? "file" : code === "aborted" ? (engine.kind === "local" ? "offline" : "net")
        : ["offline", "token", "auth", "net", "quota", "no-key"].includes(code) ? (code === "no-key" ? "nokey" : code) : "error";
      out.error = e;
      if (engine.kind === "local") {
        markLocalDown();
        // Otomatik mod, Ollama kapalı ve internet servisi de ayarlanmamış: iki seçeneği birlikte öner
        if (mode() === "auto" && out.state === "offline" && !cloud().configured()) out.state = "nokey";
      }
    }
    t.done();
    return out;
  }

  App.engine = { engines, local, mode, cloud, defaultCloud, resolve, status, canFallback, invalidate, markLocalDown, localPossible, platform, AIError };
})();
