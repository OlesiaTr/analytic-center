import { FC } from 'react';

/** schema.org data for crawlers; `<` is escaped so content can't close the tag. */
export const JsonLd: FC<{ data: object }> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, '\\u003c'),
    }}
  />
);
