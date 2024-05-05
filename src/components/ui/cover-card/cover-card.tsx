import React, { FC } from 'react';

import { Button } from '@/components/ui';

export interface Props {
  card: {
    id: string;
    imgSrc: string;
    imgAlt: string;
    title: string;
    description: string;
    date: string;
    linkToDownload: string;
  };
  buttonDownload: string;
}

export const CoverCard: FC<Props> = ({ card, buttonDownload }) => {
  const {
    imgSrc,
    imgAlt,
    title,
    description,
    date,
    // linkToDownload,
  } = card;

  return (
    <>
      <div className="m-auto max-w-[250px] pt-2">
        <img src={imgSrc} alt={imgAlt} height={378} />
      </div>

      <div className="flex h-[250px] flex-col items-center justify-between p-4 md:py-6">
        <div>
          <h3 className="mb-6 font-bold uppercase leading-tight tracking-[-0.003px]">
            {title}
          </h3>

          <p className="text-xs font-medium leading-snug">{description}</p>
        </div>

        <div className="w-full">
          <span className="mb-6 inline-flex rounded-lg bg-dateBg px-2 text-xs font-semibold leading-snug text-chocolate">
            {date}
          </span>

          <Button
            label={buttonDownload}
            isAccentBtn
            withIcon
            styles="max-w-[270px] min-w-[220px] py-4 m-auto"
          />
        </div>
      </div>
    </>
  );
};
