'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { PHOTO_SLOTS } from '@/lib/photo-slots'

type Photos = Record<string, string>
export default function PhotoAdmin() {
  const [photos, setPhotos] = useState<Photos>({})
  const [busy, setBusy] = useState('')
  const [message, setMessage] = useState('')
  useEffect(() => { fetch('/api/admin/photos').then((response) => response.json()).then((data) => setPhotos(data.photos || {})) }, [])
  async function upload(slotId: string, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 8 * 1024 * 1024) { setMessage('Please choose a JPG, PNG or WebP image under 8 MB.'); return }
    setBusy(slotId); setMessage('')
    const body = new FormData(); body.append('slotId', slotId); body.append('file', file)
    const response = await fetch('/api/admin/photos', { method: 'POST', body }); const data = await response.json()
    if (response.ok) { setPhotos((current) => ({ ...current, [slotId]: data.url })); setMessage('Photo replaced successfully.') } else setMessage(data.error || 'Upload failed.')
    setBusy(''); event.target.value = ''
  }
  return <main className="admin-page"><div className="admin-shell"><div className="admin-header"><div><span className="eyebrow">PRIVATE ADMIN</span><h1>Photo studio</h1><p>Replace any image on the website. JPG, PNG or WebP · max 8 MB.</p></div><a className="button button-outline-dark" href="/">View website</a></div>{message && <p className="admin-message" role="status">{message}</p>}<div className="admin-grid">{PHOTO_SLOTS.map((slot) => <article className="admin-photo-card" key={slot.id}><div className="admin-photo-preview"><img src={photos[slot.id] || slot.fallback} alt={`${slot.label} preview`} /></div><div className="admin-photo-info"><div><span className="eyebrow">{slot.id}</span><h2>{slot.label}</h2></div><label className="button button-dark">{busy === slot.id ? 'Uploading…' : 'Replace photo'}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => upload(slot.id, event)} disabled={Boolean(busy)} /></label></div></article>)}</div></div></main>
}
