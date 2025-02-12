import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@tawasul/ui'],
  images: {
    remotePatterns: [{ hostname: 'tawasul-app.s3.me-south-1.amazonaws.com' }],
  },
};

export default nextConfig;
