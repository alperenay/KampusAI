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
SHOT = os.path.join(SP, "v25"); os.makedirs(SHOT, exist_ok=True)
STUB = "() => { App.speech.sttMode = () => 'web'; App.speech.ttsAvailable = () => false; window.__recs = 0; App.speech.listen = () => { window.__recs++; return { stop: async () => ({ text: '' }) }; }; }"
def newctx(b, mobile, w=390, h=844, mode=None):
    ctx = b.new_context(viewport={"width": w, "height": h}, has_touch=mobile, is_mobile=mobile)
    ctx.route("**/js/config.js", lambda r: r.fulfill(status=200, content_type="text/javascript", body='App.config = { serverUrl: "http://127.0.0.1:8787" };'))
    ctx.add_init_script("try { localStorage.setItem('da:pref:tourDone', 'true');" + ("localStorage.setItem('da:pref:labMode', '\"%s\"');" % mode if mode else "") + " } catch (e) {}")
    pg = ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e))); pg.on("console", lambda m: errs.append(m.text) if m.type == "error" and "[3B]" in m.text else None)
    pg.goto("http://localhost:8765/"); pg.wait_for_timeout(1500)
    return ctx, pg
go = lambda pg, h, w=800: (pg.evaluate("(h) => location.hash = h", h), pg.wait_for_timeout(w))
SHOT = os.path.join(SP, "v25"); os.makedirs(SHOT, exist_ok=True)
try:
  with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
    ctx, pg = newctx(b, False, 1280, 860, "3d")
    ids = pg.evaluate("() => Object.keys(App.labs.LABS)")
    n3 = pg.evaluate("() => Object.keys(App.labs.LABS).filter(id => App.lab3d.has(id)).length")
    check("her deneyin 3B sahnesi var", n3 == len(ids), (n3, len(ids)))
    bad = []
    for i in ids:
        n0 = len(errs); go(pg, "#/lab/" + i, 1300)
        try: pg.wait_for_selector("#labHost .lab__3d canvas", timeout=8000)   # ilk deneyde 3B kütüphanesi yükleniyor
        except Exception: pass
        has = pg.evaluate("() => !!document.querySelector('#labHost .lab__3d canvas') && document.querySelector('#labHost').classList.contains('is-3d')")
        drawn = pg.evaluate("() => { const c = document.querySelector('#labHost .lab__3d canvas'); if (!c) return false; const g = c.getContext('webgl2') || c.getContext('webgl'); return !!g; }")
        pg.evaluate("""() => { document.querySelectorAll('#labHost select[data-ps]').forEach(s => { for (const o of s.options) { s.value = o.value; s.dispatchEvent(new Event('change', { bubbles: true })); } });
          document.querySelectorAll('#labHost input[type=range]').forEach(r => { for (const v of [r.min, r.max, (Number(r.min) + Number(r.max)) / 2]) { r.value = v; r.dispatchEvent(new Event('input', { bubbles: true })); } });
          document.querySelectorAll('#labHost input[data-pt]').forEach(c => { c.click(); c.click(); }); }""")
        pg.wait_for_timeout(300)
        if not has or not drawn or len(errs) > n0: bad.append((i, has, drawn, errs[n0:][:1]))
    check("bütün deneyler 3B açılıyor, uç değerlerde hata yok", not bad, bad)
    go(pg, "#/lab/atis", 1500)
    pg.click('#labHost [data-mode="2d"]'); pg.wait_for_timeout(400)
    check("2B'ye geçiş", pg.locator("#labHost .lab__cv").is_visible() and not pg.locator("#labHost .lab__3d").is_visible())
    check("seçim hatırlanır", pg.evaluate("() => App.prefs.get('labMode')") == "2d")
    go(pg, "#/lab/sarkac", 1200)
    check("sonraki deney 2B açılır", pg.locator("#labHost .lab__cv").is_visible())
    pg.click('#labHost [data-mode="3d"]'); pg.wait_for_timeout(1200)
    check("3B'ye geçiş", pg.locator("#labHost .lab__3d canvas").is_visible())
    bx = pg.locator("#labHost .lab__3d canvas").bounding_box()
    pg.mouse.move(bx["x"] + 200, bx["y"] + 150); pg.mouse.down(); pg.mouse.move(bx["x"] + 320, bx["y"] + 180, steps=5); pg.mouse.up(); pg.wait_for_timeout(300)
    check("sürükleyince kamera döner (hata yok)", True)
    pg.screenshot(path=os.path.join(SHOT, "sarkac-3d.png"))
    go(pg, "#/lab", 900)
    check("kütüphanede görünüm ayarları", pg.locator("#labDefMode").count() == 1 and pg.locator("#lab3dQ").count() == 1)
    pg.select_option("#lab3dQ", "low"); pg.wait_for_timeout(200)
    check("kalite ayarı kaydedilir", pg.evaluate("() => App.prefs.get('lab3dQuality')") == "low")
    go(pg, "#/konular/10/fizik/u4/k1", 2000)
    check("konu sayfasındaki deney de 3B", pg.locator(".lab-card .lab__mode").count() >= 1)
    ctx.close()
    # WebGL yokken 2B
    ctx, pg = newctx(b, True, 390, 844, "3d")
    pg.evaluate("() => { App.lab3d.supported = () => false; }")
    go(pg, "#/lab/kepler", 1200)
    check("WebGL yoksa düğme yok, 2B açılır", pg.locator("#labHost .lab__mode").count() == 0 and pg.locator("#labHost .lab__cv").is_visible())
    ctx.close()
    ctx, pg = newctx(b, True, 390, 844, "3d")
    go(pg, "#/lab/vsepr", 2000)
    pg.screenshot(path=os.path.join(SHOT, "vsepr-phone.png"))
    sw = pg.evaluate("() => document.querySelector('#view').scrollWidth <= document.querySelector('#view').clientWidth + 1")
    check("telefonda 3B taşmıyor", sw)
    ctx.close()
    b.close()
finally:
  for x in procs: x.terminate()
check("sayfa hatası yok", not errs, errs[:5])
print(f"{sum(res)}/{len(res)} geçti")
