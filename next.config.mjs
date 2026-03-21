/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/index.html',
      },
      {
        source: '/mbts',
        destination: '/mbts.html',
      },
    ]
  },
};

export default nextConfig;
