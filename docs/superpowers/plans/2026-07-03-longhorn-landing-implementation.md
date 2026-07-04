# Longhorn Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a single-page, bilingual (EN default / ES toggle), dark premium landing page for Longhorn Hardscape & Construction, reusing the client's real logo, real project photos, and real business copy.

**Architecture:** Static HTML/CSS/vanilla JS, no build step, no external runtime dependencies. A `data-i18n` attribute system swaps text between English and Spanish client-side. Playwright (dev-only, not shipped) is used to verify interactive behavior during implementation.

**Tech Stack:** HTML5, CSS3 (custom properties, Grid/Flexbox, Intersection Observer via JS), vanilla JS (no frameworks), Node + Playwright for verification scripts only, `sharp` (one-off, dev-only) for image optimization.

## Global Constraints

- Design spec: `docs/superpowers/specs/2026-07-03-longhorn-landing-design.md` — follow it for anything not explicitly repeated here.
- Colors: `--bg:#0a0a0a` `--bg-alt:#141210` `--surface:#1c1916` `--border:#2a251f` `--text:#f5f0e8` `--text-muted:#a8a199` `--accent-start:#d9b68c` `--accent-end:#b8763e` `--accent-dark:#8b5a2b`.
- Typography: serif stack `Georgia, 'Iowan Old Style', 'Times New Roman', serif` for headings, system sans stack for body — no external font downloads.
- Default language is English (`en`); Spanish (`es`) toggled client-side, preference persisted in `localStorage` key `longhorn-lang`.
- Primary CTA everywhere: call/text `(346) 551-8340` (`tel:+13465518340`).
- Business info: Longhorn Hardscape & Construction, 6140 Highway 6, Suite 3116, Missouri City, TX 77459. Email `info@longhornhctx.com`. Hours Mon–Fri 9:00 AM–5:00 PM. Founder: Cesar Guifarro (Co-Founder), 5+ years experience.
- Areas served (exact 10 cities, do not add/remove): Alvin, Cypress, Fulshear, Katy, Manvel, Missouri City, Pearland, Richmond, Rosenberg, Sugar Land.
- No financing section — omit entirely per client decision (a one-line mention near contact is allowed, no dedicated section).
- No backend: contact form submits via a generated `mailto:` link, no server, no third-party form service.
- Source real photos live at `/tmp/claude-1000/-home-mario-proyectos-longhorn-landing/19a5487c-bc44-44ba-bfbb-cf759d8dc0a5/scratchpad/images/gallery/g01.jpg` … `g22.jpg` (already downloaded from the client's real gallery on their old site). Never use the old site's generic stock photos (`project1.jpg`–`project5.jpg` in the same scratchpad `images/` folder) — those are stock, not real client work.

---

### Task 1: Curate and optimize real project photos

**Files:**
- Create: `scripts/optimize-images.mjs` (one-off dev utility, committed for reproducibility, not loaded by the site)
- Create: `package.json` (devDependency: `sharp`)
- Create: `.gitignore`
- Create: `assets/gallery/` (17 output files — see mapping below)
- Create: `assets/logo.png` (copy of existing logo)

**Interfaces:**
- Produces: final optimized image filenames under `assets/gallery/` that every later task references by exact name.

Exact source → output mapping (source files are the real gallery photos already downloaded to scratchpad; quality 78, `mozjpeg` disabled — use default `jpeg` encoder is fine):

| Output file | Source | Max width |
|---|---|---|
| `hero-backyard-oasis.jpg` | `g16.jpg` | 1920 |
| `gallery-backyard-pool-2.jpg` | `g22.jpg` | 1400 |
| `gallery-firepit-dusk.jpg` | `g07.jpg` | 1400 |
| `gallery-firepit-circular.jpg` | `g21.jpg` | 1400 |
| `gallery-geometric-turf.jpg` | `g15.jpg` | 1400 |
| `gallery-travertine-diamond.jpg` | `g14.jpg` | 1400 |
| `gallery-herringbone-patio.jpg` | `g20.jpg` | 1400 |
| `gallery-putting-green.jpg` | `g13.jpg` | 1400 |
| `gallery-lattice-turf.jpg` | `g09.jpg` | 1400 |
| `gallery-turf-pavers-clean.jpg` | `g12.jpg` | 1400 |
| `gallery-turf-corner.jpg` | `g11.jpg` | 1400 |
| `gallery-turf-paver-yard.jpg` | `g05.jpg` | 1400 |
| `gallery-turf-modern-yard.jpg` | `g06.jpg` | 1400 |
| `gallery-process-install.jpg` | `g08.jpg` | 1400 |
| `gallery-commercial-painting-arches.jpg` | `g04.jpg` | 1400 |
| `gallery-commercial-painting-apartments.jpg` | `g18.jpg` | 1400 |
| `gallery-commercial-exterior.jpg` | `g19.jpg` | 1400 |

- [ ] **Step 1: Init npm project and install sharp (dev-only)**

```bash
cd /home/mario/proyectos/longhorn-landing
npm init -y
npm install --save-dev sharp
```

Expected: `package.json` created, `node_modules/sharp` installed, no errors.

- [ ] **Step 2: Write `.gitignore`**

```
node_modules/
.DS_Store
```

- [ ] **Step 3: Write the optimization script**

Create `scripts/optimize-images.mjs`:

```js
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC_DIR =
  '/tmp/claude-1000/-home-mario-proyectos-longhorn-landing/19a5487c-bc44-44ba-bfbb-cf759d8dc0a5/scratchpad/images';
const OUT_DIR = new URL('../assets/gallery/', import.meta.url).pathname;

mkdirSync(OUT_DIR, { recursive: true });

const MAP = [
  ['g16.jpg', 'hero-backyard-oasis.jpg', 1920],
  ['gallery/g22.jpg', 'gallery-backyard-pool-2.jpg', 1400],
  ['gallery/g07.jpg', 'gallery-firepit-dusk.jpg', 1400],
  ['gallery/g21.jpg', 'gallery-firepit-circular.jpg', 1400],
  ['gallery/g15.jpg', 'gallery-geometric-turf.jpg', 1400],
  ['gallery/g14.jpg', 'gallery-travertine-diamond.jpg', 1400],
  ['gallery/g20.jpg', 'gallery-herringbone-patio.jpg', 1400],
  ['gallery/g13.jpg', 'gallery-putting-green.jpg', 1400],
  ['gallery/g09.jpg', 'gallery-lattice-turf.jpg', 1400],
  ['gallery/g12.jpg', 'gallery-turf-pavers-clean.jpg', 1400],
  ['gallery/g11.jpg', 'gallery-turf-corner.jpg', 1400],
  ['gallery/g05.jpg', 'gallery-turf-paver-yard.jpg', 1400],
  ['gallery/g06.jpg', 'gallery-turf-modern-yard.jpg', 1400],
  ['gallery/g08.jpg', 'gallery-process-install.jpg', 1400],
  ['gallery/g04.jpg', 'gallery-commercial-painting-arches.jpg', 1400],
  ['gallery/g18.jpg', 'gallery-commercial-painting-apartments.jpg', 1400],
  ['gallery/g19.jpg', 'gallery-commercial-exterior.jpg', 1400],
];

for (const [srcRel, outName, width] of MAP) {
  const srcPath = `${SRC_DIR}/${srcRel}`;
  const outPath = `${OUT_DIR}${outName}`;
  await sharp(srcPath)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 78 })
    .toFile(outPath);
  console.log(`wrote ${outName}`);
}
```

Note: all source files, including `g16.jpg` (the hero source), live in `images/gallery/`.

- [ ] **Step 4: Run the script**

```bash
node scripts/optimize-images.mjs
```

Expected: 17 lines of `wrote <name>` output, no errors.

- [ ] **Step 5: Copy the logo**

```bash
cp /tmp/claude-1000/-home-mario-proyectos-longhorn-landing/19a5487c-bc44-44ba-bfbb-cf759d8dc0a5/scratchpad/images/logo.png assets/logo.png
```

- [ ] **Step 6: Verify output**

```bash
ls -la assets/gallery/ | wc -l
file assets/logo.png assets/gallery/hero-backyard-oasis.jpg
```

Expected: 17 files listed (plus `.` `..` = 19 lines total from `ls -la`), both `file` outputs report valid image data.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json .gitignore scripts/optimize-images.mjs assets/
git commit -m "Add optimized real project photos and logo"
```

---

### Task 2: Project scaffold, HTML skeleton, and Playwright verification harness

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/main.js`
- Create: `js/i18n.js`
- Create: `scripts/verify.mjs`
- Modify: `package.json` (add `playwright` devDependency, add `verify` script)

**Interfaces:**
- Produces: section anchors `#hero #services #gallery #about #areas #contact` that every later task's markup fills in. Produces `scripts/verify.mjs` with an exported-by-convention pattern: a growing array of named check functions `checks.push({ name, fn })` that later tasks append to.

- [ ] **Step 1: Install Playwright (dev-only) with Chromium**

```bash
npm install --save-dev playwright
npx playwright install --with-deps chromium
```

Expected: installs without fatal errors (sandbox/deps warnings are fine in a dev container).

- [ ] **Step 2: Write the HTML skeleton**

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Longhorn Hardscape & Construction | Greater Houston</title>
<meta name="description" content="Premium hardscaping, concrete, turf, and outdoor construction for Greater Houston. Locally owned. Call or text (346) 551-8340.">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header" id="site-header">
  <div class="container site-header__inner">
    <a href="#hero" class="site-header__logo">
      <img src="assets/logo.png" alt="Longhorn Hardscape & Construction" width="220" height="63">
    </a>
    <nav class="site-nav" id="site-nav">
      <a href="#hero" data-i18n="nav.home">Home</a>
      <a href="#services" data-i18n="nav.services">Services</a>
      <a href="#gallery" data-i18n="nav.gallery">Gallery</a>
      <a href="#about" data-i18n="nav.about">About</a>
      <a href="#areas" data-i18n="nav.areas">Areas</a>
      <a href="#contact" data-i18n="nav.contact">Contact</a>
    </nav>
    <div class="site-header__actions">
      <div class="lang-toggle">
        <button type="button" class="lang-toggle__option is-active" data-lang="en">EN</button>
        <button type="button" class="lang-toggle__option" data-lang="es">ES</button>
      </div>
      <a class="btn btn--call" href="tel:+13465518340" data-i18n="header.call">Call (346) 551-8340</a>
      <button type="button" class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<main id="main">
  <section id="hero" class="hero"></section>
  <section id="services" class="services"></section>
  <section id="gallery" class="gallery"></section>
  <section id="about" class="about"></section>
  <section id="areas" class="areas"></section>
  <section id="contact" class="contact"></section>
</main>

<footer class="site-footer"></footer>

<script src="js/i18n.js"></script>
<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Write the base CSS (reset + tokens + header/nav shell)**

Create `css/style.css`:

```css
:root {
  --bg: #0a0a0a;
  --bg-alt: #141210;
  --surface: #1c1916;
  --border: #2a251f;
  --text: #f5f0e8;
  --text-muted: #a8a199;
  --accent-start: #d9b68c;
  --accent-end: #b8763e;
  --accent-dark: #8b5a2b;
  --font-serif: Georgia, 'Iowan Old Style', 'Times New Roman', serif;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --container: 1200px;
  --radius: 14px;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  line-height: 1.6;
}
h1, h2, h3 { font-family: var(--font-serif); font-weight: 700; margin: 0 0 0.5em; }
p { margin: 0 0 1em; color: var(--text-muted); }
img { max-width: 100%; display: block; }
a { color: inherit; }
section { scroll-margin-top: 84px; }

.container {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 24px;
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  background: var(--accent-end);
  color: #0a0a0a;
  padding: 12px 20px;
  z-index: 1000;
}
.skip-link:focus { left: 12px; top: 12px; }

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn--call {
  background: linear-gradient(135deg, var(--accent-start), var(--accent-end));
  color: #17130f;
  animation: btn-glow 2.6s ease-in-out infinite;
}
.btn--call:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(184, 118, 62, 0.35); }
@keyframes btn-glow {
  0%, 100% { box-shadow: 0 0 0 rgba(184, 118, 62, 0); }
  50% { box-shadow: 0 0 18px rgba(184, 118, 62, 0.55); }
}
@media (prefers-reduced-motion: reduce) {
  .btn--call { animation: none; }
}
.btn--outline {
  background: transparent;
  border-color: var(--accent-end);
  color: var(--text);
}
.btn--outline:hover { background: rgba(184, 118, 62, 0.12); transform: translateY(-2px); }

.site-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  background: transparent;
  transition: background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease;
}
.site-header.is-scrolled {
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 0 var(--border);
}
.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  gap: 24px;
}
.site-header__logo img { height: 48px; width: auto; }
.site-nav {
  display: flex;
  gap: 28px;
  flex: 1;
  justify-content: center;
}
.site-nav a {
  text-decoration: none;
  font-size: 0.92rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--text);
  opacity: 0.85;
}
.site-nav a:hover { opacity: 1; color: var(--accent-start); }
.site-header__actions { display: flex; align-items: center; gap: 16px; }
.lang-toggle { display: flex; border: 1px solid var(--border); border-radius: 999px; overflow: hidden; }
.lang-toggle__option {
  background: transparent;
  border: none;
  color: var(--text-muted);
  padding: 6px 12px;
  font-size: 0.8rem;
  cursor: pointer;
}
.lang-toggle__option.is-active { background: var(--accent-end); color: #17130f; }
.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}
.nav-toggle span { width: 22px; height: 2px; background: var(--text); display: block; }

@media (max-width: 860px) {
  .site-nav {
    position: fixed;
    top: 76px; left: 0; right: 0;
    background: var(--bg-alt);
    flex-direction: column;
    align-items: center;
    padding: 24px;
    gap: 20px;
    transform: translateY(-140%);
    transition: transform 0.3s ease;
    border-bottom: 1px solid var(--border);
  }
  .site-nav.is-open { transform: translateY(0); }
  .nav-toggle { display: flex; }
  .site-header__actions .btn--call span.btn-label { display: none; }
}
```

- [ ] **Step 4: Write empty JS module stubs so script tags don't 404**

Create `js/i18n.js`:

```js
window.LonghornI18N = { translations: { en: {}, es: {} } };
```

Create `js/main.js`:

```js
document.addEventListener('DOMContentLoaded', () => {
  console.log('Longhorn landing scaffold loaded');
});
```

- [ ] **Step 5: Write the Playwright verification harness**

Create `scripts/verify.mjs`:

```js
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
```

- [ ] **Step 6: Add npm script**

Modify `package.json`, add to `"scripts"`:

```json
"scripts": {
  "verify": "node scripts/verify.mjs"
}
```

- [ ] **Step 7: Run verification**

```bash
npm run verify
```

Expected: `PASS: page has correct title`, `PASS: all six section anchors exist`, `PASS: no console errors`, exit code 0.

- [ ] **Step 8: Commit**

```bash
git add index.html css/style.css js/main.js js/i18n.js scripts/verify.mjs package.json package-lock.json
git commit -m "Add HTML skeleton, base styles, and Playwright verification harness"
```

---

### Task 3: Header, navigation, mobile menu, and i18n core

**Files:**
- Modify: `js/i18n.js`
- Modify: `js/main.js`
- Modify: `scripts/verify.mjs` (append checks)

**Interfaces:**
- Consumes: `data-i18n` attributes already present on nav links and the call button from Task 2's `index.html`.
- Produces: `window.LonghornI18N.translations.{en,es}.nav.*` and `.header.*` keys that every later task's dictionary additions extend (same top-level object, different keys per section). Produces `window.LonghornI18N.applyLanguage(lang)` and `.initI18n()` used by no one else directly (self-initializing), but the **pattern** (`data-i18n="section.key"` + dictionary shape) is what every later task must follow.

- [ ] **Step 1: Write the full i18n dictionary (nav + header keys) and apply/init logic**

Replace `js/i18n.js`:

```js
(function () {
  const translations = {
    en: {
      nav: { home: 'Home', services: 'Services', gallery: 'Gallery', about: 'About', areas: 'Areas', contact: 'Contact' },
      header: { call: 'Call (346) 551-8340' },
    },
    es: {
      nav: { home: 'Inicio', services: 'Servicios', gallery: 'Galería', about: 'Nosotros', areas: 'Zonas', contact: 'Contacto' },
      header: { call: 'Llama (346) 551-8340' },
    },
  };

  function getNested(obj, path) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.body.classList.add('lang-switching');
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = getNested(translations[lang], el.getAttribute('data-i18n'));
      if (value !== undefined) el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const value = getNested(translations[lang], el.getAttribute('data-i18n-placeholder'));
      if (value !== undefined) el.setAttribute('placeholder', value);
    });
    localStorage.setItem('longhorn-lang', lang);
    document.querySelectorAll('.lang-toggle__option').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });
    requestAnimationFrame(() => document.body.classList.remove('lang-switching'));
  }

  function initI18n() {
    const saved = localStorage.getItem('longhorn-lang');
    applyLanguage(saved === 'es' ? 'es' : 'en');
    document.querySelectorAll('.lang-toggle__option').forEach((btn) => {
      btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
    });
  }

  window.LonghornI18N = { translations, applyLanguage, initI18n, getNested };
  document.addEventListener('DOMContentLoaded', initI18n);
})();
```

- [ ] **Step 2: Add header scroll state and mobile nav toggle to main.js**

Replace `js/main.js`:

```js
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
});
```

- [ ] **Step 3: Add a subtle fade transition for language switches**

Append to `css/style.css`:

```css
[data-i18n], [data-i18n-placeholder] { transition: opacity 0.2s ease; }
body.lang-switching [data-i18n] { opacity: 0; }
```

- [ ] **Step 4: Append verification checks**

In `scripts/verify.mjs`, insert these `checks.push(...)` calls right before the final `run();` call at the bottom of the file:

```js
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
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(100);
    const hasClass = await page.evaluate(() => document.getElementById('site-header').classList.contains('is-scrolled'));
    if (!hasClass) throw new Error('site-header did not gain is-scrolled class');
    await page.evaluate(() => window.scrollTo(0, 0));
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
```

- [ ] **Step 5: Run verification**

```bash
npm run verify
```

Expected: all previous checks still PASS, plus `PASS: language toggle switches nav text to Spanish`, `PASS: header gains is-scrolled class after scrolling`, `PASS: mobile nav toggle opens navigation at narrow viewport`.

- [ ] **Step 6: Commit**

```bash
git add js/i18n.js js/main.js css/style.css scripts/verify.mjs
git commit -m "Add i18n core, header scroll state, mobile nav toggle, and language-switch fade"
```

---

### Task 4: Hero section

**Files:**
- Modify: `index.html` (fill `<section id="hero">`)
- Modify: `css/style.css` (append hero styles)
- Modify: `js/i18n.js` (add `hero` dictionary keys)
- Modify: `js/main.js` (hero parallax)
- Modify: `scripts/verify.mjs` (append checks)

**Interfaces:**
- Consumes: `assets/gallery/hero-backyard-oasis.jpg` from Task 1. Consumes the `data-i18n` + dictionary pattern from Task 3.
- Produces: `.hero__title`, `.hero__subtitle` classes and `hero.title`/`hero.subtitle`/`hero.ctaCall`/`hero.ctaGallery` dictionary keys — not consumed elsewhere, but keep the key names consistent since Task 11's responsive pass reads the whole page.

- [ ] **Step 1: Fill in the hero markup**

In `index.html`, replace `<section id="hero" class="hero"></section>` with:

```html
<section id="hero" class="hero">
  <div class="hero__bg" style="background-image: url('assets/gallery/hero-backyard-oasis.jpg');"></div>
  <div class="hero__overlay"></div>
  <div class="container hero__content">
    <h1 class="hero__title" data-i18n="hero.title">Elevating Your Outdoor Living Space</h1>
    <p class="hero__subtitle" data-i18n="hero.subtitle">Premium hardscaping &amp; construction for Greater Houston homeowners and businesses — where entertaining takes center stage.</p>
    <div class="hero__actions">
      <a class="btn btn--call" href="tel:+13465518340" data-i18n="hero.ctaCall">Call or Text (346) 551-8340</a>
      <a class="btn btn--outline" href="#gallery" data-i18n="hero.ctaGallery">View Our Work</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add hero styles**

Append to `css/style.css`:

```css
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.hero__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  will-change: transform;
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.75) 55%, rgba(10,10,10,0.95) 100%);
}
.hero__content { position: relative; z-index: 1; padding-top: 120px; max-width: 720px; }
.hero__title { font-size: clamp(2.2rem, 5vw, 3.6rem); color: var(--text); }
.hero__subtitle { font-size: 1.15rem; color: var(--text-muted); max-width: 560px; }
.hero__actions { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 28px; }

@media (max-width: 600px) {
  .hero__content { padding-top: 100px; }
  .hero__actions { flex-direction: column; }
}
```

- [ ] **Step 3: Add hero dictionary keys**

In `js/i18n.js`, add a `hero` key inside both `en` and `es` objects (alongside the existing `nav`/`header` keys):

```js
      hero: {
        title: 'Elevating Your Outdoor Living Space',
        subtitle: 'Premium hardscaping & construction for Greater Houston homeowners and businesses — where entertaining takes center stage.',
        ctaCall: 'Call or Text (346) 551-8340',
        ctaGallery: 'View Our Work',
      },
```

(English block gets the English strings above; add the matching Spanish block to the `es` object:)

```js
      hero: {
        title: 'Elevando Tu Espacio de Vida Exterior',
        subtitle: 'Hardscaping y construcción premium para propietarios y negocios del área de Houston — donde el entretenimiento es protagonista.',
        ctaCall: 'Llama o Textea (346) 551-8340',
        ctaGallery: 'Ver Nuestro Trabajo',
      },
```

- [ ] **Step 4: Add subtle parallax on scroll**

In `js/main.js`, inside the existing `DOMContentLoaded` handler, append:

```js
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    const onHeroScroll = () => {
      const offset = Math.min(window.scrollY * 0.3, 160);
      heroBg.style.transform = `translateY(${offset}px)`;
    };
    onHeroScroll();
    window.addEventListener('scroll', onHeroScroll, { passive: true });
  }
```

- [ ] **Step 5: Append verification checks**

Insert before `run();` in `scripts/verify.mjs`:

```js
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
      const res = await fetch('assets/gallery/hero-backyard-oasis.jpg');
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
```

- [ ] **Step 6: Run verification**

```bash
npm run verify
```

Expected: all prior checks PASS plus the 3 new ones.

- [ ] **Step 7: Commit**

```bash
git add index.html css/style.css js/i18n.js js/main.js scripts/verify.mjs
git commit -m "Add hero section with real photo, parallax, and bilingual copy"
```

---

### Task 5: Trust strip with animated counters

**Files:**
- Modify: `index.html` (insert trust strip markup right after `</section>` closing `#hero`, before `<section id="services">`)
- Modify: `css/style.css`
- Modify: `js/i18n.js` (add `trust` keys)
- Modify: `js/main.js` (counter animation via Intersection Observer)
- Modify: `scripts/verify.mjs`

**Interfaces:**
- Produces: `.counter[data-target]` convention and an Intersection Observer helper pattern in `main.js` — Task 10 (scroll-reveal) reuses the same Intersection Observer approach for `.reveal` elements but as a separate observer instance; no shared function needed.

- [ ] **Step 1: Add trust strip markup**

In `index.html`, add this new `<section>` immediately after the `</section>` that closes `id="hero"` and before `<section id="services" class="services"></section>`:

```html
<section class="trust">
  <div class="container trust__grid">
    <div class="trust__item">
      <span class="trust__number"><span class="counter" data-target="5">0</span>+</span>
      <span data-i18n="trust.years">Years Experience</span>
    </div>
    <div class="trust__item">
      <span class="trust__number"><span class="counter" data-target="10">0</span>+</span>
      <span data-i18n="trust.cities">Cities Served</span>
    </div>
    <div class="trust__item">
      <span class="trust__number">100%</span>
      <span data-i18n="trust.local">Locally Owned</span>
    </div>
    <div class="trust__item">
      <span class="trust__number">Free</span>
      <span data-i18n="trust.estimates">Estimates</span>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add trust strip styles**

Append to `css/style.css`:

```css
.trust {
  background: var(--bg-alt);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 40px 0;
}
.trust__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  text-align: center;
}
.trust__item { display: flex; flex-direction: column; gap: 4px; }
.trust__number {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  background: linear-gradient(135deg, var(--accent-start), var(--accent-end));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.trust__item span:last-child { color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; }

@media (max-width: 700px) {
  .trust__grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 3: Add trust dictionary keys**

In `js/i18n.js`, add to the `en` object:

```js
      trust: { years: 'Years Experience', cities: 'Cities Served', local: 'Locally Owned', estimates: 'Estimates' },
```

And to the `es` object:

```js
      trust: { years: 'Años de Experiencia', cities: 'Ciudades Atendidas', local: 'De Propiedad Local', estimates: 'Estimaciones Gratis' },
```

- [ ] **Step 4: Add counter animation**

In `js/main.js`, append inside `DOMContentLoaded`:

```js
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target);
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = String(target);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach((el) => counterObserver.observe(el));
```

- [ ] **Step 5: Append verification check**

Insert before `run();` in `scripts/verify.mjs`:

```js
checks.push({
  name: 'trust counters animate to target value on scroll into view',
  fn: async (page) => {
    await page.locator('.trust').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    const value = await page.locator('.counter[data-target="5"]').textContent();
    if (value.trim() !== '5') throw new Error(`counter did not reach target, got "${value.trim()}"`);
  },
});
```

- [ ] **Step 6: Run verification**

```bash
npm run verify
```

Expected: all checks PASS including the new counter check.

- [ ] **Step 7: Commit**

```bash
git add index.html css/style.css js/i18n.js js/main.js scripts/verify.mjs
git commit -m "Add trust strip with animated counters"
```

---

### Task 6: Services grid (15 services, 8 with real photos)

**Files:**
- Modify: `index.html` (fill `<section id="services">`)
- Modify: `css/style.css`
- Modify: `js/i18n.js` (add `services` keys)
- Modify: `scripts/verify.mjs`

**Interfaces:**
- Consumes: `assets/gallery/*.jpg` filenames from Task 1.
- Produces: `.service-card` / `.service-card--photo` / `.service-card--plain` classes, `services.sectionTitle` and `services.items.<slug>.{title,desc}` dictionary shape.

- [ ] **Step 1: Fill in the services markup**

Replace `<section id="services" class="services"></section>` in `index.html` with:

```html
<section id="services" class="services">
  <div class="container">
    <h2 class="section-title" data-i18n="services.sectionTitle">Our Services</h2>
    <div class="services__grid">
      <article class="service-card service-card--photo" style="background-image:url('assets/gallery/gallery-turf-modern-yard.jpg')">
        <div class="service-card__overlay"></div>
        <h3 data-i18n="services.items.turf.title">Artificial Turf</h3>
        <p data-i18n="services.items.turf.desc">Lush, low-maintenance synthetic grass that stays green year-round — perfect for yards, pet areas, and putting greens.</p>
      </article>
      <article class="service-card service-card--photo" style="background-image:url('assets/gallery/gallery-herringbone-patio.jpg')">
        <div class="service-card__overlay"></div>
        <h3 data-i18n="services.items.hardscaping.title">Hardscaping &amp; Pavers</h3>
        <p data-i18n="services.items.hardscaping.desc">Custom paver patios, walkways, and driveways built to handle Texas heat and last for decades.</p>
      </article>
      <article class="service-card service-card--photo" style="background-image:url('assets/gallery/gallery-turf-paver-yard.jpg')">
        <div class="service-card__overlay"></div>
        <h3 data-i18n="services.items.concrete.title">Concrete Work</h3>
        <p data-i18n="services.items.concrete.desc">Durable stamped and broom-finish concrete for patios, slabs, and driveways, poured and finished with precision.</p>
      </article>
      <article class="service-card service-card--plain">
        <h3 data-i18n="services.items.drainage.title">Drainage Solutions</h3>
        <p data-i18n="services.items.drainage.desc">French drains, grading, and channel systems that keep water moving away from your home and foundation.</p>
      </article>
      <article class="service-card service-card--plain">
        <h3 data-i18n="services.items.fence.title">Fence Replacement</h3>
        <p data-i18n="services.items.fence.desc">Wood, iron, and privacy fencing installed or replaced to secure your property and boost curb appeal.</p>
      </article>
      <article class="service-card service-card--photo" style="background-image:url('assets/gallery/gallery-firepit-dusk.jpg')">
        <div class="service-card__overlay"></div>
        <h3 data-i18n="services.items.firepits.title">Fire Pits</h3>
        <p data-i18n="services.items.firepits.desc">Custom stone and paver fire pits that turn any backyard into a gathering place after dark.</p>
      </article>
      <article class="service-card service-card--photo" style="background-image:url('assets/gallery/gallery-firepit-circular.jpg')">
        <div class="service-card__overlay"></div>
        <h3 data-i18n="services.items.lighting.title">Landscape Lighting</h3>
        <p data-i18n="services.items.lighting.desc">Low-voltage lighting design that highlights your hardscape and keeps your outdoor space usable after sunset.</p>
      </article>
      <article class="service-card service-card--plain">
        <h3 data-i18n="services.items.kitchens.title">Outdoor Kitchens</h3>
        <p data-i18n="services.items.kitchens.desc">Built-in grills, counters, and storage designed for real Texas entertaining, rain or shine.</p>
      </article>
      <article class="service-card service-card--photo" style="background-image:url('assets/gallery/gallery-commercial-painting-arches.jpg')">
        <div class="service-card__overlay"></div>
        <h3 data-i18n="services.items.painting.title">Painting</h3>
        <p data-i18n="services.items.painting.desc">Interior and exterior painting for homes and commercial properties, finished clean and on schedule.</p>
      </article>
      <article class="service-card service-card--photo" style="background-image:url('assets/gallery/gallery-putting-green.jpg')">
        <div class="service-card__overlay"></div>
        <h3 data-i18n="services.items.pooldecking.title">Pool Decking</h3>
        <p data-i18n="services.items.pooldecking.desc">Slip-resistant travertine and paver decking that keeps pool areas cool, safe, and stunning.</p>
      </article>
      <article class="service-card service-card--plain">
        <h3 data-i18n="services.items.rock.title">Rock Installation</h3>
        <p data-i18n="services.items.rock.desc">Decorative rock and gravel beds for low-maintenance landscaping that still looks sharp year-round.</p>
      </article>
      <article class="service-card service-card--plain">
        <h3 data-i18n="services.items.spraydeck.title">Spray Decks</h3>
        <p data-i18n="services.items.spraydeck.desc">Textured spray deck coatings that resurface tired concrete with a cool-touch, non-slip finish.</p>
      </article>
      <article class="service-card service-card--plain">
        <h3 data-i18n="services.items.steppingstones.title">Stepping Stones</h3>
        <p data-i18n="services.items.steppingstones.desc">Natural stone and paver stepping paths that guide guests through your landscape in style.</p>
      </article>
      <article class="service-card service-card--photo" style="background-image:url('assets/gallery/gallery-travertine-diamond.jpg')">
        <div class="service-card__overlay"></div>
        <h3 data-i18n="services.items.travertine.title">Travertine</h3>
        <p data-i18n="services.items.travertine.desc">Elegant travertine patios and pool surrounds that bring a natural, upscale finish to any outdoor space.</p>
      </article>
      <article class="service-card service-card--plain">
        <h3 data-i18n="services.items.xeriscaping.title">Xeriscaping</h3>
        <p data-i18n="services.items.xeriscaping.desc">Drought-tolerant landscape design that saves water without sacrificing curb appeal.</p>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add services grid styles**

Append to `css/style.css`:

```css
.section-title {
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  text-align: center;
  margin-bottom: 48px;
}
.services { padding: 100px 0; }
.services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.service-card {
  position: relative;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  padding: 28px;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  background-color: var(--surface);
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.service-card:hover { transform: translateY(-6px); box-shadow: 0 16px 32px rgba(0,0,0,0.4); }
.service-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.92) 100%);
}
.service-card h3, .service-card p { position: relative; z-index: 1; }
.service-card h3 { font-size: 1.2rem; margin-bottom: 8px; }
.service-card p { font-size: 0.9rem; margin-bottom: 0; }
.service-card--plain {
  background: linear-gradient(160deg, var(--surface), var(--bg-alt));
}
.service-card--plain::before {
  content: '';
  position: absolute;
  top: -40px; right: -40px;
  width: 140px; height: 140px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(184,118,62,0.25), transparent 70%);
}

@media (max-width: 960px) {
  .services__grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .services__grid { grid-template-columns: 1fr; }
  .services { padding: 64px 0; }
}
```

- [ ] **Step 3: Add services dictionary keys**

In `js/i18n.js`, add to the `en` object:

```js
      services: {
        sectionTitle: 'Our Services',
        items: {
          turf: { title: 'Artificial Turf', desc: 'Lush, low-maintenance synthetic grass that stays green year-round — perfect for yards, pet areas, and putting greens.' },
          hardscaping: { title: 'Hardscaping & Pavers', desc: 'Custom paver patios, walkways, and driveways built to handle Texas heat and last for decades.' },
          concrete: { title: 'Concrete Work', desc: 'Durable stamped and broom-finish concrete for patios, slabs, and driveways, poured and finished with precision.' },
          drainage: { title: 'Drainage Solutions', desc: 'French drains, grading, and channel systems that keep water moving away from your home and foundation.' },
          fence: { title: 'Fence Replacement', desc: 'Wood, iron, and privacy fencing installed or replaced to secure your property and boost curb appeal.' },
          firepits: { title: 'Fire Pits', desc: 'Custom stone and paver fire pits that turn any backyard into a gathering place after dark.' },
          lighting: { title: 'Landscape Lighting', desc: 'Low-voltage lighting design that highlights your hardscape and keeps your outdoor space usable after sunset.' },
          kitchens: { title: 'Outdoor Kitchens', desc: 'Built-in grills, counters, and storage designed for real Texas entertaining, rain or shine.' },
          painting: { title: 'Painting', desc: 'Interior and exterior painting for homes and commercial properties, finished clean and on schedule.' },
          pooldecking: { title: 'Pool Decking', desc: 'Slip-resistant travertine and paver decking that keeps pool areas cool, safe, and stunning.' },
          rock: { title: 'Rock Installation', desc: 'Decorative rock and gravel beds for low-maintenance landscaping that still looks sharp year-round.' },
          spraydeck: { title: 'Spray Decks', desc: 'Textured spray deck coatings that resurface tired concrete with a cool-touch, non-slip finish.' },
          steppingstones: { title: 'Stepping Stones', desc: 'Natural stone and paver stepping paths that guide guests through your landscape in style.' },
          travertine: { title: 'Travertine', desc: 'Elegant travertine patios and pool surrounds that bring a natural, upscale finish to any outdoor space.' },
          xeriscaping: { title: 'Xeriscaping', desc: 'Drought-tolerant landscape design that saves water without sacrificing curb appeal.' },
        },
      },
```

And to the `es` object:

```js
      services: {
        sectionTitle: 'Nuestros Servicios',
        items: {
          turf: { title: 'Césped Sintético', desc: 'Césped sintético exuberante y de bajo mantenimiento que se mantiene verde todo el año — ideal para patios, mascotas y greens de golf.' },
          hardscaping: { title: 'Hardscaping y Pavers', desc: 'Patios, andadores y entradas de pavers a la medida, construidos para resistir el calor de Texas y durar décadas.' },
          concrete: { title: 'Trabajo en Concreto', desc: 'Concreto estampado y de acabado escobillado, duradero para patios, losas y entradas, vaciado y terminado con precisión.' },
          drainage: { title: 'Soluciones de Drenaje', desc: 'Drenajes franceses, nivelación y sistemas de canales que mantienen el agua alejada de tu casa y cimientos.' },
          fence: { title: 'Reemplazo de Cercas', desc: 'Cercas de madera, hierro y privacidad instaladas o reemplazadas para asegurar tu propiedad y mejorar su apariencia.' },
          firepits: { title: 'Fogatas', desc: 'Fogatas de piedra y pavers a la medida que convierten cualquier patio en un lugar de reunión al anochecer.' },
          lighting: { title: 'Iluminación de Paisaje', desc: 'Diseño de iluminación de bajo voltaje que resalta tu hardscape y mantiene tu espacio exterior utilizable después del atardecer.' },
          kitchens: { title: 'Cocinas Exteriores', desc: 'Parrillas empotradas, mostradores y almacenamiento diseñados para el verdadero entretenimiento texano, llueva o truene.' },
          painting: { title: 'Pintura', desc: 'Pintura interior y exterior para casas y propiedades comerciales, con acabado limpio y a tiempo.' },
          pooldecking: { title: 'Terrazas de Piscina', desc: 'Decks de travertino y pavers antideslizantes que mantienen las áreas de piscina frescas, seguras y espectaculares.' },
          rock: { title: 'Instalación de Roca', desc: 'Camas de roca decorativa y grava para un paisajismo de bajo mantenimiento que se ve impecable todo el año.' },
          spraydeck: { title: 'Spray Decks', desc: 'Recubrimientos texturizados de spray deck que renuevan concreto desgastado con un acabado antideslizante y fresco al tacto.' },
          steppingstones: { title: 'Piedras de Paso', desc: 'Caminos de piedra natural y pavers que guían a tus invitados a través del paisaje con estilo.' },
          travertine: { title: 'Travertino', desc: 'Elegantes patios de travertino y contornos de piscina que aportan un acabado natural y de lujo a cualquier espacio exterior.' },
          xeriscaping: { title: 'Xeriscaping', desc: 'Diseño de paisajismo tolerante a la sequía que ahorra agua sin sacrificar la belleza de tu propiedad.' },
        },
      },
```

- [ ] **Step 4: Append verification checks**

Insert before `run();` in `scripts/verify.mjs`:

```js
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
```

- [ ] **Step 5: Run verification**

```bash
npm run verify
```

Expected: all checks PASS, including the 2 new ones.

- [ ] **Step 6: Commit**

```bash
git add index.html css/style.css js/i18n.js scripts/verify.mjs
git commit -m "Add services grid with 15 services and real project photos"
```

---

### Task 7: Gallery with lightbox

**Files:**
- Modify: `index.html` (fill `<section id="gallery">`, add lightbox markup before `</body>`)
- Modify: `css/style.css`
- Modify: `js/i18n.js` (add `gallery` keys)
- Modify: `js/main.js` (lightbox behavior)
- Modify: `scripts/verify.mjs`

**Interfaces:**
- Consumes: all 17 files in `assets/gallery/` from Task 1 (hero image is reused as the first gallery thumbnail too, since it's the strongest shot).
- Produces: `.gallery__item` (button) with `data-full` attribute, `#lightbox` overlay with `#lightbox-img`, `.lightbox__close` — used only within this task, but the pattern (button triggers overlay) should not collide with any other overlay in the page.

- [ ] **Step 1: Fill in the gallery markup**

Replace `<section id="gallery" class="gallery"></section>` in `index.html` with:

```html
<section id="gallery" class="gallery">
  <div class="container">
    <h2 class="section-title" data-i18n="gallery.sectionTitle">Our Work</h2>
    <p class="section-subtitle" data-i18n="gallery.sectionSubtitle">Real projects, real Houston backyards.</p>
    <div class="gallery__grid">
      <button class="gallery__item" data-full="assets/gallery/hero-backyard-oasis.jpg"><img src="assets/gallery/hero-backyard-oasis.jpg" alt="Backyard with pool, putting green, and pergola" loading="lazy"></button>
      <button class="gallery__item" data-full="assets/gallery/gallery-backyard-pool-2.jpg"><img src="assets/gallery/gallery-backyard-pool-2.jpg" alt="Backyard pool and putting green at dusk" loading="lazy"></button>
      <button class="gallery__item" data-full="assets/gallery/gallery-firepit-dusk.jpg"><img src="assets/gallery/gallery-firepit-dusk.jpg" alt="Stone fire pit wall lit at dusk" loading="lazy"></button>
      <button class="gallery__item" data-full="assets/gallery/gallery-firepit-circular.jpg"><img src="assets/gallery/gallery-firepit-circular.jpg" alt="Circular stone fire pit patio" loading="lazy"></button>
      <button class="gallery__item" data-full="assets/gallery/gallery-geometric-turf.jpg"><img src="assets/gallery/gallery-geometric-turf.jpg" alt="Geometric turf and paver pattern" loading="lazy"></button>
      <button class="gallery__item" data-full="assets/gallery/gallery-travertine-diamond.jpg"><img src="assets/gallery/gallery-travertine-diamond.jpg" alt="Travertine patio in diamond pattern" loading="lazy"></button>
      <button class="gallery__item" data-full="assets/gallery/gallery-herringbone-patio.jpg"><img src="assets/gallery/gallery-herringbone-patio.jpg" alt="Herringbone paver patio with turf" loading="lazy"></button>
      <button class="gallery__item" data-full="assets/gallery/gallery-putting-green.jpg"><img src="assets/gallery/gallery-putting-green.jpg" alt="Backyard putting green next to pool" loading="lazy"></button>
      <button class="gallery__item" data-full="assets/gallery/gallery-lattice-turf.jpg"><img src="assets/gallery/gallery-lattice-turf.jpg" alt="Diagonal turf and paver lattice by pool" loading="lazy"></button>
      <button class="gallery__item" data-full="assets/gallery/gallery-turf-pavers-clean.jpg"><img src="assets/gallery/gallery-turf-pavers-clean.jpg" alt="Clean turf bordered by pavers and gravel" loading="lazy"></button>
      <button class="gallery__item" data-full="assets/gallery/gallery-turf-corner.jpg"><img src="assets/gallery/gallery-turf-corner.jpg" alt="Turf installation along brick house corner" loading="lazy"></button>
      <button class="gallery__item" data-full="assets/gallery/gallery-turf-paver-yard.jpg"><img src="assets/gallery/gallery-turf-paver-yard.jpg" alt="Backyard turf and paver installation" loading="lazy"></button>
      <button class="gallery__item" data-full="assets/gallery/gallery-turf-modern-yard.jpg"><img src="assets/gallery/gallery-turf-modern-yard.jpg" alt="Modern backyard turf and paver design" loading="lazy"></button>
      <button class="gallery__item" data-full="assets/gallery/gallery-process-install.jpg"><img src="assets/gallery/gallery-process-install.jpg" alt="Crew installing a backyard putting green" loading="lazy"></button>
      <button class="gallery__item" data-full="assets/gallery/gallery-commercial-painting-arches.jpg"><img src="assets/gallery/gallery-commercial-painting-arches.jpg" alt="Commercial building exterior painting with arches" loading="lazy"></button>
      <button class="gallery__item" data-full="assets/gallery/gallery-commercial-painting-apartments.jpg"><img src="assets/gallery/gallery-commercial-painting-apartments.jpg" alt="Commercial apartment building exterior painting" loading="lazy"></button>
      <button class="gallery__item" data-full="assets/gallery/gallery-commercial-exterior.jpg"><img src="assets/gallery/gallery-commercial-exterior.jpg" alt="Commercial building exterior finished project" loading="lazy"></button>
    </div>
  </div>
</section>
```

Right before `</body>` in `index.html` (after the closing `</footer>` and before the `<script>` tags), add:

```html
<div class="lightbox" id="lightbox">
  <button class="lightbox__close" id="lightbox-close" aria-label="Close">&times;</button>
  <img src="" alt="" id="lightbox-img">
</div>
```

- [ ] **Step 2: Add gallery and lightbox styles**

Append to `css/style.css`:

```css
.section-subtitle { text-align: center; margin-top: -32px; margin-bottom: 40px; color: var(--text-muted); }
.gallery { padding: 100px 0; background: var(--bg-alt); }
.gallery__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.gallery__item {
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: none;
  aspect-ratio: 4 / 3;
}
.gallery__item img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.gallery__item:hover img { transform: scale(1.08); }

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(5,5,5,0.92);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 40px;
}
.lightbox.is-open { display: flex; }
.lightbox img { max-width: 90vw; max-height: 85vh; border-radius: 8px; }
.lightbox__close {
  position: absolute;
  top: 24px; right: 32px;
  background: none;
  border: none;
  color: var(--text);
  font-size: 2.4rem;
  cursor: pointer;
  line-height: 1;
}

@media (max-width: 960px) {
  .gallery__grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 600px) {
  .gallery__grid { grid-template-columns: repeat(2, 1fr); }
  .gallery { padding: 64px 0; }
}
```

- [ ] **Step 3: Add gallery dictionary keys**

In `js/i18n.js`, add to the `en` object:

```js
      gallery: { sectionTitle: 'Our Work', sectionSubtitle: 'Real projects, real Houston backyards.' },
```

And to the `es` object:

```js
      gallery: { sectionTitle: 'Nuestro Trabajo', sectionSubtitle: 'Proyectos reales, patios reales de Houston.' },
```

- [ ] **Step 4: Add lightbox behavior**

In `js/main.js`, append inside `DOMContentLoaded`:

```js
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('is-open');
  }
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightboxImg.src = '';
  }

  document.querySelectorAll('.gallery__item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      openLightbox(btn.dataset.full, img.alt);
    });
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
```

- [ ] **Step 5: Append verification checks**

Insert before `run();` in `scripts/verify.mjs`:

```js
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
```

- [ ] **Step 6: Run verification**

```bash
npm run verify
```

Expected: all checks PASS including the 2 new ones.

- [ ] **Step 7: Commit**

```bash
git add index.html css/style.css js/i18n.js js/main.js scripts/verify.mjs
git commit -m "Add gallery grid with lightbox showing 17 real project photos"
```

---

### Task 8: About and Areas Served sections

**Files:**
- Modify: `index.html` (fill `<section id="about">` and `<section id="areas">`)
- Modify: `css/style.css`
- Modify: `js/i18n.js` (add `about` and `areas` keys)
- Modify: `scripts/verify.mjs`

**Interfaces:**
- Consumes: `assets/gallery/gallery-process-install.jpg` (reused as the About section's supporting photo — shows the crew at work).
- Produces: `.city-chip` elements for the 10 cities (Task 11's responsive pass checks these don't wrap awkwardly, no new interface needed).

- [ ] **Step 1: Fill in the About markup**

Replace `<section id="about" class="about"></section>` in `index.html` with:

```html
<section id="about" class="about">
  <div class="container about__grid">
    <div class="about__photo">
      <img src="assets/gallery/gallery-process-install.jpg" alt="Longhorn crew installing a backyard putting green" loading="lazy">
    </div>
    <div class="about__copy">
      <h2 data-i18n="about.heading">Our Commitment to Excellence Is Set in Stone</h2>
      <p data-i18n="about.body">Longhorn Hardscape &amp; Construction is a locally owned and operated company serving homeowners and businesses across Greater Houston. Co-founded by Cesar Guifarro, our team brings over 5 years of hands-on experience in construction and hardscaping to every project. We build on five core values — compassion, consistency, hard work, honesty, and respect — and we back every job with high-quality workmanship, on-time completion, and a budget you can count on.</p>
      <p class="about__founder" data-i18n="about.founder">Cesar Guifarro — Co-Founder</p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Fill in the Areas Served markup**

Replace `<section id="areas" class="areas"></section>` in `index.html` with:

```html
<section id="areas" class="areas">
  <div class="container">
    <h2 class="section-title" data-i18n="areas.sectionTitle">Proudly Serving Greater Houston</h2>
    <p class="section-subtitle" data-i18n="areas.sectionSubtitle">From Katy to Pearland, we bring the same quality and care to every job site.</p>
    <div class="areas__grid">
      <span class="city-chip">Alvin</span>
      <span class="city-chip">Cypress</span>
      <span class="city-chip">Fulshear</span>
      <span class="city-chip">Katy</span>
      <span class="city-chip">Manvel</span>
      <span class="city-chip">Missouri City</span>
      <span class="city-chip">Pearland</span>
      <span class="city-chip">Richmond</span>
      <span class="city-chip">Rosenberg</span>
      <span class="city-chip">Sugar Land</span>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add About and Areas styles**

Append to `css/style.css`:

```css
.about { padding: 100px 0; }
.about__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}
.about__photo img { border-radius: var(--radius); border: 1px solid var(--border); }
.about__copy h2 { font-size: clamp(1.6rem, 3vw, 2.2rem); }
.about__founder { color: var(--accent-start); font-style: italic; margin-top: 16px; }

.areas { padding: 100px 0; background: var(--bg-alt); }
.areas__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
}
.city-chip {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 10px 22px;
  color: var(--text);
  background: var(--surface);
  font-size: 0.95rem;
}

@media (max-width: 860px) {
  .about__grid { grid-template-columns: 1fr; }
  .about { padding: 64px 0; }
  .areas { padding: 64px 0; }
}
```

- [ ] **Step 4: Add About and Areas dictionary keys**

In `js/i18n.js`, add to the `en` object:

```js
      about: {
        heading: 'Our Commitment to Excellence Is Set in Stone',
        body: 'Longhorn Hardscape & Construction is a locally owned and operated company serving homeowners and businesses across Greater Houston. Co-founded by Cesar Guifarro, our team brings over 5 years of hands-on experience in construction and hardscaping to every project. We build on five core values — compassion, consistency, hard work, honesty, and respect — and we back every job with high-quality workmanship, on-time completion, and a budget you can count on.',
        founder: 'Cesar Guifarro — Co-Founder',
      },
      areas: {
        sectionTitle: 'Proudly Serving Greater Houston',
        sectionSubtitle: 'From Katy to Pearland, we bring the same quality and care to every job site.',
      },
```

And to the `es` object:

```js
      about: {
        heading: 'Nuestro Compromiso con la Excelencia Está Grabado en Piedra',
        body: 'Longhorn Hardscape & Construction es una empresa de propiedad y operación local que atiende a propietarios y negocios en toda el área de Houston. Cofundada por Cesar Guifarro, nuestro equipo aporta más de 5 años de experiencia práctica en construcción y hardscaping a cada proyecto. Construimos sobre cinco valores fundamentales — compasión, consistencia, trabajo duro, honestidad y respeto — y respaldamos cada trabajo con mano de obra de calidad, cumplimiento de plazos y un presupuesto en el que puedes confiar.',
        founder: 'Cesar Guifarro — Cofundador',
      },
      areas: {
        sectionTitle: 'Sirviendo con Orgullo al Área de Houston',
        sectionSubtitle: 'Desde Katy hasta Pearland, llevamos la misma calidad y cuidado a cada obra.',
      },
```

- [ ] **Step 5: Append verification checks**

Insert before `run();` in `scripts/verify.mjs`:

```js
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
```

- [ ] **Step 6: Run verification**

```bash
npm run verify
```

Expected: all checks PASS including the 2 new ones.

- [ ] **Step 7: Commit**

```bash
git add index.html css/style.css js/i18n.js scripts/verify.mjs
git commit -m "Add About and Areas Served sections"
```

---

### Task 9: Contact, CTA, and Footer

**Files:**
- Modify: `index.html` (fill `<section id="contact">` and `<footer class="site-footer">`)
- Modify: `css/style.css`
- Modify: `js/i18n.js` (add `contact` and `footer` keys)
- Modify: `js/main.js` (form → mailto submit handler)
- Modify: `scripts/verify.mjs`

**Interfaces:**
- Produces: `#contact-form` with `name`, `phone`, `email`, `message` fields — this is the last content section, no later task depends on its internals besides Task 10's global reveal pass.

- [ ] **Step 1: Fill in the Contact markup**

Replace `<section id="contact" class="contact"></section>` in `index.html` with:

```html
<section id="contact" class="contact">
  <div class="container contact__grid">
    <div class="contact__info">
      <h2 data-i18n="contact.heading">Let's Build Something Solid</h2>
      <p data-i18n="contact.subtitle">Call or text us today for a free consultation — we usually respond within the hour.</p>
      <a class="btn btn--call btn--large" href="tel:+13465518340" data-i18n="hero.ctaCall">Call or Text (346) 551-8340</a>
      <ul class="contact__details">
        <li><strong data-i18n="contact.emailLabel">Email:</strong> info@longhornhctx.com</li>
        <li><strong data-i18n="contact.addressLabel">Address:</strong> 6140 Highway 6, Suite 3116, Missouri City, TX 77459</li>
        <li><strong data-i18n="contact.hoursLabel">Hours:</strong> <span data-i18n="contact.hoursValue">Mon–Fri, 9:00 AM – 5:00 PM</span></li>
      </ul>
      <p class="contact__financing" data-i18n="contact.financingNote">Ask us about flexible payment options for your project.</p>
    </div>
    <form class="contact__form" id="contact-form">
      <label>
        <span data-i18n="contact.form.name">Name</span>
        <input type="text" name="name" required>
      </label>
      <label>
        <span data-i18n="contact.form.phone">Phone</span>
        <input type="tel" name="phone" required>
      </label>
      <label>
        <span data-i18n="contact.form.email">Email</span>
        <input type="email" name="email" required>
      </label>
      <label>
        <span data-i18n="contact.form.message">Message</span>
        <textarea name="message" rows="4" required></textarea>
      </label>
      <button type="submit" class="btn btn--call" data-i18n="contact.form.submit">Send Message</button>
      <p class="contact__form-hint" data-i18n="contact.form.hint">Opens your email app to send us the details.</p>
    </form>
  </div>
</section>
```

- [ ] **Step 2: Fill in the Footer markup**

Replace `<footer class="site-footer"></footer>` in `index.html` with:

```html
<footer class="site-footer">
  <div class="container site-footer__inner">
    <img src="assets/logo.png" alt="Longhorn Hardscape & Construction" class="site-footer__logo">
    <p data-i18n="footer.tagline">Our Commitment to Excellence Is Set in Stone!</p>
    <nav class="site-footer__nav">
      <a href="#hero" data-i18n="nav.home">Home</a>
      <a href="#services" data-i18n="nav.services">Services</a>
      <a href="#gallery" data-i18n="nav.gallery">Gallery</a>
      <a href="#about" data-i18n="nav.about">About</a>
      <a href="#areas" data-i18n="nav.areas">Areas</a>
      <a href="#contact" data-i18n="nav.contact">Contact</a>
    </nav>
    <p class="site-footer__copy" data-i18n="footer.copyright">© 2026 Longhorn Hardscape & Construction. All rights reserved.</p>
  </div>
</footer>
```

- [ ] **Step 3: Add contact and footer styles**

Append to `css/style.css`:

```css
.contact { padding: 100px 0; background: var(--bg-alt); }
.contact__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
}
.contact__info h2 { font-size: clamp(1.6rem, 3vw, 2.2rem); }
.btn--large { padding: 16px 32px; font-size: 1.05rem; margin: 20px 0; }
.contact__details { list-style: none; padding: 0; margin: 20px 0; color: var(--text-muted); }
.contact__details li { margin-bottom: 8px; }
.contact__details strong { color: var(--text); }
.contact__financing { font-style: italic; color: var(--accent-start); }

.contact__form {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.contact__form label { display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem; color: var(--text-muted); }
.contact__form input, .contact__form textarea {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 12px;
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 0.95rem;
}
.contact__form input:focus, .contact__form textarea:focus { outline: 2px solid var(--accent-end); }
.contact__form-hint { font-size: 0.8rem; color: var(--text-muted); margin: 0; }

.site-footer { padding: 56px 0 32px; border-top: 1px solid var(--border); }
.site-footer__inner { display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center; }
.site-footer__logo { height: 44px; width: auto; }
.site-footer__nav { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
.site-footer__nav a { text-decoration: none; color: var(--text-muted); font-size: 0.9rem; }
.site-footer__nav a:hover { color: var(--accent-start); }
.site-footer__copy { font-size: 0.8rem; margin: 0; }

@media (max-width: 860px) {
  .contact__grid { grid-template-columns: 1fr; }
  .contact { padding: 64px 0; }
}
```

- [ ] **Step 4: Add contact/footer dictionary keys**

In `js/i18n.js`, add to the `en` object:

```js
      contact: {
        heading: "Let's Build Something Solid",
        subtitle: 'Call or text us today for a free consultation — we usually respond within the hour.',
        emailLabel: 'Email:', addressLabel: 'Address:', hoursLabel: 'Hours:',
        hoursValue: 'Mon–Fri, 9:00 AM – 5:00 PM',
        financingNote: 'Ask us about flexible payment options for your project.',
        form: { name: 'Name', phone: 'Phone', email: 'Email', message: 'Message', submit: 'Send Message', hint: 'Opens your email app to send us the details.' },
      },
      footer: {
        tagline: 'Our Commitment to Excellence Is Set in Stone!',
        copyright: '© 2026 Longhorn Hardscape & Construction. All rights reserved.',
      },
```

And to the `es` object:

```js
      contact: {
        heading: 'Construyamos Algo Sólido',
        subtitle: 'Llámanos o textéanos hoy para una consulta gratis — normalmente respondemos en menos de una hora.',
        emailLabel: 'Correo:', addressLabel: 'Dirección:', hoursLabel: 'Horario:',
        hoursValue: 'Lun–Vie, 9:00 AM – 5:00 PM',
        financingNote: 'Pregúntanos por opciones de pago flexibles para tu proyecto.',
        form: { name: 'Nombre', phone: 'Teléfono', email: 'Correo', message: 'Mensaje', submit: 'Enviar Mensaje', hint: 'Abre tu app de correo para enviarnos los detalles.' },
      },
      footer: {
        tagline: '¡Nuestro Compromiso con la Excelencia Está Grabado en Piedra!',
        copyright: '© 2026 Longhorn Hardscape & Construction. Todos los derechos reservados.',
      },
```

- [ ] **Step 5: Add mailto submit handler**

In `js/main.js`, append inside `DOMContentLoaded`:

```js
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name');
    const phone = data.get('phone');
    const email = data.get('email');
    const message = data.get('message');
    const subject = encodeURIComponent(`New project inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:info@longhornhctx.com?subject=${subject}&body=${body}`;
  });
```

- [ ] **Step 6: Append verification checks**

Insert before `run();` in `scripts/verify.mjs`:

```js
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
```

- [ ] **Step 7: Run verification**

```bash
npm run verify
```

Expected: all checks PASS including the 2 new ones.

- [ ] **Step 8: Commit**

```bash
git add index.html css/style.css js/i18n.js js/main.js scripts/verify.mjs
git commit -m "Add contact section with mailto form, CTA, and footer"
```

---

### Task 10: Global scroll-reveal animations and responsive/accessibility pass

**Files:**
- Modify: `index.html` (add `reveal` class to major content blocks)
- Modify: `css/style.css` (append `.reveal` rules and any responsive fixes found)
- Modify: `js/main.js` (Intersection Observer for `.reveal`)
- Modify: `scripts/verify.mjs`

**Interfaces:**
- Consumes: every section built in Tasks 4–9.
- Produces: nothing new consumed by later tasks — this is a polish pass.

- [ ] **Step 1: Add `reveal` class to key elements**

In `index.html`, add `class="reveal"` (or append `reveal` to existing `class` attributes) on: `.trust__grid` container div, each `.service-card`, `.gallery__grid` (or each `.gallery__item`), `.about__grid`, `.areas__grid`, `.contact__grid`. Example for one service card (repeat the pattern for all 15 and the other elements listed):

```html
<article class="service-card service-card--photo reveal" style="background-image:url('assets/gallery/gallery-turf-modern-yard.jpg')">
```

- [ ] **Step 2: Add reveal CSS**

Append to `css/style.css`:

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.is-visible { opacity: 1; transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  .hero__bg { transform: none !important; }
}
```

- [ ] **Step 3: Add the reveal Intersection Observer**

In `js/main.js`, append inside `DOMContentLoaded`:

```js
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
```

- [ ] **Step 4: Fix any horizontal overflow at mobile width**

Append to `css/style.css` as a safety net:

```css
html, body { max-width: 100%; overflow-x: hidden; }
```

- [ ] **Step 5: Verify every image has non-empty alt text**

```bash
grep -oE '<img [^>]*>' index.html | grep -v 'alt="[^"]\+"'
```

Expected: no output (every `<img>` tag already has a non-empty `alt`; if this prints any line, fix that tag's `alt` attribute before continuing).

- [ ] **Step 6: Append verification checks**

Insert before `run();` in `scripts/verify.mjs`:

```js
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
```

- [ ] **Step 7: Run verification**

```bash
npm run verify
```

Expected: all checks PASS including the 2 new ones (roughly 20 checks total by this point).

- [ ] **Step 8: Commit**

```bash
git add index.html css/style.css js/main.js scripts/verify.mjs
git commit -m "Add scroll-reveal animations and mobile/accessibility polish"
```

---

### Task 11: Publish to GitHub Pages

**Files:**
- Create: `README.md` (short project description + local preview instructions)
- No other files modified.

**Interfaces:**
- None — this is a deployment task, terminal to the plan.

- [ ] **Step 1: Write a short README**

Create `README.md`:

```markdown
# Longhorn Hardscape & Construction — Landing Page

Static, bilingual (EN/ES) landing page for Longhorn Hardscape & Construction (Missouri City, TX).

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## Verify

```bash
npm install
npx playwright install --with-deps chromium
npm run verify
```
```

- [ ] **Step 2: Commit the README**

```bash
git add README.md
git commit -m "Add README with local preview and verification instructions"
```

- [ ] **Step 3: Create the GitHub repository**

```bash
gh repo create longhorn-landing --public --source=. --remote=origin --description "Longhorn Hardscape & Construction landing page"
```

Expected: repo created at `https://github.com/Josezavala7/longhorn-landing`, `origin` remote added.

- [ ] **Step 4: Push the code**

```bash
git branch -M main
git push -u origin main
```

Expected: push succeeds, branch `main` tracks `origin/main`.

- [ ] **Step 5: Enable GitHub Pages via the API**

```bash
gh api -X POST repos/Josezavala7/longhorn-landing/pages -f "source[branch]=main" -f "source[path]=/"
```

Expected: JSON response with `"status":"queued"` or similar (a 201/200 response). If it returns `already exists` that's fine — Pages is already enabled.

- [ ] **Step 6: Poll until the Pages site is live**

```bash
gh api repos/Josezavala7/longhorn-landing/pages
```

Expected: JSON includes `"html_url": "https://josezavala7.github.io/longhorn-landing/"` and `"status": "built"` (may show `"building"` for the first minute — re-run the command after ~60 seconds if so).

- [ ] **Step 7: Confirm the live URL responds**

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://josezavala7.github.io/longhorn-landing/
```

Expected: `200`. If `404`, wait another 60 seconds (Pages first build can take a couple of minutes) and retry.

- [ ] **Step 8: Report the live URL**

No git action — just confirm to the user that `https://josezavala7.github.io/longhorn-landing/` is live and ready to share with the client's friend for review.
