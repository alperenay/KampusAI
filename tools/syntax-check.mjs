// Bağımlılıksız sözdizimi ve yerel script/stylesheet referansı denetimi.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let count = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", "dist", "app", "www", "android", ".git"].includes(entry.name)) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(file); continue; }
    if (!/\.(js|mjs)$/.test(file)) continue;
    if (file.endsWith(".mjs") || file === path.join(root, "server", "worker.js")) {
      const run = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
      if (run.status !== 0) throw new Error(run.stderr || String(run.error));
    } else new vm.Script(fs.readFileSync(file, "utf8"), { filename: file });
    count++;
  }
}
for (const dir of ["js", "tools", "desktop", "server"]) walk(path.join(root, dir));
new vm.Script(fs.readFileSync(path.join(root, "sw.js"), "utf8"));
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const match of html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css))"/g)) {
  if (/^https?:/.test(match[1])) continue;
  if (!fs.existsSync(path.join(root, match[1]))) throw new Error("Eksik referans: " + match[1]);
}
console.log("Sözdizimi: " + count + " dosya; HTML kaynak referansları geçerli.");
