"use client"

import React, { useRef, useState } from 'react'

export default function P2PShare() {
  const pcRef = useRef<RTCPeerConnection | null>(null)
  const dcRef = useRef<RTCDataChannel | null>(null)
  const [offerCode, setOfferCode] = useState('')
  const [answerCode, setAnswerCode] = useState('')
  const [log, setLog] = useState<string[]>([])
  const fileRef = useRef<HTMLInputElement | null>(null)

  function appendLog(msg: string) {
    setLog((l) => [...l, msg].slice(-50))
  }

  async function createSession() {
    pcRef.current = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] })
    const pc = pcRef.current

    dcRef.current = pc.createDataChannel('file')
    const dc = dcRef.current
    dc.onopen = () => appendLog('Data channel open')
    dc.onclose = () => appendLog('Data channel closed')
    dc.onmessage = (e) => appendLog('Received message: ' + (typeof e.data === 'string' ? e.data : '[binary]'))

    pc.onicecandidate = (ev) => {
      if (ev.candidate) {
        // nothing – we will encode SDP which includes candidates
      }
    }

    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)

    // encode offer as base64 to create a short code
    const sdp = btoa(unescape(encodeURIComponent(JSON.stringify(pc.localDescription))))
    setOfferCode(sdp)
    appendLog('Session created — share the offer code with the receiver')
  }

  async function acceptOfferAndCreateAnswer(offerB64: string) {
    try {
      const offer = JSON.parse(decodeURIComponent(escape(atob(offerB64))))
      pcRef.current = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] })
      const pc = pcRef.current
      pc.ondatachannel = (ev) => {
        dcRef.current = ev.channel
        dcRef.current.onmessage = (e) => appendLog('Received: ' + (typeof e.data === 'string' ? e.data : '[binary]'))
        dcRef.current.onopen = () => appendLog('Data channel open (receiver)')
      }
      pc.onicecandidate = () => {}
      await pc.setRemoteDescription(offer)
      const answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)
      const ansB64 = btoa(unescape(encodeURIComponent(JSON.stringify(pc.localDescription))))
      setAnswerCode(ansB64)
      appendLog('Answer created — send this code back to the sender')
    } catch (err) {
      appendLog('Error accepting offer: ' + String(err))
    }
  }

  async function finishHandshakeWithAnswer(answerB64: string) {
    try {
      const answer = JSON.parse(decodeURIComponent(escape(atob(answerB64))))
      if (!pcRef.current) return appendLog('No peer connection found')
      await pcRef.current.setRemoteDescription(answer)
      appendLog('Handshake complete — ready to transfer files')
    } catch (err) {
      appendLog('Error applying answer: ' + String(err))
    }
  }

  function sendFile() {
    const input = fileRef.current
    const file = input?.files?.[0]
    const dc = dcRef.current
    if (!file || !dc || dc.readyState !== 'open') return appendLog('No file or data channel not open')

    const chunkSize = 16 * 1024
    const reader = new FileReader()
    let offset = 0
    reader.onload = (e) => {
      const array = new Uint8Array(e.target?.result as ArrayBuffer)
      while (offset < array.length) {
        const chunk = array.slice(offset, offset + chunkSize)
        dc.send(chunk)
        offset += chunkSize
      }
      appendLog('File sent: ' + file.name)
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <div className="space-y-3 text-sm">
      <div className="space-y-2">
        <button onClick={createSession} className="btn btn-primary">Create Session (Sender)</button>
        <div>
          <label className="text-xs text-gray-400">Share this offer code with the receiver:</label>
          <textarea readOnly value={offerCode} className="w-full p-2 bg-black/20 rounded-md font-mono text-xs" rows={3} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-gray-400">Receiver: paste offer code here and create answer</label>
        <textarea onChange={(e) => setOfferCode(e.target.value)} value={offerCode} className="w-full p-2 bg-black/20 rounded-md font-mono text-xs" rows={3} />
        <div className="flex gap-2">
          <button onClick={() => acceptOfferAndCreateAnswer(offerCode)} className="btn">Create Answer (Receiver)</button>
        </div>
        <div>
          <label className="text-xs text-gray-400">Answer (send back to sender):</label>
          <textarea readOnly value={answerCode} className="w-full p-2 bg-black/20 rounded-md font-mono text-xs" rows={3} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-gray-400">Sender: paste answer code here to finish</label>
        <textarea onChange={(e) => setAnswerCode(e.target.value)} value={answerCode} className="w-full p-2 bg-black/20 rounded-md font-mono text-xs" rows={3} />
        <div className="flex gap-2">
          <button onClick={() => finishHandshakeWithAnswer(answerCode)} className="btn">Apply Answer (Sender)</button>
        </div>
      </div>

      <div className="space-y-2">
        <input ref={fileRef} type="file" className="w-full" />
        <div className="flex gap-2">
          <button onClick={sendFile} className="btn btn-primary">Send File</button>
        </div>
      </div>

      <div className="glass rounded-md p-2 text-xs h-28 overflow-auto">
        {log.map((l, i) => (
          <div key={i} className="text-gray-300">{l}</div>
        ))}
      </div>
    </div>
  )
}
