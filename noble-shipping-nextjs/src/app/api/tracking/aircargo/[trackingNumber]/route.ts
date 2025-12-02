import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'

export async function GET(
    request: Request,
    props: { params: Promise<{ trackingNumber: string }> }
) {
    const params = await props.params
    try {
        const trackingNumber = params.trackingNumber

        const results = await db.sql('SELECT * FROM aircargo WHERE tracking_number = ?', trackingNumber)

        if (results.length === 0) {
            return NextResponse.json(
                { error: 'Tracking number not found' },
                { status: 404 }
            )
        }

        const aircargo = results[0]

        // Get history
        const history = await db.sql(
            'SELECT * FROM aircargo_status_history WHERE aircargo_id = ? ORDER BY timestamp DESC',
            aircargo.id
        )

        return NextResponse.json({
            ...aircargo,
            AircargoStatusHistory: history
        })

    } catch (error: any) {
        console.error('Tracking error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch tracking info' },
            { status: 500 }
        )
    }
}
