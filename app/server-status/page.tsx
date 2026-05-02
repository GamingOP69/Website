import React from 'react'
import ServerStatus from '../../components/ServerStatus'

export default function ServerPage() {
  return (
    <main className="py-8">
      <h1 className="text-3xl font-bold mb-4">Server Status</h1>
      <ServerStatus server="mc.gamingop.qzz.io" showDetails />
    </main>
  )
}
