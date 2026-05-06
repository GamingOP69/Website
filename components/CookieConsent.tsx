'use client'

import React, { useEffect, useState } from 'react'

const STORAGE_KEY = 'gamingop_cookie_consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true)
      }
    } catch {
      // localStorage not available
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
      <div className="max-w-3xl mx-auto glass rounded-2xl border border-gray-700 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-primary hover:bg-primary/80 text-white transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
