import { StatsCard } from '@/components/admin/StatsCard'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import RecentActivity from '@/components/admin/RecentActivity'
import DashboardChartsWrapper from '@/components/admin/DashboardChartsWrapper'
import BudgetChart from '@/components/admin/BudgetChart'
import TrafficChart from '@/components/admin/TrafficChart'
import { Plane, Ship, Package, Users, Plus, MoreHorizontal } from 'lucide-react'
import { getStatusColor } from '@/lib/utils'
import Link from 'next/link'
import { db } from '@/lib/prisma'

export default async function AdminDashboard() {
  // Fetch real data from SQLite Cloud
  const [containerCountResult, aircargoCountResult, parcelCountResult, userCountResult] = await Promise.all([
    db.sql`SELECT COUNT(*) as count FROM cargo`,
    db.sql`SELECT COUNT(*) as count FROM aircargo`,
    db.sql`SELECT COUNT(*) as count FROM parcel`,
    db.sql`SELECT COUNT(*) as count FROM user`
  ])
  
  const containerCount = containerCountResult[0]?.count || 0
  const aircargoCount = aircargoCountResult[0]?.count || 0
  const parcelCount = parcelCountResult[0]?.count || 0
  const userCount = userCountResult[0]?.count || 0
  
  const [recentContainersResult, recentAircargoResult, recentParcelsResult] = await Promise.all([
    db.sql`SELECT id, tracking_number, origin, destination, last_location, status FROM cargo ORDER BY created_at DESC LIMIT 3`,
    db.sql`SELECT id, tracking_number, origin, destination, last_location, status FROM aircargo ORDER BY created_at DESC LIMIT 3`,
    db.sql`SELECT id, tracking_number, sender_name, recipient_name, status, created_at FROM parcel ORDER BY created_at DESC LIMIT 2`
  ])
  
  const recentContainers = recentContainersResult.map((row: any) => ({
    id: row.id,
    tracking_number: row.tracking_number,
    origin: row.origin,
    destination: row.destination,
    last_location: row.last_location,
    status: row.status
  }))
  
  const recentAircargo = recentAircargoResult.map((row: any) => ({
    id: row.id,
    tracking_number: row.tracking_number,
    origin: row.origin,
    destination: row.destination,
    last_location: row.last_location,
    status: row.status
  }))
  
  const recentParcels = recentParcelsResult.map((row: any) => ({
    id: row.id,
    tracking_number: row.tracking_number,
    sender_name: row.sender_name,
    recipient_name: row.recipient_name,
    status: row.status,
    created_at: new Date(row.created_at)
  }))



  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your shipments."
      >
        <Button size="lg" className="shadow-lg hover:shadow-xl transition-all duration-200" asChild>
          <Link href="/admin/container/create">
            <Plus className="mr-2 h-5 w-5" />
            New Container
          </Link>
        </Button>
      </AdminPageHeader>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Aircargo Tracking"
          value={aircargoCount}
          icon={Plane}
          trend={{
            value: 1,
            isPositive: true,
            label: 'vs last month',
          }}
          gradient="from-blue-500 via-blue-600 to-blue-700"
          className="hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20"
        />
        <StatsCard
          title="Container Tracking"
          value={containerCount}
          icon={Ship}
          trend={{
            value: 3,
            isPositive: true,
            label: 'vs last month',
          }}
          gradient="from-emerald-500 via-emerald-600 to-emerald-700"
          className="hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0 bg-gradient-to-br from-white to-emerald-50/50 dark:from-gray-800 dark:to-emerald-900/20"
        />
        <StatsCard
          title="Parcel Tracking"
          value={parcelCount}
          icon={Package}
          trend={{
            value: 5,
            isPositive: true,
            label: 'vs last month',
          }}
          gradient="from-orange-500 via-orange-600 to-orange-700"
          className="hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0 bg-gradient-to-br from-white to-orange-50/50 dark:from-gray-800 dark:to-orange-900/20"
        />
        <StatsCard
          title="Total Users"
          value={userCount}
          icon={Users}
          trend={{
            value: 0,
            isPositive: false,
            label: 'vs last month',
          }}
          gradient="from-purple-500 via-purple-600 to-purple-700"
          className="hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0 bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-800 dark:to-purple-900/20"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">

          {/* Visitor Chart */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Total Visitors
                </CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Today's traffic overview</p>
              </div>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <DashboardChartsWrapper />
            </CardContent>
          </Card>

          {/* Recent Aircargo */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Plane className="mr-2 h-5 w-5 text-blue-600" />
                  Recent Aircargo
                </CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Latest aircargo shipments</p>
              </div>
              <Button variant="outline" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900/20" asChild>
                <Link href="/admin/aircargo/list">View All</Link>
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">#</th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Origin</th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Destination</th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Last Location</th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAircargo.map((aircargo) => (
                      <tr key={aircargo.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="py-3">
                          <Link href={`/admin/aircargo/${aircargo.id}`} className="text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                            {aircargo.tracking_number}
                          </Link>
                        </td>
                        <td className="py-3 text-sm text-gray-700 dark:text-gray-300">{aircargo.origin}</td>
                        <td className="py-3 text-sm text-gray-700 dark:text-gray-300">{aircargo.destination}</td>
                        <td className="py-3 text-sm text-gray-700 dark:text-gray-300">{aircargo.last_location}</td>
                        <td className="py-3">
                          <Badge className={getStatusColor(aircargo.status)}>
                            {aircargo.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Recent Containers */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Ship className="mr-2 h-5 w-5 text-emerald-600" />
                  Recent Containers
                </CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Latest container shipments</p>
              </div>
              <Button variant="outline" size="sm" className="hover:bg-emerald-50 dark:hover:bg-emerald-900/20" asChild>
                <Link href="/admin/container/list">View All</Link>
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">#</th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Origin</th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Destination</th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Last Location</th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentContainers.map((container) => (
                      <tr key={container.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="py-3">
                          <Link href={`/admin/container/${container.id}`} className="text-sm font-semibold text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors">
                            {container.tracking_number}
                          </Link>
                        </td>
                        <td className="py-3 text-sm text-gray-700 dark:text-gray-300">{container.origin}</td>
                        <td className="py-3 text-sm text-gray-700 dark:text-gray-300">{container.destination}</td>
                        <td className="py-3 text-sm text-gray-700 dark:text-gray-300">{container.last_location}</td>
                        <td className="py-3">
                          <Badge className={getStatusColor(container.status)}>
                            {container.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10 rounded-xl">
            <RecentActivity items={recentParcels} />
          </div>
          <div className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50 rounded-xl">
            <BudgetChart />
          </div>
          <div className="shadow-lg border-0 bg-gradient-to-br from-white to-indigo-50/30 dark:from-gray-800 dark:to-indigo-900/10 rounded-xl">
            <TrafficChart />
          </div>
        </div>
      </div>
    </div>
  )
}