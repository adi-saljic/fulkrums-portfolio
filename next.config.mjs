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
  // Security headers (SEO audit 5.6). Intentionally no strict CSP — the site uses
  // GSAP, inline JSON-LD and third-party embeds (YouTube), so a tight CSP would
  // need its own dedicated pass.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
