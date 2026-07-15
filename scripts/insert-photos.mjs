import { readFileSync, writeFileSync } from 'fs';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, '..', 'projects.html');
let html = readFileSync(file, 'utf8');

// ── PATIO COVERS ──
const patioAnchor = `{ src: 'assets/gallery/pool-spa-travertine-patio-aerial-houston.webp',             alt: 'Aerial view of luxury backyard with lattice patio cover pool spa and travertine',   cat: 'patio-covers', label: 'Patio Covers' },`;
const patioNew = [
  `06D0F90E-C4FE-4D83-BDEE-B2A38470D260`,`7C98B1FE-3621-4070-841D-7B3E800DAC61`,`CE63314E-FD70-4613-AE4C-45844C8D9EA2`,
  `DSC07829-Edit`,`DSC07831-Edit`,`FB4DAA1B-C381-4E2F-8634-E114715F0828`,
  `IMG_0704`,`IMG_0895`,`IMG_0896`,`IMG_3034`,`IMG_3194`,`IMG_4746`,
  `IMG_5582`,`IMG_5586`,`IMG_5587`,`IMG_5588`,`IMG_5589`,`IMG_5590`,`IMG_5592`,
  `IMG_6356`,`IMG_6357`,`IMG_6358`,`IMG_6359`,
  `IMG_7459`,`IMG_7460`,`IMG_7461`,`IMG_7463`,
  `IMG_8732`,`IMG_8733`,`IMG_9380`,`IMG_9383`,`IMG_9384`,`IMG_9609`,`IMG_9610`,
  `Resized_20260615_123833`,`Resized_20260615_123839`,`Resized_20260615_123851`,
  `Resized_20260615_123859`,`Resized_20260615_123912`,`Resized_20260615_123939`,`Resized_20260615_123956`,
  `patio-cover-houston-tx`,
].map(f => `      { src: 'assets/images/patio-covers/${f}.webp', alt: 'Custom patio cover installation Houston TX', cat: 'patio-covers', label: 'Patio Covers' },`).join('\n');

if (!html.includes(patioAnchor)) { console.error('patio anchor not found'); process.exit(1); }
html = html.replace(patioAnchor, patioAnchor + '\n' + patioNew);

// ── PERGOLAS ──
const pergolasAnchor = `{ src: 'assets/images/pergolas/IMG_6325.webp',                                    alt: 'Pergola with outdoor seating area and shade structure in Houston TX',               cat: 'pergolas',     label: 'Pergolas' },`;
const pergolasNew = [
  `IMG_6324`,`IMG_6326`,`IMG_6435`,`IMG_6436`,`Screenshot_20250717_224727_Facebook`,`pergola-installation-houston-tx`,
].map(f => `      { src: 'assets/images/pergolas/${f}.webp', alt: 'Pergola installation Houston TX', cat: 'pergolas', label: 'Pergolas' },`).join('\n');

if (!html.includes(pergolasAnchor)) { console.error('pergolas anchor not found'); process.exit(1); }
html = html.replace(pergolasAnchor, pergolasAnchor + '\n' + pergolasNew);

// ── FIRE FEATURES ──
const fireAnchor = `{ src: 'assets/images/fire-features/IMG_0145.webp',                               alt: 'Custom outdoor fire feature with stone surround and seating in Houston TX',        cat: 'fire',         label: 'Fire Features' },`;
const fireNew = [
  `IMG_0146`,`IMG_0148`,`IMG_0149`,`IMG_0151`,`IMG_1265`,`IMG_1266`,`IMG_5747`,`IMG_5748`,`outdoor-living-spaces-houston-tx`,
].map(f => `      { src: 'assets/images/fire-features/${f}.webp', alt: 'Outdoor fire feature Houston TX', cat: 'fire', label: 'Fire Features' },`).join('\n');

if (!html.includes(fireAnchor)) { console.error('fire anchor not found'); process.exit(1); }
html = html.replace(fireAnchor, fireAnchor + '\n' + fireNew);

writeFileSync(file, html, 'utf8');
console.log('Done — patio +42, pergolas +6, fire +9');
