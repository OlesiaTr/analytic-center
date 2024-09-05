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
        <img src={imgSrc} alt={imgAlt} height={378} />
      </div>

      <div
        className={clsx(
          'flex flex-col items-center justify-between p-4 md:py-6',
          description ? 'h-[250px]' : 'h-[200px]',
        )}
      >
        <div>
          <h3 className="mb-6 font-bold uppercase leading-tight tracking-[-0.003px]">
            {title}
          </h3>

          {description && (
            <p className="text-xs font-medium leading-snug">{description}</p>
          )}
        </div>

        <div className="w-full">
          <span className="mb-6 inline-flex rounded-lg bg-dateBg px-2 text-xs font-semibold leading-snug text-chocolate">
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
