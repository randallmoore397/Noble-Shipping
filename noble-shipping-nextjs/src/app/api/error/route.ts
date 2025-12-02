import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    return NextResponse.json({
        status: 'ok',
        message: 'Error logging service is active'
    })
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { error, context, url, userAgent } = body

        // Log the error to the server console
        // In a production app, this would go to a logging service (Sentry, LogRocket, etc.)
        // or a database table
        console.error('🔴 CLIENT-SIDE ERROR REPORT:')
        console.error(`Time: ${new Date().toISOString()}`)
        console.error(`URL: ${url || 'Unknown'}`)
        console.error(`User Agent: ${userAgent || 'Unknown'}`)
        console.error(`Context: ${context || 'General'}`)
        console.error('Error Details:', error)

        return NextResponse.json({ success: true, message: 'Error logged successfully' })
    } catch (err) {
        console.error('Failed to process error report:', err)
        return NextResponse.json(
            { success: false, message: 'Failed to log error' },
            { status: 500 }
        )
    }
}
