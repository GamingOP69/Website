'use client'

import React, { useState, useEffect } from 'react'

export default function Filters({ onChange }: { onChange: (q: string) => void }) {
  const [q, setQ] = useState('')

  // live search as user types; onChange is stable (useCallback in parent)
  useEffect(() => {
    onChange(q)
  }, [q, onChange])

  return (
    <div className="flex gap-2 items-center mb-6">
      <div className="relative flex-1 max-w-md">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search videos by title or game…"
          className="w-full pl-9 pr-4"
        />
      </div>
      {q && (
        <button
          onClick={() => setQ('')}
          className="btn btn-ghost text-sm"
        >
          Clear
        </button>
      )}
    </div>
  )
}
