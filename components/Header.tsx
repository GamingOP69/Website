'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Videos', href: '/youtube' },
  { label: 'Server', href: '/server-status' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 glass backdrop-blur-md border-b border-gray-800 mb-6 sm:mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity no-underline">
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
          <span className="hidden sm:inline text-lg sm:text-xl font-bold heading text-white">GamingOP</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors no-underline ${
                  isActive ? 'text-primary' : 'text-gray-300 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden mt-3 pb-3 border-t border-gray-800 pt-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2.5 text-sm rounded-lg transition-all no-underline ${
                  isActive
                    ? 'text-primary bg-primary/10 font-semibold'
                    : 'text-gray-300 hover:text-primary hover:bg-white/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
