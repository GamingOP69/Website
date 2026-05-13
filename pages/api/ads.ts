import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set proper Content-Type for ads.txt
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  
  // Allow all bots and crawlers to access ads.txt
  res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate')
  
  // Disable any JavaScript challenges for this endpoint
  res.setHeader('X-Robots-Tag', 'all')
  
  const adsTxt = `# Ads.txt file for GamingOP (gamingop.qzz.io)
# Updated: 2026
# More information about ads.txt: https://iabtechlab.com/ads-txt/

# Google AdSense - Primary Publisher
google.com, pub-2778216399702742, DIRECT, f08c47fec0942fa0

# Direct deals can be added below
# Company Domain, Publisher ID, Relationship Type, Certification ID
`

  res.status(200).send(adsTxt.trim())
}
