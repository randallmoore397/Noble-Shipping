'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react'

export default function BudgetChart() {
  const budgetItems = [
    { category: 'Sales', allocated: 4200, actual: 5000, trend: 'up' },
    { category: 'Administration', allocated: 3000, actual: 2800, trend: 'down' },
    { category: 'IT', allocated: 20000, actual: 18500, trend: 'down' },
    { category: 'Support', allocated: 35000, actual: 38000, trend: 'up' },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">
          Budget Report
          <span className="text-sm text-muted-foreground ml-1">| This Month</span>
        </CardTitle>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {budgetItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">{item.category}</p>
                <p className="text-sm text-muted-foreground">
                  ${item.allocated.toLocaleString()} allocated
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">${item.actual.toLocaleString()}</span>
                {item.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-red-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-green-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}