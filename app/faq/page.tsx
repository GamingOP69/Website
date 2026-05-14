import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ – GamingOP',
  description: 'Frequently Asked Questions about GamingOP, our Minecraft server, YouTube content, and gaming community.',
}

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqs: FAQItem[] = [
  {
    category: 'Minecraft Server',
    question: 'How do I join the GamingOP Minecraft server?',
    answer: 'You can join our Minecraft server by going to the Server Status page and following the connection instructions. The server supports both Java and Bedrock editions. Simply add our server address to your multiplayer list and connect. Whitelist approval is required for security purposes.',
  },
  {
    category: 'Minecraft Server',
    question: 'What is the server IP address?',
    answer: 'Visit our Server Status page to see the current server IP address, port number, and connection status. The address and port are displayed prominently on that page.',
  },
  {
    category: 'Minecraft Server',
    question: 'Are there any rules I need to follow?',
    answer: 'Yes! We have community guidelines to ensure everyone has fun. These include: no griefing or destructive behavior, respect all players, no hacking or cheating, follow moderator instructions, and maintain a friendly atmosphere. Read our full server rules on the Server Status page.',
  },
  {
    category: 'Minecraft Server',
    question: 'How do I get whitelisted on the server?',
    answer: 'Join our Discord community and submit a whitelist application. This helps us verify players and maintain a safe community. The application process is quick and usually approved within 24 hours.',
  },
  {
    category: 'YouTube',
    question: 'When do you upload new videos?',
    answer: 'We aim to upload new gaming content regularly. Subscribe to our YouTube channel to get notifications whenever we post new videos. You can also check our Videos page for the latest uploads.',
  },
  {
    category: 'YouTube',
    question: 'What games do you play?',
    answer: 'Our channel features various games including Minecraft, Free Fire, Valorant, and other popular titles. We create both gameplay videos and tutorials. Check our channel for the full catalog.',
  },
  {
    category: 'Community',
    question: 'How can I join the Discord community?',
    answer: 'Our Discord is open to all! Join our gaming community to connect with other players, discuss strategies, organize events, and stay updated on server announcements.',
  },
  {
    category: 'Community',
    question: 'Can I suggest content ideas?',
    answer: 'Absolutely! We love hearing from our community. You can suggest ideas in our Discord server or through the contact form on our website. Your feedback helps shape the direction of our content.',
  },
  {
    category: 'Community',
    question: 'Are there community events or tournaments?',
    answer: 'Yes! We regularly organize community events, games nights, and friendly competitions. These are announced on our Discord server and YouTube channel. Participation is free and open to all community members.',
  },
  {
    category: 'Technical',
    question: 'What are the server requirements to play?',
    answer: 'Minecraft requires a modern computer with at least 4GB RAM for Java Edition. Bedrock Edition runs on most devices. A stable internet connection is recommended for smooth gameplay.',
  },
  {
    category: 'Technical',
    question: 'I\'m experiencing lag on the server. What should I do?',
    answer: 'Check your internet connection first. Try lowering your render distance in game settings. If issues persist, contact us through Discord or the contact form with details about your issue.',
  },
  {
    category: 'Partnerships',
    question: 'Can my brand sponsor GamingOP?',
    answer: 'We&apos;re open to partnership opportunities! If you&apos;re interested in sponsoring our content or collaborating with us, please reach out through our contact form.',
  },
  {
    category: 'Partnerships',
    question: 'Do you accept affiliate partnerships?',
    answer: 'Yes! We work with quality brands and services that benefit our community. Contact us to discuss potential partnerships.',
  },
  {
    category: 'General',
    question: 'When will the merchandise store launch?',
    answer: 'Our official merchandise store is coming soon! We\'re designing exclusive GamingOP branded items. Subscribe to our newsletter on the Shop page to be notified when we launch.',
  },
  {
    category: 'General',
    question: 'How can I support GamingOP?',
    answer: 'You can support us by: subscribing to our YouTube channel, joining our Minecraft server, inviting friends, participating in our Discord community, and sharing our content. Your support means everything!',
  },
]

const categories = Array.from(new Set(faqs.map(f => f.category)))

export default function FAQPage() {
  return (
    <main className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-primary transition no-underline">← Back to Home</Link>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-10 space-y-8">
          <div>
            <h1 className="heading-xl text-white mb-2">Frequently Asked Questions</h1>
            <p className="text-gray-400">Find answers to common questions about GamingOP, our community, and how to get started.</p>
          </div>

          {categories.map((category) => (
            <section key={category} className="space-y-4">
              <h2 className="heading-lg text-primary">{category}</h2>
              <div className="space-y-3">
                {faqs
                  .filter(f => f.category === category)
                  .map((faq, idx) => (
                    <details key={idx} className="glass rounded-lg cursor-pointer hover:bg-white/10 transition overflow-hidden">
                      <summary className="p-4 font-semibold text-white list-none flex items-center justify-between">
                        <span>{faq.question}</span>
                        <span className="text-primary text-lg">+</span>
                      </summary>
                      <div className="px-4 pb-4 border-t border-gray-700 pt-4 text-gray-300">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
              </div>
            </section>
          ))}

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6">
            <p className="text-gray-300 mb-4">Didn&apos;t find the answer you&apos;re looking for?</p>
            <Link
              href="/contact"
              className="inline-block px-6 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition no-underline"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
