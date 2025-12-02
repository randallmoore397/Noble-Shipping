import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-helpers'
import { successResponse, errorResponse } from '@/lib/api-response'

export async function GET(request: NextRequest) {
    try {
        await requireRole(['Admin', 'Staff'])

        const [
            totalAircargo,
            totalContainers,
            totalParcels,
            activeUsers,
            recentAircargo,
            recentContainers,
            recentParcels
        ] = await Promise.all([
            prisma.aircargo.count({ where: { cargo_type: 'aircargo' } }),
            prisma.cargo.count({ where: { cargo_type: 'container' } }),
            prisma.parcel.count(),
            prisma.user.count({ where: { active: true } }),
            prisma.aircargo.findMany({
                take: 10, // Match Python backend (10 recent items)
                orderBy: { created_at: 'desc' },
                include: { AircargoStatusHistory: true }
            }),
            prisma.cargo.findMany({
                where: { cargo_type: 'container' }, // Filter by cargo_type
                take: 10, // Match Python backend (10 recent items)
                orderBy: { created_at: 'desc' },
                include: { CargoStatusHistory: true }
            }),
            prisma.parcel.findMany({
                take: 10,
                orderBy: { created_at: 'desc' },
                include: { ParcelStatusHistory: true }
            })
        ])

        return successResponse({
            totalAircargo,
            totalContainers,
            totalParcels,
            activeUsers,
            recentAircargo,
            recentContainers,
            recentParcels
        })
    } catch (error: any) {
        console.error('Dashboard Stats Error:', error)
        return errorResponse(error.message || 'Failed to fetch dashboard stats', null, 500)
    }
}
