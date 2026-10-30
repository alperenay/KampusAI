/* =========================================================
   sanitize.js — dışarıdan gelen HTML'i izin listesinden geçirir (v1.64)

   Kayıtlı, eşitlenmiş ya da içe aktarılan ders içeriği "<" ile başlıyorsa HTML olarak
   çizilir; bu içerik güvenilmezdir (1.60 güvenlik incelemesi: kayıtlı XSS). Süzgeç:
     • betik, stil, çerçeve, form, SVG/MathML gibi etiketleri içerikleriyle birlikte atar
     • izin listesinde olmayan etiketlerin yalnız metnini bırakır
     • yalnız listedeki öznitelikleri tutar (on*, style, id, class, data-* silinir)
     • bağlantı: http(s), mailto ve uygulama içi (#/); resim: https, data:image (SVG değil) ve göreli yol
   Ayrıştırma betik çalıştırmayan ayrı bir belgede (DOMParser) yapılır: süzülürken hiçbir şey
   yüklenmez ya da çalışmaz. İçerik güvenlik politikası (index.html, CSP) ikinci savunma hattıdır.

   App.sanitize.html(dize) → güvenli HTML dizesi
   ========================================================= */
(function () {
  const HTML_NS = "http://www.w3.org/1999/xhtml";
  const ALLOWED = new Set(("p br hr h1 h2 h3 h4 h5 h6 strong b em i u s del ins mark small sub sup code pre kbd q " +
    "blockquote abbr ul ol li dl dt dd table thead tbody tfoot tr th td caption colgroup col div span figure figcaption " +
    "img a details summary").split(" "));
  const DROP = new Set(("script style template noscript iframe frame frameset object embed applet form input button " +
    "textarea select option link meta base svg math audio video source track canvas dialog title xmp plaintext").split(" "));
  const ATTRS = {
    "*": ["title", "lang", "dir"],
    a: ["href"], img: ["src", "alt", "width", "height"], abbr: ["title"],
    td: ["colspan", "rowspan"], th: ["colspan", "rowspan", "scope"],
    ol: ["start", "reversed", "type"], col: ["span"], colgroup: ["span"]
  };
  const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
  /** Ayrıştırıcının görmezden geldiği boşluk ve denetim karakterleri adresten çıkarılır ("java\tscript:" gibi) */
  const bare = (v) => String(v || "").replace(/[\u0000- \u007f-\u009f]/g, "");
  const safeHref = (u) => /^(https?:|mailto:|#)/i.test(u);
  const safeSrc = (u) => /^(https:|data:image\/(png|jpe?g|gif|webp)[;,])/i.test(u) || (!HAS_SCHEME.test(u) && !u.startsWith("//") && u !== "");

  function clean(node) {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === 3) continue;                                  // metin
      if (child.nodeType !== 1) { child.remove(); continue; }              // yorum vb.
      const tag = child.localName;
      if (child.namespaceURI !== HTML_NS || DROP.has(tag)) { child.remove(); continue; }
      clean(child);
      if (!ALLOWED.has(tag)) { child.replaceWith(...Array.from(child.childNodes)); continue; }
      const keep = ATTRS["*"].concat(ATTRS[tag] || []);
      for (const a of Array.from(child.attributes)) if (keep.indexOf(a.name) < 0) child.removeAttribute(a.name);
      if (tag === "a") {
        const href = bare(child.getAttribute("href"));
        if (!href || !safeHref(href)) child.removeAttribute("href");
        else if (/^https?:/i.test(href)) { child.setAttribute("target", "_blank"); child.setAttribute("rel", "noopener noreferrer"); }
      } else if (tag === "img") {
        const src = bare(child.getAttribute("src"));
        if (!safeSrc(src)) { child.remove(); continue; }
        child.setAttribute("loading", "lazy");
        child.setAttribute("decoding", "async");
        child.setAttribute("referrerpolicy", "no-referrer");
      }
    }
  }

  function html(input) {
    const s = String(input == null ? "" : input);
    if (!s.trim()) return "";
    const doc = new DOMParser().parseFromString("<!doctype html><html><body>" + s, "text/html");
    clean(doc.body);
    return doc.body.innerHTML;
  }

  App.sanitize = { html };
})();
