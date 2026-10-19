import subprocess, sys, time, os, json, urllib.request
from playwright.sync_api import sync_playwright
SP = os.path.dirname(os.path.abspath(__file__))
procs = [subprocess.Popen([sys.executable, os.path.join(SP, "mock_ollama.py")]),
         subprocess.Popen([sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1", "-d", "/home/claude/ders-asistani"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)]
time.sleep(1.2)
def post(path, body):
    return json.loads(urllib.request.urlopen(urllib.request.Request("http://127.0.0.1:11434" + path, data=json.dumps(body).encode(), headers={"Content-Type": "application/json"})).read())
errs = []
def done(pg, n):
    pg.wait_for_function("(n) => document.querySelectorAll('.msg__foot').length > n", arg=n, timeout=20000)
    return pg.locator(".msg--ai").last
try:
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1280, "height": 860})
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto("http://localhost:8765/"); pg.wait_for_timeout(800)
        pg.fill("#composerInput", "Merhaba"); pg.keyboard.press("Enter")
        m = done(pg, 0)
        print("tam GPU → uyarı yok:", m.locator(".msg__gpu").count() == 0)
        post("/mock/config", {"vram_ratio": 0.72})
        pg.fill("#composerInput", "Tekrar merhaba"); pg.keyboard.press("Enter")
        m = done(pg, 1)
        print("kısmi GPU → uyarı:", m.locator(".msg__gpu").inner_text())
        print("eski yanıtta uyarı yok:", pg.locator(".msg__gpu").count() == 1)
        post("/mock/reset", {})
        m.locator('[data-act="reload-model"]').click(); pg.wait_for_timeout(600)
        log = json.loads(urllib.request.urlopen("http://127.0.0.1:11434/mock/log").read())
        print("boşaltma isteği:", [x for x in log if x["path"] == "generate"], "uyarı kalktı:", pg.locator(".msg__gpu").count() == 0)
        pg.reload(); pg.wait_for_timeout(1000)
        print("yeniden yüklemede uyarı sadece son yanıtta:", pg.locator(".msg__gpu").count())
        b.close()
finally:
    for pr in procs: pr.terminate()
print("errors:", errs)
