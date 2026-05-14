import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '../../lib/site'

export const metadata: Metadata = {
  title: 'Terms of Service - GamingOP',
  description: 'Terms of Service for the GamingOP website, community links, Minecraft server resources, and tools.',
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
}

export default function TermsPage() {
  return (
    <main className="py-6 sm:py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link href="/" className="text-sm text-gray-400 no-underline hover:text-primary">
          Back to home
        </Link>

        <article className="surface p-5 sm:p-8">
          <h1 className="heading-xl text-white">Terms of Service</h1>
          <p className="mt-2 text-sm text-gray-500">Last updated: May 14, 2026</p>

          <div className="prose prose-invert mt-8 max-w-none prose-p:text-gray-300 prose-li:text-gray-300 prose-a:text-primary">
            <Section title="1. Acceptance">
              <p>
                By using gamingop.qzz.io, you agree to these terms. If you do not agree, please stop using the website.
              </p>
            </Section>

            <Section title="2. Website Use">
              <p>You agree not to misuse the site, attack its services, attempt unauthorized access, or submit harmful content.</p>
            </Section>

            <Section title="3. Browser Tools">
              <p>
                Tools are provided for convenience. You are responsible for checking converted images, copied text, and
                downloaded files before using them elsewhere.
              </p>
            </Section>

            <Section title="4. Minecraft Server and Community">
              <ul>
                <li>No cheating, hacked clients, harassment, or griefing.</li>
                <li>Follow moderator instructions and event-specific rules.</li>
                <li>Access may be restricted for behavior that harms the community.</li>
              </ul>
            </Section>

            <Section title="5. Merch Lab">
              <p>
                The merch page is informational until products are officially launched. Do not send payments to unofficial
                profiles or links claiming to sell GamingOP products.
              </p>
            </Section>

            <Section title="6. External Services">
              <p>
                The site links to YouTube, Discord, Twitch, Minecraft server directories, and other third-party services.
                Those services have their own terms and privacy practices.
              </p>
            </Section>

            <Section title="7. Disclaimer">
              <p>
                The website is provided as available. We try to keep information useful and accurate, but server status,
                embeds, APIs, and third-party links may change or become unavailable.
              </p>
            </Section>

            <Section title="8. Contact">
              <p>
                Questions about these terms can be sent through the <Link href="/#contact">contact form</Link>.
              </p>
            </Section>
          </div>
        </article>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  )
}
