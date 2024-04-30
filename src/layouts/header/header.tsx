import React, { FC } from 'react';

import { LINKS } from '@/constants';
import { isProduction } from '@/configs';

export interface Props {}

export const Header: FC<Props> = () => {
  return (
    <header className="text-red-400">
      <nav>
        <ul className={'flex gap-4 font-bold uppercase'}>
          {LINKS.map(({ name, linkTo }, id) => (
            <li key={id}>
              <a
                href={
                  isProduction()
                    ? `${linkTo === '/' ? 'index' : linkTo}.html`
                    : linkTo
                }
                className="pb-4"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
