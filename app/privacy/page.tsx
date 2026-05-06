import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy – GamingOP',
  description: 'Privacy Policy for GamingOP website and services.',
}

export default function PrivacyPage() {
  return (
    <main className="py-8 sm:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-primary transition no-underline">← Back to Home</Link>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-10 space-y-8">
          <div>
            <h1 className="heading-xl text-white mb-2">Privacy Policy</h1>
            <p className="text-gray-400 text-sm">Last updated: May 2026</p>
          </div>

          <Section title="1. Introduction">
            <p>Welcome to GamingOP (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). This Privacy Policy explains how we collect, use, and protect information when you visit our website at gamingop.com (the &ldquo;Site&rdquo;). By using our Site, you agree to the practices described in this policy.</p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Contact Information:</strong> Name and email address when you use our contact form.</li>
              <li><strong>Usage Data:</strong> Anonymous analytics data such as pages visited, time spent, and browser type via Vercel Analytics.</li>
              <li><strong>Cookies:</strong> Standard browser cookies for site functionality. We do not use tracking cookies for advertising.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul>
              <li>To respond to your messages sent via our contact form.</li>
              <li>To improve the website experience using anonymous analytics.</li>
              <li>To maintain and improve site performance and security.</li>
            </ul>
          </Section>

          <Section title="4. Third-Party Services">
            <p>Our Site uses the following third-party services that may collect data according to their own privacy policies:</p>
            <ul>
              <li><strong>YouTube API:</strong> We use the YouTube Data API to display video content. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</li>
              <li><strong>Discord:</strong> We embed a Discord widget. See <a href="https://discord.com/privacy" target="_blank" rel="noopener noreferrer">Discord Privacy Policy</a>.</li>
              <li><strong>Vercel Analytics:</strong> Anonymous performance and usage analytics. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a>.</li>
            </ul>
          </Section>

          <Section title="5. Data Retention">
            <p>Contact form submissions are retained only as long as necessary to respond to your inquiry. Analytics data is retained per Vercel&apos;s standard policies. We do not sell or share your personal information with third parties for marketing purposes.</p>
          </Section>

          <Section title="6. Your Rights">
            <p>You have the right to:</p>
            <ul>
              <li>Request access to any personal data we hold about you.</li>
              <li>Request correction or deletion of your personal data.</li>
              <li>Opt out of any communications from us at any time.</li>
            </ul>
            <p>To exercise these rights, contact us through the contact form on our website.</p>
          </Section>

          <Section title="7. Children's Privacy">
            <p>Our Site is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.</p>
          </Section>

          <Section title="8. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of the Site after changes constitutes acceptance of the updated policy.</p>
          </Section>

          <Section title="9. Contact Us">
            <p>If you have questions about this Privacy Policy, please reach out via our <Link href="/#contact" className="text-primary hover:text-accent">contact form</Link>.</p>
          </Section>
        </div>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg sm:text-xl font-bold text-white mb-3">{title}</h2>
      <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:text-gray-300 [&_strong]:text-white [&_a]:text-primary [&_a:hover]:text-accent">
        {children}
      </div>
    </section>
  )
}
