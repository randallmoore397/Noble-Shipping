'use client';

import Link from 'next/link';
import { DataTable } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';

interface ContainerHistoryTableProps {
  cargo: any;
}

export default function ContainerHistoryTable({ cargo }: ContainerHistoryTableProps) {
  return (
    <DataTable
      columns={[
        {
          accessorKey: 'timestamp',
          header: 'Date',
          cell: ({ row }) => (
            <div className="bg-yellow-100 px-2 py-1 rounded font-bold text-sm">
              {new Date(row.getValue('timestamp')).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })}
            </div>
          ),
        },
        {
          accessorKey: 'status',
          header: 'Status',
          cell: ({ row }) => (
            <Badge className="bg-green-600 text-white font-bold">
              {row.getValue('status')}
            </Badge>
          ),
        },
        {
          accessorKey: 'location',
          header: 'Location',
          cell: ({ row }) => (
            <div className="bg-gray-200 px-2 py-1 rounded font-bold text-sm">
              {row.getValue('location') || 'N/A'}
            </div>
          ),
        },
        {
          accessorKey: 'origin',
          header: 'Origin',
          cell: () => (
            <div className="bg-gray-200 px-2 py-1 rounded font-bold text-sm">
              {cargo.origin}
            </div>
          ),
        },
        {
          accessorKey: 'destination', 
          header: 'Destination',
          cell: () => (
            <div className="bg-gray-200 px-2 py-1 rounded font-bold text-sm">
              {cargo.destination}
            </div>
          ),
        },
        {
          accessorKey: 'delivery_date',
          header: 'Delivery Date',
          cell: () => (
            <div className="bg-gray-200 px-2 py-1 rounded font-bold text-sm">
              {new Date(cargo.estimated_delivery).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
              })}
            </div>
          ),
        },
        {
          accessorKey: 'current_carrier',
          header: 'Carrier',
          cell: ({ row }) => (
            <div className="bg-gray-200 px-2 py-1 rounded font-bold text-sm">
              {row.getValue('current_carrier') || 'N/A'}
            </div>
          ),
        },
        {
          accessorKey: 'weight',
          header: 'Weight',
          cell: () => (
            <div className="bg-gray-200 px-2 py-1 rounded font-bold text-sm">
              {cargo.weight}
            </div>
          ),
        },
        {
          accessorKey: 'value',
          header: 'Value',
          cell: () => (
            <div className="bg-gray-200 px-2 py-1 rounded font-bold text-sm">
              {cargo.value}
            </div>
          ),
        },
        {
          id: 'actions',
          header: 'Action',
          cell: ({ row }) => (
            <Button variant="destructive" size="sm" asChild>
              <Link href={`/admin/container/history/${row.original.id}/edit`}>
                <i className="ri ri-ball-pen-line mr-1"></i>
                Edit
              </Link>
            </Button>
          ),
        },
      ] as ColumnDef<any>[]}
      data={cargo.CargoStatusHistory}
      searchKey="status"
      searchPlaceholder="Search history..."
    />
  );
}