'use client';

import { useState, FC } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export interface Props {
  list: {
    title: string;
  }[];

  withAnswers?: boolean;
}

export const GrantList: FC<Props> = ({ list, withAnswers = false }) => {
  const [active, setActive] = useState<null | number>(null);

  const toggleActive = (id: number) => {
    setActive(active === id ? null : id);
  };

  return (
    <ul className="mb-6 flex flex-col gap-8 md:mb-10 lg:mb-16">
      {list.map((grant, id) => (
        <li
          key={id}
          className={clsx(
            ' flex cursor-pointer justify-between rounded-lg bg-white px-4 py-5 transition md:py-7 ',
            active === id && 'active',
          )}
          onClick={() => toggleActive(id)}
        >
          <h3 className="max-w-64 text-sm font-bold uppercase text-chocolate sm:max-w-[362px] md:max-w-full md:text-base lg:text-xl xl:text-[28px]">
            {grant.title}
          </h3>

          {withAnswers && (
            <ChevronDownIcon
              className={clsx(
                'size-6 min-w-6 transition',
                active === id && 'rotate-180',
              )}
            />
          )}
        </li>
      ))}
    </ul>
  );
};
