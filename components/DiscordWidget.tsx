'use client'

import React, { useEffect, useState } from 'react'

type DiscordMember = {
  id: string
  username: string
  avatar_url: string
  status: 'online' | 'idle' | 'dnd'
  game?: { name: string }
}

type WidgetData = {
  presence_count: number
  members: DiscordMember[]
}

const STATUS_COLOR: Record<string, string> = {
  online: '#3ba55d',
  idle: '#faa61a',
  dnd: '#ed4245'
}

const STATUS_LABEL: Record<string, string> = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb'
}

export default function DiscordWidget() {
  const [data, setData] = useState<WidgetData | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let mounted = true
    async function fetchWidget() {
      try {
        const res = await fetch('https://discord.com/api/guilds/1476254483234164957/widget.json')
        if (!res.ok) throw new Error('Widget disabled or unavailable')
        const json = await res.json()
        if (mounted) setData(json)
      } catch {
        if (mounted) setError(true)
      }
    }
    fetchWidget()
    const id = setInterval(fetchWidget, 60000)
    return () => { mounted = false; clearInterval(id) }
  }, [])

  return (
    <div className="glass p-5 rounded-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center text-white text-sm font-bold">D</div>
          <div>
            <h3 className="font-bold text-sm leading-tight">GamingOP Discord</h3>
            <p className="text-xs text-gray-400">Official Community Server</p>
          </div>
        </div>
        {data && (
          <span className="flex items-center gap-1 text-xs text-green-400">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
            {data.presence_count} online
          </span>
        )}
      </div>

      {/* Members list */}
      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {error && (
          <p className="text-xs text-gray-400 text-center py-4">
            Widget unavailable — server may have it disabled.
          </p>
        )}
        {!data && !error && (
          <p className="text-xs text-gray-400 animate-pulse-subtle text-center py-4">Loading members…</p>
        )}
        {data && data.members.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-4">No members currently visible.</p>
        )}
        {data && data.members.map((m) => (
          <div key={m.id} className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors">
            <div className="relative flex-shrink-0">
              <img
                src={m.avatar_url}
                alt={m.username}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://cdn.discordapp.com/embed/avatars/0.png' }}
              />
              <span
                className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-bg"
                style={{ backgroundColor: STATUS_COLOR[m.status] ?? '#747f8d' }}
                title={STATUS_LABEL[m.status] ?? m.status}
              ></span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{m.username}</p>
              {m.game && <p className="text-xs text-gray-400 truncate">Playing {m.game.name}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Join button */}
      <a
        href="https://discord.gg/Ezd32s4P8H"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#5865F2] hover:bg-[#4752c4] text-white text-sm font-semibold transition-colors no-underline"
      >
        <svg width="16" height="12" viewBox="0 0 127.14 96.36" fill="currentColor" className="flex-shrink-0">
          <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
        </svg>
        Join our Discord
      </a>
    </div>
  )
}
