import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// ── 1. Update custom-stonework-houston.html ──────────────────────────────────
const swPath = join(root, 'custom-stonework-houston.html');
let sw = readFileSync(swPath, 'utf8');

// 1a. Swap split-intro photo → 10 (LED steps at night)
sw = sw.replace(
  /(<div class="svc-intro-split__photo">\s*<img src=")[^"]*(" alt=")[^"]*(")/,
  `$1assets/gallery/custom-stonework-10-houston-tx.webp$2Custom stone steps with integrated LED lighting at night in Houston TX$3`
);

// 1b. Swap photo-break photos → 16, 17, 11
const newPhotoBreak = `    <div class="svc-photo-break" aria-hidden="true">
      <div class="svc-photo-break__main">
        <img src="assets/gallery/custom-stonework-16-houston-tx.webp" alt="Custom fire pit on paver patio with stone stepping path at dusk in Houston TX" width="800" height="600" loading="lazy">
      </div>
      <div class="svc-photo-break__side">
        <img src="assets/gallery/custom-stonework-17-houston-tx.webp" alt="Stone tree rings and retaining wall with LED landscape lighting in Houston TX" width="600" height="400" loading="lazy">
      </div>
      <div class="svc-photo-break__side">
        <img src="assets/gallery/custom-stonework-11-houston-tx.webp" alt="Curved natural stone planter and retaining wall in front yard Houston TX" width="600" height="400" loading="lazy">
      </div>
    </div>`;

sw = sw.replace(/<div class="svc-photo-break"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/, newPhotoBreak);

// 1c. Add video section after photo-break (before why-heading section)
const videoSection = `
    <section class="section-dark" style="padding:0; overflow:hidden; background:#000;">
      <div style="max-width:900px; margin:0 auto; padding:48px 24px 0; text-align:center;">
        <h2 style="color:#fff; font-size:clamp(1.3rem,3vw,1.8rem); margin-bottom:8px;">Custom Stonework in Action</h2>
        <p style="color:#bbb; margin-bottom:24px; font-size:.95rem;">Stone outdoor kitchen and fire feature — one of our recent Houston builds</p>
      </div>
      <video
        autoplay muted loop playsinline
        poster="assets/videos/custom-stonework-02-poster.webp"
        style="display:block; width:100%; max-width:900px; margin:0 auto 0; object-fit:cover; max-height:560px;">
        <source src="assets/videos/custom-stonework-02.mp4" type="video/mp4">
      </video>
    </section>
`;

sw = sw.replace(
  /(\s*<section class="section section-dark"[^>]*aria-labelledby="why-heading">)/,
  `\n${videoSection}\n$1`
);

// 1d. Replace gallery-of-6 with new photos (15, 19, 18, 14, 13, 12)
const newGallery = [
  ['assets/gallery/custom-stonework-15-houston-tx.webp', 'Tiered stone planters and porch steps with lush landscaping in Houston TX'],
  ['assets/gallery/custom-stonework-19-houston-tx.webp', 'Curved stone retaining wall planter with yellow flowers in Houston TX'],
  ['assets/gallery/custom-stonework-18-houston-tx.webp', 'Circular stone tree ring and retaining wall in front yard Houston TX'],
  ['assets/gallery/custom-stonework-14-houston-tx.webp', 'Modern concrete stone planters with black trim and front yard landscaping Houston TX'],
  ['assets/gallery/custom-stonework-13-houston-tx.webp', 'Natural stone landscape border with driveway entry in Houston TX'],
  ['assets/gallery/custom-stonework-12-houston-tx.webp', 'Custom stone fire pit with seating on concrete patio in Houston TX'],
];

const galleryItems = newGallery.map(([src, alt]) =>
  `          <div class="gallery-item reveal">
            <picture><source srcset="${src}" type="image/webp">
              <img src="${src}" alt="${alt}" width="800" height="600" loading="lazy">
            </picture>
          </div>`
).join('\n');

sw = sw.replace(
  /(<div class="gallery-grid">)[\s\S]*?(<\/div>\s*<div class="gallery-cta)/,
  `$1\n${galleryItems}\n        $2`
);

writeFileSync(swPath, sw, 'utf8');
console.log('✓ custom-stonework-houston.html updated');

// ── 2. Add new stonework photos to projects.html carousel ───────────────────
const projPath = join(root, 'projects.html');
let proj = readFileSync(projPath, 'utf8');

const newEntries = [
  { src: 'assets/gallery/custom-stonework-10-houston-tx.webp', alt: 'Custom stone steps with integrated LED lighting at night Houston TX',    cat: 'stonework', label: 'Custom Stonework' },
  { src: 'assets/gallery/custom-stonework-11-houston-tx.webp', alt: 'Curved natural stone planter and retaining wall front yard Houston TX',    cat: 'stonework', label: 'Custom Stonework' },
  { src: 'assets/gallery/custom-stonework-12-houston-tx.webp', alt: 'Custom stone fire pit with seating on concrete patio Houston TX',          cat: 'stonework', label: 'Custom Stonework' },
  { src: 'assets/gallery/custom-stonework-13-houston-tx.webp', alt: 'Natural stone landscape border with driveway entry Houston TX',             cat: 'stonework', label: 'Custom Stonework' },
  { src: 'assets/gallery/custom-stonework-14-houston-tx.webp', alt: 'Modern concrete stone planters with black trim and landscaping Houston TX', cat: 'stonework', label: 'Custom Stonework' },
  { src: 'assets/gallery/custom-stonework-15-houston-tx.webp', alt: 'Tiered stone planters and porch steps with landscaping Houston TX',         cat: 'stonework', label: 'Custom Stonework' },
  { src: 'assets/gallery/custom-stonework-16-houston-tx.webp', alt: 'Custom fire pit on paver patio with stone stepping path at dusk Houston TX',cat: 'stonework', label: 'Custom Stonework' },
  { src: 'assets/gallery/custom-stonework-17-houston-tx.webp', alt: 'Stone tree rings and retaining wall with LED landscape lighting Houston TX', cat: 'stonework', label: 'Custom Stonework' },
  { src: 'assets/gallery/custom-stonework-18-houston-tx.webp', alt: 'Circular stone tree ring and retaining wall front yard Houston TX',         cat: 'stonework', label: 'Custom Stonework' },
  { src: 'assets/gallery/custom-stonework-19-houston-tx.webp', alt: 'Curved stone retaining wall planter with yellow flowers Houston TX',        cat: 'stonework', label: 'Custom Stonework' },
];

const newCards = newEntries.map(e =>
  `  { src: '${e.src}', alt: '${e.alt}', cat: '${e.cat}', label: '${e.label}' },`
).join('\n');

// Insert before the closing bracket of the photos array
proj = proj.replace(
  /(\s*\/\/ end stonework[\s\S]*?)(];)/,
  `$1${newCards}\n$2`
);

// Fallback: insert before the last entry of stonework block
if (!proj.includes('// end stonework')) {
  // Find last stonework entry and append after it
  const lastStone = proj.lastIndexOf("cat: 'stonework'");
  if (lastStone !== -1) {
    const lineEnd = proj.indexOf('\n', lastStone);
    proj = proj.slice(0, lineEnd + 1) + newCards + '\n' + proj.slice(lineEnd + 1);
  }
}

writeFileSync(projPath, proj, 'utf8');
console.log('✓ projects.html updated with 10 new stonework entries');
console.log('\nDone.');
