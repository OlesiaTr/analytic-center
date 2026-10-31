import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  // Content images come from Sanity's CDN, which resizes them itself, so
  // Vercel never transforms images (see src/lib/sanity/image-loader.ts).
  images: {
    loader: 'custom',
    loaderFile: './src/lib/sanity/image-loader.ts',
  },
  // A root layout under [locale] plus the Studio's: unmatched URLs need this.
  experimental: { globalNotFound: true },
};

export default withNextIntl(nextConfig);
