'use client'

import { useState } from 'react'
import { ArrowRight, LoaderCircle } from 'lucide-react'

declare global { interface Window { Razorpay: new (options: Record<string, unknown>) => { open: () => void } } }

export function RazorpayCheckout({ amount, name, email, className = 'button button-gold button-large' }: { amount: number; name?: string; email?: string; className?: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function startCheckout() {
    setLoading(true)
    setError('')
    try {
      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://checkout.razorpay.com/v1/checkout.js'
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Checkout unavailable'))
          document.body.appendChild(script)
        })
      }
      const response = await fetch('/api/razorpay/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount, name: name || 'New Panchsheel Ke Raja devotee', email }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to start checkout')
      new window.Razorpay({ key: data.keyId, amount: data.amount, currency: data.currency, name: 'New Panchsheel Ke Raja', description: 'Support our seva', order_id: data.orderId, prefill: { name, email }, theme: { color: '#a85d2a' } }).open()
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Unable to start checkout')
    } finally { setLoading(false) }
  }

  return <div className="checkout-wrap"><button type="button" className={className} onClick={startCheckout} disabled={loading}>{loading ? <><LoaderCircle size={17} className="spin"/> Opening checkout</> : <>Donate ₹{amount.toLocaleString('en-IN')} <ArrowRight size={18}/></>}</button>{error && <p className="checkout-error" role="alert">{error}</p>}</div>
}
