'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface HistoryFormData {
  aircargo_id: number;
  status: string;
  location: string;
  current_carrier?: string;
  timestamp: string;
}

export default function CreateAircargoHistory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const aircargoId = searchParams.get('aircargo_id');

  const { register, handleSubmit } = useForm<HistoryFormData>({
    defaultValues: {
      aircargo_id: aircargoId ? parseInt(aircargoId) : 0,
      timestamp: new Date().toISOString().slice(0, 16)
    }
  });

  const onSubmit = async (data: HistoryFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/aircargo/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        router.push(`/admin/aircargo/${aircargoId}/history`);
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
            Add Aircargo History Entry
          </h4>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <input type="hidden" {...register('aircargo_id')} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">Status</label>
                <select 
                  id="status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  {...register('status')} 
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Collected">Collected</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">Location</label>
                <Input id="location" {...register('location')} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="current_carrier" className="text-sm font-medium">Current Carrier</label>
                <Input id="current_carrier" {...register('current_carrier')} />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="timestamp" className="text-sm font-medium">Timestamp</label>
                <Input id="timestamp" type="datetime-local" {...register('timestamp')} required />
              </div>
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