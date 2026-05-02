import '../styles/globals.css'
import React from 'react'
import { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0f14' }
  ]
}

export const metadata: Metadata = {
  metadataBase: new URL('https://gamingop.com'),
  title: 'GamingOP - Gaming Creator & Minecraft Server',
  description: 'GamingOP - YouTube creator, Minecraft server hub, and gaming community. Watch gameplay, join the server, and connect with the community.',
  keywords: ['GamingOP', 'Minecraft', 'YouTube', 'Gaming', 'Free Fire', 'Valorant', 'Gaming Community', 'Gaming Server', 'Streamer'],
  authors: [{ name: 'GamingOP' }],
  creator: 'GamingOP',
  publisher: 'GamingOP',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gamingop.com',
    siteName: 'GamingOP',
    title: 'GamingOP - Gaming Creator & Minecraft Server',
    description: 'Join the GamingOP gaming community. YouTube content, Minecraft server, and more.',
    images: [
      {
        url: 'https://gamingop.com/banner.png',
        width: 1983,
        height: 793,
        alt: 'GamingOP Banner',
        type: 'image/png'
      },
      {
        url: 'https://gamingop.com/logo.png',
        width: 1254,
        height: 1254,
        alt: 'GamingOP Logo',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GamingOP - Gaming Creator',
    description: 'Watch gaming content and join our Minecraft server',
    images: ['https://gamingop.com/banner.png']
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: { url: '/apple-touch-icon.png', type: 'image/png' },
    shortcut: '/favicon.ico'
  },
  alternates: {
    canonical: 'https://gamingop.com'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="canonical" href="https://gamingop.com" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" type="image/png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content="GamingOP - YouTube creator, Minecraft server hub, and gaming community. Watch gameplay, join the server, and connect with the community." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="GamingOP" />
      </head>
      <body className="bg-bg text-white min-h-screen antialiased flex flex-col">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
