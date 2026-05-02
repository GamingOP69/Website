# GamingOP — Production-Ready Website

A **complete, production-grade Next.js + Tailwind website** for the GamingOP creator hub with YouTube integration, Minecraft server status, Discord community, contact forms, and one-click Vercel deployment.

## ✨ Features

- 🎥 **YouTube Integration** — Latest, popular, live, and trending videos
- 🎮 **Minecraft Server Status** — Real-time player count and join instructions
- 💬 **Discord Community Widget** — Embed and events showcase
- 📧 **Contact Form** — SMTP email support (Gmail, custom SMTP, etc.)
- 🎨 **Gaming UI/UX** — Dark theme, glassmorphism, smooth animations
- 📱 **Mobile Responsive** — Works perfectly on all devices
- 🔍 **SEO Optimized** — Sitemap, robots.txt, Open Graph, JSON-LD
- ⚡ **High Performance** — 88 KB First Load JS, ISR caching
- 🔒 **Security** — HSTS, CSP, XSS protection, API key hiding
- 🚀 **Deploy in 5 Minutes** — Vercel one-click deploy
- 🌍 **Custom Domains** — Full DNS/nameserver setup support

## 🚀 Deploy Now (5 Minutes)

### One-Click Vercel Deploy
1. Click: https://vercel.com/new
2. Import `GamingOP69/Website`
3. Add environment variables (API keys)
4. Click **Deploy**
5. ✅ Live at `https://gamingop-website.vercel.app`

**For full guide with custom domains, SMTP, analytics → [Read DEPLOYMENT.md](./DEPLOYMENT.md)**

## 🏠 Quick Start (Local)

```bash
# 1. Install
npm install

# 2. Configure
cp .env.example .env.local
# Edit .env.local with your YouTube API key and channel ID

# 3. Run
npm run dev
# Visit http://localhost:3000

# 4. Build
npm run build
npm start
```

## 📚 Documentation

- **[README_SCAFFOLD.md](./README_SCAFFOLD.md)** — Project structure, features, customization
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — Complete Vercel deployment guide with:
  - Step-by-step setup
  - Custom domain instructions
  - Gmail/SMTP configuration
  - Google Analytics setup
  - Troubleshooting & rollback
  - DNS nameserver guide (GoDaddy, Namecheap, etc.)
  - SSL/HTTPS verification
  - Sitemap & SEO enhancement

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS 3 + Glassmorphism
- **Language**: TypeScript
- **API Integrations**: YouTube Data API v3, Minecraft Server API
- **Hosting**: Vercel (free tier supported)
- **Forms**: Nodemailer (SMTP) with fallback logging
- **Security**: Middleware with HSTS, CSP, anti-MIME sniffing
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
├── app/                    # Next.js pages
│   ├── page.tsx           # Home
│   ├── youtube/page.tsx   # Videos list
│   ├── youtube/[id]/      # Video detail
│   ├── about/page.tsx     # About
│   └── server-status/page.tsx
├── components/            # UI components
│   ├── Hero.tsx, VideoGrid.tsx
│   ├── ServerStatus.tsx, ContactForm.tsx
│   ├── DiscordWidget.tsx, EventsList.tsx
│   └── ...
├── pages/api/            # API routes
│   ├── youtube.ts       # Proxy + caching
│   ├── minecraft.ts     # Server status
│   ├── trending.ts      # Trending algorithm
│   └── contact.ts       # Contact form
├── lib/                 # Helpers
├── styles/globals.css   # Tailwind + glass
├── middleware.ts        # Security headers
├── DEPLOYMENT.md        # 📖 Full deploy guide
└── README_SCAFFOLD.md   # 📖 Detailed setup
```

## 🌍 Environment Variables

### Required
```
YT_API_KEY=your_youtube_api_key_here
YT_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxxxx
SITE_URL=https://your-domain.com
MINECRAFT_SERVER=gamingop.qzz.io
```

### Optional
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO_EMAIL=owner@example.com
```

See [.env.example](./.env.example) for all options.

## 📖 Get YouTube API Key

1. Go to https://console.cloud.google.com
2. Create project "GamingOP"
3. Enable "YouTube Data API v3"
4. Create API Key in Credentials
5. Get Channel ID: https://youtube.com/@gamingop-1m → URL or YouTube Studio → Settings

## 🎯 Key Pages

| Page | URL | Features |
|------|-----|----------|
| **Home** | `/` | Hero, latest videos, popular, events, server status |
| **Videos** | `/youtube` | Filter by game/tag, trending |
| **Video Detail** | `/youtube/[id]` | Embedded player, stats, description |
| **Server** | `/server-status` | Live player count, join instructions, BedWars info |
| **About** | `/about` | Bio, career, portfolio |

## 🔗 API Routes

| Route | Purpose | Caching |
|-------|---------|---------|
| `/api/youtube?mode=latest` | Latest videos | 60s |
| `/api/youtube?mode=popular` | Most viewed | 60s |
| `/api/youtube?mode=live` | Live streams | 60s |
| `/api/trending` | Trending (scored) | 120s |
| `/api/minecraft` | Server status | 15s |
| `/api/contact` | Contact form handler | — |

## 🔒 Security Features

- API keys never exposed client-side ✅
- Server-side proxy routes with caching ✅
- HSTS headers (forces HTTPS) ✅
- XSS protection, CSP compliance ✅
- Clickjacking prevention ✅
- MIME type sniffing prevention ✅
- TypeScript strict mode ✅

## ⚡ Performance

- **First Load JS**: 88 KB (excellent)
- **Static Generation**: 6 pages prerendered
- **Dynamic Routes**: API caching (15-120s)
- **Image Optimization**: Next.js automatic
- **Bundle Size**: Optimized with tree-shaking

Lighthouse scores (target): 90+ Performance, 95+ SEO, 100 Accessibility

## 🚀 Deploy Steps

### Vercel (Recommended)
**[Full step-by-step guide → DEPLOYMENT.md](./DEPLOYMENT.md)**

Quick summary:
1. https://vercel.com/new → Import repo
2. Add env variables
3. Click Deploy
4. Add custom domain (optional)

### Other Platforms
Can deploy to:
- **Netlify**: `npm run build` → deploy `.next`
- **Docker**: `docker build . && docker run`
- **Self-hosted**: Node.js: `npm run build && npm start`

## 📊 Analytics & Monitoring

### Vercel Built-in
- Real-time page views
- Performance metrics (LCP, FID, CLS)
- Function logs and errors

### Optional
- Google Analytics 4 (setup in DEPLOYMENT.md)
- Sentry error tracking (production errors)
- Custom analytics script

## 🤝 Customization

### Change Discord Server
Edit `components/DiscordWidget.tsx`:
```tsx
<iframe src="https://discord.com/widget?id=YOUR_DISCORD_ID&theme=dark" />
```

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#ff3b3b',  // Red accent
  bg: '#0b0f14',      // Dark background
}
```

### Add Custom Fonts
`styles/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');
```

## 📝 Commands

```bash
npm run dev     # Dev server (localhost:3000)
npm run build   # Production build
npm start       # Run production
npm run lint    # TypeScript & linting
npm run sitemap # Generate sitemap.xml
```

## 🐛 Troubleshooting

- **Videos don't load**: Check `YT_API_KEY` in Vercel env vars
- **Server status offline**: Verify Minecraft server IP is correct
- **Contact form fails**: Check SMTP variables and app password
- **Build error**: See GitHub Actions logs

**Full troubleshooting guide → [DEPLOYMENT.md#troubleshooting](./DEPLOYMENT.md#troubleshooting)**

## 📚 Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [Minecraft Server API](https://mcsrvstat.us)

## ✅ Deployment Checklist

- [ ] Fork/clone repo
- [ ] Get YouTube API key
- [ ] Deploy to Vercel
- [ ] Set environment variables
- [ ] Add custom domain (optional)
- [ ] Configure SMTP (optional)
- [ ] Submit sitemap to Google Search Console
- [ ] Enable analytics
- [ ] Test all pages

## 🎉 Ready to Deploy?

**[👉 Full deployment guide with custom domains, SMTP, and troubleshooting → DEPLOYMENT.md](./DEPLOYMENT.md)**

Or deploy now: https://vercel.com/new

---

Built with ❤️ for creators. Optimize, customize, and launch your gaming brand today.

# Website