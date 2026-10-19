"""Baslat.bat sunucusunun Python taklidi: statik dosyalar + /ollama -> 127.0.0.1:11434 (akışlı)."""
import http.client, os, sys
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
ROOT = sys.argv[1]; LOG = []
class H(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    def __init__(self, *a, **k): super().__init__(*a, directory=ROOT, **k)
    def log_message(self, *a): pass
    def proxy(self):
        path = self.path[len("/ollama"):] or "/"
        n = int(self.headers.get("Content-Length") or 0)
        body = self.rfile.read(n) if n else None
        with open(os.path.join(os.path.dirname(__file__), "proxy.log"), "a") as f: f.write(self.command + " " + path + "\n")
        try:
            c = http.client.HTTPConnection("127.0.0.1", 11434, timeout=600)
            c.request(self.command, path, body=body, headers={"Content-Type": "application/json"} if body else {})
            r = c.getresponse()
        except OSError:
            msg = b'{"error":"ollama unreachable"}'
            self.send_response(502); self.send_header("Content-Type", "application/json"); self.send_header("Content-Length", str(len(msg))); self.end_headers(); self.wfile.write(msg); return
        self.send_response(r.status)
        self.send_header("Content-Type", r.getheader("Content-Type") or "application/json")
        self.send_header("Transfer-Encoding", "chunked"); self.end_headers()
        try:
            while True:
                chunk = r.read1(16384) if hasattr(r, "read1") else r.read(16384)
                if not chunk: break
                self.wfile.write(f"{len(chunk):X}\r\n".encode() + chunk + b"\r\n"); self.wfile.flush()
            self.wfile.write(b"0\r\n\r\n")
        except (BrokenPipeError, ConnectionResetError):
            c.close()
    def do_GET(self):
        if self.path.startswith("/ollama/"): return self.proxy()
        return super().do_GET()
    def do_POST(self):
        if self.path.startswith("/ollama/"): return self.proxy()
        self.send_error(404)
ThreadingHTTPServer(("127.0.0.1", 8765), H).serve_forever()
