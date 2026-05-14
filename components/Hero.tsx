'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MINECRAFT_SERVER, SOCIAL_LINKS } from '../lib/site'

type ChannelStats = {
  subscriberCount: string | null
  videoCount: string
  viewCount: string
  title: string
}

function formatCount(n: string | null): string {
  if (!n) return '-'
  const num = Number(n)
  if (Number.isNaN(num)) return '-'
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  return String(num)
}

function CopyIPButton({ ip }: { ip: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(ip).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="btn btn-ghost w-full font-mono text-sm"
      type="button"
    >
      {copied ? 'Copied server IP' : `Copy IP: ${ip}`}
    </button>
  )
}

export default function Hero() {
  const [stats, setStats] = useState<ChannelStats | null>(null)

  useEffect(() => {
    fetch('/api/youtube?mode=stats')
      .then((response) => response.ok ? response.json() : null)
      .then((data) => { if (data && !data.error) setStats(data) })
      .catch((err) => console.error('Failed to fetch channel stats:', err))
  }, [])

  return (
    <section className="relative overflow-hidden rounded-lg border border-gray-800 bg-bg-dark">
      <div className="absolute inset-0">
        <Image
          src="/banner.png"
          alt="GamingOP channel banner"
          fill
          quality={82}
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg/90 to-bg/70" />
      </div>

      <div className="relative grid gap-6 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:p-10">
        <div className="flex min-h-[360px] flex-col justify-center">
          <p className="eyebrow">Gaming creator and coder</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            GamingOP
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
            Watch gaming videos, join the Minecraft community, use lightweight creator tools, and follow guides built
            for players who want clear help without fake promises.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-primary no-underline">
              Watch on YouTube
            </a>
            <Link href="/tools" className="btn btn-ghost no-underline">
              Open tools
            </Link>
            <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer" className="btn btn-ghost no-underline">
              Join Discord
            </a>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-gray-300">
            <span className="rounded-full border border-gray-700 bg-black/25 px-3 py-1">Original guides</span>
            <span className="rounded-full border border-gray-700 bg-black/25 px-3 py-1">Browser tools</span>
            <span className="rounded-full border border-gray-700 bg-black/25 px-3 py-1">Minecraft support</span>
            <span className="rounded-full border border-gray-700 bg-black/25 px-3 py-1">Merch lab coming soon</span>
          </div>

          <div className="mt-7 grid max-w-2xl grid-cols-3 gap-3">
            <Stat label="Subscribers" value={stats ? formatCount(stats.subscriberCount) : 'Loading'} />
            <Stat label="Videos" value={stats ? formatCount(stats.videoCount) : 'Loading'} />
            <Stat label="Community" value="Discord" />
          </div>
        </div>

        <aside className="self-center rounded-lg border border-gray-800 bg-black/45 p-5 backdrop-blur">
          <p className="text-xs font-semibold uppercase text-gray-500">Minecraft server</p>
          <h2 className="mt-2 break-all font-mono text-xl font-bold text-white">{MINECRAFT_SERVER}</h2>
          <p className="mt-3 text-sm leading-6 text-gray-400">
            Check the live status page before joining and use Discord for help if your launcher shows an error.
          </p>
          <div className="mt-5 space-y-3">
            <CopyIPButton ip={MINECRAFT_SERVER} />
            <Link href="/server-status" className="btn btn-primary w-full no-underline">
              Check server status
            </Link>
            <a href={SOCIAL_LINKS.minecraftVote} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full no-underline">
              Vote for the server
            </a>
          </div>
        </aside>
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-black/35 p-3">
      <p className="text-lg font-bold text-white sm:text-xl">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{label}</p>
    </div>
  )
}
