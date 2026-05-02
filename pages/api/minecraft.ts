import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const server = String(req.query.server || 'mc.gamingop.qzz.io')
  const url = `https://api.mcsrvstat.us/2/${encodeURIComponent(server)}`
  try {
    const r = await fetch(url)
    if (!r.ok) return res.status(502).json({ error: 'server api failed' })
    const data = await r.json()
    // normalize some fields for the client
    const out: any = {
      online: data.online ?? false,
      players: data.players ? { online: data.players.online ?? 0, max: data.players.max ?? 0 } : undefined,
      motd: data.motd
    }
    res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=60')
    return res.status(200).json(out)
  } catch {
    return res.status(502).json({ error: 'server api error' })
  }
}
