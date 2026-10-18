import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import React, { FC } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/16/solid';

export interface Props {
  label: string;
  href: string;
  styles?: string;
  isAccentBtn?: boolean;
  withIcon?: boolean;
  linkToDownload?: boolean;
  /** Extra context for screen readers, e.g. which publication to download. */
  srLabel?: string;
}

export const ButtonLink: FC<Props> = ({
  label,
  href,
  styles = '',
  isAccentBtn = false,
  withIcon = false,
  linkToDownload = false,
  srLabel,
}) => {
  // twMerge lets `styles` override the base (e.g. padding) instead of adding a
  // second utility for the same property.
  const className = twMerge(
    clsx(
      'w-full rounded-lg py-[10.5px] text-center font-semibold transition md:max-w-[302px] md:px-12 md:py-4',
      isAccentBtn
        ? 'bg-accent text-black hover:bg-accentLight active:bg-accentDark'
        : 'bg-mainBg text-white hover:bg-mainBgLight active:bg-mainBgDark',
      withIcon ? 'flex items-start justify-center' : 'inline-block',
    ),
    styles,
  );

  const content = withIcon ? (
    <>
      {' '}
      <ArrowDownTrayIcon aria-hidden className="mr-[10px] size-5" /> {label}
      {srLabel && <span className="sr-only">: {srLabel}</span>}
    </>
  ) : (
    <>
      {label}
      {srLabel && <span className="sr-only">: {srLabel}</span>}
    </>
  );

  // Internal routes use client-side navigation; files and external sites stay plain links.
  if (href.startsWith('/') && !linkToDownload) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} download={linkToDownload} className={className}>
      {content}
    </a>
  );
};
