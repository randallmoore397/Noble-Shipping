import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-helpers'
import { successResponse, errorResponse } from '@/lib/api-response'
import { aircargoSchema } from '@/lib/validations'
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
            return errorResponse('Invalid aircargo ID', null, 400)
        }

        // Check if aircargo exists
        const existing = await prisma.aircargo.findUnique({
            where: { id }
        })

        if (!existing) {
            return errorResponse('Aircargo not found', null, 404)
        }

        const body = await request.json()
        const validatedData = aircargoSchema.parse(body)

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

        // Update aircargo and create history in transaction
        const result = await prisma.$transaction(async (tx) => {
            // Update aircargo record
            const aircargo = await tx.aircargo.update({
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
                    sender_name: validatedData.sender_name || '',
                    sender_contact: validatedData.sender_contact || '',
                    receiver_name: validatedData.receiver_name || '',
                    receiver_contact: validatedData.receiver_contact || '',
                    flight_number: validatedData.flight_number || existing.flight_number,
                    airway_bill_number: validatedData.airway_bill_number || existing.airway_bill_number,
                    departure_date: validatedData.departure_date ? new Date(validatedData.departure_date) : existing.departure_date,
                    arrival_date: validatedData.arrival_date ? new Date(validatedData.arrival_date) : existing.arrival_date,
                    updated_at: new Date()
                }
            })

            // Create history entry for the update
            await tx.aircargoStatusHistory.create({
                data: {
                    aircargo_id: aircargo.id,
                    status: status,
                    location: validatedData.last_location || '',
                    current_carrier: validatedData.current_carrier || ''
                }
            })

            return aircargo
        })

        return successResponse(
            result,
            `Information has been updated successfully for Tracking Number ${result.tracking_number}`
        )
    } catch (error: any) {
        console.error('Aircargo update error:', error)

        if (error.name === 'ZodError') {
            return errorResponse('Validation error', error.errors, 400)
        }

        // Check for unique constraint violation
        if (error.code === 'P2002') {
            return errorResponse('Tracking number already exists', null, 409)
        }

        return errorResponse(error.message || 'Failed to update aircargo', null, 500)
    }
}
