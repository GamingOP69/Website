/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/video', destination: '/youtube', permanent: true },
      { source: '/videos', destination: '/youtube', permanent: true },
      { source: '/server', destination: '/server-status', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      }
    ]
  }
}

module.exports = nextConfig
