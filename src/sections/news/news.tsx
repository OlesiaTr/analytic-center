import { NewsItem } from '@/components/ui';
import data from '@/data/common.json';

export const News = () => {
  const { title, list, more } = data.news;

  return (
    <section aria-labelledby="news-title" className="bg-surface sec">
      <div className="wrap">
        <h2 id="news-title" className="sec-title mb-8 t-h2 lg:mb-12">
          {title}
        </h2>
        <ul className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          {list.map(item => (
            <li key={item.text}>
              <NewsItem {...item} moreLabel={more} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
