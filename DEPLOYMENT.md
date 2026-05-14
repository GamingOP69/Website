# Vercel Deployment Guide — GamingOP Website

This is a complete, step-by-step guide for deploying the GamingOP website to Vercel with custom domain support.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Quick Deploy (5 minutes)](#quick-deploy-5-minutes)
3. [Environment Variables](#environment-variables)
4. [Advanced Configuration](#advanced-configuration)
5. [Custom Domain Setup](#custom-domain-setup)
6. [Post-Deployment Checklist](#post-deployment-checklist)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, you need:

- ✅ GitHub account with the repo pushed (already done)
- ✅ Vercel account (free tier works; sign up at https://vercel.com)
- ✅ YouTube API key (from Google Cloud Console)
- ✅ YouTube channel ID
- ✅ (Optional) SMTP credentials for contact form emails
- ✅ (Optional) Custom domain (gamingop.com, etc.)

### Get YouTube API Key & Channel ID

1. Go to https://console.cloud.google.com
2. Create a new project named "GamingOP"
3. Search for "YouTube Data API v3" and enable it
4. Go to Credentials → Create OAuth 2.0 API Key
5. Copy the API key
6. Find your channel ID:
   - Go to https://youtube.com/@gamingop-1m?si=qZfx45xAKVPyR4gy
   - Check the URL or go to YouTube Studio → Settings → Channel → Channel ID
   - It looks like: `UCxxxxxxxxxxxxxxxxxxxx`

---

## Quick Deploy (5 minutes)

### Step 1: Go to Vercel
1. Visit https://vercel.com/new
2. Sign in with GitHub (or create a free account)

### Step 2: Import Repository
1. Click "Import Project"
2. Paste your repo URL or search: `GamingOP69/Website`
3. Select the repo and click "Import"

### Step 3: Configure Project
The form should show:
- **Project name**: `gamingop-website` (or custom name)
- **Framework**: Next.js (auto-detected)
- **Root directory**: `./` (leave as is)

### Step 4: Add Environment Variables
Before clicking "Deploy", scroll to **Environment Variables** and add:

```
YT_API_KEY = YOUR_YOUTUBE_API_KEY_HERE
YT_CHANNEL_ID = UCxxxxxxxxxxxxxxxxxxxx
SITE_URL = https://gamingop-website.vercel.app
MINECRAFT_SERVER = gamingop.qzz.io
```

**Don't set SMTP variables yet** if you don't have them configured.

### Step 5: Deploy
1. Click the **Deploy** button
2. Vercel will build and deploy automatically (2-3 minutes)
3. Once done, you'll get a URL like: `https://gamingop-website.vercel.app`

✅ **Your site is live!**

---

## Environment Variables

### Required Variables
These **must** be set for the site to work:

#### YouTube Integration
```
YT_API_KEY=sk-1234567890abcdefghij...
YT_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxx
```

Get these from:
- **API Key**: Google Cloud Console → APIs & Services → Credentials
- **Channel ID**: YouTube Studio → Settings → Channel

#### Site URL
```
SITE_URL=https://your-domain.vercel.app
```

This is used for:
- Sitemap generation
- SEO meta tags
- Social sharing

#### Minecraft Server (Optional but Recommended)
```
MINECRAFT_SERVER=gamingop.qzz.io
```

Change this if your server address is different.

### Optional Variables
These enable extra features:

#### SMTP for Contact Form Emails
If you want users' contact form submissions emailed to you:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
CONTACT_TO_EMAIL=your-email@gmail.com
```

**Gmail Setup** (recommended):
1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character password as `SMTP_PASS`
4. Set `SMTP_USER` to your Gmail address
5. Set `CONTACT_TO_EMAIL` to where you want emails sent

**Other Email Providers**:
- Outlook: `smtp-mail.outlook.com`, port 587
- SendGrid: `smtp.sendgrid.net`, port 587, user: `apikey`
- Custom: Check your provider's SMTP settings

### How to Update Variables in Vercel

1. Go to https://vercel.com/dashboard
2. Click your project: `gamingop-website`
3. Go to **Settings** → **Environment Variables**
4. Add/edit variables:
   - Name: `YT_API_KEY`
   - Value: (paste your key)
   - Environments: Select all (Production, Preview, Development)
5. Click "Save"
6. Vercel will **automatically redeploy** your site with new variables

---

## Advanced Configuration

### Build Optimization

Vercel auto-detects Next.js and uses optimal settings. To customize:

1. In Vercel dashboard → **Settings** → **Build & Development Settings**
2. **Build Command**: `npm run build` (default, already correct)
3. **Output Directory**: (leave blank for Next.js)
4. **Install Command**: `npm ci || npm install` (already set)

### Automatic Deployments

By default:
- **Production**: Any push to `main` branch deploys to your production URL
- **Preview**: Pull requests get preview URLs for testing

To disable:
1. **Settings** → **Git** → **Deploy on Push**
2. Toggle off if you want manual deployments

### Build Caching

Vercel caches builds automatically. To clear cache:
1. Go to **Deployments** tab
2. Click the three dots on any deployment
3. Select **Redeploy**

### Custom Build Output

If you need to run a script before/after build:

1. Create `.vercelignore` to skip files:
```
node_modules/
.git/
.env.local
```

2. Edit `vercel.json` for advanced routing and headers (already created with basics).

---

## Custom Domain Setup

### Option 1: Vercel Domains (Easiest)

1. Buy domain from Vercel's partner registrars:
   - Go to **Settings** → **Domains** → **Add Domain**
   - Search for domain (e.g., `gamingop.com`)
   - Register and auto-configure DNS

2. Or connect existing domain registrar:
   - Go to **Settings** → **Domains** → **Add Domain**
   - Enter your domain (e.g., `gamingop.com`)
   - Vercel provides DNS records to add to your registrar

### Option 2: Connect Existing Domain

If you already own `gamingop.com` through GoDaddy, Namecheap, etc.:

#### Step 1: Get Nameservers from Vercel
1. Go to Vercel dashboard → **Settings** → **Domains**
2. Click **Add Domain**
3. Enter `gamingop.com`
4. Select "Use Vercel Nameservers"
5. Vercel shows 4 nameserver addresses:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ns3.vercel-dns.com
   ns4.vercel-dns.com
   ```

#### Step 2: Update Registrar (GoDaddy Example)
1. Log in to GoDaddy account
2. Go to **Domains** → your domain → **DNS**
3. Find **Nameservers** section
4. Replace with Vercel's 4 nameservers above
5. Save changes (DNS propagation: 24-48 hours)

#### Step 3: Verify in Vercel
1. After 24 hours, return to Vercel **Domains**
2. Vercel should show: ✅ **Valid Configuration**
3. Your site is now at `https://gamingop.com`

**Other Registrars**:
- **Namecheap**: Domain → Nameservers → Custom DNS
- **Bluehost**: Domains → Manage → Nameservers
- **Google Domains**: Domain Settings → Custom nameservers

### Option 3: Subdomain (If You Already Have a Domain)

If you want `gaming.example.com` instead of a new domain:

1. In Vercel **Domains**, enter: `gaming.example.com`
2. Vercel shows a CNAME record:
   ```
   gaming.example.com → cname.vercel-dns.com
   ```
3. In your registrar, add this CNAME to DNS
4. Wait for DNS propagation (minutes to hours)

---

## SSL/HTTPS Certificate

✅ **Vercel automatically provides free SSL certificates** (Let's Encrypt).

Once domain is connected:
- Your site gets HTTPS automatically
- Redirects `http://` → `https://`
- No manual setup needed

To verify:
1. Visit `https://gamingop.com`
2. Click the lock icon in browser
3. Should show "Secure" and your domain

---

## Sitemap & SEO

After deploying with a custom domain, generate the sitemap:

### Method 1: Local Generation (Recommended)
1. On your machine, ensure `SITE_URL` is set in `.env.local`:
   ```
   SITE_URL=https://gamingop.com
   ```
2. Run:
   ```bash
   npm run sitemap
   ```
3. A `public/sitemap.xml` file is created
4. Push to GitHub:
   ```bash
   git add public/sitemap.xml
   git commit -m "chore: generate sitemap for gamingop.com"
   git push origin main
   ```
5. Vercel redeploys automatically

### Method 2: Vercel Deployment Hooks
1. Create a script to run sitemap generation after deploy
2. Contact Vercel support or use GitHub Actions to trigger it

### Verify Sitemap
1. Visit `https://gamingop.com/sitemap.xml`
2. Should see XML with all pages listed
3. Submit to Google Search Console: https://search.google.com/search-console
   - Add your domain property
   - Upload or fetch sitemap
   - Wait for indexing (can take days)

---

## Post-Deployment Checklist

- [ ] Site loads at `https://gamingop.com` (or vercel URL)
- [ ] YouTube videos appear on homepage (if API key is set)
- [ ] Minecraft server status shows correctly
- [ ] Navigation links work (/about, /youtube, /server-status)
- [ ] Contact form loads (no errors in browser console)
- [ ] Mobile responsive (test on phone)
- [ ] All images load (no 404s)
- [ ] SSL certificate is valid (green lock icon)
- [ ] Sitemap is at `/sitemap.xml`
- [ ] Open Graph meta tags work (test with https://ogp.me)

---

## Monitoring & Analytics

### Vercel Built-in Analytics
1. Vercel dashboard → **Analytics**
2. Real-time page views, edge function usage
3. Performance metrics (LCP, FID, CLS)

### Enable Web Analytics
1. Go to **Settings** → **Analytics**
2. Toggle **Web Analytics** on (free tier: 2500 events/month)
3. Vercel injects tracking script automatically
4. View analytics in dashboard

### Google Analytics (Optional)
For more detailed analytics:

1. Create Google Analytics 4 property: https://analytics.google.com
2. Get Measurement ID (starts with `G-`)
3. Add to environment variables:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
4. Install `@next/third-parties`:
   ```bash
   npm install @next/third-parties
   ```
5. Add to `app/layout.tsx`:
   ```tsx
   import { GoogleAnalytics } from '@next/third-parties/google'

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
         </body>
       </html>
     )
   }
   ```
6. Redeploy: `git push origin main`

---

## Troubleshooting

### Site shows "404" or "Not Found"
- Check environment variables are set in Vercel dashboard
- Verify `SITE_URL` matches your actual domain
- Rebuild: Dashboard → Deployments → right-click latest → Redeploy

### YouTube videos don't load
- Verify `YT_API_KEY` and `YT_CHANNEL_ID` are correct
- Check API quota hasn't been exceeded: https://console.cloud.google.com
- Ensure API is enabled for YouTube Data API v3

### Contact form doesn't send emails
- SMTP variables might be missing
- Check `CONTACT_TO_EMAIL` is set
- Verify credentials (especially Gmail app password)
- Check browser console for errors
- Test with Vercel logs: Dashboard → Deployments → Function Logs

### DNS not propagating
- Nameserver changes take 24-48 hours
- Use https://dnschecker.org to verify propagation
- Clear browser cache (Ctrl+Shift+Del)

### Minecraft server shows "Offline"
- Verify server is actually running at `gamingop.qzz.io`
- Check port is open
- Try with a Minecraft server checker: https://mcsrvstat.us

### Build fails on deploy
- Check GitHub Actions logs: GitHub → Actions → Latest workflow
- Review Vercel build logs: Dashboard → Deployments → click failed deploy
- Common issues:
  - Missing environment variables
  - Node version incompatibility
  - Missing dependencies

---

## Rollback & Undo Deployments

If something goes wrong:

1. **Vercel Dashboard** → **Deployments**
2. Find a previous working deployment
3. Click three dots → **Promote to Production**
4. Site instantly reverts to that version

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **YouTube API**: https://developers.google.com/youtube/v3
- **Minecraft Server API**: https://mcsrvstat.us

---

## Next Steps

1. ✅ Deploy to Vercel (follow **Quick Deploy** above)
2. ✅ Set up custom domain (follow **Custom Domain Setup**)
3. ✅ Add analytics (optional, follow **Monitoring & Analytics**)
4. ✅ Submit sitemap to Google Search Console
5. ✅ Monitor performance in Vercel Analytics

**Your GamingOP website is ready for production!** 🚀

