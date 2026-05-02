import './globals.css'
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'GamingOP',
  description: 'GamingOP - YouTube, Minecraft server and community hub'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-white min-h-screen antialiased">
        <div className="max-w-6xl mx-auto px-4">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
