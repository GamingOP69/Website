'use client'

import React, { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website })
      })
      if (r.ok) {
        setStatus('sent')
        setName('')
        setEmail('')
        setMessage('')
        setWebsite('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="surface space-y-3 p-8 text-center sm:p-10">
        <div className="text-3xl text-primary">Sent</div>
        <h3 className="text-lg font-bold text-white">Message Sent!</h3>
        <p className="text-gray-400 text-sm">Thanks for reaching out. We&apos;ll get back to you soon.</p>
        <button
          onClick={() => setStatus('idle')}
          className="btn btn-ghost text-sm mt-2"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="surface space-y-5 p-6 sm:p-8">
      <label className="hidden">
        Website
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-gray-300">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-gray-300">Email <span className="text-primary">*</span></span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
            className="w-full"
          />
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-gray-300">Message <span className="text-primary">*</span></span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="What's on your mind? Collab ideas, support questions, feedback..."
          rows={5}
          className="w-full resize-none"
        />
      </label>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? (
            <span className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Sending...
            </span>
          ) : 'Send Message'}
        </button>
        {status === 'error' && (
          <span className="text-sm text-red-400">Something went wrong. Please try again.</span>
        )}
      </div>
    </form>
  )
}
