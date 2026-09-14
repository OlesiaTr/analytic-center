// One-off: re-encode every raster image under public/images as WebP, capped on the
// longest edge at roughly 2× the size it is rendered at, and remove the original.
// Static export disables next/image, so the files themselves have to be the right
// size and format.
//
// Usage: node scripts/optimize-images.mjs [--dry-run]

import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve('public/images');
// Longest-edge cap per top-level folder, from the rendered size in the components
// (cover cards 378px tall, professor cards 374px wide, news 160px, partner logos ≤170px)
// at 2× device pixel ratio. Anything not listed gets DEFAULT_MAX_SIDE.
const MAX_SIDE_BY_DIR = {
  monographs: 800,
  library: 800,
  members: 800,
  conferences: 1400,
  news: 400,
  partners: 400,
};
const DEFAULT_MAX_SIDE = 1920;
const QUALITY = 82;
const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png']);
const dryRun = process.argv.includes('--dry-run');

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (SOURCE_EXT.has(path.extname(entry.name).toLowerCase())) yield full;
  }
}

let before = 0;
let after = 0;
let count = 0;

for await (const file of walk(ROOT)) {
  const { size } = await stat(file);
  const target = file.replace(/\.(jpe?g|png)$/i, '.webp');
  const image = sharp(file).rotate(); // honour EXIF orientation before stripping it
  const meta = await image.metadata();
  const longest = Math.max(meta.width ?? 0, meta.height ?? 0);
  const topDir = path.relative(ROOT, file).split(path.sep)[0];
  const maxSide = MAX_SIDE_BY_DIR[topDir] ?? DEFAULT_MAX_SIDE;
  const resized =
    longest > maxSide
      ? image.resize({
          width: maxSide,
          height: maxSide,
          fit: 'inside',
          withoutEnlargement: true,
        })
      : image;

  if (dryRun) {
    console.log(
      `${path.relative(ROOT, file)}  ${meta.width}x${meta.height}  ${(size / 1024).toFixed(0)}K`,
    );
    continue;
  }

  const info = await resized.webp({ quality: QUALITY }).toFile(target);
  await unlink(file);
  before += size;
  after += info.size;
  count += 1;
  console.log(
    `${path.relative(ROOT, file)} → ${path.basename(target)}  ${meta.width}x${meta.height} → ${info.width}x${info.height}  ${(size / 1024).toFixed(0)}K → ${(info.size / 1024).toFixed(0)}K`,
  );
}

if (!dryRun) {
  console.log(
    `\n${count} files: ${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(1)} MB (−${(100 - (after / before) * 100).toFixed(0)}%)`,
  );
}
