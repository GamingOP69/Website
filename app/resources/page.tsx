import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import AdContainer from '../../components/AdContainer'
import { SITE_URL, SOCIAL_LINKS } from '../../lib/site'

export const metadata: Metadata = {
  title: 'Creator Resources - GamingOP',
  description:
    'A practical GamingOP resource hub with official links, community help, launch notes, and honest roadmap details for future tools and merch.',
  alternates: {
    canonical: `${SITE_URL}/resources`,
  },
}

const resourceCards = [
  {
    title: 'Start here',
    body: 'Visit the home page for the current overview, then jump to YouTube, the Minecraft server status, or the guides section depending on what you need.',
    href: '/',
    label: 'Open home',
  },
  {
    title: 'Community help',
    body: 'The Discord invite and contact form are the two fastest ways to reach GamingOP if something on the site is unclear or broken.',
    href: '/#contact',
    label: 'Go to contact',
  },
  {
    title: 'Tools',
    body: 'The live tools are browser-based and lightweight. They are meant to be useful without forcing a file upload or account creation.',
    href: '/tools',
    label: 'Open tools',
  },
  {
    title: 'Merch status',
    body: 'The shop page is only informational for now. It explains what a real launch would need and how to avoid fake store links.',
    href: '/shop',
    label: 'Open merch lab',
  },
]

const valueChecks = [
  'Original pages are written for GamingOP visitors instead of copying a template or republishing scraped content.',
  'Planned features are labeled as planned so the site does not confuse future ideas with live services.',
  'Official links are centralized to reduce the chance of fans landing on fake profiles or unofficial stores.',
  'The site focuses on practical help: videos, server support, guides, browser tools, and clear launch information.',
]

const roadmap = [
  {
    title: 'Image to text',
    text: 'A future OCR helper could be added if it can run locally or stay lightweight enough for the free tier.',
  },
  {
    title: 'File type checker',
    text: 'This would help visitors understand what they are uploading or sharing before they hand a file to someone else.',
  },
]

export default function ResourcesPage() {
  return (
    <main className="py-6 sm:py-10 space-y-8">
      <section className="content-band p-5 sm:p-8">
        <p className="eyebrow">Useful public hub</p>
        <h1 className="mt-3 heading-xl text-white">Creator Resources</h1>
        <p className="mt-3 max-w-3xl text-sm sm:text-base leading-7 text-gray-300">
          This page pulls the useful parts of the site into one place so visitors can find real help fast: official links,
          community access, live tools, and a transparent roadmap for what is still being planned.
        </p>
      </section>

      <AdContainer placement="top" />

      <section className="grid gap-4 sm:grid-cols-2">
        {resourceCards.map((card) => {
          const body = (
            <div className="surface h-full p-5 sm:p-6 transition-colors hover:border-primary/60">
              <h2 className="text-lg font-bold text-white">{card.title}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-400">{card.body}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-primary">{card.label}</span>
            </div>
          )

          return (
            <Link key={card.title} href={card.href} className="block h-full no-underline">
              {body}
            </Link>
          )
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="surface p-5 sm:p-6">
          <h2 className="heading-md text-white">Why this site has value</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-300">
            {valueChecks.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
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
          </div>
        </aside>
      </section>

      <section className="surface p-5 sm:p-6">
        <h2 className="heading-md text-white">Roadmap ideas</h2>
        <p className="mt-3 text-sm leading-6 text-gray-400">
          These are future ideas, not live features. They are listed here so the site stays honest about what exists now and what may come later.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {roadmap.map((item) => (
            <div key={item.title} className="rounded-lg border border-gray-800 bg-black/20 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <AdContainer placement="bottom" />
    </main>
  )
}