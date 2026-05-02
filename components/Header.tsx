import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="py-4 flex items-center justify-between">
      <div className="text-xl font-bold">GamingOP</div>
      <nav className="flex gap-4">
        <Link href="/" className="text-sm">Home</Link>
        <Link href="/server-status" className="text-sm">Server</Link>
        <Link href="/about" className="text-sm">About</Link>
      </nav>
    </header>
  )
}
