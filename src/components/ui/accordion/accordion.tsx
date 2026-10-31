import { FC, ReactNode } from 'react';

import { Icon } from '@/components/icons';

export interface Props {
  title: string;
  /** Muted line under the title, e.g. «2 програми». */
  sub?: string;
  /** "uk" where the group has no English yet */
  lang?: 'uk' | 'en';
  defaultOpen?: boolean;
  children: ReactNode;
}

/** Native <details>: keyboard, find-in-page and no JS; several may be open. */
export const Accordion: FC<Props> = ({
  title,
  lang,
  sub,
  defaultOpen = false,
  children,
}) => (
  <details
    lang={lang}
    open={defaultOpen}
    className="group border-t border-line last:border-b"
  >
    <summary className="flex min-h-18 cursor-pointer list-none items-center justify-between gap-4 py-4 text-ink lg:min-h-22 [&::-webkit-details-marker]:hidden">
      <span>
        <span className="block text-[17px] leading-6 font-bold group-hover:text-blue-600 lg:text-xl lg:leading-7">
          {title}
        </span>
        {sub && (
          <span className="mt-0.5 block t-xs font-semibold text-muted">
            {sub}
          </span>
        )}
      </span>
      <span className="inline-flex size-10 flex-none items-center justify-center rounded-full border-2 border-blue-600 text-blue-600 transition-[transform,background-color] duration-200 group-open:rotate-180 group-open:bg-blue-600 group-open:text-white">
        <Icon name="chevronDown" />
      </span>
    </summary>
    <div className="grid gap-4 pb-8">{children}</div>
  </details>
);
