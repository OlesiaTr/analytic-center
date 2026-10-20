import { FC, ReactNode } from 'react';

interface Props {
  title: string;
  id?: string;
  /** Short line under the title, e.g. a count. */
  sub?: string;
  /** The section's single CTA, shown on the right; wraps under on narrow screens. */
  action?: ReactNode;
}

/** Section heading row: h2 with the yellow bar, optional count and CTA. */
export const SectionHead: FC<Props> = ({ title, id, sub, action }) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 lg:mb-12">
    <div className="min-w-0 flex-[1_1_320px]">
      <h2 id={id} className="sec-title t-h2">
        {title}
      </h2>
      {sub && (
        <p className="mt-2 t-sm text-muted in-[.on-dark]:text-on-dark-muted">
          {sub}
        </p>
      )}
    </div>
    {action}
  </div>
);
