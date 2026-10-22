/* ar-vision.js — AR çekirdeğinin görü ve geometri katmanı (v1.33)
   DOM kullanmaz: Web Worker'da (importScripts), ana iş parçacığında (yedek) ve Node'da (tools/ar-check.mjs) aynen çalışır.

   Kâğıt bulucu, ≈320 px genişliğe küçültülmüş kare üzerinde:
     1. RGBA → gri (luma) + 3×3 bulanıklaştırma
     2. Eşik: izlenen kâğıdın içi/dışı parlaklığından (izleme) ya da Otsu (arama)
     3. Bağlı bileşenler: en büyük, dikdörtgene yeterince benzeyen parlak leke (kenara değmeyen)
     4. Dış bükey kabuk → en geniş dörtgen (4 köşe)
     5. Alt piksel iyileştirme: her kenarda dik doğrultuda gradyan tepesi → en küçük kareler doğrusu,
        köşe = komşu doğruların kesişimi (yaklaşık 0,1–0,3 px hassasiyet)
     6. Işık: kâğıdın ortalama rengi (beyaz ayarı), kâğıt / zemin / kare parlaklığı
   Geometri: homografi (DLT), homografiden poz (R, t), homografiden odak uzaklığı (öz-kalibrasyon),
   sabit hızlı uyarlanır Kalman süzgeci (köşe titremesini alır, hızlı harekette gecikmez). */
(function (G) {
  "use strict";
  const SQ2 = Math.SQRT2;
  let cap = 0, gray, blur, lab, stack;
  function ensure(n) { if (n <= cap) return; cap = n; gray = new Uint8Array(n); blur = new Uint8Array(n); lab = new Int32Array(n); stack = new Int32Array(n); }

  function toGray(px, w, h) {
    for (let i = 0, j = 0, n = w * h; i < n; i++, j += 4) gray[i] = (px[j] * 77 + px[j + 1] * 150 + px[j + 2] * 29) >> 8;
    for (let y = 0; y < h; y++) {
      const a = (y > 0 ? y - 1 : 0) * w, b = y * w, c = (y < h - 1 ? y + 1 : y) * w;
      for (let x = 0; x < w; x++) {
        const l = x > 0 ? x - 1 : 0, r = x < w - 1 ? x + 1 : x;
        blur[b + x] = (gray[a + l] + gray[a + x] + gray[a + r] + gray[b + l] + gray[b + x] + gray[b + r] + gray[c + l] + gray[c + x] + gray[c + r]) / 9 | 0;
      }
    }
  }
  function otsu(n) {
    const hist = new Uint32Array(256); let sum = 0;
    for (let i = 0; i < n; i++) hist[blur[i]]++;
    for (let i = 0; i < 256; i++) sum += i * hist[i];
    let wB = 0, sB = 0, best = -1, thr = 128, lo = 0, hi = 255;
    for (let t = 0; t < 256; t++) {
      wB += hist[t]; if (!wB) continue;
      const wF = n - wB; if (!wF) break;
      sB += t * hist[t];
      const mB = sB / wB, mF = (sum - sB) / wF, v = wB * wF * (mB - mF) * (mB - mF);
      if (v > best) { best = v; thr = t; lo = mB; hi = mF; }
    }
    return { thr, lo, hi, mean: sum / n };
  }
  const bil = (img, w, h, x, y) => {
    if (x < 0) x = 0; else if (x > w - 1.001) x = w - 1.001;
    if (y < 0) y = 0; else if (y > h - 1.001) y = h - 1.001;
    const x0 = x | 0, y0 = y | 0, fx = x - x0, fy = y - y0, i = y0 * w + x0;
    return (img[i] * (1 - fx) + img[i + 1] * fx) * (1 - fy) + (img[i + w] * (1 - fx) + img[i + w + 1] * fx) * fy;
  };
  // dörtgen içinde (u, v) ∈ [0,1]² noktası (çift doğrusal)
  const quadAt = (q, u, v) => [(q[0] * (1 - u) + q[2] * u) * (1 - v) + (q[6] * (1 - u) + q[4] * u) * v, (q[1] * (1 - u) + q[3] * u) * (1 - v) + (q[7] * (1 - u) + q[5] * u) * v];
  const area = (q) => { let s = 0; for (let i = 0; i < 4; i++) { const j = (i + 1) % 4; s += q[2 * i] * q[2 * j + 1] - q[2 * j] * q[2 * i + 1]; } return s / 2; };

  /* İzlenen kâğıdın içi ve çevresinden eşik: kâğıt gölgede ya da ışık değiştiğinde Otsu'dan daha kararlı */
  function trackThreshold(prev, w, h) {
    const inn = [];
    for (let i = 1; i < 8; i++) for (let j = 1; j < 8; j++) { const p = quadAt(prev, 0.1 + i * 0.1, 0.1 + j * 0.1); inn.push(bil(blur, w, h, p[0], p[1])); }
    inn.sort((a, b) => b - a);
    let bi = 0; const nb = Math.round(inn.length * 0.6); for (let i = 0; i < nb; i++) bi += inn[i]; bi /= nb;
    let cx = 0, cy = 0; for (let i = 0; i < 4; i++) { cx += prev[2 * i] / 4; cy += prev[2 * i + 1] / 4; }
    let so = 0, no = 0;
    for (let i = 0; i < 4; i++) {
      const j = (i + 1) % 4;
      for (let k = 0; k < 12; k++) {
        const t = (k + 0.5) / 12, x = prev[2 * i] + (prev[2 * j] - prev[2 * i]) * t, y = prev[2 * i + 1] + (prev[2 * j + 1] - prev[2 * i + 1]) * t;
        const ox = cx + (x - cx) * 1.22, oy = cy + (y - cy) * 1.22;
        if (ox < 0 || oy < 0 || ox > w - 1 || oy > h - 1) continue;
        so += bil(blur, w, h, ox, oy); no++;
      }
    }
    if (no < 8) return null;
    const bo = so / no;
    return bi - bo >= 25 ? (bi + bo) / 2 : null;
  }

  function hull(P) {
    P.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], up = [];
    for (const p of P) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
    for (let i = P.length - 1; i >= 0; i--) { const p = P[i]; while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); }
    lo.pop(); up.pop(); return lo.concat(up);
  }
  const lineDist = (a, b, p) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; return Math.abs(dx * (p[1] - a[1]) - dy * (p[0] - a[0])) / L; };
  /* Kabuk üzerinde en geniş dörtgen: köşegen ile başla, her köşeyi komşuları arasında en uzak noktaya kaydır */
  function maxQuad(Hl) {
    const n = Hl.length; if (n < 4) return null;
    let cx = 0, cy = 0; for (const p of Hl) { cx += p[0] / n; cy += p[1] / n; }
    let a = 0, d0 = -1; for (let i = 0; i < n; i++) { const d = (Hl[i][0] - cx) ** 2 + (Hl[i][1] - cy) ** 2; if (d > d0) { d0 = d; a = i; } }
    let b = 0; d0 = -1; for (let i = 0; i < n; i++) { const d = (Hl[i][0] - Hl[a][0]) ** 2 + (Hl[i][1] - Hl[a][1]) ** 2; if (d > d0) { d0 = d; b = i; } }
    const far = (s, e) => { let best = -1, k = -1; for (let i = (s + 1) % n; i !== e; i = (i + 1) % n) { const d = lineDist(Hl[s], Hl[e], Hl[i]); if (d > best) { best = d; k = i; } } return k; };
    const c = far(a, b), d = far(b, a); if (c < 0 || d < 0) return null;
    const idx = [a, c, b, d];
    for (let it = 0; it < 12; it++) {
      let moved = false;
      for (let k = 0; k < 4; k++) {
        const p = idx[(k + 3) % 4], q = idx[(k + 1) % 4], m = far(p, q);
        if (m >= 0 && m !== idx[k] && lineDist(Hl[p], Hl[q], Hl[m]) > lineDist(Hl[p], Hl[q], Hl[idx[k]]) + 1e-6) { idx[k] = m; moved = true; }
      }
      if (!moved) break;
    }
    const out = []; idx.forEach((i) => out.push(Hl[i][0], Hl[i][1]));
    return out;
  }
  function convexOk(q) {
    let sgn = 0;
    for (let i = 0; i < 4; i++) {
      const a = i * 2, b = ((i + 1) % 4) * 2, c = ((i + 2) % 4) * 2;
      const ux = q[b] - q[a], uy = q[b + 1] - q[a + 1], vx = q[c] - q[b], vy = q[c + 1] - q[b + 1];
      const cr = ux * vy - uy * vx, s = Math.sign(cr); if (!s) return false;
      if (sgn && s !== sgn) return false; sgn = s;
      const L1 = Math.hypot(ux, uy), L2 = Math.hypot(vx, vy); if (L1 < 10) return false;
      const ang = Math.acos(Math.max(-1, Math.min(1, -(ux * vx + uy * vy) / (L1 * L2)))) * 180 / Math.PI;
      if (ang < 28 || ang > 152) return false;
    }
    return true;
  }
  /* Alt piksel köşe: kenar doğrularını gradyan tepelerine oturt, kesişimleri al */
  function refine(q, w, h) {
    const L = [];
    for (let i = 0; i < 4; i++) {
      const j = (i + 1) % 4, ax = q[2 * i], ay = q[2 * i + 1], bx = q[2 * j], by = q[2 * j + 1];
      const len = Math.hypot(bx - ax, by - ay), dx = (bx - ax) / len, dy = (by - ay) / len, nx = dy, ny = -dx;   // dışa bakan normal (saat yönünde dörtgen)
      const P = [], K = Math.max(8, Math.min(40, Math.round(len / 4)));
      for (let k = 0; k < K; k++) {
        const t = 0.1 + 0.8 * (k + 0.5) / K, px = ax + (bx - ax) * t, py = ay + (by - ay) * t;
        const v = []; for (let s = -4; s <= 4; s++) v.push(bil(blur, w, h, px + nx * s, py + ny * s));
        let mi = -1, md = 0;
        for (let s = 1; s < 8; s++) { const g = v[s + 1] - v[s - 1]; if (g < md) { md = g; mi = s; } }
        if (mi < 2 || mi > 6 || md > -12) continue;
        const g0 = v[mi] - v[mi - 2], g2 = v[mi + 2] - v[mi], den = g0 - 2 * md + g2;
        const off = den ? 0.5 * (g0 - g2) / den : 0;
        const s = mi - 4 + Math.max(-0.5, Math.min(0.5, off));
        P.push([px + nx * s, py + ny * s]);
      }
      L.push(P.length >= 6 ? fitLine(P) : null);
    }
    const out = q.slice();
    for (let i = 0; i < 4; i++) {
      const A = L[(i + 3) % 4], B = L[i]; if (!A || !B) continue;     // i. köşe: önceki ve sonraki kenarın kesişimi
      const cr = A.dx * B.dy - A.dy * B.dx; if (Math.abs(cr) < 0.2) continue;
      const s = ((B.mx - A.mx) * B.dy - (B.my - A.my) * B.dx) / cr, x = A.mx + A.dx * s, y = A.my + A.dy * s;
      if (Math.hypot(x - q[2 * i], y - q[2 * i + 1]) < 4) { out[2 * i] = x; out[2 * i + 1] = y; }
    }
    return out;
  }
  function fitLine(P) {
    let fit = pca(P);
    const keep = P.filter((p) => Math.abs((p[0] - fit.mx) * -fit.dy + (p[1] - fit.my) * fit.dx) < 0.9);
    if (keep.length >= 6 && keep.length < P.length) fit = pca(keep);
    return fit;
  }
  function pca(P) {
    let mx = 0, my = 0; for (const p of P) { mx += p[0]; my += p[1]; } mx /= P.length; my /= P.length;
    let sxx = 0, sxy = 0, syy = 0; for (const p of P) { const x = p[0] - mx, y = p[1] - my; sxx += x * x; sxy += x * y; syy += y * y; }
    const th = 0.5 * Math.atan2(2 * sxy, sxx - syy);
    return { mx, my, dx: Math.cos(th), dy: Math.sin(th) };
  }
  // dörtgeni önceki karedeki sırasına döndür (köşeler kâğıdın aynı köşelerinde kalsın)
  function order(q, prev) {
    if (area(q) < 0) q = [q[0], q[1], q[6], q[7], q[4], q[5], q[2], q[3]];
    let sh = 0;
    if (prev) {
      let best = Infinity;
      for (let s = 0; s < 4; s++) { let d = 0; for (let i = 0; i < 4; i++) { const k = (i + s) % 4; d += (q[2 * k] - prev[2 * i]) ** 2 + (q[2 * k + 1] - prev[2 * i + 1]) ** 2; } if (d < best) { best = d; sh = s; } }
    } else { let best = Infinity; for (let i = 0; i < 4; i++) { const v = q[2 * i] + q[2 * i + 1]; if (v < best) { best = v; sh = i; } } }
    const o = []; for (let i = 0; i < 4; i++) { const k = (i + sh) % 4; o.push(q[2 * k], q[2 * k + 1]); }
    return o;
  }
  function paperLight(px, w, h, q) {
    const S = [];
    for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) {
      const p = quadAt(q, 0.14 + i * 0.12, 0.14 + j * 0.12), k = ((Math.round(p[1]) * w) + Math.round(p[0])) * 4;
      S.push([px[k] * 77 + px[k + 1] * 150 + px[k + 2] * 29, px[k], px[k + 1], px[k + 2]]);
    }
    S.sort((a, b) => b[0] - a[0]);
    const n = Math.round(S.length * 0.6); let r = 0, g = 0, b = 0;
    for (let i = 0; i < n; i++) { r += S[i][1]; g += S[i][2]; b += S[i][3]; }
    r /= n * 255; g /= n * 255; b /= n * 255;
    return { r, g, b, lum: 0.3 * r + 0.59 * g + 0.11 * b };
  }

  /** Kâğıt bul. px: RGBA (w×h). o.prev: önceki köşeler (aynı ölçekte) → izleme eşiği ve köşe sırası.
      Dönüş: { ok, corners: [x0,y0 … x3,y3] (görüntüde saat yönünde), light, fill, area } ya da { ok:false, reason } */
  function detect(px, w, h, o) {
    o = o || {};
    const n = w * h; ensure(n); toGray(px, w, h);
    const ot = otsu(n), light = { mean: ot.mean / 255, bg: ot.lo / 255 };
    if (ot.mean < 22) return { ok: false, reason: "dark", light };
    let thr = o.prev ? trackThreshold(o.prev, w, h) : null;
    if (thr == null) { if (ot.hi - ot.lo < 40) return { ok: false, reason: "flat", light }; thr = ot.thr; }
    // bağlı bileşenler (4 komşuluk)
    lab.fill(0, 0, n);
    const minA = n * 0.025, C = [];
    let id = 0;
    for (let s = 0; s < n; s++) {
      if (lab[s] || blur[s] <= thr) continue;
      id++; let sp = 0, A = 0, x0 = w, x1 = 0, y0 = h, y1 = 0, edge = false;
      stack[sp++] = s; lab[s] = id;
      while (sp) {
        const p = stack[--sp], x = p % w, y = (p - x) / w; A++;
        if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
        if (x === 0 || y === 0 || x === w - 1 || y === h - 1) edge = true;
        if (x > 0 && !lab[p - 1] && blur[p - 1] > thr) { lab[p - 1] = id; stack[sp++] = p - 1; }
        if (x < w - 1 && !lab[p + 1] && blur[p + 1] > thr) { lab[p + 1] = id; stack[sp++] = p + 1; }
        if (y > 0 && !lab[p - w] && blur[p - w] > thr) { lab[p - w] = id; stack[sp++] = p - w; }
        if (y < h - 1 && !lab[p + w] && blur[p + w] > thr) { lab[p + w] = id; stack[sp++] = p + w; }
      }
      if (A >= minA) C.push({ id, A, x0, x1, y0, y1, edge });
    }
    if (!C.length) return { ok: false, reason: "none", light };
    C.sort((a, b) => b.A - a.A);
    let best = null, reason = "shape";
    for (const c of C.slice(0, 4)) {
      if (c.edge) { reason = "edge"; continue; }
      const P = []; let filled = 0;
      for (let y = c.y0; y <= c.y1; y++) {
        let l = -1, r = -1; const row = y * w;
        for (let x = c.x0; x <= c.x1; x++) if (lab[row + x] === c.id) { l = x; break; }
        if (l < 0) continue;
        for (let x = c.x1; x >= l; x--) if (lab[row + x] === c.id) { r = x; break; }
        P.push([l, y], [r, y]); filled += r - l + 1;
      }
      for (let x = c.x0; x <= c.x1; x++) {
        let t = -1, b = -1;
        for (let y = c.y0; y <= c.y1; y++) if (lab[y * w + x] === c.id) { t = y; break; }
        if (t < 0) continue;
        for (let y = c.y1; y >= t; y--) if (lab[y * w + x] === c.id) { b = y; break; }
        P.push([x, t], [x, b]);
      }
      let q = maxQuad(hull(P)); if (!q) continue;
      q = order(q, null);
      const qa = area(q); if (qa <= 0) continue;
      const fill = filled / (qa + Math.sqrt(qa) * 2);              // piksel kenar payı düzeltmesi
      if (fill < 0.82 || fill > 1.12 || !convexOk(q)) continue;
      const cand = { q, fill, qa };
      if (!best) best = cand;
      else if (o.prev) {                                           // izlemede öncekine en yakın aday
        const d = (u) => { let s = 0; for (let i = 0; i < 4; i++) s += Math.hypot(u.q[2 * i] - o.prev[2 * i], u.q[2 * i + 1] - o.prev[2 * i + 1]); return s; };
        if (d(cand) < d(best)) best = cand;
      }
      if (!o.prev) break;
    }
    if (!best) return { ok: false, reason, light };
    let q = refine(best.q, w, h);
    if (!convexOk(q)) q = best.q;
    q = order(q, o.prev || null);
    const pl = paperLight(px, w, h, q);
    Object.assign(light, pl, { contrast: Math.max(0, pl.lum - light.bg) });
    return { ok: true, corners: q, light, fill: best.fill, area: best.qa / n, thr };
  }

  /* ---------- Geometri ---------- */
  function solve8(A, b) {
    const n = 8, M = A.map((r, i) => r.concat(b[i]));
    for (let c = 0; c < n; c++) {
      let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
      if (Math.abs(M[p][c]) < 1e-12) return null;
      const t = M[c]; M[c] = M[p]; M[p] = t;
      for (let r = 0; r < n; r++) { if (r === c) continue; const f = M[r][c] / M[c][c]; if (!f) continue; for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k]; }
    }
    return M.map((r, i) => r[n] / r[i]);
  }
  /** s → d homografisi (4 nokta, [x0,y0 … x3,y3]); 3×3 satır sıralı, h33 = 1 */
  function homography(s, d) {
    const A = [], b = [];
    for (let i = 0; i < 4; i++) {
      const x = s[2 * i], y = s[2 * i + 1], u = d[2 * i], v = d[2 * i + 1];
      A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u);
      A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v);
    }
    const h = solve8(A, b); if (!h) return null; h.push(1); return h;
  }
  const applyH = (H, x, y) => { const z = H[6] * x + H[7] * y + H[8]; return [(H[0] * x + H[1] * y + H[2]) / z, (H[3] * x + H[4] * y + H[5]) / z]; };
  const mul3 = (A, B) => { const C = new Array(9); for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) C[i * 3 + j] = A[i * 3] * B[j] + A[i * 3 + 1] * B[3 + j] + A[i * 3 + 2] * B[6 + j]; return C; };
  // K⁻¹·H sütunları (asal nokta merkezde, kare piksel)
  function normH(H, f, cx, cy) {
    return [(H[0] - cx * H[6]) / f, (H[1] - cx * H[7]) / f, (H[2] - cx * H[8]) / f, (H[3] - cy * H[6]) / f, (H[4] - cy * H[7]) / f, (H[5] - cy * H[8]) / f, H[6], H[7], H[8]];
  }
  /** Düzlem (X, Y, 0) → piksel homografisinden kamera pozu: Xkam = R·X + t (OpenCV ekseni: x sağ, y aşağı, z ileri) */
  function pose(H, f, cx, cy) {
    const g = normH(H, f, cx, cy);
    const h1 = [g[0], g[3], g[6]], h2 = [g[1], g[4], g[7]], h3 = [g[2], g[5], g[8]];
    const n1 = Math.hypot(...h1), n2 = Math.hypot(...h2); if (!n1 || !n2) return null;
    let lam = 2 / (n1 + n2); if (h3[2] * lam < 0) lam = -lam;
    const sg = Math.sign(lam), r1 = h1.map((v) => (v * sg) / n1), r2 = h2.map((v) => (v * sg) / n2);
    const nrm = (v) => { const L = Math.hypot(...v) || 1; return v.map((x) => x / L); };
    const a = nrm(r1.map((v, i) => v + r2[i])), b = nrm(r1.map((v, i) => v - r2[i]));
    const R1 = a.map((v, i) => (v + b[i]) / SQ2), R2 = a.map((v, i) => (v - b[i]) / SQ2);
    const R3 = [R1[1] * R2[2] - R1[2] * R2[1], R1[2] * R2[0] - R1[0] * R2[2], R1[0] * R2[1] - R1[1] * R2[0]];
    return { R: [R1[0], R2[0], R3[0], R1[1], R2[1], R3[1], R1[2], R2[2], R3[2]], t: h3.map((v) => v * lam), ratio: n1 / n2 };
  }
  /** Homografiden odak uzaklığı (Zhang kısıtları, asal nokta merkezde). Düzlem gerçek en-boy oranıyla verilmeli.
      Dönüş: { f, w } (w: eğimden gelen güven; kâğıt kameraya dik duruyorsa ≈0) ya da null */
  function focal(H, cx, cy) {
    const g = normH(H, 1, cx, cy);
    const a1 = g[0] * g[1] + g[3] * g[4], b1 = g[6] * g[7];
    const a2 = g[0] * g[0] + g[3] * g[3] - g[1] * g[1] - g[4] * g[4], b2 = g[6] * g[6] - g[7] * g[7];
    const den = a1 * a1 + a2 * a2; if (!den) return null;
    const u = -(a1 * b1 + a2 * b2) / den; if (!(u > 0)) return null;
    const f = 1 / Math.sqrt(u), wgt = Math.hypot(g[6], g[7]) * f / Math.abs(g[8] || 1);
    return { f, w: wgt };
  }

  /** Köşe süzgeci: her koordinat için sabit hızlı Kalman [konum, hız].
      Uyarlanır: yenilik (ölçüm − tahmin) beklenenden büyükse belirsizlik büyütülür → hızlı harekette takılmaz,
      el titremesinde güçlü süzer. q: süreç gürültüsü (px²/s³), r: ölçüm gürültüsü (px²). */
  function kalman(dim, q, r, s0, qMax) {
    const X = new Float64Array(dim), V = new Float64Array(dim), P00 = new Float64Array(dim), P01 = new Float64Array(dim), P11 = new Float64Array(dim);
    // hıza bağlı süreç gürültüsü: el sabitken güçlü süz, kâğıt kaydıkça çevikleş (s0: px/s ölçeği)
    s0 = s0 || 4; qMax = qMax || q * 40;
    const K = { init: false, t: 0, q, r, X, V,
      reset() { K.init = false; },
      predict(t) { const dt = Math.max(0, Math.min(0.12, (t - K.t) / 1000)), out = new Array(dim); for (let i = 0; i < dim; i++) out[i] = X[i] + V[i] * dt; return out; },
      update(z, t) {
        if (!K.init) { for (let i = 0; i < dim; i++) { X[i] = z[i]; V[i] = 0; P00[i] = r; P01[i] = 0; P11[i] = 2500; } K.init = true; K.t = t; return 0; }
        const dt = Math.max(1e-3, Math.min(0.25, (t - K.t) / 1000)); K.t = t;
        let sp = 0; for (let i = 0; i < dim; i++) sp += V[i] * V[i];
        const q = Math.min(qMax, K.q * (1 + sp / dim / (s0 * s0)));
        let nis = 0;
        for (let i = 0; i < dim; i++) {
          X[i] += V[i] * dt;
          P00[i] += dt * (2 * P01[i] + dt * P11[i]) + q * dt * dt * dt / 3; P01[i] += dt * P11[i] + q * dt * dt / 2; P11[i] += q * dt;
          const y = z[i] - X[i]; nis += (y * y) / (P00[i] + K.r);
        }
        nis /= dim;
        const fade = nis > 4 ? Math.min(60, nis / 2) : 1;           // manevra: belleği unut
        for (let i = 0; i < dim; i++) {
          if (fade > 1) { P00[i] *= fade; P01[i] *= fade; P11[i] *= fade; }
          const y = z[i] - X[i], S = P00[i] + K.r, k0 = P00[i] / S, k1 = P01[i] / S;
          X[i] += k0 * y; V[i] += k1 * y;
          const p00 = P00[i], p01 = P01[i];
          P00[i] = p00 - k0 * p00; P01[i] = p01 - k0 * p01; P11[i] -= k1 * p01;
        }
        return nis;
      },
      damp(k) { for (let i = 0; i < dim; i++) V[i] *= k; }
    };
    return K;
  }

  G.ARVision = { detect, homography, applyH, mul3, pose, focal, kalman, area, SQ2 };
})(typeof self !== "undefined" ? self : globalThis);
