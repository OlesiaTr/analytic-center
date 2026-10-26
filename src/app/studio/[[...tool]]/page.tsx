import { Studio } from './studio';

// The Studio is a client-side app; serve the shell statically.
export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <Studio />;
}
