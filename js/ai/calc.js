/* =========================================================
   calc.js — yapay zekanın "hesapla" aracı (güvenli hesap makinesi)

   Cihazdaki küçük model (Gemma 4 E4B) uzun matematik çözümlerinde işlemi kafadan
   yapınca hata yapabiliyor. Bu araçla model işlemi gönderir, sonucu biz hesaplarız:
     hesapla("(3/4 + 2/3) * 12") → "17"
   Kod çalıştırılmaz (eval yok): ifade ayrıştırılır, yalnızca izin verilen işlemler uygulanır.
   Kurallar egitim/scripts/hesap.py ile aynıdır (YKS testinde ölçülen sürüm).
   ========================================================= */
(function () {
  const rad = (x) => (x * Math.PI) / 180;
  const deg = (x) => (x * 180) / Math.PI;
  const intArg = (x) => {
    if (!Number.isInteger(x) || x < 0 || x > 500) throw new Error("tam sayı (0–500) gerekir");
    return x;
  };
  const fact = (n) => { intArg(n); let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };
  const perm = (n, r) => { intArg(n); intArg(r); if (r > n) return 0; let p = 1; for (let i = 0; i < r; i++) p *= n - i; return p; };
  const comb = (n, r) => { intArg(n); intArg(r); if (r > n) return 0; r = Math.min(r, n - r); let c = 1; for (let i = 1; i <= r; i++) c = (c * (n - r + i)) / i; return Math.round(c); };
  const gcd = (a, b) => { intArg(Math.abs(a)); intArg(Math.abs(b)); a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const FN = {
    sqrt: Math.sqrt, kok: Math.sqrt, cbrt: Math.cbrt, abs: Math.abs, round: Math.round, floor: Math.floor, ceil: Math.ceil,
    sin: (x) => Math.sin(rad(x)), cos: (x) => Math.cos(rad(x)), tan: (x) => Math.tan(rad(x)),
    asin: (x) => deg(Math.asin(x)), acos: (x) => deg(Math.acos(x)), atan: (x) => deg(Math.atan(x)),
    log: (x, b) => (b === undefined ? Math.log10(x) : Math.log(x) / Math.log(b)), ln: Math.log, log2: Math.log2,
    factorial: fact, fakt: fact, comb, perm, gcd, ebob: gcd,
    lcm: (a, b) => Math.abs(a * b) / gcd(a, b), ekok: (a, b) => Math.abs(a * b) / gcd(a, b),
    min: Math.min, max: Math.max
  };
  const CONST = { pi: Math.PI, "π": Math.PI, e: Math.E };

  function evaluate(src) {
    const s = String(src).replace(/×/g, "*").replace(/÷/g, "/").replace(/√/g, "sqrt").replace(/\*\*/g, "^");
    if (s.length > 300) throw new Error("ifade çok uzun");
    let i = 0;
    const peek = () => { while (s[i] === " ") i++; return s[i]; };
    const eat = (c) => { if (peek() === c) { i++; return true; } return false; };
    function number() {
      const m = /^(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?/.exec(s.slice(i));
      if (!m) return null;
      i += m[0].length;
      return parseFloat(m[0]);
    }
    function primary() {
      peek();
      if (eat("(")) { const v = expr(); if (!eat(")")) throw new Error("')' eksik"); return v; }
      const n = number();
      if (n !== null) return n;
      const m = /^[A-Za-zπ][A-Za-z0-9_]*/.exec(s.slice(i));
      if (!m) throw new Error("beklenmeyen karakter: " + (s[i] || "son"));
      i += m[0].length;
      const name = m[0];
      if (eat("(")) {
        if (!FN[name]) throw new Error("bilinmeyen işlev: " + name);
        const args = [];
        if (!eat(")")) { do { args.push(expr()); } while (eat(",")); if (!eat(")")) throw new Error("')' eksik"); }
        return FN[name](...args);
      }
      if (name in CONST) return CONST[name];
      throw new Error("bilinmeyen ad: " + name);
    }
    function power() {                       // ^ sağdan birleşir ve tekli eksiden önce gelir: -3^2 = -9
      const base = primary();
      if (eat("^")) {
        const ex = unary();
        if (Math.abs(ex) > 1000) throw new Error("üs çok büyük");
        if (base < 0 && !Number.isInteger(ex)) throw new Error("negatif sayının kesirli kuvveti gerçek sayı değil (küp kök için cbrt kullan)");
        return Math.pow(base, ex);
      }
      return base;
    }
    function unary() { if (eat("-")) return -unary(); if (eat("+")) return unary(); return power(); }
    function term() {
      let v = unary();
      for (;;) {
        if (eat("*")) v *= unary();
        else if (eat("/")) { const d = unary(); if (d === 0) throw new Error("sıfıra bölme"); v /= d; }
        else if (eat("%")) v %= unary();
        else return v;
      }
    }
    function expr() {
      let v = term();
      for (;;) { if (eat("+")) v += term(); else if (eat("-")) v -= term(); else return v; }
    }
    const v = expr();
    if (peek() !== undefined) throw new Error("fazla karakter: " + s.slice(i));
    if (!Number.isFinite(v)) throw new Error("sonuç tanımsız");
    return v;
  }

  /** Sonucu okunur yaz: tam sayı, basit kesir (≈ ondalık) ya da 10 anlamlı basamak */
  function format(v) {
    if (Math.abs(v - Math.round(v)) < 1e-9 && Math.abs(v) < 1e15) return String(Math.round(v));
    for (let d = 2; d <= 1000; d++) {
      const n = v * d;
      if (Math.abs(n - Math.round(n)) < 1e-9) return Math.round(n) + "/" + d + " (≈ " + Number(v.toPrecision(6)) + ")";
    }
    return String(Number(v.toPrecision(10)));
  }

  function run(ifade) {
    try { return format(evaluate(ifade)); } catch (e) { return "Hata: " + (e && e.message); }
  }

  const TOOL = {
    type: "function",
    function: {
      name: "hesapla",
      description: "Bir matematik ifadesini kesin olarak hesaplar. Toplama, çarpma, kesir, üs, kök gibi her sayısal işlemde kafadan hesaplamak yerine bunu kullan. Desteklenenler: + - * / ^ % ( ), sqrt, cbrt, abs, sin/cos/tan (derece), log(x) (10 tabanı), log(x, b), ln, factorial, comb(n,r), perm(n,r), gcd, lcm, pi, e.",
      parameters: { type: "object", properties: { ifade: { type: "string", description: "Ör. (3/4 + 2/3) * 12" } }, required: ["ifade"] }
    }
  };
  const INSTRUCTION_TR = "Bir hesap gerektiğinde (toplama, çarpma, kesir, üs, kök, trigonometri) sonucu kafadan bulma; hesapla aracını çağır ve aracın verdiği sonucu kullan.";
  const INSTRUCTION_EN = "Whenever a calculation is needed (arithmetic, fractions, powers, roots, trigonometry), don't compute it in your head; call the hesapla tool and use its result.";

  /** Bir araç çağrısını çalıştır: { name, args } → sonuç metni */
  function call(name, args) {
    if (name !== "hesapla") return "Bilinmeyen araç: " + name;
    if (typeof args === "string") { try { args = JSON.parse(args); } catch (e) { args = { ifade: args }; } }
    return run((args && args.ifade) || "");
  }

  App.calc = {
    TOOL, call, run, evaluate,
    instruction: () => (App.i18n && App.i18n.lang === "en" ? INSTRUCTION_EN : INSTRUCTION_TR),
    /** Ayarlar → Yapay zeka → "Matematikte hesap makinesi kullan" (cihazdaki model için) */
    enabled: () => App.prefs.get("aiHesap", true) !== false
  };
})();
