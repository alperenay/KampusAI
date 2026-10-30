// v1.64 isteğe bağlı modül yükleme (js/core/lazy.js) denetimi — tarayıcı gerekmez.
//   • gruplardaki her dosya var ve hiçbiri index.html'de ayrıca (iki kez) yüklenmiyor
//   • gruptaki modüllerin kaydettiği her ekran ROUTES'ta, o modülü içeren bir grupla listelenmiş
//   • js/modules altındaki her modül bir yerden yükleniyor (index.html, lazy.js ya da loadScript)
//   • yönlendirici kancası: ekran açılınca betikler doğru sırayla istenir, ikinci kez istenmez
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");

const requested = [], needs = [];
const App = {
  router: { need: (fn) => needs.push(fn) },
  utils: { loadScript: (src) => { requested.push(src); return Promise.resolve(); } }
};
vm.runInNewContext(read("js/core/lazy.js"), { App });
const { GROUPS, ROUTES } = App.lazy;
assert.equal(needs.length, 1, "lazy.js registers one router hook");

const html = read("index.html");
const eager = new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]));
assert.ok(eager.has("js/core/lazy.js") && eager.has("js/core/sanitize.js"), "lazy.js and sanitize.js are loaded");
assert.ok([...eager].indexOf("js/core/lazy.js") > [...eager].indexOf("js/core/router.js"), "lazy.js loads after router.js");

const lazyFiles = new Set();
for (const [name, files] of Object.entries(GROUPS)) {
  assert.ok(files.length, "group " + name + " is not empty");
  for (const f of files) {
    assert.ok(fs.existsSync(path.join(root, f)), "missing lazy file " + f);
    assert.ok(!eager.has(f), f + " is both lazy and in index.html");
    lazyFiles.add(f);
  }
}
const groupsOf = (spec) => (typeof spec === "function" ? spec({ name: "", params: ["9", "fizik", "u1", "k1"], path: "" }) : spec) || [];
for (const [route, spec] of Object.entries(ROUTES)) {
  for (const g of groupsOf(spec)) assert.ok(GROUPS[g], "route " + route + " uses unknown group " + g);
}

// Lazy modules may only register screens that ROUTES loads them for.
let screens = 0;
for (const f of lazyFiles) {
  if (!f.startsWith("js/modules/")) continue;
  for (const m of read(f).matchAll(/router\.register\(\s*["']([^"']+)["']/g)) {
    const route = m[1];
    assert.ok(ROUTES[route], f + " registers #/" + route + " but lazy.js does not load it for that screen");
    assert.ok(groupsOf(ROUTES[route]).some((g) => GROUPS[g].includes(f)), "#/" + route + " does not load " + f);
    screens++;
  }
}

// Every module file is reachable from somewhere.
const sources = [html, ...[...eager].filter((f) => f.endsWith(".js") && fs.existsSync(path.join(root, f))).map(read), ...[...lazyFiles].map(read), read("js/core/lazy.js")].join("\n");
for (const f of fs.readdirSync(path.join(root, "js/modules")).filter((n) => n.endsWith(".js"))) {
  const rel = "js/modules/" + f;
  assert.ok(eager.has(rel) || lazyFiles.has(rel) || sources.includes(rel) || sources.includes('"' + f + '"'), rel + " is never loaded");
}

// Router hook: first visit loads in order, second visit asks nothing.
const visit = async (name, params = []) => { const p = needs[0]({ name, params, path: [name, ...params].join("/") }); if (p) await p; };
await visit("oyunlar");
assert.deepEqual(requested, [...GROUPS.labs, ...GROUPS.games], "labs load before games");
requested.length = 0;
await visit("oyunlar");
assert.equal(requested.length, 0, "a loaded group is not requested again");
assert.equal(needs[0]({ name: "konular", params: ["9", "fizik"], path: "" }), null, "subject list needs no lazy group");
await visit("konular", ["9", "fizik", "u1", "k1"]);
assert.deepEqual(requested, [...GROUPS.podcast, ...GROUPS.meslek], "outcome page loads podcast and careers (labs already loaded)");
assert.equal(needs[0]({ name: "", params: [], path: "" }), null, "home needs nothing");

const kb = (files) => Math.round(files.reduce((n, f) => n + fs.statSync(path.join(root, f)).size, 0) / 1024);
console.log("Lazy modules: " + Object.keys(GROUPS).length + " groups, " + lazyFiles.size + " files (" + kb([...lazyFiles]) + " KB) off the startup path, " +
  screens + " screens covered; startup loads " + eager.size + " scripts (" + kb([...eager].filter((f) => f.endsWith(".js"))) + " KB).");
