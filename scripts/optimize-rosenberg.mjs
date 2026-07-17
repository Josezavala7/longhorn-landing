import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join } from 'path';

const SRC = 'C:/Users/José Mario Zavala/Downloads/Telegram Desktop/rosenberg';
const OUT = 'assets/images/rosenberg';

mkdirSync(OUT, { recursive: true });

const map = [
  ['photo_1_2026-07-16_23-35-52.jpg', 'stone-fire-pit-flagstone-patio-seating-wall-lanterns-rosenberg-tx'],
  ['photo_2_2026-07-16_23-35-52.jpg', 'fire-pit-landscape-lighting-dusk-seating-wall-rosenberg-tx'],
  ['photo_3_2026-07-16_23-35-52.jpg', 'circular-raised-paver-patio-seating-wall-custom-masonry-rosenberg-tx'],
  ['photo_4_2026-07-16_23-35-52.jpg', 'herringbone-paver-walkway-circular-medallion-front-entry-rosenberg-tx'],
];

for (const [src, name] of map) {
  const info = await sharp(join(SRC, src))
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(join(OUT, name + '.webp'));
  console.log(`✓ ${name}.webp — ${info.width}x${info.height}`);
}
