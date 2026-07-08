// Wraps <img src="assets/...jpg"> in <picture><source webp><img></picture>
// Skips images that already have a <source> parent or are logos/favicon

import { readdir, readFile, writeFile } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = join(__dirname, '..');

const htmlFiles = [];

async function collectHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory() && !['node_modules', '.git', '.claude', 'design-system', 'scripts'].includes(e.name)) {
      await collectHtml(join(dir, e.name));
    } else if (e.isFile() && e.name.endsWith('.html') && e.name !== 'index-v1-backup.html') {
      htmlFiles.push(join(dir, e.name));
    }
  }
}

await collectHtml(BASE);

let totalWrapped = 0;

for (const file of htmlFiles) {
  let html = await readFile(file, 'utf-8');
  let changed = 0;

  // Match <img> tags that reference assets/ jpg/png but are NOT already inside <picture>
  // Strategy: replace <img src="assets/....(jpg|jpeg|png)" ...> that are NOT preceded by </source>
  html = html.replace(
    /(<picture>\s*)<img(\s[^>]*?)src="(assets\/[^"]+\.(jpg|jpeg|png))"([^>]*?)>/gi,
    (match, picOpen, before, src, ext, after) => {
      // Already inside picture — add source if not present
      const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      const webpFull = join(BASE, webpSrc);
      if (!existsSync(webpFull)) return match;
      return `${picOpen}<source srcset="${webpSrc}" type="image/webp"><img${before}src="${src}"${after}>`;
    }
  );

  // Now wrap standalone <img src="assets/...jpg"> NOT already in <picture>
  html = html.replace(
    /(?<!<\/source>\s*)(?<!<picture[^>]*>\s*(?:<source[^>]*>\s*)?)(<img(\s[^>]*?)src="(assets\/[^"]+\.(jpg|jpeg|png))"([^>]*?)>)/gi,
    (match, imgTag, before, src, ext, after) => {
      // Skip logo, favicon, og image
      if (src.includes('logo') || src.includes('favicon') || src.includes('og-default')) return match;
      const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      const webpFull = join(BASE, webpSrc);
      if (!existsSync(webpFull)) return match;
      changed++;
      return `<picture><source srcset="${webpSrc}" type="image/webp">${imgTag}</picture>`;
    }
  );

  if (changed > 0) {
    await writeFile(file, html, 'utf-8');
    totalWrapped += changed;
    console.log(`${file.replace(BASE, '').replace(/\\/g, '/')} — ${changed} images wrapped`);
  }
}

console.log(`\nDone: ${totalWrapped} images now have WebP sources across ${htmlFiles.length} files`);
