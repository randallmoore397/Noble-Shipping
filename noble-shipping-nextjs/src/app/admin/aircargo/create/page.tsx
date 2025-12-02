'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plane } from 'lucide-react'

interface AircargoFormData {
  tracking_number: string
  origin: string
  destination: string
  status: string
  last_location?: string
  estimated_delivery: string
  current_carrier?: string
  weight?: string
  dimensions?: string
  contents_description?: string
  value?: string
  insurance?: string
  sender_name?: string
  sender_contact?: string
  receiver_name?: string
  receiver_contact?: string
  airway_bill_number?: string
  departure_date?: string
  arrival_date?: string
}

export default function CreateAircargo() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit } = useForm<AircargoFormData>({
    defaultValues: {
      tracking_number: `AIR${Date.now()}`,
      status: 'In Transit',
      insurance: 'No Insurance',
      airway_bill_number: `AWB${Date.now()}`
    }
  })

  const onSubmit = async (data: AircargoFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/admin/aircargo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        router.push('/admin/aircargo/list')
      } else {
        alert('Error creating aircargo')
      }
    } catch (error) {
      alert('Error creating aircargo')
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
          <h1 className="text-3xl font-bold text-white mb-2">Create Aircargo Tracking</h1>
          <p className="text-white">Add a new aircargo shipment to the tracking system</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/15 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <Card className="w-full max-w-4xl shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/10">
        <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tracking Number</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" {...register('tracking_number')} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Airway Bill Number</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" {...register('airway_bill_number')} />
            </div>
          </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Origin</label>
                      <input type="text" className="form-control" {...register('origin')} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Destination</label>
                      <input type="text" className="form-control" {...register('destination')} required />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Status</label>
                      <select className="form-control" {...register('status')}>
                        <option value="Pending">Pending</option>
                        <option value="Collected">Collected</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Held at Customs">Held at Customs</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Awaiting Pickup">Awaiting Pickup</option>
                        <option value="Delayed">Delayed</option>
                        <option value="Returned to Sender">Returned to Sender</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Current Location</label>
                      <input type="text" className="form-control" {...register('last_location')} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Departure Date</label>
                      <input type="datetime-local" className="form-control" {...register('departure_date')} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Arrival Date</label>
                      <input type="datetime-local" className="form-control" {...register('arrival_date')} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Sender Name</label>
                      <input type="text" className="form-control" {...register('sender_name')} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Sender Contact</label>
                      <input type="text" className="form-control" {...register('sender_contact')} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Receiver Name</label>
                      <input type="text" className="form-control" {...register('receiver_name')} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Receiver Contact</label>
                      <input type="text" className="form-control" {...register('receiver_contact')} />
                    </div>
                  </div>
                </div>

            <div className="flex items-center space-x-4 pt-6">
              <Button type="submit" disabled={isSubmitting} size="lg" className="shadow-lg hover:shadow-xl transition-all duration-200">
                <Plane className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Creating...' : 'Create Aircargo'}
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