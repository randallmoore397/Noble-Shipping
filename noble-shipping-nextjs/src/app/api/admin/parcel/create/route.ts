import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { parcelSchema } from '@/lib/validations'
import { generateBarcode } from '@/lib/utils'
import { generateTrackingNumber } from '@/lib/server-utils'
import { requireRole } from '@/lib/auth-helpers'
import { createdResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        await requireRole(['Admin', 'Staff'])

        const body = await request.json()
        const validation = parcelSchema.safeParse(body)

        if (!validation.success) {
            return validationErrorResponse(validation.error)
        }

        const validatedData = validation.data

        // Generate tracking number if not provided
        let trackingNumber = validatedData.tracking_number
        if (!trackingNumber) {
            trackingNumber = await generateTrackingNumber()
        }

        // Check if tracking number already exists
        const existing = await prisma.parcel.findUnique({
            where: { tracking_number: trackingNumber }
        })

        if (existing) {
            return errorResponse('Tracking number already exists', null, 400)
        }

        // Generate barcode
        const barcode = generateBarcode()

        // Create parcel and history in transaction
        const result = await prisma.$transaction(async (tx) => {
            const parcel = await tx.parcel.create({
                data: {
                    tracking_number: trackingNumber,
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
                    status: validatedData.status,
                    shipping_cost: validatedData.shipping_cost || null,
                    estimated_delivery_date: validatedData.estimated_delivery_date
                        ? new Date(validatedData.estimated_delivery_date)
                        : null
                }
            })

            // Create initial history entry
            await tx.parcelStatusHistory.create({
                data: {
                    parcel_id: parcel.id,
                    status: validatedData.status,
                    location: validatedData.sender_address
                }
            })

            return parcel
        })

        return createdResponse(result, `Parcel created successfully with tracking number ${trackingNumber}`)
    } catch (error: any) {
        console.error('Parcel creation error:', error)
        return errorResponse(error.message || 'Failed to create parcel', null, 500)
    }
}
