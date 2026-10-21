#!/usr/bin/env bash
# llama.cpp'nin yerel sunucusunu (llama-server) Linux masaüstü (Pardus) için derler.
# Debian 12 (bookworm) içinde çalıştırılır: Pardus 23 Debian 12, Pardus 25 Debian 13 tabanlıdır;
# Debian 12'de derlenen dosya ikisinde de çalışır (eski glibc'ye bağlanır).
#
# Kullanım: tools/llama-linux.sh <çıktı klasörü> [etiket]
#   çıktı: <klasör>/llama-server + libllama/libggml*.so (ekran kartı için Vulkan, işlemci için tüm
#          x86-64 varyantları; uygun olanı çalışırken seçilir) + SURUM
# Gerekenler (Debian 12): build-essential cmake ninja-build git libvulkan-dev glslc
set -euo pipefail
OUT=$(realpath -m "${1:?çıktı klasörü}")
TAG=${2:-}
if [ -z "$TAG" ]; then
  TAG=$(git ls-remote --tags https://github.com/ggml-org/llama.cpp 'refs/tags/b[0-9]*' | grep -v '\^{}' | sed 's#.*refs/tags/##' | sort -V | tail -1)
fi
echo "llama.cpp $TAG"
SRC=${LLAMA_SRC:-${RUNNER_TEMP:-/tmp}/llama.cpp-linux}
[ -d "$SRC/.git" ] || git clone -q --depth 1 --branch "$TAG" https://github.com/ggml-org/llama.cpp "$SRC"

derle() {   # $1: Vulkan açık mı (ON/OFF)
  rm -rf "$SRC/build-linux"
  cmake -S "$SRC" -B "$SRC/build-linux" -G Ninja \
    -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=ON \
    -DCMAKE_BUILD_RPATH_USE_ORIGIN=ON -DCMAKE_INSTALL_RPATH='$ORIGIN' -DCMAKE_BUILD_WITH_INSTALL_RPATH=ON \
    -DGGML_NATIVE=OFF -DGGML_BACKEND_DL=ON -DGGML_CPU_ALL_VARIANTS=ON -DGGML_VULKAN="$1" \
    -DLLAMA_OPENSSL=OFF -DLLAMA_CURL=OFF -DLLAMA_BUILD_TESTS=OFF -DLLAMA_BUILD_EXAMPLES=OFF \
    -DLLAMA_BUILD_UI=OFF -DLLAMA_USE_PREBUILT_UI=OFF
  # Hepsi: arka uç kütüphaneleri (ggml-cpu-*, ggml-vulkan) llama-server hedefinin bağımlılığı değil
  cmake --build "$SRC/build-linux" -j"$(nproc)"
}

VULKAN=ON
if ! derle ON; then
  echo "Vulkan ile derlenemedi; yalnız işlemci sürümü derleniyor."
  VULKAN=OFF
  derle OFF
fi

rm -rf "$OUT"; mkdir -p "$OUT"
BIN=$(find "$SRC/build-linux" -type f -name llama-server -perm -u+x | head -1)
cp "$BIN" "$OUT/"
find "$SRC/build-linux" -type f \( -name 'libllama*.so*' -o -name 'libggml*.so*' -o -name 'libmtmd*.so*' \) -exec cp -n {} "$OUT/" \;
# Sürüm numaralı .so bağlantılarını (libllama.so.0 → libllama.so.0.0.x) yeniden kur
( cd "$SRC/build-linux" && find . -type l \( -name 'libllama*.so*' -o -name 'libggml*.so*' -o -name 'libmtmd*.so*' \) -print0 | \
  while IFS= read -r -d '' l; do ln -sf "$(basename "$(readlink "$l")")" "$OUT/$(basename "$l")"; done )
strip --strip-unneeded "$OUT"/llama-server "$OUT"/*.so* 2>/dev/null || true
echo "$TAG vulkan=$VULKAN" > "$OUT/SURUM"
ls -la "$OUT"
# Çalışıyor mu (bu makinede, Debian 12)
LD_LIBRARY_PATH="$OUT" "$OUT/llama-server" --version
echo "En yüksek glibc gereksinimi:"
objdump -T "$OUT"/llama-server "$OUT"/*.so 2>/dev/null | grep -o 'GLIBC_[0-9.]*' | sort -V | tail -1
