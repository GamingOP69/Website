import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const key = process.env.YT_API_KEY
  const channel = process.env.YT_CHANNEL_ID
  if (!key || !channel) return res.status(500).json({ error: 'missing env' })

  const max = Number(req.query.max || 8)
  const mode = String(req.query.mode || 'latest')

  let url = ''
  if (mode === 'latest') {
    url = `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channel}&part=snippet,id&order=date&maxResults=${max}`
  } else if (mode === 'popular') {
    url = `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channel}&part=snippet,id&order=viewCount&maxResults=${max}`
  } else if (mode === 'live') {
    url = `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channel}&part=snippet,id&eventType=live&type=video&maxResults=${max}`
  } else {
    return res.status(400).json({ error: 'invalid mode' })
  }

  try {
    const r = await fetch(url)
    if (!r.ok) return res.status(502).json({ error: 'yt fetch failed' })
    const data = await r.json()
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    return res.status(200).json(data)
  } catch {
    return res.status(502).json({ error: 'yt fetch error' })
  }
}
