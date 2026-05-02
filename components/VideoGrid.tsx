import React, { useEffect, useState } from 'react'

type Video = {
  id: { videoId: string }
  snippet: any
}

export default function VideoGrid() {
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    async function fetchVideos() {
      try {
        const r = await fetch('/api/youtube')
        const data = await r.json()
        setVideos(data.items || [])
      } catch (e) {
        console.error(e)
      }
    }
    fetchVideos()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {videos.map((v) => (
        <a key={v.id.videoId} href={`https://www.youtube.com/watch?v=${v.id.videoId}`} className="block">
          <div className="rounded-md overflow-hidden glass">
            <img src={v.snippet.thumbnails.medium.url} alt={v.snippet.title} className="w-full h-40 object-cover" />
            <div className="p-3">
              <h3 className="font-semibold">{v.snippet.title}</h3>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
