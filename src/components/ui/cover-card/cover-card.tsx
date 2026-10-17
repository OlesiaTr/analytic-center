import { ButtonLink } from '@/components/ui';
import clsx from 'clsx';

export interface Props {
  card: {
    id: string;
    imgSrc: string;
    imgAlt: string;
    title: string;
    date: string;
    linkToDownload: string;
    day?: string;
    month?: string;
    description?: string;
  };
  buttonDownload: string;
}

export const CoverCard = ({ card, buttonDownload }: Props) => {
  const { imgSrc, imgAlt, title, description, date, linkToDownload } = card;

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

      <div
        className={clsx(
          'flex flex-col items-center justify-between px-4 pt-4 md:pt-6 md:pb-2',
          description ? 'h-[250px]' : 'h-[200px]',
        )}
      >
        <div>
          <h3 className="leading-tight font-bold tracking-[-0.003px] uppercase">
            {title}
          </h3>

          {description && (
            <p className="text-xs leading-snug font-medium">{description}</p>
          )}
        </div>

        <div className="w-full">
          <span className="mb-2 inline-flex rounded-lg bg-dateBg px-2 text-xs leading-snug font-semibold text-chocolate">
            {date}
          </span>

          <ButtonLink
            label={buttonDownload}
            isAccentBtn
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
