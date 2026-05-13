/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Performance optimizations for AdSense compatibility
  compress: true,
  generateEtags: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  
  async redirects() {
    return [
      { source: '/video', destination: '/youtube', permanent: true },
      { source: '/videos', destination: '/youtube', permanent: true },
      { source: '/server', destination: '/server-status', permanent: true },
    ]
  },

  async rewrites() {
    return {
      beforeFiles: [
        // Serve ads.txt from API to bypass Cloudflare challenges
        {
          source: '/ads.txt',
          destination: '/api/ads',
        },
        // Serve app-ads.txt from API to bypass Cloudflare challenges
        {
          source: '/app-ads.txt',
          destination: '/api/app-ads',
        },
      ],
    }
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()'
          },
          // Enable HSTS for security
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          }
        ]
      },
      // Special headers for ads.txt to bypass Cloudflare challenges
      {
        source: '/ads.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate'
          },
          {
            key: 'X-Robots-Tag',
            value: 'all'
          }
        ]
      },
      // Special headers for app-ads.txt to bypass Cloudflare challenges
      {
        source: '/app-ads.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate'
          },
          {
            key: 'X-Robots-Tag',
            value: 'all'
          }
        ]
      },
      // Special headers for robots.txt
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate'
          }
        ]
      },
      // Special headers for sitemap.xml
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate'
          }
        ]
      },
      // Cache configuration for better performance
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=10, stale-while-revalidate=59'
          }
        ]
      },
      // Cache static assets
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
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
    ],
    // Optimize images for better Core Web Vitals
    minimumCacheTTL: 60 * 10, // 10 minutes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@vercel/analytics', '@vercel/speed-insights']
  }
}

module.exports = nextConfig
