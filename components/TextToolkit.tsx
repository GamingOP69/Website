'use client'

import React, { useMemo, useState } from 'react'

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length
}

export default function TextToolkit() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState('')

  const stats = useMemo(() => {
    const words = countWords(text)
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const sentences = text.split(/[.!?]+/).map((item) => item.trim()).filter(Boolean).length
    const minutes = Math.max(1, Math.ceil(words / 220))

    return { words, characters, charactersNoSpaces, sentences, minutes }
  }, [text])

  async function copyValue(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(label)
      window.setTimeout(() => setCopied(''), 1500)
    } catch {
      setCopied('Copy failed')
    }
  }

  const outputs = [
    { label: 'Slug', value: slugify(text) },
    { label: 'Uppercase', value: text.toUpperCase() },
    { label: 'Lowercase', value: text.toLowerCase() },
    { label: 'Trimmed', value: text.trim().replace(/\s+/g, ' ') },
  ]

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="surface p-4 sm:p-6 space-y-5">
        <div>
          <h2 className="heading-md text-white">Text Toolkit</h2>
          <p className="mt-2 text-sm text-gray-400">
            Clean titles, count words, create URL slugs, and format text locally in your browser.
          </p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-gray-300">Paste text</span>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={12}
            className="w-full resize-y"
            placeholder="Paste a video title, description, guide draft, or announcement..."
          />
        </label>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <Stat label="Words" value={String(stats.words)} />
          <Stat label="Characters" value={String(stats.characters)} />
          <Stat label="No spaces" value={String(stats.charactersNoSpaces)} />
          <Stat label="Sentences" value={String(stats.sentences)} />
          <Stat label="Read time" value={`${stats.minutes} min`} />
        </div>
      </section>

      <aside className="surface p-4 sm:p-6 space-y-4">
        <h2 className="heading-md text-white">Quick outputs</h2>
        {outputs.map((item) => (
          <div key={item.label} className="rounded-lg border border-gray-800 bg-black/20 p-3">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-xs uppercase text-gray-500">{item.label}</p>
              <button
                type="button"
                onClick={() => copyValue(item.label, item.value)}
                disabled={!item.value}
                className="rounded-md border border-gray-700 px-2 py-1 text-xs text-gray-300 hover:border-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copy
              </button>
            </div>
            <p className="min-h-10 break-words text-sm text-gray-300">{item.value || 'Waiting for text...'}</p>
          </div>
        ))}
        {copied ? <p className="text-sm text-primary">{copied}</p> : null}
      </aside>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-black/20 p-3 text-center">
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}
