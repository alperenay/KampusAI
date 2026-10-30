/* Local text extraction only. Original files/images are never persisted or auto-uploaded. */
(function () {
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const limit = (s) => {
    if (s.length > 60000)
      throw new Error(
        T(
          "Belge çok uzun; en fazla 60.000 karakterlik bir bölüm seç.",
          "Select a section of at most 60,000 characters.",
        ),
      );
    return s;
  };
  async function read(file, signal) {
    if (!file || file.size > 12 * 1024 * 1024)
      throw new Error(
        T("En fazla 12 MB dosya seç.", "Choose a file up to 12 MB."),
      );
    const check = () => {
      if (signal?.aborted) throw new DOMException("Cancelled", "AbortError");
    };
    const data = new Uint8Array(await file.arrayBuffer());
    check();
    if (/\.pdf$/i.test(file.name)) {
      const moduleUrl = new URL("assets/vendor/pdfjs/pdf.js", document.baseURI)
        .href;
      const pdfjs = await import(moduleUrl);
      check();
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "assets/vendor/pdfjs/pdf.worker.js",
        document.baseURI,
      ).href;
      const loading = pdfjs.getDocument({
        data,
        isEvalSupported: false,
        disableFontFace: true,
        useSystemFonts: false,
        useWorkerFetch: false,
        stopAtErrors: true,
        verbosity: 0,
      });
      const cancel = () => {
        loading.destroy().catch(() => {});
      };
      signal?.addEventListener("abort", cancel, { once: true });
      try {
        const doc = await loading.promise;
        check();
        if (doc.numPages > 60)
          throw new Error(
            T(
              "En fazla 60 sayfa; belgeyi bölerek yükle.",
              "Split documents longer than 60 pages.",
            ),
          );
        let result = "";
        for (let n = 1; n <= doc.numPages; n++) {
          check();
          const p = await doc.getPage(n),
            content = await p.getTextContent();
          result +=
            "\n[" +
            T("Sayfa ", "Page ") +
            n +
            "]\n" +
            content.items
              .map((x) => ("str" in x ? x.str + (x.hasEOL ? "\n" : " ") : ""))
              .join("");
          p.cleanup();
          limit(result);
        }
        if (result.replace(/\[(Sayfa|Page) \d+\]/g, "").trim().length < 40)
          throw new Error(
            T(
              "Bu PDF tarama/görsel olabilir. Metin katmanı bulunamadı; sayfa fotoğrafını Defterden Not’a ekle veya metin yapıştır.",
              "No readable text layer. Import page photos into Notebook Notes or paste text.",
            ),
          );
        return result.trim();
      } finally {
        signal?.removeEventListener("abort", cancel);
        await loading.destroy();
      }
    }
    if (/\.(docx|odt|odp|ods)$/i.test(file.name)) {
      const odf = !/\.docx$/i.test(file.name);
      const entry = odf ? 'content.xml' : 'word/document.xml';
      await App.utils.loadScript("assets/vendor/fflate/fflate.js");
      check();
      const entries = window.fflate.unzipSync(data, {
        filter: (f) => {
          if (f.name !== entry) return false;
          if (f.originalSize > 4 * 1024 * 1024)
            throw new Error("DOCX text limit");
          return true;
        },
      });
      if (!entries[entry])
        throw new Error(
          T("Geçerli bir DOCX belgesi seç.", "Choose a valid DOCX file."),
        );
      const xml = new TextDecoder().decode(entries[entry]);
      if (/<!DOCTYPE|<!ENTITY/i.test(xml))
        throw new Error("Unsupported XML declarations");
      const doc = new DOMParser().parseFromString(xml, "application/xml");
      if (doc.querySelector("parsererror")) throw new Error("Invalid DOCX XML");
      if (odf) return limit(Array.from(doc.getElementsByTagName('*')).filter(x => ['p', 'h'].includes(x.localName)).map(x => x.textContent).join('\n'));
      return limit(
        Array.from(doc.getElementsByTagNameNS("*", "p"))
          .map((p) =>
            Array.from(p.getElementsByTagNameNS("*", "t"))
              .map((t) => t.textContent)
              .join(""),
          )
          .join("\n"),
      );
    }
    if (!/\.(txt|md)$/i.test(file.name))
      throw new Error(
        T("PDF, DOCX, ODF, TXT veya MD seç.", "Choose PDF, DOCX, ODF, TXT or MD."),
      );
    return limit(new TextDecoder("utf-8", { fatal: true }).decode(data));
  }
  async function photo(file) {
    if (
      !file ||
      !/^image\/(jpeg|png|webp)$/.test(file.type) ||
      file.size > 12 * 1024 * 1024
    )
      throw new Error(
        T(
          "En fazla 12 MB JPEG/PNG/WebP görsel seç.",
          "Choose a JPEG/PNG/WebP image up to 12 MB.",
        ),
      );
    const url = URL.createObjectURL(file),
      im = new Image();
    try {
      await new Promise((resolve, reject) => {
        im.onload = resolve;
        im.onerror = () =>
          reject(new Error(T("Görsel açılamadı.", "Cannot open image.")));
        im.src = url;
      });
      if (im.naturalWidth * im.naturalHeight > 50000000)
        throw new Error(T("Görsel çok büyük.", "Image dimensions too large."));
      const scale = Math.min(
          1,
          1800 / Math.max(im.naturalWidth, im.naturalHeight),
        ),
        canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(im.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(im.naturalHeight * scale));
      canvas.getContext("2d").drawImage(im, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/jpeg", 0.87);
    } finally {
      URL.revokeObjectURL(url);
    }
  }
  App.documentImport = { read, photo };
})();
