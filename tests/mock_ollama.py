"""Ollama API taklidi (test için).
- /api/tags, /api/chat (NDJSON akış), /api/embed
- CORS: Ollama'nın varsayılan izin listesi (localhost/127.0.0.1/0.0.0.0 her port, app:// file:// ...)
  Tarayıcı file:// sayfalarından Origin: null gönderir → reddedilir (gerçek Ollama gibi).
- /mock/log, /mock/reset, /mock/config: test denetimi
"""
import json, re, time, threading, hashlib, math, sys
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler

STATE = {"models": ["qwen2.5:14b", "bge-m3:latest", "qwen2.5vl:7b"], "log": [], "delay": 0.02}
LOCK = threading.Lock()
ALLOWED = re.compile(r"^(https?://(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?|(app|file|tauri|vscode-webview|vscode-file)://.*)$")

def has_model(name):
    n = lambda s: s.lower().replace(":latest", "")
    return any(n(m) == n(name) for m in STATE["models"])

TOPICS = [
    ("exam", ["deneme", "net", "exam", "score", "doğru", "yanlış", "türkçe", "matematik", "tyt", "ayt"]),
    ("plan", ["program", "pazartesi", "salı", "çarşamba", "perşembe", "cuma", "cumartesi", "pazar", "bugün", "çalış", "schedule", "today", "study"]),
    ("note", ["not", "notum", "notlar", "note"]),
    ("lesson", ["konu", "anlatım", "kazanım", "örnek", "hap", "lesson"]),
]

def embed(text):
    t = text.lower()
    v = [0.0] * 1024
    for i, (_, words) in enumerate(TOPICS):
        hits = sum(t.count(w) for w in words)
        v[i] = min(6.0, hits * 1.5)
    for tok in re.findall(r"\w+", t):
        for j in range(max(1, len(tok) - 2)):
            h = int(hashlib.md5(tok[j:j + 3].encode()).hexdigest(), 16)
            v[8 + h % 1000] += 0.15 * (1 if (h >> 12) & 1 else -1)
    norm = math.sqrt(sum(x * x for x in v)) or 1
    return [x / norm for x in v]

class H(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    def log_message(self, *a): pass

    def cors(self):
        origin = self.headers.get("Origin")
        if origin is None:
            return True
        if ALLOWED.match(origin):
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
            return True
        return False

    def reject(self):
        self.send_response(403); self.send_header("Content-Length", "0"); self.end_headers()

    def json(self, code, obj):
        body = json.dumps(obj).encode()
        self.send_response(code)
        if not self.cors(): pass
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers(); self.wfile.write(body)

    def do_OPTIONS(self):
        origin = self.headers.get("Origin")
        if origin is not None and not ALLOWED.match(origin):
            return self.reject()
        self.send_response(204)
        self.cors()
        self.send_header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Authorization,Content-Type,User-Agent,Accept,X-Requested-With")
        self.send_header("Content-Length", "0")
        self.end_headers()

    def body(self):
        n = int(self.headers.get("Content-Length") or 0)
        return json.loads(self.rfile.read(n) or b"{}")

    def origin_ok(self):
        o = self.headers.get("Origin")
        if o is not None and not ALLOWED.match(o):
            self.reject(); return False
        return True

    def do_GET(self):
        if self.path.startswith("/mock/log"):
            with LOCK: return self.json(200, STATE["log"])
        if not self.origin_ok(): return
        if self.path == "/api/version":
            return self.json(200, {"version": "0.12.3"})
        if self.path == "/api/tags":
            return self.json(200, {"models": [{"name": m, "model": m} for m in STATE["models"]]})
        if self.path == "/api/ps":
            r = STATE.get("vram_ratio", 1.0)
            return self.json(200, {"models": [{"name": "qwen2.5:14b", "model": "qwen2.5:14b", "size": 10000, "size_vram": int(10000 * r)}]})
        self.json(404, {"error": "404 page not found"})

    def do_POST(self):
        if self.path == "/mock/reset":
            self.body()
            with LOCK: STATE["log"].clear()
            return self.json(200, {"ok": True})
        if self.path == "/mock/config":
            b = self.body()
            with LOCK: STATE.update(b)
            return self.json(200, {"ok": True})
        if not self.origin_ok(): return
        b = self.body()
        model = b.get("model", "")
        if self.path == "/api/embed":
            if not has_model(model):
                return self.json(404, {"error": f'model "{model}" not found, try pulling it first'})
            inputs = b["input"] if isinstance(b["input"], list) else [b["input"]]
            with LOCK: STATE["log"].append({"path": "embed", "model": model, "n": len(inputs), "inputs": [i[:120] for i in inputs], "options": b.get("options")})
            return self.json(200, {"model": model, "embeddings": [embed(i) for i in inputs]})
        if self.path == "/api/generate":
            with LOCK: STATE["log"].append({"path": "generate", "model": model, "keep_alive": b.get("keep_alive")})
            return self.json(200, {"model": model, "done": True})
        if self.path == "/api/chat":
            if not has_model(model):
                return self.json(404, {"error": f'model "{model}" not found, try pulling it first'})
            msgs = b.get("messages", [])
            system = next((m["content"] for m in msgs if m["role"] == "system"), "")
            last = msgs[-1] if msgs else {}
            entry = {"path": "chat", "model": model, "n_messages": len(msgs), "system": system,
                     "user": last.get("content", ""), "images": len(last.get("images") or []),
                     "options": b.get("options"), "stream": b.get("stream"), "keep_alive": b.get("keep_alive"),
                     "roles": [m["role"] for m in msgs]}
            with LOCK: STATE["log"].append(entry)
            text = self.answer(model, system, last.get("content", ""), entry["images"])
            return self.stream(model, text)
        self.json(404, {"error": "404 page not found"})

    def answer(self, model, system, user, images):
        if "vl" in model:
            if not images:
                return "[görsel yok]"
            return ("**Soru:** $x^2 - 5x + 6 = 0$ denkleminin köklerinin toplamı kaçtır?\n\n"
                    "A) 2  B) 3  C) 5  D) 6  E) 7")
        lines = []
        if "uzun" in user.lower() or "long" in user.lower():
            return " ".join(["Bu uzun bir anlatımın parçasıdır."] * 200)
        if "FOTOĞRAFTAN OKUNAN" in user or "READ FROM PHOTO" in user:
            return ("### Çözüm\n\nDenklem $x^2 - 5x + 6 = 0$ çarpanlarına ayrılır:\n\n$$(x-2)(x-3)=0$$\n\n"
                    "Kökler $x_1 = 2$ ve $x_2 = 3$, toplamları $2+3=5$.\n\n**Cevap: C**")
        if "Reply in the language" in system:
            return "Hello! The quadratic formula is $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$.\n\n- Step 1\n- Step 2"
        if "formül" in user.lower():
            return ("İkinci dereceden denklemin kökleri:\n\n$$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$\n\n"
                    "1. Önce $\\Delta = b^2 - 4ac$ hesaplanır.\n2. Sonra formülde yerine konur.")
        if "ÖĞRENCİ VERİLERİ (" in system or "STUDENT DATA (" in system:
            m = re.search(r"Son deneme: ([^\n]+?)\.", system)
            n_rec = system.count("[Kayıt ") + system.count("[Record ")
            lines.append(f"Kayıtlarına baktım ({n_rec} kayıt + genel özet).")
            if m: lines.append(f"**Son denemen:** {m.group(1)}.")
            if "en zayıf ders" in system:
                w = re.search(r"en zayıf ders: ([^\n]+)", system)
                if w: lines.append(f"- Oransal olarak en zayıf olduğun ders: {w.group(1)}")
            lines.append("")
            lines.append("| Ders | Durum |\n|---|---|\n| Türkçe | iyi |\n| Matematik | geliştirilmeli |")
            return "\n".join(lines)
        lang_en = "Reply in the language" in system
        if lang_en:
            return "Hello! The quadratic formula is $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$.\n\n- Step 1\n- Step 2"
        return ("Merhaba! İkinci dereceden denklemin kökleri:\n\n$$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$\n\n"
                "1. Önce $\\Delta = b^2 - 4ac$ hesaplanır.\n2. Sonra formülde yerine konur.\n\n`kod` ve **kalın** yazı.")

    def stream(self, model, text):
        self.send_response(200)
        self.cors()
        self.send_header("Content-Type", "application/x-ndjson")
        self.send_header("Transfer-Encoding", "chunked")
        self.end_headers()
        def chunk(obj):
            data = (json.dumps(obj, ensure_ascii=False) + "\n").encode()
            self.wfile.write(f"{len(data):X}\r\n".encode() + data + b"\r\n"); self.wfile.flush()
        try:
            pieces = re.findall(r"\S+\s*|\s+", text)
            for p in pieces:
                chunk({"model": model, "message": {"role": "assistant", "content": p}, "done": False})
                time.sleep(STATE["delay"])
            chunk({"model": model, "message": {"role": "assistant", "content": ""}, "done": True,
                   "total_duration": 1_500_000_000, "load_duration": 100_000_000, "eval_count": len(pieces), "eval_duration": 1_000_000_000})
            self.wfile.write(b"0\r\n\r\n"); self.wfile.flush()
        except (BrokenPipeError, ConnectionResetError):
            with LOCK: STATE["log"].append({"path": "chat-aborted", "model": model})

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 11434
    ThreadingHTTPServer(("127.0.0.1", port), H).serve_forever()
