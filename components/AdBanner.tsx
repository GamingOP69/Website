'use client'

import React, { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT } from '../lib/site'

interface AdBannerProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  fullWidth?: boolean
  className?: string
}

const STORAGE_KEY = 'gamingop_cookie_consent'

export default function AdBanner({
  adSlot,
  adFormat = 'auto',
  fullWidth = true,
  className = '',
}: AdBannerProps) {
  const initialized = useRef(false)
  const isPlaceholderSlot = !adSlot || /^0+$/.test(adSlot)

  useEffect(() => {
    if (isPlaceholderSlot) return
    if (initialized.current) return
    initialized.current = true
    try {
      let npa = '1' // non-personalized ads by default
      try {
        const consent = localStorage.getItem(STORAGE_KEY)
        if (consent === 'accepted') npa = '0'
      } catch {
        // localStorage not available
      }
      // Push the ad with personalization flag
      const adPush: Record<string, string> = {}
      if (npa === '1') {
        adPush['google_npa'] = '1'
      }
      type AdsByGoogle = Array<Record<string, string>>
      const adsbygoogle: AdsByGoogle =
        ((window as unknown as Record<string, AdsByGoogle>).adsbygoogle as AdsByGoogle) || []
      adsbygoogle.push(adPush)
      ;(window as unknown as Record<string, AdsByGoogle>).adsbygoogle = adsbygoogle
    } catch {
      // AdSense not loaded yet
    }
  }, [isPlaceholderSlot])

  if (isPlaceholderSlot) return null

  return (
    <div className={`ad-container overflow-hidden text-center ${className}`} aria-label="Advertisement">
      <p className="mb-1 text-center text-[10px] uppercase text-gray-600">Advertisement</p>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidth ? 'true' : 'false'}
      />
    </div>
  )
}
