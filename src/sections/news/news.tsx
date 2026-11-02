import { getTranslations } from 'next-intl/server';

import { NewsItem } from '@/components/ui';
import { getNews } from '@/lib/sanity/content';

export const News = async () => {
  const t = await getTranslations('news');
  const title = t('title');
  const more = t('more');
  const list = await getNews();

  return (
    <section aria-labelledby="news-title" className="bg-surface sec">
      <div className="wrap">
        <h2 id="news-title" className="sec-title mb-8 t-h2 lg:mb-12">
          {title}
        </h2>
        <ul className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          {list.map(item => (
            <li key={item.id}>
              <NewsItem {...item} moreLabel={more} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
