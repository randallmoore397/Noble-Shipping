import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { DataTable } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Users, UserPlus, Edit, RotateCcw } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

interface User {
  id: number
  name: string
  email: string
  position: string
  roles: string
  status: string
}

export default async function UsersList() {
  let usersData: User[]
  
  try {
    const users = await prisma.user.findMany({
      include: {
        Staffs: true,
        roles: true
      },
      orderBy: { id: 'desc' }
    })

    usersData = users.map(user => ({
      id: user.id,
      name: user.Staffs[0] ? `${user.Staffs[0].first_name || ''} ${user.Staffs[0].last_name || ''}`.trim() : 'N/A',
      email: user.email,
      position: user.Staffs[0]?.position || 'N/A',
      roles: user.roles.map(r => r.name).join(', ') || 'N/A',
      status: user.active ? 'Active' : 'Inactive'
    }))
  } catch (error) {
    console.error('Failed to fetch users data:', error)
    throw new Error('Failed to load users data')
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="font-medium text-gray-900 dark:text-white">
          {row.getValue('name')}
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <div className="text-gray-600 dark:text-gray-300">
          {row.getValue('email')}
        </div>
      ),
    },
    {
      accessorKey: 'position',
      header: () => <span className="hidden sm:inline">Position</span>,
      cell: ({ row }) => (
        <div className="hidden sm:block">
          {row.getValue('position')}
        </div>
      ),
    },
    {
      accessorKey: 'roles',
      header: 'Roles',
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.getValue('roles')}
        </Badge>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return (
          <Badge variant={status === 'Active' ? 'success' : 'destructive'}>
            {status}
          </Badge>
        )
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
          <Button variant="outline" size="sm" asChild className="w-full sm:w-auto text-xs">
            <Link href={`/admin/users/${row.original.id}/edit`}>
              <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Edit</span>
              <span className="sm:hidden">E</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="w-full sm:w-auto text-xs">
            <Link href={`/admin/users/reset-password?userId=${row.original.id}`}>
              <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Reset</span>
              <span className="sm:hidden">R</span>
            </Link>
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="User Management"
        description="Manage user accounts and permissions"
        gradient="from-red-600 via-red-500 to-red-700 dark:from-red-800 dark:via-red-700 dark:to-red-900"
      >
        <Button size="lg" className="shadow-lg hover:shadow-xl transition-all duration-200 bg-red-800 text-white hover:bg-red-900" asChild>
          <Link href="/admin/users/create">
            <UserPlus className="mr-2 h-5 w-5" />
            Create New User
          </Link>
        </Button>
      </AdminPageHeader>

      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/10">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <Users className="h-6 w-6 text-blue-600 mr-3" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">All Users</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {usersData.length} total users
              </p>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={usersData}
            searchKey="name"
            searchPlaceholder="Search users..."
          />
        </CardContent>
      </Card>
    </div>
  )
}