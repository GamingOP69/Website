import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import ImageConverterTool from '../../../components/ImageConverterTool'
import { SITE_URL } from '../../../lib/site'

export const metadata: Metadata = {
  title: 'Local Image Converter - GamingOP Tools',
  description:
    'Convert, resize, and compress PNG, JPEG, and WebP images locally in your browser without uploading files.',
  alternates: {
    canonical: `${SITE_URL}/tools/image-converter`,
  },
}

export default function ImageConverterPage() {
  return (
    <main className="py-6 sm:py-10 space-y-6">
      <nav className="text-sm text-gray-500">
        <Link href="/tools" className="no-underline hover:text-primary">
          Tools
        </Link>
        <span className="px-2">/</span>
        <span>Image Converter</span>
      </nav>

      <section className="content-band p-5 sm:p-8">
        <p className="eyebrow">No upload required</p>
        <h1 className="mt-3 heading-xl text-white">Image Converter</h1>
        <p className="mt-3 max-w-3xl text-sm sm:text-base leading-7 text-gray-300">
          Convert screenshots, thumbnails, and community images between PNG, JPEG, and WebP. The file stays on your
          device, which keeps the site fast and avoids storing visitor uploads.
        </p>
      </section>

      <ImageConverterTool />
    </main>
  )
}
