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

If your environment can't run `--with-deps` (no root/sudo), download the missing shared
libraries (`libnspr4`, `libnss3`, `libasound2`, etc.) as `.deb` packages, extract them with
`dpkg-deb -x <file> <dir>` into a local `.playwright-libs/` folder, and the `verify` script
will pick them up automatically via `LD_LIBRARY_PATH`.
