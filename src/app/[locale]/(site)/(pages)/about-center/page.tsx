import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { PortableText } from 'next-sanity';

import { PageHead, PersonCard, SectionHead } from '@/components/ui';
import { getAboutPage, getPage, getPeople } from '@/lib/sanity/content';
import { pageMetadata } from '@/lib/sanity/metadata';
import { OrganizationStatute } from '@/sections';

export const generateMetadata = (): Promise<Metadata> =>
  pageMetadata('aboutPage', '/about-center');

const BOARDS = ['council', 'supervisory', 'member'] as const;

const Page = async () => {
  const [page, about, ...people] = await Promise.all([
    getPage('aboutPage'),
    getAboutPage(),
    ...BOARDS.map(getPeople),
  ]);

  const t = await getTranslations('about');
  const locale = await getLocale();

  const boards = BOARDS.map((id, index) => ({
    id,
    title: about?.boardTitles?.[id] ?? '',
    // The council and supervisory board keep their order; members go by name.
    people:
      id === 'member'
        ? people[index].toSorted((a, b) => a.name.localeCompare(b.name, locale))
        : people[index],
  }));

  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <PageHead title={page?.title ?? ''} lead={page?.lead ?? undefined} />

      <section aria-label={t('introLabel')} className="sec">
        <div className="wrap grid items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div className="prose max-w-180">
            {about?.intro && <PortableText value={about.intro} />}
          </div>
          {about?.imgSrc && (
            <div className="aspect-4/3 overflow-hidden rounded-xl bg-blue-50">
              <Image
                src={about.imgSrc}
                alt={about.imgAlt ?? ''}
                width={about.width ?? 0}
                height={about.height ?? 0}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="size-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <OrganizationStatute />

      {boards.map(board => (
        <section
          key={board.id}
          aria-labelledby={`${board.id}-title`}
          className="sec"
        >
          <div className="wrap">
            <SectionHead
              id={`${board.id}-title`}
              title={board.title}
              sub={t('peopleCount', { count: board.people.length })}
            />
            <ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 md:gap-x-6 md:gap-y-8 lg:grid-cols-4 xl:grid-cols-5">
              {board.people.map(person => (
                <li key={person.name}>
                  <PersonCard person={person} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </main>
  );
};

export default Page;
