import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth, requireRole } from '@/lib/auth-helpers'
import { createdResponse, errorResponse } from '@/lib/api-response'
import { containerSchema } from '@/lib/validations'
import { generateBarcode } from '@/lib/utils'
import { generateTrackingNumber } from '@/lib/server-utils'

export async function POST(request: NextRequest) {
    try {
        await requireRole(['Admin', 'Staff'])
        const body = await request.json()

        // Validate request body
        const validation = containerSchema.safeParse(body)
        if (!validation.success) {
            return errorResponse('Validation failed', validation.error.errors, 400)
        }

        const data = validation.data

        // Generate tracking number if not provided (though schema requires it, we can override or make optional in schema if needed)
        // But here we assume it's provided or we generate it if it's 'AUTO' or empty
        let trackingNumber = data.tracking_number
        if (!trackingNumber || trackingNumber === 'AUTO') {
            trackingNumber = await generateTrackingNumber()
        }

        // Generate barcode
        const barcode = generateBarcode()

        // Create cargo and initial history in a transaction
        const result = await prisma.$transaction(async (tx) => {
            const cargo = await tx.cargo.create({
                data: {
                    tracking_number: trackingNumber,
                    cargo_type: 'container',
                    origin: data.origin,
                    destination: data.destination,
                    status: data.status,
                    last_location: data.last_location,
                    estimated_delivery: new Date(data.estimated_delivery),
                    current_carrier: data.current_carrier,
                    weight: data.weight,
                    dimensions: data.dimensions,
                    contents_description: data.contents_description,
                    value: data.value,
                    insurance: data.insurance,
                    barcode: barcode
                }
            })

            // Create initial history entry
            await tx.cargoStatusHistory.create({
                data: {
                    cargo_id: cargo.id,
                    status: data.status,
                    location: data.last_location,
                    current_carrier: data.current_carrier,
                }
            })

            return cargo
        })

        return createdResponse(result, `Container shipment created successfully with tracking number ${trackingNumber}`)
    } catch (error: any) {
        console.error('Create Container Error:', error)
        if (error.code === 'P2002') {
            return errorResponse('Tracking number already exists', null, 409)
        }
        return errorResponse(error.message || 'Failed to create container', null, 500)
    }
}
