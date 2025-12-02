import Link from 'next/link';
import { db } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function ParcelDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const results = await db.sql(
    'SELECT * FROM parcel WHERE id = ?',
    Number(id)
  );

  if (!results || results.length === 0) {
    notFound();
  }

  // Serialize to plain object
  const parcel = JSON.parse(JSON.stringify(results[0]));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Parcel Details - {parcel.tracking_number}</h4>
              <div>
                <Link href={`/admin/parcel/${parcel.id}/history`} className="btn btn-info me-2">
                  View History
                </Link>
                <Link href="/admin/parcel/list" className="btn btn-secondary">
                  Back to List
                </Link>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Sender:</strong> {parcel.sender_name}</p>
                  <p><strong>Recipient:</strong> {parcel.recipient_name}</p>
                  <p><strong>Status:</strong> {parcel.status}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Weight:</strong> {parcel.weight}kg</p>
                  <p><strong>Current Location:</strong> {parcel.current_location || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}