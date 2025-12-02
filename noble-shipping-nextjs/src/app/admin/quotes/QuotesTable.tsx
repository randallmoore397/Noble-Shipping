'use client'

import { DataTable } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Mail, MapPin, Package2 } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

interface Quote {
  id: number
  service: string
  from_country: string
  to_country: string
  weight: string
  dimensions: string
  email_address: string
  timestamp: string
}

interface QuotesTableProps {
  data: Quote[]
}

export default function QuotesTable({ data }: QuotesTableProps) {
  const getServiceColor = (service: string) => {
    switch (service.toLowerCase()) {
      case 'air freight':
        return 'bg-blue-100 text-blue-800'
      case 'sea freight':
        return 'bg-emerald-100 text-emerald-800'
      case 'road freight':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const columns: ColumnDef<Quote>[] = [
    {
      accessorKey: 'service',
      header: 'Service',
      cell: ({ row }) => (
        <Badge className={getServiceColor(row.getValue('service'))}>
          {row.getValue('service')}
        </Badge>
      ),
    },
    {
      accessorKey: 'from_country',
      header: 'From',
      cell: ({ row }) => (
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <MapPin className="h-4 w-4 mr-2 text-green-600" />
          {row.getValue('from_country')}
        </div>
      ),
    },
    {
      accessorKey: 'to_country',
      header: 'To',
      cell: ({ row }) => (
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <MapPin className="h-4 w-4 mr-2 text-red-600" />
          {row.getValue('to_country')}
        </div>
      ),
    },
    {
      accessorKey: 'weight',
      header: () => <span className="hidden md:inline">Weight</span>,
      cell: ({ row }) => (
        <div className="flex items-center text-gray-700 dark:text-gray-300 hidden md:flex">
          <Package2 className="h-4 w-4 mr-2" />
          {row.getValue('weight')}
        </div>
      ),
    },
    {
      accessorKey: 'dimensions',
      header: () => <span className="hidden lg:inline">Dimensions</span>,
      cell: ({ row }) => (
        <div className="text-sm text-gray-600 dark:text-gray-300 font-mono hidden lg:block">
          {row.getValue('dimensions')}
        </div>
      ),
    },
    {
      accessorKey: 'email_address',
      header: 'Email',
      cell: ({ row }) => (
        <div className="flex items-center text-blue-600 dark:text-blue-400">
          <Mail className="h-4 w-4 mr-2" />
          {row.getValue('email_address')}
        </div>
      ),
    },
    {
      accessorKey: 'timestamp',
      header: () => <span className="hidden lg:inline">Date</span>,
      cell: ({ row }) => (
        <div className="text-sm text-gray-600 dark:text-gray-300 hidden lg:block">
          {row.getValue('timestamp')}
        </div>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="service"
      searchPlaceholder="Search quotes..."
    />
  )
}