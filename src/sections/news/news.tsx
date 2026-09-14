import { Title } from '@/components/ui';
import data from '@/data/common.json';

export const News = () => {
  const { title, list } = data.news;

  return (
    <section className="section">
      <Title title={title} />

      <ul className="grid grid-cols-1 justify-items-center gap-x-6 gap-y-11 lg:grid-cols-2">
        {list.map(({ imgSrc, imgAlt, text, date, linkTo }, id) => (
          <li
            key={id}
            className="flex max-w-[628px] gap-3 p-[10px] shadow md:gap-8 md:px-5 md:py-6"
          >
            <div className=" m-auto min-w-20 rounded-lg md:min-w-40">
              <img
                src={imgSrc}
                alt={imgAlt}
                loading="lazy"
                decoding="async"
                width={160}
                height={160}
                className="m-auto inline-block"
              />
            </div>
            <div className="flex flex-col justify-between">
              <p className=" mb-[10px] text-[10px] leading-snug md:mb-5 md:text-base lg:text-sm xl:text-base ">
                {text}
              </p>

              {linkTo !== '#' ? (
                <a
                  href={linkTo}
                  aria-label="Посилання, щоб дізнатись про новину детальніше"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  <span className="inline-flex rounded-lg bg-dateBg px-2 text-xs font-semibold leading-snug text-chocolate hover:text-mainBg">
                    {date}
                  </span>
                </a>
              ) : (
                <span className="inline-flex rounded-lg bg-dateBg px-2 text-xs font-semibold leading-snug text-chocolate">
                  {date}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
