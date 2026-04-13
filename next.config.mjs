import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.s3.eu-central-1.amazonaws.com',
        pathname: '/**',
      },
    ],
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      // 301 redirect: performance-marketing → digital-marketing (bs locale, no prefix)
      {
        source: '/services/performance-marketing',
        destination: '/services/digital-marketing',
        permanent: true,
      },
      // 301 redirect: performance-marketing → digital-marketing (en locale)
      {
        source: '/en/services/performance-marketing',
        destination: '/en/services/digital-marketing',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
