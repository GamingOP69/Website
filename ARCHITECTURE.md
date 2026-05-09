# GamingOP — Architecture & Codebase Guide

## 📊 Project Overview

**GamingOP** is a production-grade Next.js 14 website for a gaming creator hub featuring YouTube integration, Minecraft server status, Discord community, and monetization support.

**Domain:** `gamingop.qzz.io`  
**Hosting:** Vercel  
**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS 3

---

## 🗂️ Directory Structure

```
GamingOP/
├── app/                          # Next.js App Router (React Server Components)
│   ├── layout.tsx               # Root layout with metadata, AdSense script
│   ├── page.tsx                 # Homepage with videos, server status, events
│   ├── about/page.tsx           # About page
│   ├── privacy/page.tsx         # Privacy policy
│   ├── terms/page.tsx           # Terms of service
│   ├── server-status/page.tsx   # Minecraft server status detail page
│   └── youtube/
│       ├── page.tsx            # YouTube videos gallery
│       └── [id]/page.tsx       # Video detail page with metadata
│
├── components/                   # Reusable React Components (15 components)
│   ├── Header.tsx              # Navigation with logo, mobile menu
│   ├── Footer.tsx              # Footer with links and branding
│   ├── Hero.tsx                # Homepage hero banner
│   ├── PopularVideos.tsx       # Video grid display
│   ├── VideoLister.tsx         # Advanced video list with filters
│   ├── ServerStatus.tsx        # Minecraft server status widget
│   ├── DiscordWidget.tsx       # Discord embed and invite widget
│   ├── ContactForm.tsx         # Email contact form with SMTP
│   ├── EventsList.tsx          # Events display and management
│   ├── AdBanner.tsx            # Google AdSense ad placement
│   ├── CookieConsent.tsx       # GDPR cookie consent widget
│   ├── SEO.tsx                 # SEO metadata helper component
│   ├── Button.tsx              # Reusable button component
│   ├── Card.tsx                # Reusable card component
│   └── Filters.tsx             # Content filter component
│
├── pages/api/                    # Next.js API Routes
│   ├── youtube.ts              # YouTube API proxy (videos list)
│   ├── minecraft.ts            # Minecraft server status API
│   ├── contact.ts              # Contact form email handler
│   ├── trending.ts             # Trending videos endpoint
│   └── robots.ts               # Dynamic robots.txt generation
│
├── lib/                         # Helper Utilities (2 libraries)
│   ├── youtube.ts              # YouTube Data API functions
│   └── minecraft.ts            # Minecraft server API functions
│
├── styles/                      # Global Styles
│   └── globals.css             # Tailwind CSS + custom gaming styles
│
├── public/                      # Static Assets & SEO Files
│   ├── favicon.png, logo.png, banner.png, apple-touch-icon.png
│   ├── manifest.json           # PWA manifest
│   ├── robots.txt              # Search engine crawl rules
│   ├── sitemap.xml             # XML sitemap for SEO
│   ├── ads.txt                 # Google AdSense publisher declaration
│   ├── app-ads.txt            # Mobile app ad network declaration
│   └── data/events.json        # Events data file
│
├── resources/                   # Brand Assets
│   ├── logo.png               # Original logo
│   └── banner.png             # Original banner
│
├── scripts/                     # Build & Utility Scripts
│   └── generate-sitemap.js     # Sitemap generator script
│
├── Configuration Files
│   ├── package.json            # Dependencies (Next.js, Tailwind, Vercel tools)
│   ├── tsconfig.json           # TypeScript configuration
│   ├── next.config.js          # Next.js config (security headers, redirects)
│   ├── tailwind.config.js      # Tailwind theme customization
│   ├── postcss.config.js       # PostCSS configuration
│   ├── .eslintrc.mjs           # ESLint rules
│   ├── vercel.json             # Vercel deployment config
│   └── .env.example            # Environment variables template
│
└── Documentation
    ├── README.md               # Main project documentation
    ├── DEPLOYMENT.md          # Vercel deployment guide
    ├── ADSENSE_COMPLETE_SETUP.md # Google AdSense integration guide
    └── ARCHITECTURE.md        # This file
```

---

## 🧩 Component Architecture

### Core Components

#### **Layout Components**
- **Header** (`components/Header.tsx`)
  - Logo with Next.js Image optimization
  - Navigation menu (desktop) + hamburger (mobile)
  - Sticky positioning with glass morphism
  - Links to: Home, Videos, Server, About

- **Footer** (`components/Footer.tsx`)
  - Multi-column layout (responsive)
  - Brand section, navigation links, social links
  - Copyright and year auto-update

#### **Page Components**
- **Hero** (`components/Hero.tsx`)
  - Banner image display
  - Gradient text title
  - Call-to-action buttons
  - Stats grid (100K+ subscribers, 50+ videos, 24/7 server)
  - Server IP card with glow effect

- **PopularVideos** (`components/PopularVideos.tsx`)
  - Grid layout for video display
  - YouTube thumbnail images
  - Video card with metadata
  - Click to view detail page

- **VideoLister** (`components/VideoLister.tsx`)
  - Advanced video list with filters
  - Search functionality
  - Sorting options
  - Pagination support

- **ServerStatus** (`components/ServerStatus.tsx`)
  - Real-time Minecraft server status
  - Player count display
  - Server IP display
  - Join button
  - Auto-refreshes every 30 seconds

#### **Feature Components**
- **DiscordWidget** (`components/DiscordWidget.tsx`)
  - Embedded Discord server widget
  - Invite link fallback
  - Community statistics

- **EventsList** (`components/EventsList.tsx`)
  - Events display from JSON data
  - Calendar integration
  - Event filtering

- **ContactForm** (`components/ContactForm.tsx`)
  - Email form with validation
  - SMTP integration (Gmail, custom SMTP)
  - Auto-response notifications
  - Error handling

- **CookieConsent** (`components/CookieConsent.tsx`)
  - GDPR-compliant cookie banner
  - Accept/reject options
  - LocalStorage persistence

- **AdBanner** (`components/AdBanner.tsx`)
  - Google AdSense ad unit display
  - Responsive sizing
  - Non-intrusive placement

### Utility Components
- **Button** - Reusable button with variants
- **Card** - Reusable card container
- **Filters** - Content filtering UI
- **SEO** - SEO metadata helper

---

## 🔄 Data Flow & API Integration

### YouTube Integration
**Flow:** Component → `/api/youtube` → Google YouTube API v3 → YouTube Data

```
┌─ PopularVideos.tsx
├─ VideoLister.tsx
└─ /api/youtube.ts
   └─ lib/youtube.ts
      └─ Google YouTube API v3
```

**Features:**
- Latest videos by channel
- Popular videos
- Live stream detection
- Trending videos
- 60-120s caching

### Minecraft Server Status
**Flow:** Component → `/api/minecraft` → mcsrvstat.us API → Server Status

```
┌─ ServerStatus.tsx
└─ /api/minecraft.ts
   └─ lib/minecraft.ts
      └─ mcsrvstat.us API
```

**Features:**
- Real-time player count
- Server MOTD (Message of the Day)
- Server version info
- 15-60s caching

### Contact Form Email
**Flow:** Form → `/api/contact` → Nodemailer/SMTP → Email

```
┌─ ContactForm.tsx
└─ /api/contact.ts
   └─ Nodemailer
      └─ Gmail SMTP or custom SMTP
```

**Features:**
- Email validation
- SMTP fallback logging
- Rate limiting support
- Notification emails

---

## 🔐 Security Architecture

### Security Implementations
1. **API Key Protection**
   - All third-party API calls proxied server-side
   - Keys never exposed to client

2. **Security Headers** (in `next.config.js`)
   - HSTS (HTTP Strict-Transport-Security)
   - X-Frame-Options: SAMEORIGIN
   - X-Content-Type-Options: nosniff
   - X-XSS-Protection enabled
   - Referrer-Policy: strict-origin-when-cross-origin

3. **Middleware Protection** (`middleware.ts`)
   - Applied to all routes
   - CORS configuration
   - Request validation

4. **Environment Variables**
   - YouTube API Key (server-side only)
   - SMTP credentials (encrypted in Vercel)
   - No secrets in code

---

## ⚡ Performance Optimizations

### Image Optimization
- **Next.js Image Component**
  - Automatic format optimization (WebP, AVIF)
  - Responsive image sizing
  - Lazy loading
  - Cloudflare CDN delivery

### Caching Strategy
```
/api/* routes           → s-maxage=10s, stale-while-revalidate=59s
/public/static/*        → max-age=31536000s (1 year)
HTML pages              → no-cache (always fresh)
API responses           → Optimized per endpoint
```

### Bundle Optimization
- Code splitting by route
- Dynamic imports for heavy components
- Minification via Turbopack
- Tree-shaking of unused code

### Core Web Vitals
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Monitoring
- Vercel Analytics (real-time page views)
- Speed Insights (Core Web Vitals tracking)

---

## 🎨 Styling System

### Tailwind CSS Configuration
**File:** `tailwind.config.js`

**Custom Theme:**
```javascript
colors: {
  primary: '#ff3b3b'      // Gaming red
  accent: '#ff6b6b'       // Bright red
  bg: '#0b0f14'          // Deep dark
  'bg-dark': '#050609'   // Darker background
  'glass-light': '#1a1f2e'
  'glass-darker': '#000000'
}

shadows: {
  glow: '0 0 20px rgba(255, 59, 59, 0.5)'
  'glow-lg': '0 0 40px rgba(255, 59, 59, 0.6)'
  inner: 'inset 0 2px 4px rgba(0,0,0,0.6)'
}

backdropBlur: {
  xs: '2px', sm: '4px', ...
}
```

### Custom CSS Classes
**File:** `styles/globals.css`

```css
.glass              /* Glassmorphism effect */
.glass-hover       /* Hover state */
.gradient-text     /* Gradient text effect */
.btn               /* Button base */
.btn-primary       /* Primary button */
.btn-ghost         /* Ghost button */
.card              /* Card container */
.heading-*         /* Heading variants */
```

### Animations
- Fade-in on page load
- Slide-in from left
- Subtle pulse effects
- Smooth transitions on hover

---

## 🚀 Deployment Architecture

### Vercel Deployment
1. **Auto-Deploy:** Pushes to `main` trigger build
2. **Build Phase:**
   - Install dependencies
   - TypeScript compilation
   - Next.js build
   - Static generation
3. **Runtime:**
   - Serverless functions for `/api/*`
   - Static hosting for `.next/`
   - Edge caching via Vercel CDN

### Environment Variables (Vercel)
```
YT_API_KEY=your_youtube_api_key
YT_CHANNEL_ID=your_channel_id
MINECRAFT_SERVER=your_server_ip
SITE_URL=https://gamingop.qzz.io
SMTP_FROM=your_email@gmail.com
SMTP_TO=contact@gamingop.com
```

### Cloudflare Integration
- DNS management
- DDoS protection
- SSL/TLS termination
- Page caching rules
- WAF (Web Application Firewall)

---

## 📦 Dependencies

### Core
- **next@14.x** - React framework
- **react@18.x** - UI library
- **typescript** - Type safety

### Styling
- **tailwindcss@3.x** - Utility CSS
- **@tailwindcss/forms** - Form styling
- **@tailwindcss/typography** - Typography

### External APIs
- **axios** - HTTP client (optional)
- **nodemailer** - Email sending

### Monitoring
- **@vercel/analytics** - Page analytics
- **@vercel/speed-insights** - Core Web Vitals

### Development
- **eslint** - Code linting
- **typescript** - Type checking

---

## 🔄 Data Models

### YouTube Video
```typescript
{
  id: { videoId: string }
  snippet: {
    title: string
    description: string
    thumbnails: { medium: { url: string } }
    publishedAt: string
    channelTitle: string
  }
  statistics: {
    viewCount: string
    likeCount: string
  }
}
```

### Minecraft Server Status
```typescript
{
  online: boolean
  players: { online: number; max: number }
  motd: { clean: string[] }
  version: string
}
```

### Event
```typescript
{
  id: string
  title: string
  date: string
  description: string
  link?: string
}
```

---

## 🧪 Testing & Quality

### TypeScript
- Strict mode enabled
- Full type coverage
- Runtime type checking where needed

### ESLint
- Next.js core web vitals rules
- Code quality standards
- Accessibility checks

### Build Verification
- Production build tested
- Zero TypeScript errors
- All routes generate correctly
- Static/Dynamic routes optimized

---

## 📈 Monitoring & Analytics

### Vercel Analytics
- Real-time page views
- User sessions
- Traffic sources
- Device breakdowns

### Speed Insights
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

### Google Search Console
- Indexing status
- Crawl errors
- Search performance
- Sitemap status

### Google AdSense
- Impressions
- Ad clicks
- Click-through rate (CTR)
- Revenue per 1000 impressions (RPM)

---

## 🛠️ Development Workflow

### Local Development
```bash
npm install
npm run dev  # http://localhost:3000
```

### Build & Test
```bash
npm run build    # Production build
npm run lint     # ESLint check
npm run type-check  # TypeScript check
```

### Deployment
```bash
git push origin main  # Auto-deploys to Vercel
```

---

## 📋 Best Practices Implemented

✅ Server-Side Rendering for SEO  
✅ Static Generation where possible  
✅ API caching with stale-while-revalidate  
✅ Environment-based configuration  
✅ Security headers on all routes  
✅ Mobile-first responsive design  
✅ Image optimization  
✅ Code splitting & lazy loading  
✅ Error boundaries & fallbacks  
✅ Accessibility standards  
✅ GDPR compliance  
✅ Performance monitoring  

---

## 📚 Further Reading

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [YouTube Data API](https://developers.google.com/youtube/v3)

---

**Last Updated:** May 9, 2024  
**Version:** 1.0  
**Status:** Production Ready ✅
