/**
 * Servidor estático mínimo para testar o site localmente (mesmo comportamento do GitHub Pages
 * para o que importa aqui: arquivos da raiz e 404.html).
 *
 *   npx tsx scripts/serve.ts [porta]
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

export const serve = (port = 4173): Promise<Server> =>
  new Promise((ok) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url ?? '/', 'http://x');
      let file = join(ROOT, decodeURIComponent(url.pathname));
      if (!file.startsWith(ROOT)) file = join(ROOT, '404.html');
      if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
      const found = existsSync(file);
      if (!found) file = join(ROOT, '404.html');
      res.writeHead(found ? 200 : 404, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
      createReadStream(file).pipe(res);
    });
    server.listen(port, () => ok(server));
  });

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.argv[2] ?? 4173);
  await serve(port);
  console.log(`http://localhost:${port}/`);
}
