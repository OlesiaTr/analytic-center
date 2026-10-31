import { getTranslations } from 'next-intl/server';

import { DataTable, Panel } from '@/components/ui';
import { getConferencesPage } from '@/lib/sanity/content';

export const AboutAuthors = async () => {
  const t = await getTranslations('authorsForm');
  const [labelHead, valueHead] = [t('columns.field'), t('columns.answer')];
  const form = (await getConferencesPage())?.authorsForm;
  const fields = (form?.fields ?? [])
    .map(field => field.text)
    .filter((field): field is string => !!field);
  // «Шаблон, який надсилається разом із тезами — 13 полів»

  return (
    <Panel
      id="authors-form"
      title={form?.title ?? ''}
      sub={`${form?.sub ?? ''} — ${t('fieldCount', { count: fields.length })}`}
    >
      <DataTable
        columns={[labelHead, valueHead]}
        rows={fields.map(question => ({
          key: question,
          label: question,
          value: (
            <span className="block min-h-10 rounded-md border-[1.5px] border-dashed border-line-strong px-3 py-2 t-sm text-muted italic" />
          ),
        }))}
      />
    </Panel>
  );
};
