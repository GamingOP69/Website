"use client"

import React, { useState } from 'react'

export default function CollapseList({ children, initial = 4 }: { children: React.ReactNode, initial?: number }) {
  const [open, setOpen] = useState(false)

  // children expected to be an array
  const items = React.Children.toArray(children)
  const showAll = open ? items : items.slice(0, initial)

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {showAll}
      </div>
      {items.length > initial ? (
        <div className="text-center">
          <button onClick={() => setOpen(!open)} className="px-4 py-2 text-sm bg-white/5 rounded-md hover:bg-white/10">
            {open ? 'Show less' : `Show all (${items.length})`}
          </button>
        </div>
      ) : null}
    </div>
  )
}
