"use client"

import React from 'react'
import CollapseList from './CollapseList'

export default function GuidesClientWrapper({ guides }: any) {
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Beginner': return 'text-green-400'
      case 'Intermediate': return 'text-yellow-400'
      case 'Advanced': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <section className="space-y-4">
      <h2 className="heading-lg text-white">All Guides</h2>
      <CollapseList initial={4}>
        {guides.map((guide: any, idx: number) => (
          <div
            key={idx}
            className="glass rounded-lg p-4 hover:bg-white/10 transition flex items-start gap-4 cursor-pointer group"
          >
            <div className="text-3xl group-hover:scale-110 transition">{guide.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-white">{guide.title}</h3>
                <span className={`text-xs font-semibold ${getDifficultyColor(guide.difficulty)}`}>
                  {guide.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">{guide.description}</p>
              <div className="mt-2 flex gap-2 flex-wrap">
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{guide.category}</span>
              </div>
            </div>
          </div>
        ))}
      </CollapseList>
    </section>
  )
}
