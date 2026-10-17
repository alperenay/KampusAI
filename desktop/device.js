/* =========================================================
   device.js — "Yapay zekayı bu bilgisayara indir"

   Ollama kurmadan, uygulamanın kendi içinde internetsiz yapay zeka:
     • llama.cpp (llama-server) GitHub'daki resmi sürümden bir kez indirilir
     • Gemma 4 E4B (beyin + göz) ve bge-m3 (hafıza) Hugging Face'teki resmi dosyalardan indirilir
     • İki küçük yerel sunucu başlatılır (yalnızca 127.0.0.1): sohbet ve hafıza vektörleri
     • Sayfa bunlara app://local/cihaz/sohbet/* ve app://local/cihaz/hafiza/* üzerinden ulaşır

   Dosyalar: %APPDATA%\Ders Asistani\yapay-zeka\   (silinince her şey geri alınır)
   İndirme kesilirse kaldığı yerden devam eder (.part dosyaları).
   ========================================================= */
"use strict";
const path = require("path");
const fs = require("fs");
const net = require("net");
const { spawn, execFile } = require("child_process");
const { Readable } = require("stream");
const { pipeline } = require("stream/promises");

const HF = "https://huggingface.co";
/* Lisanslar: Gemma 4 Apache 2.0, bge-m3 MIT, llama.cpp MIT */
const DOSYALAR = [
  { id: "sohbet", ad: "gemma-4-E4B-it-Q4_0.gguf", url: HF + "/ggml-org/gemma-4-E4B-it-GGUF/resolve/main/gemma-4-E4B-it-Q4_0.gguf", boyut: 4590807392 },
  { id: "goz", ad: "mmproj-gemma-4-E4B-it-Q8_0.gguf", url: HF + "/ggml-org/gemma-4-E4B-it-GGUF/resolve/main/mmproj-gemma-4-E4B-it-Q8_0.gguf", boyut: 559874816 },
  { id: "hafiza", ad: "bge-m3-Q8_0.gguf", url: HF + "/gpustack/bge-m3-GGUF/resolve/main/bge-m3-Q8_0.gguf", boyut: 0 }
];
const MODEL_ADI = { sohbet: "gemma4-e4b (cihaz)", hafiza: "bge-m3 (cihaz)" };

function olustur({ userData, bildir, log }) {
  const kok = path.join(userData, "yapay-zeka");
  const modeller = path.join(kok, "modeller");
  const motor = path.join(kok, "llama");
  let durum = { asama: "yok", indirilen: 0, toplam: 0, dosya: "", hata: "", calisiyor: false };
  let iptal = null;
  const sunucular = {};       // { sohbet: {proc, port}, hafiza: {...} }

  const yay = (ek) => { durum = Object.assign({}, durum, ek); bildir(Object.assign({}, durum, { kurulu: kurulu() })); };
  const yol = (d) => path.join(modeller, d.ad);
  const sunucuExe = () => bul(motor, (f) => /^llama-server(\.exe)?$/i.test(path.basename(f)));

  function bul(dir, test) {
    if (!fs.existsSync(dir)) return null;
    for (const ad of fs.readdirSync(dir)) {
      const p = path.join(dir, ad);
      const st = fs.statSync(p);
      if (st.isDirectory()) { const r = bul(p, test); if (r) return r; } else if (test(p)) return p;
    }
    return null;
  }

  function kurulu() {
    return DOSYALAR.every((d) => fs.existsSync(yol(d))) && !!sunucuExe();
  }

  /* ---------- İndirme (kaldığı yerden devam) ---------- */
  async function indirDosya(url, hedef, beklenen, ilerle, sinyal) {
    const part = hedef + ".part";
    let var_ = fs.existsSync(part) ? fs.statSync(part).size : 0;
    const res = await fetch(url, { headers: var_ ? { Range: "bytes=" + var_ + "-" } : {}, signal: sinyal, redirect: "follow" });
    if (res.status === 416) { /* zaten tamam */ } else if (!res.ok) throw new Error("İndirme hatası " + res.status + ": " + url);
    if (res.status === 200 && var_) var_ = 0;                  // sunucu devam etmeyi desteklemiyor: baştan
    const uzunluk = Number(res.headers.get("content-length") || 0);
    const toplam = beklenen || (uzunluk ? var_ + uzunluk : 0);
    if (res.status !== 416) {
      let say = var_;
      const kaynak = Readable.fromWeb(res.body);
      kaynak.on("data", (c) => { say += c.length; ilerle(say, toplam); });
      await pipeline(kaynak, fs.createWriteStream(part, { flags: var_ ? "a" : "w" }));
    }
    const son = fs.statSync(part).size;
    if (beklenen && son !== beklenen) throw new Error("Dosya eksik indi (" + son + " / " + beklenen + "). Tekrar deneyin.");
    fs.renameSync(part, hedef);
  }

  /** llama.cpp'nin Windows sürümü: Vulkan (NVIDIA/AMD/Intel ekran kartı), yoksa yalnız işlemci */
  async function motorAdresi(sinyal) {
    const r = await fetch("https://api.github.com/repos/ggml-org/llama.cpp/releases?per_page=8",
      { headers: { "User-Agent": "KampusAI", Accept: "application/vnd.github+json" }, signal: sinyal });
    if (!r.ok) throw new Error("llama.cpp sürüm listesi alınamadı (" + r.status + ")");
    const uygun = (ad, tur) => {
      ad = ad.toLowerCase();
      return ad.endsWith(".zip") && /win/.test(ad) && /x64|amd64/.test(ad) && !/arm64|cudart/.test(ad) && ad.includes(tur);
    };
    for (const surum of await r.json()) {
      for (const tur of ["vulkan", "cpu"]) {
        const a = (surum.assets || []).find((x) => uygun(x.name, tur));
        if (a) return { url: a.browser_download_url, ad: a.name, boyut: a.size, etiket: surum.tag_name };
      }
    }
    throw new Error("llama.cpp Windows paketi bulunamadı");
  }

  function zipAc(zip, hedef) {
    fs.mkdirSync(hedef, { recursive: true });
    return new Promise((resolve, reject) => {
      // Windows 10+ içindeki tar zip açabilir; olmazsa PowerShell
      execFile("tar", ["-xf", zip, "-C", hedef], { windowsHide: true }, (e) => {
        if (!e) return resolve();
        if (process.platform !== "win32") {
          return execFile("unzip", ["-oq", zip, "-d", hedef], (e2) => (e2 ? reject(e2) : resolve()));
        }
        execFile("powershell", ["-NoProfile", "-Command", "Expand-Archive -LiteralPath '" + zip.replace(/'/g, "''") + "' -DestinationPath '" + hedef.replace(/'/g, "''") + "' -Force"],
          { windowsHide: true }, (e2) => (e2 ? reject(e2) : resolve()));
      });
    });
  }

  async function indir() {
    if (durum.asama === "iniyor") return durum;
    iptal = new AbortController();
    fs.mkdirSync(modeller, { recursive: true });
    try {
      const isler = DOSYALAR.filter((d) => !fs.existsSync(yol(d)));
      const motorVar = !!sunucuExe();
      const m = motorVar ? null : await motorAdresi(iptal.signal);
      const toplam = isler.reduce((t, d) => t + (d.boyut || 650e6), 0) + (m ? m.boyut : 0);
      let biten = 0;
      yay({ asama: "iniyor", hata: "", indirilen: 0, toplam });
      if (m) {
        yay({ dosya: "llama.cpp" });
        const zip = path.join(kok, m.ad);
        await indirDosya(m.url, zip, m.boyut, (n) => yay({ indirilen: biten + n }), iptal.signal);
        await zipAc(zip, path.join(motor, m.etiket));
        fs.rmSync(zip, { force: true });
        biten += m.boyut;
      }
      for (const d of isler) {
        yay({ dosya: d.ad });
        await indirDosya(d.url, yol(d), d.boyut, (n) => yay({ indirilen: biten + n }), iptal.signal);
        biten += fs.statSync(yol(d)).size;
      }
      yay({ asama: "hazirlaniyor", indirilen: toplam });
      await baslat();
      return durum;
    } catch (e) {
      const iptalEdildi = iptal && iptal.signal.aborted;
      let msg = String(e && e.message || e);
      if (/terminated|ECONNRESET|ETIMEDOUT|ENOTFOUND|EAI_AGAIN|fetch failed|socket/i.test(msg)) {
        msg = "İnternet bağlantısı kesildi. Tekrar \"İndir\"e basın; kaldığı yerden devam eder.";
      } else if (/ENOSPC/i.test(msg)) msg = "Diskte yeterli yer yok (yaklaşık 6 GB gerekir).";
      yay({ asama: iptalEdildi ? "yok" : "hata", hata: iptalEdildi ? "" : msg });
      return durum;
    } finally { iptal = null; }
  }

  function vazgec() { if (iptal) iptal.abort(); }

  /* ---------- Yerel sunucular ---------- */
  const bosPort = () => new Promise((resolve) => {
    const s = net.createServer();
    s.listen(0, "127.0.0.1", () => { const p = s.address().port; s.close(() => resolve(p)); });
  });

  async function hazirMi(port, ms) {
    const bitis = Date.now() + ms;
    while (Date.now() < bitis) {
      try { const r = await fetch("http://127.0.0.1:" + port + "/health"); if (r.ok) return true; } catch (e) { /* açılıyor */ }
      await new Promise((r) => setTimeout(r, 500));
    }
    return false;
  }

  async function sunucuAc(id, args) {
    const port = await bosPort();
    const exe = sunucuExe();
    const proc = spawn(exe, args.concat(["--host", "127.0.0.1", "--port", String(port)]),
      { cwd: path.dirname(exe), windowsHide: true, stdio: ["ignore", "ignore", "pipe"] });
    let son = "";
    proc.stderr.on("data", (c) => { son = (son + c.toString()).slice(-2000); });
    proc.on("exit", (code) => {
      if (sunucular[id] && sunucular[id].proc === proc) {
        delete sunucular[id];
        log("cihaz sunucusu kapandı", id, code, son.slice(-400));
        yay({ calisiyor: false, asama: "hata", hata: "Yapay zeka motoru kapandı. " + son.split("\n").filter(Boolean).slice(-2).join(" ") });
      }
    });
    sunucular[id] = { proc, port };
    if (!(await hazirMi(port, 180000))) throw new Error("Yapay zeka motoru açılamadı: " + son.slice(-300));
    return port;
  }

  async function baslat() {
    if (!kurulu()) return durum;
    if (sunucular.sohbet && sunucular.hafiza) return durum;
    yay({ asama: "hazirlaniyor", hata: "" });
    try {
      const d = Object.fromEntries(DOSYALAR.map((x) => [x.id, yol(x)]));
      if (!sunucular.sohbet) {
        await sunucuAc("sohbet", ["-m", d.sohbet, "--mmproj", d.goz, "-c", "8192", "-ngl", "99", "--jinja"]);
      }
      if (!sunucular.hafiza) {
        // Hafıza modeli işlemcide: ekran kartı belleği sohbet modeline kalsın
        await sunucuAc("hafiza", ["-m", d.hafiza, "--embedding", "-c", "8192", "-b", "8192", "-ub", "8192", "-ngl", "0"]);
      }
      yay({ asama: "hazir", calisiyor: true });
    } catch (e) {
      durdur();
      yay({ asama: "hata", calisiyor: false, hata: String(e && e.message || e) });
    }
    return durum;
  }

  function durdur() {
    for (const id of Object.keys(sunucular)) {
      try { sunucular[id].proc.kill(); } catch (e) { /* zaten kapalı */ }
      delete sunucular[id];
    }
  }

  function sil() {
    vazgec();
    durdur();
    fs.rmSync(kok, { recursive: true, force: true });
    yay({ asama: "yok", calisiyor: false, indirilen: 0, toplam: 0, hata: "" });
    return durum;
  }

  function bilgi() {
    const boyut = DOSYALAR.reduce((t, d) => t + (d.boyut || 650e6), 0) + 60e6;
    return Object.assign({}, durum, { kurulu: kurulu(), boyut, modeller: MODEL_ADI, klasor: kok });
  }

  /** app://local/cihaz/<sohbet|hafiza>/... → yerel sunucu adresi */
  function adres(id) { return sunucular[id] ? "http://127.0.0.1:" + sunucular[id].port : null; }

  if (kurulu()) durum.asama = "kurulu";
  return { indir, vazgec, baslat, durdur, sil, bilgi, adres };
}

module.exports = { olustur, DOSYALAR };
