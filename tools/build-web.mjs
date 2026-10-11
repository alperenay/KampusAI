// build-web.mjs — uygulamanın web dosyalarını bir klasöre kopyalar (Windows, Android ve iPhone sürümleri için ortak)
//   node tools/build-web.mjs <hedef-klasör> [--version 1.0.12]
// Hedefe ayrıca precache.json (çevrimdışı önbellek listesi) yazar ve sw.js'deki sürümü günceller.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.resolve(process.argv[2] || "dist/web");
const vi = process.argv.indexOf("--version");
const appVersion = vi > -1 ? process.argv[vi + 1] : "";
const ENTRIES = ["index.html", "manifest.webmanifest", "sw.js", "css", "js", "assets"];

fs.rmSync(out, { recursive: true, force: true });
const files = [];
function copy(rel) {
  const src = path.join(ROOT, rel);
  const st = fs.statSync(src);
  if (st.isDirectory()) { fs.readdirSync(src).sort().forEach((n) => copy(path.join(rel, n))); return; }
  if (/(^|[\\/])\.|\.map$/.test(rel)) return;
  const dst = path.join(out, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
  files.push(rel.split(path.sep).join("/"));
}
ENTRIES.forEach(copy);

// Ders Asistanı sunucusu (Cloudflare) adresi: varsa uygulama hiçbir ayar yapmadan internetten çalışır
const serverUrl = (process.env.DA_SERVER_URL || "").trim();
fs.writeFileSync(path.join(out, "js", "config.js"), "App.config = " + JSON.stringify({ serverUrl }) + ";\n");
if (serverUrl) console.log("sunucu: " + serverUrl);
if (appVersion) {
  // Ayarlar penceresinde görünen sürüm
  fs.writeFileSync(path.join(out, "js", "version.js"), "App.version = " + JSON.stringify(appVersion) + ";\n");
}

const hash = crypto.createHash("sha256");
files.forEach((f) => { hash.update(f); hash.update(fs.readFileSync(path.join(out, f))); });
const version = (appVersion ? appVersion + "-" : "") + hash.digest("hex").slice(0, 10);

const precache = ["./"].concat(files.filter((f) => f !== "sw.js"));
fs.writeFileSync(path.join(out, "precache.json"), JSON.stringify({ version, files: precache }, null, 0));
const sw = path.join(out, "sw.js");
fs.writeFileSync(sw, fs.readFileSync(sw, "utf8").replace('const VERSION = "dev";', "const VERSION = " + JSON.stringify(version) + ";"));
console.log("web → " + out + " (" + files.length + " dosya, sürüm " + version + ")");
