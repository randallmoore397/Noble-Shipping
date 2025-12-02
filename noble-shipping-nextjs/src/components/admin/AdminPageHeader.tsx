import * as React from 'react'
import { cn } from '@/lib/utils'

interface AdminPageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
  gradient?: string
  className?: string
}

export function AdminPageHeader({ 
  title, 
  description, 
  children, 
  gradient = 'from-red-600 via-red-500 to-red-700 dark:from-red-800 dark:via-red-700 dark:to-red-900',
  className 
}: AdminPageHeaderProps) {
  return (
    <div className={cn(
      'relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 border border-gray-200/50 dark:border-gray-700/50 mb-8',
      `bg-gradient-to-br ${gradient}`,
      className
    )}>
      <div className="relative z-10 flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-white">
              {description}
            </p>
          )}
        </div>
        {children && (
          <div className="flex items-center space-x-3">
            {children}
          </div>
        )}
      </div>
      {/* Modern Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="modernPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="white" opacity="0.3"/>
              <rect x="0" y="0" width="20" height="20" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#modernPattern)"/>
        </svg>
      </div>
      
      {/* Geometric Shapes */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-lg rotate-12"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/15 rounded-full"></div>
      <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-white/10 rotate-45"></div>
      
      {/* Gradient Overlays */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/15 to-transparent rounded-full blur-3xl"></div>
    </div>
  )
}