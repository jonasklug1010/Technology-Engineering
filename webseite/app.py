from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os


HOST = "127.0.0.1"
PORT = 8000
WEB_ROOT = Path(__file__).resolve().parent


class ANRRequestHandler(SimpleHTTPRequestHandler):
    """Serves the existing ANR frontend without changing design or data."""

    def do_GET(self):
        if self.path in ("/", "/index.html"):
            self.path = "/start.html"
        super().do_GET()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def run_server():
    os.chdir(WEB_ROOT)
    server = ThreadingHTTPServer((HOST, PORT), ANRRequestHandler)
    print(f"ANR-Weboberflaeche laeuft unter http://{HOST}:{PORT}/start.html")
    server.serve_forever()


if __name__ == "__main__":
    run_server()
