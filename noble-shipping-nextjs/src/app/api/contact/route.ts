import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { contactSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate data
    const validation = contactSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { first_name, last_name, email, website, message } = validation.data

    await db.sql(`
      INSERT INTO get_in_touch (first_name, last_name, email, website, message, timestamp)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
    `, first_name, last_name, email, website || null, message)

    return NextResponse.json({ success: true, message: 'Message sent successfully' })
  } catch (error: any) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}