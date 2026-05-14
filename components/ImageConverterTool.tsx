'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'

type OutputFormat = 'image/jpeg' | 'image/png' | 'image/webp'

const FORMAT_OPTIONS: Array<{ label: string; value: OutputFormat; extension: string }> = [
  { label: 'JPEG', value: 'image/jpeg', extension: 'jpg' },
  { label: 'PNG', value: 'image/png', extension: 'png' },
  { label: 'WebP', value: 'image/webp', extension: 'webp' },
]

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function extensionFor(format: OutputFormat) {
  return FORMAT_OPTIONS.find((item) => item.value === format)?.extension || 'jpg'
}

function fileBaseName(name: string) {
  const clean = name.trim() || 'gamingop-image'
  const dot = clean.lastIndexOf('.')
  return dot > 0 ? clean.slice(0, dot) : clean
}

export default function ImageConverterTool() {
  const [sourceUrl, setSourceUrl] = useState('')
  const [sourceName, setSourceName] = useState('')
  const [sourceSize, setSourceSize] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [maxWidth, setMaxWidth] = useState(1600)
  const [quality, setQuality] = useState(82)
  const [format, setFormat] = useState<OutputFormat>('image/jpeg')
  const [outputUrl, setOutputUrl] = useState('')
  const [outputSize, setOutputSize] = useState(0)
  const [status, setStatus] = useState('Choose a PNG, JPEG, or WebP image to begin.')
  const [isWorking, setIsWorking] = useState(false)
  const sourceUrlRef = useRef('')
  const outputUrlRef = useRef('')

  useEffect(() => {
    sourceUrlRef.current = sourceUrl
  }, [sourceUrl])

  useEffect(() => {
    outputUrlRef.current = outputUrl
  }, [outputUrl])

  useEffect(() => {
    return () => {
      if (sourceUrlRef.current) URL.revokeObjectURL(sourceUrlRef.current)
      if (outputUrlRef.current) URL.revokeObjectURL(outputUrlRef.current)
    }
  }, [])

  const downloadName = useMemo(() => {
    return `${fileBaseName(sourceName)}-gamingop.${extensionFor(format)}`
  }, [sourceName, format])

  function clearOutput() {
    if (outputUrl) URL.revokeObjectURL(outputUrl)
    setOutputUrl('')
    setOutputSize(0)
  }

  async function loadImage(url: string) {
    const img = document.createElement('img')
    img.decoding = 'async'
    img.src = url
    await img.decode()
    return img
  }

  async function handleFile(file: File | undefined) {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setStatus('That file is not an image.')
      return
    }
    if (file.size > 12 * 1024 * 1024) {
      setStatus('Please choose an image under 12 MB so the browser can convert it smoothly.')
      return
    }

    clearOutput()
    if (sourceUrl) URL.revokeObjectURL(sourceUrl)

    const nextUrl = URL.createObjectURL(file)
    setSourceUrl(nextUrl)
    setSourceName(file.name)
    setSourceSize(file.size)
    setStatus('Image loaded. Adjust settings, then convert.')

    try {
      const img = await loadImage(nextUrl)
      setWidth(img.naturalWidth)
      setHeight(img.naturalHeight)
      setMaxWidth(Math.min(img.naturalWidth, 1600))
    } catch {
      setStatus('This image could not be read by the browser.')
    }
  }

  async function convertImage() {
    if (!sourceUrl) {
      setStatus('Choose an image first.')
      return
    }

    setIsWorking(true)
    setStatus('Converting locally in your browser...')
    clearOutput()

    try {
      const img = await loadImage(sourceUrl)
      const requestedWidth = Number(maxWidth) || img.naturalWidth
      const targetWidth = Math.max(1, Math.min(requestedWidth, img.naturalWidth))
      const scale = targetWidth / img.naturalWidth
      const targetHeight = Math.max(1, Math.round(img.naturalHeight * scale))

      const canvas = document.createElement('canvas')
      canvas.width = targetWidth
      canvas.height = targetHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Canvas is unavailable')

      if (format === 'image/jpeg') {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, targetWidth, targetHeight)
      }
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, format, quality / 100)
      })
      if (!blob) throw new Error('Conversion failed')

      const nextOutputUrl = URL.createObjectURL(blob)
      setOutputUrl(nextOutputUrl)
      setOutputSize(blob.size)
      setStatus('Done. Download the converted image when ready.')
    } catch {
      setStatus('Conversion failed. Try a smaller image or a different format.')
    } finally {
      setIsWorking(false)
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="surface p-4 sm:p-6 space-y-5">
        <div>
          <h2 className="heading-md text-white">Local Image Converter</h2>
          <p className="mt-2 text-sm text-gray-400">
            Convert PNG, JPEG, and WebP images without uploading them. Processing happens on your device.
          </p>
        </div>

        <label className="block rounded-lg border border-dashed border-gray-700 bg-black/20 p-5 text-center hover:border-primary transition-colors">
          <span className="block text-sm font-semibold text-white">Choose image</span>
          <span className="mt-1 block text-xs text-gray-500">PNG, JPEG, or WebP. Max 12 MB.</span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />
        </label>

        {sourceUrl ? (
          <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="overflow-hidden rounded-lg border border-gray-800 bg-black/30">
              <img src={sourceUrl} alt="Selected preview" className="h-52 w-full object-contain" />
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="grid grid-cols-2 gap-3">
                <Info label="File" value={sourceName} />
                <Info label="Size" value={formatBytes(sourceSize)} />
                <Info label="Dimensions" value={width && height ? `${width} x ${height}` : 'Reading...'} />
                <Info label="Output" value={FORMAT_OPTIONS.find((item) => item.value === format)?.label || 'JPEG'} />
              </div>
              <p className="text-xs text-gray-500">
                Tip: resizing large screenshots before sharing can make uploads faster and pages lighter.
              </p>
            </div>
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-300">Format</span>
            <select
              value={format}
              onChange={(event) => setFormat(event.target.value as OutputFormat)}
              className="w-full"
            >
              {FORMAT_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-300">Max width</span>
            <input
              type="number"
              min={64}
              max={4096}
              value={maxWidth}
              onChange={(event) => setMaxWidth(Number(event.target.value))}
              className="w-full"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-300">Quality: {quality}%</span>
            <input
              type="range"
              min={40}
              max={100}
              value={quality}
              onChange={(event) => setQuality(Number(event.target.value))}
              className="w-full accent-primary"
              disabled={format === 'image/png'}
            />
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={convertImage}
            disabled={!sourceUrl || isWorking}
            className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isWorking ? 'Converting...' : 'Convert image'}
          </button>
          <p className="text-sm text-gray-400">{status}</p>
        </div>
      </section>

      <aside className="surface p-4 sm:p-6 space-y-4">
        <h2 className="heading-md text-white">Output</h2>
        {outputUrl ? (
          <>
            <div className="rounded-lg border border-gray-800 bg-black/30 p-3">
              <img src={outputUrl} alt="Converted preview" className="h-52 w-full object-contain" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Info label="Output size" value={formatBytes(outputSize)} />
              <Info
                label="Change"
                value={sourceSize ? `${Math.round((1 - outputSize / sourceSize) * 100)}%` : 'Ready'}
              />
            </div>
            <a href={outputUrl} download={downloadName} className="btn btn-primary w-full no-underline">
              Download image
            </a>
          </>
        ) : (
          <div className="rounded-lg border border-gray-800 bg-black/20 p-5 text-sm text-gray-400">
            Converted files appear here. Nothing is uploaded or stored by the site.
          </div>
        )}
      </aside>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-black/20 p-3">
      <p className="text-xs uppercase text-gray-500">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-white">{value}</p>
    </div>
  )
}
