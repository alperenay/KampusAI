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

  /* ---------------- Cihaza indirilen yapay zeka (Windows ve Android uygulaması) ----------------
     Ayarlar → "Yapay zekayı bu cihaza indir": Gemma 4 E4B, uygulamanın kendi llama.cpp motorunda
     çalışır (Ollama gerekmez). Hazır olduğunda "yerel" motor bunu kullanır.
       Windows : desktop/device.js (+ bge-m3 hafıza modeli), adres app://local/cihaz/…
       Android : mobile/native/DeviceAi.java, adres http://127.0.0.1:<port> (durumdaki "adresler");
                 hafıza araması kelime eşleştirmesiyle (telefon belleği sohbet modeline kalsın) */
  const androidListeners = new Set();
  window.__nativeAi = (st) => androidListeners.forEach((fn) => { try { fn(st); } catch (e) { /* yok */ } });
  const N = () => window.KampusNative;
  const nStatus = () => { try { return N() && N().aiStatus ? JSON.parse(N().aiStatus() || "{}") : { destek: false }; } catch (e) { return { destek: false }; } };
  const nCall = (m) => { try { if (N() && N()[m]) N()[m](); } catch (e) { /* yok */ } return nStatus(); };
  const bridge = (window.desktopApp && window.desktopApp.device) || (platform.native && platform.os === "android" ? {
    phone: true,
    status: async () => nStatus(),
    download: async (v) => {                     // v: "tam" (E4B) | "hafif" (E2B)
      try { if (v && N() && N().aiDownloadVariant) N().aiDownloadVariant(v); else if (N() && N().aiDownload) N().aiDownload(); } catch (e) { /* yok */ }
      return nStatus();
    },
    cancel: async () => nCall("aiCancel"),
    start: async () => nCall("aiStart"),
    remove: async () => nCall("aiRemove"),
    onProgress: (fn) => { androidListeners.add(fn); return () => androidListeners.delete(fn); }
  } : null);
  let deviceState = null;
  const DEV = "app://local/cihaz/";
  const DEV_MODELS = { chat: "gemma4-e4b (cihaz)", embed: "bge-m3 (cihaz)" };
  const deviceOn = () => !!(deviceState && deviceState.asama === "hazir");
  const devBase = (which) => (deviceState && deviceState.adresler ? deviceState.adresler[which] || "" : DEV + which);
  const devHasEmbed = () => !!devBase("hafiza");
  const device = {
    on: deviceOn,
    state: () => deviceState,
    bridge,
    set(st) {
      if (!st) return;
      const was = deviceOn();
      deviceState = st;
      if (was !== deviceOn()) { localCache = null; document.dispatchEvent(new CustomEvent("ai:device", { detail: st })); }
    },
    /** İndirilmiş ama kapalıysa aç ve hazır olmasını bekle (telefonda motor ilk soruda açılır) */
    async ensure(signal) {
      if (!bridge || deviceOn() || !deviceState || !deviceState.kurulu || deviceState.destek === false) return deviceOn();
      if (deviceState.asama !== "hazirlaniyor") device.set(await bridge.start());
      const until = Date.now() + 240000;
      while (!deviceOn() && Date.now() < until && !(signal && signal.aborted)) {
        if (deviceState && deviceState.asama === "hata") break;
        await new Promise((r) => setTimeout(r, 700));
        if (bridge.phone) device.set(nStatus());
      }
      return deviceOn();
    }
  };
  if (bridge) {
    bridge.onProgress((st) => device.set(st));
    const first = () => bridge.status().then((st) => device.set(st)).catch(() => {});
    first();
    if (bridge.phone) setTimeout(first, 1500);          // köprü sayfa yüklenirken geç bağlanabilir
  }
  // Cihaz motoru OpenAI-uyumlu (llama-server): internet servisinin kodu, yerel adresle
  const devChat = Object.create(App.cloud.openai, {
    base: { value: () => devBase("sohbet") + "/v1" },
    headers: { value: () => ({ "Content-Type": "application/json" }) }
  });
  const devEmbed = Object.create(App.cloud.openai, {
    base: { value: () => devBase("hafiza") + "/v1" },
    headers: { value: () => ({ "Content-Type": "application/json" }) }
  });
  async function devHealth(which, signal) {
    if (!devBase(which)) return false;
    try { const r = await fetch(devBase(which) + "/health", { signal }); return r.ok; } catch (e) { return false; }
  }
  /** Telefonda indirilmiş motor kapalıysa yerel kullanılabilir say (ilk soruda açılır) */
  const deviceIdle = () => !!(bridge && deviceState && deviceState.kurulu && deviceState.destek !== false &&
    (deviceState.asama === "kurulu" || deviceState.asama === "hazirlaniyor"));
  const deviceUsed = () => deviceOn() || deviceIdle();

  /* ---------------- Yerel motor (Ollama ya da cihaza indirilen) ---------------- */
  const local = {
    id: "local",
    kind: "local",
    get name() { return deviceUsed() ? (bridge && bridge.phone ? "Bu telefon" : "Bu bilgisayar") : "Ollama"; },
    get device() { return deviceUsed(); },
    configured: () => true,
    config() {
      const devChatName = deviceState && deviceState.secim === "hafif" ? "gemma4-e2b (cihaz)" : DEV_MODELS.chat;
      if (deviceUsed()) return { chatModel: devChatName, visionModel: devChatName, embedModel: devHasEmbed() ? DEV_MODELS.embed : "", direct: true, url: "" };
      const c = App.ollama.config();
      // Göz ve beyin aynı modelse (gemma4) fotoğraf doğrudan beyne gider: ayrı okuma adımı yok
      const direct = App.ollama.sameModel(c.chatModel, c.visionModel);
      return { chatModel: c.chatModel, visionModel: c.visionModel, embedModel: c.embedModel, direct, url: c.url };
    },
    prepare: async () => {},
    async chat(o) {
      if (deviceIdle() && !(await device.ensure(o.signal))) {
        throw new AIError("offline", (deviceState && deviceState.hata) || "cihaz");
      }
      return deviceOn() ? devChat.chat(o) : App.ollama.chat(o);
    },
    async embed(model, inputs, signal) {
      if (deviceIdle()) await device.ensure(signal);
      if (deviceUsed()) {
        if (!deviceOn()) throw new AIError("offline", "cihaz");
        return devEmbed.embed(model, inputs, signal);
      }
      return App.ollama.embed(model, inputs, signal);
    },
    async check(signal) {
      if (deviceIdle()) {                       // indirildi, ilk soruda açılacak
        return { ok: true, chat: true, vision: true, embed: true, installed: [DEV_MODELS.chat], chatModels: [DEV_MODELS.chat] };
      }
      if (deviceOn()) {
        const [chat, embed] = await Promise.all([devHealth("sohbet", signal), devHasEmbed() ? devHealth("hafiza", signal) : true]);
        if (!chat) throw new AIError("offline", "cihaz");
        const names = devHasEmbed() ? [DEV_MODELS.chat, DEV_MODELS.embed] : [DEV_MODELS.chat];
        return { ok: chat, chat, vision: chat, embed, installed: names, chatModels: [DEV_MODELS.chat] };
      }
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
    if (App.ollama.manualUrl() || deviceUsed()) return true;
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
    if (deviceIdle()) return true;
    if (localCache && Date.now() - localCache.at < (localCache.chat ? LOCAL_OK_TTL : LOCAL_FAIL_TTL)) return localCache.chat;
    const t = withTimeout(3000, signal);
    let chat = false;
    try { chat = deviceOn() ? await devHealth("sohbet", t.signal) : (await App.ollama.check(t.signal)).chat; } catch (e) { chat = false; }
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

  App.engine = { engines, local, device, mode, cloud, defaultCloud, resolve, status, canFallback, invalidate, markLocalDown, localPossible, platform, AIError };
})();
