'use client'

import { AreaChartCard } from '@/components/ui/chart'

export default function DashboardCharts() {
  const visitorData = [
    { name: '00:00', visitors: 120 },
    { name: '04:00', visitors: 80 },
    { name: '08:00', visitors: 200 },
    { name: '12:00', visitors: 350 },
    { name: '16:00', visitors: 280 },
    { name: '20:00', visitors: 180 },
    { name: '24:00', visitors: 90 },
  ]

  return (
    <AreaChartCard
      title="Total Visitors"
      subtitle="Today"
      data={visitorData}
      dataKey="visitors"
      xAxisKey="name"
      color="#3b82f6"
    />
  )
}