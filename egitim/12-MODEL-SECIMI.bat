@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"
title KampusAI Model Secimi
set "VPY=%~dp0.venv\Scripts\python.exe"
set PYTHONUTF8=1
set PYTHONIOENCODING=utf-8
if not exist "%VPY%" (
  echo Once 1-KURULUM.bat calistirin.
  goto bitti
)
echo.
echo MODEL SECIMI: yeni aday modeller, egitimden ONCE ayni testlerle olculur.
echo   Telefon icin : gemma4:e4b (su anki)  -  qwen3.5:4b (aday)
echo   Bilgisayar   : qwen3.5:9b (aday)     -  gemma4:12b (aday)
echo   Hakem        : gpt-oss:20b (adaylardan bagimsiz, acik uclu cevaplari puanlar)
echo.
echo 1) 215 soruluk test (egitimde hic gorulmemis sorular)  ~1-2 saat
echo 2) 2026 YKS testi (291 soru, yalnizca bu bilgisayarda)   ~6-8 saat
echo Modeller ilk seferde indirilir (~25 GB). Gece calistirin, pencereyi KAPATMAYIN.
echo Kesilirse tekrar cift tiklayin, kaldigi yerden devam eder.
echo.
"%VPY%" scripts\adim5_test.py --indir --hakem gpt-oss:20b --rapor model_secimi_test.md ^
  --model gemma4:e4b --model qwen3.5:4b --model qwen3.5:9b --model gemma4:12b || goto hata
echo.
echo 215 soruluk test bitti: rapor\model_secimi_test.md
echo.
if not exist "veri\yks\sorular.jsonl" (
  echo YKS sorulari bulunamadi; once 10-YKS-TEST.bat bir kez calistirilmali. YKS testi atlandi.
  goto son
)
"%VPY%" scripts\yks_test.py --yil 2026 --rapor model_secimi_yks.md ^
  --model ollama:gemma4:e4b --model ollama:qwen3.5:4b --model ollama:qwen3.5:9b --model ollama:gemma4:12b || goto hata
:son
echo.
echo ============================================================
echo  MODEL SECIMI BITTI. Raporlar:
echo    rapor\model_secimi_test.md
echo    rapor\model_secimi_yks.md
echo  Bu iki dosyayi Claude'a gonderin (YKS sorularini degil, sadece raporu).
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
