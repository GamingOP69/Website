import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AdBanner from '../../../components/AdBanner'
import { getGuide, guides } from '../../../lib/guides'
import { AD_SLOTS, SITE_URL } from '../../../lib/site'

type GuideParams = { slug: string }

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: { params: Promise<GuideParams> }): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return { title: 'Guide Not Found - GamingOP' }

  return {
    title: `${guide.title} - GamingOP`,
    description: guide.description,
    alternates: {
      canonical: `${SITE_URL}/guides/${guide.slug}`,
    },
    openGraph: {
      title: `${guide.title} - GamingOP`,
      description: guide.description,
      url: `${SITE_URL}/guides/${guide.slug}`,
      type: 'article',
    },
  }
}

export default async function GuidePage({ params }: { params: Promise<GuideParams> }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()

  return (
    <main className="py-6 sm:py-10">
      <article className="mx-auto max-w-3xl space-y-6">
        <nav className="text-sm text-gray-500">
          <Link href="/guides" className="no-underline hover:text-primary">
            Guides
          </Link>
          <span className="px-2">/</span>
          <span>{guide.category}</span>
        </nav>

        <header className="content-band p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="rounded-md bg-primary/10 px-2 py-1 font-semibold text-primary">{guide.category}</span>
            <span>{guide.readingTime}</span>
            <span>Updated {guide.updated}</span>
          </div>
          <h1 className="mt-4 heading-xl text-white">{guide.title}</h1>
          <p className="mt-3 text-sm sm:text-base leading-7 text-gray-300">{guide.description}</p>
        </header>

        <AdBanner adSlot={AD_SLOTS.guideDetailTop} adFormat="horizontal" className="my-3" />

        <div className="surface p-5 sm:p-8">
          <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-p:leading-7 prose-h2:text-white">
            {guide.sections.map((section, index) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {index === Math.floor(guide.sections.length / 2) - 1 && (
                  <div className="my-6">
                    <AdBanner adSlot={AD_SLOTS.guideDetailMiddle} adFormat="horizontal" />
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>

        {guide.checklist ? (
          <section className="surface p-5 sm:p-8">
            <h2 className="heading-md text-white">Quick Checklist</h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-300">
              {guide.checklist.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <AdBanner adSlot={AD_SLOTS.guideDetailBottom} adFormat="horizontal" className="my-3" />

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/guides" className="btn btn-ghost no-underline">
            Back to guides
          </Link>
          <Link href="/tools" className="btn btn-primary no-underline">
            Open community tools
          </Link>
        </div>
      </article>
    </main>
  )
}
