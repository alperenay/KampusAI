@echo off
setlocal EnableDelayedExpansion
chcp 65001 >nul
cd /d "%~dp0"
title KampusAI Egitim
set "VPY=%~dp0.venv\Scripts\python.exe"
set PYTHONUTF8=1
set PYTHONIOENCODING=utf-8

:menu
cls
echo ============================================================
echo                KampusAI - Yapay Zeka Egitimi
echo ============================================================
echo.
echo   1) Kurulum            (bir kez, 20-40 dk, internet gerekir)
echo   2) Deneme             (20 kazanimla veri + 30 adim egitim, ~30 dk)
echo   3) Veri uret          (tam, birkac saat - kaldigi yerden devam eder)
echo   4) Egit               (1-3 saat - kaldigi yerden devam eder)
echo   5) Ollama'ya yukle    (kampusai modeli olusur)
echo   6) Test et            (modelleri karsilastir, rapor yazar)
echo   7) GECE MODU          (3 - 4 - 5 - 6 sirayla, sabaha hazir)
echo   8) Kontrol            (kurulum saglam mi?)
echo   0) Cikis
echo.
set "SEC="
set /p SEC=Seciminiz:
if "%SEC%"=="1" goto kurulum
if "%SEC%"=="2" goto deneme
if "%SEC%"=="3" goto s3
if "%SEC%"=="4" goto s4
if "%SEC%"=="5" goto s5
if "%SEC%"=="6" goto s6
if "%SEC%"=="7" goto gece
if "%SEC%"=="8" goto kontrol
if "%SEC%"=="0" exit /b 0
goto menu

:gerekli
if not exist "%VPY%" (
  echo.
  echo Once 1^) Kurulum adimini calistirin.
  exit /b 1
)
exit /b 0

REM ------------------------------------------------------------ Kurulum
:kurulum
call kurulum.bat
goto bitti

:kontrol
call :gerekli || goto bitti
"%VPY%" scripts\kontrol.py
goto bitti

REM ------------------------------------------------------------ Deneme
:deneme
call :gerekli || goto bitti
"%VPY%" scripts\kontrol.py || goto hata
"%VPY%" scripts\adim1_korpus.py || goto hata
REM Deneme ciktisi silinmez: tam uretim bu 20 kazanimi tekrar uretmeden kaldigi yerden devam eder
"%VPY%" scripts\adim2_veri_uret.py --sinir 20 || goto hata
"%VPY%" scripts\adim3_egit.py --deneme || goto hata
echo.
echo DENEME BASARILI. Simdi 7) GECE MODU ile tam egitimi baslatabilirsiniz.
goto bitti

REM ------------------------------------------------------------ Adimlar
:s3
call :adim3 || goto hata
goto bitti
:s4
call :adim4 || goto hata
goto bitti
:s5
call :adim5 || goto hata
goto bitti
:s6
call :adim6 || goto hata
goto bitti

:adim3
call :gerekli || exit /b 1
"%VPY%" scripts\adim1_korpus.py || exit /b 1
"%VPY%" scripts\adim2_veri_uret.py || exit /b 1
exit /b 0

:adim4
call :gerekli || exit /b 1
"%VPY%" scripts\adim3_egit.py || exit /b 1
exit /b 0

:adim5
call :gerekli || exit /b 1
"%VPY%" scripts\adim4_ollama.py || exit /b 1
exit /b 0

:adim6
call :gerekli || exit /b 1
"%VPY%" scripts\adim5_test.py || exit /b 1
exit /b 0

REM ------------------------------------------------------------ Gece modu
:gece
call :gerekli || goto bitti
echo.
echo GECE MODU: veri uretimi, egitim, Ollama'ya yukleme ve test sirayla calisacak.
echo Bilgisayar bu sirada uyku moduna gecmez (ekran kapanabilir). Pencereyi KAPATMAYIN.
echo Ilerleme: rapor\gunluk\ klasorundeki dosyalar.
echo.
call :adim3 || goto hata
call :adim4 || goto hata
call :adim5 || goto hata
call :adim6 || goto hata
echo.
echo ============================================================
echo  HEPSI TAMAM. Sonuclar: rapor\test_raporu.md
echo ============================================================
goto bitti

:hata
echo.
echo ************************************************************
echo  BIR ADIM HATA VERDI. Yukaridaki mesaji ya da rapor\gunluk\
echo  klasorundeki son dosyayi Claude'a gosterin. Ayni secenegi
echo  tekrar calistirirsaniz kaldigi yerden devam eder.
echo ************************************************************
goto bitti

:bitti
echo.
pause
goto menu
