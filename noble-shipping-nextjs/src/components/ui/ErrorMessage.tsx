import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ErrorMessageProps {
  title: string
  message: string
  retry?: () => void
}

export default function ErrorMessage({ title, message, retry }: ErrorMessageProps) {
  return (
    <Card className="shadow-lg border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
              {title}
            </h3>
            <p className="text-red-700 dark:text-red-200 mt-1">
              {message}
            </p>
            {retry && (
              <Button 
                onClick={retry} 
                variant="outline" 
                className="mt-4 border-red-300 text-red-700 hover:bg-red-100 dark:border-red-600 dark:text-red-300 dark:hover:bg-red-800"
              >
                Try Again
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}