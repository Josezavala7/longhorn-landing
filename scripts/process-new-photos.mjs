/**
 * Process new client photos → assets/gallery/
 * Resizes to max 1600px, converts to WebP q82, SEO filenames.
 */
import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'assets', 'gallery');
const DOWNLOADS = 'C:/Users/José Mario Zavala/Downloads';

const SOURCES = [
  {
    folder: 'artificial turf',
    prefix: 'artificial-turf',
    suffix: 'houston-tx',
  },
  {
    folder: 'Custom stone work',
    prefix: 'custom-stonework',
    suffix: 'houston-tx',
  },
  {
    folder: 'kitchens',
    prefix: 'outdoor-kitchen',
    suffix: 'houston-tx',
  },
  {
    folder: 'outdoor living',
    prefix: 'outdoor-living-space',
    suffix: 'houston-tx',
  },
];

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG']);

async function processFolder({ folder, prefix, suffix }) {
  const srcDir = path.join(DOWNLOADS, folder);
  const files = (await readdir(srcDir))
    .filter(f => IMAGE_EXTS.has(path.extname(f)))
    .sort();

  console.log(`\n📁 ${folder}: ${files.length} images`);

  const results = [];
  let n = 1;

  for (const file of files) {
    const src = path.join(srcDir, file);
    const outName = `${prefix}-${String(n).padStart(2, '0')}-${suffix}.webp`;
    const dest = path.join(OUT_DIR, outName);

    if (existsSync(dest)) {
      console.log(`  ⏭  skip (exists): ${outName}`);
      results.push(outName);
      n++;
      continue;
    }

    try {
      const meta = await sharp(src).metadata();
      await sharp(src)
        .rotate() // auto-orient from EXIF
        .resize({
          width: 1600,
          height: 1200,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 82 })
        .toFile(dest);
      console.log(`  ✓ ${file} → ${outName}`);
      results.push(outName);
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
    }
    n++;
  }

  return results;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const allResults = {};
  for (const source of SOURCES) {
    allResults[source.prefix] = await processFolder(source);
  }

  // Print JS snippet to paste into projects.html
  console.log('\n\n// ── PASTE INTO projects.html carousel array ──\n');

  const catMap = {
    'artificial-turf':      { cat: 'turf',     label: 'Artificial Turf' },
    'custom-stonework':     { cat: 'stonework', label: 'Custom Stonework' },
    'outdoor-kitchen':      { cat: 'kitchen',   label: 'Outdoor Kitchens' },
    'outdoor-living-space': { cat: 'living',    label: 'Outdoor Living' },
  };

  const altMap = {
    'artificial-turf':      'Artificial turf installation in Houston TX backyard',
    'custom-stonework':     'Custom stonework and hardscape in Houston TX',
    'outdoor-kitchen':      'Outdoor kitchen built-in grill and counters Houston TX',
    'outdoor-living-space': 'Outdoor living space design and build Houston TX',
  };

  for (const [prefix, files] of Object.entries(allResults)) {
    const { cat, label } = catMap[prefix];
    const alt = altMap[prefix];
    for (const f of files) {
      const n = f.match(/(\d+)/)?.[1] ?? '';
      console.log(`      { src: 'assets/gallery/${f}', alt: '${alt} ${n}', cat: '${cat}', label: '${label}' },`);
    }
  }
}

main().catch(console.error);
