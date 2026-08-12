'use client'

import { FormEvent, useState } from 'react'
export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!response.ok) {
        setError(response.status === 401 ? 'Incorrect admin password.' : 'Unable to sign in right now. Please try again.')
        setLoading(false)
        return
      }
      window.location.assign('/admin/photos')
    } catch {
      setError('Unable to connect to the admin panel. Please try again.')
      setLoading(false)
    }
  }
  return <main className="admin-page"><div className="admin-login"><span className="eyebrow">PRIVATE ADMIN</span><h1>Photo studio</h1><p>Sign in to update every image across the mandal website.</p><form onSubmit={submit}><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>{error && <p className="admin-error" role="alert">{error}</p>}<button className="button button-dark" disabled={loading}>{loading ? 'Checking…' : 'Enter photo studio'}</button></form></div></main>
}
