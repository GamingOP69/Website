import React from 'react'

export default function PopularVideos({ videos }: { videos: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {videos.map((v) => (
        <a
          key={v.id.videoId}
          href={`https://www.youtube.com/watch?v=${v.id.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-xl overflow-hidden glass hover:shadow-glow transition-all duration-300 no-underline"
        >
          <div className="relative overflow-hidden">
            <img
              src={v.snippet.thumbnails.medium.url}
              alt={v.snippet.title}
              className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-4xl">▶</span>
            </div>
          </div>
          <div className="p-3 sm:p-4">
            <h4 className="font-semibold text-sm sm:text-base text-white line-clamp-2 leading-snug">{v.snippet.title}</h4>
          </div>
        </a>
      ))}
    </div>
  )
}
