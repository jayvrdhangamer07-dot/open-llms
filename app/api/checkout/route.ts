import { NextResponse } from 'next/server'
import { DONATION_PRODUCT } from '@/lib/products'
import { getBaseUrl, stripe } from '@/lib/stripe'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : ''
    const amount = Number(body.amount)

    if (!name || !Number.isInteger(amount) || amount < DONATION_PRODUCT.minAmountInRupees || amount > DONATION_PRODUCT.maxAmountInRupees) {
      return NextResponse.json({ error: 'Enter a valid donor name and an amount between ₹1 and ₹1,00,000.' }, { status: 400 })
    }

    const baseUrl = getBaseUrl()
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      ui_mode: 'hosted_page',
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'inr',
          unit_amount: amount * 100,
          product_data: { name: DONATION_PRODUCT.name, description: DONATION_PRODUCT.description },
        },
      }],
      customer_creation: 'always',
      metadata: { donor_name: name, donation_amount_inr: String(amount), product_id: DONATION_PRODUCT.id },
      success_url: `${baseUrl}/donation.html?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/donation.html?payment=cancelled`,
      integration_identifier: `panchsheel_donation_${Math.random().toString(36).slice(2, 10)}`,
    })

    if (!session.url) return NextResponse.json({ error: 'Unable to create checkout session.' }, { status: 502 })
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[v0] Stripe checkout session error:', error)
    return NextResponse.json({ error: 'Unable to start checkout. Please try again.' }, { status: 500 })
  }
}
