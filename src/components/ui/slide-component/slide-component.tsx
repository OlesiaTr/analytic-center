import React, { FC } from 'react';

export interface Props {
  card: {
    image: string;
    alt: string;
    linkTo: string;
  };
}

export const SlideComponent: FC<Props> = ({ card }) => {
  return (
    <div className="flex h-[280px] w-[240px] items-center overflow-hidden rounded-xl shadow md:rounded-3xl">
      <a href={card.linkTo} target="_blank" rel="noopener noreferrer">
        <img
          src={card.image}
          alt={card.alt}
          loading="lazy"
          decoding="async"
          className="m-auto object-cover"
          width={230}
        />
      </a>
    </div>
  );
};
