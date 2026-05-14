export const SITE_URL = 'https://gamingop.qzz.io'

export const SITE_NAME = 'GamingOP'
export const SITE_DESCRIPTION =
  'GamingOP is a gaming creator and coder hub with YouTube videos, Minecraft server resources, local browser tools, original guides, community links, and a future merch lab.'

export const SOCIAL_LINKS = {
  youtube: 'https://www.youtube.com/@GamingOP-1M',
  discord: 'https://discord.com/invite/Ezd32s4P8H',
  minecraftVote: 'https://minecraftservers.org/vote/686902',
  minecraftServer: 'https://minecraftservers.org/server/686902',
  twitch: 'https://www.twitch.tv/gamingop69',
}

export const MINECRAFT_SERVER = 'mc.gamingop.qzz.io'

export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-2778216399702742'

// AdSense Slots - Using auto-ads by default, ready for manual slot IDs
// Google AdSense auto-ads will automatically detect and fill optimal ad placements
// These slots are reserved for strategic manual placements and future monetization
export const AD_SLOTS = {
  // Homepage
  homeHero: '',
  homeValueCards: '',
  homeVideosFeed: '',
  homeContact: '',
  homeFeed: '', // for sidebar
  homeSidebar: '',
  
  // Videos/YouTube page
  videosTop: '',
  videosMiddle: '',
  videosBottom: '',
  videosSidebar: '',
  
  // Video detail page
  videoDetailTop: '',
  videoDetailMiddle: '',
  videoDetailBottom: '',
  videoDetail: '', // legacy support
  
  // Guides index page
  guidesTop: '',
  guidesBottom: '',
  guidesSidebar: '',
  
  // Guide detail page
  guideDetailTop: '',
  guideDetailMiddle: '',
  guideDetailBottom: '',
  guideDetail: '', // legacy support
  
  // Tools page
  toolsTop: '',
  toolsMiddle: '',
  toolsBottom: '',
  
  // Other pages
  serverStatusTop: '',
  serverStatusBottom: '',
  shopTop: '',
  aboutTop: '',
}
