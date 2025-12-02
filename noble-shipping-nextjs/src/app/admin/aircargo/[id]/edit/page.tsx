import { notFound } from 'next/navigation'
import { db } from '@/lib/prisma'
import EditAircargoForm from './EditAircargoForm'

export default async function EditAircargo({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let aircargo
  try {
    const results = await db.sql`
      SELECT id, tracking_number, origin, destination, status, current_carrier, 
             estimated_delivery, created_at, updated_at
      FROM aircargo 
      WHERE id = ${Number(id)}
    `

    if (results.length === 0) {
      notFound()
    }

    // Serialize to plain object for Client Component
    aircargo = JSON.parse(JSON.stringify(results[0]))
  } catch (error) {
    console.error('Failed to fetch aircargo:', error)
    throw new Error('Failed to load aircargo data')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Edit Aircargo - {aircargo.tracking_number}</h1>
        </div>
        <div className="p-6">
          <EditAircargoForm aircargo={aircargo} />
        </div>
      </div>
    </div>
  )
}