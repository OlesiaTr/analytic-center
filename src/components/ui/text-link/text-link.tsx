import clsx from 'clsx';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

import { Icon } from '@/components/icons';
import data from '@/data/common.json';

interface Props {
  href: string;
  children: ReactNode;
  /** Opens in a new tab: external icon + hidden notice. */
  external?: boolean;
  className?: string;
  /** Id of the text this link belongs to, e.g. a news item. */
  describedBy?: string;
}

// Blue on light grounds (5.99:1), white inside .on-dark; hover thickens the underline.
const linkClassNames =
  'inline-flex items-center gap-1.5 font-semibold text-blue-600 underline decoration-1 underline-offset-3 hover:text-blue-800 hover:decoration-2 in-[.on-dark]:text-white in-[.on-dark]:hover:text-yellow-400';

export const TextLink: FC<Props> = ({
  href,
  children,
  external,
  className,
  describedBy,
}) =>
  external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-describedby={describedBy}
      className={clsx(linkClassNames, className)}
    >
      {children}
      <Icon name="external" className="size-4" />{' '}
      <span className="sr-only">{data.a11y.newTab}</span>
    </a>
  ) : (
    <Link
      href={href}
      aria-describedby={describedBy}
      className={clsx(linkClassNames, className)}
    >
      {children}
    </Link>
  );
