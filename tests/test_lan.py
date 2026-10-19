import subprocess, sys, time, os
from playwright.sync_api import sync_playwright
SP = os.path.dirname(os.path.abspath(__file__))
procs = [subprocess.Popen([sys.executable, os.path.join(SP, "mock_ollama.py")]),
         subprocess.Popen(["node", os.path.join(SP, "lan_server_run.js")]),
         subprocess.Popen([sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1", "-d", "/home/claude/ders-asistani"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)]
time.sleep(1.2)
def done(pg):
    pg.wait_for_function("() => { const m = [...document.querySelectorAll('.msg--ai')].pop(); return m && (m.querySelector('.msg__foot') || m.querySelector('.msg__error')); }", timeout=20000)
    return pg.locator(".msg--ai").last
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        # "Telefon": dar ekran, mobil kullanıcı ajanı
        ctx = b.new_context(viewport={"width": 390, "height": 844}, user_agent="Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/130 Mobile Safari/537.36")
        pg = ctx.new_page()
        pg.goto("http://localhost:8765/"); pg.wait_for_timeout(500)
        pg.evaluate("() => { App.prefs.set('aiUrl','http://127.0.0.1:8770/ollama'); App.prefs.set('aiToken','WRONG1'); App.engine.invalidate(); }")
        pg.evaluate("App.modules.assistant.refreshStatus()"); pg.wait_for_timeout(800)
        print("yanlış kod uyarısı:", pg.locator("#aiNotice").inner_text()[:80])
        pg.evaluate("() => { App.prefs.set('aiToken','K7M2QX'); App.engine.invalidate(); }")
        pg.evaluate("App.modules.assistant.refreshStatus()"); pg.wait_for_timeout(800)
        print("doğru kod → nokta:", pg.locator("[data-ai-dot]").first.get_attribute("class"), pg.locator("[data-ai-model]").first.inner_text())
        pg.fill("#composerInput", "Merhaba telefondan"); pg.keyboard.press("Enter")
        m = done(pg)
        print("yanıt:", m.inner_text()[:120].replace("\n", " | "))
        pg.screenshot(path="lan-phone.png")
        b.close()
finally:
    for pr in procs: pr.terminate()
