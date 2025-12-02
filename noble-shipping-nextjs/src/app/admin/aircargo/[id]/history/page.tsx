import Link from 'next/link';
import { db } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AircargoHistoryTable from './AircargoHistoryTable';

export default async function AircargoHistory({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch aircargo
  const aircargoResults = await db.sql(
    'SELECT * FROM aircargo WHERE id = ?',
    Number(id)
  );

  if (!aircargoResults || aircargoResults.length === 0) {
    notFound();
  }

  // Fetch history
  const historyResults = await db.sql(
    'SELECT * FROM aircargo_status_history WHERE aircargo_id = ? ORDER BY timestamp DESC',
    Number(id)
  );

  // Combine and serialize
  const aircargo = JSON.parse(JSON.stringify({
    ...aircargoResults[0],
    AircargoStatusHistory: historyResults || []
  }));

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
              Aircargo Tracking History - {aircargo.tracking_number}
            </h4>
            <Button variant="outline" asChild>
              <Link href="/admin/aircargo/list">
                Back to List
              </Link>
            </Button>
          </div>

          <div className="mb-6">
            <Button asChild>
              <Link href={`/admin/aircargo/history/create?aircargo_id=${aircargo.id}`}>
                Add History Entry
              </Link>
            </Button>
          </div>

          <AircargoHistoryTable aircargo={aircargo} />
        </CardContent>
      </Card>
    </div>
  )
}