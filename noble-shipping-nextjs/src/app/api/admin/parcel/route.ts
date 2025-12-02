import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth, requireRole } from '@/lib/auth-helpers'
import { successResponse, errorResponse, createdResponse } from '@/lib/api-response'
import { parcelSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    await requireRole(['Admin', 'Staff'])

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc'

    // Build filter
    const where: any = {}

    if (status) {
      where.status = status
    }

    if (search) {
      where.OR = [
        { tracking_number: { contains: search } },
        { sender_name: { contains: search } },
        { recipient_name: { contains: search } },
        { sender_email: { contains: search } }
      ]
    }

    // Execute query
    const [data, total] = await Promise.all([
      prisma.parcel.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          _count: {
            select: { ParcelStatusHistory: true }
          }
        }
      }),
      prisma.parcel.count({ where })
    ])

    return successResponse({
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error: any) {
    console.error('Parcel List Error:', error)
    return errorResponse(error.message || 'Failed to fetch parcels', null, 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireRole(['Admin', 'Staff'])
    const body = await request.json()

    // Import utilities and constants
    const { generateTrackingNumber, generateQRCode } = await import('@/lib/utils')
    const { STATUS_CODE_MAP } = await import('@/lib/constants')

    // Validate request body
    const validation = parcelSchema.safeParse(body)
    if (!validation.success) {
      return errorResponse('Validation failed', validation.error.errors, 400)
    }

    const data = validation.data

    // Generate tracking number if not provided
    const trackingNumber = data.tracking_number || await generateTrackingNumber()

    // Map status from numeric code if needed
    let status = data.status
    if (typeof data.status === 'number' || !isNaN(Number(data.status))) {
      status = STATUS_CODE_MAP[Number(data.status)] || data.status
    }

    // Generate QR code for tracking number
    const qrCode = await generateQRCode(trackingNumber)

    // Create parcel and initial history in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const parcel = await tx.parcel.create({
        data: {
          tracking_number: trackingNumber,
          sender_name: data.sender_name,
          sender_email: data.sender_email,
          sender_phone: data.sender_phone,
          sender_address: data.sender_address,
          recipient_name: data.recipient_name,
          recipient_email: data.recipient_email,
          recipient_phone: data.recipient_phone,
          recipient_address: data.recipient_address,
          weight: data.weight,
          service_type: data.service_type,
          status: status,
          shipping_cost: data.shipping_cost,
          estimated_delivery_date: data.estimated_delivery_date ? new Date(data.estimated_delivery_date) : undefined,
          barcode: qrCode, // Store QR code as base64
        }
      })

      // Create initial history entry
      await tx.parcelStatusHistory.create({
        data: {
          parcel_id: parcel.id,
          status: status,
          location: data.sender_address, // Initial location is sender address
        }
      })

      return parcel
    })

    return createdResponse(result, 'Parcel shipment created successfully')
  } catch (error: any) {
    console.error('Create Parcel Error:', error)
    if (error.code === 'P2002') {
      return errorResponse('Tracking number already exists', null, 409)
    }
    return errorResponse(error.message || 'Failed to create parcel', null, 500)
  }
}