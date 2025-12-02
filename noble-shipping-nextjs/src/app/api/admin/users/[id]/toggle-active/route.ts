import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-helpers'
import { successResponse, errorResponse } from '@/lib/api-response'

export async function PUT(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        // Require admin access
        const admin = await requireAdmin()

        const id = parseInt(params.id)
        if (isNaN(id)) {
            return errorResponse('Invalid user ID', null, 400)
        }

        // Prevent admin from deactivating themselves
        if (admin.id === id) {
            return errorResponse('You cannot deactivate your own account', null, 400)
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id }
        })

        if (!existingUser) {
            return errorResponse('User not found', null, 404)
        }

        // Toggle active status
        const user = await prisma.user.update({
            where: { id },
            data: {
                active: !existingUser.active
            },
            select: {
                id: true,
                user_id: true,
                email: true,
                first_name: true,
                last_name: true,
                active: true,
                created_at: true,
                updated_at: true
            }
        })

        return successResponse(
            user,
            `User account ${user.active ? 'activated' : 'deactivated'} successfully`
        )
    } catch (error: any) {
        console.error('User toggle active error:', error)
        return errorResponse(error.message || 'Failed to toggle user active status', null, 500)
    }
}
