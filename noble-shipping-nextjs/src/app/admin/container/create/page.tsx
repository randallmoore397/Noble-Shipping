'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { FormSection, FormField } from '@/components/admin/FormSection'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { showSuccess, showError } from '@/components/ui/Toast'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Ship } from 'lucide-react'

const containerSchema = z.object({
  tracking_number: z.string().min(1, 'Tracking number is required'),
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
  status: z.string().min(1, 'Status is required'),
  last_location: z.string().optional(),
  estimated_delivery: z.string().min(1, 'Estimated delivery is required'),
  current_carrier: z.string().optional(),
  weight: z.string().optional(),
  dimensions: z.string().optional(),
  contents_description: z.string().optional(),
  value: z.string().optional(),
  insurance: z.string().optional(),
})

type ContainerFormData = z.infer<typeof containerSchema>

export default function CreateContainer() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ContainerFormData>({
    resolver: zodResolver(containerSchema),
    defaultValues: {
      tracking_number: `CNT${Date.now()}`,
      status: 'In Transit',
      insurance: 'No Insurance'
    }
  })

  const onSubmit = async (data: ContainerFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/admin/container', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        showSuccess('Container created successfully')
        router.push('/admin/container/list')
      } else {
        showError('Error creating container')
      }
    } catch (error) {
      showError('Error creating container')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Create Container Tracking"
        description="Add a new container shipment to the tracking system"
        gradient="from-red-600 via-red-500 to-red-700 dark:from-red-800 dark:via-red-700 dark:to-red-900"
      >
        <Button variant="outline" className="shadow-lg hover:shadow-xl transition-all duration-200 bg-red-800 text-white border-red-700 hover:bg-red-900" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </AdminPageHeader>

      <Card className="w-full max-w-4xl shadow-lg border-0 bg-gradient-to-br from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/10">
        <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormSection title="Basic Information" description="Container identification and routing details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Tracking Number" required error={errors.tracking_number?.message}>
              <Input {...register('tracking_number')} />
            </FormField>
            <FormField label="Status" required error={errors.status?.message}>
              <Select onValueChange={(value) => setValue('status', value)} defaultValue="In Transit">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Collected">Collected</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Held at Customs">Held at Customs</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Awaiting Pickup">Awaiting Pickup</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                  <SelectItem value="Returned to Sender">Returned to Sender</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Origin" required error={errors.origin?.message}>
              <Input {...register('origin')} placeholder="Port of origin" />
            </FormField>
            <FormField label="Destination" required error={errors.destination?.message}>
              <Input {...register('destination')} placeholder="Destination port" />
            </FormField>
          </div>
        </FormSection>

        <FormSection title="Location & Carrier" description="Current location and carrier information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Current Location" error={errors.last_location?.message}>
              <Input {...register('last_location')} placeholder="Current location" />
            </FormField>
            <FormField label="Current Carrier" error={errors.current_carrier?.message}>
              <Input {...register('current_carrier')} placeholder="Shipping line" />
            </FormField>
          </div>
        </FormSection>

        <FormSection title="Container Details" description="Physical specifications and delivery information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Weight" error={errors.weight?.message}>
              <Input {...register('weight')} placeholder="e.g., 25,000 kg" />
            </FormField>
            <FormField label="Dimensions" error={errors.dimensions?.message}>
              <Input {...register('dimensions')} placeholder="e.g., 40ft x 8ft x 8.5ft" />
            </FormField>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Estimated Delivery" required error={errors.estimated_delivery?.message}>
              <Input type="datetime-local" {...register('estimated_delivery')} />
            </FormField>
            <FormField label="Value" error={errors.value?.message}>
              <Input {...register('value')} placeholder="e.g., $50,000" />
            </FormField>
          </div>
          
          <FormField label="Insurance" error={errors.insurance?.message}>
            <Select onValueChange={(value) => setValue('insurance', value)} defaultValue="No Insurance">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No Insurance">No Insurance</SelectItem>
                <SelectItem value="Insured">Insured</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Contents Description" error={errors.contents_description?.message}>
            <Textarea {...register('contents_description')} rows={3} placeholder="Describe the container contents..." />
          </FormField>
        </FormSection>

            <div className="flex items-center space-x-4 pt-6">
              <Button type="submit" disabled={isSubmitting} size="lg" className="shadow-lg hover:shadow-xl transition-all duration-200">
                <Ship className="mr-2 h-5 w-5" />
                {isSubmitting ? 'Creating...' : 'Create Container'}
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