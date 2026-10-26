/* scaffolding.js — çözümü otomatik kopyalamayan üç basamaklı ipucu ve tüketim izi. */
(function () {
  function normalize(hints, question) {
    if (!Array.isArray(hints) || hints.length !== 3 || !hints.every((s) => typeof s === "string" && s.trim() && s.length <= 600)) return null;
    // Açık cevap sızıntısının temel örneklerini reddet; pedagojik incelemenin yerini tutmaz.
    if (hints.some((s) => /(?:doğru\s+(?:cevap|şık|seçenek)|correct\s+(?:answer|option)|(?:cevap|sonuç|answer|result)\s*[:=]|(?:cevap|answer)\s+[A-E]\b)/i.test(s))) return null;
    const plain = (s) => String(s || "").replace(/[$*_`\s]/g, "").toLowerCase();
    if (question && plain(question.explain).length > 8 && hints.some((s) => plain(s) === plain(question.explain))) return null;
    return hints.map((s) => s.trim());
  }
  function texts(q) {
    const custom = normalize(q.hints, q);
    return custom || [1, 2, 3].map((i) => App.t("hint.fallback" + i));
  }
  function consume(q, o, elapsedMs) {
    if (o.hintLevel >= 3) return null;
    if (!o.beforeHint) o.beforeHint = { confidence: o.confidence, reasonChoice: o.reasonChoice, reasonText: o.reasonText };
    o.hintLevel++;
    o.hintEvents.push({ level: o.hintLevel, atMs: Math.max(0, Math.round(elapsedMs)) });
    return texts(q)[o.hintLevel - 1];
  }
  function html(i) {
    const { esc } = App.utils, t = App.t;
    return '<section class="hint-ladder"><button class="btn btn--ghost" type="button" data-hint="' + i + '" aria-controls="hint-panel-' + i + '" aria-expanded="false">' +
      App.icon("lightbulb") + esc(t("hint.next", { n: 1 })) + '</button><ol id="hint-panel-' + i + '" class="hint-ladder__steps" aria-live="polite"></ol></section>';
  }
  App.scaffolding = { normalize, texts, consume, html };
})();
