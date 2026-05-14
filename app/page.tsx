'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Hero from '../components/Hero'
import ServerStatus from '../components/ServerStatus'
import PopularVideos from '../components/PopularVideos'
import DiscordWidget from '../components/DiscordWidget'
import EventsList from '../components/EventsList'
import ContactForm from '../components/ContactForm'
import AdContainer from '../components/AdContainer'
import { MINECRAFT_SERVER, SOCIAL_LINKS } from '../lib/site'
import { guides } from '../lib/guides'

type VideoItem = {
  id: string | { videoId?: string }
  snippet?: {
    title?: string
    publishedAt?: string
    thumbnails?: {
      medium?: { url?: string }
      default?: { url?: string }
    }
  }
  statistics?: {
    viewCount?: string | number
  }
}

const quickLinks = [
  {
    title: 'Watch videos',
    href: '/youtube',
    description: 'Browse latest GamingOP uploads with search and individual video pages.',
  },
  {
    title: 'Use tools',
    href: '/tools',
    description: 'Convert images and clean creator text locally in the browser.',
  },
  {
    title: 'Read guides',
    href: '/guides',
    description: 'Minecraft help, creator setup notes, and community safety resources.',
  },
  {
    title: 'Merch lab',
    href: '/shop',
    description: 'Future store information with clear status and official links.',
  },
]

const siteValueCards = [
  {
    title: 'Official links in one place',
    body: 'Visitors can reach YouTube, Discord, Twitch, voting, and the Minecraft status page without guessing which link is current.',
  },
  {
    title: 'Written resources with context',
    body: 'The guides are original pages that explain how to join the server, set up recording, and stay safe in community spaces.',
  },
  {
    title: 'Tools that run locally',
    body: 'The image converter and text toolkit work in the browser so people can get something useful without uploading private files.',
  },
  {
    title: 'Merch is clearly marked',
    body: 'The merch page stays informational until there is a real store, real products, and real checkout details.',
  },
]

const quickAnswers = [
  {
    question: 'Where should a new visitor start?',
    answer: 'Open the YouTube page for videos, the server page for Minecraft access, or the tools page for browser utilities.',
  },
  {
    question: 'Do the tools upload files?',
    answer: 'No. The live tools are designed to run locally in your browser so the site stays lightweight and private.',
  },
  {
    question: 'Is merch available now?',
    answer: 'No. The shop page is a coming-soon placeholder until official products, pricing, and policies are ready.',
  },
]

export default function Home() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [trending, setTrending] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [trendingLoading, setTrendingLoading] = useState(true)

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('/api/youtube?max=8')
        if (response.ok) {
          const data = await response.json()
          if (data.items?.length) setVideos(data.items)
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
          if (data.items?.length) setTrending(data.items.slice(0, 4))
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
    <main className="space-y-10 py-5 sm:space-y-12 sm:py-8">
      <Hero />

      <AdContainer placement="top" />

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((item) => (
          <Link key={item.href} href={item.href} className="surface block p-4 no-underline hover:border-primary/60">
            <h2 className="font-bold text-white">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">{item.description}</p>
          </Link>
        ))}
      </section>

      <section className="space-y-5">
        <SectionHeading
          title="Why people use this site"
          description="This is the part AdSense looks for: a site that actually helps a visitor do something useful instead of just sending them to outbound links."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {siteValueCards.map((card) => (
            <div key={card.title} className="surface p-5">
              <h3 className="text-base font-bold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <AdContainer placement="middle" />

      <section className="space-y-5">
        <SectionHeading
          title="Latest Videos"
          description="New uploads appear here when the YouTube API is configured. The channel link stays available either way."
          href="/youtube"
          linkText="All videos"
        />
        {loading ? <VideoSkeleton count={8} /> : videos.length === 0 ? <YoutubeFallback /> : <PopularVideos videos={videos} />}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-10">
          <section className="space-y-5">
            <SectionHeading
              title="Trending Now"
              description="Recent videos ranked by views over age, so fresh activity can surface without fake counters."
            />
            {trendingLoading ? <VideoSkeleton count={4} /> : trending.length === 0 ? <YoutubeFallback compact /> : <PopularVideos videos={trending} />}
          </section>

          <AdContainer placement="middle" />

          <section className="space-y-5">
            <SectionHeading
              title="Original Guides"
              description="Useful written content for visitors, not just embedded social feeds."
              href="/guides"
              linkText="Read guides"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {guides.slice(0, 4).map((guide) => (
                <Link key={guide.slug} href={`/guides/${guide.slug}`} className="surface block p-5 no-underline hover:border-primary/60">
                  <p className="text-xs font-semibold uppercase text-primary">{guide.category}</p>
                  <h3 className="mt-2 font-bold leading-snug text-white">{guide.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">{guide.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <AdContainer placement="middle" />

          <section className="space-y-5">
            <SectionHeading title="Community Updates" description="Events are announced only when they are real and ready." />
            <EventsList />
          </section>

          <section id="contact" className="space-y-5">
            <SectionHeading title="Contact" description="Collabs, server support, website feedback, and creator questions can start here." />
            <ContactForm />
          </section>
        </div>

        <aside className="space-y-5">
          <div className="space-y-5 lg:sticky lg:top-24">
            <DiscordWidget />
            
            <AdContainer placement="sidebar" />

            <section className="space-y-3">
              <h2 className="heading-md text-white">Minecraft Server</h2>
              <ServerStatus server={MINECRAFT_SERVER} />
              <a href={SOCIAL_LINKS.minecraftVote} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full no-underline">
                Vote for the server
              </a>
            </section>

            <AdContainer placement="sidebar" />
          </div>
        </aside>
      </section>

      <AdContainer placement="bottom" />

      <section className="surface p-5 sm:p-6">
        <h2 className="heading-md text-white">Quick answers</h2>
        <dl className="mt-4 grid gap-4 md:grid-cols-3">
          {quickAnswers.map((item) => (
            <div key={item.question} className="rounded-lg border border-gray-800 bg-black/20 p-4">
              <dt className="text-sm font-semibold text-white">{item.question}</dt>
              <dd className="mt-2 text-sm leading-6 text-gray-400">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  )
}

function SectionHeading({
  title,
  description,
  href,
  linkText,
}: {
  title: string
  description: string
  href?: string
  linkText?: string
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="heading-lg text-white">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">{description}</p>
      </div>
      {href && linkText ? (
        <Link href={href} className="text-sm font-semibold text-primary no-underline hover:text-accent">
          {linkText}
        </Link>
      ) : null}
    </div>
  )
}

function VideoSkeleton({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="surface overflow-hidden animate-pulse-subtle">
          <div className="h-40 bg-white/5" />
          <div className="space-y-2 p-4">
            <div className="h-3 w-3/4 rounded bg-white/5" />
            <div className="h-3 w-1/2 rounded bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  )
}

function YoutubeFallback({ compact = false }: { compact?: boolean }) {
  return (
    <div className="surface p-5 text-sm text-gray-400">
      <p>
        Videos are available on the official GamingOP YouTube channel. This section will fill automatically when API
        access is configured.
      </p>
      {!compact ? (
        <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4 no-underline">
          Open YouTube channel
        </a>
      ) : null}
    </div>
  )
}
