import { sanityFetch } from './fetch';
import {
  aboutPageQuery,
  archivedConferencesQuery,
  archivedMonographsQuery,
  conferencesPageQuery,
  grantGroupsQuery,
  heroCoversQuery,
  homePageQuery,
  libraryQuery,
  newsQuery,
  pageQuery,
  partnersQuery,
  peopleQuery,
  siteSettingsQuery,
  upcomingConferencesQuery,
  upcomingMonographsQuery,
  usefulInfoPageQuery,
} from './queries';

/** A conference, monograph or library book as the cards render it. */
export interface Publication {
  id: string;
  imgSrc: string;
  width: number;
  height: number;
  imgAlt: string;
  title: string;
  description?: string;
  date: string;
  linkToDownload: string;
}

// Content for the UI, in the shapes the components already take. Schema
// validation keeps required fields filled; `?? ''` only satisfies the types.

/** Kyiv-agnostic "today" (yyyy-mm-dd, UTC): decides upcoming vs archive. */
const today = () => new Date().toISOString().slice(0, 10);

/** yyyy-mm-dd → dd.mm.yyyy, the format the cards and formatDate use. */
export const toDisplayDate = (iso: string) => {
  const [year, month, day] = iso.split('-');
  return `${day}.${month}.${year}`;
};

type PublicationRow = {
  id: string;
  title: string | null;
  description?: string | null;
  date: string;
  linkToDownload: string | null;
  imgSrc: string | null;
  width: number | null;
  height: number | null;
};

const toPublication = (row: PublicationRow): Publication => ({
  id: row.id,
  title: row.title ?? '',
  description: row.description ?? undefined,
  date: toDisplayDate(row.date),
  linkToDownload: row.linkToDownload ?? '',
  imgSrc: row.imgSrc ?? '',
  width: row.width ?? 0,
  height: row.height ?? 0,
  imgAlt: '',
});

const image = (row: {
  image: string | null;
  width: number | null;
  height: number | null;
}) => ({
  image: row.image ?? '',
  width: row.width ?? 0,
  height: row.height ?? 0,
});

export const getUpcomingConferences = async () =>
  (
    await sanityFetch(upcomingConferencesQuery, {
      params: { today: today() },
      tags: ['conference'],
    })
  ).map(toPublication);

export const getArchivedConferences = async () =>
  (await sanityFetch(archivedConferencesQuery, { tags: ['conference'] })).map(
    toPublication,
  );

export const getUpcomingMonographs = async () =>
  (
    await sanityFetch(upcomingMonographsQuery, {
      params: { today: today() },
      tags: ['monograph'],
    })
  ).map(toPublication);

export const getArchivedMonographs = async () =>
  (await sanityFetch(archivedMonographsQuery, { tags: ['monograph'] })).map(
    toPublication,
  );

/** Library cards show the year as the date and «authors · kind» below the title. */
export const getLibrary = async (kinds: Record<string, string>) =>
  (await sanityFetch(libraryQuery, { tags: ['libraryItem'] })).map(row => ({
    ...toPublication({ ...row, date: '' }),
    date: String(row.year ?? ''),
    description:
      [row.authors, row.kind && kinds[row.kind]].filter(Boolean).join(' · ') ||
      undefined,
  }));

export const getHeroCovers = async () =>
  (
    await sanityFetch(heroCoversQuery, { tags: ['conference', 'monograph'] })
  ).map(image);

export const getPartners = async () =>
  (await sanityFetch(partnersQuery, { tags: ['partner'] })).map(row => ({
    ...image(row),
    name: row.name ?? '',
    href: row.href ?? '',
  }));

export const getNews = async () =>
  (await sanityFetch(newsQuery, { tags: ['news'] })).map(row => ({
    id: row.id,
    text: row.text ?? '',
    date: row.date ? toDisplayDate(row.date) : '',
    linkTo: row.href ?? '#',
    imgSrc: row.imgSrc ?? '',
    width: row.width ?? 0,
    height: row.height ?? 0,
  }));

export const getGrantGroups = async () =>
  (await sanityFetch(grantGroupsQuery, { tags: ['grantGroup'] })).map(
    group => ({
      id: group.id,
      title: group.title ?? '',
      programs: (group.programs ?? []).map(program => ({
        title: program.title ?? '',
        description: program.description ?? '',
        descriptionList: program.points?.filter(
          (point): point is string => !!point,
        ),
        date: program.deadline ?? '',
        linkTo: program.link ?? '',
      })),
    }),
  );

export type GrantGroup = Awaited<ReturnType<typeof getGrantGroups>>[number];

export const getPeople = async (board: 'council' | 'supervisory' | 'member') =>
  (await sanityFetch(peopleQuery, { params: { board }, tags: ['person'] })).map(
    row => ({
      ...image(row),
      name: row.name ?? '',
      position: row.position ?? '',
      ...row.profiles,
    }),
  );

export const getSiteSettings = () =>
  sanityFetch(siteSettingsQuery, { tags: ['siteSettings'] });

export const getHomePage = () =>
  sanityFetch(homePageQuery, { tags: ['homePage'] });

export const getPage = (
  id:
    | 'homePage'
    | 'aboutPage'
    | 'conferencesPage'
    | 'monographsPage'
    | 'libraryPage'
    | 'grantsPage'
    | 'usefulInfoPage'
    | 'journalsPage'
    | 'contactsPage',
) => sanityFetch(pageQuery, { params: { id }, tags: [id] });

export const getConferencesPage = () =>
  sanityFetch(conferencesPageQuery, { tags: ['conferencesPage'] });

export const getAboutPage = () =>
  sanityFetch(aboutPageQuery, { tags: ['aboutPage'] });

export const getUsefulInfoPage = () =>
  sanityFetch(usefulInfoPageQuery, { tags: ['usefulInfoPage'] });
