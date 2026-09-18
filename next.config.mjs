/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cpus: 4,
  },
  async redirects() {
    return [
      {
        source: '/reseller',
        destination: '/partner-program',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
