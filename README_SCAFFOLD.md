# GamingOP Website — Production Guide

This repository is a production-ready Next.js + Tailwind website scaffold for the GamingOP creator hub. It includes server-side YouTube integrations, Minecraft server status, Discord/embed components, and deployment helpers for Vercel.

Quick start (local):

1. Install dependencies:

```bash
npm install
```

2. Copy env example and set secrets locally:

```bash
cp .env.example .env.local
# edit .env.local and add keys
```

3. Run development server:

```bash
npm run dev
```

Production deploy (Vercel recommended):

1. Push this repository to GitHub.
2. Import the repo in Vercel and set environment variables from `.env.example` in the Vercel dashboard.
3. Optional: configure SMTP credentials to receive contact form emails.

SEO & Performance:
- The project includes an automated sitemap generator: `npm run sitemap` (run during your build pipeline). Ensure `SITE_URL` is set.
- API routes use caching headers (s-maxage/stale-while-revalidate) to reduce API calls and improve performance.

Environment variables (see `.env.example`):
- `YT_API_KEY`, `YT_CHANNEL_ID` — YouTube Data API v3
- `MINECRAFT_SERVER` — server hostname
- `SMTP_*` and `CONTACT_TO_EMAIL` — contact form
- `SITE_URL` — used for sitemap and robots

Files of interest:
- `app/` — main pages (App Router)
- `components/` — UI building blocks
- `pages/api/` — server-proxy endpoints for YouTube, Minecraft, trending, and contact
- `scripts/generate-sitemap.js` — sitemap generator
- `middleware.ts` — security headers

CI/CD:
- GitHub Actions will run `npm run build` on PRs and pushes to `main`.
- Vercel will build and deploy preview and production environments automatically.

Next steps you may want:
- Configure a real Discord widget ID in `components/DiscordWidget.tsx`.
- Add analytics (GA4) and Sentry for monitoring.
- Expand the content system to index video tags and create category pages.
