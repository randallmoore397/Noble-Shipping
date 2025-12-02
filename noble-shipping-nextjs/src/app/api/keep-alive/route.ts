import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'

export async function GET() {
    try {
        // Fetch the first user to keep the DB connection alive
        // Using LIMIT 1 to minimize data transfer
        const result = await db.sql('SELECT * FROM user LIMIT 1')

        // Return the result (or just a success message if data privacy is a concern, 
        // but the user asked to console log the returned data)
        return NextResponse.json({
            success: true,
            data: result[0],
            timestamp: new Date().toISOString()
        })
    } catch (error: any) {
        console.error('Keep-alive error:', error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        )
    }
}
