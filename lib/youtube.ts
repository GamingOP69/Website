type YtResponse = any

export async function fetchLatestVideos(apiKey: string, channelId: string, maxResults = 8): Promise<YtResponse> {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`
  const r = await fetch(url)
  if (!r.ok) throw new Error('YouTube fetch failed')
  return r.json()
}

export async function fetchPopularVideos(apiKey: string, channelId: string, maxResults = 8): Promise<YtResponse> {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=viewCount&maxResults=${maxResults}`
  const r = await fetch(url)
  if (!r.ok) throw new Error('YouTube fetch failed')
  return r.json()
}

export async function fetchLiveVideos(apiKey: string, channelId: string, maxResults = 4): Promise<YtResponse> {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&eventType=live&type=video&maxResults=${maxResults}`
  const r = await fetch(url)
  if (!r.ok) throw new Error('YouTube fetch failed')
  return r.json()
}
