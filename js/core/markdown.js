/* =========================================================
   markdown.js — model yanıtlarını güvenli HTML'e çevirir
   Desteklenen: başlık, kalın/italik/üstü çizili, satır içi kod,
   kod bloğu, madde ve numaralı liste, alıntı, tablo, yatay çizgi,
   LaTeX matematik ($...$, $$...$$, \(...\), \[...\]) → KaTeX.

   Güvenlik: tüm metin önce HTML'den kaçırılır; modelin yazdığı
   etiketler asla çalıştırılmaz. Bağlantılar yalnızca http(s) ve #/.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const MARK = "\u0000";          // satır içi parça (kod, satır içi formül)
  const DMARK = "\u0001";         // ayrı satır formül: kendi bloğu olur, paragrafa sarılmaz
  const isDisplayLine = (line) => new RegExp("^\\s*" + DMARK + "\\d+" + DMARK + "\\s*$").test(line);

  function renderMath(tex, display) {
    if (window.katex) {
      try {
        // data-tex: formülün kaynağı (sesli okumada formül okunabilir metne çevrilir — a11y.js)
        return window.katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: "ignore", output: "html" })
          .replace(/^<span class="/, '<span data-tex="' + esc(tex) + '" class="');
      } catch (e) { /* aşağıdaki yedeğe düş */ }
    }
    return '<code class="math-raw">' + esc(tex) + "</code>";
  }

  /** Kod ve matematik parçalarını yer tutucularla korur */
  function protect(src, store) {
    const keep = (html) => { store.push(html); return MARK + (store.length - 1) + MARK; };
    const keepD = (html) => { store.push(html); return "\n" + DMARK + (store.length - 1) + DMARK + "\n"; };
    // Kod blokları
    src = src.replace(/```([\w+-]*)[ \t]*\n?([\s\S]*?)(```|$)/g, (m, lang, code) =>
      keep('<pre class="md-code"><code>' + esc(code.replace(/\n$/, "")) + "</code></pre>"));
    // Satır içi kod
    src = src.replace(/`([^`\n]+)`/g, (m, code) => keep("<code>" + esc(code) + "</code>"));
    // Ayrı satır matematik
    src = src.replace(/\$\$([\s\S]+?)\$\$/g, (m, tex) => keepD(renderMath(tex.trim(), true)));
    src = src.replace(/\\\[([\s\S]+?)\\\]/g, (m, tex) => keepD(renderMath(tex.trim(), true)));
    // Satır içi matematik
    src = src.replace(/\\\(([\s\S]+?)\\\)/g, (m, tex) => keep(renderMath(tex.trim(), false)));
    src = src.replace(/(^|[^\\$\w])\$(?!\s)([^$\n]*?[^\s$])\$(?![\w$])/g, (m, pre, tex) => pre + keep(renderMath(tex, false)));
    return src;
  }

  function restore(html, store) {
    return html.replace(new RegExp("[" + MARK + DMARK + "](\\d+)[" + MARK + DMARK + "]", "g"), (m, i) => store[Number(i)]);
  }

  // Not: iOS 16.3 ve öncesi geriye bakan düzenli ifadeleri ((?<!…)) desteklemez; o yüzden kullanılmaz.
  function inline(s) {
    // Kalın içinde italik olabilir: **Camus – *Yabancı*** → <strong>Camus – <em>Yabancı</em></strong>
    s = s.replace(/\*\*((?:[^*]|\*(?![\s*])[^*\n]*?[^\s*\n]\*)+?)\*\*/g, (m, inner) =>
      "<strong>" + inner.replace(/\*(?!\s)([^*\n]*?[^\s*\n])\*/g, "<em>$1</em>") + "</strong>");
    s = s.replace(/__([^_]+?)__/g, "<strong>$1</strong>");
    s = s.replace(/(^|[^*])\*(?!\s)([^*\n]*?[^\s*\n])\*(?!\*)/g, "$1<em>$2</em>");
    s = s.replace(/~~([^~]+?)~~/g, "<del>$1</del>");
    s = s.replace(/\[([^\]]+)\]\(((?:https?:\/\/|#\/)[^\s)]+)\)/g, (m, text, href) =>
      '<a href="' + href + '"' + (href[0] === "#" ? "" : ' target="_blank" rel="noopener noreferrer"') + ">" + text + "</a>");
    return s;
  }

  const isTableSep = (line) => /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(line);
  const cells = (line) => line.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());

  function blocks(src) {
    const lines = src.split("\n");
    const out = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) { i++; continue; }
      if (isDisplayLine(line)) { out.push(line.trim()); i++; continue; }      // ayrı satır formül

      let m;
      if ((m = line.match(/^\s{0,3}(#{1,6})\s+(.*)$/))) {
        const level = Math.min(6, m[1].length + 2);           // # → h3 (yanıt içinde büyük başlık olmasın)
        out.push("<h" + level + ">" + inline(m[2].replace(/#+\s*$/, "")) + "</h" + level + ">");
        i++; continue;
      }
      if (/^\s{0,3}([-*_])(\s*\1){2,}\s*$/.test(line)) { out.push("<hr>"); i++; continue; }

      if (line.includes("|") && i + 1 < lines.length && isTableSep(lines[i + 1])) {
        const head = cells(line);
        i += 2;
        const rows = [];
        while (i < lines.length && lines[i].includes("|") && lines[i].trim()) { rows.push(cells(lines[i])); i++; }
        out.push('<div class="md-table"><table><thead><tr>' + head.map((c) => "<th>" + inline(c) + "</th>").join("") + "</tr></thead><tbody>" +
          rows.map((r) => "<tr>" + head.map((_, j) => "<td>" + inline(r[j] || "") + "</td>").join("") + "</tr>").join("") + "</tbody></table></div>");
        continue;
      }

      if (/^\s*&gt;\s?/.test(line)) {
        const q = [];
        while (i < lines.length && /^\s*&gt;\s?/.test(lines[i])) { q.push(lines[i].replace(/^\s*&gt;\s?/, "")); i++; }
        out.push("<blockquote>" + blocks(q.join("\n")) + "</blockquote>");
        continue;
      }

      const ul = /^(\s*)[-*+]\s+(.*)$/, ol = /^(\s*)(\d+)[.)]\s+(.*)$/;
      if (ul.test(line) || ol.test(line)) {
        const ordered = !ul.test(line);
        const re = ordered ? ol : ul;
        const items = [];
        const start = ordered ? Number(line.match(ol)[2]) : 1;
        while (i < lines.length) {
          const l = lines[i];
          const mm = l.match(re);
          if (mm) { items.push(ordered ? mm[3] : mm[2]); i++; continue; }
          // Liste maddesinin devam satırı (girintili) veya iç içe liste
          if (l.trim() && /^\s{2,}/.test(l) && items.length) { items[items.length - 1] += "\n" + l.trim(); i++; continue; }
          break;
        }
        const tag = ordered ? "ol" : "ul";
        out.push("<" + tag + (ordered && start !== 1 ? ' start="' + start + '"' : "") + ">" +
          items.map((it) => "<li>" + inline(it).replace(/\n/g, "<br>") + "</li>").join("") + "</" + tag + ">");
        continue;
      }

      // Paragraf: boş satıra ya da başka bloğa kadar
      const para = [];
      while (i < lines.length && lines[i].trim() && !isDisplayLine(lines[i]) &&
        !/^\s{0,3}#{1,6}\s/.test(lines[i]) && !/^\s*([-*+]|\d+[.)])\s+/.test(lines[i]) && !/^\s*&gt;/.test(lines[i]) &&
        !(lines[i].includes("|") && i + 1 < lines.length && isTableSep(lines[i + 1]))) {
        para.push(lines[i]); i++;
      }
      if (!para.length) { para.push(lines[i]); i++; }
      // Tek başına satırdaki matematik bloğu paragrafa sarılmasın
      const joined = para.join("\n");
      if (new RegExp("^" + MARK + "\\d+" + MARK + "$").test(joined.trim())) out.push(joined.trim());
      else out.push("<p>" + inline(joined).replace(/\n/g, "<br>") + "</p>");
    }
    return out.join("");
  }

  function render(src) {
    const store = [];
    let s = String(src || "").replace(/\r\n?/g, "\n");
    if (App.ai && App.ai.fixMath) s = App.ai.fixMath(s);       // bozuk "$$…$|" kapanışlarını onar
    s = protect(s, store);
    s = esc(s);
    // esc() yer tutucu işaretine dokunmaz; ama kaçırılan > işaretleri &gt; olur (alıntılar için)
    return restore(blocks(s), store);
  }

  App.markdown = { render };
})();
