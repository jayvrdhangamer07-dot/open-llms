import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'

export async function POST(request: Request) {
  try {
    const { amount, name, email } = await request.json()
    const numericAmount = Number(amount)

    if (!Number.isInteger(numericAmount) || numericAmount < 100 || numericAmount > 5000000) {
      return NextResponse.json({ error: 'Enter an amount between ₹100 and ₹50,000.' }, { status: 400 })
    }
    if (!name || typeof name !== 'string' || name.length > 100) {
      return NextResponse.json({ error: 'A valid donor name is required.' }, { status: 400 })
    }
    if (email && (typeof email !== 'string' || email.length > 254)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: 'Payment service is not configured.' }, { status: 503 })
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const order = await razorpay.orders.create({
      amount: numericAmount * 100,
      currency: 'INR',
      receipt: `npkr_${Date.now()}`,
      notes: { donor_name: name, donor_email: email || '' },
    })

    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID })
  } catch {
    return NextResponse.json({ error: 'Unable to start checkout.' }, { status: 500 })
  }
}
