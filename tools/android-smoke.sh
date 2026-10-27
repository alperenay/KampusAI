#!/usr/bin/env bash
# Android açılış testi (GitHub Actions'taki emülatörde çalışır):
#   APK'yı kurar ve açar → ilk açılış tanıtım turu → hatırlatıcıları açar (bildirim izni)
#   → turu geçer → yazı kutusuna dokunup klavyeyi açar (kutu klavyenin üstünde mi?)
# Her adımda ekran görüntüsü alınır (shots/), sonuçlar ci-sonuc-android dalına yazılır.
mkdir -p shots
exec > >(tee shots/report.txt) 2>&1   # günlük dala da yazılsın (Actions günlükleri okunamıyor)
set -x
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

# Ekrandaki (WebView dahil) bir yazıyı bul ve dokun; bulunamazsa verilen oransal konuma dokun
tap_text() {
  local text="$1" fx="$2" fy="$3" xy=""
  for try in 1 2 3; do
    adb shell uiautomator dump /sdcard/ui.xml >/dev/null 2>&1 && adb pull /sdcard/ui.xml shots/ui.xml >/dev/null 2>&1
    xy=$(python3 - "$text" <<'PY'
import sys, re, xml.etree.ElementTree as ET
want = sys.argv[1].lower()
try: root = ET.parse("shots/ui.xml").getroot()
except Exception: sys.exit(0)
best = None
edit = want == "@edit"
radio = want == "@radio"
for n in root.iter("node"):
    hay = " ".join(n.get(k, "") for k in ("text", "content-desc", "hint")).lower()
    if (edit and n.get("class", "").endswith("EditText")) or (radio and n.get("class", "").endswith("RadioButton")) or (not edit and not radio and want in hay):
        m = re.findall(r"\d+", n.get("bounds", ""))
        if len(m) == 4:
            x1, y1, x2, y2 = map(int, m)
            if x2 > x1 and y2 > y1:
                area = (x2 - x1) * (y2 - y1)
                if edit: area = -y1             # en alttaki yazı alanı
                if best is None or area < best[0]: best = (area, (x1 + x2) // 2, (y1 + y2) // 2)
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
  adb shell uiautomator dump /sdcard/ui.xml >/dev/null 2>&1
  adb pull /sdcard/ui.xml shots/ui.xml >/dev/null 2>&1
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
    tap_text "$1" "" "" && return 0
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
adb logcat -d > shots/android-logcat.txt || true
if grep -q "FATAL EXCEPTION" shots/android-logcat.txt; then echo "FAIL: Android fatal exception"; fail=$((fail+1)); fi
pidof_app=$(adb shell pidof $APP)
echo "app pid: $pidof_app; required UI failures: $fail"
test -n "$pidof_app" && test "$fail" -eq 0
