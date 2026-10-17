// Compares screenshots/current against screenshots/baseline and writes diff
// images for anything that changed.
//
// Usage: node scripts/visual-diff.mts [--threshold 0.5]   (max % of changed pixels)

import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const BASELINE = 'screenshots/baseline';
const CURRENT = 'screenshots/current';
const DIFF = 'screenshots/current/diff';

const { values } = parseArgs({
  options: { threshold: { type: 'string', default: '0.5' } },
});
const maxPercent = Number(values.threshold ?? '0.5');

// View a Buffer as a plain Uint8Array: @types/node 20's Buffer doesn't match the
// typed-array types in TypeScript 5.7+. Drop once @types/node is upgraded (PER-6).
const bytes = (buf: Buffer) =>
  new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);

const readPng = async (file: string) => PNG.sync.read(await readFile(file));

const main = async () => {
  await mkdir(DIFF, { recursive: true });
  const files = (await readdir(BASELINE)).filter(f => f.endsWith('.png'));
  let failed = 0;

  for (const file of files) {
    let current: PNG;
    try {
      current = await readPng(path.join(CURRENT, file));
    } catch {
      console.log(`MISSING  ${file}`);
      failed++;
      continue;
    }
    const baseline = await readPng(path.join(BASELINE, file));

    if (
      baseline.width !== current.width ||
      baseline.height !== current.height
    ) {
      console.log(
        `SIZE     ${file}  ${baseline.width}x${baseline.height} → ${current.width}x${current.height}`,
      );
      failed++;
      continue;
    }

    const { width, height } = baseline;
    const diff = new PNG({ width, height });
    const changed = pixelmatch(
      bytes(baseline.data),
      bytes(current.data),
      bytes(diff.data),
      width,
      height,
      {
        threshold: 0.1,
      },
    );
    const percent = (changed / (width * height)) * 100;

    if (percent > maxPercent) {
      await writeFile(path.join(DIFF, file), bytes(PNG.sync.write(diff)));
      console.log(`CHANGED  ${file}  ${percent.toFixed(2)}%`);
      failed++;
    } else {
      console.log(`OK       ${file}  ${percent.toFixed(2)}%`);
    }
  }

  console.log(
    `\n${files.length - failed}/${files.length} match (threshold ${maxPercent}%)`,
  );
  process.exitCode = failed ? 1 : 0;
};

void main();
