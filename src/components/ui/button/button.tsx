import clsx from 'clsx';
import Link from 'next/link';
import { ComponentProps, FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { Icon, type IconName } from '@/components/icons';

export type ButtonVariant = 'blue' | 'yellow' | 'outline' | 'outline-light';

interface BaseProps {
  children: ReactNode;
  /** blue on white/surface/yellow, yellow on blue or photo and for every download */
  variant?: ButtonVariant;
  size?: 'md' | 'sm';
  block?: boolean;
  icon?: IconName;
  /** Hidden text that finishes the label for screen readers. */
  srText?: string;
  className?: string;
}

type LinkProps = BaseProps & { href: string; download?: boolean };
type ActionProps = BaseProps &
  Omit<ComponentProps<'button'>, 'children' | 'className'> & { href?: never };

export type Props = LinkProps | ActionProps;

const VARIANTS: Record<ButtonVariant, string> = {
  blue: 'bg-blue-600 text-white hover:bg-blue-800 active:bg-navy-900',
  yellow:
    'bg-yellow-400 text-brown-900 hover:bg-yellow-300 active:bg-yellow-600',
  outline:
    'border-blue-600 text-blue-600 hover:border-blue-800 hover:bg-blue-50 hover:text-blue-800',
  'outline-light': 'border-white text-white hover:bg-white hover:text-blue-800',
};

export const buttonClassName = ({
  variant = 'blue',
  size = 'md',
  block = false,
  className,
}: Pick<BaseProps, 'variant' | 'size' | 'block' | 'className'>) =>
  twMerge(
    clsx(
      'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-transparent text-center font-semibold no-underline transition-[color,background-color,border-color] duration-200',
      'disabled:cursor-not-allowed disabled:border-transparent disabled:bg-blue-50 disabled:text-muted aria-disabled:cursor-not-allowed aria-disabled:border-transparent aria-disabled:bg-blue-50 aria-disabled:text-muted',
      size === 'sm'
        ? 'min-h-10 px-4 text-sm leading-5'
        : 'min-h-12 px-6 text-[15px] leading-5',
      block && 'w-full',
      VARIANTS[variant],
    ),
    className,
  );

type Rest =
  Omit<LinkProps, keyof BaseProps> | Omit<ActionProps, keyof BaseProps>;

const isLink = (rest: Rest): rest is Omit<LinkProps, keyof BaseProps> =>
  typeof rest.href === 'string';

export const Button: FC<Props> = ({
  children,
  variant,
  size,
  block,
  icon,
  srText,
  className,
  ...rest
}) => {
  const classes = buttonClassName({ variant, size, block, className });
  const content = (
    <>
      {icon && <Icon name={icon} />}
      {children}
      {srText && (
        // The space lives outside the hidden span so the computed name keeps it.
        <>
          {' '}
          <span className="sr-only">{srText}</span>
        </>
      )}
    </>
  );

  if (isLink(rest)) {
    const { href, download = false } = rest;
    // Internal routes navigate client-side; files and other sites stay <a>.
    if (href.startsWith('/') && !download) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} download={download || undefined} className={classes}>
        {content}
      </a>
    );
  }

  const { type = 'button', ...buttonProps } = rest;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
};
