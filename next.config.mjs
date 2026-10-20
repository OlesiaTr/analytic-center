const nextConfig = {
  output: 'export',
  // Static export has no image optimizer; PER-9 (Vercel without export) enables it.
  images: { unoptimized: true },
  assetPrefix: undefined,
};

export default nextConfig;
