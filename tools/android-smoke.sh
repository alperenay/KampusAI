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
adb install -r "$APK"
# Emülatörde donanım klavyesi tanımlı: ekran klavyesi yine de açılsın (gerçek telefon gibi)
adb shell settings put secure show_ime_with_hard_keyboard 1 || true
adb shell pm grant $APP android.permission.POST_NOTIFICATIONS || true
# Gömülü yapay zeka motoru kurulumda çıkarılmış ve çalışıyor mu?
APKDIR=$(adb shell pm path $APP | head -1 | sed 's/^package://; s#/base.apk.*##' | tr -d '\r')
adb shell ls -la "$APKDIR/lib/x86_64/" || true
adb shell run-as $APP "$APKDIR/lib/x86_64/libllama-server.so" --version || echo "yapay zeka motoru çalışmadı"
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
for n in root.iter("node"):
    hay = " ".join(n.get(k, "") for k in ("text", "content-desc", "hint")).lower()
    if (edit and n.get("class", "").endswith("EditText")) or (not edit and want in hay):
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

shot tur-hosgeldin
tap_text "Turu başlat" 0.75 0.62; sleep 4; shot tur-asistan
for i in 1 2 3 4 5 6 7; do tap_text "İleri" 0.85 0.93; sleep 3; done
shot tur-hatirlatici
tap_text "Hatırlatıcıları aç"; sleep 10; shot tur-hatirlatici-acik
echo "== bildirimler"; adb shell dumpsys notification --noredact | grep -iE "pkg=$APP|android.title=|android.text=" | head -20
echo "== alarmlar"; adb shell dumpsys alarm | grep -c "$APP" || true
tap_text "İleri" 0.85 0.93; sleep 4; shot tur-konular
tap_text "Turu geç" 0.85 0.06; sleep 4; shot ana-ekran

# Klavye testi: yazı kutusuna dokun, yaz → kutu klavyenin üstünde görünmeli
tap_text "@edit" 0.5 0.42; sleep 3
adb shell input text "Merhaba"; sleep 3; shot klavye-ana
adb shell dumpsys input_method | grep -E "mInputShown|mIsInputViewShown" | head -3
adb shell input keyevent 66; sleep 15; shot sohbet-yanit
tap_text "@edit" 0.5 0.86; sleep 3
adb shell input text "Turev"; sleep 3; shot klavye-sohbet
adb shell dumpsys input_method | grep -E "mInputShown|mIsInputViewShown" | head -3
adb shell input keyevent 4; sleep 2; shot klavye-kapali

adb logcat -d > shots/android-logcat.txt || true
grep -iE "Capacitor|chromium|Console|AndroidRuntime|LN" shots/android-logcat.txt | tail -80
pidof_app=$(adb shell pidof $APP)
echo "app pid: $pidof_app"
test -n "$pidof_app"
