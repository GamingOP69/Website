import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Gaming Guides & Tips – GamingOP',
  description: 'Comprehensive gaming guides, tips, and tutorials for Minecraft, Free Fire, Valorant, and more. Learn strategies from GamingOP experts.',
}

interface Guide {
  title: string
  description: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  icon: string
}

const guides: Guide[] = [
  {
    title: 'Minecraft Building Basics',
    description: 'Learn the fundamentals of building in Minecraft, including block selection, structure planning, and aesthetic design principles.',
    category: 'Minecraft',
    difficulty: 'Beginner',
    icon: '⛏️',
  },
  {
    title: 'Advanced Minecraft Redstone',
    description: 'Master redstone circuits, automatic farms, and complex mechanisms to automate your Minecraft experience.',
    category: 'Minecraft',
    difficulty: 'Advanced',
    icon: '⚙️',
  },
  {
    title: 'Minecraft Enchanting & Farming',
    description: 'Complete guide to enchanting gear, farming resources efficiently, and optimizing your gameplay progression.',
    category: 'Minecraft',
    difficulty: 'Intermediate',
    icon: '✨',
  },
  {
    title: 'Free Fire Beginner Guide',
    description: 'Start your Free Fire journey with controls, map knowledge, and basic combat strategies for new players.',
    category: 'Free Fire',
    difficulty: 'Beginner',
    icon: '🔥',
  },
  {
    title: 'Free Fire Pro Tips & Tactics',
    description: 'Advanced strategies, positioning tactics, and weapon meta for competitive Free Fire gameplay.',
    category: 'Free Fire',
    difficulty: 'Advanced',
    icon: '🎯',
  },
  {
    title: 'Valorant Weapon Guide',
    description: 'Understand Valorant\'s weapon economy, spray patterns, and how to master each weapon for ranked success.',
    category: 'Valorant',
    difficulty: 'Intermediate',
    icon: '🔫',
  },
  {
    title: 'Valorant Agent Selection',
    description: 'Learn about each Valorant agent, their abilities, and how to pick the right agent for your playstyle and team composition.',
    category: 'Valorant',
    difficulty: 'Intermediate',
    icon: '👤',
  },
  {
    title: 'Streaming Setup Guide',
    description: 'Everything you need to know to start streaming your gameplay, including equipment, software, and optimization tips.',
    category: 'Streaming',
    difficulty: 'Beginner',
    icon: '📹',
  },
  {
    title: 'Content Creation Basics',
    description: 'Learn how to create engaging gaming content for YouTube, including recording, editing, and thumbnails.',
    category: 'Content Creation',
    difficulty: 'Beginner',
    icon: '🎬',
  },
]

const getDifficultyColor = (difficulty: string) => {
  switch(difficulty) {
    case 'Beginner': return 'text-green-400'
    case 'Intermediate': return 'text-yellow-400'
    case 'Advanced': return 'text-red-400'
    default: return 'text-gray-400'
  }
}

export default function GuidesPage() {
  return (
    <main className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-primary transition no-underline">← Back to Home</Link>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="heading-xl text-white mb-2">Gaming Guides & Tips</h1>
            <p className="text-gray-400">Learn from our experts with comprehensive guides for all your favorite games and content creation.</p>
          </div>

          {/* Featured Guides */}
          <section className="space-y-4">
            <h2 className="heading-lg text-white">Featured Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {guides.slice(0, 4).map((guide, idx) => (
                <div
                  key={idx}
                  className="glass rounded-lg p-6 hover:bg-white/10 transition cursor-pointer group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition">{guide.icon}</div>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-white flex-1">{guide.title}</h3>
                      <span className={`text-xs font-semibold whitespace-nowrap ${getDifficultyColor(guide.difficulty)}`}>
                        {guide.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{guide.description}</p>
                    <div className="pt-2">
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{guide.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* All Guides */}
          <section className="space-y-4">
            <h2 className="heading-lg text-white">All Guides</h2>
            <div className="grid grid-cols-1 gap-3">
              {guides.map((guide, idx) => (
                <div
                  key={idx}
                  className="glass rounded-lg p-4 hover:bg-white/10 transition flex items-start gap-4 cursor-pointer group"
                >
                  <div className="text-3xl group-hover:scale-110 transition">{guide.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-white">{guide.title}</h3>
                      <span className={`text-xs font-semibold ${getDifficultyColor(guide.difficulty)}`}>
                        {guide.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{guide.description}</p>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{guide.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <div className="glass rounded-lg p-8 text-center space-y-4">
            <h2 className="heading-lg text-white">Want More Guides?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We&apos;re constantly creating new guides and tutorials. Subscribe to our YouTube channel to never miss a guide!
            </p>
            <a
              href="https://youtube.com/@gamingop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition no-underline"
            >
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
