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
    const key = App.learnmap.allOutcomes().find((x) => x.outcome.content || x.outcome.curatedContent).key;
    const routes = [...new Set(App.hub.TOOLS.map((x) => x[0]).concat(Object.keys(App.labs.LABS).map((id) => 'lab/' + id), Object.keys(App.games.GAMES).map((id) => 'oyunlar/' + id), ['test/' + key, 'konular/' + key, 'aktarim/calis/oran', 'hata-avcisi/calis/Fizik']))];
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
    await navigate('');
    return { width: innerWidth, engine: navigator.userAgent, mode: 'packaged renderer, AI fixture, no physical hardware certification', results, errors, ok: results.every((r) => r.ok) && errors.length === 0 };
  } finally {
    App.ai.generate = oldAI; window.removeEventListener('error', onError); window.removeEventListener('unhandledrejection', onError);
  }
};
