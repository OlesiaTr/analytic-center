import { Header } from '@/layouts';
import { CenterShortVersion, Hero, UpcomingConferences } from '@/sections';

export default function Home() {
  return (
    <>
      <Header isHomePage />

      <main>
        <Hero />

        <CenterShortVersion />

        <UpcomingConferences />
      </main>
    </>
  );
}
