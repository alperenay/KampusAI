/* Deterministic educational models. SI units unless documented. No eval or network. */
(function () {
  /** @typedef {{t:number,y:number}} Sample */
  /** @typedef {{type:string,a:number,b:number,value:number,closed?:boolean}} Component */
  /** @typedef {{nodes:number,components:Component[]}} Net */
  const D = Math.PI / 180,
    G = 9.80665;
  /** @param {...number} xs */
  const finite = (...xs) => xs.every(Number.isFinite);
  /** @param {...number} xs */
  function positive(...xs) {
    if (!finite(...xs) || xs.some((x) => x <= 0))
      throw new Error("Pozitif, sonlu değerler gir.");
  }
  /** @param {number} x */
  const norm = (x) => ((x % 360) + 360) % 360;
  /** @param {number} measured
   * @param {number} theory */
  function errorPercent(measured, theory) {
    positive(Math.abs(theory));
    if (!finite(measured)) throw new Error("Geçersiz ölçüm");
    return (100 * Math.abs(measured - theory)) / Math.abs(theory);
  }
  /** @param {number} distance
   * @param {number} deltaMs
   * @param {number} uncertaintyMs */
  function acoustic(distance, deltaMs, uncertaintyMs) {
    positive(distance, deltaMs);
    if (!finite(uncertaintyMs) || uncertaintyMs < 0 || uncertaintyMs >= deltaMs)
      throw new Error("Zaman belirsizliği uçuş süresinden küçük olmalı.");
    return {
      speed: (distance * 1000) / deltaMs,
      low: (distance * 1000) / (deltaMs + uncertaintyMs),
      high: (distance * 1000) / (deltaMs - uncertaintyMs),
      reliable: uncertaintyMs / deltaMs <= 0.1,
    };
  }
  /** @param {number} f
   * @param {number} f0
   * @param {number} [c] */
  function doppler(f, f0, c = 343) {
    positive(f, f0, c);
    return { approximate: (c * (f - f0)) / f0, sourceRadial: c * (1 - f0 / f) };
  }
  /** @param {Sample[]} samples */
  function period(samples) {
    if (samples.length < 10) return null;
    const mean = samples.reduce((s, p) => s + p.y, 0) / samples.length;
    /** @type {number[]} */ const crossings = [];
    for (let i = 1; i < samples.length; i++) {
      const a = samples[i - 1],
        b = samples[i];
      if (!finite(a.t, a.y, b.t, b.y) || b.t <= a.t)
        throw new Error("Zamanlar artmalı.");
      if (a.y < mean && b.y >= mean)
        crossings.push(a.t + ((mean - a.y) * (b.t - a.t)) / (b.y - a.y));
    }
    const gaps = crossings
      .slice(1)
      .map((x, i) => x - crossings[i])
      .filter((x) => x > 0.1);
    if (gaps.length < 2) return null;
    const T = gaps.reduce((a, b) => a + b, 0) / gaps.length;
    return {
      T,
      cycles: gaps.length,
      spread: Math.sqrt(
        gaps.reduce((s, t) => s + (t - T) ** 2, 0) / gaps.length,
      ),
    };
  }
  /** @param {number} length
   * @param {number} T */
  function gravity(length, T) {
    positive(length, T);
    return (4 * Math.PI ** 2 * length) / T ** 2;
  }
  /** @param {Sample[]} samples
   * @param {number} [bias] */
  function integrate(samples, bias = 0) {
    if (!finite(bias) || samples.some((p) => !finite(p.t, p.y)))
      throw new Error("Geçersiz ivme");
    let v = 0,
      z = 0;
    return samples.map((p, i) => {
      if (i) {
        const q = samples[i - 1],
          dt = p.t - q.t;
        if (dt <= 0 || dt > 1) throw new Error("Örnek aralığı 0–1 s olmalı.");
        const vn = v + ((q.y + p.y) / 2 - bias) * dt;
        z += ((v + vn) * dt) / 2;
        v = vn;
      }
      return { t: p.t, a: p.y - bias, v, z };
    });
  }
  /** @param {Sample[]} samples
   * @param {number} [cutoff] */
  function highPass(samples, cutoff = 0.8) {
    positive(cutoff);
    let prev = samples[0]?.y || 0,
      y = 0;
    return samples.map((p, i) => {
      if (!finite(p.t, p.y)) throw new Error("Geçersiz örnek");
      const dt = i ? p.t - samples[i - 1].t : 0;
      if (dt < 0) throw new Error("Zamanlar sıralı olmalı");
      const alpha = 1 / (1 + 2 * Math.PI * cutoff * dt);
      y = i ? alpha * (y + p.y - prev) : 0;
      prev = p.y;
      return { t: p.t, y };
    });
  }
  /** @param {Sample[]} samples
   * @param {number} threshold */
  function envelopeEvents(samples, threshold) {
    positive(threshold);
    let last = -Infinity;
    return samples
      .filter((p) => {
        if (Math.abs(p.y) < threshold || p.t - last < 0.5) return false;
        last = p.t;
        return true;
      })
      .map((p) => ({
        t: p.t,
        amplitude: Math.abs(p.y),
        label: "Eşik olayı (P/S tanısı değildir)",
      }));
  }
  /** @param {ArrayLike<number>} a
   * @param {ArrayLike<number>} b
   * @param {number} maxLag */
  function peakLag(a, b, maxLag) {
    if (a.length !== b.length || a.length < 8 || a.length > 8192)
      throw new Error("Eşit uzunlukta 8–8192 örnek gerekli");
    if (
      !finite(maxLag) ||
      maxLag < 0 ||
      Array.from(a).some((v) => !Number.isFinite(v)) ||
      Array.from(b).some((v) => !Number.isFinite(v))
    )
      throw new Error("Geçersiz korelasyon girdisi");
    let best = -Infinity,
      lag = 0;
    maxLag = Math.min(Math.floor(maxLag), a.length - 4, 2048);
    for (let k = 0; k <= maxLag; k++) {
      let xy = 0,
        xx = 0,
        yy = 0;
      for (let i = 0; i < a.length - k; i++) {
        xy += a[i] * b[i + k];
        xx += a[i] ** 2;
        yy += b[i + k] ** 2;
      }
      const r = xy / Math.sqrt(xx * yy || 1);
      if (r > best) {
        best = r;
        lag = k;
      }
    }
    return { lag, correlation: best };
  }
  /** @param {Sample[]} rows */
  function linearFit(rows) {
    if (rows.length < 2 || rows.some((p) => !finite(p.t, p.y)))
      throw new Error("En az iki sonlu veri satırı gerekli");
    const n = rows.length,
      mx = rows.reduce((s, p) => s + p.t, 0) / n,
      my = rows.reduce((s, p) => s + p.y, 0) / n;
    const xx = rows.reduce((s, p) => s + (p.t - mx) ** 2, 0);
    if (xx < 1e-12) throw new Error("Bağımsız değişken değişmeli");
    const slope = rows.reduce((s, p) => s + (p.t - mx) * (p.y - my), 0) / xx,
      intercept = my - slope * mx;
    const residual = rows.reduce(
        (s, p) => s + (p.y - slope * p.t - intercept) ** 2,
        0,
      ),
      total = rows.reduce((s, p) => s + (p.y - my) ** 2, 0);
    return {
      slope,
      intercept,
      r2: total < 1e-12 ? (residual < 1e-12 ? 1 : 0) : 1 - residual / total,
    };
  }
  /** @param {string} text */
  function conclusionRubric(text) {
    const s = String(text).toLocaleLowerCase("tr");
    return [
      ["Kanıta dayalı sonuç", /\d/.test(s)],
      ["Kuramla karşılaştırma", /kuram|teori|beklen|hipotez/.test(s)],
      ["Hata/belirsizlik", /hata|belirsiz|kalibr/.test(s)],
      ["İyileştirme", /tekrar|iyileştir|daha|örneklem/.test(s)],
    ].map(([label, met]) => ({ label, met }));
  }
  /** @param {number[][]} A
   * @param {number[]} b */
  function solveLinear(A, b) {
    const n = b.length,
      a = A.map((r, i) => [...r, b[i]]);
    for (let k = 0; k < n; k++) {
      let p = k;
      for (let i = k + 1; i < n; i++)
        if (Math.abs(a[i][k]) > Math.abs(a[p][k])) p = i;
      if (Math.abs(a[p][k]) < 1e-10)
        throw new Error(
          "Devre açıkta veya tekil; toprak ve bağlantıları kontrol et.",
        );
      [a[k], a[p]] = [a[p], a[k]];
      const pivot = a[k][k];
      for (let j = k; j <= n; j++) a[k][j] /= pivot;
      for (let i = 0; i < n; i++)
        if (i !== k) {
          const q = a[i][k];
          for (let j = k; j <= n; j++) a[i][j] -= q * a[k][j];
        }
    }
    return a.map((r) => r[n]);
  }
  /** @param {Net} net */
  function circuit(net) {
    if (
      !net ||
      !Number.isInteger(net.nodes) ||
      net.nodes < 2 ||
      net.nodes > 24 ||
      !Array.isArray(net.components) ||
      net.components.length > 64
    )
      throw new Error("Devre sınırı: 2–24 düğüm, en çok 64 eleman");
    const comps = net.components.filter(
        (c) => !(c.type === "switch" && !c.closed),
      ),
      sources = comps.filter((c) => c.type === "voltage"),
      n = net.nodes - 1,
      size = n + sources.length;
    const A = Array.from({ length: size }, () => Array(size).fill(0)),
      b = Array(size).fill(0);
    comps.forEach((c) => {
      if (
        !["resistor", "lamp", "switch", "voltage"].includes(c.type) ||
        ![c.a, c.b].every(
          (v) => Number.isInteger(v) && v >= 0 && v < net.nodes,
        ) ||
        c.a === c.b
      )
        throw new Error("Geçersiz eleman/düğüm");
      if (c.type === "voltage") {
        if (!finite(c.value)) throw new Error("Geçersiz gerilim");
        const j = n + sources.indexOf(c);
        if (c.a) {
          A[c.a - 1][j] = 1;
          A[j][c.a - 1] = 1;
        }
        if (c.b) {
          A[c.b - 1][j] = -1;
          A[j][c.b - 1] = -1;
        }
        b[j] = c.value;
      } else {
        const r = c.type === "switch" ? 0.001 : c.value;
        positive(r);
        const g = 1 / r;
        if (c.a) A[c.a - 1][c.a - 1] += g;
        if (c.b) A[c.b - 1][c.b - 1] += g;
        if (c.a && c.b) {
          A[c.a - 1][c.b - 1] -= g;
          A[c.b - 1][c.a - 1] -= g;
        }
      }
    });
    const x = solveLinear(A, b),
      volts = [0, ...x.slice(0, n)];
    return {
      volts,
      components: comps.map((c) => {
        const voltage = volts[c.a] - volts[c.b],
          current =
            c.type === "voltage"
              ? x[n + sources.indexOf(c)]
              : voltage / (c.type === "switch" ? 0.001 : c.value);
        return { ...c, voltage, current, power: voltage * current };
      }),
    };
  }
  /** @param {number} mass
   * @param {{x:number,y:number}[]} forces */
  function force(mass, forces) {
    positive(mass);
    if (
      !Array.isArray(forces) ||
      forces.length > 32 ||
      forces.some((f) => !finite(f.x, f.y))
    )
      throw new Error("Geçersiz kuvvet");
    const x = forces.reduce((s, f) => s + f.x, 0),
      y = forces.reduce((s, f) => s + f.y, 0);
    return {
      x,
      y,
      ax: x / mass,
      ay: y / mass,
      equilibrium: Math.hypot(x, y) < 1e-6,
    };
  }
  /** @param {number} angle
   * @param {number} n1
   * @param {number} n2 */
  function snell(angle, n1, n2) {
    positive(n1, n2);
    if (!finite(angle) || Math.abs(angle) > 90) throw new Error("Açı −90…90°");
    const v = (n1 / n2) * Math.sin(angle * D);
    return {
      reflected: -angle,
      refracted: Math.abs(v) > 1 ? null : Math.asin(v) / D,
    };
  }
  /** @param {number} distance
   * @param {number} focal */
  function lens(distance, focal) {
    positive(distance);
    if (!finite(focal) || focal === 0) throw new Error("Odak sıfır olamaz");
    if (Math.abs(distance - focal) < 1e-9)
      return { image: null, magnification: null };
    const image = 1 / (1 / focal - 1 / distance);
    return { image, magnification: -image / distance };
  }
  /** @param {number} height
   * @param {number} mass
   * @param {number} [friction] */
  function ramp(height, mass, friction = 0) {
    positive(mass);
    if (!finite(height, friction) || height < 0 || friction < 0 || friction > 1)
      throw new Error("Geçersiz yükseklik/kayıp oranı");
    const potential = mass * G * height,
      loss = potential * friction;
    return {
      potential,
      kinetic: potential - loss,
      loss,
      speed: Math.sqrt(2 * G * height * (1 - friction)),
      loopMinHeight: 2.5 * height,
    };
  }
  /** @param {number} m1
   * @param {number} v1
   * @param {number} m2
   * @param {number} v2
   * @param {number} restitution */
  function collision(m1, v1, m2, v2, restitution) {
    positive(m1, m2);
    if (!finite(v1, v2, restitution) || restitution < 0 || restitution > 1)
      throw new Error("Geçersiz çarpışma");
    return {
      v1: (m1 * v1 + m2 * v2 - m2 * restitution * (v1 - v2)) / (m1 + m2),
      v2: (m1 * v1 + m2 * v2 + m1 * restitution * (v1 - v2)) / (m1 + m2),
    };
  }
  // Small expression grammar; deliberately no property access, assignment, or executable JS.
  /** @param {string} src
   * @param {number} x
   * @param {Record<string,number>} [vars] */
  function expression(src, x, vars = {}) {
    const tokens =
      String(src)
        .replace(/^y\s*=/i, "")
        .replace(/π/g, "pi")
        .match(/(?:\d*\.)?\d+(?:e[+-]?\d+)?|[a-z]+|[()+*/^,-]/gi) || [];
    if (
      tokens.join("").toLowerCase() !==
        String(src)
          .replace(/^y\s*=/i, "")
          .replace(/π/g, "pi")
          .replace(/\s/g, "")
          .toLowerCase() ||
      tokens.length > 100
    )
      throw new Error("Desteklenmeyen ifade");
    let at = 0;
    /** @returns {number} */
    function atom() {
      const t = tokens[at++];
      if (t === "+" || t === "-") return (t === "-" ? -1 : 1) * power();
      if (t === "(") {
        const v = add();
        if (tokens[at++] !== ")") throw new Error("Parantez eksik");
        return v;
      }
      if (/^(sin|cos|tan|sqrt|abs)$/.test(t || "")) {
        if (tokens[at++] !== "(")
          throw new Error("Fonksiyon parantezi gerekli");
        const v = add();
        if (tokens[at++] !== ")") throw new Error("Parantez eksik");
        return Math[/** @type {'sin'|'cos'|'tan'|'sqrt'|'abs'} */ (t)](v);
      }
      if (t === "x") return x;
      if (t === "pi") return Math.PI;
      if (Object.prototype.hasOwnProperty.call(vars, t)) return vars[t];
      if (t && /^\d|^\./.test(t)) return Number(t);
      throw new Error("Bilinmeyen değişken");
    }
    /** @returns {number} */
    function power() {
      const v = atom();
      if (tokens[at] === "^") {
        at++;
        return v ** power();
      }
      return v;
    }
    /** @returns {number} */
    function mul() {
      let v = power();
      while (["*", "/"].includes(tokens[at])) {
        const op = tokens[at++],
          q = power();
        v = op === "*" ? v * q : v / q;
      }
      return v;
    }
    /** @returns {number} */
    function add() {
      let v = mul();
      while (["+", "-"].includes(tokens[at])) {
        const op = tokens[at++],
          q = mul();
        v = op === "+" ? v + q : v - q;
      }
      return v;
    }
    const result = add();
    if (at !== tokens.length)
      throw new Error("İşleç eksik; 2*x biçimini kullan.");
    return result;
  }
  /** @param {number} ra
   * @param {number} dec
   * @param {number} dateMs
   * @param {number} lat
   * @param {number} lon */
  function horizontal(ra, dec, dateMs, lat, lon) {
    if (
      !finite(ra, dec, dateMs, lat, lon) ||
      Math.abs(lat) > 90 ||
      Math.abs(lon) > 180
    )
      throw new Error("Geçersiz konum/zaman");
    const jd = dateMs / 86400000 + 2440587.5,
      H =
        (norm(280.46061837 + 360.98564736629 * (jd - 2451545) + lon) - ra) * D,
      p = lat * D,
      d = dec * D;
    return {
      altitude:
        Math.asin(
          Math.max(
            -1,
            Math.min(
              1,
              Math.sin(p) * Math.sin(d) +
                Math.cos(p) * Math.cos(d) * Math.cos(H),
            ),
          ),
        ) / D,
      azimuth: norm(
        Math.atan2(
          Math.sin(H),
          Math.cos(H) * Math.sin(p) - Math.tan(d) * Math.cos(p),
        ) /
          D +
          180,
      ),
    };
  }
  // JPL Table 1, 1800–2050; heliocentric mean ecliptic J2000, six elements + rates.
  /** @type {Record<string,number[][]>} */
  const ORBITS = {
    earth: [
      [1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0],
      [0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0],
    ],
    mercury: [
      [
        0.38709927, 0.20563593, 7.00497902, 252.2503235, 77.45779628,
        48.33076593,
      ],
      [
        0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689,
        -0.12534081,
      ],
    ],
    venus: [
      [
        0.72333566, 0.00677672, 3.39467605, 181.9790995, 131.60246718,
        76.67984255,
      ],
      [
        0.0000039, -0.00004107, -0.0007889, 58517.81538729, 0.00268329,
        -0.27769418,
      ],
    ],
    mars: [
      [
        1.52371034, 0.0933941, 1.84969142, -4.55343205, -23.94362959,
        49.55953891,
      ],
      [
        0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088,
        -0.29257343,
      ],
    ],
    jupiter: [
      [
        5.202887, 0.04838624, 1.30439695, 34.39644051, 14.72847983,
        100.47390909,
      ],
      [
        -0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668,
        0.20469106,
      ],
    ],
    saturn: [
      [
        9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831,
        113.66242448,
      ],
      [
        -0.0012506, -0.00050991, 0.00193609, 1222.49362201, -0.41897216,
        -0.28867794,
      ],
    ],
  };
  /** @param {string} id
   * @param {number} ms */
  function orbit(id, ms) {
    const T = (ms / 86400000 + 2440587.5 - 2451545) / 36525;
    if (!ORBITS[id] || !finite(T) || T < -2 || T > 0.5)
      throw new Error("Gezegen modeli 1800–2050 aralığı içindir");
    const [a, e, I, L, P, N] = ORBITS[id][0].map(
        (v, i) => v + ORBITS[id][1][i] * T,
      ),
      M = (norm(L - P + 180) - 180) * D;
    let E = M;
    for (let i = 0; i < 12; i++)
      E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    const x = a * (Math.cos(E) - e),
      y = a * Math.sqrt(1 - e * e) * Math.sin(E),
      w = (P - N) * D,
      n = N * D,
      inc = I * D;
    return {
      x:
        (Math.cos(w) * Math.cos(n) -
          Math.sin(w) * Math.sin(n) * Math.cos(inc)) *
          x +
        (-Math.sin(w) * Math.cos(n) -
          Math.cos(w) * Math.sin(n) * Math.cos(inc)) *
          y,
      y:
        (Math.cos(w) * Math.sin(n) +
          Math.sin(w) * Math.cos(n) * Math.cos(inc)) *
          x +
        (-Math.sin(w) * Math.sin(n) +
          Math.cos(w) * Math.cos(n) * Math.cos(inc)) *
          y,
      z: Math.sin(w) * Math.sin(inc) * x + Math.cos(w) * Math.sin(inc) * y,
    };
  }
  /** @param {string} id
   * @param {number} ms
   * @param {number} lat
   * @param {number} lon */
  function sky(id, ms, lat, lon) {
    const e = orbit("earth", ms),
      p = id === "sun" ? { x: 0, y: 0, z: 0 } : orbit(id, ms),
      x = p.x - e.x,
      ey = p.y - e.y,
      ez = p.z - e.z,
      ob = 23.43928 * D,
      y = ey * Math.cos(ob) - ez * Math.sin(ob),
      z = ey * Math.sin(ob) + ez * Math.cos(ob);
    return horizontal(
      norm(Math.atan2(y, x) / D),
      Math.atan2(z, Math.hypot(x, y)) / D,
      ms,
      lat,
      lon,
    );
  }
  /** @param {number} ms */
  function lunarPhase(ms) {
    if (!finite(ms)) throw new Error("Geçersiz zaman");
    const phase =
      ((((ms - Date.UTC(2000, 0, 6, 18, 14)) / 86400000 / 29.530588853) % 1) +
        1) %
      1;
    return { phase, illuminated: (1 - Math.cos(2 * Math.PI * phase)) / 2 };
  }
  /** @param {{x:number,y:number,r:number}[]} stations */
  function triangulate(stations) {
    if (
      stations.length !== 3 ||
      stations.some((p) => !finite(p.x, p.y, p.r) || p.r < 0)
    )
      throw new Error("Üç geçerli istasyon gerekli");
    const [a, b, c] = stations,
      A = [
        [2 * (b.x - a.x), 2 * (b.y - a.y)],
        [2 * (c.x - a.x), 2 * (c.y - a.y)],
      ],
      rhs = [
        a.r * a.r - b.r * b.r + b.x * b.x - a.x * a.x + b.y * b.y - a.y * a.y,
        a.r * a.r - c.r * c.r + c.x * c.x - a.x * a.x + c.y * c.y - a.y * a.y,
      ],
      [x, y] = solveLinear(A, rhs);
    return {
      x,
      y,
      residual: Math.max(
        ...stations.map((s) => Math.abs(Math.hypot(x - s.x, y - s.y) - s.r)),
      ),
    };
  }
  App.discoveryModel = {
    G,
    finite,
    errorPercent,
    acoustic,
    doppler,
    period,
    gravity,
    integrate,
    highPass,
    envelopeEvents,
    peakLag,
    linearFit,
    conclusionRubric,
    circuit,
    force,
    snell,
    lens,
    ramp,
    collision,
    expression,
    horizontal,
    orbit,
    sky,
    lunarPhase,
    triangulate,
  };
})();
