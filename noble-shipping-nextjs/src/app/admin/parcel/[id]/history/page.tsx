import Link from 'next/link';
import { db } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ParcelHistoryTable from './ParcelHistoryTable';

export default async function ParcelHistory({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch parcel
  const parcelResults = await db.sql(
    'SELECT * FROM parcel WHERE id = ?',
    Number(id)
  );

  if (!parcelResults || parcelResults.length === 0) {
    notFound();
  }

  // Fetch history
  const historyResults = await db.sql(
    'SELECT * FROM parcel_status_history WHERE parcel_id = ? ORDER BY timestamp DESC',
    Number(id)
  );

  // Combine and serialize
  const parcel = JSON.parse(JSON.stringify({
    ...parcelResults[0],
    ParcelStatusHistory: historyResults || []
  }));

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
              Parcel Tracking History - {parcel.tracking_number}
            </h4>
            <Button variant="outline" asChild>
              <Link href="/admin/parcel/list">
                Back to List
              </Link>
            </Button>
          </div>

          <div className="mb-6">
            <Button asChild>
              <Link href={`/admin/parcel/history/create?parcel_id=${parcel.id}`}>
                Add History Entry
              </Link>
            </Button>
          </div>

          <ParcelHistoryTable parcel={parcel} />
        </CardContent>
      </Card>
    </div>
  );
}