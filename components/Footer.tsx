import React from 'react'
import Link from 'next/link'
import { SOCIAL_LINKS } from '../lib/site'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-12 border-t border-gray-800 pt-8 sm:mt-16 sm:pt-10">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <h3 className="font-bold text-white">GamingOP</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
            Gaming creator, coder, Minecraft server hub, guides, and lightweight tools for the community.
          </p>
        </div>

        <FooterGroup
          title="Explore"
          links={[
            { label: 'Home', href: '/' },
            { label: 'Videos', href: '/youtube' },
            { label: 'Guides', href: '/guides' },
            { label: 'Tools', href: '/tools' },
            { label: 'Resources', href: '/resources' },
          ]}
        />

        <FooterGroup
          title="Community"
          links={[
            { label: 'Server Status', href: '/server-status' },
            { label: 'Merch Lab', href: '/shop' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/#contact' },
          ]}
        />

        <div>
          <h4 className="mb-3 text-sm font-semibold text-primary">Social</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 no-underline hover:text-primary">
                YouTube
              </a>
            </li>
            <li>
              <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer" className="text-gray-400 no-underline hover:text-primary">
                Discord
              </a>
            </li>
            <li>
              <a href={SOCIAL_LINKS.twitch} target="_blank" rel="noopener noreferrer" className="text-gray-400 no-underline hover:text-primary">
                Twitch
              </a>
            </li>
            <li>
              <a href={SOCIAL_LINKS.minecraftVote} target="_blank" rel="noopener noreferrer" className="text-gray-400 no-underline hover:text-primary">
                Vote for Server
              </a>
            </li>
          </ul>
        </div>

        <FooterGroup
          title="Legal"
          links={[
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
            { label: 'ads.txt', href: '/ads.txt' },
          ]}
        />
      </div>

      <div className="mt-8 border-t border-gray-800 py-6 text-sm text-gray-500">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {currentYear} GamingOP. All rights reserved.</p>
          <p>Built for players, viewers, and creators.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterGroup({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-primary">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-gray-400 no-underline hover:text-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
