// Full-page screenshots of every route at three widths, for visual-check.
//
// Usage: node scripts/screenshots.mts [--base http://localhost:3000] [--out screenshots/current]

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { chromium } from '@playwright/test';

import { ROUTES, WIDTHS } from './routes.mts';

const { values } = parseArgs({
  options: {
    base: { type: 'string', default: 'http://localhost:3000' },
    out: { type: 'string', default: 'screenshots/current' },
  },
});

const base = values.base ?? 'http://localhost:3000';
const out = values.out ?? 'screenshots/current';

const routeName = (route: string) =>
  route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');

const main = async () => {
  const browser = await chromium.launch();
  await mkdir(out, { recursive: true });

  for (const width of WIDTHS) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce',
    });

    for (const route of ROUTES) {
      await page.goto(new URL(route, base).href, {
        waitUntil: 'networkidle',
      });
      // Stop autoplaying sliders so both runs capture the same slide.
      await page.evaluate(() => {
        document
          .querySelectorAll<
            HTMLElement & {
              swiper?: {
                autoplay?: { stop(): void };
                slideToLoop(index: number, speed: number): void;
              };
            }
          >('.swiper')
          .forEach(el => {
            el.swiper?.autoplay?.stop();
            el.swiper?.slideToLoop(0, 0);
          });
      });
      // Scroll through the page so lazy images load, then wait for all of them.
      await page.evaluate(async () => {
        // The site uses scroll-smooth; instant scrolling keeps the sticky header in place.
        document.documentElement.style.scrollBehavior = 'auto';
        for (let y = 0; y < document.body.scrollHeight; y += 500) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 50));
        }
        window.scrollTo(0, 0);
        // Images hidden at this breakpoint never load, so skip them and cap the wait.
        const visible = [...document.images].filter(
          img => !img.complete && img.offsetParent !== null,
        );
        await Promise.race([
          Promise.all(
            visible.map(
              img =>
                new Promise(r => {
                  img.onload = img.onerror = r;
                }),
            ),
          ),
          new Promise(r => setTimeout(r, 5000)),
        ]);
      });
      await page.waitForLoadState('networkidle');
      const file = path.join(out, `${routeName(route)}-${width}.png`);
      await page.screenshot({
        path: file,
        fullPage: true,
        animations: 'disabled',
      });
      console.log(file);
    }

    await page.close();
  }

  await browser.close();
};

void main();
