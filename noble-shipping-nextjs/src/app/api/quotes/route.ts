import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { quoteSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate data
    const validation = quoteSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { service, weight, length, height, from_country, to_country, email_address } = validation.data

    await db.sql(`
      INSERT INTO request_quote (service, weight, length, height, from_country, to_country, email_address, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `, service, weight, length, height, from_country, to_country, email_address)

    return NextResponse.json({ success: true, message: 'Quote request submitted successfully' })
  } catch (error: any) {
    console.error('Quote request error:', error)
    return NextResponse.json(
      { error: 'Failed to submit quote request' },
      { status: 500 }
    )
  }
}