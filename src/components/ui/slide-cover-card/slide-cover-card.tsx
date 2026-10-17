import React, { FC } from 'react';

import { ButtonLink } from '@/components/ui';

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
  const { imgSrc, imgAlt, title, date, linkToDownload } = card;

  return (
    <>
      <div className="m-auto max-w-[250px] pt-2">
        <img
          src={imgSrc}
          alt={imgAlt}
          loading="lazy"
          decoding="async"
          height={378}
        />
      </div>

      <div className="m-auto flex h-[205px] max-w-[440px] flex-col items-center justify-between p-4 md:py-6">
        <h3 className="leading-tight font-bold tracking-[-0.003px] uppercase">
          {title}
        </h3>

        <div className="w-full">
          <span className="inline-flex rounded-lg bg-dateBg px-2 text-xs leading-snug font-semibold text-chocolate">
            {date}
          </span>

          <ButtonLink
            label={buttonDownload}
            href={linkToDownload}
            isAccentBtn
            withIcon
            styles="max-w-[270px] min-w-[220px] py-4 mt-4 mx-auto"
            linkToDownload
          />
        </div>
      </div>
    </>
  );
};
