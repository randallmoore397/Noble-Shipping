import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { userUpdateSchema } from '@/lib/validations'

export async function PUT(request: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession()
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Get current user
        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email! },
            include: { Staffs: true }
        })

        if (!currentUser) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            )
        }

        const body = await request.json()
        const validatedData = userUpdateSchema.parse(body)

        // Update user email
        const user = await prisma.user.update({
            where: { id: currentUser.id },
            data: {
                email: validatedData.email
            }
        })

        // Update staff record
        if (currentUser.Staffs.length > 0) {
            await prisma.staffs.update({
                where: { id: currentUser.Staffs[0].id },
                data: {
                    first_name: validatedData.first_name,
                    middle_name: validatedData.middle_name || '',
                    last_name: validatedData.last_name,
                    position: validatedData.position || currentUser.Staffs[0].position,
                    gender: validatedData.gender || currentUser.Staffs[0].gender,
                    telephone_phone: validatedData.telephone_phone || '',
                    mobile: validatedData.mobile || '',
                    address: validatedData.address || ''
                }
            })
        }

        // Return user without password
        const { password, ...userWithoutPassword } = user

        return NextResponse.json({
            success: true,
            data: userWithoutPassword,
            message: 'Profile updated successfully'
        })
    } catch (error: any) {
        console.error('Profile update error:', error)

        if (error.name === 'ZodError') {
            return NextResponse.json(
                { success: false, message: 'Validation error', errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: false, message: 'Failed to update profile' },
            { status: 500 }
        )
    }
}
