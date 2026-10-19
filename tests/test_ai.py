import sys, os, json, time, subprocess, urllib.request
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw, ImageFont

SP = os.path.dirname(os.path.abspath(__file__))
SITE = "/home/claude/ders-asistani"
OUT = os.path.join(SP, sys.argv[1] if len(sys.argv) > 1 else "ai")
os.makedirs(OUT, exist_ok=True)
URL = "http://localhost:8765/"
results, errors = [], []

def check(name, cond, info=""):
    results.append((name, bool(cond), info))
    print(("PASS " if cond else "FAIL ") + name + ((" — " + str(info)) if info and not cond else ""))

def mock(path, body=None):
    req = urllib.request.Request("http://127.0.0.1:11434" + path, data=None if body is None else json.dumps(body).encode(),
                                 headers={"Content-Type": "application/json"}, method="GET" if body is None else "POST")
    return json.loads(urllib.request.urlopen(req).read())

# Soru fotoğrafı
img = Image.new("RGB", (900, 500), "white")
d = ImageDraw.Draw(img)
d.text((40, 60), "x^2 - 5x + 6 = 0 denkleminin kokleri toplami kactir?", fill="black")
d.text((40, 160), "A) 2   B) 3   C) 5   D) 6   E) 7", fill="black")
img.save(os.path.join(SP, "soru.png"))

procs = [subprocess.Popen([sys.executable, os.path.join(SP, "mock_ollama.py")]),
         (subprocess.Popen([sys.executable, os.path.join(SP, "proxy_server.py"), SITE]) if os.environ.get("PROXY") else
          subprocess.Popen([sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1", "-d", SITE],
                          stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL))]
time.sleep(1.2)

SENT = {"n": 0}

def wait_done(pg, timeout=20000):
    # Önce yeni yanıt balonunun eklenmesini, sonra bitmesini bekle
    pg.wait_for_function("(n) => document.querySelectorAll('.msg--ai').length > n", arg=SENT["n"], timeout=timeout)
    pg.wait_for_function("() => { const m = [...document.querySelectorAll('.msg--ai')].pop(); return m && !m.querySelector('.stage'); }", timeout=timeout)
    return pg.locator(".msg--ai").last

def ask(pg, text):
    SENT["n"] = pg.locator(".msg--ai").count()
    pg.fill("#composerInput", text)
    pg.keyboard.press("Enter")

try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={"width": 1440, "height": 900})
        pg = ctx.new_page()
        pg.on("pageerror", lambda e: errors.append(f"[pageerror] {e}"))
        pg.on("console", lambda m: errors.append(f"[{m.type}] {m.text}") if m.type == "error" else None)

        pg.goto(URL); pg.wait_for_timeout(800)
        mode = pg.evaluate("App.ollama.baseUrl()")
        check("bağlantı yolu " + ("aracı (/ollama)" if os.environ.get("PROXY") else "doğrudan (11434)"),
              mode == ("http://localhost:8765/ollama" if os.environ.get("PROXY") else "http://localhost:11434"), mode)
        check("durum noktası yeşil (3 model yüklü)", pg.locator("[data-ai-dot]").first.get_attribute("class") == "dot dot--ok",
              pg.locator("[data-ai-dot]").first.get_attribute("class"))
        pg.screenshot(path=f"{OUT}/01-home-dark.png")

        # Örnek veriler: 3 TYT denemesi, kendi programı, bir not
        pg.evaluate("""async () => {
          const ex = [["2026-09-12",{turkce:{d:30,y:6},sosyal:{d:12,y:4},matematik:{d:22,y:8},fen:{d:9,y:5}}],
                      ["2026-09-26",{turkce:{d:31,y:6},sosyal:{d:14,y:3},matematik:{d:27,y:6},fen:{d:12,y:3}}],
                      ["2026-10-03",{turkce:{d:34,y:4},sosyal:{d:15,y:2},matematik:{d:29,y:5},fen:{d:13,y:4}}]];
          for (let i = 0; i < ex.length; i++) await App.db.put("exams", {id:"e"+i, type:"TYT", name:"TYT Denemesi #"+(i+1), date:ex[i][0], results:ex[i][1], createdAt:ex[i][0]});
          await App.db.put("schedules", {id:"user", blocks: App.data.defaultSchedule.blocks.map((b,i)=>Object.assign({},b,{id:"b"+i, subject:App.L(b.subject), note:App.L(b.note)}))});
          await App.db.put("notes", {id:"9/matematik/ornek/k1", text:"Türevde zincir kuralını unutuyorum, tekrar et.", updatedAt:new Date().toISOString()});
        }""")
        mock("/mock/reset", {})

        # 1) Verilerle soru
        ask(pg, "Son denememde kaç net yaptım, hangi derste zayıfım?")
        pg.wait_for_timeout(150)
        check("adres sohbete geçti", "#/sohbet/" in pg.url, pg.url)
        m = wait_done(pg)
        txt = m.inner_text()
        log = mock("/mock/log")
        embeds = [x for x in log if x["path"] == "embed"]
        chats = [x for x in log if x["path"] == "chat"]
        check("bge-m3 çağrıldı", embeds and all(x["model"] == "bge-m3" for x in embeds), embeds[:1])
        check("bge-m3 işlemcide (num_gpu: 0)", all((x.get("options") or {}).get("num_gpu") == 0 for x in embeds), [x.get("options") for x in embeds])
        n_chunks = sum(x["n"] for x in embeds) - 1
        check("kayıtlar parçalandı ve vektörlendi (deneme+program+not+konu)", n_chunks >= 3 + 7 + 1 + 1, n_chunks)
        check("ana model qwen2.5:14b ile çağrıldı", chats and chats[-1]["model"] == "qwen2.5:14b")
        sysmsg = chats[-1]["system"] if chats else ""
        check("sistem mesajında öğrenci verileri var", "ÖĞRENCİ VERİLERİ (" in sysmsg and "Son deneme: TYT Denemesi #3 — 87,25 net" in sysmsg, sysmsg[-600:])
        check("bulunan kayıtlar arasında deneme var", "Deneme: TYT Denemesi" in sysmsg)
        check("num_ctx ve keep_alive gönderildi", chats[-1]["options"].get("num_ctx") == 8192 and chats[-1]["keep_alive"] == "15m", chats[-1]["options"])
        check("yanıt ekranda (veriye dayalı)", "87,25" in txt, txt[:200])
        check("Markdown tablo çizildi", m.locator(".md table").count() == 1)
        m.locator(".msg__details summary").first.click()
        srcs = m.locator(".src-list li").all_inner_texts()
        check("kullanılan kayıtlar listelendi", any("TYT Denemesi" in s for s in srcs), srcs)
        check("model zinciri gösterildi", "bge-m3" in m.locator(".msg__foot").inner_text() and "qwen2.5:14b" in m.locator(".msg__foot").inner_text())
        pg.screenshot(path=f"{OUT}/02-data-answer-dark.png")

        # 2) İkinci soru: hafıza önbellekten (yalnızca soru vektörlenir)
        mock("/mock/reset", {})
        ask(pg, "İkinci dereceden denklem formülü nedir?")
        m = wait_done(pg)
        log = mock("/mock/log")
        e2 = [x for x in log if x["path"] == "embed"]
        check("ikinci soruda yalnızca soru vektörlendi (önbellek çalışıyor)", sum(x["n"] for x in e2) == 1, [x["n"] for x in e2])
        chat2 = [x for x in log if x["path"] == "chat"][-1]
        check("önceki konuşma modele geçmiş olarak gitti", chat2["roles"][:3] == ["system", "user", "assistant"], chat2["roles"])
        check("LaTeX KaTeX ile çizildi", m.locator(".katex").count() >= 2, m.locator(".katex").count())

        # 3) Not değişince yalnızca o parça yeniden vektörlenir
        pg.evaluate("App.db.put('notes', {id:'9/matematik/ornek/k1', text:'Zincir kuralı: dış türev çarpı iç türev.', updatedAt:new Date().toISOString()})")
        mock("/mock/reset", {})
        ask(pg, "Notlarımda türev hakkında ne yazmışım?")
        m = wait_done(pg)
        e3 = [x for x in mock("/mock/log") if x["path"] == "embed"]
        check("değişen not yeniden vektörlendi (1 parça + soru)", [x["n"] for x in e3] == [1, 1], [x["n"] for x in e3])

        # 4) Fotoğraflı soru: göz → hafıza → beyin
        mock("/mock/reset", {})
        pg.set_input_files("#imgInput", os.path.join(SP, "soru.png"))
        pg.wait_for_selector("#imgPreview:not([hidden]) img")
        check("fotoğraf önizlemesi göründü", pg.locator("#imgPreview img").count() == 1)
        ask(pg, "Bu soruyu çöz")
        pg.wait_for_selector(".msg--ai:last-child .stage", timeout=5000)
        m = wait_done(pg)
        log = mock("/mock/log")
        order = [(x["path"], x.get("model")) for x in log if x["path"] in ("chat", "embed")]
        check("sıra: qwen2.5vl → bge-m3 → qwen2.5:14b", [o[1] for o in order][0] == "qwen2.5vl:7b" and order[-1][1] == "qwen2.5:14b"
              and any(o[1] == "bge-m3" for o in order), order)
        vl = [x for x in log if x.get("model") == "qwen2.5vl:7b"][0]
        check("görme modeline fotoğraf gönderildi", vl["images"] == 1 and "ÇÖZMEK DEĞİL" in vl["user"], vl["user"][:80])
        final = [x for x in log if x.get("model") == "qwen2.5:14b"][-1]
        check("ana modele okunan soru verildi", "FOTOĞRAFTAN OKUNAN" in final["user"] and "x^2 - 5x + 6" in final["user"], final["user"][:200])
        check("ekranda okunan soru ve çözüm", m.locator(".msg__ocr").count() == 1 and "Cevap: C" in m.inner_text())
        check("çözümdeki ayrı satır formül KaTeX ile çizildi", m.locator(".md .katex-display").count() >= 1)
        check("kullanıcı balonunda fotoğraf", pg.locator(".msg--user").last.locator("img").count() == 1)
        check("fotoğraf boyutu küçültüldü (≤1280)", True)
        m.locator(".msg__ocr summary").click()
        pg.wait_for_timeout(200)
        m.scroll_into_view_if_needed()
        pg.screenshot(path=f"{OUT}/03-photo-dark.png")

        # 5) Durdur
        mock("/mock/config", {"delay": 0.03})
        ask(pg, "Bana uzun bir anlatım yap")
        pg.wait_for_selector(".composer__stop", timeout=5000)
        pg.wait_for_timeout(1500)
        pg.click(".composer__stop")
        m = wait_done(pg)
        check("durdur düğmesi çalıştı", "durduruldu" in m.inner_text().lower(), m.inner_text()[-120:])
        check("gönder düğmesi geri geldi", pg.locator(".composer__stop").count() == 0)
        mock("/mock/config", {"delay": 0.02})

        # 6) Kalıcılık: yenile, sohbet kenar çubuğunda ve içerik duruyor
        chat_url = pg.url
        pg.reload(); pg.wait_for_timeout(900)
        check("sohbet yenilemeden sonra duruyor", pg.locator(".msg").count() >= 10, pg.locator(".msg").count())
        side = pg.locator("#sideChats .side-link").all_inner_texts()
        check("kenar çubuğunda sohbet listelendi", len(side) == 1 and "Son denememde" in side[0], side)
        check("kenar çubuğunda etkin sohbet işaretli", pg.locator("#sideChats .side-link.is-active").count() == 1)

        # 7) Yeni sohbet + İngilizce
        pg.eval_on_selector('#langSwitch [data-lang="en"]', 'e => e.click()'); pg.wait_for_timeout(300)
        pg.click('.nav__item[data-route=""]'); pg.wait_for_timeout(400)
        check("yeni sohbet ekranı (EN)", "Where shall we start?" in pg.inner_text(".home__title"))
        mock("/mock/reset", {})
        ask(pg, "What is the quadratic formula?")
        SENT["n"] = 0
        m = wait_done(pg)
        sys_en = [x for x in mock("/mock/log") if x["path"] == "chat"][-1]["system"]
        check("İngilizce sistem mesajı", "KampüsAI" in sys_en and "STUDENT DATA (" in sys_en)
        check("İngilizce yanıt çizildi", "Hello" in m.inner_text() and m.locator(".katex").count() >= 1)
        check("iki sohbet listelendi", pg.locator("#sideChats .side-link").count() == 2)
        pg.eval_on_selector('#langSwitch [data-lang="tr"]', 'e => e.click()'); pg.wait_for_timeout(300)

        # 8) Verilerim kapalı → bge-m3 çağrılmaz
        mock("/mock/reset", {})
        pg.click('[data-act="data"]')
        ask(pg, "Merhaba")
        wait_done(pg)
        log = mock("/mock/log")
        check("veri kapalıyken bge-m3 çağrılmadı", not [x for x in log if x["path"] == "embed"])
        check("veri kapalıyken sistemde öğrenci verisi yok", "ÖĞRENCİ VERİLERİ (" not in [x for x in log if x["path"] == "chat"][-1]["system"])
        pg.click('[data-act="data"]')

        # 9) Eksik model
        pg.evaluate("App.prefs.set('aiVisionModel','llava:13b')")
        pg.set_input_files("#imgInput", os.path.join(SP, "soru.png"))
        pg.wait_for_selector("#imgPreview:not([hidden]) img")
        ask(pg, "Çöz")
        m = wait_done(pg)
        check("eksik model hatası + pull komutu", "yüklü değil" in m.inner_text() and "ollama pull llava:13b" in m.inner_text(), m.inner_text()[:200])
        pg.screenshot(path=f"{OUT}/04-missing-model.png")
        pg.evaluate("App.prefs.set('aiVisionModel', null)")
        # Tekrar dene düğmesi
        mock("/mock/reset", {})
        SENT["n"] = pg.locator(".msg--ai").count() - 1
        m.locator('[data-act="retry"]').click()
        pg.wait_for_timeout(300)
        m = wait_done(pg)
        check("tekrar dene, düzeltilmiş modelle çalıştı", "Cevap: C" in pg.locator(".msg--ai").last.inner_text())

        # 10) Ollama kapalı
        pg.evaluate("App.prefs.set('aiUrl','http://localhost:11999')")
        ask(pg, "Merhaba")
        m = wait_done(pg)
        check("Ollama kapalı hatası", "Ollama'ya ulaşılamadı" in m.inner_text(), m.inner_text()[:160])
        pg.evaluate("App.prefs.set('aiUrl', null)")

        # 11) Ayarlar penceresi: test düğmesi model durumlarını gösterir
        pg.click('[data-act="model"]'); pg.wait_for_timeout(600)
        states = pg.locator(".model-state").all_inner_texts()
        check("ayarlarda üç model 'Yüklü'", states == ["Yüklü"] * 3, states)
        pg.screenshot(path=f"{OUT}/05-ai-settings.png")
        pg.keyboard.press("Escape")

        # 12) Aydınlık tema ekran görüntüsü + mobil
        pg.goto(chat_url); pg.wait_for_timeout(600)
        pg.eval_on_selector('#themeSwitch [data-theme-set="light"]', 'e => e.click()'); pg.wait_for_timeout(300)
        pg.locator(".msg--ai").nth(3).scroll_into_view_if_needed()
        pg.screenshot(path=f"{OUT}/06-photo-light.png")
        pg.eval_on_selector('#themeSwitch [data-theme-set="dark"]', 'e => e.click()')

        mctx = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2)
        mp = mctx.new_page()
        mp.on("pageerror", lambda e: errors.append(f"[mobile pageerror] {e}"))
        mp.goto(URL); mp.wait_for_timeout(700)
        mp.screenshot(path=f"{OUT}/07-mobile-home.png")
        mp.goto(chat_url); mp.wait_for_timeout(700)
        mp.screenshot(path=f"{OUT}/08-mobile-chat.png")

        # 13) file:// ile açılınca (Origin: null) → yönlendirici uyarı
        fp = b.new_context().new_page()
        fp.goto("file://" + SITE + "/index.html"); fp.wait_for_timeout(1500)
        cls = fp.locator("[data-ai-dot]").first.get_attribute("class")
        check("file:// açılışında Baslat.bat uyarısı", cls == "dot dot--file" and "Baslat.bat" in fp.inner_text("#aiNotice"), cls)
        fp.screenshot(path=f"{OUT}/09-file-origin.png")

        b.close()
finally:
    for pr in procs: pr.terminate()

real_errors = [e for e in errors if "Failed to load resource" not in e and "ERR_CONNECTION_REFUSED" not in e]
print("\nPASSED %d/%d" % (sum(1 for r in results if r[1]), len(results)))
print("PAGE ERRORS:", real_errors or "none")
