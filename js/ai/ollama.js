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
    chatModel: "gemma4:e4b",
    embedModel: "bge-m3",
    visionModel: "gemma4:e4b"
  };
  /* Ölçüm (Ekim 2026, eğitimde görülmemiş 215 soru): gemma4:e4b çoktan seçmeli %89,5, açık uçlu %85,8,
     ~180 token/sn; qwen2.5:14b %64,2 / %67,1, ~31 token/sn; kendi eğittiğimiz kampusai v2 %88,4 / %76,2.
     Gemma 4 fotoğrafı kendisi okur: göz de beyin de aynı model olunca ekran kartında model değişmez
     (fotoğraflı soru ~100 sn → ~18 sn). Ayarlar'da seçim yoksa yüklü olan ilk model kullanılır. */
  /* gemma4:12b ("güçlü"): kullanıcı ayrıca yüklediyse onu tercih et (daha doğru, daha yavaş; 8 GB+ ekran kartı) */
  const PREFERRED_CHAT = ["gemma4:12b", "gemma4:e4b", "qwen2.5:14b"];
  const PREFERRED_VISION = ["gemma4:12b", "gemma4:e4b", "qwen3-vl:8b", "qwen2.5vl:7b"];
  /* Eski sürümlerin varsayılanları: Ayarlar'da kayıtlıysa "seçilmemiş" sayılır (yeni varsayılana geçilsin) */
  const OLD_DEFAULTS = { aiChatModel: ["qwen2.5:14b"], aiVisionModel: ["qwen2.5vl:7b"] };
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

  /** Ayarlarda model seçilmemişse: listeden yüklü olan ilk model, hiçbiri yoksa varsayılan */
  function preferred(list, fallback) {
    const hit = installedCache && list.find((p) => installedCache.some((n) => sameModel(n, p)));
    return hit || fallback;
  }
  const autoChatModel = () => preferred(PREFERRED_CHAT, DEFAULTS.chatModel);
  const autoVisionModel = () => preferred(PREFERRED_VISION, DEFAULTS.visionModel);
  /** Ayarlarda kayıtlı değer; eski sürümlerin kaydettiği varsayılan değer "seçilmemiş" sayılır */
  const chosenModel = (key, def) => {
    const v = App.prefs.get(key, "");
    return v && !sameModel(v, def) && !(OLD_DEFAULTS[key] || []).some((o) => sameModel(v, o)) ? v : "";
  };

  function config() {
    return {
      url: manualUrl() || autoUrl || DEFAULTS.url,
      auto: !manualUrl(),
      chatModel: chosenModel("aiChatModel", DEFAULTS.chatModel) || autoChatModel(),
      embedModel: App.prefs.get("aiEmbedModel", DEFAULTS.embedModel) || DEFAULTS.embedModel,
      visionModel: chosenModel("aiVisionModel", DEFAULTS.visionModel) || autoVisionModel()
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
  /**
   * tools: [App.calc.TOOL] verilirse model araç çağırabilir; çağrılar onTool(ad, argümanlar) ile çalıştırılıp
   * sonuç modele geri verilir ve yanıt kaldığı yerden sürer (en fazla 8 tur). Araç desteklemeyen model: araçsız.
   */
  async function chat(o) {
    const { tools, onTool } = o;
    if (!tools || !tools.length || !onTool) return chatOnce(o);
    const msgs = o.messages.slice();
    let full = "", calls = 0, stats = null;
    for (let round = 0; round < 8; round++) {
      let r;
      try {
        r = await chatOnce(Object.assign({}, o, {
          messages: msgs,
          onDelta: (piece) => { full += piece; if (o.onDelta) o.onDelta(piece, full); }
        }));
      } catch (e) {
        if (round === 0 && e && /tool/i.test(String(e.message))) return chatOnce(o);   // model araç desteklemiyor
        throw e;
      }
      stats = r.stats;
      if (!r.toolCalls || !r.toolCalls.length) return { text: full || r.text, stats, toolCalls: calls };
      msgs.push({ role: "assistant", content: r.text || "", tool_calls: r.toolCalls });
      for (const c of r.toolCalls) {
        const f = c.function || {};
        calls++;
        msgs.push({ role: "tool", tool_name: f.name, content: String(await onTool(f.name, f.arguments)) });
      }
    }
    return { text: full, stats, toolCalls: calls };
  }

  async function chatOnce({ model, messages, options, signal, onDelta, json, think, tools }) {
    const requestScope=App.aiRequest.scope(signal,{connectMs:30000,firstMs:60000,idleMs:30000,totalMs:180000}); signal=requestScope.signal;
    let text="";
    try {
    const opts = Object.assign({}, options || {});
    delete opts.json;
    delete opts.smallTalk;
    const body = { model, messages, stream: true, keep_alive: KEEP_ALIVE, options: opts };
    if (tools && tools.length) body.tools = tools;
    /* Düşünen modeller (qwen3-vl, qwen3.5…) düşünce kısmını ayrı alanda yollar; okuma gibi işlerde
       düşünme kapatılmazsa yanıt boş gelebiliyor ve çok uzun sürüyor */
    if (think !== undefined) body.think = !!think;
    if (json || (options && options.json)) body.format = "json";       // yanıtın geçerli JSON olmasını zorla
    let res;
    try {
      res = await request("/api/chat", body, signal);
    } catch (e) {
      // Düşünme ayarını desteklemeyen model ya da eski Ollama: ayarsız tekrar dene
      if (body.think === undefined || !/think/i.test(String(e && e.message))) throw e;
      delete body.think;
      res = await request("/api/chat", body, signal);
    }

    requestScope.ready();
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "", stats = null;
    const toolCalls = [];

    const handleLine = (line) => {
      if (!line.trim()) return;
      let obj;
      try { obj = JSON.parse(line); } catch (e) { return; }
      if (obj.error) throw new OllamaError(/not found|pull/i.test(obj.error) ? "model-missing" : "http", obj.error, { model });
      if (obj.message && Array.isArray(obj.message.tool_calls)) toolCalls.push(...obj.message.tool_calls);
      const piece = obj.message && obj.message.content;
      if (piece) {
        requestScope.activity(); text += piece;
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
    requestScope.check(text);
    if (!text && !toolCalls.length) throw new OllamaError("bad-response","empty",{model});
    return { text, stats, toolCalls };
    } catch(error) { throw requestScope.failure(error,text); } finally { requestScope.close(); }
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

  App.ollama = { DEFAULTS, PREFERRED_CHAT, PREFERRED_VISION, autoChatModel, autoVisionModel, config, baseUrl, resetDetection, sameModel, isFileOrigin, manualUrl, tags, check, chat, embed, ps, unload, OllamaError };
})();
