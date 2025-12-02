import { NextRequest } from 'next/server'
import { Database } from '@sqlitecloud/drivers'
import { requireAuth, requireRole } from '@/lib/auth-helpers'
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api-response'
import { containerSchema } from '@/lib/validations'

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

    const cargo = await db.sql(
      'SELECT * FROM cargo WHERE id = ?',
      id
    )

    if (!cargo || cargo.length === 0) {
      return notFoundResponse('Container shipment')
    }

    // Get status history
    const history = await db.sql(
      'SELECT * FROM cargo_status_history WHERE cargo_id = ? ORDER BY timestamp DESC',
      id
    )

    const result = {
      ...cargo[0],
      CargoStatusHistory: history || []
    }

    return successResponse(result)
  } catch (error: any) {
    console.error('Get Container Error:', error)
    return errorResponse(error.message || 'Failed to fetch container', null, 500)
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
    const validation = containerSchema.safeParse(body)
    if (!validation.success) {
      return errorResponse('Validation failed', validation.error.errors, 400)
    }

    const data = validation.data

    db = new Database(process.env.SQLITECLOUD_URL || process.env.DATABASE_URL!)

    // Get current cargo to check status change
    const currentCargo = await db.sql(
      'SELECT * FROM cargo WHERE id = ?',
      id
    )

    if (!currentCargo || currentCargo.length === 0) {
      return notFoundResponse('Container shipment')
    }

    // Update cargo
    await db.sql(
      `UPDATE cargo SET
        tracking_number = ?,
        origin = ?,
        destination = ?,
        status = ?,
        last_location = ?,
        estimated_delivery = ?,
        current_carrier = ?,
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
      data.estimated_delivery,
      data.current_carrier || null,
      data.weight || null,
      data.dimensions || null,
      data.contents_description || null,
      data.value || null,
      data.insurance || null,
      id
    )

    // Create history entry if status changed
    if (currentCargo[0].status !== data.status) {
      await db.sql(
        'INSERT INTO cargo_status_history (cargo_id, status, location, current_carrier) VALUES (?, ?, ?, ?)',
        id,
        data.status,
        data.last_location || null,
        data.current_carrier || null
      )
    }

    // Fetch updated cargo
    const updatedCargo = await db.sql(
      'SELECT * FROM cargo WHERE id = ?',
      id
    )

    return successResponse(updatedCargo[0], 'Container shipment updated successfully')
  } catch (error: any) {
    console.error('Update Container Error:', error)
    if (error.message && error.message.includes('UNIQUE constraint failed')) {
      return errorResponse('Tracking number already exists', null, 409)
    }
    return errorResponse(error.message || 'Failed to update container', null, 500)
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
      'DELETE FROM cargo_status_history WHERE cargo_id = ?',
      id
    )

    // Delete cargo
    await db.sql(
      'DELETE FROM cargo WHERE id = ?',
      id
    )

    return successResponse(null, 'Container shipment deleted successfully')
  } catch (error: any) {
    console.error('Delete Container Error:', error)
    return errorResponse(error.message || 'Failed to delete container', null, 500)
  } finally {
    try {
      db?.close()
    } catch { }
  }
}