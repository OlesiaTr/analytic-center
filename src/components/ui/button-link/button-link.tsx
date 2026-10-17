import clsx from 'clsx';
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
}

export const ButtonLink: FC<Props> = ({
  label,
  href,
  styles = '',
  isAccentBtn = false,
  withIcon = false,
  linkToDownload = false,
}) => {
  const className = clsx(
    `w-full rounded-lg py-[10.5px] text-center font-semibold transition md:max-w-[302px] md:px-12 md:py-4 ${styles}`,
    isAccentBtn
      ? 'bg-accent text-black hover:bg-accentLight active:bg-accentDark'
      : 'bg-mainBg text-white hover:bg-mainBgLight active:bg-mainBgDark',
    withIcon ? 'flex items-start justify-center' : 'inline-block',
  );

  const content = withIcon ? (
    <>
      {' '}
      <ArrowDownTrayIcon className="mr-[10px] size-5" /> {label}
    </>
  ) : (
    <>{label}</>
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
