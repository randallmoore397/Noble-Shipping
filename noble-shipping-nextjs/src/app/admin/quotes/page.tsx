import { prisma } from '@/lib/prisma'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { FileText } from 'lucide-react'
import QuotesTable from './QuotesTable'

interface Quote {
  id: number
  service: string
  from_country: string
  to_country: string
  weight: string
  dimensions: string
  email_address: string
  timestamp: string
}

export default async function QuotesPage() {
  const quotes = await prisma.requestQuote.findMany({
    orderBy: { timestamp: 'desc' },
    take: 100
  })

  const quotesData: Quote[] = quotes.map((quote, index) => ({
    id: index + 1,
    service: quote.service,
    from_country: quote.from_country,
    to_country: quote.to_country,
    weight: quote.weight,
    dimensions: `${quote.length} x ${quote.height}`,
    email_address: quote.email_address,
    timestamp: new Date(quote.timestamp).toLocaleDateString()
  }))



  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Quote Requests"
        description="Customer shipping quote requests and inquiries"
        gradient="from-red-600 via-red-500 to-red-700 dark:from-red-800 dark:via-red-700 dark:to-red-900"
      />

      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50/30 dark:from-gray-800 dark:to-green-900/10">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <FileText className="h-6 w-6 text-green-600 mr-3" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Request Quotes</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {quotesData.length} quote requests
              </p>
            </div>
          </div>
          <QuotesTable data={quotesData} />
        </CardContent>
      </Card>
    </div>
  )
}