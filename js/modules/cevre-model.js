/* =========================================================
   cevre-model.js — "Çevrendeki Fiziği Bul" (Modül 2, v1.33): şema, doğrulayıcı, fizik denetimi
   DOM kullanmaz; Node'da sınanır (tools/cevre-check.mjs).

   Yapay zekâ fotoğraftaki sahneden (salıncak, kaydırak, top, çaydanlık …) MEB müfredatına uygun
   bir soru ve simülasyon değişkenleri üretir. Bu dosya:
     • MODELS   : desteklenen sahne modelleri; her birinin simülasyon alanları (aralık, varsayılan,
                  birim), bağlandığı deney (labs.js) ve sorulabilecek nicelikler (formülleriyle)
     • prompt() : katı JSON şemasını modelden üreten istem (şema ile denetim aynı tablodan gelir)
     • validate(): gelen JSON'u onarır, türleri düzeltir, değerleri fiziksel aralığa sığdırır
     • verify() : istenen niceliği formülle hesaplar, doğru şıkkı denetler; tutmuyorsa düzeltir
                  (dil modelleri sayısal hesapta sık yanılır; öğrenciye yanlış cevap gösterilmesin)
   ========================================================= */
(function (G) {
  "use strict";
  const DEG = Math.PI / 180;
  // [en az, en çok, varsayılan, birim]
  const MODELS = {
    egik_atis: {
      name: ["Eğik / yatay / düşey atış", "Projectile"], lab: "atis", grade: 11,
      fields: { v0: [0, 40, 10, "m/s"], theta: [0, 90, 45, "°"], h: [0, 60, 0, "m"] },
      preset: (s) => ({ v: s.v0, a: s.theta, h: s.h, g: s.g }),
      q: {
        ucus_suresi: ["s", (s) => { const vy = s.v0 * Math.sin(s.theta * DEG); return (vy + Math.sqrt(vy * vy + 2 * s.g * s.h)) / s.g; }],
        menzil: ["m", (s) => { const vy = s.v0 * Math.sin(s.theta * DEG); return s.v0 * Math.cos(s.theta * DEG) * (vy + Math.sqrt(vy * vy + 2 * s.g * s.h)) / s.g; }],
        max_yukseklik: ["m", (s) => { const vy = s.v0 * Math.sin(s.theta * DEG); return s.h + (vy > 0 ? (vy * vy) / (2 * s.g) : 0); }],
        carpma_hizi: ["m/s", (s) => Math.sqrt(s.v0 * s.v0 + 2 * s.g * s.h)]
      }
    },
    serbest_dusme: {
      name: ["Serbest düşme", "Free fall"], lab: "atis", grade: 11,
      fields: { h: [0.2, 60, 5, "m"] },
      preset: (s) => ({ v: 0, a: 0, h: s.h, g: s.g }),
      q: { sure: ["s", (s) => Math.sqrt((2 * s.h) / s.g)], carpma_hizi: ["m/s", (s) => Math.sqrt(2 * s.g * s.h)] }
    },
    egik_duzlem: {
      name: ["Eğik düzlem ve sürtünme", "Inclined plane and friction"], lab: "newton", grade: 9,
      fields: { theta: [0, 60, 30, "°"], m: [1, 20, 5, "kg"], mu_s: [0, 1, 0.3, ""], mu_k: [0, 1, 0.2, ""], L: [0.5, 20, 3, "m"] },
      preset: (s) => ({ a: s.theta, m: s.m, ms: s.mu_s, mk: s.mu_k, Fp: 0 }),
      q: {
        ivme: ["m/s²", (s) => accIncline(s)],
        son_hiz: ["m/s", (s) => Math.sqrt(2 * accIncline(s) * s.L)],
        sure: ["s", (s) => { const a = accIncline(s); return a > 0 ? Math.sqrt((2 * s.L) / a) : Infinity; }],
        surtunme_kuvveti: ["N", (s) => (Math.tan(s.theta * DEG) <= s.mu_s ? s.m * s.g * Math.sin(s.theta * DEG) : s.mu_k * s.m * s.g * Math.cos(s.theta * DEG))]
      }
    },
    enerji: {
      name: ["Mekanik enerjinin korunumu", "Conservation of mechanical energy"], lab: "enerji", grade: 9,
      fields: { h: [1, 10, 3, "m"], m: [0.5, 10, 2, "kg"], mu: [0, 0.3, 0, ""] },
      preset: (s) => ({ h: s.h, m: s.m, mu: s.mu }),
      q: {
        son_hiz: ["m/s", (s) => (s.mu > 0 ? NaN : Math.sqrt(2 * s.g * s.h))],   // sürtünmeli yolda yol uzunluğu bilinmez: denetlenmez
        potansiyel_enerji: ["J", (s) => s.m * s.g * s.h],
        kinetik_enerji: ["J", (s) => (s.mu > 0 ? NaN : s.m * s.g * s.h)]
      }
    },
    sarkac: {
      name: ["Basit sarkaç (salıncak)", "Simple pendulum (swing)"], lab: "sarkac", grade: 12,
      fields: { L: [0.2, 3, 2, "m"], theta: [2, 70, 30, "°"] },
      preset: (s) => ({ L: s.L, a: s.theta, g: s.g }),
      q: {
        periyot: ["s", (s) => 2 * Math.PI * Math.sqrt(s.L / s.g)],
        en_buyuk_hiz: ["m/s", (s) => Math.sqrt(2 * s.g * s.L * (1 - Math.cos(s.theta * DEG)))],
        yukseklik_farki: ["m", (s) => s.L * (1 - Math.cos(s.theta * DEG))]
      }
    },
    isinma: {
      name: ["Isı ve sıcaklık: ısınma", "Heat and temperature"], lab: "isinma", grade: 9,
      fields: { m: [0.1, 2, 1, "kg"], P: [500, 5000, 2000, "W"], T0: [0, 40, 20, "°C"], T1: [30, 100, 100, "°C"], verim: [0.3, 1, 1, ""] },
      preset: (s) => ({ m: s.m, P: s.P }),
      q: {
        sure: ["s", (s) => (s.m * 4200 * (s.T1 - s.T0)) / (s.verim * s.P)],
        enerji: ["J", (s) => s.m * 4200 * (s.T1 - s.T0)]
      }
    }
  };
  function accIncline(s) {
    const th = s.theta * DEG;
    if (Math.tan(th) <= s.mu_s) return 0;                          // statik sürtünme tutuyor: kaymaz
    return Math.max(0, s.g * (Math.sin(th) - s.mu_k * Math.cos(th)));
  }

  /* ---------- İstem: şema MODELS tablosundan üretilir (şema ile denetim aynı kaynaktan) ---------- */
  function prompt(lang) {
    const tr = lang !== "en";
    const models = Object.entries(MODELS).map(([k, m]) => "  - " + k + " (" + m.name[tr ? 0 : 1] + "): sim = { " +
      Object.entries(m.fields).map(([f, r]) => f + ": " + r[0] + "–" + r[1] + (r[3] ? " " + r[3] : "")).join(", ") + " } · istenen ∈ { " + Object.keys(m.q).join(", ") + " }").join("\n");
    return (tr ? [
      "Sen MEB ortaöğretim (9–12. sınıf, Türkiye Yüzyılı Maarif Modeli) fizik öğretmenisin.",
      "Öğrenci günlük hayattan bir sahnenin fotoğrafını (ya da tarifini) verdi. Sahnedeki fiziği bul, ölçüleri tahmin et ve tek bir çoktan seçmeli soru yaz.",
      "Ölçü tahmini: bilinen nesnelerden oranla (kapı ≈ 2 m, merdiven basamağı ≈ 17 cm, insan boyu ≈ 1,7 m, salıncak zinciri ≈ 2 m, basketbol potası 3,05 m, çaydanlık 1–1,7 L su ve 1800–2200 W).",
      "Öğrenci ölçü verdiyse tahmin yerine onu kullan. g = 10 m/s² al. Sorudaki sayılar sim değerleriyle AYNI olsun.",
      "Seçenekler 5 tane (A–E), sayısal ve birimli; biri doğru, çeldiriciler tipik kavram yanılgılarından gelsin. Matematiği $...$ ile yaz.",
      "Sahnede hiçbir model uymuyorsa model: \"yok\" yaz ve nedenini \"neden\" alanına koy.",
      "Modeller:",
      models,
      "YALNIZCA şu JSON'u döndür (başka metin yok):",
      '{"sahne":"fotoğrafta ne var (kısa)","nesneler":[{"ad":"…","tahmin":"ör. zincir ≈ 2 m","dayanak":"neye göre tahmin ettin"}],',
      '"model":"…","neden":"","konu":{"sinif":10,"unite":"…","kazanim":"…"},"soru":"…","secenekler":["…","…","…","…","…"],',
      '"dogru":"A","istenen":"…","cozum":["adım 1","adım 2","…"],"sim":{"g":10,…}}'
    ] : [
      "You are a Turkish MEB high-school (grades 9–12) physics teacher.",
      "The student sent a photo (or description) of an everyday scene. Find the physics, estimate the quantities and write one multiple-choice question.",
      "Estimate sizes from familiar objects (door ≈ 2 m, stair step ≈ 17 cm, person ≈ 1.7 m, swing chain ≈ 2 m, basketball hoop 3.05 m, kettle 1–1.7 L of water and 1800–2200 W).",
      "If the student gave measurements, use them. Use g = 10 m/s². Numbers in the question must EQUAL the sim values.",
      "Give 5 numeric options with units (A–E); one correct, distractors from typical misconceptions. Write math as $...$.",
      "If no model fits, set model to \"yok\" and explain in \"neden\".",
      "Models:",
      models,
      "Return ONLY this JSON:",
      '{"sahne":"…","nesneler":[{"ad":"…","tahmin":"…","dayanak":"…"}],"model":"…","neden":"","konu":{"sinif":10,"unite":"…","kazanim":"…"},',
      '"soru":"…","secenekler":["…","…","…","…","…"],"dogru":"A","istenen":"…","cozum":["…"],"sim":{"g":10,…}}'
    ]).join("\n");
  }

  /* ---------- Doğrulama ve onarım ---------- */
  const LET = "ABCDE";
  const str = (v, max) => (v == null ? "" : String(v).trim().slice(0, max || 600));
  function num(v) {
    if (typeof v === "number") return isFinite(v) ? v : NaN;
    const m = /-?\d+(?:[.,]\d+)?/.exec(String(v == null ? "" : v));
    return m ? Number(m[0].replace(",", ".")) : NaN;
  }
  /** Gelen JSON'u denetle ve onar. Dönüş: { ok, data, notes[], reason } */
  function validate(raw) {
    const notes = [];
    if (!raw || typeof raw !== "object") return { ok: false, reason: "format", notes };
    const model = str(raw.model, 40).toLowerCase().replace(/[\s-]+/g, "_").replace(/ı/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ö/g, "o").replace(/ç/g, "c");
    if (model === "yok" || model === "none") return { ok: false, reason: "none", why: str(raw.neden || raw.reason, 300), scene: str(raw.sahne, 300), notes };
    const M = MODELS[model];
    if (!M) return { ok: false, reason: "model", notes };
    // seçenekler: dizi ya da {A: …} nesnesi; "A) " önekleri atılır
    let ops = raw.secenekler || raw.options;
    if (ops && !Array.isArray(ops) && typeof ops === "object") ops = LET.split("").map((k) => ops[k] || ops[k.toLowerCase()]).filter((x) => x != null);
    ops = (Array.isArray(ops) ? ops : []).map((o) => str(o, 200).replace(/^\s*[A-Ea-e]\s*[).:\-]\s*/, "")).filter(Boolean).slice(0, 5);
    if (ops.length < 3) return { ok: false, reason: "options", notes };
    let d = raw.dogru != null ? raw.dogru : raw.answer;
    let di = typeof d === "number" ? d - (d >= 1 ? 1 : 0) : LET.indexOf(str(d, 4).toUpperCase().replace(/[^A-E]/g, "").charAt(0));
    if (!(di >= 0 && di < ops.length)) { di = -1; notes.push("dogru"); }
    const soru = str(raw.soru || raw.question, 900);
    if (!soru) return { ok: false, reason: "question", notes };
    let cozum = raw.cozum || raw.solution || [];
    if (typeof cozum === "string") cozum = cozum.split(/\n+/);
    cozum = (Array.isArray(cozum) ? cozum : []).map((x) => str(x, 400)).filter(Boolean).slice(0, 10);
    // simülasyon değişkenleri: sayıya çevir, eksikse varsayılan, aralık dışıysa sığdır (not düş)
    const sraw = raw.sim && typeof raw.sim === "object" ? raw.sim : {}, sim = {}, clamped = [];
    const g = num(sraw.g);
    sim.g = g >= 9.7 && g <= 10.1 ? g : 10;
    Object.entries(M.fields).forEach(([f, [lo, hi, def]]) => {
      let v = num(sraw[f]);
      if (!isFinite(v)) { v = def; notes.push("varsayilan:" + f); }
      else if (v < lo || v > hi) { clamped.push([f, v, Math.min(hi, Math.max(lo, v))]); v = Math.min(hi, Math.max(lo, v)); }
      sim[f] = v;
    });
    if (model === "isinma" && sim.T1 <= sim.T0) { sim.T1 = Math.min(100, sim.T0 + 20); notes.push("T1"); }
    if (model === "egik_duzlem" && sim.mu_k > sim.mu_s) { sim.mu_k = sim.mu_s; notes.push("mu_k"); }   // kinetik sürtünme statikten büyük olamaz
    const ist = str(raw.istenen || raw.asked, 40).toLowerCase().replace(/[\s-]+/g, "_");
    const konu = raw.konu && typeof raw.konu === "object" ? { sinif: Math.min(12, Math.max(9, Math.round(num(raw.konu.sinif)) || M.grade)), unite: str(raw.konu.unite, 120), kazanim: str(raw.konu.kazanim, 300) } : { sinif: M.grade, unite: "", kazanim: "" };
    const nes = (Array.isArray(raw.nesneler) ? raw.nesneler : []).slice(0, 6).map((n) => (n && typeof n === "object" ? { ad: str(n.ad || n.name, 60), tahmin: str(n.tahmin || n.estimate, 120), dayanak: str(n.dayanak || n.basis, 160) } : { ad: str(n, 60), tahmin: "", dayanak: "" })).filter((n) => n.ad);
    return { ok: true, notes, clamped, data: { model, sahne: str(raw.sahne, 300), nesneler: nes, konu, soru, secenekler: ops, dogru: di, istenen: M.q[ist] ? ist : null, cozum, sim } };
  }

  /* ---------- Fizik denetimi ---------- */
  const fmtNum = (x) => { const a = Math.abs(x), d = a >= 100 ? 0 : a >= 10 ? 1 : 2; return String(Number(x.toFixed(d))).replace(".", ","); };
  /** İstenen niceliği hesapla, doğru şıkkı denetle. data yerinde düzeltilir.
      Dönüş: { status: "ok" | "fixed" (başka şık doğruydu) | "rewritten" (hiçbiri tutmadı, doğru şık yeniden yazıldı) | "skip", value, unit } */
  function verify(data, tol) {
    tol = tol || 0.05;
    const M = MODELS[data.model], spec = M && data.istenen && M.q[data.istenen];
    if (!spec) return { status: "skip" };
    const value = spec[1](data.sim), unit = spec[0];
    if (!isFinite(value)) return { status: "skip" };
    const rel = (o) => { const n = num(o); return isFinite(n) ? Math.abs(n - value) / Math.max(1e-9, Math.abs(value)) : Infinity; };
    const errs = data.secenekler.map(rel);
    if (data.dogru >= 0 && errs[data.dogru] <= tol) return { status: "ok", value, unit };
    let best = -1; errs.forEach((e, i) => { if (e <= tol && (best < 0 || e < errs[best])) best = i; });
    if (best >= 0) { const was = data.dogru; data.dogru = best; return { status: "fixed", value, unit, was }; }
    const i = data.dogru >= 0 ? data.dogru : 0, was = data.secenekler[i];
    const txt = fmtNum(value) + " " + unit;
    data.secenekler[i] = /-?\d+(?:[.,]\d+)?/.test(was) ? was.replace(/-?\d+(?:[.,]\d+)?/, fmtNum(value)) : txt;
    // aynı değeri taşıyan başka şık kalmasın
    data.secenekler.forEach((o, k) => { if (k !== i && rel(o) <= tol) data.secenekler[k] = fmtNum(value * (k < i ? 0.5 : 2)) + " " + unit; });
    data.dogru = i;
    return { status: "rewritten", value, unit, was };
  }
  /** Deney (labs.js) için ön ayar: değerler deneyin kaydırıcı aralığına sığdırılır */
  function preset(data) { const M = MODELS[data.model]; return M ? { lab: M.lab, preset: M.preset(data.sim) } : null; }

  G.CevreFizik = { MODELS, prompt, validate, verify, preset, num, fmtNum, LET };
})(typeof self !== "undefined" ? self : globalThis);
