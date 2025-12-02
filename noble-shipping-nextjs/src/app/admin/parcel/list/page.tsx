import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { DataTable } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Package, Plus, Edit, Eye } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { getStatusColor } from '@/lib/utils'

interface Parcel {
  id: number
  tracking_number: string
  sender_name: string
  recipient_name: string
  status: string
  estimated_delivery: string | null
  created_at: string
}

export default async function ParcelList() {
  let parcelsData: Parcel[]
  
  try {
    const parcels = await prisma.parcel.findMany({
      orderBy: { created_at: 'desc' },
      take: 100
    })

    parcelsData = parcels.map(c => ({
      id: c.id,
      tracking_number: c.tracking_number,
      sender_name: c.sender_name,
      recipient_name: c.recipient_name,
      status: c.status,
      estimated_delivery: c.estimated_delivery ? c.estimated_delivery.toISOString() : null,
      created_at: c.created_at.toISOString()
    }))
  } catch (error) {
    console.error('Failed to fetch parcel data:', error)
    throw new Error('Failed to load parcel data')
  }

  const columns: ColumnDef<Parcel>[] = [
    {
      accessorKey: 'tracking_number',
      header: 'Tracking Number',
      cell: ({ row }) => (
        <div className="font-mono font-semibold text-orange-600 dark:text-orange-400">
          {row.getValue('tracking_number')}
        </div>
      ),
    },
    {
      accessorKey: 'sender_name',
      header: 'Sender',
      cell: ({ row }) => (
        <div className="font-medium text-gray-900 dark:text-white">
          {row.getValue('sender_name')}
        </div>
      ),
    },
    {
      accessorKey: 'recipient_name',
      header: 'Recipient',
      cell: ({ row }) => (
        <div className="font-medium text-gray-900 dark:text-white">
          {row.getValue('recipient_name')}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return (
          <Badge className={getStatusColor(status)}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'estimated_delivery',
      header: () => <span className="hidden md:inline">Est. Delivery</span>,
      cell: ({ row }) => {
        const date = row.getValue('estimated_delivery') as string | null
        return (
          <div className="text-sm text-gray-600 dark:text-gray-300 hidden md:block">
            {date ? new Date(date).toLocaleDateString() : 'TBD'}
          </div>
        )
      },
    },
    {
      accessorKey: 'created_at',
      header: () => <span className="hidden lg:inline">Created</span>,
      cell: ({ row }) => {
        const date = new Date(row.getValue('created_at'))
        return (
          <div className="text-sm text-gray-600 dark:text-gray-300 hidden lg:block">
            {date.toLocaleDateString()}
          </div>
        )
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
          <Button variant="outline" size="sm" asChild className="w-full sm:w-auto text-xs">
            <Link href={`/admin/parcel/${row.original.id}/edit`}>
              <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Edit</span>
              <span className="sm:hidden">E</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="w-full sm:w-auto text-xs">
            <Link href={`/admin/parcel/${row.original.id}`}>
              <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">View</span>
              <span className="sm:hidden">V</span>
            </Link>
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Parcel Tracking"
        description="Manage and track parcel deliveries"
        gradient="from-red-600 via-red-500 to-red-700 dark:from-red-800 dark:via-red-700 dark:to-red-900"
      >
        <Button size="lg" className="shadow-lg hover:shadow-xl transition-all duration-200 bg-red-800 text-white hover:bg-red-900" asChild>
          <Link href="/admin/parcel/create">
            <Plus className="mr-2 h-5 w-5" />
            Add New Parcel
          </Link>
        </Button>
      </AdminPageHeader>

      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-orange-50/30 dark:from-gray-800 dark:to-orange-900/10">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <Package className="h-6 w-6 text-orange-600 mr-3" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Parcel Tracking List</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {parcelsData.length} active parcels
              </p>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={parcelsData}
            searchKey="tracking_number"
            searchPlaceholder="Search parcels..."
          />
        </CardContent>
      </Card>
    </div>
  )
}