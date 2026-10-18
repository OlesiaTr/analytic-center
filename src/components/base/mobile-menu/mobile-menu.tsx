'use client';

import Link from 'next/link';
import React, { FC, useEffect, useRef } from 'react';

import { LINKS } from '@/constants';

export interface Props {
  id: string;
  label: string;
  closeModal: () => void;
}

export const MobileMenu: FC<Props> = ({ id, label, closeModal }) => {
  const firstLink = useRef<HTMLAnchorElement>(null);

  // Move focus into the menu when it opens.
  useEffect(() => firstLink.current?.focus(), []);

  return (
    <nav
      id={id}
      aria-label={label}
      className="fixed w-full transition lg:hidden"
    >
      <div className="rounded-b-[40px] bg-headerBg px-4 py-6 md:px-20">
        <ul className="flex flex-col gap-4">
          {LINKS.map(({ name, linkTo }, index) => (
            <li key={linkTo}>
              <Link
                ref={index === 0 ? firstLink : undefined}
                href={linkTo}
                onClick={closeModal}
                className="text-xl leading-normal font-medium text-white transition hover:text-accent active:text-accentLight"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
