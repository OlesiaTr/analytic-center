// Writes the real `width`/`height` of every local image referenced from the
// content JSON next to its `imgSrc` / `image` field, so components can reserve
// space and avoid layout shift. Until Sanity provides dimensions (PER-9), run it
// after adding or replacing an image.
//
// Usage: node scripts/image-dimensions.mts [--check]   (--check: fail if stale)

import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import * as prettier from 'prettier';
import sharp from 'sharp';

const DATA_DIRS = ['src/data', 'src/data/images'];
const IMAGE_KEYS = ['imgSrc', 'image'];

const { values } = parseArgs({ options: { check: { type: 'boolean' } } });

const sizeCache = new Map<string, { width: number; height: number }>();

const sizeOf = async (src: string) => {
  const cached = sizeCache.get(src);
  if (cached) return cached;
  const { width, height } = await sharp(path.join('public', src)).metadata();
  if (!width || !height) throw new Error(`No dimensions for ${src}`);
  const size = { width, height };
  sizeCache.set(src, size);
  return size;
};

// `"imgSrc": "/images/…",` plus any width/height already written after it.
const IMAGE_FIELD = new RegExp(
  `"(${IMAGE_KEYS.join('|')})":\\s*"(/images/[^"]+)"(,?)(\\s*"width":\\s*\\d+,\\s*"height":\\s*\\d+,?)?`,
  'g',
);

// Edits the text in place (instead of re-serializing) so unrelated formatting
// stays untouched, then lets Prettier lay out the new fields.
const withDimensions = async (text: string, file: string) => {
  const matches = [...text.matchAll(IMAGE_FIELD)];
  let out = '';
  let last = 0;
  for (const m of matches) {
    const [whole, key, src, comma, existing] = m;
    const { width, height } = await sizeOf(src);
    const trailing = comma || existing?.trimEnd().endsWith(',') ? ',' : '';
    out +=
      text.slice(last, m.index) +
      `"${key}": "${src}", "width": ${width}, "height": ${height}${trailing}`;
    last = m.index + whole.length;
  }
  out += text.slice(last);
  const options = await prettier.resolveConfig(file);
  return prettier.format(out, { ...options, filepath: file });
};

const main = async () => {
  const stale: string[] = [];

  for (const dir of DATA_DIRS) {
    const files = (await readdir(dir)).filter(f => f.endsWith('.json'));
    for (const file of files) {
      const full = path.join(dir, file);
      const before = await readFile(full, 'utf8');
      const after = await withDimensions(before, full);
      if (after === before) continue;
      stale.push(full);
      if (!values.check) await writeFile(full, after);
    }
  }

  if (values.check && stale.length) {
    console.error(
      `Image dimensions out of date in:\n  ${stale.join('\n  ')}\nRun: npm run images:dimensions`,
    );
    process.exitCode = 1;
  } else {
    console.log(
      stale.length
        ? `Updated ${stale.join(', ')}`
        : 'Image dimensions up to date',
    );
  }
};

void main();
