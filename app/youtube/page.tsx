import React from 'react'
import { Metadata } from 'next'
import VideoLister from '../../components/VideoLister'
import AdContainer from '../../components/AdContainer'
import { fetchLatestVideos, resolveChannelId } from '../../lib/youtube'
import { SITE_URL, SOCIAL_LINKS } from '../../lib/site'

export const metadata: Metadata = {
  title: 'GamingOP Videos',
  description:
    'Browse GamingOP videos, latest uploads, gaming topics, and official YouTube channel links.',
  alternates: {
    canonical: `${SITE_URL}/youtube`,
  },
}

const contentThemes = [
  'Minecraft server gameplay and community moments',
  'Free Fire and competitive gaming highlights',
  'Valorant and multi-game sessions',
  'Creator experiments, livestreams, and updates',
]

export default async function YoutubeIndex() {
  const key = process.env.YT_API_KEY || ''
  const channel = await resolveChannelId(key, process.env.YT_CHANNEL_ID || '')
  let videos: any[] = []
  try {
    const data = await fetchLatestVideos(key, channel, 50)
    videos = data.items || []
  } catch {
    videos = []
  }

  return (
    <main className="py-6 sm:py-10 space-y-8">
      <section className="content-band p-5 sm:p-8">
        <p className="eyebrow">Official channel hub</p>
        <h1 className="mt-3 heading-xl text-white">GamingOP Videos</h1>
        <p className="mt-3 max-w-3xl text-sm sm:text-base leading-7 text-gray-300">
          Watch the latest GamingOP uploads and use this page as a clean channel index. When the YouTube API is not
          configured, the official channel link still gives visitors a reliable route to the videos.
        </p>
        <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5 no-underline">
          Open YouTube channel
        </a>
      </section>

      <AdContainer placement="top" />

      <section className="surface p-5 sm:p-6">
        <h2 className="heading-md text-white">Content themes</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {contentThemes.map((theme) => (
            <div key={theme} className="rounded-lg border border-gray-800 bg-black/20 p-4 text-sm text-gray-300">
              {theme}
            </div>
          ))}
        </div>
      </section>

      <AdContainer placement="middle" />

      <section>
        <div className="mb-5">
          <h2 className="heading-lg text-white">Video library</h2>
          <p className="mt-2 text-sm text-gray-400">Search by title, game, or topic when videos are loaded.</p>
        </div>
        <VideoLister initial={videos} />
      </section>

      <AdContainer placement="bottom" />
    </main>
  )
}
