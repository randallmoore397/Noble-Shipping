import { notFound } from 'next/navigation'
import { db } from '@/lib/prisma'
import EditParcelForm from './EditParcelForm'

export default async function EditParcel({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let parcel
  try {
    const results = await db.sql`
      SELECT id, tracking_number, sender_name, recipient_name, status, weight, 
             service_type, estimated_delivery_date, shipping_cost, created_at, updated_at
      FROM parcel 
      WHERE id = ${Number(id)}
    `

    if (results.length === 0) {
      notFound()
    }

    // Serialize to plain object for Client Component
    parcel = JSON.parse(JSON.stringify(results[0]))
  } catch (error) {
    console.error('Failed to fetch parcel:', error)
    throw new Error('Failed to load parcel data')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Edit Parcel - {parcel.tracking_number}</h1>
        </div>
        <div className="p-6">
          <EditParcelForm parcel={parcel} />
        </div>
      </div>
    </div>
  )
}