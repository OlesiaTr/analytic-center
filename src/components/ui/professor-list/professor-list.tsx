import Image from 'next/image';
import React, { FC } from 'react';

import {
  Googlescholar,
  Linkedin,
  Naukovci,
  Orcid,
  Researchgate,
  Scopus,
  WebOfScience,
} from '@/components/svg-icons';

type SocialKey =
  | 'linkedin'
  | 'googlescholar'
  | 'naukovci'
  | 'orcid'
  | 'researchgate'
  | 'scopus'
  | 'wos';

// Display order of the profile links.
const SOCIAL_LINKS: { key: SocialKey; label: string; Icon: FC }[] = [
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
  { key: 'googlescholar', label: 'Google Scholar', Icon: Googlescholar },
  { key: 'naukovci', label: 'Науковці України', Icon: Naukovci },
  { key: 'orcid', label: 'ORCID', Icon: Orcid },
  { key: 'researchgate', label: 'ResearchGate', Icon: Researchgate },
  { key: 'scopus', label: 'Scopus', Icon: Scopus },
  { key: 'wos', label: 'Web of Science', Icon: WebOfScience },
];

export interface Props {
  list: {
    image: string;
    name: string;
    position: string;
    googlescholar?: string;
    linkedin?: string;
    naukovci?: string;
    orcid?: string;
    researchgate?: string;
    scopus?: string;
    wos?: string;
  }[];
}

export const ProfessorList: FC<Props> = ({ list }) => {
  return (
    <ul className="grid grid-cols-1 justify-items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-20 xl:grid-cols-3">
      {list.map(person => {
        const { image, name, position } = person;

        return (
          <li key={name} className="max-w-[374px] rounded-lg shadow">
            <div className="max-h-104">
              <Image
                src={image}
                alt={name}
                width={374}
                height={416}
                className="h-104 object-cover"
              />
            </div>
            <div className="flex h-[170px] flex-col justify-between px-4 py-6">
              <div>
                <h3 className="mb-2 leading-tight font-bold tracking-[-0.003px] text-black uppercase">
                  {name}
                </h3>
                <p className="text-sm leading-snug text-chocolate">
                  {position}
                </p>
              </div>
              <ul className="flex gap-5">
                {SOCIAL_LINKS.map(({ key, label, Icon }) => {
                  const href = person[key];
                  if (!href) return null;

                  return (
                    <li key={key}>
                      <a
                        href={href}
                        aria-label={`${label}: ${name}`}
                        className="icon-option-one transition hover:text-accent"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
