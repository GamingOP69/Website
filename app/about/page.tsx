import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { MINECRAFT_SERVER, SITE_URL, SOCIAL_LINKS } from '../../lib/site'

export const metadata: Metadata = {
  title: 'About GamingOP',
  description:
    'Learn about GamingOP: a gaming YouTuber, Minecraft community builder, coder, and creator of lightweight web tools.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
}

const focusAreas = [
  {
    title: 'Gaming videos',
    text: 'Gameplay, highlights, creator experiments, and community-driven video ideas through the official YouTube channel.',
  },
  {
    title: 'Minecraft community',
    text: 'A public server hub with live status, voting link, join help, and a clear route to Discord support.',
  },
  {
    title: 'Coder tools',
    text: 'Small browser tools that are useful to visitors and careful with free-tier hosting limits.',
  },
  {
    title: 'Written guides',
    text: 'Original support and creator guides so the website has value even when someone is not watching a video.',
  },
]

const trustNotes = [
  {
    title: 'Who',
    text: 'GamingOP publishes the site content, the guides, and the public community links that visitors see here.',
  },
  {
    title: 'How',
    text: 'The guides, tools, and status pages are built as first-party pages so the site is useful even without embeds or social feeds.',
  },
  {
    title: 'Why',
    text: 'The goal is to give visitors a clear reason to stay: learn something, use a tool, check the server, or find the official links.',
  },
]

const clarityPoints = [
  'Planned merch stays labeled as coming soon until there is a real store, product, and checkout flow.',
  'The tools are designed to run in the browser so visitors do not have to upload private images or text.',
  'The site links out to official social pages only, so people can avoid fake copies and unofficial stores.',
]

export default function About() {
  return (
    <main className="py-6 sm:py-10 space-y-8">
      <section className="content-band p-5 sm:p-8">
        <p className="eyebrow">About the creator</p>
        <h1 className="mt-3 heading-xl text-white">GamingOP</h1>
        <p className="mt-3 max-w-3xl text-sm sm:text-base leading-7 text-gray-300">
          GamingOP is a gaming YouTuber, Minecraft community builder, and coder. The website brings the public pieces
          together: videos, server links, original guides, tools, and official community destinations.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {focusAreas.map((area) => (
          <div key={area.title} className="surface p-5">
            <h2 className="font-bold text-white">{area.title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">{area.text}</p>
          </div>
        ))}  
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="surface p-5 sm:p-6">
          <h2 className="heading-md text-white">What this site is for</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-300">
            <p>
              The goal is to make GamingOP easier to explore without forcing visitors to jump between random links. A
              new visitor can find the channel, check the Minecraft server, read practical help pages, and use simple
              tools directly from the site.
            </p>
            <p>
              The site does not claim products, events, or social accounts that are not ready. Planned items are marked
              clearly, and pages with future-only information do not show manual ad placements.
            </p>
          </div>
        </div>

        <aside className="surface p-5 sm:p-6">
          <h2 className="heading-md text-white">Official links</h2>
          <div className="mt-4 space-y-3">
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full no-underline">
              YouTube
            </a>
            <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full no-underline">
              Discord
            </a>
            <a href={SOCIAL_LINKS.twitch} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full no-underline">
              Twitch
            </a>
            <a href={SOCIAL_LINKS.minecraftVote} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full no-underline">
              Vote for server
            </a>
          </div>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {trustNotes.map((item) => (
          <div key={item.title} className="surface p-5">
            <p className="eyebrow">{item.title}</p>
            <p className="mt-3 text-sm leading-6 text-gray-400">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="surface p-5 sm:p-6">
        <h2 className="heading-md text-white">What is intentionally not here</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-300">
          {clarityPoints.map((point) => (
            <li key={point} className="flex gap-3">
              <span className="mt-2 h-2 w-2 flex-none rounded-full bg-primary" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="surface p-5 sm:p-6">
        <h2 className="heading-md text-white">Minecraft server</h2>
        <p className="mt-3 text-sm leading-6 text-gray-400">
          Server IP: <span className="font-mono text-white">{MINECRAFT_SERVER}</span>. Use the server status page for
          connection checks and the Discord community for help when a launcher error needs human support.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/server-status" className="btn btn-primary no-underline">
            Check server status
          </Link>
          <Link href="/guides/minecraft-server-join-troubleshooting" className="btn btn-ghost no-underline">
            Read join guide
          </Link>
        </div>
      </section>
    </main>
  )
}
