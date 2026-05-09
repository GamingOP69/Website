import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service – GamingOP',
  description: 'Terms of Service for GamingOP website and services.',
}

export default function TermsPage() {
  return (
    <main className="py-8 sm:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-primary transition no-underline">← Back to Home</Link>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-10 space-y-8">
          <div>
            <h1 className="heading-xl text-white mb-2">Terms of Service</h1>
            <p className="text-gray-400 text-sm">Last updated: May 2026</p>
          </div>

          <Section title="1. Acceptance of Terms">
            <p>By accessing or using the GamingOP website at gamingop.qzz.io (the &ldquo;Site&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please do not use the Site.</p>
          </Section>

          <Section title="2. Use of the Site">
            <p>You agree to use the Site only for lawful purposes and in a way that does not infringe the rights of others. You must not:</p>
            <ul>
              <li>Use the Site in any way that violates applicable local, national, or international laws or regulations.</li>
              <li>Attempt to gain unauthorized access to any part of the Site or its related systems.</li>
              <li>Transmit any unsolicited or unauthorized advertising or promotional material.</li>
              <li>Post or transmit any harmful, offensive, or misleading content.</li>
            </ul>
          </Section>

          <Section title="3. Intellectual Property">
            <p>All content on this Site, including but not limited to text, graphics, logos, images, and video content, is the property of GamingOP or its respective owners and is protected by applicable intellectual property laws.</p>
            <p>YouTube content embedded on this Site is subject to YouTube&apos;s Terms of Service and remains the property of GamingOP or the respective rights holders.</p>
          </Section>

          <Section title="4. Minecraft Server">
            <p>Access to the GamingOP Minecraft server is subject to the following additional rules:</p>
            <ul>
              <li>No hacking, cheating, or use of unauthorized mods.</li>
              <li>No griefing, harassment, or abuse of other players.</li>
              <li>Follow all in-game rules and moderator instructions.</li>
              <li>We reserve the right to ban any player who violates these rules without prior notice.</li>
            </ul>
          </Section>

          <Section title="5. Disclaimer of Warranties">
            <p>The Site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without any warranties of any kind, express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.</p>
          </Section>

          <Section title="6. Limitation of Liability">
            <p>To the fullest extent permitted by law, GamingOP shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the Site.</p>
          </Section>

          <Section title="7. External Links">
            <p>The Site may contain links to third-party websites (such as YouTube, Discord). We are not responsible for the content or practices of those sites. Accessing third-party sites is at your own risk.</p>
          </Section>

          <Section title="8. Changes to These Terms">
            <p>We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated revision date. Your continued use of the Site after changes are posted constitutes your acceptance of the new Terms.</p>
          </Section>

          <Section title="9. Governing Law">
            <p>These Terms shall be governed by and construed in accordance with applicable law. Any disputes arising under these Terms shall be resolved in a competent court.</p>
          </Section>

          <Section title="10. Contact">
            <p>Questions about these Terms? Contact us via our <Link href="/#contact" className="text-primary hover:text-accent">contact form</Link>.</p>
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
