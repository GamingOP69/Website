import React from 'react'

const demoEvents = [
  { id: 1, title: 'Monthly Giveaway', date: '2026-05-15', desc: 'Giveaway for subscribers — PC key + merch.' },
  { id: 2, title: 'Community Game Night', date: '2026-05-22', desc: 'Join the GamingOP server for BedWars and squads.' }
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function EventsList({ events = demoEvents }: { events?: any[] }) {
  return (
    <div className="glass p-5 rounded-xl space-y-3">
      <h3 className="font-bold text-base sm:text-lg">Upcoming Events</h3>
      <ul className="space-y-3">
        {events.map((e) => (
          <li key={e.id} className="flex gap-4 p-3 sm:p-4 rounded-lg bg-white/5 hover:bg-white/8 border border-transparent hover:border-gray-700 transition-all">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/20 flex flex-col items-center justify-center text-primary">
              <span className="text-xs font-semibold leading-tight">{new Date(e.date).toLocaleDateString('en-US', { month: 'short' })}</span>
              <span className="text-lg font-bold leading-tight">{new Date(e.date).getDate()}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm sm:text-base truncate">{e.title}</div>
              <div className="text-xs sm:text-sm text-gray-400 mt-0.5">{e.desc}</div>
              <div className="text-xs text-gray-500 mt-1">{formatDate(e.date)}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
