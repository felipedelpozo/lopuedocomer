/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './src/i18n/index.ts'
);
const { withContentlayer } = require('next-contentlayer');

const nextConfig = withNextIntl(
  withContentlayer({
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      serverActions: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'maps.googleapis.com',
        },
        {
          protocol: 'https',
          hostname: 'images.pexels.com',
        },
      ],
    },
  })
);

module.exports = nextConfig;
