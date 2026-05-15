'use client'

import React, { useEffect, useRef, useState } from 'react'

type SessionDescription = RTCSessionDescriptionInit

type TransferMeta = {
  name: string
  size: number
  type: string
  lastModified: number
}

type ChannelRole = 'sender' | 'receiver'

const ICE_SERVERS = [{ urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] }]
const CHUNK_SIZE = 16 * 1024
const ICE_TIMEOUT_MS = 8000

function encodeDescription(description: SessionDescription) {
  return JSON.stringify(description)
}

function decodeDescription(value: string): SessionDescription {
  const parsed = JSON.parse(value)
  if (!parsed || typeof parsed !== 'object' || typeof parsed.type !== 'string' || typeof parsed.sdp !== 'string') {
    throw new Error('Invalid session code')
  }

  return {
    type: parsed.type,
    sdp: parsed.sdp,
  }
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

async function waitForIceGatheringComplete(peerConnection: RTCPeerConnection) {
  if (peerConnection.iceGatheringState === 'complete') return

  await new Promise<void>((resolve) => {
    const completeHandler = () => {
      if (peerConnection.iceGatheringState === 'complete') {
        peerConnection.removeEventListener('icegatheringstatechange', completeHandler)
        window.clearTimeout(timeoutId)
        resolve()
      }
    }

    const timeoutId = window.setTimeout(() => {
      peerConnection.removeEventListener('icegatheringstatechange', completeHandler)
      resolve()
    }, ICE_TIMEOUT_MS)

    peerConnection.addEventListener('icegatheringstatechange', completeHandler)
  })
}

async function waitForBufferedAmountLow(channel: RTCDataChannel) {
  if (channel.bufferedAmount <= 512 * 1024) return

  await new Promise<void>((resolve) => {
    const lowHandler = () => {
      channel.removeEventListener('bufferedamountlow', lowHandler)
      resolve()
    }

    channel.addEventListener('bufferedamountlow', lowHandler)
  })
}

export default function PeerFileTransferTool() {
  const [offerText, setOfferText] = useState('')
  const [answerText, setAnswerText] = useState('')
  const [offerInput, setOfferInput] = useState('')
  const [answerInput, setAnswerInput] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [workflowState, setWorkflowState] = useState('Choose a sender or receiver step to begin.')
  const [connectionState, setConnectionState] = useState('idle')
  const [transferState, setTransferState] = useState<'idle' | 'sending' | 'receiving' | 'complete'>('idle')
  const [sendProgress, setSendProgress] = useState({ sent: 0, total: 0 })
  const [receivedMeta, setReceivedMeta] = useState<TransferMeta | null>(null)
  const [receivedBytes, setReceivedBytes] = useState(0)
  const [downloadUrl, setDownloadUrl] = useState('')
  const [copyMessage, setCopyMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const channelRef = useRef<RTCDataChannel | null>(null)
  const receivedChunksRef = useRef<Uint8Array[]>([])
  const receivedMetaRef = useRef<TransferMeta | null>(null)
  const downloadUrlRef = useRef('')

  useEffect(() => {
    return () => {
      resetSession()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function setMessage(message: string) {
    setWorkflowState(message)
  }

  function clearDownloadUrl() {
    if (downloadUrlRef.current) {
      URL.revokeObjectURL(downloadUrlRef.current)
      downloadUrlRef.current = ''
    }
    setDownloadUrl('')
  }

  function cleanupPeerConnection() {
    if (channelRef.current) {
      channelRef.current.onopen = null
      channelRef.current.onclose = null
      channelRef.current.onerror = null
      channelRef.current.onmessage = null
      if (channelRef.current.readyState !== 'closed') {
        channelRef.current.close()
      }
      channelRef.current = null
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.onconnectionstatechange = null
      peerConnectionRef.current.ondatachannel = null
      peerConnectionRef.current.close()
      peerConnectionRef.current = null
    }
  }

  function resetSession() {
    cleanupPeerConnection()
    clearDownloadUrl()
    receivedChunksRef.current = []
    receivedMetaRef.current = null
    setOfferText('')
    setAnswerText('')
    setOfferInput('')
    setAnswerInput('')
    setSelectedFile(null)
    setReceivedMeta(null)
    setReceivedBytes(0)
    setSendProgress({ sent: 0, total: 0 })
    setConnectionState('idle')
    setTransferState('idle')
    setErrorMessage('')
    setCopyMessage('')
    setMessage('Session reset. Create a new offer to start again.')
  }

  function createPeerConnection() {
    cleanupPeerConnection()

    const peerConnection = new RTCPeerConnection({ iceServers: ICE_SERVERS })
    peerConnection.onconnectionstatechange = () => {
      setConnectionState(peerConnection.connectionState)
      if (peerConnection.connectionState === 'failed') {
        setErrorMessage('The peer connection failed. Try regenerating the offer and answer.')
      }
      if (peerConnection.connectionState === 'connected') {
        setErrorMessage('')
      }
    }

    peerConnection.oniceconnectionstatechange = () => {
      if (peerConnection.iceConnectionState === 'failed') {
        setErrorMessage('ICE negotiation failed. Some networks may need a different browser or a less restricted network.')
      }
    }

    peerConnectionRef.current = peerConnection
    return peerConnection
  }

  function bindChannel(channel: RTCDataChannel, role: ChannelRole) {
    channelRef.current = channel
    channel.bufferedAmountLowThreshold = 512 * 1024

    channel.onopen = () => {
      setConnectionState('connected')
      setMessage(
        role === 'sender'
          ? 'Connection ready. Choose a file and send it to the receiver.'
          : 'Connection ready. Wait for the sender to transfer a file.'
      )
    }

    channel.onclose = () => {
      setConnectionState('closed')
      setMessage('The data channel closed.')
    }

    channel.onerror = () => {
      setErrorMessage('The data channel reported an error.')
    }

    channel.onmessage = async (event) => {
      try {
        if (typeof event.data === 'string') {
          const payload = JSON.parse(event.data) as { kind: string; meta?: TransferMeta }
          if (payload.kind === 'meta' && payload.meta) {
            clearDownloadUrl()
            receivedChunksRef.current = []
            receivedMetaRef.current = payload.meta
            setReceivedMeta(payload.meta)
            setReceivedBytes(0)
            setTransferState('receiving')
            setMessage(`Receiving ${payload.meta.name}...`)
            return
          }

          if (payload.kind === 'done') {
            const meta = receivedMetaRef.current
            const blobParts = receivedChunksRef.current.map((chunk) => {
              const copy = new Uint8Array(chunk.byteLength)
              copy.set(chunk)
              return copy.buffer
            })
            const blob = new Blob(blobParts, { type: meta?.type || 'application/octet-stream' })
            const nextDownloadUrl = URL.createObjectURL(blob)
            clearDownloadUrl()
            downloadUrlRef.current = nextDownloadUrl
            setDownloadUrl(nextDownloadUrl)
            setTransferState('complete')
            setMessage(`Transfer complete. ${meta?.name || 'The file'} is ready to download.`)
          }
          return
        }

        const chunk = event.data instanceof Blob ? new Uint8Array(await event.data.arrayBuffer()) : new Uint8Array(event.data)
        receivedChunksRef.current.push(chunk)
        setReceivedBytes((previous) => previous + chunk.byteLength)
      } catch {
        setErrorMessage('Failed to read an incoming transfer message.')
      }
    }
  }

  async function createOffer() {
    try {
      setErrorMessage('')
      setCopyMessage('')
      setMessage('Creating sender offer...')
      setTransferState('idle')
      const peerConnection = createPeerConnection()
      const dataChannel = peerConnection.createDataChannel('gamingop-file-transfer')
      bindChannel(dataChannel, 'sender')

      const offer = await peerConnection.createOffer()
      await peerConnection.setLocalDescription(offer)
      await waitForIceGatheringComplete(peerConnection)

      if (!peerConnection.localDescription) {
        throw new Error('Failed to create an offer.')
      }

      setOfferText(encodeDescription(peerConnection.localDescription))
      setMessage('Sender offer is ready. Copy it to the receiver, then paste their answer back here.')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to create the sender offer.')
      setMessage('The sender offer could not be created.')
    }
  }

  async function createAnswer() {
    try {
      setErrorMessage('')
      setCopyMessage('')
      if (!offerInput.trim()) {
        throw new Error('Paste the sender offer first.')
      }

      setMessage('Creating receiver answer...')
      setTransferState('idle')
      const peerConnection = createPeerConnection()
      peerConnection.ondatachannel = (event) => {
        bindChannel(event.channel, 'receiver')
      }

      await peerConnection.setRemoteDescription(decodeDescription(offerInput))
      const answer = await peerConnection.createAnswer()
      await peerConnection.setLocalDescription(answer)
      await waitForIceGatheringComplete(peerConnection)

      if (!peerConnection.localDescription) {
        throw new Error('Failed to create an answer.')
      }

      setAnswerText(encodeDescription(peerConnection.localDescription))
      setMessage('Receiver answer is ready. Copy it back to the sender.')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to create the receiver answer.')
      setMessage('The receiver answer could not be created.')
    }
  }

  async function applyAnswer() {
    try {
      setErrorMessage('')
      if (!peerConnectionRef.current) {
        throw new Error('Create the sender offer first.')
      }
      if (!answerInput.trim()) {
        throw new Error('Paste the receiver answer first.')
      }

      await peerConnectionRef.current.setRemoteDescription(decodeDescription(answerInput))
      setMessage('Answer accepted. Waiting for the data channel to open...')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to apply the receiver answer.')
    }
  }

  async function copyText(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopyMessage(`${label} copied.`)
    } catch {
      setCopyMessage('Copy failed. Select the text and copy it manually.')
    }
  }

  async function sendFile() {
    try {
      setErrorMessage('')
      if (!selectedFile) {
        throw new Error('Choose a file first.')
      }
      if (!channelRef.current || channelRef.current.readyState !== 'open') {
        throw new Error('Connect the browsers before sending a file.')
      }

      const channel = channelRef.current
      const fileBuffer = await selectedFile.arrayBuffer()
      const meta: TransferMeta = {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type || 'application/octet-stream',
        lastModified: selectedFile.lastModified,
      }

      setTransferState('sending')
      setSendProgress({ sent: 0, total: fileBuffer.byteLength })
      receivedMetaRef.current = meta
      setReceivedMeta(meta)
      setReceivedBytes(0)
      receivedChunksRef.current = []
      clearDownloadUrl()

      channel.send(JSON.stringify({ kind: 'meta', meta }))

      for (let offset = 0; offset < fileBuffer.byteLength; offset += CHUNK_SIZE) {
        const nextChunk = fileBuffer.slice(offset, offset + CHUNK_SIZE)
        channel.send(nextChunk)
        const sent = Math.min(offset + CHUNK_SIZE, fileBuffer.byteLength)
        setSendProgress({ sent, total: fileBuffer.byteLength })
        await waitForBufferedAmountLow(channel)
      }

      channel.send(JSON.stringify({ kind: 'done' }))
      setTransferState('complete')
      setMessage('File sent. Wait for the receiver to finish assembling the download.')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to send the file.')
      setMessage('The file transfer could not be started.')
    }
  }

  const sendProgressPercent = sendProgress.total > 0 ? Math.round((sendProgress.sent / sendProgress.total) * 100) : 0
  const receiveProgressPercent = receivedMeta?.size ? Math.min(100, Math.round((receivedBytes / receivedMeta.size) * 100)) : 0

  return (
    <div className="space-y-5">
      <section className="surface p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="heading-md text-white">Peer File Transfer</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-400">
              Transfer a file directly between two browsers with manual WebRTC offer and answer codes. Nothing is uploaded or stored on the GamingOP site itself.
            </p>
          </div>
          <button type="button" onClick={resetSession} className="btn btn-ghost self-start">
            Reset session
          </button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <StatusCard label="Connection" value={connectionState} />
          <StatusCard label="Transfer" value={transferState} />
          <StatusCard label="Data flow" value={sendProgress.total > 0 ? `${sendProgressPercent}% sent` : 'Waiting'} />
        </div>

        <div className="mt-4 rounded-lg border border-gray-800 bg-black/20 p-4 text-sm leading-6 text-gray-400">
          Best results come from two modern browsers on a stable network. Some restrictive networks may block direct WebRTC connections, and this tool does not use a central file server as a fallback.
        </div>

        {errorMessage ? <p className="mt-4 text-sm text-red-400">{errorMessage}</p> : null}
        {copyMessage ? <p className="mt-2 text-sm text-primary">{copyMessage}</p> : null}
        <p className="mt-2 text-sm text-gray-400">{workflowState}</p>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="surface p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-white">Sender</h3>
            <span className="rounded-md border border-gray-700 px-2 py-1 text-xs text-gray-400">Create offer</span>
          </div>

          <p className="text-sm leading-6 text-gray-400">
            The sender generates the first code, shares it with the receiver, then pastes the answer code back into this page.
          </p>

          <div className="space-y-3">
            <button type="button" onClick={createOffer} className="btn btn-primary w-full">
              Generate sender offer
            </button>
            <textarea value={offerText} readOnly rows={8} placeholder="Sender offer code appears here..." className="w-full font-mono text-xs" />
            <button type="button" onClick={() => copyText('Sender offer', offerText)} disabled={!offerText} className="btn btn-ghost w-full disabled:cursor-not-allowed disabled:opacity-50">
              Copy sender offer
            </button>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-gray-300">Paste receiver answer</span>
            <textarea value={answerInput} onChange={(event) => setAnswerInput(event.target.value)} rows={8} placeholder="Paste the receiver answer here..." className="w-full font-mono text-xs" />
          </label>

          <button type="button" onClick={applyAnswer} className="btn btn-ghost w-full">
            Apply receiver answer
          </button>

          <div className="space-y-2 rounded-lg border border-gray-800 bg-black/20 p-4 text-sm text-gray-300">
            <p className="font-semibold text-white">Send a file</p>
            <input
              type="file"
              onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
              className="w-full text-sm text-gray-300 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-accent"
            />
            {selectedFile ? (
              <div className="text-xs text-gray-400">
                <p>{selectedFile.name}</p>
                <p>{formatBytes(selectedFile.size)}</p>
              </div>
            ) : (
              <p className="text-xs text-gray-500">Pick the file you want to transfer after the connection opens.</p>
            )}
            <button type="button" onClick={sendFile} disabled={!selectedFile || connectionState !== 'connected'} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
              {transferState === 'sending' ? 'Sending...' : 'Send file'}
            </button>
            <div className="rounded-md border border-gray-700 bg-black/30 p-3 text-xs text-gray-400">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span>Send progress</span>
                <span>{sendProgress.total ? `${sendProgressPercent}%` : '0%'}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-primary" style={{ width: `${sendProgressPercent}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="surface p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-white">Receiver</h3>
            <span className="rounded-md border border-gray-700 px-2 py-1 text-xs text-gray-400">Create answer</span>
          </div>

          <p className="text-sm leading-6 text-gray-400">
            The receiver pastes the sender offer, creates an answer, and sends that answer back to the sender.
          </p>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-gray-300">Paste sender offer</span>
            <textarea value={offerInput} onChange={(event) => setOfferInput(event.target.value)} rows={8} placeholder="Paste the sender offer here..." className="w-full font-mono text-xs" />
          </label>

          <button type="button" onClick={createAnswer} className="btn btn-primary w-full">
            Generate receiver answer
          </button>

          <textarea value={answerText} readOnly rows={8} placeholder="Receiver answer code appears here..." className="w-full font-mono text-xs" />

          <button type="button" onClick={() => copyText('Receiver answer', answerText)} disabled={!answerText} className="btn btn-ghost w-full disabled:cursor-not-allowed disabled:opacity-50">
            Copy receiver answer
          </button>

          <div className="rounded-lg border border-gray-800 bg-black/20 p-4 text-sm text-gray-300">
            <p className="font-semibold text-white">Receive status</p>
            <p className="mt-2 text-gray-400">
              {receivedMeta
                ? `${receivedMeta.name} is ${formatBytes(receivedBytes)} of ${formatBytes(receivedMeta.size)} received.`
                : 'Waiting for the sender to start a transfer.'}
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-success" style={{ width: `${receiveProgressPercent}%` }} />
            </div>
            {receivedMeta ? (
              <p className="mt-2 text-xs text-gray-500">
                File type: {receivedMeta.type || 'unknown'}
              </p>
            ) : null}
          </div>

          {downloadUrl ? (
            <a href={downloadUrl} download={receivedMeta?.name || 'gamingop-transfer.bin'} className="btn btn-primary w-full no-underline">
              Download received file
            </a>
          ) : null}
        </div>
      </section>
    </div>
  )
}

function StatusCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  )
}