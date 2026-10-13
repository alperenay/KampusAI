// Gerçek yapay zekâyla içerik denemesi (GitHub Actions'ta elle çalıştırılır: "Yapay zekâ içerik denemesi").
// Uygulamanın kendi istem (prompt) ve doğrulama kodunu kullanır: konu listesi + bir konu anlatımı üretir,
// JSON'u ayrıştırır, formülleri KaTeX ile çizmeyi dener ve özet yazar.
//   node tools/ai-check.mjs <sunucu-adresi> [10/kimya 11/tarih …]
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const [base, ...subjects] = process.argv.slice(2);
if (!base) { console.error("sunucu adresi gerekli"); process.exit(2); }
const MODEL = process.env.AI_MODEL || "gemini-3.5-flash-lite";

const ctx = { console, setTimeout, clearTimeout, DOMParser: class { parseFromString(s) { return { body: { textContent: String(s).replace(/<[^>]+>/g, "") } }; } } };
ctx.window = ctx;
ctx.App = {
  data: { content: {} }, modules: {},
  t: (k, p) => k === "grade.name" ? p.n + ". Sınıf" : k,
  L: (v) => (v && typeof v === "object" ? v.tr : String(v || "")),
  i18n: { lang: "tr" },
  utils: { debounce: (f) => f },
  db: { on() {}, getAll: async () => [], put: async () => {} }
};
vm.createContext(ctx);
for (const f of ["js/data/curriculum-data.js", "js/ai/pipeline.js", "js/modules/lessons.js"]) vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename: f });
const App = ctx.App;
const katex = require(path.join(ROOT, "assets/vendor/katex/katex.min.js"));

async function generate({ system, prompt }) {
  const body = { contents: [{ role: "user", parts: [{ text: prompt }] }], systemInstruction: { parts: [{ text: system }] }, generationConfig: { temperature: 0.4, responseMimeType: "application/json" } };
  const t0 = Date.now();
  const r = await fetch(base.replace(/\/+$/, "") + "/v1beta/models/" + MODEL + ":streamGenerateContent?alt=sse", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const raw = await r.text();
  if (!r.ok) throw new Error("HTTP " + r.status + " " + raw.slice(0, 300));
  let text = "";
  raw.split(/\r?\n/).filter((l) => l.startsWith("data:")).forEach((l) => {
    try { const j = JSON.parse(l.slice(5)); (j.candidates?.[0]?.content?.parts || []).forEach((p) => { if (!p.thought && p.text) text += p.text; }); } catch (e) { /* yarım satır */ }
  });
  return { text, ms: Date.now() - t0 };
}

function mathCheck(s) {
  const bad = [];
  const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let m, n = 0;
  while ((m = re.exec(s))) { n++; try { katex.renderToString(m[1] || m[2], { throwOnError: true, displayMode: !!m[1] }); } catch (e) { bad.push((m[1] || m[2]).slice(0, 60) + " → " + String(e.message).slice(0, 80)); } }
  return { n, bad };
}

const out = [];
const note = (s) => { out.push(s); console.log("::notice::" + s.replace(/\n/g, " ")); };
let failed = 0;
for (const gs of (subjects.length ? subjects : ["10/kimya"])) {
  const [g, sid] = gs.split("/");
  const C = App.data.curriculum;
  const grade = C.findGrade(g), subject = C.findSubject(g, sid);
  try {
    const sp = App.lessons.syllabusPrompt(grade, subject);
    const r1 = await generate(sp);
    const units = App.lessons.normalizeSyllabus(App.ai.parseJSON(r1.text));
    App.lessons.apply([{ id: "syl:" + gs, units, model: MODEL }]);
    const nOut = units.reduce((a, u) => a + u.outcomes.length, 0);
    note(gs + " konu listesi (" + r1.ms + " ms): " + units.length + " ünite, " + nOut + " kazanım — " + units.map((u) => u.name).join(" | ").slice(0, 400));
    const u = subject.units[0], k = u.outcomes[0];
    const f = App.lessons.find(g + "/" + sid + "/" + u.id + "/" + k.id);
    const r2 = await generate(App.lessons.lessonPrompt(f));
    let les;
    try { les = App.lessons.normalizeLesson(App.ai.parseJSON(r2.text)); }
    catch (e) {
      const pos = Number((String(e.message).match(/position (\d+)/) || [])[1]);
      out.push("---- " + gs + " HAM ÇIKTI (" + e.message + ") ----\n" + (pos ? "…" + r2.text.slice(Math.max(0, pos - 300), pos) + " ⟦HATA⟧ " + r2.text.slice(pos, pos + 200) + "…\n\n" : "") + r2.text);
      throw e;
    }
    const all = App.ai.fixMath([les.anlatim, ...les.ornekler.map((o) => o.soru + " " + o.cozum), ...les.ozet].join("\n"));
    const mc = mathCheck(all);
    note(gs + " anlatım \"" + k.title + "\" (" + r2.ms + " ms): " + les.anlatim.split(/\s+/).length + " kelime, " + les.ornekler.length + " örnek, " + les.ozet.length + " hap bilgi, " + mc.n + " formül, çizilemeyen: " + mc.bad.length + (mc.bad.length ? " (" + mc.bad.slice(0, 3).join("; ") + ")" : ""));
    out.push("---- " + gs + " anlatım ----\n" + les.anlatim + "\n\nÖRNEKLER:\n" + les.ornekler.map((o, i) => (i + 1) + ") " + o.soru + "\n   → " + o.cozum).join("\n") + "\n\nHAP:\n- " + les.ozet.join("\n- "));
    if (mc.bad.length > 2) failed++;
  } catch (e) {
    failed++;
    note(gs + " HATA: " + String(e.message || e).slice(0, 300));
  }
}
fs.mkdirSync("ai-check", { recursive: true });
fs.writeFileSync("ai-check/sonuc.txt", out.join("\n\n"));
process.exit(failed ? 1 : 0);
