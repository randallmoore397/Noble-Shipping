import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth, requireRole } from '@/lib/auth-helpers'
import { createdResponse, errorResponse } from '@/lib/api-response'
import { aircargoSchema } from '@/lib/validations'
import { generateBarcode, generateFlightNumber, generateAirwayBillNumber } from '@/lib/utils'
import { generateTrackingNumber } from '@/lib/server-utils'

export async function POST(request: NextRequest) {
    try {
        await requireRole(['Admin', 'Staff'])
        const body = await request.json()

        // Validate request body
        const validation = aircargoSchema.safeParse(body)
        if (!validation.success) {
            return errorResponse('Validation failed', validation.error.errors, 400)
        }

        const data = validation.data

        // Generate tracking number if not provided
        let trackingNumber = data.tracking_number
        if (!trackingNumber || trackingNumber === 'AUTO') {
            trackingNumber = await generateTrackingNumber()
        }

        // Generate barcode (EAN13 format)
        const barcode = generateBarcode()

        // Auto-generate flight_number if not provided and carrier exists
        let flightNumber = data.flight_number
        if (!flightNumber && data.current_carrier) {
            flightNumber = generateFlightNumber(data.current_carrier)
        }

        // Auto-generate airway_bill_number if not provided and carrier exists
        let airwayBillNumber = data.airway_bill_number
        if (!airwayBillNumber && data.current_carrier) {
            airwayBillNumber = generateAirwayBillNumber(data.current_carrier)
        }

        // Create aircargo and initial history in a transaction
        const result = await prisma.$transaction(async (tx) => {
            const aircargo = await tx.aircargo.create({
                data: {
                    tracking_number: trackingNumber,
                    cargo_type: 'aircargo',
                    origin: data.origin,
                    destination: data.destination,
                    status: data.status,
                    last_location: data.last_location,
                    estimated_delivery: data.estimated_delivery ? new Date(data.estimated_delivery) : undefined,
                    current_carrier: data.current_carrier,
                    sender_name: data.sender_name,
                    sender_contact: data.sender_contact,
                    receiver_name: data.receiver_name,
                    receiver_contact: data.receiver_contact,
                    flight_number: flightNumber,
                    airway_bill_number: airwayBillNumber,
                    departure_date: data.departure_date ? new Date(data.departure_date) : undefined,
                    arrival_date: data.arrival_date ? new Date(data.arrival_date) : undefined,
                    weight: data.weight,
                    dimensions: data.dimensions,
                    contents_description: data.contents_description,
                    value: data.value,
                    insurance: data.insurance,
                    barcode: barcode
                }
            })

            // Create initial history entry
            await tx.aircargoStatusHistory.create({
                data: {
                    aircargo_id: aircargo.id,
                    status: data.status,
                    location: data.last_location,
                    current_carrier: data.current_carrier,
                }
            })

            return aircargo
        })

        return createdResponse(result, `Air cargo shipment created successfully with tracking number ${trackingNumber}`)
    } catch (error: any) {
        console.error('Create Aircargo Error:', error)
        if (error.code === 'P2002') {
            return errorResponse('Tracking number already exists', null, 409)
        }
        return errorResponse(error.message || 'Failed to create air cargo', null, 500)
    }
}
