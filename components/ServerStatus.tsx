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

  if (!info) return <div className="glass p-4">Loading server status...</div>

  const hasBedWars = info.motd?.clean?.join(' ').toLowerCase().includes('bedwars')

  return (
    <div className="glass p-4 rounded-md">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-300">{server}</div>
          <div className="text-lg font-bold">{info.online ? 'Online' : 'Offline'}</div>
        </div>
        <div className="text-right">
          <div className="text-sm">Players</div>
          <div className="font-mono">{info.players ? `${info.players.online}/${info.players.max}` : '—'}</div>
        </div>
      </div>

      {showDetails && info.motd && (
        <div className="mt-3 text-sm text-gray-300">{info.motd.clean.join(' ')}</div>
      )}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 bg-black/20 rounded">
          <div className="text-sm text-gray-300">Join</div>
          <div className="font-mono">{server}</div>
          <div className="mt-2 text-sm text-gray-400">To join, open Minecraft — Multiplayer — Add Server — enter the IP above.</div>
        </div>

        {hasBedWars && (
          <div className="p-3 bg-black/20 rounded">
            <div className="text-sm font-semibold">BedWars</div>
            <div className="text-sm text-gray-300">Queue info and stats are available in-game. Join to view maps and teams.</div>
          </div>
        )}
      </div>
    </div>
  )
}
