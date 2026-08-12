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
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) return

    const width = 1200
    const height = 760
    const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    canvas.width = width
    canvas.height = height

    context.fillStyle = '#fbf9f5'
    context.fillRect(0, 0, width, height)
    context.strokeStyle = '#702d2c'
    context.lineWidth = 10
    context.strokeRect(24, 24, width - 48, height - 48)
    context.fillStyle = '#702d2c'
    context.fillRect(24, 24, width - 48, 12)
    context.fillRect(24, height - 36, width - 48, 12)

    const logo = new Image()
    const signature = new Image()
    logo.crossOrigin = 'anonymous'
    signature.crossOrigin = 'anonymous'
    let logoLoaded = false
    let signatureLoaded = false
    const renderReceipt = () => {
      if (!logoLoaded || !signatureLoaded) return
      context.drawImage(logo, 86, 86, 132, 132)
      context.textAlign = 'left'
      context.fillStyle = '#702d2c'
      context.font = '700 42px Arial'
      context.fillText('NEW PANCHSHEEL KE RAJA', 260, 135)
      context.fillStyle = '#736b64'
      context.font = '22px Arial'
      context.fillText('GANESH MANDAL · SEVA RECEIPT', 264, 177)
      context.strokeStyle = '#dfd5c7'
      context.lineWidth = 2
      context.beginPath()
      context.moveTo(86, 270)
      context.lineTo(1114, 270)
      context.stroke()
      context.fillStyle = '#736b64'
      context.font = '22px Arial'
      context.fillText('DONATOR NAME', 100, 345)
      context.fillText('DATE', 100, 445)
      context.fillText('MONEY PAID', 100, 545)
      context.fillStyle = '#2c241f'
      context.font = '600 34px Arial'
      context.fillText(name.trim(), 100, 390)
      context.fillText(date, 100, 490)
      context.fillStyle = '#702d2c'
      context.font = '700 46px Arial'
      context.fillText(`₹${Number(amount).toLocaleString('en-IN')}`, 100, 595)
      context.textAlign = 'right'
      context.fillStyle = '#736b64'
      context.font = '20px Arial'
      context.fillText('Thank you for supporting our seva.', 1100, 665)
      context.textAlign = 'center'
      context.fillStyle = '#736b64'
      context.font = '18px Arial'
      context.fillText('Authorized signature', 940, 610)
      context.drawImage(signature, 790, 490, 300, 105)
      const link = document.createElement('a')
      link.download = 'new-panchsheel-ke-raja-receipt.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
    logo.onload = () => { logoLoaded = true; renderReceipt() }
    signature.onload = () => { signatureLoaded = true; renderReceipt() }
    logo.src = '/logo.png'
    signature.src = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_00000000ff2082119733c7af31e0ae94-oJ0vdHc8QGo3uvrDtB1gqpQf0qVF36.png'
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
            <div className="receipt-success"><div className="success-icon"><Check /></div><h3>Thank you, {name || 'Bappa devotee'}.</h3><p>Your generous offering of <b>₹{amount}</b> is a beautiful part of our celebration.</p><button className="button button-dark" onClick={downloadReceipt}><Download size={16} /> Download Receipt Image</button><button className="start-over" onClick={() => setSubmitted(false)}>Make another offering</button></div>
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
