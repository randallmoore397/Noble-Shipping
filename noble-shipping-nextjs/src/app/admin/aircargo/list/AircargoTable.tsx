'use client'

import Link from 'next/link'
import { DataTable } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, Eye } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { getStatusColor } from '@/lib/utils'

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

interface AircargoTableProps {
  data: Aircargo[]
}

export default function AircargoTable({ data }: AircargoTableProps) {
  const columns: ColumnDef<Aircargo>[] = [
    {
      accessorKey: 'tracking_number',
      header: 'Tracking Number',
      cell: ({ row }) => (
        <div className="font-mono font-semibold text-blue-600 dark:text-blue-400">
          {row.getValue('tracking_number')}
        </div>
      ),
    },
    {
      accessorKey: 'origin',
      header: 'Origin',
    },
    {
      accessorKey: 'destination',
      header: 'Destination',
    },
    {
      accessorKey: 'last_location',
      header: () => <span className="hidden sm:inline">Last Location</span>,
      cell: ({ row }) => (
        <div className="text-gray-600 dark:text-gray-300 hidden sm:block">
          {row.getValue('last_location') || 'N/A'}
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
      accessorKey: 'departure_date',
      header: () => <span className="hidden md:inline">Departure</span>,
      cell: ({ row }) => {
        const date = row.getValue('departure_date') as Date | null
        return (
          <div className="text-sm text-gray-600 dark:text-gray-300 hidden md:block">
            {date ? new Date(date).toLocaleDateString() : 'N/A'}
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
            <Link href={`/admin/aircargo/${row.original.id}/edit`}>
              <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Edit</span>
              <span className="sm:hidden">E</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="w-full sm:w-auto text-xs">
            <Link href={`/admin/aircargo/${row.original.id}`}>
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
    <DataTable
      columns={columns}
      data={data}
      searchKey="tracking_number"
      searchPlaceholder="Search aircargo..."
    />
  )
}