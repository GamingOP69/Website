import React from 'react'
import AdBanner from '../../components/AdBanner'
import Link from 'next/link'
import ToolsClientWrapper from '../../components/ToolsClientWrapper'

export const metadata = {
  title: 'Tools – GamingOP',
  description: 'Free, client-side tools: Image to Text OCR and Peer-to-Peer File Transfer (no storage).'
}

export default function ToolsPage() {
  return (
    <main className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="glass rounded-2xl p-6">
          <h1 className="heading-xl">Tools</h1>
          <p className="text-gray-400">Useful, privacy-first utilities for the community — runs in your browser, no server storage.</p>
          <div className="mt-4">
            <Link href="/" className="text-sm text-primary hover:text-accent no-underline">← Back to Home</Link>
          </div>
        </header>

        {/* Ad placement */}
        <AdBanner adSlot="tools-0001" adFormat="horizontal" className="my-2" />

        <ToolsClientWrapper />

        {/* Ad placement */}
        <AdBanner adSlot="tools-0002" adFormat="auto" className="my-2" />

        <section className="glass rounded-xl p-4 text-sm text-gray-400">
          <h3 className="font-semibold text-white mb-2">Notes & Privacy</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>No files are uploaded to our servers in the P2P flow — you exchange encoded session data only.</li>
            <li>OCR runs locally in your browser; images are not sent to any third party.</li>
            <li>For large files or frequent transfers, consider using a dedicated service; this tool prioritizes privacy and simplicity.</li>
          </ul>
        </section>
      </div>
    </main>
  )
}
