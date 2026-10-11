/* preload.js — uygulama sayfasına güvenli, sınırlı bir köprü açar (window.desktopApp) */
"use strict";
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("desktopApp", {
  platform: process.platform,
  lan: {
    get: () => ipcRenderer.invoke("lan:get"),
    set: (on) => ipcRenderer.invoke("lan:set", !!on),
    regenerate: () => ipcRenderer.invoke("lan:regenerate")
  }
});
