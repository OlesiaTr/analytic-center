'use client';

import React, { FC, useState } from 'react';
import clsx from 'clsx';

import { LINKS } from '@/constants';
import { MobileMenu } from '@/components/base';
import { Logo } from '@/components/svg-icons';
import { MenuBtn, Navigation } from '@/components/ui';

export interface Props {
  isHomePage?: boolean;
}

export const Header: FC<Props> = ({ isHomePage = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <header
      className={clsx(
        'm-auto w-full max-w-(--breakpoint-xxl) text-white lg:inset-x-0 lg:top-0',
        isOpen && 'bg-headerBg!',
        isHomePage ? 'absolute bg-transparent' : 'sticky bg-headerBg',
      )}
    >
      <div className="flex items-center justify-between p-4 md:px-14 lg:py-0 xl:px-20">
        <a href={LINKS[0].linkTo} className="transition hover:scale-110">
          <Logo className="h-9 w-[50px] md:h-[60px] md:w-[85px]" />
        </a>

        <Navigation location="header" links={LINKS} />

        <MenuBtn onClick={toggleModal} isOpen={isOpen} />
      </div>

      {isOpen && <MobileMenu closeModal={setIsOpen} />}
    </header>
  );
};
