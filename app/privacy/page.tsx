import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '../../lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy - GamingOP',
  description: 'Privacy Policy for GamingOP website, ads, analytics, YouTube embeds, Discord links, and browser tools.',
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
}

export default function PrivacyPage() {
  return (
    <main className="py-6 sm:py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link href="/" className="text-sm text-gray-400 no-underline hover:text-primary">
          Back to home
        </Link>

        <article className="surface p-5 sm:p-8">
          <h1 className="heading-xl text-white">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-500">Last updated: May 14, 2026</p>

          <div className="prose prose-invert mt-8 max-w-none prose-p:text-gray-300 prose-li:text-gray-300 prose-a:text-primary">
            <Section title="1. Overview">
              <p>
                GamingOP operates the website at gamingop.qzz.io. This policy explains what information may be collected
                when you visit the site, use contact forms, view embedded content, or use browser-based tools.
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <ul>
                <li>Contact details you choose to send through the contact form, such as email and message text.</li>
                <li>Basic analytics and performance data through Vercel services.</li>
                <li>Advertising and cookie data when Google AdSense is active.</li>
                <li>Technical request data that hosting providers normally process to deliver the website.</li>
              </ul>
            </Section>

            <Section title="3. Local Browser Tools">
              <p>
                The image converter and text toolkit run in your browser. Selected images and pasted text are not uploaded
                to GamingOP servers by those tools. Downloaded output files are created on your device.
              </p>
            </Section>

            <Section title="4. Advertising and Cookies">
              <p>
                The site may use Google AdSense. Google and its partners may use cookies or similar technologies to serve
                ads, measure ad performance, and prevent abuse. You can manage personalized ad settings through Google
                Ads Settings.
              </p>
              <p>
                We label manual ad areas as advertisements and avoid placing manual ads on pages that only announce future
                products or features.
              </p>
            </Section>

            <Section title="5. Third-Party Services">
              <ul>
                <li>Google AdSense and Google services for advertising and YouTube content.</li>
                <li>YouTube links and embeds for GamingOP videos.</li>
                <li>Discord links and widgets for community access.</li>
                <li>Vercel Analytics and Speed Insights for performance information.</li>
                <li>Minecraft server status APIs used to show public server status data.</li>
              </ul>
            </Section>

            <Section title="6. Data Retention">
              <p>
                Contact messages are kept only as long as needed to respond or manage abuse. Analytics and advertising
                data are retained according to the policies of the relevant third-party provider.
              </p>
            </Section>

            <Section title="7. Children">
              <p>
                This site is not directed to children under 13. If you believe a child has sent personal information
                through the contact form, please contact us so it can be removed.
              </p>
            </Section>

            <Section title="8. Contact">
              <p>
                For privacy questions, use the <Link href="/#contact">contact form</Link>.
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
