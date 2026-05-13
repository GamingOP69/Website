import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set proper Content-Type for app-ads.txt
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  
  // Allow all bots and crawlers to access app-ads.txt
  res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate')
  
  // Disable any JavaScript challenges for this endpoint
  res.setHeader('X-Robots-Tag', 'all')
  
  const appAdsTxt = `# App-ads.txt file for GamingOP (gamingop.qzz.io)
# For mobile apps advertising compliance
# Updated: 2026

# Google AdSense - Mobile Apps
google.com, pub-2778216399702742, DIRECT, f08c47fec0942fa0
`

  res.status(200).send(appAdsTxt.trim())
}
