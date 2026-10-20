import grantsData from '@/data/grants.json';

import { GrantGroups } from '../grant-groups';

export const GrantsExpendedVersion = () => (
  <section aria-label={grantsData.listLabel} className="sec">
    <div className="wrap">
      <div className="max-w-260">
        <GrantGroups headingLevel="h2" />
      </div>
    </div>
  </section>
);
