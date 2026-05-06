import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About – GamingOP',
  description: 'Learn about GamingOP — a gaming content creator, Minecraft server owner, and community builder.',
}

export default function About() {
  return (
    <main className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Hero card */}
        <div className="glass rounded-2xl p-6 sm:p-10">
          <h1 className="heading-xl gradient-text mb-4">About GamingOP</h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
            GamingOP is a gaming content creator, Minecraft server owner, and community builder. The channel focuses on
            Minecraft, Free Fire, Valorant, and multi-game content — bringing high-energy gameplay, tips, and entertainment
            to the gaming community.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { label: 'Platform', value: 'YouTube', icon: '▶' },
            { label: 'Server', value: 'Minecraft', icon: '🟩' },
            { label: 'Community', value: 'Discord', icon: '💬' },
          ].map((s) => (
            <div key={s.label} className="glass rounded-xl p-5 sm:p-6 text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <p className="text-lg font-bold text-white">{s.value}</p>
              <p className="text-sm text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="heading-md text-white">What We Create</h2>
            <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
              {[
                '🎮 Minecraft survival, SMP, and server gameplay',
                '🔥 Free Fire ranked and highlight videos',
                '🎯 Valorant gameplay and tips',
                '🏆 Community events and giveaways',
                '📺 Live streams on the Minecraft server',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">{item}</li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="heading-md text-white">Minecraft Server</h2>
            <p className="text-gray-300 text-sm sm:text-base">
              The GamingOP Minecraft server runs 24/7 and is open to all community members. Join us for BedWars, survival,
              and special community events.
            </p>
            <div className="bg-black/30 rounded-lg p-4 space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Server IP</p>
              <p className="font-mono text-primary font-bold text-lg">mc.gamingop.qzz.io</p>
            </div>
            <Link href="/server-status" className="inline-block btn btn-primary text-sm no-underline">
              Check Server Status →
            </Link>
          </div>
        </div>

        {/* Connect */}
        <div className="glass rounded-2xl p-6 sm:p-8">
          <h2 className="heading-md text-white mb-6">Connect With Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="https://youtube.com/@gamingop-1m?si=qZfx45xAKVPyR4gy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:border-red-500/50 transition-all no-underline group"
            >
              <span className="text-2xl">▶</span>
              <div>
                <p className="font-semibold text-white text-sm group-hover:text-red-400 transition-colors">YouTube</p>
                <p className="text-xs text-gray-400">@gamingop-1m</p>
              </div>
            </a>
            <a
              href="https://discord.gg/Ezd32s4P8H"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 hover:border-indigo-500/50 transition-all no-underline group"
            >
              <span className="text-2xl">💬</span>
              <div>
                <p className="font-semibold text-white text-sm group-hover:text-indigo-400 transition-colors">Discord</p>
                <p className="text-xs text-gray-400">Official Community</p>
              </div>
            </a>
            <a
              href="https://minecraftservers.org/server/686902"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:border-green-500/50 transition-all no-underline group"
            >
              <span className="text-2xl">🟩</span>
              <div>
                <p className="font-semibold text-white text-sm group-hover:text-green-400 transition-colors">MC Servers</p>
                <p className="text-xs text-gray-400">Vote for our server</p>
              </div>
            </a>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="glass rounded-2xl p-6 sm:p-8 text-center">
          <h2 className="heading-md text-white mb-3">Business Inquiries & Collabs</h2>
          <p className="text-gray-400 text-sm sm:text-base mb-5">
            For collaborations, sponsorships, or press inquiries, reach out via the contact form.
          </p>
          <Link href="/#contact" className="btn btn-primary btn-lg no-underline">
            Get In Touch
          </Link>
        </div>

      </div>
    </main>
  )
}
