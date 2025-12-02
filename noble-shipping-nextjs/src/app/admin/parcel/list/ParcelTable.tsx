'use client'

import Link from 'next/link'
import DataTable from '@/components/ui/DataTable'

interface ParcelTableProps {
    data: any[]
}

export default function ParcelTable({ data }: ParcelTableProps) {
    const columns = [
        {
            title: 'Tracking Number',
            data: 'tracking_number',
            render: (data: any, type: string, row: any) => {
                return `<a href="/tracking/parcel/${row.tracking_number}" class="text-primary">${row.tracking_number}</a>`
            }
        },
        { title: 'Sender', data: 'sender_name' },
        { title: 'Recipient', data: 'recipient_name' },
        { title: 'Weight', data: 'weight', render: (data: any) => `${data} kg` },
        {
            title: 'Status',
            data: 'status',
            render: (data: any) => {
                let badgeClass = 'bg-secondary'
                if (data === 'Delivered') badgeClass = 'bg-success'
                else if (data === 'In Transit') badgeClass = 'bg-primary'
                else if (data === 'Delayed') badgeClass = 'bg-warning'
                return `<span class="badge ${badgeClass}">${data}</span>`
            }
        },
        { title: 'Current Location', data: 'current_location', render: (data: any) => data || 'N/A' },
        {
            title: 'Actions',
            data: 'id',
            render: (data: any, type: string, row: any) => {
                return `
          <div class="btn-group">
            <a href="/admin/parcel/${row.id}/edit" class="btn btn-sm btn-outline-primary">Edit</a>
            <a href="/admin/parcel/${row.id}/history" class="btn btn-sm btn-outline-info">History</a>
          </div>
        `
            }
        }
    ]

    return <DataTable data={data} columns={columns} />
}
