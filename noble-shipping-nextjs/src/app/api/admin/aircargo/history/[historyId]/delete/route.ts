import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ historyId: string }> }
) {
    const params = await props.params;
    try {
        const session = await getServerSession()
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const historyId = parseInt(params.historyId)
        if (isNaN(historyId)) {
            return NextResponse.json(
                { success: false, message: 'Invalid history ID' },
                { status: 400 }
            )
        }

        const existing = await prisma.aircargoStatusHistory.findUnique({
            where: { id: historyId }
        })

        if (!existing) {
            return NextResponse.json(
                { success: false, message: 'History entry not found' },
                { status: 404 }
            )
        }

        await prisma.aircargoStatusHistory.delete({
            where: { id: historyId }
        })

        return NextResponse.json({
            success: true,
            message: 'History entry deleted successfully'
        })
    } catch (error) {
        console.error('History deletion error:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to delete history entry' },
            { status: 500 }
        )
    }
}
