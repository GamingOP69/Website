'use client'

import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import ServerStatus from '../components/ServerStatus'
import PopularVideos from '../components/PopularVideos'
import DiscordWidget from '../components/DiscordWidget'
import EventsList from '../components/EventsList'
import ContactForm from '../components/ContactForm'

export default function Home() {
  const [videos, setVideos] = useState<any[]>([])
  const [trending, setTrending] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [trendingLoading, setTrendingLoading] = useState(true)

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('/api/youtube?max=8')
        if (response.ok) {
          const data = await response.json()
          if (data.items?.length) {
            setVideos(data.items)
          }
        }
      } catch (error) {
        console.error('Failed to fetch YouTube videos:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  useEffect(() => {
    async function fetchTrending() {
      try {
        const response = await fetch('/api/trending')
        if (response.ok) {
          const data = await response.json()
          if (data.items?.length) {
            setTrending(data.items.slice(0, 4))
          }
        }
      } catch (error) {
        console.error('Failed to fetch trending videos:', error)
      } finally {
        setTrendingLoading(false)
      }
    }
    fetchTrending()
  }, [])

  return (
    <main className="py-6 sm:py-8 space-y-12 sm:space-y-16">
      <header className="animate-fade-in">
        <Hero />
      </header>

      <section className="animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3">
          <h2 className="heading-lg">Latest Videos</h2>
          {loading && <span className="text-xs text-gray-400 animate-pulse-subtle">Loading videos…</span>}
        </div>
        {!loading && videos.length === 0 ? (
          <div className="glass p-8 sm:p-12 rounded-xl text-center">
            <p className="text-gray-400">No videos available. Check back soon!</p>
          </div>
        ) : (
          <PopularVideos videos={videos} />
        )}
      </section>

      <section className="animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3">
          <h2 className="heading-lg">Trending Now</h2>
          {trendingLoading && <span className="text-xs text-gray-400 animate-pulse-subtle">Loading…</span>}
        </div>
        {!trendingLoading && trending.length === 0 ? (
          <div className="glass p-8 sm:p-12 rounded-xl text-center">
            <p className="text-gray-400">No trending videos right now.</p>
          </div>
        ) : (
          <PopularVideos videos={trending} />
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 animate-fade-in">
        <div className="lg:col-span-2 space-y-8 sm:space-y-12">
          <section>
            <h2 className="heading-lg mb-6 sm:mb-8">Community & Events</h2>
            <EventsList />
          </section>

          <section>
            <h2 className="heading-lg mb-6 sm:mb-8">Get In Touch</h2>
            <ContactForm />
          </section>
        </div>

        <aside className="space-y-6">
          <div className="sticky top-24">
            <DiscordWidget />
            <section className="mt-6">
              <h2 className="heading-md mb-4">Minecraft Server</h2>
              <ServerStatus server="gamingop.qzz.io" />
            </section>
          </div>
        </aside>
      </div>
    </main>
  )
}

