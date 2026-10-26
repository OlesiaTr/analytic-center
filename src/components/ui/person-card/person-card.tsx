import Image from 'next/image';
import { FC } from 'react';

import data from '@/data/common.json';

type ProfileKey =
  | 'linkedin'
  | 'googlescholar'
  | 'naukovci'
  | 'orcid'
  | 'researchgate'
  | 'scopus'
  | 'wos';

// Display order and badge text; full names come from common.json.
const PROFILES: { key: ProfileKey; short: string }[] = [
  { key: 'linkedin', short: 'in' },
  { key: 'googlescholar', short: 'GS' },
  { key: 'naukovci', short: 'НУ' },
  { key: 'orcid', short: 'iD' },
  { key: 'researchgate', short: 'RG' },
  { key: 'scopus', short: 'Sc' },
  { key: 'wos', short: 'WoS' },
];

export type Person = {
  image: string;
  width: number;
  height: number;
  name: string;
  position: string;
} & Partial<Record<ProfileKey, string>>;

/** Photo, name, position and text badges for research profiles. */
export const PersonCard: FC<{ person: Person }> = ({ person }) => {
  const { image, width, height, name, position } = person;
  const links = PROFILES.filter(({ key }) => person[key]);

  return (
    <article className="flex min-w-0 flex-col gap-2">
      <div className="mb-1 aspect-374/416 overflow-hidden rounded-lg bg-blue-50">
        <Image
          src={image}
          // The name is right below the photo.
          alt=""
          width={width}
          height={height}
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="size-full object-cover object-[50%_20%]"
        />
      </div>
      <h3 className="text-[15px] leading-[22px] font-bold text-ink md:text-base md:leading-6">
        {name}
      </h3>
      <p className="t-sm leading-5 text-muted">{position}</p>
      {links.length > 0 && (
        <ul className="mt-1 flex flex-wrap gap-1.5">
          {links.map(({ key, short }) => (
            <li key={key}>
              <a
                href={person[key]}
                target="_blank"
                rel="noopener noreferrer"
                title={data.profiles[key]}
                className="relative inline-flex h-8 min-w-9 items-center justify-center rounded-md border border-line-strong bg-white px-1.5 text-xs leading-4 font-bold text-blue-800 no-underline hover:border-blue-600 hover:bg-blue-50"
              >
                {short}{' '}
                <span className="sr-only">
                  {data.profiles[key]}, {name} {data.a11y.newTab}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};
