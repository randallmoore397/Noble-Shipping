import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { requireRole } from '@/lib/auth-helpers'

export async function POST(request: Request) {
  try {
    await requireRole(['Admin'])

    const { userId, newPassword } = await request.json()

    const hashedPassword = await hash(newPassword, 12)

    await db.sql('UPDATE user SET password = ? WHERE id = ?', hashedPassword, userId)

    return NextResponse.json({ success: true, message: 'Password updated successfully' })

  } catch (error: any) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    )
  }
}