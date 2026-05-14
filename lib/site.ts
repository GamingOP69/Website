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

export const AD_SLOTS = {
  homeFeed: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_FEED || '',
  homeSidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_SIDEBAR || '',
  videosTop: process.env.NEXT_PUBLIC_ADSENSE_SLOT_VIDEOS_TOP || '',
  guidesTop: process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDES_TOP || '',
  guideDetail: process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE_DETAIL || '',
  videoDetail: process.env.NEXT_PUBLIC_ADSENSE_SLOT_VIDEO_DETAIL || '',
  toolsTop: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOLS_TOP || '',
}
