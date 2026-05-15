import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { SITE_URL, SOCIAL_LINKS } from '../../lib/site'

export const metadata: Metadata = {
  title: 'Merch Lab - GamingOP',
  description:
    'GamingOP merch is not selling products yet. This page explains the future store plan and safe buying checklist.',
  alternates: {
    canonical: `${SITE_URL}/shop`,
  },
  robots: {
    index: true,
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

const merchIdeas = [
  {
    title: 'Starter items',
    text: 'If the store opens, simple logo stickers, shirts, and community drops are the most realistic first products.',
  },
  {
    title: 'Safety checks',
    text: 'Only the website, YouTube channel, or Discord should announce a launch. Random DMs and lookalike profiles are not official.',
  },
  {
    title: 'Store quality',
    text: 'A real launch should include product photos, pricing, shipping details, refund policy, and a checkout flow that works on mobile.',
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
          <h2 className="heading-md text-white">What a real launch needs</h2>
          <p className="mt-3 text-sm leading-6 text-gray-400">
            The future store should feel like a proper product page. That means honest photos, a clear return policy, and a checkout flow that works on smaller screens.
          </p>
          <div className="mt-5 grid gap-3">
            {merchIdeas.map((idea) => (
              <div key={idea.title} className="rounded-lg border border-gray-800 bg-black/20 p-4">
                <h3 className="text-sm font-semibold text-white">{idea.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">{idea.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface p-5 sm:p-6">
        <h2 className="heading-md text-white">Current status</h2>
        <div className="mt-4 rounded-lg border border-gray-800 bg-black/20 p-4 text-sm leading-6 text-gray-300">
          No products for sale, no cart, no checkout, and no payment collection on this page yet. The page exists to set expectations, reduce scam risk, and give the community a clear place to check for future updates.
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
    </main>
  )
}
