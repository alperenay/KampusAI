#!/bin/sh
# Ders Asistani — macOS / Linux başlatıcısı (Python 3 gerekir)
# Siteyi http://localhost:8765 adresinde açar. Kapatmak için Ctrl+C.
cd "$(dirname "$0")" || exit 1
PORT=8765
URL="http://localhost:$PORT/"
if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3 bulunamadı. Kurup tekrar deneyin."; exit 1
fi
( sleep 1; if command -v xdg-open >/dev/null 2>&1; then xdg-open "$URL"; else open "$URL"; fi ) >/dev/null 2>&1 &
echo "Ders Asistanı açılıyor: $URL  (kapatmak için Ctrl+C)"
exec python3 -m http.server "$PORT" --bind 127.0.0.1
