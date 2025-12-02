'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface HistoryFormData {
  status: string;
  location: string;
  timestamp: string;
}

export default function CreateParcelHistory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const parcelId = searchParams.get('parcel_id');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit } = useForm<HistoryFormData>({
    defaultValues: {
      status: 'In Transit',
      timestamp: new Date().toISOString().slice(0, 16)
    }
  });

  const onSubmit = async (data: HistoryFormData) => {
    if (!parcelId || isNaN(Number(parcelId))) {
      alert('Invalid parcel ID');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/parcel/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          parcel_id: Number(parcelId)
        })
      });

      if (response.ok) {
        alert('History entry created successfully');
        router.push(`/admin/parcel/${parcelId}/history`);
      } else {
        alert('Error creating history entry');
      }
    } catch (error) {
      alert('Error creating history entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Add Parcel History Entry
          </h4>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">Status</label>
              <select
                id="status"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('status')}
              >
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delayed">Delayed</option>
                <option value="Returned to Sender">Returned to Sender</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">Location</label>
              <Input id="location" {...register('location')} />
            </div>

            <div className="space-y-2">
              <label htmlFor="timestamp" className="text-sm font-medium">Timestamp</label>
              <Input id="timestamp" type="datetime-local" {...register('timestamp')} />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create History Entry'}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}