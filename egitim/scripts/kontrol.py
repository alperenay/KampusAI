"""Kurulum kontrolü: Python, PyTorch + CUDA, Unsloth, Ollama ve disk alanı.

  python kontrol.py              rapor
  python kontrol.py --torch-onar PyTorch ekran kartını görmüyorsa CUDA'lı sürümü yeniden kurar
"""
import argparse
import shutil
import subprocess
import sys

from ortak import KIT, OllamaHatasi, ayarlar, baslat, log, ollama_modeller

TORCH_INDEX = "https://download.pytorch.org/whl/cu128"


def torch_durum():
    try:
        import torch
        return torch.__version__, torch.cuda.is_available(), torch
    except Exception as e:
        return None, False, e


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--torch-onar", action="store_true")
    arg = p.parse_args()
    baslat("kontrol")
    sorun = 0
    log(f"Python {sys.version.split()[0]}  ({sys.executable})")

    surum, cuda, torch = torch_durum()
    if arg.torch_onar and surum and not cuda:
        temel = surum.split("+")[0]
        log(f"PyTorch {surum} ekran kartını görmüyor → CUDA'lı {temel} kuruluyor...")
        subprocess.run([sys.executable, "-m", "pip", "install", "--force-reinstall", "--no-deps",
                        f"torch=={temel}", "--index-url", TORCH_INDEX])
        log("Onarım bitti; kontrol yeniden çalıştırılıyor.")
        sys.exit(subprocess.run([sys.executable, __file__]).returncode)

    if not surum:
        log("✗ PyTorch yok:", torch)
        sorun += 1
    elif not cuda:
        log(f"✗ PyTorch {surum} ekran kartını görmüyor (NVIDIA sürücüsünü güncelleyip kurulumu tekrar çalıştırın).")
        sorun += 1
    else:
        g = torch.cuda.get_device_properties(0)
        x = torch.randn(256, 256, device="cuda")
        _ = (x @ x).sum().item()
        log(f"✓ PyTorch {surum} · {g.name} · {g.total_memory / 2**30:.1f} GB · bf16: {torch.cuda.is_bf16_supported()}")

    try:
        import unsloth  # noqa: F401
        log(f"✓ Unsloth {getattr(unsloth, '__version__', '')}")
    except Exception as e:
        log("✗ Unsloth yüklenemedi:", repr(e)[:500])
        sorun += 1

    try:
        a = ayarlar()
        m = ollama_modeller()
        log(f"✓ Ollama çalışıyor · {len(m)} model: {', '.join(m[:8])}{' …' if len(m) > 8 else ''}")
        if a["ogretmen_model"] not in m and a["ogretmen_model"] + ":latest" not in m:
            log(f"  (öğretmen model {a['ogretmen_model']} veri üretiminde otomatik indirilecek)")
    except OllamaHatasi as e:
        log("✗ Ollama:", e)
        sorun += 1

    bos = shutil.disk_usage(KIT).free / 2**30
    if bos < 45:
        log(f"⚠ Diskte {bos:.0f} GB boş alan var; eğitim + birleştirme için ~45 GB önerilir.")
    else:
        log(f"✓ Disk: {bos:.0f} GB boş")

    log("SONUÇ:", "her şey hazır." if not sorun else f"{sorun} sorun var (yukarıda ✗ ile işaretli).")
    sys.exit(1 if sorun else 0)


if __name__ == "__main__":
    main()
