/* ar-solve.js — Canlı AR Çözüm'ün (Modül 1) DOM'suz parçaları: istem, akış ayrıştırıcı, görüntü iyileştirme
   Node'da sınanır (tools/ar-check.mjs).

   Model cevabı satır satır, sabit anahtarlarla verir; böylece cevap akarken her adım biter bitmez
   kâğıdın üstünde belirir (tüm JSON'un bitmesi beklenmez):
     SORU: …   KONU: …   ADIM: … (birkaç)   CEVAP: …     ya da     OKUNAMADI: neden */
(function (G) {
  "use strict";
  const KEYS = {
    SORU: "question", QUESTION: "question", KONU: "topic", TOPIC: "topic", ADIM: "step", STEP: "step",
    CEVAP: "answer", ANSWER: "answer", "SONUÇ": "answer", OKUNAMADI: "unreadable", UNREADABLE: "unreadable"
  };
  function system(lang) {
    return lang === "en" ? [
      "You are a patient high-school teacher (Turkish YKS exam). Solve the question in the photo.",
      "Reply ONLY in these lines, nothing else:",
      "QUESTION: a one-line summary of the question stem",
      "TOPIC: subject › topic",
      "STEP: one solution step (one short line; math as $...$)",
      "STEP: … (at most 8 steps; each follows from the previous one)",
      "ANSWER: the result (for multiple choice: letter and value, e.g. C) 12)",
      "If the question cannot be read or there is no question, reply only: UNREADABLE: reason (blurry, dark, cut off …)",
      "If there are several questions, solve the one in the middle of the frame."
    ].join("\n") : [
      "Sen sabırlı bir lise öğretmenisin (YKS: TYT-AYT). Fotoğraftaki soruyu çöz.",
      "Cevabını YALNIZCA şu satırlarla yaz, başka hiçbir şey yazma:",
      "SORU: soru kökünün tek satırlık özeti",
      "KONU: ders › konu",
      "ADIM: bir çözüm adımı (tek kısa satır; matematik $...$ ile)",
      "ADIM: … (en çok 8 adım; her adım bir öncekinden çıkar)",
      "CEVAP: sonuç (çoktan seçmeliyse şık ve değer, ör. C) 12)",
      "Soru okunamıyorsa ya da fotoğrafta soru yoksa yalnızca şunu yaz: OKUNAMADI: neden (bulanık, karanlık, kesik …)",
      "Fotoğrafta birden çok soru varsa çerçevenin ortasındakini çöz."
    ].join("\n");
  }
  /** Akan metni ayrıştır. done=false iken yarım kalan son satır beklemeye alınır. */
  function parse(text, done) {
    const out = { question: "", topic: "", steps: [], answer: "", unreadable: "", known: false };
    let lines = String(text || "").replace(/\r/g, "").split("\n");
    if (!done) lines = lines.slice(0, -1);                         // son satır henüz bitmedi
    let last = null;
    for (let raw of lines) {
      const ln = raw.replace(/\*\*|__/g, "").replace(/^\s*[-*•]\s+/, "").trim();   // kalın yazı ve madde imi
      if (!ln || /^```/.test(ln)) continue;
      const m = /^([A-Za-zÇĞİÖŞÜçğıöşü]+)(?:\s*\d+)?\s*[:：\-–)]\s*(.*)$/.exec(ln);
      const key = m && KEYS[m[1].toLocaleUpperCase("tr")];
      if (key) {
        out.known = true;
        const v = m[2].trim();
        if (key === "step") { out.steps.push(v); last = { k: "step", i: out.steps.length - 1 }; }
        else { out[key] = v; last = { k: key }; }
      } else if (!out.known && /^\d+[.)]\s+/.test(ln)) {            // biçime uymayan numaralı liste
        out.steps.push(ln.replace(/^\d+[.)]\s+/, "")); last = { k: "step", i: out.steps.length - 1 };
      } else if (last) {                                            // anahtarsız satır: öncekinin devamı
        if (last.k === "step") out.steps[last.i] += " " + ln; else out[last.k] += " " + ln;
      }
    }
    out.steps = out.steps.filter(Boolean);
    return out;
  }
  /** Okuma için görüntüyü iyileştir (RGBA yerinde): uç değerleri at, seviyeleri ger, hafif keskinleştir */
  function enhance(px, w, h) {
    const n = w * h, hist = new Uint32Array(256);
    for (let i = 0, j = 0; i < n; i++, j += 4) hist[(px[j] * 77 + px[j + 1] * 150 + px[j + 2] * 29) >> 8]++;
    let lo = 0, hi = 255, acc = 0;
    for (; lo < 255; lo++) { acc += hist[lo]; if (acc > n * 0.01) break; }
    acc = 0; for (; hi > 0; hi--) { acc += hist[hi]; if (acc > n * 0.01) break; }
    if (hi - lo < 24) return false;                                 // düz görüntü: dokunma
    const k = 255 / (hi - lo), src = new Uint8ClampedArray(px);
    for (let j = 0; j < n * 4; j++) if ((j & 3) !== 3) src[j] = (src[j] - lo) * k;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const j = (y * w + x) * 4;
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1) { px[j] = src[j]; px[j + 1] = src[j + 1]; px[j + 2] = src[j + 2]; continue; }
      for (let c = 0; c < 3; c++) {
        const i = j + c, b = (src[i - 4] + src[i + 4] + src[i - w * 4] + src[i + w * 4] + src[i]) / 5;
        px[i] = src[i] + 0.7 * (src[i] - b);                        // keskin harf kenarı (Uint8Clamped kırpar)
      }
    }
    return true;
  }
  G.ARSolve = { system, parse, enhance };
})(typeof self !== "undefined" ? self : globalThis);
