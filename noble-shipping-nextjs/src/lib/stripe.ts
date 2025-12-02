/**
 * Stripe utility module for payment processing
 * Handles payment intents, refunds, and webhook events
 */

import Stripe from 'stripe'

// Initialize Stripe client
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY environment variable is required')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
})

/**
 * Create a payment intent for processing payments
 */
export async function createPaymentIntent(
    amount: number,
    currency: string,
    metadata: Record<string, string>
): Promise<Stripe.PaymentIntent> {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            metadata,
            automatic_payment_methods: {
                enabled: true,
            },
        })
        return paymentIntent
    } catch (error) {
        console.error('Payment intent creation error:', error)
        throw new Error('Failed to create payment intent')
    }
}

/**
 * Retrieve payment intent details
 */
export async function retrievePaymentIntent(
    paymentIntentId: string
): Promise<Stripe.PaymentIntent> {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
        return paymentIntent
    } catch (error) {
        console.error('Payment intent retrieval error:', error)
        throw new Error('Failed to retrieve payment intent')
    }
}

/**
 * Process a refund for a payment
 */
export async function refundPayment(
    paymentIntentId: string,
    amount?: number
): Promise<Stripe.Refund> {
    try {
        const refund = await stripe.refunds.create({
            payment_intent: paymentIntentId,
            amount,
        })
        return refund
    } catch (error) {
        console.error('Refund processing error:', error)
        throw new Error('Failed to process refund')
    }
}

/**
 * Construct and verify webhook event
 */
export function constructWebhookEvent(
    payload: string | Buffer,
    signature: string
): Stripe.Event {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
        throw new Error('Stripe webhook secret not configured')
    }

    try {
        const event = stripe.webhooks.constructEvent(
            payload,
            signature,
            webhookSecret
        )
        return event
    } catch (error) {
        console.error('Webhook verification error:', error)
        throw new Error('Failed to verify webhook signature')
    }
}

/**
 * Export Stripe client for advanced usage
 */
export { stripe }
