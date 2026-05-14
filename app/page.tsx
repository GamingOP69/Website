'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Hero from '../components/Hero'
import ServerStatus from '../components/ServerStatus'
import PopularVideos from '../components/PopularVideos'
import DiscordWidget from '../components/DiscordWidget'
import EventsList from '../components/EventsList'
import ContactForm from '../components/ContactForm'
import AdBanner from '../components/AdBanner'

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

      {/* About GamingOP Section */}
      <section className="animate-fade-in glass rounded-2xl p-6 sm:p-10 space-y-4">
        <h2 className="heading-lg text-white">About GamingOP</h2>
        <div className="space-y-4 text-gray-300">
          <p>
            Welcome to GamingOP, your ultimate destination for gaming content, Minecraft server hosting, and a thriving gaming community. 
            We are dedicated to creating high-quality gaming experiences and fostering a welcoming environment for gamers of all skill levels.
          </p>
          <p>
            Our mission is to inspire, educate, and entertain the gaming community through authentic content creation, competitive Minecraft servers, 
            and exclusive gaming guides. Whether you&apos;re a casual player or a competitive gamer, GamingOP has something for everyone.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {[
              { icon: '🎮', label: '1M+ Gamers', desc: 'In our community' },
              { icon: '📺', label: '500+ Videos', desc: 'High-quality content' },
              { icon: '🌍', label: 'Global Reach', desc: 'Players worldwide' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="font-semibold text-white">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose GamingOP */}
      <section className="animate-fade-in space-y-6">
        <h2 className="heading-lg">Why Choose GamingOP?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: '✨',
              title: 'Premium Content',
              desc: 'High-quality gaming videos and tutorials created with expertise and passion',
            },
            {
              icon: '🤝',
              title: 'Thriving Community',
              desc: 'Join thousands of gamers in our Discord server with events and competitions',
            },
            {
              icon: '🏆',
              title: 'Competitive Servers',
              desc: 'Experience our professionally maintained Minecraft servers with active moderation',
            },
            {
              icon: '📚',
              title: 'Expert Guides',
              desc: 'Learn from our comprehensive gaming guides and strategies for all games',
            },
            {
              icon: '⚡',
              title: 'Regular Updates',
              desc: 'New content, server updates, and community events posted regularly',
            },
            {
              icon: '🎁',
              title: 'Exclusive Rewards',
              desc: 'Participate in giveaways and earn exclusive rewards for members',
            },
          ].map((feature, idx) => (
            <div key={idx} className="glass p-6 rounded-lg hover:bg-white/10 transition">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

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

      {/* Ad banner between Latest Videos and Trending Now */}
      {/* TODO: Replace 0000000001 with your actual AdSense ad slot ID */}
      <AdBanner adSlot="0000000001" adFormat="horizontal" className="my-2" />

      {/* Quick Links Section */}
      <section className="animate-fade-in space-y-6">
        <h2 className="heading-lg">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '📚', title: 'Gaming Guides', desc: 'Learn tips and strategies', href: '/guides' },
            { icon: '❓', title: 'FAQ', desc: 'Get your questions answered', href: '/faq' },
            { icon: '💜', title: 'Community', desc: 'Join our Discord', href: '/community' },
            { icon: '🛍️', title: 'Merchandise', desc: 'Official merch coming soon', href: '/shop' },
          ].map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="glass p-4 rounded-lg hover:bg-white/10 transition no-underline group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition">{link.icon}</div>
              <h3 className="font-semibold text-white">{link.title}</h3>
              <p className="text-sm text-gray-400">{link.desc}</p>
            </Link>
          ))}
        </div>
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

      {/* Ad banner between Trending Now and Community sections */}
      {/* TODO: Replace 0000000002 with your actual AdSense ad slot ID */}
      <AdBanner adSlot="0000000002" adFormat="auto" className="my-2" />

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
            {/* Sidebar ad */}
            {/* TODO: Replace 0000000003 with your actual AdSense ad slot ID */}
            <AdBanner adSlot="0000000003" adFormat="rectangle" />
          </div>
        </aside>
      </div>
    </main>
  )
}

