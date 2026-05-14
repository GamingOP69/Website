"use client"

import React from 'react'
import TesseractOCR from './TesseractOCR'
import P2PShare from './P2PShare'

export default function ToolsClientWrapper() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass rounded-xl p-4">
        <h2 className="heading-md mb-3">Image → Text (OCR)</h2>
        <p className="text-sm text-gray-400 mb-4">Extract text from images entirely in your browser using client-side OCR.</p>
        <TesseractOCR />
      </div>

      <div className="glass rounded-xl p-4">
        <h2 className="heading-md mb-3">Peer-to-Peer File Transfer</h2>
        <p className="text-sm text-gray-400 mb-4">Create a session code and transfer files directly to another browser — no files are stored on our servers.</p>
        <P2PShare />
      </div>
    </section>
  )
}
