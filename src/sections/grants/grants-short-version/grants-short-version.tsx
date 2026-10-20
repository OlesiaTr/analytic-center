import { Button, SectionHead } from '@/components/ui';
import data from '@/data/common.json';

import { GrantGroups } from '../grant-groups';

export const GrantsShortVersion = () => {
  const { title, button, redirectionTo } = data.grants;

  return (
    <section aria-labelledby="grants-title" className="sec">
      <div className="wrap">
        <SectionHead
          id="grants-title"
          title={title}
          action={<Button href={redirectionTo}>{button}</Button>}
        />
        <GrantGroups />
      </div>
    </section>
  );
};
