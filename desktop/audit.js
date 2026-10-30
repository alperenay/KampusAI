// Executed only by DA_SMOKE_OUT inside an isolated packaged-app profile.
module.exports = async function auditRenderer() {
  const errors = [], results = [];
  const onError = (e) => errors.push(String(e.message || e.reason && e.reason.message || e.reason));
  window.addEventListener('error', onError); window.addEventListener('unhandledrejection', onError);
  const oldAI = App.ai.generate;
  App.ai.generate = async () => ({ model: 'audit-fixture', data: { questions: Array.from({ length: 30 }, (_, i) => ({ q: 'Audit ' + i + ': x + 1 = 2?', options: ['1','2','3','4','5'], answer: 0, difficulty: 1 + i % 3, explain: 'x = 1', reasonOptions: ['Subtract one from both sides.','Add one.','Multiply by two.'], reasonAnswer: 0, hints: ['Keep equality.','Use the inverse operation.','Subtract one.'] })) } });
  const navigate = (r) => new Promise((resolve) => {
    let timer; const done = () => { clearTimeout(timer); window.removeEventListener('da:route', done); resolve(); };
    window.addEventListener('da:route', done); timer = setTimeout(done, 10000); App.router.go(r);
  });
  try {
    App.modules.aiSettings.askPriority = () => {};
    if (App.tour.isActive()) App.tour.finish(true);
    App.prefs.set('tourDone', true);
    await new Promise((r) => setTimeout(r, 250));
    document.querySelectorAll('.modal-backdrop [data-close]').forEach((b) => b.click());
    // Enumerating the library requires its on-demand registries, just as visiting it does.
    // Keep production startup lazy; only this isolated packaged-app audit preloads them.
    if (App.lazy) await App.lazy.load(['labs', 'games']);
    const key = App.learnmap.allOutcomes().find((x) => x.outcome.content || x.outcome.curatedContent).key;
    const routes = [...new Set(App.hub.TOOLS.map((x) => x[0]).concat(Object.keys(App.labs.LABS).map((id) => 'lab/' + id), Object.keys(App.games.GAMES).map((id) => 'oyunlar/' + id), ['konusma/de', 'sensor/olcum', 'test/' + key, 'konular/' + key, 'aktarim/calis/oran', 'hata-avcisi/calis/Fizik']))];
    for (const route of routes) {
      await navigate(route);
      await new Promise((r) => setTimeout(r, 20));
      const text = document.querySelector('#view').innerText;
      results.push({ route, resolved: App.router.current().path, ok: !!text.trim() && !/TypeError:|ReferenceError:|SyntaxError:|is not a function|Cannot read properties/.test(text) });
    }
    // A genuine persisted practice operation through the packaged app:// bridge.
    let s = App.practice.create('transfer', 'oran');
    for (let i = 0; i < 3; i++) s = App.practice.answer(s, App.practice.question(s, i).answer, null, 100);
    await App.practice.save(s); const saved = await App.practice.finish(s);
    if (saved.metrics.complete !== 3) throw new Error('Native practice persistence failed');
    // Exercise real local document imports through packaged app:// MIME/worker handling.
    const source = 'Photosynthesis stores light energy as chemical energy. Oxygen is released during the process.';
    const stream = 'BT /F1 12 Tf 50 700 Td (' + source + ') Tj ET';
    const objects = ['<< /Type /Catalog /Pages 2 0 R >>', '<< /Type /Pages /Kids [3 0 R] /Count 1 >>', '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 900 800] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>', '<< /Length ' + stream.length + ' >>\nstream\n' + stream + '\nendstream'];
    let pdf = '%PDF-1.4\n';const offsets = [];
    objects.forEach((o, i) => { offsets.push(pdf.length);pdf += (i + 1) + ' 0 obj\n' + o + '\nendobj\n'; });
    const xref = pdf.length;
    pdf += 'xref\n0 6\n0000000000 65535 f \n' + offsets.map(n => String(n).padStart(10, '0') + ' 00000 n \n').join('') + 'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n' + xref + '\n%%EOF';
    const pdfText = await App.documentImport.read(new File([pdf], 'smoke.pdf', { type: 'application/pdf' }));
    if (!pdfText.includes('Photosynthesis')) throw new Error('Packaged PDF parser failed');
    await App.utils.loadScript('assets/vendor/fflate/fflate.js');
    const docx = window.fflate.zipSync({ 'word/document.xml': window.fflate.strToU8('<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>' + source + '</w:t></w:r></w:p></w:body></w:document>') });
    const docxText = await App.documentImport.read(new File([docx], 'smoke.docx'));
    if (!docxText.includes('Photosynthesis')) throw new Error('Packaged DOCX parser failed');
    await App.db.put('notes', { id: 'not:packaged-smoke', title: 'Packaged notebook', text: source });
    await App.db.put('meta', { id: 'homework:packaged-smoke', ...App.studyWorkspaceModel.task({ title: 'Review source', due: '2026-11-10', steps: ['Read', 'Practise'] }) });
    if (!(await App.db.get('notes', 'not:packaged-smoke')).text.includes('Photosynthesis')) throw new Error('Packaged notebook persistence failed');
    results.push({ route: 'workspace-native-integration', ok: true, parsers: ['PDF', 'DOCX'], persistence: ['notes', 'meta'] });
    await navigate('');
    return { width: innerWidth, engine: navigator.userAgent, mode: 'packaged renderer, AI fixture, no physical hardware certification', results, errors, ok: results.every((r) => r.ok) && errors.length === 0 };
  } finally {
    App.ai.generate = oldAI; window.removeEventListener('error', onError); window.removeEventListener('unhandledrejection', onError);
  }
};
