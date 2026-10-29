#!/usr/bin/env bash
# Android açılış testi (GitHub Actions'taki emülatörde çalışır):
#   APK'yı kurar ve açar → ilk açılış tanıtım turu → hatırlatıcıları açar (bildirim izni)
#   → turu geçer → yazı kutusuna dokunup klavyeyi açar (kutu klavyenin üstünde mi?)
# Her adımda ekran görüntüsü alınır (shots/), sonuçlar ci-sonuc-android dalına yazılır.
mkdir -p shots
exec > >(tee shots/report.txt) 2>&1   # günlük dala da yazılsın (Actions günlükleri okunamıyor)
set -ex
APP=com.dersasistani.app
APK=$(ls apk/*.apk | head -1)
# Güncelleme testi: önce yayındaki son sürümü kur, sonra yenisini üzerine kur
# (1.13.0 ve öncesi rastgele anahtarla imzalı olduğu için geçiş sürümünde BAŞARISIZ beklenir; sonrasında başarılı olmalı)
OLD_URL=$(curl -s "https://api.github.com/repos/${GITHUB_REPOSITORY:-alperenay/KampusAI}/releases/latest" | grep -o '"browser_download_url": *"[^"]*\.apk"' | head -1 | cut -d'"' -f4)
if [ -n "$OLD_URL" ] && curl -sL -o old.apk "$OLD_URL" && adb install old.apk; then
  echo "ESKİ SÜRÜM KURULDU: $OLD_URL"
  if adb install -r "$APK"; then echo "GÜNCELLEME: BAŞARILI (eski sürümün üzerine kuruldu)"; else echo "GÜNCELLEME: BAŞARISIZ"; adb uninstall $APP; adb install "$APK"; fi
else
  adb install -r "$APK"
fi
# İmza bilgisi (anahtar döndürme varsa geçmiş sertifikalar da görünür)
adb shell dumpsys package $APP | grep -iE "signatures|pastSigningCertificates|signing" | head -10 || true
# Emülatörde donanım klavyesi tanımlı: ekran klavyesi yine de açılsın (gerçek telefon gibi)
adb shell settings put secure show_ime_with_hard_keyboard 1 || true
adb shell pm grant $APP android.permission.POST_NOTIFICATIONS || true
# WebView capture needs both RECORD_AUDIO and the normal MODIFY_AUDIO_SETTINGS permission.
adb shell dumpsys package $APP > shots/android-permissions.txt
grep -q 'android.permission.RECORD_AUDIO' shots/android-permissions.txt
grep -q 'android.permission.MODIFY_AUDIO_SETTINGS.*granted=true' shots/android-permissions.txt
# Gömülü yapay zeka motoru kurulumda çıkarılmış ve çalışıyor mu?
APKDIR=$(adb shell pm path $APP | head -1 | sed 's/^package://; s#/base.apk.*##' | tr -d '\r')
adb shell ls -la "$APKDIR/lib/x86_64/" || true
# (sürüm derlemesi "debuggable" olmadığı için run-as ile çalıştırılamaz; motor uygulamanın içinden çalışır)
adb shell run-as $APP "$APKDIR/lib/x86_64/libllama-server.so" --version || echo "run-as yok (sürüm derlemesi): motor dosyası yukarıda listelendi"
adb shell am start -W -n $APP/.MainActivity
sleep 20

SIZE=$(adb shell wm size | grep -oE '[0-9]+x[0-9]+' | tail -1)
W=${SIZE%x*}; H=${SIZE#*x}
echo "ekran: $W x $H"
n=0
shot() { n=$((n+1)); adb exec-out screencap -p > "shots/$(printf %02d $n)-$1.png"; }

# Emülatörün kendi "… isn't responding" (ANR) penceresi uygulamanın üstünü kaplarsa (ör. Pixel Launcher)
# "Wait" ile kapatılır ve ekran yeniden okunur; uygulama hatası değildir, testi düşürmemeli.
dump_ui() {
  adb shell uiautomator dump /sdcard/ui.xml >/dev/null 2>&1 && adb pull /sdcard/ui.xml shots/ui.xml >/dev/null 2>&1
  grep -qiE "isn.t responding|yanıt vermiyor" shots/ui.xml 2>/dev/null || return 0
  local wxy
  wxy=$(python3 - <<'PYW'
import re, xml.etree.ElementTree as ET
root = ET.parse("shots/ui.xml").getroot()
for n in root.iter("node"):
    if n.get("text", "").strip().lower() in ("wait", "bekle"):
        v = re.findall(r"-?\d+", n.get("bounds", ""))
        if len(v) == 4:
            x1, y1, x2, y2 = map(int, v); print((x1 + x2) // 2, (y1 + y2) // 2); break
PYW
)
  echo "sistem ANR penceresi kapatılıyor (Wait): ${wxy:-geri tuşu}"
  if [ -n "$wxy" ]; then adb shell input tap $wxy; else adb shell input keyevent KEYCODE_BACK; fi
  sleep 2
  adb shell uiautomator dump /sdcard/ui.xml >/dev/null 2>&1 && adb pull /sdcard/ui.xml shots/ui.xml >/dev/null 2>&1
}

# Ekrandaki (WebView dahil) bir yazıyı bul ve dokun; bulunamazsa verilen oransal konuma dokun
tap_text() {
  local text="$1" fx="$2" fy="$3" xy=""
  for try in $(seq 1 "${TAP_TRIES:-3}"); do
    dump_ui
    xy=$(python3 - "$text" <<'PY'
import sys, re, xml.etree.ElementTree as ET
want = sys.argv[1].lower()
try: root = ET.parse("shots/ui.xml").getroot()
except Exception: sys.exit(0)
parents = {child: parent for parent in root.iter() for child in parent}
def rect(node):
    values = re.findall(r"-?\d+", node.get("bounds", ""))
    return tuple(map(int, values)) if len(values) == 4 else None
def in_scroll_view(node, x, y):
    # WebView may expose offscreen DOM bounds beyond the visible scroll area.
    # Such a coordinate can hit Android's system navigation instead of the form.
    parent = parents.get(node)
    while parent is not None:
        if parent.get("scrollable") == "true":
            bounds = rect(parent)
            if bounds and not (bounds[0] <= x < bounds[2] and bounds[1] <= y < bounds[3]): return False
        parent = parents.get(parent)
    return True
best = None
edit = want == "@edit"
radio = want == "@radio"
for n in root.iter("node"):
    hay = " ".join(n.get(k, "") for k in ("text", "content-desc", "hint")).lower()
    if (edit and n.get("class", "").endswith("EditText")) or (radio and n.get("class", "").endswith("RadioButton")) or (not edit and not radio and want in hay):
        m = rect(n)
        if m:
            x1, y1, x2, y2 = m
            if x2 > x1 and y2 > y1 and in_scroll_view(n, (x1+x2)//2, (y1+y2)//2):
                area = (x2 - x1) * (y2 - y1)
                if edit: area = -y1             # en alttaki yazı alanı
                # A tool title also occurs in its pin button's accessibility label.
                # Prefer the exact heading; never mistake "Pin: title" for the link.
                exact = any(n.get(k, "").lower() == want for k in ("text", "content-desc", "hint"))
                rank = (0 if edit or radio or exact else 1, area)
                if best is None or rank < best[0]: best = (rank, (x1 + x2) // 2, (y1 + y2) // 2)
if best: print(best[1], best[2])
PY
)
    [ -n "$xy" ] && break
    sleep 2
  done
  if [ -z "$xy" ] && [ -n "$fx" ]; then
    xy="$(python3 -c "print(int($W*$fx), int($H*$fy))")"
    echo "bulunamadı, konuma dokunuluyor: $text → $xy"
  fi
  [ -z "$xy" ] && { echo "bulunamadı: $text"; return 1; }
  echo "dokun: $text → $xy"
  adb shell input tap $xy
}

# Required actions have no coordinate fallback: a missing control is a failed test.
fail=0
required_tap() { tap_text "$1" "" "" || { echo "FAIL: required control $1"; fail=$((fail+1)); return 1; }; }
has_text() {
  dump_ui
  python3 - "$1" <<'PY2'
import sys,xml.etree.ElementTree as ET
want=sys.argv[1].lower()
root=ET.parse('shots/ui.xml').getroot()
sys.exit(0 if any(want in ' '.join(n.get(k,'') for k in ['text','content-desc']).lower() for n in root.iter('node')) else 1)
PY2
}
require_text() { has_text "$1" || { echo "FAIL: expected UI text $1"; fail=$((fail+1)); return 1; }; }
scroll_tap() {
  for attempt in 1 2 3 4 5; do
    TAP_TRIES=1 tap_text "$1" "" "" && return 0
    adb shell input swipe $((W/2)) $((H*78/100)) $((W/2)) $((H*35/100)) 350
    sleep 1
  done
  echo "FAIL: scroll target $1"; fail=$((fail+1)); return 1
}
shot tur-hosgeldin
required_tap "Turu başlat"; sleep 3; shot tur-asistan
require_text "İstediğin bölüme geç"
required_tap "Turu geç"; sleep 3; shot ana-ekran
# Test keyboard entry without sending a billable/cloud AI request.
required_tap "@edit"; sleep 2
adb shell input text "Audit"; sleep 1; shot klavye-ana
adb shell dumpsys input_method | grep -E "mInputShown|mIsInputViewShown" | head -3
adb shell input keyevent 4; sleep 1
# Open the real mobile feature hub and complete an offline practice through native accessibility controls.
required_tap "Araçlar"; sleep 2
required_tap "@edit"; adb shell input text "aktarim"; sleep 2; adb shell input keyevent 4; sleep 1
required_tap "Bilgiyi Başka Yerde Kullan"; sleep 2; shot aktarim-giris
require_text "Aynı kavram"
scroll_tap "Başla / devam et"; sleep 2
for task in 1 2 3; do
  required_tap "@radio"
  scroll_tap "Yanıtımı kontrol et"; sleep 1; shot "aktarim-yanit-$task"
  if [ "$task" -lt 3 ]; then scroll_tap "Sonraki görev"; else scroll_tap "Sonuçları gör"; fi
  sleep 1
 done
require_text "Çalışma tamamlandı"; shot aktarim-sonuc

# CI emulator/ADB can disconnect *after* the final successful UI assertion.
# Reconnect before verifying the live app and reading crash logs; never treat
# an offline emulator as an application crash or silently pass without checking.
device_ready=0
for attempt in 1 2 3 4 5 6 7 8 9 10; do
  if [ "$(adb get-state 2>/dev/null || true)" = "device" ] &&
     [ "$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r' || true)" = "1" ]; then
    device_ready=1
    break
  fi
  echo "ADB offline after completed UI test (attempt $attempt): checking emulator connection"
  if [ "$attempt" -eq 2 ] || [ "$attempt" -eq 5 ]; then
    adb kill-server || true
    adb start-server || true
  fi
  sleep 3
done
if [ "$device_ready" -ne 1 ]; then
  echo "FAIL: emulator remained offline after UI test; cannot verify running app or crash logs"
  exit 1
fi
adb logcat -d > shots/android-logcat.txt
pidof_app=$(adb shell pidof $APP || true)
# Retain all logs, but distinguish the app/its WebView from unrelated emulator tools.
if ! python3 tools/check-android-log.py shots/android-logcat.txt "$APP" "$pidof_app" > shots/crash-summary.json; then
  echo "FAIL: app/WebView fatal exception or unavailable crash verification"; fail=$((fail+1))
fi
cat shots/crash-summary.json
echo "app pid: $pidof_app; required UI failures: $fail"
test -n "$pidof_app" && test "$fail" -eq 0
