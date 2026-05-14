'use client'

import React, { useEffect, useState } from 'react'

const STORAGE_KEY = 'gamingop_cookie_consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const consented = localStorage.getItem(STORAGE_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(!consented)
    } catch {
      setVisible(true)
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
      // ignore
    }
    setVisible(false)
  }

  function decline() {
    try {
      localStorage.setItem(STORAGE_KEY, 'declined')
    } catch {
      // ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
    >
      <div className="surface mx-auto flex max-w-3xl flex-col items-start gap-4 border-gray-700 p-4 sm:flex-row sm:items-center sm:p-6">
        <div className="flex-1 text-sm text-gray-300">
          <p>
            We use cookies and display ads via{' '}
            <strong className="text-white">Google AdSense</strong> to help support this site.
            By clicking <strong className="text-white">Accept</strong>, you agree to our use of cookies for
            analytics and personalized advertising. See our{' '}
            <a href="/privacy" className="text-primary hover:text-accent underline">
              Privacy Policy
            </a>{' '}
            for details.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="rounded-md border border-gray-700 px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:border-gray-500 hover:text-white"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/80"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
