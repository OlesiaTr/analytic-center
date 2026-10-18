'use client';

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

  const titleClassName =
    'max-w-64 text-sm font-bold text-chocolate uppercase sm:max-w-[362px] md:max-w-full md:text-base lg:text-xl xl:text-[28px] xl:leading-7';
  const barClassName =
    'flex w-full justify-between rounded-lg border-b border-divider bg-surface px-4 py-5 text-left transition md:py-7';

  return (
    <ul className="mb-6 flex flex-col gap-8 md:mb-10 lg:mb-16">
      {list.map((grant, id) => {
        const panelId = `grant-panel-${id}`;

        return (
          <li key={grant.title} className="flex flex-col gap-8">
            {/* On /grants each title toggles its programs; on home it's a static list. */}
            {withAnswers ? (
              <h3>
                <button
                  type="button"
                  className={clsx(barClassName, 'cursor-pointer')}
                  aria-expanded={isActive(id)}
                  aria-controls={panelId}
                  onClick={() => setActive(id)}
                >
                  <span className={titleClassName}>{grant.title}</span>
                  <ChevronDownIcon
                    aria-hidden
                    className={clsx(
                      'size-6 min-w-6 transition',
                      isActive(id) && 'rotate-180',
                    )}
                  />
                </button>
              </h3>
            ) : (
              <h3 className={barClassName}>
                <span className={titleClassName}>{grant.title}</span>
              </h3>
            )}

            {isActive(id) && (
              <div id={panelId} className="flex flex-col gap-8">
                {grantsList[active].programs.map(details => (
                  <GrantDetails
                    key={details.title}
                    title={details.title}
                    description={details.description}
                    date={details.date}
                    linkTo={details.linkTo}
                    descriptionList={
                      'descriptionList' in details
                        ? details.descriptionList
                        : null
                    }
                  />
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};
