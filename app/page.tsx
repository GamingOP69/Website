'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
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
    <main className="py-6 sm:py-10 space-y-14 sm:space-y-20">
      <header className="animate-fade-in">
        <Hero />
      </header>

      <section className="animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3">
          <h2 className="heading-lg">Latest Videos</h2>
          <Link href="/youtube" className="text-sm text-primary hover:text-accent transition no-underline">View all videos →</Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass rounded-xl overflow-hidden animate-pulse-subtle">
                <div className="h-44 bg-white/5"></div>
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-white/5 rounded w-3/4"></div>
                  <div className="h-3 bg-white/5 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="glass p-8 sm:p-12 rounded-xl text-center space-y-3">
            <p className="text-gray-400">No videos available. Check back soon!</p>
          <a href="https://youtube.com/@gamingop-1m?si=qZfx45xAKVPyR4gy" target="_blank" rel="noopener noreferrer" className="inline-block btn btn-primary text-sm no-underline">▶ Watch on YouTube</a>
          </div>
        ) : (
          <PopularVideos videos={videos} />
        )}
      </section>

      <section className="animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3">
          <h2 className="heading-lg">Trending Now</h2>
        </div>
        {trendingLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass rounded-xl overflow-hidden animate-pulse-subtle">
                <div className="h-44 bg-white/5"></div>
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-white/5 rounded w-3/4"></div>
                  <div className="h-3 bg-white/5 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : trending.length === 0 ? (
          <div className="glass p-8 sm:p-12 rounded-xl text-center">
            <p className="text-gray-400">No trending videos right now.</p>
          </div>
        ) : (
          <PopularVideos videos={trending} />
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 animate-fade-in">
        <div className="lg:col-span-2 space-y-10 sm:space-y-14">
          <section>
            <h2 className="heading-lg mb-6 sm:mb-8">Community &amp; Events</h2>
            <EventsList />
          </section>

          <section id="contact">
            <h2 className="heading-lg mb-6 sm:mb-8">Get In Touch</h2>
            <ContactForm />
          </section>
        </div>

        <aside className="space-y-6">
          <div className="sticky top-24 space-y-6">
            <DiscordWidget />
            <section>
              <h2 className="heading-md mb-4">Minecraft Server</h2>
              <ServerStatus server="mc.gamingop.qzz.io" />
            </section>
          </div>
        </aside>
      </div>
    </main>
  )
}

