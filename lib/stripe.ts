import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing. Please set the environment variable.')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // @ts-expect-error Type '"2024-09-30.acacia"' is not assignable to type '"2025-04-30.basil"'
  apiVersion: '2024-09-30.acacia',
})

export default stripe
