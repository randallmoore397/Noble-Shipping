'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Package, MoreHorizontal, Clock } from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'

interface RecentActivityProps {
  items: Array<{
    id: number
    tracking_number: string
    sender_name: string
    recipient_name: string
    status: string
    created_at: Date
  }>
}

export default function RecentActivity({ items }: RecentActivityProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'in transit':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="border-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <Package className="mr-2 h-5 w-5 text-purple-600" />
            Recent Activity
          </CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Latest parcel updates</p>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={item.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                <div className="flex-shrink-0 relative">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 mt-1.5"></div>
                  {index < items.length - 1 && (
                    <div className="absolute top-6 left-1/2 w-px h-8 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.tracking_number}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.sender_name} → {item.recipient_name}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatRelativeTime(item.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}