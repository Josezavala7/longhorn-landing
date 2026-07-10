import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, basename, extname } from 'path';
import { existsSync } from 'fs';
import os from 'os';

const CESAR = join(os.homedir(), 'Downloads', 'cesar-fotos');
const BASE = join(os.homedir(), 'Documents', 'Syntax', 'longhorn-landing');

const FOLDER_MAP = {
  'patio-covers': 'assets/images/patio-covers',
  'pergolas':     'assets/images/pergolas',
};

const NEW_FILES = new Set([
  'IMG_8685.jpeg','IMG_8732.jpeg','IMG_8733.jpeg','IMG_9380.jpeg',
  'IMG_9383.jpeg','IMG_9384.jpeg','IMG_9609.jpeg','IMG_9610.jpeg',
  'IMG_5114.jpeg','IMG_5592.jpeg','IMG_4746.jpeg',
  'DSC07829-Edit.jpeg','DSC07831-Edit.jpeg','DSC07837-Edit.jpeg',
  'IMG_5582.jpeg','IMG_5586.jpeg','IMG_5587.jpeg',
  'IMG_5588.jpeg','IMG_5589.jpeg','IMG_5590.jpeg',
  'IMG_5593.jpeg',
  'DJI_20260610203303_0204_D-Edit-2.jpeg',
]);

let converted = 0, skipped = 0;

for (const [srcFolder, destRelative] of Object.entries(FOLDER_MAP)) {
  const srcDir = join(CESAR, srcFolder);
  if (!existsSync(srcDir)) continue;
  const destDir = join(BASE, destRelative);
  await mkdir(destDir, { recursive: true });
  const files = await readdir(srcDir);
  for (const file of files) {
    if (!NEW_FILES.has(file)) continue;
    const ext = extname(file).toLowerCase();
    if (!['.jpg','.jpeg','.png','.heic','.heif','.webp'].includes(ext)) continue;
    const src = join(srcDir, file);
    const webpName = basename(file, ext) + '.webp';
    const dest = join(destDir, webpName);
    if (existsSync(dest)) { console.log('skip: ' + webpName); skipped++; continue; }
    try {
      const { size: before } = await stat(src);
      await sharp(src).rotate().resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 82, effort: 4 }).toFile(dest);
      const { size: after } = await stat(dest);
      console.log('OK ' + destRelative + '/' + webpName + ' (' + Math.round((1-after/before)*100) + '% smaller)');
      converted++;
    } catch(e) {
      console.error('ERR ' + file + ': ' + e.message);
      skipped++;
    }
  }
}
console.log('\nDone: ' + converted + ' converted, ' + skipped + ' skipped');
