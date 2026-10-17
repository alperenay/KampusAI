@echo off
setlocal EnableDelayedExpansion
chcp 65001 >nul
cd /d "%~dp0"
title KampusAI v2 Egitim
set "VPY=%~dp0.venv\Scripts\python.exe"
set PYTHONUTF8=1
set PYTHONIOENCODING=utf-8
if not exist "%VPY%" (
  echo Once 1-KURULUM.bat calistirin.
  goto bitti
)
echo.
echo KAMPUSAI v2: Gemma 4 E4B egitim cevaplarini kendisi yazar, sonra bu veriyle egitilir,
echo paketlenir ve test edilir. Toplam ~4-6 saat. Pencereyi KAPATMAYIN. Kesilirse ayni dosyaya
echo tekrar cift tiklayin, kaldigi yerden devam eder.
echo Ilerleme: rapor\gunluk\ klasorundeki dosyalar.
echo.
set OLLAMA_NUM_PARALLEL=4
set OLLAMA_FLASH_ATTENTION=1
set OLLAMA_KV_CACHE_TYPE=q8_0
taskkill /im "ollama app.exe" /f >nul 2>&1
taskkill /im ollama.exe /f >nul 2>&1
timeout /t 3 /nobreak >nul
if exist "%LOCALAPPDATA%\Programs\Ollama\ollama app.exe" (
  start "" "%LOCALAPPDATA%\Programs\Ollama\ollama app.exe"
) else (
  start "" /min ollama serve
)
timeout /t 10 /nobreak >nul
"%VPY%" scripts\adim2b_ozdamitma.py || goto hata
"%VPY%" scripts\adim3_egit.py || goto hata
"%VPY%" scripts\adim4_ollama.py || goto hata
if exist "rapor\cevaplar\kampusai.jsonl" del "rapor\cevaplar\kampusai.jsonl"
"%VPY%" scripts\adim5_test.py || goto hata
echo.
echo ============================================================
echo  v2 HAZIR. Sonuclar: rapor\test_raporu.md
echo ============================================================
goto bitti
:hata
echo.
echo ************************************************************
echo  BIR ADIM HATA VERDI. Ekran goruntusunu Claude'a gonderin.
echo  Bu dosyaya tekrar cift tiklarsaniz kaldigi yerden devam eder.
echo ************************************************************
:bitti
echo.
pause
