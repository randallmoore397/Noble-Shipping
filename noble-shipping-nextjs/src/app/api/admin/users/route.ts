import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-helpers'

export async function GET() {
  try {
    await requireRole(['Admin'])

    // Fetch users with their staff details
    // Note: This is a simplified query. In a real app we'd join with roles and staffs
    const users = await db.sql(`
      SELECT u.id, u.user_id, u.email, u.active, u.DateCreated,
             s.first_name, s.last_name, s.position, s.mobile
      FROM user u
      LEFT JOIN staffs s ON u.id = s.user_id
      ORDER BY u.DateCreated DESC
    `)

    return NextResponse.json(users)

  } catch (error: any) {
    console.error('Fetch users error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
