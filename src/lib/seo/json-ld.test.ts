import { describe, expect, it } from 'vitest';

import type { Publication } from '@/lib/sanity/content';

import { book, event, graph, organization, person, toIsoDate } from './json-ld';

const ORG = { '@id': 'https://acmhs.in.ua/#organization' };

const publication: Publication = {
  id: 'c1',
  title: 'VII All-Ukrainian Scientific and Practical Conference',
  description: '“The Global World and Ukraine”',
  date: '27.11.2026',
  linkToDownload: 'https://docs.google.com/uc?export=download&id=1',
  imgSrc: 'https://cdn.sanity.io/images/x/cover.png',
  width: 600,
  height: 848,
  imgAlt: '',
  lang: 'en',
};

/** Round-trip through JSON, as the page does, so `undefined` fields drop out. */
const json = (value: unknown) => JSON.parse(JSON.stringify(value));

describe('JSON-LD', () => {
  it('converts card dates to ISO and keeps bare years', () => {
    expect(toIsoDate('27.11.2026')).toBe('2026-11-27');
    expect(toIsoDate('2026')).toBe('2026');
    expect(toIsoDate('')).toBeUndefined();
  });

  it('describes a conference as an Event organized by the Center', () => {
    expect(
      json(
        event(publication, {
          organizer: ORG,
          url: 'https://acmhs.in.ua/en/conferences',
        }),
      ),
    ).toEqual({
      '@type': 'Event',
      name: publication.title,
      description: publication.description,
      startDate: '2026-11-27',
      image: publication.imgSrc,
      url: 'https://acmhs.in.ua/en/conferences',
      organizer: ORG,
      inLanguage: 'uk',
    });
  });

  it('describes a library book with its authors and download', () => {
    const node = json(
      book(
        { ...publication, date: '2026', authors: 'O.M. Kuz, M.P. Trebin' },
        { publisher: ORG },
      ),
    );
    expect(node).toMatchObject({
      '@type': 'Book',
      author: 'O.M. Kuz, M.P. Trebin',
      datePublished: '2026',
      url: publication.linkToDownload,
      publisher: ORG,
    });
  });

  it('links a person’s profiles and leaves out empty ones', () => {
    const node = json(
      person(
        {
          name: 'Trebin Mykhailo Petrovych',
          position: 'Doctor of Sciences in Philosophy, Professor',
          image: '',
          profiles: { orcid: 'https://orcid.org/0000', linkedin: null },
        },
        { memberOf: ORG },
      ),
    );
    expect(node.sameAs).toEqual(['https://orcid.org/0000']);
    expect(node).not.toHaveProperty('image');
  });

  it('wraps nodes in a schema.org graph', () => {
    const data = graph([
      organization({
        id: ORG['@id'],
        name: 'Analytic Center of Modern Humanities',
        url: 'https://acmhs.in.ua/en',
        logo: 'https://acmhs.in.ua/meta/android-chrome-512x512.png',
        email: '',
      }),
    ]);
    expect(data['@context']).toBe('https://schema.org');
    expect(json(data)['@graph'][0]).not.toHaveProperty('email');
  });
});
