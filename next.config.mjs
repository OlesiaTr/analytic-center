const nextConfig = {
  // Local images stay as-is until content images come from Sanity's CDN
  // through a custom loader (PER-9 commit 4), so Vercel never transforms them.
  images: { unoptimized: true },
};

export default nextConfig;
