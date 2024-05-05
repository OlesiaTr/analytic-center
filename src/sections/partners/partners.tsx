import { Slider, Title } from '@/components/ui';

import data from '@/data/common.json';
import { PARTNERS_IMAGES } from '@/data/images';

export const Partners = () => {
  const { title } = data.partners;

  return (
    <section className="mx-auto flex max-w-screen-xxl flex-col px-4 pb-0 pt-9 md:px-14  md:pb-5 xl:py-[76px] xxl:px-20">
      <Title title={title} />

      <Slider slidesData={PARTNERS_IMAGES} />
    </section>
  );
};
