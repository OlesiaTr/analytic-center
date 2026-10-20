import grantsData from '@/data/grants.json';

import { GrantGroups } from '../grant-groups';

export const GrantsExpendedVersion = () => (
  <section aria-label={grantsData.listLabel} className="sec">
    <div className="wrap max-w-[1040px]">
      <GrantGroups headingLevel="h2" />
    </div>
  </section>
);
