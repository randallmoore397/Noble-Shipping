import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const historyUpdateSchema = z.object({
    status: z.string().min(1, 'Status is required'),
    location: z.string().optional(),
    timestamp: z.string().optional()
})

export async function PUT(
    request: NextRequest,
    props: { params: Promise<{ historyId: string }> }
) {
    const params = await props.params;
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const historyId = parseInt(params.historyId)
        if (isNaN(historyId)) {
            return NextResponse.json({ error: 'Invalid history ID' }, { status: 400 })
        }

        const existing = await prisma.parcelStatusHistory.findUnique({
            where: { id: historyId }
        })

        if (!existing) {
            return NextResponse.json({ error: 'History entry not found' }, { status: 404 })
        }

        const body = await request.json()
        const validatedData = historyUpdateSchema.parse(body)

        const updateData: any = {
            status: validatedData.status,
            location: validatedData.location || existing.location
        }
        
        if (validatedData.timestamp) {
            updateData.timestamp = new Date(validatedData.timestamp)
        }

        const history = await prisma.parcelStatusHistory.update({
            where: { id: historyId },
            data: updateData
        })

        return NextResponse.json(history)
    } catch (error: any) {
        console.error('History update error:', error)

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
