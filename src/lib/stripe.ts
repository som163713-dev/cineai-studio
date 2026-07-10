import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) console.warn('STRIPE_SECRET_KEY is not set. Payments will not work.')

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any,
  typescript: true,
  appInfo: { name: 'CINEAI Studio', version: '1.0.0' },
})

export const STRIPE_PLANS = {
  basic: { priceId: process.env.STRIPE_BASIC_PRICE_ID || 'price_basic', credits: 1000 },
  pro: { priceId: process.env.STRIPE_PRO_PRICE_ID || 'price_pro', credits: 5000 },
  premium: { priceId: process.env.STRIPE_PREMIUM_PRICE_ID || 'price_premium', credits: 20000 },
}

export default stripe