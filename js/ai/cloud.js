/* =========================================================
   cloud.js — internet üzerinden çalışan yapay zeka servisleri

   0. KampüsAI sunucusu (varsayılan, ayar gerektirmez): Gemini'nin
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
  const NOT_CHAT = /(embedding|tts|live|image|imagen|veo|lyria|audio|transcribe|robotics|translate|aqa|research|antigravity|computer|nano-banana|learnlm)/i;

  /* Hız ölçümü (Ekim 2026, ücretsiz anahtar, sunucu üzerinden):
       gemini-3.5-flash-lite  ilk kelime ~0,4 sn, yanıt ~1,7 sn   ← "Hızlı" (varsayılan)
       gemini-3.6-flash       ilk kelime ~4 sn,   yanıt ~7 sn
       gemini-3.8-flash       ilk kelime ~9-12 sn (önce uzun süre "düşünüyor")
     Flash modellerinin ücretsiz günlük kotası da Flash-Lite'a göre çok daha düşük. */
  const gver = (n) => { const m = n.match(/gemini-(\d+(?:\.\d+)?)/); return m ? parseFloat(m[1]) : 0; };
  const isGemma = (n) => /^gemma-4-/.test(n);

  /**
   * Model sıralaması (ilk = otomatik seçilen, sonrakiler yoğunlukta yedek).
   * speed "fast"  : kararlı Flash-Lite → kararlı Flash → önizlemeler
   * speed "smart" : kararlı Flash → kararlı Flash-Lite → önizlemeler
   */
  function rankGeminiModels(names, speed) {
    const chat = names.filter((n) => ((/^gemini-/.test(n) && /-flash/.test(n)) || isGemma(n)) && !NOT_CHAT.test(n));
    const lite = (n) => /lite/.test(n), pre = (n) => /preview|exp/.test(n);
    // Gemma 4 (açık model): Flash'ların kotası dolunca yedek. Önce hızlı olan 26B (MoE), sonra 31B.
    const tier = (n) => (isGemma(n) ? 2 : pre(n) ? 3 : (speed === "smart" ? !lite(n) : lite(n)) ? 0 : 1);
    const gemmaSira = (n) => (/a4b|moe/.test(n) ? 0 : 1);
    return chat.sort((a, b) => tier(a) - tier(b) || (isGemma(a) && isGemma(b) ? gemmaSira(a) - gemmaSira(b) : gver(b) - gver(a)));
  }

  function pickGeminiModel(names, speed) {
    const ranked = rankGeminiModels(names.slice(), speed || "fast");
    if (ranked.length) return ranked[0];
    const chat = names.filter((n) => /^gemini-/.test(n) && !NOT_CHAT.test(n)).sort((a, b) => gver(b) - gver(a));
    return chat[0] || null;
  }

  function geminiError(status, body, text, model) {
    const err = (body && body.error) || {};
    const msg = err.message || text || ("HTTP " + status);
    const st = err.status || "";
    if (/api key|API_KEY/i.test(msg) || st === "UNAUTHENTICATED" || status === 401 || (status === 403 && st === "PERMISSION_DENIED")) return new AIError("auth", msg, { status });
    if (status === 429 || st === "RESOURCE_EXHAUSTED") return new AIError("quota", msg, { status, model });
    if (status === 503 || status === 502 || status === 504 || st === "UNAVAILABLE" || st === "DEADLINE_EXCEEDED") return new AIError("busy", msg, { status, model });
    // Gemma bazen geçici "Internal error" (500) veriyor: yoğunluk gibi davran, sıradaki modeli dene
    if (status === 500 || st === "INTERNAL") return new AIError("busy", msg, { status, model });
    if (status === 404 || st === "NOT_FOUND") return new AIError("model-missing", msg, { status, model });
    return new AIError("http", msg, { status, model });
  }

  /**
   * Gemini motoru üretir. İki örneği var:
   *   gemini : kullanıcının kendi anahtarı (doğrudan Google'a)
   *   server : KampüsAI sunucusu (Cloudflare) — anahtar sunucuda, kullanıcı hiçbir şey girmez
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
        // Rastgele cihaz kimliği: sunucu ortak ücretsiz kotayı cihaz başına paylaştırır (kişisel bilgi değil)
        let id = App.prefs.get("srvCihaz", "");
        if (!id) { id = Array.from(crypto.getRandomValues(new Uint8Array(9)), (b) => b.toString(36).padStart(2, "0")).join("").slice(0, 16); App.prefs.set("srvCihaz", id); }
        return { "Content-Type": "application/json", "X-DA-Cihaz": id };
      }
      const k = this.key();
      if (!k) throw new AIError("no-key", "", { provider: o.id });
      return { "Content-Type": "application/json", "x-goog-api-key": k };
    },

    async listModels(signal) {
      const request = App.aiRequest.scope(signal,{connectMs:8000,totalMs:10000});
      try {
        const res=await send(this.base()+"/models?pageSize=1000",{headers:this.headers(),signal:request.signal},null,geminiError);
        const data=await res.json();request.check();
        return (data.models||[]).map(m=>({name:String(m.name||"").replace(/^models\//,""),label:m.displayName||"",methods:m.supportedGenerationMethods||[]})).filter(m=>m.name);
      } catch(e) { throw request.failure(e); } finally { request.close(); }
    },

    /** "fast" (Flash-Lite, varsayılan) ya da "smart" (Flash) */
    speed: () => (str(P + "Speed") === "smart" ? "smart" : "fast"),

    /** Keep the selected model across questions; discovery is only for setup/settings/failure. */
    async prepare(signal, force) {
      if (signal && signal.aborted) throw new AIError("aborted");
      if (str(P + "Model")) return;
      const context = this.base() + "|" + this.key() + "|" + this.speed();
      const sameSpeed = str(P + "AutoSpeed") === this.speed();
      const sameBase = !str(P + "AutoBase") || str(P + "AutoBase") === this.base();
      if (!force && sameSpeed && sameBase && str(P + "AutoModel")) return;
      if (!this._preparing || this._prepareContext !== context) {
        this._prepareContext = context;
        const pending = this.listModels().then(list => {
          if (context !== this.base() + "|" + this.key() + "|" + this.speed()) return;
          const picked = pickGeminiModel(list.filter(m => m.methods.includes("generateContent")).map(m => m.name), this.speed());
          if (picked) {
            App.prefs.set(P + "AutoModel", picked); App.prefs.set(P + "AutoAt", Date.now());
            App.prefs.set(P + "AutoSpeed", this.speed()); App.prefs.set(P + "AutoBase", this.base());
          }
          this._ranked = null;
        });
        this._preparing = pending;
        pending.finally(() => { if (this._preparing === pending) this._preparing = null; }).catch(() => {});
      }
      const request = App.aiRequest.scope(signal, {connectMs:10000,totalMs:11000});
      try { await request.wait(this._preparing); } catch(e) { throw request.failure(e); } finally { request.close(); }
    },

    async check(signal) {
      const list = await this.listModels(signal);
      const names = list.map((m) => m.name);
      const chatModels = list.filter((m) => m.methods.includes("generateContent") && !NOT_CHAT.test(m.name)).map((m) => m.name);
      if (!str(P + "Model") && (!names.includes(str(P + "AutoModel")) || str(P + "AutoSpeed") !== this.speed() || (str(P + "AutoBase") && str(P + "AutoBase") !== this.base()))) {
        const picked = pickGeminiModel(chatModels, this.speed());
        if (picked) { App.prefs.set(P + "AutoModel", picked); App.prefs.set(P + "AutoAt", Date.now()); App.prefs.set(P + "AutoSpeed", this.speed()); App.prefs.set(P + "AutoBase", this.base()); }
        this._ranked = null;
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
        (m.audio || []).forEach((x) => parts.push({ inlineData: { mimeType: x.mime || "audio/webm", data: x.data } }));
        // Bağlantıyla dosya (ör. herkese açık YouTube videosu): Gemini kendisi açar
        (m.files || []).forEach((f) => parts.push({ fileData: f.mime ? { fileUri: f.uri, mimeType: f.mime } : { fileUri: f.uri } }));
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
     * seçildiyse, sıradaki modelle tekrar dener (en fazla 3 yedek: diğer Flash'lar, sonra Gemma 4).
     * Dönen: { text, stats, model }  (model: yanıtı gerçekten veren model)
     */
    async chat(opts) {
      const auto = !str(P + "Model");
      const BUSY_MS = 10 * 60 * 1000;                     // yoğun model 10 dk boyunca atlanır
      const busy = (() => { try { return JSON.parse(App.prefs.get(P + "Busy", "{}") || "{}"); } catch (e) { return {}; } })();
      const saveBusy = () => App.prefs.set(P + "Busy", JSON.stringify(busy));
      const isBusy = (n) => busy[n] && busy[n] > Date.now();
      // Complexity still changes reasoning settings, but never triggers model discovery.
      const ranked = async () => {
        const speed = this.speed();
        if (!this._ranked || this._rankedSpeed !== speed) {
          this._ranked = rankGeminiModels((await this.listModels(opts.signal)).filter((m) => m.methods.includes("generateContent")).map((m) => m.name), speed);
          this._rankedSpeed = speed;
        }
        return this._ranked;
      };
      const deadline = Date.now() + (opts.options?.smallTalk ? 22000 : opts.options?.json ? 180000 : 120000);
      const tried = [];
      let model = opts.model, lastErr = null;
      // Az önce yoğun olduğu görülen modeli hiç denemeden sıradakine geç (her soruda saniyeler kaybetmemek için)
      if (auto && isBusy(model)) {
        try { model = (await ranked()).find((n) => !isBusy(n)) || model; } catch (e) { /* liste yoksa aynı modelle dene */ }
      }
      if(model!==opts.model && opts.onRetry)opts.onRetry(model);
      for (let attempt = 0; attempt < 2; attempt++) {
        tried.push(model);
        try {
          const res = await this.chatOnce(Object.assign({}, opts, { model, deadline }));
          res.model = res.model || model;
          if (busy[model]) { delete busy[model]; saveBusy(); }
          if (auto && model !== opts.model) {
            App.prefs.set(P + "AutoModel", model); App.prefs.set(P + "AutoSpeed", this.speed());
            App.prefs.set(P + "AutoBase", this.base()); App.prefs.set(P + "AutoAt", Date.now());
          }
          return res;
        } catch (e) {
          lastErr = e;
          // Sunucu kota dolunca yedek modelleri zaten kendisi dener: 429 gelirse tekrar denemek boşa kota yer
          const retryable = e && (e.code === "busy" || (e.code === "quota" && !o.server) || e.code === "model-missing" || e.code === "timeout") && !e.partial;
          // Elle seçilmiş model Google'da artık yoksa (eski sürümden kalan ad) otomatik sıradaki modele geç
          if (!retryable || attempt === 1 || Date.now() >= deadline || (!auto && e.code !== "model-missing") || (opts.signal && opts.signal.aborted)) throw e;
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

    async chatOnce({ model, messages, options, signal, onDelta, deadline, profile }) {
      const media=messages.some(m=>m.images?.length||m.audio?.length||m.files?.length), deep=media||options?.json||profile==="complex";
      const request = App.aiRequest.scope(signal,{connectMs:deep?30000:12000,firstMs:deep?45000:18000,totalMs:Math.max(1,(deadline||Date.now()+120000)-Date.now())}); signal = request.signal;
      let text = "";
      const clock = timer();
      try {
      const { system, contents } = this.toContents(messages);
      const body = { contents, generationConfig: { temperature: options && options.temperature != null ? options.temperature : 0.4 } };
      // Çıktı bütçesi Gemini'ye verilmez: maxOutputTokens düşünme jetonlarını da sayar, JSON yarıda kesilebilir.
      if (system) body.systemInstruction = { parts: [{ text: system }] };
      // Gemini 3 Flash modelleri varsayılan olarak uzun "düşünür" (ilk kelime 10 sn'yi bulabiliyor):
      // düşünmeyi "low" seviyesine çek. Desteklemeyen model 400 verirse ayarsız tekrar dene.
      if (options && options.json) body.generationConfig.responseMimeType = "application/json";
      // Video için düşük çözünürlük: saniye başına çok daha az jeton (uzun ders videoları sığsın)
      if (options && options.mediaResolution && !this._noMediaRes) body.generationConfig.mediaResolution = options.mediaResolution;
      const liteThinking = /^gemini-3\.(?:1|5)-flash-lite(?:$|-)/.test(model);
      const thinkable = gver(model) >= 3 && /-flash/.test(model) && (!/lite/.test(model) || liteThinking) && !this._noThinking;
      if (thinkable) body.generationConfig.thinkingConfig = { thinkingLevel: liteThinking ? "minimal" : "low" };
      if (options?.smallTalk && /lite/.test(model)) body.generationConfig.maxOutputTokens = 256;
      const url = this.base() + "/models/" + encodeURIComponent(model) + ":streamGenerateContent?alt=sse";
      let res;
      try {
        res = await send(url, { method: "POST", headers: this.headers(), body: JSON.stringify(body), signal }, model, geminiError);
      } catch (e) {
        const thinkErr = thinkable && e && e.status === 400 && /think/i.test(e.message || "");
        const mediaErr = body.generationConfig.mediaResolution && e && e.status === 400 && /media_?resolution/i.test(e.message || "");
        if (!thinkErr && !mediaErr) throw e;
        if (thinkErr) { this._noThinking = true; delete body.generationConfig.thinkingConfig; }
        if (mediaErr) { this._noMediaRes = true; delete body.generationConfig.mediaResolution; }
        res = await send(url, { method: "POST", headers: this.headers(), body: JSON.stringify(body), signal }, model, geminiError);
      }

      request.ready();
      let tokens = 0, blocked = "";
      await readSSE(res, (obj) => {
        if (obj.error) throw geminiError(obj.error.code || 500, obj, "", model);
        const cand = obj.candidates && obj.candidates[0];
        const parts = (cand && cand.content && cand.content.parts) || [];
        parts.forEach((p) => {
          if (p.thought || typeof p.text !== "string" || !p.text) return;      // "düşünme" parçaları gösterilmez
          request.activity(); clock.tick();
          text += p.text;
          if (onDelta) onDelta(p.text, text);
        });
        if (obj.promptFeedback && obj.promptFeedback.blockReason) blocked = obj.promptFeedback.blockReason;
        if (cand && /SAFETY|PROHIBITED|BLOCKLIST|SPII/.test(cand.finishReason || "") && !text) blocked = cand.finishReason;
        if (obj.usageMetadata) tokens = obj.usageMetadata.candidatesTokenCount || tokens;
      }, signal);
      if (!text && blocked) throw new AIError("blocked", blocked, { model });
      if (!text) throw new AIError("bad-response", "empty", { model });
      // Sunucu kotası dolan modelin yerine başka modelle yanıtlamış olabilir
      request.check(text);
      return { text, stats: clock.stats(tokens), model: res.headers.get("X-KampusAI-Model") || model };
      } catch(error) { throw request.failure(error,text); } finally { request.close(); }
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
  /* KampüsAI sunucusu: adresi derleme sırasında js/config.js dosyasına yazılır */
  const server = makeGemini({ id: "server", name: "KampüsAI sunucusu", prefix: "srv", server: true,
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
      if (/openrouter\.ai/.test(this.base())) { h["X-Title"] = "KampusAI"; }
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
        if (m.role === "tool") return { role: "tool", tool_call_id: m.tool_call_id, content: m.content || "" };
        if (m.tool_calls) return { role: m.role, content: m.content || "", tool_calls: m.tool_calls };
        if (!m.images || !m.images.length) return { role: m.role, content: m.content || "" };
        const content = [];
        if (m.content) content.push({ type: "text", text: m.content });
        m.images.forEach((b64) => content.push({ type: "image_url", image_url: { url: "data:image/jpeg;base64," + b64 } }));
        return { role: m.role, content };
      });
    },

    /** Araç (tools) verilirse çağrıları onTool ile çalıştırıp yanıtı sürdürür (en fazla 8 tur) */
    async chat(o) {
      if (!o.tools || !o.tools.length || !o.onTool) return this.chatOnce(o);
      const msgs = o.messages.slice();
      let full = "", calls = 0, last = null;
      for (let round = 0; round < 8; round++) {
        let r;
        try {
          r = await this.chatOnce(Object.assign({}, o, {
            messages: msgs,
            onDelta: (piece) => { full += piece; if (o.onDelta) o.onDelta(piece, full); }
          }));
        } catch (e) {
          if (round === 0 && e && e.code === "http" && /tool/i.test(String(e.message))) return this.chatOnce(o);
          if (e && e.code === "bad-response" && full) return { text: full, stats: last && last.stats, toolCalls: calls };
          throw e;
        }
        last = r;
        if (!r.toolCalls || !r.toolCalls.length) return { text: full || r.text, stats: r.stats, toolCalls: calls };
        msgs.push({ role: "assistant", content: r.text || "", tool_calls: r.toolCalls });
        for (const c of r.toolCalls) {
          calls++;
          msgs.push({ role: "tool", tool_call_id: c.id, content: String(await o.onTool(c.function.name, c.function.arguments)) });
        }
      }
      return { text: full, stats: last && last.stats, toolCalls: calls };
    },

    async chatOnce({ model, messages, options, signal, onDelta, tools, deadline, profile }) {
      const media=messages.some(m=>m.images?.length||m.audio?.length||m.files?.length), deep=media||options?.json||profile==="complex";
      const request = App.aiRequest.scope(signal,{connectMs:deep?30000:12000,firstMs:deep?45000:18000,totalMs:Math.max(1,(deadline||Date.now()+120000)-Date.now())}); signal = request.signal;
      let text = "";
      const clock = timer();
      try {
      const body = {
        model,
        messages: this.toMessages(messages),
        stream: true,
        temperature: options && options.temperature != null ? options.temperature : 0.4
      };
      // OpenAI'nin akıl yürüten modelleri max_tokens'ı reddeder ve bütçeye düşünmeyi de katar; orada sınır verilmez.
      if (Number.isFinite(options?.num_predict) && !/api\.openai\.com/.test(this.base())) body.max_tokens = options.num_predict;
      if (tools && tools.length) body.tools = tools;
      const toolCalls = [];
      const res = await send(this.base() + "/chat/completions",
        { method: "POST", headers: this.headers(), body: JSON.stringify(body), signal }, model, openaiError);

      request.ready();
      let tokens = 0;
      const ctype = res.headers.get("content-type") || "";
      if (!/event-stream/.test(ctype)) {
        // Akış desteklemeyen servis: tek seferde gelen yanıt
        const data = await res.json();
        if (data.error) throw openaiError(500, data, "", model);
        const msg = (data.choices && data.choices[0] && data.choices[0].message) || {};
        text = msg.content || "";
        (msg.tool_calls || []).forEach((tc) => toolCalls.push(tc));
        if (onDelta && text) { request.activity(); clock.tick(); onDelta(text, text); }
        tokens = (data.usage && data.usage.completion_tokens) || 0;
      } else {
        await readSSE(res, (obj) => {
          if (obj.error) throw openaiError(500, obj, "", model);
          const ch = obj.choices && obj.choices[0];
          // Araç çağrıları parça parça gelir: index'e göre birleştir
          ((ch && ch.delta && ch.delta.tool_calls) || []).forEach((tc) => {
            const k = tc.index != null ? tc.index : toolCalls.length;
            const cur = toolCalls[k] || (toolCalls[k] = { id: tc.id || "call_" + k, type: "function", function: { name: "", arguments: "" } });
            if (tc.id) cur.id = tc.id;
            if (tc.function && tc.function.name) cur.function.name += tc.function.name;
            if (tc.function && tc.function.arguments) cur.function.arguments += tc.function.arguments;
          });
          const piece = ch && ch.delta && typeof ch.delta.content === "string" ? ch.delta.content : "";
          if (piece) {
            request.activity(); clock.tick();
            text += piece;
            if (onDelta) onDelta(piece, text);
          }
          if (obj.usage && obj.usage.completion_tokens) tokens = obj.usage.completion_tokens;
        }, signal);
      }
      // Bazı akıl yürüten modeller düşünceyi <think> içinde yazar: gösterme
      text = text.replace(/^\s*<think>[\s\S]*?<\/think>\s*/i, "");
      if (!text && !toolCalls.length) throw new AIError("bad-response", "empty", { model });
      request.check(text);
      return { text, stats: clock.stats(tokens), toolCalls: toolCalls.filter(Boolean) };
      } catch(error) { throw request.failure(error,text); } finally { request.close(); }
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

  App.cloud = { gemini, server, openai, PRESETS, pickGeminiModel, rankGeminiModels, readSSE };
})();
