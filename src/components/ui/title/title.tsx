import clsx from 'clsx';
import { FC } from 'react';

export interface Props {
  title: string;
  isWhite?: boolean;
  as?: 'h1' | 'h2';
}

export const Title: FC<Props> = ({
  title,
  isWhite = false,
  as: Tag = 'h2',
}) => {
  return (
    <Tag
      className={clsx(
        'mb-6 text-xl leading-relaxed font-bold md:mb-10 md:text-3xl md:leading-none lg:mb-16 xl:text-5xl',
        isWhite ? 'text-white' : 'text-main',
      )}
    >
      {title}
    </Tag>
  );
};
