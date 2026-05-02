import React from 'react'

const demoEvents = [
  { id: 1, title: 'Monthly Giveaway', date: '2026-05-15', desc: 'Giveaway for subscribers — PC key + merch.' },
  { id: 2, title: 'Community Game Night', date: '2026-05-22', desc: 'Join the GamingOP server for BedWars and squads.' }
]

export default function EventsList({ events = demoEvents }: { events?: any[] }) {
  return (
    <div className="glass p-4 rounded-md">
      <h3 className="font-bold mb-3">Upcoming Events</h3>
      <ul className="space-y-3">
        {events.map((e) => (
          <li key={e.id} className="p-3 border rounded-md border-transparent hover:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{e.title}</div>
                <div className="text-sm text-gray-300">{e.desc}</div>
              </div>
              <div className="text-sm text-gray-400">{e.date}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
