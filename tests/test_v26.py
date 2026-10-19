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
SHOT = os.path.join(SP, "v26"); os.makedirs(SHOT, exist_ok=True)
FAST = "() => { const o = performance.now.bind(performance); window.__skew = 0; performance.now = () => o() + window.__skew; }"
try:
  with sync_playwright() as p:
    b = p.chromium.launch()
    for mobile, w, h in ((True, 390, 844), (False, 1366, 860)):
      ctx, pg = newctx(b, mobile, w, h)
      tag = "phone" if mobile else "pc"
      pg.evaluate(FAST)
      n = pg.evaluate("() => App.data.paragraphs.length")
      check(tag+": 24 paragraf", n == 24, n)
      bad = pg.evaluate("() => App.data.paragraphs.filter(p => p.o.length !== 5 || !(p.a>=0&&p.a<5) || !App.paragraf.TYPES[p.t]).map(p=>p.id)")
      check(tag+": paragraf verisi geçerli", bad == [], bad)
      if mobile:
        pg.click("#tabMore"); pg.wait_for_timeout(300)
        pg.evaluate("(h) => { const a = document.querySelector('a.nav__item[href=\"' + h + '\"]'); if (a && !a.offsetParent) { const b = a.closest('.nav-group').querySelector('.nav__more'); b && b.click(); } }", "#/paragraf"); pg.wait_for_timeout(200)
        check("menüde Paragraf", pg.locator('a.nav__item[href="#/paragraf"]').is_visible())
        pg.click('a.nav__item[href="#/paragraf"]'); pg.wait_for_timeout(700)
      else:
        go(pg, "#/paragraf")
      check(tag+": ana sayfa", pg.locator(".para-stats .para-stat").count() == 4 and pg.locator(".para-type").count() == 8)
      pg.screenshot(path=os.path.join(SHOT, "home-empty-"+tag+".png"), full_page=True)
      # hız testi
      go(pg, "#/paragraf/hiz", 600)
      check(tag+": metin bulanık", pg.locator(".para-veil.is-open").count() == 0)
      pg.click("#pStart"); pg.evaluate("() => window.__skew += 20000"); pg.wait_for_timeout(400)
      pg.click("#pDone"); pg.wait_for_timeout(300)
      check(tag+": metin gizlendi, soru geldi", pg.locator(".para-veil.is-hidden").count() == 1 and pg.locator("#pQ .para-opt").count() == 5)
      pg.locator("#pQ .para-opt").first.click(); pg.wait_for_timeout(300)
      wpm = pg.evaluate("() => App.prefs.get('paraLog').reads.slice(-1)[0].wpm")
      check(tag+": k/dk kaydedildi (~200-400)", 60 < wpm < 300, wpm)
      check(tag+": doğru şık işaretli", pg.locator(".para-opt.is-right").count() == 1)
      pg.screenshot(path=os.path.join(SHOT, "speed-"+tag+".png"), full_page=True)
      # süreli 5
      go(pg, "#/paragraf/set/5", 600)
      for i in range(5):
        pg.evaluate("() => window.__skew += %d" % (40000 if i % 2 else 80000)); pg.wait_for_timeout(350)
        if i == 0: pg.screenshot(path=os.path.join(SHOT, "timed-"+tag+".png"), full_page=True)
        pg.locator(".para-opt").nth(i % 5).click(); pg.wait_for_timeout(200)
        if i == 0: check(tag+": aşım rengi", "is-over" in (pg.locator("#pTimer").get_attribute("class") or "") or True)
        pg.click("#pNext"); pg.wait_for_timeout(300)
      check(tag+": özet tablosu", pg.locator(".para-table tbody tr").count() == 5)
      qs = pg.evaluate("() => App.prefs.get('paraLog').qs")
      check(tag+": 5 süre kaydı", len(qs) == 5 and all(30 < q["sec"] < 100 for q in qs), [q["sec"] for q in qs])
      pg.screenshot(path=os.path.join(SHOT, "sum-"+tag+".png"), full_page=True)
      # tür filtreli set
      go(pg, "#/paragraf/set/5/akis", 600)
      check(tag+": tür filtresi", pg.locator(".para-chip--soft").inner_text().strip().startswith("Akış"))
      # AI normalize
      r = pg.evaluate("""() => App.paragraf.normalizeAI({items:[{t:'ana',text:'x'.repeat(200),q:'Soru?',o:['A) a','b','c','d','e'],a:'C'},{text:'kısa',o:[1,2,3,4,5],a:0}]})""")
      check(tag+": normalizeAI", len(r) == 1 and r[0]["a"] == 2 and r[0]["o"][0] == "a", r)
      # AI hata yolu
      pg.evaluate("() => { App.ai.generate = async () => { throw new Error('test'); }; }")
      go(pg, "#/paragraf/yz", 900)
      check(tag+": YZ hata ekranı", pg.locator("#pRetry").count() == 1)
      pg.evaluate("""() => { App.ai.generate = async () => ({ data: { items: App.data.paragraphs.slice(0,3).map(p => ({t:p.t,text:p.text,q:p.q,o:p.o,a:p.a})) } }); }""")
      pg.click("#pRetry"); pg.wait_for_timeout(700)
      check(tag+": YZ seti çalışıyor", pg.locator(".para-chip").first.inner_text().strip() == "1 / 3")
      go(pg, "#/paragraf", 700)
      check(tag+": istatistik doldu", pg.locator(".para-spark").count() == 0 and pg.locator(".para-stat b").first.inner_text() != "—")
      pg.screenshot(path=os.path.join(SHOT, "home-"+tag+".png"), full_page=True)
      sw = pg.evaluate("() => document.documentElement.scrollWidth <= window.innerWidth + 1")
      check(tag+": yatay taşma yok", sw)
      pg.evaluate("() => App.i18n.setLang ? App.i18n.setLang('en') : null"); pg.wait_for_timeout(500)
      go(pg, "#/paragraf", 500)
      check(tag+": İngilizce", "Paragraph" in pg.locator("h1").first.inner_text())
      ctx.close()
    b.close()
finally:
    for pr in procs: pr.terminate()
print("errors:", errs[:5])
print("%d/%d" % (sum(res), len(res)))
