import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import TrackingResult from '@/components/tracking/TrackingResult'

export default async function ContainerTrackingPage(props: { params: Promise<{ trackingNumber: string }> }) {
  const params = await props.params
  const { trackingNumber } = params

  const results = await db.sql('SELECT * FROM cargo WHERE tracking_number = ?', trackingNumber)
  const container = results[0]

  if (!container) {
    notFound()
  }

  const history = await db.sql(
    'SELECT * FROM cargo_status_history WHERE cargo_id = ? ORDER BY timestamp DESC',
    container.id
  )

  const data = {
    ...container,
    history: history
  }

  // Serialize for client component
  const serializedData = JSON.parse(JSON.stringify(data))

  return <TrackingResult type="container" data={serializedData} />
}