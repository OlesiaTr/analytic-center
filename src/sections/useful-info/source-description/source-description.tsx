import data from '@/data/useful-info.json';

export const SourceDescription = () => {
  const { title, footnote, headers, rows } = data.table;
  const [typeHeader, exampleHeader] = headers;

  return (
    <section className="section w-full pt-0!">
      <h2 className="rounded-lg bg-accent px-4 py-5 text-center text-sm font-bold text-chocolate uppercase md:py-7 md:text-base lg:text-xl xl:text-[28px] xl:leading-7">
        {title}
      </h2>

      {/* A real table from md up; below md each row stacks (type above example)
          so the page never scrolls sideways. */}
      <table className="mt-9 w-full border-collapse shadow max-md:block">
        <thead className="max-md:sr-only">
          <tr>
            <th scope="col" className="border p-4 text-left">
              {typeHeader}
            </th>
            <th scope="col" className="border p-4 text-left">
              {exampleHeader}
            </th>
          </tr>
        </thead>

        <tbody className="max-md:block">
          {rows.map(({ group, type, example }) => (
            <tr key={`${group ?? ''}${type}`} className="max-md:block">
              <th
                scope="row"
                className="border p-4 text-left align-top font-normal max-md:block max-md:border-b-0 max-md:pb-1 max-md:font-bold"
              >
                {group && (
                  <>
                    {group}:
                    <br />
                  </>
                )}
                {type}
              </th>
              <td className="border p-4 align-top wrap-break-word max-md:block max-md:border-t-0 max-md:pt-1">
                {example}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-7 text-center text-xl leading-snug text-chocolate xl:text-2xl">
        {footnote}
      </p>
    </section>
  );
};
