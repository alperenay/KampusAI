// İçerik dizini üreteci (v1.42): js/data/content/*.js dosyalarından ünite/kazanım İSKELETİNİ (anlatım metinleri
// olmadan) çıkarıp js/data/content-index.js'e yazar. Uygulama açılışta yalnızca bu küçük dizini yükler; ders
// anlatımları ilgili sınıf/ders açılınca App.content.ensure() ile isteğe bağlı gelir (curriculum-data.js).
// Kullanım: node tools/build-content-index.mjs          → dizini yeniden yazar
//           node tools/build-content-index.mjs --check  → dizin içerik dosyalarıyla uyuşmuyorsa çıkış kodu 1
import { fileURLToPath } from "node:url";
import fs from "node:fs"; import vm from "node:vm"; import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "js/data/content");
const out = path.join(root, "js/data/content-index.js");

export function buildIndex() {
  const index = {};
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".js")).sort()) {
    const ctx = { App: { data: {} } }; vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(path.join(dir, f), "utf8"), ctx, { filename: f });
    for (const [key, units] of Object.entries(ctx.App.data.content || {})) {
      if (index[key]) throw new Error(key + " iki dosyada tanımlı: " + index[key].f + ", " + f);
      index[key] = {
        f: f.replace(/\.js$/, ""),
        u: units.map((u) => ({
          id: u.id, name: u.name,
          outcomes: u.outcomes.map((o) => {
            const r = { id: o.id };
            if (o.code) r.code = o.code;
            r.title = o.title;
            if (o.content) r.c = 1;
            return r;
          })
        }))
      };
    }
  }
  return index;
}

function render(index) {
  const keys = Object.keys(index).sort((a, b) => {
    const [ga, sa] = a.split("/"), [gb, sb] = b.split("/");
    return Number(ga) - Number(gb) || sa.localeCompare(sb);
  });
  const body = keys.map((k) => "  " + JSON.stringify(k) + ": " + JSON.stringify(index[k])).join(",\n");
  return "/* Otomatik üretildi: node tools/build-content-index.mjs — elle düzenlemeyin.\n" +
    "   Konu anlatımı dosyalarının (js/data/content/*.js) ünite/kazanım iskeleti; anlatım metinleri ders açılınca yüklenir. */\n" +
    "App.data.contentIndex = {\n" + body + "\n};\n";
}

const text = render(buildIndex());
if (process.argv.includes("--check")) {
  const cur = fs.existsSync(out) ? fs.readFileSync(out, "utf8").replace(/\r\n/g, "\n") : "";
  if (cur !== text) { console.log("✘ js/data/content-index.js güncel değil: node tools/build-content-index.mjs"); process.exit(1); }
  console.log("✓ içerik dizini güncel");
} else {
  fs.writeFileSync(out, text);
  console.log("yazıldı:", path.relative(root, out), (text.length / 1024).toFixed(0) + " KB");
}
