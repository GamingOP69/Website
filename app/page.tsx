'use client'

import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import ServerStatus from '../components/ServerStatus'
import PopularVideos from '../components/PopularVideos'
import DiscordWidget from '../components/DiscordWidget'
import EventsList from '../components/EventsList'
import ContactForm from '../components/ContactForm'

const DEMO_VIDEOS = [
  {
    id: { videoId: 'dQw4w9WgXcQ' },
    snippet: {
      title: 'Epic Minecraft Speedrun Challenge',
      thumbnails: { medium: { url: 'https://images.unsplash.com/photo-1538481527238-91b2f8fda571?w=400&h=225&fit=crop' } }
    }
  },
  {
    id: { videoId: 'jNQXAC9IVRw' },
    snippet: {
      title: 'Free Fire Tournament Finals 2024',
      thumbnails: { medium: { url: 'https://images.unsplash.com/photo-1508394519177-169a6ad63d4b?w=400&h=225&fit=crop' } }
    }
  },
  {
    id: { videoId: '9bZkp7q19f0' },
    snippet: {
      title: 'Valorant Ranked Gameplay Highlights',
      thumbnails: { medium: { url: 'https://images.unsplash.com/photo-1493711662714-5c526b5cb519?w=400&h=225&fit=crop' } }
    }
  },
  {
    id: { videoId: 'V-_O7gl_IFg' },
    snippet: {
      title: 'Minecraft Server Tour & Update',
      thumbnails: { medium: { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=225&fit=crop' } }
    }
  },
  {
    id: { videoId: 'tYzMGcUty6s' },
    snippet: {
      title: 'Gaming Setup Reveal 2024',
      thumbnails: { medium: { url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop' } }
    }
  },
  {
    id: { videoId: 'ZZ5txp34G7c' },
    snippet: {
      title: 'Stream Highlights Compilation',
      thumbnails: { medium: { url: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=400&h=225&fit=crop' } }
    }
  }
]

export default function Home() {
  const [videos, setVideos] = useState<any[]>(DEMO_VIDEOS)
  const [loading, setLoading] = useState(true)

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

  return (
    <main className="py-6 sm:py-8 space-y-12 sm:space-y-16">
      <header className="animate-fade-in">
        <Hero />
      </header>

      <section className="animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3">
          <h2 className="heading-lg">Latest Videos</h2>
          {loading && <span className="text-xs text-gray-400 animate-pulse-subtle">Loading videos...</span>}
        </div>
        {videos.length > 0 ? (
          <PopularVideos videos={videos} />
        ) : (
          <div className="glass p-8 sm:p-12 rounded-xl text-center">
            <p className="text-gray-400">No videos available. Check back soon!</p>
          </div>
        )}
      </section>

      <section className="animate-fade-in">
        <h2 className="heading-lg mb-6 sm:mb-8">Trending Now</h2>
        <PopularVideos videos={videos.slice(0, 4)} />
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
