/** @type {import('next').NextConfig} */
// next.config.js
// const withVideos = require('next-videos')

// module.exports = withVideos(
//   {
//     webpack(config, options) {
//       return config
//     }
//   }
  
// )

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['buylink.pockethost.io'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'buylink.pockethost.io',
    //     port: '',
    //     pathname: '/api/files/**',
    //   },
    // ],
  },
}
