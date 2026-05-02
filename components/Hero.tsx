import React from 'react'

export default function Hero() {
  return (
    <div className="rounded-xl p-8 glass">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold">GamingOP</h1>
          <p className="mt-2 text-gray-300">YouTube creator • Minecraft server • Esports vibes</p>
          <div className="mt-4 flex gap-3">
            <a className="px-4 py-2 bg-primary rounded-md" href="https://youtube.com/@gamingop-1m?si=qZfx45xAKVPyR4gy">Subscribe</a>
            <a className="px-4 py-2 border rounded-md" href="https://discord.gg/Ezd32s4P8H">Discord</a>
          </div>
        </div>
        <div className="w-48 h-28 bg-gradient-to-br from-red-600 to-pink-500 rounded-md flex items-center justify-center">
          <span className="font-bold">Server: mc.gamingop.qzz.io</span>
        </div>
      </div>
    </div>
  )
}
