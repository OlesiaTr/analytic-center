import { notFound } from 'next/navigation';

// Unknown paths inside a locale render [locale]/not-found.tsx with the site shell.
export default function CatchAll() {
  notFound();
}
