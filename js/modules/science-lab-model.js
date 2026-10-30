/* Deterministic teaching models. Generated values are never device measurements. */
(function () {
  const experiments = {
    rc: {
      title: ['RC devresinde şarj', 'RC circuit charging'], unit: 'V', axis: 't (s)',
      formula: 'V(t) = V₀(1 − exp(−t/RC))',
      question: ['Direnç iki katına çıkarsa şarj süresi nasıl değişir?', 'How does doubling resistance change charging time?'],
      assumptions: ['İdeal DC kaynak, başlangıçta boş kondansatör; kaçak ve iç direnç yok.', 'Ideal DC source, initially discharged capacitor; no leakage or internal resistance.'],
      fields: [['voltage', 'Gerilim / Voltage (V)', 5, 0.1, 24], ['resistance', 'Direnç / Resistance (kΩ)', 10, 0.1, 1000], ['capacitance', 'Kapasitans / Capacitance (µF)', 100, 0.1, 10000]],
    },
    cooling: {
      title: ['Newton soğuma modeli', 'Newton cooling model'], unit: '°C', axis: 't (s)',
      formula: 'T(t) = Tₐ + (T₀ − Tₐ) exp(−kt)',
      question: ['Ortam sıcaklığına yaklaşırken soğuma hızı neden azalır?', 'Why does cooling slow down near ambient temperature?'],
      assumptions: ['Sabit ortam, sabit k, homojen sıcaklık; faz değişimi yok. Telefon termometresi değildir.', 'Constant ambient temperature and k, uniform temperature; no phase change. This is not a phone thermometer.'],
      fields: [['initial', 'Başlangıç / Initial (°C)', 80, -20, 120], ['ambient', 'Ortam / Ambient (°C)', 20, -20, 60], ['rate', 'k (1/s)', 0.02, 0.001, 1]],
    },
    halfLife: {
      title: ['Yarı ömür ve üstel azalma', 'Half-life and exponential decay'], unit: '%', axis: 't (s)',
      formula: 'N(t) / N₀ = 2^(−t / t½)',
      question: ['İki yarı ömür sonunda başlangıç miktarının ne kadarı kalır?', 'What fraction remains after two half-lives?'],
      assumptions: ['Büyük topluluk için beklenen oran; rastgele tek atom bozunmaları modellenmez. Radyoaktif madde kullanılmaz.', 'Expected fraction of a large population; individual random decays are not modelled. No radioactive material is used.'],
      fields: [['half', 'Yarı ömür / Half-life (s)', 30, 0.1, 3600]],
    },
    polarization: {
      title: ['Polarizasyon · Malus yasası', 'Polarization · Malus law'], unit: '%', axis: 'θ (°)',
      formula: 'I / I₀ = cos²(θ)',
      question: ['Analizör 90° döndürüldüğünde ışık şiddeti ne olur?', 'What happens to intensity at a 90° analyser angle?'],
      assumptions: ['Doğrusal polarize giriş ve ideal analizör; yüzde, analizöre gelen şiddete göredir. Lux ölçümü değildir.', 'Linearly polarized input and ideal analyser; percent of incident intensity. This is not a lux measurement.'],
      fields: [['angle', 'İncelenen açı / Probe angle (°)', 45, 0, 180]],
    },
  };
  function evaluate(id, values = {}) {
    if (!values || typeof values !== "object" || Array.isArray(values)) throw new Error("Invalid parameters");
    if (!Object.hasOwn(experiments, id)) throw new Error('Unknown experiment');
    const def = experiments[id], p = {};
    def.fields.forEach(([key, , fallback, min, max]) => {
      const v = Object.hasOwn(values, key) ? values[key] : fallback;
      if (typeof v !== 'number' || !Number.isFinite(v) || v < min || v > max) throw new Error('Invalid parameter: ' + key);
      p[key] = v;
    });
    let end, fn, probe;
    if (id === 'rc') {
      const tau = p.resistance * 1000 * p.capacitance * 1e-6;
      end = 5 * tau; fn = t => p.voltage * -Math.expm1(-t / tau); probe = { x: tau, y: fn(tau) };
    } else if (id === 'cooling') {
      end = 5 / p.rate; fn = t => p.ambient + (p.initial - p.ambient) * Math.exp(-p.rate * t); probe = { x: 1 / p.rate, y: fn(1 / p.rate) };
    } else if (id === 'halfLife') {
      end = 5 * p.half; fn = t => 100 * Math.pow(2, -t / p.half); probe = { x: p.half, y: 50 };
    } else {
      end = 180; fn = angle => 100 * Math.pow(Math.cos(angle * Math.PI / 180), 2); probe = { x: p.angle, y: fn(p.angle) };
    }
    const samples = Array.from({ length: 201 }, (_, i) => { const t = i * end / 200; return { t, y: fn(t) }; });
    return { schema: 'KAI-LAB-1', experiment: id, source: 'simulation', parameters: p, unit: def.unit, axis: def.axis, probe, samples };
  }
  App.scienceLabModel = { experiments, evaluate };
})();
