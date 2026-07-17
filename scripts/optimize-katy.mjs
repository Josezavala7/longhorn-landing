import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join } from 'path';

const SRC = 'C:/Users/José Mario Zavala/Downloads/Telegram Desktop/katy';
const OUT = 'assets/images/katy';

mkdirSync(OUT, { recursive: true });

const map = [
  ['photo_1_2026-07-16_23-00-56.jpg', 'artificial-turf-raised-planter-bed-landscape-lighting-katy-tx'],
  ['photo_2_2026-07-16_23-00-56.jpg', 'estate-putting-green-sand-bunker-pool-katy-tx'],
  ['photo_3_2026-07-16_23-00-56.jpg', 'putting-green-night-landscape-lighting-katy-tx'],
  ['photo_4_2026-07-16_23-00-56.jpg', 'custom-stone-fireplace-white-pergola-paver-patio-katy-tx'],
];

for (const [src, name] of map) {
  const info = await sharp(join(SRC, src))
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(join(OUT, name + '.webp'));
  console.log(`✓ ${name}.webp — ${info.width}x${info.height}`);
}
