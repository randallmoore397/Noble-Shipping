import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import TrackingResult from '@/components/tracking/TrackingResult'

export default async function AircargoTrackingPage(props: { params: Promise<{ trackingNumber: string }> }) {
  const params = await props.params
  const { trackingNumber } = params

  const results = await db.sql('SELECT * FROM aircargo WHERE tracking_number = ?', trackingNumber)
  const aircargo = results[0]

  if (!aircargo) {
    notFound()
  }

  const history = await db.sql(
    'SELECT * FROM aircargo_status_history WHERE aircargo_id = ? ORDER BY timestamp DESC',
    aircargo.id
  )

  const data = {
    ...aircargo,
    history: history
  }

  // Serialize for client component
  const serializedData = JSON.parse(JSON.stringify(data))

  return <TrackingResult type="aircargo" data={serializedData} />
}