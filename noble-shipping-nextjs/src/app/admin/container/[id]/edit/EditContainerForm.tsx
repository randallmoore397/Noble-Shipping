'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { containerSchema, type ContainerFormData } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface EditContainerFormProps {
  container: any
}

export default function EditContainerForm({ container }: EditContainerFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ContainerFormData>({
    resolver: zodResolver(containerSchema),
    defaultValues: {
      tracking_number: container.tracking_number || '',
      cargo_type: container.cargo_type || 'Container',
      origin: container.origin || '',
      destination: container.destination || '',
      status: container.status || 'Pending',
      last_location: container.last_location || '',
      current_carrier: container.current_carrier || '',
      weight: container.weight || '',
      dimensions: container.dimensions || '',
      contents_description: container.contents_description || '',
      value: container.value || '',
      insurance: container.insurance || '',
      estimated_delivery: container.estimated_delivery ? new Date(container.estimated_delivery).toISOString().slice(0, 16) : ''
    }
  })

  const onSubmit = async (data: ContainerFormData) => {
    setIsSubmitting(true)

    // Log for debugging
    console.log('Submitting data:', data)

    try {
      const response = await fetch(`/api/admin/container/${container.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      console.log('API Response:', result)

      if (response.ok) {
        router.push('/admin/container/list')
      } else {
        console.error('API Error:', result)
        alert(`Error updating container: ${result.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Submit Error:', error)
      alert('Error updating container')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="tracking_number">Tracking Number</Label>
          <Input
            id="tracking_number"
            {...register('tracking_number')}
            readOnly
            className="bg-gray-50"
          />
          {errors.tracking_number && (
            <p className="text-sm text-red-600">{errors.tracking_number.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select onValueChange={(value) => setValue('status', value)} defaultValue={container.status}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="origin">Origin</Label>
          <Input id="origin" {...register('origin')} />
          {errors.origin && (
            <p className="text-sm text-red-600">{errors.origin.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Input id="destination" {...register('destination')} />
          {errors.destination && (
            <p className="text-sm text-red-600">{errors.destination.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="last_location">Current Location</Label>
          <Input id="last_location" {...register('last_location')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="current_carrier">Current Carrier</Label>
          <Input id="current_carrier" {...register('current_carrier')} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="weight">Weight</Label>
          <Input id="weight" {...register('weight')} placeholder="e.g., 25000 kg" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimated_delivery">Estimated Delivery</Label>
          <Input
            id="estimated_delivery"
            type="datetime-local"
            {...register('estimated_delivery')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="dimensions">Dimensions</Label>
          <Input id="dimensions" {...register('dimensions')} placeholder="e.g., 40ft x 8ft x 8ft" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="value">Value</Label>
          <Input id="value" {...register('value')} placeholder="e.g., $150000" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contents_description">Contents Description</Label>
        <Textarea
          id="contents_description"
          {...register('contents_description')}
          rows={3}
          placeholder="Describe the contents of this container..."
        />
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? 'Updating...' : 'Update Container'}
        </Button>
      </div>
    </form>
  )
}