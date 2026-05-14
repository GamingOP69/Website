import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import TextToolkit from '../../../components/TextToolkit'
import { SITE_URL } from '../../../lib/site'

export const metadata: Metadata = {
  title: 'Text Toolkit - GamingOP Tools',
  description:
    'Local text tools for creators: word counts, reading time, slug generation, and quick formatting.',
  alternates: {
    canonical: `${SITE_URL}/tools/text-tools`,
  },
}

export default function TextToolsPage() {
  return (
    <main className="py-6 sm:py-10 space-y-6">
      <nav className="text-sm text-gray-500">
        <Link href="/tools" className="no-underline hover:text-primary">
          Tools
        </Link>
        <span className="px-2">/</span>
        <span>Text Toolkit</span>
      </nav>

      <section className="content-band p-5 sm:p-8">
        <p className="eyebrow">Creator utility</p>
        <h1 className="mt-3 heading-xl text-white">Text Toolkit</h1>
        <p className="mt-3 max-w-3xl text-sm sm:text-base leading-7 text-gray-300">
          A fast helper for video titles, Discord announcements, page drafts, and descriptions. Everything runs locally
          in the browser.
        </p>
      </section>

      <TextToolkit />
    </main>
  )
}
