import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join } from 'path';

const SRC = 'C:/Users/José Mario Zavala/Downloads/Telegram Desktop/missoury';
const OUT = 'assets/images/missouri-city';

mkdirSync(OUT, { recursive: true });

const map = [
  ['photo_3_2026-07-17_23-37-55.jpg', 'modern-patio-cover-outdoor-kitchen-lawn-fountain-white-brick-missouri-city-tx'],
  ['photo_1_2026-07-17_23-37-55.jpg', 'gabled-patio-cover-cedar-ceiling-stone-columns-stamped-concrete-missouri-city-tx'],
  ['photo_2_2026-07-17_23-37-55.jpg', 'gabled-patio-cover-outdoor-kitchen-tv-stone-columns-cedar-ceiling-missouri-city-tx'],
  ['photo_4_2026-07-17_23-37-55.jpg', 'stucco-barrel-vault-patio-cover-columns-outdoor-dining-palm-trees-missouri-city-tx'],
];

for (const [src, name] of map) {
  const info = await sharp(join(SRC, src))
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 83 })
    .toFile(join(OUT, name + '.webp'));
  console.log(`✓ ${name}.webp — ${info.width}x${info.height}`);
}
