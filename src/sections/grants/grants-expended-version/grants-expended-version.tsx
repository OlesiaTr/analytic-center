import { useTranslations } from 'next-intl';

import { GrantGroups } from '../grant-groups';

export const GrantsExpendedVersion = () => {
  const t = useTranslations('grants');
  return (
    <section aria-label={t('listLabel')} className="sec">
      <div className="wrap">
        <div className="max-w-260">
          <GrantGroups headingLevel="h2" />
        </div>
      </div>
    </section>
  );
};
