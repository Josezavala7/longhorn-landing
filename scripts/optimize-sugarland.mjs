import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join } from 'path';

const SRC = 'C:/Users/José Mario Zavala/Downloads/Telegram Desktop/sugarland';
const OUT = 'assets/images/sugarland';

mkdirSync(OUT, { recursive: true });

const map = [
  ['photo_3_2026-07-17_23-09-59.jpg', 'backyard-pool-spa-artificial-turf-stepping-stone-grid-sugarland-tx'],
  ['photo_1_2026-07-17_23-09-59.jpg', 'patio-cover-limestone-wall-outdoor-tv-stepping-stones-artificial-turf-sugarland-tx'],
  ['photo_2_2026-07-17_23-09-59.jpg', 'pool-travertine-deck-stepping-stones-artificial-turf-covered-patio-sugarland-tx'],
  ['photo_4_2026-07-17_23-09-59.jpg', 'fire-pit-circular-seating-wall-paver-pathway-string-lights-sugarland-tx'],
];

for (const [src, name] of map) {
  const info = await sharp(join(SRC, src))
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 83 })
    .toFile(join(OUT, name + '.webp'));
  console.log(`✓ ${name}.webp — ${info.width}x${info.height}`);
}
