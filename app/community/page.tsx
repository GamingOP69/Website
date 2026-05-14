import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import CollapseList from '../../components/CollapseList'
import AdBanner from '../../components/AdBanner'

export const metadata: Metadata = {
  title: 'Community – GamingOP',
  description: 'Join the GamingOP community! Discord server, events, giveaways, and exclusive member benefits for gamers.',
}

export default function CommunityPage() {
  return (
    <main className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-primary transition no-underline">← Back to Home</Link>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-10 space-y-8">
          <div>
            <h1 className="heading-xl text-white mb-2">Join Our Community</h1>
            <p className="text-gray-400 text-sm">Connect with gamers, participate in events, and be part of the GamingOP family</p>
          </div>

          {/* Discord Banner */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center space-y-4">
            <div className="text-6xl">💜</div>
            <div>
              <h2 className="heading-lg text-white mb-2">Join Our Discord Server</h2>
              <p className="text-gray-300 mb-6">
                Our Discord is the heart of our community! Chat with members, get gaming tips, participate in events, and stay updated on server announcements.
              </p>
              <a
                href="https://discord.gg/gamingop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition no-underline"
              >
                Join Discord Server
              </a>
            </div>
          </div>

          {/* Community Features */}
          <section className="space-y-4">
            <h2 className="heading-lg text-white">What&apos;s Inside Our Community?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: '🎮',
                  title: 'Gaming Channels',
                  desc: 'Dedicated channels for Minecraft, Free Fire, Valorant, and other games',
                },
                {
                  icon: '📢',
                  title: 'Announcements',
                  desc: 'Stay updated on new content, streams, and server maintenance',
                },
                {
                  icon: '🎯',
                  title: 'Events & Tournaments',
                  desc: 'Regular gaming events, competitions, and community challenges',
                },
                {
                  icon: '💬',
                  title: 'Discussion Forums',
                  desc: 'Share tips, strategies, and gaming experiences with the community',
                },
                {
                  icon: '🎁',
                  title: 'Giveaways',
                  desc: 'Win exclusive rewards and prizes through community contests',
                },
                {
                  icon: '👥',
                  title: 'Networking',
                  desc: 'Connect with other gamers, streamers, and content creators',
                },
              ].map((feature, idx) => (
                <div key={idx} className="glass p-4 rounded-lg hover:bg-white/10 transition">
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Community Rules */}
          <section className="space-y-4">
            <h2 className="heading-lg text-white">Community Guidelines</h2>
            <div className="space-y-3">
              {[
                'Be respectful to all members, regardless of skill level or background',
                'No harassment, bullying, or discriminatory language of any kind',
                'Keep conversations appropriate and free from hate speech',
                'No spam, excessive self-promotion, or advertising without permission',
                'Follow channel-specific rules and moderator instructions',
                'Report rule violations to moderators rather than handling them publicly',
                'Have fun and support fellow community members!',
              ].map((rule, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">✓</span>
                  <p className="text-gray-300">{rule}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Events Section */}
          <section className="space-y-4">
            <h2 className="heading-lg text-white">Upcoming Events</h2>
            <div className="my-4">
              <AdBanner adSlot="community-0001" adFormat="horizontal" className="my-2" />
            </div>
            <CollapseList initial={2}>
              {[
                {
                  title: 'Minecraft Building Contest',
                  date: 'Every Friday',
                  desc: 'Show off your creative building skills and win prizes',
                },
                {
                  title: 'Free Fire Squad Wars',
                  date: 'Saturdays & Sundays',
                  desc: 'Team-based competitions with exclusive rewards',
                },
                {
                  title: 'Valorant Ranked Tournament',
                  date: 'Bi-weekly',
                  desc: 'Competitive tournament for all skill levels',
                },
                {
                  title: 'Community Game Night',
                  date: 'Wednesdays',
                  desc: 'Play various games together and have fun with the community',
                },
              ].map((event, idx) => (
                <div key={idx} className="glass p-4 rounded-lg">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-semibold text-white">{event.title}</h3>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded whitespace-nowrap">{event.date}</span>
                  </div>
                  <p className="text-sm text-gray-400">{event.desc}</p>
                </div>
              ))}
            </CollapseList>
          </section>

          {/* Member Benefits */}
          <section className="space-y-4">
            <h2 className="heading-lg text-white">Member Benefits</h2>
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6 space-y-4">
              <p className="text-gray-300">Active community members enjoy:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Access to exclusive guides and tips',
                  'Early announcements for new content',
                  'Special roles and recognition',
                  'Opportunity to suggest content ideas',
                  'First access to beta features',
                  'Community support and mentorship',
                ].map((benefit, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-accent">★</span>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center space-y-4 pt-4 border-t border-gray-700">
            <p className="text-gray-300">Ready to join?</p>
            <a
              href="https://discord.gg/gamingop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition no-underline"
            >
              Join Discord Now
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
