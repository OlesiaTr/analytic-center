import { Header } from '@/layouts';
import {
  CenterShortVersion,
  GrantsShortVersion,
  Hero,
  News,
  Partners,
  UpcomingConferences,
  UpcomingMonographs,
} from '@/sections';

export default function Home() {
  return (
    <>
      <Header isHomePage />

      <main id="main" tabIndex={-1}>
        <Hero />

        <CenterShortVersion />

        <UpcomingConferences />

        <Partners />

        <UpcomingMonographs />

        <GrantsShortVersion />

        <News />
      </main>
    </>
  );
}
