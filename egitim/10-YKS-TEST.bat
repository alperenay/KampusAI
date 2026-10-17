@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"
title KampusAI YKS Testi
set "VPY=%~dp0.venv\Scripts\python.exe"
set PYTHONUTF8=1
set PYTHONIOENCODING=utf-8
if not exist "%VPY%" (
  echo Once 1-KURULUM.bat calistirin.
  goto bitti
)
echo.
echo GERCEK YKS TESTI: Masaustundeki YKS klasorundeki OSYM kitapciklarindan sorular ayiklanir,
echo modellere sorulur ve net hesaplanir. Sonuc: rapor\yks_raporu.md
echo 2026 TYT + AYT (291 soru): Gemma 4 E4B ~2 saat, ardindan internet modelleri ~30-40 dk.
echo Pencereyi KAPATMAYIN. Kesilirse tekrar cift tiklayin, kaldigi yerden devam eder.
echo.
"%VPY%" -c "import pdfplumber" 2>nul || "%VPY%" -m pip install -q pdfplumber
if not exist "veri\yks\sorular.jsonl" (
  "%VPY%" scripts\yks_ayikla.py || goto hata
)
"%VPY%" scripts\yks_test.py || goto hata
echo.
echo ============================================================
echo  YKS TESTI BITTI. Sonuclar: rapor\yks_raporu.md
echo ============================================================
goto bitti
:hata
echo.
echo ************************************************************
echo  BIR ADIM HATA VERDI. Ekran goruntusunu Claude'a gonderin.
echo ************************************************************
:bitti
echo.
pause
