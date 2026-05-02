import React from 'react'

export default function DiscordWidget() {
  return (
    <div className="glass p-4 rounded-md">
      <h3 className="font-bold mb-2">Join our Discord</h3>
      <iframe 
        src="https://discord.com/widget?id=1476254483234164957&theme=dark" 
        width={350} 
        height={500} 
        allowTransparency={true}
        frameBorder={0}
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      ></iframe>
      <p className="text-sm text-gray-300 mt-2">Or join via invite: <a href="https://discord.gg/Ezd32s4P8H" className="text-primary">discord.gg/Ezd32s4P8H</a></p>
    </div>
  )
}
