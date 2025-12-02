import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-helpers'
import { successResponse, errorResponse } from '@/lib/api-response'

export async function GET(request: NextRequest) {
    try {
        await requireRole(['Admin', 'Staff'])

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''

        const where: any = {}

        if (search) {
            where.OR = [
                { email: { contains: search } },
                { first_name: { contains: search } },
                { last_name: { contains: search } },
                { message: { contains: search } }
            ]
        }

        const [data, total] = await Promise.all([
            prisma.getInTouch.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { timestamp: 'desc' }
            }),
            prisma.getInTouch.count({ where })
        ])

        return successResponse({
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        })
    } catch (error: any) {
        console.error('Messages List Error:', error)
        return errorResponse(error.message || 'Failed to fetch messages', null, 500)
    }
}
