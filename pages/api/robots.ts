import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const robotsTxt = `# Robots.txt for GamingOP Gaming Website
# Domain: gamingop.qzz.io
# Hosted behind Cloudflare CDN
# Generated: ${new Date().toISOString()}

# Allow all crawlers to index the website
User-agent: *
Allow: /
Disallow: /.next/
Disallow: /node_modules/
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /*?*sort=
Disallow: /*?*filter=

# Specific rules for Googlebot
User-agent: Googlebot
Allow: /
Disallow: /.next/
Disallow: /node_modules/

# Specific rules for Bingbot
User-agent: Bingbot
Allow: /
Disallow: /.next/
Disallow: /node_modules/

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

# Crawl delay (in seconds)
Crawl-delay: 1

# Sitemap locations
Sitemap: https://gamingop.qzz.io/sitemap.xml
Sitemap: https://gamingop.qzz.io/sitemap-videos.xml`

  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800')
  res.status(200).send(robotsTxt)
}
