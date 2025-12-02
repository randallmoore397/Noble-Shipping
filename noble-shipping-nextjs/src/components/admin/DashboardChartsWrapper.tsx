'use client'

import dynamic from 'next/dynamic'

// Dynamic import to prevent SSR for ApexCharts (window is not defined error)
const DashboardCharts = dynamic(() => import('@/components/admin/DashboardCharts'), {
  ssr: false,
  loading: () => <div className="text-center p-4">Loading chart...</div>
})

export default function DashboardChartsWrapper() {
  return <DashboardCharts />
}