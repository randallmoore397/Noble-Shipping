import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-helpers'
import { successResponse, errorResponse } from '@/lib/api-response'
import { userUpdateSchema } from '@/lib/validations'
import { DEFAULT_PASSWORD_PLACEHOLDER } from '@/lib/constants'
import bcrypt from 'bcryptjs'

export async function PUT(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        // Require admin role (replaces manual session check)
        await requireAdmin()

        const id = parseInt(params.id)
        if (isNaN(id)) {
            return errorResponse('Invalid user ID', null, 400)
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id },
            include: { Staffs: true, roles: true }
        })

        if (!existingUser) {
            return errorResponse('User not found', null, 404)
        }

        const body = await request.json()
        const validatedData = userUpdateSchema.parse(body)

        // Handle password update
        let passwordUpdate = {}
        if (validatedData.password && validatedData.password !== DEFAULT_PASSWORD_PLACEHOLDER) {
            const hashedPassword = await bcrypt.hash(validatedData.password, 10)
            passwordUpdate = { password: hashedPassword }
        }

        // Update user and staff in transaction
        const result = await prisma.$transaction(async (tx) => {
            // Update user record with proper roles relation
            const user = await tx.user.update({
                where: { id },
                data: {
                    email: validatedData.email,
                    active: typeof validatedData.active === 'boolean'
                        ? validatedData.active
                        : validatedData.active === 'true',
                    ...passwordUpdate,
                    // Properly update roles relation
                    ...(validatedData.roles && validatedData.roles.length > 0 ? {
                        roles: {
                            set: validatedData.roles.map(roleName => ({ name: roleName }))
                        }
                    } : {})
                }
            })

            // Update staff record if exists
            if (existingUser.Staffs.length > 0) {
                await tx.staffs.update({
                    where: { id: existingUser.Staffs[0].id },
                    data: {
                        first_name: validatedData.first_name,
                        middle_name: validatedData.middle_name || '',
                        last_name: validatedData.last_name,
                        position: validatedData.position || 'Staff',
                        gender: validatedData.gender || 'Male',
                        telephone_phone: validatedData.telephone_phone || '',
                        mobile: validatedData.mobile || '',
                        address: validatedData.address || '',
                        address_two: validatedData.address_two || '',
                        user_attribute: validatedData.user_attribute || ''
                    }
                })
            }

            return user
        })

        // Return user without password
        const { password, ...userWithoutPassword } = result

        return successResponse(userWithoutPassword, 'User account updated successfully')
    } catch (error: any) {
        console.error('User update error:', error)

        if (error.name === 'ZodError') {
            return errorResponse('Validation error', error.errors, 400)
        }

        return errorResponse(error.message || 'Failed to update user account', null, 500)
    }
}
