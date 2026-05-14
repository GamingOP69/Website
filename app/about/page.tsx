import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About – GamingOP',
  description: 'Learn about GamingOP — a gaming content creator, Minecraft server owner, and community builder dedicated to creating high-quality gaming content and fostering a thriving community.',
}

export default function About() {
  return (
    <main className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Hero card */}
        <div className="glass rounded-2xl p-6 sm:p-10">
          <h1 className="heading-xl gradient-text mb-4">About GamingOP</h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
            GamingOP is a dedicated gaming content creator, Minecraft server owner, and community builder committed to creating high-quality gaming experiences. 
            We specialize in Minecraft survival and competitive play, Free Fire ranked gameplay, Valorant strategic content, and building an inclusive gaming community 
            where players of all skill levels can thrive and grow together.
          </p>
        </div>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="heading-lg text-primary">Our Mission</h2>
            <p className="text-gray-300">
              To create authentic, engaging gaming content that entertains, educates, and inspires the global gaming community. 
              We aim to foster a positive environment where gamers can connect, compete, and grow together.
            </p>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>✓ Produce high-quality gaming content</li>
              <li>✓ Build and maintain thriving gaming communities</li>
              <li>✓ Share gaming knowledge and expertise</li>
              <li>✓ Create inclusive and welcoming spaces</li>
            </ul>
          </div>

          <div className="glass rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="heading-lg text-accent">Our Vision</h2>
            <p className="text-gray-300">
              To become a recognized leader in gaming content creation and community building, known for authenticity, quality production, 
              and genuine care for our community members.
            </p>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>✓ Millions of engaged community members</li>
              <li>✓ Premium Minecraft servers</li>
              <li>✓ Educational gaming content</li>
              <li>✓ Global gaming events and tournaments</li>
            </ul>
          </div>
        </section>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { label: 'Community Members', value: '1M+', icon: '👥' },
            { label: 'Gaming Content', value: '500+', icon: '📺' },
            { label: 'Years of Expertise', value: '5+', icon: '⭐' },
          ].map((s) => (
            <div key={s.label} className="glass rounded-xl p-5 sm:p-6 text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <p className="text-lg font-bold text-white">{s.value}</p>
              <p className="text-sm text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* What We Create */}
        <div className="glass rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="heading-lg text-white">What We Create</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: '⛏️',
                title: 'Minecraft Content',
                desc: 'Survival guides, building tutorials, server gameplay, and competitive BedWars content',
              },
              {
                icon: '🔥',
                title: 'Free Fire Gaming',
                desc: 'Ranked gameplay, strategy guides, weapon reviews, and competitive highlights',
              },
              {
                icon: '🎯',
                title: 'Valorant Content',
                desc: 'Agent guides, weapon tutorials, ranked strategies, and competitive gameplay',
              },
              {
                icon: '📚',
                title: 'Gaming Guides',
                desc: 'Comprehensive guides on gaming strategies, tips, and best practices',
              },
              {
                icon: '🎮',
                title: 'Live Streams',
                desc: 'Regular live streams on the Minecraft server with community interaction',
              },
              {
                icon: '🏆',
                title: 'Community Events',
                desc: 'Tournaments, giveaways, and special events for community engagement',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gaming Expertise */}
        <div className="glass rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="heading-lg text-white">Gaming Expertise</h2>
          <p className="text-gray-300">
            With years of experience in competitive and casual gaming, we have developed deep expertise across multiple gaming platforms and genres. 
            Our knowledge spans from technical gameplay mechanics to community management and content creation best practices.
          </p>
          <div className="space-y-4">
            {[
              {
                game: 'Minecraft',
                expertise: 'Survival, Competitive BedWars, Redstone Engineering, Building Architecture',
              },
              {
                game: 'Free Fire',
                expertise: 'Ranked Gameplay, Squad Strategies, Weapon Meta, Competitive Tactics',
              },
              {
                game: 'Valorant',
                expertise: 'Agent Selection, Weapon Spray Control, Map Knowledge, Ranked Strategy',
              },
              {
                game: 'Content Creation',
                expertise: 'Video Editing, Streaming, Community Management, Audience Engagement',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-white/5 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-primary mb-2">{item.game}</h3>
                <p className="text-sm text-gray-400">{item.expertise}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Minecraft Server Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="heading-md text-white">🟩 Minecraft Server</h2>
            <p className="text-gray-300 text-sm sm:text-base">
              The GamingOP Minecraft server runs 24/7 and is open to all community members. Our server features:
            </p>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>✓ Survival and BedWars game modes</li>
              <li>✓ Active moderation team</li>
              <li>✓ Weekly community events</li>
              <li>✓ Ranks and achievements</li>
              <li>✓ Discord integration</li>
              <li>✓ Whitelist verification system</li>
            </ul>
            <div className="bg-black/30 rounded-lg p-4 space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Server Address</p>
              <p className="font-mono text-primary font-bold text-lg break-all">mc.gamingop.qzz.io</p>
            </div>
            <Link href="/server-status" className="inline-block btn btn-primary text-sm no-underline">
              Check Server Status →
            </Link>
          </div>

          <div className="glass rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="heading-md text-white">Community Standards</h2>
            <p className="text-gray-300 text-sm sm:text-base">
              We maintain high standards for our community to ensure everyone has a positive experience.
            </p>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>✓ Welcoming to all skill levels</li>
              <li>✓ Zero tolerance for harassment</li>
              <li>✓ Fair and consistent moderation</li>
              <li>✓ Regular community feedback</li>
              <li>✓ Transparent communication</li>
              <li>✓ Inclusive and diverse community</li>
            </ul>
            <Link href="/community" className="inline-block btn btn-primary text-sm no-underline">
              Join Our Community →
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

        {/* Values & Culture */}
        <div className="glass rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="heading-lg text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: '🤝',
                title: 'Community First',
                desc: 'Our community is at the heart of everything we do',
              },
              {
                icon: '✨',
                title: 'Quality Content',
                desc: 'We never compromise on the quality of our content',
              },
              {
                icon: '🎯',
                title: 'Authenticity',
                desc: 'We are genuine and transparent with our community',
              },
              {
                icon: '🚀',
                title: 'Continuous Growth',
                desc: 'We constantly improve and evolve',
              },
            ].map((value, idx) => (
              <div key={idx} className="p-4 bg-white/5 rounded-lg">
                <div className="text-3xl mb-2">{value.icon}</div>
                <h3 className="font-semibold text-white mb-1">{value.title}</h3>
                <p className="text-sm text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="glass rounded-2xl p-6 sm:p-8 text-center space-y-4">
          <h2 className="heading-md text-white">Business Inquiries & Collaborations</h2>
          <p className="text-gray-400 text-sm sm:text-base">
            We&apos;re always interested in collaborations, sponsorships, and partnership opportunities. Reach out to discuss how we can work together!
          </p>
          <Link href="/#contact" className="inline-block btn btn-primary no-underline">
            Get In Touch
          </Link>
        </div>

      </div>
    </main>
  )
}
