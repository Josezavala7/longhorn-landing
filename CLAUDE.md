# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Static, bilingual (EN/ES) landing page for **Longhorn Hardscape & Construction** (Missouri City, TX / Greater Houston). No build step, no framework, no bundler — plain HTML/CSS/JS served as-is (works from a static file server or GitHub Pages).

The client loved this v1 site and has asked for a **new v2 version built to their own specs** (specs not yet delivered as of this writing). The `ui-ux-pro-max` skill is installed specifically for that redesign work.

**Process preference:** the client/user wants fast, low-ceremony execution on this project — get to visible, polished results quickly rather than running heavy brainstorming/spec/plan cycles for what is a single-page marketing site.

## Commands

```bash
# Preview locally
python3 -m http.server 8000        # then open http://localhost:8000

# Verify (Playwright smoke tests against index.html)
npm install
npx playwright install --with-deps chromium   # or see .playwright-libs/ fallback below
npm run verify
```

There is no lint/build/unit-test setup — `npm run verify` (`scripts/verify.mjs`) is the only automated check. It spins up a throwaway static server on port 8181, opens `index.html` in headless Chromium, and runs a fixed list of `checks.push({ name, fn })` assertions (page title, all six section anchors present, i18n toggle, mobile nav, lightbox, counters, exact card/gallery counts, no console errors, no horizontal overflow at 375px, etc.). To add a new check, append another `checks.push(...)` block near the bottom of `scripts/verify.mjs` — there's no test runner/framework beyond this custom script.

If Playwright's `--with-deps` can't run (no root), the missing `.so` libs are expected in `.playwright-libs/` (already gitignored) — `npm run verify` picks them up via `LD_LIBRARY_PATH` automatically.

`scripts/optimize-images.mjs` is a one-off resize/compress script (sharp) that reads from a hardcoded scratchpad path and writes into `assets/gallery/`; it's not part of the regular workflow — treat it as a template to copy/adjust when a new batch of raw photos needs processing, not a script to run as-is.

## Architecture

Everything lives in three files plus assets — there is no component system or templating:

- **`index.html`** — single page, six `<section>`s in order: `#hero`, (`.trust` counters), `#why-us`, `#services`, `#gallery`, `#about`, `#areas`, `#contact`. All copy that needs to be bilingual is marked with `data-i18n="path.to.key"` (or `data-i18n-placeholder` for input placeholders) instead of being hardcoded — the actual EN/ES strings never live in the HTML.
- **`js/i18n.js`** — self-contained IIFE holding both full translation trees (`en`, `es`) keyed to match the `data-i18n` dot-paths in the HTML, plus `applyLanguage()`/`initI18n()` which walk the DOM and swap text/placeholders, persist the choice to `localStorage['longhorn-lang']`, and toggle `.lang-toggle__option.is-active`. **Any new copy must be added to both language trees under the same key**, and referenced from the HTML via `data-i18n`, never inlined directly — otherwise `verify.mjs`'s language-switch checks (and the toggle itself) will silently show stale/English text.
- **`js/main.js`** — all page behavior in one `DOMContentLoaded` handler: scroll-based header state (`is-scrolled`), mobile nav toggle, hero parallax, animated trust counters (`IntersectionObserver` on `[data-target]`), gallery lightbox, contact form (submits via `mailto:` — no backend), and scroll-reveal animations (`.reveal` → `.is-visible` via `IntersectionObserver`).
- **`css/style.css`** — all styling via CSS custom properties defined once in `:root` (see color/font/spacing tokens at the top of the file) — don't hardcode colors/fonts that already have a variable. Sections are dark-themed by default; sections with class `section-light` (`why-us`, `about`) flip to the light palette. Respects `prefers-reduced-motion` by disabling entrance/parallax animations.
- **`assets/gallery/`** — real project photos referenced directly by filename from `index.html` (gallery grid + hero background); counts are asserted exactly in `verify.mjs` (currently 15 service cards, 17 gallery items, 10 city chips, 4 why-us cards) — adding/removing a card must update the corresponding count in `scripts/verify.mjs` or verify will fail.

## Working notes

- No CSS/JS preprocessing — edit `css/style.css` and `js/*.js` directly, refresh the browser.
- Phone/email/address and any other contact facts are duplicated in both `index.html` markup and `js/i18n.js` copy — check both when they change.
- `docs/superpowers/` holds the original spec/plan docs (`specs/2026-07-03-longhorn-landing-design.md`, `plans/2026-07-03-longhorn-landing-implementation.md`) from when v1 was built — useful for background on why v1 looks the way it does, not necessarily binding on the v2 redesign.
