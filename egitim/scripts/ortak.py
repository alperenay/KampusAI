"""ortak.py — tüm adımların paylaştığı yardımcılar.

Yalnızca Python standart kütüphanesini kullanır; veri üretimi ve test adımları
ağır eğitim paketleri kurulmadan da çalışır.
"""
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from datetime import date, timedelta
from pathlib import Path

KIT = Path(__file__).resolve().parent.parent
VERI = KIT / "veri"
URETILEN = VERI / "uretilen"
CIKTI = KIT / "cikti"
RAPOR = KIT / "rapor"

# Windows konsolunda Türkçe karakterler bozulmasın
for _s in (sys.stdout, sys.stderr):
    try:
        _s.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass


def ayarlar():
    with open(KIT / "ayarlar.json", encoding="utf-8") as f:
        a = json.load(f)
    a["icerik_klasoru"] = str((KIT / a["icerik_klasoru"]).resolve())
    return a


def log(*parca):
    print(time.strftime("[%H:%M:%S]"), *parca, flush=True)


class _Cift:
    """Konsola yazılanı günlük dosyasına da yazar (uzaktan ilerleme takibi için)."""
    def __init__(self, akis, dosya):
        self.akis, self.dosya = akis, dosya

    def write(self, s):
        try:
            self.akis.write(s)
        except Exception:
            pass
        self.dosya.write(s)
        self.dosya.flush()
        return len(s)

    def flush(self):
        try:
            self.akis.flush()
        except Exception:
            pass

    def __getattr__(self, ad):
        return getattr(self.akis, ad)


def baslat(adim):
    """Her adımın başında çağrılır: günlük dosyası açar, bilgisayarın uykuya geçmesini engeller."""
    gunluk = RAPOR / "gunluk"
    gunluk.mkdir(parents=True, exist_ok=True)
    f = open(gunluk / f"{adim}.txt", "a", encoding="utf-8")
    f.write(f"\n===== {time.strftime('%Y-%m-%d %H:%M:%S')} {adim} {' '.join(sys.argv[1:])} =====\n")
    sys.stdout = _Cift(sys.stdout, f)
    sys.stderr = _Cift(sys.stderr, f)
    if os.name == "nt":
        try:
            import ctypes
            # ES_CONTINUOUS | ES_SYSTEM_REQUIRED: bu program çalıştığı sürece Windows uyku moduna geçmez (ekran kapanabilir)
            ctypes.windll.kernel32.SetThreadExecutionState(0x80000000 | 0x00000001)
        except Exception:
            pass


def model_hazirla(ad, adres=None):
    """Model Ollama'da yoksa indirir."""
    if model_yuklu_mu(ad, adres):
        return
    import shutil
    import subprocess
    exe = shutil.which("ollama") or str(Path(os.environ.get("LOCALAPPDATA", "")) / "Programs" / "Ollama" / "ollama.exe")
    if not Path(exe).exists() and not shutil.which(exe):
        raise SystemExit(f"ollama komutu bulunamadı. Ollama kurulu mu? Elle indirmek için: ollama pull {ad}")
    log(f"'{ad}' indiriliyor (bir kerelik)...")
    if subprocess.run([exe, "pull", ad]).returncode != 0 or not model_yuklu_mu(ad, adres):
        raise SystemExit(f"'{ad}' indirilemedi. Komut satırında deneyin: ollama pull {ad}")


# ---------------------------------------------------------------- JSONL

def jsonl_oku(yol):
    yol = Path(yol)
    if not yol.exists():
        return []
    out = []
    with open(yol, encoding="utf-8") as f:
        for satir in f:
            satir = satir.strip()
            if satir:
                try:
                    out.append(json.loads(satir))
                except json.JSONDecodeError:
                    pass  # yarım yazılmış son satır (elektrik kesintisi vb.)
    return out


def jsonl_yaz(yol, kayitlar):
    yol = Path(yol)
    yol.parent.mkdir(parents=True, exist_ok=True)
    with open(yol, "w", encoding="utf-8") as f:
        for k in kayitlar:
            f.write(json.dumps(k, ensure_ascii=False) + "\n")


def jsonl_ekle(yol, kayit):
    yol = Path(yol)
    yol.parent.mkdir(parents=True, exist_ok=True)
    with open(yol, "a", encoding="utf-8") as f:
        f.write(json.dumps(kayit, ensure_ascii=False) + "\n")
        f.flush()


# ---------------------------------------------------------------- Ollama

class OllamaHatasi(Exception):
    pass


def ollama_istek(yol, govde=None, adres=None, zaman_asimi=600):
    adres = (adres or ayarlar()["ollama_adres"]).rstrip("/")
    veri = None if govde is None else json.dumps(govde).encode("utf-8")
    req = urllib.request.Request(adres + yol, data=veri, method="GET" if govde is None else "POST",
                                 headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=zaman_asimi) as r:
            return json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        try:
            mesaj = json.loads(e.read().decode("utf-8")).get("error", "")
        except Exception:
            mesaj = str(e)
        raise OllamaHatasi(f"HTTP {e.code}: {mesaj}")
    except (urllib.error.URLError, ConnectionError, TimeoutError) as e:
        raise OllamaHatasi(f"Ollama'ya ulaşılamadı ({adres}): {e}")


def ollama_sohbet(model, mesajlar, sicaklik=0.7, dusunme=False, max_token=2048, deneme=3, adres=None):
    """Akışsız sohbet. Dönen: (metin, istatistik)"""
    govde = {
        "model": model,
        "messages": mesajlar,
        "stream": False,
        "think": bool(dusunme),
        "keep_alive": "30m",
        "options": {"temperature": sicaklik, "num_predict": max_token, "num_ctx": 8192},
    }
    son_hata = None
    for i in range(deneme):
        try:
            r = ollama_istek("/api/chat", govde, adres=adres)
            metin = (r.get("message") or {}).get("content", "") or ""
            # Bazı sürümler düşünceyi metnin içine yazar: temizle
            metin = re.sub(r"<think>.*?</think>", "", metin, flags=re.S).strip()
            ist = {"token": r.get("eval_count", 0), "sure": (r.get("eval_duration") or 0) / 1e9}
            return metin, ist
        except OllamaHatasi as e:
            son_hata = e
            if "not found" in str(e).lower():
                raise OllamaHatasi(f"'{model}' modeli yüklü değil. Önce: ollama pull {model}")
            if "think" in str(e).lower() and govde.get("think") is not None:
                govde.pop("think")  # düşünme ayarını desteklemeyen model/sürüm
                continue
            time.sleep(3 * (i + 1))
    raise son_hata


# ---------------------------------------------------------------- Bulut öğretmen (isteğe bağlı)
# OpenAI uyumlu bir servis (varsayılan: Cerebras · gpt-oss-120b). Anahtar egitim\bulut_anahtari.txt
# dosyasında durur (GitHub'a gitmez). Anahtar yoksa ya da günlük kota dolarsa her şey yerel modelle sürer.

class BulutHatasi(Exception):
    pass


class _Bulut:
    def __init__(self):
        import threading
        self.kilit = threading.Lock()
        self.son = 0.0
        self.kapali = None      # kapanma nedeni (kota doldu, anahtar geçersiz…)
        self.token = 0
        self.ardisik_hata = 0   # üst üste başarısız görev; 3 olunca bulut kapatılır (gece boşa beklemesin)

    def ayar(self):
        a = ayarlar().get("bulut_ogretmen") or {}
        anahtar = os.environ.get("BULUT_ANAHTARI", "").strip()
        dosya = KIT / "bulut_anahtari.txt"
        if not anahtar and dosya.exists():
            anahtar = dosya.read_text(encoding="utf-8", errors="ignore").strip()
        return a, anahtar

    def etkin(self, ders=None):
        a, anahtar = self.ayar()
        if not anahtar or not a.get("model") or self.kapali:
            return False
        return ders is None or ders in (a.get("dersler") or [])

    def _sira_bekle(self, dakikada):
        aralik = 60.0 / max(1, dakikada) + 0.5
        with self.kilit:
            bekle = self.son + aralik - time.time()
            if bekle > 0:
                time.sleep(bekle)
            self.son = time.time()

    def sohbet(self, mesajlar, sicaklik=0.7, max_token=4096):
        try:
            sonuc = self._sohbet(mesajlar, sicaklik, max_token)
            self.ardisik_hata = 0
            return sonuc
        except BulutHatasi:
            with self.kilit:
                self.ardisik_hata += 1
                if self.ardisik_hata >= 3 and not self.kapali:
                    self.kapali = "bulut üst üste 3 kez başarısız oldu"
                    log("Bulut öğretmen kapatıldı:", self.kapali, "→ yerel modelle devam.")
            raise

    def _sohbet(self, mesajlar, sicaklik, max_token):
        a, anahtar = self.ayar()
        govde = {"model": a["model"], "messages": mesajlar, "temperature": sicaklik,
                 "max_completion_tokens": max_token}
        if a.get("dusunme"):
            govde["reasoning_effort"] = a["dusunme"]
        for deneme in range(4):
            if self.kapali:
                raise BulutHatasi(self.kapali)
            self._sira_bekle(int(a.get("dakikada_istek", 5)))
            req = urllib.request.Request(a["adres"].rstrip("/") + "/chat/completions", method="POST",
                                         data=json.dumps(govde).encode("utf-8"),
                                         headers={"Content-Type": "application/json", "User-Agent": "KampusAI-Egitim/1.0",
                                                  "Authorization": "Bearer " + anahtar})
            try:
                with urllib.request.urlopen(req, timeout=300) as r:
                    cevap = json.loads(r.read().decode("utf-8"))
                metin = ((cevap.get("choices") or [{}])[0].get("message") or {}).get("content") or ""
                self.token += (cevap.get("usage") or {}).get("total_tokens", 0)
                if not metin.strip():
                    raise BulutHatasi("boş yanıt")
                return metin.strip(), {"token": (cevap.get("usage") or {}).get("completion_tokens", 0), "sure": 0}
            except urllib.error.HTTPError as e:
                try:
                    mesaj = e.read().decode("utf-8", errors="ignore")[:300]
                except Exception:
                    mesaj = ""
                if e.code in (401, 403):
                    self.kapali = f"bulut anahtarı geçersiz ({e.code})"
                elif e.code == 429 and re.search(r"day|daily|quota|günlük", mesaj, re.I):
                    self.kapali = "bulutun günlük kotası doldu"
                elif e.code in (429, 500, 502, 503, 504):
                    son = f"HTTP {e.code} ({'istek sınırı' if e.code == 429 else 'sunucu hatası'})"
                    time.sleep(int(e.headers.get("retry-after", "0") or 0) or 20 * (deneme + 1))
                    continue
                else:
                    raise BulutHatasi(f"HTTP {e.code}: {mesaj}")
                log("Bulut öğretmen kapatıldı:", self.kapali, "→ yerel modelle devam.")
                raise BulutHatasi(self.kapali)
            except (urllib.error.URLError, TimeoutError, ConnectionError, json.JSONDecodeError) as e:
                time.sleep(10 * (deneme + 1))
                son = e
        raise BulutHatasi(f"bulut yanıt vermedi: {locals().get('son', '')}")


BULUT = _Bulut()


def ollama_modeller(adres=None):
    r = ollama_istek("/api/tags", adres=adres, zaman_asimi=10)
    return [m.get("name") or m.get("model") for m in r.get("models", [])]


def model_yuklu_mu(ad, adres=None):
    n = lambda s: str(s).lower().removesuffix(":latest")
    return any(n(m) == n(ad) for m in ollama_modeller(adres))


def ollama_bosalt(adres=None):
    """Ekran kartını eğitime bırakmak için bellekteki tüm modelleri boşaltır."""
    try:
        for m in ollama_istek("/api/ps", adres=adres, zaman_asimi=10).get("models", []):
            ollama_istek("/api/generate", {"model": m.get("name") or m.get("model"), "keep_alive": 0}, adres=adres)
            log("Ollama belleği boşaltıldı:", m.get("name"))
    except OllamaHatasi:
        pass


# ---------------------------------------------------------------- Etiketli çıktı

def etiket(metin, ad):
    """<AD>…</AD> içeriğini döndürür (yoksa None). LaTeX'te JSON kaçış sorunu
    yaşamamak için öğretmen modelden JSON yerine etiketli metin istenir."""
    m = re.search(r"<" + ad + r">\s*(.*?)\s*</" + ad + r">", metin, flags=re.S | re.I)
    return m.group(1).strip() if m else None


def etiketler(metin, ad):
    return [x.strip() for x in re.findall(r"<" + ad + r">\s*(.*?)\s*</" + ad + r">", metin, flags=re.S | re.I)]


SIK_HARFLERI = "ABCDE"


def cevap_harfi(metin):
    """Yanıttaki son 'Doğru cevap: X' benzeri ifadeden şık harfini çıkarır."""
    if not metin:
        return None
    m = etiket(metin, "CEVAP")
    if m:
        h = re.search(r"[A-E]", m.upper())
        return h.group(0) if h else None
    desen = [
        r"(?:doğru|dogru)\s*(?:cevap|yanıt|yanit|şık|sik|seçenek)\s*[:\-–]?\s*\**\s*\(?([A-E])\b",
        r"(?:cevap|yanıt|yanit)\s*[:\-–]\s*\**\s*\(?([A-E])\b",
        r"\b([A-E])\s*şıkkı(?:dır)?\b",
        r"\*\*\s*([A-E])\s*[\)\.]",
    ]
    for d in desen:  # öncelik sırasıyla: "doğru cevap: X" varsa "B şıkkı yanlış" gibi ifadeler dikkate alınmaz
        bulunan = [x.group(1).upper() for x in re.finditer(d, metin, flags=re.I)]
        if bulunan:
            return bulunan[-1]
    return None


# ---------------------------------------------------------------- Uygulamanın sistem istemi
# js/ai/pipeline.js → systemPrompt() / socraticRules() ile birebir aynı tutulmalı:
# model eğitimde gördüğü istemle çalışırken en iyi sonucu verir.

AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
GUNLER = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]


def tarih_tr(d):
    return f"{d.day} {AYLAR[d.month - 1]} {d.year} {GUNLER[d.weekday()]}"


def rastgele_tarih(rng):
    return date(2026, 9, 1) + timedelta(days=rng.randrange(0, 300))


def sistem_istemi(gun=None):
    gun = gun or date.today()
    return "\n".join([
        "Sen \"KampüsAI\"sın: lise öğrencilerine ve YKS'ye (TYT-AYT) hazırlananlara yardım eden sabırlı bir yapay zeka öğretmensin. Bugün: " + tarih_tr(gun) + ".",
        "Kurallar:",
        "- Öğrenci hangi dilde yazıyorsa o dilde yanıt ver (varsayılan Türkçe).",
        "- Soruları adım adım ve anlaşılır çöz; soruda istenen her şeyi eksiksiz yanıtla (ör. kökler isteniyorsa kökleri tek tek bul). Çoktan seçmeli sorularda sonunda doğru şıkkı açıkça yaz.",
        "- Matematiksel ifadeleri LaTeX ile yaz: satır içinde $...$, ayrı satırda $$...$$.",
        "- Markdown kullan (kalın, liste, gerektiğinde tablo). Gereksiz uzatma.",
        "- \"ÖĞRENCİ VERİLERİ\" bölümü verilirse öğrencinin kişisel sorularında (netleri, programı, notları) bu verileri kullan; sayıları aynen aktar, veride olmayan bilgiyi uydurma, yoksa olmadığını söyle.",
        "- \"FOTOĞRAFTAN OKUNAN\" metin verilirse bu bir görme modelinin okumasıdır; anlamsız ya da eksik görünen yer varsa bunu belirt.",
    ])


SOKRATIK = "\n".join([
    "SOKRATİK MOD AÇIK (öğretmen modu). Bu mod yukarıdaki \"adım adım çöz\" kuralından önce gelir:",
    "- Sorunun cevabını ya da tam çözümünü hemen VERME. Amacın öğrencinin çözümü kendisinin bulması.",
    "- İlk yanıtta: soruyu kısaca anlamlandır, öğrencinin nereden başlayabileceğini düşündüren TEK bir yönlendirici soru sor ya da ilk adım için TEK bir küçük ipucu ver.",
    "- Öğrenci bir adım yazınca: doğruysa kısaca takdir et ve bir sonraki adıma yönelt; yanlışsa hatayı doğrudan söyleme, fark etmesini sağlayacak bir soru sor.",
    "- Her mesajda yalnızca bir ipucu ya da bir soru; en fazla 4-5 cümle. Gerekirse formülü hatırlat ama yerine koyma.",
    "- Öğrenci \"ipucu ver\" derse bir sonraki küçük ipucunu ver. \"Çözümü göster\" derse ya da üç ipucuna rağmen ilerleyemiyorsa tam çözümü adım adım ver, doğru şıkkı yaz ve sonunda kendini sınaması için benzer kısa bir soru öner.",
    "- Öğrencinin kişisel verileriyle ilgili sorular (netlerim, programım) ve sohbet için bu yöntemi kullanma; normal yanıt ver.",
])


def veri_bolumu(genel_ozet, kayitlar):
    """pipeline.js → dataSection() biçimi"""
    parca = ["ÖĞRENCİ VERİLERİ (sitedeki kayıtlardan bulundu):", "[Genel özet]\n" + genel_ozet]
    for i, k in enumerate(kayitlar):
        parca.append(f"[Kayıt {i + 1}]\n{k}")
    return "\n\n".join(parca)


def fotograf_blogu(metin, model="qwen2.5vl:7b"):
    return f"FOTOĞRAFTAN OKUNAN ({model}):\n{metin}"


# ---------------------------------------------------------------- Ders adları
DERSLER = {
    "edebiyat": "Türk Dili ve Edebiyatı", "matematik": "Matematik", "fizik": "Fizik", "kimya": "Kimya",
    "biyoloji": "Biyoloji", "tarih": "Tarih", "inkilap": "T.C. İnkılap Tarihi ve Atatürkçülük",
    "cografya": "Coğrafya", "felsefe": "Felsefe", "din": "Din Kültürü ve Ahlak Bilgisi", "ingilizce": "İngilizce",
}
SAYISAL = {"matematik", "fizik", "kimya"}


def TR(v):
    if v is None:
        return ""
    if isinstance(v, dict):
        return v.get("tr") if v.get("tr") is not None else (v.get("en") or "")
    return str(v)


def html_temizle(s):
    s = re.sub(r"<li[^>]*>", "• ", s or "")
    s = re.sub(r"<br\s*/?>|</p>|</li>|</h\d>|</div>", "\n", s)
    s = re.sub(r"<[^>]+>", "", s)
    return re.sub(r"\n{3,}", "\n\n", s).strip()
