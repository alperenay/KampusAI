/* =========================================================
   labs3d-fizik.js — fizik deneylerinin 3B sahneleri
   Hesaplar 2B deneylerle aynıdır; burada yalnızca görünüm kurulur.
   ========================================================= */
(function () {
  if (!App.lab3d) return;
  const D3 = App.lab3d.def, DEG = Math.PI / 180, g0 = 9.8;
  const fx = (x, d) => Number(x).toFixed(d == null ? 1 : d).replace(".", App.i18n.lang === "en" ? "." : ",");
  const LIQC = (rho) => (rho > 5000 ? "#c3c9d2" : rho < 900 ? "#e8c25a" : rho > 1010 ? "#2f7fbf" : "#3d8fe0");

  /* ======================= 9. sınıf ======================= */

  D3("vektor", {
    view: { r: 10, th: 0.4, ph: 0.8, target: [3, 0, -1] },
    build(S) { const o = S.o; o.A = S.arrow(S.cols.accent, 0.09); o.B = S.arrow(S.cols.good, 0.09); o.Bg = S.arrow("#6c8f6c", 0.05); o.R = S.arrow(S.cols.warn, 0.11);
      o.rx = S.line(0xaaaaaa, 2, null, { dashed: true }); o.ry = S.line(0xaaaaaa, 2, null, { dashed: true }); o.lA = S.label("A", S.cols.accent, 0.6); o.lB = S.label("B", S.cols.good, 0.6); o.lR = S.label("R", S.cols.warn, 0.7); },
    update(S, p) {
      const o = S.o, k = 0.65, th = p.th * DEG, y = 0.15, A = [p.a * k, y, 0], B = [A[0] + p.b * k * Math.cos(th), y, -p.b * k * Math.sin(th)];
      o.A.set([0, y, 0], A); o.B.set(A, B); o.Bg.set([0, y, 0], [B[0] - A[0], y, B[2]]); o.R.set([0, y, 0], B);
      o.rx.visible = o.ry.visible = !!p.comp; o.rx.setPoints([[B[0], y, B[2]], [B[0], y, 0]]); o.ry.setPoints([[0, y, B[2]], [B[0], y, B[2]]]);
      o.lA.position.set(A[0] / 2, 0.8, 0.4); o.lB.position.set((A[0] + B[0]) / 2 + 0.3, 0.8, B[2] / 2); o.lR.position.set(B[0] / 2 - 0.3, 0.9, B[2] / 2 - 0.3);
    }
  });

  D3("basinc", {
    view: { r: 15, th: 0.3, ph: 1.2, target: [0, 2.6, 0] },
    build(S) {
      const o = S.o, T3 = S.THREE, H = 5;
      const shapes = [new T3.CylinderGeometry(1.1, 1.1, H, 32), new T3.CylinderGeometry(1.5, 0.6, H, 32), new T3.CylinderGeometry(0.45, 1.4, H, 32)];
      o.liq = []; o.dots = [];
      shapes.forEach((gm, i) => { const x = (i - 1) * 4; const glass = S.mesh(gm, S.glass()); glass.position.set(x, H / 2, 0); glass.castShadow = false;
        const lq = S.mesh(gm.clone(), new T3.MeshStandardMaterial({ color: 0x3d8fe0, transparent: true, opacity: 0.55, roughness: 0.1 })); lq.scale.set(0.96, 0.92, 0.96); lq.position.set(x, H * 0.46, 0); lq.castShadow = false; o.liq.push(lq);
        o.dots.push(S.sphere(0.14, S.cols.warn)); });
      o.plane = S.mesh(new T3.PlaneGeometry(13, 3.5), new T3.MeshBasicMaterial({ color: 0xf2b33d, transparent: true, opacity: 0.18, side: T3.DoubleSide, depthWrite: false })); o.plane.rotation.x = -Math.PI / 2;
      o.lab = S.label("", null, 0.55); o.H = H;
    },
    update(S, p) {
      const o = S.o, top = o.H * 0.92, y = top - (p.h / 10) * (top - 0.15), P = p.rho * g0 * p.h + (p.atm ? 101325 : 0);
      o.liq.forEach((l) => l.material.color.set(LIQC(p.rho))); o.dots.forEach((d, i) => d.position.set((i - 1) * 4, y, 0)); o.plane.position.y = y;
      o.lab.set("P = " + fx(P / 1000) + " kPa"); o.lab.position.set(0, top + 0.9, 0);
    }
  });

  D3("kaldirma", {
    view: { r: 11, th: 0.45, ph: 1.15, target: [0, 2, 0] },
    build(S) { const o = S.o, T3 = S.THREE;
      o.tank = S.mesh(new T3.BoxGeometry(5, 4, 3), S.glass()); o.tank.position.y = 2; o.tank.castShadow = false;
      o.water = S.mesh(new T3.BoxGeometry(4.9, 2.6, 2.9), new T3.MeshStandardMaterial({ color: 0x3d8fe0, transparent: true, opacity: 0.45, roughness: 0.08, depthWrite: false })); o.water.position.y = 1.3; o.water.castShadow = false;
      o.cube = S.box(1, 1, 1, "#d39b4a"); o.G = S.arrow(S.cols.bad, 0.06); o.F = S.arrow(S.cols.good, 0.06); o.lab = S.label("", null, 0.5); },
    update(S, p, t) {
      const o = S.o, V = p.v / 1000, G = p.d * V * g0, frac = Math.min(1, p.d / p.rho), sink = p.d > p.rho * 1.001, sus = Math.abs(p.d - p.rho) <= p.rho * 0.001;
      const Fb = p.rho * g0 * V * (sink || sus ? 1 : frac), side = 0.55 + Math.cbrt(p.v) * 0.35, surf = 2.6;
      o.water.material.color.set(LIQC(p.rho));
      let yb; if (sink) yb = side / 2 + 0.02; else if (sus) yb = 1.3; else yb = surf - side * frac + side / 2;
      yb += sink ? 0 : Math.sin(t * 2) * 0.03;
      o.cube.scale.set(side, side, side); o.cube.position.set(0, yb, 0);
      o.G.set([0.15, yb, side / 2 + 0.05], [0.15, yb - Math.min(2.2, G * 0.04), side / 2 + 0.05]); o.F.set([-0.15, yb, side / 2 + 0.05], [-0.15, yb + Math.min(2.2, Fb * 0.04), side / 2 + 0.05]);
      o.lab.set(sink ? App.labs.util.T("batar", "sinks") : sus ? App.labs.util.T("askıda", "suspended") : App.labs.util.T("yüzer · %", "floats · ") + fx(frac * 100, 0)); o.lab.position.set(0, 4.6, 0);
    }
  });

  D3("bernoulli", {
    view: { r: 13, th: 0.4, ph: 1.2, target: [0, 1.8, 0] },
    build(S) { const o = S.o; o.key = null; o.parts = Array.from({ length: 60 }, () => ({ m: S.sphere(0.07, "#ffffff", null, 8), u: Math.random(), a: Math.random() * 7, r: Math.random() })); o.tubes = []; },
    update(S, p, t) {
      const o = S.o, T3 = S.THREE, R1 = 1.1, R2 = R1 * p.r, L = 12;
      const rad = (u) => (u < 0.35 || u > 0.65 ? R1 : R1 + (R2 - R1) * (0.5 - 0.5 * Math.cos(((u - 0.35) / 0.3) * 2 * Math.PI)));
      S.keyed("pipe", p.r, (g) => {
        const prof = []; for (let i = 0; i <= 80; i++) { const u = i / 80; prof.push(new T3.Vector2(rad(u), -L / 2 + u * L)); }
        const pipe = S.mesh(new T3.LatheGeometry(prof, 40), S.glass(0xbfdcff, 0.25), g); pipe.rotation.z = -Math.PI / 2; pipe.position.y = 1.6; pipe.castShadow = false;
        o.tubes = [0.18, 0.5, 0.82].map((u) => { const x = -L / 2 + u * L, r = rad(u); const tb = S.mesh(new T3.CylinderGeometry(0.15, 0.15, 3, 16), S.glass(), g); tb.position.set(x, 1.6 + r + 1.5, 0); const lq = S.cyl(0.12, 0.12, 1, "#3d8fe0", g); return { x, r, lq }; });
      });
      const v2 = p.v1 / p.r, dP = 0.5 * 1000 * (v2 * v2 - p.v1 * p.v1), h1 = 2.4, h2 = Math.max(0.1, h1 * (1 - dP / (dP + 15000)));
      o.tubes.forEach((tb, i) => { const h = i === 1 ? h2 : h1; tb.lq.scale.set(1, h, 1); tb.lq.position.set(tb.x, 1.6 + tb.r + h / 2, 0); });
      o.parts.forEach((q) => { const r = rad(q.u); q.u += p.v1 * (R1 * R1) / (r * r) * 0.0025; if (q.u > 1) { q.u -= 1; q.r = Math.random(); } const rr = r * 0.85 * Math.sqrt(q.r); q.m.position.set(-L / 2 + q.u * L, 1.6 + rr * Math.sin(q.a), rr * Math.cos(q.a)); });
      void t;
    }
  });

  D3("isinma", {
    view: { r: 9, th: 0.5, ph: 1.15, target: [0, 1.8, 0] },
    build(S) { const o = S.o, T3 = S.THREE;
      o.plate = S.cyl(1.6, 1.7, 0.5, "#333"); o.plate.position.y = 0.25; o.coil = S.mesh(new T3.TorusGeometry(1.1, 0.06, 8, 40), new T3.MeshStandardMaterial({ color: 0x441111, emissive: 0xff3300, emissiveIntensity: 0.6 })); o.coil.rotation.x = Math.PI / 2; o.coil.position.y = 0.52;
      o.beaker = S.mesh(new T3.CylinderGeometry(1.3, 1.3, 3, 40, 1, true), S.glass()); o.beaker.position.y = 2.05; o.beaker.castShadow = false;
      o.liq = S.mesh(new T3.CylinderGeometry(1.24, 1.24, 1, 40), new T3.MeshStandardMaterial({ color: 0x3d8fe0, transparent: true, opacity: 0.55, roughness: 0.1 })); o.liq.castShadow = false;
      o.ice = Array.from({ length: 6 }, (_, i) => { const m = S.box(0.55, 0.55, 0.55, new T3.MeshStandardMaterial({ color: 0xdff4ff, transparent: true, opacity: 0.85, roughness: 0.05 })); m.rotation.set(i, i * 0.7, 0); return m; });
      o.bub = Array.from({ length: 30 }, () => ({ m: S.sphere(0.07, "#ffffff", null, 8), y: Math.random() }));
      o.steam = Array.from({ length: 24 }, () => ({ m: S.sphere(0.18, new T3.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.25, depthWrite: false })), y: Math.random(), a: Math.random() * 7 }));
      o.th = S.cyl(0.05, 0.05, 3.2, "#ddd"); o.th.position.set(0.7, 2.6, 0.4); o.thl = S.cyl(0.035, 0.035, 1, "#e0453a");
      o.lab = S.label("", null, 0.5); },
    update(S, p, t, s) {
      const o = S.o, ph = s.phase || "s", pf = s.pf || 0, T0 = s.T0 != null ? s.T0 : 0, power = Math.min(1, p.P / 5000);
      o.coil.material.emissiveIntensity = 0.3 + power * 1.2;
      const iceAmt = ph === "s" ? 1 : ph === "f" ? 1 - pf : 0, liqAmt = ph === "s" ? 0 : ph === "f" ? pf : ph === "l" ? 1 : ph === "v" ? 1 - pf : 0;
      const lvl = 0.3 + 1.8 * Math.max(liqAmt, 0.02) * (0.4 + 0.6 * Math.min(1, p.m));
      o.liq.visible = liqAmt > 0.01; o.liq.scale.set(1, lvl, 1); o.liq.position.y = 0.55 + lvl / 2;
      o.ice.forEach((m, i) => { const k = Math.max(0, iceAmt) * (0.6 + 0.4 * Math.min(1, p.m)); m.visible = k > 0.03; m.scale.setScalar(Math.max(0.01, k)); m.position.set(((i % 3) - 1) * 0.6, 0.85 + Math.floor(i / 3) * 0.5 * k + (liqAmt > 0 ? lvl * 0.6 : 0), (Math.floor(i / 3) - 0.5) * 0.5); });
      o.bub.forEach((b) => { b.m.visible = ph === "v" || (ph === "l" && T0 > S.o._tb - 15); b.y += 0.02 + Math.random() * 0.01; if (b.y > 1) b.y = 0; b.m.position.set((Math.random() - 0.5) * 1.8, 0.6 + b.y * lvl, (Math.random() - 0.5) * 1.8); });
      o.steam.forEach((q) => { q.m.visible = ph === "v" || ph === "g"; q.y += 0.01; if (q.y > 1) q.y = 0; q.m.position.set(Math.cos(q.a) * 0.6 * q.y, 2.2 + q.y * 3, Math.sin(q.a) * 0.6 * q.y); q.m.material.opacity = 0.3 * (1 - q.y); });
      S.o._tb = p.sub === "etanol" ? 78 : 100;
      const k = Math.max(0.02, Math.min(1, (T0 - (s.Ti || -20)) / ((s.Tf || 120) - (s.Ti || -20)))); o.thl.scale.set(1, 3 * k, 1); o.thl.position.set(0.7, 1.05 + 1.5 * k, 0.4);
      o.lab.set(fx(T0) + " °C"); o.lab.position.set(0.7, 4.6, 0.4);
      void t;
    }
  });

  D3("isildenge", {
    view: { r: 11, th: 0.35, ph: 1.15, target: [0, 1.6, 0] },
    build(S) { const o = S.o, T3 = S.THREE;
      o.b = [-2.6, 0, 2.6].map((x, i) => { const gl = S.mesh(new T3.CylinderGeometry(i === 1 ? 1.3 : 0.9, i === 1 ? 1.3 : 0.9, 2.6, 36, 1, true), S.glass()); gl.position.set(x, 1.3, 0); gl.castShadow = false;
        const lq = S.mesh(new T3.CylinderGeometry(i === 1 ? 1.24 : 0.85, i === 1 ? 1.24 : 0.85, 1, 36), new T3.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 })); lq.castShadow = false; return { x, lq }; });
      o.ar1 = S.arrow("#ffffff", 0.05); o.ar2 = S.arrow("#ffffff", 0.05); o.l = [0, 1, 2].map(() => S.label("", null, 0.45)); },
    update(S, p, t) {
      const o = S.o, Te = (p.m1 * p.t1 + p.m2 * p.t2) / (p.m1 + p.m2), f = 1 - Math.exp(-0.9 * t), Th = p.t1 + (Te - p.t1) * f, Tc = p.t2 + (Te - p.t2) * f, pour = Math.min(1, t / 2);
      const col = (a) => new S.THREE.Color().setHSL((1 - a / 100) * 0.62, 0.75, 0.5);
      const set = (b, vol, temp) => { const h = Math.max(0.02, Math.min(2.4, vol * 1.1)); b.lq.scale.set(1, h, 1); b.lq.position.set(b.x, h / 2 + 0.02, 0); b.lq.material.color.copy(col(temp)); b.lq.visible = vol > 0.01; };
      set(o.b[0], p.m1 * (1 - pour), p.t1); set(o.b[2], p.m2 * (1 - pour), p.t2); set(o.b[1], (p.m1 + p.m2) * pour * 0.55, pour < 1 ? (Th + Tc) / 2 : Te);
      o.ar1.visible = o.ar2.visible = pour < 1; o.ar1.set([-2.2, 2.9, 0], [-1, 2.4, 0]); o.ar2.set([2.2, 2.9, 0], [1, 2.4, 0]);
      o.l[0].set(fx(Th) + " °C"); o.l[0].position.set(-2.6, 3.4, 0); o.l[1].set(fx(Te) + " °C"); o.l[1].position.set(0, 3.4, 0); o.l[2].set(fx(Tc) + " °C"); o.l[2].position.set(2.6, 3.4, 0);
    }
  });

  D3("iletim", {
    view: { r: 11, th: 0.45, ph: 1.15, target: [0, 1.4, 0] },
    build(S) { const o = S.o, T3 = S.THREE;
      o.hot = S.box(1.4, 2, 2, new T3.MeshStandardMaterial({ color: 0xff6a4d, emissive: 0xff3300, emissiveIntensity: 0.25 })); o.cold = S.box(1.4, 2, 2, new T3.MeshStandardMaterial({ color: 0x4d8bff, emissive: 0x1144aa, emissiveIntensity: 0.2 }));
      o.rod = S.cyl(0.3, 0.3, 1, "#ccc", null, 32); o.rod.rotation.z = Math.PI / 2;
      o.dots = Array.from({ length: 10 }, () => S.sphere(0.09, "#ffffff", null, 8)); o.lab = S.label("", null, 0.5); },
    update(S, p, t) {
      const o = S.o, len = 2 + 6 * p.L, r = 0.12 + p.A * 0.05, rate = p.k * (p.A / 1e4) * p.dT / p.L;
      const mats = { 400: "#c97a42", 237: "#c9ccd2", 50: "#6f747c", 1: "#bfe3ff", 0.15: "#a8794f", 0.04: "#f2f2f2" };
      o.rod.scale.set(r / 0.3, len, r / 0.3); o.rod.position.set(0, 1.2, 0); o.rod.material.color.set(mats[p.k] || "#ccc"); o.rod.material.metalness = p.k > 40 ? 0.7 : 0; o.rod.material.roughness = p.k > 40 ? 0.3 : 0.8;
      o.hot.position.set(-len / 2 - 0.7, 1, 0); o.cold.position.set(len / 2 + 0.7, 1, 0);
      const sp = Math.min(1.5, Math.log10(1 + rate) / 2);
      o.dots.forEach((d, i) => { const u = ((i / 10) + t * sp * 0.4) % 1; d.position.set(-len / 2 + u * len, 1.2 + r + 0.08, 0); d.visible = sp > 0.01; });
      o.lab.set(fx(rate, rate < 1 ? 3 : 1) + " W"); o.lab.position.set(0, 2.4, 0);
    }
  });

  /* ======================= 10. sınıf ======================= */

  const car = (S, col) => { const g = S.group(); const b = S.box(1.8, 0.5, 1, col, g); b.position.y = 0.55; const c = S.box(0.9, 0.4, 0.9, "#dfe6ff", g); c.position.set(-0.1, 1, 0);
    [[-0.6, 0.5], [0.6, 0.5], [-0.6, -0.5], [0.6, -0.5]].forEach(([x, z]) => { const w = S.cyl(0.28, 0.28, 0.18, "#222", g); w.rotation.x = Math.PI / 2; w.position.set(x, 0.28, z); }); return g; };
  D3("karsilasma", {
    view: { r: 18, th: 0.4, ph: 1.1, target: [0, 0.8, 0] },
    build(S) { const o = S.o; o.road = S.box(20, 0.05, 4.4, "#3a3d44"); o.road.position.y = 0.02; for (let i = -9; i <= 9; i += 2) { const m = S.box(1, 0.06, 0.12, "#e8e8e8"); m.position.set(i, 0.03, 0); }
      o.a = car(S, S.cols.accent); o.b = car(S, S.cols.warn); o.meet = S.cyl(0.6, 0.6, 0.04, S.cols.good); o.lab = S.label("", null, 0.55); },
    update(S, p, t) {
      const o = S.o, vr = p.v1 - p.v2, tm = vr > 0 ? p.d / vr : Infinity, Tm = isFinite(tm) ? Math.min(60, tm * 1.4) : 20, tt = Math.min(t * Tm / 6, Tm);
      const xa = (s) => p.v1 * s, xb = (s) => p.d + p.v2 * s;
      let lo = Math.min(0, p.d, xa(Tm), xb(Tm)), hi = Math.max(0, p.d, xa(Tm), xb(Tm)); const k = 18 / Math.max(10, hi - lo), X = (x) => -9 + (x - lo) * k;
      o.a.position.set(X(xa(tt)), 0, -1); o.a.rotation.y = p.v1 < 0 ? Math.PI : 0; o.b.position.set(X(xb(tt)), 0, 1); o.b.rotation.y = p.v2 < 0 ? Math.PI : 0;
      o.meet.visible = isFinite(tm) && tm <= Tm; if (o.meet.visible) o.meet.position.set(X(xa(tm)), 0.05, 0);
      o.lab.set("t = " + fx(tt) + " s"); o.lab.position.set(0, 3, 0);
    }
  });

  D3("enerji", {
    view: { r: 16, th: 0.25, ph: 1.15, target: [0, 3, 0] },
    build(S) { const o = S.o; o.key = null; o.ball = S.sphere(0.45, S.cols.accent, null, 32); o.ball.material.metalness = 0.5; o.ball.material.roughness = 0.3;
      o.bars = [S.cols.good, S.cols.warn, S.cols.bad].map((c) => S.box(0.7, 1, 0.7, c)); o.lab = [0, 1, 2].map(() => S.label("", null, 0.4)); },
    update(S, p, t, s) {
      const o = S.o, Lx = 6, sc = 0.7;
      S.keyed("track", p.h, (g) => { const P = []; for (let i = 0; i <= 80; i++) { const x = -1 + i / 40; P.push([x * Lx, p.h * x * x * sc + 0.15, 0]); } S.tube(P, 0.12, "#8a8f99", g);
        [-1, 1].forEach((x) => { const post = S.cyl(0.08, 0.08, p.h * sc, "#555", g); post.position.set(x * Lx, p.h * sc / 2, 0); }); });
      const x = s.x != null ? s.x : -1, y = p.h * x * x;
      o.ball.position.set(x * Lx, y * sc + 0.15 + 0.5, 0);
      const E0 = p.m * g0 * p.h, Ek = 0.5 * p.m * (s.v || 0) ** 2, Ep = p.m * g0 * y, Eh = s.Eh || 0;
      [Ek, Ep, Eh].forEach((v, i) => { const h = Math.max(0.02, 4 * Math.min(1, v / E0)); o.bars[i].scale.set(1, h, 1); o.bars[i].position.set(-1.2 + i * 1.2, h / 2, -3.5); o.lab[i].set(["Eₖ", "Eₚ", App.labs.util.T("ısı", "heat")][i]); o.lab[i].position.set(-1.2 + i * 1.2, 4.6, -3.5); });
      void t;
    }
  });

  D3("devre", {
    view: { r: 12, th: 0.2, ph: 0.75, target: [0, 0, 0] },
    build(S) { const o = S.o, T3 = S.THREE; o.board = S.box(11, 0.3, 7, "#2d4a36"); o.board.position.y = 0.15; o.bat = S.cyl(0.45, 0.45, 1.8, "#d9a521"); o.bat.rotation.x = Math.PI / 2; o.bat.position.set(-4.6, 0.75, 0);
      o.cap = S.cyl(0.2, 0.2, 0.2, "#aaa"); o.cap.rotation.x = Math.PI / 2; o.cap.position.set(-4.6, 0.75, -1);
      const bulb = () => { const g = S.group(); const base = S.cyl(0.25, 0.25, 0.4, "#999", g); base.position.y = 0.5; const gl = S.mesh(new T3.SphereGeometry(0.45, 24, 18), new T3.MeshStandardMaterial({ color: 0xfff3c4, emissive: 0xffc94a, emissiveIntensity: 0, transparent: true, opacity: 0.85 }), g); gl.position.y = 1.05; const light = new T3.PointLight(0xffc94a, 0, 6); light.position.y = 1.05; g.add(light); g.gl = gl; g.light = light; return g; };
      o.b1 = bulb(); o.b2 = bulb(); o.e = Array.from({ length: 22 }, () => S.sphere(0.08, S.cols.warn, null, 8)); o.wires = S.group(); o.lab = [S.label("", null, 0.45), S.label("", null, 0.45)]; },
    update(S, p, t) {
      const o = S.o, ser = p.mode === "seri", Req = ser ? p.R1 + p.R2 : (p.R1 * p.R2) / (p.R1 + p.R2), I = p.V / (Req + p.r), Vt = p.V - I * p.r;
      const I1 = ser ? I : Vt / p.R1, I2 = ser ? I : Vt / p.R2, P1 = I1 * I1 * p.R1, P2 = I2 * I2 * p.R2, y = 0.35;
      const path = ser ? [[-4.6, y, 1], [-4.6, y, 2.6], [4.6, y, 2.6], [4.6, y, -2.6], [-4.6, y, -2.6], [-4.6, y, -1]] : [[-4.6, y, 1], [-4.6, y, 2.6], [4.6, y, 2.6], [4.6, y, -2.6], [-4.6, y, -2.6], [-4.6, y, -1]];
      S.keyed("wires", p.mode, (g) => { S.tube(path, 0.05, "#c97a42", g); if (!ser) { S.tube([[-1.5, y, 2.6], [-1.5, y, -2.6]], 0.05, "#c97a42", g); } });
      if (ser) { o.b1.position.set(-1.5, 0.3, 2.6); o.b2.position.set(1.8, 0.3, 2.6); } else { o.b1.position.set(1.8, 0.3, 2.6); o.b2.position.set(-1.5, 0.3, 0); }
      [[o.b1, P1], [o.b2, P2]].forEach(([b, P]) => { const k = Math.min(1, P / 40); b.gl.material.emissiveIntensity = k * 2.2; b.light.intensity = k * 2.5; });
      o.lab[0].set("R₁ · " + fx(I1, 2) + " A"); o.lab[0].position.copy(o.b1.position).add(new S.THREE.Vector3(0, 2, 0)); o.lab[1].set("R₂ · " + fx(I2, 2) + " A"); o.lab[1].position.copy(o.b2.position).add(new S.THREE.Vector3(0, 2, 0));
      // akım yönünde ilerleyen yükler
      const segs = []; let tot = 0; for (let i = 0; i < path.length - 1; i++) { const a = path[i], b = path[i + 1], L = Math.hypot(b[0] - a[0], b[2] - a[2]); segs.push([a, b, L]); tot += L; }
      o.e.forEach((m, i) => { let d = ((i / o.e.length) * tot + t * Math.min(6, I * 1.2)) % tot; for (const [a, b, L] of segs) { if (d <= L) { const u = d / L; m.position.set(a[0] + (b[0] - a[0]) * u, y + 0.1, a[2] + (b[2] - a[2]) * u); break; } d -= L; } });
    }
  });

  D3("rezonans", {
    view: { r: 14, th: 0.5, ph: 1.15, target: [0, 3.5, 0] },
    build(S) { const o = S.o; o.ground = S.box(8, 0.4, 6, "#6b5440"); o.floors = Array.from({ length: 7 }, (_, i) => { const f = S.box(2.6, 0.18, 2.6, "#aab3c0"); return f; });
      o.cols = []; for (let i = 0; i < 7; i++) for (let c = 0; c < 4; c++) o.cols.push(S.box(0.16, 1, 0.16, "#5d6673")); o.lab = S.label("", null, 0.5); },
    update(S, p, t) {
      const o = S.o, r = p.f / p.f0, A = 1 / Math.sqrt((1 - r * r) ** 2 + (2 * p.z * r) ** 2), base = Math.sin(2 * Math.PI * p.f * t) * 0.12, sway = Math.min(1.6, A * 0.12) * Math.sin(2 * Math.PI * p.f * t - Math.atan2(2 * p.z * r, 1 - r * r));
      o.ground.position.set(base, 0.2, 0);
      const X = (i) => base + sway * Math.pow(i / 6, 1.5), H = 0.9;
      o.floors.forEach((f, i) => f.position.set(X(i), 0.4 + i * H + 0.09, 0));
      let k = 0; for (let i = 0; i < 7; i++) for (let c = 0; c < 4; c++) { const m = o.cols[k++]; if (i === 6) { m.visible = false; continue; } const x0 = X(i), x1 = X(i + 1), dx = c % 2 ? 1.1 : -1.1, dz = c < 2 ? 1.1 : -1.1; m.scale.set(1, H, 1); m.position.set((x0 + x1) / 2 + dx, 0.4 + i * H + H / 2 + 0.09, dz); m.rotation.z = -Math.atan2(x1 - x0, H); }
      o.lab.set("×" + fx(A)); o.lab.position.set(X(6), 7.4, 0);
    }
  });

  D3("kirilma", {
    view: { r: 10, th: 0.55, ph: 1.15, target: [0, 1.5, 0] },
    build(S) { const o = S.o, T3 = S.THREE; o.top = S.mesh(new T3.BoxGeometry(8, 2.5, 4), new T3.MeshStandardMaterial({ color: 0x9fd0ff, transparent: true, opacity: 0.08, depthWrite: false })); o.top.position.y = 2.75; o.top.castShadow = false;
      o.bot = S.mesh(new T3.BoxGeometry(8, 2.5, 4), new T3.MeshStandardMaterial({ color: 0x9fd0ff, transparent: true, opacity: 0.3, roughness: 0.05, depthWrite: false })); o.bot.position.y = 0.25; o.bot.castShadow = false;
      o.laser = S.cyl(0.18, 0.18, 1, "#333"); o.inc = S.cyl(0.04, 0.04, 1, new T3.MeshBasicMaterial({ color: 0xff3030 })); o.refl = S.cyl(0.03, 0.03, 1, new T3.MeshBasicMaterial({ color: 0xff3030, transparent: true })); o.refr = S.cyl(0.04, 0.04, 1, new T3.MeshBasicMaterial({ color: 0xff3030, transparent: true }));
      o.norm = S.line(0xffffff, 2, null, { dashed: true }); o.norm.setPoints([[0, -1, 0], [0, 4, 0]]); o.lab = S.label("", null, 0.5); },
    update(S, p) {
      const o = S.o, T3 = S.THREE, a = p.a * DEG, n1 = p.n1, n2 = p.n2, sin2 = (n1 / n2) * Math.sin(a), tir = sin2 > 1, b = tir ? 0 : Math.asin(sin2), O = new T3.Vector3(0, 1.5, 0), L = 3;
      o.top.material.opacity = 0.05 + (n1 - 1) * 0.25; o.bot.material.opacity = 0.05 + (n2 - 1) * 0.25;
      const beam = (m, from, to) => { const d = new T3.Vector3().subVectors(to, from), len = d.length(); m.scale.set(1, len, 1); m.position.copy(from).add(d.clone().multiplyScalar(0.5)); m.quaternion.setFromUnitVectors(new T3.Vector3(0, 1, 0), d.normalize()); };
      const src = new T3.Vector3(-Math.sin(a) * L, 1.5 + Math.cos(a) * L, 0); beam(o.inc, src, O);
      o.laser.position.copy(src).add(new T3.Vector3(-Math.sin(a) * 0.5, Math.cos(a) * 0.5, 0)); o.laser.quaternion.copy(o.inc.quaternion);
      let Rf = 1; if (!tir) { const ci = Math.cos(a), ct = Math.cos(b); const rs = ((n1 * ci - n2 * ct) / (n1 * ci + n2 * ct)) ** 2, rp = ((n1 * ct - n2 * ci) / (n1 * ct + n2 * ci)) ** 2; Rf = (rs + rp) / 2; }
      beam(o.refl, O, new T3.Vector3(Math.sin(a) * L, 1.5 + Math.cos(a) * L, 0)); o.refl.material.opacity = Math.max(0.15, Rf);
      o.refr.visible = !tir; if (!tir) { beam(o.refr, O, new T3.Vector3(Math.sin(b) * L, 1.5 - Math.cos(b) * L, 0)); o.refr.material.opacity = Math.max(0.2, 1 - Rf); }
      o.lab.set(tir ? App.labs.util.T("tam yansıma", "total reflection") : fx(p.a, 0) + "° → " + fx(b / DEG) + "°"); o.lab.position.set(0, 4.6, 0);
    }
  });

  /* ======================= 11. sınıf ======================= */

  D3("newton", {
    view: { r: 13, th: 0.6, ph: 1.15, target: [0, 2, 0] },
    build(S) { const o = S.o; o.block = S.box(1, 1, 1, S.cols.accent); o.G = S.arrow(S.cols.bad, 0.06); o.N = S.arrow(S.cols.good, 0.06); o.f = S.arrow(S.cols.warn, 0.06); o.P = S.arrow(S.cols.violet, 0.06); o.lab = S.label("", null, 0.5); },
    update(S, p, t) {
      const o = S.o, T3 = S.THREE, a = p.a * DEG, Gw = p.m * g0, Gp = Gw * Math.sin(a), N = Gw * Math.cos(a), drive = p.Fp - Gp;
      let fr, acc, moving; if (Math.abs(drive) <= p.ms * N) { fr = -drive; acc = 0; moving = false; } else { fr = -Math.sign(drive) * p.mk * N; acc = (drive + fr) / p.m; moving = true; }
      const Lr = 9;
      S.keyed("ramp", p.a, (g) => { const sh = new T3.Shape(); sh.moveTo(0, 0); sh.lineTo(Lr * Math.cos(a), 0); sh.lineTo(Lr * Math.cos(a), Lr * Math.sin(a)); sh.lineTo(0, 0);
        const m = S.mesh(new T3.ExtrudeGeometry(sh, { depth: 2.4, bevelEnabled: false }), "#8a6a55", g); m.position.set(-Lr * Math.cos(a) / 2, 0, -1.2); });
      let sp = 0.45 + (moving ? 0.5 * acc * t * t / 20 : 0); sp = Math.max(0.08, Math.min(0.92, sp));
      const x = -Lr * Math.cos(a) / 2 + Lr * sp * Math.cos(a), y = Lr * sp * Math.sin(a), sz = 0.6 + p.m * 0.04;
      o.block.scale.setScalar(sz); o.block.rotation.z = a; o.block.position.set(x - Math.sin(a) * sz / 2, y + Math.cos(a) * sz / 2, 0);
      const c = [o.block.position.x, o.block.position.y, 1.3], k = 0.03;
      o.G.set(c, [c[0], c[1] - Gw * k, c[2]]); o.N.set(c, [c[0] - Math.sin(a) * N * k, c[1] + Math.cos(a) * N * k, c[2]]);
      o.f.visible = Math.abs(fr) > 0.01; o.f.set(c, [c[0] + Math.cos(a) * fr * k, c[1] + Math.sin(a) * fr * k, c[2]]);
      o.P.visible = !!p.Fp; o.P.set(c, [c[0] + Math.cos(a) * p.Fp * k, c[1] + Math.sin(a) * p.Fp * k, c[2]]);
      o.lab.set("a = " + fx(Math.abs(acc), 2) + " m/s²"); o.lab.position.set(c[0], c[1] + 2.2, 0);
    }
  });

  D3("limithiz", {
    view: { r: 8, th: 0.6, ph: 1.3, target: [0, 6.5, 0] },
    build(S) { const o = S.o, T3 = S.THREE; o.body = S.group(); const torso = S.cyl(0.25, 0.25, 1, "#3d63dd", o.body); torso.rotation.z = Math.PI / 2; const head = S.sphere(0.22, "#e8c39e", o.body); head.position.x = 0.7;
      o.chute = S.mesh(new T3.SphereGeometry(1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), new T3.MeshStandardMaterial({ color: 0xe0453a, side: T3.DoubleSide })); o.chute.castShadow = true;
      o.lines = S.line(0xdddddd, 12); o.cloud = Array.from({ length: 6 }, (_, i) => { const c = S.sphere(0.9 + (i % 3) * 0.3, new T3.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 })); c.castShadow = false; return { m: c, x: (i - 3) * 1.6, z: (i % 2 ? -4 : -5.5) }; });
      o.v = S.arrow(S.cols.good, 0.07); o.D = S.arrow(S.cols.warn, 0.07); o.lab = S.label("", null, 0.5); S.hideFloor(); },
    update(S, p, t) {
      const o = S.o, k = 0.5 * 1.2 * p.A, vt = Math.sqrt(p.m * g0 / k), Tm = p.air ? Math.max(4, Math.min(60, 3 * vt / g0)) : 10, tt = Math.min(t * Tm / 6, Tm), v = p.air ? vt * Math.tanh(g0 * tt / vt) : g0 * tt;
      const big = p.A > 5; o.chute.visible = o.lines.visible = big; o.chute.scale.set(Math.sqrt(p.A) * 0.5, 0.8, Math.sqrt(p.A) * 0.5); o.chute.position.set(0, 8, 0);
      o.body.position.set(0, 6, 0); o.body.rotation.z = big ? Math.PI / 2 : 0;
      if (big) o.lines.setPoints([[0, 6.4, 0], [Math.sqrt(p.A) * 0.5, 8, 0], [0, 6.4, 0], [-Math.sqrt(p.A) * 0.5, 8, 0], [0, 6.4, 0], [0, 8, Math.sqrt(p.A) * 0.5], [0, 6.4, 0], [0, 8, -Math.sqrt(p.A) * 0.5]]);
      // bulutlar yukarı akar → düşme hissi
      o.cloud.forEach((c, i) => { const y = 1 + (((i * 2.7 + tt * v * 0.15) % 12) + 12) % 12; c.m.position.set(c.x, y, c.z); });
      o.v.set([1.6, 6, 0], [1.6, 6 - Math.min(5, v * 0.08), 0]); o.D.visible = !!p.air; o.D.set([-1.6, 6, 0], [-1.6, 6 + Math.min(5, k * v * v / (p.m * g0) * 2.5), 0]);
      o.lab.set(fx(v * 3.6, 0) + " km/h"); o.lab.position.set(0, 4.4, 0);
    }
  });

  D3("cembersel", {
    view: { r: 18, th: 0.4, ph: 0.85, target: [0, 0, 0] },
    build(S) { const o = S.o; o.car = car(S, S.cols.accent); o.v = S.arrow(S.cols.good, 0.08); o.a = S.arrow(S.cols.warn, 0.08); o.c = S.cyl(0.15, 0.15, 0.3, "#888"); o.lab = S.label("", null, 0.55); },
    update(S, p, t) {
      const o = S.o, R = 1.2 + p.r * 0.75, w = p.v / p.r, th = w * t, safe = p.v <= Math.sqrt(p.mu * g0 * p.r);
      S.keyed("track", p.r, (g) => { const tr = S.mesh(new S.THREE.RingGeometry(R - 0.9, R + 0.9, 64), new S.THREE.MeshStandardMaterial({ color: 0x3a3d44, side: S.THREE.DoubleSide }), g); tr.rotation.x = -Math.PI / 2; tr.position.y = 0.01; });
      const x = R * Math.cos(th), z = -R * Math.sin(th);
      o.car.position.set(x, 0, z); o.car.rotation.y = th + Math.PI / 2 * 0 + Math.PI / 2;
      o.car.children[0].material.color.set(safe ? S.cols.accent : S.cols.bad);
      const vs = 0.5 + p.v * 0.18, as = Math.min(R * 0.9, 0.5 + (p.v * p.v / p.r) * 0.12);
      o.v.set([x, 1.6, z], [x - Math.sin(th) * vs, 1.6, z - Math.cos(th) * vs]); o.a.set([x, 1.3, z], [x - Math.cos(th) * as, 1.3, z + Math.sin(th) * as]);
      o.lab.set("F = " + fx(p.m * p.v * p.v / p.r) + " N" + (safe ? "" : " · " + App.labs.util.T("savrulur!", "skids!"))); o.lab.position.set(0, 2.6, 0);
    }
  });

  D3("carpisma", {
    view: { r: 14, th: 0.3, ph: 1.15, target: [0, 1, 0] },
    build(S) { const o = S.o; o.track = S.box(18, 0.2, 1.6, "#555"); o.track.position.y = 0.1; o.c1 = S.box(1, 0.8, 1.2, S.cols.accent); o.c2 = S.box(1, 0.8, 1.2, S.cols.warn); o.l1 = S.label("", null, 0.45); o.l2 = S.label("", null, 0.45); },
    update(S, p, t) {
      const o = S.o, P = p.m1 * p.u1 + p.m2 * p.u2; let v1, v2;
      if (p.type === "esnek") { v1 = ((p.m1 - p.m2) * p.u1 + 2 * p.m2 * p.u2) / (p.m1 + p.m2); v2 = ((p.m2 - p.m1) * p.u2 + 2 * p.m1 * p.u1) / (p.m1 + p.m2); } else { v1 = v2 = P / (p.m1 + p.m2); }
      const gap = 6, rel = p.u1 - p.u2, tc = rel > 0 ? gap / rel : Infinity, Tm = isFinite(tc) ? tc + 3 : 4, tt = Math.min(t, Tm);
      const pos = (s) => (s < tc ? [-gap / 2 + p.u1 * s, gap / 2 + p.u2 * s] : [-gap / 2 + p.u1 * tc + v1 * (s - tc), gap / 2 + p.u2 * tc + v2 * (s - tc)]);
      const [x1, x2] = pos(tt), w1 = 0.5 + p.m1 * 0.18, w2 = 0.5 + p.m2 * 0.18, k = 0.6;
      o.c1.scale.set(w1, 1, 1); o.c1.position.set(Math.max(-8.5, x1 * k - w1 / 2), 0.6, 0); o.c2.scale.set(w2, 1, 1); o.c2.position.set(Math.min(8.5, x2 * k + w2 / 2), 0.6, 0);
      const cv1 = tt < tc ? p.u1 : v1, cv2 = tt < tc ? p.u2 : v2;
      o.l1.set(fx(cv1) + " m/s"); o.l1.position.set(o.c1.position.x, 1.6, 0); o.l2.set(fx(cv2) + " m/s"); o.l2.position.set(o.c2.position.x, 1.6, 0);
    }
  });

  D3("elektrikalan", {
    view: { r: 12, th: 0.6, ph: 1.0, target: [0, 2.5, 0] },
    build(S) { const o = S.o; o.q1 = S.sphere(0.4, S.cols.bad, null, 32); o.q2 = S.sphere(0.4, S.cols.accent, null, 32); o.l1 = S.label("+", "#fff", 0.6); o.l2 = S.label("−", "#fff", 0.6); o.f1 = S.arrow(S.cols.warn, 0.06); o.f2 = S.arrow(S.cols.warn, 0.06); },
    update(S, p) {
      const o = S.o, d = p.d * 8, y = 2.5, A = [-d / 2, y, 0], B = [d / 2, y, 0], Q = [[A, p.q1], [B, p.q2]];
      o.q1.position.set(...A); o.q2.position.set(...B); o.q1.material.color.set(p.q1 > 0 ? S.cols.bad : p.q1 < 0 ? S.cols.accent : "#888"); o.q2.material.color.set(p.q2 > 0 ? S.cols.bad : p.q2 < 0 ? S.cols.accent : "#888");
      o.l1.set(p.q1 > 0 ? "+" : p.q1 < 0 ? "−" : "0"); o.l1.position.set(A[0], y + 0.8, 0); o.l2.set(p.q2 > 0 ? "+" : p.q2 < 0 ? "−" : "0"); o.l2.position.set(B[0], y + 0.8, 0);
      S.keyed("field", [p.q1, p.q2, p.d].join(), (g) => {
        const E = (x, yy, z) => { let ex = 0, ey = 0, ez = 0; Q.forEach(([c, q]) => { const dx = x - c[0], dy = yy - c[1], dz = z - c[2], r2 = dx * dx + dy * dy + dz * dz + 0.02, r = Math.sqrt(r2); ex += q * dx / (r2 * r); ey += q * dy / (r2 * r); ez += q * dz / (r2 * r); }); return [ex, ey, ez]; };
        Q.forEach(([c, q]) => { if (!q) return; const n = Math.abs(q) * 3 + 2;
          for (let i = 0; i < n; i++) for (let j = 0; j < 3; j++) {
            const th = (2 * Math.PI * i) / n, ph = (j + 0.5) * Math.PI / 3, dir = q > 0 ? 1 : -1;
            let x = c[0] + 0.45 * Math.sin(ph) * Math.cos(th), yy = c[1] + 0.45 * Math.cos(ph), z = c[2] + 0.45 * Math.sin(ph) * Math.sin(th); const P = [[x, yy, z]];
            for (let s = 0; s < 160; s++) { const [ex, ey, ez] = E(x, yy, z), m = Math.hypot(ex, ey, ez); if (!m) break; x += dir * 0.08 * ex / m; yy += dir * 0.08 * ey / m; z += dir * 0.08 * ez / m; P.push([x, yy, z]); if (Math.hypot(x, yy - y, z) > 7 || yy < 0.05) break; if (Q.some(([cc, qq]) => qq && cc !== c && Math.hypot(x - cc[0], yy - cc[1], z - cc[2]) < 0.4)) break; }
            S.line(q > 0 ? 0xff9a8a : 0x8ab0ff, 200, g, { opacity: 0.75 }).setPoints(P);
          } });
      });
      const att = p.q1 * p.q2 < 0, fl = 0.4 + Math.min(1.6, Math.abs(p.q1 * p.q2) / (p.d * p.d) * 0.02);
      o.f1.visible = o.f2.visible = !!(p.q1 && p.q2); const sgn = att ? 1 : -1; o.f1.set([A[0], y - 0.8, 0], [A[0] + sgn * fl, y - 0.8, 0]); o.f2.set([B[0], y - 0.8, 0], [B[0] - sgn * fl, y - 0.8, 0]);
    }
  });

  D3("induksiyon", {
    view: { r: 11, th: 0.5, ph: 1.1, target: [0, 1.8, 0] },
    build(S) { const o = S.o; o.coil = S.group(); o.mag = S.group(); const n = S.box(1.4, 0.5, 0.5, S.cols.bad, o.mag); n.position.x = -0.7; const sq = S.box(1.4, 0.5, 0.5, S.cols.accent, o.mag); sq.position.x = 0.7;
      o.ln = S.label("N", "#fff", 0.4); o.ls = S.label("S", "#fff", 0.4); o.gal = S.cyl(0.9, 0.9, 0.2, "#eee"); o.gal.rotation.x = Math.PI / 2; o.gal.position.set(4, 2, -1.5); o.needle = S.box(0.05, 0.8, 0.05, "#e0453a"); o.wire = S.line(0xc97a42, 6); o.lab = S.label("", null, 0.45); },
    update(S, p, t) {
      const o = S.o, per = 4 / p.v, ph = (t % per) / per, x = Math.sin(ph * 2 * Math.PI) * 1.4, vx = Math.cos(ph * 2 * Math.PI) * 1.4 * 2 * Math.PI / per;
      const flux = p.B * 0.01 * Math.exp(-(x * x) / 0.25), emf = -p.N * (-2 * x / 0.25) * flux * vx;
      S.keyed("coil", p.N, (g) => { const turns = Math.min(18, Math.round(p.N / 11)), P = []; for (let i = 0; i <= turns * 40; i++) { const u = i / 40, a = u * 2 * Math.PI; P.push([-1.2 + (2.4 * u) / turns, 1.8 + 0.75 * Math.sin(a), 0.75 * Math.cos(a)]); } S.tube(P, 0.04, "#c97a42", g); });
      o.mag.position.set(x * 2.6, 1.8, 0); o.ln.position.set(x * 2.6 - 0.7, 2.3, 0); o.ls.position.set(x * 2.6 + 0.7, 2.3, 0);
      const ang = Math.max(-1.2, Math.min(1.2, emf * 0.4)); o.needle.rotation.z = -ang; o.needle.position.set(4 + Math.sin(ang) * 0.35, 2 + Math.cos(ang) * 0.35, -1.38);
      o.wire.setPoints([[-1.2, 1.05, 0], [-1.2, 0.3, 0], [4, 0.3, -1.5], [4, 1.1, -1.5]]);
      o.lab.set("ε = " + fx(emf, 2) + " V"); o.lab.position.set(4, 3.3, -1.5);
    }
  });

  D3("ayna", {
    view: { r: 15, th: 0.35, ph: 1.2, target: [-1.5, 1.8, 0] },
    build(S) { const o = S.o; o.bench = S.box(14, 0.15, 0.6, "#555"); o.bench.position.set(-3, 0.6, 0); o.obj = S.arrow(S.cols.good, 0.07); o.img = S.arrow(S.cols.bad, 0.07); o.r1 = S.line(S.cols.warn, 6); o.r2 = S.line(S.cols.violet, 6); o.F = S.sphere(0.08, "#fff"); },
    update(S, p) {
      const o = S.o, T3 = S.THREE, f = p.f || 1, k = 0.16, X = (x) => x * k, Y = (y) => 2 + y * k;
      S.keyed("mirror", f > 0 ? 1 : -1, (g) => { const R = 1.8, geo = new T3.SphereGeometry(4, 32, 16, 0, Math.PI * 2, 0, Math.asin(R / 4)); const m = S.mesh(geo, new T3.MeshStandardMaterial({ color: 0xcfe2f5, metalness: 0.35, roughness: 0.15, side: T3.DoubleSide }), g);
        m.rotation.z = f > 0 ? -Math.PI / 2 : Math.PI / 2; m.position.set(f > 0 ? -4 : 4, 2, 0); });
      o.F.position.set(X(-f), 2, 0);
      o.obj.set([X(-p.d), 2, 0], [X(-p.d), Y(p.h), 0]);
      const di = Math.abs(p.d - f) < 1e-9 ? Infinity : (f * p.d) / (p.d - f), m = -di / p.d, sl = p.h / f;
      o.r1.setPoints([[X(-p.d), Y(p.h), 0], [0, Y(p.h), 0], [X(-50), Y(p.h + sl * -50), 0]]); o.r2.setPoints([[X(-p.d), Y(p.h), 0], [0, 2, 0], [X(-50), Y(-p.h * 50 / p.d), 0]]);
      o.img.visible = isFinite(di); if (isFinite(di)) o.img.set([X(-di), 2, 0], [X(-di), Y(m * p.h), 0]);
    }
  });

  D3("doppler", {
    view: { r: 18, th: 0.2, ph: 0.6, target: [0, 0, 0] },
    build(S) { const o = S.o, T3 = S.THREE; o.src = S.sphere(0.35, S.cols.warn); o.rings = Array.from({ length: 22 }, () => { const m = new T3.Mesh(new T3.TorusGeometry(1, 0.03, 6, 64), new T3.MeshBasicMaterial({ color: 0x5b8cff, transparent: true })); m.rotation.x = Math.PI / 2; S.root.add(m); return m; });
      o.o1 = S.cyl(0.25, 0.25, 1.4, S.cols.good); o.o1.position.set(8, 0.7, 0); o.o2 = S.cyl(0.25, 0.25, 1.4, S.cols.bad); o.o2.position.set(-8, 0.7, 0); o.l1 = S.label("", S.cols.good, 0.5); o.l2 = S.label("", S.cols.bad, 0.5); },
    update(S, p, t) {
      const o = S.o, vs = 340, sc = 0.012, Tw = 0.25, span = 14, per = p.v < 1 ? 1e9 : (span / sc) / p.v, tt = t % per, x0 = p.v < 1 ? 0 : -span / 2 / sc, xs = x0 + p.v * tt;
      o.src.position.set(xs * sc, 0.5, 0);
      o.rings.forEach((r, k) => { const te = tt - k * Tw; if (te < 0) { r.visible = false; return; } r.visible = true; const rad = vs * (tt - te) * sc; r.scale.set(rad, rad, 1); r.position.set((x0 + p.v * te) * sc, 0.1, 0); r.material.opacity = Math.max(0.05, 1 - k / 22); });
      const fa = p.v < vs ? p.f * vs / (vs - p.v) : Infinity, fb = p.f * vs / (vs + p.v);
      o.l1.set(isFinite(fa) ? fx(fa, 0) + " Hz" : App.labs.util.T("şok dalgası", "shock")); o.l1.position.set(8, 2, 0); o.l2.set(fx(fb, 0) + " Hz"); o.l2.position.set(-8, 2, 0);
    }
  });

  const wl = (nm) => { let r = 0, g = 0, b = 0; if (nm < 380) return "#b48cff"; if (nm < 440) { r = (440 - nm) / 60; b = 1; } else if (nm < 490) { g = (nm - 440) / 50; b = 1; } else if (nm < 510) { g = 1; b = (510 - nm) / 20; } else if (nm < 580) { r = (nm - 510) / 70; g = 1; } else if (nm < 645) { r = 1; g = (645 - nm) / 65; } else if (nm <= 780) r = 1; else return "#7a2a2a"; return "rgb(" + Math.round(r * 255) + "," + Math.round(g * 255) + "," + Math.round(b * 255) + ")"; };
  D3("fotoelektrik", {
    view: { r: 11, th: 0.7, ph: 1.15, target: [0, 1.8, 0] },
    build(S) { const o = S.o, T3 = S.THREE; o.tube = S.mesh(new T3.CylinderGeometry(1.6, 1.6, 7, 40, 1, true), S.glass()); o.tube.rotation.z = Math.PI / 2; o.tube.position.y = 1.8; o.tube.castShadow = false;
      o.cath = S.box(0.2, 2, 2, "#b9c0c9"); o.cath.position.set(-2.8, 1.8, 0); o.cath.material.metalness = 0.8; o.anode = S.box(0.1, 2, 2, "#666"); o.anode.position.set(2.8, 1.8, 0);
      o.beam = S.mesh(new T3.CylinderGeometry(0.4, 0.9, 5, 24, 1, true), new T3.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, side: T3.DoubleSide, depthWrite: false })); o.beam.position.set(-1.4, 4.2, 0); o.beam.rotation.z = -0.6;
      o.e = Array.from({ length: 40 }, () => ({ m: S.sphere(0.06, S.cols.accent, null, 8), x: 0, y: 0, z: 0, v: 0, on: false })); o.lab = S.label("", null, 0.45); },
    update(S, p) {
      const o = S.o, E = 1240 / p.l, K = E - p.W0, emit = K > 0 && p.I > 0;
      o.beam.material.color.set(wl(p.l)); o.beam.material.opacity = 0.05 + 0.4 * p.I / 100;
      o.e.forEach((q) => { if (!q.on && emit && Math.random() < p.I / 1200) { q.on = true; q.x = -2.65; q.y = 1.8 + (Math.random() - 0.5) * 1.6; q.z = (Math.random() - 0.5) * 1.6; q.v = Math.sqrt(K) * 0.08 * (0.4 + Math.random() * 0.6); }
        if (q.on) { q.x += q.v; if (q.x > 2.7) q.on = false; } q.m.visible = q.on; q.m.position.set(q.x, q.y, q.z); });
      o.lab.set(emit ? "Kₘₐₓ = " + fx(K, 2) + " eV" : App.labs.util.T("elektron çıkmaz", "no emission")); o.lab.position.set(0, 4, 0);
    }
  });

  D3("bohr", {
    view: { r: 13, th: 0.4, ph: 1.0, target: [0, 3, 0] },
    build(S) { const o = S.o, T3 = S.THREE; o.nuc = S.sphere(0.35, S.cols.bad); o.nuc.position.y = 3;
      o.orb = [1, 2, 3, 4, 5, 6].map((n) => { const r = 0.25 * n * n * 0.45 + 0.6, m = new T3.Mesh(new T3.TorusGeometry(r, 0.015, 6, 96), new T3.MeshBasicMaterial({ color: 0x888888, transparent: true, opacity: 0.6 })); m.rotation.x = Math.PI / 2; m.position.y = 3; S.root.add(m); return { m, r }; });
      o.el = S.sphere(0.14, S.cols.accent); o.ph = S.line(0xffffff, 120); o.lab = S.label("", null, 0.5); S.hideFloor(); },
    update(S, p, t) {
      const o = S.o, ni = Math.max(p.ni, p.nf + 1), nf = Math.min(p.nf, ni - 1), dE = -13.6 / (ni * ni) + 13.6 / (nf * nf), lam = 1240 / dE, cyc = (t % 2.4) / 2.4;
      o.orb.forEach((q, i) => { q.m.material.color.set(i + 1 === ni || i + 1 === nf ? 0xffffff : 0x666666); });
      const rI = o.orb[ni - 1].r, rF = o.orb[nf - 1].r, r = cyc < 0.4 ? rI : cyc < 0.55 ? rI + (rF - rI) * ((cyc - 0.4) / 0.15) : rF, a = t * 2;
      o.el.position.set(r * Math.cos(a), 3, r * Math.sin(a));
      o.ph.visible = cyc > 0.55; if (o.ph.visible) { const k = (cyc - 0.55) / 0.45, P = []; for (let i = 0; i <= 100; i++) { const u = i / 100, d = rF + u * 6 * k; P.push([d * Math.cos(a), 3 + Math.sin(u * 40) * 0.15, d * Math.sin(a)]); } o.ph.setPoints(P); o.ph.material.color.set(wl(lam)); }
      o.lab.set(ni + " → " + nf + " · " + fx(lam, 0) + " nm"); o.lab.position.set(0, 7.2, 0);
    }
  });

  /* ======================= 12. sınıf ======================= */

  D3("yuvarlanma", {
    view: { r: 14, th: 0.75, ph: 1.15, target: [0, 1.8, 0] },
    build(S) { const o = S.o, T3 = S.THREE; o.box = S.box(0.5, 0.5, 0.5, "#888");
      o.sph = S.sphere(0.3, S.cols.good); o.cyl = S.cyl(0.3, 0.3, 0.5, S.cols.warn); o.cyl.rotation.x = Math.PI / 2; o.ring = S.mesh(new T3.TorusGeometry(0.27, 0.06, 12, 32), S.cols.bad); o.lab = S.label("", null, 0.45); },
    update(S, p, t) {
      const o = S.o, T3 = S.THREE, a = p.a * DEG, Lr = 9, Ls = 5;
      S.keyed("ramp", p.a, (g) => { const sh = new T3.Shape(); sh.moveTo(0, 0); sh.lineTo(Lr * Math.cos(a), 0); sh.lineTo(0, Lr * Math.sin(a)); sh.lineTo(0, 0); const m = S.mesh(new T3.ExtrudeGeometry(sh, { depth: 4, bevelEnabled: false }), "#8a6a55", g); m.position.set(-Lr * Math.cos(a) / 2, 0, -2); });
      const items = [[o.box, 0, 0.25, -1.5], [o.sph, 0.4, 0.3, -0.5], [o.cyl, 0.5, 0.3, 0.5], [o.ring, 1, 0.33, 1.5]];
      let first = null;
      items.forEach(([m, k, r, z]) => { const acc = g0 * Math.sin(a) / (1 + k), s = Math.min(Ls, 0.5 * acc * t * t), u = s / Ls * 0.92, x = -Lr * Math.cos(a) / 2 + u * Lr * Math.cos(a), y = Lr * Math.sin(a) * (1 - u);
        m.position.set(x + Math.sin(a) * r, y + Math.cos(a) * r, z); if (k) m.rotation.z = -s / r; else m.rotation.z = -a;
        if (s >= Ls && !first) first = m; });
      o.lab.set(first ? App.labs.util.T("önde: ", "leader: ") + (first === o.box ? App.labs.util.T("kutu", "box") : first === o.sph ? App.labs.util.T("küre", "sphere") : first === o.cyl ? App.labs.util.T("silindir", "cylinder") : App.labs.util.T("halka", "ring")) : ""); o.lab.position.set(0, 5, 0);
    }
  });

  D3("kepler", {
    view: { r: 16, th: 0.3, ph: 0.75, target: [0, 0, 0] },
    build(S) { const o = S.o, T3 = S.THREE; o.sun = S.mesh(new T3.SphereGeometry(0.7, 32, 24), new T3.MeshStandardMaterial({ color: 0xffc94a, emissive: 0xffa500, emissiveIntensity: 1.2 })); o.sun.castShadow = false;
      o.light = new T3.PointLight(0xfff2cc, 1.5, 60); S.root.add(o.light); o.planet = S.sphere(0.3, S.cols.accent); o.orbit = S.line(0x888888, 200); o.radius = S.line(0xffffff, 2); o.sweep = S.group(); S.hideFloor();
      for (let i = 0; i < 300; i++) { const st = S.sphere(0.03, "#ffffff", null, 4); const a = Math.random() * 7, b = Math.random() * 3 - 1.5; st.position.set(40 * Math.cos(a), 20 * b, 40 * Math.sin(a)); } },
    update(S, p, t, s) {
      const o = S.o, T3 = S.THREE, e = p.e, A = 6, B = A * Math.sqrt(1 - e * e), M = s.M || 0;
      let E = M; for (let i = 0; i < 8; i++) E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
      const pos = (EE) => [A * Math.cos(EE) - A * e, 0, -B * Math.sin(EE)];
      o.orbit.setPoints(Array.from({ length: 161 }, (_, i) => pos((i / 160) * 2 * Math.PI)));
      o.sun.position.set(0, 0, 0); o.light.position.set(0, 0, 0);
      const q = pos(E); o.planet.position.set(...q); o.radius.setPoints([[0, 0, 0], q]);
      S.keyed("sweep", e, (g) => { [[0, 0x5b8cff], [Math.PI, 0xb388ff]].forEach(([M0, col]) => { const span = 2 * Math.PI / 14, pts = [new T3.Vector3(0, 0, 0)]; for (let k = 0; k <= 20; k++) { const MM = M0 - span / 2 + span * k / 20; let EE = MM; for (let i = 0; i < 8; i++) EE = EE - (EE - e * Math.sin(EE) - MM) / (1 - e * Math.cos(EE)); pts.push(new T3.Vector3(...pos(EE))); }
        const geo = new T3.BufferGeometry(), arr = []; for (let k = 1; k < pts.length - 1; k++) arr.push(0, 0, 0, pts[k].x, 0, pts[k].z, pts[k + 1].x, 0, pts[k + 1].z); geo.setAttribute("position", new T3.Float32BufferAttribute(arr, 3));
        const m = new T3.Mesh(geo, new T3.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.3, side: T3.DoubleSide, depthWrite: false })); g.add(m); }); });
    }
  });

  D3("radyoaktif", {
    view: { r: 14, th: 0.6, ph: 1.0, target: [0, 2.5, 0] },
    build(S) { const o = S.o; o.key = null; o.lab = S.label("", null, 0.55); },
    update(S, p, t, s) {
      const o = S.o, T3 = S.THREE, n = p.n, side = Math.ceil(Math.cbrt(n));
      S.keyed("nuc", n, (g) => { o.inst = new T3.InstancedMesh(new T3.SphereGeometry(0.16, 10, 8), new T3.MeshStandardMaterial({ color: 0xffffff }), n); o.inst.castShadow = true; g.add(o.inst);
        const m = new T3.Matrix4(); for (let i = 0; i < n; i++) { const x = i % side, y = Math.floor(i / side) % side, z = Math.floor(i / (side * side)); m.setPosition((x - side / 2) * 0.45, 0.4 + y * 0.45, (z - side / 2) * 0.45); o.inst.setMatrixAt(i, m); } });
      const live = new T3.Color(S.cols.accent), dead = new T3.Color(S.cols.light ? 0xb0b6c0 : 0x3a3d44);
      (s.alive || []).forEach((a, i) => { if (i < n) o.inst.setColorAt(i, a ? live : dead); }); if (o.inst.instanceColor) o.inst.instanceColor.needsUpdate = true;
      const N = s.alive ? s.alive.reduce((x, y) => x + y, 0) : n; o.lab.set(N + " / " + n); o.lab.position.set(0, 0.4 + side * 0.45 + 0.6, 0);
    }
  });

  D3("gorelilik", {
    view: { r: 14, th: 0.5, ph: 1.15, target: [0, 2.5, 0] },
    build(S) { const o = S.o, T3 = S.THREE; S.hideFloor(); o.ship = S.group(); const body = S.cyl(0.5, 0.5, 4, "#c9d2e0", o.ship); body.rotation.z = Math.PI / 2; const nose = S.mesh(new T3.ConeGeometry(0.5, 1.2, 24), "#e0453a", o.ship); nose.rotation.z = -Math.PI / 2; nose.position.x = 2.6;
      o.flame = S.mesh(new T3.ConeGeometry(0.4, 1.4, 16), new T3.MeshBasicMaterial({ color: 0xffa040, transparent: true, opacity: 0.8 }), o.ship); o.flame.rotation.z = Math.PI / 2; o.flame.position.x = -2.7;
      const clock = (x, nm) => { const g = S.group(); const face = S.cyl(0.9, 0.9, 0.1, "#ffffff", g); face.rotation.x = Math.PI / 2; const hand = S.box(0.06, 0.8, 0.06, "#222", g); hand.position.z = 0.08; g.position.set(x, 5, 0); g.hand = hand; const l = S.label(nm, null, 0.45); l.position.set(x, 3.7, 0); return g; };
      o.c1 = clock(-2.5, App.labs.util.T("Dünya", "Earth")); o.c2 = clock(2.5, App.labs.util.T("Gemi", "Ship"));
      o.stars = Array.from({ length: 140 }, () => { const s2 = S.sphere(0.04, "#ffffff", null, 4); s2.position.set(Math.random() * 40 - 20, Math.random() * 10 - 2, -6 - Math.random() * 10); return s2; }); },
    update(S, p, t) {
      const o = S.o, gm = 1 / Math.sqrt(1 - p.b * p.b);
      o.ship.scale.set(1 / gm, 1, 1); o.ship.position.set(0, 1.5, 0); o.flame.scale.set(1, 0.6 + p.b, 1);
      o.stars.forEach((s2) => { s2.position.x -= p.b * 0.3; if (s2.position.x < -20) s2.position.x += 40; s2.scale.set(1 + p.b * 6, 1, 1); });
      const ang = (x) => -(x * 2 * Math.PI) / 4; const setH = (c, tt) => { c.hand.rotation.z = ang(tt); c.hand.position.set(Math.sin(-ang(tt)) * 0.4, Math.cos(ang(tt)) * 0.4, 0.08); };
      setH(o.c1, t); setH(o.c2, t / gm);
    }
  });
})();
