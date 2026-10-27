/* preload.js — uygulama sayfasına güvenli, sınırlı bir köprü açar (window.desktopApp) */
"use strict";
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("desktopApp", {
  platform: process.platform,
  uiGpu: ipcRenderer.sendSync("gpu:get"),
  gpu: { set: (on) => ipcRenderer.invoke("gpu:set", !!on) },
  lan: {
    get: () => ipcRenderer.invoke("lan:get"),
    set: (on) => ipcRenderer.invoke("lan:set", !!on),
    regenerate: () => ipcRenderer.invoke("lan:regenerate")
  },
  /* Yapay zekayı bu bilgisayara indir (Gemma 4 E4B ya da hafif E2B + bge-m3, Ollama gerekmez) */
  stem: {
    stop: () => ipcRenderer.invoke("stem:durdur"),
    status: () => ipcRenderer.invoke("stem:bilgi"),
    download: () => ipcRenderer.invoke("stem:indir"),
    cancel: () => ipcRenderer.invoke("stem:vazgec"),
    start: () => ipcRenderer.invoke("stem:baslat"),
    remove: () => ipcRenderer.invoke("stem:sil"),
    onProgress: (fn) => { const h = (e, d) => fn(d); ipcRenderer.on("stem:ilerleme", h); return () => ipcRenderer.removeListener("stem:ilerleme", h); }
  },
  device: {
    status: () => ipcRenderer.invoke("cihaz:bilgi"),
    download: (v) => ipcRenderer.invoke("cihaz:indir", v === "tam" || v === "hafif" || v === "guclu" ? v : undefined),
    cancel: () => ipcRenderer.invoke("cihaz:vazgec"),
    start: () => ipcRenderer.invoke("cihaz:baslat"),
    remove: () => ipcRenderer.invoke("cihaz:sil"),
    onProgress: (fn) => {
      const h = (e, d) => fn(d);
      ipcRenderer.on("cihaz:ilerleme", h);
      return () => ipcRenderer.removeListener("cihaz:ilerleme", h);
    }
  }
});
