/* =========================================================
   main.js — KampüsAI masaüstü uygulaması (Electron): Windows ve Linux (Pardus)

   • Uygulama dosyaları app://local/ adresinden sunulur (sabit adres:
     veriler IndexedDB'de kalıcı olarak saklanır).
   • app://local/ollama/* istekleri bilgisayardaki Ollama'ya iletilir;
     web sürümündeki Baslat.bat aracısının yerini alır.
   • Ollama kapalıysa açılışta "ollama serve" başlatılmaya çalışılır.
   • İsteğe bağlı: telefonlar aynı Wi-Fi üzerinden bilgisayardaki
     modelleri kullanabilir (Ayarlar → Yapay zeka → Telefon bağlantısı).
   ========================================================= */
"use strict";
const { app, BrowserWindow, protocol, ipcMain, shell, Menu } = require("electron");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");
const { serveStatic, proxyOllama, createLanServer, lanAddresses, newToken, OLLAMA } = require("./server");
const cihazAi = require("./device");

const WEB_ROOT = path.join(__dirname, "app");
const LAN_PORT = 8770;
const ORIGIN = "app://local";

protocol.registerSchemesAsPrivileged([{
  scheme: "app",
  privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true, stream: true, codeCache: true }
}]);

// Uygulamanın adı değişse de (Ders Asistanı → KampüsAI) veriler aynı klasörde kalsın
app.setPath("userData", path.join(app.getPath("appData"), "Ders Asistani"));

if (!app.requestSingleInstanceLock()) { app.quit(); }

/* ---------------- Ayarlar dosyası ---------------- */
const SETTINGS_FILE = () => path.join(app.getPath("userData"), "desktop-settings.json");
let settings = { lanEnabled: false, token: "", bounds: null, uiGpu: false, zoom: 0 };
function loadSettings() {
  try { settings = Object.assign(settings, JSON.parse(fs.readFileSync(SETTINGS_FILE(), "utf8"))); } catch (e) { /* ilk açılış */ }
  if (!settings.token) { settings.token = newToken(); saveSettings(); }
}
function saveSettings() {
  try { fs.mkdirSync(path.dirname(SETTINGS_FILE()), { recursive: true }); fs.writeFileSync(SETTINGS_FILE(), JSON.stringify(settings, null, 2)); } catch (e) { /* yazılamadı */ }
}

/* ---------------- Ollama'yı başlat (kapalıysa) ---------------- */
async function ollamaUp() {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 1500);
    const r = await fetch(OLLAMA + "/api/version", { signal: ctrl.signal });
    clearTimeout(t);
    return r.ok;
  } catch (e) { return false; }
}

async function ensureOllama() {
  if (await ollamaUp()) return;
  const candidates = ["ollama"];
  if (process.platform === "win32" && process.env.LOCALAPPDATA) candidates.push(path.join(process.env.LOCALAPPDATA, "Programs", "Ollama", "ollama.exe"));
  for (const exe of candidates) {
    try {
      const child = spawn(exe, ["serve"], { detached: true, stdio: "ignore", windowsHide: true });
      const ok = await new Promise((resolve) => {
        child.once("error", () => resolve(false));
        child.once("spawn", () => resolve(true));
      });
      if (ok) { child.unref(); return; }
    } catch (e) { /* sonraki aday */ }
  }
}

/* ---------------- Telefon bağlantısı ---------------- */
let lanServer = null, lanError = "";
function lanInfo() {
  return { enabled: !!lanServer, port: LAN_PORT, token: settings.token, addresses: lanServer ? lanAddresses() : [], error: lanError };
}
function startLan() {
  return new Promise((resolve) => {
    if (lanServer) return resolve(lanInfo());
    lanError = "";
    const srv = createLanServer({ getToken: () => settings.token });
    srv.once("error", (e) => {
      lanServer = null;
      lanError = e && e.code === "EADDRINUSE" ? "Port " + LAN_PORT + " başka bir program tarafından kullanılıyor." : String(e && e.message || e);
      resolve(lanInfo());
    });
    srv.listen(LAN_PORT, "0.0.0.0", () => { lanServer = srv; resolve(lanInfo()); });
  });
}
function stopLan() {
  return new Promise((resolve) => {
    if (!lanServer) return resolve(lanInfo());
    const srv = lanServer; lanServer = null;
    srv.close(() => resolve(lanInfo()));
    if (srv.closeAllConnections) srv.closeAllConnections();
  });
}

/* Ekran kartı: varsayılan olarak arayüz ekran kartını KULLANMAZ. Arayüzün kaplayacağı
   birkaç yüz MB, 12 GB'lık kartta 14b modelin bir kısmını işlemciye taşıyıp yanıtları
   ~4 kat yavaşlatıyordu (ölçüm: tarayıcıda 56, uygulamada 12 parça/sn). */
loadSettings();
if (!settings.uiGpu) app.disableHardwareAcceleration();

/* Pardus / Linux: dokunmatik ekran (ETAP akıllı tahta) ve büyük ekranda varsayılan yakınlaştırma */
const ETAP = process.platform === "linux" && (() => {
  try { return /etap/i.test(["/etc/os-release", "/etc/lsb-release", "/etc/pardus/pardus-release"].map((f) => { try { return fs.readFileSync(f, "utf8"); } catch (e) { return ""; } }).join("\n")); }
  catch (e) { return false; }
})();
if (process.platform === "linux") app.commandLine.appendSwitch("touch-events", "enabled");
const ZOOM_MIN = 0.6, ZOOM_MAX = 2;
const varsayilanZoom = () => settings.zoom || (ETAP ? 1.25 : 1);

ipcMain.on("gpu:get", (e) => { e.returnValue = !!settings.uiGpu; });
ipcMain.handle("gpu:set", (e, on) => {
  settings.uiGpu = !!on; saveSettings();
  setTimeout(() => { app.relaunch(); app.exit(0); }, 300);     // değişiklik yeniden başlatınca geçerli
  return settings.uiGpu;
});

ipcMain.handle("lan:get", () => lanInfo());
ipcMain.handle("lan:set", async (e, on) => {
  settings.lanEnabled = !!on; saveSettings();
  return on ? startLan() : stopLan();
});
ipcMain.handle("lan:regenerate", () => { settings.token = newToken(); saveSettings(); return lanInfo(); });

/* ---------------- Cihaza indirilen yapay zeka (Ollama'sız) ---------------- */
let cihaz = null;
function cihazKur() {
  cihaz = cihazAi.olustur({
    userData: app.getPath("userData"),
    bildir: (d) => { if (win && !win.isDestroyed()) win.webContents.send("cihaz:ilerleme", d); },
    log: (...a) => console.log("[cihaz]", ...a)
  });
  if (cihaz.bilgi().kurulu) cihaz.baslat();           // önceden indirildiyse arka planda aç
}
ipcMain.handle("cihaz:bilgi", () => cihaz.bilgi());
ipcMain.handle("cihaz:indir", (e, v) => cihaz.indir(v));
ipcMain.handle("cihaz:vazgec", () => { cihaz.vazgec(); return cihaz.bilgi(); });
ipcMain.handle("cihaz:baslat", () => cihaz.baslat());
ipcMain.handle("cihaz:sil", () => cihaz.sil());
app.on("will-quit", () => { if (cihaz) cihaz.durdur(); });

/* ---------------- Pencere ---------------- */
let win = null;
function createWindow() {
  const b = settings.bounds || {};
  win = new BrowserWindow({
    width: b.width || 1280, height: b.height || 840, x: b.x, y: b.y,
    minWidth: 380, minHeight: 560,
    backgroundColor: "#121318",
    title: "KampüsAI",
    icon: path.join(__dirname, "build", "icon.png"),
    autoHideMenuBar: true,
    show: false,
    webPreferences: { preload: path.join(__dirname, "preload.js"), contextIsolation: true, sandbox: true, spellcheck: false }
  });
  if (b.maximized) win.maximize();
  win.once("ready-to-show", () => win.show());
  win.webContents.on("did-finish-load", () => { if (win && !win.isDestroyed()) win.webContents.setZoomFactor(varsayilanZoom()); });
  win.loadURL(ORIGIN + "/index.html");

  // Dış bağlantılar varsayılan tarayıcıda açılır
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//.test(url)) shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (e, url) => {
    if (!url.startsWith(ORIGIN)) { e.preventDefault(); if (/^https?:\/\//.test(url)) shell.openExternal(url); }
  });
  // F5 / Ctrl+R yenile, Ctrl+Shift+I geliştirici araçları
  win.webContents.on("before-input-event", (e, input) => {
    if (input.type !== "keyDown") return;
    if (input.key === "F5" || (input.control && input.key.toLowerCase() === "r")) { win.webContents.reload(); e.preventDefault(); }
    if (input.control && input.shift && input.key.toLowerCase() === "i") { win.webContents.toggleDevTools(); e.preventDefault(); }
    // Ctrl + / Ctrl - / Ctrl 0: yakınlaştırma (akıllı tahta ve büyük ekranlar için; kalıcı)
    if (input.control && ["+", "=", "-", "0"].includes(input.key)) {   // Türkçe Q klavyede "+" Shift ile
      const z = win.webContents.getZoomFactor();
      const yeni = input.key === "0" ? (ETAP ? 1.25 : 1) : Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round((z + (input.key === "-" ? -0.1 : 0.1)) * 10) / 10));
      win.webContents.setZoomFactor(yeni);
      settings.zoom = yeni; saveSettings();
      e.preventDefault();
    }
  });

  const remember = () => {
    if (!win || win.isDestroyed()) return;
    settings.bounds = Object.assign({}, win.isMaximized() ? settings.bounds || {} : win.getBounds(), { maximized: win.isMaximized() });
    saveSettings();
  };
  win.on("close", remember);
  win.on("closed", () => { win = null; });
}

/* Derleme sonrası kısa deneme (GitHub Actions): pencere açılır, sayfa yüklenir,
   uygulama ve Ollama aracısı kontrol edilir, sonuç dosyaya yazılıp çıkılır. */
async function smokeTest(outFile) {
  const result = { ok: false };
  try {
    const lan = await startLan();
    result.lan = { enabled: lan.enabled, error: lan.error };
    await stopLan();
    cihazKur();
    const c = cihaz.bilgi();
    result.cihaz = { secim: c.secim, oneri: c.oneri, bellek: c.bellek, gomuluMotor: c.gomuluMotor };
    createWindow();
    await new Promise((resolve) => win.webContents.once("did-finish-load", resolve));
    await new Promise((r) => setTimeout(r, 2500));
    Object.assign(result, await win.webContents.executeJavaScript(`(async () => {
      const r = { app: typeof App === "object", version: App.version, title: !!document.querySelector(".home__title"),
        desktop: !!(window.desktopApp && window.desktopApp.lan), origin: location.origin, katex: !!window.katex,
        idb: App.db && App.db.engine, local: App.engine && App.engine.localPossible() };
      try { const x = await fetch("app://local/ollama/api/version"); r.proxyStatus = x.status; r.proxyBody = (await x.text()).slice(0, 80); } catch (e) { r.proxyError = String(e); }
      r.lanInfo = await window.desktopApp.lan.get();
      return r;
    })()`));
    try { fs.writeFileSync(outFile.replace(/\.json$/, ".png"), (await win.webContents.capturePage()).toPNG()); } catch (e) { result.shotError = String(e); }
    result.ok = result.app && result.title && result.desktop && result.idb === "indexeddb" && (result.proxyStatus === 200 || result.proxyStatus === 502)
      && (process.platform !== "linux" || result.cihaz.gomuluMotor === true);
  } catch (e) { result.error = String(e && e.stack || e); }
  fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
  app.exit(result.ok ? 0 : 1);
}

app.on("second-instance", () => {
  if (win) { if (win.isMinimized()) win.restore(); win.focus(); }
});

app.whenReady().then(async () => {
  app.setAppUserModelId("com.dersasistani.app");
  Menu.setApplicationMenu(null);

  protocol.handle("app", async (request) => {
    const url = new URL(request.url);
    if (url.pathname === "/ollama" || url.pathname.startsWith("/ollama/")) {
      return proxyOllama(request, url.pathname.slice("/ollama".length) + url.search);
    }
    const c = url.pathname.match(/^\/cihaz\/(sohbet|hafiza)(\/.*)?$/);
    if (c) {
      const hedef = cihaz && cihaz.adres(c[1]);
      if (!hedef) return new Response(JSON.stringify({ error: "cihaz yapay zekası hazır değil" }), { status: 503, headers: { "content-type": "application/json" } });
      return proxyOllama(request, (c[2] || "/") + url.search, hedef);
    }
    const r = await serveStatic(WEB_ROOT, url.pathname);
    return new Response(r.body, { status: r.status, headers: r.headers });
  });

  if (process.env.DA_SMOKE_OUT) { smokeTest(process.env.DA_SMOKE_OUT); return; }

  cihazKur();
  ensureOllama();                         // beklemeden: pencere hemen açılsın
  if (settings.lanEnabled) startLan();
  createWindow();

  app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on("window-all-closed", () => {
  stopLan();
  if (process.platform !== "darwin") app.quit();
});
