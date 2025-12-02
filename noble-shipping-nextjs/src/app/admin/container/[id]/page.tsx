import Link from 'next/link';
import { db } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function ContainerDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const results = await db.sql(
    'SELECT * FROM cargo WHERE id = ?',
    Number(id)
  );

  if (!results || results.length === 0) {
    notFound();
  }

  // Serialize to plain object
  const container = JSON.parse(JSON.stringify(results[0]));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Container Details - {container.tracking_number}</h1>
          <div className="flex space-x-3">
            <Link
              href={`/admin/container/${container.id}/history`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              View History
            </Link>
            <Link
              href="/admin/container/list"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Back to List
            </Link>
          </div>
        </div>
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="font-medium text-gray-900">Origin:</span>
                <span className="ml-2 text-gray-600">{container.origin}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Destination:</span>
                <span className="ml-2 text-gray-600">{container.destination}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Status:</span>
                <span className="ml-2 text-gray-600">{container.status}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="font-medium text-gray-900">Current Location:</span>
                <span className="ml-2 text-gray-600">{container.last_location || 'N/A'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Estimated Delivery:</span>
                <span className="ml-2 text-gray-600">{new Date(container.estimated_delivery).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}