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
      {list.map(
        ({
          image,
          name,
          position,
          googlescholar,
          linkedin,
          naukovci,
          orcid,
          researchgate,
          scopus,
          wos,
        }) => (
          <li key={name} className="max-w-[374px] rounded-lg shadow">
            <div className="max-h-[416px]">
              <img
                src={image}
                alt={name}
                loading="lazy"
                decoding="async"
                width={374}
                height={416}
                className="h-[416px] object-cover"
              />
            </div>
            <div className="flex h-[170px] flex-col justify-between px-4 py-6">
              <div className="">
                <h3 className="mb-2 leading-tight font-bold tracking-[-0.003px] text-black uppercase">
                  {name}
                </h3>
                <p className="text-sm leading-snug text-chocolate">
                  {position}
                </p>
              </div>
              <ul className="flex gap-5">
                {linkedin && (
                  <li>
                    <a
                      href={linkedin}
                      aria-label={linkedin}
                      className="icon-option-one transition hover:text-accent"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin />
                    </a>
                  </li>
                )}

                {googlescholar && (
                  <li>
                    <a
                      href={googlescholar}
                      aria-label={googlescholar}
                      className="icon-option-one transition hover:text-accent"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Googlescholar />
                    </a>
                  </li>
                )}

                {naukovci && (
                  <li>
                    <a
                      href={naukovci}
                      aria-label={naukovci}
                      className="icon-option-one transition hover:text-accent"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Naukovci />
                    </a>
                  </li>
                )}

                {orcid && (
                  <li>
                    <a
                      href={orcid}
                      aria-label={orcid}
                      className="icon-option-one transition hover:text-accent"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Orcid />
                    </a>
                  </li>
                )}

                {researchgate && (
                  <li>
                    <a
                      href={researchgate}
                      aria-label={researchgate}
                      className="icon-option-one transition hover:text-accent"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Researchgate />
                    </a>
                  </li>
                )}

                {scopus && (
                  <li>
                    <a
                      href={scopus}
                      aria-label={scopus}
                      className="icon-option-one transition hover:text-accent"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Scopus />
                    </a>
                  </li>
                )}

                {wos && (
                  <li>
                    <a
                      href={wos}
                      aria-label={wos}
                      className="icon-option-one transition hover:text-accent"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WebOfScience />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </li>
        ),
      )}
    </ul>
  );
};
