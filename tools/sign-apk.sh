#!/usr/bin/env bash
# APK imzalama (CI). Kullanım: tools/sign-apk.sh <imzasız.apk> <çıktı.apk>
#
# • Sürüm (release) derlemesi imzalanır: "debuggable" değildir (Play Protect bunu riskli sayar).
# • ANDROID_KEYSTORE_B64 + ANDROID_KEYSTORE_PASS gizli değerleri varsa APK, projenin kendi
#   yayın anahtarıyla (CN=KampusAI) imzalanır. Eski sürümler herkese açık hata ayıklama
#   anahtarıyla imzalandığı için APK İmza Şeması v3 "anahtar döndürme" kullanılır:
#   v1/v2 eski anahtarla, v3 yeni anahtarla + ikisini bağlayan soy (lineage) ile.
#   Böylece telefonda kurulu eski sürümün üzerine kurulur, veriler silinmez (Android 9+).
# • Gizli değerler yoksa eskisi gibi yalnızca eski anahtarla imzalanır.
# • TEST_ROTATION=1: geçici bir anahtarla döndürme yolunu dener (gizli değer gerekmez).
set -euo pipefail
IN="$1"; OUT="$2"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BT="$(ls -d "${ANDROID_HOME:-$ANDROID_SDK_ROOT}"/build-tools/* | sort -V | tail -1)"
echo "build-tools: $BT"
WORK="$(mktemp -d)"; trap 'rm -rf "$WORK"' EXIT
"$BT/zipalign" -f -p 4 "$IN" "$WORK/aligned.apk"

OLD=(--ks "$ROOT/mobile/debug.keystore" --ks-key-alias androiddebugkey --ks-pass pass:android --key-pass pass:android)

if [ -n "${KS_B64:-}" ] || [ "${TEST_ROTATION:-}" = "1" ]; then
  if [ -n "${KS_B64:-}" ]; then
    printf '%s' "$KS_B64" | base64 -d > "$WORK/new.jks"
    export KSPASS="${KS_PASS:?ANDROID_KEYSTORE_PASS eksik}"
    ALIAS="${KS_ALIAS:-kampusai}"
    echo "Yayın anahtarıyla imzalanıyor (v3 anahtar döndürme)"
  else
    export KSPASS="gecici-test-sifresi"; ALIAS="kampusai"
    keytool -genkeypair -keystore "$WORK/new.jks" -storetype PKCS12 -alias "$ALIAS" -keyalg RSA -keysize 2048 -validity 30 \
      -storepass "$KSPASS" -keypass "$KSPASS" -dname "CN=KampusAI Test, C=TR" >/dev/null
    echo "TEST: geçici anahtarla döndürme deneniyor"
  fi
  NEW=(--ks "$WORK/new.jks" --ks-key-alias "$ALIAS" --ks-pass env:KSPASS --key-pass env:KSPASS)
  "$BT/apksigner" rotate --out "$WORK/lineage.bin" --old-signer "${OLD[@]}" --new-signer "${NEW[@]}"
  "$BT/apksigner" sign "${OLD[@]}" --next-signer "${NEW[@]}" --lineage "$WORK/lineage.bin" \
    --v1-signing-enabled true --v2-signing-enabled true --v3-signing-enabled true \
    --rotation-min-sdk-version 28 --out "$OUT" "$WORK/aligned.apk"
else
  echo "Gizli imza anahtarı yok: eski anahtarla imzalanıyor"
  "$BT/apksigner" sign "${OLD[@]}" --out "$OUT" "$WORK/aligned.apk"
fi
"$BT/apksigner" verify --verbose --print-certs "$OUT" | grep -E "Verified using|Signer|certificate DN|Number of signers" || true
"$BT/apksigner" verify "$OUT"
# Hata ayıklanabilir olmamalı
if "$BT/aapt2" dump badging "$OUT" 2>/dev/null | grep -q "application-debuggable"; then echo "HATA: APK debuggable"; exit 1; fi
echo "imzalı: $OUT"
