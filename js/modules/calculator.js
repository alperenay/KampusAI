/* =========================================================
   calculator.js — Çok amaçlı hesap makinesi   (#/hesap)

   Sekmeler:
     • Bilimsel : tuş takımı + klavye; kesir sonucu, üs, kök, trigonometri (derece), log, faktöriyel,
                  kombinasyon/permütasyon, EBOB/EKOK; son 20 işlem geçmişi (yalnızca bu cihazda)
     • Denklem  : ax² + bx + c = 0 ve iki bilinmeyenli doğrusal denklem sistemi
     • Yüzde    : bir sayının %'si, yüzde değişim, % artış/indirim
     • Net      : doğru/yanlış → net (4 yanlış 1 doğruyu götürür)
   Hesaplar App.calc.evaluate ile yapılır (eval yok; yapay zekanın hesap aracıyla aynı kurallar).
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const num = (v) => { const x = parseFloat(String(v == null ? "" : v).replace(",", ".")); return isNaN(x) ? null : x; };
  /** Kesin gösterim: tam sayı, basit kesir (≈ ondalık) ya da 10 anlamlı basamak */
  const exact = (x) => (x == null || !isFinite(x) ? "–" : App.calc.run(String(x)));
  const nice = (x) => (x == null || !isFinite(x) ? "–" : Number(x.toPrecision(10)).toLocaleString(App.i18n.locale, { maximumFractionDigits: 6 }));

  const KEYS = [
    ["sin(", "cos(", "tan(", "log(", "ln("],
    ["sqrt(", "^", "(", ")", "!"],
    ["comb(", "perm(", "pi", "e", "%"],
    ["7", "8", "9", "/", "⌫"],
    ["4", "5", "6", "*", "C"],
    ["1", "2", "3", "-", "ans"],
    ["0", ".", ",", "+", "="]
  ];
  const LABEL = { "sqrt(": "√", "^": "xʸ", "/": "÷", "*": "×", "-": "−", "pi": "π", "comb(": "C(n,r)", "perm(": "P(n,r)", "!": "n!", "%": "mod", "ans": "Ans", "⌫": "⌫", "log(": "log", "ln(": "ln", "sin(": "sin", "cos(": "cos", "tan(": "tan", ",": "," };

  /** "5!" → "factorial(5)", "(2+3)!" → "factorial((2+3))" */
  function expandFactorial(s) {
    for (let guard = 0; guard < 20 && s.includes("!"); guard++) {
      const i = s.indexOf("!");
      let j = i - 1;
      if (s[j] === ")") {
        let depth = 0;
        for (; j >= 0; j--) { if (s[j] === ")") depth++; else if (s[j] === "(") { depth--; if (!depth) break; } }
      } else { while (j > 0 && /[\d.]/.test(s[j - 1])) j--; }
      if (j < 0) break;
      s = s.slice(0, j) + "factorial(" + s.slice(j, i) + ")" + s.slice(i + 1);
    }
    return s;
  }

  function sciTab() {
    return '<div class="calc-display"><input class="calc-expr" id="cExpr" spellcheck="false" autocomplete="off" inputmode="none" aria-label="' + esc(T("İşlem", "Expression")) + '" placeholder="0">' +
      '<div class="calc-result" id="cRes" aria-live="polite">&nbsp;</div></div>' +
      '<div class="calc-keys">' + KEYS.map((row) => row.map((k) =>
        '<button type="button" class="calc-key' + (/^[\d.]$/.test(k) ? " is-num" : k === "=" ? " is-eq" : /^[C⌫]$/.test(k) ? " is-clear" : "") + '" data-k="' + esc(k) + '">' + esc(LABEL[k] || k) + "</button>").join("")).join("") + "</div>" +
      '<p class="hint">' + esc(T("Açılar derece. Klavyeyle de yazabilirsin; Enter hesaplar. Ör. comb(10,3), log(8,2), 3/4+2/3", "Angles in degrees. You can type too; Enter calculates. e.g. comb(10,3), log(8,2), 3/4+2/3")) + "</p>" +
      '<div class="calc-hist" id="cHist"></div>';
  }

  function eqTab() {
    const f = (id, ph) => '<input class="input calc-in" id="' + id + '" inputmode="decimal" placeholder="' + ph + '">';
    return '<h3 class="score-h">ax² + bx + c = 0</h3><div class="calc-eq">' + f("qa", "a") + "x² + " + f("qb", "b") + "x + " + f("qc", "c") + ' = 0</div><div class="calc-out" id="qOut"></div>' +
      '<h3 class="score-h">' + esc(T("İki bilinmeyenli denklem sistemi", "System of two linear equations")) + "</h3>" +
      '<div class="calc-eq">' + f("l1a", "a₁") + "x + " + f("l1b", "b₁") + "y = " + f("l1c", "c₁") + "</div>" +
      '<div class="calc-eq">' + f("l2a", "a₂") + "x + " + f("l2b", "b₂") + "y = " + f("l2c", "c₂") + '</div><div class="calc-out" id="lOut"></div>';
  }

  function pctTab() {
    const f = (id, ph) => '<input class="input calc-in" id="' + id + '" inputmode="decimal" placeholder="' + ph + '">';
    return '<div class="calc-eq">' + f("p1", "%") + T(" 'i ", " % of ") + f("p2", T("sayı", "number")) + ' = <b id="p1o">–</b></div>' +
      '<div class="calc-eq">' + f("p3", T("eski", "old")) + " → " + f("p4", T("yeni", "new")) + T(" değişim: ", " change: ") + '<b id="p3o">–</b></div>' +
      '<div class="calc-eq">' + f("p5", T("sayı", "number")) + T(" % ", " ± % ") + f("p6", "%") + ' → <b id="p5o">–</b></div>' +
      '<div class="calc-eq">' + f("p7", T("parça", "part")) + " / " + f("p8", T("bütün", "whole")) + ' = <b id="p7o">–</b></div>';
  }

  function netTab() {
    const f = (id, ph) => '<input class="input calc-in" id="' + id + '" inputmode="numeric" placeholder="' + ph + '">';
    return '<div class="calc-eq">' + T("Soru ", "Questions ") + f("n0", "40") + T(" Doğru ", " Correct ") + f("n1", "0") + T(" Yanlış ", " Wrong ") + f("n2", "0") + "</div>" +
      '<div class="calc-out" id="nOut"></div><p class="hint">' + esc(T("YKS'de 4 yanlış 1 doğruyu götürür: net = doğru − yanlış ÷ 4.", "In YKS 4 wrong answers cancel 1 correct: net = correct − wrong ÷ 4.")) + "</p>";
  }

  async function render(view) {
    App.setTitle(T("Hesap Makinesi", "Calculator"));
    const tab = App.prefs.get("calcTab", "sci");
    const tabs = [["sci", T("Bilimsel", "Scientific")], ["eq", T("Denklem", "Equations")], ["pct", T("Yüzde", "Percent")], ["net", T("Net", "Net")]];
    view.innerHTML =
      '<div class="page page--narrow">' +
        '<div class="page-head"><div><h1>' + esc(T("Hesap Makinesi", "Calculator")) + "</h1><p>" +
          esc(T("Bilimsel hesap, denklem çözme, yüzde ve net hesabı tek yerde. İnternetsiz çalışır.", "Scientific calculator, equation solver, percentages and nets in one place. Works offline.")) + "</p></div>" +
          '<div class="page-head__actions"><div class="tabs" role="tablist">' + tabs.map(([id, l]) =>
            '<button class="tab' + (id === tab ? " is-active" : "") + '" type="button" role="tab" data-tab="' + id + '">' + esc(l) + "</button>").join("") + "</div></div></div>" +
        '<section class="card calc" id="cBody"></section>' +
      "</div>";

    const body = view.querySelector("#cBody");
    let ans = App.prefs.get("calcAns", null);
    let hist = (() => { try { return App.prefs.get("calcHist", []) || []; } catch (e) { return []; } })();

    function show(id) {
      App.prefs.set("calcTab", id);
      view.querySelectorAll("[data-tab]").forEach((b) => b.classList.toggle("is-active", b.dataset.tab === id));
      body.innerHTML = id === "eq" ? eqTab() : id === "pct" ? pctTab() : id === "net" ? netTab() : sciTab();
      if (id === "sci") initSci();
    }

    /* ---- Bilimsel ---- */
    function initSci() {
      const ex = body.querySelector("#cExpr"), res = body.querySelector("#cRes"), hb = body.querySelector("#cHist");
      if (!App.platform.mobile) ex.removeAttribute("inputmode");
      const paintHist = () => {
        hb.innerHTML = hist.length ? '<div class="calc-hist__head"><span class="hint">' + esc(T("Geçmiş", "History")) + '</span><button class="btn btn--sm btn--ghost" type="button" id="cHClr">' + esc(T("Temizle", "Clear")) + "</button></div>" +
          hist.map((h, i) => '<button type="button" class="calc-hist__row" data-h="' + i + '"><span>' + esc(h.e) + "</span><b>= " + esc(h.r) + "</b></button>").join("") : "";
      };
      // Parantez dışındaki virgül ondalıktır (2,5 → 2.5); işlev içindeki ayırıcıdır (comb(5,2))
      const prepare = (s) => expandFactorial(String(s).replace(/ans/gi, ans != null ? "(" + ans + ")" : "0").replace(/,(?![^()]*\))/g, "."));
      const preview = () => {
        const s = ex.value.trim();
        if (!s) { res.innerHTML = "&nbsp;"; return; }
        try { res.textContent = "= " + App.calc.run(prepare(s)).replace(/^Hata: .*/, "…"); } catch (e) { res.textContent = "…"; }
      };
      const calc = () => {
        const s = ex.value.trim();
        if (!s) return;
        const out = App.calc.run(prepare(s));
        if (/^Hata/.test(out)) { res.textContent = out; res.classList.add("is-err"); return; }
        res.classList.remove("is-err");
        res.textContent = "= " + out;
        try { ans = App.calc.evaluate(prepare(s)); App.prefs.set("calcAns", ans); } catch (e) { /* yok */ }
        hist.unshift({ e: s, r: out });
        hist = hist.slice(0, 20);
        App.prefs.set("calcHist", hist);
        paintHist();
        ex.value = "";
        ex.placeholder = out.replace(/ \(≈.*/, "");
      };
      const insert = (txt) => {
        const a = ex.selectionStart != null ? ex.selectionStart : ex.value.length, b = ex.selectionEnd != null ? ex.selectionEnd : a;
        ex.value = ex.value.slice(0, a) + txt + ex.value.slice(b);
        const pos = a + txt.length;
        try { ex.setSelectionRange(pos, pos); } catch (e) { /* yok */ }
        preview();
      };
      body.querySelector(".calc-keys").addEventListener("click", (e) => {
        const b = e.target.closest("[data-k]");
        if (!b) return;
        const k = b.dataset.k;
        if (k === "=") calc();
        else if (k === "C") { ex.value = ""; res.innerHTML = "&nbsp;"; res.classList.remove("is-err"); }
        else if (k === "⌫") {
          const a = ex.selectionStart != null ? ex.selectionStart : ex.value.length;
          if (a > 0) { ex.value = ex.value.slice(0, a - 1) + ex.value.slice(a); try { ex.setSelectionRange(a - 1, a - 1); } catch (er) { /* yok */ } }
          preview();
        } else if (/^[+\-*/^%]$/.test(k) && !ex.value.trim() && ans != null) insert("ans" + k);
        else insert(k);
        if (!App.platform.mobile) ex.focus();
      });
      ex.addEventListener("input", preview);
      ex.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); calc(); } });
      hb.addEventListener("click", (e) => {
        if (e.target.closest("#cHClr")) { hist = []; App.prefs.set("calcHist", hist); paintHist(); return; }
        const r = e.target.closest("[data-h]");
        if (r) { ex.value = hist[Number(r.dataset.h)].e; preview(); ex.focus(); }
      });
      paintHist();
      if (!App.platform.mobile) ex.focus();
    }

    /* ---- Denklem, yüzde, net (canlı) ---- */
    body.addEventListener("input", () => {
      const v = (id) => { const el = body.querySelector("#" + id); return el ? num(el.value) : null; };
      const set = (id, html) => { const el = body.querySelector("#" + id); if (el) el.innerHTML = html; };
      if (body.querySelector("#qOut")) {
        const a = v("qa"), b = v("qb"), c = v("qc");
        if (a == null || b == null || c == null) set("qOut", "");
        else if (a === 0) set("qOut", b === 0 ? esc(T("Denklem değil", "Not an equation")) : "x = " + esc(exact(-c / b)));
        else {
          const D = b * b - 4 * a * c;
          const dTxt = "Δ = " + nice(D);
          if (D < 0) set("qOut", dTxt + " · " + esc(T("gerçek kök yok", "no real roots")) + " · x = " + nice(-b / (2 * a)) + " ± " + nice(Math.sqrt(-D) / (2 * a)) + "i");
          else if (D === 0) set("qOut", dTxt + " · " + esc(T("çakışık kök", "double root")) + ": x = " + esc(exact(-b / (2 * a))));
          else set("qOut", dTxt + " · x₁ = " + esc(exact((-b + Math.sqrt(D)) / (2 * a))) + " · x₂ = " + esc(exact((-b - Math.sqrt(D)) / (2 * a))) +
            " · " + esc(T("toplam ", "sum ")) + nice(-b / a) + " · " + esc(T("çarpım ", "product ")) + nice(c / a));
        }
        const a1 = v("l1a"), b1 = v("l1b"), c1 = v("l1c"), a2 = v("l2a"), b2 = v("l2b"), c2 = v("l2c");
        if ([a1, b1, c1, a2, b2, c2].some((x) => x == null)) set("lOut", "");
        else {
          const det = a1 * b2 - a2 * b1;
          if (det === 0) set("lOut", esc((a1 * c2 - a2 * c1 === 0 && b1 * c2 - b2 * c1 === 0) ? T("Sonsuz çözüm (denklemler aynı doğru)", "Infinitely many solutions") : T("Çözüm yok (paralel doğrular)", "No solution (parallel lines)")));
          else set("lOut", "x = " + esc(exact((c1 * b2 - c2 * b1) / det)) + " · y = " + esc(exact((a1 * c2 - a2 * c1) / det)));
        }
      }
      if (body.querySelector("#p1o")) {
        const p1 = v("p1"), p2 = v("p2"), p3 = v("p3"), p4 = v("p4"), p5 = v("p5"), p6 = v("p6"), p7 = v("p7"), p8 = v("p8");
        set("p1o", p1 != null && p2 != null ? nice((p1 * p2) / 100) : "–");
        set("p3o", p3 && p4 != null ? (p4 >= p3 ? "+" : "") + nice(((p4 - p3) / p3) * 100) + "%" : "–");
        set("p5o", p5 != null && p6 != null ? nice(p5 * (1 + p6 / 100)) + " / " + nice(p5 * (1 - p6 / 100)) : "–");
        set("p7o", p7 != null && p8 ? "%" + nice((p7 / p8) * 100) : "–");
      }
      if (body.querySelector("#nOut")) {
        const q = v("n0") || 0, d = Math.max(0, v("n1") || 0), y = Math.max(0, v("n2") || 0);
        if (q && d + y > q) set("nOut", '<span class="is-err">' + esc(T("Doğru + yanlış soru sayısını geçemez", "Correct + wrong can't exceed the questions")) + "</span>");
        else set("nOut", "<b>" + esc(T("Net: ", "Net: ")) + nice(App.data.exams.calcNet(d, y)) + "</b>" + (q ? " · " + esc(T("Boş: ", "Blank: ")) + (q - d - y) + " · " + esc(T("Başarı: %", "Score: %")) + nice((App.data.exams.calcNet(d, y) / q) * 100) : ""));
      }
    });

    view.querySelector(".page-head__actions").addEventListener("click", (e) => {
      const b = e.target.closest("[data-tab]");
      if (b) show(b.dataset.tab);
    });
    show(tab);
  }

  App.router.register("hesap", render);
})();
