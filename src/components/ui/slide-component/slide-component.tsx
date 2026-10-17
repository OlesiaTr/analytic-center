import Image from 'next/image';
import React, { FC } from 'react';

export interface Props {
  card: {
    image: string;
    width: number;
    height: number;
    alt: string;
    linkTo: string;
  };
}

export const SlideComponent: FC<Props> = ({ card }) => {
  return (
    <div className="flex h-70 w-60 items-center overflow-hidden rounded-xl shadow md:rounded-3xl">
      <a href={card.linkTo} target="_blank" rel="noopener noreferrer">
        <Image
          src={card.image}
          alt={card.alt}
          width={230}
          height={Math.round((230 * card.height) / card.width)}
          className="m-auto object-cover"
        />
      </a>
    </div>
  );
};
