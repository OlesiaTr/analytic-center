import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { ImageResponse } from 'next/og';

import { routing } from '@/i18n/routing';
import { getHeroCovers, getHomePage } from '@/lib/sanity/content';

// Social preview in the site's own look: navy ground, the hero heading and a
// strip of real covers. An image in siteSettings → SEO overrides it.

// One image per locale, rendered at build and on revalidation, not per request.
export const generateStaticParams = () =>
  routing.locales.map(locale => ({ locale }));

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt =
  'Аналітичний центр сучасної гуманітаристики: обкладинки збірників і монографій';

/** Montserrat Bold subset to the characters we draw (Cyrillic included). */
const loadFont = async (text: string) => {
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=Montserrat:wght@700&text=${encodeURIComponent(text)}`,
    )
  ).text();
  const url = /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/.exec(
    css,
  )?.[1];
  if (!url) throw new Error('Montserrat subset not found');
  return (await fetch(url)).arrayBuffer();
};

export default async function OpengraphImage() {
  const [page, covers, logo] = await Promise.all([
    getHomePage(),
    getHeroCovers(),
    readFile(
      path.join(process.cwd(), 'public/meta/android-chrome-512x512.png'),
    ),
  ]);
  const overline = page?.hero?.overline ?? '';
  const heading = page?.hero?.heading ?? '';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        background: '#0E2B42',
        fontFamily: 'Montserrat',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -60,
          right: -90,
          display: 'flex',
          flexWrap: 'wrap',
          width: 620,
          gap: 14,
          transform: 'rotate(-8deg)',
          opacity: 0.9,
        }}
      >
        {covers.slice(0, 12).map(({ image }) => (
          <img
            key={image}
            src={`${image}?w=240&fm=jpg&q=70`}
            alt=""
            width={140}
            height={200}
            style={{ borderRadius: 8, objectFit: 'cover' }}
          />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          background:
            'linear-gradient(90deg, #0E2B42 0%, rgba(14,43,66,0.97) 48%, rgba(4,59,101,0.6) 72%, rgba(4,59,101,0.15) 100%)',
        }}
      />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 24,
          padding: '0 72px',
          width: 720,
        }}
      >
        <img
          src={`data:image/png;base64,${logo.toString('base64')}`}
          alt=""
          width={96}
          height={96}
        />
        <div
          style={{
            display: 'flex',
            color: '#FBCD21',
            fontSize: 24,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {overline}
        </div>
        <div
          style={{
            display: 'flex',
            color: '#FFFFFF',
            fontSize: 60,
            lineHeight: 1.12,
            letterSpacing: '-0.01em',
          }}
        >
          {heading}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'Montserrat',
          data: await loadFont(`${overline.toUpperCase()}${heading}`),
          weight: 700,
          style: 'normal',
        },
      ],
    },
  );
}
