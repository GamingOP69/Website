'use client'

import React, { useEffect, useState } from 'react'

type ServerInfo = {
  online?: boolean
  players?: { online: number; max: number }
  motd?: { clean: string[] }
}

export default function ServerStatus({ server, showDetails }: { server: string; showDetails?: boolean }) {
  const [info, setInfo] = useState<ServerInfo | null>(null)

  useEffect(() => {
    let mounted = true
    async function fetchStatus() {
      try {
        const r = await fetch(`/api/minecraft?server=${encodeURIComponent(server)}`)
        const data = await r.json()
        if (mounted) setInfo(data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchStatus()
    const id = setInterval(fetchStatus, 30000)
    return () => { mounted = false; clearInterval(id) }
  }, [server])

  if (!info) return (
    <div className="surface p-4 animate-pulse-subtle text-center text-sm text-gray-400">
      Checking server...
    </div>
  )

  const isOnline = info.online === true

  return (
    <div className="surface space-y-4 p-5">
      {/* Status row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${isOnline ? 'bg-green-400' : 'bg-red-500'}`}></span>
          <span className={`text-sm font-semibold ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
        {info.players && (
          <div className="text-right">
            <span className="text-sm text-gray-400">Players: </span>
            <span className="font-mono font-semibold text-white">{info.players.online}/{info.players.max}</span>
          </div>
        )}
      </div>

      {/* Server IP */}
      <div className="space-y-1 rounded-lg bg-black/30 p-3">
        <p className="text-xs text-gray-400 uppercase tracking-wider">Server IP</p>
        <p className="font-mono text-base font-bold text-primary">{server}</p>
        <p className="text-xs text-gray-500">Minecraft / Multiplayer / Add Server / paste IP above</p>
      </div>

      {showDetails && info.motd?.clean && info.motd.clean.some(Boolean) && (
        <div className="text-xs text-gray-400 italic">{info.motd.clean.join(' ')}</div>
      )}
    </div>
  )
}
