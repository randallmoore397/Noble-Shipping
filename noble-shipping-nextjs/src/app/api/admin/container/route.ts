import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth, requireRole } from '@/lib/auth-helpers'
import { successResponse, errorResponse, createdResponse } from '@/lib/api-response'
import { containerSchema, cargoFilterSchema } from '@/lib/validations'

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
        { contents_description: { contains: search } },
        { origin: { contains: search } },
        { destination: { contains: search } }
      ]
    }

    // Execute query
    const [data, total] = await Promise.all([
      prisma.cargo.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          _count: {
            select: { CargoStatusHistory: true }
          }
        }
      }),
      prisma.cargo.count({ where })
    ])

    return successResponse({
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error: any) {
    console.error('Container List Error:', error)
    return errorResponse(error.message || 'Failed to fetch containers', null, 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(['Admin', 'Staff'])
    const body = await request.json()

    // Import utilities and constants
    const { generateTrackingNumber } = await import('@/lib/server-utils')
    const { generateBarcode } = await import('@/lib/utils')
    const { STATUS_CODE_MAP, INSURANCE_CODE_MAP } = await import('@/lib/constants')

    // Validate request body
    const validation = containerSchema.safeParse(body)
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

    // Map insurance from numeric code if needed
    let insurance = data.insurance || 'No Insurance'
    if (typeof data.insurance === 'number' || !isNaN(Number(data.insurance))) {
      insurance = INSURANCE_CODE_MAP[Number(data.insurance)] || data.insurance
    }

    // Generate EAN13 barcode
    const barcode = generateBarcode()

    // Create cargo and initial history in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const cargo = await tx.cargo.create({
        data: {
          tracking_number: trackingNumber,
          cargo_type: 'container',
          origin: data.origin,
          destination: data.destination,
          status: status,
          last_location: data.last_location,
          estimated_delivery: new Date(data.estimated_delivery),
          current_carrier: data.current_carrier,
          weight: data.weight,
          dimensions: data.dimensions,
          contents_description: data.contents_description,
          value: data.value,
          insurance: insurance,
          barcode: barcode, // Store EAN13 barcode
        }
      })

      // Create initial history entry
      await tx.cargoStatusHistory.create({
        data: {
          cargo_id: cargo.id,
          status: status,
          location: data.last_location,
          current_carrier: data.current_carrier,
        }
      })

      return cargo
    })

    return createdResponse(result, 'Container shipment created successfully')
  } catch (error: any) {
    console.error('Create Container Error:', error)
    // Check for unique constraint violation
    if (error.code === 'P2002') {
      return errorResponse('Tracking number already exists', null, 409)
    }
    return errorResponse(error.message || 'Failed to create container', null, 500)
  }
}