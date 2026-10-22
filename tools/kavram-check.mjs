// kavram-check.mjs — Konuşan Kavram Hologramı (Modül 3) çekirdeğini sınar
//   node tools/kavram-check.mjs
// Akan cevabın cümlelere bölünmesi (harf harf gelse de), hece zarfı, PCM çözücü, istem ve katalog.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
vm.runInThisContext(fs.readFileSync(path.join(ROOT, "js/modules/kavram-model.js"), "utf8"), { filename: "kavram-model.js" });
const K = globalThis.KavramModel;
let fails = 0;
const check = (ok, msg) => { console.log((ok ? "  ✓ " : "  ✗ ") + msg); if (!ok) fails++; };

console.log("1) Akan cevabı cümlelere bölme (her cümle bitince seslendirilir)");
{
  const split = (text, step) => {
    const out = [], c = K.chunker((s) => out.push(s));
    for (let i = 0; i < text.length; i += step) c.push(text.slice(i, i + step));
    c.flush(); return out;
  };
  const text = "Merhaba! Ben mitokondriyim. Saniyede yaklaşık 3.5 milyon ATP üretebilirim, bu çok değil mi? Dr. Ahmet de öyle diyor. Peki sen ne düşünüyorsun";
  const want = ["Merhaba! Ben mitokondriyim.", "Saniyede yaklaşık 3.5 milyon ATP üretebilirim, bu çok değil mi?", "Dr. Ahmet de öyle diyor.", "Peki sen ne düşünüyorsun"];
  const a = split(text, 1), b = split(text, 7), c = split(text, 1000);
  check(JSON.stringify(a) === JSON.stringify(want), "harf harf gelse de doğru bölündü: " + a.length + " cümle");
  check(JSON.stringify(b) === JSON.stringify(want) && JSON.stringify(c) === JSON.stringify(want), "7'şer karakterlik ve tek parça akışta aynı sonuç");
  check(a[0] === "Merhaba! Ben mitokondriyim.", "çok kısa cümle (\"Merhaba!\") bir sonrakiyle birleşti (ses motoruna tek kelime gitmesin)");
  check(a.some((s) => s.includes("3.5 milyon")) && a.some((s) => s.startsWith("Dr. Ahmet")), "ondalık sayı ve kısaltma (Dr.) cümle sonu sayılmadı");
  const nl = split("Birinci satır burada\nİkinci satır da burada.", 3);
  check(nl.length === 2, "satır sonu da cümle sınırı");
  const long = split("Bu çok uzun bir cümle, " + "içinde pek çok virgül var, ".repeat(12) + "sonunda da nokta var.", 5);
  check(long.length > 1 && long.every((s) => s.length <= 220), "220 karakteri aşan cümle virgülden bölündü (" + long.length + " parça)");
  const en = split("I am a photon. I travel at about 300,000 km/s! Isn't that fast?", 2);
  check(en.length === 3 && en[1].includes("300,000"), "İngilizce ve binlik ayırıcılı sayı");
}

console.log("2) Hece zarfı (sistem seslerinde ağız / nabız için genlik)");
{
  const e = K.envelope("Merhaba, ben mitokondriyim. Hücrenin enerji santraliyim.", 1);
  const syl = e.segs.length;
  check(syl === 3 + 1 + 5 + 3 + 3 + 4, `heceler sayıldı: ${syl} (Mer-ha-ba ben mi-to-kon-dri-yim Hüc-re-nin e-ner-ji san-tra-li-yim)`);
  check(e.dur > syl * 0.17 && e.dur < syl * 0.19 * 1.25 + 0.6, `süre gerçekçi: ${e.dur.toFixed(2)} s (≈ ${(syl / e.dur).toFixed(1)} hece/s)`);
  let mx = 0, mn = 1, bad = 0;
  for (let t = 0; t <= e.dur; t += 0.005) { const v = K.levelAt(e, t); if (v < 0 || v > 1 || !isFinite(v)) bad++; mx = Math.max(mx, v); mn = Math.min(mn, v); }
  check(!bad && mx > 0.8 && mn === 0, `düzey 0..1 aralığında, heceler arasında sessizlik var (en çok ${mx.toFixed(2)})`);
  const pauseT = e.words[0].t1 + 0.08;                              // "Merhaba," sonrası virgül duraklaması
  check(K.levelAt(e, pauseT) === 0, "virgülden sonra kısa sessizlik");
  const w = e.words.map((x) => x.t0);
  check(w.every((t, i) => !i || t > w[i - 1]) && K.wordTime(e, e.words[2].i) === e.words[2].t0 && K.wordTime(e, e.words[2].i + 3) === e.words[2].t0, "sözcük olayı (onWord) zarfta doğru sözcüğe oturuyor");
  const fast = K.envelope("Merhaba, ben mitokondriyim.", 1.5), slow = K.envelope("Merhaba, ben mitokondriyim.", 0.75);
  check(fast.dur < slow.dur * 0.6, "konuşma hızı zarfı ölçekliyor");
}

console.log("3) Doğal ses (Gemini TTS) PCM çözücü");
{
  const samples = [0, 16384, -16384, 32767, -32768], buf = Buffer.alloc(samples.length * 2);
  samples.forEach((v, i) => buf.writeInt16LE(v, i * 2));
  const f = K.pcm16(buf.toString("base64"));
  check(f.length === 5 && f[0] === 0 && Math.abs(f[1] - 0.5) < 1e-6 && Math.abs(f[2] + 0.5) < 1e-6 && f[4] === -1 && f[3] > 0.9999, "16 bit işaretli PCM → −1..1 (küçük uçlu)");
  check(K.rateOf("audio/L16;codec=pcm;rate=24000") === 24000 && K.rateOf("") === 24000, "örnekleme hızı MIME'dan okunuyor");
}

console.log("4) Kişilik istemi ve katalog");
{
  const m = K.byId("mitokondri"), p = K.system(m, "tr");
  check(/BİRİNCİ TEKİL ŞAHIS/.test(p) && p.includes("Ben Mitokondri") && p.includes("ATP") && /2–4 kısa cümle/.test(p), "istem: birinci tekil şahıs, bilgi tohumu, sesli okumaya uygun kısa cümle");
  check(K.CONCEPTS.every((c) => c.id && c.ad.length === 2 && c.karakter && c.bilgi && c.selam && /\b(Ben|ben)\b/.test(c.selam) && c.sinif >= 9 && c.sinif <= 12), `katalogdaki ${K.CONCEPTS.length} kavramın hepsinde karakter, bilgi ve birinci şahıs selam var`);
  check(new Set(K.CONCEPTS.map((c) => c.id)).size === K.CONCEPTS.length, "kimlikler benzersiz");
  check(K.find("mars").id === "mars" && K.find("MİTOKONDRİ").id === "mitokondri" && K.find("Güneş").id === "gunes" && K.find("dna").id === "dna", "aramada büyük/küçük harf ve Türkçe karakter");
  const oz = K.find("Kara delik");
  check(oz.ozel && oz.tur === "orb" && /emin olduğun/.test(K.system(oz, "tr")), "katalog dışı kavram: genel görünüm ve \"uydurma\" uyarılı istem");
  check(K.plain("**Ben** $E = h \\cdot f$ 🙂 # başlık") === "Ben E eşittir h çarpı f başlık", "markdown, formül ve emoji konuşulabilir metne çevrildi");
}

console.log(fails ? `\n${fails} sınama başarısız` : "\nHepsi geçti");
process.exit(fails ? 1 : 0);
