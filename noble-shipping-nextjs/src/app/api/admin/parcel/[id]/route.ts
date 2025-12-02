import { NextRequest } from 'next/server'
import { Database } from '@sqlitecloud/drivers'
import { requireRole } from '@/lib/auth-helpers'
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api-response'

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

    const parcel = await db.sql(
      'SELECT * FROM parcel WHERE id = ?',
      id
    )

    if (!parcel || parcel.length === 0) {
      return notFoundResponse('Parcel')
    }

    // Get status history
    const history = await db.sql(
      'SELECT * FROM parcel_status_history WHERE parcel_id = ? ORDER BY timestamp DESC',
      id
    )

    const result = {
      ...parcel[0],
      ParcelStatusHistory: history || []
    }

    return successResponse(result)
  } catch (error: any) {
    console.error('Get Parcel Error:', error)
    return errorResponse(error.message || 'Internal server error', null, 500)
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

    const data = await request.json()

    db = new Database(process.env.SQLITECLOUD_URL || process.env.DATABASE_URL!)

    // Get current parcel to check status change
    const currentParcel = await db.sql(
      'SELECT * FROM parcel WHERE id = ?',
      id
    )

    if (!currentParcel || currentParcel.length === 0) {
      return notFoundResponse('Parcel')
    }

    // Update parcel
    await db.sql(
      `UPDATE parcel SET
        tracking_number = ?,
        sender_name = ?,
        recipient_name = ?,
        status = ?,
        weight = ?,
        service_type = ?,
        shipping_cost = ?,
        estimated_delivery_date = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      data.tracking_number,
      data.sender_name,
      data.recipient_name,
      data.status,
      data.weight ? parseFloat(data.weight) : null,
      data.service_type || null,
      data.shipping_cost ? parseFloat(data.shipping_cost) : null,
      data.estimated_delivery_date || null,
      id
    )

    // Create history entry if status changed
    if (data.status && data.status !== currentParcel[0].status) {
      await db.sql(
        'INSERT INTO parcel_status_history (parcel_id, status, location) VALUES (?, ?, ?)',
        id,
        data.status,
        data.current_location || currentParcel[0].sender_address
      )
    }

    // Fetch updated parcel
    const updatedParcel = await db.sql(
      'SELECT * FROM parcel WHERE id = ?',
      id
    )

    return successResponse(updatedParcel[0], 'Parcel updated successfully')
  } catch (error: any) {
    console.error('Update Parcel Error:', error)
    if (error.message && error.message.includes('UNIQUE constraint failed')) {
      return errorResponse('Tracking number already exists', null, 409)
    }
    return errorResponse(error.message || 'Internal server error', null, 500)
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
    await requireRole(['Admin', 'Staff'])
    const id = parseInt(params.id)

    if (isNaN(id)) {
      return errorResponse('Invalid ID', null, 400)
    }

    db = new Database(process.env.SQLITECLOUD_URL || process.env.DATABASE_URL!)

    // Delete related history first
    await db.sql(
      'DELETE FROM parcel_status_history WHERE parcel_id = ?',
      id
    )

    // Delete parcel
    await db.sql(
      'DELETE FROM parcel WHERE id = ?',
      id
    )

    return successResponse(null, 'Parcel deleted successfully')
  } catch (error: any) {
    console.error('Delete Parcel Error:', error)
    return errorResponse(error.message || 'Internal server error', null, 500)
  } finally {
    try {
      db?.close()
    } catch { }
  }
}