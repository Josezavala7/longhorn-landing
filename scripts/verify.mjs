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

checks.push({
  name: 'language toggle switches nav text to Spanish',
  fn: async (page) => {
    await page.click('.lang-toggle__option[data-lang="es"]');
    const text = await page.locator('.site-nav a[href="#hero"]').textContent();
    if (text.trim() !== 'Inicio') throw new Error(`expected "Inicio", got "${text.trim()}"`);
    await page.click('.lang-toggle__option[data-lang="en"]');
  },
});

checks.push({
  name: 'header gains is-scrolled class after scrolling',
  fn: async (page) => {
    await page.evaluate(() => {
      document.body.style.minHeight = '3000px';
      window.scrollTo(0, 200);
    });
    await page.waitForTimeout(100);
    const hasClass = await page.evaluate(() => document.getElementById('site-header').classList.contains('is-scrolled'));
    await page.evaluate(() => {
      window.scrollTo(0, 0);
      document.body.style.minHeight = '';
    });
    if (!hasClass) throw new Error('site-header did not gain is-scrolled class');
  },
});

checks.push({
  name: 'mobile nav toggle opens navigation at narrow viewport',
  fn: async (page) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.click('#nav-toggle');
    const isOpen = await page.evaluate(() => document.getElementById('site-nav').classList.contains('is-open'));
    if (!isOpen) throw new Error('site-nav did not open on mobile toggle click');
    await page.setViewportSize({ width: 1280, height: 900 });
  },
});

run();
