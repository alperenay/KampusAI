// Gemma 4'ün Gemini API üzerinden davranışını dener (GitHub Actions'ta, GEMINI_API_KEY ile).
// Çıktı: gemma-check/sonuc.json
import fs from "node:fs";
const KEY = process.env.GEMINI_API_KEY;
const B = "https://generativelanguage.googleapis.com/v1beta";
const H = { "content-type": "application/json", "x-goog-api-key": KEY };
const out = { at: new Date().toISOString(), models: [], tests: [] };
// 8x8 kırmızı PNG
const RED = "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAEklEQVR4nGP4z8CAFWEXHbQSACj/P8Fu7N9hAAAAAElFTkSuQmCC";

async function call(model, body, label) {
  const t0 = Date.now();
  let status = 0, text = "", thought = 0, err = "";
  try {
    const r = await fetch(`${B}/models/${model}:streamGenerateContent?alt=sse`, { method: "POST", headers: H, body: JSON.stringify(body) });
    status = r.status;
    const raw = await r.text();
    if (!r.ok) err = raw.slice(0, 400);
    raw.split(/\r?\n/).filter((l) => l.startsWith("data:")).forEach((l) => {
      try { const j = JSON.parse(l.slice(5)); (j.candidates?.[0]?.content?.parts || []).forEach((p) => { if (p.thought) thought++; else if (p.text) text += p.text; }); } catch (e) {}
    });
  } catch (e) { err = String(e); }
  const rec = { model, label, status, ms: Date.now() - t0, thoughtParts: thought, text: text.slice(0, 300), err };
  out.tests.push(rec);
  console.log(JSON.stringify(rec));
}

const lr = await fetch(`${B}/models?pageSize=1000`, { headers: H });
const lj = await lr.json();
out.models = (lj.models || []).map((m) => m.name.replace("models/", "")).filter((n) => /gemma|flash/.test(n));
const gemmas = out.models.filter((n) => /^gemma-4/.test(n));
const SYS = "Sen KampüsAI'sın, Türk lise öğrencilerine YKS için yardım eden bir öğretmensin. Kısa ve Türkçe cevap ver.";
for (const m of gemmas.slice(0, 3)) {
  await call(m, { contents: [{ role: "user", parts: [{ text: "Merhaba, adın ne? 2x+3=11 ise x kaç?" }] }], systemInstruction: { parts: [{ text: SYS }] } }, "system");
  await call(m, { contents: [{ role: "user", parts: [{ text: SYS + "\n\nMerhaba, adın ne? 2x+3=11 ise x kaç?" }] }] }, "system-in-user");
  await call(m, { contents: [{ role: "user", parts: [{ text: 'Sadece JSON: {"x": 2x+3=11 için x}' }] }], generationConfig: { responseMimeType: "application/json" } }, "json");
  await call(m, { contents: [{ role: "user", parts: [{ inlineData: { mimeType: "image/png", data: RED } }, { text: "Bu görselin rengi ne? Tek kelime." }] }] }, "image");
  await call(m, { contents: [{ role: "user", parts: [{ text: "Bir paragrafla fotosentezi anlat." }] }], generationConfig: { thinkingConfig: { thinkingLevel: "low" } } }, "thinking-low");
}
fs.mkdirSync("gemma-check", { recursive: true });
fs.writeFileSync("gemma-check/sonuc.json", JSON.stringify(out, null, 1));
