import Link from 'next/link'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plane, Plus } from 'lucide-react'
import { db } from '@/lib/prisma'
import AircargoTable from './AircargoTable'

interface Aircargo {
  id: number
  tracking_number: string
  origin: string
  destination: string
  last_location: string | null
  status: string
  departure_date: Date | null
  arrival_date: Date | null
  created_at: Date
  current_carrier: string | null
}

export default async function AircargoList() {
  let aircargoData: Aircargo[]
  
  try {
    const results = await db.sql`
      SELECT id, tracking_number, origin, destination, last_location, status, 
             departure_date, arrival_date, created_at, current_carrier
      FROM aircargo 
      ORDER BY created_at DESC
    `
    
    aircargoData = results.map((row: any) => ({
      id: row.id,
      tracking_number: row.tracking_number,
      origin: row.origin,
      destination: row.destination,
      last_location: row.last_location,
      status: row.status,
      departure_date: row.departure_date ? new Date(row.departure_date) : null,
      arrival_date: row.arrival_date ? new Date(row.arrival_date) : null,
      created_at: new Date(row.created_at),
      current_carrier: row.current_carrier
    }))
  } catch (error) {
    console.error('Failed to fetch aircargo data:', error)
    throw new Error('Failed to load aircargo data')
  }



  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Aircargo Tracking"
        description="Manage and track air freight shipments globally"
        gradient="from-red-600 via-red-500 to-red-700 dark:from-red-800 dark:via-red-700 dark:to-red-900"
      >
        <Button size="lg" className="shadow-lg hover:shadow-xl transition-all duration-200 bg-red-800 text-white hover:bg-red-900" asChild>
          <Link href="/admin/aircargo/create">
            <Plus className="mr-2 h-5 w-5" />
            Add New Aircargo
          </Link>
        </Button>
      </AdminPageHeader>

      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/10">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <Plane className="h-6 w-6 text-blue-600 mr-3" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Aircargo Tracking List</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {aircargoData.length} active aircargo shipments
              </p>
            </div>
          </div>
          <AircargoTable data={aircargoData} />
        </CardContent>
      </Card>
    </div>
  )
}