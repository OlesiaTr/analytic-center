import { DataTable, Panel } from '@/components/ui';
import data from '@/data/conferences.json';
import { getConferencesPage } from '@/lib/sanity/content';
import { plural } from '@/utils';

export const AboutAuthors = async () => {
  const { fieldCount, columns } = data.table;
  const [labelHead, valueHead] = columns;
  const form = (await getConferencesPage())?.authorsForm;
  const fields = (form?.fields ?? []).filter((f): f is string => !!f);
  // «Шаблон, який надсилається разом із тезами — 13 полів»
  const sub = `${form?.sub ?? ''} — {count}`;

  return (
    <Panel
      id="authors-form"
      title={form?.title ?? ''}
      sub={sub.replace('{count}', plural(fields.length, fieldCount))}
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
