@echo off
rem Ders Asistani: siteyi yerel sunucuyla acar (yapay zeka icin gerekli).
rem Kapatmak icin acilan siyah pencereyi kapatin.
title Ders Asistani
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\sunucu.ps1"
if errorlevel 1 pause
