/* =========================================================
   labs-kimya.js — 9–12. sınıf kimya deneyleri
   ========================================================= */
(function () {
  const { T, fmt, frame, axes, plot, dot, row, label, arrow } = App.labs.util;
  const add = App.labs.add;
  const E = () => App.data.elements;
  const key = (col) => '<i class="lab-key" style="--k:' + col + '"></i>';
  const L = (o) => App.L(o);
  const sci = (x, d) => { if (!x) return "0"; const e = Math.floor(Math.log10(Math.abs(x))); if (e >= -2 && e < 4) return fmt(x, d == null ? 3 : d); return fmt(x / Math.pow(10, e), 2) + "×10" + String(e).replace("-", "⁻").replace(/\d/g, (q) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[q]); };
  const ATOM = { H: "#f2f2f2", O: "#ff5a4f", N: "#5b8cff", C: "#8c8f96", Cl: "#5fe08a", Na: "#b48cff" };
  const molecule = (ctx, x, y, atoms, r) => atoms.forEach(([el, dx, dy]) => { ctx.fillStyle = ATOM[el] || "#ccc"; ctx.beginPath(); ctx.arc(x + dx * r, y + dy * r, r, 0, 7); ctx.fill(); ctx.strokeStyle = "rgba(0,0,0,.35)"; ctx.lineWidth = 1; ctx.stroke(); });

  /* ---------------- pH çözücü (yük denkliği, ikiye bölme) ---------------- */
  // ca: zayıf/kuvvetli asit (Ka), cb: zayıf baz (Kb), cs: kuvvetli baz (Na⁺), cx: kuvvetli asit anyonu (Cl⁻)
  function solvePH({ ca = 0, Ka = 1, cb = 0, Kb = 1, cs = 0, cx = 0 }) {
    const Kw = 1e-14;
    const f = (pH) => { const h = Math.pow(10, -pH), oh = Kw / h; return h + cs + cb * (h / (h + Kw / Kb)) - oh - cx - ca * Ka / (Ka + h); };
    let lo = -1, hi = 15;
    for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (f(m) > 0) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }

  /* ======================= 9. SINIF ======================= */

  const ORDER = [[1, 0], [2, 0], [2, 1], [3, 0], [3, 1], [4, 0], [3, 2], [4, 1]];
  const LN = ["s", "p", "d", "f"], CAP = [2, 6, 10, 14];
  function config(nEl, z) {
    const out = ORDER.map(([n, l]) => ({ n, l, e: 0 }));
    let left = nEl;
    for (const sh of out) { const k = Math.min(CAP[sh.l], left); sh.e = k; left -= k; }
    // Cr ve Cu istisnaları (nötr atom)
    const s4 = out.find((x) => x.n === 4 && x.l === 0), d3 = out.find((x) => x.n === 3 && x.l === 2);
    if (nEl === z && (z === 24 || z === 29)) { s4.e = 1; d3.e += 1; }
    return out;
  }
  const sup = (n) => String(n).replace(/\d/g, (q) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[q]);
  add("elektron", {
    title: () => T("Elektron dizilimi ve periyodik tablodaki yer", "Electron configuration"), icon: "sparkle", tags: "orbital aufbau hund katman iyon",
    desc: () => T("Atom numarasını ve yükü seç; orbital kutularını (Hund kuralı), katmanları, periyot ve grubu gör.", "Pick an atomic number and charge; see orbital boxes, shells, period and group."),
    params: () => [
      { id: "z", label: T("Atom numarası Z", "Atomic number Z"), min: 1, max: 36, step: 1, value: 8 },
      { id: "q", label: T("İyon yükü", "Ion charge"), min: -3, max: 3, step: 1, value: 0 }
    ],
    ratio: 0.62,
    tasks: () => [T("Neon ile aynı elektron dizilimine sahip iki iyon bul (izoelektronik).", "Find two ions isoelectronic with neon."), T("Krom (24) ve bakırın (29) dizilimi neden kuralı bozar?", "Why are Cr and Cu exceptions?"), T("Fe²⁺ oluşurken elektronlar hangi orbitalden koparılır?", "Which orbital loses electrons in Fe²⁺?")],
    draw(ctx, W, H, p, t, c) {
      const el = E().byZ(p.z), nE = Math.max(0, p.z - p.q);
      let cf;
      if (p.q > 0) { // katyon: önce en dış (en büyük n) katmandan
        cf = config(p.z, p.z); let rm = p.q;
        const ord = cf.slice().sort((a, b) => b.n - a.n || b.l - a.l);
        for (const sh of ord) { const k = Math.min(sh.e, rm); sh.e -= k; rm -= k; if (!rm) break; }
      } else cf = config(nE, p.z);
      const used = cf.filter((x) => x.e > 0);
      // orbital kutuları
      const bw = Math.max(14, Math.min(22, (W - 20) / 22)), gap = 10;
      let x = 12, y = 26;
      ctx.font = "12px system-ui";
      used.forEach((sh) => {
        const nb = CAP[sh.l] / 2, wNeed = nb * bw + 30;
        if (x + wNeed > W - 8) { x = 12; y += 52; }
        label(ctx, sh.n + LN[sh.l], x, y - 12, c.muted, "left", 11);
        for (let b = 0; b < nb; b++) {
          const bx = x + b * bw; ctx.strokeStyle = c.border; ctx.lineWidth = 1.4; ctx.strokeRect(bx, y, bw, bw * 1.2);
          const up = sh.e >= b + 1, dn = sh.e >= nb + b + 1;     // Hund: önce hepsi tek
          if (up) arrow(ctx, bx + bw * 0.33, y + bw * 1.05, bx + bw * 0.33, y + bw * 0.2, c.accent, 1.6);
          if (dn) arrow(ctx, bx + bw * 0.67, y + bw * 0.2, bx + bw * 0.67, y + bw * 1.05, c.warn, 1.6);
        }
        x += nb * bw + gap + 14;
      });
      // katman modeli
      const shells = [0, 0, 0, 0]; used.forEach((sh) => { shells[sh.n - 1] += sh.e; });
      const cx = W * 0.72, cy = Math.min(H - 70, y + 120), R0 = Math.min(18, H * 0.05);
      dot(ctx, cx, cy, R0, c.bad); label(ctx, el.sym, cx, cy, "#fff", "center", 12);
      shells.forEach((n, i) => { if (!n) return; const R = R0 + 14 + i * 16; ctx.strokeStyle = c.grid; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke(); for (let k = 0; k < n; k++) { const a = (2 * Math.PI * k) / n + t * 0.3 * (i + 1); dot(ctx, cx + R * Math.cos(a), cy + R * Math.sin(a), 3, c.accent); } });
      const txt = used.map((sh) => sh.n + LN[sh.l] + sup(sh.e)).join(" ");
      const val = p.z <= 2 ? (p.z === 2 ? 2 : 1) : el.group > 12 ? el.group - 10 : el.group;
      const blk = el.group <= 2 || el.z === 2 ? "s" : el.group >= 13 ? "p" : "d";
      return { html: row(T("Element", "Element"), el.sym + " · " + L(el.name) + (p.q ? " (" + (p.q > 0 ? sup(p.q) + "⁺" : sup(-p.q) + "⁻") + ")" : "")) + row(T("Elektron sayısı", "Electrons"), String(nE)) +
        row(T("Dizilim", "Configuration"), txt || "—") + row(T("Katmanlar", "Shells"), shells.filter(Boolean).join(" · ")) +
        row(T("Periyot / grup", "Period / group"), el.period + " / " + el.group + " (" + blk + T(" bloku)", "-block)")) + row(T("Değerlik elektronu", "Valence electrons"), el.cat === "gecis" ? "—" : String(val)) +
        row(T("Sınıf", "Category"), L(E().CAT[el.cat])),
        note: T("Orbitaller enerji sırasına göre dolar (1s 2s 2p 3s 3p 4s 3d 4p). Hund kuralı: eş enerjili orbitallere önce birer elektron girer. Katyon oluşurken elektronlar en dış katmandan (4s, 3d'den önce) koparılır. Periyot = en büyük katman sayısı.",
          "Aufbau order; Hund's rule fills singly first; cations lose outermost (4s before 3d) electrons.") };
    }
  }, ["9/kimya/u1/k3", "9/kimya/u1/k4", "9/kimya/u1/k5", "9/kimya/u1/k6", "9/kimya/u1/k7"]);

  add("periyodik", {
    title: () => T("Periyodik özellikler", "Periodic trends"), icon: "chart", tags: "atom yarıçapı iyonlaşma enerjisi elektronegatiflik",
    desc: () => T("Atom yarıçapı, iyonlaşma enerjisi ve elektronegatifliğin atom numarasıyla nasıl değiştiğini grafikte ve tabloda karşılaştır.", "Compare atomic radius, ionisation energy and electronegativity across Z."),
    params: () => [
      { id: "prop", type: "select", label: T("Özellik", "Property"), options: [["r", T("Atom (kovalent) yarıçapı", "Atomic radius")], ["ie", T("1. iyonlaşma enerjisi", "1st ionisation energy")], ["en", T("Elektronegatiflik", "Electronegativity")]], value: "r" },
      { id: "z", label: T("Seçili element (Z)", "Selected Z"), min: 1, max: 36, step: 1, value: 11 }
    ],
    ratio: 0.72,
    tasks: () => [T("Bir periyotta soldan sağa yarıçap neden küçülür?", "Why does radius shrink across a period?"), T("Be→B ve N→O arasında iyonlaşma enerjisi neden düşüyor?", "Why does IE dip from Be→B and N→O?"), T("En elektronegatif element hangisi?", "Which element is most electronegative?")],
    draw(ctx, W, H, p, t, c) {
      const list = E().list, val = (e) => e[p.prop], max = { r: 220, ie: 2500, en: 4.2 }[p.prop];
      const gh = H * 0.48, F = frame(40, 10, W - 50, gh - 24, 0.5, 36.5, 0, max);
      axes(ctx, F, c, { labels: false });
      [10, 18].forEach((z) => { ctx.strokeStyle = c.grid; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(F.X(z + 0.5), F.py); ctx.lineTo(F.X(z + 0.5), F.py + F.ph); ctx.stroke(); ctx.setLineDash([]); });
      const bw = F.pw / 36 * 0.7;
      list.forEach((e) => { const v = val(e); if (v == null) return; ctx.fillStyle = e.z === p.z ? c.warn : E().CAT[e.cat].color + "aa"; ctx.fillRect(F.X(e.z) - bw / 2, F.Y(v), bw, F.Y(0) - F.Y(v)); });
      label(ctx, { r: "pm", ie: "kJ/mol", en: "Pauling" }[p.prop], 44, 16, c.muted, "left", 10);
      // mini periyodik tablo
      const ty = gh + 6, cw = Math.min(30, (W - 20) / 18), ch = Math.min(30, (H - ty - 8) / 4), tx = (W - cw * 18) / 2;
      list.forEach((e) => {
        const x = tx + (e.group - 1) * cw, y = ty + (e.period - 1) * ch, v = val(e);
        const k = v == null ? 0 : v / max;
        ctx.fillStyle = v == null ? c.grid : "rgba(" + Math.round(80 + 170 * k) + "," + Math.round(140 - 60 * k) + "," + Math.round(250 - 170 * k) + ",.85)";
        ctx.fillRect(x + 1, y + 1, cw - 2, ch - 2);
        if (e.z === p.z) { ctx.strokeStyle = c.text; ctx.lineWidth = 2; ctx.strokeRect(x + 1, y + 1, cw - 2, ch - 2); }
        label(ctx, e.sym, x + cw / 2, y + ch / 2, "#111", "center", Math.min(11, cw * 0.38));
      });
      const e = E().byZ(p.z);
      return { html: row(T("Element", "Element"), e.sym + " · " + L(e.name)) + row(T("Yarıçap", "Radius"), e.r + " pm") + row(T("1. iyonlaşma enerjisi", "1st IE"), e.ie + " kJ/mol") + row(T("Elektronegatiflik", "Electronegativity"), e.en == null ? "—" : fmt(e.en, 2)),
        note: T("Periyotta soldan sağa çekirdek yükü artar: yarıçap küçülür, iyonlaşma enerjisi ve elektronegatiflik artar. Grupta yukarıdan aşağı katman sayısı artar: yarıçap büyür, iyonlaşma enerjisi azalır. 2A→3A ve 5A→6A'daki düşüşler orbital kararlılığından kaynaklanır.",
          "Across a period radius falls and IE/EN rise; down a group radius grows and IE falls.") };
    }
  }, ["9/kimya/u1/k8", "9/kimya/u1/k6"]);

  const BOND_EL = ["H", "Li", "C", "N", "O", "F", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "K", "Ca", "Fe", "Cu", "Br"];
  const isMetal = (e) => ["alkali", "toprak", "gecis", "metal"].includes(e.cat);
  add("bag", {
    title: () => T("Kimyasal bağ türü: iyonik, kovalent, metalik", "Bond type: ionic, covalent, metallic"), icon: "layers", tags: "elektronegatiflik farkı polar apolar formül",
    desc: () => T("İki element seç; elektronegatiflik farkına göre bağın türünü, kısmi yükleri ve oluşabilecek bileşiğin formülünü gör.", "Pick two elements; see bond type from the electronegativity difference and the likely formula."),
    params: () => [
      { id: "a", type: "select", label: T("1. element", "Element 1"), options: BOND_EL.map((s) => [s, s + " · " + L(E().bySym(s).name)]), value: "Na" },
      { id: "b", type: "select", label: T("2. element", "Element 2"), options: BOND_EL.map((s) => [s, s + " · " + L(E().bySym(s).name)]), value: "Cl" }
    ],
    animated: true, loop: true, ratio: 0.55,
    tasks: () => [T("H ile Cl, H ile H ve Na ile Cl'yi karşılaştır.", "Compare H–Cl, H–H and Na–Cl."), T("Mg ile O hangi formülde bileşik oluşturur?", "What formula do Mg and O form?")],
    draw(ctx, W, H, p, t, c) {
      const A = E().bySym(p.a), B = E().bySym(p.b), dEN = Math.abs((A.en || 0) - (B.en || 0));
      let type;
      if (isMetal(A) && isMetal(B)) type = "metal"; else if (A === B || dEN < 0.4) type = "apolar"; else if (dEN < 1.7) type = "polar"; else type = "iyon";
      const names = { metal: T("Metalik bağ", "Metallic"), apolar: T("Apolar kovalent bağ", "Nonpolar covalent"), polar: T("Polar kovalent bağ", "Polar covalent"), iyon: T("İyonik bağ", "Ionic") };
      const more = (A.en || 0) >= (B.en || 0) ? A : B, less = more === A ? B : A;
      // değerlik ve formül
      const v = (e) => (isMetal(e) ? (e.group > 12 ? e.group - 10 : Math.min(e.group, 3)) : e.z === 1 ? 1 : 18 - e.group);
      const gcd = (x, y) => (y ? gcd(y, x % y) : x);
      let formula = "—";
      const sub = (n) => (n > 1 ? String(n).replace(/\d/g, (d) => "₀₁₂₃₄₅₆₇₈₉"[d]) : "");
      if (type !== "metal" && A !== B) { const va = v(less), vb = v(more), g = gcd(va, vb); formula = less.sym + sub(vb / g) + more.sym + sub(va / g); }
      if (A === B && !isMetal(A)) formula = A.sym + "₂";
      const cy = H / 2, xa = W * 0.36, xb = W * 0.64, ra = 26 + A.r / 12, rb = 26 + B.r / 12;
      if (type === "metal") {
        for (let i = 0; i < 12; i++) { const x = W * 0.2 + (i % 6) * W * 0.12, y = cy - 30 + Math.floor(i / 6) * 60; dot(ctx, x, y, 18, (i % 2 ? E().CAT[B.cat].color : E().CAT[A.cat].color) + "cc"); label(ctx, (i % 2 ? B : A).sym + "⁺", x, y, "#111", "center", 11); }
        for (let i = 0; i < 26; i++) dot(ctx, (W * 0.15 + ((i * 53 + t * 40 * (1 + (i % 3))) % (W * 0.7))), cy - 50 + ((i * 37) % 100), 2.5, c.accent);
      } else {
        const shift = type === "iyon" ? 1 : type === "polar" ? Math.min(1, dEN / 1.7) * 0.6 : 0;
        const dir = more === B ? 1 : -1, mid = (xa + xb) / 2 + dir * shift * (xb - xa) * 0.4;
        const g = ctx.createRadialGradient(mid, cy, 4, mid, cy, 60); g.addColorStop(0, c.accent + "aa"); g.addColorStop(1, c.accent + "00");
        if (type !== "iyon") { ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(mid, cy, 62, 34, 0, 0, 7); ctx.fill(); }
        dot(ctx, xa, cy, ra * (type === "iyon" ? (A === less ? 0.75 : 1.2) : 1), E().CAT[A.cat].color + "dd"); dot(ctx, xb, cy, rb * (type === "iyon" ? (B === less ? 0.75 : 1.2) : 1), E().CAT[B.cat].color + "dd");
        label(ctx, A.sym, xa, cy, "#111", "center", 16); label(ctx, B.sym, xb, cy, "#111", "center", 16);
        const qa = A === more ? (type === "iyon" ? "−" : "δ−") : (type === "iyon" ? "+" : "δ+"), qb = B === more ? (type === "iyon" ? "−" : "δ−") : (type === "iyon" ? "+" : "δ+");
        if (type !== "apolar") { label(ctx, qa, xa, cy - ra - 12, c.warn, "center", 15); label(ctx, qb, xb, cy - rb - 12, c.warn, "center", 15); }
        if (type === "iyon") { const k = (Math.sin(t * 2) + 1) / 2; dot(ctx, xa + (xb - xa) * (A === less ? k : 1 - k), cy - 50, 4, c.accent); }
      }
      return { html: row(T("Elektronegatiflik", "Electronegativity"), A.sym + " " + fmt(A.en, 2) + " · " + B.sym + " " + fmt(B.en, 2)) + row(T("Fark ΔEN", "ΔEN"), fmt(dEN, 2)) + row(T("Bağ türü", "Bond type"), names[type]) + row(T("Olası formül", "Likely formula"), formula),
        note: T("ΔEN < 0,4 ise elektronlar eşit paylaşılır (apolar kovalent); 0,4–1,7 arası polar kovalent (elektronlar elektronegatif atoma kayar, δ− olur); 1,7'den büyükse elektron aktarılır ve iyonik bağ oluşur. İki metal arasında elektron denizi (metalik bağ) vardır.",
          "ΔEN < 0.4 nonpolar, 0.4–1.7 polar covalent, > 1.7 ionic; metals share a sea of electrons.") };
    }
  }, ["9/kimya/u2/k1", "9/kimya/u2/k2", "9/kimya/u2/k3", "9/kimya/u2/k5"]);

  // VSEPR: [ad, bağ, ortaklanmamış çift, açı, hibrit, örnek, polar?]
  const V3 = (a) => { const m = Math.hypot(...a); return a.map((x) => x / m); };
  const GEOM = {
    2: [[1, 0, 0], [-1, 0, 0]], 3: [[1, 0, 0], [-0.5, 0.866, 0], [-0.5, -0.866, 0]],
    4: [V3([1, 1, 1]), V3([1, -1, -1]), V3([-1, 1, -1]), V3([-1, -1, 1])],
    5: [[1, 0, 0], [-0.5, 0, 0.866], [-0.5, 0, -0.866], [0, 1, 0], [0, -1, 0]],
    6: [[1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1], [0, 1, 0], [0, -1, 0]]
  };
  const SHAPES = () => [
    ["CO2", T("Doğrusal", "Linear"), 2, 0, "180°", "sp", "CO₂, BeH₂", false, "C"],
    ["BF3", T("Düzlem üçgen", "Trigonal planar"), 3, 0, "120°", "sp²", "BF₃", false, "B"],
    ["SO2", T("Kırık doğru (açısal)", "Bent"), 2, 1, "≈119°", "sp²", "SO₂", true, "S"],
    ["CH4", T("Düzgün dörtyüzlü", "Tetrahedral"), 4, 0, "109,5°", "sp³", "CH₄", false, "C"],
    ["NH3", T("Üçgen piramit", "Trigonal pyramidal"), 3, 1, "≈107°", "sp³", "NH₃", true, "N"],
    ["H2O", T("Kırık doğru (açısal)", "Bent"), 2, 2, "≈104,5°", "sp³", "H₂O", true, "O"],
    ["PCl5", T("Üçgen çift piramit", "Trigonal bipyramidal"), 5, 0, "90° / 120°", "sp³d", "PCl₅", false, "P"],
    ["SF4", T("Tahterevalli", "Seesaw"), 4, 1, "<90° / <120°", "sp³d", "SF₄", true, "S"],
    ["ClF3", T("T şekli", "T-shaped"), 3, 2, "<90°", "sp³d", "ClF₃", true, "Cl"],
    ["XeF2", T("Doğrusal", "Linear"), 2, 3, "180°", "sp³d", "XeF₂", false, "Xe"],
    ["SF6", T("Düzgün sekizyüzlü", "Octahedral"), 6, 0, "90°", "sp³d²", "SF₆", false, "S"],
    ["BrF5", T("Kare piramit", "Square pyramidal"), 5, 1, "<90°", "sp³d²", "BrF₅", true, "Br"],
    ["XeF4", T("Kare düzlem", "Square planar"), 4, 2, "90°", "sp³d²", "XeF₄", false, "Xe"]
  ];
  // ortaklanmamış çiftlerin yerleri (alan sayısına göre, hangi indeksler)
  const LONE_IDX = { 3: [2], 4: [3, 2], 5: [1, 2, 0], 6: [5, 4] };
  add("vsepr", {
    title: () => T("Molekül geometrisi (VSEPR) ve hibritleşme", "Molecular geometry (VSEPR)"), icon: "layers", tags: "lewis polar apolar bağ açısı sp3",
    desc: () => T("Bir molekül seç; merkez atomdaki bağ ve ortaklanmamış elektron çiftlerinin geometriyi nasıl belirlediğini dönen 3B modelde gör.", "Pick a molecule; see how bonding and lone pairs set its 3D shape."),
    params: () => [{ id: "m", type: "select", label: T("Molekül", "Molecule"), options: SHAPES().map((s) => [s[0], s[6] + " — " + s[1]]), value: "CH4" }, { id: "rot", type: "toggle", label: T("Döndür", "Rotate"), value: true }],
    animated: true, loop: true, ratio: 0.6,
    tasks: () => [T("NH₃ ile BF₃ neden farklı şekillidir? İkisinde de 3 bağ var.", "Why are NH₃ and BF₃ shaped differently?"), T("CO₂ polar bağlar içerdiği hâlde neden apolar moleküldür?", "Why is CO₂ nonpolar?")],
    draw(ctx, W, H, p, t, c, s) {
      const sh = SHAPES().find((x) => x[0] === p.m) || SHAPES()[3];
      const nb = sh[2], nl = sh[3], tot = nb + nl, dirs = GEOM[tot];
      const lone = new Set((LONE_IDX[tot] || []).slice(0, nl));
      s.ang = (s.ang || 0.5) + (p.rot ? 0.012 : 0);
      const ay = s.ang, ax = 0.35, cx = W * 0.38, cy = H / 2, R = Math.min(W * 0.26, H * 0.36);
      const proj = ([x, y, z]) => { const x1 = x * Math.cos(ay) + z * Math.sin(ay), z1 = -x * Math.sin(ay) + z * Math.cos(ay); const y1 = y * Math.cos(ax) - z1 * Math.sin(ax), z2 = y * Math.sin(ax) + z1 * Math.cos(ax); return [cx + x1 * R, cy - y1 * R, z2]; };
      const items = dirs.map((d, i) => ({ i, p: proj(d), lone: lone.has(i) })).sort((a, b) => a.p[2] - b.p[2]);
      const center = () => { dot(ctx, cx, cy, 20, c.violet); label(ctx, sh[8], cx, cy, "#fff", "center", 12); };
      let drawnCenter = false;
      items.forEach((it) => {
        if (!drawnCenter && it.p[2] > 0) { center(); drawnCenter = true; }
        const sz = 1 + it.p[2] * 0.15;
        if (it.lone) { ctx.fillStyle = c.accent + "40"; ctx.beginPath(); ctx.ellipse((cx + it.p[0]) / 2 + (it.p[0] - cx) * 0.1, (cy + it.p[1]) / 2 + (it.p[1] - cy) * 0.1, 22 * sz, 14 * sz, Math.atan2(it.p[1] - cy, it.p[0] - cx), 0, 7); ctx.fill();
          dot(ctx, (cx + it.p[0]) / 2 + (it.p[0] - cx) * 0.1 - 4, (cy + it.p[1]) / 2 + (it.p[1] - cy) * 0.1, 2.5, c.text); dot(ctx, (cx + it.p[0]) / 2 + (it.p[0] - cx) * 0.1 + 4, (cy + it.p[1]) / 2 + (it.p[1] - cy) * 0.1, 2.5, c.text); }
        else { ctx.strokeStyle = c.text; ctx.lineWidth = 4 * sz; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(it.p[0], it.p[1]); ctx.stroke(); dot(ctx, it.p[0], it.p[1], 13 * sz, c.good); }
      });
      if (!drawnCenter) center();
      return { html: row(T("Geometri", "Shape"), sh[1]) + row(T("Bağ / ortaklanmamış çift", "Bonds / lone pairs"), nb + " / " + nl) + row(T("Bağ açısı", "Bond angle"), sh[4]) + row(T("Merkez atom hibriti", "Hybridisation"), sh[5]) +
        row(T("Molekül polarlığı", "Polarity"), sh[7] ? T("polar", "polar") : T("apolar (simetrik)", "nonpolar")),
        note: T("Elektron çiftleri birbirini iter ve en uzak konumları alır. Ortaklanmamış çiftler bağ çiftlerinden daha çok yer kaplar, bağ açısını küçültür (CH₄ 109,5° → NH₃ 107° → H₂O 104,5°). Simetrik moleküllerde bağ polarlıkları birbirini götürür.",
          "Electron pairs repel to the farthest positions; lone pairs squeeze bond angles. Symmetric molecules are nonpolar.") };
    }
  }, ["12/kimya/u2/k1", "9/kimya/u2/k4", "9/kimya/u2/k5", "9/kimya/u2/k7"]);

  /* ======================= 10. SINIF ======================= */

  const RX = () => [
    { id: "su", name: "2H₂ + O₂ → 2H₂O", r: [["H₂", 2, [["H", -0.6, 0], ["H", 0.6, 0]]], ["O₂", 1, [["O", -0.6, 0], ["O", 0.6, 0]]]], pr: [["H₂O", 2, [["O", 0, 0], ["H", -0.9, 0.7], ["H", 0.9, 0.7]]]] },
    { id: "nh3", name: "N₂ + 3H₂ → 2NH₃", r: [["N₂", 1, [["N", -0.6, 0], ["N", 0.6, 0]]], ["H₂", 3, [["H", -0.6, 0], ["H", 0.6, 0]]]], pr: [["NH₃", 2, [["N", 0, 0], ["H", -0.9, 0.6], ["H", 0.9, 0.6], ["H", 0, -1]]]] },
    { id: "ch4", name: "CH₄ + 2O₂ → CO₂ + 2H₂O", r: [["CH₄", 1, [["C", 0, 0], ["H", -0.9, 0.6], ["H", 0.9, 0.6], ["H", -0.9, -0.6], ["H", 0.9, -0.6]]], ["O₂", 2, [["O", -0.6, 0], ["O", 0.6, 0]]]], pr: [["CO₂", 1, [["C", 0, 0], ["O", -1.1, 0], ["O", 1.1, 0]]], ["H₂O", 2, [["O", 0, 0], ["H", -0.9, 0.7], ["H", 0.9, 0.7]]]] },
    { id: "hcl", name: "H₂ + Cl₂ → 2HCl", r: [["H₂", 1, [["H", -0.6, 0], ["H", 0.6, 0]]], ["Cl₂", 1, [["Cl", -0.6, 0], ["Cl", 0.6, 0]]]], pr: [["HCl", 2, [["H", -0.6, 0], ["Cl", 0.6, 0]]]] }
  ];
  add("stokiyometri", {
    title: () => T("Sınırlayıcı bileşen ve mol hesabı", "Limiting reagent and moles"), icon: "layers", tags: "stokiyometri artan madde denkleştirme verim",
    desc: () => T("Tepkimeyi ve girenlerin mol sayısını seç; moleküller tepkimeye girsin. Hangisi sınırlayıcı, ne kadar ürün oluşur, ne artar?", "Pick a reaction and amounts; see the limiting reagent, products and leftovers."),
    params: () => [
      { id: "rx", type: "select", label: T("Tepkime", "Reaction"), options: RX().map((r) => [r.id, r.name]), value: "su" },
      { id: "a", label: T("1. giren (mol)", "Reactant 1 (mol)"), min: 0, max: 10, step: 1, value: 4 },
      { id: "b", label: T("2. giren (mol)", "Reactant 2 (mol)"), min: 0, max: 10, step: 1, value: 3 },
      { id: "y", label: T("Verim", "Yield"), min: 10, max: 100, step: 5, value: 100, unit: "%" }
    ],
    ratio: 0.62,
    tasks: () => [T("2H₂ + O₂ tepkimesinde hiçbir şey artmayacak mol sayılarını bul.", "Find amounts with no leftovers."), T("Verim %80 iken oluşan ürün kaç mol?", "How much product at 80% yield?")],
    draw(ctx, W, H, p, t, c) {
      const R = RX().find((x) => x.id === p.rx) || RX()[0], [A, B] = R.r;
      const xi = Math.min(p.a / A[1], p.b / B[1]) * (p.y / 100), lim = p.a / A[1] < p.b / B[1] ? A[0] : p.b / B[1] < p.a / A[1] ? B[0] : T("ikisi de tükenir", "both");
      const leftA = p.a - A[1] * xi, leftB = p.b - B[1] * xi;
      const half = W / 2;
      ctx.strokeStyle = c.border; ctx.beginPath(); ctx.moveTo(half, 20); ctx.lineTo(half, H - 10); ctx.stroke();
      label(ctx, T("Önce", "Before"), half / 2, 12, c.muted, "center", 12); label(ctx, T("Sonra", "After"), half * 1.5, 12, c.muted, "center", 12);
      arrow(ctx, half - 14, H / 2, half + 14, H / 2, c.text, 2);
      const grid = (x0, items) => { let k = 0; items.forEach(([nm, n, atoms]) => { for (let i = 0; i < Math.round(n); i++) { const col = k % 5, rw = Math.floor(k / 5); molecule(ctx, x0 + 24 + col * ((half - 40) / 5), 44 + rw * 34, atoms, 7); k++; } }); };
      grid(0, [[A[0], p.a, A[2]], [B[0], p.b, B[2]]]);
      grid(half, R.pr.map(([nm, co, at]) => [nm, co * xi, at]).concat([[A[0], leftA, A[2]], [B[0], leftB, B[2]]]));
      return { html: row(T("Sınırlayıcı bileşen", "Limiting reagent"), lim) + R.pr.map(([nm, co]) => row(T("Oluşan ", "Formed ") + nm, fmt(co * xi, 2) + " mol")).join("") +
        row(T("Artan", "Left over"), (leftA > 1e-9 ? fmt(leftA, 2) + " mol " + A[0] : "") + (leftB > 1e-9 ? fmt(leftB, 2) + " mol " + B[0] : "") || "—"),
        note: T("Katsayılar mol oranlarını verir. Önce biten madde sınırlayıcıdır ve ürün miktarını o belirler; diğerinden artar. Gerçek verim < %100 ise oluşan ürün teorik miktarın o kadarıdır.",
          "Coefficients give mole ratios; the reagent that runs out first limits the product.") };
    }
  }, ["10/kimya/u1/k3", "10/kimya/u1/k4", "10/kimya/u1/k5", "10/kimya/u1/k1"]);

  add("gaz", {
    title: () => T("Gaz yasaları ve kinetik teori", "Gas laws and kinetic theory"), icon: "sparkle", tags: "basınç hacim sıcaklık boyle charles ideal gaz",
    desc: () => T("Sıcaklık, hacim ve mol sayısını değiştir; taneciklerin hızlandığını, çeperlere çarpmanın arttığını ve basıncı (PV = nRT) gör.", "Change T, V and n; watch particles speed up and pressure follow PV = nRT."),
    params: () => [
      { id: "T", label: T("Sıcaklık", "Temperature"), min: 100, max: 800, step: 10, value: 300, unit: "K" },
      { id: "V", label: T("Hacim", "Volume"), min: 5, max: 40, step: 1, value: 20, unit: "L" },
      { id: "n", label: T("Mol sayısı", "Moles"), min: 0.2, max: 3, step: 0.1, value: 1, unit: "mol" }
    ],
    animated: true, loop: true, ratio: 0.6, keep: true,
    init(p) { return { pts: [], hits: 0, hitT: 0, rate: 0 }; },
    adapt(s, p) {
      const N = Math.round(p.n * 30);
      while (s.pts.length < N) { const a = Math.random() * 7; s.pts.push({ x: Math.random(), y: Math.random(), vx: Math.cos(a), vy: Math.sin(a), sp: 0.6 + Math.random() * 0.8 }); }
      s.pts.length = N;
    },
    tasks: () => [T("Sıcaklığı sabit tut, hacmi yarıya indir: basınç ne olur? (Boyle)", "Halve V at constant T: what happens to P?"), T("Hacmi sabit tutup sıcaklığı 2 katına çıkar.", "Double T at constant V."), T("Sıcaklık artınca tanecikler neden çepere daha sık ve sert çarpıyor?", "Why do hotter particles hit the walls more?")],
    draw(ctx, W, H, p, t, c, s) {
      if (!s.pts.length) this.adapt(s, p);
      const P = p.n * 0.0821 * p.T / p.V;
      const bw = W * 0.55 * (0.35 + 0.65 * p.V / 40), bh = H - 40, bx = 20, by = 20;
      ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.strokeRect(bx, by, bw, bh);
      ctx.fillStyle = c.grid; ctx.fillRect(bx + bw, by, 10, bh);
      const sp = Math.sqrt(p.T / 300) * 0.006;
      s.pts.forEach((q) => {
        q.x += q.vx * q.sp * sp * (300 / bw); q.y += q.vy * q.sp * sp * (300 / bh);
        if (q.x < 0) { q.x = -q.x; q.vx *= -1; s.hits++; } if (q.x > 1) { q.x = 2 - q.x; q.vx *= -1; s.hits++; }
        if (q.y < 0) { q.y = -q.y; q.vy *= -1; s.hits++; } if (q.y > 1) { q.y = 2 - q.y; q.vy *= -1; s.hits++; }
        const heat = Math.min(1, p.T / 800);
        dot(ctx, bx + 4 + q.x * (bw - 8), by + 4 + q.y * (bh - 8), 3.5, "rgb(" + Math.round(90 + 165 * heat) + "," + Math.round(150 - 60 * heat) + "," + Math.round(255 - 180 * heat) + ")");
      });
      if (t - s.hitT > 1) { s.rate = s.hits / (t - s.hitT); s.hits = 0; s.hitT = t; }
      // basınç göstergesi
      const gx = W * 0.82, gy = H * 0.45, ang = Math.PI * 0.75 + Math.min(1, P / 8) * Math.PI * 1.5;
      ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(gx, gy, 46, Math.PI * 0.75, Math.PI * 2.25); ctx.stroke();
      ctx.strokeStyle = c.warn; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + 40 * Math.cos(ang), gy + 40 * Math.sin(ang)); ctx.stroke();
      label(ctx, fmt(P, 2) + " atm", gx, gy + 64, c.text, "center", 14);
      return { html: row(T("Basınç P = nRT/V", "Pressure"), fmt(P, 2) + " atm") + row(T("Ortalama hız (göreli)", "Mean speed (rel.)"), "×" + fmt(Math.sqrt(p.T / 300), 2)) +
        row(T("Çepere çarpma / sn (ekranda)", "Wall hits / s"), fmt(s.rate, 0)) + row(T("Ortalama kinetik enerji", "Mean kinetic energy"), fmt(1.5 * 8.314 * p.T / 1000, 2) + " kJ/mol"),
        note: T("Gaz basıncı taneciklerin kabın çeperine çarpmasından doğar. Sıcaklık artınca tanecikler hızlanır (ortalama kinetik enerji mutlak sıcaklıkla orantılı), hacim azalınca çarpmalar sıklaşır. Boyle: PV sabit; Charles: V/T sabit; Gay-Lussac: P/T sabit.",
          "Pressure comes from wall collisions; KE ∝ T. Boyle, Charles and Gay-Lussac laws follow from PV = nRT.") };
    }
  }, ["10/kimya/u2/k1", "10/kimya/u2/k2", "10/kimya/u2/k3"]);

  const GASES = () => [[2, "H₂ (2)"], [4, "He (4)"], [17, "NH₃ (17)"], [32, "O₂ (32)"], [36.5, "HCl (36,5)"], [44, "CO₂ (44)"]];
  add("graham", {
    title: () => T("Difüzyon: Graham yasası", "Diffusion: Graham's law"), icon: "arrowUp", tags: "yayılma efüzyon mol kütlesi",
    desc: () => T("Bir borunun iki ucundan iki gaz aynı anda bırakılıyor; hafif gaz daha hızlı yayılır. Nerede karşılaştıklarını gör.", "Two gases enter a tube from opposite ends; the lighter one diffuses faster. Where do they meet?"),
    params: () => [
      { id: "m1", type: "select", label: T("Soldaki gaz (g/mol)", "Left gas"), options: GASES(), value: 17 },
      { id: "m2", type: "select", label: T("Sağdaki gaz (g/mol)", "Right gas"), options: GASES(), value: 36.5 },
      { id: "L", label: T("Boru uzunluğu", "Tube length"), min: 50, max: 200, step: 10, value: 100, unit: "cm" }
    ],
    animated: true, ratio: 0.4,
    tasks: () => [T("NH₃ ile HCl kaçıncı cm'de karşılaşır? Beyaz NH₄Cl halkası nerede oluşur?", "Where do NH₃ and HCl meet?"), T("H₂, O₂'den kaç kat hızlı yayılır?", "How much faster is H₂ than O₂?")],
    draw(ctx, W, H, p, t, c) {
      const r1 = 1 / Math.sqrt(p.m1), r2 = 1 / Math.sqrt(p.m2), dMeet = p.L * r1 / (r1 + r2);
      const x0 = 30, x1 = W - 30, y = H * 0.45, len = x1 - x0, k = Math.min(1, t / 6);
      ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.strokeRect(x0, y - 18, len, 36);
      const f1 = k * (r1 / (r1 + r2)) * len, f2 = k * (r2 / (r1 + r2)) * len;
      const g1 = ctx.createLinearGradient(x0, 0, x0 + f1, 0); g1.addColorStop(0, c.accent + "cc"); g1.addColorStop(1, c.accent + "10");
      const g2 = ctx.createLinearGradient(x1, 0, x1 - f2, 0); g2.addColorStop(0, c.good + "cc"); g2.addColorStop(1, c.good + "10");
      ctx.fillStyle = g1; ctx.fillRect(x0 + 1, y - 17, f1, 34); ctx.fillStyle = g2; ctx.fillRect(x1 - f2, y - 17, f2 - 1, 34);
      if (k >= 1) { const xm = x0 + len * dMeet / p.L; ctx.fillStyle = "#fff"; ctx.fillRect(xm - 3, y - 17, 6, 34); label(ctx, fmt(dMeet, 1) + " cm", xm, y + 32, c.text, "center", 12); }
      for (let i = 0; i <= 10; i++) { const x = x0 + len * i / 10; ctx.strokeStyle = c.grid; ctx.beginPath(); ctx.moveTo(x, y + 18); ctx.lineTo(x, y + 24); ctx.stroke(); }
      return { done: k >= 1, html: row(T("Hız oranı v₁/v₂ = √(M₂/M₁)", "Rate ratio"), fmt(r1 / r2, 2)) + row(T("Soldan karşılaşma uzaklığı", "Meeting point from left"), fmt(dMeet, 1) + " cm"),
        note: T("Aynı sıcaklıkta gazların ortalama kinetik enerjisi eşittir; bu yüzden mol kütlesi küçük olan daha hızlı hareket eder. Yayılma hızı mol kütlesinin karekökü ile ters orantılıdır.",
          "At equal temperature lighter gases move faster: rate ∝ 1/√M.") };
    }
  }, ["10/kimya/u2/k4"]);

  // çözünürlük (g / 100 g su): 0, 20, 40, 60, 80, 100 °C
  const SOL = { KNO3: [13.3, 31.6, 63.9, 110, 169, 246], NaCl: [35.7, 36.0, 36.6, 37.3, 38.4, 39.8], KCl: [28.0, 34.2, 40.1, 45.8, 51.3, 56.3], "Ce2(SO4)3": [20.8, 10.1, 6.2, 4.0, 2.6, 1.6] };
  const solAt = (k, T0) => { const a = SOL[k], i = Math.min(4, Math.floor(T0 / 20)), f = (T0 - i * 20) / 20; return a[i] + (a[i + 1] - a[i]) * f; };
  add("cozunurluk", {
    title: () => T("Çözünürlük eğrileri", "Solubility curves"), icon: "chart", tags: "doymuş doymamış aşırı doymuş çökme sıcaklık",
    desc: () => T("Tuzu, sıcaklığı ve 100 g suya eklenen kütleyi seç; çözeltinin doymuş mu doymamış mı olduğunu ve dibe çöken miktarı gör.", "Pick a salt, temperature and amount in 100 g water; see whether the solution is saturated."),
    params: () => [
      { id: "s", type: "select", label: T("Tuz", "Salt"), options: Object.keys(SOL).map((k) => [k, k.replace(/(\d)/g, (d) => "₀₁₂₃₄₅₆₇₈₉"[d])]), value: "KNO3" },
      { id: "T", label: T("Sıcaklık", "Temperature"), min: 0, max: 100, step: 1, value: 40, unit: "°C" },
      { id: "m", label: T("Eklenen tuz (100 g suya)", "Salt added"), min: 0, max: 250, step: 1, value: 80, unit: "g" }
    ],
    ratio: 0.62,
    tasks: () => [T("60 °C'de doymuş KNO₃ çözeltisini 20 °C'ye soğutursan kaç gram çöker?", "Cool saturated KNO₃ from 60 to 20 °C: how much crystallises?"), T("Hangi tuzun çözünürlüğü sıcaklıkla azalıyor? Bu ne demek (ekzotermik çözünme)?", "Which salt gets less soluble when hot?")],
    draw(ctx, W, H, p, t, c) {
      const F = frame(48, 14, W * 0.62 - 48, H - 40, 0, 100, 0, 250);
      axes(ctx, F, c, { xName: "T (°C)", yName: "g/100 g" });
      Object.keys(SOL).forEach((k) => plot(ctx, F, (x) => solAt(k, x), k === p.s ? c.accent : c.muted + "88", k === p.s ? 2.6 : 1.2));
      const S = solAt(p.s, p.T); dot(ctx, F.X(p.T), F.Y(p.m), 6, p.m > S ? c.bad : c.good);
      const state = Math.abs(p.m - S) < 0.5 ? T("doymuş", "saturated") : p.m < S ? T("doymamış", "unsaturated") : T("doymuş + dipte katı", "saturated + solid");
      // beher
      const bx = W * 0.68, bw = W * 0.26, by = 40, bh = H - 80;
      ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by); ctx.stroke();
      ctx.fillStyle = c.accent + Math.round(30 + 60 * Math.min(1, Math.min(p.m, S) / 250)).toString(16); ctx.fillRect(bx + 2, by + bh * 0.25, bw - 4, bh * 0.75 - 2);
      const solid = Math.max(0, p.m - S); if (solid > 0) { ctx.fillStyle = "#e8e8e8"; const hh = Math.min(bh * 0.5, 6 + solid * 0.5); ctx.fillRect(bx + 2, by + bh - hh - 2, bw - 4, hh); }
      return { html: row(T("Çözünürlük", "Solubility"), fmt(S, 1) + " g / 100 g " + T("su", "water")) + row(T("Durum", "State"), state) + row(T("Dibe çöken", "Undissolved"), fmt(solid, 1) + " g") + row(T("Kütlece %", "Mass %"), "%" + fmt(Math.min(p.m, S) / (100 + Math.min(p.m, S)) * 100, 1)),
        note: T("Eğrinin üstündeki her nokta aşırı (çökelti oluşur), altı doymamış, üzerindeki noktalar doymuş çözeltidir. Çoğu katının çözünürlüğü sıcaklıkla artar (endotermik çözünme); bazılarınınki azalır. Gazların çözünürlüğü ise sıcaklıkla azalır.",
          "Above the curve: excess solid; below: unsaturated; on it: saturated. Gases get less soluble when hot.") };
    }
  }, ["10/kimya/u3/k3", "10/kimya/u3/k4", "10/kimya/u3/k1", "10/kimya/u3/k2"]);

  const SOLUTES = () => [[58.5, T("NaCl (58,5 g/mol)", "NaCl")], [180, T("Glikoz (180 g/mol)", "Glucose")], [40, T("NaOH (40 g/mol)", "NaOH")], [98, T("H₂SO₄ (98 g/mol)", "H₂SO₄")]];
  add("derisim", {
    title: () => T("Derişim: molarite, ppm ve seyreltme", "Concentration: molarity, ppm, dilution"), icon: "layers", tags: "mol/L çözelti hazırlama",
    desc: () => T("Çözünen kütlesini ve çözelti hacmini ayarla, sonra su ekleyerek seyrelt; molarite ve ppm değerlerinin nasıl değiştiğini gör.", "Set solute mass and volume, then dilute; see molarity and ppm change."),
    params: () => [
      { id: "M", type: "select", label: T("Çözünen", "Solute"), options: SOLUTES(), value: 58.5 },
      { id: "m", label: T("Çözünen kütlesi", "Solute mass"), min: 0, max: 100, step: 0.5, value: 11.7, unit: "g" },
      { id: "V", label: T("Çözelti hacmi", "Solution volume"), min: 100, max: 1000, step: 50, value: 200, unit: "mL" },
      { id: "w", label: T("Eklenen su (seyreltme)", "Water added"), min: 0, max: 1000, step: 50, value: 0, unit: "mL" }
    ],
    ratio: 0.5,
    tasks: () => [T("250 mL 0,2 M NaCl çözeltisi için kaç gram tuz gerekir?", "How many grams for 250 mL of 0.2 M NaCl?"), T("1 M çözeltiyi 0,25 M yapmak için ne kadar su eklemelisin?", "How much water turns 1 M into 0.25 M?")],
    draw(ctx, W, H, p, t, c) {
      const n = p.m / p.M, M1 = n / (p.V / 1000), V2 = p.V + p.w, M2 = n / (V2 / 1000), ppm = p.m * 1000 / (V2 / 1000);
      const beaker = (x, w, vol, conc, ttl) => { const h = H - 50, fill = Math.min(1, vol / 2000) * h; ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, 20 + h); ctx.lineTo(x + w, 20 + h); ctx.lineTo(x + w, 20); ctx.stroke();
        ctx.fillStyle = "rgba(91,140,255," + Math.min(0.9, 0.08 + conc * 0.35) + ")"; ctx.fillRect(x + 2, 20 + h - fill, w - 4, fill - 2); label(ctx, ttl, x + w / 2, H - 14, c.muted, "center", 11); };
      beaker(W * 0.1, W * 0.3, p.V, M1, T("hazırlanan", "prepared")); arrow(ctx, W * 0.45, H / 2, W * 0.55, H / 2, c.text, 2); beaker(W * 0.6, W * 0.3, V2, M2, T("seyreltilmiş", "diluted"));
      return { html: row(T("Mol sayısı n = m/M", "Moles"), fmt(n, 3) + " mol") + row(T("Molarite M = n/V", "Molarity"), fmt(M1, 3) + " M") + row(T("Seyreltince M₂ = M₁V₁/V₂", "After dilution"), fmt(M2, 3) + " M") + row("ppm (mg/L)", fmt(ppm, 0)),
        note: T("Molarite, 1 litre çözeltideki çözünen mol sayısıdır. Seyreltmede çözünenin mol sayısı değişmez: M₁·V₁ = M₂·V₂. ppm çok seyreltik çözeltiler (içme suyundaki iyonlar gibi) için kullanılır: 1 ppm ≈ 1 mg/L.",
          "Molarity = mol per litre. Dilution keeps moles: M₁V₁ = M₂V₂. 1 ppm ≈ 1 mg/L.") };
    }
  }, ["10/kimya/u3/k5"]);

  add("koligatif", {
    title: () => T("Koligatif özellikler: kaynama ve donma noktası", "Colligative properties"), icon: "timer", tags: "kaynama noktası yükselmesi donma noktası alçalması antifriz",
    desc: () => T("Suya çözünen maddeyi ve miktarını seç; kaynama noktasının yükseldiğini, donma noktasının düştüğünü gör. Etki tanecik sayısına bağlıdır.", "Pick a solute and amount; boiling point rises and freezing point falls with particle count."),
    params: () => [
      { id: "i", type: "select", label: T("Çözünen", "Solute"), options: [[1, T("Şeker (iyonlaşmaz, i = 1)", "Sugar (i = 1)")], [2, T("NaCl (Na⁺ + Cl⁻, i = 2)", "NaCl (i = 2)")], [3, T("CaCl₂ (i = 3)", "CaCl₂ (i = 3)")]], value: 2 },
      { id: "m", label: T("Molalite (mol / kg su)", "Molality"), min: 0, max: 5, step: 0.1, value: 1, unit: "m" }
    ],
    ratio: 0.55,
    tasks: () => [T("Kışın yollara neden tuz (ya da CaCl₂) dökülür? Hangisi daha etkili?", "Why salt the roads? Which salt works better?"), T("Suyun donma noktasını −10 °C yapmak için kaç molal NaCl gerekir?", "What NaCl molality freezes at −10 °C?")],
    draw(ctx, W, H, p, t, c) {
      const dTb = 0.52 * p.m * p.i, dTf = 1.86 * p.m * p.i;
      const therm = (x, val, lo, hi, col, ttl, ref) => { const top = 26, bot = H - 40, hh = bot - top; ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.strokeRect(x - 8, top, 16, hh); dot(ctx, x, bot + 10, 13, col);
        const yv = bot - ((val - lo) / (hi - lo)) * hh; ctx.fillStyle = col; ctx.fillRect(x - 5, yv, 10, bot - yv + 4);
        const yr = bot - ((ref - lo) / (hi - lo)) * hh; ctx.setLineDash([3, 3]); ctx.strokeStyle = c.muted; ctx.beginPath(); ctx.moveTo(x - 30, yr); ctx.lineTo(x + 30, yr); ctx.stroke(); ctx.setLineDash([]);
        label(ctx, fmt(val, 2) + " °C", x + 18, yv, c.text, "left", 12); label(ctx, ttl, x, 12, c.muted, "center", 11); };
      therm(W * 0.28, 100 + dTb, 98, 108, c.bad, T("kaynama noktası", "boiling point"), 100);
      therm(W * 0.68, -dTf, -30, 2, c.accent, T("donma noktası", "freezing point"), 0);
      return { html: row(T("Tanecik derişimi m·i", "Particle molality"), fmt(p.m * p.i, 2)) + row(T("ΔTₖ = 0,52·m·i", "ΔTb"), "+" + fmt(dTb, 2) + " °C") + row(T("ΔT_d = 1,86·m·i", "ΔTf"), "−" + fmt(dTf, 2) + " °C"),
        note: T("Uçucu olmayan bir madde çözünürse çözücünün buhar basıncı düşer: kaynama noktası yükselir, donma noktası alçalır. Etki maddenin türüne değil, çözeltideki tanecik sayısına bağlıdır; bu yüzden 1 mol CaCl₂, 1 mol şekerden üç kat etkilidir.",
          "Dissolved particles raise the boiling point and lower the freezing point; only their number matters.") };
    }
  }, ["10/kimya/u3/k6"]);

  /* ======================= 11. SINIF ======================= */

  add("entalpi", {
    title: () => T("Tepkime enerjisi diyagramı", "Reaction energy diagram"), icon: "chart", tags: "ekzotermik endotermik aktivasyon enerjisi katalizör entalpi",
    desc: () => T("Tepkime entalpisini (ΔH) ve aktivasyon enerjisini ayarla, katalizör ekle; potansiyel enerji diyagramını yorumla.", "Set ΔH and activation energy, add a catalyst; read the potential energy diagram."),
    params: () => [
      { id: "dH", label: T("ΔH (tepkime ısısı)", "ΔH"), min: -300, max: 300, step: 10, value: -100, unit: "kJ" },
      { id: "Ea", label: T("Aktivasyon enerjisi (ileri)", "Activation energy"), min: 20, max: 400, step: 10, value: 150, unit: "kJ" },
      { id: "cat", type: "toggle", label: T("Katalizör ekle", "Add catalyst"), value: false }
    ],
    ratio: 0.62,
    tasks: () => [T("Ekzotermik bir tepkimede geri tepkimenin aktivasyon enerjisini hesapla.", "Compute the reverse activation energy for an exothermic reaction."), T("Katalizör ΔH'yi değiştirir mi?", "Does a catalyst change ΔH?")],
    draw(ctx, W, H, p, t, c) {
      const Ea = Math.max(p.Ea, p.dH + 10), Ec = p.cat ? Math.max(p.dH + 5, Ea * 0.55) : null;
      const lo = Math.min(0, p.dH) - 40, hi = Math.max(Ea, 0) + 40, F = frame(56, 14, W - 70, H - 40, 0, 1, lo, hi);
      axes(ctx, F, c, { labels: false }); label(ctx, T("potansiyel enerji", "potential energy"), 60, 10, c.muted, "left", 10); label(ctx, T("tepkime koordinatı", "reaction coordinate"), W - 14, H - 14, c.muted, "right", 10);
      // girenler (0) → tepe → ürünler (ΔH); tepe yüksekliği tam "peak" olacak biçimde ölçeklenir
      const curveFor = (peak) => {
        const base = (u) => p.dH * (3 * u * u - 2 * u * u * u), bump = (u) => Math.sin(Math.PI * u) ** 2;
        const mx = (A) => { let m = -1e9; for (let i = 0; i <= 100; i++) { const u = i / 100; m = Math.max(m, base(u) + A * bump(u)); } return m; };
        let lo = 0, hi = 2000; for (let i = 0; i < 40; i++) { const A = (lo + hi) / 2; if (mx(A) > peak) hi = A; else lo = A; }
        const A = lo;
        return (x) => (x <= 0.2 ? 0 : x >= 0.8 ? p.dH : base((x - 0.2) / 0.6) + A * bump((x - 0.2) / 0.6));
      };
      const scaleCurve = curveFor;
      const main = scaleCurve(Ea); plot(ctx, F, main, c.accent, 2.6);
      if (Ec != null) plot(ctx, F, scaleCurve(Ec), c.good, 2, [6, 4]);
      ctx.strokeStyle = c.grid; ctx.setLineDash([3, 4]); [0, p.dH].forEach((v) => { ctx.beginPath(); ctx.moveTo(F.px, F.Y(v)); ctx.lineTo(F.px + F.pw, F.Y(v)); ctx.stroke(); }); ctx.setLineDash([]);
      arrow(ctx, F.X(0.12), F.Y(0), F.X(0.12), F.Y(Ea), c.warn, 1.8); label(ctx, "Ea", F.X(0.12) - 6, F.Y(Ea / 2), c.warn, "right", 12);
      arrow(ctx, F.X(0.9), F.Y(0), F.X(0.9), F.Y(p.dH), p.dH < 0 ? c.bad : c.violet, 1.8); label(ctx, "ΔH", F.X(0.9) + 6, F.Y(p.dH / 2), p.dH < 0 ? c.bad : c.violet, "left", 12);
      label(ctx, T("girenler", "reactants"), F.X(0.08), F.Y(0) - 10, c.text, "center", 11); label(ctx, T("ürünler", "products"), F.X(0.92), F.Y(p.dH) - 10, c.text, "center", 11);
      return { html: row(T("Tepkime türü", "Type"), p.dH < 0 ? T("ekzotermik (ısı verir)", "exothermic") : p.dH > 0 ? T("endotermik (ısı alır)", "endothermic") : "—") + row(T("İleri Ea", "Forward Ea"), fmt(Ea, 0) + " kJ") +
        row(T("Geri Ea = Ea − ΔH", "Reverse Ea"), fmt(Ea - p.dH, 0) + " kJ") + (Ec != null ? row(key(c.good) + T("Katalizörlü Ea", "Catalysed Ea"), fmt(Ec, 0) + " kJ") : ""),
        note: T("ΔH = ürünlerin enerjisi − girenlerin enerjisi. Aktivasyon enerjisi, tepkimenin başlaması için aşılması gereken enerji tepesidir. Katalizör farklı bir mekanizma sunarak Ea'yı düşürür, hızı artırır; ΔH'yi değiştirmez.",
          "ΔH = products − reactants. A catalyst lowers Ea but not ΔH.") };
    }
  }, ["11/kimya/u1/k1", "11/kimya/u1/k2"]);

  add("tepkimehizi", {
    title: () => T("Tepkime hızı: sıcaklık, derişim, katalizör", "Reaction rate: temperature, concentration, catalyst"), icon: "timer", tags: "çarpışma teorisi maxwell boltzmann aktifleşmiş kompleks",
    desc: () => T("Sıcaklığı, derişimi ve aktivasyon enerjisini değiştir; enerji dağılım eğrisinde Ea'yı aşan taneciklerin payını ve etkin çarpışmaları gör.", "Change T, concentration and Ea; see the fraction of particles above Ea."),
    params: () => [
      { id: "T", label: T("Sıcaklık", "Temperature"), min: 250, max: 600, step: 10, value: 300, unit: "K" },
      { id: "c", label: T("Derişim", "Concentration"), min: 0.1, max: 2, step: 0.1, value: 1, unit: "M" },
      { id: "Ea", label: T("Aktivasyon enerjisi", "Activation energy"), min: 5, max: 30, step: 1, value: 15, unit: "kJ/mol" },
      { id: "cat", type: "toggle", label: T("Katalizör (Ea %40 düşer)", "Catalyst (−40% Ea)"), value: false }
    ],
    animated: true, loop: true, ratio: 0.62,
    init(p) { return { pts: Array.from({ length: 40 }, () => ({ x: Math.random(), y: Math.random(), a: Math.random() * 7 })), flash: [] }; },
    tasks: () => [T("Sıcaklığı 300 K'den 310 K'e çıkar: hız yaklaşık kaç katına çıkıyor?", "Raise T by 10 K: how much faster?"), T("Katalizörün eğrinin şeklini değil, Ea çizgisini değiştirdiğine dikkat et.", "Notice the catalyst moves the Ea line, not the curve.")],
    draw(ctx, W, H, p, t, c, s) {
      const R = 8.314e-3, Ea = p.Ea * (p.cat ? 0.6 : 1);
      const f = (E, T0) => 2 * Math.sqrt(E / Math.PI) * Math.pow(1 / (R * T0), 1.5) * Math.exp(-E / (R * T0));
      const frac = (T0, e0) => { let s1 = 0; for (let E = e0; E < 60; E += 0.05) s1 += f(E, T0) * 0.05; return s1; };
      const F = frame(44, 14, W * 0.6 - 44, H - 40, 0, 30, 0, f(R * 250 / 2, 250) * 1.15);
      axes(ctx, F, c, { xName: "E (kJ/mol)", yName: T("tanecik payı", "fraction"), labels: false });
      ctx.fillStyle = c.warn + "55"; ctx.beginPath(); ctx.moveTo(F.X(Ea), F.Y(0)); for (let E = Ea; E <= 30; E += 0.2) ctx.lineTo(F.X(E), F.Y(f(E, p.T))); ctx.lineTo(F.X(30), F.Y(0)); ctx.closePath(); ctx.fill();
      plot(ctx, F, (E) => f(E, 300), c.muted, 1.3, [4, 4]); plot(ctx, F, (E) => f(E, p.T), c.accent, 2.4);
      ctx.strokeStyle = c.bad; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(F.X(Ea), F.py); ctx.lineTo(F.X(Ea), F.py + F.ph); ctx.stroke(); label(ctx, "Ea", F.X(Ea) + 4, F.py + 8, c.bad, "left", 12);
      const fr = frac(p.T, Ea), fr0 = frac(300, p.Ea), rate = p.c * p.c * fr / (fr0 || 1e-12);
      // tanecik kutusu
      const bx = W * 0.64, bw = W * 0.33, by = 20, bh = H - 60, n = Math.round(10 + p.c * 15), sp = Math.sqrt(p.T / 300) * 0.004;
      ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.strokeRect(bx, by, bw, bh);
      s.pts.slice(0, n).forEach((q, i) => { q.x += Math.cos(q.a) * sp; q.y += Math.sin(q.a) * sp * bw / bh; if (q.x < 0 || q.x > 1) q.a = Math.PI - q.a; if (q.y < 0 || q.y > 1) q.a = -q.a; q.x = Math.max(0, Math.min(1, q.x)); q.y = Math.max(0, Math.min(1, q.y)); dot(ctx, bx + 4 + q.x * (bw - 8), by + 4 + q.y * (bh - 8), 3.5, i % 2 ? c.accent : c.good); });
      if (Math.random() < Math.min(0.9, rate * 0.05)) s.flash.push({ x: bx + 10 + Math.random() * (bw - 20), y: by + 10 + Math.random() * (bh - 20), t: 0 });
      s.flash = s.flash.filter((q) => (q.t += 0.03) < 1); s.flash.forEach((q) => { ctx.strokeStyle = "rgba(255,200,80," + (1 - q.t) + ")"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(q.x, q.y, 4 + q.t * 14, 0, 7); ctx.stroke(); });
      label(ctx, T("parlamalar = etkin çarpışma", "flashes = effective collisions"), bx + bw / 2, by + bh + 14, c.muted, "center", 10);
      return { html: row(T("Ea'yı aşan taneciklerin payı", "Fraction above Ea"), "%" + fmt(fr * 100, 2)) + row(T("Göreli hız (300 K, katalizörsüz = 1)", "Relative rate"), "×" + fmt(rate, 2)) + row(T("Uygulanan Ea", "Effective Ea"), fmt(Ea, 1) + " kJ/mol"),
        note: T("Tepkime için tanecikler uygun yönde ve yeterli enerjiyle çarpışmalıdır. Sıcaklık artınca eğri sağa yayılır, Ea'yı aşan pay hızla büyür. Derişim artınca çarpışma sayısı artar. Katalizör Ea'yı düşürür. (Burada hız = k·[A]·[B] varsayıldı.)",
          "Only collisions above Ea react. Heat spreads the curve; concentration adds collisions; catalysts lower Ea.") };
    }
  }, ["11/kimya/u1/k3", "11/kimya/u1/k4"]);

  add("denge", {
    title: () => T("Kimyasal denge ve Le Chatelier", "Chemical equilibrium and Le Chatelier"), icon: "refresh", tags: "denge sabiti Kc tepkime oranı N2O4 NO2",
    desc: () => T("N₂O₄ (renksiz) ⇌ 2NO₂ (kahverengi). Başlangıç derişimlerini seç ve sıcaklığı oynayarak dengenin hangi yöne kaydığını izle.", "N₂O₄ ⇌ 2NO₂: change temperature and watch equilibrium shift."),
    params: () => [
      { id: "a0", label: T("Başlangıç [N₂O₄]", "Initial [N₂O₄]"), min: 0, max: 0.1, step: 0.005, value: 0.05, unit: "M" },
      { id: "b0", label: T("Başlangıç [NO₂]", "Initial [NO₂]"), min: 0, max: 0.1, step: 0.005, value: 0, unit: "M" },
      { id: "T", label: T("Sıcaklık", "Temperature"), min: 273, max: 400, step: 1, value: 298, unit: "K", hint: T("İleri tepkime endotermik (ΔH = +57 kJ)", "Forward is endothermic") }
    ],
    animated: true, loop: true, ratio: 0.6, keep: true,
    init(p) { return { a: p.a0, b: p.b0, hist: [], tt: 0, k0: [p.a0, p.b0] }; },
    adapt(s, p) { if (s.k0[0] !== p.a0 || s.k0[1] !== p.b0) { s.a = p.a0; s.b = p.b0; s.hist = []; s.tt = 0; s.k0 = [p.a0, p.b0]; } },
    step(s, p, dt) {
      const Kc = 4.6e-3 * Math.exp(-57200 / 8.314 * (1 / p.T - 1 / 298)), kf = 1.5, kr = kf / Kc, n = 20, h = dt / n;
      for (let i = 0; i < n; i++) { const r = kf * s.a - kr * s.b * s.b; s.a = Math.max(0, s.a - r * h); s.b = Math.max(0, s.b + 2 * r * h); }
      s.tt += dt; s.hist.push([s.tt, s.a, s.b]); if (s.hist.length > 600) s.hist.shift();
    },
    tasks: () => [T("Sıcaklığı artır: renk koyulaşıyor mu? Denge hangi yöne kaydı?", "Raise T: does the colour darken?"), T("Yalnızca NO₂ ile başla: denge nereye gider? Kc aynı mı kalıyor?", "Start with NO₂ only: is Kc the same?")],
    draw(ctx, W, H, p, t, c, s) {
      const Kc = 4.6e-3 * Math.exp(-57200 / 8.314 * (1 / p.T - 1 / 298)), Q = s.a > 0 ? s.b * s.b / s.a : Infinity;
      const t0 = s.hist.length ? s.hist[0][0] : 0, t1 = Math.max(t0 + 10, s.tt);
      const F = frame(48, 14, W * 0.62 - 48, H - 40, t0, t1, 0, 0.12);
      axes(ctx, F, c, { xName: "t", yName: "M", labels: false });
      [[1, c.accent, "N₂O₄"], [2, "#c0672a", "NO₂"]].forEach(([k, col]) => { ctx.strokeStyle = col; ctx.lineWidth = 2.4; ctx.beginPath(); s.hist.forEach((h0, i) => (i ? ctx.lineTo(F.X(h0[0]), F.Y(h0[k])) : ctx.moveTo(F.X(h0[0]), F.Y(h0[k])))); ctx.stroke(); });
      // balon
      const fx = W * 0.8, fy = H * 0.5, rr = Math.min(W * 0.15, H * 0.3), br = Math.min(0.95, s.b * 14);
      ctx.fillStyle = "rgba(150,70,20," + br + ")"; ctx.beginPath(); ctx.arc(fx, fy, rr, 0, 7); ctx.fill(); ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.stroke(); ctx.strokeRect(fx - 10, fy - rr - 30, 20, 32);
      const dir = Math.abs(Q - Kc) / Kc < 0.02 ? T("dengede", "at equilibrium") : Q < Kc ? T("ileri (→ NO₂ artar)", "forward") : T("geri (← N₂O₄ artar)", "reverse");
      return { html: row(key(c.accent) + "[N₂O₄]", fmt(s.a, 4) + " M") + row(key("#c0672a") + "[NO₂]", fmt(s.b, 4) + " M") + row("Kc = [NO₂]² / [N₂O₄]", sci(Kc)) + row(T("Tepkime oranı Q", "Reaction quotient Q"), isFinite(Q) ? sci(Q) : "∞") + row(T("Kayma yönü", "Shift"), dir),
        note: T("Dengede ileri ve geri tepkime hızları eşittir; derişimler sabit kalır ama tepkime durmaz. Q < K ise tepkime ileri, Q > K ise geri yürür. Le Chatelier: dengeye bir etki yapılırsa sistem bu etkiyi azaltacak yöne kayar — endotermik yönde ısıtınca ürün artar.",
          "At equilibrium forward and reverse rates are equal. Q < K → forward; Q > K → reverse. Le Chatelier: the system opposes the change.") };
    }
  }, ["11/kimya/u2/k1", "11/kimya/u2/k2"]);

  const SUBS = () => [
    ["HCl", T("HCl (kuvvetli asit)", "HCl (strong acid)"), { acid: 1e8 }], ["CH3COOH", T("CH₃COOH (zayıf asit, Ka = 1,8×10⁻⁵)", "Acetic acid (weak)"), { acid: 1.8e-5 }],
    ["NaOH", T("NaOH (kuvvetli baz)", "NaOH (strong base)"), { sb: 1 }], ["NH3", T("NH₃ (zayıf baz, Kb = 1,8×10⁻⁵)", "Ammonia (weak base)"), { base: 1.8e-5 }],
    ["NaCl", T("NaCl (nötr tuz)", "NaCl (neutral salt)"), {}]
  ];
  const IND = (pH) => [
    [T("Turnusol", "Litmus"), pH < 5 ? "#e0453a" : pH > 8 ? "#3a63e0" : "#9b59b6"],
    [T("Fenolftalein", "Phenolphthalein"), pH > 8.2 ? "#e055b8" : "rgba(255,255,255,.12)"],
    [T("Metil oranj", "Methyl orange"), pH < 3.1 ? "#e0453a" : pH > 4.4 ? "#f2c23d" : "#f08a2f"],
    [T("Evrensel", "Universal"), "hsl(" + Math.max(0, Math.min(280, pH * 20)) + ",80%,55%)"]
  ];
  add("ph", {
    title: () => T("pH, asitler ve bazlar", "pH, acids and bases"), icon: "chart", tags: "pOH ayıraç indikatör turnusol kuvvetli zayıf",
    desc: () => T("Maddeyi ve derişimini seç; pH, pOH, [H⁺] ve [OH⁻] değerlerini, ayıraçların rengini ve pH ölçeğindeki yerini gör.", "Pick a substance and concentration; see pH, indicators and the pH scale."),
    params: () => [
      { id: "s", type: "select", label: T("Madde", "Substance"), options: SUBS().map((x) => [x[0], x[1]]), value: "HCl" },
      { id: "lc", label: T("Derişim (log)", "Concentration (log)"), min: -7, max: 0, step: 0.5, value: -2, hint: T("−2 → 0,01 M", "−2 → 0.01 M") }
    ],
    ratio: 0.5,
    tasks: () => [T("0,01 M HCl ile 0,01 M CH₃COOH'in pH'ını karşılaştır. Neden farklı?", "Compare 0.01 M HCl and acetic acid."), T("Derişimi 10 kat azalt: kuvvetli asidin pH'ı kaç birim değişir?", "Dilute 10×: how does pH change?")],
    draw(ctx, W, H, p, t, c) {
      const C0 = Math.pow(10, p.lc), sub = SUBS().find((x) => x[0] === p.s) || SUBS()[0], k = sub[2];
      const pH = solvePH({ ca: k.acid ? C0 : 0, Ka: k.acid || 1, cb: k.base ? C0 : 0, Kb: k.base || 1, cs: k.sb ? C0 : 0 });
      const x0 = 20, x1 = W - 20, y = 40, w = x1 - x0;
      for (let i = 0; i < w; i++) { ctx.fillStyle = "hsl(" + (i / w) * 280 + ",75%,52%)"; ctx.fillRect(x0 + i, y, 1, 26); }
      for (let i = 0; i <= 14; i++) label(ctx, String(i), x0 + (w * i) / 14, y + 38, c.muted, "center", 10);
      const px = x0 + (w * Math.max(0, Math.min(14, pH))) / 14; ctx.fillStyle = c.text; ctx.beginPath(); ctx.moveTo(px, y - 2); ctx.lineTo(px - 7, y - 14); ctx.lineTo(px + 7, y - 14); ctx.closePath(); ctx.fill();
      [[1, T("mide asidi", "stomach")], [2.5, T("limon", "lemon")], [4, T("domates", "tomato")], [7, T("saf su", "water")], [8.3, T("deniz suyu", "sea water")], [11, T("amonyak", "ammonia")], [13, T("çamaşır suyu", "bleach")]].forEach(([v, nm], i) =>
        label(ctx, nm, x0 + (w * v) / 14, y + 54 + (i % 2) * 12, c.muted, "center", 9));
      const IN = IND(pH), tw = Math.min(70, (W - 40) / 4 - 14);
      IN.forEach(([nm, col], i) => { const tx = 20 + i * (tw + 18) + (W - 40 - 4 * (tw + 18)) / 2; ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.strokeRect(tx, H - 90, tw, 60); ctx.fillStyle = col; ctx.fillRect(tx + 2, H - 70, tw - 4, 38); label(ctx, nm, tx + tw / 2, H - 16, c.muted, "center", 10); });
      const h = Math.pow(10, -pH);
      const f2 = (x) => x.toFixed(2).replace(".", App.i18n.lang === "en" ? "." : ",");
      return { html: row("pH", f2(pH)) + row("pOH", f2(14 - pH)) + row("[H⁺]", sci(h) + " M") + row("[OH⁻]", sci(1e-14 / h) + " M") + row(T("Ortam", "Medium"), pH < 6.95 ? T("asidik", "acidic") : pH > 7.05 ? T("bazik", "basic") : T("nötr", "neutral")),
        note: T("pH = −log[H⁺], 25 °C'de pH + pOH = 14. Kuvvetli asitler tamamen iyonlaşır; zayıf asitler kısmen (Ka küçük), bu yüzden aynı derişimde pH'ları daha yüksektir. Her 1 birim pH farkı [H⁺]'de 10 kat fark demektir.",
          "pH = −log[H⁺], pH + pOH = 14. Strong acids ionise fully, weak ones partly.") };
    }
  }, ["11/kimya/u2/k3", "11/kimya/u2/k4"]);

  add("titrasyon", {
    title: () => T("Asit–baz titrasyonu", "Acid–base titration"), icon: "chart", tags: "nötrleşme dönüm noktası eşdeğerlik tampon indikatör",
    desc: () => T("25 mL 0,1 M asidin üstüne 0,1 M NaOH damlat; titrasyon eğrisini, eşdeğerlik noktasını ve uygun ayıracı gör.", "Add 0.1 M NaOH to 25 mL of 0.1 M acid; see the titration curve and equivalence point."),
    params: () => [
      { id: "acid", type: "select", label: T("Asit", "Acid"), options: [["HCl", T("HCl (kuvvetli)", "HCl (strong)")], ["CH3COOH", T("CH₃COOH (zayıf)", "Acetic (weak)")]], value: "HCl" },
      { id: "V", label: T("Eklenen NaOH", "NaOH added"), min: 0, max: 50, step: 0.5, value: 12.5, unit: "mL" },
      { id: "ind", type: "select", label: T("Ayıraç", "Indicator"), options: [["fen", T("Fenolftalein (8,2–10)", "Phenolphthalein")], ["mo", T("Metil oranj (3,1–4,4)", "Methyl orange")], ["bb", T("Bromtimol mavisi (6–7,6)", "Bromothymol blue")]], value: "fen" }
    ],
    ratio: 0.62,
    tasks: () => [T("Zayıf asitte eşdeğerlik noktasındaki pH neden 7'den büyük?", "Why is the weak-acid equivalence pH above 7?"), T("Yarı nötrleşme noktasında (12,5 mL) pH = pKa olduğunu doğrula.", "Check pH = pKa at half-neutralisation.")],
    draw(ctx, W, H, p, t, c) {
      const Ka = p.acid === "HCl" ? 1e8 : 1.8e-5, Va = 25, Ca = 0.1, Cb = 0.1;
      const pHat = (V) => { const Vt = (Va + V) / 1000; return solvePH({ ca: Ca * Va / 1000 / Vt, Ka, cs: Cb * V / 1000 / Vt }); };
      const F = frame(44, 14, W * 0.66 - 44, H - 40, 0, 50, 0, 14);
      axes(ctx, F, c, { xName: "V (mL)", yName: "pH", stepY: 2, step: 10 });
      const rng = { fen: [8.2, 10, "#e055b8"], mo: [3.1, 4.4, "#f08a2f"], bb: [6, 7.6, "#3aa0e0"] }[p.ind];
      ctx.fillStyle = rng[2] + "30"; ctx.fillRect(F.px, F.Y(rng[1]), F.pw, F.Y(rng[0]) - F.Y(rng[1]));
      plot(ctx, F, pHat, c.accent, 2.4);
      const pH = pHat(p.V); dot(ctx, F.X(p.V), F.Y(pH), 5.5, c.warn); dot(ctx, F.X(25), F.Y(pHat(25)), 4, c.good);
      // erlen
      const fx = W * 0.83, fy = H * 0.55, col = p.ind === "fen" ? (pH > 8.2 ? "#e055b8" : "rgba(255,255,255,.12)") : p.ind === "mo" ? (pH < 3.1 ? "#e0453a" : pH > 4.4 ? "#f2c23d" : "#f08a2f") : (pH < 6 ? "#f2d23d" : pH > 7.6 ? "#3a63e0" : "#5cb85c");
      ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(fx - 12, fy - 50); ctx.lineTo(fx + 12, fy - 50); ctx.lineTo(fx + 44, fy + 40); ctx.lineTo(fx - 44, fy + 40); ctx.closePath(); ctx.fill(); ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.stroke();
      ctx.strokeRect(fx - 4, 10, 8, fy - 70); ctx.fillStyle = c.accent + "55"; ctx.fillRect(fx - 3, 10 + (fy - 70) * (p.V / 50), 6, (fy - 70) * (1 - p.V / 50));
      return { html: row(T("pH", "pH"), fmt(pH, 2)) + row(T("Eşdeğerlik noktası", "Equivalence point"), "25 mL · pH " + fmt(pHat(25), 2)) + (p.acid !== "HCl" ? row("pKa", fmt(-Math.log10(Ka), 2)) : "") +
        row(T("Ayıraç uygun mu?", "Suitable indicator?"), pHat(24.9) < rng[1] && pHat(25.1) > rng[0] ? "✓" : T("✗ renk dönümü erken/geç olur", "✗ changes too early/late")),
        note: T("Eşdeğerlik noktasında asidin ve bazın mol sayıları eşittir (Mₐ·Vₐ = M_b·V_b). Kuvvetli asit–kuvvetli bazda pH = 7'dir; zayıf asit–kuvvetli bazda tuzun hidrolizi nedeniyle pH > 7 olur. Ayıracın renk dönüm aralığı dik bölgeye düşmelidir. Zayıf asitte eğrinin yatık bölgesi tampondur.",
          "At equivalence moles of acid and base are equal. Weak acid → pH > 7. Choose an indicator whose range sits on the steep part.") };
    }
  }, ["11/kimya/u2/k4"]);

  const KSP = () => [["AgCl", "AgCl", 1.8e-10, 1], ["BaSO4", "BaSO₄", 1.1e-10, 1], ["PbI2", "PbI₂", 7.1e-9, 2], ["CaF2", "CaF₂", 3.9e-11, 2]];
  add("ksp", {
    title: () => T("Çözünürlük dengesi ve ortak iyon", "Solubility equilibrium and common ion"), icon: "layers", tags: "Ksp çözünürlük çarpımı çökelme",
    desc: () => T("Az çözünen bir tuz seç ve çözeltiye ortak iyon ekle; çözünürlüğün ne kadar düştüğünü gör.", "Pick a sparingly soluble salt and add a common ion; see solubility drop."),
    params: () => [
      { id: "s", type: "select", label: T("Tuz", "Salt"), options: KSP().map((x) => [x[0], x[1] + " (Ksp = " + sci(x[2]) + ")"]), value: "AgCl" },
      { id: "lc", label: T("Ortak anyon derişimi (log)", "Common anion (log)"), min: -6, max: -1, step: 0.25, value: -3 }
    ],
    ratio: 0.5,
    tasks: () => [T("Saf suda AgCl'nin çözünürlüğünü √Ksp ile hesapla.", "Compute AgCl solubility in pure water."), T("0,1 M NaCl'de AgCl çözünürlüğü kaç kat azalır?", "How much less soluble in 0.1 M NaCl?")],
    draw(ctx, W, H, p, t, c) {
      const [, nm, K, n] = KSP().find((x) => x[0] === p.s) || KSP()[0], cc = Math.pow(10, p.lc);
      const sOf = (x) => { let lo = 0, hi = 1; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; const v = n === 1 ? m * (m + x) : m * Math.pow(2 * m + x, 2); if (v > K) hi = m; else lo = m; } return lo; };
      const s0 = sOf(0), s1 = sOf(cc);
      const F = frame(48, 14, W - 62, H - 40, -6, -1, Math.log10(s0) - 6, Math.log10(s0) + 0.5);
      axes(ctx, F, c, { xName: T("log[ortak iyon]", "log[common ion]"), yName: "log s", labels: true, step: 1, stepY: 1 });
      plot(ctx, F, (x) => Math.log10(sOf(Math.pow(10, x))), c.accent, 2.4);
      ctx.setLineDash([4, 4]); ctx.strokeStyle = c.muted; ctx.beginPath(); ctx.moveTo(F.px, F.Y(Math.log10(s0))); ctx.lineTo(F.px + F.pw, F.Y(Math.log10(s0))); ctx.stroke(); ctx.setLineDash([]);
      dot(ctx, F.X(p.lc), F.Y(Math.log10(s1)), 5.5, c.warn);
      return { html: row(T("Saf sudaki çözünürlük", "In pure water"), sci(s0) + " M") + row(T("Ortak iyonla", "With common ion"), sci(s1) + " M") + row(T("Azalma", "Decrease"), "×" + fmt(s0 / s1, s0 / s1 > 100 ? 0 : 1)),
        note: T("Az çözünen tuzlar doymuş çözeltide iyonlarıyla dengededir: Ksp = [M⁺]ᵃ[X⁻]ᵇ. Çözeltide tuzun iyonlarından biri zaten varsa denge sola kayar ve çözünürlük azalır (ortak iyon etkisi).",
          "Ksp = [M]^a[X]^b. A common ion pushes the equilibrium back and lowers solubility.") };
    }
  }, ["11/kimya/u2/k5"]);

  /* ======================= 12. SINIF ======================= */

  const POT = () => [["Mg", -2.37, "Mg²⁺", 2, 24.3], ["Al", -1.66, "Al³⁺", 3, 27], ["Zn", -0.76, "Zn²⁺", 2, 65.4], ["Fe", -0.44, "Fe²⁺", 2, 55.8], ["Pb", -0.13, "Pb²⁺", 2, 207], ["Cu", 0.34, "Cu²⁺", 2, 63.5], ["Ag", 0.8, "Ag⁺", 1, 107.9]];
  add("pil", {
    title: () => T("Galvanik pil", "Galvanic cell"), icon: "lightbulb", tags: "elektrokimya anot katot tuz köprüsü standart potansiyel redoks",
    desc: () => T("İki metal seç; hangisinin anot (yükseltgenen), hangisinin katot (indirgenen) olduğunu, pil gerilimini ve elektron akışını gör.", "Pick two metals; see the anode, cathode, cell voltage and electron flow."),
    params: () => [
      { id: "a", type: "select", label: T("1. yarı hücre", "Half-cell 1"), options: POT().map((x) => [x[0], x[0] + " / " + x[2] + " (E° = " + fmt(x[1], 2) + " V)"]), value: "Zn" },
      { id: "b", type: "select", label: T("2. yarı hücre", "Half-cell 2"), options: POT().map((x) => [x[0], x[0] + " / " + x[2] + " (E° = " + fmt(x[1], 2) + " V)"]), value: "Cu" }
    ],
    animated: true, loop: true, ratio: 0.6,
    tasks: () => [T("En yüksek gerilimli pili kur.", "Build the highest-voltage cell."), T("Zn–Cu pilinde zamanla hangi elektrot incelir, hangisi kalınlaşır?", "Which electrode thins in Zn–Cu?"), T("Tuz köprüsü olmazsa ne olur?", "What if there is no salt bridge?")],
    draw(ctx, W, H, p, t, c) {
      const A = POT().find((x) => x[0] === p.a), B = POT().find((x) => x[0] === p.b);
      const an = A[1] <= B[1] ? A : B, ca = an === A ? B : A, E0 = ca[1] - an[1];
      const lx = W * 0.25, rx = W * 0.75, by = H * 0.45, bw = W * 0.3, bh = H * 0.45;
      [[lx, an, T("anot (−)", "anode (−)")], [rx, ca, T("katot (+)", "cathode (+)")]].forEach(([x, m, nm], i) => {
        ctx.fillStyle = i ? c.accent + "40" : c.good + "40"; ctx.fillRect(x - bw / 2, by, bw, bh); ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.strokeRect(x - bw / 2, by - 10, bw, bh + 10);
        const thick = 14 + (E0 > 0 ? (i ? 1 : -1) * Math.min(8, (t % 30) * 0.25) : 0);
        ctx.fillStyle = "#a9adb5"; ctx.fillRect(x - thick / 2, by - 40, thick, bh * 0.8);
        label(ctx, m[0], x, by - 50, c.text, "center", 14); label(ctx, nm, x, by + bh + 16, c.muted, "center", 11); label(ctx, m[2], x + bw * 0.25, by + bh * 0.7, c.text, "center", 12);
      });
      // tel ve voltmetre
      ctx.strokeStyle = c.text; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx, by - 40); ctx.lineTo(lx, 20); ctx.lineTo(rx, 20); ctx.lineTo(rx, by - 40); ctx.stroke();
      dot(ctx, W / 2, 20, 18, c.bg); ctx.strokeStyle = c.text; ctx.beginPath(); ctx.arc(W / 2, 20, 18, 0, 7); ctx.stroke(); label(ctx, fmt(E0, 2) + "V", W / 2, 20, c.text, "center", 11);
      if (E0 > 0) for (let i = 0; i < 6; i++) { const u = ((t * 0.4 + i / 6) % 1), path = (by - 60) * 2 + (rx - lx); let d = u * path, x, y; if (d < by - 60) { x = lx; y = by - 40 - d; } else if ((d -= by - 60) < rx - lx) { x = lx + d; y = 20; } else { d -= rx - lx; x = rx; y = 20 + d; } dot(ctx, x, y, 3.5, c.warn); label(ctx, "e⁻", x + 8, y - 8, c.warn, "left", 9); }
      // tuz köprüsü
      ctx.strokeStyle = c.muted; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(lx + bw * 0.35, by + 20); ctx.lineTo(lx + bw * 0.35, by - 25); ctx.lineTo(rx - bw * 0.35, by - 25); ctx.lineTo(rx - bw * 0.35, by + 20); ctx.stroke();
      return { html: row(T("Anot (yükseltgenir)", "Anode (oxidised)"), an[0] + " → " + an[2] + " + " + an[3] + "e⁻") + row(T("Katot (indirgenir)", "Cathode (reduced)"), ca[2] + " + " + ca[3] + "e⁻ → " + ca[0]) +
        row(T("Pil gerilimi E° = E°katot − E°anot", "E°cell"), fmt(E0, 2) + " V") + row(T("Kendiliğinden mi?", "Spontaneous?"), E0 > 0 ? T("evet", "yes") : T("hayır (aynı metal)", "no")),
        note: T("Standart indirgenme potansiyeli küçük olan metal elektron verir (anot, kütlesi azalır); büyük olanın iyonları elektron alır (katot, kütlesi artar). Elektronlar dış devrede anottan katoda akar; tuz köprüsündeki iyonlar yük dengesini sağlar.",
          "The metal with lower E° is oxidised (anode); electrons flow to the cathode; the salt bridge balances charge.") };
    }
  }, ["12/kimya/u1/k1", "12/kimya/u1/k2", "12/kimya/u1/k3"]);

  add("elektroliz", {
    title: () => T("Elektroliz ve Faraday yasası", "Electrolysis and Faraday's law"), icon: "lightbulb", tags: "kaplama yük miktarı mol elektron",
    desc: () => T("Akımı, süreyi ve indirgenen iyonu seç; katotta toplanan metal kütlesini Faraday yasasıyla hesapla.", "Choose current, time and ion; compute the metal deposited."),
    params: () => [
      { id: "I", label: T("Akım", "Current"), min: 0.5, max: 10, step: 0.5, value: 2, unit: "A" },
      { id: "t", label: T("Süre", "Time"), min: 1, max: 120, step: 1, value: 30, unit: T("dk", "min") },
      { id: "ion", type: "select", label: T("İyon", "Ion"), options: [["Cu", "Cu²⁺ → Cu (63,5)"], ["Ag", "Ag⁺ → Ag (108)"], ["Al", "Al³⁺ → Al (27)"], ["Ni", "Ni²⁺ → Ni (58,7)"]], value: "Cu" }
    ],
    ratio: 0.5,
    tasks: () => [T("Aynı yükle Ag ve Cu'dan hangisinden daha çok kütle birikir? Neden?", "Same charge: Ag or Cu deposits more mass?"), T("1 mol elektron kaç coulomb'dur?", "How many coulombs is a mole of electrons?")],
    draw(ctx, W, H, p, t, c) {
      const D = { Cu: [63.5, 2], Ag: [108, 1], Al: [27, 3], Ni: [58.7, 2] }[p.ion], Q = p.I * p.t * 60, ne = Q / 96485, m = ne / D[1] * D[0];
      const bx = W * 0.2, bw = W * 0.6, by = 40, bh = H - 70;
      ctx.fillStyle = c.accent + "30"; ctx.fillRect(bx, by + 20, bw, bh - 20); ctx.strokeStyle = c.border; ctx.lineWidth = 2; ctx.strokeRect(bx, by, bw, bh);
      const th = 10 + Math.min(30, m * 3);
      ctx.fillStyle = "#777"; ctx.fillRect(bx + bw * 0.25 - 5, by - 20, 10, bh * 0.8); ctx.fillStyle = p.ion === "Cu" ? "#c97a42" : p.ion === "Ag" ? "#dcdcdc" : "#b9c0c9"; ctx.fillRect(bx + bw * 0.25 - th / 2, by + 30, th, bh * 0.5);
      ctx.fillStyle = "#555"; ctx.fillRect(bx + bw * 0.75 - 6, by - 20, 12, bh * 0.8);
      label(ctx, T("katot (−)", "cathode (−)"), bx + bw * 0.25, by + bh + 14, c.muted, "center", 11); label(ctx, T("anot (+)", "anode (+)"), bx + bw * 0.75, by + bh + 14, c.muted, "center", 11);
      return { html: row(T("Yük Q = I·t", "Charge"), fmt(Q, 0) + " C") + row(T("Elektron mol sayısı Q/F", "Moles of e⁻"), fmt(ne, 4) + " mol") + row(T("Biriken kütle", "Mass deposited"), fmt(m, 3) + " g"),
        note: T("Faraday: 1 mol elektron 96 485 C'tur. Biriken madde miktarı geçen yükle doğru orantılıdır; iyonun yükü büyükse aynı yükle daha az mol metal toplanır. Kaplamacılık, alüminyum üretimi ve bakır saflaştırma elektrolizle yapılır.",
          "1 mol e⁻ = 96 485 C. Deposited moles = charge / (n·F).") };
    }
  }, ["12/kimya/u1/k3"]);
})();
