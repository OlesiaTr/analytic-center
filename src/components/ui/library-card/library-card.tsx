import Image from 'next/image';
import { ButtonLink } from '@/components/ui';

export interface Props {
  card: {
    id: string;
    imgSrc: string;
    width: number;
    height: number;
    imgAlt: string;
    title: string;
    date: string;
    linkToDownload: string;
  };
  buttonDownload: string;
}

export const LibraryCard = ({ card, buttonDownload }: Props) => {
  const { imgSrc, width, height, imgAlt, title, date, linkToDownload } = card;

  return (
    <>
      <div className="m-auto max-w-[250px] pt-2">
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={width}
          height={height}
          className="m-auto max-h-[200px] w-auto"
        />
      </div>

      <div className="flex h-[210px] flex-col items-center justify-between p-4 md:py-6">
        <h3 className="leading-tight font-bold tracking-[-0.003px] uppercase">
          {title}
        </h3>

        <div className="w-full">
          <span className="mb-4 inline-flex rounded-lg bg-dateBg px-2 text-xs leading-snug font-semibold text-chocolate">
            {date}
          </span>

          <ButtonLink
            label={buttonDownload}
            withIcon
            styles="max-w-[270px] min-w-[220px] py-4 m-auto"
            href={linkToDownload}
            linkToDownload
          />
        </div>
      </div>
    </>
  );
};
