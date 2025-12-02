import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-helpers'
import { successResponse, errorResponse } from '@/lib/api-response'
import { containerSchema } from '@/lib/validations'
import { STATUS_CODE_MAP, INSURANCE_CODE_MAP } from '@/lib/constants'

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
            return errorResponse('Invalid cargo ID', null, 400)
        }

        // Check if cargo exists
        const existing = await prisma.cargo.findUnique({
            where: { id }
        })

        if (!existing) {
            return errorResponse('Container cargo not found', null, 404)
        }

        const body = await request.json()
        const validatedData = containerSchema.parse(body)

        // Map status from numeric code if needed
        let status = validatedData.status
        if (typeof validatedData.status === 'number' || !isNaN(Number(validatedData.status))) {
            status = STATUS_CODE_MAP[Number(validatedData.status)] || validatedData.status
        }

        // Map insurance from numeric code if needed
        let insurance = validatedData.insurance || 'No Insurance'
        if (typeof validatedData.insurance === 'number' || !isNaN(Number(validatedData.insurance))) {
            insurance = INSURANCE_CODE_MAP[Number(validatedData.insurance)] || validatedData.insurance
        }

        // Update cargo and create history in transaction
        const result = await prisma.$transaction(async (tx) => {
            // Update cargo record
            const cargo = await tx.cargo.update({
                where: { id },
                data: {
                    tracking_number: validatedData.tracking_number,
                    origin: validatedData.origin,
                    destination: validatedData.destination,
                    status: status,
                    last_location: validatedData.last_location || '',
                    estimated_delivery: validatedData.estimated_delivery
                        ? new Date(validatedData.estimated_delivery)
                        : existing.estimated_delivery,
                    current_carrier: validatedData.current_carrier || '',
                    weight: validatedData.weight || '',
                    dimensions: validatedData.dimensions || '',
                    contents_description: validatedData.contents_description || '',
                    value: validatedData.value || '',
                    insurance: insurance,
                    updated_at: new Date()
                }
            })

            // Create history entry for the update
            await tx.cargoStatusHistory.create({
                data: {
                    cargo_id: cargo.id,
                    status: status,
                    location: validatedData.last_location || '',
                    current_carrier: validatedData.current_carrier || ''
                }
            })

            return cargo
        })

        return successResponse(
            result,
            `Information has been updated successfully for Tracking Number ${result.tracking_number}`
        )
    } catch (error: any) {
        console.error('Container update error:', error)

        if (error.name === 'ZodError') {
            return errorResponse('Validation error', error.errors, 400)
        }

        // Check for unique constraint violation
        if (error.code === 'P2002') {
            return errorResponse('Tracking number already exists', null, 409)
        }

        return errorResponse(error.message || 'Failed to update container cargo', null, 500)
    }
}
