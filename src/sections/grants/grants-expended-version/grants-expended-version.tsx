import { GrantList } from '@/components/ui';

import commonData from '@/data/common.json';

export const GrantsExpendedVersion = () => {
  const { list } = commonData.grants;

  return (
    <section className="section w-full pt-0!">
      <GrantList list={list} withAnswers />
    </section>
  );
};
