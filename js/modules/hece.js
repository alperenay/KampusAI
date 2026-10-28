/* =========================================================
   hece.js — Türkçe hece ayırma ve disleksi dostu hece renklendirme (v1.49)

   Kural motoru (Türkçede her hecede tek ünlü vardır):
     • İki ünlü arasında ünsüz yoksa heceler ünlülerin arasından ayrılır:        sa-at, şi-ir
     • Bir ünsüz varsa o ünsüz sonraki heceye geçer:                             ki-tap, a-ğaç
     • İki ünsüz varsa aralarından ayrılır:                                      ör-nek, kar-deş
     • Üç ya da daha çok ünsüz varsa yalnızca sonuncusu sonraki heceye geçer:    Türk-çe, kork-mak, e-lekt-rik
     • Sözcük başındaki ünsüz öbekleri ilk heceye, sondakiler son heceye kalır:  tren, spor, sports-man değil (tek ünlü kuralı)
     • Kesme işareti, kısa çizgi ve rakamlar sözcüğü böler ("Türkiye'nin" → Tür-ki-ye + ' + nin).
   Yabancı kökenli sözcüklerde de bu kurallar uygulanır (TDK yazım kılavuzu: prog-ram, sant-ral, kont-rol).

   Renklendirme: a11y "hece" tercihi açıkken içerik alanlarındaki metin düğümleri hecelerine bölünür ve ardışık
   heceler iki karşıt renkle (hc-a / hc-b) boyanır. Formüller, kod, form alanları ve düğmeler atlanır.
   ========================================================= */
(function () {
  const VOWELS = "aeıioöuüâîûAEIİOÖUÜÂÎÛ";
  const isV = (c) => VOWELS.includes(c);
  const LETTER = /[A-Za-zÇĞİÖŞÜçğıöşüÂÎÛâîû]/;

  /** Tek bir sözcüğü (yalnızca harfler) hecelerine ayırır */
  function splitWord(w) {
    const v = [];
    for (let i = 0; i < w.length; i++) if (isV(w[i])) v.push(i);
    if (v.length <= 1) return [w];
    const cuts = [];
    for (let k = 0; k < v.length - 1; k++) {
      const a = v[k], b = v[k + 1], cons = b - a - 1;
      cuts.push(cons === 0 ? b : b - 1);       // 0 ünsüz: ünlüler arası · 1+: son ünsüzden önce
    }
    const out = []; let s = 0;
    cuts.forEach((c) => { out.push(w.slice(s, c)); s = c; });
    out.push(w.slice(s));
    return out;
  }
  /** Metni parçalara ayırır: [{ t: metin, syl: true|false }] — harf dizileri hecelere bölünür */
  function tokenize(text) {
    const out = [];
    let i = 0;
    while (i < text.length) {
      if (LETTER.test(text[i])) {
        let j = i; while (j < text.length && LETTER.test(text[j])) j++;
        splitWord(text.slice(i, j)).forEach((s) => out.push({ t: s, syl: true }));
        i = j;
      } else {
        let j = i; while (j < text.length && !LETTER.test(text[j])) j++;
        out.push({ t: text.slice(i, j), syl: false });
        i = j;
      }
    }
    return out;
  }
  /** "Türkçe kitap" → "Türk·çe ki·tap" (sınama ve ekran okuyucusuz gösterim için) */
  const hyphenate = (text, sep) => tokenize(text).reduce((acc, tk, i, all) => acc + tk.t + (tk.syl && all[i + 1] && all[i + 1].syl ? (sep || "·") : ""), "");

  /* ---------------- DOM renklendirme ---------------- */
  const SKIP = "script,style,code,pre,textarea,input,select,option,button,svg,canvas,.katex,[data-tex],.hc-w,[contenteditable],[data-no-hece],.a11y-ruler,.tabbar,.sidebar,.topbar";
  const SCOPE = "#view p, #view li, #view h1, #view h2, #view h3, #view h4, #view blockquote, #view td, #view th, #view dd, #view .md, #view .q-text, #view label, .modal p, .modal li";
  let on = false, timer = 0, observer = null;

  function wrapNode(node) {
    const text = node.nodeValue;
    if (!text || !/[A-Za-zÇĞİÖŞÜçğıöşü]{2}/.test(text)) return;
    const frag = document.createDocumentFragment();
    let alt = 0;
    tokenize(text).forEach((tk) => {
      if (!tk.syl) { frag.appendChild(document.createTextNode(tk.t)); alt = 0; return; }
      const s = document.createElement("span");
      s.className = "hc-w " + (alt++ % 2 ? "hc-b" : "hc-a");
      s.textContent = tk.t;
      frag.appendChild(s);
    });
    node.parentNode.replaceChild(frag, node);
  }
  function apply(root) {
    if (!on) return;
    const scopes = (root && root.matches && root.matches(SCOPE)) ? [root] : Array.from((root || document).querySelectorAll(SCOPE));
    let budget = 6000;
    scopes.forEach((el) => {
      if (budget <= 0 || el.closest(SKIP)) return;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.parentElement && !n.parentElement.closest(SKIP) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT) });
      const nodes = []; let n;
      while ((n = walker.nextNode()) && nodes.length < budget) nodes.push(n);
      budget -= nodes.length;
      nodes.forEach(wrapNode);
    });
  }
  function strip() {
    const parents = new Set();
    document.querySelectorAll(".hc-w").forEach((s) => { parents.add(s.parentNode); s.replaceWith(document.createTextNode(s.textContent)); });
    parents.forEach((p) => { if (p && p.normalize) p.normalize(); });
  }
  // Yalnızca yeni eklenen düğümler işlenir (sayfanın tamamı her değişiklikte yeniden taranmaz)
  const pending = new Set();
  function flush() {
    if (!on) { pending.clear(); return; }
    observer.disconnect();
    pending.forEach((n) => {
      if (!n.isConnected) return;
      if (n.nodeType === 3) { const p = n.parentElement; if (p && p.closest(SCOPE) && !p.closest(SKIP)) wrapNode(n); return; }
      if (n.nodeType !== 1 || n.closest(SKIP)) return;
      if (n.closest(SCOPE)) apply(n.matches(SCOPE) ? n : n.closest(SCOPE)); else apply(n);
    });
    pending.clear();
    observe();
  }
  function set(enable) {
    on = !!enable;
    document.documentElement.toggleAttribute("data-a11y-hece", on);
    if (on) {
      apply(document);
      if (!observer) {
        observer = new MutationObserver((list) => {
          list.forEach((m) => { if (m.type === "characterData") pending.add(m.target); else m.addedNodes.forEach((n) => pending.add(n)); });
          clearTimeout(timer); timer = setTimeout(flush, 120);
        });
        observe();
      }
    } else {
      if (observer) { observer.disconnect(); observer = null; }
      clearTimeout(timer); pending.clear();
      strip();
    }
  }
  function observe() { const v = document.body; if (observer && v) observer.observe(v, { childList: true, subtree: true, characterData: true }); }

  App.hece = { splitWord, tokenize, hyphenate, set, apply, isOn: () => on };
})();
