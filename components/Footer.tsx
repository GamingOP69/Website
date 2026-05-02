import React from 'react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-800">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
        {/* Brand */}
        <div className="col-span-2 sm:col-span-1">
          <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">GamingOP</h3>
          <p className="text-xs sm:text-sm text-gray-400">Your favorite gaming creator and community hub.</p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-xs sm:text-sm mb-3 text-primary">Navigation</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><Link href="/" className="text-gray-400 hover:text-primary transition">Home</Link></li>
            <li><Link href="/youtube" className="text-gray-400 hover:text-primary transition">Videos</Link></li>
            <li><Link href="/server-status" className="text-gray-400 hover:text-primary transition">Server</Link></li>
            <li><Link href="/about" className="text-gray-400 hover:text-primary transition">About</Link></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h4 className="font-semibold text-xs sm:text-sm mb-3 text-primary">Community</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><a href="https://youtube.com/@gamingop-1m?si=qZfx45xAKVPyR4gy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition">YouTube</a></li>
            <li><a href="https://discord.gg/Ezd32s4P8H" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition">Discord</a></li>
            <li><a href="https://minecraftservers.org/server/686902" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition">MC Servers</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-xs sm:text-sm mb-3 text-primary">Legal</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><a href="#" className="text-gray-400 hover:text-primary transition">Privacy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-primary transition">Terms</a></li>
            <li><a href="#" className="text-gray-400 hover:text-primary transition">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 pt-6 sm:pt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-500">
          <p>© {currentYear} GamingOP. All rights reserved.</p>
          <p>Built with ❤️ for gamers worldwide</p>
        </div>
      </div>
    </footer>
  )
}
