const nextConfig = {
  // Content images come from Sanity's CDN, which resizes them itself, so
  // Vercel never transforms images (see src/lib/sanity/image-loader.ts).
  images: {
    loader: 'custom',
    loaderFile: './src/lib/sanity/image-loader.ts',
  },
};

export default nextConfig;
