import React from 'react'
import { Metadata } from 'next'
import ServerStatus from '../../components/ServerStatus'

export const metadata: Metadata = {
  title: 'Server Status – GamingOP',
  description: 'Check the live status of the GamingOP Minecraft server — mc.gamingop.qzz.io',
}

export default function ServerPage() {
  return (
    <main className="py-8 sm:py-12">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="heading-xl text-white mb-2">Minecraft Server</h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Live status of the GamingOP Minecraft server. Status refreshes every 30 seconds.
          </p>
        </div>

        {/* Status widget */}
        <ServerStatus server="mc.gamingop.qzz.io" showDetails />

        {/* How to join */}
        <div className="glass rounded-2xl p-6 sm:p-8 space-y-5">
          <h2 className="heading-md text-white">How to Join</h2>
          <ol className="space-y-4 text-sm sm:text-base text-gray-300">
            {[
              'Launch Minecraft (Java or Bedrock Edition).',
              'Click Multiplayer on the main menu.',
              'Click Add Server.',
              <>Enter the server address: <span className="font-mono text-primary font-bold">mc.gamingop.qzz.io</span></>,
              'Click Done, then select the server and click Join Server.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Server rules */}
        <div className="glass rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="heading-md text-white">Server Rules</h2>
          <ul className="space-y-2 text-sm sm:text-base text-gray-300">
            {[
              '🚫 No hacking, cheating, or unauthorized mods.',
              '🤝 Be respectful — no harassment or hate speech.',
              '🏗️ No griefing other players\' builds.',
              '📢 Follow moderator instructions at all times.',
              '🎮 Have fun and enjoy the community!',
            ].map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>

        {/* Discord CTA */}
        <div className="glass rounded-2xl p-6 sm:p-8 text-center">
          <p className="text-gray-300 mb-4 text-sm sm:text-base">
            Having trouble connecting? Ask for help in our Discord server.
          </p>
          <a
            href="https://discord.gg/Ezd32s4P8H"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary no-underline"
          >
            💬 Join Discord for Support
          </a>
        </div>

      </div>
    </main>
  )
}
