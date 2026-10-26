'use client';

import { NextStudio } from 'next-sanity/studio/client-component';

import config from '../../../../sanity.config';

// `sanity` runs in the browser only, so the config loads in a client component.
export const Studio = () => <NextStudio config={config} />;
