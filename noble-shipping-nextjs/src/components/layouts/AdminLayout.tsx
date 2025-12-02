'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import {
  LayoutDashboard,
  Ship,
  Plane,
  Package,
  Users,
  Bell,
  MessageSquare,
  Search,
  Menu,
  LogOut,
  User,
  Settings,
  ChevronDown,
  ChevronRight,
  Plus,
} from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [notifications, setNotifications] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    containers: pathname.startsWith('/admin/container'),
    aircargo: pathname.startsWith('/admin/aircargo'),
    parcels: pathname.startsWith('/admin/parcel'),
    users: pathname.startsWith('/admin/users'),
    notifications: pathname.startsWith('/admin/quotes') || pathname.startsWith('/admin/messages')
  })
  const { theme, toggleTheme } = useTheme()

  const isActive = (path: string) => pathname.startsWith(path)
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Add admin-layout class to body to prevent Flask CSS from affecting admin pages
  useEffect(() => {
    document.body.classList.add('admin-layout')
    return () => {
      document.body.classList.remove('admin-layout')
    }
  }, [])

  useEffect(() => {
    // Use dummy data only to avoid database connection issues
    setNotifications([{ service: 'Air Freight', email_address: 'demo@example.com' }])
    setMessages([{ first_name: 'Demo', last_name: 'User', message: 'Sample message' }])
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden" 
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b bg-white/90 backdrop-blur-xl dark:bg-gray-900/90 dark:border-gray-700/50 shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="flex items-center space-x-3 lg:hidden">
              <img src="/img/result.png" alt="Noble Shipping" className="h-8 w-8 rounded-lg shadow-lg" />
              <span className="hidden font-bold text-gray-900 dark:text-white sm:inline-block">
                Noble Shipping
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search anything..."
                  className="w-80 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 px-10 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200">
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-medium flex items-center justify-center shadow-lg animate-pulse">
                      {notifications.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((note, idx) => (
                    <DropdownMenuItem key={idx} className="flex flex-col items-start p-4">
                      <div className="font-medium">New Quote Request</div>
                      <div className="text-sm text-muted-foreground">
                        {note.service} - {note.email_address}
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Messages */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200">
                  <MessageSquare className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  {messages.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium flex items-center justify-center shadow-lg animate-pulse">
                      {messages.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Messages</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {messages.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No new messages
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <DropdownMenuItem key={idx} className="flex items-start space-x-3 p-4">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {msg.first_name?.[0]}{msg.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">
                          {msg.first_name} {msg.last_name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {msg.message?.substring(0, 50)}...
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/profile/default.png" alt="Profile" />
                    <AvatarFallback>
                      {session?.user?.staff?.first_name?.[0] || 'A'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session?.user?.staff?.first_name} {session?.user?.staff?.last_name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Administrator
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile/change-password" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 sm:w-72 transform border-r bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out shadow-xl',
          sidebarCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
          {/* Logo Section */}
          <div className="mb-8 px-2">
            <div className="flex items-center space-x-3">
              <img src="/img/result.png" alt="Noble Shipping" className="h-12 w-12 flex-shrink-0" />
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate leading-tight">Noble Shipping</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate -mt-2">Admin Panel</p>
              </div>
            </div>
          </div>

          <nav className="space-y-3">
            {/* Dashboard */}
            <Link
              href="/admin/dashboard"
              className={cn(
                'group flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.02]',
                isActive('/admin/dashboard')
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700/50 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              <LayoutDashboard className={cn('mr-3 h-5 w-5 transition-transform group-hover:scale-110', isActive('/admin/dashboard') ? 'text-white' : 'text-blue-600')} />
              Dashboard
            </Link>

            {/* Container Tracking */}
            <div className="space-y-2">
              <button
                onClick={() => toggleSection('containers')}
                className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <div className="flex items-center">
                  <Ship className="mr-3 h-5 w-5 text-emerald-600" />
                  Container Tracking
                </div>
                <ChevronRight className={cn(
                  'h-4 w-4 text-emerald-600 transition-transform duration-200',
                  expandedSections.containers && 'rotate-90'
                )} />
              </button>
              {expandedSections.containers && (
                <div className="ml-4 space-y-1 border-l-2 border-emerald-200 dark:border-emerald-800 pl-4 animate-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/admin/container/create"
                    className={cn(
                      'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                      isActive('/admin/container/create')
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    )}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Container
                  </Link>
                  <Link
                    href="/admin/container/list"
                    className={cn(
                      'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                      isActive('/admin/container/list')
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    )}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    View Containers
                  </Link>
                </div>
              )}
            </div>

            {/* Aircargo Tracking */}
            <div className="space-y-2">
              <button
                onClick={() => toggleSection('aircargo')}
                className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <div className="flex items-center">
                  <Plane className="mr-3 h-5 w-5 text-blue-600" />
                  Aircargo Tracking
                </div>
                <ChevronRight className={cn(
                  'h-4 w-4 text-blue-600 transition-transform duration-200',
                  expandedSections.aircargo && 'rotate-90'
                )} />
              </button>
              {expandedSections.aircargo && (
                <div className="ml-4 space-y-1 border-l-2 border-blue-200 dark:border-blue-800 pl-4 animate-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/admin/aircargo/create"
                    className={cn(
                      'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                      isActive('/admin/aircargo/create')
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    )}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Aircargo
                  </Link>
                  <Link
                    href="/admin/aircargo/list"
                    className={cn(
                      'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                      isActive('/admin/aircargo/list')
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    )}
                  >
                    <Plane className="mr-2 h-4 w-4" />
                    View Aircargo
                  </Link>
                </div>
              )}
            </div>

            {/* Parcel Tracking */}
            <div className="space-y-2">
              <button
                onClick={() => toggleSection('parcels')}
                className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <div className="flex items-center">
                  <Package className="mr-3 h-5 w-5 text-orange-600" />
                  Parcel Tracking
                </div>
                <ChevronRight className={cn(
                  'h-4 w-4 text-orange-600 transition-transform duration-200',
                  expandedSections.parcels && 'rotate-90'
                )} />
              </button>
              {expandedSections.parcels && (
                <div className="ml-4 space-y-1 border-l-2 border-orange-200 dark:border-orange-800 pl-4 animate-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/admin/parcel/create"
                    className={cn(
                      'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                      isActive('/admin/parcel/create')
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    )}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Parcel
                  </Link>
                  <Link
                    href="/admin/parcel/list"
                    className={cn(
                      'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                      isActive('/admin/parcel/list')
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    )}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    View Parcels
                  </Link>
                </div>
              )}
            </div>

            {/* Account Management */}
            {session?.user?.roles?.includes('Admin') && (
              <div className="space-y-2">
                <button
                  onClick={() => toggleSection('users')}
                  className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <div className="flex items-center">
                    <Users className="mr-3 h-5 w-5 text-purple-600" />
                    Account Management
                  </div>
                  <ChevronRight className={cn(
                    'h-4 w-4 text-purple-600 transition-transform duration-200',
                    expandedSections.users && 'rotate-90'
                  )} />
                </button>
                {expandedSections.users && (
                  <div className="ml-4 space-y-1 border-l-2 border-purple-200 dark:border-purple-800 pl-4 animate-in slide-in-from-top-2 duration-200">
                    <Link
                      href="/admin/users/create"
                      className={cn(
                        'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                        isActive('/admin/users/create')
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      )}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Account
                    </Link>
                    <Link
                      href="/admin/users/list"
                      className={cn(
                        'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                        isActive('/admin/users/list')
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      )}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      All User Accounts
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Notifications */}
            <div className="space-y-2">
              <button
                onClick={() => toggleSection('notifications')}
                className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <div className="flex items-center">
                  <Bell className="mr-3 h-5 w-5 text-indigo-600" />
                  Notifications
                  {(notifications.length > 0 || messages.length > 0) && (
                    <span className="ml-2 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                  )}
                </div>
                <ChevronRight className={cn(
                  'h-4 w-4 text-indigo-600 transition-transform duration-200',
                  expandedSections.notifications && 'rotate-90'
                )} />
              </button>
              {expandedSections.notifications && (
                <div className="ml-4 space-y-1 border-l-2 border-indigo-200 dark:border-indigo-800 pl-4 animate-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/admin/quotes"
                    className={cn(
                      'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                      isActive('/admin/quotes')
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    )}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Request Quotes
                    {notifications.length > 0 && (
                      <span className="ml-auto rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
                        {notifications.length}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/admin/messages"
                    className={cn(
                      'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                      isActive('/admin/messages')
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    )}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Messages
                    {messages.length > 0 && (
                      <span className="ml-auto rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
                        {messages.length}
                      </span>
                    )}
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800 dark:to-gray-700/50">
              <div className="flex items-center space-x-3">
                <img src="/img/result.png" alt="Noble Shipping" className="h-8 w-8 rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {session?.user?.staff?.first_name} {session?.user?.staff?.last_name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 xl:pl-72 pt-16 min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/10">
        <div className="px-4 py-6 lg:px-6 max-w-7xl mx-auto">
          {children}
        </div>
        
        {/* Footer */}
        <footer className="admin-footer mt-auto border-t bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Noble Shipping Company. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                <span>Version 2.0</span>
                <span>•</span>
                <span>Admin Panel</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}