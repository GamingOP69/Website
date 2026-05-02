"use client"

import React, { useState } from 'react'
import Filters from './Filters'

function getVideoId(v: any): string {
  if (typeof v.id === 'string') return v.id
  return v.id?.videoId ?? ''
}

export default function VideoLister({ initial }: { initial: any[] }) {
  const [items, setItems] = useState(initial)

  function handleFilter(q: string) {
    if (!q) return setItems(initial)
    const filtered = initial.filter((v) => {
      const title = (v.snippet?.title || '').toLowerCase()
      const tags = (v.snippet?.tags || []).map((t: string) => t.toLowerCase())
      return title.includes(q.toLowerCase()) || tags.some((t: string) => t.includes(q.toLowerCase()))
    })
    setItems(filtered)
  }

  if (initial.length === 0) {
    return (
      <div className="glass p-10 rounded-xl text-center">
        <p className="text-gray-400 text-lg mb-2">No videos available right now.</p>
        <p className="text-gray-500 text-sm">Videos will appear here once the YouTube API is configured.</p>
        <a
          href="https://youtube.com/@gamingop-1m?si=qZfx45xAKVPyR4gy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 btn btn-primary"
        >
          ▶ Watch on YouTube
        </a>
      </div>
    )
  }

  return (
    <div>
      <Filters onChange={handleFilter} />
      {items.length === 0 ? (
        <div className="glass p-8 rounded-xl text-center text-gray-400">
          No videos match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {items.map((v) => {
            const videoId = getVideoId(v)
            const thumbnail =
              v.snippet?.thumbnails?.medium?.url ||
              `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
            const title = v.snippet?.title ?? 'Untitled'

            return (
              <a
                key={videoId || title}
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl overflow-hidden glass hover:shadow-glow transition-all duration-300 no-underline"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 bg-primary/90 rounded-full flex items-center justify-center text-white text-xl pl-1">▶</span>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-sm sm:text-base text-white line-clamp-2 leading-snug">{title}</h3>
                </div>
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
