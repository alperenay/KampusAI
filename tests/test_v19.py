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
SHOT = os.path.join(SP, "v19"); os.makedirs(SHOT, exist_ok=True)
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
try:
  with sync_playwright() as p:
    b = p.chromium.launch()
    # ===== Telefon =====
    ctx, pg = newctx(b, True)
    tb = box(pg, "#tabbar")
    check("alt sekme çubuğu ekranın altında", tb and tb["y"] + tb["height"] >= 840 and tb["height"] >= 56, tb)
    go(pg, "#/bugun")
    check("Bugün sekmesi seçili", "is-active" in pg.locator('.tabbar__item[data-route="bugun"]').get_attribute("class"))
    go(pg, "#/konular/9/fizik")
    check("Konular sekmesi alt sayfada da seçili", "is-active" in pg.locator('.tabbar__item[data-route="konular"]').get_attribute("class"))
    pg.locator('.tabbar__item[data-route="denemeler"]').click(); pg.wait_for_timeout(600)
    check("sekmeye dokununca sayfa açılır", pg.evaluate("() => location.hash") == "#/denemeler")
    pg.click("#tabMore"); pg.wait_for_timeout(300)
    check("Menü sekmesi yan menüyü açar", pg.evaluate("() => document.getElementById('app').classList.contains('is-menu-open')"))
    pg.mouse.click(380, 820); pg.wait_for_timeout(300)
    check("Menü yerine tekrar dokununca menü kapanır", not pg.evaluate("() => document.getElementById('app').classList.contains('is-menu-open')"))
    pg.evaluate("() => document.documentElement.classList.add('kb-open')")
    check("klavye açıkken sekmeler gizli", not pg.locator("#tabbar").is_visible())
    pg.evaluate("() => document.documentElement.classList.remove('kb-open')")
    # Sesli öğretmen
    go(pg, "#/")
    pg.evaluate(STUB); pg.evaluate("() => App.voice.open()"); pg.wait_for_timeout(500)
    e, m, ps = box(pg, "#vEnd"), box(pg, "#vMain"), box(pg, "#vPause")
    check("Bitir / ana düğme / Duraklat ekranın alt çeyreğinde", all(x and x["y"] > 844 * 0.72 for x in (e, m, ps)), (e, m, ps))
    check("düğmeler büyük (≥ 56 px)", e["height"] >= 56 and m["height"] >= 80, (e, m))
    check("dinlerken ana düğme 'Gönder'", "Gönder" in pg.locator("#vMain").inner_text())
    pg.screenshot(path=os.path.join(SHOT, "voice-phone.png"))
    pg.click("#vPause"); pg.wait_for_timeout(200)
    check("Duraklat: mikrofon kapanır, 'Devam et' görünür", "Devam et" in pg.locator("#vMain").inner_text() and "Duraklatıldı" in pg.locator("#vState").inner_text())
    n = pg.evaluate("() => window.__recs")
    pg.click("#vOrb"); pg.wait_for_timeout(200)
    check("küreye dokunmak dinlemeyi sürdürür", pg.evaluate("() => window.__recs") == n + 1 and "Gönder" in pg.locator("#vMain").inner_text())
    pg.click("#vEnd"); pg.wait_for_timeout(400)
    check("Bitir kapatır, sayfa yerinde", pg.locator(".voice-overlay").count() == 0 and pg.evaluate("() => location.hash") == "#/")
    pg.evaluate("() => App.voice.open()"); pg.wait_for_timeout(300)
    pg.evaluate("() => history.back()"); pg.wait_for_timeout(500)
    check("geri tuşu sesli öğretmeni kapatır", pg.locator(".voice-overlay").count() == 0 and pg.evaluate("() => location.hash") == "#/")
    # Sohbet olursa kayıt + sohbete geçiş, geçmiş bozulmaz
    pg.evaluate("() => App.voice.open()"); pg.wait_for_timeout(300)
    pg.evaluate("""() => { App.ai.run = async () => ({ text: 'Cevap.', models: [] }); }""")
    pg.evaluate("() => { const ta = document.querySelector('#vMain'); }")
    pg.evaluate("() => App.speech.listen = (o) => ({ stop: async () => ({ text: 'Merhaba öğretmen' }) })")
    pg.click("#vMain"); pg.wait_for_timeout(300)  # gönder (dinleme bu yeni stub ile yeniden başlar)
    pg.evaluate("() => { App.voice.isOpen() }")
    pg.click("#vMain"); pg.wait_for_timeout(900)
    pg.click("#vEnd"); pg.wait_for_timeout(900)
    check("sesli sohbet kaydedilip sohbete geçildi", pg.evaluate("() => location.hash").startswith("#/sohbet/"), pg.evaluate("() => location.hash"))
    # Alttan açılan pencere
    go(pg, "#/")
    pg.evaluate("() => { window.__c = App.ui.confirm('Silinsin mi?', 'Sil', true); }"); pg.wait_for_timeout(400)
    mb = box(pg, ".modal")
    check("telefonda pencere alttan açılır, tam genişlik", mb and abs(mb["y"] + mb["height"] - 844) < 3 and mb["width"] >= 388, mb)
    check("onay düğmeleri altta", box(pg, ".modal [data-ok]")["y"] > 844 * 0.8)
    check("dokunmatikte yazı kutusuna otomatik odak yok", pg.evaluate("() => document.activeElement.tagName") not in ("INPUT", "TEXTAREA"))
    pg.screenshot(path=os.path.join(SHOT, "sheet-phone.png"))
    # başlığı aşağı çek
    pg.evaluate("""() => { const h = document.querySelector('.modal__head'); const r = h.getBoundingClientRect();
      const t = (y) => new Touch({ identifier: 1, target: h, clientX: r.left + 40, clientY: y });
      h.dispatchEvent(new TouchEvent('touchstart', { touches: [t(r.top + 10)], bubbles: true }));
      h.dispatchEvent(new TouchEvent('touchmove', { touches: [t(r.top + 160)], bubbles: true }));
      h.dispatchEvent(new TouchEvent('touchend', { touches: [], bubbles: true })); }""")
    pg.wait_for_timeout(300)
    check("aşağı çekince kapanır", pg.locator(".modal-backdrop").count() == 0 and pg.evaluate("async () => (await window.__c) === false"))
    # Ayarlar penceresi (uzun içerik) kaydırılabilir ve başlık sabit
    pg.click("#tabMore"); pg.wait_for_timeout(300); pg.click("#settingsBtn"); pg.wait_for_timeout(600)
    sb = box(pg, ".modal")
    check("ayarlar penceresi ekrana sığar", sb and sb["y"] >= 20 and sb["y"] + sb["height"] <= 845, sb)
    pg.screenshot(path=os.path.join(SHOT, "settings-phone.png"))
    pg.keyboard.press("Escape"); pg.wait_for_timeout(300)
    # Konu sayfası alt çubuğu
    go(pg, "#/konular/9/fizik/u1/k2", 1000)
    db = box(pg, ".lesson-dock")
    check("konu sayfasında alt kısayol çubuğu ekranda", db and db["y"] + db["height"] <= 844 - 56 and db["y"] > 844 * 0.7, db)
    check("çubukta Test, Anlat, Önceki, Sonraki", all(x in pg.locator(".lesson-dock").inner_text() for x in ("Test", "Anlat", "Önceki", "Sonraki")))
    pg.click("#dockDone"); pg.wait_for_timeout(400)
    check("Tamamla → Bitti, ilerleme kaydedildi", "Bitti" in pg.locator("#dockDone").inner_text() and pg.evaluate("async () => !!(await App.db.get('progress','9/fizik/u1/k2')||{}).done"))
    pg.click("#dockDone"); pg.wait_for_timeout(300)
    check("tekrar dokununca geri alınır", "Tamamla" in pg.locator("#dockDone").inner_text())
    pg.screenshot(path=os.path.join(SHOT, "lesson-phone.png"))
    pg.locator(".lesson-dock a", has_text="Sonraki").click(); pg.wait_for_timeout(700)
    check("Sonraki ile sonraki kazanım", pg.evaluate("() => location.hash") == "#/konular/9/fizik/u1/k3", pg.evaluate("() => location.hash"))
    # Taşma kontrolü 360 px
    ctx.close()
    ctx, pg = newctx(b, True, 360, 740)
    bad = []
    for r in ["#/", "#/bugun", "#/konular/9/matematik/t1/k1", "#/denemeler", "#/yanlislar", "#/simulasyon", "#/odak", "#/hesap"]:
        go(pg, r, 900)
        sw = pg.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
        if sw > 2: bad.append((r, sw))
        t = box(pg, "#tabbar")
        if not t or t["y"] + t["height"] < 735: bad.append((r, "sekme", t))
    check("360 px: taşma yok, sekme çubuğu altta", not bad, bad)
    ctx.close()
    # ===== Masaüstü =====
    ctx, pg = newctx(b, False, 1280, 860)
    check("masaüstünde sekme çubuğu yok", not pg.locator("#tabbar").is_visible())
    go(pg, "#/konular/9/fizik/u1/k2", 900)
    check("masaüstünde konu alt çubuğu yok, eski gezinme var", not pg.locator(".lesson-dock").is_visible() and pg.locator(".lesson-nav").is_visible())
    pg.evaluate("() => { App.ui.confirm('Silinsin mi?', 'Sil', true); }"); pg.wait_for_timeout(400)
    mb = box(pg, ".modal")
    check("masaüstünde pencere ortada", mb and mb["width"] < 600 and abs((mb["y"] + mb["height"] / 2) - 430) < 40, mb)
    pg.keyboard.press("Escape")
    pg.evaluate(STUB); pg.evaluate("() => App.voice.open()"); pg.wait_for_timeout(400)
    m = box(pg, "#vMain")
    check("masaüstünde de sesli öğretmen kontrolleri altta", m and m["y"] > 860 * 0.7, m)
    pg.screenshot(path=os.path.join(SHOT, "voice-desktop.png"))
    ctx.close()
    b.close()
finally:
  for x in procs: x.terminate()
check("sayfa hatası yok", not errs, errs[:5])
print(f"{sum(res)}/{len(res)} geçti")
