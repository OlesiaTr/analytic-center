'use client';

import clsx from 'clsx';
import { FC, useEffect, useRef } from 'react';
import { Link, usePathname } from '@/i18n/navigation';

import { LINKS } from '@/constants';
import data from '@/data/common.json';
import type { Contacts } from '@/lib/sanity/contacts';

export interface Props {
  id: string;
  label: string;
  closeModal: () => void;
  contacts: Contacts;
}

/** Full-height blue-800 panel below the header, 56 px rows, contacts at the bottom. */
export const MobileMenu: FC<Props> = ({ id, label, closeModal, contacts }) => {
  const firstLink = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const { title } = data.footer.contacts;

  // Move focus into the menu when it opens.
  useEffect(() => firstLink.current?.focus(), []);

  return (
    <nav
      id={id}
      aria-label={label}
      className="min-h-[calc(100dvh-64px)] overflow-y-auto border-t border-white/16 bg-blue-800 pt-2 pb-8 lg:hidden"
    >
      <div className="wrap">
        <ul>
          {LINKS.map(({ name, linkTo }, index) => {
            const current = pathname === linkTo;
            return (
              <li key={linkTo}>
                <Link
                  ref={index === 0 ? firstLink : undefined}
                  href={linkTo}
                  aria-current={current ? 'page' : undefined}
                  onClick={closeModal}
                  className={clsx(
                    'flex min-h-14 items-center gap-3 border-b border-white/16 px-1 text-xl font-semibold no-underline hover:text-yellow-400',
                    current
                      ? 'text-yellow-400 before:h-6 before:w-1 before:rounded-sm before:bg-yellow-400'
                      : 'text-white',
                  )}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col gap-3 t-sm text-on-dark-muted">
          <span className="t-over text-yellow-400">{title}</span>
          <a href={`tel:${contacts.phone}`} className="text-white">
            {contacts.phoneLabel}
          </a>
          <a href={`mailto:${contacts.email}`} className="text-white">
            {contacts.email}
          </a>
        </div>
      </div>
    </nav>
  );
};
