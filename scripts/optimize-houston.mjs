import sharp from 'sharp';
import { join } from 'node:path';

const SRC = 'C:\\Users\\José Mario Zavala\\Downloads\\Telegram Desktop\\houston';
const OUT = 'C:\\Users\\José Mario Zavala\\Documents\\Syntax\\longhorn-landing\\assets\\images\\houston';

const MAP = [
  ['photo_1_2026-07-16_21-02-51.jpg', 'artificial-turf-putting-green-multi-hole-houston-tx.webp', 1400],
  ['photo_2_2026-07-16_21-02-51.jpg', 'covered-patio-wood-ceiling-steel-frame-outdoor-dining-houston-tx.webp', 1400],
  ['photo_3_2026-07-16_21-02-51.jpg', 'outdoor-kitchen-brick-stainless-grill-wine-cooler-covered-patio-houston-tx.webp', 1400],
  ['photo_4_2026-07-16_21-02-51.jpg', 'backyard-transformation-louvered-pergola-paver-patio-turf-houston-tx.webp', 1400],
  ['photo_5_2026-07-16_21-02-51.jpg', 'louvered-pergola-artificial-turf-string-lights-evening-houston-tx.webp', 1400],
];

for (const [src, out, width] of MAP) {
  await sharp(join(SRC, src))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(join(OUT, out));
  console.log(`✓ ${out}`);
}
