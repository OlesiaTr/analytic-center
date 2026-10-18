'use client';

import Link from 'next/link';
import React, { FC } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { HomeIcon } from '@heroicons/react/16/solid';

export interface Props {
  location?: string;
  label: string;
  links: readonly {
    readonly name: string;
    readonly linkTo: string;
  }[];
  listStyles?: string;
  linkStyles?: string;
}

export const Navigation: FC<Props> = ({
  location = '',
  label,
  links,
  listStyles,
  linkStyles,
}) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label={label}
      className={location === 'header' ? 'hidden lg:block' : ''}
    >
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
              aria-label={links[0].name}
              aria-current={pathname === links[0].linkTo ? 'page' : undefined}
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
              aria-current={pathname === linkTo ? 'page' : undefined}
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
