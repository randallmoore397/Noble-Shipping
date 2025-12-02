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
                { success: false, message: 'Invalid cargo ID' },
                { status: 400 }
            )
        }

        // Check if cargo exists
        const existing = await prisma.cargo.findUnique({
            where: { id }
        })

        if (!existing) {
            return NextResponse.json(
                { success: false, message: 'Container cargo not found' },
                { status: 404 }
            )
        }

        // Delete associated history entries first
        await prisma.cargoStatusHistory.deleteMany({
            where: { cargo_id: id }
        })

        // Delete cargo record
        await prisma.cargo.delete({
            where: { id }
        })

        return NextResponse.json({
            success: true,
            message: 'Container cargo deleted successfully'
        })
    } catch (error) {
        console.error('Container deletion error:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to delete container cargo' },
            { status: 500 }
        )
    }
}
