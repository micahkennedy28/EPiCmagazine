import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 24895;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.txt': 'text/plain',
};

const ROUTES = {
  '/': '/index.html',
  '/about': '/about.html',
  '/team': '/team.html',
  '/magazine': '/magazine.html',
  '/impact': '/impact.html',
  '/contact': '/contact.html',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];

  if (ROUTES[urlPath]) {
    urlPath = ROUTES[urlPath];
  }

  const filePath = path.join(PUBLIC_DIR, urlPath);

  const normalizedPublic = path.resolve(PUBLIC_DIR);
  const normalizedFile = path.resolve(filePath);
  if (!normalizedFile.startsWith(normalizedPublic)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(PUBLIC_DIR, '404.html'), (err2, data2) => {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(err2 ? '<h1>404 - Page Not Found</h1>' : data2);
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`E.P.i.C. Magazine running on port ${PORT}`);
});
