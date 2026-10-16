/* =========================================================
   vision.js — "Göz": fotoğraftaki soruyu okur

   Yerel modda (Ollama) görev paylaşımı: görme modeli (qwen2.5vl)
   soruyu ÇÖZMEZ; görseldeki metni, seçenekleri ve şekli eksiksiz
   yazıya döker. Çözümü daha güçlü olan ana model (qwen2.5:14b) yapar.
   Gemini gibi görseli kendisi anlayan modellerde bu adım atlanır;
   fotoğraf doğrudan ana modele gider (pipeline.js).
   ========================================================= */
(function () {
  const MAX_SIDE = 1280;     // modele giden görselin en uzun kenarı (piksel); büyük fotoğraflar yavaşlatır
  const QUALITY = 0.88;

  /** Dosya/blob → { dataUrl, base64, width, height } (JPEG, küçültülmüş) */
  function prepare(file) {
    return new Promise((resolve, reject) => {
      if (!file || !/^image\//.test(file.type || "")) return reject(new Error("not-image"));
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
        const w = Math.max(1, Math.round(img.naturalWidth * scale));
        const h = Math.max(1, Math.round(img.naturalHeight * scale));
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff";                       // saydam PNG'ler siyah görünmesin
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        const dataUrl = canvas.toDataURL("image/jpeg", QUALITY);
        resolve({ dataUrl, base64: dataUrl.split(",")[1], width: w, height: h });
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("decode")); };
      img.src = url;
    });
  }

  function prompt(userText) {
    const tr = App.i18n.lang === "tr";
    const lines = tr ? [
      "Bu görsel bir öğrencinin ders sorusu. Görevin soruyu ÇÖZMEK DEĞİL; görseldeki bilgiyi eksiksiz yazıya dökmek.",
      "1. Görseldeki tüm metni aynen yaz: soru kökü, öncüller (I, II, III), seçenekler (A, B, C, D, E). Matematiksel ifadeleri LaTeX ile yaz ($...$).",
      "2. Şekil, grafik, tablo veya geometrik çizim varsa ayrıntılı betimle: nokta adları, uzunluklar, açılar, eksen değerleri, tablo hücreleri.",
      "3. Okuyamadığın bir yer varsa [okunamadı] yaz, tahmin etme.",
      "Sadece bu bilgiyi ver; çözüm, yorum veya cevap ekleme."
    ] : [
      "This image is a student's question. Your job is NOT to solve it; transcribe everything in it completely.",
      "1. Write all text exactly: question stem, statements (I, II, III), options (A, B, C, D, E). Write math in LaTeX ($...$).",
      "2. If there is a figure, graph, table or geometric drawing, describe it in detail: point labels, lengths, angles, axis values, table cells.",
      "3. If something is unreadable, write [unreadable]; do not guess.",
      "Give only this information; no solution, comments or answer."
    ];
    if (userText) lines.push((tr ? "Öğrencinin mesajı: " : "Student's message: ") + "«" + userText + "»");
    return lines.join("\n");
  }

  /** Görseli okur; onDelta ile okuma canlı gösterilir. Dönen değer: okunan metin */
  async function read(image, userText, signal, onDelta, engine, customPrompt) {
    engine = engine || App.engine.local;
    const { visionModel } = engine.config();
    const res = await engine.chat({
      model: visionModel,
      messages: [{ role: "user", content: customPrompt || prompt(userText), images: [image.base64] }],
      options: { temperature: 0.1, num_ctx: 8192 },
      think: false,             // yazıya dökmek düşünme gerektirmez; açık kalırsa metin boş dönebiliyor
      signal,
      onDelta
    });
    return res.text.trim();
  }

  App.vision = { prepare, read, MAX_SIDE };
})();
