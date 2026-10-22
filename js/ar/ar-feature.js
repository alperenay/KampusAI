/* ar-feature.js — görüntü hedefi izleme (v1.33): kâğıdın kenarları görünmese de sabitleme
   Soru çekildiği anki kare "hedef" olur; sonraki karelerde bu yüzeyin nerede durduğu (homografi) bulunur.
   ar-vision.js gibi DOM kullanmaz: Worker'da, ana iş parçacığında ve Node'da (tools/ar-check.mjs) çalışır.

     • Köşe noktaları : FAST-9 (+ 3×3 bastırma, ızgaraya yayma), görüntü piramidinde (ölçek değişimi)
     • Tanımlayıcı    : ORB (yönelimli BRIEF, 256 bit; yönelim: yoğunluk merkezi) → dönmeye dayanıklı
     • Kareden kareye : piramitli Lucas-Kanade optik akışı (KLT), ileri-geri denetimiyle
     • Sağlam kestirim: RANSAC homografi + normalize edilmiş en küçük kareler iyileştirmesi
     • Kayma önleme   : her birkaç karede noktalar hedefin kendi tanımlayıcılarına yeniden eşlenir
                        (KLT birikimli kaymaz); hedef kaybolursa tüm karede yeniden bulunur
   Ayrıca çekim öncesi kalite ölçümü (ışık, netlik, sarsıntı) ve hedef üstünde ışık tahmini. */
(function (G) {
  "use strict";
  const AV = () => G.ARVision;

  /* ---------- Görüntü ---------- */
  function toGray(px, w, h, out) {
    out = out && out.length === w * h ? out : new Uint8Array(w * h);
    for (let i = 0, j = 0, n = w * h; i < n; i++, j += 4) out[i] = (px[j] * 77 + px[j + 1] * 150 + px[j + 2] * 29) >> 8;
    return out;
  }
  function half(s) {
    const w = s.w >> 1, h = s.h >> 1, d = new Uint8Array(w * h), sw = s.w, sd = s.d;
    for (let y = 0; y < h; y++) { const a = 2 * y * sw, b = a + sw; for (let x = 0; x < w; x++) { const k = 2 * x; d[y * w + x] = (sd[a + k] + sd[a + k + 1] + sd[b + k] + sd[b + k + 1] + 2) >> 2; } }
    return { d, w, h };
  }
  function pyramid(g, w, h, n) { const P = [{ d: g, w, h }]; for (let i = 1; i < n && P[i - 1].w > 40; i++) P.push(half(P[i - 1])); return P; }
  // 5×5 kutu bulanıklığı (iki geçiş): BRIEF karşılaştırmaları gürültüye dayansın
  function blur5(s) {
    const { d, w, h } = s, t = new Uint16Array(w * h), o = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) { const r = y * w; let acc = 0; for (let x = -2; x <= 2; x++) acc += d[r + Math.min(w - 1, Math.max(0, x))]; for (let x = 0; x < w; x++) { t[r + x] = acc; acc += d[r + Math.min(w - 1, x + 3)] - d[r + Math.max(0, x - 2)]; } }
    for (let x = 0; x < w; x++) { let acc = 0; for (let y = -2; y <= 2; y++) acc += t[Math.min(h - 1, Math.max(0, y)) * w + x]; for (let y = 0; y < h; y++) { o[y * w + x] = acc / 25; acc += t[Math.min(h - 1, y + 3) * w + x] - t[Math.max(0, y - 2) * w + x]; } }
    return { d: o, w, h };
  }
  const bil = (d, w, h, x, y) => {
    if (x < 0) x = 0; else if (x > w - 1.001) x = w - 1.001;
    if (y < 0) y = 0; else if (y > h - 1.001) y = h - 1.001;
    const x0 = x | 0, y0 = y | 0, fx = x - x0, fy = y - y0, i = y0 * w + x0;
    return (d[i] * (1 - fx) + d[i + 1] * fx) * (1 - fy) + (d[i + w] * (1 - fx) + d[i + w + 1] * fx) * fy;
  };

  /* ---------- FAST-9 ---------- */
  const CIRC = [[0, -3], [1, -3], [2, -2], [3, -1], [3, 0], [3, 1], [2, 2], [1, 3], [0, 3], [-1, 3], [-2, 2], [-3, 1], [-3, 0], [-3, -1], [-2, -2], [-1, -3]];
  const arc9 = (m) => { const mm = m | (m << 16); let run = 0; for (let i = 0; i < 25; i++) { if (mm & (1 << i)) { if (++run >= 9) return true; } else run = 0; } return false; };
  /** s: {d,w,h}; dönüş: [{x, y, s}] (bastırılmış, ızgaraya yayılmış, en çok max) */
  function fast(s, thr, max, margin) {
    const { d, w, h } = s, off = CIRC.map(([x, y]) => y * w + x), sc = new Float32Array(w * h), m = margin || 3;
    for (let y = m; y < h - m; y++) for (let x = m; x < w - m; x++) {
      const i = y * w + x, p = d[i], hi = p + thr, lo = p - thr;
      const a = d[i + off[0]], b = d[i + off[8]];
      if (a <= hi && a >= lo && b <= hi && b >= lo) continue;
      const c = d[i + off[4]], e = d[i + off[12]];
      if (c <= hi && c >= lo && e <= hi && e >= lo) continue;
      let mb = 0, md = 0, sb = 0, sd = 0;
      for (let k = 0; k < 16; k++) { const v = d[i + off[k]]; if (v > hi) { mb |= 1 << k; sb += v - hi; } else if (v < lo) { md |= 1 << k; sd += lo - v; } }
      if (arc9(mb)) sc[i] = sb; else if (arc9(md)) sc[i] = sd;
    }
    // 3×3 bastırma + ızgara: her hücrede en iyi birkaçı (noktalar yüzeye yayılsın)
    const GX = 8, GY = 6, cells = Array.from({ length: GX * GY }, () => []);
    for (let y = m; y < h - m; y++) for (let x = m; x < w - m; x++) {
      const i = y * w + x, v = sc[i]; if (!v) continue;
      if (v < sc[i - 1] || v < sc[i + 1] || v < sc[i - w] || v < sc[i + w] || v < sc[i - w - 1] || v < sc[i - w + 1] || v < sc[i + w - 1] || v < sc[i + w + 1]) continue;
      cells[Math.min(GY - 1, (y * GY / h) | 0) * GX + Math.min(GX - 1, (x * GX / w) | 0)].push({ x, y, s: v });
    }
    const per = Math.ceil((max * 1.5) / (GX * GY)), out = [];
    cells.forEach((c) => { c.sort((a, b) => b.s - a.s); for (let k = 0; k < Math.min(per, c.length); k++) out.push(c[k]); });
    out.sort((a, b) => b.s - a.s);
    return out.slice(0, max);
  }

  /* ---------- ORB tanımlayıcı ---------- */
  const R = 15, NB = 30;
  const UMAX = []; for (let v = 0; v <= R; v++) UMAX.push(Math.floor(Math.sqrt(R * R - v * v)));
  const PAT = (() => {                                              // sabit, tekrarlanabilir rastgele çiftler (yarıçap ≤ 13 → döndürülünce de 15'in içinde)
    let sd = 1234567; const rnd = () => ((sd = (sd * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
    const g = () => { let u = 0, v = 0; while (!u) u = rnd(); while (!v) v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * 5.2; };
    const pt = () => { let x, y; do { x = g(); y = g(); } while (x * x + y * y > 169); return [x, y]; };
    const P = []; for (let i = 0; i < 256; i++) P.push(pt().concat(pt()));
    const rot = [];
    for (let b = 0; b < NB; b++) {
      const a = (b / NB) * 2 * Math.PI, c = Math.cos(a), s = Math.sin(a), r = new Int8Array(1024);
      P.forEach((p, i) => { r[4 * i] = Math.round(c * p[0] - s * p[1]); r[4 * i + 1] = Math.round(s * p[0] + c * p[1]); r[4 * i + 2] = Math.round(c * p[2] - s * p[3]); r[4 * i + 3] = Math.round(s * p[2] + c * p[3]); });
      rot.push(r);
    }
    return rot;
  })();
  /** kps (aynı seviyedeki noktalar) için 8×32 bit tanımlayıcı; bs: bulanık seviye */
  function describe(bs, kps, out, o0) {
    const { d, w } = bs;
    for (let k = 0; k < kps.length; k++) {
      const { x, y } = kps[k], c = y * w + x;
      let m01 = 0, m10 = 0;
      for (let u = -R; u <= R; u++) m10 += u * d[c + u];
      for (let v = 1; v <= R; v++) { let sv = 0; const dd = UMAX[v]; for (let u = -dd; u <= dd; u++) { const a = d[c + u + v * w], b = d[c + u - v * w]; sv += a - b; m10 += u * (a + b); } m01 += v * sv; }
      let ang = Math.atan2(m01, m10); if (ang < 0) ang += 2 * Math.PI;
      const r = PAT[Math.round((ang / (2 * Math.PI)) * NB) % NB], base = (o0 + k) * 8;
      for (let wd = 0; wd < 8; wd++) {
        let bits = 0;
        for (let bit = 0; bit < 32; bit++) { const i = (wd * 32 + bit) * 4; if (d[c + r[i + 1] * w + r[i]] < d[c + r[i + 3] * w + r[i + 2]]) bits |= 1 << bit; }
        out[base + wd] = bits;
      }
    }
  }
  const pop = (v) => { v -= (v >>> 1) & 0x55555555; v = (v & 0x33333333) + ((v >>> 2) & 0x33333333); return (((v + (v >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24; };
  const ham = (A, i, B, j) => { let s = 0; i *= 8; j *= 8; for (let k = 0; k < 8; k++) s += pop(A[i + k] ^ B[j + k]); return s; };
  // Ölçek piramidi (ORB gibi 1,25 adımlı): kamera yaklaşıp uzaklaşınca da aynı noktalar eşleşsin.
  // (2'nin katlarıyla küçülen KLT piramidi bunun için kaba: 0,76 ölçekte doğru eşleşme kalmıyordu)
  const SF = 1.25;
  function shrink(s) {
    const w = Math.max(8, Math.round(s.w / SF)), h = Math.max(8, Math.round(s.h / SF)), d = new Uint8Array(w * h), kx = s.w / w, ky = s.h / h;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) d[y * w + x] = bil(s.d, s.w, s.h, (x + 0.5) * kx - 0.5, (y + 0.5) * ky - 0.5);
    return { d, w, h };
  }
  /** g0 ({d,w,h}) üzerinde, `levels` ölçekte nokta + tanımlayıcı; koordinatlar g0'a göre, L: ölçek seviyesi */
  function features(g0, levels, max, thr) {
    const pts = [], per = [], lv = [];
    const share = (L) => Math.round((max * (1 - 1 / (SF * SF)) / (1 - Math.pow(SF, -2 * levels))) * Math.pow(SF, -2 * L));
    let s = g0;
    for (let L = 0; L < levels && s.w > 2 * R + 8 && s.h > 2 * R + 8; L++) {
      if (L) s = shrink(s);
      let k = fast(s, thr, share(L), R + 2);
      if (k.length < 30 && thr > 8) k = fast(s, thr >> 1, share(L), R + 2);   // düşük kontrastta eşiği gevşet
      const kx = g0.w / s.w, ky = g0.h / s.h;
      per.push(k); lv.push(s); pts.push(...k.map((p) => ({ x: (p.x + 0.5) * kx - 0.5, y: (p.y + 0.5) * ky - 0.5, L, s: p.s })));
    }
    const desc = new Uint32Array(pts.length * 8); let o = 0;
    per.forEach((k, L) => { describe(blur5(lv[L]), k, desc, o); o += k.length; });
    return { pts, desc, n: pts.length };
  }
  /** Eşleştirme: en iyi / ikinci en iyi oranı; prior verilirse yalnızca beklenen konumun r komşuluğunda */
  function match(Q, T, o) {
    o = o || {}; const ratio = o.ratio || 0.8, maxD = o.maxDist || 64, out = [];
    for (let i = 0; i < Q.n; i++) {
      let b1 = 999, b2 = 999, bj = -1;
      const qp = Q.pts[i];
      for (let j = 0; j < T.n; j++) {
        if (o.pred) { const p = o.pred[j]; if (!p || Math.abs(p[0] - qp.x) > o.r || Math.abs(p[1] - qp.y) > o.r) continue; }
        const dd = ham(Q.desc, i, T.desc, j);
        if (dd < b1) { b2 = b1; b1 = dd; bj = j; } else if (dd < b2) b2 = dd;
      }
      if (bj >= 0 && b1 <= maxD && b1 < ratio * b2) out.push([i, bj, b1]);
    }
    // aynı hedef noktasına birden çok eşleşme: en iyisi kalsın
    const best = new Map(); out.forEach((m) => { const c = best.get(m[1]); if (!c || m[2] < c[2]) best.set(m[1], m); });
    return Array.from(best.values());
  }

  /* ---------- Homografi: normalize DLT (en küçük kareler) + RANSAC ---------- */
  function solveN(A, b) {
    const n = b.length, M = A.map((r, i) => r.concat(b[i]));
    for (let c = 0; c < n; c++) {
      let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
      if (Math.abs(M[p][c]) < 1e-12) return null;
      const t = M[c]; M[c] = M[p]; M[p] = t;
      for (let r = c + 1; r < n; r++) { const f = M[r][c] / M[c][c]; if (f) for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k]; }
    }
    const x = new Array(n);
    for (let r = n - 1; r >= 0; r--) { let s = M[r][n]; for (let k = r + 1; k < n; k++) s -= M[r][k] * x[k]; x[r] = s / M[r][r]; }
    return x;
  }
  function normT(P, idx) {
    let mx = 0, my = 0; idx.forEach((i) => { mx += P[2 * i]; my += P[2 * i + 1]; }); mx /= idx.length; my /= idx.length;
    let md = 0; idx.forEach((i) => { md += Math.hypot(P[2 * i] - mx, P[2 * i + 1] - my); }); md = md / idx.length || 1;
    const s = Math.SQRT2 / md; return [s, 0, -s * mx, 0, s, -s * my, 0, 0, 1];
  }
  /** idx noktalarından en küçük kareler homografisi (src → dst) */
  function fitH(src, dst, idx) {
    if (idx.length < 4) return null;
    const Ts = normT(src, idx), Td = normT(dst, idx);
    const AtA = Array.from({ length: 8 }, () => new Array(8).fill(0)), Atb = new Array(8).fill(0);
    const acc = (r, b) => { for (let i = 0; i < 8; i++) { if (!r[i]) continue; Atb[i] += r[i] * b; for (let j = 0; j < 8; j++) AtA[i][j] += r[i] * r[j]; } };
    idx.forEach((i) => {
      const x = Ts[0] * src[2 * i] + Ts[2], y = Ts[4] * src[2 * i + 1] + Ts[5], u = Td[0] * dst[2 * i] + Td[2], v = Td[4] * dst[2 * i + 1] + Td[5];
      acc([x, y, 1, 0, 0, 0, -u * x, -u * y], u); acc([0, 0, 0, x, y, 1, -v * x, -v * y], v);
    });
    const h = solveN(AtA, Atb); if (!h) return null; h.push(1);
    const Tdi = [1 / Td[0], 0, -Td[2] / Td[0], 0, 1 / Td[4], -Td[5] / Td[4], 0, 0, 1];
    const H = AV().mul3(Tdi, AV().mul3(h, Ts)), k = H[8] || 1;
    return H.map((v) => v / k);
  }
  const err2 = (H, src, dst, i) => { const p = AV().applyH(H, src[2 * i], src[2 * i + 1]); return (p[0] - dst[2 * i]) ** 2 + (p[1] - dst[2 * i + 1]) ** 2; };
  function ransac(src, dst, n, thr, o) {
    o = o || {}; const t2 = thr * thr, all = []; for (let i = 0; i < n; i++) all.push(i);
    if (n < 4) return null;
    let seed = o.seed || 7; const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
    let best = null, bestN = 0, iters = o.iters || 300;
    for (let it = 0; it < iters; it++) {
      const s = []; while (s.length < 4) { const k = (rnd() * n) | 0; if (s.indexOf(k) < 0) s.push(k); }
      const a = [], b = []; s.forEach((k) => { a.push(src[2 * k], src[2 * k + 1]); b.push(dst[2 * k], dst[2 * k + 1]); });
      if (Math.abs(AV().area(a)) < 4) continue;                    // neredeyse doğrusal örnek
      const H = AV().homography(a, b); if (!H) continue;
      let c = 0; for (let i = 0; i < n; i++) if (err2(H, src, dst, i) < t2) c++;
      if (c > bestN) { bestN = c; best = H; const w = c / n; iters = Math.min(iters, Math.ceil(Math.log(0.005) / Math.log(1 - Math.pow(w, 4) + 1e-12)) + 8); }
    }
    if (!best) return null;
    let H = best, inl = all.filter((i) => err2(H, src, dst, i) < t2);
    for (let r = 0; r < 2; r++) { const H2 = fitH(src, dst, inl); if (!H2) break; H = H2; inl = all.filter((i) => err2(H, src, dst, i) < t2); }
    return { H, inl };
  }

  /* ---------- Piramitli Lucas-Kanade ---------- */
  function lk(P0, P1, x0, y0, gx, gy, win, iters) {
    // (x0,y0): ilk karedeki konum, (gx,gy): ikinci karede tahmin → ikinci karedeki konum ya da null
    const L = P0.length - 1; let dx = (gx - x0) / (1 << L), dy = (gy - y0) / (1 << L);
    for (let l = L; l >= 0; l--) {
      const A = P0[l], B = P1[l], k = 1 / (1 << l), px = x0 * k, py = y0 * k;
      if (px < win + 1 || py < win + 1 || px > A.w - win - 2 || py > A.h - win - 2) return null;
      let gxx = 0, gxy = 0, gyy = 0; const n = (2 * win + 1) * (2 * win + 1), I = new Float32Array(n), IX = new Float32Array(n), IY = new Float32Array(n);
      let q = 0;
      for (let v = -win; v <= win; v++) for (let u = -win; u <= win; u++, q++) {
        const ix = (bil(A.d, A.w, A.h, px + u + 1, py + v) - bil(A.d, A.w, A.h, px + u - 1, py + v)) / 2, iy = (bil(A.d, A.w, A.h, px + u, py + v + 1) - bil(A.d, A.w, A.h, px + u, py + v - 1)) / 2;
        I[q] = bil(A.d, A.w, A.h, px + u, py + v); IX[q] = ix; IY[q] = iy; gxx += ix * ix; gxy += ix * iy; gyy += iy * iy;
      }
      const det = gxx * gyy - gxy * gxy; if (det < 1e-3 * n * n) return null;   // düz bölge: izlenemez
      for (let it = 0; it < iters; it++) {
        let bx = 0, by = 0; q = 0;
        for (let v = -win; v <= win; v++) for (let u = -win; u <= win; u++, q++) { const e = I[q] - bil(B.d, B.w, B.h, px + dx + u, py + dy + v); bx += e * IX[q]; by += e * IY[q]; }
        const ux = (gyy * bx - gxy * by) / det, uy = (gxx * by - gxy * bx) / det;
        dx += ux; dy += uy;
        if (ux * ux + uy * uy < 0.0009) break;
      }
      if (l > 0) { dx *= 2; dy *= 2; }
    }
    return [x0 + dx, y0 + dy];
  }

  /* ---------- Hedef izleyici ---------- */
  function inv3(m) {
    const [a, b, c, d, e, f, g, h, i] = m, A = e * i - f * h, B = f * g - d * i, C = d * h - e * g, det = a * A + b * B + c * C;
    return [A / det, (c * h - b * i) / det, (b * f - c * e) / det, B / det, (a * i - c * g) / det, (c * d - a * f) / det, C / det, (b * g - a * h) / det, (a * e - b * d) / det];
  }
  const corners = (r) => [r[0], r[1], r[2], r[1], r[2], r[3], r[0], r[3]];
  function plausible(H, roi, w, h) {
    const q = []; for (let i = 0; i < 4; i++) { const c = corners(roi), p = AV().applyH(H, c[2 * i], c[2 * i + 1]); if (!isFinite(p[0]) || !isFinite(p[1])) return false; q.push(p[0], p[1]); }
    const a0 = (roi[2] - roi[0]) * (roi[3] - roi[1]), a = AV().area(q);
    if (!(a > a0 * 0.04 && a < a0 * 25)) return false;
    for (let i = 0; i < 4; i++) {                                  // dışbükey olmalı
      const j = (i + 1) % 4, k = (i + 2) % 4, cr = (q[2 * j] - q[2 * i]) * (q[2 * k + 1] - q[2 * j + 1]) - (q[2 * j + 1] - q[2 * i + 1]) * (q[2 * k] - q[2 * j]);
      if (cr <= 0) return false;
    }
    let cx = 0, cy = 0; for (let i = 0; i < 4; i++) { cx += q[2 * i] / 4; cy += q[2 * i + 1] / 4; }
    return cx > -w && cx < 2 * w && cy > -h && cy < 2 * h;
  }
  function targetTracker() {
    const S = { tpl: null, state: "idle", H: null, tp: null, cp: null, prev: null, frame: 0 };
    const MAXP = 220;
    function seed(tx, ty, cx, cy) { S.tp.push(tx, ty); S.cp.push(cx, cy); }
    function setTarget(g, w, h, roi) {
      const P = pyramid(g, w, h, 4), F = features(P[0], 6, 1200, 18);
      if (F.n < 30) return { ok: false, reason: "flat", n: F.n };
      // izlenecek noktalar: 0. seviyedeki en güçlüler, hedef bölgesi ve çevresi öncelikli
      const pad = Math.max(roi[2] - roi[0], roi[3] - roi[1]) * 0.6, near = (p) => p.x > roi[0] - pad && p.x < roi[2] + pad && p.y > roi[1] - pad && p.y < roi[3] + pad;
      S.tpl = { F, w, h, roi, P };
      S.tp = []; S.cp = [];
      F.pts.filter((p) => p.L === 0).sort((a, b) => (near(b) - near(a)) || b.s - a.s).slice(0, MAXP).forEach((p) => seed(p.x, p.y, p.x, p.y));
      S.H = [1, 0, 0, 0, 1, 0, 0, 0, 1]; S.prev = P; S.state = "track"; S.frame = 0;
      return { ok: true, n: F.n, track: S.tp.length / 2 };
    }
    // tüm karede hedefi bul: ölçek piramidinde ORB eşleştirme + RANSAC (kaba; ardından align ile inceltilir)
    function relocate(P) {
      const Q = features(P[0], 5, 900, 18), T = S.tpl.F, M = match(Q, T, { ratio: 0.85 });
      if (M.length < 10) return null;                              // az ama tutarlı eşleşme yeter (aşağıda oran şartı)
      const src = new Float64Array(M.length * 2), dst = new Float64Array(M.length * 2);
      M.forEach((m, i) => { src[2 * i] = T.pts[m[1]].x; src[2 * i + 1] = T.pts[m[1]].y; dst[2 * i] = Q.pts[m[0]].x; dst[2 * i + 1] = Q.pts[m[0]].y; });
      const r = ransac(src, dst, M.length, 3.5, { iters: 500, seed: 11 + S.frame });
      if (!r || r.inl.length < 10 || r.inl.length < M.length * 0.25 || !plausible(r.H, S.tpl.roi, P[0].w, P[0].h)) return null;
      return r.H;
    }
    /* Bükülmüş hedefle hizalama: hedef görüntü H ile bu karenin bakışına bükülür, hedefin köşe noktaları
       bükülmüş görüntüden bu kareye KLT ile taşınır. Görünüşler artık aynı ölçek ve açıda olduğundan
       eşleşme kesin ve kaymasızdır (hedef koordinatları hep hedefin kendisinden gelir). */
    function align(P, H) {
      const t = S.tpl, w = P[0].w, h = P[0].h, Hi = inv3(H), d = new Uint8Array(w * h), src = t.P[0];
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const z = Hi[6] * x + Hi[7] * y + Hi[8], u = (Hi[0] * x + Hi[1] * y + Hi[2]) / z, v = (Hi[3] * x + Hi[4] * y + Hi[5]) / z;
        d[y * w + x] = u >= 0 && v >= 0 && u < t.w - 1 && v < t.h - 1 ? bil(src.d, t.w, t.h, u, v) : P[0].d[y * w + x];
      }
      const Wp = pyramid(d, w, h, 3), Pc = P.slice(0, Wp.length), nt = [], nc = [];
      for (const p of t.F.pts) {
        if (p.L > 0) continue;
        const q = AV().applyH(H, p.x, p.y); if (!(q[0] > 6 && q[1] > 6 && q[0] < w - 7 && q[1] < h - 7)) continue;
        const f = lk(Wp, Pc, q[0], q[1], q[0], q[1], 4, 10); if (!f || Math.hypot(f[0] - q[0], f[1] - q[1]) > 8) continue;
        nt.push(p.x, p.y); nc.push(f[0], f[1]);
        if (nt.length >= 2 * MAXP) break;
      }
      const m = nt.length / 2; if (m < 15) return null;
      const r = ransac(Float64Array.from(nt), Float64Array.from(nc), m, 1.5, { iters: 120, seed: 5 + S.frame });
      if (!r || r.inl.length < Math.max(15, m * 0.35) || !plausible(r.H, t.roi, w, h)) return null;
      return { H: r.H, tp: r.inl.flatMap((i) => [nt[2 * i], nt[2 * i + 1]]), cp: r.inl.flatMap((i) => [nc[2 * i], nc[2 * i + 1]]) };
    }
    // eksilen noktaları tamamla: bu karede boş kalan yerlerdeki köşeler, hedef koordinatı H⁻¹ ile
    function replenish(P, H) {
      const need = MAXP - S.tp.length / 2; if (need < 20) return;
      const s = P[0], C = 12, gw = Math.ceil(s.w / C), occ = new Uint8Array(gw * Math.ceil(s.h / C)), Hi = inv3(H);
      for (let i = 0; i < S.cp.length; i += 2) { const x = S.cp[i], y = S.cp[i + 1]; if (x >= 0 && y >= 0 && x < s.w && y < s.h) occ[((y / C) | 0) * gw + ((x / C) | 0)] = 1; }
      let added = 0;
      for (const p of fast(s, 18, need * 3, 8)) {
        const c = ((p.y / C) | 0) * gw + ((p.x / C) | 0); if (occ[c]) continue;
        const t = AV().applyH(Hi, p.x, p.y);
        if (!(t[0] >= 0 && t[1] >= 0 && t[0] < S.tpl.w && t[1] < S.tpl.h)) continue;
        occ[c] = 1; seed(t[0], t[1], p.x, p.y); if (++added >= need) break;
      }
    }
    // köşe farkı (hedef bölgesinde): iki homografi ne kadar uyuşuyor
    function disagree(A, B) {
      const c = corners(S.tpl.roi); let m = 0;
      for (let i = 0; i < 4; i++) { const a = AV().applyH(A, c[2 * i], c[2 * i + 1]), b = AV().applyH(B, c[2 * i], c[2 * i + 1]); m = Math.max(m, Math.hypot(a[0] - b[0], a[1] - b[1])); }
      return m;
    }
    function update(g, w, h) {
      if (!S.tpl) return { state: "idle" };
      S.frame++;
      const P = pyramid(g, w, h, 4);
      let res = null;
      if (S.state === "track") {
        const n = S.tp.length / 2, nt = [], nc = [];
        for (let i = 0; i < n; i++) {
          const x = S.cp[2 * i], y = S.cp[2 * i + 1], f = lk(S.prev, P, x, y, x, y, 4, 8); if (!f) continue;
          const b = lk(P, S.prev, f[0], f[1], x, y, 4, 8);                // ileri-geri denetimi
          if (!b || Math.hypot(b[0] - x, b[1] - y) > 0.8) continue;
          nt.push(S.tp[2 * i], S.tp[2 * i + 1]); nc.push(f[0], f[1]);
        }
        const m = nt.length / 2;
        const r = m >= 10 ? ransac(Float64Array.from(nt), Float64Array.from(nc), m, 2.5, { iters: 150, seed: S.frame }) : null;
        if (r && r.inl.length >= Math.max(10, m * 0.4) && plausible(r.H, S.tpl.roi, w, h)) {
          S.H = r.H; S.tp = []; S.cp = []; r.inl.forEach((i) => seed(nt[2 * i], nt[2 * i + 1], nc[2 * i], nc[2 * i + 1]));
          // kayma denetimi: arada bir bükülmüş hedefle hizala; tutarlıysa noktaları oradan yeniden kur (birikmiş kayma sıfırlanır)
          if (S.frame % 12 === 0) {
            const A = align(P, S.H);
            if (A && disagree(A.H, S.H) < 6) { S.H = A.H; S.tp = A.tp; S.cp = A.cp; }
          }
          replenish(P, S.H);
          res = { state: "track", H: S.H, n: S.tp.length / 2 };
        } else S.state = "lost";
      }
      if (!res && S.state === "lost") {
        const H1 = relocate(P);
        // kaba bulmayı aynı karede iki tur hizalamayla incelt; hizalanamıyorsa (yanlış bulma olabilir) kabul etme
        const A1 = H1 && align(P, H1), A = A1 && (align(P, A1.H) || A1);
        if (A) { S.H = A.H; S.tp = A.tp; S.cp = A.cp; replenish(P, S.H); S.state = "track"; res = { state: "track", H: S.H, n: S.tp.length / 2, found: true }; }
        else res = { state: "lost" };
      }
      S.prev = P;
      return res;
    }
    return { setTarget, update, reset() { S.tpl = null; S.state = "idle"; S.prev = null; }, state: () => S.state };
  }

  /* ---------- Çekim öncesi kalite ve ışık ---------- */
  let lastG = null;
  function quality(g, w, h, roi) {
    const x0 = Math.max(1, roi[0] | 0), y0 = Math.max(1, roi[1] | 0), x1 = Math.min(w - 2, roi[2] | 0), y1 = Math.min(h - 2, roi[3] | 0);
    let s = 0, s2 = 0, n = 0, lap = 0, lap2 = 0, mot = 0, nm = 0;
    for (let y = y0; y <= y1; y += 2) for (let x = x0; x <= x1; x += 2) {
      const i = y * w + x, v = g[i], L = 4 * v - g[i - 1] - g[i + 1] - g[i - w] - g[i + w];
      s += v; s2 += v * v; lap += L; lap2 += L * L; n++;
      if (lastG && lastG.length === g.length) { mot += Math.abs(v - lastG[i]); nm++; }
    }
    lastG = g.slice(0);
    if (!n) return null;
    const mean = s / n, lm = lap / n;
    return { lum: mean / 255, contrast: Math.sqrt(Math.max(0, s2 / n - mean * mean)) / 255, sharp: Math.sqrt(Math.max(0, lap2 / n - lm * lm)), motion: nm ? mot / nm : 0 };
  }
  function lightAt(px, w, h, H, roi) {
    const c = corners(roi), S = [];
    for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) {
      const u = 0.1 + i * 0.16, v = 0.1 + j * 0.16, X = c[0] + (c[2] - c[0]) * u, Y = c[1] + (c[5] - c[1]) * v, p = H ? AV().applyH(H, X, Y) : [X, Y];
      const x = Math.round(p[0]), y = Math.round(p[1]); if (x < 0 || y < 0 || x >= w || y >= h) continue;
      const k = (y * w + x) * 4; S.push([px[k] * 77 + px[k + 1] * 150 + px[k + 2] * 29, px[k], px[k + 1], px[k + 2]]);
    }
    if (S.length < 6) return null;
    S.sort((a, b) => b[0] - a[0]);                                  // kâğıt: en parlak %50 (yazı mürekkebi dışarıda)
    const n = Math.max(1, S.length >> 1); let r = 0, g = 0, b = 0; for (let i = 0; i < n; i++) { r += S[i][1]; g += S[i][2]; b += S[i][3]; }
    r /= n * 255; g /= n * 255; b /= n * 255;
    return { r, g, b, lum: 0.3 * r + 0.59 * g + 0.11 * b };
  }

  /* ---------- İşçi ve ana iş parçacığı için ortak iş dağıtıcı ---------- */
  let TT = null, gbuf = null;
  function handle(m, px) {
    const w = m.w, h = m.h;
    if (m.type === "frame") return AV().detect(px, w, h, { prev: m.prev || null });     // kâğıt bulucu (ar-core: createTracker)
    gbuf = toGray(px, w, h, gbuf); const g = gbuf.slice(0);         // izleyici piramidi kareyi saklar: kopya
    if (m.type === "analyze") return { q: quality(g, w, h, m.roi), light: lightAt(px, w, h, null, m.roi) };
    if (m.type === "target") { TT = targetTracker(); lastG = null; return TT.setTarget(g, w, h, m.roi); }
    if (m.type === "track") {
      if (!TT) return { state: "idle" };
      const r = TT.update(g, w, h);
      if (r.H && m.roi) r.light = lightAt(px, w, h, r.H, m.roi);
      return r;
    }
    if (m.type === "reset") { TT = null; return { ok: true }; }
    return null;
  }

  G.ARFeature = { toGray, pyramid, fast, features, match, ransac, fitH, lk, targetTracker, quality, lightAt, handle, ham };
})(typeof self !== "undefined" ? self : globalThis);
