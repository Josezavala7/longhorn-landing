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
    await page.waitForFunction(
      () => document.getElementById('site-header').classList.contains('is-scrolled'),
      { timeout: 2000 }
    ).catch(() => {});
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

checks.push({
  name: 'hero call CTA has correct tel href',
  fn: async (page) => {
    const href = await page.locator('.hero .btn--call').getAttribute('href');
    if (href !== 'tel:+13465518340') throw new Error(`unexpected href: ${href}`);
  },
});

checks.push({
  name: 'hero background image loads without 404',
  fn: async (page) => {
    const status = await page.evaluate(async () => {
      const res = await fetch('assets/gallery/hero-firepit-dusk.jpg');
      return res.status;
    });
    if (status !== 200) throw new Error(`hero image status ${status}`);
  },
});

checks.push({
  name: 'hero title switches language',
  fn: async (page) => {
    await page.click('.lang-toggle__option[data-lang="es"]');
    const text = await page.locator('.hero__title').textContent();
    if (!text.includes('Elevando')) throw new Error(`unexpected hero title: ${text}`);
    await page.click('.lang-toggle__option[data-lang="en"]');
  },
});

checks.push({
  name: 'trust counters animate to target value on scroll into view',
  fn: async (page) => {
    await page.locator('.trust').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    const value = await page.locator('.counter[data-target="5"]').textContent();
    if (value.trim() !== '5') throw new Error(`counter did not reach target, got "${value.trim()}"`);
  },
});

checks.push({
  name: 'services grid renders exactly 15 cards',
  fn: async (page) => {
    const count = await page.locator('.service-card').count();
    if (count !== 15) throw new Error(`expected 15 service cards, got ${count}`);
  },
});

checks.push({
  name: 'service card text switches language',
  fn: async (page) => {
    await page.click('.lang-toggle__option[data-lang="es"]');
    const text = await page.locator('[data-i18n="services.items.turf.title"]').textContent();
    if (text.trim() !== 'Césped Sintético') throw new Error(`unexpected: ${text}`);
    await page.click('.lang-toggle__option[data-lang="en"]');
  },
});

checks.push({
  name: 'gallery renders exactly 17 items',
  fn: async (page) => {
    const count = await page.locator('.gallery__item').count();
    if (count !== 17) throw new Error(`expected 17 gallery items, got ${count}`);
  },
});

checks.push({
  name: 'clicking a gallery item opens the lightbox, Escape closes it',
  fn: async (page) => {
    await page.locator('.gallery__item').first().click();
    const isOpen = await page.evaluate(() => document.getElementById('lightbox').classList.contains('is-open'));
    if (!isOpen) throw new Error('lightbox did not open');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);
    const stillOpen = await page.evaluate(() => document.getElementById('lightbox').classList.contains('is-open'));
    if (stillOpen) throw new Error('lightbox did not close on Escape');
  },
});

checks.push({
  name: 'areas section lists all 10 cities',
  fn: async (page) => {
    const count = await page.locator('.city-chip').count();
    if (count !== 10) throw new Error(`expected 10 city chips, got ${count}`);
    const text = await page.locator('.city-chip').nth(5).textContent();
    if (text.trim() !== 'Missouri City') throw new Error(`unexpected 6th city: ${text}`);
  },
});

checks.push({
  name: 'about heading switches language',
  fn: async (page) => {
    await page.click('.lang-toggle__option[data-lang="es"]');
    const text = await page.locator('[data-i18n="about.heading"]').textContent();
    if (!text.includes('Grabado en Piedra')) throw new Error(`unexpected: ${text}`);
    await page.click('.lang-toggle__option[data-lang="en"]');
  },
});

checks.push({
  name: 'contact form shows native validation error on empty required field',
  fn: async (page) => {
    await page.locator('#contact-form button[type="submit"]').click();
    const isInvalid = await page.evaluate(() => !document.querySelector('#contact-form input[name="name"]').checkValidity());
    if (!isInvalid) throw new Error('empty required field did not fail validation');
  },
});

checks.push({
  name: 'footer contains all nav anchor links',
  fn: async (page) => {
    for (const id of ['hero', 'services', 'gallery', 'about', 'areas', 'contact']) {
      const href = await page.locator(`.site-footer__nav a[href="#${id}"]`).count();
      if (href !== 1) throw new Error(`missing footer link to #${id}`);
    }
  },
});

checks.push({
  name: 'reveal elements become visible after scrolling into view',
  fn: async (page) => {
    await page.locator('#services').scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    const anyVisible = await page.evaluate(() =>
      document.querySelectorAll('.service-card.reveal.is-visible').length > 0
    );
    if (!anyVisible) throw new Error('no service cards gained is-visible after scrolling into view');
  },
});

checks.push({
  name: 'no horizontal scroll at 375px mobile viewport',
  fn: async (page) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const overflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    if (overflowing) throw new Error('page has horizontal overflow at 375px width');
    await page.setViewportSize({ width: 1280, height: 900 });
  },
});

checks.push({
  name: 'why-us section renders exactly 4 cards and switches language',
  fn: async (page) => {
    const count = await page.locator('.why-us__card').count();
    if (count !== 4) throw new Error(`expected 4 why-us cards, got ${count}`);
    await page.click('.lang-toggle__option[data-lang="es"]');
    const text = await page.locator('[data-i18n="whyUs.items.oneTeam.title"]').textContent();
    if (!text.includes('Un Solo Equipo')) throw new Error(`unexpected: ${text}`);
    await page.click('.lang-toggle__option[data-lang="en"]');
  },
});

run();
