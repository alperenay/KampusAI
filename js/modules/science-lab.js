/* Unified shell delegates to existing engines and owns their route cleanup. */
(function () {
  const T = (tr, en) => App.i18n.lang === 'en' ? en : tr, esc = App.utils.esc;
  const aliases = { ph:'bilim-lab/deneyler/ph', ekosistem:'bilim-lab/deneyler/ekosistem', 'ciz-calissin':'bilim-lab/deneyler', lab: 'bilim-lab/deneyler', sensor: 'bilim-lab/sensor', 'telefon-fizik': 'bilim-lab/fizik', sismograf: 'bilim-lab/titresim', vatandas: 'bilim-lab/vatandas', gokyuzu: 'bilim-lab/gokyuzu', 'dokunsal-grafik': 'bilim-lab/grafik' };
  Object.entries(aliases).forEach(([from, to]) => App.router.alias(from, to));
  function migrateTools(raw) {
    return Array.isArray(raw) ? [...new Set(raw.filter(r => typeof r === 'string').map(r => Object.hasOwn(aliases, r.split('/')[0]) || r.startsWith('bilim-lab/') ? 'bilim-lab' : r))] : null;
  }
  for (const key of ['pinnedTools', 'recentTools', 'homeWidgets']) {
    const next = migrateTools(App.prefs.get(key, null)); if (next) App.prefs.set(key, next);
  }
  const sections = [
    ['genel', 'compass', 'Başlangıç', 'Overview'], ['deneyler', 'lightbulb', 'Deneyler', 'Experiments'],
    ['sensor', 'mic', 'Sensör Ölçümü', 'Sensor Measurements'], ['fizik', 'sPhys', 'Fizik Ölçümleri', 'Physics Measurements'],
    ['titresim', 'chart', 'Titreşim ve Sismograf', 'Vibration & Seismograph'], ['modeller', 'layers', 'Yeni Deneyler', 'New Experiments'],
    ['vatandas', 'map', 'Vatandaş Bilimi Ağı', 'Citizen Science'], ['gokyuzu', 'star', 'Gökyüzü Modu', 'Sky Mode'], ['grafik', 'chart', 'Titreşimli Grafik', 'Haptic Graph'],
  ];
  const title = () => T('Deney Laboratuvarı', 'Experiment Laboratory');
  const experimentLabel = id => { const a = App.scienceLabModel.experiments[id].title; return T(a[0], a[1]); };
  function featured() {
    const visual = kind => '<svg viewBox="0 0 180 120" aria-hidden="true" focusable="false">'+(kind==='ph'
      ? '<path d="M52 14v34L25 94q-5 12 9 12h70q14 0 9-12L86 48V14M46 14h46" fill="none" stroke="currentColor" stroke-width="5"/><path d="M41 72h56l13 24q3 6-6 6H34q-9 0-6-6Z" fill="currentColor" opacity=".4"/><circle cx="64" cy="81" r="5" fill="currentColor"/><circle cx="79" cy="63" r="3" fill="currentColor"/><path d="M130 29v67m0-55h17m-17 18h12m-12 18h17" stroke="currentColor" stroke-width="4"/>'
      : '<rect x="44" y="26" width="92" height="80" rx="16" fill="none" stroke="currentColor" stroke-width="5"/><path d="M44 83q45-26 92 0v7q0 16-16 16H60q-16 0-16-16Z" fill="currentColor" opacity=".3"/><path d="M90 91V53m0 17Q58 70 66 48q25-2 24 22m0 7q30-2 26-25-24 0-26 25M40 20h100" fill="none" stroke="currentColor" stroke-width="5"/>')+'</svg>';
    const cards=[['ph','Sanal pH Deneyi','Virtual pH Experiment','Çözelti ekle, seyrelt ve nötrleşmeyi gözlemle.','Pour, dilute and observe neutralisation.'],['ekosistem','Ekosistem Kavanozu','Ecosystem Jar','Canlıları ve mevsimleri değiştir, dengeyi keşfet.','Change populations and seasons; explore balance.']];
    return '<section class="science-virtual" aria-labelledby="scienceVirtualTitle"><header><span class="science-virtual-kicker">'+T('KAMERA VE SENSÖR GEREKMEZ','NO CAMERA OR SENSORS NEEDED')+'</span><h2 id="scienceVirtualTitle">'+T('Sanal deneyler','Virtual experiments')+'</h2><p>'+T('Bir deney seç ve hemen başla. Bunlar gerçek ölçüm değil, etkileşimli modellerdir.','Choose an experiment and start. These are interactive models, not real measurements.')+'</p></header><div class="science-lab-featured">'+cards.map(c=>'<a class="card science-virtual-card science-virtual-card--'+c[0]+'" href="#/bilim-lab/deneyler/'+c[0]+'"><div class="science-virtual-art">'+visual(c[0])+'</div><div><span class="science-virtual-tag">'+T('SANAL DENEY','SIMULATION')+'</span><h3>'+T(c[1],c[2])+'</h3><p>'+T(c[3],c[4])+'</p><span class="science-virtual-cta">'+T('Deneyi başlat','Start experiment')+' <span aria-hidden="true">→</span></span></div></a>').join('')+'</div></section>';
  }

  function experiments(host, params) {
    if(params[0]==='katalog'){host.innerHTML='<div data-experiment-library></div>';return App.labs.render(host.firstElementChild,params.slice(1));}
    if(params[0]==='ph')return App.phMetre.render(host);
    if(params[0]==='ekosistem')return App.ekosistem.render(host);
    host.innerHTML='<div class="science-lab-experiments">'+featured()+'<div data-experiment-library></div></div>';
    return App.labs.render(host.querySelector('[data-experiment-library]'),params);
  }
  function overview(host) {
    host.innerHTML = featured()+'<section class="science-lab-intro card"><h2>' + esc(T('Bir soru seç → ölç veya modelle → kanıtını raporla', 'Choose a question → measure or model → report evidence')) + '</h2><p>' + esc(T('Cihaz izni yalnız Başlat düğmesiyle istenir. Donanım yoksa açıkça etiketli simülasyonu kendin seç. Bölüm değiştirince etkin kayıt durur; ayrılmadan veriyi indir.', 'Device permission is requested only by Start. If hardware is unavailable, explicitly choose simulation. Switching sections stops active recording; export data before leaving.')) + '</p></section><div class="science-lab-grid">' + sections.filter(s => s[0] !== 'genel').map(s => '<a class="card science-lab-card" href="#/bilim-lab/' + s[0] + '">' + App.icon(s[1]) + '<h2>' + esc(T(s[2], s[3])) + '</h2><p>' + esc(s[0] === 'grafik' ? T('Fonksiyonları dokunarak ve sesle keşfet.', 'Explore functions through touch and sound.') : s[0] === 'vatandas' ? T('Ölçüm topla, QR ile paylaş ve yerel haritada karşılaştır.', 'Collect measurements, share via QR and compare on the local map.') : s[0] === 'gokyuzu' ? T('Konum ve zamana göre yıldızları, gezegenleri ve Ay evresini incele.', 'Explore stars, planets and the Moon by location and time.') : s[0] === 'deneyler' ? T(Object.keys(App.labs.LABS).length + ' etkileşimli simülasyon; ders ve sınıfa göre filtrele.', Object.keys(App.labs.LABS).length + ' interactive simulations, filtered by subject and grade.') : s[0] === 'sensor' ? T('7 sensör kanalı, gerçek zamanlı grafik, eşik, CSV ve JSON.', '7 sensor channels, live charts, thresholds, CSV and JSON.') : s[0] === 'fizik' ? T('Ses, yankı, Doppler, sarkaç ve hareket ölçümleri.', 'Sound, echo, Doppler, pendulum and motion measurements.') : s[0] === 'titresim' ? T('Üç eksen, filtreler, frekans ve eğitim sinyalleri.', 'Three axes, filters, frequency and teaching signals.') : T('RC, soğuma, yarı ömür ve polarizasyon; 4 hesaplanabilir deney.', 'RC, cooling, half-life and polarization; 4 reproducible experiments.')) + '</p><span class="science-lab-open">' + T('Bölümü aç →','Open section →') + '</span></a>').join('') + '</div><section class="card"><h2>' + esc(T('Cihaz desteği ve verinin anlamı', 'Device support and data meaning')) + '</h2><p>' + esc(T('Web, Electron ve Capacitor aynı arayüzü kullanır; sensör desteği cihaz, tarayıcı, HTTPS ve işletim sistemi izinlerine bağlıdır. Ses dBFS kalibre edilmiş dB SPL değildir; kamera parlaklığı lux değildir. Sismograf deprem erken uyarısı veya risk ölçümü yapmaz.', 'Web, Electron and Capacitor share this interface; sensor availability depends on hardware, browser, HTTPS and OS permissions. Audio dBFS is not calibrated dB SPL; camera brightness is not lux. The seismograph is not an earthquake warning or risk assessment.')) + '</p><a class="btn" href="#/dokumanlar/rapor">' + App.icon('note') + esc(T('Dokümanlarda deney raporu aç', 'Open experiment report in Documents')) + '</a></section>';
  }
  function models(host, id) {
    const M = App.scienceLabModel, ids = Object.keys(M.experiments);
    if (!Object.hasOwn(M.experiments, id || '')) id = ids[0];
    const def = M.experiments[id];
    host.innerHTML = '<section class="card science-model"><h2>' + esc(experimentLabel(id)) + '</h2><nav class="science-model-tabs" aria-label="' + esc(T('Yeni deney seç', 'Choose a new experiment')) + '">' + ids.map(k => '<a class="btn' + (k === id ? ' btn--primary' : '') + '" href="#/bilim-lab/modeller/' + k + '"' + (k === id ? ' aria-current="page"' : '') + '>' + esc(experimentLabel(k)) + '</a>').join('') + '</nav><p class="notice">' + esc(T('SİMÜLASYON · Donanımdan alınmış ölçüm değildir.', 'SIMULATION · Not a hardware measurement.')) + '</p><p>' + esc(T(def.assumptions[0], def.assumptions[1])) + '</p><p class="science-formula">' + esc(def.formula) + '</p><p>' + esc(T(def.question[0], def.question[1])) + '</p><form id="scienceModelForm"><div class="science-model-fields">' + def.fields.map(([key, label, value, min, max]) => '<label class="field">' + esc(label) + '<input class="input" data-model-param="' + key + '" type="number" min="' + min + '" max="' + max + '" step="any" value="' + value + '" required></label>').join('') + '</div><button class="btn btn--primary" type="submit">' + esc(T('Modeli hesapla', 'Calculate model')) + '</button></form><p id="scienceModelStatus" role="status"></p><output id="scienceModelResult"></output><canvas id="scienceModelChart" height="260" aria-label="' + esc(T('Kuramsal deney grafiği', 'Theoretical experiment chart')) + '"></canvas><div class="science-model-actions"><button class="btn" id="scienceModelCSV">CSV</button><button class="btn" id="scienceModelJSON">JSON</button><button class="btn" id="scienceModelReport">' + esc(T('Dokümanlarda raporla', 'Report in Documents')) + '</button></div></section>';
    let data;
    const $ = s => host.querySelector(s), out = $('#scienceModelResult');
    function calculate() {
      try {
        const p = {}; host.querySelectorAll('[data-model-param]').forEach(el => { p[el.dataset.modelParam] = el.value.trim() ? Number(el.value) : NaN; });
        data = { ...M.evaluate(id, p), name: experimentLabel(id) };
        $('#scienceModelChart').hidden = false;
        App.sensorLab.chart($('#scienceModelChart'), [{ pts: data.samples.map(s => [s.t, s.y]), color: 'accent' }], { xName: def.axis, yName: def.unit });
        out.textContent = T('İnceleme noktası: ', 'Probe: ') + data.probe.x.toPrecision(5) + ' ' + (id === 'polarization' ? '°' : 's') + ' → ' + data.probe.y.toPrecision(5) + ' ' + data.unit;
        $('#scienceModelStatus').textContent = T('201 kuramsal örnek hesaplandı.', '201 theoretical samples calculated.');
      } catch (e) { data = null; $('#scienceModelChart').hidden = true; out.textContent = ''; $('#scienceModelStatus').textContent = T('Geçerli aralıkta sonlu sayılar gir.', 'Enter finite numbers within the valid range.'); }
      host.querySelectorAll('.science-model-actions button').forEach(b => b.disabled = !data);
    }
    $('#scienceModelForm').onsubmit = e => { e.preventDefault(); calculate(); };
    host.querySelectorAll('[data-model-param]').forEach(el => el.addEventListener('input', () => { data = null; $('#scienceModelChart').hidden = true; out.textContent = ''; host.querySelectorAll('.science-model-actions button').forEach(b => b.disabled = true); $('#scienceModelStatus').textContent = T('Değişiklikleri hesapla.', 'Calculate your changes.'); }));
    $('#scienceModelJSON').onclick = () => { if (data) App.utils.downloadText('kampusai-' + id + '.json', JSON.stringify(data, null, 2), 'application/json'); };
    $('#scienceModelCSV').onclick = () => { if (data) App.utils.downloadText('kampusai-' + id + '.csv', 'x,y,unit,source\n' + data.samples.map(s => [s.t, s.y, data.unit, data.source].join(',')).join('\n'), 'text/csv;charset=utf-8'); };
    $('#scienceModelReport').onclick = () => { if (data) { App.prefs.set('discovery:labData', data); App.router.go('dokumanlar/rapor'); } };
    calculate();
  }
  function render(view, params = []) {
    const mode = sections.some(s => s[0] === params[0]) ? params[0] : 'genel';
    view.innerHTML = '<div class="page science-lab"><header class="science-lab-head"><h1>' + esc(title()) + '</h1><p>' + esc(T('Deneyler, cihaz sensörleri ve bilimsel modeller tek çalışma alanında.', 'Experiments, device sensors and scientific models in one workspace.')) + '</p></header><nav class="science-lab-tabs" aria-label="' + esc(T('Laboratuvar bölümleri', 'Laboratory sections')) + '">' + sections.map(s => '<a class="btn' + (s[0] === mode ? ' btn--primary' : '') + '" href="#/bilim-lab/' + s[0] + '"' + (s[0] === mode ? ' aria-current="page"' : '') + '>' + App.icon(s[1]) + esc(T(s[2], s[3])) + '</a>').join('') + '</nav><label class="science-lab-picker">'+T('Laboratuvar bölümü','Laboratory section')+'<select id="scienceLabSection">'+sections.map(s=>'<option value="'+s[0]+'"'+(s[0]===mode?' selected':'')+'>'+esc(T(s[2],s[3]))+'</option>').join('')+'</select></label><div class="science-lab-content"></div></div>';
    view.querySelector('#scienceLabSection').onchange=e=>App.router.go('bilim-lab/'+e.target.value);
    const host = view.querySelector('.science-lab-content');
    const cleanup = mode === 'grafik' ? App.router.handler('dokunsal-grafik')(host, params.slice(1)) : mode === 'vatandas' ? App.vatandas.render(host, params.slice(1)) : mode === 'gokyuzu' ? App.planetarium.render(host) : mode === 'deneyler' ? experiments(host, params.slice(1)) : mode === 'sensor' ? App.sensorLab.render(host, params.slice(1)) : mode === 'fizik' ? App.phonePhysics.render(host) : mode === 'titresim' ? App.seismograph.render(host) : mode === 'modeller' ? models(host, params[1]) : overview(host);
    host.querySelectorAll('h1').forEach(el => { const h = document.createElement('h2'); h.className = el.className; h.textContent = el.textContent; el.replaceWith(h); });
    const isExperiment = mode !== 'genel' && (mode !== 'deneyler' || !!host.querySelector('#labHost') || ['ph','ekosistem'].includes(params[1]));
    let guideCleanup;
    if (isExperiment) { const panel=document.createElement('section'); panel.className='card lab-inquiry'; host.before(panel); const resolved = mode==='modeller' ? (Object.hasOwn(App.scienceLabModel.experiments, params[1] || '') ? params[1] : Object.keys(App.scienceLabModel.experiments)[0]) : params.slice(1).join('/'); guideCleanup=App.labInquiry.mount(panel,host,mode+'/'+resolved); }
    App.setTitle(title()); App.hydrateIcons(view);
    return () => { if (guideCleanup) guideCleanup(); if (typeof cleanup === 'function') cleanup(); };
  }
  App.scienceLab = { render, migrateTools };
  App.router.register('bilim-lab', render);
})();
