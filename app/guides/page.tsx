import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import AdBanner from '../../components/AdBanner'
import { AD_SLOTS, SITE_URL } from '../../lib/site'
import { guides } from '../../lib/guides'

export const metadata: Metadata = {
  title: 'Gaming Guides - GamingOP',
  description:
    'Original GamingOP guides for Minecraft server support, gaming content creation, fair play, and YouTube publishing.',
  alternates: {
    canonical: `${SITE_URL}/guides`,
  },
}

export default function GuidesPage() {
  return (
    <main className="py-6 sm:py-10 space-y-8">
      <section className="content-band p-5 sm:p-8">
        <p className="eyebrow">Original resources</p>
        <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <div>
            <h1 className="heading-xl text-white">GamingOP Guides</h1>
            <p className="mt-3 max-w-3xl text-sm sm:text-base leading-7 text-gray-300">
              Practical gaming and creator guides written for the GamingOP community. These pages add context beyond
              embedded videos: server help, safer community rules, content workflow, and low-lag recording advice.
            </p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-black/20 p-4 text-sm text-gray-400">
            <strong className="block text-white">No copied articles.</strong>
            Each guide is written as first-party site content and will be expanded as new questions come from the community.
          </div>
        </div>
      </section>

      <AdBanner adSlot={AD_SLOTS.guidesTop} adFormat="horizontal" className="my-3" />

      <section className="grid gap-4 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="surface block p-5 sm:p-6 no-underline transition-colors hover:border-primary/60"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span className="rounded-md bg-primary/10 px-2 py-1 font-semibold text-primary">{guide.category}</span>
              <span>{guide.readingTime}</span>
              <span>{guide.updated}</span>
            </div>
            <h2 className="mt-4 text-lg font-bold leading-snug text-white">{guide.title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">{guide.description}</p>
            <span className="mt-5 inline-flex text-sm font-semibold text-primary">Read guide</span>
          </Link>
        ))}
      </section>

      <AdBanner adSlot={AD_SLOTS.guidesBottom} adFormat="horizontal" className="my-3" />
    </main>
  )
}
