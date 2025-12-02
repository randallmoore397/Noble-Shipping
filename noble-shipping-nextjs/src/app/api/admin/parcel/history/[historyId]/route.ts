import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ historyId: string }> }
) {
  const params = await props.params
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const historyId = parseInt(params.historyId)
    
    const history = await prisma.parcelStatusHistory.findUnique({
      where: { id: historyId }
    })

    if (!history) {
      return NextResponse.json({ error: 'History entry not found' }, { status: 404 })
    }

    return NextResponse.json(history)
  } catch (error) {
    console.error('Error fetching parcel history:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ historyId: string }> }
) {
  const params = await props.params
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const historyId = parseInt(params.historyId)
    
    const history = await prisma.parcelStatusHistory.update({
      where: { id: historyId },
      data: {
        status: data.status,
        location: data.location,
        timestamp: new Date(data.timestamp)
      }
    })

    return NextResponse.json(history)
  } catch (error) {
    console.error('Error updating parcel history:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}