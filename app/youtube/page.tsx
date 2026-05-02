import React from 'react'
import SEO from '../../components/SEO'
import VideoLister from '../../components/VideoLister'
import { fetchLatestVideos } from '../../lib/youtube'

export default async function YoutubeIndex() {
  const key = process.env.YT_API_KEY || ''
  const channel = process.env.YT_CHANNEL_ID || ''
  let videos: any[] = []
  try {
    const data = await fetchLatestVideos(key, channel, 50)
    videos = data.items || []
  } catch {
    videos = []
  }

  return (
    <main className="py-8">
      <SEO title="Videos" description="All GamingOP videos" />
      <h1 className="text-3xl font-bold mb-4">Videos</h1>
      <VideoLister initial={videos} />
    </main>
  )
}
