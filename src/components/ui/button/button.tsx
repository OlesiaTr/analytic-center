import clsx from 'clsx';
import React, { FC } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/16/solid';

export interface Props {
  label: string;
  styles?: string;
  isAccentBtn?: boolean;
  withIcon?: boolean;
}

export const Button: FC<Props> = ({
  label,
  styles = '',
  isAccentBtn = false,
  withIcon = false,
}) => {
  return (
    <button
      className={clsx(
        `w-full rounded-lg py-[10.5px] font-semibold md:max-w-[302px] md:px-12 md:py-4  ${styles}`,
        isAccentBtn ? 'bg-accent text-black' : 'bg-mainBg text-white',
        withIcon && 'flex justify-center gap-[10px]',
      )}
      type="button"
    >
      {withIcon ? (
        <>
          {' '}
          <ArrowDownTrayIcon className="size-5" /> {label}
        </>
      ) : (
        <>{label}</>
      )}
    </button>
  );
};
