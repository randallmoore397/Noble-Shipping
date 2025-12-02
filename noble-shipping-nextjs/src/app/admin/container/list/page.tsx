import Link from 'next/link'
import { db } from '@/lib/prisma'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Ship, Plus } from 'lucide-react'
import ContainerTable from './ContainerTable'

interface Container {
  id: number
  tracking_number: string
  origin: string
  destination: string
  last_location: string
  status: string
  estimated_delivery: string
  created_at: string
}

export default async function ContainerList() {
  let containersData: Container[]
  
  try {
    const results = await db.sql`
      SELECT id, tracking_number, origin, destination, last_location, status, 
             estimated_delivery, created_at
      FROM cargo 
      WHERE cargo_type = 'container'
      ORDER BY created_at DESC
      LIMIT 100
    `
    
    containersData = results.map((row: any) => ({
      id: row.id,
      tracking_number: row.tracking_number,
      origin: row.origin,
      destination: row.destination,
      last_location: row.last_location || 'N/A',
      status: row.status,
      estimated_delivery: new Date(row.estimated_delivery).toISOString(),
      created_at: new Date(row.created_at).toISOString()
    }))
  } catch (error) {
    console.error('Failed to fetch container data:', error)
    throw new Error('Failed to load container data')
  }



  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Container Tracking"
        description="Comprehensive container shipment management with real-time global tracking and analytics"
        gradient="from-red-600 via-red-500 to-red-700 dark:from-red-800 dark:via-red-700 dark:to-red-900"
        icon={<Ship className="h-8 w-8 text-emerald-600" />}
        stats={[
          { label: "Total Containers", value: containersData.length },
          { label: "In Transit", value: containersData.filter(c => c.status === 'In Transit').length },
          { label: "Delivered", value: containersData.filter(c => c.status === 'Delivered').length }
        ]}
      >
        <Button size="lg" className="shadow-lg hover:shadow-xl transition-all duration-200 bg-red-800 text-white hover:bg-red-900" asChild>
          <Link href="/admin/container/create">
            <Plus className="mr-2 h-5 w-5" />
            Add New Container
          </Link>
        </Button>
      </AdminPageHeader>

      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/10">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <Ship className="h-6 w-6 text-emerald-600 mr-3" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Container Tracking List</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {containersData.length} active containers
              </p>
            </div>
          </div>
          <ContainerTable data={containersData} />
        </CardContent>
      </Card>
    </div>
  )
}