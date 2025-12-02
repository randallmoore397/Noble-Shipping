import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth-helpers';
import { successResponse, errorResponse, createdResponse } from '@/lib/api-response';
import { aircargoStatusHistorySchema } from '@/lib/validations';
import { STATUS_CODE_MAP } from '@/lib/constants';

// GET: List aircargo history with filtering
export async function GET(request: NextRequest) {
  try {
    await requireRole(['Admin', 'Staff']);

    const { searchParams } = new URL(request.url);
    const aircargo_id = searchParams.get('aircargo_id');

    // Build filter
    const where: any = {};
    if (aircargo_id) {
      where.aircargo_id = parseInt(aircargo_id);
    }

    // Fetch history ordered by timestamp descending, limit to 100
    const history = await prisma.aircargoStatusHistory.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      take: 100,
      include: {
        aircargo: {
          select: {
            tracking_number: true,
            origin: true,
            destination: true,
            flight_number: true
          }
        }
      }
    });

    return successResponse(history);
  } catch (error: any) {
    console.error('Aircargo history list error:', error);
    return errorResponse(error.message || 'Failed to fetch aircargo history', null, 500);
  }
}

// POST: Create aircargo history entry
export async function POST(request: NextRequest) {
  try {
    await requireRole(['Admin', 'Staff']);

    const body = await request.json();
    const validation = aircargoStatusHistorySchema.safeParse(body);

    if (!validation.success) {
      return errorResponse('Validation failed', validation.error.errors, 400);
    }

    const data = validation.data;

    // Map status from numeric code if needed
    let status = data.status;
    if (typeof data.status === 'number' || !isNaN(Number(data.status))) {
      status = STATUS_CODE_MAP[Number(data.status)] || data.status;
    }

    const history = await prisma.aircargoStatusHistory.create({
      data: {
        aircargo_id: data.aircargo_id,
        status: status,
        location: data.location,
        current_carrier: data.current_carrier
      }
    });

    return createdResponse(history, 'Aircargo history entry created successfully');
  } catch (error: any) {
    console.error('Aircargo history creation error:', error);
    return errorResponse(error.message || 'Failed to create aircargo history', null, 500);
  }
}