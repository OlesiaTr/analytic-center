import { DataTable, Panel } from '@/components/ui';
import data from '@/data/conferences.json';
import { plural } from '@/utils';

export const AboutAuthors = () => {
  const { title, sub, fieldCount, columns, list } = data.table;
  const [labelHead, valueHead] = columns;

  return (
    <Panel
      id="authors-form"
      title={title}
      sub={sub.replace('{count}', plural(list.length, fieldCount))}
    >
      <DataTable
        columns={[labelHead, valueHead]}
        rows={list.map(({ question, answer }) => ({
          key: question,
          label: question,
          value: (
            <span className="block min-h-10 rounded-md border-[1.5px] border-dashed border-line-strong px-3 py-2 t-sm text-muted italic">
              {answer}
            </span>
          ),
        }))}
      />
    </Panel>
  );
};
