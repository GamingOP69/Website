import React, { useState } from 'react'

export default function Filters({ onChange }: { onChange: (q: string) => void }) {
  const [q, setQ] = useState('')
  function submit(e: React.FormEvent) {
    e.preventDefault()
    onChange(q)
  }
  return (
    <form onSubmit={submit} className="flex gap-2 items-center mb-4">
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by game or tag" className="p-2 rounded bg-black/30 flex-1" />
      <button className="btn btn-ghost">Filter</button>
    </form>
  )
}
