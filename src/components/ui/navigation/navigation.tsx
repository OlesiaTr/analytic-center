import Link from 'next/link';
import React, { FC } from 'react';
import clsx from 'clsx';
import { HomeIcon } from '@heroicons/react/16/solid';

export interface Props {
  location?: string;
  links: readonly {
    readonly name: string;
    readonly linkTo: string;
  }[];
  listStyles?: string;
  linkStyles?: string;
}

export const Navigation: FC<Props> = ({
  location = '',
  links,
  listStyles,
  linkStyles,
}) => {
  return (
    <nav className={location === 'header' ? 'hidden lg:block' : ''}>
      <ul
        className={clsx(
          'flex items-center font-semibold tracking-[0.5px] lg:gap-2 xl:gap-7 xxl:gap-12',
          listStyles,
        )}
      >
        {location === 'header' && (
          <li>
            <Link
              href={links[0].linkTo}
              className={clsx(
                'flex py-8 text-white transition hover:text-accent active:text-accentLight',
              )}
            >
              <HomeIcon className="size-8" />
            </Link>
          </li>
        )}
        {links.slice(1).map(({ name, linkTo }) => (
          <li key={linkTo}>
            <Link
              href={linkTo}
              className={clsx(
                'flex py-[46px] text-white transition hover:text-accent active:text-accentLight',
                linkStyles,
              )}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
