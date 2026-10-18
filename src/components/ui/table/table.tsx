import React, { FC } from 'react';

export interface Props {
  id?: string;
  caption: string;
  table: {
    question: string;
    answer: string;
  }[];
}

/**
 * Two-column form template (field → empty answer). From md up it's a table;
 * below md each row stacks so the answer cell stays visible.
 */
export const Table: FC<Props> = ({ id, caption, table }) => {
  return (
    <table
      id={id}
      className="mt-9 w-full table-fixed border-collapse shadow max-md:block"
    >
      <caption className="sr-only">{caption}</caption>
      <tbody className="max-md:block">
        {table.map(({ question, answer }) => (
          <tr key={question} className="max-md:block">
            <th
              scope="row"
              className="h-[110px] border px-0 text-left font-normal max-md:block max-md:h-auto max-md:border-b-0 max-md:p-4 max-md:pb-2 sm:h-[90px] sm:font-medium md:h-[115px] md:font-bold lg:h-20 xl:h-16"
            >
              {question}
            </th>
            <td className="border text-center max-md:block max-md:h-12 max-md:border-dashed md:h-[115px] lg:h-20 xl:h-16">
              {answer}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
