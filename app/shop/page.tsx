import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shop – GamingOP',
  description: 'GamingOP Official Merchandise Store. Premium gaming apparel, accessories, and exclusive merchandise coming soon. Be first to know with our newsletter.',
}

export default function ShopPage() {
  return (
    <main className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-primary transition no-underline">← Back to Home</Link>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-10 space-y-8">
          <div>
            <h1 className="heading-xl text-white mb-2">GamingOP Merchandise Store</h1>
            <p className="text-gray-400 text-sm">Premium gaming apparel and exclusive merchandise</p>
          </div>

          {/* Coming Soon Section */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-8 text-center space-y-6">
            <div className="text-6xl">🎮</div>
            <div>
              <h2 className="heading-lg text-white mb-2">Coming Soon!</h2>
              <p className="text-gray-300 mb-4">
                We&apos;re working on bringing you exclusive GamingOP merchandise. Our shop will feature premium apparel, gaming accessories, and limited edition items.
              </p>
            </div>

            {/* Newsletter Signup */}
            <div className="max-w-md mx-auto">
              <p className="text-sm text-gray-400 mb-4">Be the first to know when our shop launches!</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                />
                <button className="px-6 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition whitespace-nowrap">
                  Notify Me
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">Follow us on social media for updates</p>
              <div className="flex justify-center gap-4 mt-3">
                <a href="#" className="text-primary hover:text-primary/80 transition">Discord</a>
                <a href="#" className="text-primary hover:text-primary/80 transition">YouTube</a>
                <a href="#" className="text-primary hover:text-primary/80 transition">Twitter</a>
              </div>
            </div>
          </div>

          {/* Planned Products */}
          <section className="space-y-4">
            <h2 className="heading-lg text-white">Planned Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '👕', title: 'T-Shirts & Apparel', desc: 'Premium quality gaming t-shirts' },
                { icon: '🎧', title: 'Gaming Gear', desc: 'Headsets, mousepads, and accessories' },
                { icon: '🎮', title: 'Limited Editions', desc: 'Exclusive collectible items' },
                { icon: '⚡', title: 'Hoodies & Jackets', desc: 'Comfortable gaming wear' },
                { icon: '🔑', title: 'Keychains & Pins', desc: 'Small accessories for collectors' },
                { icon: '🎁', title: 'Mystery Boxes', desc: 'Surprise merchandise bundles' },
              ].map((product, idx) => (
                <div key={idx} className="glass p-4 rounded-lg hover:bg-white/10 transition">
                  <div className="text-3xl mb-2">{product.icon}</div>
                  <h3 className="font-semibold text-white mb-1">{product.title}</h3>
                  <p className="text-sm text-gray-400">{product.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="space-y-4">
            <h2 className="heading-lg text-white">Why Shop with GamingOP?</h2>
            <div className="space-y-3">
              {[
                { title: 'Premium Quality', desc: 'All merchandise is crafted with attention to detail and durability.' },
                { title: 'Exclusive Designs', desc: 'Limited edition designs available only through our official store.' },
                { title: 'Fast Shipping', desc: 'Quick and reliable shipping to your doorstep worldwide.' },
                { title: 'Community Love', desc: 'Every purchase supports the GamingOP community.' },
              ].map((item, idx) => (
                <div key={idx} className="glass p-4 rounded-lg">
                  <h3 className="font-semibold text-primary mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact for Custom Orders */}
          <div className="bg-white/5 border border-gray-700 rounded-lg p-6 text-center">
            <p className="text-gray-300 mb-4">Interested in custom merchandise or bulk orders?</p>
            <Link href="/contact" className="inline-block px-6 py-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg transition font-semibold no-underline">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
