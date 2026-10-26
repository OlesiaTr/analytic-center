import { DataTable } from '@/components/ui';
import data from '@/data/useful-info.json';
import { getUsefulInfoPage } from '@/lib/sanity/content';

export const SourceDescription = async () => {
  const [typeHeader, exampleHeader] = data.table.headers;
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
          rows={rows.map(({ group, type, example }) => ({
            key: `${group ?? ''}${type}`,
            group: group ?? undefined,
            label: type ?? '',
            value: example,
          }))}
        />
        <p className="mt-4 max-w-190 t-sm text-muted">{footnote}</p>
      </div>
    </section>
  );
};
