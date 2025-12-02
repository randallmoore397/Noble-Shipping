import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

const historySchema = z.object({
  parcel_id: z.coerce.number().int(),
  status: z.string().min(1, 'Status is required'),
  location: z.string().optional(),
  timestamp: z.string()
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = historySchema.parse(body);
    
    if (isNaN(validatedData.parcel_id)) {
      return NextResponse.json({ error: 'Invalid parcel ID' }, { status: 400 });
    }

    const parcel = await prisma.parcel.findUnique({
      where: { id: validatedData.parcel_id }
    });

    if (!parcel) {
      return NextResponse.json({ error: 'Parcel not found' }, { status: 404 });
    }

    const history = await prisma.parcelStatusHistory.create({
      data: {
        parcel_id: validatedData.parcel_id,
        status: validatedData.status,
        location: validatedData.location || '',
        timestamp: new Date(validatedData.timestamp)
      }
    });

    return NextResponse.json(history);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}