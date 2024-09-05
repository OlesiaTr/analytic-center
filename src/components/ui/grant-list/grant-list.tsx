'use client';

import { Fragment, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import grantsData from '@/data/grants.json';
import { GrantDetails } from '../grant-details';

export interface Props {
  list: {
    title: string;
  }[];

  withAnswers?: boolean;
}

export const GrantList = ({ list, withAnswers = false }: Props) => {
  const [active, setActive] = useState<number>(0);
  const { list: grantsList } = grantsData;

  const toggleActive = (id: number) => {
    setActive(id);
  };

  return (
    <ul className="mb-6 flex flex-col gap-8 md:mb-10 lg:mb-16">
      {list.map((grant, id) => (
        <Fragment key={id}>
          <li
            className={clsx(
              'grant flex justify-between rounded-lg bg-white px-4 py-5 transition md:py-7 ',
              active === id && 'active',
              withAnswers && 'cursor-pointer',
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

          {active === id && (
            grantsList[active].programs.map((details, id) => (
              <GrantDetails
                key={id}
                title={details.title}
                description={details.description}
                date={details.date}
                linkTo={details.linkTo}
                descriptionList={'descriptionList' in details ? details.descriptionList : null}
              />
            ))

          )}
        </Fragment>
      ))}
    </ul>
  );
};
