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
// 96x96 gri zemin üzerinde yazı benzeri çizgiler olan PNG (Node ile üretilir)
import zlib from "node:zlib";
function png(w, h) {
  const raw = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y++) { raw[y * (w * 3 + 1)] = 0; for (let x = 0; x < w; x++) { const o = y * (w * 3 + 1) + 1 + x * 3; const ink = (y % 12 < 3) && x > 8 && x < w - 8; raw[o] = ink ? 20 : 235; raw[o + 1] = ink ? 20 : 60; raw[o + 2] = ink ? 20 : 60; } }
  const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const crc = Buffer.alloc(4); crc.writeUInt32BE(zlib.crc32 ? zlib.crc32(td) >>> 0 : 0); return Buffer.concat([len, td, crc]); };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]).toString("base64");
}
const BIG = png(96, 96);
const Q = { contents: [{ role: "user", parts: [{ text: "2x+3=11 ise x kaç? Kısa cevap." }] }], systemInstruction: { parts: [{ text: SYS }] } };
for (const m of gemmas.slice(0, 2)) {
  await call(m, Q, "varsayilan");
  await call(m, { ...Q, generationConfig: { thinkingConfig: { thinkingBudget: 0 } } }, "budget0");
  await call(m, { ...Q, generationConfig: { thinkingConfig: { includeThoughts: false } } }, "noThoughts");
  await call(m, { contents: [{ role: "user", parts: [{ inlineData: { mimeType: "image/png", data: BIG } }, { text: "Bu görselin zemin rengi ne? Tek kelime." }] }] }, "image96");
}
fs.mkdirSync("gemma-check", { recursive: true });
fs.writeFileSync("gemma-check/sonuc.json", JSON.stringify(out, null, 1));
