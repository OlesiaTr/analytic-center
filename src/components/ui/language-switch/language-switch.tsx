'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';

import { getPathname, usePathname } from '@/i18n/navigation';

interface Props {
  /** `light` for white grounds; default is for blue-800 / navy-900. */
  tone?: 'dark' | 'light';
}

const LOCALES = [
  { code: 'uk', short: 'УКР' },
  { code: 'en', short: 'ENG' },
] as const;

/**
 * «УКР / ENG» pill linking to the current page in each language; never «UK»,
 * which Ukrainian readers parse as the United Kingdom.
 */
export const LanguageSwitch: FC<Props> = ({ tone = 'dark' }) => {
  const current = useLocale();
  // The path without the locale prefix: `/grants` on both /grants and /en/grants.
  const pathname = usePathname();
  const t = useTranslations('header.languageSwitch');
  const label = t('label');
  const uk = t('uk');
  const en = t('en');
  const names = { uk, en };

  return (
    <div
      role="group"
      aria-label={label}
      className={clsx(
        'inline-flex rounded-full border-[1.5px] p-[3px]',
        tone === 'dark' ? 'border-switch-border' : 'border-line-strong',
      )}
    >
      {LOCALES.map(({ code, short }) => {
        const isCurrent = code === current;
        return (
          <Link
            key={code}
            href={getPathname({ locale: code, href: pathname })}
            lang={code}
            aria-current={isCurrent ? 'true' : undefined}
            className={clsx(
              'inline-flex min-h-[34px] min-w-11 items-center justify-center rounded-full px-2.5 text-[13px] leading-[18px] font-bold tracking-[0.04em] no-underline',
              tone === 'dark'
                ? isCurrent
                  ? 'bg-white text-blue-800'
                  : 'text-white hover:bg-white/14'
                : isCurrent
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-800 hover:bg-blue-50',
            )}
          >
            {short} <span className="sr-only">{names[code]}</span>
          </Link>
        );
      })}
    </div>
  );
};
