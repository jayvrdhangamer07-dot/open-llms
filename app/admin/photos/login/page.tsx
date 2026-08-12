'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError('')
    const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
    if (response.ok) router.replace('/admin/photos')
    else { setError('Incorrect admin password.'); setLoading(false) }
  }
  return <main className="admin-page"><div className="admin-login"><span className="eyebrow">PRIVATE ADMIN</span><h1>Photo studio</h1><p>Sign in to update every image across the mandal website.</p><form onSubmit={submit}><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>{error && <p className="admin-error" role="alert">{error}</p>}<button className="button button-dark" disabled={loading}>{loading ? 'Checking…' : 'Enter photo studio'}</button></form></div></main>
}
