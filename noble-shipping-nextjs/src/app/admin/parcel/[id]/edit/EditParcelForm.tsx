'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { parcelSchema, type ParcelFormData } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface EditParcelFormProps {
    parcel: any
}

export default function EditParcelForm({ parcel }: EditParcelFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ParcelFormData>({
        resolver: zodResolver(parcelSchema),
        defaultValues: {
            tracking_number: parcel.tracking_number || '',
            status: parcel.status || 'Pending',
            sender_name: parcel.sender_name || '',
            recipient_name: parcel.recipient_name || '',
            weight: parcel.weight || '',
            service_type: parcel.service_type || 'Standard',
            estimated_delivery_date: parcel.estimated_delivery_date ? new Date(parcel.estimated_delivery_date).toISOString().slice(0, 16) : '',
            shipping_cost: parcel.shipping_cost || ''
        }
    })

    const onSubmit = async (data: ParcelFormData) => {
        setIsSubmitting(true)
        try {
            const response = await fetch(`/api/admin/parcel/${parcel.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                router.push('/admin/parcel/list')
            } else {
                alert('Error updating parcel')
            }
        } catch (error) {
            alert('Error updating parcel')
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
                    <Select onValueChange={(value) => setValue('status', value)} defaultValue={parcel.status}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Collected">Collected</SelectItem>
                            <SelectItem value="In Transit">In Transit</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="sender_name">Sender Name</Label>
                    <Input id="sender_name" {...register('sender_name')} />
                    {errors.sender_name && (
                        <p className="text-sm text-red-600">{errors.sender_name.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="recipient_name">Recipient Name</Label>
                    <Input id="recipient_name" {...register('recipient_name')} />
                    {errors.recipient_name && (
                        <p className="text-sm text-red-600">{errors.recipient_name.message}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                        id="weight"
                        type="number"
                        step="0.01"
                        {...register('weight')}
                    />
                    {errors.weight && (
                        <p className="text-sm text-red-600">{errors.weight.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="service_type">Service Type</Label>
                    <Select onValueChange={(value) => setValue('service_type', value)} defaultValue={parcel.service_type}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Standard">Standard</SelectItem>
                            <SelectItem value="Express">Express</SelectItem>
                            <SelectItem value="Overnight">Overnight</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="estimated_delivery_date">Estimated Delivery</Label>
                    <Input
                        id="estimated_delivery_date"
                        type="datetime-local"
                        {...register('estimated_delivery_date')}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="shipping_cost">Shipping Cost</Label>
                    <Input
                        id="shipping_cost"
                        type="number"
                        step="0.01"
                        {...register('shipping_cost')}
                    />
                </div>
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
                    {isSubmitting ? 'Updating...' : 'Update Parcel'}
                </Button>
            </div>
        </form>
    )
}
