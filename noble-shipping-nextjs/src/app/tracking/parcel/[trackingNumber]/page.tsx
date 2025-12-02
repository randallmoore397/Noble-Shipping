import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import TrackingResult from '@/components/tracking/TrackingResult'

export default async function ParcelTrackingPage(props: { params: Promise<{ trackingNumber: string }> }) {
  const params = await props.params
  const { trackingNumber } = params

  const results = await db.sql('SELECT * FROM parcel WHERE tracking_number = ?', trackingNumber)
  const parcel = results[0]

  if (!parcel) {
    notFound()
  }

  const history = await db.sql(
    'SELECT * FROM parcel_status_history WHERE parcel_id = ? ORDER BY timestamp DESC',
    parcel.id
  )

  const data = {
    ...parcel,
    history: history
  }

  // Serialize for client component
  const serializedData = JSON.parse(JSON.stringify(data))

  return <TrackingResult type="parcel" data={serializedData} />
}