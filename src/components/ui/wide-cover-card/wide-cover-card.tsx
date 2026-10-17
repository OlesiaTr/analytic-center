import Image from 'next/image';
import React, { FC } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/16/solid';

export interface Props {
  card: {
    id: string;
    imgSrc: string;
    width: number;
    height: number;
    imgAlt: string;
    title: string;
    description?: string;
    date: string;
    day: string;
    month: string;
    linkToDownload: string;
  };
  linkDownload: string;
}

export const WideCoverCard: FC<Props> = ({ card, linkDownload }) => {
  const {
    imgSrc,
    width,
    height,
    imgAlt,
    title,
    description,
    date,
    day,
    month,
    linkToDownload,
  } = card;
  return (
    <>
      <div className="hidden sm:block">
        <div className="text-[50px] font-bold text-main">{day}</div>
        <div className="my-1 h-px w-[50px] bg-gray-400"></div>{' '}
        <div className="text-[50px] font-bold text-main">{month}</div>
      </div>

      <div className="m-auto hidden w-full max-w-[300px] rounded-lg py-4 shadow lg:block">
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={width}
          height={height}
          className="m-auto h-[330px] w-auto"
        />
      </div>

      <div className="w-full pb-9">
        <div>
          <h3 className="mb-8 font-bold text-chocolate uppercase md:text-base lg:text-xl xl:text-[28px]">
            {title}
          </h3>

          {description && (
            <p className="mb-7 text-xl leading-snug text-chocolate xl:text-2xl">
              {description}
            </p>
          )}
        </div>

        <span className="mb-6 inline-flex rounded-lg bg-dateBg px-2 text-xs leading-snug font-semibold text-chocolate sm:hidden">
          {date}
        </span>

        <a
          href={linkToDownload}
          aria-label={imgAlt}
          className="flex leading-normal font-semibold tracking-[0.5px] text-chocolate transition hover:text-accent"
        >
          <ArrowDownTrayIcon className="mr-[10px] size-6" /> {linkDownload}
        </a>
      </div>
    </>
  );
};
