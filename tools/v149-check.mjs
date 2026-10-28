// v1.49 sınaması: pH renk eşleme (tolerans matrisi), vatandaş bilimi (dB, Leq, Bortle, QR paketi, birleştirme, IDW),
// ekosistem çözücüsünün sayısal kararlılığı (aşırı popülasyon, nesil tükenmesi, denge), meslek haritası puanlaması
// ve Türkçe hece ayırma. Ağ, kamera ve mikrofon gerekmez.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ctx = vm.createContext({
  App: { utils: { esc: String, uid: (p) => p + "_" + Math.random().toString(36).slice(2, 8), debounce: (f) => f, loadScript: async () => {} }, router: { register() {} },
    i18n: { lang: "tr" }, t: (k) => k, L: (s) => (s && s.tr) || s, data: {}, prefs: { get: (k, d) => d, set() {} }, lessons: { find: () => null } },
  console, TextEncoder, TextDecoder, CompressionStream, DecompressionStream, Blob, Response, btoa, atob, Date, Math, Float32Array, performance
});
for (const f of ["js/modules/ph-metre", "js/modules/vatandas", "js/modules/ekosistem", "js/modules/hece", "js/modules/sinif-modu", "js/data/kariyer", "js/modules/kariyer", "js/data/meslek-harita", "js/modules/meslek"])
  vm.runInContext(fs.readFileSync(path.join(root, f + ".js"), "utf8"), ctx, { filename: f });
const { phMetre: PH, vatandas: VB, ekosistem: EK, hece: HC, sinifModu: SM, meslek: MH } = ctx.App;
const eq = (a, b, m) => assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), m);
const near = (a, b, tol, m) => assert.ok(Math.abs(a - b) <= tol, (m || "") + " beklenen " + b + " ± " + tol + ", bulunan " + a);
let checks = 0;
async function check(name, fn) { await fn(); checks++; console.log("✓ " + name); }
let seed = 11; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) - 0.5;

/* ---------------- pH ölçer ---------------- */
await check("pH: renk uzayı dönüşümleri (HSV, CIELAB beyaz ve saf renkler)", () => {
  const w = PH.rgbToLab([255, 255, 255]); near(w.L, 100, 0.05); near(w.a, 0, 0.05); near(w.b, 0, 0.05);
  const r = PH.rgbToLab([255, 0, 0]); near(r.L, 53.24, 0.1); near(r.a, 80.09, 0.2); near(r.b, 67.2, 0.2);
  eq(PH.rgbToHsv([0, 255, 0]), { h: 120, s: 1, v: 1 });
  near(PH.rgbToHsv([255, 0, 128]).h, 329.9, 0.1);
});
await check("pH: skala ton açıları kırmızıdan sarıya tekdüze azalır", () => {
  for (let i = 1; i < PH.REF.length; i++) assert.ok(PH.REF[i].h < PH.REF[i - 1].h, "pH " + PH.REF[i].ph);
});
await check("pH: 14 başvuru rengi ±0,05 içinde ve güven aralığı gerçek değeri kapsıyor", () => {
  PH.SCALE.forEach(([ph, rgb]) => { const r = PH.estimate(rgb, [255, 255, 255]); assert.ok(r.ok); near(r.ph, ph, 0.05, "pH " + ph); assert.ok(r.lo <= ph && r.hi >= ph); });
});
// Işığın rengi doğrusal ışık uzayında çarpan olarak etki eder (kamera sRGB kodlar)
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const gam = (c) => 255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);
const lit = (rgb, c) => rgb.map((x, i) => Math.max(0, Math.min(255, gam(Math.min(1, lin(x) * c[i])))));
await check("pH: tolerans matrisi — ışık rengi (sıcak/soğuk), loş ışık ve gürültü + beyaz referans ⇒ ±0,8", () => {
  const casts = [[1.0, 0.85, 0.55], [0.7, 0.85, 1.0], [0.3, 0.3, 0.3], [1, 1, 1]];
  let worst = 0;
  casts.forEach((c) => {
    const white = lit([250, 250, 250], c);
    PH.SCALE.forEach(([ph, rgb]) => {
      const seen = lit(rgb, c).map((x) => Math.max(0, Math.min(255, x + 4 * rnd())));
      const r = PH.estimate(seen, white); assert.ok(r.ok, "okunamadı pH " + ph);
      worst = Math.max(worst, Math.abs(r.ph - ph));
    });
  });
  assert.ok(worst <= 0.8, "en kötü sapma " + worst.toFixed(2));
});
await check("pH: ara renkler komşu değerler arasına düşer (pH 6,5 ≈ 6 ile 7 arası)", () => {
  const mid = PH.SCALE[5][1].map((x, i) => (x + PH.SCALE[6][1][i]) / 2), r = PH.estimate(mid, [255, 255, 255]);
  assert.ok(r.ph > 6.1 && r.ph < 6.9, String(r.ph));
});
await check("pH: gri, beyaz ve karanlık görüntü okunmaz; bant ve evsel eşleşme doğru", () => {
  assert.equal(PH.estimate([128, 128, 128]).ok, false);
  assert.equal(PH.estimate([250, 250, 250]).ok, false);
  assert.equal(PH.estimate([12, 8, 14]).ok, false);
  const acid = PH.estimate(PH.SCALE[1][1], [255, 255, 255]); assert.equal(acid.cls, "kirmizi");
  const m = PH.matches(acid, 3).map((x) => x.name); assert.ok(m.includes("Limon suyu"), m.join(","));
  const base = PH.estimate(PH.SCALE[12][1], [255, 255, 255]); assert.equal(base.cls, "sari");
  assert.ok(PH.matches(base, 2).some((x) => x.danger), "kuvvetli bazda tehlike uyarısı");
});
await check("pH: beyaz dengesi beyaz referansı nötr griye çevirir; daire ortalaması", () => {
  const wb = PH.whiteBalance([200, 180, 120], [200, 180, 120]); assert.ok(Math.max(...wb) - Math.min(...wb) <= 1, wb.join(","));
  const w = 10, h = 10, d = new Uint8ClampedArray(w * h * 4); for (let i = 0; i < w * h; i++) d.set([100, 50, 200, 255], i * 4);
  eq(PH.averageDisk(d, w, h, 5, 5, 3), [100, 50, 200]);
  eq(PH.fromHex(PH.hex([95, 88, 185])), [95, 88, 185]);
});

/* ---------------- Vatandaş bilimi ---------------- */
await check("Gürültü: RMS → dB SPL, eşdeğer seviye Leq (enerji ortalaması)", () => {
  near(VB.dbFromRms(0.01), 60, 1e-9); near(VB.dbFromRms(0.01, 94), 54, 1e-9);
  near(VB.leq([60, 60, 60]), 60, 1e-9); near(VB.leq([60, 70]), 67.4, 0.05);
  assert.equal(VB.leq([]), null);
  const sr = 48000, b = new Float32Array(4800); for (let i = 0; i < b.length; i++) b[i] = 0.1 * Math.sin(2 * Math.PI * 440 * i / sr);
  near(VB.rms(b), 0.1 / Math.SQRT2, 1e-3);
  assert.ok(isFinite(VB.dbFromRms(0)));
});
await check("Işık kirliliği: gökyüzü parlaklığı ve Bortle eşikleri", () => {
  assert.equal(VB.bortleFromSqm(22), 1); assert.equal(VB.bortleFromSqm(21.65), 2); assert.equal(VB.bortleFromSqm(20.9), 4);
  assert.equal(VB.bortleFromSqm(19.5), 6); assert.equal(VB.bortleFromSqm(17), 9);
  const dark = VB.sqmEstimate(0.001, 1, 800), bright = VB.sqmEstimate(0.2, 1 / 60, 100);
  assert.ok(dark.m > bright.m && !dark.relative);
  assert.ok(VB.sqmEstimate(0.05, null, null).relative);
  assert.equal(VB.sqmEstimate(0, 1, 100), null);
});
await check("Ağ: QR paketi gidiş-dönüş (Sınıf Modu doğrulaması dâhil) ve mükerrer kayıt temizleme", async () => {
  const at = "2026-10-28T19:30:00.000Z";
  const items = [{ k: "n", v: 63.4, lat: 41.01234, lon: 28.97654, at, by: "Elif" }, { k: "l", v: 7, lat: 41.0125, lon: 28.977, at, by: "Elif" }, { k: "n", v: 48.2, lat: null, lon: null, at, by: "Elif" }];
  const frames = await SM.pack(VB.toPacket(items, "Elif"));
  const back = await SM.unpack(frames);
  assert.equal(back.data.t, "vb");
  const recs = VB.fromPacket(back.data);
  eq(recs.map((r) => [r.k, r.v, r.lat, r.lon, r.at, r.by]), items.map((r) => [r.k, r.v, r.lat, r.lon, r.at, r.by]));
  const m1 = VB.merge(items, recs); assert.equal(m1.added, 0);
  const m2 = VB.merge(items, [{ k: "n", v: 70, lat: 41, lon: 29, at, by: "Can" }]); assert.equal(m2.added, 1); assert.equal(m2.items.length, 4);
  assert.throws(() => SM.validate({ v: 1, t: "vb", id: "x", s: "a", m: [[2, 1, 0, 0, 0]] }));
  assert.throws(() => SM.validate({ v: 1, t: "vb", id: "x", s: "a", m: [[0, 1, 99999999, 0, 0]] }));
});
await check("Harita: IDW ölçüm noktasında ölçülen değeri, iki nokta arasında ara değer verir", () => {
  const pts = [{ lat: 41.0, lon: 29.0, v: 40 }, { lat: 41.0, lon: 29.01, v: 80 }];
  const box = VB.bbox(pts); assert.ok(box.s < 41 && box.n > 41 && box.w < 29 && box.e > 29.01);
  const g = VB.idwGrid(pts, { s: 40.995, n: 41.005, w: 29.0, e: 29.01 }, 3, 1);
  assert.ok(g[0] < g[1] && g[1] < g[2], g.join(","));
  near(g[1], 60, 0.01);
  const one = VB.bbox([{ lat: 41, lon: 29, v: 1 }]); assert.ok(one.n - one.s > 0.001);
  assert.equal(VB.bbox([{ lat: null, lon: null, v: 1 }]), null);
  eq(VB.colorFor("n", 30), [46, 170, 110]);
});

/* ---------------- Ekosistem ---------------- */
const finiteNonNeg = (s) => ["G", "R", "F"].every((k) => Number.isFinite(s[k]) && s[k] >= 0);
await check("Ekosistem: varsayılan kavanozda sönümlü salınım ve hesaplanan dengeye yakınsama", () => {
  const run = EK.simulate({ G: 400, R: 30, F: 4 }, {}, 400, 0.5), e = EK.equilibrium({}), end = run[run.length - 1];
  assert.ok(run.every(finiteNonNeg));
  near(end.R, e.R, e.R * 0.03, "tavşan"); near(end.F, e.F, e.F * 0.03, "tilki"); near(end.G, e.G, e.G * 0.03, "ot");
  const early = run.filter((x) => x.t <= 40), peaks = early.filter((x, i) => i > 0 && i < early.length - 1 && x.F > early[i - 1].F && x.F >= early[i + 1].F);
  assert.ok(peaks.length >= 2, "en az iki tilki tepesi (salınım)");
});
await check("Ekosistem: aşırı popülasyonda (10⁶) sayısal kararlılık — NaN yok, negatif yok, sınırlı", () => {
  [{ G: 1e6, R: 1e6, F: 1e5 }, { G: 1, R: 1e6, F: 0 }, { G: 1e6, R: 1, F: 1e6 }].forEach((s0) => {
    const run = EK.simulate(s0, {}, 60, 0.5);
    assert.ok(run.every(finiteNonNeg), JSON.stringify(s0));
    const end = run[run.length - 1]; assert.ok(end.G <= 1e6 && end.R < 5000 && end.F < 1e6, JSON.stringify(end));
  });
  const hard = EK.simulate({ G: 400, R: 30, F: 4 }, { alpha: 40, beta: 2, delta: 1, gamma: 30 }, 20, 0.5);
  assert.ok(hard.every(finiteNonNeg), "sert parametreler");
});
await check("Ekosistem: nesil tükenmesi — avsız tilkiler sıfıra iner, sıfır popülasyon kendiliğinden doğmaz", () => {
  const noPrey = EK.simulate({ G: 400, R: 0, F: 20 }, {}, 40, 1), end = noPrey[noPrey.length - 1];
  assert.equal(end.F, 0); assert.equal(end.R, 0); near(end.G, 400, 1, "ot kapasiteye döner");
  const noFox = EK.simulate({ G: 400, R: 10, F: 0 }, {}, 80, 1), e2 = noFox[noFox.length - 1];
  assert.equal(e2.F, 0);
  // Avcısız tavşan sonsuza büyümez: ot ile sınırlı denge (R = κG ve otlanmayla G dengesi)
  const p = EK.DEFAULTS, Gs = p.Kg / (1 + (p.c * p.kappa * p.Kg) / p.rg);
  near(e2.R, p.kappa * Gs, p.kappa * Gs * 0.03, "taşıma kapasitesi"); assert.ok(e2.R < 1e4);
  const hunt = EK.step({ G: 300, R: 60, F: 0.3 }, {}, 0.1); assert.equal(hunt.F, 0, "0,5 bireyin altı tükenmiş sayılır");
});
await check("Ekosistem: kuraklık otu ve dolayısıyla tavşanları azaltır; RK4 adım küçüldükçe yakınsar", () => {
  const base = EK.simulate({ G: 280, R: 60, F: 39 }, {}, 120, 1), dry = EK.simulate({ G: 280, R: 60, F: 39 }, { drought: true }, 120, 1);
  const tail = (r, k) => r.slice(-30).reduce((s, x) => s + x[k], 0) / 30;
  assert.ok(tail(dry, "G") < tail(base, "G") * 0.8 && tail(dry, "R") < tail(base, "R"), "kuraklık etkisi");
  const p = Object.assign({}, EK.DEFAULTS), s0 = { G: 400, R: 30, F: 4 };
  let a = s0, b = s0; for (let i = 0; i < 100; i++) a = EK.rk4(a, p, 0.05); for (let i = 0; i < 200; i++) b = EK.rk4(b, p, 0.025);
  near(a.R, b.R, 1e-3, "RK4 yakınsama"); near(a.F, b.F, 1e-3);
});

/* ---------------- Meslek haritası ---------------- */
await check("Meslek: her meslek için eşleme verisi var ve anahtar kelimeler kazanım başlıklarıyla eşleşiyor", () => {
  const jobs = ctx.App.data.meslekler, map = ctx.App.data.meslekHarita;
  jobs.forEach((j) => assert.ok(map[j[0]], "eşleme yok: " + j[0]));
  const it = { key: "12/matematik/u5/k2", subject: "matematik", grade: "12", title: "Anlık değişim oranı, türev tanımı ve türev kuralları" };
  const r = MH.relevance(it, "yapayzeka"); assert.ok(r.direct && /gradyan/.test(r.use));
  assert.equal(MH.relevance(it, "edebiyat").r, 0);
  assert.equal(MH.relevance({ subject: "matematik", title: "Kümeler" }, "yapayzeka").r, 3);
});
await check("Meslek: az veride uyum 50'ye çekilir; güçlü matematik sayısal meslekleri öne taşır", () => {
  const items = [];
  // Gerçekçi veri: tüm derslerin kazanımları var, öğrenci yalnızca beş derste test çözmüş
  const studied = ["matematik", "fizik", "edebiyat", "tarih", "biyoloji"];
  const allSubjects = [...new Set(Object.values(ctx.App.data.meslekHarita).flatMap((m) => Object.keys(m.s)))];
  allSubjects.forEach((s) => { for (let i = 0; i < 20; i++) items.push({ key: "x/" + s + "/" + i, subject: s, grade: String(9 + (i % 4)), title: s === "matematik" && i < 4 ? ["türev", "olasılık", "algoritma", "integral"][i] + " konusu" : s + " konusu " + i }); });
  const none = MH.fitJob("yazilim", items, new Map()); near(none.fit, 50, 1e-9); assert.equal(none.coverage, 0);
  const scores = new Map(items.filter((x) => studied.includes(x.subject)).map((x) => [x.key, x.subject === "matematik" ? 95 : x.subject === "fizik" ? 75 : 30]));
  const ranked = MH.rank(items, scores, null), top = ranked.slice(0, 10).map((x) => x.id), map = ctx.App.data.meslekHarita;
  assert.ok(top.includes("matematikci") && top.includes("yapayzeka"), top.join(","));
  assert.ok(ranked.slice(0, 5).every((x) => map[x.id].s.matematik), "ilk beşte matematik kullanan meslekler");
  assert.ok(ranked.findIndex((x) => x.id === "edebiyat") > 20);
  const one = new Map([["x/matematik/0", 100]]), f = MH.fitJob("yazilim", items, one);
  assert.ok(f.fit > 50 && f.fit < 70, "tek veride aşırı uç sonuç yok: " + f.fit);
  const rt = MH.route(MH.fitJob("yapayzeka", items, scores));
  assert.ok(rt.strong.length >= 1 && rt.strong.every((x) => x.direct && x.score >= 70));
});

/* ---------------- Hece ---------------- */
await check("Hece: Türkçe kurallar (0/1/2/3 ünsüz), yabancı kökenli ve birleşik sözcükler", () => {
  const cases = { kitap: "ki-tap", "öğretmen": "öğ-ret-men", saat: "sa-at", "şiir": "şi-ir", "Türkçe": "Türk-çe", korkmak: "kork-mak", elektrik: "e-lekt-rik",
    kontrol: "kont-rol", program: "prog-ram", santral: "sant-ral", spor: "spor", tren: "tren", istasyon: "is-tas-yon", laboratuvar: "la-bo-ra-tu-var",
    "İstanbul": "İs-tan-bul", "ağaç": "a-ğaç", bilgisayar: "bil-gi-sa-yar", fotosentez: "fo-to-sen-tez", "hanımeli": "ha-nı-me-li", "Kahramanmaraş": "Kah-ra-man-ma-raş",
    "açıkhava": "a-çık-ha-va", "ilkokul": "il-ko-kul", "Mitokondri": "Mi-to-kond-ri", "a": "a", "ve": "ve" };
  Object.entries(cases).forEach(([w, h]) => assert.equal(HC.hyphenate(w, "-"), h, w));
});
await check("Hece: metin parçalama noktalama, kesme işareti ve rakamları korur", () => {
  const t = "Türkiye'nin 81 ili, değil mi?";
  assert.equal(HC.tokenize(t).map((x) => x.t).join(""), t);
  assert.equal(HC.hyphenate(t, "·"), "Tür·ki·ye'nin 81 i·li, de·ğil mi?");
  assert.ok(HC.tokenize("x² + 3").every((x) => x.t.length > 0));
});

console.log("\nv1.49: " + checks + " sınama geçti.");
