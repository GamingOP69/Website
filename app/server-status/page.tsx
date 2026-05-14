import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import ServerStatus from '../../components/ServerStatus'
import { MINECRAFT_SERVER, SITE_URL, SOCIAL_LINKS } from '../../lib/site'

export const metadata: Metadata = {
  title: 'Minecraft Server Status - GamingOP',
  description: `Check the live status of the GamingOP Minecraft server and learn how to join ${MINECRAFT_SERVER}.`,
  alternates: {
    canonical: `${SITE_URL}/server-status`,
  },
}

const rules = [
  'No hacking, cheating, or unfair client modifications.',
  'No harassment, hate speech, spam, or personal attacks.',
  'Do not grief builds, steal items, or abuse other players.',
  'Follow event rules and moderator instructions.',
  'Use Discord support with screenshots and exact error messages when you need help.',
]

export default function ServerPage() {
  return (
    <main className="py-6 sm:py-10 space-y-8">
      <section className="content-band p-5 sm:p-8">
        <p className="eyebrow">Live Minecraft hub</p>
        <h1 className="mt-3 heading-xl text-white">GamingOP Minecraft Server</h1>
        <p className="mt-3 max-w-3xl text-sm sm:text-base leading-7 text-gray-300">
          Check current server status, copy the server address, read the join steps, and use official support links if
          your client cannot connect.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <ServerStatus server={MINECRAFT_SERVER} showDetails />


          <div className="surface p-5 sm:p-6">
            <h2 className="heading-md text-white">How to join</h2>
            <ol className="mt-4 space-y-4 text-sm sm:text-base text-gray-300">
              {[
                'Open Minecraft and go to Multiplayer.',
                'Choose Add Server.',
                `Paste the server address: ${MINECRAFT_SERVER}`,
                'Save it, refresh the server list, then join when the status is online.',
                'If it fails, check the troubleshooting guide before changing many settings.',
              ].map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-primary/20 text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <Link href="/guides/minecraft-server-join-troubleshooting" className="btn btn-ghost mt-5 no-underline">
              Open troubleshooting guide
            </Link>
          </div>

          <div className="surface p-5 sm:p-6">
            <h2 className="heading-md text-white">Server actions</h2>
            <div className="mt-4 space-y-3">
              <a href={SOCIAL_LINKS.minecraftVote} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full no-underline">
                Vote for the server
              </a>
              <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full no-underline">
                Get help on Discord
              </a>
            </div>
          </div>

        </div>

        <aside className="space-y-5">
          <div className="surface p-5 sm:p-6">
            <h2 className="heading-md text-white">Server rules</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-300">
              {rules.map((rule) => (
                <li key={rule} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-primary" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </main>
  )
}
