const fs = require('fs')
const base = process.env.SITE_URL || 'https://gamingop.example.com'

const staticPages = ['/', '/about', '/youtube']

const urls = staticPages.map((p) => `${base}${p}`)

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map((u) => `  <url>\n    <loc>${u}</loc>\n  </url>`)
  .join('\n')}\n</urlset>`

fs.writeFileSync('public/sitemap.xml', xml)
console.log('sitemap written to public/sitemap.xml')
