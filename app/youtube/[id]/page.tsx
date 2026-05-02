import React from 'react'
import SEO from '../../../components/SEO'

async function fetchVideo(id: string) {
  const key = process.env.YT_API_KEY || ''
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${key}&part=snippet,statistics,contentDetails`
  const r = await fetch(url)
  if (!r.ok) return null
  const d = await r.json()
  return d.items && d.items[0]
}

export default async function VideoPage({ params }: { params: { id: string } }) {
  const vid = await fetchVideo(params.id)
  if (!vid) return <div className="py-8">Video not found</div>

  return (
    <main className="py-8">
      <SEO title={vid.snippet.title} description={vid.snippet.description?.slice(0, 150)} />
      <h1 className="text-2xl font-bold mb-4">{vid.snippet.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="aspect-video">
            <iframe width="100%" height="480" src={`https://www.youtube.com/embed/${params.id}`} title={vid.snippet.title} frameBorder={0} allowFullScreen />
          </div>
          <div className="mt-4 text-sm text-gray-300">{vid.snippet.description}</div>
        </div>
        <aside className="space-y-4">
          <div className="glass p-4">Views: {vid.statistics?.viewCount || '—'}</div>
          <div className="glass p-4">Uploaded: {new Date(vid.snippet.publishedAt).toLocaleDateString()}</div>
        </aside>
      </div>
    </main>
  )
}
