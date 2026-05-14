import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import AdContainer from '../../components/AdContainer'
import { SITE_URL, SOCIAL_LINKS } from '../../lib/site'

export const metadata: Metadata = {
  title: 'Merch Lab - GamingOP',
  description:
    'GamingOP merch is not selling products yet. This page explains the future store plan and safe buying checklist.',
  alternates: {
    canonical: `${SITE_URL}/shop`,
  },
  robots: {
    index: false,
    follow: true,
  },
}

const principles = [
  'No checkout will appear until products, pricing, shipping, and return details are ready.',
  'Future product photos will show real items or clear mockups marked as mockups.',
  'Official announcements will come from the website, YouTube, or Discord links listed here.',
  'No one should pay through random DMs, copied profiles, or unofficial links.',
]

const faq = [
  {
    question: 'Is anything for sale yet?',
    answer: 'No. This page is only a future-facing info page until the real store setup exists.',
  },
  {
    question: 'How will launch be announced?',
    answer: 'Through the website, YouTube channel, and Discord server linked on this site.',
  },
  {
    question: 'What will make the store official?',
    answer: 'Real products, prices, shipping details, and a checkout flow that only appears when the store is ready.',
  },
]

export default function ShopPage() {
  return (
    <main className="py-6 sm:py-10 space-y-8">
      <section className="content-band p-5 sm:p-8">
        <p className="eyebrow">Coming later</p>
        <h1 className="mt-3 heading-xl text-white">GamingOP Merch Lab</h1>
        <p className="mt-3 max-w-3xl text-sm sm:text-base leading-7 text-gray-300">
          The official merch store is not open yet. This page is here so the community knows what is real, what is still
          being planned, and how to avoid fake links before products launch.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer" className="btn btn-primary no-underline">
            Follow updates on Discord
          </a>
          <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-ghost no-underline">
            Watch GamingOP on YouTube
          </a>
        </div>
      </section>

      <AdContainer placement="top" />

      <section className="grid gap-4 md:grid-cols-2">
        <div className="surface p-5 sm:p-6">
          <h2 className="heading-md text-white">Launch checklist</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-300">
            {principles.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface p-5 sm:p-6">
          <h2 className="heading-md text-white">What may come first</h2>
          <p className="mt-3 text-sm leading-6 text-gray-400">
            Early merch ideas may include creator logo stickers, simple shirts, and community event drops. Nothing is
            listed as available until real product details are ready.
          </p>
          <div className="mt-5 rounded-lg border border-gray-800 bg-black/20 p-4 text-sm text-gray-400">
            Current status: no products for sale, no cart, no checkout, and no payment collection on this page.
          </div>
        </div>
      </section>

      <section className="surface p-5 sm:p-6">
        <h2 className="heading-md text-white">Merch FAQ</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {faq.map((item) => (
            <div key={item.question} className="rounded-lg border border-gray-800 bg-black/20 p-4">
              <h3 className="text-sm font-semibold text-white">{item.question}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface p-5 sm:p-6">
        <h2 className="heading-md text-white">Official links</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-ghost no-underline">
            YouTube
          </a>
          <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer" className="btn btn-ghost no-underline">
            Discord
          </a>
          <Link href="/about" className="btn btn-ghost no-underline">
            About GamingOP
          </Link>
        </div>
      </section>

      <AdContainer placement="bottom" />
    </main>
  )
}
