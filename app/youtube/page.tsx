import React from 'react'
import { Metadata } from 'next'
import VideoLister from '../../components/VideoLister'
import { fetchLatestVideos } from '../../lib/youtube'

export const metadata: Metadata = {
  title: 'Videos – GamingOP',
  description: 'Watch all GamingOP videos — Minecraft, Free Fire, Valorant and more.',
}

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
    <main className="py-8 sm:py-12">
      <div className="mb-8 sm:mb-10">
        <h1 className="heading-xl text-white mb-2">All Videos</h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Browse the latest GamingOP content. Search by game or topic below.
        </p>
      </div>
      <VideoLister initial={videos} />
    </main>
  )
}
