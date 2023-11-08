/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
  images: {
    domains: ['news.wrteam.me']
  },
  trailingSlash: false,
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/sitemap-generator');
    }
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    };
    return config;
  },
};

module.exports = nextConfig;
