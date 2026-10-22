// cevre-check.mjs — "Çevrendeki Fiziği Bul" (Modül 2) modelini sınar: formüller, şema onarımı, cevap denetimi
//   node tools/cevre-check.mjs
// Formüller bağımsız sayısal entegrasyonla (küçük adımlı Euler / RK4) karşılaştırılır; yapay zekâdan
// gelebilecek bozuk ya da yanlış JSON örnekleriyle doğrulayıcı ve fizik denetimi denenir.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
vm.runInThisContext(fs.readFileSync(path.join(ROOT, "js/modules/cevre-model.js"), "utf8"), { filename: "cevre-model.js" });
const C = globalThis.CevreFizik, M = C.MODELS, DEG = Math.PI / 180;
let fails = 0;
const check = (ok, msg) => { console.log((ok ? "  ✓ " : "  ✗ ") + msg); if (!ok) fails++; };
const close = (a, b, tol) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));

console.log("1) Formüller ↔ sayısal entegrasyon");
{
  // eğik atış: küçük adımlı Euler
  const s = { g: 10, v0: 14, theta: 35, h: 6 };
  let x = 0, y = s.h, vx = s.v0 * Math.cos(s.theta * DEG), vy = s.v0 * Math.sin(s.theta * DEG), t = 0, ymax = y; const dt = 1e-5;
  while (y >= 0) { vy -= s.g * dt; x += vx * dt; y += vy * dt; t += dt; ymax = Math.max(ymax, y); }
  const q = M.egik_atis.q;
  check(close(q.ucus_suresi[1](s), t, 1e-3) && close(q.menzil[1](s), x, 1e-3) && close(q.max_yukseklik[1](s), ymax, 1e-3), `eğik atış: süre ${t.toFixed(3)} s, menzil ${x.toFixed(2)} m, tepe ${ymax.toFixed(2)} m`);
  check(close(q.carpma_hizi[1](s), Math.hypot(vx, vy), 1e-3), `eğik atış: çarpma hızı ${Math.hypot(vx, vy).toFixed(2)} m/s`);
  // serbest düşme
  const f = { g: 10, h: 20 };
  check(close(M.serbest_dusme.q.sure[1](f), 2, 1e-9) && close(M.serbest_dusme.q.carpma_hizi[1](f), 20, 1e-9), "serbest düşme: 20 m → 2 s, 20 m/s");
  // sarkaç: RK4, küçük genlikte periyot 2π√(L/g); büyük genlikte en büyük hız enerjiden
  const pend = (L, g, th0) => {
    let th = th0 * DEG, w = 0, t2 = 0, crossings = 0, last = th, tFirst = 0, vmax = 0; const h = 1e-4, f2 = (a) => (-g / L) * Math.sin(a);
    while (crossings < 2) {                                         // aynı yönde iki ardışık geçiş arası = bir periyot
      const k1 = [w, f2(th)], k2 = [w + h / 2 * k1[1], f2(th + h / 2 * k1[0])], k3 = [w + h / 2 * k2[1], f2(th + h / 2 * k2[0])], k4 = [w + h * k3[1], f2(th + h * k3[0])];
      th += h / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]); w += h / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]); t2 += h;
      vmax = Math.max(vmax, Math.abs(w) * L);
      if (last > 0 && th <= 0) { crossings++; if (crossings === 1) tFirst = t2; } last = th;
    }
    return { T: (t2 - tFirst), vmax };
  };
  const small = pend(2, 10, 3), big = pend(2, 10, 45);
  check(close(M.sarkac.q.periyot[1]({ L: 2, g: 10, theta: 3 }), small.T, 2e-3), `salıncak (L = 2 m, 3°): periyot ${small.T.toFixed(3)} s ≈ 2π√(L/g)`);
  check(close(M.sarkac.q.en_buyuk_hiz[1]({ L: 2, g: 10, theta: 45 }), big.vmax, 2e-3), `salıncak (45°): en büyük hız ${big.vmax.toFixed(3)} m/s (enerjiden)`);
  // eğik düzlem: kuvvetlerden ivme, sonra yol
  const d = { g: 10, theta: 37, m: 5, mu_s: 0.4, mu_k: 0.25, L: 4 };
  const a = 10 * Math.sin(37 * DEG) - 0.25 * 10 * Math.cos(37 * DEG);
  let v = 0, xs = 0, ts = 0; while (xs < d.L) { v += a * 1e-5; xs += v * 1e-5; ts += 1e-5; }
  check(close(M.egik_duzlem.q.ivme[1](d), a, 1e-9) && close(M.egik_duzlem.q.son_hiz[1](d), v, 1e-3) && close(M.egik_duzlem.q.sure[1](d), ts, 1e-3), `kaydırak (37°, μk = 0,25, 4 m): a = ${a.toFixed(2)} m/s², v = ${v.toFixed(2)} m/s`);
  check(M.egik_duzlem.q.ivme[1]({ g: 10, theta: 15, m: 5, mu_s: 0.5, mu_k: 0.4, L: 4 }) === 0, "statik sürtünme yeterliyse kaymaz (tan 15° < 0,5 → a = 0)");
  // ısınma: 1,5 kg su 20 → 100 °C, 2000 W
  check(close(M.isinma.q.sure[1]({ m: 1.5, P: 2000, T0: 20, T1: 100, verim: 1 }), 252, 1e-9), "çaydanlık: 1,5 kg, 2000 W, 20→100 °C → 252 s");
}

console.log("2) Şema doğrulama ve onarım");
{
  check(!C.validate(null).ok && C.validate("x").reason === "format", "nesne olmayan cevap reddedildi");
  const none = C.validate({ model: "yok", neden: "fotoğrafta yalnız bir kedi var" });
  check(!none.ok && none.reason === "none" && /kedi/.test(none.why), "model: yok → neden gösterilir");
  check(C.validate({ model: "roket", soru: "x", secenekler: ["1", "2", "3"] }).reason === "model", "bilinmeyen model reddedildi");
  const r = C.validate({
    model: "Sarkaç", soru: "Salıncağın periyodu kaçtır?", secenekler: { A: "A) 1,4 s", B: "B) 2,8 s", C: "C) 4 s", D: "D) 5,6 s", E: "E) 8 s" }, dogru: "b)",
    istenen: "periyot", cozum: "T = 2π√(L/g)\nT ≈ 2,8 s", sim: { L: "2 m", theta: "30°", g: "10" }, nesneler: ["salıncak", { ad: "zincir", tahmin: "≈ 2 m" }], konu: { sinif: "12", unite: "Basit harmonik hareket" }
  });
  check(r.ok && r.data.model === "sarkac" && r.data.dogru === 1 && r.data.secenekler[1] === "2,8 s", "Türkçe model adı, {A:…} seçenekler, \"A)\" önekleri ve \"b)\" cevabı onarıldı");
  check(r.ok && r.data.sim.L === 2 && r.data.sim.theta === 30 && r.data.cozum.length === 2 && r.data.nesneler.length === 2 && r.data.konu.sinif === 12, "\"2 m\" gibi metin sayılar, metin çözüm ve karışık nesne listesi");
  const c = C.validate({ model: "sarkac", soru: "q", secenekler: ["1", "2", "3", "4", "5"], dogru: "A", sim: { L: 4.5, theta: 95 } });
  check(c.ok && c.data.sim.L === 3 && c.data.sim.theta === 70 && c.clamped.length === 2, "aralık dışı değerler deneyin sınırına sığdırıldı (L 4,5 → 3 m, 95° → 70°) ve not düşüldü");
  const dz = C.validate({ model: "egik_duzlem", soru: "q", secenekler: ["1", "2", "3", "4", "5"], dogru: "A", sim: { theta: 30, mu_s: 0.2, mu_k: 0.5 } });
  check(dz.ok && dz.data.sim.mu_k === 0.2 && dz.data.sim.L === 3, "μk > μs düzeltildi, eksik alan (L) varsayılanla dolduruldu");
  const hz = C.validate({ model: "isinma", soru: "q", secenekler: ["1", "2", "3", "4", "5"], dogru: "A", sim: { m: 1, P: 2000, T0: 30, T1: 20 } });
  check(hz.ok && hz.data.sim.T1 > hz.data.sim.T0, "son sıcaklık ilk sıcaklıktan küçük gelirse düzeltildi");
  check(C.validate({ model: "sarkac", soru: "", secenekler: ["1", "2", "3"] }).reason === "question" && C.validate({ model: "sarkac", soru: "q", secenekler: ["1"] }).reason === "options", "boş soru ya da eksik seçenek reddedildi");
}

console.log("3) Fizik denetimi (yapay zekânın cevabı formülle sınanır)");
{
  const base = () => C.validate({ model: "serbest_dusme", soru: "20 m'den bırakılan top yere kaç saniyede düşer?", secenekler: ["1 s", "2 s", "4 s", "√2 s", "20 s"], dogru: "B", istenen: "sure", sim: { h: 20, g: 10 } }).data;
  let d = base(), v = C.verify(d);
  check(v.status === "ok" && d.dogru === 1, "doğru cevap onaylandı (2 s)");
  d = base(); d.dogru = 2; v = C.verify(d);
  check(v.status === "fixed" && d.dogru === 1, "yanlış işaretlenen cevap düzeltildi (C → B)");
  d = C.validate({ model: "serbest_dusme", soru: "q", secenekler: ["1 s", "3 s", "4 s", "5 s", "6 s"], dogru: "D", istenen: "sure", sim: { h: 20 } }).data; v = C.verify(d);
  const n = d.secenekler.map(C.num);
  check(v.status === "rewritten" && n[d.dogru] === 2 && n.filter((x) => Math.abs(x - 2) < 0.1).length === 1, `hiçbir şık tutmayınca doğru şık yeniden yazıldı: ${d.secenekler.join(" · ")}`);
  d = C.validate({ model: "enerji", soru: "q", secenekler: ["1", "2", "3", "4", "5"], dogru: "A", istenen: "son_hiz", sim: { h: 5, m: 2, mu: 0.1 } }).data;
  check(C.verify(d).status === "skip", "sürtünmeli yolda (yol uzunluğu bilinmeden) denetim atlandı, yanlış düzeltme yapılmadı");
  d = C.validate({ model: "isinma", soru: "q", secenekler: ["2,5 dk", "252 s", "100 s", "500 s", "50 s"], dogru: "B", istenen: "sure", sim: { m: 1.5, P: 2000, T0: 20, T1: 100 } }).data;
  check(C.verify(d).status === "ok", "ondalık virgüllü ve birimli şıklar okundu (252 s)");
}

console.log("4) İstem ve deney eşlemesi");
{
  const p = C.prompt("tr");
  check(Object.keys(M).every((k) => p.includes(k)) && Object.values(M).every((m) => Object.keys(m.q).every((q) => p.includes(q))), "istem tüm modelleri ve istenen nicelikleri içeriyor (şema tek kaynaktan)");
  const labs = fs.readFileSync(path.join(ROOT, "js/modules/labs.js"), "utf8") + fs.readFileSync(path.join(ROOT, "js/modules/labs-fizik.js"), "utf8");
  const missing = Object.values(M).filter((m) => !new RegExp("(add\\(\"" + m.lab + "\"|\\b" + m.lab + ": \\{)").test(labs)).map((m) => m.lab);
  check(!missing.length, "her model var olan bir deneye bağlı" + (missing.length ? " (eksik: " + missing.join(", ") + ")" : ""));
  const pr = C.preset(C.validate({ model: "egik_atis", soru: "q", secenekler: ["1", "2", "3"], dogru: "A", sim: { v0: 12, theta: 30, h: 1.5 } }).data);
  check(pr.lab === "atis" && pr.preset.v === 12 && pr.preset.a === 30 && pr.preset.h === 1.5 && pr.preset.g === 10, "simülasyon değişkenleri deney kaydırıcılarına aktarıldı (v₀, θ, h, g)");
}

console.log(fails ? `\n${fails} sınama başarısız` : "\nHepsi geçti");
process.exit(fails ? 1 : 0);
