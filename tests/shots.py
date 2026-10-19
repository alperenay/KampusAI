import subprocess, sys, time, os, socket
from playwright.sync_api import sync_playwright
SP = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(SP, sys.argv[1] if len(sys.argv) > 1 else "shots"); os.makedirs(OUT, exist_ok=True)
def up(port):
    s = socket.socket(); r = s.connect_ex(("127.0.0.1", port)); s.close(); return r == 0
procs = []
if not up(8787): procs.append(subprocess.Popen(["node", "--no-warnings", os.path.join(SP, "worker_dev2.mjs")], stdout=subprocess.DEVNULL))
if not up(8765): procs.append(subprocess.Popen([sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1", "-d", "/home/claude/ders-asistani"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL))
time.sleep(1.2)
try:
  with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=1, has_touch=True, is_mobile=True)
    ctx.route("**/js/config.js", lambda r: r.fulfill(status=200, content_type="text/javascript", body='App.config = { serverUrl: "http://127.0.0.1:8787" };'))
    ctx.add_init_script("try { localStorage.setItem('da:pref:tourDone', 'true'); } catch (e) {}")
    pg = ctx.new_page(); pg.goto("http://localhost:8765/"); pg.wait_for_timeout(1500)
    def shot(name, h=None, js=None, wait=700):
        if h is not None: pg.evaluate("(h) => location.hash = h", h); pg.wait_for_timeout(wait)
        if js: pg.evaluate(js); pg.wait_for_timeout(wait)
        pg.screenshot(path=os.path.join(OUT, name + ".png"))
    shot("voice", "#/", "() => { App.speech.sttMode = () => 'web'; App.speech.listen = () => ({ stop: async () => ({ text: '' }) }); App.voice.open(); }")
    shot("voice_speaking", None, "() => { const o = document.querySelector('.voice-overlay'); }")
    pg.evaluate("() => App.voice.close()")
    shot("modal_confirm", "#/", "() => { App.ui.confirm('Bu sohbet silinsin mi?', 'Sil', true); }")
    pg.evaluate("() => document.querySelector('.modal-backdrop [data-close]').click()")
    shot("menu_open", "#/bugun", "() => document.getElementById('tabMore').click()")
    pg.evaluate("() => document.getElementById('scrim').click()")
    for r in ["bugun", "odak", "denemeler", "yanlislar", "simulasyon", "anlat/9/matematik/t1/k1", "test/9/matematik/t1/k1", "konular/9/matematik/t1/k1", "kontrol", "program", "rapor", "harita", "puan", "hesap"]:
        shot(r.replace("/", "_"), "#/" + r, wait=1200)
    shot("modal_settings", "#/", "() => document.querySelector('[data-open-settings], #openSettings, .sidebar__settings') && document.querySelector('[data-open-settings], #openSettings, .sidebar__settings').click()")
    b.close()
finally:
  for x in procs: x.terminate()
