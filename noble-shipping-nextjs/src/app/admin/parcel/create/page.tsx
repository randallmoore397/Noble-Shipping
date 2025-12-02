'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package } from 'lucide-react'

interface ParcelFormData {
  tracking_number: string
  sender_name: string
  sender_address: string
  recipient_name: string
  recipient_address: string
  weight: number
  dimensions?: string
  contents_description?: string
  value?: number
  status: string
  current_location?: string
  estimated_delivery?: string
}

export default function CreateParcel() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit } = useForm<ParcelFormData>({
    defaultValues: {
      tracking_number: `PCL${Date.now()}`,
      status: 'In Transit'
    }
  })

  const onSubmit = async (data: ParcelFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/admin/parcel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        router.push('/admin/parcel/list')
      } else {
        alert('Error creating parcel')
      }
    } catch (error) {
      alert('Error creating parcel')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 via-red-500 to-red-700 dark:from-red-800 dark:via-red-700 dark:to-red-900 p-8 border border-gray-200/50 dark:border-gray-700/50">
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
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Create Parcel Tracking</h1>
          <p className="text-white">Add a new parcel to the tracking system</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/15 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <Card className="w-full max-w-4xl shadow-lg border-0 bg-gradient-to-br from-white to-orange-50/30 dark:from-gray-800 dark:to-orange-900/10">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Tracking Number</label>
                      <input type="text" className="form-control" {...register('tracking_number')} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Status</label>
                      <select className="form-control" {...register('status')}>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Pending">Pending</option>
                        <option value="Delayed">Delayed</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Sender Name</label>
                      <input type="text" className="form-control" {...register('sender_name')} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Recipient Name</label>
                      <input type="text" className="form-control" {...register('recipient_name')} required />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Sender Address</label>
                      <textarea className="form-control" {...register('sender_address')} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Recipient Address</label>
                      <textarea className="form-control" {...register('recipient_address')} required />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>Weight (kg)</label>
                      <input type="number" step="0.1" className="form-control" {...register('weight', { valueAsNumber: true })} required />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>Dimensions</label>
                      <input type="text" className="form-control" {...register('dimensions')} placeholder="L x W x H" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>Value ($)</label>
                      <input type="number" step="0.01" className="form-control" {...register('value', { valueAsNumber: true })} />
                    </div>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label>Contents Description</label>
                  <textarea className="form-control" rows={3} {...register('contents_description')} />
                </div>

            <div className="flex items-center space-x-4 pt-6">
              <Button type="submit" disabled={isSubmitting} size="lg" className="shadow-lg hover:shadow-xl transition-all duration-200">
                <Package className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Creating...' : 'Create Parcel'}
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}