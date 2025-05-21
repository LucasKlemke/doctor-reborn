import stripe from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { testeId, babyId } = await req.json()

  const price = process.env.STRIPE_PRICE_ID

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price,
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_method_types: ['card', 'boleto'],
      success_url: `${req.headers.get('origin')}/chat?babyId=${babyId}`,
      cancel_url: `${req.headers.get('origin')}/`,
      metadata: {
        testeId,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    console.error(err)
    return NextResponse.error()
  }
}
