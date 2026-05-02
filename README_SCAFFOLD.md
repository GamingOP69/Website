# GamingOP Website — Production Guide

This repository is a **production-ready Next.js + Tailwind website** for the GamingOP creator hub. It includes server-side YouTube integrations, Minecraft server status, Discord/embed components, contact forms, and deployment helpers for Vercel.

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env.local
# Edit .env.local and add your keys:
# YT_API_KEY=your_key_here
# YT_CHANNEL_ID=UCxxxxxxxxx
# etc.
```

### 3. Run Development Server
```bash
npm run dev
```
Visit http://localhost:3000

### 4. Build for Production
```bash
npm run build
npm start
```

### 5. Generate Sitemap
```bash
npm run sitemap
# Creates public/sitemap.xml
```

---

## 📦 What's Included

### Pages
- **Home** (`/`) — Hero, latest videos, popular, events, server status, Discord
- **Videos** (`/youtube`) — All videos with filtering by game/tag
- **Video Detail** (`/youtube/[id]`) — Full video embed with stats
- **Server Status** (`/server-status`) — Minecraft server status and join instructions
- **About** (`/about`) — Creator bio and career info

### API Routes
- `/api/youtube` — Proxy to YouTube Data API v3 (latest/popular/live/trending)
- `/api/minecraft` — Minecraft server status (cached 15s)
- `/api/trending` — Trending videos (scored by views/age)
- `/api/contact` — Contact form with nodemailer SMTP support

### Features
- 🎨 Dark + red gaming theme with glassmorphism UI
- 📱 Fully responsive mobile design
- 🔍 SEO optimized (sitemap, robots.txt, Open Graph, JSON-LD)
- ⚡ Performance optimized (88 KB First Load JS, ISR caching)
- 🔒 Security headers (HSTS, CSP, X-Frame-Options)
- 🎯 TypeScript strict mode
- ✅ CI/CD with GitHub Actions

---

## 🌍 Environment Variables

### Required
```
YT_API_KEY=your_youtube_api_key
YT_CHANNEL_ID=UCxxxxxxxxxxxx
SITE_URL=https://your-domain.com
MINECRAFT_SERVER=gamingop.qzz.io
```

### Optional (Contact Form SMTP)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO_EMAIL=owner@example.com
```

See `.env.example` for all available variables.

---

## 🚀 Deploy to Vercel (Production)

### Option 1: One-Click Deploy
**⭐ Fastest way to deploy — takes 5 minutes:**

1. Go to https://vercel.com/new
2. Import `GamingOP69/Website`
3. Add environment variables (see above)
4. Click **Deploy**

Your site will be live at `https://gamingop-website.vercel.app`

### Option 2: Full Custom Deployment Guide
**For detailed setup including custom domains, SMTP, analytics, and troubleshooting:**

👉 **Read [DEPLOYMENT.md](./DEPLOYMENT.md)** ← Complete 100+ line guide with:
- Step-by-step Vercel setup
- Custom domain configuration (GoDaddy, Namecheap, etc.)
- DNS nameserver setup
- SMTP email configuration
- Google Analytics integration
- SSL/HTTPS verification
- Troubleshooting common issues
- Rollback & undo procedures

---

## 📁 Project Structure

```
.
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with header/footer
│   ├── page.tsx             # Homepage (/)
│   ├── youtube/             # Videos page (/youtube)
│   │   ├── page.tsx         # List with filters
│   │   └── [id]/page.tsx    # Video detail page
│   ├── about/page.tsx       # About page
│   └── server-status/page.tsx
├── components/              # React components
│   ├── Hero.tsx            # Homepage hero banner
│   ├── VideoGrid.tsx       # Video grid (client)
│   ├── ServerStatus.tsx    # Minecraft status (client)
│   ├── ContactForm.tsx     # Contact form (client)
│   ├── DiscordWidget.tsx   # Discord embed
│   ├── EventsList.tsx      # Events/giveaways
│   ├── Button.tsx, Card.tsx, SEO.tsx
│   └── ...
├── pages/api/              # API routes
│   ├── youtube.ts          # YouTube proxy
│   ├── minecraft.ts        # Minecraft server status
│   ├── trending.ts         # Trending algorithm
│   └── contact.ts          # Contact form handler
├── lib/                    # Utility functions
│   ├── youtube.ts          # YouTube helpers
│   └── minecraft.ts        # Minecraft helpers
├── styles/globals.css      # Tailwind + custom styles
├── public/                 # Static files
│   ├── sitemap.xml        # Generated on build
│   └── robots.txt         # SEO robots
├── middleware.ts           # Next.js middleware (security headers)
├── next.config.js          # Next.js config
├── tailwind.config.js      # Tailwind CSS config
├── tsconfig.json          # TypeScript config
├── .github/workflows/      # CI/CD
│   └── ci.yml             # GitHub Actions build
├── .env.example           # Environment template
├── DEPLOYMENT.md          # Full deployment guide ⭐
├── README.md              # This file
└── package.json
```

---

## 🔧 Available Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Production
npm run build            # Build for production
npm start               # Run production server

# Utilities
npm run lint            # Next.js linting
npm run sitemap         # Generate sitemap.xml

# CI/CD
npm ci                  # Clean install (used in CI)
```

---

## 🔐 Deployed Security

- ✅ HSTS (forces HTTPS)
- ✅ X-Frame-Options (prevents clickjacking)
- ✅ X-Content-Type-Options (prevents MIME sniffing)
- ✅ Referrer-Policy (privacy)
- ✅ Permissions-Policy (disables FLoC)
- ✅ API keys never exposed client-side (server-side proxy)
- ✅ Rate limiting ready (can add on Vercel Edge Functions)

---

## 🎯 SEO & Performance

### Performance Metrics
- **First Load JS**: 87.7 KB (excellent)
- **Bundle size**: Optimized with Next.js
- **Caching**: API routes cache responses (60-120s)
- **ISR**: Pages regenerate every 300s max

### SEO
- ✅ Sitemap at `/sitemap.xml`
- ✅ Robots.txt configured
- ✅ Open Graph meta tags (social sharing)
- ✅ Structured data (JSON-LD)
- ✅ Dynamic page titles and descriptions
- ✅ Mobile responsive
- ✅ Fast Core Web Vitals

### To Improve SEO Further
1. Generate and submit sitemap to Google Search Console
2. Add analytics (GA4 — see DEPLOYMENT.md)
3. Monitor Core Web Vitals in Vercel Analytics
4. Add breadcrumb schema
5. Optimize YouTube video metadata

---

## 🤝 Customization

### Discord Widget
Replace `YOUR_DISCORD_ID` in `components/DiscordWidget.tsx`:
```tsx
<iframe src="https://discord.com/widget?id=YOUR_SERVER_ID&theme=dark" />
```
Get your server ID: Discord Server Settings → Widget

### YouTube Channel
Update `YT_CHANNEL_ID` in `.env.local` to change which channel's videos appear.

### Minecraft Server
Change `MINECRAFT_SERVER` in `.env.local` to point to your server.

### Colors & Theme
Edit `tailwind.config.js` and `styles/globals.css`:
```js
colors: {
  primary: '#ff3b3b',    // Red accent
  bg: '#0b0f14',        // Dark background
}
```

---

## 📊 Analytics & Monitoring

### Built-in (Vercel)
- Real-time page views
- Performance metrics (LCP, FID, CLS)
- Edge function usage

### Optional (GA4)
See [DEPLOYMENT.md](./DEPLOYMENT.md#google-analytics-optional) for setup.

### Error Tracking
To add Sentry for production errors:
1. Create account at https://sentry.io
2. Install: `npm install @sentry/nextjs`
3. Follow integration guide

---

## 🐛 Troubleshooting

### Build Fails
- Check: `npm run build` locally
- Verify all env variables are set
- Check GitHub Actions logs

### Videos Don't Load
- Verify `YT_API_KEY` is correct
- Check quota: https://console.cloud.google.com

### Contact Form Doesn't Send
- Ensure SMTP variables are set in Vercel
- Check Gmail app password (not account password)

### Server Status Shows Offline
- Verify Minecraft server is running
- Test at https://mcsrvstat.us

**For comprehensive troubleshooting, see [DEPLOYMENT.md#troubleshooting](./DEPLOYMENT.md#troubleshooting)**.

---

## 📚 Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [YouTube API v3](https://developers.google.com/youtube/v3)
- [Minecraft Server API](https://mcsrvstat.us)

---

## 📋 Deployment Checklist

- [ ] Set YT_API_KEY and YT_CHANNEL_ID in Vercel
- [ ] Deploy to Vercel (see [DEPLOYMENT.md](./DEPLOYMENT.md))
- [ ] Add custom domain (optional)
- [ ] Verify sitemap at `/sitemap.xml`
- [ ] Submit sitemap to Google Search Console
- [ ] Configure contact form SMTP (optional)
- [ ] Enable Vercel Analytics
- [ ] Test all pages on mobile
- [ ] Verify YouTube videos load
- [ ] Verify Minecraft server status loads

---

## 🎉 You're Ready!

Your GamingOP website is **production-ready** and can be deployed in **5 minutes**.

👉 **[Start deploying with DEPLOYMENT.md](./DEPLOYMENT.md)**

Questions? Check the [Troubleshooting section](#troubleshooting) or review [DEPLOYMENT.md](./DEPLOYMENT.md).
