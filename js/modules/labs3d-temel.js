/* =========================================================
   labs3d-temel.js — ilk dokuz deneyin 3B sahneleri
   (atış, ivmeli hareket, sarkaç, yay, dalga, girişim, mercek,
    fonksiyon grafikleri, birim çember)
   ========================================================= */
(function () {
  if (!App.lab3d) return;
  const D3 = App.lab3d.def, DEG = Math.PI / 180;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);

  /* ---------------- Eğik atış ---------------- */
  D3("atis", {
    view: { r: 16, th: 0.35, ph: 1.2, target: [0, 3, 0] },
    build(S) {
      const o = S.o;
      o.tower = S.box(1, 1, 1, "#7d8590"); o.ball = S.sphere(0.42, S.cols.accent);
      o.pred = S.line(0x9aa3ad, 160, null, { dashed: true }); o.trail = S.line(S.cols.accent, 160);
      o.vx = S.arrow(S.cols.good, 0.06); o.vy = S.arrow(S.cols.warn, 0.06); o.v = S.arrow(S.cols.text, 0.05);
      o.flag = S.cyl(0.05, 0.05, 1.6, "#ddd"); o.cloth = S.box(0.6, 0.4, 0.02, S.cols.bad);
      o.ring = S.mesh(new S.THREE.TorusGeometry(0.7, 0.06, 8, 40), S.cols.bad); o.ring.rotation.x = Math.PI / 2;
      o.lab = S.label("", null, 0.55);
    },
    update(S, p, t) {
      const o = S.o, vx = p.v * Math.cos(p.a * DEG), vy0 = p.v * Math.sin(p.a * DEG);
      const tf = (vy0 + Math.sqrt(vy0 * vy0 + 2 * p.g * p.h)) / p.g, R = vx * tf, hmax = p.h + (vy0 > 0 ? (vy0 * vy0) / (2 * p.g) : 0);
      const k = 13 / Math.max(R, hmax * 1.3, 8), X = (x) => -6.5 + x * k, Y = (y) => y * k;
      const pos = (tt) => [X(vx * tt), Y(p.h + vy0 * tt - 0.5 * p.g * tt * tt), 0];
      o.tower.scale.set(0.9, Math.max(0.01, Y(p.h)), 0.9); o.tower.position.set(X(0) - 0.45, Y(p.h) / 2, 0); o.tower.visible = p.h > 0;
      o.pred.setPoints(Array.from({ length: 121 }, (_, i) => pos((tf * i) / 120)));
      const tt = Math.min(t * Math.max(1, tf / 4), tf);
      o.trail.setPoints(Array.from({ length: 81 }, (_, i) => pos((tt * i) / 80)));
      const q = pos(tt), vy = vy0 - p.g * tt, ka = 2.2 / Math.max(6, p.v);
      o.ball.position.set(q[0], q[1] + 0.42, q[2]);
      const b = [q[0], q[1] + 0.42, 0];
      o.vx.set(b, [b[0] + vx * ka, b[1], 0]); o.vy.set(b, [b[0], b[1] + vy * ka, 0]); o.v.set(b, [b[0] + vx * ka, b[1] + vy * ka, 0]);
      o.ring.position.set(X(R), 0.02, 0); o.flag.position.set(X(R) + 0.9, 0.8, 0); o.cloth.position.set(X(R) + 1.2, 1.4, 0);
      o.lab.set("R = " + R.toFixed(1).replace(".", ",") + " m"); o.lab.position.set(X(R), 2.1, 0);
    }
  });

  /* ---------------- İvmeli hareket ---------------- */
  D3("ivmeli", {
    view: { r: 16, th: 0.5, ph: 1.12, target: [0, 0.8, 0] },
    build(S) {
      const o = S.o;
      o.road = S.box(18, 0.05, 2.4, "#3a3d44"); o.road.position.y = 0.02;
      for (let i = -8; i <= 8; i += 2) { const m = S.box(1, 0.06, 0.12, "#e8e8e8"); m.position.set(i, 0.03, 0); }
      o.car = S.group(); const body = S.box(1.8, 0.5, 1, S.cols.accent, o.car); body.position.y = 0.55; const cab = S.box(0.9, 0.4, 0.9, "#cfd8ff", o.car); cab.position.set(-0.1, 1, 0);
      o.wh = [[-0.6, 0.5], [0.6, 0.5], [-0.6, -0.5], [0.6, -0.5]].map(([x, z]) => { const w = S.cyl(0.28, 0.28, 0.18, "#222", o.car); w.rotation.x = Math.PI / 2; w.position.set(x, 0.28, z); return w; });
      o.v = S.arrow(S.cols.good, 0.07); o.a = S.arrow(S.cols.warn, 0.07);
      o.zero = S.box(0.08, 0.1, 2.6, S.cols.bad); o.lab = S.label("", null, 0.5);
    },
    update(S, p, t) {
      const o = S.o, Tm = 8, tt = Math.min(t, Tm), x = (s) => p.v * s + 0.5 * p.a * s * s, v = (s) => p.v + p.a * s;
      let lo = 0, hi = 0; for (let i = 0; i <= 80; i++) { const xx = x((Tm * i) / 80); lo = Math.min(lo, xx); hi = Math.max(hi, xx); }
      const k = 15 / Math.max(10, hi - lo), X = (xx) => -7.5 + (xx - lo) * k;
      o.car.position.x = X(x(tt)); o.wh.forEach((w) => { w.rotation.y = -x(tt) * k / 0.28; });
      o.zero.position.set(X(0), 0.05, 0);
      const c = [o.car.position.x, 1.6, 0];
      o.v.set(c, [c[0] + Math.max(-4, Math.min(4, v(tt) * 0.25)), c[1], 0]); o.a.set([c[0], 2.1, 0], [c[0] + Math.max(-3, Math.min(3, p.a * 0.6)), 2.1, 0]);
      o.lab.set("t = " + tt.toFixed(1).replace(".", ",") + " s · v = " + v(tt).toFixed(1).replace(".", ",") + " m/s"); o.lab.position.set(c[0], 2.8, 0);
    }
  });

  /* ---------------- Sarkaç ---------------- */
  D3("sarkac", {
    view: { r: 13, th: 0.45, ph: 1.2, target: [0, 3.2, 0] },
    build(S) {
      const o = S.o;
      o.post1 = S.box(0.3, 7, 0.3, "#6b5440"); o.post1.position.set(-3, 3.5, -1);
      o.post2 = S.box(0.3, 7, 0.3, "#6b5440"); o.post2.position.set(3, 3.5, -1);
      o.bar = S.box(6.6, 0.25, 0.3, "#6b5440"); o.bar.position.set(0, 7, -1);
      o.pivot = S.sphere(0.12, "#999"); o.pivot.position.set(0, 6.85, -1);
      o.str = S.line(0xdddddd, 2); o.bob = S.sphere(0.35, S.cols.accent, null, 32); o.bob.material.metalness = 0.6; o.bob.material.roughness = 0.25;
      o.arc = S.line(0x888888, 80, null, { dashed: true });
      o.shadow = S.mesh(new S.THREE.CircleGeometry(0.4, 24), new S.THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.25 })); o.shadow.rotation.x = -Math.PI / 2;
    },
    update(S, p, t, s) {
      const o = S.o, L = 2 * p.L, P0 = [0, 6.85, -1], th = s.th != null ? s.th : p.a * DEG;
      const b = [P0[0] + Math.sin(th) * L, P0[1] - Math.cos(th) * L, P0[2]];
      o.str.setPoints([P0, b]); o.bob.position.set(...b); o.shadow.position.set(b[0], 0.01, b[2]);
      const A = p.a * DEG; o.arc.setPoints(Array.from({ length: 41 }, (_, i) => { const a = -A + (2 * A * i) / 40; return [P0[0] + Math.sin(a) * L, P0[1] - Math.cos(a) * L, P0[2]]; }));
    }
  });

  /* ---------------- Yay–kütle ---------------- */
  D3("yay", {
    view: { r: 11, th: 0.35, ph: 1.15, target: [0, 1, 0] },
    build(S) {
      const o = S.o;
      o.table = S.box(10, 0.3, 2.2, "#6b5440"); o.table.position.y = 0.15;
      o.wall = S.box(0.4, 2.2, 2.2, "#888"); o.wall.position.set(-4.8, 1.4, 0);
      o.spring = S.line(0xcfcfcf, 400); o.mass = S.box(1, 1, 1, S.cols.accent);
      o.eq = S.box(0.03, 0.02, 2.2, S.cols.bad); o.eq.position.set(1, 0.31, 0);
      o.v = S.arrow(S.cols.good, 0.06); o.a = S.arrow(S.cols.warn, 0.06);
    },
    update(S, p, t) {
      const o = S.o, w = Math.sqrt(p.k / p.m), x = p.A * Math.cos(w * t), v = -p.A * w * Math.sin(w * t), a = -w * w * x;
      const mx = 1 + x * 10, x0 = -4.6, x1 = mx - 0.5, n = 16, R = 0.28;
      o.spring.setPoints(Array.from({ length: 321 }, (_, i) => { const u = i / 320, ang = u * n * 2 * Math.PI; return [x0 + (x1 - x0) * u, 0.8 + R * Math.sin(ang), R * Math.cos(ang)]; }));
      const sc = 0.7 + Math.cbrt(p.m) * 0.3; o.mass.scale.set(sc, sc, sc); o.mass.position.set(mx, 0.3 + sc / 2, 0);
      o.v.set([mx, 1.6 + sc / 2, 0], [mx + Math.max(-3, Math.min(3, v * 2)), 1.6 + sc / 2, 0]);
      o.a.set([mx, 2.1 + sc / 2, 0], [mx + Math.max(-3, Math.min(3, a * 0.2)), 2.1 + sc / 2, 0]);
    }
  });

  /* ---------------- Dalga (ip üzerinde) ---------------- */
  D3("dalga", {
    view: { r: 13, th: 0.55, ph: 1.15, target: [0, 2, 0] },
    build(S) {
      const o = S.o;
      o.beads = Array.from({ length: 48 }, (_, i) => S.sphere(0.11, i === 12 ? S.cols.warn : S.cols.accent, null, 12));
      o.rope = S.line(S.cols.accent, 300);
      o.hand = S.box(0.4, 0.6, 0.6, "#c99a6b"); o.wall = S.box(0.3, 4, 2, "#777"); o.wall.position.set(8.2, 2, 0);
      o.lam = S.label("λ", S.cols.good, 0.6); o.lamL = S.line(S.cols.good, 2);
    },
    update(S, p, t) {
      const o = S.o, k = (2 * Math.PI) / p.l, w = 2 * Math.PI * p.f, y = (x) => 2 + p.A * 0.9 * Math.sin(k * x - w * t), X = (x) => -8 + x * 2;
      o.rope.setPoints(Array.from({ length: 241 }, (_, i) => { const x = (8 * i) / 240; return [X(x), y(x), 0]; }));
      o.beads.forEach((b, i) => { const x = (8 * i) / 47; b.position.set(X(x), y(x), 0); });
      o.hand.position.set(X(0) - 0.25, y(0), 0);
      const crest = ((Math.PI / 2 + w * t) / k) % p.l, xs = crest + p.l * Math.ceil((1 - crest) / p.l);
      const ok = xs + p.l < 8; o.lam.visible = o.lamL.visible = ok;
      if (ok) { o.lamL.setPoints([[X(xs), 2 + p.A * 0.9 + 0.5, 0], [X(xs + p.l), 2 + p.A * 0.9 + 0.5, 0]]); o.lam.position.set(X(xs + p.l / 2), 2 + p.A * 0.9 + 0.9, 0); }
    }
  });

  /* ---------------- Girişim: dalga leğeni ---------------- */
  D3("girisim", {
    view: { r: 15, th: -0.9, ph: 0.85, target: [0, 0, 0] },
    build(S) {
      const o = S.o, THREE = S.THREE, N = S.q === "high" ? 110 : 70;
      const geo = new THREE.PlaneGeometry(14, 10, N, Math.round(N * 0.7)); geo.rotateX(-Math.PI / 2);
      o.geo = geo; o.water = S.mesh(geo, new THREE.MeshStandardMaterial({ color: 0x3d7bd8, roughness: 0.15, metalness: 0.15 })); o.water.position.y = 0.6; o.water.castShadow = false;
      o.tank = S.box(14.4, 0.6, 10.4, "#555"); o.tank.position.y = 0.3;
      o.s1 = S.sphere(0.18, "#fff"); o.s2 = S.sphere(0.18, "#fff");
    },
    update(S, p, t) {
      const o = S.o, pos = o.geo.attributes.position, k = (2 * Math.PI) / p.l, ph = t * 4, d = p.d / 2;
      const sx = -7, z1 = -d * 0.7, z2 = d * 0.7;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), z = pos.getZ(i), r1 = Math.hypot((x - sx) / 0.7, (z - z1) / 0.7), r2 = Math.hypot((x - sx) / 0.7, (z - z2) / 0.7);
        pos.setY(i, 0.22 * (Math.sin(k * r1 - ph) / Math.sqrt(r1 + 0.6) + Math.sin(k * r2 - ph) / Math.sqrt(r2 + 0.6)));
      }
      pos.needsUpdate = true; o.geo.computeVertexNormals();
      o.s1.position.set(sx, 0.85, z1); o.s2.position.set(sx, 0.85, z2);
    }
  });

  /* ---------------- Mercek: optik sıra ---------------- */
  D3("mercek", {
    view: { r: 16, th: 0.3, ph: 1.2, target: [0, 1.8, 0] },
    build(S) {
      const o = S.o, THREE = S.THREE;
      o.bench = S.box(17, 0.15, 0.6, "#555"); o.bench.position.set(0, 0.6, 0);
      o.axis = S.line(0x888888, 2, null, { dashed: true }); o.axis.setPoints([[-8.5, 2, 0], [8.5, 2, 0]]);
      o.lens = S.mesh(new THREE.SphereGeometry(1, 32, 24), S.glass(0x9fd0ff, 0.35)); o.lens.castShadow = false;
      o.obj = S.arrow(S.cols.good, 0.07); o.img = S.arrow(S.cols.bad, 0.07);
      o.r1 = S.line(S.cols.warn, 4); o.r2 = S.line(S.cols.violet, 4); o.r1v = S.line(S.cols.warn, 2, null, { dashed: true }); o.r2v = S.line(S.cols.violet, 2, null, { dashed: true });
      o.F1 = S.sphere(0.08, "#fff"); o.F2 = S.sphere(0.08, "#fff");
      o.l1 = S.label("F", null, 0.4); o.l2 = S.label("F", null, 0.4);
    },
    update(S, p) {
      const o = S.o, f = p.f || 1, k = 0.16, X = (x) => x * k, Y = (y) => 2 + y * k;
      o.lens.scale.set(f > 0 ? 0.18 : 0.1, 2.4, 2.4); o.lens.position.set(0, 2, 0);
      o.lens.material.color.set(f > 0 ? 0x9fd0ff : 0xffc49f);
      [o.F1, o.F2].forEach((F, i) => F.position.set(X((i ? 1 : -1) * Math.abs(f)), 2, 0)); o.l1.position.set(X(-Math.abs(f)), 1.6, 0); o.l2.position.set(X(Math.abs(f)), 1.6, 0);
      const ox = -p.d, oh = p.h; o.obj.set([X(ox), 2, 0], [X(ox), Y(oh), 0]);
      const di = Math.abs(p.d - f) < 1e-9 ? Infinity : (f * p.d) / (p.d - f), m = -di / p.d;
      const ext = (x1, y1, x2, y2, toX) => [toX, y1 + ((y2 - y1) / (x2 - x1)) * (toX - x1)];
      const P = (q) => [X(q[0]), Y(q[1]), 0];
      o.r1.setPoints([[ox, oh], [0, oh], ext(0, oh, f, 0, 50)].map(P)); o.r2.setPoints([[ox, oh], ext(ox, oh, 0, 0, 50)].map(P));
      o.r1v.visible = o.r2v.visible = di < 0;
      if (di < 0) { o.r1v.setPoints([[0, oh], ext(0, oh, f, 0, -50)].map(P)); o.r2v.setPoints([[0, 0], ext(ox, oh, 0, 0, -50)].map(P)); }
      o.img.visible = isFinite(di); if (isFinite(di)) { o.img.set([X(di), 2, 0], [X(di), Y(m * oh), 0]); o.img.children.forEach((c) => { c.material.transparent = di < 0; c.material.opacity = di < 0 ? 0.45 : 1; }); }
    }
  });

  /* ---------------- Fonksiyon grafikleri (3B pano) ---------------- */
  D3("fonksiyon", {
    view: { r: 21, th: 0.4, ph: 1.25, target: [0, 5.3, 0] },
    build(S) {
      const o = S.o;
      o.board = S.box(16.6, 10.6, 0.2, S.cols.light ? "#f4f6fa" : "#1d2026"); o.board.position.set(0, 5.3, -0.2);
      o.grid = S.group();
      for (let i = -8; i <= 8; i++) { const v = S.line(i === 0 ? 0x888888 : 0x555555, 2, o.grid, { opacity: i === 0 ? 1 : 0.35 }); v.setPoints([[i, 0.3, -0.05], [i, 10.3, -0.05]]); }
      for (let j = -5; j <= 5; j++) { const h = S.line(j === 0 ? 0x888888 : 0x555555, 2, o.grid, { opacity: j === 0 ? 1 : 0.35 }); h.setPoints([[-8, 5.3 + j, -0.05], [8, 5.3 + j, -0.05]]); }
      o.tan = S.line(S.cols.warn, 2); o.pt = S.sphere(0.16, S.cols.warn);
    },
    update(S, p, t, st) {
      const o = S.o, f = App.labs.funcOf(st), key = st.fam + "|" + st.base + "|" + JSON.stringify(st.q);
      S.keyed("curve", key, (g) => {
        let seg = [];
        const flush = () => { if (seg.length > 3) S.tube(seg, 0.07, S.cols.accent, g); seg = []; };
        for (let i = 0; i <= 400; i++) { const x = -8 + (16 * i) / 400, y = f(x); if (!isFinite(y) || Math.abs(y) > 5.2) { flush(); continue; } seg.push([x, 5.3 + y, 0.05]); }
        flush();
      });
      o.tan.visible = o.pt.visible = !!st.tan;
      if (st.tan) { const x0 = st.x0, y0 = f(x0), d = (f(x0 + 1e-4) - f(x0 - 1e-4)) / 2e-4; if (isFinite(y0) && isFinite(d)) { const xs = [-8, 8].map((x) => [x, 5.3 + Math.max(-5.2, Math.min(5.2, y0 + d * (x - x0))), 0.08]); o.tan.setPoints(xs); o.pt.position.set(x0, 5.3 + y0, 0.1); } }
    }
  });

  /* ---------------- Birim çember ve sinüs sarmalı ---------------- */
  D3("cember", {
    view: { r: 14, th: 0.9, ph: 1.05, target: [0, 3.5, 2.5] },
    build(S) {
      const o = S.o, R = 2.2, c = [0, 3.5, 0];
      o.c = c; o.R = R;
      o.circ = S.line(0xaaaaaa, 130); o.circ.setPoints(Array.from({ length: 121 }, (_, i) => { const a = (i / 120) * 2 * Math.PI; return [c[0] + R * Math.cos(a), c[1] + R * Math.sin(a), 0]; }));
      o.helix = S.line(S.cols.violet, 400, null, { opacity: 0.7 });
      o.helix.setPoints(Array.from({ length: 361 }, (_, i) => { const a = (i / 360) * 2 * Math.PI; return [c[0] + R * Math.cos(a), c[1] + R * Math.sin(a), a * 1.1]; }));
      o.sine = S.line(S.cols.warn, 400); o.sine.setPoints(Array.from({ length: 361 }, (_, i) => { const a = (i / 360) * 2 * Math.PI; return [c[0] - R - 0.6, c[1] + R * Math.sin(a), a * 1.1]; }));
      o.cosl = S.line(S.cols.good, 400); o.cosl.setPoints(Array.from({ length: 361 }, (_, i) => { const a = (i / 360) * 2 * Math.PI; return [c[0] + R * Math.cos(a), c[1] - R - 0.6, a * 1.1]; }));
      o.rad = S.line(0xffffff, 2); o.sinS = S.arrow(S.cols.warn, 0.05); o.cosS = S.arrow(S.cols.good, 0.05);
      o.pt = S.sphere(0.14, S.cols.accent); o.hp = S.sphere(0.12, S.cols.violet); o.sp = S.sphere(0.1, S.cols.warn); o.cp = S.sphere(0.1, S.cols.good);
    },
    update(S, p, t, s) {
      const o = S.o, c = o.c, R = o.R, ang = (s.cur != null ? s.cur : p.a) * DEG, x = c[0] + R * Math.cos(ang), y = c[1] + R * Math.sin(ang);
      o.pt.position.set(x, y, 0); o.rad.setPoints([[c[0], c[1], 0], [x, y, 0]]);
      o.cosS.set([c[0], c[1], 0.01], [x, c[1], 0.01]); o.sinS.set([x, c[1], 0.01], [x, y, 0.01]);
      o.hp.position.set(x, y, ang * 1.1); o.sp.position.set(c[0] - R - 0.6, y, ang * 1.1); o.cp.position.set(x, c[1] - R - 0.6, ang * 1.1);
    }
  });
  void T;
})();
