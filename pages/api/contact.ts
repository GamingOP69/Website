import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

type Body = {
  name?: string
  email?: string
  message?: string
  website?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' })
  const body: Body = req.body || {}
  const name = (body.name || '').trim().slice(0, 120)
  const email = (body.email || '').trim().slice(0, 254)
  const message = (body.message || '').trim().slice(0, 5000)

  if (body.website) return res.status(200).json({ ok: true })
  if (!email || !message) return res.status(400).json({ error: 'missing fields' })
  if (!EMAIL_PATTERN.test(email)) return res.status(400).json({ error: 'invalid email' })
  if (message.length < 10) return res.status(400).json({ error: 'message too short' })

  const smtpHost = process.env.SMTP_HOST
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const toAddress = process.env.CONTACT_TO_EMAIL

  if (!smtpHost || !smtpUser || !smtpPass || !toAddress) {
    return res.status(503).json({ error: 'contact_not_configured' })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: smtpUser, pass: smtpPass }
    })

    await transporter.sendMail({
      from: `${name || 'Website Contact'} <${smtpUser}>`,
      to: toAddress,
      subject: `Website Contact from ${name || email}`,
      text: `From: ${name || 'n/a'} <${email}>\n\n${message}`
    })

    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'send_failed' })
  }
}
