import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-helpers'
import { successResponse, errorResponse } from '@/lib/api-response'
import { STATUS_CODE_MAP } from '@/lib/constants'
import { z } from 'zod'

const historyUpdateSchema = z.object({
    status: z.union([z.string(), z.number()]), // Accept both string and numeric status
    location: z.string().optional(),
    current_carrier: z.string().optional(),
    timestamp: z.string().optional()
})

export async function PUT(
    request: NextRequest,
    props: { params: Promise<{ historyId: string }> }
) {
    const params = await props.params;
    try {
        // Require Admin or Staff role
        await requireRole(['Admin', 'Staff'])

        const historyId = parseInt(params.historyId)
        if (isNaN(historyId)) {
            return errorResponse('Invalid history ID', null, 400)
        }

        // Check if history entry exists
        const existing = await prisma.aircargoStatusHistory.findUnique({
            where: { id: historyId }
        })

        if (!existing) {
            return errorResponse('History entry not found', null, 404)
        }

        const body = await request.json()
        const validatedData = historyUpdateSchema.parse(body)

        // Map status from numeric code if needed
        let status = validatedData.status;
        if (typeof validatedData.status === 'number' || !isNaN(Number(validatedData.status))) {
            status = STATUS_CODE_MAP[Number(validatedData.status)] || String(validatedData.status);
        }

        // Update history entry
        const history = await prisma.aircargoStatusHistory.update({
            where: { id: historyId },
            data: {
                status: String(status),
                location: validatedData.location || existing.location,
                current_carrier: validatedData.current_carrier || existing.current_carrier,
                timestamp: validatedData.timestamp ? new Date(validatedData.timestamp) : existing.timestamp
            }
        })

        return successResponse(history, 'History entry updated successfully')
    } catch (error: any) {
        console.error('History update error:', error)

        if (error.name === 'ZodError') {
            return errorResponse('Validation error', error.errors, 400)
        }

        return errorResponse(error.message || 'Failed to update history entry', null, 500)
    }
}
