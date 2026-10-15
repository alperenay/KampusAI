@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"
set PYTHONUTF8=1
echo.
echo ===== KampusAI egitim ortami kuruluyor =====
echo.

REM ---- 1. Ekran karti surucusu
where nvidia-smi >nul 2>&1
if errorlevel 1 (
  echo HATA: nvidia-smi bulunamadi. NVIDIA surucusunu kurun/guncelleyin: https://www.nvidia.com/drivers
  exit /b 1
)
nvidia-smi --query-gpu=name,memory.total,driver_version --format=csv,noheader

REM ---- 2. Python 3.12
set "PY="
py -3.12 -c "import sys" >nul 2>&1 && set "PY=py -3.12"
if not defined PY (
  echo Python 3.12 bulunamadi, winget ile kuruluyor ^(onay penceresi cikabilir^)...
  winget install -e --id Python.Python.3.12 --accept-source-agreements --accept-package-agreements
  py -3.12 -c "import sys" >nul 2>&1 && set "PY=py -3.12"
)
if not defined PY (
  echo HATA: Python 3.12 kurulamadi. https://www.python.org/downloads/ adresinden 3.12 kurup tekrar deneyin.
  exit /b 1
)

REM ---- 3. Sanal ortam
if not exist ".venv\Scripts\python.exe" (
  echo Sanal ortam olusturuluyor...
  %PY% -m venv .venv || exit /b 1
)
set "VPY=.venv\Scripts\python.exe"
"%VPY%" -m pip install --upgrade pip

REM ---- 4. PyTorch (RTX 50 serisi icin CUDA 12.8) ve Unsloth
echo.
echo PyTorch indiriliyor (~3 GB)...
"%VPY%" -m pip install torch torchvision --index-url https://download.pytorch.org/whl/cu128 || exit /b 1
echo.
echo Unsloth kuruluyor...
"%VPY%" -m pip install unsloth --extra-index-url https://download.pytorch.org/whl/cu128 || exit /b 1

REM Unsloth PyTorch'u ekran kartsiz surumle degistirdiyse onar
"%VPY%" scripts\kontrol.py --torch-onar

REM ---- 5. Ollama hizlandirma: ayni anda 4 istek (veri uretimini ~2-3 kat hizlandirir)
setx OLLAMA_NUM_PARALLEL 4 >nul
REM Flash attention + 8-bit KV onbellegi: ayni bellekte daha fazla paralel istek, daha hizli uretim
setx OLLAMA_FLASH_ATTENTION 1 >nul
setx OLLAMA_KV_CACHE_TYPE q8_0 >nul
echo.
echo Ollama ayarlari yenilensin diye yeniden baslatiliyor...
taskkill /im "ollama app.exe" /f >nul 2>&1
taskkill /im ollama.exe /f >nul 2>&1
timeout /t 2 /nobreak >nul
if exist "%LOCALAPPDATA%\Programs\Ollama\ollama app.exe" (
  start "" "%LOCALAPPDATA%\Programs\Ollama\ollama app.exe"
) else (
  start "" /min ollama serve
)
timeout /t 8 /nobreak >nul

echo.
echo ===== Modeller indiriliyor (bir kerelik, ~20 GB) =====
"%VPY%" scripts\kontrol.py --modelleri-indir

echo.
echo ===== Kontrol =====
"%VPY%" scripts\kontrol.py
if errorlevel 1 (
  echo.
  echo Kurulumda sorun var. Yukaridaki X isaretli satirlari Claude'a gosterin.
  exit /b 1
)
echo.
echo Kurulum tamam. Simdi menuden 2^) Deneme'yi calistirin.
exit /b 0
