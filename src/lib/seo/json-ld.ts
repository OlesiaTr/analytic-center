import type { Publication } from '@/lib/sanity/content';

// schema.org nodes for search engines and AI crawlers. Pure: callers pass the
// content and absolute URLs; `undefined` fields drop out in JSON.stringify.

type Node = Record<string, unknown>;

/** Reference to the Organization node (`@id`) from the other nodes. */
export type Ref = { '@id': string };

/** dd.mm.yyyy → yyyy-mm-dd; a bare year (library) stays as it is. */
export const toIsoDate = (date: string) => {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(date);
  return match ? `${match[3]}-${match[2]}-${match[1]}` : date || undefined;
};

export const graph = (nodes: Node[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
});

export const organization = (org: {
  id: string;
  name: string;
  description?: string;
  url: string;
  logo: string;
  email?: string;
  phone?: string;
}): Node => ({
  '@type': 'Organization',
  '@id': org.id,
  name: org.name,
  description: org.description,
  url: org.url,
  logo: org.logo,
  email: org.email || undefined,
  telephone: org.phone || undefined,
});

/** Conferences: the title is the series, the description its theme. */
export const event = (
  conference: Publication,
  { organizer, url }: { organizer: Ref; url: string },
): Node => ({
  '@type': 'Event',
  name: conference.title,
  description: conference.description,
  startDate: toIsoDate(conference.date),
  image: conference.imgSrc || undefined,
  url,
  organizer,
  inLanguage: 'uk',
});

/** Published monographs and library books; the text itself is Ukrainian. */
export const book = (
  publication: Publication & { authors?: string },
  { publisher }: { publisher: Ref },
): Node => ({
  '@type': 'Book',
  name: publication.title,
  author: publication.authors,
  publisher,
  datePublished: toIsoDate(publication.date),
  image: publication.imgSrc || undefined,
  url: publication.linkToDownload || undefined,
  inLanguage: 'uk',
});

export const person = (
  member: {
    name: string;
    position: string;
    image: string;
    profiles?: Record<string, string | null | undefined> | null;
  },
  { memberOf }: { memberOf: Ref },
): Node => {
  const sameAs = Object.values(member.profiles ?? {}).filter(
    (url): url is string => !!url,
  );
  return {
    '@type': 'Person',
    name: member.name,
    jobTitle: member.position || undefined,
    image: member.image || undefined,
    sameAs: sameAs.length ? sameAs : undefined,
    memberOf,
  };
};
