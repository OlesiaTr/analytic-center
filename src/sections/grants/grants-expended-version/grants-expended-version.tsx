import data from '@/data/common.json';

import { GrantGroups } from '../grant-groups';

export const GrantsExpendedVersion = () => (
  <section aria-label={data.grants.listLabel} className="sec">
    <div className="wrap">
      <div className="max-w-260">
        <GrantGroups headingLevel="h2" />
      </div>
    </div>
  </section>
);
