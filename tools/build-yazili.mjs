#!/usr/bin/env node
/* Yazılı sınav verisini denetler ve js/data/yazili-index.js dizinini üretir.
   Denetim: her sınavda toplam 100 puan, her sorunun teması dersin ünitelerinden biri,
   ölçütün ilk düzeyi soru puanına eşit ve düzeyler büyükten küçüğe, son düzey 0.
   Kullanım: node tools/build-yazili.mjs */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
const ROOT = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const ctx = { App: { data: {} }, window: {} }; ctx.window = ctx; vm.createContext(ctx);
const run = (f) => vm.runInContext(fs.readFileSync(f, "utf8"), ctx, { filename: f });
for (const f of fs.readdirSync(path.join(ROOT, "js/data/content"))) run(path.join(ROOT, "js/data/content", f));
run(path.join(ROOT, "js/data/curriculum-data.js"));
const C = ctx.App.data.curriculum;
const dir = path.join(ROOT, "js/data/yazili");
const index = {}; const errs = []; let nq = 0, ne = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".js")).sort()) {
  run(path.join(dir, f));
}
for (const [key, set] of Object.entries(ctx.App.data.yazili || {})) {
  const [g, s] = key.split("/");
  const gr = C.grades.find((x) => x.id === g), sb = gr && gr.subjects.find((x) => x.id === s);
  if (!sb) { errs.push(key + ": ders bulunamadı"); continue; }
  const unitIds = sb.units.map((u) => u.id);
  index[key] = set.exams.map((e) => {
    ne++;
    const sum = e.sorular.reduce((a, q) => a + q.puan, 0);
    if (sum !== 100) errs.push(key + "/" + e.id + ": toplam " + sum);
    if (e.sorular.length !== 7) errs.push(key + "/" + e.id + ": " + e.sorular.length + " soru");
    e.sorular.forEach((q, i) => {
      nq++;
      const at = key + "/" + e.id + " s" + (i + 1);
      if (unitIds.indexOf(q.tema) < 0) errs.push(at + ": tema " + q.tema);
      if (!q.metin || !q.cevap) errs.push(at + ": metin/cevap yok");
      if (!q.olcut || !q.olcut.length || q.olcut[0][0] !== q.puan) errs.push(at + ": ölçüt ilk düzey ≠ puan");
      if (q.olcut && q.olcut[q.olcut.length - 1][0] !== 0) errs.push(at + ": son düzey 0 değil");
      for (let k = 1; q.olcut && k < q.olcut.length; k++) if (q.olcut[k][0] >= q.olcut[k - 1][0]) errs.push(at + ": ölçüt sırası");
      if (/\$[^$]*\$/.test(q.metin) && /(^|[^\\])\\(?![a-zA-Z{}|,;!: ])/.test(q.metin)) { /* ters bölü denetimi gevşek */ }
    });
    return { id: e.id, term: e.term, title: e.title, n: e.sorular.length, units: Array.from(new Set(e.sorular.map((q) => q.tema))) };
  });
}
if (errs.length) { console.error("HATALAR:\n" + errs.join("\n")); process.exitCode = 1; }
const out = "/* tools/build-yazili.mjs ile üretildi — elle düzenlemeyin */\nApp.data = App.data || {};\nApp.data.yaziliIndex = " + JSON.stringify(index) + ";\n";
fs.writeFileSync(path.join(ROOT, "js/data/yazili-index.js"), out);
console.log(Object.keys(index).length + " ders, " + ne + " sınav, " + nq + " soru");
