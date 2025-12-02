'use client'

import { DonutChartCard } from '@/components/ui/chart'

export default function TrafficChart() {
  const trafficData = [
    { name: 'Search Engine', value: 1048 },
    { name: 'Direct', value: 735 },
    { name: 'Email', value: 580 },
    { name: 'Union Ads', value: 484 },
    { name: 'Video Ads', value: 300 }
  ]

  return (
    <DonutChartCard
      title="Website Traffic"
      subtitle="Today"
      data={trafficData}
      dataKey="value"
      nameKey="name"
    />
  )
}