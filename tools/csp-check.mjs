// v1.64 içerik güvenlik politikası (js/core/csp.js) — tarayıcı gerekmez.
//   • politika açılıştaki son betikten eklenir; index.html'de sabit CSP meta etiketi yok (Chromium'da betiklerin
//     önden indirilmesini yavaşlatıyor, bkz. csp.js)
//   • betikler yalnız uygulamanın kendi adresinden; 'unsafe-inline' ve 'unsafe-eval' yok; object/base kısıtlı
//   • HTML'de ve uygulama kodunda satır içi olay işleyicisi (onclick= …) ya da javascript: adresi yok
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

assert.ok(!/http-equiv=["']?Content-Security-Policy/i.test(html), "no static CSP meta in index.html (it delays script preloading; csp.js adds it)");
const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]);
assert.equal(scripts[scripts.length - 1], "js/core/csp.js", "csp.js is the last startup script");
assert.equal(scripts[scripts.length - 2], "js/app.js", "csp.js runs right after app.js");

const added = [];
const sandbox = {
  App: {},
  document: {
    querySelector: () => null,
    createElement: () => ({}),
    head: { appendChild: (el) => added.push(el) }
  }
};
vm.runInNewContext(fs.readFileSync(path.join(root, "js/core/csp.js"), "utf8"), sandbox);
assert.equal(added.length, 1, "csp.js adds one meta element");
assert.equal(added[0].httpEquiv, "Content-Security-Policy");
assert.equal(added[0].content, sandbox.App.csp);
const policy = Object.fromEntries(added[0].content.split(";").map((d) => d.trim().split(/\s+/)).filter((d) => d[0]).map(([k, ...v]) => [k, v]));
const script = policy["script-src"] || [];
assert.ok(script.includes("'self'"), "script-src allows the app's own files");
for (const bad of ["'unsafe-inline'", "'unsafe-eval'", "'unsafe-hashes'", "*", "https:", "http:", "data:", "blob:"]) assert.ok(!script.includes(bad), "script-src must not allow " + bad);
assert.deepEqual(policy["object-src"], ["'none'"]);
assert.deepEqual(policy["base-uri"], ["'self'"]);
assert.ok(policy["default-src"] && policy["default-src"].includes("'self'"));

assert.ok(!/<[^>]+\son[a-z]+\s*=/i.test(html.replace(/<!--[\s\S]*?-->/g, "")), "no inline event handler attributes in index.html");
const offenders = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) { walk(f); continue; }
    if (!f.endsWith(".js")) continue;
    const src = fs.readFileSync(f, "utf8");
    // HTML dizelerinde on…="…" (ör. '<img onerror="…">'): CSP bunları engeller, dinleyici kullanılmalı
    if (/[\s'"]on[a-z]{3,}=\\?["']/.test(src) || /["']javascript:/i.test(src)) offenders.push(path.relative(root, f));
  }
};
walk(path.join(root, "js"));
assert.deepEqual(offenders, [], "inline handlers or javascript: URLs in app code");
console.log("CSP: added by csp.js after app.js; script-src " + script.join(" ") + "; no inline handlers in index.html or js/.");
