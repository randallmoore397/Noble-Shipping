import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Edit, Lock, Mail, Phone, MapPin, Briefcase } from 'lucide-react'
import Link from 'next/link'

export default async function AdminProfilePage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return <div>Not authenticated</div>
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      Staffs: true
    }
  })

  if (!user) {
    return <div>User not found</div>
  }

  const staff = user.Staffs[0]

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="My Profile"
        description="Manage your account information and settings"
        gradient="from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      >
        <div className="flex items-center space-x-3">
          <Button size="lg" className="shadow-lg hover:shadow-xl transition-all duration-200" asChild>
            <Link href="/admin/profile/edit">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-all duration-200" asChild>
            <Link href="/admin/profile/change-password">
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </Link>
          </Button>
        </div>
      </AdminPageHeader>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage src={staff?.profile_pic || ''} alt="Profile" />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                  {staff?.first_name?.[0]}{staff?.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              {staff ? `${staff.first_name} ${staff.middle_name || ''} ${staff.last_name}`.trim() : 'N/A'}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-300 flex items-center justify-center">
              <Briefcase className="h-4 w-4 mr-2" />
              {staff?.position || 'N/A'}
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {user.roles ? user.roles.split(',').map(role => (
                <Badge key={role} variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                  {role}
                </Badge>
              )) : (
                <Badge variant="outline">No roles assigned</Badge>
              )}
            </div>
            <Badge variant={user.active ? 'success' : 'destructive'} className="text-sm">
              {user.active ? 'Active Account' : 'Inactive Account'}
            </Badge>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="lg:col-span-2 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-gray-800 dark:to-gray-900/10">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <User className="h-6 w-6 mr-3 text-purple-600" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50/50 dark:bg-gray-700/30">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Email Address</p>
                    <p className="text-gray-900 dark:text-white font-medium">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50/50 dark:bg-gray-700/30">
                  <Phone className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</p>
                    <p className="text-gray-900 dark:text-white font-medium">{staff?.telephone_phone || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50/50 dark:bg-gray-700/30">
                  <Phone className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mobile</p>
                    <p className="text-gray-900 dark:text-white font-medium">{staff?.mobile || 'Not provided'}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50/50 dark:bg-gray-700/30">
                  <User className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Gender</p>
                    <p className="text-gray-900 dark:text-white font-medium">{staff?.gender || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50/50 dark:bg-gray-700/30">
                  <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Address</p>
                    <div className="text-gray-900 dark:text-white font-medium">
                      {staff?.address ? (
                        <>
                          <p>{staff.address}</p>
                          {staff.address_two && <p>{staff.address_two}</p>}
                        </>
                      ) : (
                        'Not provided'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}