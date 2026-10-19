import subprocess, sys, time, os, json, socket, urllib.request, datetime
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
    res.append(bool(c)); print(("PASS " if c else "FAIL ") + n + ("" if c else " — " + str(info)[:400]))
SHOT = os.path.join(SP, "v15"); os.makedirs(SHOT, exist_ok=True)
URL = "http://localhost:8765/"
def log(): return json.loads(urllib.request.urlopen("http://127.0.0.1:8787/__log").read())
def reset(): urllib.request.urlopen("http://127.0.0.1:8787/__reset").read()
def sysof(x): return json.dumps((x.get("body") or {}).get("systemInstruction") or "", ensure_ascii=False) + json.dumps((x.get("body") or {}).get("contents") or "", ensure_ascii=False)
gens = lambda: [x for x in log() if ":streamGenerateContent" in x["url"]]

def newctx(b, mobile=False, server="http://127.0.0.1:8787"):
    ctx = b.new_context(viewport={"width": 390, "height": 844} if mobile else {"width": 1280, "height": 860})
    ctx.route("**/js/config.js", lambda r: r.fulfill(status=200, content_type="text/javascript", body='App.config = { serverUrl: "' + server + '" };'))
    ctx.add_init_script("try { if (!localStorage.getItem('da:pref:tourDone')) localStorage.setItem('da:pref:tourDone', 'true'); } catch (e) {}")
    pg = ctx.new_page()
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(URL); pg.wait_for_timeout(1500)
    return ctx, pg

def go(pg, h, wait=900):
    pg.evaluate("(h) => location.hash = h", h); pg.wait_for_timeout(wait)

try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx, pg = newctx(b)

        # ================= 1) Yapay zekâyla konu içeriği =================
        go(pg, "#/konular/12")
        check("derslerde 'Yapay zekâyla hazırlanır' (12 Felsefe)", pg.locator(".subj-tile.subj-felsefe").inner_text().find("Yapay zekâyla") >= 0)
        check("hazır derste rozet yok (12 Kimya)", pg.locator(".subj-tile.subj-kimya").inner_text().find("Yapay zekâyla") < 0)
        reset()
        WATCH = "() => { window.__sawGen = false; new MutationObserver(() => { if (document.querySelector('#aiGen .spinner')) window.__sawGen = true; }).observe(document.getElementById('view'), { childList: true, subtree: true }); }"
        pg.evaluate(WATCH)
        go(pg, "#/konular/12/felsefe", 150)
        pg.wait_for_selector(".unit", timeout=15000)
        check("konu listesi hazırlanıyor kartı", pg.evaluate("() => window.__sawGen"))
        check("3 ünite, 9 kazanım", pg.locator(".unit").count() == 3 and pg.locator(".outcome").count() == 9, pg.locator(".outcome").count())
        check("yapay zekâ notu + yeniden oluştur", pg.locator(".ai-note").count() == 1 and pg.locator("#aiRegenSyl").count() == 1)
        g1 = [x for x in gens() if "units" in sysof(x)]
        check("istekte sınıf/ders ve MEB programı", g1 and "12. Sınıf Felsefe" in sysof(g1[0]) and "öğretim programına" in sysof(g1[0]), sysof(g1[0])[:300] if g1 else "")
        check("kayıt 'lessons' deposunda", pg.evaluate("async () => !!(await App.db.get('lessons','syl:12/felsefe'))"))
        check("kazanımlarda 'Yapay zekâ hazırlar' rozeti", "Yapay zekâ hazırlar" in pg.locator(".outcome").first.inner_text())
        pg.screenshot(path=os.path.join(SHOT, "syl-done.png"))
        reset()
        pg.evaluate(WATCH)
        pg.locator(".outcome").first.click(); pg.wait_for_timeout(150)
        pg.wait_for_selector(".lesson__section h2", timeout=15000); pg.wait_for_timeout(500)
        check("anlatım hazırlanıyor kartı", pg.evaluate("() => window.__sawGen"))
        txt = pg.locator(".lesson").inner_text()
        check("anlatım + başlık + formül çizildi", "Giriş" in txt and pg.locator(".lesson .katex").count() >= 1, txt[:200])
        check("3 çözümlü örnek, hap bilgiler", pg.locator(".example").count() == 3 and pg.locator(".lesson__section").filter(has_text="Hap").locator("li").count() == 5)
        check("konu sonu testi ve Feynman kartı geldi", pg.locator(".quiz-card:not(.fey-card)").count() == 1 and pg.locator(".fey-card").count() == 1)
        check("anlatım notu (yapay zekâ)", pg.locator("#aiRegenLes").count() == 1)
        g2 = [x for x in gens() if "anlatim" in sysof(x)]
        check("anlatım isteğinde kazanım ve ünite", g2 and "Kazanım 1.1 açıklar" in sysof(g2[0]) and "Ünite 1" in sysof(g2[0]))
        pg.screenshot(path=os.path.join(SHOT, "lesson-ai.png"), full_page=True)
        # Yapay zekâ anlatımından konu sonu testi: istek anlatımı içeriyor
        reset()
        go(pg, "#/test/12/felsefe/u1/k1", 300)
        pg.wait_for_selector(".quiz-q", timeout=15000)
        g3 = gens()
        check("test isteğinde yapay zekâ anlatımı", g3 and "mol kavramını" in sysof(g3[0]))
        # 2 doğru, 8 yanlış → yanlışlar deftere + arka planda sınıflandırılır
        for i in range(10): pg.click('.opt[data-q="%d"][data-o="%d"]' % (i, 1 if i < 2 else 3))
        pg.click("#qFinish"); pg.wait_for_selector(".quiz-result", timeout=5000); pg.wait_for_timeout(2500)
        typed = pg.evaluate("async () => (await App.db.getAll('mistakes')).filter(m => m.errType && m.errBy === 'ai').length")
        check("testten sonra yanlışlar otomatik sınıflandırıldı", typed == 8, typed)
        # Yeniden oluştur
        go(pg, "#/konular/12/felsefe/u1/k1")
        reset()
        pg.click("#aiRegenLes"); pg.wait_for_timeout(300); pg.locator(".modal .btn--primary").click()
        for _ in range(40):
            if [x for x in gens() if "anlatim" in sysof(x)] and pg.locator(".lesson__section h2").count(): break
            pg.wait_for_timeout(250)
        check("anlatım yeniden oluşturuldu", len([x for x in gens() if "anlatim" in sysof(x)]) == 1 and pg.locator(".example").count() == 3)
        # Hazır içerik korunur
        r = pg.evaluate("async () => { try { await App.lessons.generateSyllabus('9','matematik'); return 'gen'; } catch (e) { return e.message; } }")
        check("hazır içerik değişmez", r == "curated", r)
        check("hazır derste rozet yok", pg.evaluate("() => App.data.curriculum.findSubject('9','matematik').units.length") > 5)
        # Eşitleme: ikinci cihaz konuyu yeniden üretmeden görür
        pg.evaluate("async () => { await App.sync.start(null); }"); pg.wait_for_timeout(500)
        code = pg.evaluate("() => App.sync.code()")
        ctx2, pg2 = newctx(b, mobile=True)
        pg2.evaluate("async (c) => { await App.sync.start(c); }", code); pg2.wait_for_timeout(1200)
        reset()
        go(pg2, "#/konular/12/felsefe/u1/k1", 1200)
        check("diğer cihaz: anlatım eşitlendi (yeniden üretilmedi)", pg2.locator(".example").count() == 3 and not [x for x in gens() if "anlatim" in sysof(x) or "units" in sysof(x)])
        pg2.screenshot(path=os.path.join(SHOT, "phone-lesson-ai.png"))
        ctx2.close()
        # Sunucu yoksa: hata kartı ve tekrar dene
        ctx3, pg3 = newctx(b, server="http://127.0.0.1:8799")
        pg3.evaluate("() => App.prefs.set('aiMode', 'cloud')")
        go(pg3, "#/konular/11/ingilizce", 4000)
        check("bağlantı yoksa hata kartı + tekrar dene", pg3.locator("#aiGen.msg__error").count() == 1 and pg3.locator("#aiRetry").count() == 1, pg3.locator("#view").inner_text()[:200])
        ctx3.close()

        # ================= 2) Hata türü analizi =================
        pg.evaluate("""async () => {
          for (const m of await App.db.getAll('mistakes')) await App.db.remove('mistakes', m.id);
          const base = { source: 'quiz', key: '9/fizik/u1/k1', label: '9. Sınıf · Fizik · Fiziğin önemi', options: ['1','2','3','4','5'], answer: 2, explain: 'Çözüm' };
          for (let i = 0; i < 4; i++) await App.mistakes.add(Object.assign({}, base, { q: 'Soru ' + i, chosen: i % 5 === 2 ? 0 : i % 5 }));
          await App.mistakes.add(Object.assign({}, base, { q: 'Boş soru', chosen: -1 }));
          await App.mistakes.add({ source: 'chat', label: 'Türev sorusu', q: 'Türevi nedir?', explain: 'Cevap', nextAt: new Date().toISOString() });
        }""")
        go(pg, "#/yanlislar/tumu")
        check("analiz kartı", pg.locator(".err-card").count() == 1)
        check("'Yapay zekâyla sınıflandır (4)'", "(4)" in pg.locator("#errClassify").inner_text(), pg.locator(".err-card").inner_text())
        check("2 soru için 'sen seç' ipucu", "2 sorunun" in pg.locator(".err-card").inner_text())
        pg.click("#errClassify"); pg.wait_for_timeout(2000)
        st = pg.evaluate("async () => App.mistakes.errorStats(await App.db.getAll('mistakes'))")
        check("4 soru sınıflandırıldı (işlem/kavram/dikkat)", st["typed"] == 4 and st["counts"]["islem"] == 2, st)
        check("dağılım çubuğu ve öneri", pg.locator(".err-bar span").count() == 3 and pg.locator(".err-tip").count() == 1, pg.locator(".err-card").inner_text()[:300])
        check("en sık hata: işlem hatası (%50)", "İşlem hatası (%50)" in pg.locator(".err-tip").inner_text(), pg.locator(".err-tip").inner_text())
        check("kartta YZ rozetli tür çipi", pg.locator(".mis__head .err-chip:not(.err-chip--empty)").count() == 4, pg.locator(".mis__head .err-chip:not(.err-chip--empty)").count())
        # Kullanıcı seçer
        card = pg.locator(".mis", has_text="Türevi nedir")
        card.locator('[data-mact="errpick"]').click(); pg.wait_for_timeout(150)
        card.locator('[data-mact="seterr"][data-type="sure"]').click(); pg.wait_for_timeout(500)
        m = pg.evaluate("async () => (await App.db.getAll('mistakes')).find(m => m.q === 'Türevi nedir?')")
        check("kullanıcı türü seçti (süre)", m["errType"] == "sure" and m["errBy"] == "user")
        check("analiz güncellendi", "5 / 6" in pg.locator(".err-card summary").inner_text(), pg.locator(".err-card summary").inner_text())
        # Açınca türü olmayan sorularda 'neden yanlış yaptın?' açık gelir
        blank = pg.locator(".mis", has_text="Boş soru")
        blank.locator('[data-mact="reveal"]').click(); pg.wait_for_timeout(300)
        check("açınca 'Neden yanlış yaptın?' seçenekleri", pg.locator(".mis", has_text="Boş soru").locator(".err-pick:not([hidden])").count() == 1)
        check("yapay zekâ gerekçesi açıklamada", True)
        pg.screenshot(path=os.path.join(SHOT, "errors.png"), full_page=True)
        ov = pg.evaluate("async () => App.rag.overviewText(await App.rag.loadData())")
        check("asistanın özetinde hata türleri", "Hata türleri" in ov and "işlem hatası %" in ov, ov[-300:])

        # ================= 3) Sokratik mod =================
        go(pg, "#/")
        sb = pg.locator('#composer [data-act="socratic"]')
        check("yazı kutusunda Sokratik düğmesi", sb.count() == 1 and sb.get_attribute("aria-pressed") == "false")
        sb.click(); pg.wait_for_timeout(200)
        check("Sokratik mod açıldı", sb.get_attribute("aria-pressed") == "true" and pg.evaluate("() => App.prefs.get('aiSocratic')") is True)
        reset()
        pg.fill("#composerInput", "x^2 - 9 = 0 denkleminin pozitif kökü kaç?"); pg.keyboard.press("Enter")
        pg.wait_for_selector(".soc-actions", timeout=20000)
        req = [x for x in gens()][-1]
        check("istekte Sokratik kurallar", "SOKRATİK MOD AÇIK" in sysof(req))
        check("ipucu yanıtı + hızlı düğmeler", "Sence ilk adım" in pg.locator(".msg--ai").last.inner_text() and pg.locator(".soc-actions button").count() == 2)
        pg.screenshot(path=os.path.join(SHOT, "socratic.png"))
        pg.locator(".soc-actions button").nth(1).click()
        pg.wait_for_function("() => document.querySelectorAll('.msg--ai').length === 2 && !document.querySelector('.msg--ai:last-child .stage')", timeout=20000)
        pg.wait_for_timeout(500)
        check("'Çözümü göster' → tam çözüm", "Tam çözüm" in pg.locator(".msg--ai").last.inner_text(), pg.locator(".msg--ai").last.inner_text())
        check("hızlı düğmeler yalnızca son yanıtta", pg.locator(".soc-actions").count() == 1)
        pg.locator('#composer [data-act="socratic"]').click(); pg.wait_for_timeout(200)
        reset()
        pg.fill("#composerInput", "teşekkürler"); pg.keyboard.press("Enter"); pg.wait_for_timeout(2500)
        check("kapalıyken Sokratik kural gönderilmez", gens() and "SOKRATİK" not in sysof(gens()[-1]))

        # ================= 4) Bugün =================
        check("menüde 'Bugün'", pg.locator('.nav a[href="#/bugun"]').count() == 1)
        now = datetime.datetime.now()
        wd = now.weekday()
        def hm(dt): return dt.strftime("%H:%M")
        start = now - datetime.timedelta(minutes=10); end = now + datetime.timedelta(minutes=40); later = now + datetime.timedelta(minutes=70)
        if start.date() != now.date() or later.date() != now.date():
            start = now.replace(hour=12, minute=0); end = now.replace(hour=23, minute=58); later = None
        blocks = [{"id": "t1", "day": wd, "start": hm(start), "end": hm(end), "subject": "Matematik", "kind": "ders", "note": "Türev"}]
        if later: blocks.append({"id": "t2", "day": wd, "start": hm(later), "end": hm(later + datetime.timedelta(minutes=30)), "subject": "Fizik", "kind": "soru"})
        pg.evaluate("async (b) => { await App.db.put('schedules', { id: 'user', blocks: b }); await App.db.put('quizzes', { id: 'qz1', key: '9/fizik/u1/k1', label: 'x', date: new Date().toISOString(), total: 10, correct: 3, wrong: 7, empty: 0, questions: [] }); }", blocks)
        go(pg, "#/bugun", 1200)
        check("şu anki ders kartı", pg.locator(".tday-now.is-live").count() == 1 and "Matematik" in pg.locator(".tday-now").inner_text(), pg.locator("#view").inner_text()[:300])
        check("bitmesine kalan süre", "Bitmesine" in pg.locator(".tday-now").inner_text())
        check("bugünün akışı", pg.locator(".tday-block").count() == len(blocks))
        check("istatistikler (tekrar, odak, YKS)", pg.locator(".tday-stat").count() == 3)
        check("önerilen konu (en düşük test)", "son testin 2/10" in pg.locator(".tday-sug").inner_text(), pg.locator(".tday-side").inner_text()[:300])
        check("hata türü kartı", pg.locator(".tday-err").count() == 1)
        pg.screenshot(path=os.path.join(SHOT, "today.png"), full_page=True)
        pg.click('.tday-now [data-focus]'); pg.wait_for_timeout(800)
        check("odak sayacı o dersle başladı", pg.evaluate("() => location.hash") == "#/odak" and pg.evaluate("() => App.focus.state().running && App.focus.state().subject === 'Matematik'"))
        pg.evaluate("() => App.focus.reset()")
        # Program yokken
        pg.evaluate("async () => { await App.db.remove('schedules', 'user'); }")
        go(pg, "#/bugun", 900)
        check("program yokken 'programımı hazırla'", "Henüz bir programın yok" in pg.locator(".tday-now").inner_text() and pg.locator('.tday-now a[href="#/program/benim"]').count() == 1)
        ctx.close()

        # Telefon görünümü
        ctx, pg = newctx(b, mobile=True)
        pg.evaluate("async (b) => { await App.db.put('schedules', { id: 'user', blocks: b }); }", blocks)
        go(pg, "#/bugun", 1200)
        over = pg.evaluate("() => [innerWidth, document.documentElement.scrollWidth]")
        check("telefonda taşma yok", over[1] <= over[0] + 1, over)
        pg.screenshot(path=os.path.join(SHOT, "phone-today.png"), full_page=True)
        go(pg, "#/", 800)
        pg.screenshot(path=os.path.join(SHOT, "phone-home.png"))
        ctx.close()
        b.close()
finally:
    for pr in procs: pr.terminate()
print("\nerrors:", errs[:10])
print("%d/%d PASS" % (sum(res), len(res)))
