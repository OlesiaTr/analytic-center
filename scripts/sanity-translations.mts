// English translations for Sanity content, written as drafts for review.
//
// export  Every published localized field (localeString / localeText /
//         localeBlock) with Ukrainian and no English yet, saved to
//         sanity/translations.json (gitignored) with `en: null` to fill in.
// apply   Writes each filled `en` into the document's draft (`drafts.<id>`,
//         created from the published version if there is none). The live site
//         keeps the published version until an editor publishes in Studio.
//         --dry-run prints what it would write.
//
// Usage: node --env-file=.env.local scripts/sanity-translations.mts export
//        node --env-file=.env.local scripts/sanity-translations.mts apply [--dry-run]

import { readFile, writeFile } from 'node:fs/promises';

import { createClient } from '@sanity/client';

const FILE = 'sanity/translations.json';
const LOCALE_TYPES = new Set(['localeString', 'localeText', 'localeBlock']);

const [command] = process.argv.slice(2);
const dryRun = process.argv.includes('--dry-run');

const env = (name: string) => {
  const value = process.env[name];
  if (!value)
    throw new Error(`Missing ${name} (run with --env-file=.env.local)`);
  return value;
};

const client = createClient({
  projectId: env('NEXT_PUBLIC_SANITY_PROJECT_ID'),
  dataset: env('NEXT_PUBLIC_SANITY_DATASET'),
  apiVersion: '2026-10-01',
  token: command === 'apply' ? env('SANITY_API_WRITE_TOKEN') : undefined,
  useCdn: false,
  perspective: 'published',
});

type Doc = { _id: string; _type: string; [key: string]: unknown };
type Block = { _type: 'block'; children: { text: string }[] };
type Uk = string | Block[];

export interface Entry {
  id: string;
  type: string;
  /** Patch path of the `{ uk, en }` object, e.g. `programs[_key=="p0"].title`. */
  path: string;
  uk: Uk;
  en: Uk | null;
}

const isFilled = (value: unknown) =>
  Array.isArray(value)
    ? value.length > 0
    : typeof value === 'string' && value.trim().length > 0;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

/** Every localized field under `value` that has Ukrainian but no English. */
const untranslated = (doc: Doc) => {
  const entries: Entry[] = [];
  const walk = (value: unknown, path: string) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) =>
        walk(
          item,
          `${path}[${isObject(item) && item._key ? `_key=="${item._key}"` : index}]`,
        ),
      );
    } else if (isObject(value)) {
      if (LOCALE_TYPES.has(value._type as string)) {
        if (isFilled(value.uk) && !isFilled(value.en))
          entries.push({
            id: doc._id,
            type: doc._type,
            path,
            uk: value.uk as Uk,
            en: null,
          });
        return;
      }
      for (const [key, child] of Object.entries(value))
        if (!key.startsWith('_')) walk(child, path ? `${path}.${key}` : key);
    }
  };
  walk(doc, '');
  return entries;
};

const exportTexts = async () => {
  const docs = await client.fetch<Doc[]>(
    '*[!(_id in path("drafts.**")) && !(_type match "sanity.*")]',
  );
  const entries = docs.flatMap(untranslated);
  await writeFile(FILE, `${JSON.stringify(entries, null, 2)}\n`);

  const byType = Object.groupBy(entries, entry => entry.type);
  console.table(
    Object.fromEntries(
      Object.entries(byType).map(([type, list]) => [
        type,
        { fields: list?.length, documents: new Set(list?.map(e => e.id)).size },
      ]),
    ),
  );
  console.log(`${entries.length} fields → ${FILE}`);
};

const applyTexts = async () => {
  const entries = (JSON.parse(await readFile(FILE, 'utf8')) as Entry[]).filter(
    entry => entry.en !== null && isFilled(entry.en),
  );
  const byDoc = Map.groupBy(entries, entry => entry.id);

  const ids = [...byDoc.keys()];
  const [published, drafts] = await Promise.all([
    client.fetch<Doc[]>('*[_id in $ids]', { ids }),
    client.fetch<{ _id: string }[]>(
      '*[_id in $ids]{ _id }',
      { ids: ids.map(id => `drafts.${id}`) },
      { perspective: 'raw' },
    ),
  ]);
  const hasDraft = new Set(drafts.map(({ _id }) => _id));
  const publishedById = new Map(published.map(doc => [doc._id, doc]));

  const tx = client.transaction();
  for (const [id, list] of byDoc) {
    const draftId = `drafts.${id}`;
    const doc = publishedById.get(id);
    if (!doc) throw new Error(`${id} is not published`);
    if (!hasDraft.has(draftId)) tx.createIfNotExists({ ...doc, _id: draftId });
    tx.patch(draftId, patch =>
      patch.set(
        Object.fromEntries(list.map(({ path, en }) => [`${path}.en`, en])),
      ),
    );
  }

  console.log(
    `${entries.length} fields in ${byDoc.size} documents ` +
      `(${byDoc.size - hasDraft.size} new drafts, ${hasDraft.size} existing)`,
  );
  if (dryRun) return console.log('Dry run: nothing written.');
  await tx.commit({ visibility: 'async' });
  console.log('Drafts written. Review and publish them in /studio.');
};

if (command === 'export') await exportTexts();
else if (command === 'apply') await applyTexts();
else
  throw new Error('Usage: sanity-translations.mts export | apply [--dry-run]');
