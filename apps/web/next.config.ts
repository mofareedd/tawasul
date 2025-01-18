import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@tawasul/ui'],
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/feed',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
