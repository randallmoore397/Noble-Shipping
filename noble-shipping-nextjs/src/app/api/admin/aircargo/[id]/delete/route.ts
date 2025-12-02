import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        // Check authentication
        const session = await getServerSession()
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const id = parseInt(params.id)
        if (isNaN(id)) {
            return NextResponse.json(
                { success: false, message: 'Invalid aircargo ID' },
                { status: 400 }
            )
        }

        // Check if aircargo exists
        const existing = await prisma.aircargo.findUnique({
            where: { id }
        })

        if (!existing) {
            return NextResponse.json(
                { success: false, message: 'Aircargo not found' },
                { status: 404 }
            )
        }

        // Delete associated history entries first
        await prisma.aircargoStatusHistory.deleteMany({
            where: { aircargo_id: id }
        })

        // Delete aircargo record
        await prisma.aircargo.delete({
            where: { id }
        })

        return NextResponse.json({
            success: true,
            message: 'Aircargo deleted successfully'
        })
    } catch (error) {
        console.error('Aircargo deletion error:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to delete aircargo' },
            { status: 500 }
        )
    }
}
