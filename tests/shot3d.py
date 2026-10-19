import sys, os, subprocess, socket, time
from playwright.sync_api import sync_playwright
SP = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(SP, "s3d"); os.makedirs(OUT, exist_ok=True)
def up(port):
    s = socket.socket(); r = s.connect_ex(("127.0.0.1", port)); s.close(); return r == 0
pr = None
if not up(8765): pr = subprocess.Popen([sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1", "-d", "/home/claude/ders-asistani"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
errs = []
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
    ctx = b.new_context(viewport={"width": 1280, "height": 860})
    ctx.add_init_script("try { localStorage.setItem('da:pref:tourDone', 'true'); localStorage.setItem('da:pref:labMode', '\"3d\"'); } catch (e) {}")
    pg = ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e))); pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
    pg.goto("http://localhost:8765/"); pg.wait_for_timeout(1500)
    for i in sys.argv[1:]:
        pg.evaluate("(h) => location.hash = h", "#/lab/" + i); pg.wait_for_timeout(2200)
        el = pg.locator(".lab__stage").first
        el.screenshot(path=os.path.join(OUT, i + ".png"))
    print(pg.evaluate("() => App.prefs.get('labMode')"))
    b.close()
if pr: pr.terminate()
print(errs[:10])
