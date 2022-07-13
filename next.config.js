// /** @type {import('next').NextConfig} */
// const withTM = require('next-transpile-modules')([])
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// require('dotenv').config({
//   path: '.env',
// });

// module.exports = withBundleAnalyzer(
//   withTM({
//     env:{
//       UI_BACKEND_URI: process.env.UI_BACKEND_URI,
//     },
//     // Client-side available env variables.
//     serverRuntimeConfig: {},
//     // Any variable not listed here won't be available on the browser.
//     publicRuntimeConfig: {
//       UI_BACKEND_URI: process.env.UI_BACKEND_URI,
//     },
//     images: {
//       domains: ['s3.amazonaws.com'],
//     },
//     webpack: (config) => {
//       config.module.rules.push({
//         test: /\.(svg|eot|ttf|woff|woff2|otf)$/,
//         use: {
//           loader: 'url-loader',
//         },
//       });
//       return config;
//     },
//   }),
// );


const nextConfig = {
  eslint:{
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  compiler:{
    styledComponents: true
  },
  images: {
    loader: 'imgix',
    path: './'
  }
}

module.exports = nextConfig
