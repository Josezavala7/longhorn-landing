import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const PORT = 8181;

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml',
};

function startServer() {
  const server = createServer(async (req, res) => {
    const path = req.url === '/' ? '/index.html' : req.url.split('?')[0];
    try {
      const data = await readFile(join(ROOT, path));
      res.writeHead(200, { 'Content-Type': MIME[extname(path)] || 'application/octet-stream' });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('not found');
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

export const checks = [];

async function run() {
  const server = await startServer();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('pageerror', (err) => consoleErrors.push(String(err)));
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });

  await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle' });

  let failed = 0;
  for (const { name, fn } of checks) {
    try {
      await fn(page);
      console.log(`PASS: ${name}`);
    } catch (err) {
      failed++;
      console.error(`FAIL: ${name} -> ${err.message}`);
    }
  }

  if (consoleErrors.length) {
    failed++;
    console.error(`FAIL: console had errors -> ${consoleErrors.join(' | ')}`);
  } else {
    console.log('PASS: no console errors');
  }

  await browser.close();
  server.close();
  process.exit(failed ? 1 : 0);
}

checks.push({
  name: 'page has correct title',
  fn: async (page) => {
    const title = await page.title();
    if (!title.includes('Longhorn')) throw new Error(`unexpected title: ${title}`);
  },
});

checks.push({
  name: 'all six section anchors exist',
  fn: async (page) => {
    for (const id of ['hero', 'services', 'gallery', 'about', 'areas', 'contact']) {
      const count = await page.locator(`#${id}`).count();
      if (count !== 1) throw new Error(`missing #${id}`);
    }
  },
});

run();
