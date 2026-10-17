#!/usr/bin/env bash
# llama.cpp'nin yerel sunucusunu (llama-server) Android için derler.
# Uygulama içine "libllama-server.so" adıyla gömülür: Android yalnızca lib*.so adlı dosyaları
# uygulama kurulurken çalıştırılabilir klasöre (nativeLibraryDir) çıkarır.
#
# Kullanım: tools/llama-android.sh <çıktı klasörü> [etiket]
#   çıktı: <klasör>/arm64-v8a/libllama-server.so, <klasör>/x86_64/libllama-server.so (emülatör testi için)
# Gerekenler: ANDROID_NDK (GitHub Actions'ta ANDROID_NDK_LATEST_HOME), cmake, ninja
set -euo pipefail
OUT=$(realpath -m "${1:?çıktı klasörü}")
TAG=${2:-}
NDK=${ANDROID_NDK:-${ANDROID_NDK_LATEST_HOME:-}}
[ -d "$NDK" ] || { echo "ANDROID_NDK bulunamadı"; exit 1; }
if [ -z "$TAG" ]; then   # en yeni sürüm (b1234 biçimli etiketler)
  TAG=$(git ls-remote --tags https://github.com/ggml-org/llama.cpp 'refs/tags/b[0-9]*' | grep -v '\^{}' | sed 's#.*refs/tags/##' | sort -V | tail -1)
fi
echo "llama.cpp $TAG"
SRC=${LLAMA_SRC:-$RUNNER_TEMP/llama.cpp}
[ -d "$SRC/.git" ] || git clone -q --depth 1 --branch "$TAG" https://github.com/ggml-org/llama.cpp "$SRC"

for ABI in arm64-v8a x86_64; do
  EXTRA=()
  # Telefon işlemcileri: ARMv8.2 + dotprod + fp16 (2018 sonrası; 8 GB belleği olan tüm telefonlar)
  [ "$ABI" = arm64-v8a ] && EXTRA+=(-DGGML_CPU_ARM_ARCH=armv8.2-a+dotprod+fp16)
  cmake -S "$SRC" -B "$SRC/build-$ABI" -G Ninja \
    -DCMAKE_TOOLCHAIN_FILE="$NDK/build/cmake/android.toolchain.cmake" \
    -DANDROID_ABI=$ABI -DANDROID_PLATFORM=android-28 -DANDROID_STL=c++_static \
    -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF \
    -DGGML_NATIVE=OFF -DGGML_OPENMP=OFF -DGGML_LLAMAFILE=OFF \
    -DLLAMA_OPENSSL=OFF -DLLAMA_BUILD_TESTS=OFF -DLLAMA_BUILD_EXAMPLES=OFF \
    -DLLAMA_BUILD_UI=OFF -DLLAMA_USE_PREBUILT_UI=OFF \
    "${EXTRA[@]}"
  cmake --build "$SRC/build-$ABI" --target llama-server -j"$(nproc)"
  mkdir -p "$OUT/$ABI"
  BIN=$(find "$SRC/build-$ABI" -type f -name llama-server | head -1)
  "$NDK"/toolchains/llvm/prebuilt/*/bin/llvm-strip "$BIN" -o "$OUT/$ABI/libllama-server.so"
  ls -la "$OUT/$ABI"
  # Yalnızca Android'in kendi kitaplıklarına bağlı olmalı (libc++_shared vb. olmamalı)
  "$NDK"/toolchains/llvm/prebuilt/*/bin/llvm-readelf -d "$OUT/$ABI/libllama-server.so" | grep NEEDED || true
done
echo "$TAG" > "$OUT/SURUM"
