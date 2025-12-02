import { prisma } from '@/lib/prisma'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { DataTable } from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { MessageSquare, Mail, Globe } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

interface Message {
  id: number
  name: string
  email: string
  website: string
  message: string
  timestamp: string
}

export default async function MessagesPage() {
  let messagesData: Message[]
  
  try {
    const messages = await prisma.getInTouch.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100
    })

    messagesData = messages.map((message, index) => ({
      id: index + 1,
      name: `${message.first_name} ${message.last_name}`,
      email: message.email,
      website: message.website || 'N/A',
      message: message.message.length > 100 ? message.message.substring(0, 100) + '...' : message.message,
      timestamp: new Date(message.timestamp).toLocaleDateString()
    }))
  } catch (error) {
    console.error('Failed to fetch messages data:', error)
    throw new Error('Failed to load messages data')
  }

  const columns: ColumnDef<Message>[] = [
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
        <div className="flex items-center text-blue-600 dark:text-blue-400">
          <Mail className="h-4 w-4 mr-2" />
          {row.getValue('email')}
        </div>
      ),
    },
    {
      accessorKey: 'website',
      header: () => <span className="hidden md:inline">Website</span>,
      cell: ({ row }) => {
        const website = row.getValue('website') as string
        return (
          <div className="flex items-center text-gray-600 dark:text-gray-300 hidden md:flex">
            <Globe className="h-4 w-4 mr-2" />
            {website}
          </div>
        )
      },
    },
    {
      accessorKey: 'message',
      header: () => <span className="hidden sm:inline">Message</span>,
      cell: ({ row }) => (
        <div className="max-w-md text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
          {row.getValue('message')}
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
    <div className="space-y-8">
      <AdminPageHeader
        title="Contact Messages"
        description="Customer inquiries and contact form submissions"
        gradient="from-red-600 via-red-500 to-red-700 dark:from-red-800 dark:via-red-700 dark:to-red-900"
      />

      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-indigo-50/30 dark:from-gray-800 dark:to-indigo-900/10">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <MessageSquare className="h-6 w-6 text-indigo-600 mr-3" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Contact Us Messages</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {messagesData.length} customer messages
              </p>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={messagesData}
            searchKey="name"
            searchPlaceholder="Search messages..."
          />
        </CardContent>
      </Card>
    </div>
  )
}