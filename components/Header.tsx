'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass backdrop-blur-md border-b border-gray-800 mb-6 sm:mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="GamingOP Logo"
              fill
              className="object-contain"
              sizes="40px"
              priority
            />
          </div>
          <span className="hidden sm:inline text-lg sm:text-xl font-bold heading">GamingOP</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-gray-300 hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/youtube" className="text-sm text-gray-300 hover:text-primary transition-colors">
            Videos
          </Link>
          <Link href="/server-status" className="text-sm text-gray-300 hover:text-primary transition-colors">
            Server
          </Link>
          <Link href="/about" className="text-sm text-gray-300 hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center"
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 bg-primary transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`h-0.5 bg-primary transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-0.5 bg-primary transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden mt-4 space-y-2 pb-4">
          {['Home', 'Videos', 'Server', 'About'].map((item, idx) => {
            const href = item === 'Home' ? '/' : `/${item.toLowerCase()}`
            return (
              <Link
                key={idx}
                href={href}
                className="block px-4 py-2.5 text-sm text-gray-300 hover:text-primary hover:bg-white/5 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
