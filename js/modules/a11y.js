/* =========================================================
   a11y.js — Erişilebilirlik modu

   • Yazı boyutu (normal / büyük / çok büyük)
   • Disleksi dostu yazı tipi (OpenDyslexic, uygulamanın içinde — internet gerekmez)
   • Geniş satır, harf ve kelime aralığı
   • Yüksek karşıtlık, hareketleri azaltma
   • Okuma cetveli: imlecin/parmağın olduğu satırı öne çıkaran şerit
   • Sesli okuma: konu anlatımları, örnekler, hap bilgiler, asistan yanıtları
     ve Feynman açıklamaları paragraf paragraf okunur; okunan paragraf vurgulanır.
     Formüller okunabilir hâle getirilir ("x kare artı 1 bölü 2" gibi).
   • Ekran okuyucu uyumu: yalnızca simgeli düğmelere otomatik etiket,
     "İçeriğe geç" bağlantısı, sayfa değişince başlığın duyurulması

   • Disleksi dostu mod (v1.49): tek dokunuşla yazı tipi + geniş aralık + okuma cetveli + hece renklendirme
     (Türkçe hece kural motoru: hece.js) + sesli okumada okunan kelimenin metin üstünde eş zamanlı vurgulanması.

   Tercihler cihazda (prefs) saklanır ve eşitlenir:
     a11yText: "md" | "lg" | "xl", a11yDys, a11ySpacing, a11yContrast, a11yMotion, a11yRuler, a11yHece, a11yWord (bool), ttsRate
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const t = App.t;
  const KEYS = { text: "a11yText", dys: "a11yDys", spacing: "a11ySpacing", contrast: "a11yContrast", motion: "a11yMotion", ruler: "a11yRuler", sonify: "a11ySonify", hece: "a11yHece", word: "a11yWord", rate: "ttsRate" };
  const DYS_MODE = ["dys", "spacing", "ruler", "hece", "word"];
  const get = (k, d) => App.prefs.get(KEYS[k], d);
  const RATES = [0.75, 1, 1.25];

  function apply() {
    const h = document.documentElement;
    const text = get("text", "md");
    if (text === "md") h.removeAttribute("data-a11y-text"); else h.setAttribute("data-a11y-text", text);
    h.toggleAttribute("data-a11y-dys", !!get("dys", false));
    h.toggleAttribute("data-a11y-spacing", !!get("spacing", false));
    h.toggleAttribute("data-a11y-contrast", !!get("contrast", false));
    h.toggleAttribute("data-a11y-motion", !!get("motion", false));
    ruler(!!get("ruler", false));
    if (App.hece) App.hece.set(!!get("hece", false));
    const btn = document.getElementById("a11yBtn");
    if (btn) btn.classList.toggle("is-on", active());
  }
  const active = () => get("text", "md") !== "md" || ["dys", "spacing", "contrast", "motion", "ruler", "hece"].some((k) => get(k, false));
  const dysModeOn = () => DYS_MODE.every((k) => get(k, k === "word"));

  /* ---------------- Okuma cetveli ---------------- */
  let rulerEl = null;
  function ruler(on) {
    if (!on) { if (rulerEl) { rulerEl.remove(); rulerEl = null; } return; }
    if (rulerEl) return;
    rulerEl = document.createElement("div");
    rulerEl.className = "a11y-ruler";
    rulerEl.setAttribute("aria-hidden", "true");
    rulerEl.innerHTML = '<i class="a11y-ruler__top"></i><i class="a11y-ruler__band"></i><i class="a11y-ruler__bot"></i>';
    document.body.appendChild(rulerEl);
    const move = (y) => { if (rulerEl) rulerEl.style.setProperty("--y", Math.round(y) + "px"); };
    move(window.innerHeight / 3);
    window.addEventListener("pointermove", (e) => move(e.clientY), { passive: true });
    window.addEventListener("touchmove", (e) => { if (e.touches[0]) move(e.touches[0].clientY); }, { passive: true });
  }

  /* ---------------- Formülleri sese çevirme ---------------- */
  const WORDS = {
    tr: { frac: "bölü", sqrt: "karekök", root: "{n}. dereceden kök", sq: "kare", cube: "küp", pow: "üssü", sub: "alt", eq: "eşittir", neq: "eşit değildir",
      le: "küçük eşittir", ge: "büyük eşittir", lt: "küçüktür", gt: "büyüktür", plus: "artı", minus: "eksi", times: "çarpı", div: "bölü", pm: "artı eksi",
      abs: "mutlak değer", inf: "sonsuz", deg: "derece", to: "ise", approx: "yaklaşık", in: "elemanıdır", perc: "yüzde", pi: "pi", delta: "delta", open: "parantez aç", close: "parantez kapa" },
    en: { frac: "over", sqrt: "square root of", root: "{n}th root of", sq: "squared", cube: "cubed", pow: "to the power", sub: "sub", eq: "equals", neq: "is not equal to",
      le: "is less than or equal to", ge: "is greater than or equal to", lt: "is less than", gt: "is greater than", plus: "plus", minus: "minus", times: "times", div: "divided by", pm: "plus or minus",
      abs: "absolute value of", inf: "infinity", deg: "degrees", to: "implies", approx: "approximately", in: "is an element of", perc: "percent", pi: "pi", delta: "delta", open: "open bracket", close: "close bracket" }
  };
  const GREEK = { alpha: "alfa", beta: "beta", gamma: "gama", theta: "teta", lambda: "lamda", mu: "mü", rho: "ro", sigma: "sigma", omega: "omega", phi: "fi", varepsilon: "epsilon", epsilon: "epsilon", eta: "eta", tau: "tau", nu: "nü" };

  /** {…} grubunu ayıkla: s[i] === "{" ise kapanışa kadar */
  function group(s, i) {
    if (s[i] !== "{") { const m = /^\\[a-zA-Z]+|^./.exec(s.slice(i)); return { inner: m ? m[0] : "", end: i + (m ? m[0].length : 0) }; }
    let d = 0;
    for (let j = i; j < s.length; j++) {
      if (s[j] === "{") d++;
      else if (s[j] === "}") { d--; if (!d) return { inner: s.slice(i + 1, j), end: j + 1 }; }
    }
    return { inner: s.slice(i + 1), end: s.length };
  }

  function texToSpeech(tex, lang) {
    const W = WORDS[lang === "tr" ? "tr" : "en"];
    let s = String(tex || "");
    // \frac, \sqrt, üsler: iç içe olabildikleri için elle ayrıştır
    const walk = (src) => {
      let out = "";
      for (let i = 0; i < src.length;) {
        if (src.startsWith("\\frac", i) || src.startsWith("\\dfrac", i) || src.startsWith("\\tfrac", i)) {
          i = src.indexOf("{", i) < 0 ? src.length : src.indexOf("{", i);
          const a = group(src, i), b = group(src, a.end);
          out += " " + walk(a.inner) + " " + W.frac + " " + walk(b.inner) + " ";
          i = b.end;
        } else if (src.startsWith("\\sqrt", i)) {
          i += 5;
          let n = null;
          if (src[i] === "[") { const k = src.indexOf("]", i); if(k<0){out += " "+src.slice(i)+" ";i=src.length;continue;} n = src.slice(i + 1, k); i = k + 1; }
          const a = group(src, i);
          out += " " + (n ? W.root.replace("{n}", walk(n)) : W.sqrt) + " " + walk(a.inner) + " ";
          i = a.end;
        } else if (src[i] === "^") {
          const a = group(src, i + 1);
          const e = a.inner.trim();
          out += " " + (e === "2" ? W.sq : e === "3" ? W.cube : e === "\\circ" ? W.deg : W.pow + " " + walk(e)) + " ";
          i = a.end;
        } else if (src[i] === "_") {
          const a = group(src, i + 1);
          out += " " + walk(a.inner) + " ";
          i = a.end;
        } else if (src.startsWith("\\text", i) || src.startsWith("\\mathrm", i) || src.startsWith("\\operatorname", i) || src.startsWith("\\mathbf", i)) {
          i = src.indexOf("{", i);
          if (i < 0) break;
          const a = group(src, i);
          out += " " + a.inner + " ";
          i = a.end;
        } else { out += src[i]; i++; }
      }
      return out;
    };
    s = walk(s);
    const rep = [
      [/\\left|\\right|\\,|\\;|\\!|\\quad|\\qquad|\\displaystyle/g, " "],
      [/\\cdot|\\times/g, " " + W.times + " "], [/\\div/g, " " + W.div + " "], [/\\pm/g, " " + W.pm + " "],
      [/\\neq|\\ne\b/g, " " + W.neq + " "], [/\\leq|\\le\b/g, " " + W.le + " "], [/\\geq|\\ge\b/g, " " + W.ge + " "],
      [/\\approx/g, " " + W.approx + " "], [/\\in\b/g, " " + W.in + " "], [/\\infty/g, " " + W.inf + " "],
      [/\\(rightarrow|Rightarrow|to|implies)\b/g, " " + W.to + " "], [/\\%|%/g, " " + W.perc + " "],
      [/\\pi\b/g, " " + W.pi + " "], [/\\Delta|\\delta/g, " " + W.delta + " "],
      [/\\(alpha|beta|gamma|theta|lambda|mu|rho|sigma|omega|phi|varepsilon|epsilon|eta|tau|nu)\b/g, (m, g) => " " + (lang === "tr" ? GREEK[g] : g) + " "],
      [/\\(sin|cos|tan|cot|log|ln)\b/g, " $1 "], [/\\circ/g, " " + W.deg + " "],
      [/\\[a-zA-Z]+/g, " "], [/[{}]/g, " "],
      [/\|([^|]+)\|/g, " " + W.abs + " $1 "],
      [/<=|≤/g, " " + W.le + " "], [/>=|≥/g, " " + W.ge + " "], [/</g, " " + W.lt + " "], [/>/g, " " + W.gt + " "],
      [/=/g, " " + W.eq + " "], [/\+/g, " " + W.plus + " "], [/(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ])-(?=\s*[\w(\\])/g, "$1 " + W.minus + " "], [/[−–]/g, " " + W.minus + " "],
      [/\*/g, " " + W.times + " "], [/\//g, " " + W.div + " "], [/\(/g, ", "], [/\)/g, ", "]
    ];
    rep.forEach(([re, to]) => { s = s.replace(re, to); });
    return s.replace(/\s+/g, " ").replace(/\s+,/g, ",").trim();
  }

  /** Bir öğenin okunacak düz metni (formüller sese çevrilir, tablolar satır satır) */
  function speakable(el) {
    const c = el.cloneNode(true);
    c.querySelectorAll(".cite").forEach((k) => k.remove());   // kaynak etiketleri okunmaz
    c.querySelectorAll("[data-tex]").forEach((k) => {
      if (!k.isConnected && !c.contains(k)) return;
      k.replaceWith(document.createTextNode(" " + texToSpeech(k.getAttribute("data-tex"), App.i18n.lang) + " "));
    });
    c.querySelectorAll(".katex").forEach((k) => {           // kaynağı bilinmeyen (eski) formüller
      const ann = k.querySelector('annotation[encoding="application/x-tex"]');
      k.replaceWith(document.createTextNode(" " + (ann ? texToSpeech(ann.textContent, App.i18n.lang) : k.textContent) + " "));
    });
    c.querySelectorAll("[data-listen], .a11y-skip, svg, button").forEach((x) => x.remove());
    c.querySelectorAll("td, th").forEach((x) => x.append(document.createTextNode(", ")));
    // Ayrı yazılmış $..$ (render edilmemiş) ifadeler
    return c.textContent.replace(/\$\$?([^$]+)\$\$?/g, (m, x) => " " + texToSpeech(x, App.i18n.lang) + " ").replace(/[•·→]/g, " ").replace(/\s+/g, " ").trim();
  }

  const BLOCKS = "h1,h2,h3,h4,h5,h6,p,li,tr,blockquote,.example__q,.example__a,.fey-claim,.fey-fix";
  function blocksOf(scope) {
    const all = Array.from(scope.querySelectorAll(BLOCKS)).filter((el) => !el.closest("[data-listen], .katex, .a11y-noread"));
    const inner = all.filter((el) => !all.some((o) => o !== el && el.contains(o) && !/^H\d$/.test(o.tagName)));
    return inner.length ? inner : [scope];
  }

  /* ---------------- Okunan kelimeyi vurgulama ---------------- */
  const hlOk = () => typeof CSS !== "undefined" && CSS.highlights && typeof Highlight === "function";
  const lowTr = (x) => x.toLocaleLowerCase("tr");
  /** Konuşulan metindeki charIndex konumundaki kelimenin bloktaki yeri (Range). Formüller sese çevrildiği için
      metinde aynen geçmeyen kelimeler atlanır; aynı kelime birden çok kez geçerse kaçıncı olduğu sayılır. */
  function wordRange(block, spoken, charIndex) {
    const m = /^[^\s,.;:!?()"“”]+/.exec(spoken.slice(charIndex));
    if (!m) return null;
    const word = lowTr(m[0]), before = lowTr(spoken.slice(0, charIndex));
    let nth = 0, k = -1;
    while ((k = before.indexOf(word, k + 1)) >= 0) nth++;
    const nodes = [], walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.parentElement && n.parentElement.closest(".katex, [data-listen], .cite, button, svg") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
    let n, text = "";
    while ((n = walker.nextNode())) { nodes.push([n, text.length]); text += n.nodeValue; }
    const low = lowTr(text);
    let at = -1;
    for (let i = 0; i <= nth; i++) { at = low.indexOf(word, at + 1); if (at < 0) break; }
    if (at < 0) at = low.indexOf(word);
    if (at < 0) return null;
    const pos = (off) => { for (let i = nodes.length - 1; i >= 0; i--) if (off >= nodes[i][1]) return [nodes[i][0], Math.min(off - nodes[i][1], nodes[i][0].nodeValue.length)]; return null; };
    const a = pos(at), b = pos(at + word.length);
    if (!a || !b) return null;
    const r = document.createRange(); r.setStart(a[0], a[1]); r.setEnd(b[0], b[1]);
    return r;
  }
  function markWord(range) { if (!hlOk()) return; if (range) CSS.highlights.set("a11y-word", new Highlight(range)); else CSS.highlights.delete("a11y-word"); }

  /* ---------------- Sesli okuma (oynatıcı) ---------------- */
  let reading = null;      // { btn, blocks, i, scope }

  function stopReading() {
    if (!reading) return;
    const r = reading;
    reading = null;
    App.speech.stopSaying();
    markWord(null);
    r.blocks.forEach((b) => b.classList.remove("is-reading"));
    paintBtn(r.btn, false);
  }

  function paintBtn(btn, on) {
    if (!btn || !btn.isConnected) return;
    btn.classList.toggle("is-on", on);
    btn.setAttribute("aria-pressed", String(on));
    const iconOnly = btn.classList.contains("icon-btn");
    btn.innerHTML = App.icon(on ? "stop" : "volume") + (iconOnly ? "" : '<span class="listen-btn__t">' + esc(on ? t("a11y.stop") : t("a11y.listen")) + "</span>");
    btn.title = on ? t("a11y.stop") : t("a11y.listenTitle");
    btn.setAttribute("aria-label", btn.title);
  }

  function readScope(scope, btn) {
    stopReading();
    if (!App.speech.ttsAvailable()) { App.ui.toast(t("a11y.noTts"), "error"); return; }
    if (!App.speech.hasVoice(App.i18n.lang)) App.ui.toast(t("a11y.noVoice"));
    const blocks = blocksOf(scope).filter((b) => speakable(b));
    if (!blocks.length) return;
    reading = { btn, blocks, i: 0, scope };
    paintBtn(btn, true);
    const me = reading;
    const next = () => {
      if (reading !== me) return;
      blocks.forEach((b) => b.classList.remove("is-reading"));
      if (me.i >= blocks.length) { stopReading(); return; }
      const b = blocks[me.i++];
      b.classList.add("is-reading");
      const r = b.getBoundingClientRect();
      if (r.top < 60 || r.bottom > window.innerHeight - 40) b.scrollIntoView({ block: "center", behavior: get("motion", false) ? "auto" : "smooth" });
      const spoken = speakable(b);
      App.speech.say(spoken, {
        lang: App.i18n.lang, rate: Number(get("rate", 1)) || 1,
        onWord: get("word", true) ? (ci) => { if (reading === me) markWord(wordRange(b, spoken, ci)); } : undefined,
        onEnd: (why) => { markWord(null); if (why === "stop") return; next(); },
        onError: () => { if (reading === me) { App.ui.toast(t("a11y.ttsError"), "error"); stopReading(); } }
      });
    };
    next();
  }

  /** Okunacak bölgenin başlığına konan "Dinle" düğmesi */
  function listenBtnHtml(cls) {
    if (!App.speech.ttsAvailable()) return "";
    return '<button class="listen-btn' + (cls ? " " + cls : "") + '" type="button" data-listen aria-pressed="false" title="' + esc(t("a11y.listenTitle")) + '">' +
      App.icon("volume") + '<span class="listen-btn__t">' + esc(t("a11y.listen")) + "</span></button>";
  }

  /** Düz bir metni (ör. tek cevap) okutmak için */
  function readText(text, btn) {
    const div = document.createElement("div");
    div.textContent = text;
    stopReading();
    reading = { btn, blocks: [], i: 0 };
    paintBtn(btn, true);
    const me = reading;
    App.speech.say(speakable(div), { lang: App.i18n.lang, rate: Number(get("rate", 1)) || 1, onEnd: () => { if (reading === me) stopReading(); }, onError: () => { if (reading === me) stopReading(); } });
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-listen]");
    if (!b) return;
    e.preventDefault(); e.stopPropagation();
    if (reading && reading.btn === b) { stopReading(); return; }
    const msg = b.closest(".msg");
    const scope = b.closest("[data-read-scope]") || (msg && msg.querySelector(".msg__body > .md")) || b.closest("section, .card");
    if (scope) readScope(scope, b);
  }, true);
  window.addEventListener("hashchange", stopReading);

  /* ---------------- Ekran okuyucu: simgeli düğmelere etiket ---------------- */
  function labelIcons(root) {
    (root || document).querySelectorAll("button, a, [role=button]").forEach((el) => {
      if (el.hasAttribute("aria-label") || el.textContent.trim()) return;
      const name = el.getAttribute("title");
      if (name) el.setAttribute("aria-label", name);
    });
  }
  let labelTimer = 0;
  new MutationObserver(() => { clearTimeout(labelTimer); labelTimer = setTimeout(() => labelIcons(document), 120); })
    .observe(document.documentElement, { childList: true, subtree: true });

  // Sayfa değişince başlık ekran okuyuculara duyurulur
  let announcer = null;
  function announce(text) {
    if (!announcer) {
      announcer = document.createElement("div");
      announcer.className = "sr-only";
      announcer.setAttribute("aria-live", "polite");
      document.body.appendChild(announcer);
    }
    announcer.textContent = "";
    setTimeout(() => { announcer.textContent = text; }, 60);
  }
  window.addEventListener("hashchange", () => setTimeout(() => announce(document.title), 400));

  /* ---------------- Ayarlar paneli ---------------- */
  function open() {
    const seg = (name, cur, opts) => '<div class="lang-switch seg a11y-seg" role="radiogroup" data-seg="' + name + '">' +
      opts.map(([v, label, aria]) => '<button type="button" role="radio" data-v="' + v + '" aria-checked="' + String(String(cur) === String(v)) + '"' + (aria ? ' aria-label="' + esc(aria) + '"' : "") + ">" + label + "</button>").join("") + "</div>";
    const sw = (k, icon) => '<label class="a11y-row"><span class="a11y-row__ico">' + App.icon(icon) + '</span><span class="a11y-row__t"><b>' + esc(t("a11y." + k)) + "</b><small>" + esc(t("a11y." + k + "Hint")) + "</small></span>" +
      '<input type="checkbox" class="switch" data-k="' + k + '"' + (get(k, k === "word") ? " checked" : "") + "></label>";
    const voiceNote = !App.speech.ttsAvailable() ? t("a11y.noTts") : !App.speech.hasVoice(App.i18n.lang) ? t("a11y.noVoice") : "";
    const m = App.ui.modal({
      title: t("a11y.title"),
      body:
        '<p class="hint" style="margin-top:-4px">' + esc(t("a11y.intro")) + "</p>" +
        '<button type="button" class="btn a11y-dysmode' + (dysModeOn() ? " is-on" : "") + '" id="a11yDysMode" aria-pressed="' + dysModeOn() + '">' + App.icon("book") + '<span><b>' + esc(t("a11y.dysMode")) + "</b><small>" + esc(t("a11y.dysModeHint")) + "</small></span></button>" +
        '<div class="a11y-row"><span class="a11y-row__ico">' + App.icon("textSize") + '</span><span class="a11y-row__t"><b>' + esc(t("a11y.text")) + "</b><small>" + esc(t("a11y.textHint")) + "</small></span>" +
          seg("text", get("text", "md"), [["md", "A", t("a11y.textMd")], ["lg", '<span style="font-size:1.15em">A</span>', t("a11y.textLg")], ["xl", '<span style="font-size:1.35em">A</span>', t("a11y.textXl")]]) + "</div>" +
        sw("dys", "book") + sw("spacing", "list") + sw("ruler", "eye") + sw("hece", "textSize") + sw("word", "volume") + sw("contrast", "sun") + sw("motion", "pause") + sw("sonify", "volume") +
        '<div class="a11y-row"><span class="a11y-row__ico">' + App.icon("volume") + '</span><span class="a11y-row__t"><b>' + esc(t("a11y.tts")) + "</b><small>" + esc(voiceNote || t("a11y.ttsHint")) + "</small></span>" +
          seg("rate", get("rate", 1), RATES.map((r) => [r, r === 1 ? "1×" : String(r).replace(".", App.i18n.lang === "tr" ? "," : ".") + "×", ""])) + "</div>" +
        '<div class="a11y-try" data-read-scope><p>' + esc(t("a11y.sample")) + " $\\frac{x^2+1}{2} = 5$</p>" + listenBtnHtml() + "</div>",
      actions: '<button class="btn btn--ghost" type="button" id="a11yReset">' + App.icon("refresh") + esc(t("a11y.reset")) + '</button><button class="btn btn--primary" type="button" data-close>' + esc(t("close")) + "</button>"
    });
    const tryBox = m.el.querySelector(".a11y-try p");
    tryBox.innerHTML = App.markdown.render(tryBox.textContent).replace(/^<p>|<\/p>$/g, "");
    m.el.addEventListener("click", (e) => {
      const b = e.target.closest(".a11y-seg [data-v]");
      if (!b) return;
      const name = b.closest("[data-seg]").dataset.seg;
      App.prefs.set(KEYS[name], name === "rate" ? Number(b.dataset.v) : b.dataset.v);
      b.parentElement.querySelectorAll("[data-v]").forEach((x) => x.setAttribute("aria-checked", String(x === b)));
      apply();
    });
    const syncDys = () => { const b = m.el.querySelector("#a11yDysMode"), v = dysModeOn(); b.classList.toggle("is-on", v); b.setAttribute("aria-pressed", String(v)); };
    m.el.querySelectorAll("input[data-k]").forEach((cb) => cb.addEventListener("change", () => { App.prefs.set(KEYS[cb.dataset.k], cb.checked); apply(); syncDys(); }));
    m.el.querySelector("#a11yDysMode").addEventListener("click", () => {
      const v = !dysModeOn();
      DYS_MODE.forEach((k) => { App.prefs.set(KEYS[k], v); const cb = m.el.querySelector('input[data-k="' + k + '"]'); if (cb) cb.checked = v; });
      apply(); syncDys();
      App.ui.toast(v ? t("a11y.dysModeOn") : t("a11y.dysModeOff"));
    });
    m.el.querySelector("#a11yReset").addEventListener("click", () => {
      Object.values(KEYS).forEach((k) => App.prefs.remove(k));
      apply();
      m.close();
      App.ui.toast(t("a11y.resetDone"));
    });
  }

  function init() {
    apply();
    const btn = document.getElementById("a11yBtn");
    if (btn) btn.addEventListener("click", open);
    const skip = document.querySelector(".a11y-skip");
    if (skip) skip.addEventListener("click", (e) => { e.preventDefault(); const v = document.getElementById("view"); if (v) v.focus(); });
    labelIcons(document);
  }

  App.a11y = { init, apply, open, listenBtnHtml, readScope, readText, stopReading, texToSpeech, speakable, wordRange, isActive: active, dysModeOn };
})();
