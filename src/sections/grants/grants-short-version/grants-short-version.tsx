import { useTranslations } from 'next-intl';

import { Button, SectionHead } from '@/components/ui';

import { GrantGroups } from '../grant-groups';

export const GrantsShortVersion = () => {
  const t = useTranslations('grants');

  return (
    <section aria-labelledby="grants-title" className="sec">
      <div className="wrap">
        <SectionHead
          id="grants-title"
          title={t('title')}
          action={<Button href="/grants">{t('button')}</Button>}
        />
        <GrantGroups />
      </div>
    </section>
  );
};
