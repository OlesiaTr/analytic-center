import { Button, ButtonLink, Title } from '@/components/ui';
import { isProduction } from '@/configs';
import data from '@/data/common.json';

export const UpcomingConferences = () => {
  const { title, list, button, buttonDownload, redirectionTo } =
    data.upcomingConferences;

  return (
    <section className="section bg-mainBg">
      <Title title={title} isWhite />

      <ul className="mb-6 grid grid-cols-1 justify-items-center gap-8 md:mb-16 md:grid-cols-2 md:gap-20 xl:grid-cols-3">
        {list.map(
          ({
            id,
            imgSrc,
            imgAlt,
            title,
            description,
            date,
            // linkToDownload,
          }) => (
            <li
              key={id}
              className="w-[328px] rounded-lg bg-white shadow md:w-[346px] lg:w-[374px]"
            >
              <div className="m-auto max-w-[250px] pt-2">
                <img src={imgSrc} alt={imgAlt} className="h-full" />
              </div>

              <div className="flex h-[270px] flex-col items-center justify-between p-4 md:py-6">
                <div>
                  <h3 className="mb-8 font-bold uppercase leading-tight tracking-[-0.003px]">
                    {title}
                  </h3>

                  <p className="mb-4 text-xs font-medium leading-snug">
                    {description}
                  </p>

                  <span className="inline-flex rounded-lg bg-dateBg px-2 text-xs font-semibold leading-snug text-chocolate">
                    {date}
                  </span>
                </div>

                <Button
                  label={buttonDownload}
                  isAccentBtn
                  withIcon
                  styles="max-w-[270px] min-w-[220px] py-4"
                />
              </div>
            </li>
          ),
        )}
      </ul>

      <ButtonLink
        label={button}
        styles="min-w-[302px] m-auto"
        isAccentBtn
        href={isProduction() ? `${redirectionTo}.html` : redirectionTo}
      />
    </section>
  );
};
