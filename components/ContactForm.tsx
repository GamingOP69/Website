'use client'

import React, { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })
      await r.json()
      if (r.ok) setStatus('sent')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={submit} className="glass p-4 rounded-md max-w-xl">
      <h3 className="font-bold mb-3">Contact</h3>
      <label className="block mb-2">
        <span className="text-sm text-gray-300">Name</span>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 p-2 rounded bg-black/30" />
      </label>
      <label className="block mb-2">
        <span className="text-sm text-gray-300">Email *</span>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full mt-1 p-2 rounded bg-black/30" />
      </label>
      <label className="block mb-2">
        <span className="text-sm text-gray-300">Message *</span>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required className="w-full mt-1 p-2 rounded bg-black/30" rows={5} />
      </label>
      <div className="mt-3">
        <button type="submit" className="px-4 py-2 bg-primary rounded">Send</button>
        {status === 'sending' && <span className="ml-3 text-sm">Sending...</span>}
        {status === 'sent' && <span className="ml-3 text-sm text-green-400">Sent!</span>}
        {status === 'error' && <span className="ml-3 text-sm text-red-400">Error</span>}
      </div>
    </form>
  )
}
