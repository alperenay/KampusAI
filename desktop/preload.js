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
  }
});
