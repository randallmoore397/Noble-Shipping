import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
    label: string
  }
  className?: string
  gradient?: string
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  className,
  gradient = 'from-blue-500 to-blue-600',
}: StatsCardProps) {
  return (
    <Card className={cn('relative overflow-hidden group', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">{title}</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {trend && (
              <div className="flex items-center space-x-2">
                <Badge
                  variant={trend.isPositive ? 'success' : 'destructive'}
                  className="text-xs font-medium px-2 py-1 rounded-full"
                >
                  {trend.isPositive ? (
                    <TrendingUp className="mr-1 h-3 w-3" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3" />
                  )}
                  {trend.value}%
                </Badge>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {trend.label}
                </span>
              </div>
            )}
          </div>
          <div className="relative">
            <div
              className={cn(
                'flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110',
                gradient
              )}
            >
              <Icon className="h-8 w-8" />
            </div>
            <div className={cn(
              'absolute inset-0 rounded-2xl bg-gradient-to-br opacity-20 blur-xl transition-all duration-300 group-hover:opacity-40',
              gradient
            )}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}