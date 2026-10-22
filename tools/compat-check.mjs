// compat-check.mjs — eski cihaz uyumu denetimi (CI)
// iOS 16.3 ve öncesi Safari, geriye bakan düzenli ifadeleri ((?<=…), (?<!…)) ve adlı grupları ((?<ad>…))
// desteklemez: bu sözdizimi bir dosyada geçerse o dosyanın TAMAMI yüklenmez. Bu betik js/ altında arar.
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "js");
const bad = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
  const p = path.join(d, e.name);
  if (e.isDirectory()) return walk(p);
  if (!p.endsWith(".js")) return;
  fs.readFileSync(p, "utf8").split("\n").forEach((line, i) => {
    const code = line.replace(/^\s*(\/\/|\*).*$/, "");          // yorum satırları
    if (/\(\?<[=!]/.test(code) || /\(\?<[A-Za-z_$][\w$]*>/.test(code)) bad.push(path.relative(root, p) + ":" + (i + 1) + "  " + line.trim().slice(0, 120));
  });
});
walk(root);
if (bad.length) { console.error("Eski iOS ile uyumsuz düzenli ifade:\n" + bad.join("\n")); process.exit(1); }
console.log("uyumluluk: geriye bakan / adlı grup içeren düzenli ifade yok");
