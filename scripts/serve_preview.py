#!/usr/bin/env python3
"""Local Cloudflare Pages-style static preview with the candidate CSP enforced."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit, unquote

root = Path("_site").resolve()
headers = {}
for line in (root / "_headers").read_text().splitlines():
    if line.startswith("  ") and ":" in line:
        name, value = line.strip().split(":", 1)
        headers[name] = value.strip()
# Browser smoke tests exercise the future enforcing policy before promotion.
headers["Content-Security-Policy"] = headers.pop("Content-Security-Policy-Report-Only", headers.get("Content-Security-Policy", ""))

class Handler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

    def do_GET(self):
        path = unquote(urlsplit(self.path).path)
        candidate = root / path.lstrip("/")
        if not candidate.exists() and candidate.with_suffix(".html").is_file():
            self.path = path + ".html"
        elif not candidate.exists():
            self.send_response(404)
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write((root / "404.html").read_bytes())
            return
        super().do_GET()

    def end_headers(self):
        for name, value in headers.items():
            self.send_header(name, value)
        super().end_headers()

ThreadingHTTPServer(("127.0.0.1", 4173), partial(Handler, directory=str(root))).serve_forever()
