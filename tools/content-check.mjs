// İçerik doğrulayıcı: kazanım alanları, kimlik tekilliği, bozuk kaçış karakterleri ve KaTeX hataları.
// Kullanım: node tools/content-check.mjs   (çıkış kodu 1 = hata var)
import fs from "node:fs"; import vm from "node:vm"; import path from "node:path";
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "..");
const ctx = { window: {}, App: { data: {} }, console };
ctx.window = ctx; ctx.self = ctx; vm.createContext(ctx);
const run = (f) => vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
run("assets/vendor/katex/katex.min.js");
ctx.App.utils = { esc: (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])) };
run("js/core/markdown.js");
const dir = path.join(root, "js/data/content");
for (const f of fs.readdirSync(dir)) run("js/data/content/" + f);
const md = ctx.App.markdown;
const render = (s) => (md.render || md.toHtml || md)(s);
let n = 0, errs = 0, warns = 0;
const warn = (k, msg) => { warns++; if (process.argv.includes("--uyari")) console.log("·", k, msg); };
const bad = (k, msg) => { errs++; console.log("✘", k, msg); };
for (const [key, units] of Object.entries(ctx.App.data.content)) {
  const uids = new Set();
  for (const u of units) {
    if (uids.has(u.id)) bad(key, "tekrarlı ünite " + u.id); uids.add(u.id);
    if (!u.name || !u.name.tr) bad(key + "/" + u.id, "ünite adı yok");
    const oids = new Set();
    for (const o of u.outcomes) {
      n++; const k = key + "/" + u.id + "/" + o.id;
      if (oids.has(o.id)) bad(k, "tekrarlı kazanım"); oids.add(o.id);
      if (!o.title || !o.title.tr || !o.title.en) bad(k, "başlık (tr/en) eksik");
      const c = o.content || {};
      if (!c.anlatim || c.anlatim.length < 400) warn(k, "anlatım kısa/yok");
      if (!Array.isArray(c.ornekler) || !c.ornekler.length) warn(k, "örnek yok");
      if (!Array.isArray(c.ozet) || c.ozet.length < 2) warn(k, "özet eksik");
      const texts = [c.anlatim, ...(c.ornekler || []).flatMap((e) => [e.soru, e.cozum]), ...(c.ozet || [])];
      for (const t of texts) {
        if (typeof t !== "string") { bad(k, "metin değil"); continue; }
        if (/[\t\b\f\v\r]/.test(t)) bad(k, "kontrol karakteri: " + JSON.stringify(t.match(/.{0,20}[\t\b\f\v\r].{0,10}/)[0]));
        if (t.includes(String.fromCharCode(92) + '"')) bad(k, "metinde ters bölü + tırnak");
        const html = render(t);
        const m = html.match(/katex-error[^>]*title="([^"]*)"/);
        if (m) bad(k, "KaTeX: " + m[1].slice(0, 120));
        const u = html.match(/color:#cc0000;"><span class="mord" style="color:#cc0000;">([^<]*)/);
        if (u) bad(k, "KaTeX tanımsız komut: " + u[1]);
      }
    }
  }
}
console.log("kazanım:", n, "hata:", errs, "uyarı (eski içerikte örnek/özet eksikliği):", warns);
process.exit(errs ? 1 : 0);
