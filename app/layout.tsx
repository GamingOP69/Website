import '../styles/globals.css'
import React from 'react'
import { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CookieConsent from '../components/CookieConsent'
import { ADSENSE_CLIENT, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../lib/site'

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'GamingOP - Gaming Creator, Coder, Tools, and Minecraft Server',
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'GamingOP',
    'Minecraft',
    'YouTube gaming',
    'gaming tools',
    'image converter',
    'creator guides',
    'gaming community',
    'streamer',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
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
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'GamingOP - Gaming Creator, Coder, Tools, and Minecraft Server',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/banner.png`,
        width: 1983,
        height: 793,
        alt: 'GamingOP Banner',
        type: 'image/png'
      },
      {
        url: `${SITE_URL}/logo.png`,
        width: 1254,
        height: 1254,
        alt: 'GamingOP Logo',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GamingOP - Gaming Creator and Coder',
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/banner.png`]
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' }
    ],
    apple: { url: '/apple-touch-icon.png', type: 'image/png' },
    shortcut: '/favicon.png'
  },
  alternates: {
    canonical: SITE_URL
  },
  other: {
    'google-adsense-account': ADSENSE_CLIENT
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      sameAs: [
        'https://www.youtube.com/@GamingOP-1M',
        'https://discord.com/invite/Ezd32s4P8H',
        'https://www.twitch.tv/gamingop69',
      ],
    },
  ]

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" type="image/png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content={SITE_NAME} />
        <meta name="creator" content={SITE_NAME} />
        <meta name="publisher" content={SITE_NAME} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        {googleSiteVerification ? <meta name="google-site-verification" content={googleSiteVerification} /> : null}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          strategy="beforeInteractive"
        />
        <Script
          id="google-adsense"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-bg text-white min-h-screen antialiased flex flex-col">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
