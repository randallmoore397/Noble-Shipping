import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const historySchema = z.object({
    cargo_id: z.number(),
    status: z.string().min(1, 'Status is required'),
    location: z.string().optional(),
    current_carrier: z.string().optional()
})

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession()
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const validatedData = historySchema.parse(body)

        // Check if cargo exists
        const cargo = await prisma.cargo.findUnique({
            where: { id: validatedData.cargo_id }
        })

        if (!cargo) {
            return NextResponse.json(
                { success: false, message: 'Container cargo not found' },
                { status: 404 }
            )
        }

        // Create history entry
        const history = await prisma.cargoStatusHistory.create({
            data: {
                cargo_id: validatedData.cargo_id,
                status: validatedData.status,
                location: validatedData.location || '',
                current_carrier: validatedData.current_carrier || ''
            }
        })

        return NextResponse.json({
            success: true,
            data: history,
            message: 'History entry created successfully'
        })
    } catch (error: any) {
        console.error('History creation error:', error)

        if (error.name === 'ZodError') {
            return NextResponse.json(
                { success: false, message: 'Validation error', errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: false, message: 'Failed to create history entry' },
            { status: 500 }
        )
    }
}
