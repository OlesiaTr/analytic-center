import React, { FC } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import data from '@/data/common.json';

export interface Props {
  onClick: () => void;
  isOpen: boolean;
}

export const MenuBtn: FC<Props> = ({ onClick, isOpen }) => {
  const { mobileMenu } = data.header;

  return (
    <button
      type="button"
      onClick={onClick}
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
