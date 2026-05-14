"use client"

import React, { useState, useRef } from 'react'

export default function TesseractOCR() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  async function runOCR(file: File) {
    setLoading(true)
    setText('')
    try {
      // Load Tesseract from CDN
      if (!(window as any).Tesseract) {
        await new Promise((res, rej) => {
          const s = document.createElement('script')
          s.src = 'https://unpkg.com/tesseract.js@2.1.5/dist/tesseract.min.js'
          s.async = true
          s.onload = res
          s.onerror = rej
          document.head.appendChild(s)
        })
      }

      const Tesseract = (window as any).Tesseract
      const { createWorker } = Tesseract
      const worker = createWorker({ logger: () => {} })
      await worker.load()
      await worker.loadLanguage('eng')
      await worker.initialize('eng')

      const data = await file.arrayBuffer()
      const blob = new Blob([data])
      const result = await worker.recognize(blob)
      setText(result.data.text || '')
      await worker.terminate()
    } catch (err) {
      setText('Error: Unable to extract text from image.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function onChoose() {
    inputRef.current?.click()
  }

  return (
    <div className="space-y-3">
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
        const f = e.target.files?.[0]
        if (f) runOCR(f)
      }} />
      <div className="flex gap-2">
        <button onClick={onChoose} className="btn btn-primary">Choose Image</button>
        <button onClick={() => { setText('') }} className="btn">Clear</button>
      </div>

      {loading ? (
        <div className="text-sm text-gray-400">Processing image… this runs locally in your browser.</div>
      ) : null}

      <textarea value={text} readOnly rows={8} className="w-full bg-black/20 rounded-md p-3 text-sm text-gray-200 font-mono" />
    </div>
  )
}
