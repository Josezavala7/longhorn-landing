import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join } from 'path';

const SRC = 'C:/Users/José Mario Zavala/Downloads/Telegram Desktop/manvel';
const OUT = 'assets/images/manvel';

mkdirSync(OUT, { recursive: true });

const map = [
  ['photo_2_2026-07-17_22-14-55.jpg', 'paver-patio-white-gravel-turf-backyard-transformation-manvel-tx'],
  ['photo_1_2026-07-17_22-14-55.jpg', 'artificial-turf-play-area-paver-patio-white-gravel-manvel-tx'],
  ['photo_3_2026-07-16_22-12-47.jpg', 'insulated-patio-cover-recessed-lighting-ceiling-fan-brick-columns-manvel-tx'],
  ['photo_5_2026-07-17_22-14-55.jpg', 'curved-seating-wall-step-lights-paver-driveway-night-manvel-tx'],
];

for (const [src, name] of map) {
  const info = await sharp(join(SRC, src))
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(join(OUT, name + '.webp'));
  console.log(`✓ ${name}.webp — ${info.width}x${info.height}`);
}
