import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname);
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".webp": "image/webp", ".png": "image/png",
  ".svg": "image/svg+xml", ".ico": "image/x-icon",
  ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8"
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, "")
    .replace(/^river-kolpa-apartments[/\\]/, "");
  const file = resolve(ROOT, rel || "index.html");
  if (!file.startsWith(ROOT)) return void res.writeHead(403).end();
  try {
    if ((await stat(file)).isDirectory()) throw new Error("dir");
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream", "Cache-Control": "no-store" });
    res.end(body);
  } catch {
    const n404 = await readFile(join(ROOT, "404.html"));
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    res.end(n404);
  }
});

const port = Number(process.argv[2] ?? 4173);
server.listen(port, "127.0.0.1", () => console.log(`serving ${ROOT} on http://localhost:${port}`));
