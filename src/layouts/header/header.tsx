'use client';
import React, { FC, useState } from 'react';

import { LINKS, VIEWPORT_MD } from '@/constants';
import { MenuBtn, Navigation } from '@/components/ui';
import { Logo } from '@/svg-icons/logo';
import { MobileMenu } from '@/components/base';
import { useViewportSize } from '@/utils';
import clsx from 'clsx';

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
      <div className="flex items-center justify-between px-4  md:px-10 xl:px-20">
        {width !== null && width < VIEWPORT_MD ? (
          <Logo width={50} height={36} />
        ) : (
          <Logo />
        )}

        <Navigation location="header" links={LINKS} />

        <MenuBtn onClick={toggleModal} isOpen={isOpen} />
      </div>

      {isOpen && <MobileMenu closeModal={setIsOpen} />}
    </header>
  );
};
