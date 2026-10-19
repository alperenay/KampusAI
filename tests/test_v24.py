import subprocess, sys, time, os, socket
from playwright.sync_api import sync_playwright
SP = os.path.dirname(os.path.abspath(__file__))
def up(port):
    s = socket.socket(); r = s.connect_ex(("127.0.0.1", port)); s.close(); return r == 0
procs = []
if not up(8787): procs.append(subprocess.Popen(["node", "--no-warnings", os.path.join(SP, "worker_dev2.mjs")], stdout=subprocess.DEVNULL))
if not up(8765): procs.append(subprocess.Popen([sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1", "-d", "/home/claude/ders-asistani"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL))
time.sleep(1.2)
res, errs = [], []
def check(n, c, info=""):
    res.append(bool(c)); print(("PASS " if c else "FAIL ") + n + ("" if c else " — " + str(info)[:300]))
SHOT = os.path.join(SP, "v24"); os.makedirs(SHOT, exist_ok=True)
STUB = "() => { App.speech.sttMode = () => 'web'; App.speech.ttsAvailable = () => false; window.__recs = 0; App.speech.listen = () => { window.__recs++; return { stop: async () => ({ text: '' }) }; }; }"
def newctx(b, mobile, w=390, h=844):
    ctx = b.new_context(viewport={"width": w, "height": h}, has_touch=mobile, is_mobile=mobile)
    ctx.route("**/js/config.js", lambda r: r.fulfill(status=200, content_type="text/javascript", body='App.config = { serverUrl: "http://127.0.0.1:8787" };'))
    ctx.add_init_script("try { localStorage.setItem('da:pref:tourDone', 'true'); } catch (e) {}")
    pg = ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto("http://localhost:8765/"); pg.wait_for_timeout(1500)
    return ctx, pg
go = lambda pg, h, w=800: (pg.evaluate("(h) => location.hash = h", h), pg.wait_for_timeout(w))
box = lambda pg, sel: pg.locator(sel).first.bounding_box()
SHOT = os.path.join(SP, "v24"); os.makedirs(SHOT, exist_ok=True)
FAST = "() => { const o = performance.now.bind(performance); window.__skew = 0; performance.now = () => o() + window.__skew; }"
try:
  with sync_playwright() as p:
    b = p.chromium.launch()
    ctx, pg = newctx(b, True)
    pg.evaluate(FAST)
    pg.click("#tabMore"); pg.wait_for_timeout(300)
    pg.evaluate("(h) => { const a = document.querySelector('a.nav__item[href=\"' + h + '\"]'); if (a && !a.offsetParent) { const b = a.closest('.nav-group').querySelector('.nav__more'); b && b.click(); } }", "#/oyunlar"); pg.wait_for_timeout(200)
    check("menüde Oyunlar sekmesi", pg.locator('a.nav__item[href="#/oyunlar"]').is_visible())
    pg.click('a.nav__item[href="#/oyunlar"]'); pg.wait_for_timeout(800)
    check("oyunlar sayfası: 9 oyun", pg.locator(".game-card").count() == 9, pg.locator(".game-card").count())
    check("sınıflandırma: 6 grup", pg.locator(".games-hub .lab-group").count() == 6)
    pg.screenshot(path=os.path.join(SHOT, "hub-phone.png"))
    pg.click('[data-cat="kimya"]'); pg.wait_for_timeout(200)
    check("kategori süzgeci", pg.locator(".game-card").count() == 2)
    pg.click('[data-cat="all"]')
    # 1) D/Y
    go(pg, "#/oyunlar/dy", 600); pg.click("[data-go]"); pg.wait_for_timeout(600)
    check("D/Y kartı", pg.locator("#dyCard .dy__text").inner_text().strip() != "")
    for k in range(6): pg.click('[data-a="1"]'); pg.wait_for_timeout(750)
    pg.screenshot(path=os.path.join(SHOT, "dy-phone.png"))
    pg.evaluate("() => window.__skew = 61000"); pg.wait_for_timeout(500)
    check("D/Y bitiş ekranı ve skor", pg.locator(".game-end").count() == 1)
    pg.evaluate("() => window.__skew = 0")
    fl = pg.evaluate("""() => { let n = 0, ok = 0; const facts = []; App.data.curriculum.grades.forEach(g => g.subjects.forEach(s => s.units.forEach(u => u.outcomes.forEach(o => (o.content && o.content.ozet || []).forEach(f => facts.push(App.L(f))))))); return facts.length; }""")
    check("yeterli hap bilgi", fl > 500, fl)
    # 2) eşleştirme
    go(pg, "#/oyunlar/eslestir", 600); pg.click("[data-go]"); pg.wait_for_timeout(600)
    check("eşleştirme tahtası 5+5", pg.locator(".match__a").count() == 5 and pg.locator(".match__b").count() == 5)
    ks = pg.evaluate("() => Array.from(document.querySelectorAll('.match__a')).map(b => b.dataset.k)")
    for k in ks:
        pg.locator(".match__a[data-k=\"%s\"]" % k.replace('"', '\\"')).click(); pg.locator(".match__b[data-k=\"%s\"]" % k.replace('"', '\\"')).click(); pg.wait_for_timeout(120)
    pg.wait_for_timeout(600)
    check("1. tur bitti → 2. tur", "2/" in pg.locator(".match__hud").inner_text() or pg.locator(".game-end").count() == 1)
    pg.screenshot(path=os.path.join(SHOT, "match-phone.png"))
    # 9) işlem
    go(pg, "#/oyunlar/islem", 600); pg.click("[data-go]"); pg.wait_for_timeout(400)
    q = pg.locator("#qQ").inner_text()
    check("işlem sorusu ve 4 seçenek", "= ?" in q and pg.locator(".qz__opt").count() == 4, q)
    pg.screenshot(path=os.path.join(SHOT, "islem-phone.png"))
    # 8) grafik
    go(pg, "#/oyunlar/grafik", 600); pg.click("[data-go]"); pg.wait_for_timeout(600)
    check("grafik: çizim + 4 seçenek (KaTeX)", pg.locator(".gr .qz__opt").count() == 4 and pg.locator(".gr .katex").count() >= 4)
    pg.screenshot(path=os.path.join(SHOT, "grafik-phone.png"))
    # 4) hedef
    go(pg, "#/oyunlar/hedef", 600)
    check("hedef: 10 bölüm, yalnız ilki açık", pg.locator(".hd-lv").count() == 10 and pg.locator(".hd-lv:disabled").count() == 9)
    pg.click('[data-lv="0"]'); pg.wait_for_timeout(400)
    v = (20 * 9.8) ** 0.5
    pg.evaluate("(v) => { const a = document.querySelector('#hA'); a.value = 45; a.dispatchEvent(new Event('input')); const s = document.querySelector('#hV'); s.value = v; s.dispatchEvent(new Event('input')); }", round(v * 2) / 2)
    pg.click("#hdGo"); pg.wait_for_timeout(2500)
    check("doğru atış vurur (v = √(Rg))", pg.locator(".hd").count() == 1 and pg.evaluate("() => (App.prefs.get('gameHedef', {}).stars || [])[0] === 3"), pg.locator("#hdHint").inner_text() if pg.locator("#hdHint").count() else "")
    pg.screenshot(path=os.path.join(SHOT, "hedef-phone.png"))
    # 5) denklem
    go(pg, "#/oyunlar/denklem", 600); pg.click("[data-go]"); pg.wait_for_timeout(300)
    f = pg.locator(".eq-line").inner_text()
    check("ilk tepkime H₂ + O₂", "H₂" in f and "O₂" in f, f)
    pg.locator('[data-k="0"][data-d="1"]').click(); pg.wait_for_timeout(100); pg.locator('[data-k="2"][data-d="1"]').click(); pg.wait_for_timeout(200)
    check("2H₂ + O₂ → 2H₂O denkleşti", pg.locator(".eq-done").count() == 1)
    pg.wait_for_timeout(1100)
    check("sonraki tepkimeye geçti", "2/" in pg.locator(".eq .dy__hud").inner_text())
    pg.screenshot(path=os.path.join(SHOT, "denklem-phone.png"))
    # 6) periyodik
    go(pg, "#/oyunlar/periyodik", 600); pg.click('[data-m="yer"]'); pg.wait_for_timeout(300)
    sym = pg.locator("#ptC b").inner_text()
    e = pg.evaluate("(s) => { const e = App.data.elements.bySym(s); return [e.group, e.period]; }", sym)
    pg.locator('.pt-cell[data-g="%d"][data-p="%d"]' % (e[0], e[1])).click(); pg.wait_for_timeout(200)
    check("periyodik: doğru hücre doldu", pg.locator(".pt-cell.is-on").count() == 1 and pg.locator("#ptL").inner_text() == "19")
    pg.screenshot(path=os.path.join(SHOT, "periyodik-phone.png"))
    # 10) tarih
    go(pg, "#/oyunlar/tarih", 600); pg.click("[data-go]"); pg.wait_for_timeout(300)
    evs = pg.evaluate("() => Array.from(document.querySelectorAll('.tl-ev')).map(b => b.dataset.e)")
    yrs = pg.evaluate("(evs) => evs.map(e => App.data.historyEvents.find(x => x[1] === e)[0])", evs)
    for _, ev in sorted(zip(yrs, evs)): pg.locator('.tl-ev[data-e="%s"]' % ev).click(); pg.wait_for_timeout(80)
    pg.click("#tlCheck"); pg.wait_for_timeout(200)
    check("tarih: doğru sıra 5/5", pg.locator(".tl-list li.is-ok").count() == 5)
    pg.screenshot(path=os.path.join(SHOT, "tarih-phone.png"))
    # 12) kelime
    go(pg, "#/oyunlar/kelime", 600); pg.click("[data-go]"); pg.wait_for_timeout(300)
    pg.click("#kwC"); pg.wait_for_timeout(200)
    check("kelime kartı çevrilir", pg.locator(".kw-mean").count() == 1)
    pg.screenshot(path=os.path.join(SHOT, "kelime-phone.png"))
    pg.click('[data-k="0"]'); pg.wait_for_timeout(800)
    check("bilmediğim kelime desteye eklendi", len(pg.evaluate("() => App.prefs.get('vocabLearn', [])")) == 1)
    sw = pg.evaluate("() => document.querySelector('#view').scrollWidth <= document.querySelector('#view').clientWidth + 1")
    check("telefonda taşma yok", sw)
    ctx.close()
    ctx, pg = newctx(b, False, 1366, 860)
    go(pg, "#/oyunlar", 900); pg.screenshot(path=os.path.join(SHOT, "hub-desktop.png"))
    go(pg, "#/oyunlar/grafik", 600); pg.click("[data-go]"); pg.wait_for_timeout(600); pg.screenshot(path=os.path.join(SHOT, "grafik-desktop.png"))
    go(pg, "#/oyunlar/periyodik", 600); pg.click('[data-m="yer36"]'); pg.wait_for_timeout(300); pg.screenshot(path=os.path.join(SHOT, "pt-desktop.png"))
    pg.evaluate("() => App.i18n.setLang('en')"); go(pg, "#/oyunlar", 800)
    check("İngilizce oyunlar", "Games" in pg.locator("h1").inner_text())
    ctx.close()
    b.close()
finally:
  for x in procs: x.terminate()
check("sayfa hatası yok", not errs, errs[:5])
print(f"{sum(res)}/{len(res)} geçti")
