import React, { FC, Ref } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import data from '@/data/common.json';

export interface Props {
  onClick: () => void;
  isOpen: boolean;
  controls: string;
  ref?: Ref<HTMLButtonElement>;
}

export const MenuBtn: FC<Props> = ({ onClick, isOpen, controls, ref }) => {
  const { mobileMenu } = data.header;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={controls}
      aria-label={
        isOpen ? mobileMenu.closeBtnAriaLabel : mobileMenu.openBtnAriaLabel
      }
      className="text-white transition lg:hidden"
    >
      {isOpen ? (
        <XMarkIcon className="size-9" />
      ) : (
        <Bars3Icon className="size-9" />
      )}
    </button>
  );
};
