import React from 'react'

// Minimal shape that covers both the Search API (id.videoId) and Video API (id string) responses
type YtVideoItem = {
  id: string | { videoId?: string }
  snippet?: {
    title?: string
    publishedAt?: string
    thumbnails?: {
      medium?: { url?: string }
      default?: { url?: string }
    }
    tags?: string[]
  }
  statistics?: {
    viewCount?: string | number
  }
}

function getVideoId(v: YtVideoItem): string {
  if (typeof v.id === 'string') return v.id
  return v.id?.videoId ?? ''
}

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = Date.now()
  const diffMs = now - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays < 1) return 'Today'
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`
  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`
}

function formatViews(n: string | number | undefined): string {
  if (!n) return ''
  const num = Number(n)
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M views'
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K views'
  return `${num} views`
}

export default function PopularVideos({ videos }: { videos: YtVideoItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {videos.map((v, i) => {
        const videoId = getVideoId(v)
        const thumbnail =
          v.snippet?.thumbnails?.medium?.url ||
          v.snippet?.thumbnails?.default?.url ||
          `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
        const title = v.snippet?.title ?? 'Untitled'
        const publishedAt = v.snippet?.publishedAt
        const viewCount = v.statistics?.viewCount

        return (
          <a
            key={videoId || i}
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
              {viewCount && (
                <div className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-1.5 py-0.5 rounded">
                  {formatViews(viewCount)}
                </div>
              )}
            </div>
            <div className="p-3 sm:p-4">
              <h4 className="font-semibold text-sm sm:text-base text-white line-clamp-2 leading-snug">{title}</h4>
              {publishedAt && (
                <p className="text-xs text-gray-400 mt-1.5">{formatTimeAgo(publishedAt)}</p>
              )}
            </div>
          </a>
        )
      })}
    </div>
  )
}
