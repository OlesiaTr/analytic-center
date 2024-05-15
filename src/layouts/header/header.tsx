'use client';

import React, { FC, useState } from 'react';
import clsx from 'clsx';

import { LINKS, VIEWPORT_MD } from '@/constants';
import { MobileMenu } from '@/components/base';
import { Logo } from '@/components/svg-icons';
import { MenuBtn, Navigation } from '@/components/ui';
import { useViewportSize } from '@/utils';
import { isProduction } from '@/configs';

export interface Props {
  isHomePage?: boolean;
}

export const Header: FC<Props> = ({ isHomePage = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useViewportSize();

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <header
      className={clsx(
        '  m-auto w-full max-w-screen-xxl text-white lg:inset-x-0 lg:top-0 ',
        isOpen && '!bg-headerBg',
        isHomePage ? 'absolute bg-transparent ' : 'sticky bg-headerBg  ',
      )}
    >
      <div className="flex items-center justify-between p-4 md:px-14  lg:py-0 xl:px-20">
        <a
          href={isProduction() ? 'index.html' : LINKS[0].linkTo}
          className="transition hover:scale-110"
        >
          {width !== null && width < VIEWPORT_MD ? (
            <Logo width={50} height={36} />
          ) : (
            <Logo />
          )}
        </a>

        <Navigation location="header" links={LINKS} />

        <MenuBtn onClick={toggleModal} isOpen={isOpen} />
      </div>

      {isOpen && <MobileMenu closeModal={setIsOpen} />}
    </header>
  );
};
