export type Guide = {
  slug: string
  title: string
  description: string
  category: string
  readingTime: string
  updated: string
  sections: Array<{
    heading: string
    body: string[]
  }>
  checklist?: string[]
}

export const guides: Guide[] = [
  {
    slug: 'minecraft-server-join-troubleshooting',
    title: 'Minecraft Server Join and Troubleshooting Guide',
    description:
      'A practical guide for joining the GamingOP Minecraft server, checking connection issues, and getting help without guessing.',
    category: 'Minecraft',
    readingTime: '5 min read',
    updated: 'May 14, 2026',
    sections: [
      {
        heading: 'Before you connect',
        body: [
          'Use the server address shown on this site and type it exactly into Minecraft. Extra spaces, old copied links, or browser autocorrect can cause a failed connection.',
          'If the server status widget says offline, wait a few minutes and check Discord for maintenance notes before changing your settings.',
        ],
      },
      {
        heading: 'Connection checks that solve most problems',
        body: [
          'Restart Minecraft and your launcher first. If the server list is stuck on pinging, refresh the server list after a clean restart.',
          'Check whether you are using the Minecraft edition and version supported by the server at that time. Version changes are announced through the community channels when needed.',
          'If you can join other servers but not this one, copy the server IP again from the server page and remove any saved old entry.',
        ],
      },
      {
        heading: 'When to ask for help',
        body: [
          'Ask in Discord when you have repeated timeouts, authentication errors, or a message that mentions a version mismatch.',
          'Share the exact error text, your Minecraft edition, and whether the server status page shows online or offline. That makes support faster and avoids repeated questions.',
        ],
      },
    ],
    checklist: [
      'Copy the server IP from the server page.',
      'Restart Minecraft before retrying.',
      'Check Discord for maintenance or version notes.',
      'Send the exact error text if you need support.',
    ],
  },
  {
    slug: 'low-lag-recording-streaming-setup',
    title: 'Low-Lag Recording and Streaming Setup for Gamers',
    description:
      'A creator-focused setup guide for smoother gameplay recording, cleaner audio, and fewer frame drops on average hardware.',
    category: 'Creator Setup',
    readingTime: '6 min read',
    updated: 'May 14, 2026',
    sections: [
      {
        heading: 'Start with stability',
        body: [
          'A stable frame rate looks better than a high frame rate that constantly drops. Pick settings your PC can hold during fights, fast movement, and busy scenes.',
          'Record a one-minute test before a real session. Watch it back for stutter, audio delay, and unreadable UI before you spend time making a full video.',
        ],
      },
      {
        heading: 'Recording settings that usually help',
        body: [
          'Use hardware encoding when your GPU supports it, because it reduces CPU pressure while gaming.',
          'For 1080p videos, start with 60 FPS only if the game stays smooth. If gameplay drops frames, 30 FPS with clear audio is often better for viewers.',
          'Keep overlays simple. Too many moving widgets can increase lag and distract from the gameplay.',
        ],
      },
      {
        heading: 'Audio matters more than people expect',
        body: [
          'Keep game audio lower than voice so callouts and reactions are easy to understand.',
          'Record a short voice test and listen on phone speakers, not only headphones. Many viewers watch on small speakers.',
        ],
      },
    ],
    checklist: [
      'Run a one-minute test recording.',
      'Prefer stable FPS over maximum FPS.',
      'Use hardware encoding if available.',
      'Check audio on phone speakers before publishing.',
    ],
  },
  {
    slug: 'gaming-community-safety-rules',
    title: 'Gaming Community Safety and Fair Play Guide',
    description:
      'Clear rules for safer public gaming communities, fair Minecraft sessions, and respectful Discord conversations.',
    category: 'Community',
    readingTime: '4 min read',
    updated: 'May 14, 2026',
    sections: [
      {
        heading: 'Fair play keeps the server fun',
        body: [
          'Do not use hacked clients, cheat tools, unfair macros, or unauthorized mods. Even one unfair player can ruin a match or survival world for everyone else.',
          'Do not grief other players builds or steal items. If an event has special rules, follow the event rules even when the normal server rules are different.',
        ],
      },
      {
        heading: 'Keep chat useful',
        body: [
          'Avoid harassment, hate speech, spam, and personal attacks. Competitive games can be intense, but the community should still be a place people can return to.',
          'Do not share personal information in public chat. That includes real names, phone numbers, addresses, private photos, or login details.',
        ],
      },
      {
        heading: 'Reporting problems',
        body: [
          'When reporting a rule break, send screenshots, timestamps, usernames, and a short description. Clear reports help moderators act faster.',
          'Do not start public arguments about reports. Send evidence to the right channel or moderator and let the team review it.',
        ],
      },
    ],
    checklist: [
      'No hacks, cheating, or unauthorized unfair mods.',
      'No harassment, hate speech, or personal attacks.',
      'Do not share private personal information.',
      'Report problems with evidence and timestamps.',
    ],
  },
  {
    slug: 'youtube-gaming-video-checklist',
    title: 'Gaming Video Upload Checklist',
    description:
      'A practical publishing checklist for gaming videos: titles, thumbnails, descriptions, chapters, and viewer-friendly structure.',
    category: 'YouTube',
    readingTime: '5 min read',
    updated: 'May 14, 2026',
    sections: [
      {
        heading: 'Make the topic obvious',
        body: [
          'The title should explain the game, the challenge, or the moment. Avoid vague titles that only make sense after someone already watches.',
          'A thumbnail should be readable on a phone. Use one clear subject and avoid stuffing too many words into a small space.',
        ],
      },
      {
        heading: 'Help viewers decide quickly',
        body: [
          'Use the first lines of the description to summarize what happens in the video. Add server links, Discord links, and credits below that.',
          'For longer videos, add chapters when the video has clear sections. Chapters help viewers jump to the part they care about and can improve watch experience.',
        ],
      },
      {
        heading: 'Keep a repeatable workflow',
        body: [
          'Before uploading, check audio levels, dead silence, black frames, and accidental private information on screen.',
          'After publishing, reply to useful comments and note questions that could become the next guide, stream topic, or tutorial.',
        ],
      },
    ],
    checklist: [
      'Clear game or challenge in the title.',
      'Readable phone-sized thumbnail.',
      'Description starts with a real summary.',
      'Links and credits are organized below the summary.',
      'Final watch-through before publishing.',
    ],
  },
]

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}
