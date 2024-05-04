import clsx from 'clsx';
import React, { FC } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/16/solid';

export interface Props {
  label: string;
  href: string;
  styles?: string;
  isAccentBtn?: boolean;
  withIcon?: boolean;
}

export const ButtonLink: FC<Props> = ({
  label,
  href,
  styles = '',
  isAccentBtn = false,
  withIcon = false,
}) => {
  return (
    <a
      href={href}
      className={clsx(
        `inline-block w-full rounded-lg py-[10.5px] text-center font-semibold md:max-w-[302px] md:px-12 md:py-4 ${styles}`,
        isAccentBtn ? 'bg-accent text-black' : 'bg-mainBg text-white',
      )}
    >
      {withIcon ? (
        <>
          {' '}
          <ArrowDownTrayIcon className="size-5" /> {label}
        </>
      ) : (
        <>{label}</>
      )}
    </a>
  );
};
