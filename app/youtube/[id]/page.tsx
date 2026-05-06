import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type VideoPageParams = { id: string }

async function fetchVideo(id: string) {
  const key = process.env.YT_API_KEY || ''
  if (!key) return null
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${key}&part=snippet,statistics,contentDetails`
  try {
    const r = await fetch(url, { next: { revalidate: 300 } })
    if (!r.ok) return null
    const d = await r.json()
    return d.items?.[0] ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<VideoPageParams> }): Promise<Metadata> {
  const { id } = await params
  const vid = await fetchVideo(id)
  if (!vid) return { title: 'Video Not Found – GamingOP' }
  return {
    title: `${vid.snippet.title} – GamingOP`,
    description: vid.snippet.description?.slice(0, 155) || 'Watch on GamingOP',
    openGraph: {
      title: vid.snippet.title,
      description: vid.snippet.description?.slice(0, 155) || '',
      images: [{ url: vid.snippet.thumbnails?.maxres?.url || vid.snippet.thumbnails?.high?.url || '' }],
    },
  }
}

function formatNumber(n: string | undefined): string {
  if (!n) return '—'
  const num = Number(n)
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  return num.toLocaleString()
}

function formatDuration(iso: string | undefined): string {
  if (!iso) return ''
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return ''
  const h = Number(match[1] || 0)
  const m = Number(match[2] || 0)
  const s = Number(match[3] || 0)
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

export default async function VideoPage({ params }: { params: Promise<VideoPageParams> }) {
  const { id } = await params
  const vid = await fetchVideo(id)
  if (!vid) notFound()

  const stats = vid.statistics
  const snippet = vid.snippet
  const publishedDate = new Date(snippet.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
  const duration = formatDuration(vid.contentDetails?.duration)

  return (
    <main className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-primary transition no-underline">Home</Link>
          <span>/</span>
          <Link href="/youtube" className="hover:text-primary transition no-underline">Videos</Link>
          <span>/</span>
          <span className="text-gray-500 truncate max-w-xs">{snippet.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-5">

            {/* Video embed */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="relative w-full aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
                  title={snippet.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>

            {/* Title & meta */}
            <div className="space-y-3">
              <h1 className="text-xl sm:text-2xl font-bold text-white leading-snug">{snippet.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                <span>📅 {publishedDate}</span>
                {duration && <span>⏱ {duration}</span>}
                {stats?.viewCount && <span>👁 {formatNumber(stats.viewCount)} views</span>}
                {stats?.likeCount && <span>👍 {formatNumber(stats.likeCount)} likes</span>}
              </div>
            </div>

            {/* Description */}
            {snippet.description && (
              <div className="glass rounded-2xl p-5 sm:p-6">
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Description</h2>
                <div className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-line line-clamp-[12]">
                  {snippet.description}
                </div>
              </div>
            )}

            {/* Tags */}
            {snippet.tags && snippet.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {snippet.tags.slice(0, 12).map((tag: string) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-gray-700 text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">

            {/* Stats card */}
            <div className="glass rounded-2xl p-5 space-y-4">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Video Stats</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Views', value: formatNumber(stats?.viewCount), icon: '👁' },
                  { label: 'Likes', value: formatNumber(stats?.likeCount), icon: '👍' },
                  { label: 'Comments', value: formatNumber(stats?.commentCount), icon: '💬' },
                  { label: 'Duration', value: duration || '—', icon: '⏱' },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-lg">{s.icon}</p>
                    <p className="font-bold text-white text-sm mt-1">{s.value}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Watch on YouTube */}
            <a
              href={`https://www.youtube.com/watch?v=${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-colors no-underline"
            >
              ▶ Watch on YouTube
            </a>

            {/* Back to videos */}
            <Link
              href="/youtube"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-700 hover:border-gray-500 hover:bg-white/5 text-gray-300 hover:text-white font-medium text-sm transition-all no-underline"
            >
              ← Back to All Videos
            </Link>

            {/* Channel card */}
            <div className="glass rounded-2xl p-5 space-y-3 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider">From</p>
              <p className="font-bold text-white">{snippet.channelTitle || 'GamingOP'}</p>
              <a
                href="https://youtube.com/@gamingop-1m?si=qZfx45xAKVPyR4gy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block btn btn-primary text-sm no-underline"
              >
                Subscribe
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
