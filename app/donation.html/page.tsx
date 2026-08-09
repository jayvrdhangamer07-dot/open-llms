'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Download, Heart, LockKeyhole, Mail, Phone, ShieldCheck } from 'lucide-react'

export default function DonationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setCheckoutError('')
    const parsedAmount = Number(amount)
    if (!name.trim() || !Number.isInteger(parsedAmount) || parsedAmount < 1 || parsedAmount > 100000) {
      setCheckoutError('Please enter a valid name and an amount between ₹1 and ₹1,00,000.')
      return
    }
    setIsCheckingOut(true)
    try {
      const response = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, amount: parsedAmount }) })
      const data = await response.json()
      if (!response.ok || !data.url) throw new Error(data.error || 'Unable to start checkout.')
      window.location.assign(data.url)
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'Unable to start checkout. Please try again.')
      setIsCheckingOut(false)
    }
  }
  const downloadReceipt = () => { const receipt = `NEW PANCHSHEEL KE RAJA\nDonation Receipt\n\nDonor: ${name}\nAmount: ₹${amount}\nDate: ${new Date().toLocaleDateString('en-IN')}\n\nThank you for supporting our seva.\nGanpati Bappa Morya!`; const blob = new Blob([receipt], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'new-panchsheel-ke-raja-receipt.txt'; a.click(); URL.revokeObjectURL(url) }
  return <main className="donation-page"><div className="donation-nav"><Link href="/" className="back-link"><ArrowLeft size={16}/> Back to home</Link><Link href="/" className="donation-brand"><img src="/logo.png" alt="New Panchsheel Ke Raja logo" className="brand-logo"/><span><strong>NEW PANCHSHEEL</strong><small>KE RAJA · GANESH MANDAL</small></span></Link><span className="secure-label"><LockKeyhole size={14}/> Secure giving</span></div><section className="donation-shell"><div className="donation-intro"><span className="eyebrow">A LITTLE GOES A LONG WAY</span><h1>Support our<br/><em>seva.</em></h1><p>Every offering helps us create a more meaningful Ganeshotsav — and continue the work that matters, long after the lights go down.</p><div className="donation-quote"><Heart size={19}/><span>“Devotion is not only what we feel.<br/><b>It is what we do for one another.”</b></span></div><div className="donation-points"><p><Check size={16}/> Cultural & religious programs</p><p><Check size={16}/> Community seva initiatives</p><p><Check size={16}/> Transparent use of every contribution</p></div></div><div className="donation-card"><div className="donation-card-head"><div><span className="eyebrow">NEW PANCHSHEEL KE RAJA</span><h2>Make an offering</h2></div><ShieldCheck size={25}/></div>{submitted ? <div className="receipt-success"><div className="success-icon"><Check/></div><h3>Thank you, {name || 'Bappa devotee'}.</h3><p>Your generous offering of <b>₹{amount || '0'}</b> is a beautiful part of our celebration.</p><button className="button button-dark" onClick={downloadReceipt}><Download size={16}/> Download Receipt</button><button className="start-over" onClick={() => setSubmitted(false)}>Make another offering</button></div> : <form onSubmit={submit} className="donation-form" aria-busy={isCheckingOut}><label>Donor name<input required value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name"/></label><label>Donation amount<input required min="1" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="₹ 500"/></label><div className="amount-options">{['501','1001','2501','5001'].map(value => <button type="button" key={value} onClick={() => setAmount(value)} className={amount === value ? 'selected' : ''}>₹{value}</button>)}</div><button className="button button-gold donate-submit" type="submit" disabled={isCheckingOut}>Continue to payment <ArrowRight size={17}/></button><p className="form-legal"><LockKeyhole size={13}/> Your information is safe with us.</p>{checkoutError && <p role="alert" className="checkout-error">{checkoutError}</p>}</form>}<div className="qr-divider"><span>OR PAY USING UPI</span></div><div className="qr-panel"><img className="fake-qr" src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi%3A%2F%2Fpay%3Fpa%3Dnewpanchsheel%40upi%26pn%3DNew%2520Panchsheel%2520Ke%2520Raja%26cu%3DINR" alt="Scan to donate using UPI" width="83" height="83" /><div><strong>Scan to donate</strong><p>newpanchsheel@upi</p><span>UPI · GPay · PhonePe · Paytm</span></div></div></div></section><section className="donation-footer"><span>Questions about your donation?</span><a href="mailto:hello@newpanchsheelkeraja.org"><Mail size={14}/> hello@newpanchsheelkeraja.org</a><a href="tel:+919876543210"><Phone size={14}/> +91 98765 43210</a></section></main>
}
