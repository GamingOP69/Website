import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import PeerFileTransferTool from '../../../components/PeerFileTransferTool'
import { SITE_URL } from '../../../lib/site'

export const metadata: Metadata = {
  title: 'Peer File Transfer - GamingOP Tools',
  description:
    'Transfer files directly between two browsers with manual WebRTC codes. No server storage, no account, and no upload queue on GamingOP.',
  alternates: {
    canonical: `${SITE_URL}/tools/peer-file-transfer`,
  },
}

export default function PeerFileTransferPage() {
  return (
    <main className="py-6 sm:py-10 space-y-6">
      <nav className="text-sm text-gray-500">
        <Link href="/tools" className="no-underline hover:text-primary">
          Tools
        </Link>
        <span className="px-2">/</span>
        <span>Peer File Transfer</span>
      </nav>

      <section className="content-band p-5 sm:p-8">
        <p className="eyebrow">Browser-to-browser transfer</p>
        <h1 className="mt-3 heading-xl text-white">Peer File Transfer</h1>
        <p className="mt-3 max-w-3xl text-sm sm:text-base leading-7 text-gray-300">
          Send a file directly between two browsers using WebRTC and copy/paste session codes. The site does not store the file, and there is no upload queue to wait in.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="surface p-5">
          <h2 className="font-bold text-white">1. Create an offer</h2>
          <p className="mt-2 text-sm leading-6 text-gray-400">The sender generates a code and shares it with the receiver.</p>
        </div>
        <div className="surface p-5">
          <h2 className="font-bold text-white">2. Return an answer</h2>
          <p className="mt-2 text-sm leading-6 text-gray-400">The receiver pastes the code, creates an answer, and sends it back.</p>
        </div>
        <div className="surface p-5">
          <h2 className="font-bold text-white">3. Send the file</h2>
          <p className="mt-2 text-sm leading-6 text-gray-400">After the connection opens, the sender chooses a file and starts the transfer.</p>
        </div>
      </section>

      <PeerFileTransferTool />

      <section className="surface p-5 sm:p-6">
        <h2 className="heading-md text-white">Notes</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-300">
          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 flex-none rounded-full bg-primary" />
            <span>This is a direct connection tool, so it works best on modern browsers with a stable network.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 flex-none rounded-full bg-primary" />
            <span>Because there is no file storage on the site, both browsers need to stay open until the transfer finishes.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 flex-none rounded-full bg-primary" />
            <span>If your network blocks direct WebRTC connections, you may need a less restricted network for the transfer to connect.</span>
          </li>
        </ul>
      </section>
    </main>
  )
}