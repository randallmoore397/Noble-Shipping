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
                { email_address: { contains: search } },
                { service: { contains: search } },
                { from_country: { contains: search } },
                { to_country: { contains: search } }
            ]
        }

        const [data, total] = await Promise.all([
            prisma.requestQuote.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { timestamp: 'desc' }
            }),
            prisma.requestQuote.count({ where })
        ])

        return successResponse({
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        })
    } catch (error: any) {
        console.error('Quotes List Error:', error)
        return errorResponse(error.message || 'Failed to fetch quotes', null, 500)
    }
}
