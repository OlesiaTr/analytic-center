import { getTranslations } from 'next-intl/server';

import { LINKS } from '@/constants';
import { absoluteUrl } from '@/lib/sanity/metadata';
import { sanityFetch } from '@/lib/sanity/fetch';
import {
  archivedConferencesQuery,
  archivedMonographsQuery,
  libraryQuery,
  pageQuery,
  siteSettingsQuery,
  upcomingConferencesQuery,
} from '@/lib/sanity/queries';

// /llms.txt (llmstxt.org): what the Center is and where everything lives, in
// English with the Ukrainian original linked. Route handlers have no locale to
// read, so every query passes it; the tags let the webhook refresh this file.

const LOCALE = 'en';

const PAGE_IDS = {
  home: 'homePage',
  about: 'aboutPage',
  conferences: 'conferencesPage',
  monographs: 'monographsPage',
  library: 'libraryPage',
  grants: 'grantsPage',
  useful: 'usefulInfoPage',
} as const;

const fetchEn = <const Query extends string>(
  query: Query,
  tags: string[],
  params: Record<string, string> = {},
) => sanityFetch(query, { params: { locale: LOCALE, ...params }, tags });

type Item = { title: string | null; linkToDownload: string | null };

/** Markdown list of the publications that have a file, with a note each. */
const list = <T extends Item>(items: T[], note: (item: T) => string) =>
  items
    .filter(item => item.title && item.linkToDownload)
    .map(item => `- [${item.title}](${item.linkToDownload})${note(item)}`)
    .join('\n');

/** «: “theme”, 2026»; several conferences share a title, so the theme tells them apart. */
const dated = (item: { date: string; description?: string | null }) =>
  `: ${[item.description, item.date.slice(0, 4)].filter(Boolean).join(', ')}`;

export async function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const [t, settings, pages, upcoming, proceedings, monographs, library] =
    await Promise.all([
      getTranslations({ locale: LOCALE, namespace: 'nav' }),
      fetchEn(siteSettingsQuery, ['siteSettings']),
      Promise.all(
        LINKS.map(({ key }) =>
          fetchEn(pageQuery, [PAGE_IDS[key]], { id: PAGE_IDS[key] }),
        ),
      ),
      fetchEn(upcomingConferencesQuery, ['conference'], { today }),
      fetchEn(archivedConferencesQuery, ['conference']),
      fetchEn(archivedMonographsQuery, ['monograph']),
      fetchEn(libraryQuery, ['libraryItem']),
    ]);

  const body = [
    `# ${settings?.name ?? ''}`,
    `> ${settings?.seo?.description ?? ''}`,
    'A Ukrainian non-governmental research organization in the humanities. It holds all-Ukrainian and international scientific conferences, publishes collective monographs and shares its members’ books for free. The site is in Ukrainian at https://acmhs.in.ua/ and in English at https://acmhs.in.ua/en; publications are in Ukrainian.',
    '## Pages',
    LINKS.map(({ key, linkTo }, index) => {
      const lead = pages[index]?.lead ? `: ${pages[index].lead}` : '';
      return `- [${t(key)}](${absoluteUrl('en', linkTo)})${lead} (Ukrainian: ${absoluteUrl('uk', linkTo)})`;
    }).join('\n'),
    '## Upcoming conferences (information letters)',
    list(upcoming, dated) || '- None announced right now',
    '## Conference proceedings',
    list(proceedings, dated),
    '## Monographs',
    list(monographs, dated),
    '## Library',
    list(library, item => {
      const note = [item.authors, item.year].filter(Boolean).join(', ');
      return note ? `: ${note}` : '';
    }),
    '## Contact',
    [
      settings?.contacts?.email && `- Email: ${settings.contacts.email}`,
      settings?.contacts?.phone && `- Phone: ${settings.contacts.phone}`,
    ]
      .filter(Boolean)
      .join('\n'),
  ].join('\n\n');

  return new Response(`${body}\n`, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
