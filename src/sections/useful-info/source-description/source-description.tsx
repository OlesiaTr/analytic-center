import { DataTable } from '@/components/ui';
import data from '@/data/useful-info.json';

export const SourceDescription = () => {
  const { title, footnote, headers, rows } = data.table;
  const [typeHeader, exampleHeader] = headers;

  return (
    <section aria-label={title} className="sec">
      <div className="wrap">
        <DataTable
          caption={title}
          columns={[typeHeader, exampleHeader]}
          valueClassName="font-serif text-base leading-[26px] wrap-anywhere"
          rows={rows.map(({ group, type, example }) => ({
            key: `${group ?? ''}${type}`,
            group,
            label: type,
            value: example,
          }))}
        />
        <p className="mt-4 max-w-190 t-sm text-muted">{footnote}</p>
      </div>
    </section>
  );
};
