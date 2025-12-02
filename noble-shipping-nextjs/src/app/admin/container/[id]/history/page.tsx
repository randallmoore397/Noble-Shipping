import Link from 'next/link';
import { db } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ContainerHistoryTable from './ContainerHistoryTable';

export default async function ContainerHistory({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch cargo
  const cargoResults = await db.sql(
    'SELECT * FROM cargo WHERE id = ?',
    Number(id)
  );

  if (!cargoResults || cargoResults.length === 0) {
    notFound();
  }

  // Fetch history
  const historyResults = await db.sql(
    'SELECT * FROM cargo_status_history WHERE cargo_id = ? ORDER BY timestamp DESC',
    Number(id)
  );

  // Combine and serialize
  const cargo = JSON.parse(JSON.stringify({
    ...cargoResults[0],
    CargoStatusHistory: historyResults || []
  }));

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
              Container Tracking History - {cargo.tracking_number}
            </h4>
            <Button variant="outline" asChild>
              <Link href="/admin/container/list">
                Back to List
              </Link>
            </Button>
          </div>

          <div className="mb-6">
            <Button asChild>
              <Link href={`/admin/container/history/create?cargo_id=${cargo.id}`}>
                Add History Entry
              </Link>
            </Button>
          </div>

          <ContainerHistoryTable cargo={cargo} />
        </CardContent>
      </Card>
    </div>
  )
}