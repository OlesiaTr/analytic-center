'use client';

import clsx from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

import { Table } from '@/components/ui';

import data from '@/data/conferences.json';
import { useDisclosure } from '@/hooks';

export const AboutAuthors = () => {
  const { isOpen, toggle } = useDisclosure(true);
  const { title, list } = data.table;

  return (
    <section className="section">
      <h2>
        <button
          type="button"
          className="flex w-full cursor-pointer justify-between rounded-lg bg-accent px-4 py-5 text-left transition md:py-7"
          aria-expanded={isOpen}
          aria-controls={isOpen ? 'authors-form' : undefined}
          onClick={toggle}
        >
          <span className="max-w-64 text-sm font-bold text-chocolate uppercase sm:max-w-[362px] md:max-w-full md:text-base lg:text-xl xl:text-[28px] xl:leading-7">
            {title}
          </span>

          <ChevronDownIcon
            aria-hidden
            className={clsx(
              'size-6 min-w-6 transition',
              isOpen && 'rotate-180',
            )}
          />
        </button>
      </h2>

      {isOpen && <Table id="authors-form" caption={title} table={list} />}
    </section>
  );
};
