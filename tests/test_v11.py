import subprocess, sys, time, os, json, socket
from playwright.sync_api import sync_playwright
SP = os.path.dirname(os.path.abspath(__file__))
SITE = "/home/claude/ders-asistani"
def up(port):
    s = socket.socket(); r = s.connect_ex(("127.0.0.1", port)); s.close(); return r == 0
procs = []
if not up(8787): procs.append(subprocess.Popen(["node", "--no-warnings", os.path.join(SP, "worker_dev2.mjs")]))
if not up(8765): procs.append(subprocess.Popen([sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1", "-d", SITE], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL))
time.sleep(1.2)
res, errs = [], []
def check(n, c, info=""):
    res.append(c); print(("PASS " if c else "FAIL ") + n + ("" if c else " — " + str(info)[:400]))
CONFIG = 'App.config = { serverUrl: "http://127.0.0.1:8787" };'
SHOT = os.path.join(SP, "v11")
os.makedirs(SHOT, exist_ok=True)

def newctx(b, mobile=False):
    ctx = b.new_context(viewport={"width": 390, "height": 844} if mobile else {"width": 1280, "height": 860})
    ctx.add_init_script("try { if (!localStorage.getItem('da:pref:tourDone')) localStorage.setItem('da:pref:tourDone', 'true'); } catch (e) {}")
    ctx.route("**/js/config.js", lambda r: r.fulfill(status=200, content_type="text/javascript", body=CONFIG))
    pg = ctx.new_page()
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append("console: " + m.text) if m.type == "error" and "favicon" not in m.text else None)
    pg.goto("http://localhost:8765/"); pg.wait_for_timeout(1500)
    return ctx, pg

def go(pg, h, wait=900):
    pg.evaluate("(h) => location.hash = h", h); pg.wait_for_timeout(wait)

try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx, pg = newctx(b)
        # ---- Smoke: tüm yeni sayfalar
        for h, name in [("#/yanlislar", "mis"), ("#/odak", "focus"), ("#/denemeler", "exams"), ("#/program/benim", "plan"), ("#/", "home")]:
            n = len(errs); go(pg, h)
            check("sayfa açıldı " + h, len(errs) == n and pg.locator("#view").inner_text().strip() != "", errs[n:])
            pg.screenshot(path=os.path.join(SHOT, name + ".png"))
        check("ana ekranda YKS sayacı", pg.locator(".yks-count").count() == 1)
        check("menüde Yanlış Defteri ve Odak", pg.locator('a[href="#/yanlislar"]').count() >= 1 and pg.locator('a[href="#/odak"]').count() >= 1)

        # ---- Konu sonu testi (10 soru)
        go(pg, "#/konular/9/fizik/u1/k1", 1200)
        quizLink = pg.locator('a[href^="#/test/"]')
        check("kazanım sayfasında test kartı", quizLink.count() >= 1)
        pg.screenshot(path=os.path.join(SHOT, "outcome.png"), full_page=False)
        quizLink.first.click()
        pg.wait_for_selector(".quiz-q", timeout=20000)
        check("10 soru üretildi", pg.locator(".quiz-q").count() == 10, pg.locator(".quiz-q").count())
        check("LaTeX çizildi", pg.locator(".quiz-q .katex").count() >= 10)
        check("şık önekleri temizlendi", not pg.locator(".opt__text").first.inner_text().startswith("A)"), pg.locator(".opt__text").first.inner_text())
        # 6 doğru (B=1), 2 yanlış, 2 boş
        for i in range(8):
            pg.click('.opt[data-q="%d"][data-o="%d"]' % (i, 1 if i < 6 else 0))
        check("ilerleme 8/10", "8" in pg.locator("#qProgress").inner_text())
        pg.click("#qFinish"); pg.wait_for_timeout(400)
        pg.locator(".modal .btn--primary, .modal .btn--danger").last.click()
        pg.wait_for_selector(".quiz-result", timeout=5000)
        txt = pg.locator(".quiz-result").inner_text()
        check("puan 6/10", "6" in pg.locator(".quiz-score__big").inner_text(), txt)
        pg.screenshot(path=os.path.join(SHOT, "quiz-result.png"), full_page=True)
        nq = pg.evaluate("async () => (await App.db.getAll('quizzes')).length")
        nm = pg.evaluate("async () => (await App.db.getAll('mistakes')).length")
        check("test kaydedildi", nq == 1, nq)
        check("4 yanlış/boş deftere eklendi", nm == 4, nm)

        # ---- Yanlış defteri
        go(pg, "#/yanlislar/tumu")
        check("defterde 4 kart", pg.locator(".mis").count() == 4, pg.locator(".mis").count())
        pg.locator('[data-mact="reveal"]').first.click(); pg.wait_for_timeout(200)
        check("açınca doğru şık işaretli", pg.locator(".mis .opt.is-correct").count() >= 1)
        pg.locator('[data-mact="knew"]').first.click(); pg.wait_for_timeout(300)
        rv = pg.evaluate("async () => (await App.db.getAll('mistakes')).map(m => m.reviews).sort().join(',')")
        check("Bildim → tekrar sayısı arttı", rv.endswith("1"), rv)
        # bugün tekrar edilecekleri göster: birini vadesi gelmiş yap
        pg.evaluate("async () => { const a = await App.db.getAll('mistakes'); a[0].nextAt = new Date(Date.now()-1000).toISOString(); a[0].reviews=0; await App.db.put('mistakes', a[0]); }")
        go(pg, "#/yanlislar")
        check("Bugün sekmesinde vadesi gelen", pg.locator(".mis").count() == 1, pg.locator(".mis").count())
        check("menü rozeti", pg.locator("#misBadge").inner_text().strip() == "1", pg.locator("#misBadge").inner_text())
        pg.screenshot(path=os.path.join(SHOT, "mistakes.png"))
        # elle ekle
        pg.click("#misAdd"); pg.wait_for_timeout(300)
        pg.fill("#mfLabel", "Matematik · Türev"); pg.fill("#mfQ", "$x^2$ türevi?"); pg.set_input_files("#mfImg", os.path.join(SP, "soru.png")); pg.wait_for_timeout(800)
        pg.click("#mfSave"); pg.wait_for_timeout(500)
        check("elle eklenen soru (fotoğraflı)", pg.evaluate("async () => (await App.db.getAll('mistakes')).some(m => m.source==='manual' && m.image)"))
        # sohbetten deftere ekle
        go(pg, "#/")
        pg.fill("#composerInput", "türev nedir"); pg.keyboard.press("Enter")
        pg.wait_for_selector(".msg__foot", timeout=20000)
        btn = pg.locator('.msg__foot [data-act="to-mistakes"]')
        check("sohbette 'deftere ekle' düğmesi", btn.count() == 1)
        if btn.count(): btn.click(); pg.wait_for_timeout(500)
        check("sohbetten deftere eklendi", pg.evaluate("async () => (await App.db.getAll('mistakes')).some(m => m.source==='chat' && /Sunucu/.test(m.explain||''))"))

        # ---- Pomodoro
        go(pg, "#/odak")
        pg.evaluate("() => { App.prefs.set('focusCfg', {focus: 0.05, short: 0.05, long: 0.05, every: 4}); App.focus.reset(); }")
        go(pg, "#/odak"); go(pg, "#/odak")
        pg.click("#fMain"); pg.wait_for_timeout(300)
        go(pg, "#/yanlislar", 300)
        check("sayaç çalışıyor + üst çubuk göstergesi", pg.locator("#focusChip").is_visible())
        pg.screenshot(path=os.path.join(SHOT, "focus-chip.png"))
        pg.wait_for_timeout(3500)
        ns = pg.evaluate("async () => (await App.db.getAll('sessions')).length")
        check("odak oturumu kaydedildi", ns == 1, ns)
        check("molaya geçti", pg.evaluate("() => App.focus.state().phase") in ("short", "long"), pg.evaluate("() => JSON.stringify(App.focus.state())"))
        pg.evaluate("() => { App.prefs.set('focusCfg', {}); App.focus.reset(); }")
        go(pg, "#/odak"); pg.screenshot(path=os.path.join(SHOT, "focus.png"))

        # ---- Hedefler
        go(pg, "#/denemeler")
        pg.locator("[data-goal-edit]").first.click(); pg.wait_for_timeout(300)
        pg.fill("#gTotal", "90"); pg.click("#gSave"); pg.wait_for_timeout(700)
        check("TYT hedefi kaydedildi", pg.evaluate("() => App.goals.targetTotal('TYT')") == 90)
        check("hedef kartı güncellendi", "90" in pg.locator(".goal-card").first.inner_text(), pg.locator(".goal-card").first.inner_text())
        pg.screenshot(path=os.path.join(SHOT, "goals.png"))

        # ---- Yapay zekâ ile haftalık plan
        go(pg, "#/program/benim")
        pg.click("#aiPlan"); pg.wait_for_timeout(400)
        pg.screenshot(path=os.path.join(SHOT, "plan-form.png"))
        pg.click("#pGo")
        pg.wait_for_selector("#pApply", timeout=20000)
        pg.screenshot(path=os.path.join(SHOT, "plan-preview.png"))
        pg.click("#pApply"); pg.wait_for_timeout(800)
        blocks = pg.evaluate("async () => { const s = await App.db.getAll('schedules'); const p = s.find(x => x.blocks && x.blocks.length); return p ? p.blocks.length : 0 }")
        check("plan uygulandı (çakışanlar ayıklandı: 14 blok)", blocks == 14, blocks)
        pg.screenshot(path=os.path.join(SHOT, "plan-applied.png"))

        # ---- Eşitleme: cihaz A başlatır, cihaz B katılır
        pg.click("#settingsBtn"); pg.wait_for_timeout(400)
        pg.click("#setSync"); pg.wait_for_timeout(300)
        pg.click("#syncNew"); pg.wait_for_selector(".sync-code", timeout=10000)
        code = pg.locator(".sync-code").inner_text().strip()
        check("eşitleme kodu üretildi", len(code) == 14, code)
        check("QR çizildi", pg.locator("#syncQr svg").count() == 1)
        pg.screenshot(path=os.path.join(SHOT, "sync-on.png"))
        pg.keyboard.press("Escape")
        ctx2, pg2 = newctx(b, mobile=True)
        pg2.evaluate("() => App.modules.settings.open()"); pg2.wait_for_timeout(400)
        pg2.click("#setSync"); pg2.wait_for_timeout(300)
        pg2.fill("#syncCode", code.replace("-", "").lower()); pg2.click("#syncJoin")
        pg2.wait_for_selector(".sync-code", timeout=10000)
        pg2.keyboard.press("Escape"); pg2.wait_for_timeout(500)
        cnt = lambda q: q.evaluate("async () => { const o = {}; for (const s of ['mistakes','quizzes','sessions','schedules']) o[s] = (await App.db.getAll(s)).length; o.goal = App.goals.targetTotal('TYT'); return o }")
        a, bb = cnt(pg), cnt(pg2)
        check("B, A'nın verilerini aldı", a == bb, (a, bb))
        # B'de silme → A'ya yayılır; A'da düzenleme → B'ye
        pg2.evaluate("async () => { const m = (await App.db.getAll('mistakes'))[0]; await App.db.remove('mistakes', m.id); await App.sync.run(); }")
        pg.evaluate("async () => { await App.sync.run(); }")
        check("silme A'ya yayıldı", cnt(pg)["mistakes"] == bb["mistakes"] - 1, cnt(pg))
        pg.evaluate("async () => { await App.goals.save({ targets: { TYT: { total: 100, per: {} }, AYT: { total: null, per: {} } } }); await App.sync.run(); }")
        pg2.evaluate("async () => { await App.sync.run(); await App.goals.load(); }")
        check("hedef değişikliği B'ye geçti", pg2.evaluate("() => App.goals.targetTotal('TYT')") == 100)
        # anahtarlar ve token eşitlenmemeli
        pg.evaluate("() => App.prefs.set('gemKey', 'AIza-SECRET')")
        pg.evaluate("async () => { await App.db.put('notes', {id:'n-x', text:'a'}); await App.sync.run(); }")
        pg2.evaluate("async () => App.sync.run()")
        check("anahtar diğer cihaza gitmedi", pg2.evaluate("() => App.prefs.get('gemKey', '')") == "")
        check("not B'ye geçti", pg2.evaluate("async () => !!(await App.db.get('notes','n-x'))"))
        # otomatik eşitleme (yazma sonrası ~4 sn)
        pg.evaluate("async () => App.db.put('notes', {id:'n-auto', text:'oto'})")
        pg.wait_for_timeout(6000)
        pg2.evaluate("async () => App.sync.run()")
        check("otomatik eşitleme", pg2.evaluate("async () => !!(await App.db.get('notes','n-auto'))"))
        go(pg2, "#/yanlislar/tumu"); pg2.screenshot(path=os.path.join(SHOT, "phone-mistakes.png"))
        go(pg2, "#/odak"); pg2.screenshot(path=os.path.join(SHOT, "phone-focus.png"))
        go(pg2, "#/"); pg2.screenshot(path=os.path.join(SHOT, "phone-home.png"))
        # İngilizce
        pg2.evaluate("() => App.i18n.set ? App.i18n.set('en') : null"); go(pg2, "#/odak")
        pg2.screenshot(path=os.path.join(SHOT, "phone-focus-en.png"))
        b.close()
finally:
    for pr in procs: pr.terminate()
print("\nerrors:", errs[:10])
print("%d/%d PASS" % (sum(res), len(res)))
