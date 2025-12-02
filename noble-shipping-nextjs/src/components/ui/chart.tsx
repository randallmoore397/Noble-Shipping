'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface ChartCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export function ChartCard({ title, subtitle, children, className }: ChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">
          {title}
          {subtitle && <span className="text-sm text-muted-foreground ml-1">| {subtitle}</span>}
        </CardTitle>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

interface LineChartCardProps extends ChartCardProps {
  data: any[]
  dataKey: string
  xAxisKey: string
  color?: string
}

export function LineChartCard({ data, dataKey, xAxisKey, color = '#8884d8', ...props }: LineChartCardProps) {
  return (
    <ChartCard {...props}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

interface AreaChartCardProps extends ChartCardProps {
  data: any[]
  dataKey: string
  xAxisKey: string
  color?: string
}

export function AreaChartCard({ data, dataKey, xAxisKey, color = '#8884d8', ...props }: AreaChartCardProps) {
  return (
    <ChartCard {...props}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey={dataKey} stroke={color} fill={color} fillOpacity={0.6} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

interface DonutChartCardProps extends ChartCardProps {
  data: any[]
  dataKey: string
  nameKey: string
  colors?: string[]
}

export function DonutChartCard({ 
  data, 
  dataKey, 
  nameKey, 
  colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'],
  ...props 
}: DonutChartCardProps) {
  return (
    <ChartCard {...props}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey={dataKey}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}