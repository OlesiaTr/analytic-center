import React, { FC } from 'react';
import { HomeIcon } from '@heroicons/react/16/solid';

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
          'flex items-center  font-semibold tracking-[0.5px] lg:gap-2 xl:gap-7 xxl:gap-12'
        }
      >
        <li>
          <a
            href={isProduction() ? 'index.html' : links[0].linkTo}
            className="flex py-8 transition hover:text-accent active:text-accentLight "
          >
            <HomeIcon className="size-8" />
          </a>
        </li>
        {links.slice(1).map(({ name, linkTo }, id) => (
          <li key={id}>
            <a
              href={isProduction() ? `${linkTo}.html` : linkTo}
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
