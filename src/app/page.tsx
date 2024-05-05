import { Header } from '@/layouts';
import {
  CenterShortVersion,
  GrantsShortVersion,
  Hero,
  Partners,
  UpcomingConferences,
  UpcomingMonographs,
} from '@/sections';

export default function Home() {
  return (
    <>
      <Header isHomePage />

      <main>
        <Hero />

        <CenterShortVersion />

        <UpcomingConferences />

        <Partners />

        <UpcomingMonographs />

        <GrantsShortVersion />
      </main>
    </>
  );
}
