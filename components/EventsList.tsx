'use client'

import React, { useEffect, useState } from 'react'

type Event = {
  id: number
  title: string
  date: string
  desc: string
  link?: string
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function isPast(dateStr: string) {
  return new Date(dateStr).getTime() < Date.now()
}

export default function EventsList() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    fetch('/data/events.json')
      .then((r) => r.ok ? r.json() : [])
      .then((data: Event[]) => setEvents(data))
      .catch(() => setEvents([]))
  }, [])

  const upcoming = events.filter((e) => !isPast(e.date))
  const past = events.filter((e) => isPast(e.date))

  if (events.length === 0) {
    return (
      <div className="glass p-6 rounded-xl text-center text-gray-400 text-sm">
        No upcoming events right now. Check back soon!
      </div>
    )
  }

  return (
    <div className="glass p-5 rounded-xl space-y-4">
      <h3 className="font-bold text-base sm:text-lg">Upcoming Events</h3>
      {upcoming.length === 0 && (
        <p className="text-sm text-gray-400">No upcoming events scheduled.</p>
      )}
      <ul className="space-y-3">
        {upcoming.map((e) => (
          <EventItem key={e.id} event={e} />
        ))}
      </ul>

      {past.length > 0 && (
        <>
          <h4 className="text-sm text-gray-500 font-semibold uppercase tracking-wider pt-2">Past Events</h4>
          <ul className="space-y-3 opacity-60">
            {past.map((e) => (
              <EventItem key={e.id} event={e} past />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

function EventItem({ event: e, past = false }: { event: Event; past?: boolean }) {
  const month = new Date(e.date).toLocaleDateString('en-US', { month: 'short' })
  const day = new Date(e.date).getDate()

  const inner = (
    <li className={`flex gap-4 p-3 sm:p-4 rounded-lg bg-white/5 hover:bg-white/8 border border-transparent hover:border-gray-700 transition-all ${past ? '' : 'cursor-pointer'}`}>
      <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex flex-col items-center justify-center ${past ? 'bg-gray-700/30 text-gray-500' : 'bg-primary/20 text-primary'}`}>
        <span className="text-xs font-semibold leading-tight">{month}</span>
        <span className="text-lg font-bold leading-tight">{day}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-sm sm:text-base truncate">{e.title}</div>
        <div className="text-xs sm:text-sm text-gray-400 mt-0.5">{e.desc}</div>
        <div className="text-xs text-gray-500 mt-1">{formatDate(e.date)}</div>
      </div>
    </li>
  )

  if (e.link) {
    return (
      <a href={e.link} target="_blank" rel="noopener noreferrer" className="no-underline block">
        {inner}
      </a>
    )
  }
  return inner
}
