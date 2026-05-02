import type { NextApiRequest, NextApiResponse } from 'next'

async function fetchSearch(apiKey: string, channelId: string, max = 25) {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${max}`
  const r = await fetch(url)
  if (!r.ok) throw new Error('search failed')
  return r.json()
}

async function fetchStats(apiKey: string, ids: string[]) {
  const url = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${ids.join(',')}&part=statistics,contentDetails,snippet`
  const r = await fetch(url)
  if (!r.ok) throw new Error('videos failed')
  return r.json()
}

function scoreVideo(item: any) {
  const views = Number(item.statistics?.viewCount || 0)
  const published = new Date(item.snippet.publishedAt).getTime()
  const ageDays = Math.max(1, (Date.now() - published) / (1000 * 60 * 60 * 24))
  const score = views / ageDays
  return score
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const key = process.env.YT_API_KEY
  const channel = process.env.YT_CHANNEL_ID
  if (!key || !channel) return res.status(500).json({ error: 'missing env' })

  try {
    const search = await fetchSearch(key, channel, 25)
    const ids = (search.items || [])
      .filter((i: any) => i.id?.videoId)
      .map((i: any) => i.id.videoId)
    if (ids.length === 0) return res.status(200).json({ items: [] })

    const stats = await fetchStats(key, ids)
    const items = (stats.items || []).map((it: any) => ({ ...it, _score: scoreVideo(it) }))
    items.sort((a: any, b: any) => b._score - a._score)
    res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=300')
    return res.status(200).json({ items })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'failed' })
  }
}
