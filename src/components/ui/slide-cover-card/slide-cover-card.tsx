import React, { FC } from 'react';
import { Button } from '../button';

export interface Props {
  card: {
    id: string;
    imgSrc: string;
    imgAlt: string;
    title: string;
    date: string;
    linkToDownload: string;
  };
  buttonDownload: string;
}

export const SlideCoverCard: FC<Props> = ({ card, buttonDownload }) => {
  const {
    imgSrc,
    imgAlt,
    title,
    date,
    // linkToDownload,
  } = card;

  return (
    <>
      <div className="m-auto max-w-[250px] pt-2">
        <img src={imgSrc} alt={imgAlt} height={378} />
      </div>

      <div className="m-auto flex h-[205px] max-w-[440px] flex-col items-center justify-between p-4 md:py-6">
        <h3 className="font-bold uppercase leading-tight tracking-[-0.003px]">
          {title}
        </h3>

        <div className="w-full">
          <span className="inline-flex rounded-lg bg-dateBg px-2 text-xs font-semibold leading-snug text-chocolate">
            {date}
          </span>

          <Button
            label={buttonDownload}
            isAccentBtn
            withIcon
            styles="max-w-[270px] min-w-[220px] py-4 mt-4 mx-auto"
          />
        </div>
      </div>
    </>
  );
};
