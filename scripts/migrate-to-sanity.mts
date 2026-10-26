// One-off (re-runnable): copy the content in src/data into Sanity.
//
// - Deterministic _ids + createOrReplace, so a second run updates in place.
// - Images upload once per path; Sanity also dedupes identical files.
// - --dry-run builds every document, prints the counts and saves the documents
//   to screenshots/review/migration-dry-run.json (gitignored) for review.
//
// Usage: node --env-file=.env.local scripts/migrate-to-sanity.mts [--dry-run]

import { createReadStream } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { createClient } from '@sanity/client';

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
  token: dryRun ? undefined : env('SANITY_API_WRITE_TOKEN'),
  useCdn: false,
});

const read = async (file: string) =>
  JSON.parse(await readFile(path.join('src/data', file), 'utf8'));

// ---------- helpers ----------

type Doc = { _id: string; _type: string; [key: string]: unknown };

const uk = (value: string | undefined) =>
  value?.trim() ? { _type: 'localeString', uk: value.trim() } : undefined;
const ukText = (value: string | undefined) =>
  value?.trim() ? { _type: 'localeText', uk: value.trim() } : undefined;

/** dd.mm.yyyy → yyyy-mm-dd */
const isoDate = (value: string) => {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value.trim());
  if (!match) throw new Error(`Not a dd.mm.yyyy date: ${value}`);
  return `${match[3]}-${match[2]}-${match[1]}`;
};

const key = (prefix: string, index: number) => `${prefix}${index}`;

const uploads = new Map<string, string>();
let imageCount = 0;

/** Upload `public${src}` once and return an image field value. */
const image = async (src: string, alt?: string, type = 'image') => {
  imageCount += uploads.has(src) ? 0 : 1;
  let assetId = uploads.get(src);
  if (!assetId) {
    assetId = dryRun
      ? `image-dry-run-${uploads.size}`
      : (
          await client.assets.upload(
            'image',
            createReadStream(path.join('public', src)),
            { filename: path.basename(src) },
          )
        )._id;
    uploads.set(src, assetId);
  }
  return {
    _type: type,
    asset: { _type: 'reference', _ref: assetId },
    ...(alt !== undefined && { alt: uk(alt) }),
  };
};

// The cover sits next to its title, so its alt stays empty (see PublicationCard).
const cover = (src: string) => image(src, '', 'cover');

// ---------- content ----------

const common = await read('common.json');
const conferencesJson = await read('conferences.json');
const monographsJson = await read('monographs.json');
const libraryJson = await read('library.json');
const grantsJson = await read('grants.json');
const aboutJson = await read('about-center.json');
const usefulJson = await read('useful-info.json');
const journalsJson = await read('journals.json');
const contactsJson = await read('contacts.json');
const meta = await read('meta/meta.json');
const people = {
  council: await read('images/academic-council.json'),
  supervisory: await read('images/supervisory-board.json'),
  member: await read('images/organization-members.json'),
};
const partnersJson = await read('images/partners-images.json');

type Publication = {
  imgSrc: string;
  title: string;
  description?: string;
  date: string;
  linkToDownload: string;
};

const docs: Doc[] = [];

// Conferences: upcoming ones have an info letter, archived ones proceedings.
for (const [list, link] of [
  [common.upcomingConferences.list, 'infoLetterUrl'],
  [conferencesJson.upcomingConferences.list, 'proceedingsUrl'],
] as const) {
  for (const item of list as Publication[]) {
    const date = isoDate(item.date);
    docs.push({
      _id: `conference-${date}`,
      _type: 'conference',
      title: uk(item.title),
      subtitle: uk(item.description),
      date,
      cover: await cover(item.imgSrc),
      [link]: item.linkToDownload,
    });
  }
}

// Monographs: upcoming ones have a call booklet, archived ones the book.
for (const [list, link] of [
  [common.upcomingMonographs.list, 'callUrl'],
  [monographsJson.archivedMonographs.list, 'bookUrl'],
] as const) {
  for (const item of list as Publication[]) {
    const date = isoDate(item.date);
    docs.push({
      _id: `monograph-${date}`,
      _type: 'monograph',
      title: uk(item.title),
      date,
      cover: await cover(item.imgSrc),
      [link]: item.linkToDownload,
    });
  }
}

// Library: kind and authors were folded into the titles; split by hand.
const LIBRARY: Record<
  string,
  { title: string; authors?: string; kind: string }
> = {
  '0': { title: '“Логіка”', kind: 'textbook' },
  '1': {
    title: '“Соціально-політичні студії”',
    authors: 'М.П. Требін',
    kind: 'studyGuide',
  },
  '2': {
    title: '“Філософія”',
    authors: 'О.Г. Данильян, О.П. Дзьобань',
    kind: 'textbook',
  },
  '3': { title: '“Філософія права”', kind: 'textbook' },
  '4': {
    title: '“Соціально-гуманітарна сфера України в сучасних дискурсах”',
    kind: 'monograph',
  },
  '5': {
    title: '“Конкурентоспроможність бізнесу (підприємства)”',
    kind: 'studyGuide',
  },
  '6': { title: '“Стратегування в новій реальності”', kind: 'monograph' },
  '7': {
    title: '“Міжнародні відносини та світова політика в постбіполярну добу”',
    authors: 'О.М. Кузь, О.І. Романюк, М.П. Требін та ін.',
    kind: 'monograph',
  },
};
for (const [index, item] of (
  libraryJson.list as (Publication & { id: string })[]
).entries()) {
  const split = LIBRARY[item.id];
  if (!split) throw new Error(`Library item ${item.id} has no title split`);
  docs.push({
    _id: `libraryItem-${item.id}`,
    _type: 'libraryItem',
    title: uk(split.title),
    authors: uk(split.authors),
    kind: split.kind,
    year: Number(item.date),
    cover: await cover(item.imgSrc),
    fileUrl: item.linkToDownload,
    order: index,
  });
}

// Grants: group titles (common.json) and programs (grants.json) pair by index today.
type Program = {
  title: string;
  description: string;
  descriptionList?: string[];
  date: string;
  linkTo: string;
};
(common.grants.list as { title: string }[]).forEach((group, index) => {
  const programs: Program[] = grantsJson.list[index].programs;
  docs.push({
    _id: `grantGroup-${index}`,
    _type: 'grantGroup',
    title: uk(group.title),
    order: index,
    programs: programs.map((program, i) => ({
      _key: key('program', i),
      _type: 'grantProgram',
      title: uk(program.title.replace(/:\s*$/, '')),
      description: ukText(program.description),
      points: program.descriptionList?.map((point, j) => ({
        _key: key('point', j),
        ...uk(point),
      })),
      deadline: uk(program.date.trim().replace(/\.$/, '')),
      link: program.linkTo,
    })),
  });
});

// People: one document per person, with the board they sit on.
type PersonJson = { image: string; name: string; position: string } & Record<
  string,
  string
>;
const PROFILE_KEYS = [
  'linkedin',
  'googlescholar',
  'naukovci',
  'orcid',
  'researchgate',
  'scopus',
  'wos',
];
for (const [board, list] of Object.entries(people) as [
  string,
  PersonJson[],
][]) {
  for (const [index, item] of list.entries()) {
    const profiles = Object.fromEntries(
      PROFILE_KEYS.filter(k => item[k]).map(k => [k, item[k]]),
    );
    docs.push({
      _id: `person-${board}-${index}`,
      _type: 'person',
      name: uk(item.name),
      position: uk(item.position),
      photo: await image(item.image),
      boards: [board],
      profiles,
      order: index,
    });
  }
}

// Partners: names come from the canvas (the JSON only had alt texts).
const PARTNER_NAMES: Record<string, string> = {
  'https://pravo-izdat.com.ua/': 'Видавництво «Право»',
  'https://www.hneu.edu.ua/':
    'Харківський національний економічний університет імені Семена Кузнеця',
  'https://nals.com.ua/': 'Національна академія правових наук України',
  'https://nlu.edu.ua/':
    'Національний юридичний університет імені Ярослава Мудрого',
  'https://daviscenter.fas.harvard.edu/':
    'Davis Center for Russian and Eurasian Studies',
};
for (const [index, item] of (
  partnersJson as { image: string; linkTo: string }[]
).entries()) {
  const name = PARTNER_NAMES[item.linkTo];
  if (!name) throw new Error(`Partner ${item.linkTo} has no name`);
  docs.push({
    _id: `partner-${index}`,
    _type: 'partner',
    name: uk(name),
    logo: await image(item.image),
    href: item.linkTo,
    order: index,
  });
}

// News: the JSON has no real dates; editors add them in the Studio.
for (const [index, item] of (
  common.news.list as { text: string; linkTo: string; imgSrc: string }[]
).entries()) {
  docs.push({
    _id: `news-${index}`,
    _type: 'news',
    text: ukText(item.text),
    image: await image(item.imgSrc),
    href: item.linkTo === '#' ? undefined : item.linkTo,
  });
}

// ---------- singletons ----------

const seo = (entry?: { title?: string; description?: string }) =>
  entry && { title: uk(entry.title), description: ukText(entry.description) };

docs.push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  name: uk(common.footer.name),
  contacts: {
    email: common.footer.contacts.email,
    phone: common.footer.contacts.phone,
    phoneLabel: common.footer.contacts.phoneLabel,
  },
  seo: {
    ...seo(meta.main),
    keywords: (meta.main.keywords as string)
      .split(',')
      .map(word => word.trim()),
    ogImage: await image(
      meta.main.images[0].url,
      meta.main.images[0].alt,
      'cover',
    ),
  },
});

const { hero, aboutCenter } = common;
docs.push({
  _id: 'homePage',
  _type: 'homePage',
  title: uk('Головна'),
  hero: {
    overline: uk(hero.overline),
    heading: uk(`${hero.title.topLine} ${hero.title.bottomLine}`),
    text: ukText(hero.label),
  },
  about: {
    text: ukText(aboutCenter.description),
    image: await image(
      '/images/about_center-tab.webp',
      aboutCenter.imgAlt,
      'cover',
    ),
  },
});

docs.push({
  _id: 'conferencesPage',
  _type: 'conferencesPage',
  title: uk(conferencesJson.title),
  lead: ukText(conferencesJson.lead),
  authorsForm: {
    title: uk(conferencesJson.table.title),
    // The UI appends the field count («— 13 полів»).
    sub: uk(conferencesJson.table.sub.replace(/\s*—\s*\{count\}\s*$/, '')),
    fields: (conferencesJson.table.list as { question: string }[]).map(
      (row, i) => ({
        _key: key('field', i),
        ...uk(row.question),
      }),
    ),
  },
  seo: seo(meta.conferences),
});

for (const [type, json, metaKey] of [
  ['monographsPage', monographsJson, 'monographs'],
  ['libraryPage', libraryJson, 'library'],
  ['grantsPage', grantsJson, 'grants'],
  ['journalsPage', journalsJson, 'journals'],
  ['contactsPage', contactsJson, 'contacts'],
] as const) {
  docs.push({
    _id: type,
    _type: type,
    title: uk(json.title),
    lead: ukText(json.lead),
    seo: seo(meta[metaKey]),
  });
}

// About: each paragraph becomes a block; the bold lead-in stays bold.
type Paragraph = { bold?: string; text: string };
docs.push({
  _id: 'aboutPage',
  _type: 'aboutPage',
  title: uk(aboutJson.title),
  intro: {
    _type: 'localeBlock',
    uk: (aboutJson.list as Paragraph[]).map(({ bold, text }, i) => ({
      _key: key('p', i),
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        ...(bold?.trim()
          ? [
              {
                _key: key('b', i),
                _type: 'span',
                marks: ['strong'],
                text: `${bold.trim()} `,
              },
            ]
          : []),
        { _key: key('t', i), _type: 'span', marks: [], text: text.trim() },
      ],
    })),
  },
  image: await image(
    '/images/about_center-tab.webp',
    aboutCenter.imgAlt,
    'cover',
  ),
  statute: (
    aboutJson.organizationStatute.list as {
      title: string;
      linkToDownload: string;
    }[]
  ).map((item, i) => ({
    _key: key('doc', i),
    _type: 'statuteDocument',
    title: uk(item.title),
    fileUrl: item.linkToDownload,
  })),
  boardTitles: {
    council: uk(aboutJson.academicCouncil.title),
    supervisory: uk(aboutJson.supervisoryBoard.title),
    member: uk(aboutJson.organizationMembers.title),
  },
  seo: seo(meta['about-center']),
});

docs.push({
  _id: 'usefulInfoPage',
  _type: 'usefulInfoPage',
  title: uk(usefulJson.title),
  lead: ukText(usefulJson.lead),
  table: {
    caption: uk(usefulJson.table.title),
    rows: (
      usefulJson.table.rows as {
        group?: string;
        type: string;
        example: string;
      }[]
    ).map((row, i) => ({
      _key: key('row', i),
      _type: 'sourceRow',
      group: uk(row.group),
      type: uk(row.type),
      example: ukText(row.example),
    })),
    footnote: ukText(usefulJson.table.footnote),
  },
  seo: seo(meta['useful-info']),
});

// ---------- write ----------

/** Drop undefined values so documents don't carry empty fields. */
const clean = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(clean)
    : value && typeof value === 'object'
      ? Object.fromEntries(
          Object.entries(value)
            .filter(([, v]) => v !== undefined)
            .map(([k, v]) => [k, clean(v)]),
        )
      : value;

const counts = Object.entries(
  docs.reduce<Record<string, number>>((acc, doc) => {
    acc[doc._type] = (acc[doc._type] ?? 0) + 1;
    return acc;
  }, {}),
);

const expected: Record<string, number> = {
  conference:
    common.upcomingConferences.list.length +
    conferencesJson.upcomingConferences.list.length,
  monograph:
    common.upcomingMonographs.list.length +
    monographsJson.archivedMonographs.list.length,
  libraryItem: libraryJson.list.length,
  grantGroup: common.grants.list.length,
  person: Object.values(people).reduce((sum, list) => sum + list.length, 0),
  partner: partnersJson.length,
  news: common.news.list.length,
};

const ids = docs.map(doc => doc._id);
if (new Set(ids).size !== ids.length)
  throw new Error('Duplicate _id in the migration');

console.log(dryRun ? 'Dry run: nothing written.\n' : 'Writing to Sanity…\n');
console.table(
  counts.map(([type, count]) => ({
    type,
    documents: count,
    'in JSON': expected[type] ?? 1,
    match: count === (expected[type] ?? 1) ? 'yes' : 'NO',
  })),
);
console.log(`${docs.length} documents, ${imageCount} images to upload.`);

if (counts.some(([type, count]) => count !== (expected[type] ?? 1))) {
  throw new Error('Counts differ from the JSON; nothing written.');
}

if (dryRun) {
  const out = 'screenshots/review/migration-dry-run.json';
  await writeFile(out, JSON.stringify(docs.map(clean), null, 2));
  console.log(`Documents saved to ${out}.`);
} else {
  const transaction = client.transaction();
  for (const doc of docs) transaction.createOrReplace(clean(doc) as Doc);
  const result = await transaction.commit();
  console.log(`Done: ${result.results.length} documents written.`);
}
