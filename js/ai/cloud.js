/* =========================================================
   cloud.js — internet üzerinden çalışan yapay zeka servisleri

   0. Ders Asistanı sunucusu (varsayılan, ayar gerektirmez): Gemini'nin
      anahtarı uygulamada değil, Cloudflare'deki sunucuda durur (server/worker.js)
   1. Google Gemini, kullanıcının kendi anahtarıyla
        • Tek model hem fotoğrafı okur hem soruyu çözer ("doğrudan görsel")
        • Hafıza (RAG) için kendi vektör modeli var: gemini-embedding-001
        • Ücretsiz anahtar: https://aistudio.google.com → "Get API key"
   2. OpenAI-uyumlu servisler (OpenRouter, Groq, OpenAI, DeepSeek …)
        • /chat/completions, /models, /embeddings uç noktaları
        • Görsel ve vektör modeli isteğe bağlı; vektör modeli yoksa
          hafıza araması kelime eşleştirmesiyle yapılır (rag.js)

   Anahtarlar yalnızca bu cihazda (localStorage) saklanır ve yalnızca
   seçilen servise gönderilir. Yedek dosyasına girmez.

   Ortak arayüz (yerel Ollama motoru da aynısını sağlar — engine.js):
     config()                       → { chatModel, visionModel, embedModel, direct }
     configured()                   → anahtar/adres girilmiş mi
     prepare(signal)                → (Gemini) otomatik model seçimi
     chat({ model, messages, options, signal, onDelta }) → { text, stats }
     embed(model, inputs, signal, kind)  kind: "doc" | "query"
     check(signal)                  → { ok, chat, embed, vision, installed[], chatModels[] }
   Mesaj biçimi: { role: "system"|"user"|"assistant", content, images?: [base64 JPEG] }
   ========================================================= */
(function () {
  const AIError = App.ollama.OllamaError;
  const pref = (k, d) => { const v = App.prefs.get(k, null); return v == null || v === "" ? d : v; };
  const str = (k) => String(pref(k, "") || "").trim();

  /* ---------------- Ortak yardımcılar ---------------- */

  /** Ağ isteği; hataları ortak hata kodlarına çevirir */
  async function send(url, init, model, parseError) {
    let res;
    try {
      res = await fetch(url, init);
    } catch (e) {
      if (e && e.name === "AbortError") throw new AIError("aborted");
      throw new AIError("net", e && e.message);
    }
    if (!res.ok) {
      let body = null, text = "";
      try { text = await res.text(); body = JSON.parse(text); } catch (e) { /* JSON değil */ }
      throw parseError(res.status, body, text, model);
    }
    return res;
  }

  /** Sunucu olay akışı (text/event-stream) okuyucu: her "data:" yükü için onData(json) */
  async function readSSE(res, onData, signal) {
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    const flush = (block) => {
      const data = block.split(/\r?\n/).filter((l) => l.startsWith("data:")).map((l) => l.slice(5).replace(/^ /, "")).join("\n");
      if (!data || data === "[DONE]") return;
      let obj;
      try { obj = JSON.parse(data); } catch (e) { return; }
      onData(obj);
    };
    try {
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buffer.search(/\r?\n\r?\n/)) > -1) {
          const m = buffer.match(/\r?\n\r?\n/);
          flush(buffer.slice(0, idx));
          buffer = buffer.slice(idx + m[0].length);
        }
      }
      buffer += decoder.decode();
      if (buffer.trim()) flush(buffer);
    } catch (e) {
      if ((e && e.name === "AbortError") || (signal && signal.aborted)) throw new AIError("aborted");
      if (e instanceof AIError) throw e;
      throw new AIError("net", e && e.message);
    }
  }

  /** Akış süresinden hız istatistiği */
  function timer() {
    const t0 = performance.now();
    let first = 0;
    return {
      tick() { if (!first) first = performance.now(); },
      stats(tokens) {
        const end = performance.now();
        // İnternet servisleri metni büyük parçalar hâlinde gönderdiği için "parça/sn" hızı anlamlı değil; gösterilmez
        return { evalCount: tokens || 0, evalMs: 0, totalMs: end - t0, loadMs: first ? first - t0 : 0 };
      }
    };
  }

  /* =========================================================
     GEMINI
     ========================================================= */
  const G_BASE = "https://generativelanguage.googleapis.com/v1beta";
  const G_EMBED = "gemini-embedding-001";
  const G_EMBED_DIM = 768;                     // vektör boyu (daha küçük = daha az yer, kalite farkı çok az)
  const G_FALLBACK = "gemini-3.8-flash";       // model listesi alınamazsa
  const G_AUTO_TTL = 3 * 24 * 3600 * 1000;     // otomatik seçilen modeli 3 günde bir yeniden belirle
  const NOT_CHAT = /(embedding|tts|live|image|imagen|veo|lyria|audio|transcribe|robotics|translate|aqa|research|antigravity|computer|nano-banana|learnlm)/i;

  /** Listeden en yeni "flash" modelini seç (hızlı ve ücretsiz katmanda) */
  function pickGeminiModel(names) {
    const ver = (n) => { const m = n.match(/gemini-(\d+(?:\.\d+)?)/); return m ? parseFloat(m[1]) : 0; };
    const chat = names.filter((n) => /^gemini-/.test(n) && !NOT_CHAT.test(n));
    const byVer = (list) => list.sort((a, b) => ver(b) - ver(a))[0];
    return byVer(chat.filter((n) => /^gemini-\d+(\.\d+)?-flash$/.test(n))) ||
      byVer(chat.filter((n) => /-flash/.test(n) && !/lite/.test(n) && !/preview|exp/.test(n))) ||
      byVer(chat.filter((n) => /-flash/.test(n) && !/lite/.test(n))) ||
      byVer(chat.filter((n) => /-flash/.test(n))) ||
      byVer(chat) || null;
  }

  /** Yedek sıralaması: kararlı Flash (yeniden eskiye) → önizleme Flash → Flash-Lite */
  function rankGeminiModels(names) {
    const ver = (n) => { const m = n.match(/gemini-(\d+(?:\.\d+)?)/); return m ? parseFloat(m[1]) : 0; };
    const chat = names.filter((n) => /^gemini-/.test(n) && /-flash/.test(n) && !NOT_CHAT.test(n));
    const tier = (n) => (/lite/.test(n) ? 2 : /preview|exp/.test(n) ? 1 : 0);
    return chat.sort((a, b) => tier(a) - tier(b) || ver(b) - ver(a));
  }

  function geminiError(status, body, text, model) {
    const err = (body && body.error) || {};
    const msg = err.message || text || ("HTTP " + status);
    const st = err.status || "";
    if (/api key|API_KEY/i.test(msg) || st === "UNAUTHENTICATED" || status === 401 || (status === 403 && st === "PERMISSION_DENIED")) return new AIError("auth", msg, { status });
    if (status === 429 || st === "RESOURCE_EXHAUSTED") return new AIError("quota", msg, { status, model });
    if (status === 503 || status === 502 || status === 504 || st === "UNAVAILABLE" || st === "DEADLINE_EXCEEDED") return new AIError("busy", msg, { status, model });
    if (status === 404 || st === "NOT_FOUND") return new AIError("model-missing", msg, { status, model });
    return new AIError("http", msg, { status, model });
  }

  /**
   * Gemini motoru üretir. İki örneği var:
   *   gemini : kullanıcının kendi anahtarı (doğrudan Google'a)
   *   server : Ders Asistanı sunucusu (Cloudflare) — anahtar sunucuda, kullanıcı hiçbir şey girmez
   * P: ayar öneki ("gem" / "srv")
   */
  function makeGemini(o) {
  const P = o.prefix;
  return {
    id: o.id,
    kind: "cloud",
    name: o.name,
    keyUrl: "https://aistudio.google.com/apikey",
    server: !!o.server,

    base: o.base,
    key: () => (o.server ? "" : str(P + "Key")),
    configured() { return o.server ? !!this.base() : !!this.key() && !!this.base(); },

    config() {
      const chosen = str(P + "Model");
      const chatModel = chosen || str(P + "AutoModel") || G_FALLBACK;
      return { chatModel, visionModel: chatModel, embedModel: str(P + "Embed") || G_EMBED, direct: true, auto: !chosen };
    },

    headers() {
      if (o.server) {
        if (!this.base()) throw new AIError("no-key", "", { provider: o.id });
        return { "Content-Type": "application/json" };
      }
      const k = this.key();
      if (!k) throw new AIError("no-key", "", { provider: o.id });
      return { "Content-Type": "application/json", "x-goog-api-key": k };
    },

    async listModels(signal) {
      const res = await send(this.base() + "/models?pageSize=1000", { headers: this.headers(), signal }, null, geminiError);
      const data = await res.json();
      return (data.models || []).map((m) => ({
        name: String(m.name || "").replace(/^models\//, ""),
        label: m.displayName || "",
        methods: m.supportedGenerationMethods || []
      })).filter((m) => m.name);
    },

    /** Otomatik model seçimi (gerekirse listeyi alır) */
    async prepare(signal, force) {
      if (str(P + "Model")) return;
      const at = Number(pref(P + "AutoAt", 0));
      if (!force && str(P + "AutoModel") && Date.now() - at < G_AUTO_TTL) return;
      const list = await this.listModels(signal);
      const picked = pickGeminiModel(list.filter((m) => m.methods.includes("generateContent")).map((m) => m.name));
      if (picked) { App.prefs.set(P + "AutoModel", picked); App.prefs.set(P + "AutoAt", Date.now()); }
    },

    async check(signal) {
      const list = await this.listModels(signal);
      const names = list.map((m) => m.name);
      const chatModels = list.filter((m) => m.methods.includes("generateContent") && !NOT_CHAT.test(m.name)).map((m) => m.name);
      if (!str(P + "Model")) {
        const picked = pickGeminiModel(chatModels);
        if (picked) { App.prefs.set(P + "AutoModel", picked); App.prefs.set(P + "AutoAt", Date.now()); }
      }
      const cfg = this.config();
      const chat = names.includes(cfg.chatModel);
      return { ok: chat, installed: names, chatModels, chat, vision: chat, embed: names.includes(cfg.embedModel) };
    },

    /** Mesajları Gemini biçimine çevir (system → systemInstruction, assistant → model) */
    toContents(messages) {
      const system = [];
      const contents = [];
      messages.forEach((m) => {
        if (m.role === "system") { system.push(m.content); return; }
        const role = m.role === "assistant" ? "model" : "user";
        const parts = [];
        (m.images || []).forEach((b64) => parts.push({ inlineData: { mimeType: "image/jpeg", data: b64 } }));
        if (m.content) parts.push({ text: m.content });
        if (!parts.length) return;
        const last = contents[contents.length - 1];
        if (last && last.role === role) last.parts.push(...parts);       // ardışık aynı rol birleştirilir
        else contents.push({ role, parts });
      });
      return { system: system.join("\n\n"), contents };
    },

    /**
     * Sohbet. Model o an yoğunsa (503) ya da kotası dolduysa (429) ve model otomatik
     * seçildiyse, sıradaki Flash modeliyle tekrar dener (en fazla 2 yedek).
     * Dönen: { text, stats, model }  (model: yanıtı gerçekten veren model)
     */
    async chat(opts) {
      const auto = !str(P + "Model");
      const BUSY_MS = 10 * 60 * 1000;                     // yoğun model 10 dk boyunca atlanır
      const busy = (() => { try { return JSON.parse(App.prefs.get(P + "Busy", "{}") || "{}"); } catch (e) { return {}; } })();
      const saveBusy = () => App.prefs.set(P + "Busy", JSON.stringify(busy));
      const isBusy = (n) => busy[n] && busy[n] > Date.now();
      const ranked = async () => {
        if (!this._ranked) this._ranked = rankGeminiModels((await this.listModels(opts.signal)).filter((m) => m.methods.includes("generateContent")).map((m) => m.name));
        return this._ranked;
      };
      const tried = [];
      let model = opts.model, lastErr = null;
      // Az önce yoğun olduğu görülen modeli hiç denemeden sıradakine geç (her soruda saniyeler kaybetmemek için)
      if (auto && isBusy(model)) {
        try { model = (await ranked()).find((n) => !isBusy(n)) || model; } catch (e) { /* liste yoksa aynı modelle dene */ }
      }
      for (let attempt = 0; attempt < 3; attempt++) {
        tried.push(model);
        try {
          const res = await this.chatOnce(Object.assign({}, opts, { model }));
          res.model = model;
          if (busy[model]) { delete busy[model]; saveBusy(); }
          return res;
        } catch (e) {
          lastErr = e;
          const retryable = e && (e.code === "busy" || e.code === "quota") && !e.partial;
          if (!retryable || !auto || (opts.signal && opts.signal.aborted)) throw e;
          busy[model] = Date.now() + BUSY_MS; saveBusy();
          let list;
          try { list = await ranked(); } catch (e2) { throw e; }
          model = list.find((n) => !tried.includes(n) && !isBusy(n)) || list.find((n) => !tried.includes(n));
          if (!model) throw e;
          if (opts.onRetry) opts.onRetry(model, e);
        }
      }
      throw lastErr;
    },

    async chatOnce({ model, messages, options, signal, onDelta }) {
      const { system, contents } = this.toContents(messages);
      const body = { contents, generationConfig: { temperature: options && options.temperature != null ? options.temperature : 0.4 } };
      if (system) body.systemInstruction = { parts: [{ text: system }] };
      const res = await send(this.base() + "/models/" + encodeURIComponent(model) + ":streamGenerateContent?alt=sse",
        { method: "POST", headers: this.headers(), body: JSON.stringify(body), signal }, model, geminiError);

      const clock = timer();
      let text = "", tokens = 0, blocked = "";
      await readSSE(res, (obj) => {
        if (obj.error) throw geminiError(obj.error.code || 500, obj, "", model);
        const cand = obj.candidates && obj.candidates[0];
        const parts = (cand && cand.content && cand.content.parts) || [];
        parts.forEach((p) => {
          if (p.thought || typeof p.text !== "string" || !p.text) return;      // "düşünme" parçaları gösterilmez
          clock.tick();
          text += p.text;
          if (onDelta) onDelta(p.text, text);
        });
        if (obj.promptFeedback && obj.promptFeedback.blockReason) blocked = obj.promptFeedback.blockReason;
        if (cand && /SAFETY|PROHIBITED|BLOCKLIST|SPII/.test(cand.finishReason || "") && !text) blocked = cand.finishReason;
        if (obj.usageMetadata) tokens = obj.usageMetadata.candidatesTokenCount || tokens;
      }, signal);
      if (!text && blocked) throw new AIError("blocked", blocked, { model });
      if (!text) throw new AIError("bad-response", "empty", { model });
      return { text, stats: clock.stats(tokens) };
    },

    async embed(model, inputs, signal, kind) {
      if (!inputs.length) return [];
      const out = [];
      for (let i = 0; i < inputs.length; i += 100) {             // istek başına en fazla 100 metin
        const part = inputs.slice(i, i + 100);
        const body = {
          requests: part.map((text) => ({
            model: "models/" + model,
            content: { parts: [{ text }] },
            taskType: kind === "query" ? "RETRIEVAL_QUERY" : "RETRIEVAL_DOCUMENT",
            outputDimensionality: G_EMBED_DIM
          }))
        };
        const res = await send(this.base() + "/models/" + encodeURIComponent(model) + ":batchEmbedContents",
          { method: "POST", headers: this.headers(), body: JSON.stringify(body), signal }, model, geminiError);
        const data = await res.json();
        if (!Array.isArray(data.embeddings) || data.embeddings.length !== part.length) throw new AIError("bad-response", "embeddings");
        data.embeddings.forEach((e) => out.push(e.values));
      }
      return out;
    }
  };
  }

  const gemini = makeGemini({ id: "gemini", name: "Google Gemini", prefix: "gem", base: () => G_BASE });
  /* Ders Asistanı sunucusu: adresi derleme sırasında js/config.js dosyasına yazılır */
  const server = makeGemini({ id: "server", name: "Ders Asistanı sunucusu", prefix: "srv", server: true,
    base: () => { const u = (App.config && App.config.serverUrl) || ""; return u ? u.replace(/\/+$/, "") + "/v1beta" : ""; } });

  /* =========================================================
     OPENAI-UYUMLU
     ========================================================= */
  const PRESETS = {
    openrouter: { name: "OpenRouter", url: "https://openrouter.ai/api/v1", keyUrl: "https://openrouter.ai/keys" },
    groq:       { name: "Groq",       url: "https://api.groq.com/openai/v1", keyUrl: "https://console.groq.com/keys" },
    openai:     { name: "OpenAI",     url: "https://api.openai.com/v1", keyUrl: "https://platform.openai.com/api-keys" },
    deepseek:   { name: "DeepSeek",   url: "https://api.deepseek.com/v1", keyUrl: "https://platform.deepseek.com/api_keys" },
    custom:     { name: "",           url: "", keyUrl: "" }
  };

  function openaiError(status, body, text, model) {
    const err = (body && (body.error || body)) || {};
    const msg = (typeof err === "string" ? err : err.message) || text || ("HTTP " + status);
    if (status === 401 || status === 403) return new AIError("auth", msg, { status });
    if (status === 429 || status === 402) return new AIError("quota", msg, { status });
    if (status === 404 || /model.*(not found|does not exist)|no such model|not a valid model/i.test(msg)) return new AIError("model-missing", msg, { status, model });
    return new AIError("http", msg, { status, model });
  }

  const openai = {
    id: "openai",
    kind: "cloud",
    PRESETS,
    get name() { const p = PRESETS[str("oaPreset") || "openrouter"]; return (p && p.name) || this.host() || "OpenAI-uyumlu"; },

    base() { return (str("oaBase") || (PRESETS[str("oaPreset") || "openrouter"] || {}).url || "").replace(/\/+$/, ""); },
    host() { try { return new URL(this.base()).host; } catch (e) { return ""; } },
    key: () => str("oaKey"),
    configured() { return !!(this.base() && this.key() && str("oaModel")); },

    config() {
      const chatModel = str("oaModel");
      const vision = str("oaVision");
      return {
        chatModel,
        visionModel: vision || chatModel,
        embedModel: str("oaEmbed"),                 // boş → kelime araması
        direct: !vision || vision === chatModel     // ayrı görme modeli yoksa fotoğraf doğrudan ana modele gider
      };
    },

    headers() {
      if (!this.base()) throw new AIError("no-key", "", { provider: "openai" });
      const k = this.key();
      if (!k) throw new AIError("no-key", "", { provider: "openai" });
      const h = { "Content-Type": "application/json", "Authorization": "Bearer " + k };
      if (/openrouter\.ai/.test(this.base())) { h["X-Title"] = "Ders Asistani"; }
      return h;
    },

    async prepare() {
      if (!str("oaModel")) throw new AIError("no-key", "", { provider: "openai", what: "model" });
    },

    async listModels(signal) {
      const res = await send(this.base() + "/models", { headers: this.headers(), signal }, null, openaiError);
      const data = await res.json();
      return (data.data || data.models || []).map((m) => m.id || m.name).filter(Boolean).sort();
    },

    async check(signal) {
      const names = await this.listModels(signal);
      const cfg = this.config();
      const has = (m) => !m || names.length === 0 || names.includes(m);
      const chat = !!cfg.chatModel && has(cfg.chatModel);
      return { ok: chat, installed: names, chatModels: names, chat, vision: has(cfg.visionModel), embed: !cfg.embedModel || has(cfg.embedModel) };
    },

    toMessages(messages) {
      return messages.map((m) => {
        if (!m.images || !m.images.length) return { role: m.role, content: m.content || "" };
        const content = [];
        if (m.content) content.push({ type: "text", text: m.content });
        m.images.forEach((b64) => content.push({ type: "image_url", image_url: { url: "data:image/jpeg;base64," + b64 } }));
        return { role: m.role, content };
      });
    },

    async chat({ model, messages, options, signal, onDelta }) {
      const body = {
        model,
        messages: this.toMessages(messages),
        stream: true,
        temperature: options && options.temperature != null ? options.temperature : 0.4
      };
      const res = await send(this.base() + "/chat/completions",
        { method: "POST", headers: this.headers(), body: JSON.stringify(body), signal }, model, openaiError);

      const clock = timer();
      let text = "", tokens = 0;
      const ctype = res.headers.get("content-type") || "";
      if (!/event-stream/.test(ctype)) {
        // Akış desteklemeyen servis: tek seferde gelen yanıt
        const data = await res.json();
        if (data.error) throw openaiError(500, data, "", model);
        text = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
        if (onDelta && text) { clock.tick(); onDelta(text, text); }
        tokens = (data.usage && data.usage.completion_tokens) || 0;
      } else {
        await readSSE(res, (obj) => {
          if (obj.error) throw openaiError(500, obj, "", model);
          const ch = obj.choices && obj.choices[0];
          const piece = ch && ch.delta && typeof ch.delta.content === "string" ? ch.delta.content : "";
          if (piece) {
            clock.tick();
            text += piece;
            if (onDelta) onDelta(piece, text);
          }
          if (obj.usage && obj.usage.completion_tokens) tokens = obj.usage.completion_tokens;
        }, signal);
      }
      // Bazı akıl yürüten modeller düşünceyi <think> içinde yazar: gösterme
      text = text.replace(/^\s*<think>[\s\S]*?<\/think>\s*/i, "");
      if (!text) throw new AIError("bad-response", "empty", { model });
      return { text, stats: clock.stats(tokens) };
    },

    async embed(model, inputs, signal) {
      if (!inputs.length) return [];
      const out = [];
      for (let i = 0; i < inputs.length; i += 64) {
        const part = inputs.slice(i, i + 64);
        const res = await send(this.base() + "/embeddings",
          { method: "POST", headers: this.headers(), body: JSON.stringify({ model, input: part }), signal }, model, openaiError);
        const data = await res.json();
        const rows = (data.data || []).slice().sort((a, b) => (a.index || 0) - (b.index || 0));
        if (rows.length !== part.length) throw new AIError("bad-response", "embeddings");
        rows.forEach((r) => out.push(r.embedding));
      }
      return out;
    }
  };

  App.cloud = { gemini, server, openai, PRESETS, pickGeminiModel, readSSE };
})();
