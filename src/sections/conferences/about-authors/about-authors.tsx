'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

import { Table } from '@/components/ui';

import data from '@/data/conferences.json';

export const AboutAuthors = () => {
  const [active, setActive] = useState<boolean>(true);
  const { title, list } = data.table;

  return (
    <section className="section">
      <div
        className="flex cursor-pointer justify-between rounded-lg bg-accent px-4 py-5 transition md:py-7"
        onClick={() => setActive(!active)}
      >
        <h3 className="max-w-64 text-sm font-bold text-chocolate uppercase sm:max-w-[362px] md:max-w-full md:text-base lg:text-xl xl:text-[28px]">
          {title}
        </h3>

        <ChevronDownIcon
          className={clsx('size-6 min-w-6 transition', active && 'rotate-180')}
        />
      </div>
      {active && <Table table={list} />}
    </section>
  );
};
