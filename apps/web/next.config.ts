import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@tawasul/ui'],
  images: {
    remotePatterns: [{ hostname: 'd1vf09jtlupw1a.cloudfront.net' }],
  },
};

export default nextConfig;
