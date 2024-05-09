import { ButtonLink, GrantList, Title } from '@/components/ui';
import { isProduction } from '@/configs';

import data from '@/data/common.json';

export const GrantsShortVersion = () => {
  const { title, list, button, redirectionTo } = data.grants;

  return (
    <section className="section bg-accent">
      <Title title={title} />

      <GrantList list={list} />

      <ButtonLink
        label={button}
        styles="sm:min-w-[302px] m-auto"
        href={isProduction() ? `${redirectionTo}.html` : redirectionTo}
      />
    </section>
  );
};
