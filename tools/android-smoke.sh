#!/usr/bin/env bash
# Android açılış testi (GitHub Actions'taki emülatörde çalışır): APK'yı kurar, açar, ekran görüntüsü alır.
set -x
APK=$(ls apk/*.apk | head -1)
adb install -r "$APK"
adb shell am start -W -n com.dersasistani.app/.MainActivity
sleep 20
adb exec-out screencap -p > shots/android-home.png
# Konu anlatımı sayfası (uygulama içi bağlantı)
adb shell input keyevent 82 || true
adb logcat -d > shots/android-logcat.txt || true
grep -iE "Capacitor|chromium|Console|AndroidRuntime" shots/android-logcat.txt | tail -80
pidof_app=$(adb shell pidof com.dersasistani.app)
echo "app pid: $pidof_app"
test -n "$pidof_app"
