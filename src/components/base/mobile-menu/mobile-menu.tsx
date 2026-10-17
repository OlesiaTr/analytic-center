'use client';

import Link from 'next/link';
import React, { FC } from 'react';

import { LINKS } from '@/constants';

export interface Props {
  closeModal: () => void;
}

export const MobileMenu: FC<Props> = ({ closeModal }) => {
  return (
    <div className="fixed w-full transition lg:hidden">
      <div className="rounded-b-[40px] bg-headerBg px-4 py-6 md:px-20">
        <ul className="flex flex-col gap-4">
          {LINKS.map(({ name, linkTo }) => (
            <li key={linkTo} className="cursor-pointer" onClick={closeModal}>
              <Link
                href={linkTo}
                className="text-xl leading-normal font-medium text-white transition hover:text-accent active:text-accentLight"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
