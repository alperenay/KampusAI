/* =========================================================
   cite.js — Kaynak gösterme ve kaynak kontrolü

   Asistan öğrencinin kayıtlarından / konu notlarından (RAG) bulunan bilgileri
   kullanırken cümlenin sonuna [K1], [K2] … etiketi koyar (İngilizcede [R1]).
   Cevap bitince iki kontrol yapılır:
     1) Etiketler: geçerli numaralar tıklanabilir kaynağa dönüşür; var olmayan
        bir kayıt numarası (uydurma kaynak) temizlenir ve sayılır.
     2) Örtüşme: cevabın içerik cümlelerinin ne kadarının bulunan kayıtlarla
        kelime düzeyinde örtüştüğü ölçülür (Türkçe ekleri için kelime kökünün
        ilk 5 harfi karşılaştırılır). Model etiket koymayı unutsa bile cevabın
        notlara dayanıp dayanmadığı böylece görülür.
   Sonuç: { status: "good"|"partial"|"low"|"none", ratio, cited[], invalid, used[] }
   ve mesajın altında bir rozet: "Notlara dayanıyor", "Kısmen", "Notlarla az
   örtüşüyor — kontrol et", "Notlarda bulunamadı".
   ========================================================= */
(function () {
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const MARK = /\[(?:K|R|Kayıt |Record )\s?(\d{1,2})\]/g;

  function instruction() {
    return App.i18n.lang === "en"
      ? "CITING SOURCES: When a sentence uses information from one of the records above, end that sentence with the record's tag, e.g. [R1] or [R2][R3] (Record 1 → [R1]). Do not cite the overview. Never invent a record number. If you answer from your general knowledge, write it without a tag."
      : "KAYNAK GÖSTERME: Bir cümlede yukarıdaki kayıtlardan birinin bilgisini kullanırsan o cümlenin sonuna kaydın etiketini yaz, ör. [K1] ya da [K2][K3] (Kayıt 1 → [K1]). Genel özet için etiket koyma. Olmayan bir kayıt numarası asla yazma. Kendi genel bilginle yazdığın cümlelere etiket koyma.";
  }

  /* --- örtüşme ölçümü --- */
  const STOP = new Set(("bir bu şu ve ile için gibi daha çok olan olarak ise ama fakat veya yani kadar sonra önce göre "
    + "değil var yok olur olup oldu olduğu olduğunu olan mı mi mu mü de da ki ne nasıl neden hangi her şey bunu şunu "
    + "that this with from have will your about there their which would what when then than into also only such").split(" "));
  const stem = (w) => w.slice(0, 5);
  function words(s) {
    return String(s || "").toLocaleLowerCase("tr")
      .replace(/\$[^$]*\$/g, " ").replace(/[`*_#>|\[\]()\\{}=+\-–—:;,.!?"'“”‘’/]/g, " ")
      .split(/\s+/).filter((w) => w.length >= 4 && /^[a-zçğıöşü0-9]+$/.test(w) && !STOP.has(w));
  }
  function sentences(text) {
    return String(text || "").replace(MARK, " ").replace(/\$\$[\s\S]*?\$\$/g, " ")
      .split(/(?<=[.!?])\s+|\n+/).map((s) => s.trim()).filter(Boolean);
  }

  /** text: modelin cevabı; hits: [{ text, label, link }] (text = kaydın içeriği) */
  function analyze(text, hits) {
    hits = hits || [];
    const cited = new Set();
    let invalid = 0;
    String(text || "").replace(MARK, (m, n) => { n = Number(n); if (n >= 1 && n <= hits.length) cited.add(n); else invalid++; return m; });
    if (!hits.length) return { status: "none", ratio: 0, cited: [], invalid, used: [], checked: 0 };

    const hitStems = hits.map((h) => new Set(words(h.text).map(stem)));
    const hitSents = hits.map((h) => sentences(plain(h.text)).filter((x) => x.length >= 25 && x.length <= 260));
    const quoteBest = hits.map(() => ({ r: 0, s: "" }));
    const all = new Set(); hitStems.forEach((s) => s.forEach((x) => all.add(x)));
    const useCount = hits.map(() => 0);
    let checked = 0, supported = 0;
    sentences(text).forEach((s) => {
      const ws = [...new Set(words(s).map(stem))];
      if (ws.length < 4) return;                      // kısa cümleler (selam, soru) sayılmaz
      checked++;
      const inAll = ws.filter((w) => all.has(w)).length / ws.length;
      if (inAll >= 0.4) {
        supported++;
        let best = -1, bestR = 0;
        hitStems.forEach((hs, i) => { const r = ws.filter((w) => hs.has(w)).length / ws.length; if (r > bestR) { bestR = r; best = i; } });
        if (best >= 0 && bestR >= 0.3) {
          useCount[best]++;
          // Kayıttaki dayanak cümle: bu cevap cümlesiyle en çok örtüşen cümle
          hitSents[best].forEach((hs) => {
            const hw = new Set(words(hs).map(stem));
            const r = ws.filter((w) => hw.has(w)).length / ws.length;
            if (r > quoteBest[best].r) quoteBest[best] = { r, s: hs };
          });
        }
      }
    });
    const ratio = checked ? supported / checked : 0;
    const used = hits.map((h, i) => cited.has(i + 1) || useCount[i] >= 2);
    let status;
    if ((cited.size && ratio >= 0.35) || ratio >= 0.6) status = "good";
    else if (cited.size || ratio >= 0.25) status = "partial";
    else status = "low";
    const quotes = quoteBest.map((q) => (q.r >= 0.3 ? q.s : ""));
    return { status, ratio: Math.round(ratio * 100) / 100, cited: [...cited].sort((a, b) => a - b), invalid, used, checked, quotes };
  }

  /** Markdown / LaTeX işaretlerini atıp okunur düz metin yapar */
  function plain(text) {
    return String(text || "")
      .replace(/\$\$([\s\S]*?)\$\$/g, " $1 ").replace(/\$([^$\n]+)\$/g, "$1")
      .replace(/\\(?:text|mathrm|mathbf)\{([^}]*)\}/g, "$1").replace(/\\to\b/g, "→").replace(/\\(?:cdot|times)\b/g, "·")
      .replace(/\\[a-zA-Z]+/g, " ").replace(/[{}_^]/g, "")
      .replace(/^\s*#+\s*/gm, "").replace(/\*\*|__|`|^>\s?/gm, "").replace(/\|/g, " ").replace(/^\s*[-*]\s+/gm, "")
      .replace(/\s+/g, " ").trim();
  }
  /** Kayıt metninden kısa önizleme (ilk başlık satırlarını atlar) */
  function snippet(text) {
    const s = plain(String(text || "").replace(/^\s*(#+[^\n]*\n|\[[^\]]+\]\s*\n)+/, ""));
    return s.length > 220 ? s.slice(0, 217) + "…" : s;
  }

  /** Render edilmiş HTML'deki [K1] etiketlerini kaynağa giden küçük bağlantılara çevirir */
  function decorate(html, sources) {
    const hits = (sources && sources.hits) || [];
    return String(html).replace(/\[(?:K|R)(\d{1,2})\]/g, (m, n) => {
      const h = hits[Number(n) - 1];
      if (!h) return "";
      return '<a class="cite" href="' + App.utils.esc(h.link || "#") + '" title="' + App.utils.esc(h.label || "") + '">' + n + "</a>";
    });
  }

  /** Seslendirme, kopyalama ve geçmiş için etiketleri temizler */
  const strip = (text) => String(text || "").replace(MARK, "").replace(/[ \t]+([.,;:!?])/g, "$1");

  const LABEL = {
    good: () => T("Notlara dayanıyor", "Based on your notes"),
    partial: () => T("Kısmen notlara dayanıyor", "Partly based on notes"),
    low: () => T("Notlarla az örtüşüyor — kontrol et", "Little overlap with notes — check it"),
    none: () => T("Notlarda karşılığı bulunamadı", "Not found in the notes")
  };
  const HELP = {
    good: () => T("Cevabın büyük kısmı bulunan kayıtlarla örtüşüyor.", "Most of the answer matches the retrieved records."),
    partial: () => T("Cevabın bir kısmı kayıtlara dayanıyor, bir kısmı modelin genel bilgisi.", "Part of the answer is from the records, part is the model's general knowledge."),
    low: () => T("Cevap bulunan kayıtlarla az örtüşüyor; modelin genel bilgisinden gelmiş olabilir. Ders kitabından kontrol et.", "The answer barely matches the records and may come from general knowledge. Check your textbook."),
    none: () => T("Bu soru için uygun kayıt bulunamadı; cevap modelin genel bilgisinden geliyor. Ders kitabından kontrol et.", "No matching records were found; the answer comes from general knowledge. Check your textbook.")
  };

  App.cite = { instruction, analyze, snippet, plain, decorate, strip, label: (s) => LABEL[s](), help: (s) => HELP[s]() };
})();
