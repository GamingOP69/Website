import React from 'react'

export default function PopularVideos({ videos }: { videos: any[] }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-3">Popular</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map((v) => (
          <a key={v.id.videoId} href={`https://www.youtube.com/watch?v=${v.id.videoId}`} className="block">
            <div className="rounded-md overflow-hidden glass">
              <img src={v.snippet.thumbnails.medium.url} alt={v.snippet.title} className="w-full h-40 object-cover" />
              <div className="p-3">
                <h4 className="font-semibold">{v.snippet.title}</h4>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
