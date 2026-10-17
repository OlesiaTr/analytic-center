'use client';

import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import grantsData from '@/data/grants.json';
import { useAccordion } from '@/hooks';
import { GrantDetails } from '../grant-details';

export interface Props {
  list: {
    title: string;
  }[];

  withAnswers?: boolean;
}

export const GrantList = ({ list, withAnswers = false }: Props) => {
  const { active, isActive, setActive } = useAccordion();
  const { list: grantsList } = grantsData;

  return (
    <ul className="mb-6 flex flex-col gap-8 md:mb-10 lg:mb-16">
      {list.map((grant, id) => (
        <Fragment key={grant.title}>
          <li
            className={clsx(
              'grant flex justify-between rounded-lg bg-white px-4 py-5 transition md:py-7',
              isActive(id) && 'active',
              withAnswers && 'cursor-pointer',
            )}
            onClick={() => setActive(id)}
          >
            <h3 className="max-w-64 text-sm font-bold text-chocolate uppercase sm:max-w-[362px] md:max-w-full md:text-base lg:text-xl xl:text-[28px]">
              {grant.title}
            </h3>

            {withAnswers && (
              <ChevronDownIcon
                className={clsx(
                  'size-6 min-w-6 transition',
                  isActive(id) && 'rotate-180',
                )}
              />
            )}
          </li>

          {isActive(id) &&
            grantsList[active].programs.map(details => (
              <GrantDetails
                key={details.title}
                title={details.title}
                description={details.description}
                date={details.date}
                linkTo={details.linkTo}
                descriptionList={
                  'descriptionList' in details ? details.descriptionList : null
                }
              />
            ))}
        </Fragment>
      ))}
    </ul>
  );
};
