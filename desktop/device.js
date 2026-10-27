/* =========================================================
   device.js — "Yapay zekayı bu bilgisayara indir"

   Ollama kurmadan, uygulamanın kendi içinde internetsiz yapay zeka:
     • llama.cpp (llama-server) GitHub'daki resmi sürümden bir kez indirilir
     • Gemma 4 E4B (beyin + göz) ve bge-m3 (hafıza) Hugging Face'teki resmi dosyalardan indirilir
     • İki küçük yerel sunucu başlatılır (yalnızca 127.0.0.1): sohbet ve hafıza vektörleri
     • Sayfa bunlara app://local/cihaz/sohbet/* ve app://local/cihaz/hafiza/* üzerinden ulaşır

   İki model seçeneği (bellek miktarına göre önerilir, kullanıcı değiştirebilir):
     tam   : Gemma 4 E4B — 12 GB ve üstü bellek, daha doğru
     hafif : Gemma 4 E2B — 8 GB bellekli okul bilgisayarı / akıllı tahta (Pardus ETAP), ~2 kat hızlı
     guclu : Gemma 4 12B — 8 GB+ ekran kartı ya da 16 GB+ bellek; zor sorularda daha doğru (önerilmez, kullanıcı seçer)
   Linux (Pardus): llama-server kurulum paketinin içinde gelir (resources/llama, Debian 12'de derlenir:
   tools/llama-linux.sh); Windows'ta GitHub'daki resmi sürümden bir kez indirilir.

   Dosyalar: %APPDATA%\Ders Asistani\yapay-zeka\  ·  Linux: ~/.config/Ders Asistani/yapay-zeka/
   İndirme kesilirse kaldığı yerden devam eder (.part dosyaları).
   ========================================================= */
"use strict";
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const fs = require("fs");
const net = require("net");
const { spawn, execFile } = require("child_process");
const { Readable } = require("stream");
const { pipeline } = require("stream/promises");

const HF = "https://huggingface.co";
/* Lisanslar: Gemma 4 Apache 2.0, bge-m3 MIT, llama.cpp MIT */
const gg = (depo, ad) => HF + "/ggml-org/" + depo + "/resolve/main/" + ad;
const HAFIZA = { id: "hafiza", ad: "bge-m3-Q8_0.gguf", url: HF + "/gpustack/bge-m3-GGUF/resolve/main/bge-m3-Q8_0.gguf", boyut: 0 };
const VARYANT = {
  tam: { ad: "Gemma 4 E4B", model: "gemma4-e4b (cihaz)", dosyalar: [
    { id: "sohbet", ad: "gemma-4-E4B-it-Q4_0.gguf", url: gg("gemma-4-E4B-it-GGUF", "gemma-4-E4B-it-Q4_0.gguf"), boyut: 4590807392 },
    { id: "goz", ad: "mmproj-gemma-4-E4B-it-Q8_0.gguf", url: gg("gemma-4-E4B-it-GGUF", "mmproj-gemma-4-E4B-it-Q8_0.gguf"), boyut: 559874816 },
    HAFIZA] },
  hafif: { ad: "Gemma 4 E2B", model: "gemma4-e2b (cihaz)", dosyalar: [
    { id: "sohbet", ad: "gemma-4-E2B-it-Q4_0.gguf", url: gg("gemma-4-E2B-it-GGUF", "gemma-4-E2B-it-Q4_0.gguf"), boyut: 2841481184 },
    { id: "goz", ad: "mmproj-gemma-4-E2B-it-Q8_0.gguf", url: gg("gemma-4-E2B-it-GGUF", "mmproj-gemma-4-E2B-it-Q8_0.gguf"), boyut: 557368064 },
    HAFIZA] },
  guclu: { ad: "Gemma 4 12B", model: "gemma4-12b (cihaz)", dosyalar: [
    { id: "sohbet", ad: "gemma-4-12B-it-Q4_0.gguf", url: gg("gemma-4-12B-it-GGUF", "gemma-4-12B-it-Q4_0.gguf"), boyut: 7219673216 },
    { id: "goz", ad: "mmproj-gemma-4-12B-it-Q8_0.gguf", url: gg("gemma-4-12B-it-GGUF", "mmproj-gemma-4-12B-it-Q8_0.gguf"), boyut: 158987616 },
    HAFIZA] }
};
const DOSYALAR = VARYANT.tam.dosyalar;            // geriye uyumluluk
const HAFIF_SINIR = 11.5e9;                       // bundan az bellekli bilgisayara hafif önerilir (8 GB okul bilgisayarları)
const boyutu = (v) => VARYANT[v].dosyalar.reduce((t, d) => t + (d.boyut || 650e6), 0) + 60e6;

const STEM_VARIANT = {"stem": {"ad": "Sayısal Asistan (deneysel)", "model": "kampusai-stem-v2", "dosyalar": [{"id": "sohbet", "ad": "KampusAI-STEM-3B-v2-Q8_0.gguf", "boyut": 3285475872, "sha256": "8861e20cc8906167d73d777fe118108009c750ce9f97eb9a7b5cbd19b243e91a", "parts": [{"name": "KampusAI-STEM-3B-v2-Q8_0.gguf.part01", "size": 1700000000, "sha256": "720134ac37a8c4cc48850f8899d6eee7b12d1be7b0c43c204a6ff6f1a7d99350", "url": "https://github.com/alperenay/ders-asistani/releases/download/v1.39.0/KampusAI-STEM-3B-v2-Q8_0.gguf.part01"}, {"name": "KampusAI-STEM-3B-v2-Q8_0.gguf.part02", "size": 1585475872, "sha256": "2f5a1150616dc4f3756efe01cb44b543766ba15e75c0635c3cde72fde38fbda8", "url": "https://github.com/alperenay/ders-asistani/releases/download/v1.39.0/KampusAI-STEM-3B-v2-Q8_0.gguf.part02"}]}]}};

function olustur({ userData, bildir, log, stem = false }) {
  const catalog = stem ? STEM_VARIANT : VARYANT;
  const boyutu = (v) => catalog[v].dosyalar.reduce((t, d) => t + (d.boyut || 650e6), 0) + 60e6;
  const kok = path.join(userData, stem ? "sayisal-model" : "yapay-zeka");
  const modeller = path.join(kok, "modeller");
  const motor = path.join(kok, "llama");
  // Linux paketinde motor uygulamanın içinde gelir (indirme yok, Pardus'un glibc sürümüyle uyumlu)
  const gomulu = process.resourcesPath ? path.join(process.resourcesPath, "llama") : "";
  const secimDosyasi = path.join(kok, "secim.txt");
  const oneri = () => stem ? "stem" : (os.totalmem() < HAFIF_SINIR ? "hafif" : "tam");
  let secim = (() => { try { const v = fs.readFileSync(secimDosyasi, "utf8").trim(); if (catalog[v]) return v; } catch (e) { /* yok */ }
    // Eski sürümden E4B indirilmişse onu koru
    return stem ? "stem" : fs.existsSync(path.join(modeller, catalog.tam.dosyalar[0].ad)) ? "tam" : oneri(); })();
  const dosyalar = () => catalog[secim].dosyalar;
  let durum = { asama: "yok", indirilen: 0, toplam: 0, dosya: "", hata: "", calisiyor: false };
  let iptal = null;
  const sunucular = {};       // { sohbet: {proc, port}, hafiza: {...} }

  const yay = (ek) => { durum = Object.assign({}, durum, ek); bildir(bilgi()); };
  const yol = (d) => path.join(modeller, d.ad);
  const exeTest = (f) => /^llama-server(\.exe)?$/i.test(path.basename(f));
  const sunucuExe = () => (gomulu && bul(gomulu, exeTest)) || bul(motor, exeTest) || (stem && bul(path.join(userData, "yapay-zeka", "llama"), exeTest));

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
    return dosyalar().every((d) => {
      if (!fs.existsSync(yol(d))) return false;
      if (!d.sha256) return true;
      try { return fs.statSync(yol(d)).size === d.boyut && fs.readFileSync(yol(d) + ".verified", "utf8") === d.sha256; } catch (e) { return false; }
    }) && !!sunucuExe();
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
    if (process.platform !== "win32") throw new Error("Yapay zeka motoru bu kurulumda yok. KampüsAI'ı .deb paketinden yeniden kurun.");
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

  async function indir(v) {
    if (iptal || durum.asama === "hazirlaniyor") return durum;
    const onceki = secim;
    if (v && catalog[v] && v !== secim) {            // model değişimi: önce eskisini kapat
      durdur();
      secim = v;
      fs.mkdirSync(kok, { recursive: true });
      fs.writeFileSync(secimDosyasi, v);
    }
    iptal = new AbortController();
    fs.mkdirSync(modeller, { recursive: true });
    try {
      const isler = dosyalar().filter((d) => !fs.existsSync(yol(d)) || (d.sha256 && !fs.existsSync(yol(d) + ".verified")));
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
        if (d.parts) {
          const hashFile = async (file) => { const h = crypto.createHash("sha256"); for await (const chunk of fs.createReadStream(file)) h.update(chunk); return h.digest("hex"); };
          let offset = 0;
          for (const part of d.parts) {
            const target = path.join(modeller, part.name);
            if (!fs.existsSync(target)) await indirDosya(part.url, target, part.size, (n) => yay({ indirilen: biten + offset + n }), iptal.signal);
            if (await hashFile(target) !== part.sha256) { fs.rmSync(target, { force: true }); throw new Error("Model parçası SHA256 doğrulamasından geçmedi. Tekrar indir."); }
            offset += part.size;
          }
          const temp = yol(d) + ".joining";
          const dest = fs.createWriteStream(temp);
          try {
            for (const part of d.parts) {
              if (iptal.signal.aborted) throw new Error("İndirme durduruldu");
              await pipeline(fs.createReadStream(path.join(modeller, part.name)), dest, { end: false, signal: iptal.signal });
            }
            await new Promise((resolve, reject) => { dest.once("error", reject); dest.end(resolve); });
          } catch (e) { dest.destroy(); fs.rmSync(temp, { force: true }); throw e; }
          if (await hashFile(temp) !== d.sha256) { fs.rmSync(temp, { force: true }); throw new Error("Birleşik model SHA256 hatası"); }
          fs.renameSync(temp, yol(d)); fs.writeFileSync(yol(d) + ".verified", d.sha256);
          for (const part of d.parts) fs.rmSync(path.join(modeller, part.name), { force: true });
        } else await indirDosya(d.url, yol(d), d.boyut, (n) => yay({ indirilen: biten + n }), iptal.signal);
        biten += fs.statSync(yol(d)).size;
      }
      // Diğer seçeneğin dosyalarını sil (disk yeri)
      if (onceki !== secim) {
        const gerekli = new Set(dosyalar().map((d) => d.ad));
        catalog[onceki].dosyalar.forEach((d) => { if (!gerekli.has(d.ad)) fs.rmSync(yol(d), { force: true }); });
      }
      // Keep downloads on disk; load only when explicitly started / first used.
      // A background Gemma download must not start another model during STEM inference.
      yay({ asama: "kurulu", indirilen: toplam });
      return durum;
    } catch (e) {
      const iptalEdildi = iptal && iptal.signal.aborted;
      let msg = String(e && e.message || e);
      if (/terminated|ECONNRESET|ETIMEDOUT|ENOTFOUND|EAI_AGAIN|fetch failed|socket/i.test(msg)) {
        msg = "İnternet bağlantısı kesildi. Tekrar \"İndir\"e basın; kaldığı yerden devam eder.";
      } else if (/ENOSPC/i.test(msg)) msg = "Diskte yeterli yer yok (yaklaşık " + Math.ceil((stem ? 2 : 1) * boyutu(secim) / 1e9) + " GB gerekir).";
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
    const env = Object.assign({}, process.env);
    if (process.platform === "linux") {
      // Paylaşılan kütüphaneler (libggml*, libllama) motorla aynı klasörde
      env.LD_LIBRARY_PATH = path.dirname(exe) + (env.LD_LIBRARY_PATH ? ":" + env.LD_LIBRARY_PATH : "");
      try { fs.accessSync(exe, fs.constants.X_OK); } catch (e) { try { fs.chmodSync(exe, 0o755); } catch (e2) { /* salt okunur */ } }
    }
    const proc = spawn(exe, args.concat(["--host", "127.0.0.1", "--port", String(port)]),
      { cwd: path.dirname(exe), windowsHide: true, stdio: ["ignore", "ignore", "pipe"], env });
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
    if (sunucular.sohbet && (stem || sunucular.hafiza)) return durum;
    yay({ asama: "hazirlaniyor", hata: "" });
    try {
      const d = Object.fromEntries(dosyalar().map((x) => [x.id, yol(x)]));
      // Düşük bellekli bilgisayarda (okul bilgisayarı, akıllı tahta) daha küçük bağlam
      const baglam = os.totalmem() < 9e9 ? "4096" : "8192";
      if (!sunucular.sohbet) {
        await sunucuAc("sohbet", ["-m", d.sohbet].concat(stem ? ["--alias", "kampusai-stem-v2"] : ["--mmproj", d.goz], ["-c", stem ? "4096" : baglam, "-np", "1", "-ngl", "99", "--jinja"]));
      }
      if (!stem && !sunucular.hafiza) {
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
    const running = Object.keys(sunucular).length > 0;
    for (const id of Object.keys(sunucular)) {
      try { sunucular[id].proc.kill(); } catch (e) { /* zaten kapalı */ }
      delete sunucular[id];
    }
    if (running) yay({ asama: kurulu() ? "kurulu" : "yok", calisiyor: false });
  }

  function sil() {
    vazgec();
    durdur();
    fs.rmSync(kok, { recursive: true, force: true });
    secim = oneri();
    yay({ asama: "yok", calisiyor: false, indirilen: 0, toplam: 0, hata: "" });
    return durum;
  }

  function bilgi() {
    let bosAlan = 0;
    try { const st = fs.statfsSync(fs.existsSync(kok) ? kok : path.dirname(kok)); bosAlan = st.bavail * st.bsize; } catch (e) { /* eski Node */ }
    return Object.assign({}, durum, {
      kurulu: kurulu(), boyut: boyutu(secim), modeller: { sohbet: catalog[secim].model, hafiza: "bge-m3 (cihaz)" }, klasor: kok,
      bellek: os.totalmem(), secim, oneri: oneri(), bosAlan, gomuluMotor: !!(gomulu && bul(gomulu, exeTest)),
      secenekler: Object.fromEntries(Object.keys(catalog).map((k) => [k, { ad: catalog[k].ad, boyut: boyutu(k) }]))
    });
  }

  /** app://local/cihaz/<sohbet|hafiza>/... → yerel sunucu adresi */
  function adres(id) { return sunucular[id] ? "http://127.0.0.1:" + sunucular[id].port : null; }

  if (kurulu()) durum.asama = "kurulu";
  return { indir, vazgec, baslat, durdur, sil, bilgi, adres };
}

module.exports = { olustur, DOSYALAR, VARYANT, STEM_VARIANT };
