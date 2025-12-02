import Link from 'next/link';
import { db } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function AircargoDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const results = await db.sql(
    'SELECT * FROM aircargo WHERE id = ?',
    Number(id)
  );

  if (!results || results.length === 0) {
    notFound();
  }

  // Serialize to plain object
  const aircargo = JSON.parse(JSON.stringify(results[0]));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Aircargo Details - {aircargo.tracking_number}</h4>
              <div>
                <Link href={`/admin/aircargo/${aircargo.id}/history`} className="btn btn-info me-2">
                  View History
                </Link>
                <Link href="/admin/aircargo/list" className="btn btn-secondary">
                  Back to List
                </Link>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Origin:</strong> {aircargo.origin}</p>
                  <p><strong>Destination:</strong> {aircargo.destination}</p>
                  <p><strong>Status:</strong> {aircargo.status}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Current Location:</strong> {aircargo.last_location || 'N/A'}</p>
                  <p><strong>Estimated Delivery:</strong> {new Date(aircargo.estimated_delivery).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}