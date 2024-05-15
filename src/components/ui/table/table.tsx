import React, { FC } from 'react';

export interface Props {
  table: {
    question: string;
    answer: string;
  }[];
}

export const Table: FC<Props> = ({ table }) => {
  return (
    <div className="mt-9 grid grid-cols-1 shadow md:grid-cols-2">
      <ul className="grid grid-cols-1">
        {table.map(({ question }, id) => (
          <li
            className="flex h-[110px] items-center border sm:h-[90px] md:h-[115px] lg:h-[80px] xl:h-16"
            key={id}
          >
            <p className="sm:font-medium md:font-bold">{question}</p>
          </li>
        ))}
      </ul>

      <ul className="hidden grid-cols-1 md:grid">
        {table.map(({ answer }, id) => (
          <li
            className="flex items-center justify-center border md:h-[115px] lg:h-[80px] xl:h-16"
            key={id}
          >
            {answer}
          </li>
        ))}
      </ul>
    </div>
  );
};
