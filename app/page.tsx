import React from 'react'
import Hero from '../components/Hero'
import ServerStatus from '../components/ServerStatus'
import PopularVideos from '../components/PopularVideos'
import DiscordWidget from '../components/DiscordWidget'
import EventsList from '../components/EventsList'
import ContactForm from '../components/ContactForm'
import { fetchLatestVideos, fetchPopularVideos, fetchLiveVideos } from '../lib/youtube'

export default async function Home() {
  const key = process.env.YT_API_KEY || ''
  const channel = process.env.YT_CHANNEL_ID || ''

  let latest: any = { items: [] }
  let popular: any = { items: [] }
  let live: any = { items: [] }
  try {
    latest = await fetchLatestVideos(key, channel, 8)
    popular = await fetchPopularVideos(key, channel, 8)
    live = await fetchLiveVideos(key, channel, 1)
  } catch (e) {
    console.error('YouTube fetch error', e)
  }

  const isLive = (live.items && live.items.length > 0)

  return (
    <main className="py-8">
      <header className="mb-8">
        <Hero />
      </header>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Latest Videos</h2>
          <div className="text-sm text-gray-300">{isLive ? 'Live now' : ''}</div>
        </div>
        <PopularVideos videos={latest.items || []} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Popular</h2>
        <PopularVideos videos={popular.items || []} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Community & Events</h2>
            <EventsList />
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <ContactForm />
          </section>
        </div>

        <aside className="space-y-6">
          <DiscordWidget />
          <section>
            <h2 className="text-2xl font-bold mb-4">Minecraft Server</h2>
            <ServerStatus server="mc.gamingop.qzz.io" />
          </section>
        </aside>
      </div>
    </main>
  )
}
