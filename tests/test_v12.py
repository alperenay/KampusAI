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
SHOT = os.path.join(SP, "v12"); os.makedirs(SHOT, exist_ok=True)
def newctx(b, mobile=False, lang=None):
    ctx = b.new_context(viewport={"width": 390, "height": 844} if mobile else {"width": 1280, "height": 860})
    ctx.add_init_script("try { if (!localStorage.getItem('da:pref:tourDone')) localStorage.setItem('da:pref:tourDone', 'true'); } catch (e) {}")
    ctx.route("**/js/config.js", lambda r: r.fulfill(status=200, content_type="text/javascript", body=CONFIG))
    pg = ctx.new_page()
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto("http://localhost:8765/"); pg.wait_for_timeout(1500)
    return ctx, pg
def go(pg, h, wait=900):
    pg.evaluate("(h) => { if (location.hash === h) App.router.refresh(); else location.hash = h; }", h); pg.wait_for_timeout(wait)
KEY = "9/matematik/t1/k1"
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx, pg = newctx(b)
        # ---- Kazanım sayfasında Feynman kartı
        go(pg, "#/konular/" + KEY, 1200)
        check("kazanım sayfasında Feynman kartı", pg.locator('.fey-card a[href="#/anlat/' + KEY + '"]').count() == 1)
        # içerik olmayan bir kazanımda da kart var mı (12. sınıf)
        # ---- Feynman
        go(pg, "#/anlat/" + KEY, 1000)
        check("Feynman sayfası açıldı", pg.locator("#feyText").count() == 1, errs)
        pg.screenshot(path=os.path.join(SHOT, "fey-empty.png"))
        pg.fill("#feyText", "Küme kısa.")
        pg.click("#feyGo"); pg.wait_for_timeout(300)
        check("kısa metin reddedildi", pg.locator("#feyResult").count() == 0)
        text1 = "Küme, belirli ve iyi tanımlanmış nesnelerin topluluğudur. Her küme sonludur. Elemanlar süslü parantez içinde yazılır, örneğin A = {1, 2, 3}. "
        pg.fill("#feyText", text1)
        pg.reload(); pg.wait_for_timeout(1200)
        check("taslak sayfa yenilenince korunur", pg.locator("#feyText").input_value() == text1)
        pg.click("#feyGo")
        pg.wait_for_selector("#feyResult", timeout=20000)
        r1 = pg.locator(".fey-score__ring span").inner_text()
        check("puan hesaplandı (6+4+7+2)*2.5=48", r1 == "48", r1)
        check("4 ölçüt çubuğu", pg.locator(".fey-bars .bar-row").count() == 4)
        check("kavram yanılgısı gösterildi", "Her küme sonludur" in pg.locator(".fey-block--wrong").inner_text())
        check("LaTeX onarıldı ve çizildi", pg.locator(".fey-block--simple .katex").count() >= 1, pg.locator(".fey-block--simple").inner_html()[:300])
        check("kendine sor 3 soru", pg.locator(".fey-block--ask li").count() == 3)
        check("kaydedildi", pg.evaluate("async () => (await App.db.getAll('explains')).length") == 1)
        check("taslak temizlendi", pg.evaluate("(k) => App.prefs.get('feyDraft:' + k, null)", KEY) is None)
        pg.screenshot(path=os.path.join(SHOT, "fey-result.png"), full_page=True)
        # Düzelt → yeniden değerlendir (uzun metin → yüksek puan, artış gösterilir)
        pg.click('[data-fey="revise"]'); pg.wait_for_timeout(400)
        pg.fill("#feyText", "DÜZELTİLMİŞ: " + text1 + " Aslında sonsuz kümeler de vardır; doğal sayılar kümesi buna örnektir. Boş küme hiç elemanı olmayan kümedir.")
        pg.click("#feyGo"); pg.wait_for_function("() => document.querySelector('.fey-score__ring span') && document.querySelector('.fey-score__ring span').textContent !== '48'", timeout=20000)
        r2 = pg.locator(".fey-score__ring span").inner_text()
        check("ikinci deneme puanı 80", r2 == "80", r2)
        check("gelişim farkı gösterildi (+32)", "+32" in pg.locator(".fey-delta").inner_text(), pg.locator(".fey-delta").inner_text() if pg.locator(".fey-delta").count() else "yok")
        go(pg, "#/anlat/" + KEY, 1000)
        check("gelişim geçmişi 2 deneme", pg.locator(".fey-chip").count() == 2)
        go(pg, "#/konular/" + KEY, 1000)
        check("kartta son puan", "80/100" in pg.locator(".fey-card").inner_text(), pg.locator(".fey-card").inner_text())
        pg.screenshot(path=os.path.join(SHOT, "outcome-cards.png"), full_page=True)
        # asistan Feynman sonucunu biliyor mu (kaynak)
        chunks = pg.evaluate("async () => (await App.rag.buildChunks ? await App.rag.buildChunks() : []).filter(c => c.kind === 'feynman').length")
        # ---- Benzer soru: yanlış defterinden
        pg.evaluate("async () => App.mistakes.add({ source: 'quiz', key: '9/matematik/t1/k1', label: '9. Sınıf · Matematik · Kümeler', q: '$\\\\frac{1}{2} + 3$ kaçtır?', options: ['3', '3.5', '4', '4.5', '5'], answer: 1, chosen: 0, explain: 'Toplanır.' })")
        go(pg, "#/yanlislar/tumu")
        pg.locator('[data-mact="similar"]').first.click()
        pg.wait_for_selector(".sim-q", timeout=20000)
        check("3 benzer soru", pg.locator(".sim-q").count() == 3, pg.locator(".sim-q").count())
        log = json.loads(__import__("urllib.request").request.urlopen("http://127.0.0.1:8787/__log").read())
        last = [x for x in log if ":streamGenerateContent" in x["url"]][-1]["body"]
        check("istekte orijinal soru ve doğru cevap var", "ORİJİNAL SORU" in json.dumps(last, ensure_ascii=False) and "Doğru cevap: B" in json.dumps(last, ensure_ascii=False))
        n0 = pg.evaluate("async () => (await App.db.getAll('mistakes')).length")
        pg.click('.sim-q[data-i="0"] .opt[data-o="1"]'); pg.wait_for_timeout(300)
        check("doğru cevap anında işaretlendi", pg.locator('.sim-q[data-i="0"]').get_attribute("class").find("is-right") > -1)
        pg.click('.sim-q[data-i="1"] .opt[data-o="3"]'); pg.wait_for_timeout(500)
        check("yanlış → çözüm gösterildi", pg.locator('.sim-q[data-i="1"] .quiz-q__explain').is_visible())
        check("yanlış → deftere eklendi", pg.evaluate("async () => (await App.db.getAll('mistakes')).length") == n0 + 1)
        check("puan satırı", "1 / 2" in pg.locator("#simScore").inner_text(), pg.locator("#simScore").inner_text())
        pg.screenshot(path=os.path.join(SHOT, "similar.png"))
        pg.click('[data-sim="more"]'); pg.wait_for_selector(".sim-q", timeout=20000); pg.wait_for_timeout(300)
        check("3 yeni soru daha", pg.locator(".sim-q.is-right, .sim-q.is-missed").count() == 0 and pg.locator(".sim-q").count() == 3)
        pg.keyboard.press("Escape"); pg.wait_for_timeout(300)
        go(pg, "#/yanlislar/tumu")
        check("kaynak etiketi 'Benzer soru'", pg.locator(".mis .chip-model", has_text="Benzer soru").count() >= 1)
        # ---- Benzer soru: fotoğraflı elle eklenen (görsel modele gider)
        pg.evaluate("async () => { const r = await fetch('soru.png').catch(() => null); }")
        pg.click("#misAdd"); pg.wait_for_timeout(300)
        pg.fill("#mfLabel", "Foto"); pg.set_input_files("#mfImg", os.path.join(SP, "soru.png")); pg.wait_for_timeout(800)
        pg.click("#mfSave"); pg.wait_for_timeout(600)
        card = pg.locator(".mis", has_text="Foto").first
        card.locator('[data-mact="similar"]').click()
        pg.wait_for_selector(".sim-q", timeout=20000)
        log = json.loads(__import__("urllib.request").request.urlopen("http://127.0.0.1:8787/__log").read())
        last = [x for x in log if ":streamGenerateContent" in x["url"]][-1]["body"]
        check("fotoğraf modele gönderildi", any("inlineData" in pt for pt in last["contents"][-1]["parts"]))
        pg.keyboard.press("Escape")
        # ---- Konu sonu testinde yanlış sorudan benzer soru
        go(pg, "#/test/9/fizik/u1/k1"); pg.wait_for_selector(".quiz-q", timeout=20000)
        pg.click('.opt[data-q="0"][data-o="0"]')
        pg.click("#qFinish"); pg.wait_for_timeout(300); pg.locator(".modal .btn--primary").last.click()
        pg.wait_for_selector(".quiz-result", timeout=5000)
        check("yanlış sorularda 'Benzer soru üret'", pg.locator("[data-sim-i]").count() == 10, pg.locator("[data-sim-i]").count())
        pg.locator('[data-sim-i="0"]').click(); pg.wait_for_selector(".sim-q", timeout=20000)
        check("testten benzer soru açıldı", pg.locator(".sim-q").count() == 3)
        pg.keyboard.press("Escape")
        # ---- Sohbetten benzer soru
        go(pg, "#/")
        pg.fill("#composerInput", "2x + 4 = 10 ise x kaçtır?"); pg.keyboard.press("Enter")
        pg.wait_for_selector(".msg__foot", timeout=20000)
        pg.locator('.msg__foot [data-act="similar"]').click(); pg.wait_for_selector(".sim-q", timeout=20000)
        log = json.loads(__import__("urllib.request").request.urlopen("http://127.0.0.1:8787/__log").read())
        last = [x for x in log if ":streamGenerateContent" in x["url"]][-1]["body"]
        check("sohbetten benzer soru (kullanıcının sorusu gitti)", "2x + 4 = 10" in json.dumps(last, ensure_ascii=False))
        pg.keyboard.press("Escape")
        # ---- Asistan Feynman verisini görüyor
        pg.fill("#composerInput", "kümeleri anlatırken nerede eksiğim vardı"); pg.keyboard.press("Enter")
        pg.wait_for_timeout(4000)
        log = json.loads(__import__("urllib.request").request.urlopen("http://127.0.0.1:8787/__log").read())
        last = [x for x in log if ":streamGenerateContent" in x["url"]][-1]["body"]
        check("asistan bağlamında Feynman sonucu", "Feynman" in json.dumps(last, ensure_ascii=False))
        # ---- Eşitleme: explains diğer cihaza geçer
        pg.evaluate("async () => { await App.sync.start(null); }")
        code = pg.evaluate("() => App.sync.code()")
        ctx2, pg2 = newctx(b, mobile=True)
        pg2.evaluate("async (c) => { await App.sync.start(c); }", code)
        check("Feynman denemeleri telefona eşitlendi", pg2.evaluate("async () => (await App.db.getAll('explains')).length") == 2)
        go(pg2, "#/anlat/" + KEY, 1200)
        pg2.screenshot(path=os.path.join(SHOT, "phone-fey.png"), full_page=True)
        go(pg2, "#/yanlislar/tumu"); pg2.locator('[data-mact="similar"]').first.click(); pg2.wait_for_selector(".sim-q", timeout=20000); pg2.wait_for_timeout(300)
        pg2.screenshot(path=os.path.join(SHOT, "phone-similar.png"))
        # İngilizce
        pg2.keyboard.press("Escape")
        pg2.evaluate("() => App.i18n.setLang('en')"); go(pg2, "#/anlat/" + KEY, 1200)
        pg2.screenshot(path=os.path.join(SHOT, "phone-fey-en.png"))
        check("İngilizce başlık", "Explain it" in pg2.locator("h1").inner_text(), pg2.locator("h1").inner_text())
        b.close()
finally:
    for pr in procs: pr.terminate()
print("\nerrors:", errs[:10])
print("%d/%d PASS" % (sum(res), len(res)))
