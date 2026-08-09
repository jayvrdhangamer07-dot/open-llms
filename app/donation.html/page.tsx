'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, Download, Heart, LockKeyhole, ShieldCheck } from 'lucide-react'

const QR_CODE_URL = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260809_133516-e7dp9iI3SoUnLguaRVrGHSiljrVSqh.jpg'

export default function DonationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [checkoutError, setCheckoutError] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const parsedAmount = Number(amount)
    if (!name.trim() || !Number.isInteger(parsedAmount) || parsedAmount < 1 || parsedAmount > 100000) {
      setCheckoutError('Please enter a valid name and an amount between ₹1 and ₹1,00,000.')
      return
    }
    setCheckoutError('')
    setSubmitted(true)
  }

  const downloadReceipt = () => {
    const receipt = `NEW PANCHSHEEL KE RAJA\nDonation Receipt\n\nDonor: ${name}\nAmount: ₹${amount}\nDate: ${new Date().toLocaleDateString('en-IN')}\n\nThank you for supporting our seva.`
    const blob = new Blob([receipt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'new-panchsheel-ke-raja-receipt.txt'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="donation-page">
      <div className="donation-nav">
        <Link href="/" className="back-link"><ArrowLeft size={16} /> Back to home</Link>
        <Link href="/" className="donation-brand"><img src="/logo.png" alt="New Panchsheel Ke Raja logo" className="brand-logo" /><span><strong>NEW PANCHSHEEL</strong><small>KE RAJA · GANESH MANDAL</small></span></Link>
        <span className="secure-label"><LockKeyhole size={14} /> Secure giving</span>
      </div>
      <section className="donation-shell">
        <div className="donation-intro">
          <span className="eyebrow">A LITTLE GOES A LONG WAY</span>
          <h1>Support our<br /><em>seva.</em></h1>
          <p>Every offering helps us create a more meaningful Ganeshotsav — and continue the work that matters, long after the lights go down.</p>
          <div className="donation-quote"><Heart size={19} /><span>“Devotion is not only what we feel.<br /><b>It is what we do for one another.”</b></span></div>
          <div className="donation-points"><p><Check size={16} /> Cultural & religious programs</p><p><Check size={16} /> Community seva initiatives</p><p><Check size={16} /> Transparent use of every contribution</p></div>
        </div>
        <div className="donation-card">
          <div className="donation-card-head"><div><span className="eyebrow">NEW PANCHSHEEL KE RAJA</span><h2>Make an offering</h2></div><ShieldCheck size={25} /></div>
          {submitted ? (
            <div className="receipt-success"><div className="success-icon"><Check /></div><h3>Thank you, {name || 'Bappa devotee'}.</h3><p>Your generous offering of <b>₹{amount}</b> is a beautiful part of our celebration.</p><button className="button button-dark" onClick={downloadReceipt}><Download size={16} /> Download Receipt</button><button className="start-over" onClick={() => setSubmitted(false)}>Make another offering</button></div>
          ) : (
            <>
              <div className="upi-payment"><div className="upi-payment-copy"><span className="eyebrow">PAY WITH UPI</span><h3>Scan to offer seva</h3><p>Use Google Pay, PhonePe or Paytm to scan this QR code.</p></div><img src={QR_CODE_URL} alt="UPI QR code for New Panchsheel Ke Raja donations" className="upi-qr" /></div>
              <form onSubmit={submit} className="donation-form">
                <label>Donor name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter your full name" /></label>
                <label>Donation amount<input required min="1" max="100000" type="number" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="₹ Enter amount" /></label>
                {checkoutError && <p role="alert" className="checkout-error">{checkoutError}</p>}
                <button className="button button-dark" type="submit"><Check size={16} /> I have paid via UPI</button>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
