import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = join(__dirname, '..');

const DIRS = [
  'assets/images/hero',
  'assets/images/projects',
  'assets/images/patios',
  'assets/images/turf',
  'assets/images/kitchens',
  'assets/images/driveways',
  'assets/images/outdoor-living',
  'assets/images/areas',
  'assets/images/team',
  'assets/images/blog',
  'assets/gallery',
];

let converted = 0, skipped = 0, saved = 0;

for (const dir of DIRS) {
  const fullDir = join(BASE, dir);
  let files;
  try { files = await readdir(fullDir); } catch { continue; }

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const src = join(fullDir, file);
    const webpName = basename(file, ext) + '.webp';
    const dest = join(fullDir, webpName);

    const { size } = await stat(src);

    try {
      await sharp(src)
        .webp({ quality: 82, effort: 4 })
        .toFile(dest);

      const { size: newSize } = await stat(dest);
      const reduction = Math.round((1 - newSize / size) * 100);
      saved += (size - newSize);
      converted++;
      console.log(`✓ ${dir}/${webpName} (${reduction}% smaller)`);
    } catch (e) {
      console.error(`✗ ${file}: ${e.message}`);
      skipped++;
    }
  }
}

console.log(`\nDone: ${converted} converted, ${skipped} failed`);
console.log(`Total saved: ${(saved / 1048576).toFixed(1)} MB`);
