import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-helpers'
import { successResponse, errorResponse } from '@/lib/api-response'
import { parcelSchema } from '@/lib/validations'
import { STATUS_CODE_MAP } from '@/lib/constants'

export async function PUT(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        // Require Admin or Staff role
        await requireRole(['Admin', 'Staff'])

        const id = parseInt(params.id)
        if (isNaN(id)) {
            return errorResponse('Invalid parcel ID', null, 400)
        }

        // Check if parcel exists
        const existing = await prisma.parcel.findUnique({
            where: { id }
        })

        if (!existing) {
            return errorResponse('Parcel not found', null, 404)
        }

        const body = await request.json()
        const validatedData = parcelSchema.parse(body)

        // Map status from numeric code if needed
        let status = validatedData.status
        if (typeof validatedData.status === 'number' || !isNaN(Number(validatedData.status))) {
            status = STATUS_CODE_MAP[Number(validatedData.status)] || validatedData.status
        }

        // Update parcel and create history in transaction
        const result = await prisma.$transaction(async (tx) => {
            // Update parcel record
            const parcel = await tx.parcel.update({
                where: { id },
                data: {
                    tracking_number: validatedData.tracking_number,
                    sender_name: validatedData.sender_name,
                    sender_email: validatedData.sender_email || null,
                    sender_phone: validatedData.sender_phone || null,
                    sender_address: validatedData.sender_address,
                    recipient_name: validatedData.recipient_name,
                    recipient_email: validatedData.recipient_email || null,
                    recipient_phone: validatedData.recipient_phone || null,
                    recipient_address: validatedData.recipient_address,
                    weight: validatedData.weight,
                    service_type: validatedData.service_type || null,
                    status: status,
                    shipping_cost: validatedData.shipping_cost || null,
                    estimated_delivery_date: validatedData.estimated_delivery_date
                        ? new Date(validatedData.estimated_delivery_date)
                        : existing.estimated_delivery_date,
                    updated_at: new Date()
                }
            })

            // Create history entry for the update
            await tx.parcelStatusHistory.create({
                data: {
                    parcel_id: parcel.id,
                    status: status,
                    location: validatedData.recipient_address
                }
            })

            return parcel
        })

        return successResponse(
            result,
            `Information has been updated successfully for Tracking Number ${result.tracking_number}`
        )
    } catch (error: any) {
        console.error('Parcel update error:', error)

        if (error.name === 'ZodError') {
            return errorResponse('Validation error', error.errors, 400)
        }

        // Check for unique constraint violation
        if (error.code === 'P2002') {
            return errorResponse('Tracking number already exists', null, 409)
        }

        return errorResponse(error.message || 'Failed to update parcel', null, 500)
    }
}
