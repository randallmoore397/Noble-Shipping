import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ historyId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { historyId } = await params
    const id = parseInt(historyId)
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid history ID' }, { status: 400 })
    }

    const existing = await prisma.parcelStatusHistory.findUnique({
      where: { id }
    })

    if (!existing) {
      return NextResponse.json({ error: 'History entry not found' }, { status: 404 })
    }

    await prisma.parcelStatusHistory.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'History entry deleted successfully' })
  } catch (error) {
    console.error('Error deleting parcel history:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}