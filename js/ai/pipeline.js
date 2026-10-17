/* =========================================================
   pipeline.js — modellerin birlikte çalıştığı işlem hattı

   Yerel (Ollama):
     [fotoğraf varsa]  göz modeli    → soruyu/şekli yazıya döker   ("göz"; gemma4 gibi görseli kendisi
                                     anlayan modelde bu adım atlanır, fotoğraf doğrudan beyne gider)
     [veri açıksa]     bge-m3        → ilgili kayıtları bulur        ("hafıza")
                       gemma4:e4b    → hepsini birleştirip yanıtlar  ("beyin")
   İnternet (Gemini):
     [veri açıksa]     gemini-embedding-001 → ilgili kayıtlar
                       gemini-…-flash       → fotoğrafı görür ve yanıtlar
   Hangi motorun kullanılacağını engine.js seçer; otomatik modda yerel
   model yanıt vermezse aynı soru internet servisine gönderilir.

   Arayüz yalnızca App.ai.run(...) çağırır ve olayları dinler:
     on.stage(name, model)   "vision" | "memory" | "answer"
     on.visionDelta(text)    fotoğraf okunurken canlı metin
     on.sources(result)      bulunan kayıtlar
     on.delta(fullText)      yanıt yazılırken canlı metin
     on.warning(w)           bir adım atlanırsa (ör. bge-m3 yüklü değil) ya da internete geçilirse
     on.engine(engine, cfg)  kullanılan motor belli olunca
   ========================================================= */
(function () {
  const HISTORY_TURNS = 8;          // modele gönderilen önceki mesaj sayısı (bağlam taşmasın)
  const HISTORY_CHARS = 2500;       // önceki tek bir yanıtın en fazla uzunluğu

  function systemPrompt() {
    const tr = App.i18n.lang === "tr";
    const now = new Date();
    const date = now.toLocaleDateString(tr ? "tr-TR" : "en-US", { day: "numeric", month: "long", year: "numeric", weekday: "long" });
    return (tr ? [
      "Sen \"KampüsAI\"sın: lise öğrencilerine ve YKS'ye (TYT-AYT) hazırlananlara yardım eden sabırlı bir yapay zeka öğretmensin. Bugün: " + date + ".",
      "Kurallar:",
      "- Öğrenci hangi dilde yazıyorsa o dilde yanıt ver (varsayılan Türkçe).",
      "- Soruları adım adım ve anlaşılır çöz; soruda istenen her şeyi eksiksiz yanıtla (ör. kökler isteniyorsa kökleri tek tek bul). Çoktan seçmeli sorularda sonunda doğru şıkkı açıkça yaz.",
      "- Matematiksel ifadeleri LaTeX ile yaz: satır içinde $...$, ayrı satırda $$...$$.",
      "- Markdown kullan (kalın, liste, gerektiğinde tablo). Gereksiz uzatma.",
      "- \"ÖĞRENCİ VERİLERİ\" bölümü verilirse öğrencinin kişisel sorularında (netleri, programı, notları) bu verileri kullan; sayıları aynen aktar, veride olmayan bilgiyi uydurma, yoksa olmadığını söyle.",
      "- \"FOTOĞRAFTAN OKUNAN\" metin verilirse bu bir görme modelinin okumasıdır; anlamsız ya da eksik görünen yer varsa bunu belirt."
    ] : [
      "You are \"KampüsAI\": a patient AI tutor helping high-school students preparing for Turkey's YKS exams (TYT-AYT). Today: " + date + ".",
      "Rules:",
      "- Reply in the language the student writes in.",
      "- Solve questions step by step and clearly; answer everything the question asks (e.g. if it asks for the roots, find each root). For multiple choice, state the correct option at the end.",
      "- Write math in LaTeX: inline $...$, display $$...$$.",
      "- Use Markdown (bold, lists, tables when useful). Be concise.",
      "- If a \"STUDENT DATA\" section is given, use it for personal questions (scores, schedule, notes); quote numbers exactly, never invent data that isn't there, say so if it's missing.",
      "- If \"READ FROM PHOTO\" text is given, it comes from a vision model; point out anything that looks garbled or incomplete."
    ]).join("\n");
  }

  /** Sokratik mod (öğretmen modu): cevabı vermeden, ipuçları ve sorularla öğrencinin kendisinin bulmasını sağla */
  function socraticRules() {
    return App.i18n.lang === "tr" ? [
      "SOKRATİK MOD AÇIK (öğretmen modu). Bu mod yukarıdaki \"adım adım çöz\" kuralından önce gelir:",
      "- Sorunun cevabını ya da tam çözümünü hemen VERME. Amacın öğrencinin çözümü kendisinin bulması.",
      "- İlk yanıtta: soruyu kısaca anlamlandır, öğrencinin nereden başlayabileceğini düşündüren TEK bir yönlendirici soru sor ya da ilk adım için TEK bir küçük ipucu ver.",
      "- Öğrenci bir adım yazınca: doğruysa kısaca takdir et ve bir sonraki adıma yönelt; yanlışsa hatayı doğrudan söyleme, fark etmesini sağlayacak bir soru sor.",
      "- Her mesajda yalnızca bir ipucu ya da bir soru; en fazla 4-5 cümle. Gerekirse formülü hatırlat ama yerine koyma.",
      "- Öğrenci \"ipucu ver\" derse bir sonraki küçük ipucunu ver. \"Çözümü göster\" derse ya da üç ipucuna rağmen ilerleyemiyorsa tam çözümü adım adım ver, doğru şıkkı yaz ve sonunda kendini sınaması için benzer kısa bir soru öner.",
      "- Öğrencinin kişisel verileriyle ilgili sorular (netlerim, programım) ve sohbet için bu yöntemi kullanma; normal yanıt ver."
    ].join("\n") : [
      "SOCRATIC MODE ON (tutor mode). This overrides the \"solve step by step\" rule above:",
      "- Do NOT give the answer or the full solution right away. The goal is for the student to find it.",
      "- First reply: briefly frame the problem and ask ONE guiding question or give ONE small hint for the first step.",
      "- When the student writes a step: if right, praise briefly and point to the next step; if wrong, don't state the error, ask a question that helps them notice it.",
      "- One hint or one question per message, at most 4-5 sentences. You may recall a formula but don't plug in the numbers.",
      "- If the student says \"give me a hint\", give the next small hint. If they say \"show the solution\", or are still stuck after three hints, give the full step-by-step solution, state the correct option, and suggest a short similar question to check themselves.",
      "- Don't use this method for questions about the student's own data (scores, plan) or small talk; answer normally."
    ].join("\n");
  }

  function dataSection(found) {
    const tr = App.i18n.lang === "tr";
    const parts = [(tr ? "ÖĞRENCİ VERİLERİ (sitedeki kayıtlardan bulundu):" : "STUDENT DATA (retrieved from the app's records):"),
      "[" + (tr ? "Genel özet" : "Overview") + "]\n" + found.overview];
    found.hits.forEach((h, i) => parts.push("[" + (tr ? "Kayıt " : "Record ") + (i + 1) + "]\n" + h.text));
    return parts.join("\n\n");
  }

  function photoBlock(transcription, model) {
    const m = model ? " (" + model + ")" : "";
    return (App.i18n.lang === "tr" ? "FOTOĞRAFTAN OKUNAN" + m + ":\n" : "READ FROM PHOTO" + m + ":\n") + transcription;
  }

  const MAX_HISTORY_IMAGES = 2;     // görseli kendisi anlayan modellere önceki fotoğraflardan en fazla bu kadarı gider

  /** Kayıtlı sohbet mesajlarını modele gönderilecek biçime çevirir */
  function historyMessages(history, direct) {
    const msgs = [];
    const recent = history.slice(-HISTORY_TURNS);
    let imagesLeft = MAX_HISTORY_IMAGES;
    const withImage = new Set(recent.filter((m) => m.role === "user" && m.image).slice(-MAX_HISTORY_IMAGES).map((m) => m.id));
    recent.forEach((m) => {
      if (m.role === "user") {
        let content = m.text || "";
        const msg = { role: "user", content };
        if (m.transcription) msg.content = (content ? content + "\n\n" : "") + photoBlock(m.transcription);
        else if (m.image && direct && withImage.has(m.id) && imagesLeft-- > 0) msg.images = [String(m.image).split(",")[1]];
        else if (m.image) msg.content = (content ? content + "\n\n" : "") + (App.i18n.lang === "tr" ? "[Bu mesajda bir soru fotoğrafı vardı.]" : "[This message had a question photo.]");
        if (msg.content || msg.images) msgs.push(msg);
      } else if (m.role === "assistant" && m.text && !m.error) {
        msgs.push({ role: "assistant", content: m.text.length > HISTORY_CHARS ? m.text.slice(0, HISTORY_CHARS) + " …" : m.text });
      }
    });
    return msgs;
  }

  /**
   * opts: { text, image, history, useData, signal, on }
   * Dönen: { text, transcription, sources, models, stats, warnings, engine }
   */
  async function run(opts) {
    const engine = await App.engine.resolve(opts.signal);
    try {
      return await runWith(engine, opts);
    } catch (e) {
      // Otomatik mod: seçilen yol yanıt vermediyse diğerine geç (yerel kapalı → internet; internet yok/yoğun → cihaz)
      if (opts.signal && opts.signal.aborted) throw e;
      const alt = await App.engine.fallbackFor(engine, e, opts.signal);
      if (alt) {
        if (engine.kind === "local") App.engine.markLocalDown();
        if (opts.on && opts.on.warning) opts.on.warning({ code: "fallback", model: alt.name });
        const res = await runWith(alt, opts);
        res.warnings.unshift({ code: "fallback", model: alt.name });
        return res;
      }
      throw e;
    }
  }

  async function runWith(engine, opts) {
    const on = opts.on || {};
    const fire = (name, ...args) => { if (on[name]) on[name](...args); };
    await engine.prepare(opts.signal);
    const cfg = engine.config();
    const result = { text: "", transcription: "", sources: null, models: [], stats: null, warnings: [], engine: engine.id, direct: !!cfg.direct };
    fire("engine", engine, cfg);

    // 1) Göz: fotoğraftaki soruyu oku (görseli kendisi anlayan modellerde bu adım atlanır)
    if (opts.image && !cfg.direct) {
      fire("stage", "vision", cfg.visionModel);
      result.models.push({ role: "vision", model: cfg.visionModel });
      result.transcription = await App.vision.read(opts.image, opts.text, opts.signal, (piece, full) => fire("visionDelta", full), engine);
      fire("transcription", result.transcription);
    }

    // 2) Hafıza: öğrencinin kayıtlarında ara
    let found = null;
    if (opts.useData) {
      const memModel = cfg.embedModel || "BM25";
      fire("stage", "memory", memModel);
      // Kayıt araması yalnızca öğrencinin yazdığıyla yapılır: fotoğraftaki sorunun
      // rakamları deneme kayıtlarına benzediği için alakasız eşleşmeler doğuruyordu.
      const query = opts.text || "";
      try {
        found = await App.rag.retrieve(query, { engine, signal: opts.signal, onProgress: (i, n) => fire("memoryProgress", i, n) });
        result.models.push({ role: "memory", model: memModel });
      } catch (e) {
        // Bağlantı sorunlarında tüm istek başarısız olsun (otomatik modda internete geçilir)
        if (e && ["aborted", "offline", "net", "token", "file-origin", "auth", "no-key"].includes(e.code)) throw e;
        // Vektör modeli çalışmazsa (yüklü değil, kota vb.) kelime aramasına düş; yanıt yine verilir
        result.warnings.push({ code: e && e.code === "model-missing" ? "memory-missing" : "memory-failed", model: cfg.embedModel, message: e && e.message });
        fire("warning", result.warnings[result.warnings.length - 1]);
        try {
          found = await App.rag.retrieve(query, { lexical: true });
          result.models.push({ role: "memory", model: "BM25" });
        } catch (e2) { found = null; }
      }
      if (found) {
        result.sources = { hits: found.hits.map((h) => ({ label: h.label, link: h.link, kind: h.kind, score: h.score, snippet: App.cite ? App.cite.snippet(h.text) : "" })), overview: true, method: found.method };
        fire("sources", result.sources);
      }
    }

    // 3) Beyin: yanıtı yaz
    if (opts.image && cfg.direct) result.models.push({ role: "vision", model: cfg.chatModel });
    fire("stage", "answer", cfg.chatModel);
    result.models.push({ role: "answer", model: cfg.chatModel });
    let system = systemPrompt();
    if (opts.socratic) system += "\n\n" + socraticRules();
    if (found) system += "\n\n" + dataSection(found);
    if (found && found.hits.length && App.cite) system += "\n\n" + App.cite.instruction();

    let userContent = opts.text || (App.i18n.lang === "tr" ? "Fotoğraftaki soruyu çöz." : "Solve the question in the photo.");
    if (result.transcription) userContent += "\n\n" + photoBlock(result.transcription, cfg.visionModel);
    const userMsg = { role: "user", content: userContent };
    if (opts.image && cfg.direct) userMsg.images = [opts.image.base64];

    // Cihazdaki model (Ollama ya da indirilen): hesapları "hesapla" aracıyla yapsın (calc.js; YKS matematiğinde ölçüldü)
    const useCalc = engine.kind === "local" && App.calc && App.calc.enabled();
    if (useCalc) system += "\n\n" + App.calc.instruction();
    const messages = [{ role: "system", content: system }].concat(historyMessages(opts.history || [], cfg.direct), [userMsg]);
    let calcUsed = 0;
    const res = await engine.chat({
      model: cfg.chatModel,
      messages,
      options: { temperature: 0.4, num_ctx: 8192 },
      tools: useCalc ? [App.calc.TOOL] : undefined,
      onTool: useCalc ? (name, args) => { calcUsed++; const out = App.calc.call(name, args); fire("tool", { name, args, out }); return out; } : undefined,
      signal: opts.signal,
      onDelta: (piece, full) => { result.text = full; fire("delta", full); },
      onRetry: (alt) => { fire("delta", ""); fire("stage", "answer", alt); }
    });
    result.text = res.text;
    result.stats = res.stats;
    // Kaynak kontrolü: etiketler geçerli mi, cevap bulunan kayıtlarla ne kadar örtüşüyor?
    if (result.sources && App.cite) result.sources.check = App.cite.analyze(result.text, found ? found.hits : []);
    if (calcUsed) result.models.push({ role: "calc", model: App.i18n.lang === "en" ? "Calculator ×" + calcUsed : "Hesap makinesi ×" + calcUsed });
    // Yoğunluk nedeniyle başka model yanıtladıysa zincirde onu göster
    if (res.model && res.model !== cfg.chatModel) {
      result.models.forEach((m) => { if ((m.role === "answer" || (m.role === "vision" && cfg.direct)) && m.model === cfg.chatModel) m.model = res.model; });
    }
    // Yerel model: ne kadarı ekran kartında? (kısmen işlemcideyse yanıtlar çok yavaşlar)
    if (engine.kind === "local" && !engine.device) {
      try {
        const m = (await App.ollama.ps()).find((x) => App.ollama.sameModel(x.name, cfg.chatModel));
        if (m && m.size) result.gpu = { model: m.name, ratio: m.vram / m.size };
      } catch (e) { /* /api/ps yoksa önemli değil */ }
    }
    return result;
  }

  /* ---------------- Yapılandırılmış üretim (test soruları, haftalık plan) ----------------
     opts: { system, prompt, temperature, signal, onStage }
     Dönen: { data (JSON), text, engine, model } */
  /* Bazı modeller ayrı satırdaki formülün kapanışını bozuk yazıyor ("$$x = 1$|" ya da "$$x = 1$"): onar */
  function fixMath(s) {
    return s.replace(/(\$\$[^$\n]+?)\$\|/g, "$1$$$$")
      .replace(/^(\s*\$\$(?:(?!\$\$)[^\n])*?[^$\n])\$(?=[ \t]*$)/gm, "$1$$$$");
  }

  function parseJSON(text) {
    let s = String(text || "").trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
    const a = s.indexOf("{"), b = s.lastIndexOf("}");
    if (a < 0 || b <= a) throw new Error("json");
    s = s.slice(a, b + 1);
    let data;
    try { data = JSON.parse(s); }
    catch (e) {
      // Geçersiz kaçışlar (\land, \(, \underline …): tek ters bölüyü çiftle, geçerli kaçışlara dokunma
      let t = s.replace(/\\u(?![0-9a-fA-F]{4})|\\(["\\/bfnrtu])|\\/g, (m, c) => (c ? m : "\\\\" + m.slice(1)));
      // Metin içinde kaçırılmamış tırnaklar ("Simya" kelimesi gibi): hatanın hemen önündeki tırnağı kaçır, tekrar dene
      for (let i = 0; ; i++) {
        try { data = JSON.parse(t); break; }
        catch (e2) {
          const m = /after (property value|array element)[^\d]*(\d+)/.exec(e2.message) || /position (\d+)/.exec(e2.message);
          const pos = m ? Number(m[m.length - 1]) : -1;
          const q = pos > 0 ? t.lastIndexOf('"', pos - 1) : -1;
          if (i >= 40 || q <= 0 || !/after (property value|array element)/.test(e2.message)) throw e2;
          t = t.slice(0, q) + "\\" + t.slice(q);
        }
      }
    }
    // Modelin JSON'da kaçırmayı unuttuğu LaTeX komutlarını onar: "\frac" → form feed + "rac" gibi
    const fix = (v) => typeof v === "string"
      ? fixMath(v.replace(/\f(?=[a-z])/g, "\\f").replace(/\u0008(?=[a-z])/g, "\\b").replace(/\t(?=[a-z])/g, "\\t").replace(/\r(?=[a-z])/g, "\\r").replace(/\n(?=(eq|abla|ot|u |e |i ))/g, "\\n"))
      : Array.isArray(v) ? v.map(fix) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fix(x)])) : v;
    return fix(data);
  }

  async function generate(opts) {
    let engine = await App.engine.resolve(opts.signal);
    // opts.image / opts.images: data URL ya da { base64 } — doğrudan görebilen modele verilir, göremeyene önce yazıya dökülür
    // (opts.visionPrompt: yazıya dökme talimatı; ör. el yazısı çözüm için satır satır)
    const asImg = (x) => (typeof x === "string" ? { base64: x.split(",")[1] } : x);
    const images = (opts.images || (opts.image ? [opts.image] : [])).filter(Boolean).map(asImg);
    const once = async (eng) => {
      await eng.prepare(opts.signal);
      const cfg = eng.config();
      const userMsg = { role: "user", content: opts.prompt };
      if (images.length && cfg.direct) userMsg.images = images.map((i) => i.base64);
      else if (images.length) {
        if (opts.onStage) opts.onStage(eng, cfg.visionModel, "vision");
        for (let i = 0; i < images.length; i++) {
          const vp = typeof opts.visionPrompt === "function" ? opts.visionPrompt(i) : opts.visionPrompt;
          const tx = await App.vision.read(images[i], "", opts.signal, null, eng, vp);
          userMsg.content += "\n\n" + (images.length > 1 ? "[" + (i + 1) + "] " : "") + photoBlock(tx, cfg.visionModel);
        }
      }
      if (opts.onStage) opts.onStage(eng, cfg.chatModel);
      const res = await eng.chat({
        model: cfg.chatModel,
        messages: [{ role: "system", content: opts.system }, userMsg],
        options: { temperature: opts.temperature != null ? opts.temperature : 0.7, num_ctx: 8192, json: true },
        signal: opts.signal
      });
      return { data: parseJSON(res.text), text: res.text, engine: eng.id, model: res.model || cfg.chatModel };
    };
    try {
      return await once(engine);
    } catch (e) {
      const alt = !(opts.signal && opts.signal.aborted) ? await App.engine.fallbackFor(engine, e, opts.signal) : null;
      if (alt) {
        if (engine.kind === "local") App.engine.markLocalDown();
        return once(alt);
      }
      // JSON bozuk geldiyse bir kez daha dene
      if (e && (e.message === "json" || e instanceof SyntaxError)) return once(engine);
      throw e;
    }
  }

  /* ---------------- Ses kaydını yazıya çevirme (sesli Feynman, Windows uygulaması) ----------------
     Yalnızca Gemini tabanlı servislerde (KampüsAI sunucusu ya da kendi Gemini anahtarı) çalışır. */
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result).split(",")[1] || "");
      r.onerror = () => reject(r.error);
      r.readAsDataURL(blob);
    });
  }

  async function transcribe(blob, o) {
    o = o || {};
    const eng = App.engine.cloud();
    if (!eng || !eng.configured() || typeof eng.toContents !== "function") throw new App.engine.AIError("no-audio");
    await eng.prepare(o.signal);
    const tr = (o.lang || App.i18n.lang) === "tr";
    const prompt = tr
      ? "Bu ses kaydında bir öğrenci bir ders konusunu sesli anlatıyor. Söylenenleri olduğu gibi Türkçe yazıya dök. Anlamı düzeltme, özetleme, yorum ekleme. \"ııı\", \"eee\", \"şey\" gibi duraksamaları da duyduğun gibi yaz. Matematiksel ifadeleri söylendiği gibi kelimeyle yaz. Yalnızca metni döndür; ses yoksa boş döndür."
      : "In this recording a student explains a school topic aloud. Transcribe exactly what is said, in English. Do not correct, summarise or comment. Keep fillers like \"um\", \"uh\", \"like\" as heard. Write math as spoken words. Return only the text; return nothing if there is no speech.";
    const res = await eng.chat({
      model: eng.config().chatModel,
      messages: [{ role: "user", content: prompt, audio: [{ mime: blob.type || "audio/webm", data: await blobToBase64(blob) }] }],
      options: { temperature: 0 },
      signal: o.signal
    });
    return String(res.text || "").replace(/^["«]|["»]$/g, "").trim();
  }

  App.ai = { run, systemPrompt, generate, parseJSON, fixMath, transcribe };
})();
