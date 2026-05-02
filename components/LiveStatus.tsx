'use client'

import React from 'react'

export default function LiveStatus({ isLive }: { isLive: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${isLive ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300'}`}>
      <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-300 animate-pulse' : 'bg-gray-500'}`} />
      <span className="text-sm">{isLive ? 'LIVE' : 'Offline'}</span>
    </div>
  )
}
