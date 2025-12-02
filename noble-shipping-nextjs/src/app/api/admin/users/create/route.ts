import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { requireRole } from '@/lib/auth-helpers'

export async function POST(request: Request) {
    try {
        await requireRole(['Admin'])

        const body = await request.json()
        const { user_id, email, password, role, first_name, last_name, position, mobile } = body

        // Check if user exists
        const existingUser = await db.sql('SELECT * FROM user WHERE email = ? OR user_id = ?', email, user_id)
        if (existingUser.length > 0) {
            return NextResponse.json(
                { error: 'User with this email or ID already exists' },
                { status: 400 }
            )
        }

        const hashedPassword = await hash(password, 12)

        // Insert user
        await db.sql(`
      INSERT INTO user (user_id, email, password, active, DateCreated)
      VALUES (?, ?, ?, 1, datetime('now'))
    `, user_id, email, hashedPassword)

        // Get the created user id
        const userResult = await db.sql('SELECT id FROM user WHERE user_id = ?', user_id)
        const newUserId = userResult[0].id

        // Create staff profile
        await db.sql(`
      INSERT INTO staffs (user_id, first_name, last_name, position, mobile, datetime)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
    `, newUserId, first_name, last_name, position, mobile)

        return NextResponse.json({ success: true, message: 'User created successfully' })

    } catch (error: any) {
        console.error('Create user error:', error)
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        )
    }
}
