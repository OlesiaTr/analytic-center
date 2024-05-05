'use client';

import React, { Dispatch, FC, SetStateAction } from 'react';

import { LINKS } from '@/constants';
import { isProduction } from '@/configs';

export interface Props {
  closeModal: Dispatch<SetStateAction<boolean>>;
}

export const MobileMenu: FC<Props> = ({ closeModal }) => {
  return (
    <div className="fixed w-full transition lg:hidden">
      <div className="rounded-b-[40px] bg-headerBg px-4 py-6 md:px-20">
        <ul className="flex flex-col gap-4">
          {LINKS.map(({ name, linkTo }, id) => (
            <li
              key={id}
              className="cursor-pointer"
              onClick={() => closeModal(false)}
            >
              <a
                href={
                  isProduction()
                    ? `${linkTo === '/' ? 'index' : linkTo}.html`
                    : linkTo
                }
                className="text-xl font-medium leading-normal text-white transition hover:text-accent active:text-accentLight"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
