#!/usr/bin/env bash
# APK imzalama (CI). Kullanım: tools/sign-apk.sh <imzasız.apk> <çıktı.apk>
#
# • Sürüm (release) derlemesi imzalanır: "debuggable" değildir (Play Protect bunu riskli sayar).
# • ANDROID_KEYSTORE_B64 + ANDROID_KEYSTORE_PASS gizli değerleri varsa APK projenin kalıcı
#   yayın anahtarıyla (CN=KampusAI) imzalanır: her sürüm aynı imzayı taşır, yeni sürüm
#   eskisinin üzerine kurulur ve veriler silinmez.
# • Gizli değerler yoksa repodaki sabit anahtarla (mobile/debug.keystore) imzalanır. Bu anahtar
#   herkese açık olduğu için yalnızca geçiş içindir; gizli değerleri eklemek gerekir.
# Not: 1.13.0 ve öncesi her derlemede rastgele üretilen bir hata ayıklama anahtarıyla
# imzalanmıştı (her sürüm farklı). Bu yüzden o sürümlerden yeni anahtara geçişte bir kez
# kaldırıp yeniden kurmak gerekir; sonraki güncellemeler sorunsuzdur.
set -euo pipefail
IN="$1"; OUT="$2"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BT="$(ls -d "${ANDROID_HOME:-$ANDROID_SDK_ROOT}"/build-tools/* | sort -V | tail -1)"
echo "build-tools: $BT"
WORK="$(mktemp -d)"; trap 'rm -rf "$WORK"' EXIT
"$BT/zipalign" -f -p 4 "$IN" "$WORK/aligned.apk"

if [ -n "${KS_B64:-}" ]; then
  printf '%s' "$KS_B64" | base64 -d > "$WORK/release.jks"
  export KSPASS="${KS_PASS:?ANDROID_KEYSTORE_PASS eksik}"
  echo "Yayın anahtarıyla (CN=KampusAI) imzalanıyor"
  SIGN=(--ks "$WORK/release.jks" --ks-key-alias "${KS_ALIAS:-kampusai}" --ks-pass env:KSPASS --key-pass env:KSPASS)
else
  echo "UYARI: ANDROID_KEYSTORE_B64 gizli değeri yok; geçici olarak repodaki anahtarla imzalanıyor"
  SIGN=(--ks "$ROOT/mobile/debug.keystore" --ks-key-alias androiddebugkey --ks-pass pass:android --key-pass pass:android)
fi
"$BT/apksigner" sign "${SIGN[@]}" --v1-signing-enabled true --v2-signing-enabled true --v3-signing-enabled true \
  --out "$OUT" "$WORK/aligned.apk"
"$BT/apksigner" verify --print-certs "$OUT" | grep -E "certificate DN|SHA-256" || true
"$BT/apksigner" verify "$OUT"
if "$BT/aapt2" dump badging "$OUT" 2>/dev/null | grep -q "application-debuggable"; then echo "HATA: APK debuggable"; exit 1; fi
echo "imzalı: $OUT"
