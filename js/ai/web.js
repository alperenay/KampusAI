/* =========================================================
   web.js — yapay zekanın "web_ara" aracı (internetten bilgi)

   Cihazdaki model (Ollama ya da indirilen) güncel ya da ders notlarında olmayan bir bilgi
   gerektiğinde bu aracı çağırır; biz Vikipedi'de arayıp ilk sonuçların özetini döndürürüz:
     web_ara({ sorgu: "Mimar Sinan" }) → "[W1] Mimar Sinan — https://tr.wikipedia.org/...\n<özet>"
   Vikipedi ücretsizdir, anahtar istemez ve tarayıcıdan doğrudan çağrılabilir (origin=*).
   Araç tanımı ve talimat modele her istekte gönderilir; araç çağırabilen modeller (Ollama'daki
   gemma4, qwen3.5 …) gerektiğinde kullanır.
   ========================================================= */
(function () {
  const TOOL = {
    type: "function",
    function: {
      name: "web_ara",
      description: "İnternette (Vikipedi) arama yapar ve en ilgili sonuçların kısa özetlerini [W1], [W2] diye numaralayarak döndürür. Güncel ya da ders notlarında olmayan bilgiler için kullan.",
      parameters: { type: "object", properties: { sorgu: { type: "string", description: "Kısa arama sorgusu, ör. Mimar Sinan eserleri" } }, required: ["sorgu"] }
    }
  };
  const INSTRUCTION_TR = "İnternet araması: Güncel bilgi (tarih, sınav takvimi, haber), ders müfredatı dışında kalan ya da emin olmadığın bir bilgi gerekiyorsa web_ara aracını kullan ve yanıtını bulunan sonuçlara dayandır; kullandığın sonucu cümlenin sonunda [W1] gibi etiketle. Ders konularını, soru çözümünü ve sohbeti kendi bilginle yanıtla, arama yapma.";
  const INSTRUCTION_EN = "Web search: If you need current information (dates, exam calendar, news), something outside the school curriculum, or a fact you're unsure of, use the web_ara tool and base your answer on the results; tag the result you used at the end of the sentence like [W1]. Answer school topics, problem solving and chat from your own knowledge without searching.";

  const cache = new Map();

  async function api(lang, params, signal) {
    const q = new URLSearchParams(Object.assign({ format: "json", formatversion: "2", origin: "*" }, params));
    const r = await fetch("https://" + lang + ".wikipedia.org/w/api.php?" + q, { signal });
    if (!r.ok) throw new Error("HTTP " + r.status);
    return r.json();
  }

  async function search(sorgu, signal) {
    sorgu = String(sorgu || "").trim().slice(0, 200);
    if (!sorgu) return "Hata: boş sorgu";
    if (cache.has(sorgu)) return cache.get(sorgu);
    const found = [];
    for (const lang of ["tr", "en"]) {
      const s = await api(lang, { action: "query", list: "search", srsearch: sorgu, srlimit: "3" }, signal);
      const titles = ((s.query && s.query.search) || []).map((x) => x.title);
      if (!titles.length) continue;
      const e = await api(lang, { action: "query", prop: "extracts", exintro: "1", explaintext: "1", exchars: "700", titles: titles.join("|") }, signal);
      const pages = {};
      ((e.query && e.query.pages) || []).forEach((p) => { pages[p.title] = p.extract || ""; });
      titles.forEach((t) => {
        const text = String(pages[t] || "").replace(/\s+/g, " ").trim();
        if (text) found.push({ t, url: "https://" + lang + ".wikipedia.org/wiki/" + encodeURIComponent(t.replace(/ /g, "_")), text });
      });
      if (found.length) break;
    }
    const out = found.length
      ? found.map((f, i) => "[W" + (i + 1) + "] " + f.t + " — " + f.url + "\n" + f.text).join("\n\n")
      : "Sonuç bulunamadı. Başka kelimelerle tekrar aranabilir.";
    cache.set(sorgu, out);
    return out;
  }

  /** Araç çağrısını çalıştır: { name, args } → sonuç metni (hata olsa da metin döner; model yanıtı sürdürür) */
  async function call(name, args, signal) {
    if (name !== "web_ara") return "Bilinmeyen araç: " + name;
    if (typeof args === "string") { try { args = JSON.parse(args); } catch (e) { args = { sorgu: args }; } }
    try { return await search((args && args.sorgu) || "", signal); }
    catch (e) { return "Hata: arama yapılamadı (" + String((e && e.message) || e).slice(0, 80) + ")"; }
  }

  App.web = {
    TOOL, call, search,
    instruction: () => (App.i18n && App.i18n.lang === "en" ? INSTRUCTION_EN : INSTRUCTION_TR),
    /** Ayarlar → Yapay zeka → "İnternetten bilgi ara" (varsayılan AÇIK; internet yoksa kullanılmaz) */
    enabled: () => App.prefs.get("aiWeb", true) !== false && navigator.onLine !== false
  };
})();
