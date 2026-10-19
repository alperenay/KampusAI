import subprocess, sys, time, os, socket
from playwright.sync_api import sync_playwright
SP = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(SP, "navshots"); os.makedirs(OUT, exist_ok=True)
def up(port):
    s = socket.socket(); r = s.connect_ex(("127.0.0.1", port)); s.close(); return r == 0
procs = []
if not up(8765): procs.append(subprocess.Popen([sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1", "-d", "/home/claude/ders-asistani"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL))
time.sleep(1); errs=[]
try:
  with sync_playwright() as p:
    b = p.chromium.launch()
    for tag, vp, mob in [("m", (390, 844), True), ("d", (1440, 900), False)]:
        ctx = b.new_context(viewport={"width": vp[0], "height": vp[1]}, has_touch=mob, is_mobile=mob)
        ctx.add_init_script("try { localStorage.setItem('da:pref:tourDone', 'true'); } catch (e) {}")
        pg = ctx.new_page(); pg.on("pageerror", lambda e: errs.append(str(e))); pg.goto("http://localhost:8765/"); pg.wait_for_timeout(1500)
        pg.evaluate("() => App.demo.load()"); pg.wait_for_timeout(1500)
        pg.evaluate("() => { location.hash = '#/x'; location.hash = '#/'; }"); pg.wait_for_timeout(1200)
        pg.screenshot(path=f"{OUT}/{tag}_home.png")
        if mob: pg.click("#tabMore"); pg.wait_for_timeout(400); pg.screenshot(path=f"{OUT}/{tag}_menu.png"); pg.mouse.click(380, 400); pg.wait_for_timeout(300)
        pg.click("#quickBtn"); pg.wait_for_timeout(300); pg.screenshot(path=f"{OUT}/{tag}_quick.png"); pg.keyboard.press("Escape")
        pg.click("#searchBtn"); pg.wait_for_timeout(300); pg.screenshot(path=f"{OUT}/{tag}_pal0.png")
        pg.keyboard.type("parabol"); pg.wait_for_timeout(300); pg.screenshot(path=f"{OUT}/{tag}_pal1.png")
        pg.keyboard.press("Escape")
        ctx.close()
    b.close()
finally:
  for x in procs: x.terminate()
print(errs)
