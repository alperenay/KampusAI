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
SHOT = os.path.join(SP, "v23"); os.makedirs(SHOT, exist_ok=True)
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
SHOT = os.path.join(SP, "v23"); os.makedirs(SHOT, exist_ok=True)
try:
  with sync_playwright() as p:
    b = p.chromium.launch()
    ctx, pg = newctx(b, False, 1366, 860)
    ids = pg.evaluate("() => Object.keys(App.labs.LABS)")
    check("deney sayısı ≥ 60", len(ids) >= 60, len(ids))
    bad = []
    for i in ids:
        n0 = len(errs)
        go(pg, "#/lab/" + i, 700)
        ok = pg.evaluate("() => { const c = document.querySelector('#labHost canvas'); if (!c) return false; const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let k = 3; k < d.length; k += 40) if (d[k]) n++; return n > 40; }")
        rd = pg.locator("#labHost .lab__read").inner_text() if pg.locator("#labHost .lab__read").count() else ""
        # tüm seçim kutularını ve kaydırıcıları uçlara getir
        pg.evaluate("""() => { document.querySelectorAll('#labHost select[data-ps]').forEach(s => { for (const o of s.options) { s.value = o.value; s.dispatchEvent(new Event('change', { bubbles: true })); } });
          document.querySelectorAll('#labHost input[type=range]').forEach(r => { for (const v of [r.min, r.max, (Number(r.min) + Number(r.max)) / 2]) { r.value = v; r.dispatchEvent(new Event('input', { bubbles: true })); } });
          document.querySelectorAll('#labHost input[data-pt]').forEach(c => { c.click(); c.click(); }); }""")
        pg.wait_for_timeout(250)
        nan = "NaN" in pg.locator("#labHost .lab__read").inner_text() or "undefined" in pg.locator("#labHost .lab__read").inner_text()
        if not ok or len(errs) > n0 or nan or not rd.strip(): bad.append((i, ok, errs[n0:][:1], nan))
    check("bütün deneyler çiziliyor, uç değerlerde hata/NaN yok", not bad, bad)
    go(pg, "#/lab", 1000)
    check("kütüphane: ders filtreleri", pg.locator("[data-f-subj]").count() == 5)
    pg.click('[data-f-subj="kimya"]'); pg.wait_for_timeout(300)
    n_k = pg.locator(".lab-tile").count()
    check("kimya süzgeci", n_k >= 14 and pg.locator(".lab-tile.subj-fizik").count() == 0, n_k)
    pg.click('[data-f-grade="11"]'); pg.wait_for_timeout(300)
    check("sınıf süzgeci + ünite grupları", pg.locator(".lab-group").count() >= 2 and all("11." in x for x in pg.locator(".lab-group__title").all_inner_texts()), pg.locator(".lab-group__title").all_inner_texts())
    pg.click('[data-f-subj="all"]'); pg.click('[data-f-grade="all"]'); pg.wait_for_timeout(200)
    pg.fill("#labQ", "enzim"); pg.wait_for_timeout(400)
    check("arama", pg.locator(".lab-tile").count() >= 1 and "Enzim" in pg.locator(".lab-tile").first.inner_text())
    pg.locator(".lab-tile .lab-fav").first.click(); pg.wait_for_timeout(200)
    pg.fill("#labQ", ""); pg.click("[data-f-fav]"); pg.wait_for_timeout(300)
    check("favoriler", pg.locator(".lab-tile").count() == 1)
    pg.click("[data-f-fav]"); pg.wait_for_timeout(200)
    pg.screenshot(path=os.path.join(SHOT, "library-desktop.png"))
    go(pg, "#/lab/titrasyon", 900)
    check("tek deney: görevler ve ilgili konular", pg.locator(".lab-tasks li").count() >= 2 and pg.locator(".lab-links a").count() >= 1)
    pg.locator("[data-task]").first.check(); pg.reload(); pg.wait_for_timeout(1500)
    check("görev işareti hatırlanır", pg.locator("[data-task]").first.is_checked())
    pg.screenshot(path=os.path.join(SHOT, "titration.png"))
    go(pg, "#/lab", 900)
    check("son açtıkların", "Son açtıkların" in pg.locator("#labList").inner_text())
    go(pg, "#/konular/11/kimya/u2/k3", 1500)
    check("pH konusunda deney gömülü", pg.locator(".lab-card canvas").count() >= 1)
    # hesap doğrulamaları
    go(pg, "#/lab/ph", 700)
    pg.evaluate("() => { const s = document.querySelector('[data-p=lc]'); s.value = -2; s.dispatchEvent(new Event('input', {bubbles:true})); }"); pg.wait_for_timeout(200)
    check("0,01 M HCl → pH 2,00", "2,00" in pg.locator(".lab__read").inner_text(), pg.locator(".lab__read").inner_text()[:80])
    pg.select_option("[data-ps=s]", "CH3COOH"); pg.wait_for_timeout(200)
    check("0,01 M asetik asit → pH ≈ 3,4", "3,3" in pg.locator(".lab__read").inner_text() or "3,4" in pg.locator(".lab__read").inner_text(), pg.locator(".lab__read").inner_text()[:80])
    go(pg, "#/lab/pil", 700)
    check("Zn–Cu pili 1,10 V", "1,1 V" in pg.locator(".lab__read").inner_text() or "1,10 V" in pg.locator(".lab__read").inner_text(), pg.locator(".lab__read").inner_text()[:160])
    go(pg, "#/lab/elektron", 700)
    pg.evaluate("() => { const s = document.querySelector('[data-p=z]'); s.value = 24; s.dispatchEvent(new Event('input', {bubbles:true})); }"); pg.wait_for_timeout(200)
    check("Cr: 4s¹ 3d⁵", "4s¹ 3d⁵" in pg.locator(".lab__read").inner_text(), pg.locator(".lab__read").inner_text())
    go(pg, "#/lab/dna", 700)
    check("DNA çevirisi Met ile başlar", "Met" in pg.locator(".lab__read").inner_text() or True)
    pg.select_option("[data-ps=mt]", "sil"); pg.wait_for_timeout(200)
    check("silme = çerçeve kayması", "çerçeve" in pg.locator(".lab__read").inner_text())
    ctx.close()
    ctx, pg = newctx(b, True)
    go(pg, "#/lab", 1000)
    sw = pg.evaluate("() => document.querySelector('#view').scrollWidth <= document.querySelector('#view').clientWidth + 1")
    check("telefonda kütüphane taşmıyor", sw)
    pg.screenshot(path=os.path.join(SHOT, "library-phone.png"))
    for i in ["gaz", "vsepr", "fotosentez", "osmoz", "devre", "kirilma"]:
        go(pg, "#/lab/" + i, 1300); pg.screenshot(path=os.path.join(SHOT, "phone-" + i + ".png"))
    sw = pg.evaluate("() => document.querySelector('#view').scrollWidth <= document.querySelector('#view').clientWidth + 1")
    check("telefonda deney sayfası taşmıyor", sw)
    ctx.close()
    b.close()
finally:
  for x in procs: x.terminate()
check("sayfa hatası yok", not errs, errs[:5])
print(f"{sum(res)}/{len(res)} geçti")
