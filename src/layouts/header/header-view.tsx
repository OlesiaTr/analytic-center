'use client';

import clsx from 'clsx';
import { FC, useCallback, useRef } from 'react';
import { Link, usePathname } from '@/i18n/navigation';

import { MobileMenu } from '@/components/base';
import { Icon } from '@/components/icons';
import { Logo } from '@/components/svg-icons';
import { LanguageSwitch } from '@/components/ui';
import { LINKS, SHOW_LANGUAGE_SWITCH } from '@/constants';
import data from '@/data/common.json';
import { useDisclosure, useEscapeKey } from '@/hooks';
import type { Contacts } from '@/lib/sanity/contacts';

const MENU_ID = 'mobile-menu';

export interface Props {
  /** Over the home hero: 90 % blue-800, absolutely positioned (white ≥ 8.67:1). */
  isHomePage?: boolean;
  contacts: Contacts;
}

/** Client part of the header: menu state, Escape, focus. */
export const HeaderView: FC<Props> = ({ isHomePage = false, contacts }) => {
  const pathname = usePathname();
  // Keyed by pathname, so the menu closes after navigating.
  const { isOpen, toggle, close } = useDisclosure(false, pathname);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { mobileMenu } = data.header;

  // Escape closes the menu and returns focus to the button that opened it.
  const closeAndFocusButton = useCallback(() => {
    close();
    menuButton.current?.focus();
  }, [close]);
  useEscapeKey(isOpen, closeAndFocusButton);

  const [home, ...items] = LINKS;

  return (
    <header
      className={clsx(
        'z-10 on-dark',
        isHomePage
          ? 'absolute inset-x-0 top-0 bg-blue-800/90 backdrop-blur-[6px]'
          : 'relative bg-blue-800',
      )}
    >
      <div className="wrap flex min-h-16 items-center gap-4 lg:min-h-20 lg:gap-6">
        <Link
          href={home.linkTo}
          className="-ml-1 inline-flex flex-none p-1"
          aria-label={data.header.logoLabel}
        >
          <Logo className="h-10 w-auto lg:h-13" />
        </Link>

        <nav
          aria-label={data.header.navLabel}
          className="ml-auto hidden lg:block"
        >
          <ul className="flex items-center gap-1 xl:gap-2">
            <li>
              <NavLink href={home.linkTo} current={pathname === home.linkTo}>
                <Icon name="home" />
                <span className="sr-only">{data.header.homeLabel}</span>
              </NavLink>
            </li>
            {items.map(({ name, linkTo }) => (
              <li key={linkTo}>
                <NavLink href={linkTo} current={pathname === linkTo}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={clsx(
            'ml-auto flex items-center gap-2 lg:ml-2',
            // Only the burger lives here until the language switch ships.
            !SHOW_LANGUAGE_SWITCH && 'lg:hidden',
          )}
        >
          {SHOW_LANGUAGE_SWITCH && (
            <LanguageSwitch
              current="uk"
              hrefs={{ uk: pathname, en: `/en${pathname}` }}
            />
          )}
          <button
            ref={menuButton}
            type="button"
            onClick={toggle}
            aria-expanded={isOpen}
            aria-controls={MENU_ID}
            aria-label={
              isOpen
                ? mobileMenu.closeBtnAriaLabel
                : mobileMenu.openBtnAriaLabel
            }
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-lg border-[1.5px] border-switch-border text-white hover:bg-white/12 lg:hidden"
          >
            <Icon name={isOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {isOpen && (
        <MobileMenu
          id={MENU_ID}
          label={mobileMenu.navLabel}
          closeModal={close}
          contacts={contacts}
        />
      )}
    </header>
  );
};

const NavLink: FC<{
  href: string;
  current: boolean;
  children: React.ReactNode;
}> = ({ href, current, children }) => (
  <Link
    href={href}
    aria-current={current ? 'page' : undefined}
    className={clsx(
      'relative inline-flex min-h-11 items-center rounded px-2.5 text-[15px] leading-[22px] font-semibold whitespace-nowrap text-white no-underline hover:text-yellow-400 xl:px-3',
      // Active item: 3 px yellow bar under the label
      current &&
        'after:absolute after:inset-x-2.5 after:bottom-1 after:h-[3px] after:rounded-sm after:bg-yellow-400 xl:after:inset-x-3',
    )}
  >
    {children}
  </Link>
);
