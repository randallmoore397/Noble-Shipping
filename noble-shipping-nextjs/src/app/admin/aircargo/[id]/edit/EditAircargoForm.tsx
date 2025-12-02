'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { aircargoSchema, type AircargoFormData } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface EditAircargoFormProps {
    aircargo: any
}

export default function EditAircargoForm({ aircargo }: EditAircargoFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<AircargoFormData>({
        resolver: zodResolver(aircargoSchema),
        defaultValues: {
            tracking_number: aircargo.tracking_number || '',
            cargo_type: aircargo.cargo_type || 'Air Cargo',
            origin: aircargo.origin || '',
            destination: aircargo.destination || '',
            status: aircargo.status || 'Pending',
            current_carrier: aircargo.current_carrier || '',
            estimated_delivery: aircargo.estimated_delivery ? new Date(aircargo.estimated_delivery).toISOString().slice(0, 16) : ''
        }
    })

    const onSubmit = async (data: AircargoFormData) => {
        setIsSubmitting(true)
        console.log('Submitting aircargo data:', data)

        try {
            const response = await fetch(`/api/admin/aircargo/${aircargo.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const result = await response.json()
            console.log('API Response:', result)

            if (response.ok) {
                router.push('/admin/aircargo/list')
            } else {
                console.error('API Error:', result)
                alert(`Error updating aircargo: ${result.error || 'Unknown error'}`)
            }
        } catch (error) {
            console.error('Submit Error:', error)
            alert('Error updating aircargo')
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
                    <Select onValueChange={(value) => setValue('status', value)} defaultValue={aircargo.status}>
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
                    <Label htmlFor="current_carrier">Current Carrier</Label>
                    <Input id="current_carrier" {...register('current_carrier')} />
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
                    {isSubmitting ? 'Updating...' : 'Update Aircargo'}
                </Button>
            </div>
        </form>
    )
}
