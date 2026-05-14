const fs = require('fs')
const base = process.env.SITE_URL || 'https://gamingop.qzz.io'

const staticPages = [
  '/',
  '/youtube',
  '/server-status',
  '/guides',
  '/guides/minecraft-server-join-troubleshooting',
  '/guides/low-lag-recording-streaming-setup',
  '/guides/gaming-community-safety-rules',
  '/guides/youtube-gaming-video-checklist',
  '/tools',
  '/tools/image-converter',
  '/tools/text-tools',
  '/about',
  '/privacy',
  '/terms',
]

const urls = staticPages.map((p) => `${base}${p}`)
const lastmod = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
  .join('\n')}\n</urlset>`

fs.writeFileSync('public/sitemap.xml', xml)
console.log('sitemap written to public/sitemap.xml')
