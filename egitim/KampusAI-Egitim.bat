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
echo   1) Kurulum            (bir kez, 30-60 dk, ~25 GB indirir)
echo   2) Deneme             (20 kazanimla veri + 30 adim egitim, ~30-45 dk)
echo   3) Veri uret          (tam, ~6-10 saat - kaldigi yerden devam eder)
echo   4) Egit               (~1-2 saat - kaldigi yerden devam eder)
echo   5) Paketle            (Ollama'ya kampusai + herkes icin indirilebilir dosyalar)
echo   6) Test et            (modelleri karsilastir, rapor yazar)
echo   7) GECE MODU          (3 - 4 - 5 - 6 sirayla, sabaha hazir)
echo   8) Kontrol            (kurulum saglam mi?)
echo   9) Bulut anahtari     (istege bagli: Cerebras, sayisal sorulari gpt-oss-120b yazar)
echo  10) Pro surum (12B)    (istege bagli: guclu bilgisayarlar icin, veri hazir olmali)
echo  11) Yayinla            (testten sonra: modeli herkesin indirebilecegi yere yukle)
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
if "%SEC%"=="9" goto anahtar
if "%SEC%"=="10" goto pro
if "%SEC%"=="11" goto yayinla
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

:pro
call :gerekli || goto bitti
echo.
echo PRO SURUM: ayni veriyle 12B model egitilir ^(cikti-pro^), Ollama'ya kampusai-pro adiyla yuklenir ve test edilir.
set "KAMPUS_PROFIL=pro"
"%VPY%" scripts\adim3_egit.py || goto prohata
"%VPY%" scripts\adim4_ollama.py || goto prohata
"%VPY%" scripts\adim5_test.py || goto prohata
set "KAMPUS_PROFIL="
echo.
echo PRO SURUM HAZIR. Sonuclar: rapor-pro\test_raporu.md
goto bitti
:prohata
set "KAMPUS_PROFIL="
goto hata

:yayinla
call :gerekli || goto bitti
echo.
echo Model herkese acik olarak yayinlanacak ^(Hugging Face, istege bagli ollama.com^).
echo Once rapor\test_raporu.md dosyasini inceleyin. Devam etmek icin E yazin.
set "ONAY="
set /p ONAY=Yayinlansin mi? (E/H): 
if /i not "%ONAY%"=="E" goto bitti
"%VPY%" scripts\adim6_yayinla.py || goto hata
goto bitti

:anahtar
echo.
echo cloud.cerebras.ai adresinde ucretsiz hesap acip "API Keys" bolumunden bir anahtar olusturun.
echo Anahtari buraya yapistirin (sag tik = yapistir). Bos birakirsaniz bulut kapatilir.
set "KEY="
set /p KEY=Anahtar: 
if "%KEY%"=="" (
  if exist bulut_anahtari.txt del bulut_anahtari.txt
  echo Bulut kapatildi; tum veri bilgisayarda uretilecek.
  goto bitti
)
>bulut_anahtari.txt echo %KEY%
echo Kaydedildi. Kontrol ediliyor...
call :gerekli || goto bitti
"%VPY%" scripts\kontrol.py --bulut
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
call :egit --deneme || goto hata
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
call :egit || exit /b 1
exit /b 0

REM Egitim: 12B ekran kartina sigmazsa betik ayarlari E4B'ye cevirip 3 koduyla cikar; o zaman tekrar calistirilir
:egit
"%VPY%" scripts\adim3_egit.py %*
if errorlevel 4 exit /b 1
if errorlevel 3 (
  echo.
  echo 12B model ekran kartina sigmadi. Daha kucuk model ^(E4B^) ile tekrar baslatiliyor...
  "%VPY%" scripts\adim3_egit.py %*
  exit /b !errorlevel!
)
if errorlevel 1 exit /b 1
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
