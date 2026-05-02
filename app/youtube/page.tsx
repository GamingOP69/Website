import React, { useState } from 'react'
import SEO from '../../components/SEO'
import Filters from '../../components/Filters'
import PopularVideos from '../../components/PopularVideos'

async function fetchVideos() {
  try {
    const key = process.env.YT_API_KEY || ''
    const channel = process.env.YT_CHANNEL_ID || ''
    const res = await fetch(`http://localhost/api/youtube?mode=latest&max=50`)
    const data = await res.json()
    return data.items || []
  } catch (e) {
    console.error(e)
    return []
  }
}

export default async function YoutubeIndex() {
  const videos = await fetchVideos()
  return (
    <main className="py-8">
      <SEO title="Videos" description="All GamingOP videos" />
      <h1 className="text-3xl font-bold mb-4">Videos</h1>
      <VideoLister initial={videos} />
    </main>
  )
}

function VideoLister({ initial }: { initial: any[] }) {
  const [items, setItems] = useState(initial)

  function handleFilter(q: string) {
    if (!q) return setItems(initial)
    const filtered = initial.filter((v) => {
      const title = (v.snippet.title || '').toLowerCase()
      const tags = (v.snippet.tags || []).map((t: string) => t.toLowerCase())
      return title.includes(q.toLowerCase()) || tags.some((t: string) => t.includes(q.toLowerCase()))
    })
    setItems(filtered)
  }

  return (
    <div>
      <Filters onChange={handleFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((v) => (
          <a key={v.id.videoId} href={`/youtube/${v.id.videoId}`} className="block">
            <div className="rounded-md overflow-hidden glass">
              <img src={v.snippet.thumbnails.medium.url} alt={v.snippet.title} className="w-full h-40 object-cover" />
              <div className="p-3">
                <h3 className="font-semibold">{v.snippet.title}</h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
