import subprocess, sys, time, os, json, socket, urllib.request
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
    res.append(bool(c)); print(("PASS " if c else "FAIL ") + n + ("" if c else " — " + str(info)[:500]))
SHOT = os.path.join(SP, "v17"); os.makedirs(SHOT, exist_ok=True)
URL = "http://localhost:8765/"
def log(): return json.loads(urllib.request.urlopen("http://127.0.0.1:8787/__log").read())
def reset(): urllib.request.urlopen("http://127.0.0.1:8787/__reset").read()
gens = lambda: [x for x in log() if ":streamGenerateContent" in x["url"]]

# Konuşma/okuma taklitleri (headless tarayıcıda ses yok)
STUBS = r"""
window.__utter = [];
(function () {
  const synth = { speaking: false, _q: null,
    speak(u) { window.__utter.push({ text: u.text, lang: u.lang, rate: u.rate }); this._q = u; const self = this; setTimeout(() => { if (self._q === u) { self._q = null; u.onend && u.onend({}); } }, 120); },
    cancel() { const u = this._q; this._q = null; if (u && u.onerror) u.onerror({ error: "interrupted" }); },
    getVoices() { return [{ name: "Test TR", lang: "tr-TR" }, { name: "Test EN", lang: "en-US" }]; }, onvoiceschanged: null };
  Object.defineProperty(window, "speechSynthesis", { value: synth, configurable: true });
  window.SpeechSynthesisUtterance = function (t) { this.text = t; };
  if (window.__noSR) { delete window.SpeechRecognition; delete window.webkitSpeechRecognition; window.webkitSpeechRecognition = undefined; window.SpeechRecognition = undefined; return; }
  function SR() { this.continuous = false; this.interimResults = false; }
  SR.prototype.start = function () { const self = this; window.__sr = this; setTimeout(() => self.onstart && self.onstart(), 30);
    const phrases = ["Kuvvet bir cismin hareketini değiştiren etkidir.", "ııı yani itme ya da çekme şeklinde olur, şey, birimi Newton'dur.", "Hız yer değiştirmenin zamana oranıdır ve vektöreldir."];
    let i = 0;
    this._t = setInterval(() => {
      if (i >= phrases.length) { clearInterval(self._t); return; }
      const r = [{ 0: { transcript: phrases[i] }, isFinal: true, length: 1 }];
      self.onresult && self.onresult({ resultIndex: 0, results: r }); i++;
    }, 250); };
  SR.prototype.stop = function () { clearInterval(this._t); const self = this; setTimeout(() => self.onend && self.onend(), 20); };
  window.SpeechRecognition = SR; window.webkitSpeechRecognition = SR;
})();
"""

def newctx(b, mobile=False, noSR=False):
    ctx = b.new_context(viewport={"width": 390, "height": 844} if mobile else {"width": 1280, "height": 860}, permissions=["microphone"])
    ctx.route("**/js/config.js", lambda r: r.fulfill(status=200, content_type="text/javascript", body='App.config = { serverUrl: "http://127.0.0.1:8787" };'))
    ctx.add_init_script("try { if (!localStorage.getItem('da:pref:tourDone')) localStorage.setItem('da:pref:tourDone', 'true'); } catch (e) {}")
    if noSR: ctx.add_init_script("window.__noSR = true;")
    ctx.add_init_script(STUBS)
    pg = ctx.new_page()
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(URL); pg.wait_for_timeout(1500)
    return ctx, pg

def go(pg, h, wait=900):
    pg.evaluate("(h) => location.hash = h", h); pg.wait_for_timeout(wait)

def overflow(pg):
    return pg.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")

try:
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"])
        ctx, pg = newctx(b)

        # ================= Menü =================
        check("menüde Çözümümü Kontrol Et + Kök Eksik", pg.locator('a[href="#/kontrol"]').count() == 1 and pg.locator('a[href="#/kok"]').count() == 1)
        check("üst çubukta erişilebilirlik düğmesi", pg.locator("#a11yBtn").count() == 1 and pg.locator("#a11yBtn").get_attribute("aria-label") == "Erişilebilirlik")

        # ================= 6) Erişilebilirlik =================
        pg.click("#a11yBtn"); pg.wait_for_timeout(400)
        check("panel açıldı", pg.locator(".modal .a11y-row").count() >= 7)
        pg.click('.a11y-seg[data-seg="text"] [data-v="lg"]'); pg.wait_for_timeout(200)
        check("büyük yazı: html özniteliği + zoom", pg.evaluate("() => document.documentElement.getAttribute('data-a11y-text') === 'lg' && getComputedStyle(document.querySelector('.view')).zoom === '1.15'"))
        pg.click('input[data-k="dys"]'); pg.wait_for_timeout(600)
        check("disleksi yazı tipi uygulandı ve yüklendi", pg.evaluate("async () => { await document.fonts.ready; return getComputedStyle(document.body).fontFamily.includes('OpenDyslexic') && document.fonts.check('16px OpenDyslexic', 'çğışöü'); }"))
        pg.click('input[data-k="spacing"]'); pg.click('input[data-k="ruler"]'); pg.click('input[data-k="contrast"]'); pg.click('input[data-k="motion"]'); pg.wait_for_timeout(300)
        check("aralık/karşıtlık/hareket öznitelikleri", pg.evaluate("() => ['data-a11y-spacing','data-a11y-contrast','data-a11y-motion','data-a11y-dys'].every(a => document.documentElement.hasAttribute(a))"))
        check("okuma cetveli", pg.locator(".a11y-ruler").count() == 1)
        pg.mouse.move(600, 400); pg.wait_for_timeout(100)
        check("cetvel imleci izliyor", pg.evaluate("() => document.querySelector('.a11y-ruler').style.getPropertyValue('--y')") == "400px")
        check("yüksek karşıtlıkta arka plan resmi yok", pg.evaluate("() => getComputedStyle(document.body).backgroundImage") in ("none", ""), pg.evaluate("() => getComputedStyle(document.body).backgroundImage")[:80])
        # deneme metnini dinle (formül sese çevrilir)
        pg.click(".a11y-try [data-listen]"); pg.wait_for_timeout(500)
        utt = pg.evaluate("() => window.__utter")
        check("panelde dene: formül okunabilir", utt and "x kare artı 1 bölü 2 eşittir 5" in utt[-1]["text"], utt)
        pg.click('.a11y-seg[data-seg="rate"] [data-v="1.25"]')
        pg.locator(".modal [data-close]").last.click(); pg.wait_for_timeout(300)
        check("üst düğme 'açık' görünümünde", "is-on" in (pg.locator("#a11yBtn").get_attribute("class") or ""))
        go(pg, "#/konular/9/fizik/u2/k4", 1200)
        pg.screenshot(path=os.path.join(SHOT, "a11y-on-lesson.png"))
        # yeniden yüklemede çizimden önce uygulanır
        pg.reload(); pg.wait_for_timeout(300)
        check("yeniden açılışta tercihler korunuyor", pg.evaluate("() => document.documentElement.getAttribute('data-a11y-text') === 'lg' && document.documentElement.hasAttribute('data-a11y-dys')"))
        pg.wait_for_timeout(1200)
        pg.evaluate("() => { App.a11y.open(); }"); pg.wait_for_timeout(300)
        pg.click("#a11yReset"); pg.wait_for_timeout(300)
        check("sıfırla", pg.evaluate("() => !document.documentElement.hasAttribute('data-a11y-text') && !document.documentElement.hasAttribute('data-a11y-dys') && !document.querySelector('.a11y-ruler')"))

        # Sesli okuma: konu anlatımı paragraf paragraf, vurgulu
        go(pg, "#/konular/9/matematik/t1/k1", 1200)
        n_listen = pg.locator(".lesson__section [data-listen]").count()
        check("konu sayfasında 3 'Dinle' düğmesi", n_listen == 3, n_listen)
        pg.evaluate("() => { window.__utter = []; }")
        pg.locator(".lesson__section [data-listen]").first.click(); pg.wait_for_timeout(200)
        check("okunan paragraf vurgulanıyor", pg.locator(".is-reading").count() == 1)
        pg.wait_for_timeout(900)
        utt = pg.evaluate("() => window.__utter")
        check("paragraflar sırayla okunuyor (tr-TR, hız 1)", len(utt) >= 3 and utt[0]["lang"] == "tr-TR" and utt[0]["rate"] == 1, utt[:3])
        check("ham LaTeX/dolar işareti okunmuyor", all("$" not in u["text"] and "\\frac" not in u["text"] for u in utt), [u["text"][:80] for u in utt if "$" in u["text"] or "\\" in u["text"]][:3])
        pg.locator(".lesson__section [data-listen]").first.click(); pg.wait_for_timeout(300)
        check("durdur", pg.locator(".is-reading").count() == 0 and pg.locator(".lesson__section [data-listen].is-on").count() == 0)
        tts = pg.evaluate("() => [App.a11y.texToSpeech('\\\\sqrt{x}+\\\\frac{1}{2}\\\\leq 3', 'tr'), App.a11y.texToSpeech('a^{n}\\\\cdot b_1 \\\\neq \\\\pi', 'tr'), App.a11y.texToSpeech('\\\\frac{a}{b}=c', 'en')]")
        check("formül → konuşma", tts[0] == "karekök x artı 1 bölü 2 küçük eşittir 3" and "üssü n" in tts[1] and "çarpı" in tts[1] and "eşit değildir pi" in tts[1] and tts[2] == "a over b equals c", tts)

        # Ekran okuyucu: simgeli düğmelerin etiketi
        for h in ["#/", "#/kok", "#/kontrol", "#/konular/9/matematik/t1/k1", "#/yanlislar"]:
            go(pg, h, 900)
            unl = pg.evaluate("() => Array.from(document.querySelectorAll('button, a')).filter(e => e.offsetParent && !e.textContent.trim() && !e.getAttribute('aria-label')).map(e => e.outerHTML.slice(0, 90))")
            check("etiketsiz simge düğme yok " + h, not unl, unl)
        check("İçeriğe geç bağlantısı", pg.locator(".a11y-skip").count() == 1)

        # ================= 1) Kök eksik =================
        go(pg, "#/kok", 1200)
        check("kök eksik: veri yokken boş durum", "Henüz yeterli veri yok" in pg.locator("#view").inner_text())
        nodes = pg.locator(".rg .rg-node").count()
        check("9. sınıf matematik haritası çizildi (20 kazanım)", nodes == 20, nodes)
        # Veri: hareket (zayıf) ← vektörler (zayıf) ← Pisagor (zayıf); Pisagor'un ön koşulları denenmemiş
        pg.evaluate("""async () => {
          const q = (key, c, d) => App.db.put('quizzes', { id: 'q-' + key.replace(/\\//g,'-') + d, key, label: key, date: new Date(Date.now() - d * 60000).toISOString(), total: 10, correct: c, wrong: 10 - c, empty: 0, questions: [] });
          await q('9/fizik/u2/k6', 3, 1); await q('9/fizik/u2/k4', 3, 2); await q('9/matematik/t4/k4', 4, 3); await q('9/fizik/u2/k2', 9, 4); await q('9/fizik/u2/k3', 8, 5);
          await App.db.put('explains', { id: 'fx1', key: '9/matematik/t3/k1', score: 90, date: new Date().toISOString(), scores: {}, strengths: [], missing: [], misconceptions: [], questions: [] });
        }""")
        go(pg, "#/kok/9/fizik", 1400)
        txt = pg.locator("#view").inner_text()
        check("kök eksik bulundu", "Zorlandığın konular ve olası kökleri" in txt, txt[:300])
        card = pg.locator(".root-card", has_text="Hareketin temel kavramlarını").first
        ct = card.inner_text()
        check("hareket → kök: Tales, Öklid ve Pisagor (dersler arası)", "Asıl eksiğin büyük olasılıkla: Tales, Öklid ve Pisagor" in ct, ct[:400])
        check("yol: Pisagor → vektörler → hareket", card.locator(".root-path li").count() == 3 and "matemat" in card.locator(".root-path li").first.inner_text().lower(), card.locator(".root-path").inner_text())
        check("haritada zayıf ok kırmızı", pg.locator(".rg-edge.is-hot").count() >= 2, pg.locator(".rg-edge.is-hot").count())
        check("dış ders kutusu kesikli", pg.locator(".rg-node.is-ext").count() >= 3)
        pg.screenshot(path=os.path.join(SHOT, "roots-desktop.png"), full_page=True)
        mtk = pg.locator(".root-card").filter(has=pg.locator(".root-card__title", has_text="Tales, Öklid")).first.inner_text()
        check("Pisagor kartı: ön koşulları denenmemiş", "Ön koşullarını henüz denemedin" in mtk, mtk[:300])
        # asistana sor
        card.locator("[data-root-ask]").click(); pg.wait_for_timeout(1200)
        check("asistana kök-eksik sorusu gitti", "zorlanıyorum" in pg.locator("#view").inner_text())
        # Konu sayfası kartı
        go(pg, "#/konular/9/fizik/u2/k6", 1200)
        rc = pg.locator(".root-lesson").inner_text()
        check("konu sayfası: ön koşullar + kök uyarısı", "Ön koşullar" in rc and "Asıl eksiğin" in rc and "Skaler ve vektörel" in rc, rc[:300])
        check("konu sayfası: sonraki konular", "Hareketleri türlerine göre" in rc)
        # Bugün ekranı: kökü önerir
        go(pg, "#/bugun", 1200)
        sug = pg.locator(".tday-sug").inner_text() if pg.locator(".tday-sug").count() else ""
        check("Bugün: kök konuyu öneriyor", "Tales, Öklid ve Pisagor" in sug and "kökü olabilir" in sug, sug[:200])
        # Test sonucu ipucu
        go(pg, "#/test/9/fizik/u2/k7", 1500)
        for _ in range(40):
            if pg.locator(".quiz-q").count() == 10: break
            pg.wait_for_timeout(250)
        pg.locator(".quiz-q").first.locator(".opt").first.click()
        pg.locator(".quiz-finish .btn--primary, #qFinish").first.click(); pg.wait_for_timeout(300)
        if pg.locator(".modal .btn--primary").count(): pg.locator(".modal .btn--primary").click()
        pg.wait_for_timeout(1500)
        qr = pg.locator(".quiz-result").inner_text() if pg.locator(".quiz-result").count() else ""
        check("test sonucu: kök eksik ipucu", "Asıl eksiğin" in qr, qr[:300])
        # Yapay zekâyla harita (10. sınıf kimya)
        go(pg, "#/konular/10/kimya", 2500)
        for _ in range(40):
            if pg.locator(".outcome").count(): break
            pg.wait_for_timeout(250)
        go(pg, "#/kok/10/kimya", 1200)
        check("harita yok → yapay zekâ düğmesi", pg.locator("#rootGen").count() == 1)
        reset()
        pg.click("#rootGen"); pg.wait_for_timeout(2500)
        m = pg.evaluate("async () => (await App.db.get('meta', 'prereq:10/kimya'))")
        check("YZ haritası kaydedildi, döngü kırıldı", m and m["map"].get("u2/k1") == ["u1/k3", "u1/k1"] and "u1/k1" not in m["map"], m and m["map"])
        n10k = pg.evaluate("() => App.data.curriculum.findSubject('10','kimya').units.reduce((a,u)=>a+u.outcomes.length,0)")
        check("YZ haritası çizildi", pg.locator(".rg .rg-node").count() == n10k and "yapay zekâyla çıkarıldı" in pg.locator("#rootMap").inner_text())

        # ================= 2) Çözümümü kontrol et =================
        go(pg, "#/kontrol/9/matematik/t2/k3", 1200)
        check("konu ön seçili", pg.locator("#chkOut").input_value() == "9/matematik/t2/k3")
        check("fotoğrafsız düğme kapalı", pg.locator("#chkGo").is_disabled())
        pg.set_input_files("#chkFile", os.path.join(SP, "solution.jpg")); pg.wait_for_timeout(600)
        check("önizleme", pg.locator("#chkPrev").is_visible() and not pg.locator("#chkGo").is_disabled())
        reset()
        pg.click("#chkGo")
        for _ in range(40):
            if pg.locator(".chk-result").count(): break
            pg.wait_for_timeout(250)
        req = [x for x in gens() if "firstWrong" in json.dumps(x["body"])]
        check("istek: görsel + konu + ipucu kuralı", req and any("inlineData" in json.dumps(c) for c in req[-1]["body"]["contents"]) and "Doğrusal fonksiyonlarla" in json.dumps(req[-1]["body"], ensure_ascii=False))
        rt = pg.locator(".chk-result").inner_text()
        check("sonuç: hata 2. adımda", "Hata 2. adımda" in rt, rt[:200])
        check("adımlar: 4 adım, 2. hatalı, 3-4 taşıyor", pg.locator(".chk-step").count() == 4 and pg.locator(".chk-step--wrong.is-first").count() == 1 and pg.locator(".chk-step--carry").count() == 2)
        check("'Hata burada' + not", "Hata burada" in pg.locator(".chk-step--wrong").inner_text() and "işaret" in pg.locator(".chk-step--wrong").inner_text())
        check("hata türü: İşlem hatası", "İşlem hatası" in pg.locator(".chk-err").inner_text())
        check("doğrusu gizli, ipucu görünür", pg.locator("#chkFix").is_hidden() and "İpucu" in rt)
        check("KaTeX çizildi", pg.locator(".chk-step .katex").count() >= 4)
        pg.screenshot(path=os.path.join(SHOT, "check-desktop.png"), full_page=True)
        pg.click('[data-chk="reveal"]'); pg.wait_for_timeout(200)
        check("doğrusunu göster", pg.locator("#chkFix").is_visible() and "x=5" in pg.locator("#chkFix").inner_text().replace(" ", ""))
        pg.click('[data-chk="mistake"]'); pg.wait_for_timeout(500)
        mis = pg.evaluate("async () => (await App.db.getAll('mistakes')).filter(m => m.source === 'check')")
        check("yanlış defterine hata türüyle eklendi", len(mis) == 1 and mis[0]["errType"] == "islem" and mis[0]["errBy"] == "ai" and mis[0]["key"] == "9/matematik/t2/k3" and mis[0]["image"].startswith("data:image"), mis and {k: mis[0].get(k) for k in ("errType", "errBy", "key")})
        chk = pg.evaluate("async () => (await App.db.getAll('checks'))")
        check("kontrol kaydı (eşitlenen depo)", len(chk) == 1 and chk[0]["verdict"] == "wrong" and chk[0]["mistakeId"] and "checks" in pg.evaluate("() => App.db.SYNC_STORES"))
        check("geçmiş listesi", pg.locator(".chk-item").count() == 1 and "Hata 2. adımda" in pg.locator(".chk-item").inner_text())
        mst = pg.evaluate("async () => { const M = await App.roots.mastery(); const m = M.get('9/matematik/t2/k3'); return m && [m.parts.chk, m.status]; }")
        check("kontrol sonucu hâkimiyete katıldı", mst and mst[0] == 0, mst)
        go(pg, "#/yanlislar/tumu", 1000)
        check("yanlış defterinde kaynak: Çözüm kontrolü", "Çözüm kontrolü" in pg.locator("#view").inner_text(), pg.locator("#view").inner_text()[:300])
        go(pg, "#/konular/9/matematik/t2/k3", 1000)
        check("konu sayfasında çözüm kontrolü kartı", "1 çözüm kontrol ettin" in pg.locator(".chk-card").inner_text())

        # ================= 5) Sesli Feynman (tarayıcı ses tanıma) =================
        go(pg, "#/anlat/9/fizik/u2/k5", 1200)
        pg.click('.fey-mode [data-mode="voice"]'); pg.wait_for_timeout(200)
        check("konuşarak modu paneli", pg.locator("#feyVoice").is_visible() and pg.locator("#feyRec").count() == 1)
        check("ipucu: tarayıcı modu", "Tarayıcının ses tanıması" in pg.locator("#feyRecHint").inner_text())
        pg.click("#feyRec"); pg.wait_for_timeout(2000)
        check("kayıt: düğme kırmızı, süre işliyor", "is-rec" in pg.locator("#feyRec").get_attribute("class") and pg.locator("#feyRecTime").inner_text() != "0:00")
        pg.click("#feyRec"); pg.wait_for_timeout(500)
        ta = pg.locator("#feyText").input_value()
        check("konuşma yazıya döküldü", "Kuvvet bir cismin" in ta and "Newton" in ta and "vektöreldir" in ta, ta)
        voice = pg.evaluate("() => JSON.parse(App.prefs.get('feyVoice:9/fizik/u2/k5', 'null'))")
        check("ses süresi kaydedildi", voice and voice["ms"] > 800 and "ııı" in voice["text"], voice)
        st = pg.evaluate("() => App.feynman.speechStats('Kuvvet ııı yani itme şey çekme eee hmm etkidir', 60000)")
        check("konuşma analizi: dolgu sözcükleri", st["fillers"] == 5 and st["words"] == 9 and st["wpm"] == 9, st)
        reset()
        pg.click("#feyGo")
        for _ in range(40):
            if pg.locator("#feyResult").count(): break
            pg.wait_for_timeout(250)
        fr = pg.locator("#feyResult").inner_text()
        check("sonuçta konuşma analizi", "Konuşma analizi" in fr and "kelime/dk" in fr and "dolgu" in fr, fr[-400:])
        g = [x for x in gens() if "scores" in json.dumps(x["body"])]
        check("değerlendirme isteğinde 'SESLİ' notu", g and "SESLİ" in json.dumps(g[-1]["body"], ensure_ascii=False))
        row = pg.evaluate("async () => (await App.db.getAll('explains')).filter(x => x.key === '9/fizik/u2/k5')[0]")
        check("kayıtta voice alanı", row and row.get("voice") and row["voice"]["fillers"] >= 2, row and row.get("voice"))
        check("sesli açıklamada 'Dinle'", pg.locator(".fey-block--simple [data-listen]").count() == 1)
        pg.screenshot(path=os.path.join(SHOT, "fey-voice-desktop.png"), full_page=True)
        # asistan yanıtında Dinle
        go(pg, "#/", 800)
        pg.fill("#composerInput", "Merhaba"); pg.keyboard.press("Enter"); pg.wait_for_timeout(2000)
        check("asistan yanıtında Dinle düğmesi", pg.locator(".msg--ai [data-listen]").count() >= 1)
        pg.evaluate("() => { window.__utter = []; }")
        pg.locator(".msg--ai [data-listen]").last.click(); pg.wait_for_timeout(400)
        u2 = pg.evaluate("() => window.__utter")
        check("asistan yanıtı okunuyor (yalnız yanıt metni)", u2 and "Sunucu yanıtı tamam" in u2[0]["text"] and "gemini" not in u2[0]["text"].lower(), u2)
        ctx.close()

        # ================= 5b) Kayıt + yapay zekâyla yazıya çevirme (Windows uygulaması yolu) =================
        ctx, pg = newctx(b, noSR=True)
        check("ses tanıma yokken mod: record", pg.evaluate("() => App.speech.sttMode()") == "record")
        go(pg, "#/anlat/9/fizik/u2/k1", 1000)
        pg.click('.fey-mode [data-mode="voice"]'); pg.wait_for_timeout(200)
        check("ipucu: kayıt modu", "yapay zekâ yazıya çevirir" in pg.locator("#feyRecHint").inner_text())
        reset()
        pg.click("#feyRec"); pg.wait_for_timeout(2600)
        pg.click("#feyRec")
        for _ in range(40):
            if "Kuvvet" in pg.locator("#feyText").input_value(): break
            pg.wait_for_timeout(250)
        ta = pg.locator("#feyText").input_value()
        check("kayıt yazıya çevrildi", "Kuvvet bir cismin" in ta and "Newton" in ta, ta)
        au = [x for x in gens() if "audio/" in json.dumps(x["body"])]
        check("sunucuya ses (inlineData audio/webm) gitti", au and any(pp.get("inlineData", {}).get("mimeType", "").startswith("audio/") for c in au[-1]["body"]["contents"] for pp in c["parts"]))
        ctx.close()

        # ================= Telefon görünümü =================
        ctx, pg = newctx(b, mobile=True)
        pg.evaluate("""async () => {
          const q = (key, c, d) => App.db.put('quizzes', { id: 'q' + d, key, label: key, date: new Date(Date.now() - d * 60000).toISOString(), total: 10, correct: c, wrong: 10 - c, empty: 0, questions: [] });
          await q('9/fizik/u2/k6', 3, 1); await q('9/fizik/u2/k4', 3, 2); await q('9/matematik/t4/k4', 2, 3);
        }""")
        for h, n in [("#/kok", "roots"), ("#/kontrol", "check"), ("#/anlat/9/fizik/u2/k5", "fey"), ("#/konular/9/fizik/u2/k6", "lesson")]:
            go(pg, h, 1300)
            if n == "fey": pg.click('.fey-mode [data-mode="voice"]'); pg.wait_for_timeout(200)
            if n == "check":
                pg.set_input_files("#chkFile", os.path.join(SP, "solution.jpg")); pg.wait_for_timeout(500); pg.click("#chkGo")
                for _ in range(40):
                    if pg.locator(".chk-result").count(): break
                    pg.wait_for_timeout(250)
            ov = overflow(pg)
            check("telefon: yatay taşma yok " + n, ov <= 1, ov)
            pg.screenshot(path=os.path.join(SHOT, "phone-" + n + ".png"), full_page=True)
        pg.evaluate("() => App.a11y.open()"); pg.wait_for_timeout(300)
        pg.screenshot(path=os.path.join(SHOT, "phone-a11y.png"))
        check("telefon: a11y paneli sığıyor", pg.evaluate("() => { const r = document.querySelector('.modal').getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth + 1; }"))
        pg.click('.a11y-seg[data-seg="text"] [data-v="xl"]'); pg.locator(".modal [data-close]").last.click()
        go(pg, "#/konular/9/fizik/u2/k6", 1000)
        check("telefon: çok büyük yazıda taşma yok", overflow(pg) <= 1, overflow(pg))
        pg.screenshot(path=os.path.join(SHOT, "phone-xl.png"))
        ctx.close()

        # İngilizce arayüz
        ctx, pg = newctx(b)
        pg.evaluate("() => App.i18n.setLang('en')"); pg.wait_for_timeout(500)
        for h in ["#/kok", "#/kontrol", "#/anlat/9/fizik/u2/k5"]:
            go(pg, h, 1000)
            body = pg.locator("#view").inner_text()
            check("EN: eksik çeviri yok " + h, "root." not in body and "chk." not in body and "fey.v." not in body and "a11y." not in body)
        check("EN menü", pg.locator('a[href="#/kok"]').inner_text().strip() == "Root Gap Analysis")
        ctx.close()
        b.close()
finally:
    for pr in procs: pr.terminate()
check("sayfa hatası yok", not errs, errs[:5])
print(f"{sum(res)}/{len(res)} geçti")
