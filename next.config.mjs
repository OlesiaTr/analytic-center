const BUCKET_NAME = 'acmhs-site-bucket-2';
const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: isProd
    ? `https://storage.googleapis.com/${BUCKET_NAME}/`
    : undefined,
  output: 'export',
};

export default nextConfig;
