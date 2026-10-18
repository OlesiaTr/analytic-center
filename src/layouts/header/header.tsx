'use client';

import React, { FC, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { LINKS } from '@/constants';
import { MobileMenu } from '@/components/base';
import { Logo } from '@/components/svg-icons';
import { MenuBtn, Navigation } from '@/components/ui';
import { useDisclosure, useEscapeKey } from '@/hooks';
import data from '@/data/common.json';

const MENU_ID = 'mobile-menu';

export interface Props {
  isHomePage?: boolean;
}

export const Header: FC<Props> = ({ isHomePage = false }) => {
  const pathname = usePathname();
  // Keyed by pathname, so the menu closes after navigating.
  const { isOpen, toggle, close } = useDisclosure(false, pathname);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and returns focus to the button that opened it.
  const closeAndFocusButton = useCallback(() => {
    close();
    menuButton.current?.focus();
  }, [close]);
  useEscapeKey(isOpen, closeAndFocusButton);

  return (
    <header
      className={clsx(
        'm-auto w-full max-w-(--breakpoint-xxl) text-white lg:inset-x-0 lg:top-0',
        isHomePage ? 'absolute' : 'sticky',
        isOpen || !isHomePage ? 'bg-headerBg' : 'bg-transparent',
      )}
    >
      <div className="flex items-center justify-between p-4 md:px-14 lg:py-0 xl:px-20">
        <Link href={LINKS[0].linkTo} className="transition hover:scale-110">
          <Logo
            alt={data.header.homeLabel}
            className="h-9 w-[50px] md:h-15 md:w-[85px]"
          />
        </Link>

        <Navigation
          location="header"
          label={data.header.navLabel}
          links={LINKS}
        />

        <MenuBtn
          ref={menuButton}
          onClick={toggle}
          isOpen={isOpen}
          controls={MENU_ID}
        />
      </div>

      {isOpen && (
        <MobileMenu
          id={MENU_ID}
          label={data.header.mobileMenu.navLabel}
          closeModal={close}
        />
      )}
    </header>
  );
};
