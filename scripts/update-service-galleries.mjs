import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function galleryItem(src, alt) {
  return `          <div class="gallery-item reveal">
            <picture><source srcset="${src}" type="image/webp">
              <img src="${src}" alt="${alt}" width="800" height="600" loading="lazy">
            </picture>
          </div>`;
}

function gallerySection(heading, subtext, items, ctaLabel) {
  return `    <section class="section" aria-labelledby="gallery-heading">
      <div class="container">
        <div class="section-header reveal">
          <h2 id="gallery-heading">${heading}</h2>
          <p>${subtext}</p>
        </div>
        <div class="gallery-grid">
${items.join('\n')}
        </div>
        <div class="gallery-cta reveal">
          <a href="projects.html" class="btn btn-outline btn-lg">${ctaLabel}</a>
        </div>
      </div>
    </section>`;
}

// ── CONFIG: most powerful photos per service ──
const services = [
  {
    file: 'patio-covers-houston.html',
    heading: 'Patio Cover Projects in Houston, TX',
    subtext: 'A sample of our recent patio cover installations across Greater Houston.',
    cta: 'See All Patio Cover Projects',
    photos: [
      ['assets/images/patio-covers/DSC07837-Edit.webp',   'Gable patio cover with fireplace TV outdoor kitchen and travertine at night in Houston TX'],
      ['assets/images/patio-covers/IMG_8685.webp',         'Covered patio with cedar wood ceiling fans TV and outdoor dining in Houston TX'],
      ['assets/gallery/pool-spa-travertine-patio-aerial-houston.webp', 'Aerial view of luxury backyard with lattice patio cover pool and spa in Houston TX'],
      ['assets/images/patio-covers/DSC07829-Edit.webp',   'Custom gable patio cover with stone columns and outdoor kitchen in Houston TX'],
      ['assets/images/patio-covers/DSC07831-Edit.webp',   'Attached patio cover with wood ceiling and recessed lighting in Houston TX'],
      ['assets/images/patio-covers/IMG_5114.webp',         'Gable patio cover with ceiling fan wicker furniture and travertine in Houston TX'],
    ],
  },
  {
    file: 'pergolas-houston.html',
    heading: 'Pergola Projects in Houston, TX',
    subtext: 'Custom pergola installations designed for outdoor entertaining across Greater Houston.',
    cta: 'See All Pergola Projects',
    photos: [
      ['assets/images/pergolas/DJI_20260610203303_0204_D-Edit-2.webp', 'Aerial drone view of modern pergola with string lights and outdoor dining in Houston TX'],
      ['assets/images/pergolas/IMG_6434.webp',   'Tiki palapa pergola with outdoor dining table and pool view in Houston TX'],
      ['assets/images/pergolas/pergola-installation-houston-tx.webp', 'Custom pergola installation Houston TX'],
      ['assets/images/pergolas/IMG_6435.webp',   'Custom pergola with seating area and shade structure in Houston TX'],
      ['assets/images/pergolas/IMG_6436.webp',   'Outdoor pergola with integrated lighting and dining space in Houston TX'],
      ['assets/images/pergolas/IMG_6325.webp',   'Pergola with outdoor seating area and landscaping in Houston TX'],
    ],
  },
  {
    file: 'fire-features-houston.html',
    heading: 'Fire Feature Projects in Houston, TX',
    subtext: 'Custom fire pits, fire bowls, and fireplaces built across Greater Houston.',
    cta: 'See All Fire Feature Projects',
    photos: [
      ['assets/gallery/backyard-fire-bowls-pool-deck-houston.webp',        'Backyard fire bowls on pool deck with travertine in Houston TX'],
      ['assets/gallery/gallery-firepit-dusk.webp',                          'Circular fire pit with stone seating wall and paver patio at dusk in Houston TX'],
      ['assets/gallery/pool-deck-travertine-fire-pit-houston.webp',         'Pool deck with travertine and fire pit in Houston TX'],
      ['assets/gallery/pool-house-fire-bowl-artificial-turf-houston.webp',  'Pool house with fire bowl and artificial turf in Houston TX'],
      ['assets/gallery/gallery-firepit-circular.webp',                      'Modern circular fire pit with stone surround and outdoor seating in Houston TX'],
      ['assets/images/fire-features/IMG_5862.webp',                         'Custom rectangular fire feature with stone surround and outdoor seating in Houston TX'],
    ],
  },
  {
    file: 'outdoor-kitchen-houston.html',
    heading: 'Outdoor Kitchen Projects in Houston, TX',
    subtext: 'Built-in grills, custom counters, and full outdoor cooking stations across Greater Houston.',
    cta: 'See All Outdoor Kitchen Projects',
    photos: [
      ['assets/gallery/backyard-pool-outdoor-kitchen-aerial-houston.webp', 'Aerial view of backyard with pool and outdoor kitchen in Houston TX'],
      ['assets/gallery/outdoor-kitchen-grill-pergola-houston.webp',         'Outdoor kitchen with built-in grill under pergola in Houston TX'],
      ['assets/gallery/outdoor-kitchen-01-houston-tx.webp',                 'Custom outdoor kitchen with stone counters and built-in grill in Houston TX'],
      ['assets/gallery/outdoor-kitchen-05-houston-tx.webp',                 'Luxury outdoor kitchen with seating bar and pergola in Houston TX'],
      ['assets/gallery/outdoor-kitchen-10-houston-tx.webp',                 'Outdoor kitchen with built-in grill refrigerator and granite counters in Houston TX'],
      ['assets/gallery/outdoor-kitchen-15-houston-tx.webp',                 'Complete outdoor kitchen island with stone finish in Houston TX'],
    ],
  },
  {
    file: 'artificial-turf-houston.html',
    heading: 'Artificial Turf Projects in Houston, TX',
    subtext: 'Synthetic grass installations for backyards, putting greens, and pet areas across Greater Houston.',
    cta: 'See All Artificial Turf Projects',
    photos: [
      ['assets/gallery/artificial-turf-putting-green-aerial-houston.webp',  'Aerial view of custom putting green with artificial turf in Houston TX'],
      ['assets/gallery/gallery-geometric-turf.webp',                         'Geometric artificial turf pattern with concrete borders in Houston TX'],
      ['assets/gallery/gallery-turf-modern-yard.webp',                       'Modern backyard with artificial turf and clean landscaping in Houston TX'],
      ['assets/gallery/gallery-turf-paver-yard.webp',                        'Artificial turf backyard with paver border and stepping stones in Houston TX'],
      ['assets/gallery/gallery-lattice-turf.webp',                           'Lattice pattern artificial turf with decorative concrete in Houston TX'],
      ['assets/gallery/artificial-turf-stepping-stones-putting-green.webp',  'Artificial turf putting green with stepping stones in Houston TX'],
    ],
  },
  {
    file: 'outdoor-living-spaces-houston.html',
    heading: 'Outdoor Living Space Projects in Houston, TX',
    subtext: 'Complete outdoor living transformations for families across Greater Houston.',
    cta: 'See All Outdoor Living Projects',
    photos: [
      ['assets/gallery/pool-spa-travertine-patio-aerial-houston.webp',       'Aerial view of luxury outdoor living space with pool spa and travertine patio in Houston TX'],
      ['assets/gallery/outdoor-living-pool-firepit-houston.webp',            'Luxury outdoor living space with pool and firepit in Houston TX'],
      ['assets/gallery/outdoor-living-room-fireplace-pergola-houston.webp',  'Outdoor living room with fireplace and pergola in Houston TX'],
      ['assets/gallery/backyard-pool-outdoor-living-houston.webp',           'Backyard pool outdoor living space in Houston TX'],
      ['assets/gallery/outdoor-living-space-01-houston-tx.webp',             'Custom outdoor living space with pergola and seating area in Houston TX'],
      ['assets/gallery/outdoor-living-space-05-houston-tx.webp',             'Complete outdoor living space with kitchen and dining area in Houston TX'],
    ],
  },
  {
    file: 'custom-stonework-houston.html',
    heading: 'Custom Stonework Projects in Houston, TX',
    subtext: 'Natural stone, retaining walls, and decorative stonework across Greater Houston.',
    cta: 'See All Stonework Projects',
    photos: [
      ['assets/gallery/custom-stonework-01-houston-tx.webp', 'Custom stone retaining wall and landscape design in Houston TX'],
      ['assets/gallery/custom-stonework-02-houston-tx.webp', 'Natural stone pathway and garden wall in Houston TX'],
      ['assets/gallery/custom-stonework-03-houston-tx.webp', 'Decorative stone columns and entrance in Houston TX'],
      ['assets/gallery/custom-stonework-04-houston-tx.webp', 'Custom stonework fireplace and outdoor seating wall in Houston TX'],
      ['assets/gallery/custom-stonework-05-houston-tx.webp', 'Stone veneer accent wall and hardscape in Houston TX'],
      ['assets/gallery/custom-stonework-06-houston-tx.webp', 'Custom stone steps and retaining wall in Houston TX'],
    ],
  },
  {
    file: 'driveway-contractor-houston.html',
    heading: 'Driveway Projects in Houston, TX',
    subtext: 'Concrete, pavers, and exposed aggregate driveways installed across Greater Houston.',
    cta: 'See All Driveway Projects',
    photos: [
      ['assets/gallery/luxury-home-driveway-aerial-houston.webp',        'Aerial view of luxury home driveway in Houston TX'],
      ['assets/gallery/luxury-home-driveway-sunset-aerial-houston.webp', 'Aerial view of luxury Houston home circular concrete driveway at sunset'],
      ['assets/gallery/luxury-landscaping-driveway-night-houston.webp',  'Luxury home driveway with landscape lighting at night in Houston TX'],
      ['assets/gallery/concrete-driveway-lighting-houston-night.webp',   'Concrete driveway with landscape lighting at night in Houston TX'],
      ['assets/gallery/circular-driveway-houston-tx.webp',               'Circular driveway installation in Houston TX'],
      ['assets/gallery/paver-driveway-installation-houston-tx.webp',     'Paver driveway installation in Houston TX'],
    ],
  },
  {
    file: 'painting-houston.html',
    heading: 'Painting Projects in Houston, TX',
    subtext: 'Interior and exterior painting services for homes and commercial properties across Greater Houston.',
    cta: 'See All Painting Projects',
    photos: [
      ['assets/gallery/painting-01-houston-tx.webp',                       'Professional exterior house painting in Houston TX'],
      ['assets/gallery/painting-03-houston-tx.webp',                       'Interior painting with premium finish in Houston TX'],
      ['assets/gallery/painting-05-houston-tx.webp',                       'Commercial painting project in Houston TX'],
      ['assets/gallery/gallery-commercial-painting-apartments.webp',       'Commercial apartment complex exterior painting in Houston TX'],
      ['assets/gallery/gallery-commercial-painting-arches.webp',           'Commercial building painting with decorative arches in Houston TX'],
      ['assets/gallery/painting-07-houston-tx.webp',                       'Professional residential painting services Houston TX'],
    ],
  },
];

// ── Process each service page ──
for (const svc of services) {
  const path = join(root, svc.file);
  let html = readFileSync(path, 'utf8');

  const items = svc.photos.map(([src, alt]) => galleryItem(src, alt));
  const newSection = gallerySection(svc.heading, svc.subtext, items, svc.cta);

  // Replace existing gallery section if present
  const galleryRegex = /<section class="section" aria-labelledby="gallery-heading">[\s\S]*?<\/section>/;

  if (galleryRegex.test(html)) {
    html = html.replace(galleryRegex, newSection);
    console.log(`✓ Updated gallery: ${svc.file}`);
  } else {
    // Insert before the section-cta
    html = html.replace(
      '<section class="section section-cta" aria-labelledby="cta-heading">',
      newSection + '\n\n\n    <section class="section section-cta" aria-labelledby="cta-heading">'
    );
    console.log(`✓ Added gallery: ${svc.file}`);
  }

  writeFileSync(path, html, 'utf8');
}

console.log('\nAll done.');
