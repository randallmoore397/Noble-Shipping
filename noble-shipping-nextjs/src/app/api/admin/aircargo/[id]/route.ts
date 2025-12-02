import { NextRequest } from 'next/server'
import { Database } from '@sqlitecloud/drivers'
import { requireAuth, requireRole } from '@/lib/auth-helpers'
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api-response'
import { aircargoSchema } from '@/lib/validations'

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  let db: Database | null = null
  try {
    await requireRole(['Admin', 'Staff'])
    const id = parseInt(params.id)

    if (isNaN(id)) {
      return errorResponse('Invalid ID', null, 400)
    }

    db = new Database(process.env.SQLITECLOUD_URL || process.env.DATABASE_URL!)

    const aircargo = await db.sql(
      'SELECT * FROM aircargo WHERE id = ?',
      id
    )

    if (!aircargo || aircargo.length === 0) {
      return notFoundResponse('Air cargo shipment')
    }

    // Get status history
    const history = await db.sql(
      'SELECT * FROM aircargo_status_history WHERE aircargo_id = ? ORDER BY timestamp DESC',
      id
    )

    const result = {
      ...aircargo[0],
      AircargoStatusHistory: history || []
    }

    return successResponse(result)
  } catch (error: any) {
    console.error('Get Aircargo Error:', error)
    return errorResponse(error.message || 'Failed to fetch air cargo', null, 500)
  } finally {
    try {
      db?.close()
    } catch { }
  }
}

export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  let db: Database | null = null
  try {
    await requireRole(['Admin', 'Staff'])
    const id = parseInt(params.id)

    if (isNaN(id)) {
      return errorResponse('Invalid ID', null, 400)
    }

    const body = await request.json()

    // Validate request body
    const validation = aircargoSchema.safeParse(body)
    if (!validation.success) {
      return errorResponse('Validation failed', validation.error.errors, 400)
    }

    const data = validation.data

    db = new Database(process.env.SQLITECLOUD_URL || process.env.DATABASE_URL!)

    // Get current aircargo to check status change
    const currentAircargo = await db.sql(
      'SELECT * FROM aircargo WHERE id = ?',
      id
    )

    if (!currentAircargo || currentAircargo.length === 0) {
      return notFoundResponse('Air cargo shipment')
    }

    // Update aircargo
    await db.sql(
      `UPDATE aircargo SET
        tracking_number = ?,
        origin = ?,
        destination = ?,
        status = ?,
        last_location = ?,
        estimated_delivery = ?,
        current_carrier = ?,
        sender_name = ?,
        sender_contact = ?,
        receiver_name = ?,
        receiver_contact = ?,
        flight_number = ?,
        airway_bill_number = ?,
        departure_date = ?,
        arrival_date = ?,
        weight = ?,
        dimensions = ?,
        contents_description = ?,
        value = ?,
        insurance = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      data.tracking_number,
      data.origin,
      data.destination,
      data.status,
      data.last_location || null,
      data.estimated_delivery || null,
      data.current_carrier || null,
      data.sender_name || null,
      data.sender_contact || null,
      data.receiver_name || null,
      data.receiver_contact || null,
      data.flight_number || null,
      data.airway_bill_number || null,
      data.departure_date || null,
      data.arrival_date || null,
      data.weight || null,
      data.dimensions || null,
      data.contents_description || null,
      data.value || null,
      data.insurance || null,
      id
    )

    // Create history entry if status changed
    if (currentAircargo[0].status !== data.status) {
      await db.sql(
        'INSERT INTO aircargo_status_history (aircargo_id, status, location, current_carrier) VALUES (?, ?, ?, ?)',
        id,
        data.status,
        data.last_location || null,
        data.current_carrier || null
      )
    }

    // Fetch updated aircargo
    const updatedAircargo = await db.sql(
      'SELECT * FROM aircargo WHERE id = ?',
      id
    )

    return successResponse(updatedAircargo[0], 'Air cargo shipment updated successfully')
  } catch (error: any) {
    console.error('Update Aircargo Error:', error)
    if (error.message && error.message.includes('UNIQUE constraint failed')) {
      return errorResponse('Tracking number already exists', null, 409)
    }
    return errorResponse(error.message || 'Failed to update air cargo', null, 500)
  } finally {
    try {
      db?.close()
    } catch { }
  }
}

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  let db: Database | null = null
  try {
    await requireRole(['Admin']) // Only Admin can delete
    const id = parseInt(params.id)

    if (isNaN(id)) {
      return errorResponse('Invalid ID', null, 400)
    }

    db = new Database(process.env.SQLITECLOUD_URL || process.env.DATABASE_URL!)

    // Delete related history first
    await db.sql(
      'DELETE FROM aircargo_status_history WHERE aircargo_id = ?',
      id
    )

    // Delete aircargo
    await db.sql(
      'DELETE FROM aircargo WHERE id = ?',
      id
    )

    return successResponse(null, 'Air cargo shipment deleted successfully')
  } catch (error: any) {
    console.error('Delete Aircargo Error:', error)
    return errorResponse(error.message || 'Failed to delete air cargo', null, 500)
  } finally {
    try {
      db?.close()
    } catch { }
  }
}