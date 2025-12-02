'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface HistoryFormData {
  status: string;
  location: string;
  timestamp: string;
}

export default function EditParcelHistory({ params }: { params: Promise<{ historyId: string }> }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [parcelId, setParcelId] = useState<number | null>(null);
  const [historyId, setHistoryId] = useState<string>();

  const { register, handleSubmit, setValue } = useForm<HistoryFormData>();

  useEffect(() => {
    params.then(({ historyId }) => {
      setHistoryId(historyId);
      fetch(`/api/admin/parcel/history/${historyId}`)
      .then(res => {
        if (!res.ok) {
          alert('Error loading history entry');
          router.back();
          return;
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setValue('status', data.status || '');
          setValue('location', data.location || '');
          setValue('timestamp', data.timestamp ? new Date(data.timestamp).toISOString().slice(0, 16) : '');
          setParcelId(data.parcel_id);
        }
        setLoading(false);
      })
      .catch(() => {
        alert('Error loading history entry');
        setLoading(false);
      });
    });
  }, [params, setValue, router]);

  const onSubmit = async (data: HistoryFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/admin/parcel/history/${historyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('History updated successfully');
        if (parcelId) {
          router.push(`/admin/parcel/${parcelId}/history`);
        } else {
          router.back();
        }
      } else {
        alert('Error updating history');
      }
    } catch (error) {
      alert('Error updating history');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Edit Parcel History
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
                {isSubmitting ? 'Updating...' : 'Update History'}
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