@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"
title KampusAI Hesap Araci Testi
set "VPY=%~dp0.venv\Scripts\python.exe"
set PYTHONUTF8=1
set PYTHONIOENCODING=utf-8
if not exist "%VPY%" (
  echo Once 1-KURULUM.bat calistirin.
  goto bitti
)
echo.
echo HESAP ARACI TESTI: 2026 YKS matematik sorulari (80 soru) Gemma 4 E4B'ye
echo hesap makinesi araciyla sorulur ve aracsiz sonucla karsilastirilir.
echo Sure: yaklasik 30-45 dakika. Sonuc: rapor\yks_hesap_raporu.md
echo Baska bir YKS testi aciksa once onu kapatin (ekran karti paylasilmasin).
echo Pencereyi KAPATMAYIN. Kesilirse tekrar cift tiklayin, kaldigi yerden devam eder.
echo.
"%VPY%" scripts\yks_test.py --hesap || goto hata
echo.
echo ============================================================
echo  HESAP TESTI BITTI. Sonuclar: rapor\yks_hesap_raporu.md
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
