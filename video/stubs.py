STUBS = r"""() => {
  // yapay zekâ cevapları (videoda gerçek ağ çağrısı yapılmaz)
  const ANS = [
    [/eğik|menzil/i, "**Kısa cevap: 45°.** Hava direnci yoksa yatay menzil\n\n$$R = \\frac{v_0^2 \\, \\sin 2\\alpha}{g}$$\n\nformülüyle bulunur.\n\n1. $\\sin 2\\alpha$ en büyük değerini (**1**) $2\\alpha = 90^\\circ$ iken alır.\n2. Bu yüzden $\\alpha = 45^\\circ$ atışta menzil en fazladır: $R_{max} = \\dfrac{v_0^2}{g}$.\n3. Örnek: $v_0 = 20\\ \\text{m/s}$, $g = 10\\ \\text{m/s}^2$ → $R_{max} = 40\\ \\text{m}$.\n\n> İpucu: 30° ve 60° gibi **tümler açılar** aynı menzili verir, ama 60°'de cisim daha yükseğe çıkar ve havada daha uzun kalır.\n\nİstersen bunu **Laboratuvar › Eğik atış** deneyinde açıyı değiştirerek kendin gözleyebilirsin."],
    [/fotosentez/i, "Fotosentez, bitkilerin ışık enerjisini kullanarak karbondioksit ve sudan **glikoz** ve **oksijen** üretmesidir. Kloroplastlarda gerçekleşir: önce ışığa bağlı tepkimelerde ATP ve NADPH üretilir, sonra Calvin döngüsünde karbondioksit glikoza dönüştürülür. Kısaca: karbondioksit + su + ışık → glikoz + oksijen."],
    [/./, "Elbette! Bu konuyu adım adım birlikte çalışalım."]
  ];
  App.ai.run = async (o) => {
    const txt = (ANS.find((a) => a[0].test(o.text || "")) || ANS[2])[1];
    const on = o.on || {};
    if (on.engine) on.engine({ id: "cloud" });
    await new Promise((r) => setTimeout(r, 900));
    const n = 45, sz = Math.ceil(txt.length / n); const t0 = performance.now(); let full = "";
    for (let i = 0; i < txt.length; i += sz) { full = txt.slice(0, i + sz); if (on.delta) on.delta(full); await new Promise((r) => setTimeout(r, 40)); if (performance.now() - t0 > 3500) break; }
    return { text: txt, stats: { evalCount: 420, evalMs: 3100 }, models: [], engine: "cloud" };
  };
  // ses: konuşma sözcük sözcük ilerler (gerçek ses motoru yok)
  App.speech.ttsAvailable = () => true;
  App.speech.sttMode = () => "web";
  let sayT = null;
  App.speech.say = (text, o) => {
    o = o || {}; clearTimeout(sayT);
    const words = String(text || "").split(/\s+/).filter(Boolean); let i = 0, ch = 0;
    if (o.onStart) setTimeout(o.onStart, 10);
    const step = () => {
      if (i >= words.length) { if (o.onEnd) o.onEnd(); return; }
      if (o.onWord) try { o.onWord({ charIndex: ch, charLength: words[i].length, word: words[i] }); } catch (e) {}
      ch += words[i].length + 1; i++;
      sayT = setTimeout(step, 230);
    };
    sayT = setTimeout(step, 120);
    return Promise.resolve();
  };
  App.speech.stopSaying = () => { clearTimeout(sayT); };
  let heard = 0;
  App.speech.listen = (o) => {
    const mine = heard++ === 0;
    if (mine) {
      const q = "Fotosentez nedir, kısaca anlatır mısın?"; const w = q.split(" "); let k = 0;
      const tick = () => { k++; if (o.onLevel) o.onLevel(0.3 + Math.random() * 0.5); if (k <= w.length) { if (o.onPartial) o.onPartial(w.slice(0, k).join(" ")); setTimeout(tick, 260); } else if (o.onFinal) o.onFinal(q, q); };
      setTimeout(tick, 700);
      return { stop: async () => ({ text: q }) };
    }
    return { stop: async () => ({ text: "" }) };
  };
  // el modeli: kameradan değil, betikten gelen el kutuları (videoda kimsenin görüntüsü yok)
  window.__pred = [];
  const m3 = App.lab3d.mount; App.lab3d.mount = function () { const r = m3.apply(this, arguments); window.__S3 = r; return r; };
  window.__htModel = { detect: async () => window.__pred.map((p) => Object.assign({ score: 0.92 }, p)) };
}"""
