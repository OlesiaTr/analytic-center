import { CoverCard, Title } from '@/components/ui';
import data from '@/data/conferences.json';

export const ReleasedConferences = () => {
  const { title, list, buttonDownload } = data.upcomingConferences;

  return (
    <section className="section">
      <Title title={title} />

      <ul className="mb-6 grid grid-cols-1 justify-items-center gap-8 md:mb-16 md:grid-cols-2 md:gap-20 xl:grid-cols-3">
        {list.map(card => (
          <li
            key={card.id}
            className="flex w-[328px] flex-col justify-between rounded-lg bg-white shadow md:w-[346px] lg:w-[374px]"
          >
            <CoverCard card={card} buttonDownload={buttonDownload} />
          </li>
        ))}
      </ul>
    </section>
  );
};
