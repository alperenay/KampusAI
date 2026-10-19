// Worker + sahte Gemini (JSON yanıtlar dahil) + SyncRoom (node:sqlite ile)
import http from "node:http";
import { DatabaseSync } from "node:sqlite";
import worker, { SyncRoom } from "/home/claude/ders-asistani/server/worker.js";
const LOG = [];
const realFetch = globalThis.fetch;
const quizJSON = () => {
  // Bilerek ham LaTeX (\frac → JSON'da \f kaçışı) içeriyor: parseJSON onarımını sınar
  const qs = Array.from({ length: 10 }, (_, i) => '{"q":"Soru ' + (i + 1) + ': $\\frac{1}{2}+' + i + '$ kaçtır?","options":["A) ' + i + '","B) ' + (i + 0.5) + '","C) ' + (i + 1) + '","D) ' + (i + 2) + '","E) ' + (i + 3) + '"],"answer":"B","explain":"$\\frac{1}{2}$ eklenir."}');
  return '```json\n{"questions":[' + qs.join(",") + ']}\n```';
};
const feyJSON = (sys) => {
  const long = /DÜZELTİLMİŞ/.test(sys);
  return '{"scores":{"accuracy":' + (long ? 9 : 6) + ',"coverage":' + (long ? 8 : 4) + ',"clarity":7,"example":' + (long ? 8 : 2) + '},' +
    '"summary":"Temel fikri doğru kurmuşsun.","strengths":["Kümeyi doğru tanımladın"],"missing":["Boş küme örneği yok","$\\\\frac{1}{2}$ gibi kesirler"],' +
    '"misconceptions":[{"claim":"Her küme sonludur","fix":"Doğal sayılar kümesi sonsuzdur"}],"simpler":"Küme, iyi tanımlanmış nesneler topluluğudur. Örneğin $\\frac{1}{2}$ bir rasyonel sayıdır.","questions":["Boş küme nedir?","Sonsuz küme örneği ver.","Eleman ile alt küme farkı nedir?"]}';
};
const planJSON = () => JSON.stringify({ summary: "Matematiğe ağırlık verildi.", blocks: [0,1,2,3,4,5,6].flatMap((d) => [
  { day: d, start: "17:00", end: "17:50", subject: "Matematik", kind: "ders", note: "Türev" },
  { day: d, start: "17:30", end: "18:00", subject: "Çakışan", kind: "soru" },
  { day: d, start: "18:00", end: "18:50", subject: "Fizik", kind: d === 6 ? "deneme" : "soru", note: "30 soru" }]) });
const sylJSON = (sys) => JSON.stringify({ units: [1, 2, 3].map((u) => ({ name: "Ünite " + u + (sys.includes("Kimya") ? " Kimya" : ""), outcomes: [1, 2, 3].map((k) => ({ title: "Kazanım " + u + "." + k + " açıklar", code: "" })) })) });
const lesJSON = (sys) => '{"anlatim":"### Giriş\\nBu konu **mol kavramını** anlatır. $n=\\frac{m}{M}$ formülü kullanılır.\\n\\n- Madde 1\\n- Madde 2\\n\\n### Sık yapılan hatalar\\nBirimleri karıştırmak. ' + "Uzun açıklama. ".repeat(20) + '","ornekler":[{"soru":"18 g su kaç mol?","cozum":"$n=18/18=1$ mol."},{"soru":"2 mol H2 kaç gram?","cozum":"4 g."},{"soru":"Zor soru?","cozum":"Çözüm."}],"ozet":["Mol = kütle / mol kütlesi","Avogadro sayısı","Hap 3","Hap 4","Hap 5"]}';
const clsJSON = (sys) => { const ids = [...sys.matchAll(/id=(mis[\w-]+)/g)].map((m) => m[1]); const types = ["islem", "kavram", "dikkat"]; return JSON.stringify({ items: ids.map((id, i) => ({ id, type: types[i % 3], reason: "Seçtiğin şık " + types[i % 3] + " hatasından geliyor." })) }); };
globalThis.fetch = async (url, init = {}) => {
  url = String(url);
  if (!url.startsWith("https://generativelanguage.googleapis.com")) return realFetch(url, init);
  let body = null;
  if (init.body) { const chunks = []; for await (const c of init.body) chunks.push(Buffer.from(c)); body = JSON.parse(Buffer.concat(chunks).toString() || "{}"); }
  LOG.push({ url, body });
  if (url.includes("/models?")) return Response.json({ models: ["gemini-3.5-flash-lite", "gemini-3.5-flash", "gemini-embedding-001"].map((n) => ({ name: "models/" + n, supportedGenerationMethods: n.includes("embedding") ? ["embedContent"] : ["generateContent"] })) });
  if (url.includes(":batchEmbedContents")) return Response.json({ embeddings: body.requests.map((r, i) => ({ values: Array.from({ length: 16 }, (_, j) => Math.sin(i + j + r.content.parts[0].text.length)) })) });
  if (url.includes(":streamGenerateContent")) {
    let parts;
    if (body.generationConfig && body.generationConfig.responseMimeType === "application/json") {
      const sys = JSON.stringify(body.systemInstruction || "") + JSON.stringify(body.contents);
      const chkJSON = () => JSON.stringify({ readable: true, question: "$2x-3=7$ ise $x$ kaçtır?", steps: [
        { text: "$2x-3=7$", status: "ok", note: "" }, { text: "$2x=7-3$", status: "wrong", note: "−3 karşıya geçerken işaret değişmemiş; +3 olmalı." },
        { text: "$2x=4$", status: "carry", note: "" }, { text: "$x=2$", status: "carry", note: "" }],
        firstWrong: 2, errType: "islem", errWhy: "Kural doğru ama işaret hatası yapılmış.", hint: "Bir terimi eşitliğin diğer tarafına geçirirken işaretine ne olur?",
        fix: "$2x=7+3=10$\n\n$x=5$", answer: "$x=5$", finalOk: false });
      const linksJSON = () => JSON.stringify({ links: [{ k: "u1/k2", pre: ["u1/k1"] }, { k: "u1/k3", pre: ["u1/k2"] }, { k: "u2/k1", pre: ["u1/k3", "u1/k1"] }, { k: "u2/k2", pre: ["u2/k1"] }, { k: "u1/k1", pre: ["u2/k2"] }] });
      const txt = sys.includes('\\"firstWrong\\"') ? chkJSON() : sys.includes('\\"links\\"') ? linksJSON() : sys.includes('blocks') ? planJSON() : sys.includes('scores') ? feyJSON(sys)
        : sys.includes('\\"units\\"') ? sylJSON(sys) : sys.includes('\\"anlatim\\"') ? lesJSON(sys) : sys.includes('\\"items\\"') ? clsJSON(sys) : quizJSON();
      parts = [txt.slice(0, 50), txt.slice(50)];
    } else if (JSON.stringify(body.contents || "").includes('"mimeType":"audio/')) {
      parts = ["Kuvvet bir cismin hareketini değiştiren etkidir ııı yani itme ya da çekme. ", "Birimi Newton'dur, şey, vektörel bir büyüklüktür çünkü yönü vardır."];
    } else if (JSON.stringify(body.systemInstruction || "").includes("SOKRATİK MOD AÇIK")) {
      const last = JSON.stringify(body.contents.at(-1));
      parts = last.includes("çözümü adım adım") ? ["Tam çözüm: ", "x = 3. Doğru cevap C."] : ["Sokratik: ", "Sence ilk adım ne olmalı?"];
    } else parts = ["Sunucu yanıtı", " tamam."];
    const sse = parts.map((t) => "data: " + JSON.stringify({ candidates: [{ content: { parts: [{ text: t }] } }] }) + "\r\n\r\n").join("");
    return new Response(sse, { headers: { "content-type": "text/event-stream" } });
  }
  return new Response("{}", { status: 404 });
};
// Durable Object emülasyonu
const rooms = new Map();
const mkStorage = () => { const db = new DatabaseSync(":memory:"); return { sql: { exec(q, ...args) { const st = db.prepare(q); const isSel = /^\s*SELECT/i.test(q); const rows = isSel ? st.all(...args) : (st.run(...args), []); return { toArray: () => rows }; } } }; };
const SYNC = {
  idFromName: (n) => n,
  get(id) { if (!rooms.has(id)) rooms.set(id, new SyncRoom({ storage: mkStorage() })); const room = rooms.get(id);
    return { fetch: async (u, init) => { const chunks = []; for await (const c of init.body) chunks.push(Buffer.from(c)); return room.fetch(new Request(u, { method: "POST", headers: init.headers, body: Buffer.concat(chunks) })); } }; }
};
const env = { GEMINI_API_KEY: "SECRET-KEY", RATE_CHAT: "60", RATE_EMBED: "60", RATE_SYNC: "200", SYNC };
http.createServer(async (req, res) => {
  if (req.url === "/__log") { res.end(JSON.stringify(LOG)); return; }
  if (req.url === "/__reset") { LOG.length = 0; res.end("{}"); return; }
  const chunks = []; for await (const c of req) chunks.push(c);
  const body = chunks.length ? Buffer.concat(chunks) : null;
  const r = new Request("http://127.0.0.1:8787" + req.url, { method: req.method, headers: { ...req.headers, "cf-connecting-ip": "1.2.3.4" }, body: req.method === "GET" || req.method === "HEAD" || req.method === "OPTIONS" ? undefined : body, duplex: "half" });
  const out = await worker.fetch(r, env);
  res.writeHead(out.status, Object.fromEntries(out.headers));
  if (out.body) for await (const c of out.body) res.write(c);
  res.end();
}).listen(8787, "127.0.0.1", () => console.log("worker on 8787"));

// Sahte ama anlamlı gömme: kelime köklerini (ilk 5 harf) 64 boyuta karma
function bowVec(text) {
  const v = new Array(64).fill(0);
  String(text || "").toLocaleLowerCase("tr-TR").replace(/ı/g, "i").normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9]+/).filter((w) => w.length > 2).forEach((w) => { w = w.slice(0, 5); let h = 7; for (const ch of w) h = (h * 31 + ch.charCodeAt(0)) >>> 0; v[h % 64] += 1; });
  const n = Math.sqrt(v.reduce((a, x) => a + x * x, 0)) || 1;
  return v.map((x) => x / n);
}
