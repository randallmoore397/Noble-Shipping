import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth-helpers';
import { successResponse, errorResponse, createdResponse } from '@/lib/api-response';
import { cargoStatusHistorySchema } from '@/lib/validations';
import { STATUS_CODE_MAP } from '@/lib/constants';

// GET: List container history with filtering
export async function GET(request: NextRequest) {
  try {
    await requireRole(['Admin', 'Staff']);

    const { searchParams } = new URL(request.url);
    const cargo_id = searchParams.get('cargo_id');

    // Build filter
    const where: any = {};
    if (cargo_id) {
      where.cargo_id = parseInt(cargo_id);
    }

    // Fetch history ordered by timestamp descending, limit to 100
    const history = await prisma.cargoStatusHistory.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      take: 100,
      include: {
        cargo: {
          select: {
            tracking_number: true,
            origin: true,
            destination: true
          }
        }
      }
    });

    return successResponse(history);
  } catch (error: any) {
    console.error('Container history list error:', error);
    return errorResponse(error.message || 'Failed to fetch container history', null, 500);
  }
}

// POST: Create container history entry
export async function POST(request: NextRequest) {
  try {
    await requireRole(['Admin', 'Staff']);

    const body = await request.json();
    const validation = cargoStatusHistorySchema.safeParse(body);

    if (!validation.success) {
      return errorResponse('Validation failed', validation.error.errors, 400);
    }

    const data = validation.data;

    // Map status from numeric code if needed
    let status = data.status;
    if (typeof data.status === 'number' || !isNaN(Number(data.status))) {
      status = STATUS_CODE_MAP[Number(data.status)] || data.status;
    }

    const history = await prisma.cargoStatusHistory.create({
      data: {
        cargo_id: data.cargo_id,
        status: status,
        location: data.location,
        current_carrier: data.current_carrier
      }
    });

    return createdResponse(history, 'Container history entry created successfully');
  } catch (error: any) {
    console.error('Container history creation error:', error);
    return errorResponse(error.message || 'Failed to create container history', null, 500);
  }
}