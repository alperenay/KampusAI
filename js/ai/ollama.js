/* =========================================================
   ollama.js — bilgisayardaki Ollama ile konuşan istemci
   Varsayılan adres: http://localhost:11434  (Ayarlar'dan değiştirilebilir)

   Kullanılan uç noktalar:
     GET  /api/tags   → yüklü modeller
     POST /api/chat   → sohbet (akış: satır satır JSON)
     POST /api/embed  → metin vektörleri (eski sürümlerde /api/embeddings)

   Bağlantı yolu (otomatik seçilir):
     1. Site Baslat.bat ile açıldıysa sunucu Ollama'ya aracılık eder:
        http://localhost:8765/ollama/...  (aynı adres → tarayıcı kısıtı yok)
     2. Aracı yoksa (ör. python -m http.server) doğrudan http://localhost:11434
   Ayarlar'da adres elle yazılırsa her zaman o kullanılır.
   index.html çift tıklanarak (file://) açılırsa Ollama isteği reddeder.
   ========================================================= */
(function () {
  const DEFAULTS = {
    url: "http://localhost:11434",
    chatModel: "qwen2.5:14b",
    embedModel: "bge-m3",
    visionModel: "qwen2.5vl:7b"
  };
  /* Kendi eğittiğimiz model (egitim/ klasörü → "kampusai"). Bilgisayarda yüklüyse ve kullanıcı
     Ayarlar'dan başka bir model seçmediyse ana model olarak o kullanılır. */
  const PREFERRED_CHAT = ["kampusai"];
  let installedCache = null;             // son /api/tags yanıtı (otomatik model seçimi için)
  const KEEP_ALIVE = "15m";        // modeller bu süre boyunca bellekte kalır (ilk yanıt gecikmesi bir kez yaşanır)
  /* Hafıza modeli (bge-m3) işlemcide çalışır. Ölçüm (12 GB ekran kartı): bge-m3 ile
     qwen2.5:14b aynı anda ekran kartına sığmıyor ve her soruda birbirini bellekten
     atıyordu (+7-8 sn). İşlemcide bge-m3 yine hızlı (kısa soru ~30 ms, 13 parça ~0,9 sn),
     vektörler birebir aynı; 14b ise ekran kartında hazır kalıyor. */
  const EMBED_OPTIONS = { num_gpu: 0 };

  /** Hata türleri: offline | file-origin | model-missing | http | aborted | bad-response */
  class OllamaError extends Error {
    constructor(code, message, extra) {
      super(message || code);
      this.code = code;
      Object.assign(this, extra || {});
    }
  }

  let autoUrl = null;                    // otomatik bulunan adres (önbellek)
  let detecting = null;

  const manualUrl = () => {
    const v = App.prefs.get("aiUrl", null);
    return v ? String(v).trim().replace(/\/+$/, "") : null;
  };

  /** Aracı sunucu var mı? (Baslat.bat) — yoksa doğrudan Ollama */
  function detectUrl() {
    if (autoUrl) return Promise.resolve(autoUrl);
    if (detecting) return detecting;
    detecting = (async () => {
      // Aracı: Baslat.bat sunucusu (http://localhost:8765) ya da masaüstü uygulaması (app://local)
      if (/^(https?|app):$/.test(location.protocol) && !window.Capacitor) {
        const proxy = location.origin + "/ollama";
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 2500);
        try {
          const r = await fetch(proxy + "/api/version", { signal: ctrl.signal, cache: "no-store" });
          if (r.ok && (await r.json()).version) autoUrl = proxy;
        } catch (e) { /* aracı yok */ }
        clearTimeout(timer);
      }
      if (!autoUrl) autoUrl = DEFAULTS.url;
      detecting = null;
      return autoUrl;
    })();
    return detecting;
  }

  async function baseUrl() { return manualUrl() || await detectUrl(); }

  /** Ayarlarda model seçilmemişse: kampusai yüklüyse o, değilse varsayılan */
  function autoChatModel() {
    const hit = installedCache && PREFERRED_CHAT.find((p) => installedCache.some((n) => sameModel(n, p)));
    return hit || DEFAULTS.chatModel;
  }

  function config() {
    // Eski sürümler ayarları kaydederken varsayılanı da yazıyordu: o değer "seçilmemiş" sayılır
    const chosen = App.prefs.get("aiChatModel", "");
    return {
      url: manualUrl() || autoUrl || DEFAULTS.url,
      auto: !manualUrl(),
      chatModel: chosen && !sameModel(chosen, DEFAULTS.chatModel) ? chosen : autoChatModel(),
      embedModel: App.prefs.get("aiEmbedModel", DEFAULTS.embedModel) || DEFAULTS.embedModel,
      visionModel: App.prefs.get("aiVisionModel", DEFAULTS.visionModel) || DEFAULTS.visionModel
    };
  }

  /** "bge-m3" ile "bge-m3:latest" aynı modeldir */
  function sameModel(a, b) {
    const n = (s) => String(s || "").trim().toLowerCase().replace(/:latest$/, "");
    return n(a) === n(b);
  }

  const isFileOrigin = () => location.protocol === "file:";

  /** Telefon → bilgisayar bağlantısında masaüstü uygulamasının verdiği kod */
  const token = () => String(App.prefs.get("aiToken", "") || "").trim();

  async function request(path, body, signal) {
    const url = await baseUrl();
    const headers = {};
    if (token()) headers["X-DA-Token"] = token();
    let res;
    try {
      res = await fetch(url + path, body === undefined
        ? { method: "GET", headers, signal }
        : { method: "POST", headers: Object.assign({ "Content-Type": "application/json" }, headers), body: JSON.stringify(body), signal });
    } catch (e) {
      if (e && e.name === "AbortError") throw new OllamaError("aborted");
      // Ağ hatası: ya Ollama kapalı ya da tarayıcı isteği engelledi (file://)
      throw new OllamaError(isFileOrigin() ? "file-origin" : "offline", e && e.message);
    }
    if (!res.ok) {
      let msg = "";
      try { msg = (await res.json()).error || ""; } catch (e) { /* gövde JSON değil */ }
      const model = body && body.model;
      if (res.status === 404 && /not found|pull/i.test(msg)) throw new OllamaError("model-missing", msg, { model });
      if (res.status === 401) throw new OllamaError("token", msg || "401", { status: 401 });   // bağlantı kodu yanlış
      if (res.status === 403) throw new OllamaError(isFileOrigin() ? "file-origin" : "http", msg || "403", { status: 403 });
      if (res.status === 502 && /unreachable/.test(msg)) throw new OllamaError("offline", msg);   // aracı var, Ollama kapalı
      throw new OllamaError("http", msg || ("HTTP " + res.status), { status: res.status, model });
    }
    return res;
  }

  /** Yüklü modellerin adları */
  async function tags(signal) {
    const res = await request("/api/tags", undefined, signal);
    const data = await res.json();
    installedCache = (data.models || []).map((m) => m.name || m.model).filter(Boolean);
    return installedCache;
  }

  /** Ayarlardaki üç modelin yüklü olup olmadığını döndürür */
  async function check(signal) {
    const names = await tags(signal);
    const cfg = config();               // tags() sonrası: kampusai yüklüyse otomatik seçilsin
    const has = (m) => names.some((n) => sameModel(n, m));
    return {
      installed: names,
      chat: has(cfg.chatModel),
      embed: has(cfg.embedModel),
      vision: has(cfg.visionModel)
    };
  }

  /**
   * Akışlı sohbet. onDelta(metinParçası) her yeni parçada çağrılır.
   * Dönen değer: { text, stats }
   */
  async function chat({ model, messages, options, signal, onDelta, json }) {
    const opts = Object.assign({}, options || {});
    delete opts.json;
    const body = { model, messages, stream: true, keep_alive: KEEP_ALIVE, options: opts };
    if (json || (options && options.json)) body.format = "json";       // yanıtın geçerli JSON olmasını zorla
    const res = await request("/api/chat", body, signal);

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "", text = "", stats = null;

    const handleLine = (line) => {
      if (!line.trim()) return;
      let obj;
      try { obj = JSON.parse(line); } catch (e) { return; }
      if (obj.error) throw new OllamaError(/not found|pull/i.test(obj.error) ? "model-missing" : "http", obj.error, { model });
      const piece = obj.message && obj.message.content;
      if (piece) {
        text += piece;
        if (onDelta) onDelta(piece, text);
      }
      if (obj.done) {
        stats = {
          evalCount: obj.eval_count || 0,
          evalMs: (obj.eval_duration || 0) / 1e6,
          totalMs: (obj.total_duration || 0) / 1e6,
          loadMs: (obj.load_duration || 0) / 1e6
        };
      }
    };

    try {
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let nl;
        while ((nl = buffer.indexOf("\n")) > -1) {
          handleLine(buffer.slice(0, nl));
          buffer = buffer.slice(nl + 1);
        }
      }
      handleLine(buffer + decoder.decode());
    } catch (e) {
      if (e && e.name === "AbortError") throw new OllamaError("aborted", "", { partial: text });
      if (e instanceof OllamaError) { e.partial = text; throw e; }
      throw new OllamaError("offline", e && e.message, { partial: text });
    }
    return { text, stats };
  }

  /** Metinleri vektöre çevirir (bge-m3). Sırayla aynı uzunlukta dizi döner. */
  async function embed(model, inputs, signal) {
    if (!inputs.length) return [];
    try {
      const res = await request("/api/embed", { model, input: inputs, keep_alive: KEEP_ALIVE, options: EMBED_OPTIONS }, signal);
      const data = await res.json();
      if (!Array.isArray(data.embeddings) || data.embeddings.length !== inputs.length) {
        throw new OllamaError("bad-response", "embeddings");
      }
      return data.embeddings;
    } catch (e) {
      // Çok eski Ollama sürümleri: /api/embed yok → /api/embeddings (tek tek)
      if (e.code === "http" && e.status === 404) {
        const out = [];
        for (const prompt of inputs) {
          const res = await request("/api/embeddings", { model, prompt, options: EMBED_OPTIONS }, signal);
          out.push((await res.json()).embedding);
        }
        return out;
      }
      throw e;
    }
  }

  /** Bellekteki modeller ve ne kadarının ekran kartında olduğu (/api/ps) */
  async function ps(signal) {
    const res = await request("/api/ps", undefined, signal);
    const data = await res.json();
    return (data.models || []).map((m) => ({ name: m.name || m.model, size: m.size || 0, vram: m.size_vram || 0 }));
  }

  /** Modeli bellekten boşaltır; bir sonraki soruda yeniden (tamamı ekran kartına) yüklenir */
  async function unload(model, signal) {
    await request("/api/generate", { model, keep_alive: 0 }, signal);
  }

  /** Ayarlar değişince otomatik adresi yeniden bul */
  function resetDetection() { autoUrl = null; detecting = null; }

  App.ollama = { DEFAULTS, PREFERRED_CHAT, autoChatModel, config, baseUrl, resetDetection, sameModel, isFileOrigin, manualUrl, tags, check, chat, embed, ps, unload, OllamaError };
})();
