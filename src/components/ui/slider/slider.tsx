'use client';

import React, { FC } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation, Autoplay, A11y } from 'swiper/modules';

import { SlideComponent } from '@/components/ui';

import data from '@/data/common.json';

import 'swiper/css';
import 'swiper/css/navigation';

export interface Props {
  slidesData: {
    image: string;
    alt: string;
    linkTo: string;
  }[];
}

export const Slider: FC<Props> = ({ slidesData }) => {
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
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
      }}
      className="size-full max-w-[300px] !px-7 sm:max-w-[330px] sm:!pl-11 sm:!pr-6 md:max-w-[640px] md:!pl-7 md:!pr-11  lg:max-w-[900px] xl:max-w-[1200px]"
    >
      {slidesData.map((card, idx) => (
        <SwiperSlide
          tag="li"
          className="mb-6 flex items-center  justify-center md:px-4"
          key={idx}
        >
          <SlideComponent card={card} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
