import type { Metadata } from 'next';

import { Title, ProfessorList } from '@/components/ui';

import data from '@/data/about-center.json';
import meta from '@/data/meta/meta.json';
import {
  ACADEMIC_COUNCIL,
  ORGANIZATION_MEMBERS,
  SUPERVISORY_BOARD,
} from '@/data/images';
import { OrganizationStatute } from '@/sections';

export const metadata: Metadata = meta['about-center'];

const Page = () => {
  const {
    title,
    list,
    academicCouncil,
    supervisoryBoard,
    organizationMembers,
  } = data;

  const sortedMembersByName = ORGANIZATION_MEMBERS.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <main>
      <section className="section ">
        <Title title={title} />

        <ul className="flex flex-col gap-3 md:gap-5 lg:gap-6">
          {list.map((paragraph, id) => (
            <li
              key={id}
              className="  text-sm leading-[1.43] tracking-[0.5px] text-main md:text-xl lg:text-lg xl:text-xl xl:leading-[1.8] xxl:text-2xl xxl:leading-[1.8] "
            >
              {' '}
              <b>{paragraph.bold}</b> {paragraph.text}
            </li>
          ))}
        </ul>
      </section>

      <OrganizationStatute />

      <section className="section ">
        <Title title={academicCouncil.title} />

        <ProfessorList list={ACADEMIC_COUNCIL} />
      </section>

      <section className="section ">
        <Title title={supervisoryBoard.title} />

        <ProfessorList list={SUPERVISORY_BOARD} />
      </section>

      <section className="section ">
        <Title title={organizationMembers.title} />

        <ProfessorList list={sortedMembersByName} />
      </section>
    </main>
  );
};

export default Page;
