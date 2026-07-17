import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join } from 'path';

const SRC = 'C:/Users/José Mario Zavala/Downloads/Telegram Desktop/cypress';
const OUT = 'assets/images/cypress';

mkdirSync(OUT, { recursive: true });

const map = [
  ['photo_1_2026-07-16_22-36-51.jpg', 'artificial-turf-backyard-louvered-pergola-cypress-tx'],
  ['photo_2_2026-07-16_22-36-51.jpg', 'artificial-turf-gravel-border-louvered-pergola-cypress-tx'],
  ['photo_3_2026-07-16_22-36-51.jpg', 'aerial-view-artificial-turf-putting-green-pool-cypress-tx'],
  ['photo_4_2026-07-16_22-36-51.jpg', 'geometric-turf-pattern-fire-pit-pool-cypress-tx'],
  ['photo_5_2026-07-16_22-36-51.jpg', 'putting-green-sand-bunker-cedar-fence-cypress-tx'],
  ['photo_6_2026-07-16_22-36-51.jpg', 'backyard-putting-green-lounge-area-cypress-tx'],
];

for (const [src, name] of map) {
  const srcPath = join(SRC, src);
  const outPath = join(OUT, name + '.webp');
  const info = await sharp(srcPath)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outPath);
  console.log(`✓ ${name}.webp — ${info.width}x${info.height}`);
}
