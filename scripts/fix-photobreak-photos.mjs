/**
 * Replaces the svc-photo-break img srcs on each service page with valid, existing photos
 * that don't repeat the bottom gallery-of-6 or the split-intro photo.
 *
 * Gallery-of-6 references are taken from update-service-galleries.mjs.
 * Run once, done.
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const fixes = [
  {
    file: 'pergolas-houston.html',
    // split-intro: pergola-installation-houston-tx.webp
    // gallery-6: DJI_...0204, IMG_6434, pergola-installation-houston-tx, IMG_6435, IMG_6436, IMG_6325
    // Available not yet used: IMG_6324, IMG_6326, Screenshot (skip)
    photos: [
      { src: 'assets/images/pergolas/IMG_6324.webp',  alt: 'Custom backyard pergola with outdoor seating area in Houston TX' },
      { src: 'assets/images/pergolas/IMG_6326.webp',  alt: 'Pergola with shade structure and patio furniture in Houston TX' },
      { src: 'assets/images/pergolas/DJI_20260610203303_0204_D-Edit-2.webp', alt: 'Aerial drone view of backyard pergola and outdoor living space in Houston TX' },
    ],
  },
  {
    file: 'fire-features-houston.html',
    // split-intro: fire-feature-patio-houston-tx.webp (doesn't exist — need to fix too)
    // gallery-6 (from assets/gallery): backyard-fire-bowls-pool-deck, gallery-firepit-dusk, pool-deck-travertine-fire-pit, pool-house-fire-bowl, gallery-firepit-circular
    //           + assets/images/fire-features/IMG_5862.webp
    // Available fire-features images: IMG_0145/46/48/49/51, IMG_1265/66, IMG_5747/48, IMG_5862, outdoor-living-spaces-houston-tx
    photos: [
      { src: 'assets/images/fire-features/IMG_0145.webp', alt: 'Custom fire pit with stone surround and evening lighting in Houston TX' },
      { src: 'assets/images/fire-features/IMG_0148.webp', alt: 'Outdoor fireplace with stone finish and patio seating in Houston TX' },
      { src: 'assets/images/fire-features/IMG_5747.webp', alt: 'Fire bowl and outdoor living space at dusk in Houston TX' },
    ],
  },
  {
    file: 'outdoor-kitchen-houston.html',
    // split-intro: outdoor-kitchen-grill-pergola-houston (gallery photo — fix split-intro too)
    // gallery-6: backyard-pool-outdoor-kitchen-aerial, outdoor-kitchen-grill-pergola, -01, -05, -10, -15
    // Available not used: -02,-03,-04,-06,-07,-08,-09,-11,-12,-13,-14,-16,-17,-18,-19,-20
    photos: [
      { src: 'assets/gallery/outdoor-kitchen-03-houston-tx.webp', alt: 'Custom outdoor kitchen with stone island and seating bar in Houston TX' },
      { src: 'assets/gallery/outdoor-kitchen-08-houston-tx.webp', alt: 'Built-in grill outdoor kitchen with pergola cover in Houston TX' },
      { src: 'assets/gallery/outdoor-kitchen-13-houston-tx.webp', alt: 'Luxury outdoor kitchen with granite counters and refrigerator in Houston TX' },
    ],
  },
  {
    file: 'artificial-turf-houston.html',
    // split-intro: gallery-geometric-turf (also in gallery — overlap; kept for now)
    // gallery-6: artificial-turf-putting-green-aerial, gallery-geometric-turf, gallery-turf-modern-yard, gallery-turf-paver-yard, gallery-lattice-turf, artificial-turf-stepping-stones
    // These are all the gallery photos AND the split-intro — let me change split-intro too
    // Other turf images in assets/gallery:
    photos: [
      { src: 'assets/gallery/pool-house-fire-bowl-artificial-turf-houston.webp', alt: 'Pool house with artificial turf and fire bowl in Houston TX' },
      { src: 'assets/gallery/artificial-turf-stepping-stones-putting-green.webp', alt: 'Artificial turf putting green with stepping stones Houston TX' },
      { src: 'assets/gallery/backyard-pool-outdoor-kitchen-aerial-houston.webp', alt: 'Aerial view of backyard with artificial turf pool and outdoor kitchen Houston TX' },
    ],
  },
  {
    file: 'outdoor-living-spaces-houston.html',
    // split-intro: outdoor-living-room-fireplace-pergola (gallery photo)
    // gallery-6: pool-spa-travertine-patio-aerial, outdoor-living-pool-firepit, outdoor-living-room-fireplace-pergola, backyard-pool-outdoor-living, -01, -05
    // Available: -02,-03,-04,-06,-07,-08,-09,-10+
    photos: [
      { src: 'assets/gallery/outdoor-living-space-02-houston-tx.webp', alt: 'Outdoor living space with fireplace and string lights in Houston TX' },
      { src: 'assets/gallery/outdoor-living-space-04-houston-tx.webp', alt: 'Complete backyard outdoor living makeover with pergola in Houston TX' },
      { src: 'assets/gallery/outdoor-living-space-07-houston-tx.webp', alt: 'Luxury outdoor living space with pool patio and landscaping Houston TX' },
    ],
  },
  {
    file: 'custom-stonework-houston.html',
    // split-intro: custom-stonework-03 (gallery photo)
    // gallery-6: -01,-02,-03,-04,-05,-06
    // Available: -07,-08,-09
    photos: [
      { src: 'assets/gallery/custom-stonework-07-houston-tx.webp', alt: 'Natural stone garden wall and retaining structure Houston TX' },
      { src: 'assets/gallery/custom-stonework-08-houston-tx.webp', alt: 'Stone veneer accent wall and outdoor feature Houston TX' },
      { src: 'assets/gallery/custom-stonework-09-houston-tx.webp', alt: 'Custom stone steps and decorative stonework Houston TX' },
    ],
  },
  {
    file: 'driveway-contractor-houston.html',
    // split-intro: luxury-home-driveway-sunset-aerial-houston (gallery photo)
    // gallery-6: luxury-home-driveway-aerial, luxury-home-driveway-sunset-aerial, luxury-landscaping-driveway-night, concrete-driveway-lighting-houston-night, circular-driveway, paver-driveway
    // Available driveways/: concrete-driveway-pearland-tx, driveway-contractor-houston-concrete-pavers, driveway-landscaping-uplighting-houston, exposed-aggregate-driveway-katy-tx, paver-driveway-sugar-land-tx, stamped-concrete-driveway-houston-tx
    photos: [
      { src: 'assets/images/driveways/stamped-concrete-driveway-houston-tx.webp', alt: 'Stamped concrete driveway installation Houston TX' },
      { src: 'assets/images/driveways/driveway-contractor-houston-concrete-pavers.webp', alt: 'Concrete paver driveway contractor Houston TX' },
      { src: 'assets/images/driveways/exposed-aggregate-driveway-katy-tx.webp', alt: 'Exposed aggregate driveway Katy TX' },
    ],
  },
  {
    file: 'painting-houston.html',
    // split-intro: painting-02
    // gallery-6: painting-01,-03,-05, gallery-commercial-painting-apartments, gallery-commercial-painting-arches, painting-07
    // Available: -04,-06,-08,-09,-10,-11,-12,-13
    photos: [
      { src: 'assets/gallery/painting-06-houston-tx.webp', alt: 'Exterior house painting with premium finish Houston TX' },
      { src: 'assets/gallery/painting-09-houston-tx.webp', alt: 'Interior room painting with accent wall Houston TX' },
      { src: 'assets/gallery/painting-11-houston-tx.webp', alt: 'Professional exterior painting transformation Houston TX' },
    ],
  },
];

// Also fix fire-features split-intro (points to non-existent fire-feature-patio-houston-tx.webp)
// and artificial-turf + outdoor-kitchen split-intros that repeat gallery photos
const splitIntroFixes = {
  'fire-features-houston.html': {
    oldSrc: 'assets/images/fire-features/fire-feature-patio-houston-tx.webp',
    newSrc: 'assets/images/fire-features/outdoor-living-spaces-houston-tx.webp',
    newAlt: 'Custom outdoor fire feature with patio and seating in Houston TX',
  },
  'outdoor-kitchen-houston.html': {
    oldSrc: 'assets/gallery/outdoor-kitchen-grill-pergola-houston.webp',
    newSrc: 'assets/gallery/outdoor-kitchen-04-houston-tx.webp',
    newAlt: 'Luxury outdoor kitchen with island bar and built-in grill in Houston TX',
  },
  'artificial-turf-houston.html': {
    oldSrc: 'assets/gallery/gallery-geometric-turf.webp',
    newSrc: 'assets/gallery/artificial-turf-putting-green-aerial-houston.webp',
    newAlt: 'Aerial view of custom putting green with artificial turf in Houston TX',
  },
  'outdoor-living-spaces-houston.html': {
    oldSrc: 'assets/gallery/outdoor-living-room-fireplace-pergola-houston.webp',
    newSrc: 'assets/gallery/outdoor-living-space-06-houston-tx.webp',
    newAlt: 'Complete outdoor living space with pool pergola and seating area in Houston TX',
  },
  'custom-stonework-houston.html': {
    oldSrc: 'assets/gallery/custom-stonework-03-houston-tx.webp',
    newSrc: 'assets/gallery/custom-stonework-04-houston-tx.webp',
    newAlt: 'Custom stonework fireplace and outdoor seating wall Houston TX',
  },
};

for (const fix of fixes) {
  const path = join(root, fix.file);
  let html = readFileSync(path, 'utf8');

  // Replace split-intro photo if needed
  if (splitIntroFixes[fix.file]) {
    const sf = splitIntroFixes[fix.file];
    html = html.replace(sf.oldSrc, sf.newSrc);
    // Update alt too
    const imgRegex = new RegExp(`(<img src="${sf.newSrc.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}" alt=")[^"]*(")`);
    html = html.replace(imgRegex, `$1${sf.newAlt}$2`);
  }

  // Replace the 3 photo-break images
  // Match the svc-photo-break block and replace each img src/alt
  const pbRegex = /(<div class="svc-photo-break"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>)/;
  const pbMatch = html.match(pbRegex);
  if (!pbMatch) {
    console.log(`  ✗ photo-break not found in ${fix.file}`);
    continue;
  }

  let pb = pbMatch[0];
  const imgRegex = /<img src="([^"]*)" alt="([^"]*)" width/g;
  let i = 0;
  pb = pb.replace(imgRegex, (match, src, alt) => {
    if (i < fix.photos.length) {
      const r = match.replace(`src="${src}"`, `src="${fix.photos[i].src}"`).replace(`alt="${alt}"`, `alt="${fix.photos[i].alt}"`);
      i++;
      return r;
    }
    return match;
  });

  html = html.replace(pbMatch[0], pb);
  writeFileSync(path, html, 'utf8');
  console.log(`  ✓ ${fix.file}`);
}

console.log('\nDone.');
