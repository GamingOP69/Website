import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AdBanner from '../../../components/AdBanner'
import { SITE_URL, SOCIAL_LINKS } from '../../../lib/site'
import { AD_SLOTS } from '../../../lib/site'

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
  if (!vid) return { title: 'Video Not Found - GamingOP' }
  return {
    title: `${vid.snippet.title} - GamingOP`,
    description: vid.snippet.description?.slice(0, 155) || 'Watch on GamingOP',
    alternates: {
      canonical: `${SITE_URL}/youtube/${id}`,
    },
    openGraph: {
      title: vid.snippet.title,
      description: vid.snippet.description?.slice(0, 155) || '',
      images: [{ url: vid.snippet.thumbnails?.maxres?.url || vid.snippet.thumbnails?.high?.url || '' }],
    },
  }
}

function formatNumber(n: string | undefined): string {
  if (!n) return '-'
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
            <div className="surface overflow-hidden">
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
                <span>{publishedDate}</span>
                {duration && <span>{duration}</span>}
                {stats?.viewCount && <span>{formatNumber(stats.viewCount)} views</span>}
                {stats?.likeCount && <span>{formatNumber(stats.likeCount)} likes</span>}
              </div>
            </div>

            {/* Description */}
            {snippet.description && (
              <div className="surface p-5 sm:p-6">
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Description</h2>
                <div className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-line line-clamp-[12]">
                  {snippet.description}
                </div>
              </div>
            )}

            <AdBanner adSlot={AD_SLOTS.videoDetailTop} adFormat="horizontal" className="my-3" />

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

            <AdBanner adSlot={AD_SLOTS.videoDetailBottom} adFormat="horizontal" className="my-3" />
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">

            {/* Stats card */}
              <div className="surface space-y-4 p-5">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Video Stats</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Views', value: formatNumber(stats?.viewCount) },
                  { label: 'Likes', value: formatNumber(stats?.likeCount) },
                  { label: 'Comments', value: formatNumber(stats?.commentCount) },
                  { label: 'Duration', value: duration || '-' },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg bg-white/5 p-3 text-center">
                    <p className="font-bold text-white text-sm">{s.value}</p>
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
              className="flex w-full items-center justify-center gap-2 rounded-md bg-red-600 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-red-500"
            >
              Watch on YouTube
            </a>

            {/* Back to videos */}
            <Link
              href="/youtube"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-700 py-3 text-sm font-medium text-gray-300 no-underline transition-all hover:border-gray-500 hover:bg-white/5 hover:text-white"
            >
              Back to All Videos
            </Link>

            {/* Channel card */}
            <div className="surface space-y-3 p-5 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider">From</p>
              <p className="font-bold text-white">{snippet.channelTitle || 'GamingOP'}</p>
              <a
                href={SOCIAL_LINKS.youtube}
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
