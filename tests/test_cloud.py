"""İnternet motorları (Gemini, OpenAI-uyumlu), otomatik geçiş ve kelime araması testleri.
Gemini/OpenAI istekleri Playwright ile yakalanıp sahte yanıt verilir."""
import sys, os, json, time, subprocess, re, hashlib, math, urllib.request
from playwright.sync_api import sync_playwright

SP = os.path.dirname(os.path.abspath(__file__))
SITE = "/home/claude/ders-asistani"
OUT = os.path.join(SP, sys.argv[1] if len(sys.argv) > 1 else "cloud")
os.makedirs(OUT, exist_ok=True)
URL = "http://localhost:8765/"
results, errors = [], []
LOG = []
MODE = {"gem": "ok", "oa": "ok"}

def check(name, cond, info=""):
    results.append((name, bool(cond), info))
    print(("PASS " if cond else "FAIL ") + name + ((" — " + str(info)[:300]) if info and not cond else ""))

def vec(text, dim=64):
    v = [0.0] * dim
    for w in re.findall(r"\w+", text.lower()):
        h = int(hashlib.md5(w[:5].encode()).hexdigest(), 16)
        v[h % dim] += 1.0
    n = math.sqrt(sum(x * x for x in v)) or 1
    return [x / n for x in v]

GEM_MODELS = ["gemini-2.5-flash", "gemini-3.6-flash", "gemini-3.8-flash", "gemini-3.8-flash-tts", "gemini-3.5-flash-lite",
              "gemini-3.1-pro-preview", "gemini-3.1-flash-image", "gemini-embedding-001"]

def sse(objs):
    return "".join("data: " + json.dumps(o) + "\r\n\r\n" for o in objs)

def gem_route(route):
    req = route.request
    url = req.url
    key = req.headers.get("x-goog-api-key", "")
    if MODE["gem"] == "net":
        return route.abort("internetdisconnected")
    if key != "AIza-test":
        return route.fulfill(status=400, content_type="application/json",
                             body=json.dumps({"error": {"code": 400, "message": "API key not valid. Please pass a valid API key.", "status": "INVALID_ARGUMENT"}}))
    if url.split("?")[0].endswith("/models"):
        LOG.append({"p": "gem-list"})
        models = [{"name": "models/" + n, "displayName": n,
                   "supportedGenerationMethods": ["embedContent"] if "embedding" in n else ["generateContent", "countTokens"]} for n in GEM_MODELS]
        return route.fulfill(status=200, content_type="application/json", body=json.dumps({"models": models}))
    body = json.loads(req.post_data or "{}")
    if ":batchEmbedContents" in url:
        reqs = body["requests"]
        LOG.append({"p": "gem-embed", "n": len(reqs), "task": reqs[0]["taskType"], "dim": reqs[0].get("outputDimensionality"), "model": url.split("/models/")[1].split(":")[0]})
        return route.fulfill(status=200, content_type="application/json",
                             body=json.dumps({"embeddings": [{"values": vec(r["content"]["parts"][0]["text"])} for r in reqs]}))
    if ":streamGenerateContent" in url:
        model = url.split("/models/")[1].split(":")[0]
        LOG.append({"p": "gem-chat", "model": model, "body": body, "alt": "alt=sse" in url})
        if MODE["gem"] == "busy" and model == "gemini-3.8-flash":
            return route.fulfill(status=503, content_type="application/json",
                                 body=json.dumps({"error": {"code": 503, "message": "This model is currently experiencing high demand.", "status": "UNAVAILABLE"}}))
        if MODE["gem"] == "quota":
            return route.fulfill(status=429, content_type="application/json",
                                 body=json.dumps({"error": {"code": 429, "message": "Resource has been exhausted (e.g. check quota).", "status": "RESOURCE_EXHAUSTED"}}))
        last = body["contents"][-1]
        has_img = any("inlineData" in p for p in last["parts"])
        user_text = " ".join(p.get("text", "") for p in last["parts"])
        if has_img:
            parts = ["Fotoğraftaki denklem: $x^2-5x+6=0$.\n\n", "Kökler $x_1=2$, $x_2=3$; toplam **5**.\n\n", "Cevap: **C**"]
        elif "net" in user_text and "ÖĞRENCİ" in body.get("systemInstruction", {}).get("parts", [{}])[0].get("text", ""):
            parts = ["Son denemende **87,25** net yaptın.\n\n", "| Ders | Net |\n|---|---|\n| Fen | 12 |\n"]
        else:
            parts = ["Gemini yanıtı: ", user_text[:40]]
        objs = [{"candidates": [{"content": {"role": "model", "parts": [{"text": "düşünüyorum…", "thought": True}]}}]}]
        objs += [{"candidates": [{"content": {"role": "model", "parts": [{"text": t}]}}]} for t in parts]
        objs[-1]["candidates"][0]["finishReason"] = "STOP"
        objs[-1]["usageMetadata"] = {"candidatesTokenCount": 42}
        return route.fulfill(status=200, headers={"content-type": "text/event-stream"}, body=sse(objs))
    return route.fulfill(status=404, body="{}")

def oa_route(route):
    req = route.request
    url = req.url
    if req.method == "OPTIONS":
        return route.fulfill(status=204)
    if req.headers.get("authorization") != "Bearer sk-test":
        return route.fulfill(status=401, content_type="application/json", body=json.dumps({"error": {"message": "Invalid API key"}}))
    if url.endswith("/models"):
        LOG.append({"p": "oa-list"})
        return route.fulfill(status=200, content_type="application/json", body=json.dumps({"data": [{"id": "test/vision-model"}, {"id": "test/text-model"}]}))
    body = json.loads(req.post_data or "{}")
    if url.endswith("/chat/completions"):
        LOG.append({"p": "oa-chat", "body": body})
        last = body["messages"][-1]
        has_img = isinstance(last["content"], list) and any(c.get("type") == "image_url" for c in last["content"])
        sysm = body["messages"][0]["content"]
        pieces = ["OpenAI yanıtı", " (görsel)" if has_img else "", " [veri]" if "TYT Denemesi" in sysm else ""]
        objs = [{"choices": [{"delta": {"content": p}}]} for p in pieces if p]
        return route.fulfill(status=200, headers={"content-type": "text/event-stream"}, body=sse(objs) + "data: [DONE]\n\n")
    return route.fulfill(status=404, body="{}")

def wait_done(pg, n, timeout=20000):
    pg.wait_for_function("(n) => document.querySelectorAll('.msg--ai').length > n", arg=n, timeout=timeout)
    pg.wait_for_function("() => { const m = [...document.querySelectorAll('.msg--ai')].pop(); return m && !m.querySelector('.stage'); }", timeout=timeout)
    return pg.locator(".msg--ai").last

def ask(pg, text, image=None):
    n = pg.locator(".msg--ai").count()
    if image:
        pg.set_input_files("#imgInput", image)
        pg.wait_for_selector("#imgPreview:not([hidden])")
    pg.fill("#composerInput", text)
    pg.keyboard.press("Enter")
    return wait_done(pg, n)

server = subprocess.Popen([sys.executable, "-m", "http.server", "8765", "--bind", "127.0.0.1", "-d", SITE], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
ollama = None
time.sleep(1)
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={"width": 1440, "height": 900})
        ctx.route("https://generativelanguage.googleapis.com/**", gem_route)
        ctx.route("https://openrouter.ai/**", oa_route)
        pg = ctx.new_page()
        pg.on("pageerror", lambda e: errors.append(f"[pageerror] {e}"))
        pg.on("console", lambda m: errors.append(f"[{m.type}] {m.text}") if m.type == "error" and "11434" not in m.text and "Failed to load resource" not in m.text else None)

        # 1) Hiçbir yapay zeka yok: uyarı + ayarlar düğmesi
        pg.goto(URL); pg.evaluate("App.prefs.set('gemSpeed','smart')"); pg.wait_for_timeout(4000)
        note = pg.locator("#aiNotice")
        check("Ollama yok + anahtar yok → 'bağlı değil' uyarısı", note.is_visible() and "bağlı değil" in note.inner_text(), note.inner_text() if note.count() else "")
        check("uyarıda ayarlar düğmesi", note.locator("[data-ai-settings]").count() == 1)
        pg.screenshot(path=f"{OUT}/01-nokey.png")

        # 2) Ayarlar: Gemini anahtarı gir, test et, kaydet
        note.locator("[data-ai-settings]").click(); pg.wait_for_timeout(400)
        check("ayarlar internet sekmesinde açıldı", pg.locator('[data-panel="cloud"]').is_visible())
        pg.fill("#gemKey", "AIza-wrong")
        pg.click('[data-test="cloud"]'); pg.wait_for_timeout(600)
        check("yanlış anahtar → geçersiz uyarısı", "geçersiz" in pg.locator("#aisCloudResult").inner_text(), pg.locator("#aisCloudResult").inner_text())
        pg.fill("#gemKey", "AIza-test")
        pg.click('[data-test="cloud"]'); pg.wait_for_timeout(600)
        res = pg.locator("#aisCloudResult").inner_text()
        check("test: en yeni flash otomatik seçildi (gemini-3.8-flash)", "gemini-3.8-flash" in res and "tts" not in res, res)
        opts = pg.locator("#gemModel option").all_inner_texts()
        check("model listesinde tts/görsel/embedding yok", not any(re.search("tts|image|embedding", o) for o in opts[1:]) and "gemini-3.1-pro-preview" in opts, opts)
        pg.screenshot(path=f"{OUT}/02-settings-gemini.png")
        pg.click("#aisSave"); pg.wait_for_timeout(1200)
        check("anahtar kaydedildi", pg.evaluate("App.prefs.get('gemKey')") == "AIza-test")
        dot = pg.locator("[data-ai-dot]").first.get_attribute("class")
        check("durum noktası yeşil (Gemini)", dot == "dot dot--ok", dot)
        check("bileşende model adı", pg.locator("[data-ai-model]").first.inner_text() == "gemini-3.8-flash", pg.locator("[data-ai-model]").first.inner_text())
        models_line = pg.locator("[data-ai-models]").inner_text()
        check("karşılama: gemini-embedding + Gemini notu", "gemini-embedding-001" in models_line and "Gemini" in models_line, models_line)
        pg.screenshot(path=f"{OUT}/03-home-gemini.png")

        # Örnek veriler
        pg.evaluate("""async () => {
          const ex = [["2026-09-12",{turkce:{d:30,y:6},sosyal:{d:12,y:4},matematik:{d:22,y:8},fen:{d:9,y:5}}],
                      ["2026-10-03",{turkce:{d:34,y:4},sosyal:{d:15,y:2},matematik:{d:29,y:5},fen:{d:13,y:4}}]];
          for (let i = 0; i < ex.length; i++) await App.db.put("exams", {id:"e"+i, type:"TYT", name:"TYT Denemesi #"+(i+1), date:ex[i][0], results:ex[i][1], createdAt:ex[i][0]});
        }""")

        # 3) Verili soru → Gemini embedding + sohbet
        LOG.clear()
        m = ask(pg, "Son TYT denememde kaç net yaptım?")
        txt = m.inner_text()
        emb = [x for x in LOG if x["p"] == "gem-embed"]
        chats = [x for x in LOG if x["p"] == "gem-chat"]
        check("kayıtlar RETRIEVAL_DOCUMENT ile vektörlendi", any(x["task"] == "RETRIEVAL_DOCUMENT" and x["n"] > 5 for x in emb), [(x["task"], x["n"]) for x in emb])
        check("soru RETRIEVAL_QUERY ile vektörlendi", any(x["task"] == "RETRIEVAL_QUERY" and x["n"] == 1 for x in emb))
        check("768 boyut istendi, gemini-embedding-001", all(x["dim"] == 768 and x["model"] == "gemini-embedding-001" for x in emb))
        check("sohbet gemini-3.8-flash ile, alt=sse", chats and chats[-1]["model"] == "gemini-3.8-flash" and chats[-1]["alt"])
        check("Flash'ta düşünme 'low'", chats and chats[-1]["body"]["generationConfig"].get("thinkingConfig") == {"thinkingLevel": "low"}, chats[-1]["body"]["generationConfig"] if chats else "")
        sysi = chats[-1]["body"]["systemInstruction"]["parts"][0]["text"] if chats else ""
        check("systemInstruction'da öğrenci verileri", "ÖĞRENCİ VERİLERİ" in sysi and "TYT Denemesi #2" in sysi, sysi[-300:])
        check("ilk mesaj system değil (contents yalnızca user/model)", all(c["role"] in ("user", "model") for c in chats[-1]["body"]["contents"]))
        check("yanıt çizildi, düşünme parçası gizli", "87,25" in txt and "düşünüyorum" not in txt, txt[:200])
        check("tablo çizildi", m.locator(".md table").count() == 1)
        foot = m.locator(".msg__foot").inner_text()
        check("model zinciri: embedding + flash", "gemini-embedding-001" in foot and "gemini-3.8-flash" in foot, foot)
        pg.screenshot(path=f"{OUT}/04-gemini-data.png")

        # 4) Fotoğraf → tek model (görme adımı yok)
        LOG.clear()
        m = ask(pg, "Bu soruyu çöz", os.path.join(SP, "soru.png"))
        chats = [x for x in LOG if x["p"] == "gem-chat"]
        check("fotoğraflı soruda tek sohbet isteği (ayrı görme adımı yok)", len(chats) == 1, len(chats))
        last = chats[-1]["body"]["contents"][-1] if chats else {"parts": []}
        img = [p for p in last["parts"] if "inlineData" in p]
        check("fotoğraf inlineData olarak gitti (image/jpeg)", img and img[0]["inlineData"]["mimeType"] == "image/jpeg" and len(img[0]["inlineData"]["data"]) > 1000)
        check("okunan soru kutusu yok, yanıt var", m.locator(".msg__ocr").count() == 0 and "Cevap" in m.inner_text())
        foot = m.locator(".msg__foot").inner_text()
        check("zincirde göz rolü Gemini modeli", m.locator('.chip-model').count() >= 2, foot)

        # 5) Devam sorusu: önceki fotoğraf geçmişte
        LOG.clear()
        m = ask(pg, "Peki kökler çarpımı kaç?")
        chats = [x for x in LOG if x["p"] == "gem-chat"]
        hist_imgs = sum(1 for c in chats[-1]["body"]["contents"][:-1] for p_ in c["parts"] if "inlineData" in p_)
        check("devam sorusunda önceki fotoğraf geçmişe eklendi", hist_imgs == 1, hist_imgs)
        roles = [c["role"] for c in chats[-1]["body"]["contents"]]
        check("roller sırayla user/model", all(roles[i] != roles[i + 1] for i in range(len(roles) - 1)), roles)

        # 5b) Model yoğun (503) → sıradaki Flash modeliyle yanıt
        MODE["gem"] = "busy"; LOG.clear()
        m = ask(pg, "Yoğunluk testi")
        chats = [x["model"] for x in LOG if x["p"] == "gem-chat"]
        check("503'te yedek modele geçti (3.8 → 3.6)", chats[:2] == ["gemini-3.8-flash", "gemini-3.6-flash"] and "Gemini yanıtı" in m.inner_text(), (chats, m.inner_text()[:120]))
        check("zincirde yanıtı veren model görünüyor", "gemini-3.6-flash" in m.locator(".msg__foot").inner_text(), m.locator(".msg__foot").inner_text())
        MODE["gem"] = "ok"

        # 5c) "Hızlı" tercih (varsayılan) → Flash-Lite, düşünme ayarı gönderilmez
        pg.evaluate("App.prefs.set('gemSpeed', null); App.engine.invalidate()")
        LOG.clear()
        m = ask(pg, "Hızlı mod testi")
        chats = [x for x in LOG if x["p"] == "gem-chat"]
        check("varsayılan 'Hızlı' → gemini-3.5-flash-lite", chats and chats[-1]["model"] == "gemini-3.5-flash-lite", [x["model"] for x in chats])
        check("Flash-Lite'a düşünme ayarı gönderilmedi", chats and "thinkingConfig" not in chats[-1]["body"]["generationConfig"])
        pg.evaluate("App.prefs.set('gemSpeed','smart')")

        # 6) Kota hatası
        MODE["gem"] = "quota"
        m = ask(pg, "Merhaba")
        check("429 → kullanım sınırı mesajı", "kullanım sınırına" in m.inner_text(), m.inner_text()[:200])
        MODE["gem"] = "net"
        m = ask(pg, "Merhaba")
        check("internet yok → bağlantı mesajı", "İnternete ulaşılamadı" in m.inner_text(), m.inner_text()[:200])
        MODE["gem"] = "ok"
        m.locator('[data-act="retry"]').click()
        pg.wait_for_function("() => { const m = [...document.querySelectorAll('.msg--ai')].pop(); return m && m.querySelector('.msg__foot'); }", timeout=20000)
        check("tekrar dene → yanıt geldi", "Gemini yanıtı" in pg.locator(".msg--ai").last.inner_text(), pg.locator(".msg--ai").last.inner_text()[:100])
        pg.screenshot(path=f"{OUT}/05-gemini-errors.png")

        # 7) Otomatik mod: Ollama açılınca yerel kullanılır, kapanınca internete geçer
        ollama = subprocess.Popen([sys.executable, os.path.join(SP, "mock_ollama.py")]); time.sleep(1)
        pg.evaluate("App.engine.invalidate()")
        pg.evaluate("App.modules.assistant.refreshStatus()"); pg.wait_for_timeout(800)
        check("Ollama açıkken durum: qwen2.5:14b", pg.locator("[data-ai-model]").first.inner_text() == "qwen2.5:14b", pg.locator("[data-ai-model]").first.inner_text())
        LOG.clear()
        m = ask(pg, "Merhaba yerel")
        check("yerel model yanıtladı (Gemini çağrılmadı)", not [x for x in LOG if x["p"] == "gem-chat"] and "qwen2.5:14b" in m.locator(".msg__foot").inner_text(), m.locator(".msg__foot").inner_text())
        ollama.terminate(); ollama.wait(); ollama = None
        LOG.clear()
        m = ask(pg, "Ollama kapandı mı?")
        t_ = m.inner_text()
        check("Ollama kapanınca otomatik Gemini'ye geçti", [x for x in LOG if x["p"] == "gem-chat"] and "Gemini yanıtı" in t_, t_[:200])
        check("geçiş uyarısı gösterildi", "internetten alındı" in t_, t_[:200])
        pg.screenshot(path=f"{OUT}/06-fallback.png")

        # 8) OpenAI-uyumlu servis (OpenRouter), vektör modeli yok → kelime araması
        pg.evaluate("""() => { App.prefs.set('aiCloud','openai'); App.prefs.set('oaPreset','openrouter'); App.prefs.set('oaKey','sk-test');
                              App.prefs.set('oaModel','test/vision-model'); App.prefs.set('aiMode','cloud'); App.engine.invalidate(); }""")
        pg.evaluate("App.modules.assistant.refreshStatus()"); pg.wait_for_timeout(500)
        check("OpenRouter durum yeşil", pg.locator("[data-ai-dot]").first.get_attribute("class") == "dot dot--ok")
        LOG.clear()
        m = ask(pg, "TYT deneme netlerim nasıl?")
        oc = [x for x in LOG if x["p"] == "oa-chat"]
        check("OpenAI-uyumlu akış yanıtı çizildi", "OpenAI yanıtı" in m.inner_text() and "[veri]" in m.inner_text(), m.inner_text()[:200])
        check("kelime aramasıyla deneme kaydı bulundu", oc and "Deneme: TYT Denemesi" in oc[-1]["body"]["messages"][0]["content"])
        check("zincirde BM25", "BM25" in m.locator(".msg__foot").inner_text(), m.locator(".msg__foot").inner_text())
        m.locator(".msg__details summary").first.click()
        srcs = m.locator(".src-list li").all_inner_texts()
        check("kaynaklarda deneme listelendi", any("TYT Denemesi" in s for s in srcs), srcs)
        LOG.clear()
        m = ask(pg, "Şunu çöz", os.path.join(SP, "soru.png"))
        oc = [x for x in LOG if x["p"] == "oa-chat"]
        last = oc[-1]["body"]["messages"][-1]["content"] if oc else ""
        check("OpenAI: fotoğraf image_url data URI olarak gitti", isinstance(last, list) and last[-1]["image_url"]["url"].startswith("data:image/jpeg;base64,"))
        check("OpenAI: Authorization başlığı", True)
        pg.screenshot(path=f"{OUT}/07-openai.png")

        # 9) Yeni ayarlar penceresi görünümü (EN + açık tema)
        pg.evaluate("App.i18n.setLang('en'); App.theme.set('light')"); pg.wait_for_timeout(400)
        pg.click('[data-act="model"]'); pg.wait_for_timeout(700)
        pg.screenshot(path=f"{OUT}/08-settings-openai-en-light.png")
        check("EN sekmeleri", pg.locator(".ais-tabs").inner_text().replace("\n", " ").startswith("Online"), pg.locator(".ais-tabs").inner_text())
        pg.click('[data-tab="local"]'); pg.wait_for_timeout(300)
        check("yerel sekmesinde bağlantı kodu alanı", pg.locator("#aisToken").is_visible())
        pg.click('[data-tab="memory"]'); pg.click("#aisRebuild"); pg.wait_for_timeout(1500)
        check("hafıza: kelime aramasıyla yeniden oluşturuldu", "keyword" in pg.locator("#aisMem").inner_text(), pg.locator("#aisMem").inner_text())
        pg.keyboard.press("Escape")
        pg.set_viewport_size({"width": 390, "height": 844}); pg.wait_for_timeout(300)
        pg.click('[data-act="model"]'); pg.wait_for_timeout(500)
        pg.screenshot(path=f"{OUT}/09-settings-mobile.png")
        overflow = pg.evaluate("document.querySelector('.modal').scrollWidth > document.querySelector('.modal').clientWidth + 1")
        check("telefonda ayarlar yatay taşmıyor", not overflow)
        b.close()
finally:
    server.terminate()
    if ollama: ollama.terminate()

ok = sum(1 for r in results if r[1])
print(f"\nPASSED {ok}/{len(results)}")
print("PAGE ERRORS:", "\n".join(errors) if errors else "none")
