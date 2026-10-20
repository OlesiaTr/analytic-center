import clsx from 'clsx';
import { FC } from 'react';

/** Loading placeholder; give it a size via className. */
export const Skeleton: FC<{ className?: string }> = ({ className }) => (
  <span
    aria-hidden
    className={clsx(
      'block animate-skel rounded-md bg-[linear-gradient(90deg,var(--color-blue-50)_0%,var(--color-surface)_50%,var(--color-blue-50)_100%)] bg-size-[200%_100%] motion-reduce:animate-none',
      className,
    )}
  />
);
