import { notFound } from 'next/navigation'
import { db } from '@/lib/prisma'
import EditContainerForm from './EditContainerForm'

export default async function EditContainer({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let container
  try {
    const results = await db.sql`
      SELECT id, tracking_number, origin, destination, status, last_location, 
             current_carrier, weight, dimensions, contents_description, value, 
             insurance, estimated_delivery, created_at, updated_at
      FROM cargo 
      WHERE id = ${Number(id)}
    `

    if (results.length === 0) {
      notFound()
    }

    // Serialize to plain object for Client Component
    container = JSON.parse(JSON.stringify(results[0]))
  } catch (error) {
    console.error('Failed to fetch container:', error)
    throw new Error('Failed to load container data')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Edit Container - {container.tracking_number}</h1>
        </div>
        <div className="p-6">
          <EditContainerForm container={container} />
        </div>
      </div>
    </div>
  )
}