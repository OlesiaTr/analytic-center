import type { Metadata } from 'next';
import Image from 'next/image';

import {
  PageHead,
  PersonCard,
  SectionHead,
  type Person,
} from '@/components/ui';
import data from '@/data/about-center.json';
import commonData from '@/data/common.json';
import {
  ACADEMIC_COUNCIL,
  ORGANIZATION_MEMBERS,
  SUPERVISORY_BOARD,
} from '@/data/images';
import meta from '@/data/meta/meta.json';
import { OrganizationStatute } from '@/sections';
import { plural } from '@/utils';

export const metadata: Metadata = meta['about-center'];

const Page = () => {
  const {
    title,
    introLabel,
    list,
    academicCouncil,
    supervisoryBoard,
    organizationMembers,
    peopleCount,
  } = data;

  const boards: { id: string; title: string; people: Person[] }[] = [
    { id: 'council', title: academicCouncil.title, people: ACADEMIC_COUNCIL },
    { id: 'board', title: supervisoryBoard.title, people: SUPERVISORY_BOARD },
    {
      id: 'members',
      title: organizationMembers.title,
      people: ORGANIZATION_MEMBERS.toSorted((a, b) =>
        a.name.localeCompare(b.name, 'uk'),
      ),
    },
  ];

  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <PageHead title={title} />

      <section aria-label={introLabel} className="sec">
        <div className="wrap grid items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div className="prose max-w-180">
            {list.map(({ bold, text }) => (
              <p key={text}>
                {bold && <strong>{bold.trim()}</strong>} {text.trim()}
              </p>
            ))}
          </div>
          <div className="aspect-4/3 overflow-hidden rounded-xl bg-blue-50">
            <Image
              src="/images/about_center-tab.webp"
              alt={commonData.aboutCenter.imgAlt}
              width={519}
              height={593}
              className="size-full object-cover"
            />
          </div>
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
              sub={plural(board.people.length, peopleCount)}
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
