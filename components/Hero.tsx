'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

type ChannelStats = {
  subscriberCount: string | null
  videoCount: string
  viewCount: string
  title: string
}

function formatCount(n: string | null): string {
  if (!n) return '—'
  const num = Number(n)
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  return String(num)
}

export default function Hero() {
  const [stats, setStats] = useState<ChannelStats | null>(null)

  useEffect(() => {
    fetch('/api/youtube?mode=stats')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data && !data.error) setStats(data) })
      .catch((err) => console.error('Failed to fetch channel stats:', err))
  }, [])

  return (
    <div className="mb-12 animate-fade-in">
      <div className="glass rounded-2xl overflow-hidden">
        {/* Banner Image */}
        <div className="relative h-40 sm:h-56 lg:h-64 w-full overflow-hidden">
          <Image
            src="/banner.png"
            alt="GamingOP Banner"
            fill
            quality={85}
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-dark/80"></div>
        </div>

        <div className="relative bg-gradient-to-br from-primary/20 via-bg to-bg-dark p-6 sm:p-10 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left side - Content */}
            <div className="space-y-6 order-2 lg:order-1">
              <div className="space-y-3">
                <h1 className="heading-xl gradient-text">GamingOP</h1>
                <p className="text-lg sm:text-xl text-gray-300 font-light">Gaming Creator | Minecraft Server | Community Hub</p>
              </div>

              <p className="text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed">
                Join millions of gaming enthusiasts. Watch engaging gameplay videos, play on our Minecraft server, and become part of an amazing community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href="https://youtube.com/@gamingop-1m?si=qZfx45xAKVPyR4gy" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg shadow-glow">
                  <span className="mr-2">▶</span> Subscribe on YouTube
                </a>
                <a href="https://discord.gg/Ezd32s4P8H" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">
                  💬 Join Discord
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="card text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-primary">
                    {stats ? formatCount(stats.subscriberCount) : '…'}
                  </p>
                  <p className="text-sm text-gray-400">Subscribers</p>
                </div>
                <div className="card text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-accent">
                    {stats ? formatCount(stats.videoCount) : '…'}
                  </p>
                  <p className="text-sm text-gray-400">Videos</p>
                </div>
                <div className="card text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-gray-400">Live Server</p>
                </div>
              </div>
            </div>

            {/* Right side - Server IP */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl"></div>
                <div className="relative glass-hover p-8 rounded-2xl text-center space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400 uppercase tracking-wider">Minecraft Server</p>
                    <p className="text-2xl sm:text-3xl font-bold font-mono bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      gamingop.qzz.io
                    </p>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                  <div className="pt-4">
                    <a href="/server-status" className="inline-block btn btn-primary px-6">
                      Check Server Status
                    </a>
                  </div>
                  <p className="text-xs text-gray-500">Click to copy server IP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
