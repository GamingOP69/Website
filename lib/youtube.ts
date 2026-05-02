type YtResponse = { items?: any[] }

async function fetchYoutube(url: string): Promise<YtResponse> {
  const r = await fetch(url, {
    next: { revalidate: 60 },
  })
  if (!r.ok) {
    return { items: [] }
  }
  return r.json()
}

export async function fetchLatestVideos(apiKey: string, channelId: string, maxResults = 8): Promise<YtResponse> {
  if (!apiKey || !channelId) return { items: [] }
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`
  return fetchYoutube(url)
}

export async function fetchPopularVideos(apiKey: string, channelId: string, maxResults = 8): Promise<YtResponse> {
  if (!apiKey || !channelId) return { items: [] }
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=viewCount&maxResults=${maxResults}`
  return fetchYoutube(url)
}

export async function fetchLiveVideos(apiKey: string, channelId: string, maxResults = 4): Promise<YtResponse> {
  if (!apiKey || !channelId) return { items: [] }
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&eventType=live&type=video&maxResults=${maxResults}`
  return fetchYoutube(url)
}
