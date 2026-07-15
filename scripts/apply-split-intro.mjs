import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Config per service page: split photo + 3 photo-break photos
// Must NOT repeat photos used in the bottom gallery-of-6
const pages = [
  {
    file: 'pergolas-houston.html',
    introH2: "Houston's Trusted Pergolas Contractor",
    introP: `A pergola is one of the most impactful upgrades you can make to your outdoor space — adding shade, structure, and elegance to any backyard, patio, or pool area. Longhorn Hardscape & Construction builds custom pergolas throughout Houston, Missouri City, Sugar Land, Katy, and Pearland. Whether you want a classic wood pergola draped in vines, a sleek modern aluminum structure, or a louvered pergola with adjustable shade, we design and build it to match your home and your vision. Every pergola starts with a free in-home consultation and a same-day estimate.`,
    splitPhoto: { src: 'assets/images/pergolas/pergola-installation-houston-tx.webp', alt: 'Custom pergola installation Houston TX' },
    breakPhotos: [
      { src: 'assets/images/pergolas/DJI_20260610203303_0205_D.webp', alt: 'Drone aerial view of backyard pergola Houston TX' },
      { src: 'assets/images/pergolas/IMG_6421.webp', alt: 'Outdoor pergola with string lights Houston TX' },
      { src: 'assets/images/pergolas/IMG_6428.webp', alt: 'Modern pergola with outdoor furniture Houston TX' },
    ],
  },
  {
    file: 'fire-features-houston.html',
    introH2: "Houston's Trusted Fire Features Contractor",
    introP: `Transform your backyard into an inviting evening retreat with a custom fire feature from Longhorn Hardscape & Construction. We design and build fire pits, fire bowls, gas fire tables, and outdoor fireplaces throughout Houston, Missouri City, Sugar Land, Katy, and Pearland. Whether you envision a cozy fire pit surrounded by a stone seating wall or a dramatic dual fire bowl flanking your pool, we engineer each feature for safety, aesthetics, and long-term performance. Every project starts with a free consultation and same-day estimate.`,
    splitPhoto: { src: 'assets/images/fire-features/fire-feature-patio-houston-tx.webp', alt: 'Custom fire feature patio Houston TX' },
    breakPhotos: [
      { src: 'assets/images/fire-features/IMG_5862.webp', alt: 'Custom rectangular fire feature stone surround Houston TX' },
      { src: 'assets/images/fire-features/IMG_5868.webp', alt: 'Fire pit with stone seating wall and outdoor lighting Houston TX' },
      { src: 'assets/images/fire-features/IMG_5871.webp', alt: 'Evening fire bowl beside pool in Houston TX' },
    ],
  },
  {
    file: 'outdoor-kitchen-houston.html',
    introH2: "Houston's Trusted Outdoor Kitchen Contractor",
    introP: `An outdoor kitchen turns your backyard into a year-round entertainment destination. Longhorn Hardscape & Construction designs and builds custom outdoor kitchens throughout Houston, Missouri City, Sugar Land, Katy, and Pearland. From a simple built-in grill station to a full outdoor cooking suite with refrigerators, sinks, pizza ovens, and granite countertops, we handle every detail — structure, plumbing, gas lines, and finishing. Every project starts with a free in-home consultation and same-day estimate.`,
    splitPhoto: { src: 'assets/gallery/outdoor-kitchen-grill-pergola-houston.webp', alt: 'Outdoor kitchen with built-in grill under pergola in Houston TX' },
    breakPhotos: [
      { src: 'assets/gallery/outdoor-kitchen-02-houston-tx.webp', alt: 'Custom outdoor kitchen with stone island and built-in grill Houston TX' },
      { src: 'assets/gallery/outdoor-kitchen-07-houston-tx.webp', alt: 'Outdoor kitchen with bar seating and pendant lights Houston TX' },
      { src: 'assets/gallery/outdoor-kitchen-12-houston-tx.webp', alt: 'Luxury outdoor kitchen with granite counters and pergola Houston TX' },
    ],
  },
  {
    file: 'artificial-turf-houston.html',
    introH2: "Houston's Trusted Artificial Turf Contractor",
    introP: `Tired of mowing, watering, and fighting weeds in Houston's heat? Longhorn Hardscape & Construction installs premium synthetic grass throughout Houston, Missouri City, Sugar Land, Katy, and Pearland. From lush pet-friendly lawns to custom putting greens and low-maintenance commercial landscapes, our artificial turf stays green and beautiful year-round with zero irrigation. We use only commercial-grade turf backed by manufacturer warranties. Every project starts with a free site visit and same-day estimate.`,
    splitPhoto: { src: 'assets/gallery/gallery-geometric-turf.webp', alt: 'Geometric artificial turf pattern with concrete borders in Houston TX' },
    breakPhotos: [
      { src: 'assets/gallery/gallery-turf-modern-yard.webp', alt: 'Modern backyard with artificial turf Houston TX' },
      { src: 'assets/gallery/gallery-turf-paver-yard.webp', alt: 'Artificial turf backyard with paver border Houston TX' },
      { src: 'assets/gallery/gallery-lattice-turf.webp', alt: 'Lattice pattern artificial turf Houston TX' },
    ],
  },
  {
    file: 'outdoor-living-spaces-houston.html',
    introH2: "Houston's Trusted Outdoor Living Spaces Contractor",
    introP: `Your backyard is an extension of your home — and Longhorn Hardscape & Construction specializes in turning it into a space you never want to leave. We design and build complete outdoor living transformations throughout Houston, Missouri City, Sugar Land, Katy, and Pearland: patio covers, pergolas, outdoor kitchens, fire features, artificial turf, pools, decks, and everything in between. Whether you need one signature element or a full backyard makeover, we coordinate every trade and deliver a finished space on time and on budget. Every project starts with a free consultation.`,
    splitPhoto: { src: 'assets/gallery/outdoor-living-room-fireplace-pergola-houston.webp', alt: 'Outdoor living room with fireplace and pergola in Houston TX' },
    breakPhotos: [
      { src: 'assets/gallery/outdoor-living-pool-firepit-houston.webp', alt: 'Luxury outdoor living space with pool and fire pit Houston TX' },
      { src: 'assets/gallery/backyard-pool-outdoor-kitchen-aerial-houston.webp', alt: 'Aerial view of backyard with pool and outdoor kitchen Houston TX' },
      { src: 'assets/gallery/outdoor-living-space-03-houston-tx.webp', alt: 'Complete outdoor living space with pergola and stone work Houston TX' },
    ],
  },
  {
    file: 'custom-stonework-houston.html',
    introH2: "Houston's Trusted Custom Stonework Contractor",
    introP: `Natural stone adds permanence, texture, and character that no other material can match. Longhorn Hardscape & Construction designs and installs custom stonework throughout Houston, Missouri City, Sugar Land, Katy, and Pearland — including stone retaining walls, accent columns, garden borders, stone veneer facades, and decorative steps. We source premium natural stone and travertine to complement your home's architecture. Every project starts with a free design consultation and same-day estimate.`,
    splitPhoto: { src: 'assets/gallery/custom-stonework-03-houston-tx.webp', alt: 'Decorative stone columns and entrance in Houston TX' },
    breakPhotos: [
      { src: 'assets/gallery/custom-stonework-07-houston-tx.webp', alt: 'Natural stone garden wall and pathway Houston TX' },
      { src: 'assets/gallery/custom-stonework-08-houston-tx.webp', alt: 'Stone veneer retaining wall Houston TX' },
      { src: 'assets/gallery/custom-stonework-09-houston-tx.webp', alt: 'Custom stone steps and accent wall Houston TX' },
    ],
  },
  {
    file: 'driveway-contractor-houston.html',
    introH2: "Houston's Trusted Driveway Contractor",
    introP: `Your driveway is the first thing guests see — and the last thing you want to look worn, cracked, or dated. Longhorn Hardscape & Construction installs concrete driveways, paver driveways, exposed aggregate, and stamped concrete throughout Houston, Missouri City, Sugar Land, Katy, and Pearland. From straightforward replacement driveways to sweeping circular entries with landscape lighting, we engineer every surface for Houston's expansive soil and deliver a finish that boosts curb appeal and property value. Every project starts with a free estimate.`,
    splitPhoto: { src: 'assets/gallery/luxury-home-driveway-sunset-aerial-houston.webp', alt: 'Aerial view of luxury home circular driveway at sunset in Houston TX' },
    breakPhotos: [
      { src: 'assets/gallery/luxury-landscaping-driveway-night-houston.webp', alt: 'Luxury home driveway with landscape lighting at night Houston TX' },
      { src: 'assets/images/driveways/driveway-contractor-houston-tx.webp', alt: 'Concrete driveway installation Houston TX' },
      { src: 'assets/images/driveways/exposed-aggregate-driveway-houston.webp', alt: 'Exposed aggregate driveway Houston TX' },
    ],
  },
  {
    file: 'painting-houston.html',
    introH2: "Houston's Trusted Painting Contractor",
    introP: `A fresh coat of paint is one of the highest-ROI improvements you can make to any property. Longhorn Hardscape & Construction provides interior and exterior painting services for residential and commercial properties throughout Houston, Missouri City, Sugar Land, Katy, and Pearland. We use premium paints, proper surface preparation, and meticulous masking to deliver a finish that lasts — no roller marks, no missed spots, no shortcuts. From single-room refreshes to full exterior repaints and commercial multi-unit projects, every job comes with a detailed estimate and timeline.`,
    splitPhoto: { src: 'assets/gallery/painting-02-houston-tx.webp', alt: 'Professional exterior house painting Houston TX' },
    breakPhotos: [
      { src: 'assets/gallery/painting-04-houston-tx.webp', alt: 'Interior painting premium finish Houston TX' },
      { src: 'assets/gallery/gallery-commercial-painting-apartments.webp', alt: 'Commercial apartment complex exterior painting Houston TX' },
      { src: 'assets/gallery/gallery-commercial-painting-arches.webp', alt: 'Commercial building painting with decorative arches Houston TX' },
    ],
  },
];

function buildSplitIntro(h2, p, splitPhoto) {
  return `    <section class="section-dark service-intro svc-intro-split" aria-labelledby="intro-heading">
      <div class="svc-intro-split__text reveal">
        <h2 id="intro-heading">${h2}</h2>
        <p>${p}</p>
      </div>
      <div class="svc-intro-split__photo">
        <img src="${splitPhoto.src}" alt="${splitPhoto.alt}" width="900" height="700" loading="eager">
      </div>
    </section>`;
}

function buildPhotoBreak(photos) {
  return `    <div class="svc-photo-break" aria-hidden="true">
      <div class="svc-photo-break__main">
        <img src="${photos[0].src}" alt="${photos[0].alt}" width="800" height="600" loading="lazy">
      </div>
      <div class="svc-photo-break__side">
        <img src="${photos[1].src}" alt="${photos[1].alt}" width="600" height="400" loading="lazy">
      </div>
      <div class="svc-photo-break__side">
        <img src="${photos[2].src}" alt="${photos[2].alt}" width="600" height="400" loading="lazy">
      </div>
    </div>`;
}

for (const page of pages) {
  const path = join(root, page.file);
  let html = readFileSync(path, 'utf8');

  // Replace old service-intro section
  const oldIntroRegex = /<section class="section section-dark service-intro"[^>]*>[\s\S]*?<\/section>/;
  const newIntro = buildSplitIntro(page.introH2, page.introP, page.splitPhoto);

  if (!oldIntroRegex.test(html)) {
    console.log(`  ✗ Could not find service-intro in ${page.file}`);
    continue;
  }
  html = html.replace(oldIntroRegex, newIntro);

  // Insert photo-break after types/variants section (before "Why Choose" section)
  // Try inserting before section-light that comes after the types grid
  const photoBreak = buildPhotoBreak(page.breakPhotos);

  // Find the "Why Choose" section (section-dark after the variants section)
  // Pattern: look for the second section-dark after intro (the why-choose section)
  const whyChooseRegex = /(\s*<section class="section section-dark[^"]*" aria-labelledby="why-heading">)/;
  if (whyChooseRegex.test(html)) {
    html = html.replace(whyChooseRegex, `\n\n${photoBreak}\n$1`);
    console.log(`  ✓ ${page.file}`);
  } else {
    // Fallback: insert before CTA section
    html = html.replace(
      '<section class="section section-cta"',
      `${photoBreak}\n\n\n    <section class="section section-cta"`
    );
    console.log(`  ✓ ${page.file} (CTA fallback)`);
  }

  writeFileSync(path, html, 'utf8');
}

console.log('\nDone!');
