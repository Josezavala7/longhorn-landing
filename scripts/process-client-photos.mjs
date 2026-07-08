import sharp from 'sharp';
import { copyFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const SRC = 'descargas/fotos';
const BASE = 'assets/images';

// [source, dest_folder, dest_name, width, quality]
const jobs = [
  // ── GALLERY (homepage) — 17 best shots ──────────────────────────────────
  ['DSC07832-Edit.jpg',               'gallery', 'outdoor-living-pool-firepit-houston.jpg',          1920, 82],
  ['DSC07828-Edit.jpg',               'gallery', 'backyard-pool-outdoor-living-houston.jpg',          1200, 80],
  ['DSC07827-Edit.jpg',               'gallery', 'pool-deck-travertine-fire-pit-houston.jpg',         1200, 80],
  ['DSC07831-Edit.jpg',               'gallery', 'backyard-fire-bowls-pool-deck-houston.jpg',         1200, 80],
  ['DSC07826-Edit.jpg',               'gallery', 'outdoor-kitchen-grill-pergola-houston.jpg',         1200, 80],
  ['DSC07829-Edit.jpg',               'gallery', 'pool-house-fire-bowl-artificial-turf-houston.jpg',  1200, 80],
  ['DSC07837-Edit.jpg',               'gallery', 'outdoor-living-room-fireplace-pergola-houston.jpg', 1200, 80],
  ['DSC07841-Edit.jpg',               'gallery', 'concrete-driveway-landscape-lighting-houston.jpg',  1200, 80],
  ['DSC07843-Edit.jpg',               'gallery', 'luxury-landscaping-driveway-night-houston.jpg',     1200, 80],
  ['DSC07821-Edit.jpg',               'gallery', 'artificial-turf-putting-green-houston.jpg',         1200, 80],
  ['DSC07822-Edit.jpg',               'gallery', 'artificial-turf-stepping-stones-putting-green.jpg', 1200, 80],
  ['DJI_20260610202450_0189_D.jpg',   'gallery', 'artificial-turf-putting-green-aerial-houston.jpg',  1200, 80],
  ['DJI_20260610202631_0193_D.jpg',   'gallery', 'luxury-home-aerial-front-houston.jpg',              1200, 80],
  ['DJI_20260610203004_0198_D-Edit.jpg','gallery','luxury-home-driveway-sunset-aerial-houston.jpg',   1200, 80],
  ['DJI_20260610203039_0199_D.jpg',   'gallery', 'backyard-pool-outdoor-kitchen-aerial-houston.jpg',  1200, 80],
  ['DJI_20260610203635_0213_D.jpg',   'gallery', 'pool-spa-travertine-patio-aerial-houston.jpg',      1200, 80],
  ['DJI_20260610202702_0194_D.jpg',   'gallery', 'luxury-hardscape-landscaping-aerial-houston.jpg',   1200, 80],

  // ── HERO IMAGES (service page heroes) ───────────────────────────────────
  ['DSC07832-Edit.jpg',               'hero', 'hero-outdoor-living-houston.jpg',         1920, 82],
  ['DSC07826-Edit.jpg',               'hero', 'hero-outdoor-kitchen-houston.jpg',        1920, 82],
  ['DSC07821-Edit.jpg',               'hero', 'hero-artificial-turf-houston.jpg',        1920, 82],
  ['DJI_20260610203004_0198_D-Edit.jpg','hero','hero-landscaping-houston.jpg',           1920, 82],
  ['DSC07841-Edit.jpg',               'hero', 'hero-driveway-contractor-houston.jpg',    1920, 82],

  // ── ARTIFICIAL TURF PAGE ─────────────────────────────────────────────────
  ['DJI_20260610202450_0189_D.jpg',   'turf', 'artificial-turf-putting-green-aerial.jpg',     1200, 80],
  ['DJI_20260610202508_0190_D.jpg',   'turf', 'artificial-turf-side-yard-lit-stepping-stones.jpg', 1200, 80],
  ['DSC07821-Edit.jpg',               'turf', 'synthetic-grass-putting-green-houston.jpg', 1200, 80],
  ['DSC07822-Edit.jpg',               'turf', 'artificial-turf-backyard-stepping-stones.jpg', 1200, 80],

  // ── OUTDOOR LIVING PAGE ──────────────────────────────────────────────────
  ['DSC07828-Edit.jpg',               'outdoor-living', 'outdoor-living-backyard-pool-houston.jpg',      1200, 80],
  ['DSC07827-Edit.jpg',               'outdoor-living', 'outdoor-living-travertine-pool-deck.jpg',       1200, 80],
  ['DSC07831-Edit.jpg',               'outdoor-living', 'outdoor-living-fire-bowls-pool-night.jpg',      1200, 80],
  ['DSC07832-Edit.jpg',               'outdoor-living', 'outdoor-living-fire-pit-pool-pergola.jpg',      1200, 80],
  ['DJI_20260610203635_0213_D.jpg',   'outdoor-living', 'outdoor-living-pool-spa-aerial-houston.jpg',   1200, 80],

  // ── OUTDOOR KITCHEN PAGE ─────────────────────────────────────────────────
  ['DSC07826-Edit.jpg',               'kitchens', 'outdoor-kitchen-grill-stone-counter-houston.jpg',  1200, 80],
  ['DSC07837-Edit.jpg',               'kitchens', 'outdoor-kitchen-pergola-fireplace-houston.jpg',    1200, 80],

  // ── DRIVEWAY + LANDSCAPING PAGES ────────────────────────────────────────
  ['DSC07841-Edit.jpg',               'driveways', 'concrete-driveway-lighting-houston-night.jpg',   1200, 80],
  ['DSC07843-Edit.jpg',               'driveways', 'driveway-landscaping-uplighting-houston.jpg',    1200, 80],
  ['DJI_20260610202631_0193_D.jpg',   'driveways', 'luxury-home-driveway-aerial-houston.jpg',       1200, 80],

  // ── PROJECTS PAGE ────────────────────────────────────────────────────────
  ['DJI_20260610203039_0199_D.jpg',   'projects', 'cesar-project-backyard-aerial-houston.jpg',          1200, 80],
  ['DJI_20260610202702_0194_D.jpg',   'projects', 'cesar-project-front-aerial-sunset-houston.jpg',      1200, 80],
  ['DJI_20260610202551_0192_D-Edit.jpg','projects','cesar-project-aerial-overview-houston.jpg',          1200, 80],
  ['DSC07828-Edit.jpg',               'projects', 'cesar-project-pool-outdoor-living-houston.jpg',       1200, 80],
  ['DSC07832-Edit.jpg',               'projects', 'cesar-project-fire-pit-pool-night-houston.jpg',       1200, 80],
];

const dirs = [...new Set(jobs.map(j => j[1] === 'gallery' ? 'assets/gallery' : `${BASE}/${j[1]}`))];
for (const d of dirs) {
  if (!existsSync(d)) await mkdir(d, { recursive: true });
}

let ok = 0, fail = 0;
for (const [src, folder, name, width, quality] of jobs) {
  const srcPath = `${SRC}/${src}`;
  const destDir = folder === 'gallery' ? 'assets/gallery' : `${BASE}/${folder}`;
  const destPath = `${destDir}/${name}`;
  try {
    await sharp(srcPath)
      .resize(width, null, { withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toFile(destPath);
    const { size } = await import('fs').then(m => m.promises.stat(destPath));
    console.log(`✓ ${name} (${Math.round(size/1024)}KB)`);
    ok++;
  } catch (e) {
    console.error(`✗ ${name}: ${e.message}`);
    fail++;
  }
}
console.log(`\nDone: ${ok} ok, ${fail} failed`);
