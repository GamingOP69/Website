import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { SITE_URL } from '../../lib/site'

export const metadata: Metadata = {
  title: 'Free Browser Tools - GamingOP',
  description:
    'Useful privacy-friendly GamingOP tools for creators and players, including local image conversion and text cleanup.',
  alternates: {
    canonical: `${SITE_URL}/tools`,
  },
}

const tools = [
  {
    title: 'Image Converter',
    href: '/tools/image-converter',
    status: 'Live',
    description: 'Convert and resize PNG, JPEG, and WebP images locally in your browser. No upload required.',
  },
  {
    title: 'Text Toolkit',
    href: '/tools/text-tools',
    status: 'Live',
    description: 'Count words, clean descriptions, create URL slugs, and format creator text quickly.',
  },
  {
    title: 'Peer File Transfer',
    href: '',
    status: 'Planned',
    description:
      'A future peer-to-peer transfer tool is being explored. The idea is code-based handoff with no file storage on the site itself.',
  },
]

const designNotes = [
  'Browser-only tools keep the site lighter for free-tier hosting and safer for visitors on shared devices.',
  'The planned file transfer tool would need a clear code handoff, short-lived signaling, and no permanent file uploads.',
  'Every tool page is meant to do one real task well instead of pretending to be a generic app directory.',
]

export default function ToolsPage() {
  return (
    <main className="py-6 sm:py-10 space-y-8">
      <section className="content-band p-5 sm:p-8">
        <p className="eyebrow">Useful public tools</p>
        <h1 className="mt-3 heading-xl text-white">Creator and Gaming Tools</h1>
        <p className="mt-3 max-w-3xl text-sm sm:text-base leading-7 text-gray-300">
          Lightweight tools built for a free-tier deployment: browser-based, privacy-friendly, and useful even when the
          YouTube API or server widgets are unavailable.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {tools.map((tool) => {
          const card = (
            <div className="surface h-full p-5 sm:p-6 transition-colors hover:border-primary/60">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-white">{tool.title}</h2>
                <span className="rounded-md border border-gray-700 px-2 py-1 text-xs text-gray-400">{tool.status}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-400">{tool.description}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-primary">
                {tool.href ? 'Open tool' : 'Coming later'}
              </span>
            </div>
          )

          if (!tool.href) return <div key={tool.title}>{card}</div>

          return (
            <Link key={tool.title} href={tool.href} className="block h-full no-underline">
              {card}
            </Link>
          )
        })}
      </section>

      <section className="surface p-5 sm:p-6">
        <h2 className="heading-md text-white">Privacy-first design</h2>
        <p className="mt-3 text-sm leading-6 text-gray-400">
          The live tools run in the browser and do not upload your selected images or pasted text. That keeps hosting
          costs low and makes the tools safer for visitors on shared devices.
        </p>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-300">
          {designNotes.map((note) => (
            <li key={note} className="flex gap-3">
              <span className="mt-2 h-2 w-2 flex-none rounded-full bg-primary" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>

    </main>
  )
}
