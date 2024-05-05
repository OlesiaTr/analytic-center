'use client';

import React, { FC } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation, Autoplay, A11y } from 'swiper/modules';

import { SlideCoverCard } from '@/components/ui';

import data from '@/data/common.json';

import 'swiper/css';
import 'swiper/css/navigation';

export interface Props {
  slidesList: {
    id: string;
    imgSrc: string;
    imgAlt: string;
    title: string;
    date: string;
    linkToDownload: string;
  }[];

  buttonDownload: string;
}

export const SliderCoverCard: FC<Props> = ({ slidesList, buttonDownload }) => {
  const { sliderControls } = data;
  return (
    <Swiper
      navigation={true}
      modules={[Navigation, Autoplay, A11y]}
      a11y={{
        prevSlideMessage: sliderControls.prevBtnAriaLabel,
        nextSlideMessage: sliderControls.nextBtnAriaLabel,
      }}
      slidesPerView={1}
      slidesPerGroup={1}
      spaceBetween={30}
      centeredSlides={false}
      initialSlide={0}
      centeredSlidesBounds={true}
      breakpoints={{
        1024: {
          slidesPerView: 2,
          centeredSlidesBounds: false,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 50,
          centeredSlidesBounds: false,
        },
        1440: {
          slidesPerView: 3,
          spaceBetween: 80,
          centeredSlidesBounds: false,
        },
      }}
      className="mb-6 size-full max-w-[300px] sm:max-w-screen-sm md:mb-16 md:max-w-screen-md md:!px-0 lg:max-w-[900px] xl:max-w-screen-xl xl:!overflow-visible xxl:max-w-screen-xxl"
    >
      {slidesList.map(card => (
        <SwiperSlide
          tag="li"
          className="rounded-lg shadow-inner lg:shadow"
          key={card.id}
        >
          <SlideCoverCard card={card} buttonDownload={buttonDownload} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
