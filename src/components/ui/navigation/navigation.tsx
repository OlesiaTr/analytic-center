import React, { FC } from 'react';

import { isProduction } from '@/configs';

export interface Props {
  location: string;
  links: readonly {
    readonly name: string;
    readonly linkTo: string;
  }[];
}

export const Navigation: FC<Props> = ({ location, links }) => {
  return (
    <nav className={location === 'header' ? 'hidden lg:block' : ''}>
      <ul
        className={
          'flex font-semibold tracking-[0.5px] lg:gap-2 xl:gap-7 xxl:gap-12'
        }
      >
        {links.map(({ name, linkTo }, id) => (
          <li key={id}>
            <a
              href={
                isProduction()
                  ? `${linkTo === '/' ? 'index' : linkTo}.html`
                  : linkTo
              }
              className="flex py-[46px] transition hover:text-accent active:text-accentLight "
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
