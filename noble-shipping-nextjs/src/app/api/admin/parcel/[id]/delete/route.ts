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
                { success: false, message: 'Invalid parcel ID' },
                { status: 400 }
            )
        }

        // Check if parcel exists
        const existing = await prisma.parcel.findUnique({
            where: { id }
        })

        if (!existing) {
            return NextResponse.json(
                { success: false, message: 'Parcel not found' },
                { status: 404 }
            )
        }

        // Delete associated history entries first
        await prisma.parcelStatusHistory.deleteMany({
            where: { parcel_id: id }
        })

        // Delete parcel record
        await prisma.parcel.delete({
            where: { id }
        })

        return NextResponse.json({
            success: true,
            message: 'Parcel deleted successfully'
        })
    } catch (error) {
        console.error('Parcel deletion error:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to delete parcel' },
            { status: 500 }
        )
    }
}
