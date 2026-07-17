import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC_DIR = 'C:\\Users\\José Mario Zavala\\Downloads\\Telegram Desktop\\pearland';
const OUT_DIR = 'C:\\Users\\José Mario Zavala\\Documents\\Syntax\\longhorn-landing\\assets\\images\\pearland';


const MAP = [
  ['photo_1_2026-07-16_19-39-19.jpg', 'outdoor-kitchen-brick-granite-string-lights-pearland-tx.webp', 1400],
  ['photo_2_2026-07-16_19-39-19.jpg', 'modern-outdoor-kitchen-island-bar-seating-tv-pearland-tx.webp', 1400],
  ['photo_3_2026-07-16_19-39-19.jpg', 'outdoor-kitchen-l-shape-porcelain-tile-refrigerator-pearland-tx.webp', 1400],
  ['photo_4_2026-07-16_19-39-19.jpg', 'artificial-turf-putting-green-rock-border-pearland-tx.webp', 1400],
  ['photo_5_2026-07-16_19-39-19.jpg', 'outdoor-living-pool-pergola-paver-patio-fire-pit-pearland-tx.webp', 1400],
  ['photo_6_2026-07-16_19-39-19.jpg', 'paver-driveway-landscaped-flower-beds-pearland-tx.webp', 1400],
];

for (const [src, out, width] of MAP) {
  const srcPath = join(SRC_DIR, src);
  const outPath = join(OUT_DIR, out);
  await sharp(srcPath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outPath);
  console.log(`✓ ${out}`);
}
