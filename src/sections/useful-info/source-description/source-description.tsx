import { getTranslations } from 'next-intl/server';

import { DataTable } from '@/components/ui';
import { getUsefulInfoPage } from '@/lib/sanity/content';

export const SourceDescription = async () => {
  const t = await getTranslations('usefulInfo.headers');
  const [typeHeader, exampleHeader] = [t('type'), t('example')];
  const table = (await getUsefulInfoPage())?.table;
  const title = table?.caption ?? '';
  const footnote = table?.footnote;
  const rows = table?.rows ?? [];

  return (
    <section aria-label={title} className="sec">
      <div className="wrap">
        <DataTable
          caption={title}
          columns={[typeHeader, exampleHeader]}
          valueClassName="font-serif text-base leading-[26px] wrap-anywhere"
          rows={rows.map(({ group, type, example, exampleLang }) => ({
            key: `${group ?? ''}${type}`,
            group: group ?? undefined,
            label: type ?? '',
            // Examples follow the Ukrainian standard, so they often stay Ukrainian.
            value: <span lang={exampleLang}>{example}</span>,
          }))}
        />
        <p className="mt-4 max-w-190 t-sm text-muted">{footnote}</p>
      </div>
    </section>
  );
};
