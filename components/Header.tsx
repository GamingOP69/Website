import React from 'react'

export default function Header() {
  return (
    <header className="py-4 flex items-center justify-between">
      <div className="text-xl font-bold">GamingOP</div>
      <nav className="flex gap-4">
        <a href="/" className="text-sm">Home</a>
        <a href="/server-status" className="text-sm">Server</a>
        <a href="/about" className="text-sm">About</a>
      </nav>
    </header>
  )
}
