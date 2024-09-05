import { CoverCard, Title } from '@/components/ui';
import data from '@/data/monographs.json';

export const ReleasedMonographs = () => {
  const { title, list, buttonDownload } = data.archivedMonographs;

  return (
    <section className="section bg-mainBg">
      <Title title={title} isWhite />

      <ul className="mb-6 grid grid-cols-1 justify-items-center gap-8 md:mb-16 md:grid-cols-2 md:gap-20 xl:grid-cols-3">
        {list.map(card => (
          <li
            key={card.id}
            className="w-[328px] rounded-lg bg-white shadow md:w-[346px] lg:w-[374px]"
          >
            <CoverCard card={card} buttonDownload={buttonDownload} />
          </li>
        ))}
      </ul>
    </section>
  );
};
