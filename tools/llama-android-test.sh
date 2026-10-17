#!/usr/bin/env bash
# Emülatörde derlenen llama-server'ı küçük bir modelle çalıştırır (CI denemesi).
exec >> sonuc/emulator.txt 2>&1
set -x
curl -sL -o /tmp/kucuk.gguf https://huggingface.co/ggml-org/models/resolve/main/tinyllamas/stories15M-q4_0.gguf
ls -la /tmp/kucuk.gguf
adb push llama-android/x86_64/libllama-server.so /data/local/tmp/llama-server
adb push /tmp/kucuk.gguf /data/local/tmp/kucuk.gguf
adb shell chmod 755 /data/local/tmp/llama-server
timeout 30 adb shell /data/local/tmp/llama-server --version
# Arka planda başlat (adb shell bağlantısı açık kalmasın diye tüm akışlar dosyaya / boşa)
timeout 20 adb shell "cd /data/local/tmp && (./llama-server -m kucuk.gguf --host 127.0.0.1 --port 8090 -c 512 > srv.log 2>&1 < /dev/null &) ; sleep 1" || true
adb forward tcp:8090 tcp:8090
for i in $(seq 1 60); do curl -sf http://127.0.0.1:8090/health && break; sleep 1; done
echo
curl -s -m 120 -H "Origin: https://localhost" -D - http://127.0.0.1:8090/v1/chat/completions -H 'content-type: application/json' \
  -d '{"messages":[{"role":"user","content":"Once upon a time"}],"max_tokens":30}'
echo
adb shell tail -20 /data/local/tmp/srv.log
true
