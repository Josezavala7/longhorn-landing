import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join } from 'path';

const SRC = 'C:/Users/José Mario Zavala/Downloads/Telegram Desktop/sienna';
const OUT = 'assets/images/sienna';

mkdirSync(OUT, { recursive: true });

const map = [
  ['photo_1_2026-07-18_00-09-45.jpg', 'aerial-drone-pool-artificial-turf-putting-green-estate-backyard-sienna-tx'],
  ['photo_4_2026-07-18_00-09-45.jpg', 'gabled-patio-cover-dark-beams-cedar-ceiling-outdoor-kitchen-lawn-sienna-tx'],
  ['photo_3_2026-07-16_22-12-47.jpg', 'insulated-patio-cover-white-columns-ceiling-fans-recessed-lights-sienna-tx'],
  ['photo_1_2026-07-17_23-37-55.jpg', 'gabled-patio-cover-cedar-ceiling-stone-column-outdoor-seating-sienna-tx'],
  ['photo_2_2026-07-18_00-09-45.jpg', 'artificial-turf-putting-green-golf-flags-white-brick-home-sienna-tx'],
  ['photo_3_2026-07-18_00-09-45.jpg', 'artificial-turf-putting-green-pergola-pavilion-backyard-sienna-tx'],
];

for (const [src, name] of map) {
  const info = await sharp(join(SRC, src))
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 83 })
    .toFile(join(OUT, name + '.webp'));
  console.log(`✓ ${name}.webp — ${info.width}x${info.height}`);
}
