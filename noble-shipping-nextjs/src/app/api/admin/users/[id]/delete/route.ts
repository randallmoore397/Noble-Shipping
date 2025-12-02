import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        // Check authentication and admin role
        const session = await getServerSession()
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email! }
        })

        if (!currentUser || currentUser.roles !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'Forbidden: Admin access required' },
                { status: 403 }
            )
        }

        const id = parseInt(params.id)
        if (isNaN(id)) {
            return NextResponse.json(
                { success: false, message: 'Invalid user ID' },
                { status: 400 }
            )
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id }
        })

        if (!existingUser) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            )
        }

        // Prevent deleting yourself
        if (existingUser.email === session.user.email) {
            return NextResponse.json(
                { success: false, message: 'Cannot delete your own account' },
                { status: 400 }
            )
        }

        // Delete associated staff records first
        await prisma.staffs.deleteMany({
            where: { user_id: id }
        })

        // Delete user record
        await prisma.user.delete({
            where: { id }
        })

        return NextResponse.json({
            success: true,
            message: 'User account deleted successfully'
        })
    } catch (error) {
        console.error('User deletion error:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to delete user account' },
            { status: 500 }
        )
    }
}
