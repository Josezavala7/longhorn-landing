import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC_DIR =
  '/tmp/claude-1000/-home-mario-proyectos-longhorn-landing/19a5487c-bc44-44ba-bfbb-cf759d8dc0a5/scratchpad/images';
const OUT_DIR = new URL('../assets/gallery/', import.meta.url).pathname;

mkdirSync(OUT_DIR, { recursive: true });

const MAP = [
  ['gallery/g16.jpg', 'hero-backyard-oasis.jpg', 1920],
  ['gallery/g22.jpg', 'gallery-backyard-pool-2.jpg', 1400],
  ['gallery/g07.jpg', 'gallery-firepit-dusk.jpg', 1400],
  ['gallery/g21.jpg', 'gallery-firepit-circular.jpg', 1400],
  ['gallery/g15.jpg', 'gallery-geometric-turf.jpg', 1400],
  ['gallery/g14.jpg', 'gallery-travertine-diamond.jpg', 1400],
  ['gallery/g20.jpg', 'gallery-herringbone-patio.jpg', 1400],
  ['gallery/g13.jpg', 'gallery-putting-green.jpg', 1400],
  ['gallery/g09.jpg', 'gallery-lattice-turf.jpg', 1400],
  ['gallery/g12.jpg', 'gallery-turf-pavers-clean.jpg', 1400],
  ['gallery/g11.jpg', 'gallery-turf-corner.jpg', 1400],
  ['gallery/g05.jpg', 'gallery-turf-paver-yard.jpg', 1400],
  ['gallery/g06.jpg', 'gallery-turf-modern-yard.jpg', 1400],
  ['gallery/g08.jpg', 'gallery-process-install.jpg', 1400],
  ['gallery/g04.jpg', 'gallery-commercial-painting-arches.jpg', 1400],
  ['gallery/g18.jpg', 'gallery-commercial-painting-apartments.jpg', 1400],
  ['gallery/g19.jpg', 'gallery-commercial-exterior.jpg', 1400],
];

for (const [srcRel, outName, width] of MAP) {
  const srcPath = `${SRC_DIR}/${srcRel}`;
  const outPath = `${OUT_DIR}${outName}`;
  await sharp(srcPath)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 78 })
    .toFile(outPath);
  console.log(`wrote ${outName}`);
}
