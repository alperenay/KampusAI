// ar-check.mjs — AR çekirdeğinin görü katmanını sentetik karelerle sınar (tarayıcı ve kamera gerekmez)
//   node tools/ar-check.mjs
// Bilinen bir kamera pozuyla perspektifli kâğıt (yazılı, gölgeli) + dokulu masa + gürültü çizilir;
// bulunan köşeler, poz, odak uzaklığı ve Kalman süzgeci gerçek değerlerle karşılaştırılır.
// Görüntü hedefi izleme (Modül 1) için yazılı bir sayfa bilinen kamera hareketleriyle çizilir.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
for (const f of ["js/ar/ar-vision.js", "js/ar/ar-feature.js", "js/ar/ar-solve.js"]) vm.runInThisContext(fs.readFileSync(path.join(ROOT, f), "utf8"), { filename: f });
const V = globalThis.ARVision, FT = globalThis.ARFeature, SV = globalThis.ARSolve;

let fails = 0;
const check = (ok, msg) => { console.log((ok ? "  ✓ " : "  ✗ ") + msg); if (!ok) fails++; };

// tekrarlanabilir rastgele
let seed = 7;
const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
const gauss = () => { let u = 0, v = 0; while (!u) u = rnd(); while (!v) v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };

function rotXYZ(ax, ay, az) {
  const [cx, sx, cy, sy, cz, sz] = [Math.cos(ax), Math.sin(ax), Math.cos(ay), Math.sin(ay), Math.cos(az), Math.sin(az)];
  const Rx = [1, 0, 0, 0, cx, -sx, 0, sx, cx], Ry = [cy, 0, sy, 0, 1, 0, -sy, 0, cy], Rz = [cz, -sz, 0, sz, cz, 0, 0, 0, 1];
  return V.mul3(Rx, V.mul3(Ry, Rz));
}
// sahne: kâğıt (Lx × Ly) kamera önünde; R, t: kâğıt → kamera
function scene(W, H, f, Lx, Ly, R, t, noise) {
  const K = [f, 0, W / 2, 0, f, H / 2, 0, 0, 1];
  const Hm = V.mul3(K, [R[0], R[1], t[0], R[3], R[4], t[1], R[6], R[7], t[2]]);
  const corners = []; [[0, 0], [Lx, 0], [Lx, Ly], [0, Ly]].forEach(([x, y]) => corners.push(...V.applyH(Hm, x, y)));
  const Hi = V.homography(corners, [0, 0, Lx, 0, Lx, Ly, 0, Ly]);
  const px = new Uint8ClampedArray(W * H * 4);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let r = 0, g = 0, b = 0;
    for (let sy = 0; sy < 3; sy++) for (let sx = 0; sx < 3; sx++) {
      // piksel merkezi tamsayı koordinatta (bulucunun kuralı)
      const u = x - 1 / 3 + sx / 3, v = y - 1 / 3 + sy / 3, [X, Y] = V.applyH(Hi, u, v);
      if (X >= 0 && X <= Lx && Y >= 0 && Y <= Ly) {
        const text = X > 0.12 * Lx && X < 0.88 * Lx && Y > 0.15 * Ly && Y < 0.85 * Ly && ((Y * 14) % 1) < 0.18 && ((X * 9) % 1) < 0.8;
        const lit = 236 - 34 * (X / Lx);                        // kâğıt üstünde ışık eğimi (gölge)
        if (text) { r += 50; g += 52; b += 60; } else { r += lit; g += lit - 3; b += lit - 10; }
      } else {
        const wood = 78 + 22 * Math.sin(x * 0.09 + Math.sin(y * 0.05) * 2) + 10 * Math.sin(y * 0.31);
        r += wood + 18; g += wood; b += wood - 22;
      }
    }
    const i = (y * W + x) * 4, n = noise ? gauss() * noise : 0;
    px[i] = r / 9 + n; px[i + 1] = g / 9 + n; px[i + 2] = b / 9 + n; px[i + 3] = 255;
  }
  return { px, corners, Hm };
}
const rotErr = (A, B) => { let tr = 0; for (let i = 0; i < 3; i++) for (let k = 0; k < 3; k++) tr += A[k * 3 + i] * B[k * 3 + i]; return Math.acos(Math.max(-1, Math.min(1, (tr - 1) / 2))) * 180 / Math.PI; };

// ---------- 1. Köşe, poz, odak ----------
console.log("1) Kâğıt bulma (320×240, gürültü σ=3, yazılı ve gölgeli kâğıt)");
const W = 320, H = 240, F = 256, SQ2 = Math.SQRT2;
const poses = [
  { name: "tepeden, dik", a: [0.02, 0.01, 0.1], d: 3.2 },
  { name: "30° eğik", a: [0.52, 0.05, -0.3], d: 3.0 },
  { name: "45° eğik, dönük", a: [0.78, -0.12, 0.9], d: 3.3 },
  { name: "55° eğik, yan", a: [0.96, 0.3, -1.2], d: 3.6 },
  { name: "uzak, küçük", a: [0.4, 0.1, 2.2], d: 6.0 },
  { name: "yakın, büyük", a: [0.35, -0.05, 0.05], d: 2.3 }
];
let maxErr = 0, sumErr = 0, nErr = 0, maxRot = 0, maxT = 0, tMs = 0, nMs = 0;
for (const p of poses) {
  const Lx = SQ2, Ly = 1, R = rotXYZ(...p.a);
  const c = [R[0] * Lx / 2 + R[1] * Ly / 2, R[3] * Lx / 2 + R[4] * Ly / 2, R[6] * Lx / 2 + R[7] * Ly / 2];
  const t = [-c[0] + 0.1, -c[1] - 0.05, -c[2] + p.d];
  const sc = scene(W, H, F, Lx, Ly, R, t, 3);
  const t0 = performance.now(); const res = V.detect(sc.px, W, H, {}); tMs += performance.now() - t0; nMs++;
  if (!res.ok) { check(false, p.name + ": bulunamadı (" + res.reason + ")"); continue; }
  // bulunan köşeleri gerçek köşelerle eşle
  const map = [], P = [[0, 0], [Lx, 0], [Lx, Ly], [0, Ly]];
  let e = 0;
  for (let i = 0; i < 4; i++) {
    let bj = 0, bd = Infinity;
    for (let j = 0; j < 4; j++) { const d = Math.hypot(res.corners[2 * i] - sc.corners[2 * j], res.corners[2 * i + 1] - sc.corners[2 * j + 1]); if (d < bd) { bd = d; bj = j; } }
    map.push(bj); e = Math.max(e, bd); sumErr += bd; nErr++;
  }
  maxErr = Math.max(maxErr, e);
  const src = []; map.forEach((j) => src.push(...P[j]));
  const Hd = V.homography(src, res.corners), pz = V.pose(Hd, F, W / 2, H / 2);
  const re = rotErr(pz.R, R), te = Math.hypot(pz.t[0] - t[0], pz.t[1] - t[1], pz.t[2] - t[2]) / Math.hypot(...t) * 100;
  maxRot = Math.max(maxRot, re); maxT = Math.max(maxT, te);
  const fe = V.focal(V.homography(P.flat(), sc.corners), W / 2, H / 2);
  console.log(`  · ${p.name.padEnd(18)} köşe hatası ${e.toFixed(2)} px · poz ${re.toFixed(2)}° / %${te.toFixed(2)} · odak (gerçek köşelerden) ${fe ? fe.f.toFixed(1) : "—"} (gerçek ${F})`);
}
check(maxErr < 0.6, `en büyük köşe hatası ${maxErr.toFixed(2)} px < 0,6 px (ortalama ${(sumErr / nErr).toFixed(2)} px)`);
check(maxRot < 1.5, `en büyük dönüş hatası ${maxRot.toFixed(2)}° < 1,5°`);
check(maxT < 2.5, `en büyük konum hatası %${maxT.toFixed(2)} < %2,5`);
check(tMs / nMs < 25, `kare başına ${(tMs / nMs).toFixed(1)} ms (Node, tek iş parçacığı)`);

// odak öz-kalibrasyonu: eğik bakışta bulunan köşelerden
{
  const Lx = SQ2, Ly = 1, R = rotXYZ(0.8, 0.1, 0.4), c = [R[0] * Lx / 2 + R[1] * Ly / 2, R[3] * Lx / 2 + R[4] * Ly / 2, R[6] * Lx / 2 + R[7] * Ly / 2];
  const t = [-c[0], -c[1], -c[2] + 3.2], sc = scene(W, H, F, Lx, Ly, R, t, 3), res = V.detect(sc.px, W, H, {});
  const exact = V.focal(V.homography([0, 0, Lx, 0, Lx, Ly, 0, Ly], sc.corners), W / 2, H / 2);
  check(exact && Math.abs(exact.f - F) / F < 0.01, `odak, kusursuz köşelerden: ${exact && exact.f.toFixed(1)} (gerçek ${F})`);
  if (res.ok) {
    const order = []; for (let i = 0; i < 4; i++) { let bj = 0, bd = Infinity; for (let j = 0; j < 4; j++) { const d = Math.hypot(res.corners[2 * i] - sc.corners[2 * j], res.corners[2 * i + 1] - sc.corners[2 * j + 1]); if (d < bd) { bd = d; bj = j; } } order.push(bj); }
    const P = [[0, 0], [Lx, 0], [Lx, Ly], [0, Ly]], src = []; order.forEach((j) => src.push(...P[j]));
    const fe = V.focal(V.homography(src, res.corners), W / 2, H / 2);
    check(fe && Math.abs(fe.f - F) / F < 0.08, `odak, bulunan köşelerden (45°): ${fe && fe.f.toFixed(1)} (±%8)`);
  } else check(false, "odak sınaması için kâğıt bulunamadı");
}

// ---------- 2. Olumsuz durumlar ----------
console.log("2) Olumsuz durumlar");
{
  const dark = new Uint8ClampedArray(W * H * 4); for (let i = 0; i < dark.length; i += 4) { dark[i] = dark[i + 1] = dark[i + 2] = 8 + (rnd() * 6) | 0; dark[i + 3] = 255; }
  const r1 = V.detect(dark, W, H, {}); check(!r1.ok && r1.reason === "dark", "karanlık kare → bulunmadı (dark)");
  const wall = new Uint8ClampedArray(W * H * 4); for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = (y * W + x) * 4, v = y < 150 ? 230 : 60; wall[i] = wall[i + 1] = wall[i + 2] = v + gauss() * 3; wall[i + 3] = 255; }
  const r2 = V.detect(wall, W, H, {}); check(!r2.ok, "kenara taşan beyaz duvar → kâğıt sayılmadı (" + r2.reason + ")");
  // kâğıdın bir köşesi görüntü dışında
  const Lx = SQ2, Ly = 1, R = rotXYZ(0.3, 0, 0.2), t = [-1.6, -0.7, 1.9], sc = scene(W, H, F, Lx, Ly, R, t, 3);
  const r3 = V.detect(sc.px, W, H, {}); check(!r3.ok, "yarısı görüntü dışında kâğıt → reddedildi (" + r3.reason + ")");
}

// ---------- 3. Köşe sırası kararlılığı ----------
console.log("3) Köşe sırası (kâğıt döndükçe köşeler yer değiştirmemeli)");
{
  const Lx = SQ2, Ly = 1; let prev = null, okAll = true;
  for (let k = 0; k <= 16; k++) {
    const R = rotXYZ(0.4, 0, k * 0.2), c = [R[0] * Lx / 2 + R[1] * Ly / 2, R[3] * Lx / 2 + R[4] * Ly / 2, R[6] * Lx / 2 + R[7] * Ly / 2];
    const t = [-c[0], -c[1], -c[2] + 3.4], sc = scene(W, H, F, Lx, Ly, R, t, 2), res = V.detect(sc.px, W, H, { prev });
    if (!res.ok) { okAll = false; break; }
    if (prev) for (let i = 0; i < 4; i++) if (Math.hypot(res.corners[2 * i] - prev[2 * i], res.corners[2 * i + 1] - prev[2 * i + 1]) > 40) okAll = false;
    prev = res.corners;
  }
  check(okAll, "kâğıt 0→185° döndürülürken her köşe aynı kâğıt köşesini izledi");
}

// ---------- 4. Kalman süzgeci ----------
console.log("4) Uyarlanır Kalman (ölçüm 25 Hz, işleme ölçeğinde px)");
{
  // ar-core.js ile aynı ayar (ölçek 1); 8 koordinat birlikte (dört köşe birlikte hareket eder)
  const q = 1.5, r = 0.12, dt = 40, D = 8;
  const mk = () => V.kalman(D, q, r, 1, q * 40);
  const std = (a) => { const m = a.reduce((s, v) => s + v, 0) / a.length; return Math.sqrt(a.reduce((s, v) => s + (v - m) ** 2, 0) / a.length); };
  const meas = (v) => Array.from({ length: D }, () => v + gauss() * 0.35);
  // sabit kâğıt, ölçüm gürültüsü σ = 0,35 px
  let K = mk(), raw = [], out = [];
  for (let i = 0; i < 400; i++) { const z = meas(100); K.update(z, i * dt); if (i > 50) { raw.push(z[0] - 100); out.push(K.X[0] - 100); } }
  const red = std(raw) / std(out);
  check(red > 2.2, `durağan: titreme ${std(raw).toFixed(3)} → ${std(out).toFixed(3)} px (${red.toFixed(1)}× azaldı)`);
  // sabit hızla kayma 120 px/s: öngörüyle gecikme
  K = mk(); let lag = 0;
  for (let i = 0; i < 150; i++) { const tr = 100 + 0.12 * i * dt; K.update(meas(tr), i * dt); if (i > 60) lag = Math.max(lag, Math.abs(K.predict(i * dt + 16)[0] - (tr + 0.12 * 16))); }
  check(lag < 1.2, `120 px/s kayma: öngörülen konum hatası ≤ ${lag.toFixed(2)} px`);
  // el sallama: 1,5 Hz, ±20 px (≈190 px/s tepe hız)
  K = mk(); let se = 0, n = 0;
  for (let i = 0; i < 200; i++) { const T = (i * dt) / 1000, tr = 100 + 20 * Math.sin(2 * Math.PI * 1.5 * T); K.update(meas(tr), i * dt); if (i > 20) { const p = K.predict(i * dt + 16)[0], tt = 100 + 20 * Math.sin(2 * Math.PI * 1.5 * (T + 0.016)); se += (p - tt) ** 2; n++; } }
  check(Math.sqrt(se / n) < 2, `el sallama (1,5 Hz ±20 px): öngörü hatası rms ${Math.sqrt(se / n).toFixed(2)} px`);
  // ani sıçrama 30 px: kaç ölçümde 1 px içine iner
  K = mk(); for (let i = 0; i < 60; i++) K.update(meas(100), i * dt);
  let steps = 0; for (let i = 60; i < 80; i++) { K.update(meas(130), i * dt); steps++; if (Math.abs(K.X[0] - 130) < 1) break; }
  check(steps <= 3, `30 px ani hareket ${steps} ölçümde yakalandı (uyarlanır bellek)`);
}

// ---------- 5. Görüntü hedefi izleme (Modül 1: kâğıdın kenarları görünmese de) ----------
console.log("5) Görüntü hedefi izleme (FAST + ORB + KLT + RANSAC, 480×270)");
{
  // yazılı sayfa dokusu: satırlar halinde rastgele "harfler" (birkaç çizgi) ve formül kutuları
  const PW = 900, PH = 640;
  function makePage() {
    const page = new Uint8Array(PW * PH).fill(238);
    const line = (x0, y0, x1, y1, v, t) => { const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 2) + 1; for (let k = 0; k <= n; k++) { const x = x0 + (x1 - x0) * k / n, y = y0 + (y1 - y0) * k / n; for (let dy = 0; dy < t; dy++) for (let dx = 0; dx < t; dx++) { const xi = Math.round(x) + dx, yi = Math.round(y) + dy; if (xi >= 0 && yi >= 0 && xi < PW && yi < PH) page[yi * PW + xi] = v; } } };
    for (let row = 40; row < PH - 40; row += 34) {
      let x = 40 + rnd() * 30;
      while (x < PW - 60) {
        const wl = 2 + ((rnd() * 7) | 0);
        for (let c = 0; c < wl; c++, x += 13) for (let s = 0; s < 3; s++) line(x + rnd() * 9, row + rnd() * 16, x + rnd() * 9, row + rnd() * 16, 40 + rnd() * 40, 2);
        x += 14;
      }
    }
    for (let k = 0; k < 6; k++) { const x = 60 + rnd() * (PW - 200), y = 60 + rnd() * (PH - 140); line(x, y, x + 120, y, 30, 2); line(x, y + 50, x + 120, y + 50, 30, 2); line(x, y, x, y + 50, 30, 2); line(x + 120, y, x + 120, y + 50, 30, 2); }
    return page;
  }
  let page = makePage();
  const otherPage = makePage();
  const FW = 480, FH = 270;
  function invert3(m) { const [a, b, c, d, e, f, g, h, i] = m, A = e * i - f * h, B = -(d * i - f * g), C = d * h - e * g, D = -(b * i - c * h), E = a * i - c * g, F = -(a * h - b * g), Gq = b * f - c * e, Hq = -(a * f - c * d), I = a * e - b * d, det = a * A + b * B + c * C; return [A / det, D / det, Gq / det, B / det, E / det, Hq / det, C / det, F / det, I / det]; }
  // sayfa → kare homografisi: kamera pozu (eğim, dönme, uzaklık, kayma)
  const camH = (p) => { const R = rotXYZ(p.tilt, p.yaw, p.roll), f = 420;
    const c = [R[0] * PW / 2 + R[1] * PH / 2, R[3] * PW / 2 + R[4] * PH / 2, R[6] * PW / 2 + R[7] * PH / 2], t = [-c[0] + p.tx, -c[1] + p.ty, -c[2] + p.d];
    return V.mul3([f, 0, FW / 2, 0, f, FH / 2, 0, 0, 1], [R[0], R[1], t[0], R[3], R[4], t[1], R[6], R[7], t[2]]); };
  const render = (H, blank) => {
    const inv = invert3(H), px = new Uint8ClampedArray(FW * FH * 4);
    for (let y = 0; y < FH; y++) for (let x = 0; x < FW; x++) {
      let v; const q = V.applyH(inv, x, y);
      if (!blank && q[0] >= 0 && q[1] >= 0 && q[0] < PW - 1 && q[1] < PH - 1) { const x0 = q[0] | 0, y0 = q[1] | 0, fx = q[0] - x0, fy = q[1] - y0, i = y0 * PW + x0; v = (page[i] * (1 - fx) + page[i + 1] * fx) * (1 - fy) + (page[i + PW] * (1 - fx) + page[i + PW + 1] * fx) * fy; }
      else v = 70 + 18 * Math.sin(x * 0.11 + Math.sin(y * 0.07) * 3);
      v += gauss() * 2; const k = (y * FW + x) * 4; px[k] = v + 10; px[k + 1] = v; px[k + 2] = v - 8; px[k + 3] = 255;
    }
    return px;
  };
  const roi = [140, 70, 340, 200];                                  // kare koordinatında soru bölgesi (çekim anında)
  const rc = [roi[0], roi[1], roi[2], roi[1], roi[2], roi[3], roi[0], roi[3]];
  const pose = (k) => ({ tilt: -0.35 + 0.15 * Math.sin(k * 0.07), yaw: 0.12 * Math.sin(k * 0.05), roll: 0.35 * Math.sin(k * 0.045), d: 1500 + 350 * Math.sin(k * 0.06), tx: 60 * Math.sin(k * 0.09), ty: 30 * Math.sin(k * 0.08) });
  const H0 = camH(pose(0)), H0i = invert3(H0);
  const errAt = (Hest, Htrue) => { let m = 0; for (let i = 0; i < 4; i++) { const a = V.applyH(Hest, rc[2 * i], rc[2 * i + 1]), b = V.applyH(Htrue, rc[2 * i], rc[2 * i + 1]); m = Math.max(m, Math.hypot(a[0] - b[0], a[1] - b[1])); } return m; };
  const toG = (px) => FT.toGray(px, FW, FH);
  const TT = FT.targetTracker();
  let t0 = performance.now();
  const st = TT.setTarget(toG(render(H0)), FW, FH, roi);
  check(st.ok && st.n > 150, `hedef kuruldu: ${st.n} nokta, ${st.track} tanesi izleniyor (${(performance.now() - t0).toFixed(0)} ms)`);
  let maxE = 0, sumE = 0, nE = 0, lostN = 0, tTot = 0;
  for (let k = 1; k <= 80; k++) {
    const Ht = camH(pose(k)), px = render(Ht); t0 = performance.now(); const r = TT.update(toG(px), FW, FH); tTot += performance.now() - t0;
    if (r.state !== "track") { lostN++; continue; }
    const e = errAt(r.H, V.mul3(Ht, H0i)); maxE = Math.max(maxE, e); sumE += e; nE++;
  }
  check(lostN === 0, `80 karelik hareket (±20° dönme, uzaklık ±%23, eğim): kayıp kare ${lostN}`);
  check(maxE < 2.5, `soru bölgesi köşe hatası: ortalama ${(sumE / Math.max(1, nE)).toFixed(2)} px, en çok ${maxE.toFixed(2)} px (< 2,5)`);
  check(tTot / 80 < 60, `kare başına ${(tTot / 80).toFixed(1)} ms (Node; tarayıcıda Worker'da çalışır)`);
  // kâğıt kadrajdan çıkar, başka bir pozda geri gelir → yeniden bulma
  for (let k = 0; k < 3; k++) TT.update(toG(render(H0, true)), FW, FH);
  check(TT.state() === "lost", "boş karelerde kayıp durumuna geçti");
  // başka bir yazılı sayfa: hedef sanılmamalı (yanlış sabitleme olmasın)
  const keep = page; page = otherPage; let falseHit = 0;
  for (let k = 0; k < 8; k++) if (TT.update(toG(render(camH(pose(k * 9)))), FW, FH).state === "track") falseHit++;
  page = keep;
  check(falseHit === 0, `başka bir yazılı sayfada yanlış bulma: ${falseHit}/8`);
  const Hf = camH({ tilt: -0.5, yaw: 0.1, roll: 0.75, d: 2000, tx: -40, ty: 20 });
  let found = -1, eF = 0;
  for (let k = 0; k < 4 && found < 0; k++) { const r = TT.update(toG(render(Hf)), FW, FH); if (r.state === "track") { found = k + 1; eF = errAt(r.H, V.mul3(Hf, H0i)); } }
  let eN = 99; for (let k = 0; k < 3; k++) { const r = TT.update(toG(render(Hf)), FW, FH); if (r.state === "track") eN = errAt(r.H, V.mul3(Hf, H0i)); }
  check(found > 0 && eF < 4 && eN < 1.5, `43° dönük ve uzakta yeniden bulundu (${found}. karede, hata ${eF.toFixed(2)} px; 3 kare sonra ${eN.toFixed(2)} px)`);
}

// ---------- 6. Canlı çözüm: akış ayrıştırıcı ve görüntü iyileştirme ----------
console.log("6) Canlı çözüm: akış ayrıştırıcı ve görüntü iyileştirme");
{
  const stream = "SORU: $2^x = 8$ ise x kaçtır?\nKONU: Matematik › Üslü sayılar\nADIM: $8 = 2^3$ yazılır\nADIM: tabanlar eşit, üsler ";
  const p1 = SV.parse(stream, false);
  check(p1.question.includes("2^x") && p1.steps.length === 1 && p1.topic.startsWith("Matematik"), "akarken: yarım kalan son satır beklemede (1 adım)");
  const p2 = SV.parse(stream + "eşitlenir: $x = 3$\nCEVAP: C) 3", true);
  check(p2.steps.length === 2 && p2.steps[1].endsWith("$x = 3$") && p2.answer === "C) 3", "bitince: 2 adım ve cevap");
  const md = SV.parse("**SORU:** Hız kaç?\n- **Adım 1:** $v = x/t$\n  devamı burada\n**ADIM 2:** $v = 10$\n**Cevap:** 10 m/s\n", true);
  check(md.steps.length === 2 && md.steps[0].includes("devamı") && md.answer === "10 m/s", "markdown süslü ve numaralı anahtarlar, devam satırı");
  const en = SV.parse("QUESTION: q\nSTEP: a\nSTEP: b\nANSWER: 4\n", true);
  check(en.steps.length === 2 && en.answer === "4", "İngilizce anahtarlar");
  const un = SV.parse("OKUNAMADI: görüntü bulanık\n", true);
  check(un.unreadable === "görüntü bulanık" && !un.steps.length, "okunamadı durumu");
  const plain = SV.parse("1. önce böyle\n2. sonra şöyle\n", true);
  check(plain.steps.length === 2 && !plain.known, "biçime uymayan numaralı liste de adım sayılır");
  // düşük kontrastlı "yazı": 110..140 arası → gerilince koyu yazı / açık kâğıt
  const w = 64, h = 32, px = new Uint8ClampedArray(w * h * 4);
  for (let i = 0; i < w * h; i++) { const v = ((i % w) % 8 < 2 ? 112 : 138) + ((rnd() * 4) | 0); px[4 * i] = px[4 * i + 1] = px[4 * i + 2] = v; px[4 * i + 3] = 255; }
  SV.enhance(px, w, h); let lo = 255, hi = 0; for (let i = 0; i < w * h; i++) { lo = Math.min(lo, px[4 * i]); hi = Math.max(hi, px[4 * i]); }
  check(lo < 30 && hi > 225, `iyileştirme: soluk görüntü 112–141 → ${lo}–${hi}`);
}

console.log(fails ? `\n${fails} sınama başarısız` : "\nHepsi geçti");
process.exit(fails ? 1 : 0);
